var Pan3d;
(function (Pan3d) {
    var Circle = /** @class */ (function () {
        function Circle($x, $y, $radius) {
            if ($x === void 0) { $x = 0; }
            if ($y === void 0) { $y = 0; }
            if ($radius === void 0) { $radius = 0; }
            this.setData($x, $y, $radius);
        }
        Circle.prototype.setData = function ($x, $y, $radius) {
            this.x = $x;
            this.y = $y;
            this.radius = $radius;
        };
        Circle.prototype.setPos = function ($x, $y) {
            this.x = $x;
            this.y = $y;
        };
        Object.defineProperty(Circle.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Circle.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
            },
            enumerable: true,
            configurable: true
        });
        Circle.prototype.setRadius = function ($radius) {
            this.radius = $radius;
        };
        Circle.prototype.testPoint = function ($point) {
            var xx = this.x - $point.x;
            var yy = this.y - $point.y;
            return Math.sqrt(xx * xx + yy * yy) < this.radius;
        };
        return Circle;
    }());
    Pan3d.Circle = Circle;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Circle.js.map