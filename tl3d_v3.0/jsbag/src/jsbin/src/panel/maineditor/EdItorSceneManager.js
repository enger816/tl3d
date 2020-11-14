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
var maineditor;
(function (maineditor) {
    var Scene_data = Pan3d.Scene_data;
    var TimeUtil = Pan3d.TimeUtil;
    var MathClass = Pan3d.MathClass;
    var FBO = Pan3d.FBO;
    var GlReset = Pan3d.GlReset;
    var SceneManager = layapan_me.LayaOverride2dSceneManager;
    var EdItorSceneManager = /** @class */ (function (_super) {
        __extends(EdItorSceneManager, _super);
        function EdItorSceneManager() {
            return _super.call(this) || this;
        }
        EdItorSceneManager.prototype.updateDepthTexture = function (fbo) {
            var gl = Scene_data.context3D.renderContext;
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.frameBuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fbo.texture, 0);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, fbo.depthBuffer);
            gl.viewport(0, 0, fbo.width, fbo.height);
            gl.clearColor(fbo.color.x, fbo.color.y, fbo.color.z, fbo.color.w);
            gl.clearDepth(1.0);
            gl.clearStencil(0.0);
            gl.enable(gl.DEPTH_TEST);
            gl.depthMask(true);
            gl.enable(gl.BLEND);
            gl.frontFace(gl.CW);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
        };
        EdItorSceneManager.prototype.renderToTexture = function ($m) {
            if ($m === void 0) { $m = null; }
            GlReset.saveBasePrarame(Scene_data.context3D.renderContext);
            if (!this.fbo) {
                this.fbo = new FBO;
            }
            else {
                this.fbo.resetSize(this.cam3D.cavanRect.width, this.cam3D.cavanRect.height);
            }
            if ($m) {
                this.viewMatrx3D = $m;
            }
            else {
                this.viewMatrx3D.identity();
                this.viewMatrx3D.perspectiveFieldOfViewLH(0.8, 1, 1, 2000);
                this.viewMatrx3D.appendScale(1, this.cam3D.cavanRect.width / this.cam3D.cavanRect.height, 1);
                var sceneViewHW = 400 / this.cam3D.cavanRect.width;
                this.viewMatrx3D.appendScale(sceneViewHW, sceneViewHW, 1);
            }
            this.updateDepthTexture(this.fbo);
            this.update();
            var gl = Scene_data.context3D.renderContext;
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            if (this.textureRes) {
                this.textureRes.texture = this.fbo.texture;
            }
            GlReset.resetBasePrarame(Scene_data.context3D.renderContext);
        };
        EdItorSceneManager.prototype.update = function () {
            var lastCam3D = Scene_data.cam3D;
            var lastfocus3D = Scene_data.focus3D;
            var lastViewMatrx3D = Scene_data.viewMatrx3D.clone();
            Scene_data.cam3D = this.cam3D;
            Scene_data.focus3D = this.focus3D;
            Scene_data.viewMatrx3D = this.viewMatrx3D;
            MathClass.updateVp();
            if (isNaN(this._time)) {
                this._time = TimeUtil.getTimer();
            }
            Scene_data.context3D._contextSetTest.clear();
            this.particleManager.updateTime();
            this.skillManager.update();
            if (this._ready) {
                this.updateMovieFrame();
                Scene_data.context3D.cullFaceBack(true);
                Scene_data.context3D.setWriteDepth(true);
                Scene_data.context3D.setDepthTest(true);
                this.updateStaticDiplay();
                this.updateSpriteDisplay();
                this.updateMovieDisplay();
                Scene_data.context3D.setWriteDepth(true);
                Scene_data.context3D.setDepthTest(true);
                Scene_data.context3D.setCullFaceModel(2);
                Scene_data.context3D.setBlendParticleFactors(1);
                this.particleManager.update();
            }
            Scene_data.cam3D = lastCam3D;
            Scene_data.focus3D = lastfocus3D;
            Scene_data.viewMatrx3D = lastViewMatrx3D;
        };
        EdItorSceneManager.prototype.getGroundPos = function ($mouse) {
            var $scene = this;
            var $hipPos = xyz.TooMathHitModel.mathDisplay2Dto3DWorldPos(new Vector2D($mouse.x - $scene.cam3D.cavanRect.x, $mouse.y - $scene.cam3D.cavanRect.y), $scene);
            var triItem = new Array;
            triItem.push(new Vector3D(0, 0, 0));
            triItem.push(new Vector3D(-100, 0, 100));
            triItem.push(new Vector3D(+100, 0, 100));
            return Pan3d.MathUtil.getLinePlaneInterectPointByTri(new Vector3D($scene.cam3D.x, $scene.cam3D.y, $scene.cam3D.z), $hipPos, triItem);
        };
        EdItorSceneManager.prototype.playLyf = function ($url, $pos, $r) {
            var _this = this;
            if ($r === void 0) { $r = 0; }
            this.groupDataManager.scene = this;
            this.groupDataManager.getGroupData(Pan3d.Scene_data.fileRoot + $url, function (groupRes) {
                for (var i = 0; i < groupRes.dataAry.length; i++) {
                    var item = groupRes.dataAry[i];
                    if (item.types == Pan3d.BaseRes.SCENE_PARTICLE_TYPE) {
                        var $particle = _this.particleManager.getParticleByte(Pan3d.Scene_data.fileRoot + item.particleUrl);
                        $particle.x = $pos.x;
                        $particle.y = $pos.y;
                        $particle.z = $pos.z;
                        $particle.rotationY = $r;
                        //$particle.scaleX = 0.1
                        //$particle.scaleY = 0.1
                        //$particle.scaleZ = 0.1
                        _this.particleManager.addParticle($particle);
                        //  $particle.addEventListener(Pan3d.BaseEvent.COMPLETE, this.onPlayCom, this);
                    }
                    else {
                        console.log("播放的不是单纯特效");
                    }
                }
            });
        };
        return EdItorSceneManager;
    }(SceneManager));
    maineditor.EdItorSceneManager = EdItorSceneManager;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=EdItorSceneManager.js.map