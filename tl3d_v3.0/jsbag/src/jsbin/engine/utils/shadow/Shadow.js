var Shadow = /** @class */ (function () {
    function Shadow() {
        this._visible = false;
        this.data = [0, 0, 0, 5];
    }
    Object.defineProperty(Shadow.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (value) {
            this._visible = value;
            this.display.stateChage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shadow.prototype, "x", {
        get: function () {
            return this.data[0];
        },
        set: function (value) {
            this.data[0] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shadow.prototype, "y", {
        get: function () {
            return this.data[1];
        },
        set: function (value) {
            this.data[1] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shadow.prototype, "z", {
        get: function () {
            return this.data[2];
        },
        set: function (value) {
            this.data[2] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shadow.prototype, "size", {
        get: function () {
            return this.data[3];
        },
        set: function (value) {
            this.data[3] = value;
        },
        enumerable: true,
        configurable: true
    });
    return Shadow;
}());
//# sourceMappingURL=Shadow.js.map