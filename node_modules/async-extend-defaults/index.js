var async = require('async'),
    asyncEachObject = require('async-each-object')

var TYPE_OBJECT = '[object Object]'
var TYPE_ARRAY  = '[object Array]'

/**
 * Deep object extending
 * @param {Boolean} extending extend or default object with values
 * @param [target] target object
 * @param [object] list of object arguments
 * @param {Function} [callback] list of object arguments
 * @returns {*}
 */
function asyncExtendDefaults(extending, target, object, callback) {
    var result = null,
        args = Array.prototype.slice.call(arguments),
        callback = args.pop()

    args.shift()

    if (typeof callback !== 'function') {
        return null
    }

    async.eachSeries(
        args,
        function (toMerge, nextObject) {
            if (!toMerge) {
                nextObject()

                return
            }

            if (result === null) {
                result = toMerge
                nextObject()

                return
            }

            asyncEachObject(
                toMerge,

                /**
                 * @param value
                 * @param prop
                 * @param nextProp
                 * @returns {*}
                 */
                    function extendIterator(value, prop, nextProp) {
                    var valueType = Object.prototype.toString.call(value)

                    if (valueType === TYPE_OBJECT) {
                        if (result[prop] === undefined) {
                            result[prop] = {}
                        }

                        asyncExtendDefaults(extending, result[prop], value, function (subObject) {
                            result[prop] = subObject

                            return nextProp()
                        })
                    }
                    else if (valueType === TYPE_ARRAY) {
                        if (result[prop] === undefined) {
                            result[prop] = []
                        }

                        var resultProp = result[prop]

                        async.concat(
                            value,
                            function (item, next) {
                                next(null, (resultProp.indexOf(item) < 0) ? item : null)
                            },
                            function (err, arr) {
                                result[prop] = resultProp.concat(arr)
                                nextProp()
                            }
                        )

                        result[prop] = result[prop].concat(value)
                    }
                    else {
                        if (extending || result[prop] === undefined) {
                            result[prop] = value
                        }

                        return nextProp()
                    }
                },

                nextObject
            )
        },
        function complete() {
            callback(result)
        }
    )
}

/**
 * Deep object extending
 * @param target
 * @param {Object} [object] list of object arguments
 * @param {Function} [callback] list of object arguments
 * @returns {*}
 */
function asyncExtend(target, object, callback) {
    var args = [true].concat(Array.prototype.slice.call(arguments))

    asyncExtendDefaults.apply(this, args)
}

/**
 * Deep object defaults
 * @param target
 * @param [object] list of object arguments
 * @param {Function} [callback] list of object arguments
 * @returns {*}
 */
function asyncDefaults(target, object, callback) {
    asyncExtendDefaults.apply(this, [false].concat(Array.prototype.slice.call(arguments)))
}

async.extend = asyncExtend
async.defaults = asyncDefaults

module.exports.extend = asyncExtend
module.exports.defaults = asyncDefaults
