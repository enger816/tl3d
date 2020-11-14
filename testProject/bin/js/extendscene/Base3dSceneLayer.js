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
var Base3dSceneLayer = /** @class */ (function (_super) {
    __extends(Base3dSceneLayer, _super);
    function Base3dSceneLayer() {
        var _this = _super.call(this) || this;
        _this._windowRect = new tl3d.Rectangle(0, 0, 512, 512);
        _this.focus3d = new tl3d.Object3D;
        _this.camDistance = 700;
        _this.camRotationX = -35;
        _this.camRotationY = 0;
        _this.camPositionX = 0;
        _this.camPositionY = 0;
        _this.camPositionZ = 0;
        _this.camViewLH = 0.85; //镜头透视系数  1-3. 修变这个值，需要配合镜头距离
        _this.camFar = 5000; //镜头长短
        // private _camAotuMove: boolean = false
        _this.camAotuMove = false;
        return _this;
    }
    Base3dSceneLayer.prototype.upFrame = function () {
        Scene_data.context3D.setWriteDepth(true);
        Scene_data.context3D.setDepthTest(true);
        tl3d.TimeUtil.update();
        //这是是移动2D的基础坐标
        Scene_data.focus3D.x = 0;
        Scene_data.focus3D.y = 0;
        Scene_data.focus3D.z = 0;
        Scene_data.context3D.renderContext.clear(Scene_data.context3D.renderContext.DEPTH_BUFFER_BIT); //重置深度
        var $copyM = Scene_data.viewMatrx3D.clone();
        var $copyD = Scene_data.cam3D.distance;
        this.makeNewMatrix();
        Scene_data.context3D._contextSetTest.clear();
        this.scene.upFrame();
        Scene_data.viewMatrx3D = $copyM;
        Scene_data.cam3D.distance = $copyD;
    };
    Base3dSceneLayer.prototype.getGroundPos = function ($x, $y) {
        var $pos = GroundPosLaya.getGroundPos($x - this.x, $y - this.y, this.copyCam3d, this._windowRect, this.copyViewMatrx3D);
        return $pos;
    };
    Base3dSceneLayer.prototype.makeNewMatrix = function () {
        this._windowRect.x = this.x + this._windowRect.width / 2;
        this._windowRect.y = this.y + this._windowRect.height / 2;
        // var sceneViewHW = Math.max(this._windowRect.width, this._windowRect.height)
        var fovw = Scene_data.stageWidth;
        var fovh = Scene_data.stageHeight;
        var sceneViewHW = Math.max(fovw, fovh);
        Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(this.camViewLH, 1, 10, this.camFar);
        Scene_data.viewMatrx3D.appendScale(1 * (sceneViewHW / fovw * 2), fovw / fovh * (sceneViewHW / fovw * 2), 1);
        this.copyViewMatrx3D = Scene_data.viewMatrx3D.clone();
        if (this.camAotuMove) {
            if (this.camMoveFun) {
                this.camMoveFun();
            }
        }
        Scene_data.cam3D.distance = this.camDistance;
        this.focus3d.rotationX = this.camRotationX;
        this.focus3d.rotationY = this.camRotationY;
        this.focus3d.x = this.camPositionX;
        this.focus3d.y = this.camPositionY;
        this.focus3d.z = this.camPositionZ;
        Scene_data.viewMatrx3D.appendTranslation(-1 + (this._windowRect.x / Scene_data.stageWidth) * 2, 1 - (this._windowRect.y / Scene_data.stageHeight) * 2, 0);
        tl3d.MathClass.getCamView(Scene_data.cam3D, this.focus3d); //一定要角色帧渲染后再重置镜头矩阵
        this.cloneCam3d(Scene_data.cam3D);
    };
    Base3dSceneLayer.prototype.setLook = function (tag) {
        this.focus3d.rotationX = tag.rotationX;
        this.focus3d.rotationY = tag.rotationY;
        this.focus3d.x = tag.x;
        this.focus3d.y = tag.y;
        this.focus3d.z = tag.z;
        // Scene_data.cam3D.lookAt(tag);
    };
    Base3dSceneLayer.prototype.cloneCam3d = function ($temp) {
        this.copyCam3d = new tl3d.Camera3D;
        this.copyCam3d.x = $temp.x;
        this.copyCam3d.y = $temp.y;
        this.copyCam3d.z = $temp.z;
        this.copyCam3d.rotationX = $temp.rotationX;
        this.copyCam3d.rotationY = $temp.rotationY;
        this.copyCam3d.rotationZ = $temp.rotationZ;
    };
    //退出3d场景
    Base3dSceneLayer.prototype.onExit = function () {
        this.scene.clearStaticScene();
        tl3d.SceneResManager.getInstance().clearSceneUseById(this.resId);
    };
    return Base3dSceneLayer;
}(Base2dSceneLayer));
var Base3dSceneLayerExt = /** @class */ (function (_super) {
    __extends(Base3dSceneLayerExt, _super);
    function Base3dSceneLayerExt() {
        return _super.call(this) || this;
    }
    Base3dSceneLayerExt.prototype.makeNewMatrix = function () {
        var fovw = Scene_data.stageWidth;
        var fovh = Scene_data.stageHeight;
        var sceneViewHW = Math.max(fovw, fovh);
        Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(this.camViewLH, 1, 10, this.camFar);
        Scene_data.viewMatrx3D.appendScale(1 * (sceneViewHW / fovw * 2), fovw / fovh * (sceneViewHW / fovw * 2), 1);
        this.copyViewMatrx3D = Scene_data.viewMatrx3D.clone();
        if (this.camAotuMove) {
            if (this.camMoveFun) {
                this.camMoveFun();
            }
        }
        Scene_data.cam3D.distance = this.camDistance;
        this.focus3d.rotationX = this.camRotationX;
        this.focus3d.rotationY = this.camRotationY;
        this.focus3d.x = this.camPositionX;
        this.focus3d.y = this.camPositionY;
        this.focus3d.z = this.camPositionZ;
        tl3d.MathClass.getCamView(Scene_data.cam3D, this.focus3d); //一定要角色帧渲染后再重置镜头矩阵
        this.cloneCam3d(Scene_data.cam3D);
    };
    return Base3dSceneLayerExt;
}(Base3dSceneLayer));
//# sourceMappingURL=Base3dSceneLayer.js.map