var Pan3d;
(function (Pan3d) {
    var Vector2D = /** @class */ (function () {
        function Vector2D($x, $y) {
            if ($x === void 0) { $x = 0; }
            if ($y === void 0) { $y = 0; }
            this.x = 0;
            this.y = 0;
            this.x = $x;
            this.y = $y;
        }
        Vector2D.prototype.normalize = function () {
            var le = this.length;
            if (le == 0) {
                return;
            }
            this.scaleBy(1 / le);
        };
        Object.defineProperty(Vector2D.prototype, "length", {
            get: function () {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            },
            enumerable: true,
            configurable: true
        });
        Vector2D.prototype.scaleBy = function (value) {
            this.x *= value;
            this.y *= value;
        };
        Vector2D.prototype.sub = function (val) {
            return new Vector2D(val.x - this.x, val.y - this.y);
        };
        Vector2D.prototype.add = function (val) {
            return new Vector2D(val.x + this.x, val.y + this.y);
        };
        Vector2D.prototype.toString = function () {
            return "Vector2D(" + String(this.x) + "," + String(this.y) + ")";
        };
        Vector2D.distance = function (p1, p2) {
            var xx = p1.x - p2.x;
            var yy = p1.y - p2.y;
            return Math.sqrt(xx * xx + yy * yy);
        };
        Vector2D.prototype.subtract = function (value) {
            return new Vector2D(this.x - value.x, this.y - value.y);
        };
        return Vector2D;
    }());
    Pan3d.Vector2D = Vector2D;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Vector2D.js.map