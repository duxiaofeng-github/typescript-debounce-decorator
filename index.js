'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function cancel(func) {
    if (func && func.options) {
        clearTimeout(func.options.timer);
    }
}
function getWrapper(debounceTime, leading, originalMethod, that) {
    var options = {
        timer: undefined,
        lastArgs: []
    };
    var rewriteFunc = function () {
        var _this = this;
        var rewriteArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rewriteArgs[_i] = arguments[_i];
        }
        options.lastArgs = rewriteArgs;
        if (!options.timer) {
            if (leading)
                originalMethod.apply(this, options.lastArgs);
            options.timer = setTimeout(function () {
                if (!leading)
                    originalMethod.apply(_this, options.lastArgs);
                options.timer = undefined;
            }, debounceTime);
        }
        else {
            clearTimeout(options.timer);
            options.timer = setTimeout(function () {
                if (!leading)
                    originalMethod.apply(_this, options.lastArgs);
                options.timer = undefined;
            }, debounceTime);
        }
    };
    if (that) {
        rewriteFunc = rewriteFunc.bind(that);
    }
    rewriteFunc.options = options;
    return rewriteFunc;
}
function defineProperty(debounceTime, leading, target, name) {
    var wrapperFunc;
    Object.defineProperty(target, name, {
        configurable: true,
        enumerable: false,
        get: function () {
            return wrapperFunc;
        },
        set: function (value) {
            wrapperFunc = getWrapper(debounceTime, leading, value, this);
        }
    });
}
function modifyDescriptor(debounceTime, leading, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = getWrapper(debounceTime, leading, originalMethod);
    return descriptor;
}
function createDebounce(debounceTime, leading) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (args.length === 0)
        throw new Error("function applied debounce decorator should be a method");
    if (args.length === 1)
        throw new Error("method applied debounce decorator should have valid name");
    var target = args[0], name = args[1];
    var descriptor = args.length === 3 && args[2]
        ? args[2]
        : Object.getOwnPropertyDescriptor(target, name);
    if (descriptor) {
        return modifyDescriptor(debounceTime, leading, descriptor);
    }
    else {
        // property method has no descriptor to return;
        defineProperty(debounceTime, leading, target, name);
    }
}
function debounce() {
    var opts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        opts[_i] = arguments[_i];
    }
    var debounceTime = 500;
    var leading = true;
    if (opts.length &&
        (typeof opts[0] === "number" ||
            (typeof opts[0] === "object" && opts[0].leading !== undefined))) {
        if (typeof opts[0] === "number")
            debounceTime = opts[0];
        var options = void 0;
        if (typeof opts[0] === "object" && opts[0].leading !== undefined)
            options = opts[0];
        if (opts.length > 1 &&
            typeof opts[1] === "object" &&
            opts[1].leading !== undefined)
            options = opts[1];
        if (options)
            leading = options.leading;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return createDebounce.apply(void 0, [debounceTime, leading].concat(args));
        };
    }
    return createDebounce.apply(void 0, [debounceTime, leading].concat(opts));
}

exports.cancel = cancel;
exports.debounce = debounce;
