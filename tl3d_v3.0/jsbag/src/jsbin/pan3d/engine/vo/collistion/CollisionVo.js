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
var Pan3d;
(function (Pan3d) {
    var CollisionVo = /** @class */ (function (_super) {
        __extends(CollisionVo, _super);
        function CollisionVo($x, $y, $z) {
            if ($x === void 0) { $x = 0; }
            if ($y === void 0) { $y = 0; }
            if ($z === void 0) { $z = 0; }
            return _super.call(this) || this;
        }
        return CollisionVo;
    }(Pan3d.Object3D));
    Pan3d.CollisionVo = CollisionVo;
    var CollisionItemVo = /** @class */ (function () {
        function CollisionItemVo() {
        }
        return CollisionItemVo;
    }());
    Pan3d.CollisionItemVo = CollisionItemVo;
    var CollisionType = /** @class */ (function () {
        function CollisionType() {
        }
        CollisionType.Polygon = 0;
        CollisionType.BOX = 1;
        CollisionType.BALL = 2; //球体
        CollisionType.Cylinder = 3; //圆柱
        CollisionType.Cone = 4; //圆锥
        return CollisionType;
    }());
    Pan3d.CollisionType = CollisionType;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=CollisionVo.js.map