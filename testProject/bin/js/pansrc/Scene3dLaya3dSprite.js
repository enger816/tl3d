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
//此类可用于修改场景的渲染队列 或显示3D 或2D的模式
var Scene_data = tl3d.Scene_data;
var MaskScene3dLaya = /** @class */ (function (_super) {
    __extends(MaskScene3dLaya, _super);
    function MaskScene3dLaya() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MaskScene3dLaya.prototype.applyAbsolutePoint = function () {
        this.absoluteX = this._x;
        this.absoluteY = this._y;
        this.absoluteWidth = this._width;
        this.absoluteHeight = this._height;
        this.applyRenderSize();
    };
    MaskScene3dLaya.prototype.applyRenderSize = function () {
        this.renderData[0] = this.absoluteX / Scene_data.stageWidth;
        this.renderData[1] = this.absoluteY / Scene_data.stageHeight;
        this.renderData[2] = this.absoluteWidth / tl3d.Scene_data.stageWidth;
        this.renderData[3] = this.absoluteHeight / Scene_data.stageHeight;
    };
    return MaskScene3dLaya;
}(tl3d.UIMask));
var GroundPosLaya = /** @class */ (function () {
    function GroundPosLaya() {
    }
    GroundPosLaya.getGroundPos = function ($x, $y, $cam3D, $rect, $m) {
        this.cam3D = $cam3D;
        this.windowRect = $rect;
        this.viewMatrx3D = $m;
        var $ty = -0;
        if (!this._plantObjectMath) {
            var A = new tl3d.Vector3D(0, $ty, 500);
            var B = new tl3d.Vector3D(-500, $ty, 0);
            var C = new tl3d.Vector3D(500, $ty, 0);
            this._plantObjectMath = tl3d.Calculation._PanelEquationFromThreePt(A, B, C);
            this._plantnormal = new tl3d.Vector3D(this._plantObjectMath.a, this._plantObjectMath.b, this._plantObjectMath.c);
            this._plantnormal.normalize();
            this._plane_a = new tl3d.Vector3D(A.x, A.y, A.z);
        }
        //计算直线与平面交点
        var line_a = this.mathDisplay2Dto3DWorldPos(new tl3d.Vector2D($x, $y), 500);
        var line_b = new tl3d.Vector3D(this.cam3D.x, this.cam3D.y, this.cam3D.z);
        var crossPoint = tl3d.Calculation.calPlaneLineIntersectPoint(this._plantnormal, this._plane_a, line_a, line_b);
        return crossPoint;
    };
    GroundPosLaya.mathDisplay2Dto3DWorldPos = function ($point, $depht) {
        if ($depht === void 0) { $depht = 300; }
        var sceneViewHW;
        if (Scene_data.stageWidth > Scene_data.stageHeight) {
            sceneViewHW = Math.max(Scene_data.stageWidth, Scene_data.stageHeight);
        }
        else {
            sceneViewHW = Math.min(Scene_data.stageWidth, Scene_data.stageHeight);
        }
        var $disNum = $depht / (sceneViewHW / 2);
        var $far = sceneViewHW / 2 * $disNum;
        var fovw = this.windowRect.width;
        var fovh = this.windowRect.height;
        var m = new tl3d.Matrix3D;
        m.prependRotation(-this.cam3D.rotationY, tl3d.Vector3D.Y_AXIS);
        m.prependRotation(-this.cam3D.rotationX, tl3d.Vector3D.X_AXIS);
        var uc = this.viewMatrx3D.transformVector(new tl3d.Vector3D(500, 0, 500));
        var zScale = uc.x / uc.w;
        var fw = (fovw / 2 / zScale) * $disNum;
        var fh = (fovh / 2 / zScale) * $disNum;
        var tx = (($point.x / fovw) * fw) * 2;
        var ty = (($point.y / fovh) * fh) * 2;
        var p = this.gettempPos(new tl3d.Vector3D(-fw + tx, +fh - ty, $far), m);
        return p;
    };
    GroundPosLaya.gettempPos = function (a, m) {
        var b = m.transformVector(a);
        b = b.add(new tl3d.Vector3D(this.cam3D.x, this.cam3D.y, this.cam3D.z));
        return b;
    };
    return GroundPosLaya;
}());
var Scene3dLaya3dSprite = /** @class */ (function (_super) {
    __extends(Scene3dLaya3dSprite, _super);
    function Scene3dLaya3dSprite() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._windowRect = new tl3d.Rectangle(0, 0, 512, 512);
        _this.focus3d = new tl3d.Object3D;
        _this.camDistance = 700;
        _this.camRotationX = -35;
        _this.camRotationY = 0;
        _this.camViewLH = 1.76;
        _this.camAotuMove = true;
        return _this;
    }
    Scene3dLaya3dSprite.prototype.upFrame = function () {
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
        if (this._uiMask) {
            this._uiMask.x = this.x - 0;
            this._uiMask.y = this.y - 0;
            var renderContext = Scene_data.context3D.renderContext;
            renderContext.enable(renderContext.STENCIL_TEST);
            renderContext.stencilMask(0xFF);
            renderContext.stencilFunc(renderContext.NEVER, this._uiMask.level, 0xFF);
            renderContext.stencilOp(renderContext.REPLACE, renderContext.REPLACE, renderContext.REPLACE);
            this._uiMask.update();
            renderContext.stencilFunc(renderContext.LESS, this._uiMask.level - 1, 0xFF);
            renderContext.stencilOp(renderContext.KEEP, renderContext.KEEP, renderContext.KEEP);
            //   this._uiMask.update()
        }
        this.scene.upFrame();
        if (this._uiMask) {
            Scene_data.context3D.renderContext.disable(Scene_data.context3D.renderContext.STENCIL_TEST);
        }
        Scene_data.viewMatrx3D = $copyM;
        Scene_data.cam3D.distance = $copyD;
    };
    Scene3dLaya3dSprite.prototype.getGroundPos = function ($x, $y) {
        var $pos = GroundPosLaya.getGroundPos($x - this.x, $y - this.y, this.copyCam3d, this._windowRect, this.copyViewMatrx3D);
        return $pos;
    };
    Scene3dLaya3dSprite.prototype.addMaskUi = function ($w, $h) {
        if (!this._uiMask) {
            this._uiMask = new MaskScene3dLaya();
            Scene3dLaya3dSprite.maskeLevel++;
            this._uiMask.level = Scene3dLaya3dSprite.maskeLevel;
        }
        this._windowRect.width = $w;
        this._windowRect.height = $h;
        this._uiMask.width = this._windowRect.width;
        this._uiMask.height = this._windowRect.height;
    };
    Scene3dLaya3dSprite.prototype.makeNewMatrix = function () {
        this._windowRect.x = this.x + this._windowRect.width / 2;
        this._windowRect.y = this.y + this._windowRect.height / 2;
        var fovw = Scene_data.stageWidth;
        var fovh = Scene_data.stageHeight;
        var sceneViewHW = Math.min(Scene_data.stageWidth, Scene_data.stageHeight);
        Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(this.camViewLH, 1, 10, 2000);
        Scene_data.viewMatrx3D.appendScale(1 * (sceneViewHW / fovw * 2), fovw / fovh * (sceneViewHW / fovw * 2), 1);
        this.copyViewMatrx3D = Scene_data.viewMatrx3D.clone();
        Scene_data.cam3D.distance = this.camDistance;
        this.focus3d.rotationX = this.camRotationX;
        this.focus3d.rotationY = this.camRotationY;
        if (this.camAotuMove) {
            this.camRotationY += 0.1;
        }
        Scene_data.viewMatrx3D.appendTranslation(-1 + (this._windowRect.x / Scene_data.stageWidth) * 2, 1 - (this._windowRect.y / Scene_data.stageHeight) * 2, 0);
        tl3d.MathClass.getCamView(Scene_data.cam3D, this.focus3d); //一定要角色帧渲染后再重置镜头矩阵
        this.cloneCam3d(Scene_data.cam3D);
    };
    Scene3dLaya3dSprite.prototype.cloneCam3d = function ($temp) {
        this.copyCam3d = new tl3d.Camera3D;
        this.copyCam3d.x = $temp.x;
        this.copyCam3d.y = $temp.y;
        this.copyCam3d.z = $temp.z;
        this.copyCam3d.rotationX = $temp.rotationX;
        this.copyCam3d.rotationY = $temp.rotationY;
        this.copyCam3d.rotationZ = $temp.rotationZ;
    };
    Scene3dLaya3dSprite.maskeLevel = 2;
    return Scene3dLaya3dSprite;
}(BaseLaya3dSprite));
//# sourceMappingURL=Scene3dLaya3dSprite.js.map