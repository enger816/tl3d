var Pan3d;
(function (Pan3d) {
    var Engine = /** @class */ (function () {
        function Engine() {
        }
        Engine.init = function ($caves) {
            var isIpad = /ipad/i.test(navigator.userAgent);
            var isIphone = /iPhone/i.test(navigator.userAgent);
            var isAndroid = /android/i.test(navigator.userAgent);
            var isWindow = /iindow/i.test(navigator.userAgent);
            var sUserAgent = navigator.userAgent.toLowerCase();
            ////console.log("--sUserAgent--",sUserAgent,isIpad,isIphone,isAndroid,isWindow);
            if (isIpad || isIphone || isAndroid) {
                Pan3d.Scene_data.isPc = false;
            }
            else {
                Pan3d.Scene_data.isPc = true;
            }
            if (isIpad || isIphone) {
                Pan3d.Scene_data.isIos = true;
            }
            else {
                Pan3d.Scene_data.isIos = false;
            }
            Pan3d.Scene_data.vpMatrix = new Pan3d.Matrix3D;
            Pan3d.Scene_data.canvas3D = $caves;
            Pan3d.Scene_data.context3D = new Pan3d.Context3D();
            Pan3d.Scene_data.context3D.init($caves);
            Pan3d.UIManager.getInstance().init();
            Pan3d.Scene_data.cam3D = new Pan3d.Camera3D;
            Pan3d.Scene_data.focus3D = new Pan3d.Object3D;
            Pan3d.Scene_data.focus3D.x = 0;
            Pan3d.Scene_data.focus3D.y = 0;
            Pan3d.Scene_data.focus3D.z = 0;
            Pan3d.Scene_data.focus3D.rotationY = 135;
            Pan3d.Scene_data.focus3D.rotationX = -45;
            Pan3d.Scene_data.light = new Pan3d.LightVo();
            Engine.testBlob();
            Engine.resetSize();
            // Engine.initShadow();
            Pan3d.TimeUtil.init();
            Pan3d.PathManager.init();
        };
        Engine.resReady = function () {
            Engine.initPbr();
        };
        Engine.testBlob = function () {
            //Scene_data.supportBlob = false;
            //return;
            try {
                var blob = new Blob();
            }
            catch (e) {
                Pan3d.Scene_data.supportBlob = false;
                return;
            }
            Pan3d.Scene_data.supportBlob = true;
        };
        Engine.initPbr = function () {
            if (!Pan3d.Scene_data.pubLut) {
                Pan3d.TextureManager.getInstance().getTexture(Pan3d.Scene_data.fileRoot + "base/brdf_ltu.jpg", function ($texture) {
                    Pan3d.Scene_data.pubLut = $texture.texture;
                }, 1);
            }
            if (!Pan3d.Scene_data.skyCubeMap) {
                Pan3d.TextureManager.getInstance().loadCubeTexture(Pan3d.Scene_data.fileRoot + "base/cube/e", function ($ary) {
                    Pan3d.Scene_data.skyCubeMap = $ary;
                });
            }
        };
        Engine.initShadow = function () {
            Pan3d.TextureManager.getInstance().getTexture(Pan3d.Scene_data.fileRoot + "base/shadow.png", function ($texture) {
                Pan3d.Display3dShadow.texture = $texture.texture;
            });
        };
        Engine.resetSize = function (a, b) {
            if (a === void 0) { a = 0; }
            if (b === void 0) { b = 0; }
            Pan3d.Scene_data.stageWidth = document.body.clientWidth;
            Pan3d.Scene_data.stageHeight = document.body.clientHeight;
            Pan3d.Scene_data.canvas3D.width = Pan3d.Scene_data.stageWidth;
            Pan3d.Scene_data.canvas3D.height = Pan3d.Scene_data.stageHeight;
            Pan3d.Scene_data.context3D.resetSize(Pan3d.Scene_data.stageWidth, Pan3d.Scene_data.stageHeight);
            Pan3d.UIManager.getInstance().resize();
            Pan3d.BloodManager.getInstance().resize();
            this.resetViewMatrx3D();
            Pan3d.Scene_data.canvas3D.style.position = "absolute";
            Pan3d.Scene_data.canvas3D.style.left = "0px";
            Pan3d.Scene_data.canvas3D.style.top = "0px";
        };
        Engine.resetViewMatrx3D = function () {
            if (Pan3d.Scene_data.viewMatrx3D) {
                Pan3d.Scene_data.viewMatrx3D.identity();
            }
            else {
                Pan3d.Scene_data.viewMatrx3D = new Pan3d.Matrix3D;
            }
            var fovw = Pan3d.Scene_data.stageWidth;
            var fovh = Pan3d.Scene_data.stageHeight;
            Pan3d.Scene_data.sceneViewHW = Math.max(fovw, fovh);
            Pan3d.Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(this.sceneCamScale, 1, 50, Pan3d.Scene_data.camFar);
            Pan3d.Scene_data.viewMatrx3D.appendScale(1 * (Pan3d.Scene_data.sceneViewHW / fovw * 2), fovw / fovh * (Pan3d.Scene_data.sceneViewHW / fovw * 2), 1);
        };
        Engine.update = function () {
            Pan3d.TimeUtil.update();
            Pan3d.SceneManager.getInstance().update();
            Pan3d.FpsMc.update();
        };
        Engine.unload = function () {
            //NetManager.getInstance().close();
        };
        Engine.needVertical = true;
        Engine.needInputTxt = false; //在输入文本时，将不再可调整大小
        Engine.sceneCamScale = 1.76;
        return Engine;
    }());
    Pan3d.Engine = Engine;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Engine.js.map