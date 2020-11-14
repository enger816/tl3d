var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var xyz;
(function (xyz) {
    var Object3D = Pan3d.Object3D;
    var TooObjectHitBox = /** @class */ (function (_super) {
        __extends(TooObjectHitBox, _super);
        function TooObjectHitBox($x, $y, $z) {
            if ($x === void 0) { $x = 0; }
            if ($y === void 0) { $y = 0; }
            if ($z === void 0) { $z = 0; }
            var _this = _super.call(this, $x, $y, $z) || this;
            _this.beginx = -10;
            _this.beginy = -10;
            _this.beginz = -10;
            _this.endx = 10;
            _this.endy = 10;
            _this.endz = 10;
            return _this;
        }
        return TooObjectHitBox;
    }(Object3D));
    xyz.TooObjectHitBox = TooObjectHitBox;
})(xyz || (xyz = {}));
//# sourceMappingURL=TooObjectHitBox.js.map