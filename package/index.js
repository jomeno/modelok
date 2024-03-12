var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
define("validate", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var initLength = function (params) {
        if (params === void 0) { params = {}; }
        var minLength = 1;
        var maxLength = 50;
        if (params.minLength) {
            minLength = params.minLength;
        }
        if (params.maxLength) {
            maxLength = params.maxLength;
        }
        return __assign(__assign({}, params), { minLength: minLength, maxLength: maxLength });
    };
    var validate = function (model, errors) {
        if (errors === void 0) { errors = {}; }
        return {
            done: function () {
                if (Object.keys(errors).length > 0) {
                    model = __assign(__assign({}, model), { errors: errors });
                }
                return model;
            },
            require: function (field, params) {
                if (params === void 0) { params = {}; }
                var value = model[field];
                if (!value) {
                    var errorMessage = "The ".concat(field, " field is required");
                    if (params.message) {
                        errorMessage = params.message;
                    }
                    errors = addToErrors(field, errorMessage, errors);
                }
                return validate(model, errors);
            },
            length: function (field, params) {
                var newParams = initLength(params);
                var value = model[field];
                var pattern = "^.{".concat(newParams.minLength, ",").concat(newParams.maxLength, "}$");
                var regExp = new RegExp(pattern);
                var isValid = regExp.test(value);
                if (isValid === false) {
                    var errorMessage = "Invalid length for ".concat(field);
                    if (newParams.message) {
                        errorMessage = newParams.message;
                    }
                    errors = addToErrors(field, errorMessage, errors);
                }
                return validate(model, errors);
            }
        };
    };
    var addToErrors = function (field, errorMessage, errors) {
        var existingErrors = [];
        if (Array.isArray(errors[field])) {
            existingErrors = errors[field];
        }
        errors[field] = __spreadArray(__spreadArray([], existingErrors, true), [errorMessage], false);
        return errors;
    };
    exports.default = validate;
});
//# sourceMappingURL=index.js.map