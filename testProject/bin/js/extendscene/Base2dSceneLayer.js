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
var Base2dSceneLayer = /** @class */ (function (_super) {
    __extends(Base2dSceneLayer, _super);
    function Base2dSceneLayer() {
        var _this = _super.call(this) || this;
        /**点击开始的点 */
        _this._startPosX = 0;
        _this._startPosY = 0;
        _this._cutShowGods = false;
        _this.x = 0;
        _this.y = 0;
        return _this;
    }
    /**基于偏移量设置位置 */
    Base2dSceneLayer.prototype.setPosition = function (x, y) {
        this.x += x;
        this.y += y;
    };
    /**基于偏移量设置位置 */
    Base2dSceneLayer.prototype.setPos = function (x, y) {
        this.x = x;
        this.y = y;
    };
    /**
     * 充值镜头
     */
    Base2dSceneLayer.prototype.upFrame = function () {
        Scene_data.context3D.setWriteDepth(true);
        Scene_data.context3D.setDepthTest(true);
        tl3d.TimeUtil.update();
        //设置为2D的镜头角度
        Scene_data.focus3D.rotationY = 0;
        Scene_data.focus3D.rotationX = -45;
        Scene_data.cam3D.distance = 250;
        //这是是移动2D的基础坐标
        scene2d.CanvasPostionModel.getInstance().tureMoveV2d = new tl3d.Vector2D(this.x, this.y);
        scene2d.CanvasPostionModel.getInstance().resetSize();
        Scene_data.context3D.renderContext.clear(Scene_data.context3D.renderContext.DEPTH_BUFFER_BIT); //重置深度
        tl3d.MathClass.getCamView(Scene_data.cam3D, Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
        Scene_data.context3D._contextSetTest.clear();
        this.scene.upFrame();
    };
    Base2dSceneLayer.prototype.get3dPos = function ($x, $y) {
        var $nScale = 0.25 / scene2d.Override2dEngine.htmlScale;
        var $tx = $x * $nScale;
        var $tz = $y * $nScale / (Math.sin(45 * Math.PI / 180)) * -1;
        return new tl3d.Vector3D($tx, 0, $tz);
    };
    /**
     * 添加ui角色
     * @param mid
     * @param postionx
     * @param postiony
     * @param rotate
     * @param scale
     */
    Base2dSceneLayer.prototype.addModelChar = function (mid, postionx, postiony, rotate, scale, rotationz) {
        if (rotate === void 0) { rotate = 180; }
        if (scale === void 0) { scale = 2.7; }
        if (rotationz === void 0) { rotationz = 0; }
        if (!this.sceneChar) {
            this.sceneChar = new GameUIChar();
            this.scene.addMovieDisplay(this.sceneChar);
        }
        this.sceneChar.play(tl3d.CharAction.STANAD);
        this.sceneChar.setRoleUrl(getRoleUrl(mid));
        this.sceneChar.forceRotationY = rotate;
        this.sceneChar.rotationZ = rotationz;
        this.sceneChar.set2dPos(postionx, postiony); //坐标
        this.sceneChar.scale = scale;
        return this.sceneChar;
    };
    //移除UI角色
    Base2dSceneLayer.prototype.removeModelChar = function (sceneChar) {
        if (!sceneChar)
            return;
        sceneChar.removeSelf();
        sceneChar = null;
    };
    /**
     * 设置模型旋转盒子
     * @param targetp
     * @param topb
     * @param bottomb
     */
    Base2dSceneLayer.prototype.setModelBox = function (targetp, topb, bottomb) {
        this.targetPanel = targetp;
        this.topBounds = topb;
        this.bottomBounds = bottomb;
    };
    /**显示 */
    Base2dSceneLayer.prototype.onShow = function () {
        if (!this.targetPanel)
            return;
        this.targetPanel.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        this.targetPanel.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        this.targetPanel.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
    };
    /**关闭 */
    Base2dSceneLayer.prototype.onExit = function () {
        this.sceneChar = null;
        this.scene.removeAllMovieDisplay();
        this.scene.clearAllParticle();
        if (!this.targetPanel)
            return;
        this.targetPanel.off(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        this.targetPanel.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
    };
    Base2dSceneLayer.prototype.clearSceneChar = function () {
        if (this.sceneChar) {
            this.scene.removeMovieDisplay(this.sceneChar);
            this.sceneChar.destory();
            this.sceneChar = null;
        }
    };
    /**点击开始 */
    Base2dSceneLayer.prototype.mouseDown = function (e) {
        this._mouseState = true;
        this._cutShowGods = false;
        if (e.stageY <= this.bottomBounds.y
            && e.stageY >= this.topBounds.y) {
            this._startPosX = e.stageX;
            this._startPosY = e.stageY;
            this._cutShowGods = true;
        }
    };
    /**点击移动 拖动 */
    Base2dSceneLayer.prototype.mouseMove = function (e) {
        if (!this._mouseState) {
            return;
        }
        if (e.stageY > this.bottomBounds.y || e.stageY < this.topBounds.y || !this._cutShowGods) {
            return;
        }
        var diffx = (e.stageX - this._startPosX);
        this._startPosX = e.stageX;
        if (this.sceneChar) {
            this.sceneChar.rotationY -= diffx;
        }
    };
    Base2dSceneLayer.prototype.mouseUp = function (e) {
        this._mouseState = false;
    };
    Base2dSceneLayer.prototype.getEffectUrl = function (name) {
        return "effect/scene/" + name + getBaseUrl() + ".txt";
    };
    /**
    * 播放特效
    * @param targetid
    * @param url
    * @param pos
    * @param r
    */
    Base2dSceneLayer.prototype.addEffect = function ($thisobj, $effect_id, $pos, $scale, $rotationX, $fun, rotationY, rotationZ, autoRemove, timeScale) {
        var _this = this;
        if ($scale === void 0) { $scale = 3; }
        if ($rotationX === void 0) { $rotationX = 30; }
        if ($fun === void 0) { $fun = null; }
        if (rotationY === void 0) { rotationY = 0; }
        if (rotationZ === void 0) { rotationZ = 0; }
        if (autoRemove === void 0) { autoRemove = false; }
        if (timeScale === void 0) { timeScale = 1; }
        var url = this.getEffectUrl(String($effect_id));
        this.scene.groupDataMgr.scene = this.scene;
        this.scene.groupDataMgr.getGroupData(Scene_data.fileRoot + url, function (groupRes) {
            for (var i = 0; i < groupRes.dataAry.length; i++) {
                var item = groupRes.dataAry[i];
                if (item.types == tl3d.BaseRes.SCENE_PARTICLE_TYPE) {
                    var $particle = tl3d.ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + item.particleUrl);
                    $particle.x = $pos.x;
                    $particle.y = $pos.y;
                    $particle.z = $pos.z;
                    $particle.scaleX = $scale;
                    $particle.scaleY = $scale;
                    $particle.scaleZ = $scale;
                    $particle.rotationZ = rotationZ;
                    $particle.rotationY = rotationY;
                    $particle.rotationX = $rotationX;
                    $particle.timeScale = timeScale;
                    _this.scene.addParticle($particle);
                    if ($fun) {
                        $fun.call($thisobj, $particle);
                    }
                    if (autoRemove) {
                        $particle.onComplete = function (particle) {
                            _this.scene.removeParticle(particle);
                        };
                    }
                }
                else {
                    console.log("播放的不是单纯特效");
                }
            }
        });
    };
    /**
     * 移除特效
     * @param particle
     */
    Base2dSceneLayer.prototype.removeEffect = function ($particle) {
        this.scene.removeParticle($particle);
    };
    return Base2dSceneLayer;
}(layapan.LayaInsideSprite));
//# sourceMappingURL=Base2dSceneLayer.js.map