var Pan3d;
(function (Pan3d) {
    var Rectangle = /** @class */ (function () {
        function Rectangle($x, $y, $width, $height) {
            if ($x === void 0) { $x = 0; }
            if ($y === void 0) { $y = 0; }
            if ($width === void 0) { $width = 1; }
            if ($height === void 0) { $height = 1; }
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 1;
            this.x = $x;
            this.y = $y;
            this.width = $width;
            this.height = $height;
        }
        Rectangle.prototype.clone = function () {
            return new Rectangle(this.x, this.y, this.width, this.height);
        };
        Rectangle.prototype.sets = function ($x, $y, $width, $height) {
            this.x = $x;
            this.y = $y;
            this.width = $width;
            this.height = $height;
        };
        Rectangle.prototype.setRec = function ($rec) {
            this.x = $rec.x;
            this.y = $rec.y;
            this.width = $rec.width;
            this.height = $rec.height;
        };
        Rectangle.prototype.isHitByPoint = function (tx, ty) {
            return (tx >= this.x && ty >= this.y && tx <= this.x + this.width && ty <= this.y + this.height);
        };
        return Rectangle;
    }());
    Pan3d.Rectangle = Rectangle;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Rectangle.js.map