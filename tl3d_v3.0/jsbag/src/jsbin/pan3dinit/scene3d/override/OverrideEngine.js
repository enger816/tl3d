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
var scene3d_me;
(function (scene3d_me) {
    var OverrideEngine = /** @class */ (function (_super) {
        __extends(OverrideEngine, _super);
        function OverrideEngine() {
            return _super.call(this) || this;
        }
        OverrideEngine.initConfig = function () {
            var _this = this;
            Pan3d.Engine.update = function () { _this.update(); }; //更换update
            Pan3d.Engine.init = function ($caves) { _this.init($caves); }; //更换引擎初始化
            Pan3d.Engine.resetSize = function (width, height) { _this.resetSize(width, height); }; //更尺寸变化
        };
        OverrideEngine.update = function () {
            Pan3d.TimeUtil.update();
            Pan3d.SceneManager.getInstance().update();
        };
        OverrideEngine.resetSize = function (width, height) {
            Pan3d.Scene_data.stageWidth = width;
            Pan3d.Scene_data.stageHeight = height;
            Pan3d.Scene_data.canvas3D.width = Pan3d.Scene_data.stageWidth;
            Pan3d.Scene_data.canvas3D.height = Pan3d.Scene_data.stageHeight;
            Pan3d.Scene_data.context3D.resetSize(Pan3d.Scene_data.stageWidth, Pan3d.Scene_data.stageHeight);
            Pan3d.UIManager.getInstance().resize();
            Pan3d.BloodManager.getInstance().resize();
            Pan3d.Engine.resetViewMatrx3D();
        };
        OverrideEngine.init = function ($caves) {
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
            Pan3d.TimeUtil.init();
            Pan3d.Scene_data.supportBlob = true;
        };
        return OverrideEngine;
    }(Pan3d.Engine));
    scene3d_me.OverrideEngine = OverrideEngine;
})(scene3d_me || (scene3d_me = {}));
//# sourceMappingURL=OverrideEngine.js.map