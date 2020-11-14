var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ScenePortal = /** @class */ (function (_super) {
    __extends(ScenePortal, _super);
    function ScenePortal() {
        var _this = _super.call(this) || this;
        _this.shadow = false;
        return _this;
    }
    ScenePortal.prototype.removeStage = function () {
        _super.prototype.removeStage.call(this);
    };
    ScenePortal.prototype.showBlood = function ($colorType) {
        if ($colorType === void 0) { $colorType = 0; }
    };
    ScenePortal.prototype.setAvatar = function (num) {
        this.addPart("abc", "cde", getModelUrl(String(num)));
        this.tittleHeight = 20;
    };
    ScenePortal.prototype.addStage = function () {
        _super.prototype.addStage.call(this);
    };
    ScenePortal.prototype.mouseClik = function ($lineA, $lineB) {
        var $pos = Scene_data.cam3D.cameraMatrix.transformVector(this.getCurrentPos());
        if ($pos.z < Scene_data.cam3D.distance / 3) {
            return null;
        }
        var hitVec2 = MathUtil.math3DWorldtoDisplay2DPos($lineB);
        var centVec2 = MathUtil.math3DWorldtoDisplay2DPos(this.posMatrix.position);
        if (this.tb.hitarray && this.tb.hitarray.length == 4) {
            var $rect = new Rectangle(this.tb.hitarray[0], this.tb.hitarray[1], this.tb.hitarray[2], this.tb.hitarray[3]);
            if (hitVec2.x > (centVec2.x + $rect.x - $rect.width) && hitVec2.x < (centVec2.x + $rect.x + $rect.width)) {
                if (hitVec2.y > (centVec2.y + $rect.y - $rect.height) && hitVec2.y < (centVec2.y + $rect.y + $rect.height)) {
                    return true;
                }
            }
        }
        else {
            if (Vector2D.distance(hitVec2, centVec2) < 20) {
                return true;
            }
        }
        return false;
    };
    return ScenePortal;
}(SceneChar));
//# sourceMappingURL=ScenePortal.js.map