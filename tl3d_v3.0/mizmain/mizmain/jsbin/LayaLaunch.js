var baselaunch;
(function (baselaunch) {
    var Browser = Laya.Browser;
    var Stage = Laya.Stage;
    var LayaScene2dSceneChar = LayaPan3D.LayaScene2dSceneChar;
    var LayaLaunch = /** @class */ (function () {
        function LayaLaunch() {
            this.init();
        }
        Object.defineProperty(LayaLaunch.prototype, "canvas", {
            get: function () {
                return this._canvas;
            },
            enumerable: true,
            configurable: true
        });
        LayaLaunch.overrideMethods = function () {
            if (this.inited) {
                return;
            }
            this.inited = true;
            var compatibleLayaRender = function (pan3dFunc) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                var v = pan3dFunc.apply(this, args);
                //   console.log("here")
                return v;
            };
            var funA = WebGLRenderingContext.prototype.blendFunc;
            WebGLRenderingContext.prototype.blendFunc = function (sfactor, dfactor) {
                return compatibleLayaRender.call(this, funA, sfactor, dfactor);
            };
            /*
            let ParticleBoneData_setAllByteInfo = Pan3d.ParticleBoneData.prototype.setAllByteInfo;
            Pan3d.ParticleBoneData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
                return compatibleLayaRender.call(this, ParticleBoneData_setAllByteInfo, byte);
            }
            */
        };
        LayaLaunch.prototype.init = function () {
            // LayaLaunch.overrideMethods()
            var _this = this;
            this._canvas = Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, Laya.WebGL);
            Laya.stage.alignV = Stage.ALIGN_LEFT;
            Laya.stage.alignH = Stage.ALIGN_TOP;
            Laya.stage.scaleMode = "full";
            Laya.stage.bgColor = "#232628";
            Pan3d.Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
            Pan3d.Scene_data.fileuiRoot = "res/";
            Pan3d.Scene_data.fileRoot = Pan3d.Scene_data.ossRoot + "baseedit/";
            Pan3d.Engine.init(this._canvas);
            //var spriteA: base.SceneLevel = new base.SceneLevel()
            //Laya.stage.addChild(spriteA);
            //spriteA.pos(200, 200);
            //spriteA.setSceneCanvas(400, 200);
            this.lastTm = Pan3d.TimeUtil.getTimer();
            Laya.stage.frameLoop(1, this, function () {
                var t = Pan3d.TimeUtil.getTimer() - _this.lastTm;
                //  Pan3d.TimeUtil.START_TIME += t * -1;
                _this.lastTm = Pan3d.TimeUtil.getTimer();
                Pan3d.TimeUtil.update();
            });
            this.addRightScene();
            Laya.stage.on(Laya.Event.RESIZE, this, this.resizeStage);
            this.resizeStage();
        };
        LayaLaunch.prototype.resizeStage = function () {
            console.log(Laya.stage.width, Laya.stage.height);
            var minw = Laya.stage.width / this.gameSceneLevel.width;
            var minh = Laya.stage.height / this.gameSceneLevel.height;
            var tempScale = Math.min(minw, minh);
            this.gameSceneLevel.scale(tempScale, tempScale);
            var tx = (Laya.stage.width - (tempScale * this.gameSceneLevel.width)) / 2;
            var ty = (Laya.stage.height - (tempScale * this.gameSceneLevel.height)) / 2;
            this.gameSceneLevel.pos(tx, ty);
        };
        LayaLaunch.prototype.addRightScene = function () {
            var tempScene = new base.SceneLevel();
            Laya.stage.addChild(tempScene);
            tempScene.setSceneCanvas(720, 1280);
            tempScene.setSceneBgColor(new Pan3d.Vector3D(0.01, 0, 0, 0.1));
            tempScene.getNameLabelVo();
            var $baseChar = new LayaScene2dSceneChar();
            tempScene.addMovieDisplay($baseChar);
            $baseChar.setRoleUrl(getRoleUrl("5103"));
            $baseChar.set2dPos(100, 100);
            this.gameSceneLevel = tempScene;
            var atlasFrameSprite = this.gameSceneLevel.playAnim("10101_1", true);
            atlasFrameSprite.speedNum = 4;
            atlasFrameSprite.isLoop = false;
            atlasFrameSprite.scale(0.5, 0.5);
            atlasFrameSprite.x = 100;
            atlasFrameSprite.y = 100;
        };
        LayaLaunch.initCanvas = function ($caves) {
            new LayaLaunch();
        };
        return LayaLaunch;
    }());
    baselaunch.LayaLaunch = LayaLaunch;
})(baselaunch || (baselaunch = {}));
//# sourceMappingURL=LayaLaunch.js.map