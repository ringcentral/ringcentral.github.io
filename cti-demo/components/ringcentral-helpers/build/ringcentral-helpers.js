(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Helpers"] = factory();
	else
		root["RingCentral"] = root["RingCentral"] || {}, root["RingCentral"]["Helpers"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

/// <reference path="./externals.d.ts" />
var validator = __webpack_require__(2);
var list = __webpack_require__(3);
var utils = __webpack_require__(4);
var accountHelper = __webpack_require__(5);
var blockedNumberHelper = __webpack_require__(7);
var callHelper = __webpack_require__(8);
var contactHelper = __webpack_require__(9);
var contactGroupHelper = __webpack_require__(10);
var conferencingHelper = __webpack_require__(11);
var countryHelper = __webpack_require__(12);
var deviceHelper = __webpack_require__(13);
var deviceModelHelper = __webpack_require__(14);
var extensionHelper = __webpack_require__(15);
var forwardingNumberHelper = __webpack_require__(16);
var languageHelper = __webpack_require__(17);
var locationHelper = __webpack_require__(18);
var messageHelper = __webpack_require__(19);
var phoneNumberHelper = __webpack_require__(20);
var presenceHelper = __webpack_require__(21);
var ringoutHelper = __webpack_require__(22);
var serviceHelper = __webpack_require__(23);
var shippingMethodHelper = __webpack_require__(24);
var stateHelper = __webpack_require__(25);
var timezoneHelper = __webpack_require__(26);
var RingCentralHelpers = (function () {
    function RingCentralHelpers() {
        this.version = '0.1.0';
        this._utils = new utils.Utils();
        this._validator = new validator.Validator(this._utils);
        this._list = new list.List(this._utils);
        this._account = new accountHelper.Account(this._utils, this._validator, this._list);
        this._blockedNumber = new blockedNumberHelper.BlockedNumber(this._utils, this._validator, this._list);
        this._conferencing = new conferencingHelper.Conferencing(this._utils, this._validator, this._list);
        this._contact = new contactHelper.Contact(this._utils, this._validator, this._list);
        this._contactGroup = new contactGroupHelper.ContactGroup(this._utils, this._validator, this._list);
        this._country = new countryHelper.Country(this._utils, this._validator, this._list);
        this._extension = new extensionHelper.Extension(this._utils, this._validator, this._list);
        this._deviceModel = new deviceModelHelper.DeviceModel(this._utils, this._validator, this._list);
        this._device = new deviceHelper.Device(this._utils, this._validator, this._list, this._extension, this._deviceModel);
        this._presence = new presenceHelper.Presence(this._utils, this._validator, this._list, this._extension);
        this._call = new callHelper.Call(this._utils, this._validator, this._list, this._presence, this._contact);
        this._forwardingNumber = new forwardingNumberHelper.ForwardingNumber(this._utils, this._validator, this._list);
        this._language = new languageHelper.Language(this._utils, this._validator, this._list);
        this._state = new stateHelper.State(this._utils, this._validator, this._list, this._country);
        this._location = new locationHelper.Location(this._utils, this._validator, this._list, this._state);
        this._message = new messageHelper.Message(this._utils, this._validator, this._list, this._contact);
        this._phoneNumber = new phoneNumberHelper.PhoneNumber(this._utils, this._validator, this._list);
        this._ringout = new ringoutHelper.Ringout(this._utils, this._validator, this._list);
        this._service = new serviceHelper.Service(this._utils, this._validator, this._list);
        this._shippingMethod = new shippingMethodHelper.ShippingMethod(this._utils, this._validator, this._list);
        this._timezone = new timezoneHelper.Timezone(this._utils, this._validator, this._list);
    }
    RingCentralHelpers.prototype.country = function () { return this._country; };
    RingCentralHelpers.prototype.deviceModel = function () { return this._deviceModel; };
    RingCentralHelpers.prototype.language = function () { return this._language; };
    RingCentralHelpers.prototype.location = function () { return this._location; };
    RingCentralHelpers.prototype.shippingMethod = function () { return this._shippingMethod; };
    RingCentralHelpers.prototype.state = function () { return this._state; };
    RingCentralHelpers.prototype.timezone = function () { return this._timezone; };
    RingCentralHelpers.prototype.account = function () { return this._account; };
    RingCentralHelpers.prototype.blockedNumber = function () { return this._blockedNumber; };
    RingCentralHelpers.prototype.call = function () { return this._call; };
    RingCentralHelpers.prototype.conferencing = function () { return this._conferencing; };
    RingCentralHelpers.prototype.contact = function () { return this._contact; };
    RingCentralHelpers.prototype.contactGroup = function () { return this._contactGroup; };
    RingCentralHelpers.prototype.device = function () { return this._device; };
    RingCentralHelpers.prototype.extension = function () { return this._extension; };
    RingCentralHelpers.prototype.forwardingNumber = function () { return this._forwardingNumber; };
    RingCentralHelpers.prototype.message = function () { return this._message; };
    RingCentralHelpers.prototype.phoneNumber = function () { return this._phoneNumber; };
    RingCentralHelpers.prototype.presence = function () { return this._presence; };
    RingCentralHelpers.prototype.ringout = function () { return this._ringout; };
    RingCentralHelpers.prototype.service = function () { return this._service; };
    return RingCentralHelpers;
})();
module.exports = new RingCentralHelpers();


/***/ },
/* 2 */
/***/ function(module, exports) {

/// <reference path="../externals.d.ts" />
var Validator = (function () {
    function Validator(utils) {
        this.utils = utils;
    }
    Validator.prototype.validate = function (validators) {
        var result = {
            errors: {},
            isValid: true
        };
        result.errors = validators.reduce(function (errors, validator) {
            var res = validator.validator();
            if (res.length > 0) {
                result.isValid = false;
                errors[validator.field] = errors[validator.field] || [];
                errors[validator.field] = errors[validator.field].concat(res);
            }
            return errors;
        }, {});
        return result;
    };
    /**
     * It is not recommended to have any kinds of complex validators at front end
     * @deprecated
     */
    Validator.prototype.email = function (value, multiple) {
        var _this = this;
        return function () {
            if (!value)
                return [];
            return _this.utils.isEmail(value, multiple) ? [] : [new Error('Value has to be a valid email')];
        };
    };
    /**
     * It is not recommended to have any kinds of complex validators at front end
     * TODO International phone numbers
     * @deprecated
     */
    Validator.prototype.phone = function (value) {
        var _this = this;
        return function () {
            if (!value)
                return [];
            return _this.utils.isPhoneNumber(value) ? [] : [new Error('Value has to be a valid US phone number')];
        };
    };
    Validator.prototype.required = function (value) {
        return function () {
            return !value ? [new Error('Field is required')] : [];
        };
    };
    Validator.prototype.length = function (value, max, min) {
        return function () {
            var errors = [];
            if (!value)
                return errors;
            value = value.toString();
            if (min && value.length < min)
                errors.push(new Error('Minimum length of ' + min + ' characters is required'));
            if (max && value.length > max)
                errors.push(new Error('Maximum length of ' + max + ' characters is required'));
            return errors;
        };
    };
    return Validator;
})();
exports.Validator = Validator;


/***/ },
/* 3 */
/***/ function(module, exports) {

/// <reference path="../externals.d.ts" />
var List = (function () {
    function List(utils) {
        this.utils = utils;
        this.numberComparator = this.numberComparator.bind(this);
        this.stringComparator = this.stringComparator.bind(this);
    }
    /**
     * TODO Use utils getProperty
     * @param {string} property
     * @returns {function(object)}
     */
    List.prototype.propertyExtractor = function (property) {
        return function (item, options) {
            return property ? ((item && item[property]) || null) : item;
        };
    };
    /**
     * Non-string types are converted to string
     * Non-string types are extracted as an empty string if they could be converted to false
     * If no options.sortBy given the item itself is extracted
     * Compares strings:
     * - if (a is less than b) return -1;
     * - if (a is greater than b) return 1;
     * - else (a must be equal to b) return 0;
     * Exceptions in will be suppressed, if any - a is assumed to be less than b
     */
    List.prototype.stringComparator = function (a, b, options) {
        return this.utils.parseString(a).localeCompare(this.utils.parseString(b));
    };
    /**
     * Non-numeric types are extracted as 0 if they could be converted to false
     * Objects that could not be converted to number are extracted as 0
     * If no options.sortBy given the item itself is extracted
     * See parseFloat for more info
     * Compares numbers:
     * - if (a is less than b) return -1;
     * - if (a is greater than b) return 1;
     * - else (a must be equal to b) return 0;
     * Function does not check types
     * Exceptions in will be suppressed, if any - a is assumed to be less than b
     */
    List.prototype.numberComparator = function (a, b, options) {
        return (this.utils.parseNumber(a) - this.utils.parseNumber(b));
    };
    /**
     * Function extracts (using _extractFn_ option) values of a property (_sortBy_ option) and compares them using
     * compare function (_compareFn_ option, by default Helper.stringComparator)
     * Merged options are provided to _extractFn_ and _compareFn_
     * TODO Check memory leaks for all that options links
     */
    List.prototype.comparator = function (options) {
        options = this.utils.extend({
            extractFn: this.propertyExtractor((options && options.sortBy) || null).bind(this),
            compareFn: this.stringComparator.bind(this)
        }, options);
        return function (item1, item2) {
            return options.compareFn(options.extractFn(item1, options), options.extractFn(item2, options), options);
        };
    };
    List.prototype.equalsFilter = function (obj, options) {
        return (options.condition === obj);
    };
    /**
     * @param {string} obj
     * @param {IListFilterOptions} options
     * @returns {boolean}
     */
    List.prototype.containsFilter = function (obj, options) {
        return (obj && obj.toString().indexOf(options.condition) > -1);
    };
    List.prototype.regexpFilter = function (obj, options) {
        if (!(options.condition instanceof RegExp))
            throw new Error('Condition must be an instance of RegExp');
        return (options.condition.test(obj));
    };
    /**
     * Function extracts (using `extractFn` option) values of a property (`filterBy` option) and filters them using
     * compare function (`filterFn` option, by default Helper.equalsFilter)
     * Merged options are provided to `extractFn` and `compareFn`
     * Set `filterBy` to null to force `propertyExtractor` to return object itself
     * TODO Check memory leaks for all that options links
     */
    List.prototype.filter = function (filterConfigs) {
        var _this = this;
        var self = this;
        filterConfigs = (filterConfigs || []).map(function (opt) {
            return _this.utils.extend({
                condition: '',
                extractFn: self.propertyExtractor((opt && opt.filterBy) || null).bind(_this),
                filterFn: self.equalsFilter.bind(_this)
            }, opt);
        });
        return function (item) {
            return filterConfigs.reduce(function (pass, opt) {
                if (!pass || !opt.condition)
                    return pass;
                return opt.filterFn(opt.extractFn(item, opt), opt);
            }, true);
        };
    };
    return List;
})();
exports.List = List;


/***/ },
/* 4 */
/***/ function(module, exports) {

/// <reference path="../externals.d.ts" />
var hasOwn = Object.prototype.hasOwnProperty, toString = Object.prototype.toString, rdigit = /\d/, class2type = {};
// Populate the class2type map
'Boolean Number String Function Array Date RegExp Object'.split(' ').forEach(function (name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
});
var Utils = (function () {
    function Utils() {
    }
    /**
     * Ported from jQuery.fn.extend
     * Optional first parameter makes deep copy
     */
    Utils.prototype.extend = function (targetObject, sourceObject) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;
            // skip the boolean and the target
            target = arguments[i] || {};
            i++;
        }
        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !this.isFunction(target)) {
            target = {};
        }
        for (; i < length; i++) {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) !== null) {
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }
                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && this.isArray(src) ? src : [];
                        }
                        else {
                            clone = src && this.isPlainObject(src) ? src : {};
                        }
                        // Never move original objects, clone them
                        target[name] = this.extend(deep, clone, copy);
                    }
                    else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        // Return the modified object
        return target;
    };
    Utils.prototype.forEach = function (object, cb) {
        for (var i in object) {
            if (!object.hasOwnProperty(i))
                continue;
            var res = cb(object[i], i);
            if (res === false)
                break;
        }
    };
    /**
     * TODO Replace with something better
     * @see https://github.com/joyent/node/blob/master/lib/querystring.js
     * @param {object} parameters
     * @returns {string}
     */
    Utils.prototype.queryStringify = function (parameters) {
        var _this = this;
        var array = [];
        this.forEach(parameters, function (v, i) {
            if (_this.isArray(v)) {
                v.forEach(function (vv) {
                    array.push(encodeURIComponent(i) + '=' + encodeURIComponent(vv));
                });
            }
            else {
                array.push(encodeURIComponent(i) + '=' + encodeURIComponent(v));
            }
        });
        return array.join('&');
    };
    /**
     * TODO Replace with something better
     * @see https://github.com/joyent/node/blob/master/lib/querystring.js
     * @param {string} queryString
     * @returns {object}
     */
    Utils.prototype.parseQueryString = function (queryString) {
        var argsParsed = {}, self = this;
        queryString.split('&').forEach(function (arg) {
            arg = decodeURIComponent(arg);
            if (arg.indexOf('=') == -1) {
                argsParsed[arg.trim()] = true;
            }
            else {
                var pair = arg.split('='), key = pair[0].trim(), value = pair[1].trim();
                if (key in argsParsed) {
                    if (key in argsParsed && !self.isArray(argsParsed[key]))
                        argsParsed[key] = [argsParsed[key]];
                    argsParsed[key].push(value);
                }
                else {
                    argsParsed[key] = value;
                }
            }
        });
        return argsParsed;
    };
    /**
     * Returns true if the passed value is valid email address.
     * Checks multiple comma separated emails according to RFC 2822 if parameter `multiple` is `true`
     */
    Utils.prototype.isEmail = function (v, multiple) {
        if (!!multiple) {
            //this Regexp is also suitable for multiple emails (comma separated)
            return /^(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?[ ,;]*)+$/i.test(v);
        }
        else {
            return /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(v);
        }
    };
    Utils.prototype.isPhoneNumber = function (v) {
        return (/\+?1[0-9]{3}[0-9a-z]{7}/im.test(v.toString().split(/[^0-9a-z\+]/im).join('')));
    };
    /**
     * @param args
     * @returns {Array}
     */
    Utils.prototype.argumentsToArray = function (args) {
        return Array.prototype.slice.call(args || [], 0);
    };
    Utils.prototype.isDate = function (obj) {
        return this.type(obj) === "date";
    };
    Utils.prototype.isFunction = function (obj) {
        return this.type(obj) === "function";
    };
    Utils.prototype.isArray = function (obj) {
        return Array.isArray ? Array.isArray(obj) : this.type(obj) === "array";
    };
    // A crude way of determining if an object is a window
    Utils.prototype.isWindow = function (obj) {
        return obj && typeof obj === "object" && "setInterval" in obj;
    };
    Utils.prototype.isNaN = function (obj) {
        return obj === null || !rdigit.test(obj) || isNaN(obj);
    };
    Utils.prototype.type = function (obj) {
        return obj === null
            ? String(obj)
            : class2type[toString.call(obj)] || "object";
    };
    Utils.prototype.isPlainObject = function (obj) {
        // Must be an Object.
        // Because of IE, we also have to check the presence of the constructor property.
        // Make sure that DOM nodes and window objects don't pass through, as well
        if (!obj || this.type(obj) !== "object" || obj.nodeType || this.isWindow(obj)) {
            return false;
        }
        // Not own constructor property must be Object
        if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
            return false;
        }
        // Own properties are enumerated firstly, so to speed up,
        // if last one is own, then all properties are own.
        var key;
        for (key in obj) { }
        return key === undefined || hasOwn.call(obj, key);
    };
    Utils.prototype.getProperty = function (obj, property) {
        return property
            .split(/[.[\]]/)
            .reduce(function (res, part) {
            if (!res)
                return undefined;
            return part ? res[part] : res;
        }, obj);
    };
    Utils.prototype.poll = function (fn, interval, timeout) {
        this.stopPolling(timeout);
        interval = interval || 1000;
        var next = function (delay) {
            delay = delay || interval;
            interval = delay;
            return setTimeout(function () {
                fn(next, delay);
            }, delay);
        };
        return next();
    };
    Utils.prototype.stopPolling = function (timeout) {
        if (timeout)
            clearTimeout(timeout);
    };
    Utils.prototype.parseString = function (s) {
        return s ? s.toString() : '';
    };
    Utils.prototype.parseNumber = function (n) {
        if (!n)
            return 0;
        n = parseFloat(n);
        return isNaN(n) ? 0 : n;
    };
    return Utils;
})();
exports.Utils = Utils;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

/// <reference path="../externals.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var helper = __webpack_require__(6);
var Account = (function (_super) {
    __extends(Account, _super);
    function Account() {
        _super.apply(this, arguments);
    }
    Account.prototype.createUrl = function () {
        return '/account/~';
    };
    return Account;
})(helper.Helper);
exports.Account = Account;


/***/ },
/* 6 */
/***/ function(module, exports) {

/// <reference path="../externals.d.ts" />
var Helper = (function () {
    function Helper(utils, validator, list) {
        this.defaultProperty = 'id';
        this.utils = utils;
        this.validator = validator;
        this.list = list;
    }
    Helper.prototype.createUrl = function (options, id) {
        return '';
    };
    Helper.prototype.getId = function (object) {
        return object && object[this.defaultProperty];
    };
    Helper.prototype.isNew = function (object) {
        return !this.getId(object) || !this.getUri(object);
    };
    Helper.prototype.resetAsNew = function (object) {
        if (object) {
            delete object.id;
            delete object.uri;
        }
        return object;
    };
    Helper.prototype.getUri = function (object) {
        return object && object.uri;
    };
    Helper.prototype.parseMultipartResponse = function (ajax) {
        if (ajax.isMultipart()) {
            // ajax.data has full array, leave only successful
            return ajax.data.filter(function (result) {
                return (!result.error);
            }).map(function (result) {
                return result.data;
            });
        }
        else {
            return [ajax.data];
        }
    };
    /**
     * Options have higher priority, if object.url and options.url were provided, options.url will be returned
     * If no URL was provided, default will be returned
     */
    Helper.prototype.loadRequest = function (object, options) {
        return this.utils.extend(options || {}, {
            url: (options && options.url) || (object && this.getUri(object)) || this.createUrl(),
            method: (options && options.method) || 'GET'
        });
    };
    /**
     * Options have higher priority, if object.url and options.url were provided, options.url will be returned
     * If no URL was provided, default will be returned
     */
    Helper.prototype.saveRequest = function (object, options) {
        if (!object && !(options && (options.post || options.body)))
            throw new Error('No Object');
        return this.utils.extend(options || {}, {
            method: (options && options.method) || (this.isNew(object) ? 'POST' : 'PUT'),
            url: (options && options.url) || this.getUri(object) || this.createUrl(),
            body: (options && (options.body || options.post)) || object
        });
    };
    /**
     * Options have higher priority, if object.url and options.url were provided, options.url will be returned
     * If no URL was provided exception will be thrown
     */
    Helper.prototype.deleteRequest = function (object, options) {
        options = options || {};
        if (!this.getUri(object) && !(options && options.url))
            throw new Error('Object has to be not new or URL must be provided');
        return this.utils.extend(options || {}, {
            method: (options && options.method) || 'DELETE',
            url: (options && options.url) || this.getUri(object)
        });
    };
    /**
     * If no url was provided, default SYNC url will be returned
     */
    Helper.prototype.syncRequest = function (options) {
        options = options || {};
        options.url = options.url || this.createUrl({ sync: true });
        options.query = options.query || options.get || {};
        if (!!options.query.syncToken) {
            options.query = {
                syncType: 'ISync',
                syncToken: options.get.syncToken
            };
        }
        else {
            options.query.syncType = 'FSync';
        }
        return options;
    };
    Helper.prototype.nextPageExists = function (data) {
        return (data && data.navigation && ('nextPage' in data.navigation));
    };
    /**
     * array - an array to be indexed
     * getIdFn - must return an ID for each array item
     * gather - if true, then each index will have an array of items, that has same ID, otherwise the first indexed
     * item wins
     */
    Helper.prototype.index = function (array, getIdFn, gather) {
        getIdFn = getIdFn || this.getId.bind(this);
        array = array || [];
        return array.reduce(function (index, item) {
            var id = getIdFn(item);
            if (!id || (index[id] && !gather))
                return index;
            if (gather) {
                if (!index[id])
                    index[id] = [];
                index[id].push(item);
            }
            else {
                index[id] = item;
            }
            return index;
        }, {});
    };
    /**
     * Returns a shallow copy of merged _target_ array plus _supplement_ array
     * mergeItems
     * - if true, properties of _supplement_ item will be applied to _target_ item,
     * - otherwise _target_ item will be replaced
     */
    Helper.prototype.merge = function (target, supplement, getIdFn, mergeItems) {
        var _this = this;
        getIdFn = getIdFn || this.getId.bind(this);
        target = target || [];
        supplement = supplement || [];
        var supplementIndex = this.index(supplement, getIdFn), updatedIDs = [], result = target.map(function (item) {
            var id = getIdFn(item), newItem = supplementIndex[id];
            if (newItem)
                updatedIDs.push(id);
            return newItem ? (mergeItems ? _this.utils.extend(item, newItem) : newItem) : item;
        });
        supplement.forEach(function (item) {
            if (updatedIDs.indexOf(getIdFn(item)) == -1)
                result.push(item);
        });
        return result;
    };
    return Helper;
})();
exports.Helper = Helper;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

/// <reference path="../externals.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var helper = __webpack_require__(6);
var BlockedNumber = (function (_super) {
    __extends(BlockedNumber, _super);
    function BlockedNumber() {
        _super.apply(this, arguments);
    }
    BlockedNumber.prototype.createUrl = function (options, id) {
        options = options || {};
        return '/account/~/extension/' +
            (options.extensionId ? options.extensionId : '~') +
            '/blocked-number' +
            (id ? '/' + id : '');
    };
    BlockedNumber.prototype.validate = function (item) {
        return this.validator.validate([
            { field: 'phoneNumber', validator: this.validator.phone(item.phoneNumber) },
            { field: 'phoneNumber', validator: this.validator.required(item.phoneNumber) },
            { field: 'name', validator: this.validator.required(item.name) }
        ]);
    };
    return BlockedNumber;
})(helper.Helper);
exports.BlockedNumber = BlockedNumber;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

/// <reference path="../externals.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var helper = __webpack_require__(6);
var Call = (function (_super) {
    __extends(Call, _super);
    function Call(utils, validator, list, presence, contact) {
        _super.call(this, utils, validator, list);
        this.contact = contact;
        this.presence = presence;
    }
    Call.prototype.createUrl = function (options, id) {
        options = options || {};
        if (!('personal' in options) && !('extensionId' in options))
            options.personal = true;
        return '/account/~/' +
            (options.personal || options.extensionId ? ('extension/' + (options.extensionId || '~') + '/') : '') +
            (options.active ? 'active-calls' : 'call-log') +
            (id ? '/' + id : '');
    };
    Call.prototype.getSessionId = function (call) {
        return (call && call.sessionId);
    };
    Call.prototype.isInProgress = function (call) {
        return (call && call.result == 'In Progress');
    };
    Call.prototype.isAlive = function (call) {
        return (call && call.availability == 'Alive');
    };
    Call.prototype.isInbound = function (call) {
        return (call && call.direction == 'Inbound');
    };
    Call.prototype.isOutbound = function (call) {
        return !this.isInbound(call);
    };
    Call.prototype.isMissed = function (call) {
        return (call && call.result == 'Missed');
    };
    Call.prototype.isFindMe = function (call) {
        return (call && call.action == 'FindMe');
    };
    Call.prototype.getCallerInfo = function (call) {
        return this.isInbound(call) ? call.from : call.to;
    };
    Call.prototype.getAllCallerInfos = function (call) {
        return [this.getCallerInfo(call)].concat(this.isInbound(call) ? call.to : call.from);
    };
    Call.prototype.formatDuration = function (call) {
        function addZero(v) {
            return (v < 10) ? '0' + v : v;
        }
        var duration = parseInt(call.duration), hours = Math.floor(duration / (60 * 60)), mins = Math.floor((duration % (60 * 60)) / 60), secs = Math.floor(duration % 60);
        return (hours ? hours + ':' : '') + addZero(mins) + ':' + addZero(secs);
    };
    Call.prototype.filter = function (options) {
        options = this.utils.extend({
            alive: true,
            direction: '',
            type: ''
        }, options);
        return this.list.filter([
            //{condition: options.alive, filterFn: this.isAlive},
            { filterBy: 'direction', condition: options.direction },
            { filterBy: 'type', condition: options.type }
        ]);
    };
    Call.prototype.comparator = function (options) {
        return this.list.comparator(this.utils.extend({
            sortBy: 'startTime'
        }, options));
    };
    /**
     * Injects contact field with appropriate {IContact} data structure into all callerInfos found in
     * all calls Warning, this function may be performance-consuming, reduce the amount of items passed to contacts
     * and calls
     */
    Call.prototype.attachContacts = function (contacts, calls, options) {
        var _this = this;
        // Flatten all caller infos from all messages
        var callerInfos = calls.reduce(function (callerInfos, call) {
            return callerInfos.concat(_this.getAllCallerInfos(call));
        }, []);
        this.contact.attachToCallerInfos(callerInfos, contacts, options);
    };
    /**
     * Check whether pair of calls are two legs of RingOut
     */
    Call.prototype.checkMergeability = function (outboundRingOutCall, inboundCall, options) {
        var getTime = function (dateString) {
            return (new Date(dateString)).getTime();
        };
        return ((!options.strict || outboundRingOutCall.action && outboundRingOutCall.action.toLowerCase().indexOf('ringout') != -1) &&
            // Check directions
            outboundRingOutCall.direction == 'Outbound' &&
            inboundCall.direction == 'Inbound' &&
            // Check that start times are equal or close enough
            ((!inboundCall.startTime && !outboundRingOutCall.startTime) || Math.abs(getTime(inboundCall.startTime) - getTime(outboundRingOutCall.startTime)) < (options.maxStartTimeDiscrepancy || 5000)) &&
            // Check that numbers match
            inboundCall.from.phoneNumber == outboundRingOutCall.to.phoneNumber &&
            (inboundCall.to.phoneNumber == outboundRingOutCall.from.phoneNumber || inboundCall.to.name == outboundRingOutCall.from.name) //TODO Maybe name check is not required
        );
    };
    Call.prototype.combineCalls = function (outboundRingOutCall, inboundCall, options) {
        options = options || {};
        var result = [];
        outboundRingOutCall.hasSubsequent = true;
        if (options.merge) {
            outboundRingOutCall.duration = (outboundRingOutCall.duration > inboundCall.duration) ? outboundRingOutCall.duration : inboundCall.duration;
            // TODO Usually information from inbound call is more accurate for unknown reason
            outboundRingOutCall.from = inboundCall.to;
            outboundRingOutCall.to = inboundCall.from;
            // Push only one "merged" outbound call
            result.push(outboundRingOutCall);
        }
        else {
            // Mark next call as subsequent
            inboundCall.subsequent = true;
            inboundCall.startTime = outboundRingOutCall.startTime; // Needed for sort
            // Push both calls, first outbound then inbound
            result.push(outboundRingOutCall);
            result.push(inboundCall);
        }
        return result;
    };
    /**
     * (!) Experimental (!)
     *
     * Calls in Recent Calls (Call Log) or Active Calls arrays can be combined if they are, for example, two legs of
     * one RingOut. The logic that stands behind this process is simple:
     *
     * - Calls must have opposite directions
     * - Must have been started within a certain limited time frame
     * - Must have same phone numbers in their Caller Info sections (from/to)
     *
     * ```js
     * var processedCalls = Call.processCalls(callsArray, {strict: false, merge: true});
     * ```
     *
     * Flags:
     *
     * - if `strict` is `true` then only calls with RingOut in `action` property will be affected
     * - `merge` &mdash; controls whether to merge calls (reducing the length of array) or give them `subsequent`
     *     and `hasSubsequent` properties
     */
    Call.prototype.processCalls = function (calls, options) {
        var processedCalls = [], callsToMerge = [], self = this;
        // Iterate through calls
        calls.forEach(function (call) {
            var merged = false;
            call.subsequent = false;
            call.hasSubsequent = false;
            // Second cycle to find other leg
            // It is assumed that call is the outbound, secondCall is inbound
            calls.some(function (secondCall) {
                if (call === secondCall)
                    return false;
                if (self.checkMergeability(call, secondCall, options)) {
                    // Push to result array merged call
                    processedCalls = processedCalls.concat(self.combineCalls(call, secondCall, options));
                    // Push to array calls that are merged
                    callsToMerge.push(call);
                    callsToMerge.push(secondCall);
                    merged = true;
                }
                return merged;
            });
        });
        // After all calls are merged, add non-merged calls
        calls.forEach(function (call) {
            if (callsToMerge.indexOf(call) == -1)
                processedCalls.push(call);
        });
        return processedCalls;
    };
    /**
     * Converts Presence's ActiveCall array into regular Calls array
     */
    Call.prototype.parsePresenceCalls = function (activeCalls) {
        var _this = this;
        return activeCalls.map(function (activeCall) {
            return {
                id: activeCall.id,
                uri: '',
                sessionId: activeCall.sessionId,
                from: { phoneNumber: activeCall.from },
                to: { phoneNumber: activeCall.to },
                direction: activeCall.direction,
                startTime: '',
                duration: 0,
                type: '',
                action: '',
                result: _this.presence.isCallInProgress(activeCall) ? 'In Progress' : activeCall.telephonyStatus,
                telephonyStatus: activeCall.telephonyStatus // non-standard property for compatibility
            };
        });
    };
    Call.prototype.getSignature = function (call) {
        var cleanup = function (phoneNumber) {
            return (phoneNumber || '').toString().replace(/[^0-9]/ig, '');
        };
        return call.direction + '|' + (call.from && cleanup(call.from.phoneNumber)) + '|' + (call.to && cleanup(call.to.phoneNumber));
    };
    Call.prototype.mergePresenceCalls = function (presenceCalls, presence) {
        var currentDate = new Date(), activeCalls = this
            .parsePresenceCalls(presence && presence.activeCalls || [])
            .map(function (call) {
            // delete property to make sure it is skipped during merge
            delete call.startTime;
            return call;
        });
        presenceCalls = this.merge(presenceCalls || [], activeCalls, this.getSessionId, true);
        presenceCalls.forEach(function (call) {
            if (!call.startTime)
                call.startTime = currentDate.toISOString();
        });
        return presenceCalls;
    };
    Call.prototype.mergeAll = function (presenceCalls, calls, activeCalls) {
        // First, merge calls into presence calls
        var presenceAndCalls = this.merge(presenceCalls || [], calls || [], this.getSessionId, true);
        // Second, merge activeCalls into previous result
        return this.merge(presenceAndCalls, activeCalls || [], this.getSessionId, true);
    };
    return Call;
})(helper.Helper);
exports.Call = Call;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

/// <reference path="../externals.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var helper = __webpack_require__(6);
var Contact = (function (_super) {
    __extends(Contact, _super);
    function Contact() {
        _super.apply(this, arguments);
        this.phoneFields = [
            'homePhone',
            'homePhone2',
            'businessPhone',
            'businessPhone2',
            'mobilePhone',
            'companyPhone',
            'assistantPhone',
            'carPhone',
            'otherPhone',
            'callbackPhone'
        ];
        this.faxFields = [
            'businessFax',
            'otherFax'
        ];
        this.addressFields = [
            'homeAddress',
            'businessAddress',
            'otherAddress'
        ];
        this.addressSubFields = [
            'street',
            'city',
            'state',
            'zip'
        ];
        this.nameFields = [
            'firstName',
            'middleName',
            'lastName',
            'nickName'
        ];
        this.otherFields = [
            'company',
            'jobTitle',
            'webPage',
            'notes'
        ];
        this.emailFields = [
            'email',
            'email2',
            'email3'
        ];
    }
    Contact.prototype.createUrl = function (options, id) {
        options = options || {};
        var root = '/account/~/extension/' +
            (options.extensionId ? options.extensionId : '~') +
            '/address-book';
        if (options.sync)
            return root + '-sync';
        return root +
            (options.groupId ? '/group/' + options.groupId + '/contact' : '/contact') +
            (id ? '/' + id : '');
    };
    /**
     * Returns all values of the given fields if value exists
     */
    Contact.prototype.getFieldValues = function (where, fields, asHash) {
        return fields.reduce(function (result, field) {
            if (where && where[field]) {
                if (asHash) {
                    result[field] = where[field];
                }
                else {
                    result.push(where[field]);
                }
            }
            return result;
        }, asHash ? {} : []);
    };
    Contact.prototype.getFullName = function (contact) {
        return this.getFieldValues(contact, this.nameFields).join(' ');
    };
    Contact.prototype.getEmails = function (contact, asHash) {
        return this.getFieldValues(contact, this.emailFields, asHash);
    };
    Contact.prototype.getPhones = function (contact, asHash) {
        return this.getFieldValues(contact, this.phoneFields, asHash);
    };
    Contact.prototype.getFaxes = function (contact, asHash) {
        return this.getFieldValues(contact, this.faxFields, asHash);
    };
    Contact.prototype.getAddresses = function (contact, asHash) {
        return this.getFieldValues(contact, this.addressFields, asHash);
    };
    Contact.prototype.isAlive = function (contact) {
        return (contact.availability == 'Alive');
    };
    /**
     * Matches a contact against a given string, returns null if nothing found
     */
    Contact.prototype.match = function (contact, string, options) {
        var _this = this;
        options = this.utils.extend({
            fields: [].concat(this.nameFields, this.emailFields, this.phoneFields, this.faxFields, this.otherFields),
            inAddresses: true,
            transformFn: function (value, options) {
                return value ? value.toString().toLocaleLowerCase() : '';
            },
            strict: false
        }, options);
        string = options.transformFn(string, options);
        var found = null;
        if (!string)
            return found;
        var matchWith = function (value) {
            // skip unnecessary cycles if match has been found
            if (found)
                return;
            var transformed = options.transformFn(value, options);
            if (!transformed)
                return;
            var match = (options.strict ? transformed == string : transformed.indexOf(string) > -1);
            if (match)
                found = value;
        };
        // Search in fields
        options.fields.forEach(function (field) {
            matchWith(contact[field]);
        });
        // Search in addresses, skip unnecessary cycles if match has been found
        if (options.inAddresses && !found)
            this.addressFields.forEach(function (field) {
                // skip unnecessary cycles if match has been found or no field value
                if (!contact[field] || found)
                    return;
                _this.addressSubFields.forEach(function (subField) {
                    matchWith(contact[field][subField]);
                });
            });
        return found;
    };
    /**
     * Matches a contact against a given phone number, returns null if nothing found
     */
    Contact.prototype.matchAsPhone = function (contact, phone, options) {
        return this.match(contact, phone, this.utils.extend({
            fields: [].concat(this.phoneFields, this.faxFields),
            inAddresses: false,
            transformFn: function (value, options) {
                return value ? value.toString().replace(/[^\d\w]/ig, '') : ''; //TODO Trickier removal reqired;
            },
            strict: false
        }, options));
    };
    /**
     * Injects contact field with appropriate {IContact} data structure into all given {ICallerInfo}
     * Warning, this function may be performance-consuming, reduce the amount of items passed to contacts and callerInfos
     */
    Contact.prototype.attachToCallerInfos = function (callerInfos, contacts, options) {
        var self = this, callerInfoIndex = this.index(callerInfos, function (callerInfo) {
            return callerInfo.phoneNumber;
        }, true);
        this.utils.forEach(callerInfoIndex, function (indexedCallerInfos, phoneNumber) {
            var foundContact = null, foundPhone = null;
            contacts.some(function (contact) {
                foundPhone = self.matchAsPhone(contact, phoneNumber, options);
                if (foundPhone)
                    foundContact = contact;
                return foundPhone;
            });
            if (foundContact) {
                indexedCallerInfos.forEach(function (callerInfo) {
                    callerInfo.contact = foundContact;
                    callerInfo.contactPhone = foundPhone;
                });
            }
        });
    };
    Contact.prototype.comparator = function (options) {
        var _this = this;
        return this.list.comparator(this.utils.extend({
            extractFn: function (contact, options) {
                return _this.getFullName(contact);
            }
        }, options));
    };
    /**
     * TODO Add filtering by group http://jira.ringcentral.com/browse/SDK-4
     */
    Contact.prototype.filter = function (options) {
        var _this = this;
        options = this.utils.extend({
            alive: true,
            startsWith: '',
            phonesOnly: false,
            faxesOnly: false
        }, options);
        return this.list.filter([
            { condition: options.alive, filterFn: this.isAlive },
            { condition: options.startsWith, filterFn: function (item, opts) { return _this.match(item, opts.condition); } },
            { condition: options.phonesOnly, filterFn: function (item, opts) { return (_this.getPhones(item).length > 0); } },
            { condition: options.faxesOnly, filterFn: function (item, opts) { return (_this.getFaxes(item).length > 0); } }
        ]);
    };
    Contact.prototype.validate = function (item) {
        return this.validator.validate([
            { field: 'firstName', validator: this.validator.required(item.firstName) },
            { field: 'lastName', validator: this.validator.required(item.lastName) },
            { field: 'email', validator: this.validator.email(item.email) },
            { field: 'email2', validator: this.validator.email(item.email2) },
            { field: 'email3', validator: this.validator.email(item.email3) }
        ]);
    };
    return Contact;
})(helper.Helper);
exports.Contact = Contact;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

/// <reference path="../externals.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var helper = __webpack_require__(6);
var ContactGroup = (function (_super) {
    __extends(ContactGroup, _super);
    function ContactGroup() {
        _super.apply(this, arguments);
    }
    ContactGroup.prototype.createUrl = function (options, id) {
        return '/account/~/extension/~/address-book/group' + (id ? '/' + id : '');
    };
    ContactGroup.prototype.validate = function (item) {
        return this.validator.validate([
            { field: 'groupName', validator: this.validator.required(item && item.groupName) }
        ]);
    };
    return ContactGroup;
})(helper.Helper);
exports.ContactGroup = ContactGroup;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

/// <reference path="../externals.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var helper = __webpack_require__(6);
var Conferencing = (function (_super) {
    __extends(Conferencing, _super);
    function Conferencing() {
        _super.apply(this, arguments);
    }
    Conferencing.prototype.createUrl = function () {
        return '/account/~/extension/~/conferencing';
    };
    return Conferencing;
})(helper.Helper);
exports.Conferencing = Conferencing;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

/// <reference path="../externals.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var helper = __webpack_require__(6);
var Country = (function (_super) {
    __extends(Country, _super);
    function Country() {
        _super.apply(this, arguments);
    }
    Country.prototype.createUrl = function (options, id) {
        return '/dictionary/country';
    };
    return Country;
})(helper.Helper);
exports.Country = Country;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

/// <reference path="../externals.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var helper = __webpack_require__(6);
var Device = (function (_super) {
    __extends(Device, _super);
    function Device(utils, validator, list, extension, deviceModel) {
        _super.call(this, utils, validator, list);
        this.extension = extension;
        this.deviceModel = deviceModel;
    }
    Device.prototype.createUrl = function (options, id) {
        options = options || {};
        if (options.order)
            return '/account/~/order';
        return '/account/~' +
            (options.extensionId ? '/extension/' + options.extensionId : '') +
            '/device' +
            (id ? '/' + id : '');
    };
    /**
     * @param {IDevice} item
     */
    Device.prototype.validate = function (item) {
        return this.validator.validate([
            {
                field: 'emergencyServiceAddress-street',
                validator: this.validator.required(item && item.emergencyServiceAddress && item.emergencyServiceAddress.street)
            },
            {
                field: 'emergencyServiceAddress-city',
                validator: this.validator.required(item && item.emergencyServiceAddress && item.emergencyServiceAddress.city)
            },
            {
                field: 'emergencyServiceAddress-state',
                validator: this.validator.required(item && item.emergencyServiceAddress && item.emergencyServiceAddress.state)
            },
            {
                field: 'emergencyServiceAddress-country',
                validator: this.validator.required(item && item.emergencyServiceAddress && item.emergencyServiceAddress.country)
            },
            {
                field: 'emergencyServiceAddress-zip',
                validator: this.validator.required(item && item.emergencyServiceAddress && item.emergencyServiceAddress.zip)
            },
            {
                field: 'emergencyServiceAddress-customerName',
                validator: this.validator.required(item && item.emergencyServiceAddress && item.emergencyServiceAddress.customerName)
            },
            { field: 'extension', validator: this.validator.required(this.extension.getId(item && item.extension)) },
            { field: 'model', validator: this.validator.required(this.deviceModel.getId(item && item.model)) }
        ]);
    };
    return Device;
})(helper.Helper);
exports.Device = Device;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

/// <reference path="../externals.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var helper = __webpack_require__(6);
var DeviceModel = (function (_super) {
    __extends(DeviceModel, _super);
    function DeviceModel() {
        _super.apply(this, arguments);
    }
    DeviceModel.prototype.getId = function (device) {
        return device ? device.sku : null;
    };
    DeviceModel.prototype.createUrl = function (options, id) {
        return '/dictionary/device';
    };
    return DeviceModel;
})(helper.Helper);
exports.DeviceModel = DeviceModel;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

/// <reference path="../externals.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var helper = __webpack_require__(6);
var Extension = (function (_super) {
    __extends(Extension, _super);
    function Extension() {
        _super.apply(this, arguments);
        this.type = {
            department: 'Department',
            user: 'User',
            announcement: 'Announcement',
            voicemail: 'Voicemail'
        };
    }
    Extension.prototype.createUrl = function (options, id) {
        options = options || {};
        return '/account/~' +
            (options.departmentId ? '/department/' + options.departmentId + '/members' : '/extension') +
            (id ? '/' + id : '');
    };
    Extension.prototype.isUser = function (extension) {
        return extension && extension.type == this.type.user;
    };
    Extension.prototype.isDepartment = function (extension) {
        return extension && extension.type == this.type.department;
    };
    Extension.prototype.isAnnouncement = function (extension) {
        return extension && extension.type == this.type.announcement;
    };
    Extension.prototype.isVoicemail = function (extension) {
        return extension && extension.type == this.type.voicemail;
    };
    Extension.prototype.comparator = function (options) {
        return this.list.comparator(this.utils.extend({
            sortBy: 'extensionNumber',
            compareFn: this.list.numberComparator
        }, options));
    };
    Extension.prototype.filter = function (options) {
        options = this.utils.extend({
            search: '',
            type: ''
        }, options);
        return this.list.filter([
            { filterBy: 'type', condition: options.type },
            {
                condition: options.search.toLocaleLowerCase(),
                filterFn: this.list.containsFilter,
                extractFn: function (item) {
                    return (item.name && (item.name.toLocaleLowerCase() + ' ')) +
                        (item.extensionNumber && item.extensionNumber.toString().toLocaleLowerCase());
                }
            }
        ]);
    };
    return Extension;
})(helper.Helper);
exports.Extension = Extension;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

/// <reference path="../externals.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var helper = __webpack_require__(6);
var ForwardingNumber = (function (_super) {
    __extends(ForwardingNumber, _super);
    function ForwardingNumber() {
        _super.apply(this, arguments);
    }
    ForwardingNumber.prototype.createUrl = function (options, id) {
        options = options || {};
        return '/account/~/extension/' + (options.extensionId || '~') + '/forwarding-number' + (id ? '/' + id : '');
    };
    ForwardingNumber.prototype.getId = function (forwardingNumber) {
        return forwardingNumber && (forwardingNumber.id || (forwardingNumber.phoneNumber)); //TODO @exceptionalCase
    };
    ForwardingNumber.prototype.hasFeature = function (phoneNumber, feature) {
        return (!!phoneNumber && !!phoneNumber.features && phoneNumber.features.indexOf(feature) != -1);
    };
    ForwardingNumber.prototype.comparator = function (options) {
        return this.list.comparator(this.utils.extend({
            sortBy: 'label'
        }, options));
    };
    ForwardingNumber.prototype.filter = function (options) {
        var _this = this;
        options = this.utils.extend({
            features: []
        }, options);
        return this.list.filter([{
                condition: options.features.length,
                filterFn: function (item) {
                    return options.features.some(function (feature) {
                        return _this.hasFeature(item, feature);
                    });
                }
            }]);
    };
    return ForwardingNumber;
})(helper.Helper);
exports.ForwardingNumber = ForwardingNumber;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

/// <reference path="../externals.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var helper = __webpack_require__(6);
var Language = (function (_super) {
    __extends(Language, _super);
    function Language() {
        _super.apply(this, arguments);
    }
    Language.prototype.createUrl = function (options, id) {
        return '/dictionary/language';
    };
    return Language;
})(helper.Helper);
exports.Language = Language;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

/// <reference path="../externals.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var helper = __webpack_require__(6);
var Location = (function (_super) {
    __extends(Location, _super);
    function Location(utils, validator, list, state) {
        _super.call(this, utils, validator, list);
        this.state = state;
    }
    Location.prototype.createUrl = function () {
        return '/dictionary/location';
    };
    Location.prototype.filter = function (options) {
        var _this = this;
        var uniqueNPAs = [];
        options = this.utils.extend({
            stateId: '',
            onlyUniqueNPA: false
        }, options);
        return this.list.filter([
            {
                condition: options.stateId,
                filterFn: function (item, opts) {
                    return (_this.state.getId(item.state) == opts.condition);
                }
            },
            {
                condition: options.onlyUniqueNPA,
                filterFn: function (item, opts) {
                    if (uniqueNPAs.indexOf(item.npa) == -1) {
                        uniqueNPAs.push(item.npa);
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
        ]);
    };
    Location.prototype.comparator = function (options) {
        options = this.utils.extend({
            sortBy: 'npa'
        }, options);
        if (options.sortBy == 'nxx') {
            options.extractFn = function (item) {
                return (parseInt(item.npa) * 1000000) + parseInt(item.nxx);
            };
            options.compareFn = this.list.numberComparator;
        }
        return this.list.comparator(options);
    };
    return Location;
})(helper.Helper);
exports.Location = Location;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

/// <reference path="../externals.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var helper = __webpack_require__(6);
var Message = (function (_super) {
    __extends(Message, _super);
    function Message(utils, validator, list, contact) {
        _super.call(this, utils, validator, list);
        this.contact = contact;
    }
    /**
     *
     * @exceptionalCase Different endpoint when creating SMS/Pager
     */
    Message.prototype.createUrl = function (options, id) {
        options = options || {};
        var root = '/account/~/extension/' + (options.extensionId || '~');
        if (options.fax)
            return root + '/fax';
        if (options.sms)
            return root + '/sms';
        if (options.pager)
            return root + '/company-pager';
        if (options.sync)
            return root + '/message-sync';
        return root + '/message-store' + (id ? '/' + id : '');
    };
    Message.prototype.isInbound = function (message) {
        return (message && message.direction == 'Inbound');
    };
    Message.prototype.isOutbound = function (message) {
        return !this.isInbound(message);
    };
    Message.prototype.isSMS = function (message) {
        return (message && message.type == 'SMS');
    };
    Message.prototype.isPager = function (message) {
        return (message && message.type == 'Pager');
    };
    Message.prototype.isVoiceMail = function (message) {
        return (message && message.type == 'VoiceMail');
    };
    Message.prototype.isFax = function (message) {
        return (message && message.type == 'Fax');
    };
    Message.prototype.isAlive = function (message) {
        //return (this.availability != 'Deleted' && this.availability != 'Purged');
        return (message && message.availability == 'Alive');
    };
    Message.prototype.isRead = function (message) {
        return (message.readStatus == 'Read');
    };
    Message.prototype.setIsRead = function (message, isRead) {
        message.readStatus = (!!isRead) ? 'Read' : 'Unread';
        return message;
    };
    Message.prototype.getAttachmentContentType = function (message, i) {
        return message.attachments[i] ? message.attachments[i].contentType : '';
    };
    Message.prototype.addEventToSubscription = function (subscription, options) {
        return subscription.setEventFilters([this.createUrl(options)]);
    };
    /**
     * Returns from-phones if inbound (oterwise to-phones)
     */
    Message.prototype.getCallerInfos = function (message) {
        return this.isInbound(message) ? [message.from] : message.to;
    };
    /**
     * Returns first from-phones if inbound (oterwise to-phones), then vice-versa
     */
    Message.prototype.getAllCallerInfos = function (message) {
        return this.getCallerInfos(message).concat(this.isInbound(message) ? message.to : [message.from]);
    };
    /**
     * TODO Compare as dates
     */
    Message.prototype.comparator = function (options) {
        return this.list.comparator(this.utils.extend({
            sortBy: 'creationTime'
        }, options));
    };
    Message.prototype.filter = function (options) {
        options = this.utils.extend({
            search: '',
            alive: true,
            direction: '',
            conversationId: '',
            readStatus: ''
        }, options);
        return this.list.filter([
            { condition: options.alive, filterFn: this.isAlive },
            { filterBy: 'type', condition: options.type },
            { filterBy: 'direction', condition: options.direction },
            { filterBy: 'conversationId', condition: options.conversationId },
            { filterBy: 'readStatus', condition: options.readStatus },
            { filterBy: 'subject', condition: options.search, filterFn: this.list.containsFilter }
        ]);
    };
    /**
     * Injects contact field with appropriate {IContact} data structure into all callerInfos found in all messages
     * Warning, this function may be performance-consuming, reduce the amount of items passed to contacts and messages
     */
    Message.prototype.attachContacts = function (contacts, messages, options) {
        var self = this;
        // Flatten all caller infos from all messages
        var callerInfos = messages.reduce(function (callerInfos, message) {
            return callerInfos.concat(self.getAllCallerInfos(message));
        }, []);
        this.contact.attachToCallerInfos(callerInfos, contacts, options);
    };
    Message.prototype.shorten = function (message) {
        return {
            from: message.from,
            to: message.to,
            text: message.subject
        };
    };
    Message.prototype.validateSMS = function (item) {
        return this.validator.validate([
            { field: 'to', validator: this.validator.required(this.utils.getProperty(item, 'to[0].phoneNumber')) },
            { field: 'from', validator: this.validator.required(this.utils.getProperty(item, 'from.phoneNumber')) },
            { field: 'subject', validator: this.validator.required(this.utils.getProperty(item, 'subject')) },
            { field: 'subject', validator: this.validator.length(this.utils.getProperty(item, 'subject'), 160) }
        ]);
    };
    Message.prototype.validatePager = function (item) {
        return this.validator.validate([
            { field: 'to', validator: this.validator.required(this.utils.getProperty(item, 'to.extensionNumber')) },
            { field: 'from', validator: this.validator.required(this.utils.getProperty(item, 'from.extensionNumber')) },
            { field: 'subject', validator: this.validator.required(this.utils.getProperty(item, 'subject')) },
            { field: 'subject', validator: this.validator.length(this.utils.getProperty(item, 'subject'), 160) }
        ]);
    };
    return Message;
})(helper.Helper);
exports.Message = Message;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

/// <reference path="../externals.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var helper = __webpack_require__(6);
var PhoneNumber = (function (_super) {
    __extends(PhoneNumber, _super);
    function PhoneNumber() {
        _super.apply(this, arguments);
        this.tollFreeAreaCodes = ['800', '844', '855', '866', '877', '888'];
    }
    PhoneNumber.prototype.createUrl = function (options, id) {
        options = options || {};
        if (options.lookup)
            return '/number-pool/lookup';
        return '/account/~' +
            (options.extensionId ? '/extension/' + options.extensionId : '') +
            '/phone-number' +
            (id ? '/' + id : '');
    };
    PhoneNumber.prototype.isSMS = function (phoneNumber) {
        return this.hasFeature(phoneNumber, 'SmsSender');
    };
    PhoneNumber.prototype.hasFeature = function (phoneNumber, feature) {
        return (!!phoneNumber.features && phoneNumber.features.indexOf(feature) != -1);
    };
    PhoneNumber.prototype.reserve = function (phoneNumber, date) {
        phoneNumber.reservedTill = new Date(date).toISOString();
    };
    PhoneNumber.prototype.unreserve = function (phoneNumber) {
        phoneNumber.reservedTill = null;
    };
    PhoneNumber.prototype.comparator = function (options) {
        return this.list.comparator(this.utils.extend({
            extractFn: function (item) {
                return item.usageType + '-' +
                    item.paymentType + '-' +
                    item.type;
            }
        }, options));
    };
    /**
     * TODO Add other filtering methods http://jira.ringcentral.com/browse/SDK-5
     */
    PhoneNumber.prototype.filter = function (options) {
        var _this = this;
        options = this.utils.extend({
            usageType: '',
            paymentType: '',
            type: '',
            features: []
        }, options);
        return this.list.filter([
            { filterBy: 'usageType', condition: options.usageType },
            { filterBy: 'paymentType', condition: options.paymentType },
            { filterBy: 'type', condition: options.type },
            {
                condition: options.features.length,
                filterFn: function (item) {
                    return options.features.some(function (feature) {
                        return _this.hasFeature(item, feature);
                    });
                }
            }
        ]);
    };
    return PhoneNumber;
})(helper.Helper);
exports.PhoneNumber = PhoneNumber;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

/// <reference path="../externals.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var helper = __webpack_require__(6);
var Presence = (function (_super) {
    __extends(Presence, _super);
    function Presence(utils, validator, list, extension) {
        _super.call(this, utils, validator, list);
        this.extension = extension;
    }
    Presence.prototype.createUrl = function (options, id) {
        options = options || {};
        return '/account/~/extension/' + (id || '~') + '/presence' + (options.detailed ? '?detailedTelephonyState=true' : '');
    };
    Presence.prototype.getId = function (presence) {
        return presence && (this.extension.getId(presence.extension) || presence.extensionId);
    };
    Presence.prototype.isAvailable = function (presence) {
        return presence && presence.presenceStatus == 'Available';
    };
    Presence.prototype.addEventToSubscription = function (subscription, options, id) {
        return subscription.setEventFilters([this.createUrl(options, id)]);
    };
    Presence.prototype.updateSubscription = function (subscription, //TODO Type
        presences, options) {
        var _this = this;
        var events = presences.map(this.getId, this).map(function (id) {
            return _this.createUrl(options, id);
        }, this);
        subscription.addEventFilters(events);
        return subscription;
    };
    Presence.prototype.attachToExtensions = function (extensions, presences, merge) {
        var _this = this;
        var index = this.index(presences);
        extensions.forEach(function (ex) {
            var presence = index[_this.extension.getId(ex)];
            if (presence) {
                if ('presence' in ex && merge) {
                    _this.utils.extend(ex.presence, presence);
                }
                else {
                    ex.presence = presence;
                }
            }
        }, this);
        return this;
    };
    Presence.prototype.isCallInProgress = function (presenceCall) {
        return (presenceCall && presenceCall.telephonyStatus != 'NoCall');
    };
    return Presence;
})(helper.Helper);
exports.Presence = Presence;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

/// <reference path="../externals.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var helper = __webpack_require__(6);
var Ringout = (function (_super) {
    __extends(Ringout, _super);
    function Ringout() {
        _super.apply(this, arguments);
    }
    Ringout.prototype.createUrl = function (options, id) {
        options = options || {};
        return '/account/~/extension/' + (options.extensionId || '~') + '/ringout' + (id ? '/' + id : '');
    };
    Ringout.prototype.resetAsNew = function (object) {
        object = _super.prototype.resetAsNew.call(this, object);
        if (object) {
            delete object.status;
        }
        return object;
    };
    Ringout.prototype.isInProgress = function (ringout) {
        return ringout && !this.isNew(ringout) && ringout.status && ringout.status.callStatus == 'InProgress';
    };
    Ringout.prototype.isSuccess = function (ringout) {
        return ringout && !this.isNew(ringout) && ringout.status && ringout.status.callStatus == 'Success';
    };
    Ringout.prototype.isError = function (ringout) {
        return !this.isNew(ringout) && !this.isInProgress(ringout) && !this.isSuccess(ringout);
    };
    Ringout.prototype.validate = function (item) {
        return this.validator.validate([
            { field: 'to', validator: this.validator.required(item && item.to && item.to.phoneNumber) },
            { field: 'from', validator: this.validator.required(item && item.from && item.from.phoneNumber) }
        ]);
    };
    return Ringout;
})(helper.Helper);
exports.Ringout = Ringout;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

/// <reference path="../externals.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var helper = __webpack_require__(6);
var Service = (function (_super) {
    __extends(Service, _super);
    function Service() {
        _super.apply(this, arguments);
        this.isSmsEnabled = this.isServiceFeatureEnabledMethod('SMS');
        this.isSmsReceivingEnabled = this.isServiceFeatureEnabledMethod('SMSReceiving');
        this.isPresenceEnabled = this.isServiceFeatureEnabledMethod('Presence');
        this.isRingOutEnabled = this.isServiceFeatureEnabledMethod('RingOut');
        this.isInternationalCallingEnabled = this.isServiceFeatureEnabledMethod('InternationalCalling');
        this.isDndEnabled = this.isServiceFeatureEnabledMethod('DND');
        this.isFaxEnabled = this.isServiceFeatureEnabledMethod('Fax');
        this.isFaxReceivingEnabled = this.isServiceFeatureEnabledMethod('FaxReceiving');
        this.isVoicemailEnabled = this.isServiceFeatureEnabledMethod('Voicemail');
        this.isPagerEnabled = this.isServiceFeatureEnabledMethod('Pager');
        this.isPagerReceivingEnabled = this.isServiceFeatureEnabledMethod('PagerReceiving');
        this.isVoipCallingEnabled = this.isServiceFeatureEnabledMethod('VoipCalling');
        this.isVideoConferencingEnabled = this.isServiceFeatureEnabledMethod('VideoConferencing');
        this.isSalesForceEnabled = this.isServiceFeatureEnabledMethod('SalesForce');
        this.isIntercomEnabled = this.isServiceFeatureEnabledMethod('Intercom');
        this.isPagingEnabled = this.isServiceFeatureEnabledMethod('Paging');
        this.isConferencingEnabled = this.isServiceFeatureEnabledMethod('Conferencing');
        this.isFreeSoftPhoneLinesEnabled = this.isServiceFeatureEnabledMethod('FreeSoftPhoneLines');
        this.isHipaaComplianceEnabled = this.isServiceFeatureEnabledMethod('HipaaCompliance');
        this.isCallParkEnabled = this.isServiceFeatureEnabledMethod('CallPark');
        this.isOnDemandCallRecordingEnabled = this.isServiceFeatureEnabledMethod('OnDemandCallRecording');
    }
    Service.prototype.createUrl = function () {
        return '/account/~/service-info';
    };
    Service.prototype.isEnabled = function (feature, serviceFeatures) {
        return serviceFeatures.reduce(function (value, f) {
            if (f.featureName == feature)
                value = f.enabled;
            return value;
        }, false);
    };
    Service.prototype.isServiceFeatureEnabledMethod = function (feature) {
        var _this = this;
        return function (serviceFeatures) {
            return _this.isEnabled(feature, serviceFeatures);
        };
    };
    return Service;
})(helper.Helper);
exports.Service = Service;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

/// <reference path="../externals.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var helper = __webpack_require__(6);
var ShippingMethod = (function (_super) {
    __extends(ShippingMethod, _super);
    function ShippingMethod() {
        _super.apply(this, arguments);
    }
    /**
     * TODO Add or describe options http://jira.ringcentral.com/browse/SDK-3 id done
     */
    ShippingMethod.prototype.createUrl = function () {
        return '/dictionary/shipping-options';
    };
    return ShippingMethod;
})(helper.Helper);
exports.ShippingMethod = ShippingMethod;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

/// <reference path="../externals.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var helper = __webpack_require__(6);
var State = (function (_super) {
    __extends(State, _super);
    function State(utils, validator, list, country) {
        _super.call(this, utils, validator, list);
        this.country = country;
    }
    State.prototype.createUrl = function () {
        return '/dictionary/state';
    };
    State.prototype.filter = function (options) {
        var _this = this;
        options = this.utils.extend({
            countryId: ''
        }, options);
        return this.list.filter([
            {
                condition: options.countryId,
                filterFn: function (item, opts) {
                    return (_this.country.getId(item.country) == opts.condition);
                }
            }
        ]);
    };
    return State;
})(helper.Helper);
exports.State = State;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

/// <reference path="../externals.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var helper = __webpack_require__(6);
var Timezone = (function (_super) {
    __extends(Timezone, _super);
    function Timezone() {
        _super.apply(this, arguments);
    }
    Timezone.prototype.createUrl = function () {
        return '/dictionary/timezone';
    };
    return Timezone;
})(helper.Helper);
exports.Timezone = Timezone;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=ringcentral-helpers.js.map