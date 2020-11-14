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
var Display3DUISprite = /** @class */ (function (_super) {
    __extends(Display3DUISprite, _super);
    function Display3DUISprite() {
        var _this = _super.call(this) || this;
        _this.uiMatrix = new Matrix3D;
        _this.uiMatrix.prependTranslation(0, 0, 600);
        _this.uiMatrix.prependRotation(-15, Vector3D.X_AXIS);
        _this.uiMatrix.prependRotation(0, Vector3D.Y_AXIS);
        _this.uiViewMatrix = new Matrix3D;
        return _this;
    }
    Display3DUISprite.prototype.loadRes = function ($name) {
        var _this = this;
        if (!this.modelRes) {
            this.modelRes = new ModelRes();
        }
        this.modelRes.load(Scene_data.fileRoot + getModelUrl($name), function () { _this.loadResComFinish(); });
    };
    Display3DUISprite.prototype.loadResComFinish = function () {
        this.setObjUrl(this.modelRes.objUrl);
        this.setMaterialUrl(this.modelRes.materialUrl);
    };
    Display3DUISprite.prototype.loadGroup = function ($name) {
        var _this = this;
        var groupRes = new GroupRes;
        groupRes.load(Scene_data.fileRoot + "model/" + $name + ".txt", function () { _this.loadPartRes(groupRes); });
    };
    Display3DUISprite.prototype.loadPartRes = function (groupRes) {
        for (var i = 0; i < groupRes.dataAry.length; i++) {
            var item = groupRes.dataAry[i];
            if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
            }
            else if (item.types == BaseRes.PREFAB_TYPE) {
                this.setObjUrl(item.objUrl);
                this.setMaterialUrl(item.materialUrl, item.materialInfoArr);
            }
        }
    };
    Display3DUISprite.prototype.resize = function () {
        this.uiViewMatrix.identity();
        this.uiViewMatrix.perspectiveFieldOfViewLH(1, 1, 500, 5000);
        this.uiViewMatrix.appendScale(1000 / Scene_data.stageWidth, 1000 / Scene_data.stageHeight, 1);
    };
    Display3DUISprite.prototype.setCam = function () {
        //Scene_data.context3D.setVcMatrix4fv(this.material.shader, "posMatrix3D", this.posMatrix.m);
        Scene_data.context3D.setVcMatrix4fv(this.material.shader, "viewMatrix3D", this.uiViewMatrix.m);
        Scene_data.context3D.setVcMatrix4fv(this.material.shader, "camMatrix3D", this.uiMatrix.m);
    };
    Display3DUISprite.prototype.update = function () {
        Scene_data.context3D.setWriteDepth(true);
        Scene_data.context3D.setDepthTest(true);
        _super.prototype.update.call(this);
        Scene_data.context3D.setWriteDepth(false);
        Scene_data.context3D.setDepthTest(false);
        ////console.log(this.posMatrix.m)
    };
    return Display3DUISprite;
}(Display3DSprite));
//# sourceMappingURL=Display3DUISprite.js.map