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
    var Display3D = Pan3d.Display3D;
    var TooBaseModelLevel = /** @class */ (function (_super) {
        __extends(TooBaseModelLevel, _super);
        function TooBaseModelLevel(value) {
            var _this = _super.call(this) || this;
            _this.parent = value;
            return _this;
        }
        TooBaseModelLevel.prototype.isHit = function (mouseVect2d) {
        };
        TooBaseModelLevel.prototype.onMouseDown = function (mouseVect2d) {
        };
        TooBaseModelLevel.prototype.onMouseUp = function (mouseVect2d) {
        };
        TooBaseModelLevel.prototype.onMouseMove = function (mouseVect2d) {
        };
        TooBaseModelLevel.prototype.testHitTemp = function (display3D, v2d, vec) {
            var hit = xyz.TooMathHitModel.testHitModel(display3D, this._scene, v2d);
            display3D.colorVect = hit ? vec[0] : vec[1];
        };
        TooBaseModelLevel.prototype.update = function () {
            this.posMatrix.identity();
            var dis = this.parent.lookLenToFocu / 100;
            this.posMatrix.appendScale(dis, dis, dis);
        };
        return TooBaseModelLevel;
    }(Display3D));
    xyz.TooBaseModelLevel = TooBaseModelLevel;
})(xyz || (xyz = {}));
//# sourceMappingURL=TooBaseModelLevel.js.map