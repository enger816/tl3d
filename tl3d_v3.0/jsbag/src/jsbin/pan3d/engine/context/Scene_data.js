var Pan3d;
(function (Pan3d) {
    var Scene_data = /** @class */ (function () {
        function Scene_data() {
        }
        Object.defineProperty(Scene_data, "viewMatrx3D", {
            get: function () {
                return Scene_data._viewMatrx3D;
            },
            set: function (value) {
                Scene_data._viewMatrx3D = value;
            },
            enumerable: true,
            configurable: true
        });
        Scene_data.sceneViewHW = 500;
        Scene_data.fileRoot = "res/";
        Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
        Scene_data.fileuiRoot = "res/";
        Scene_data.verticalScene = false;
        Scene_data.effectsLev = 2; //2高配1中配0低配
        Scene_data.camFar = 1000; //镜头最远距离
        Scene_data.version = 1;
        Scene_data.frameTime = 1000 / 60;
        Scene_data.MAX_NUMBER = 10000000;
        Scene_data.user = 0; //0为小刘，1为pan
        Scene_data.scaleLight = [2.0];
        Scene_data.useByte = true;
        Scene_data.fogColor = [0, 0, 0];
        Scene_data.fogData = [1000, 0.003];
        Scene_data.gameAngle = 0;
        Scene_data.sceneNumId = 0;
        Scene_data.supportBlob = false;
        return Scene_data;
    }());
    Pan3d.Scene_data = Scene_data;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Scene_data.js.map