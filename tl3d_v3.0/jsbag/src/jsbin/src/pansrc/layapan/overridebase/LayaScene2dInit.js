var layapan;
(function (layapan) {
    var LayaScene2dInit = /** @class */ (function () {
        function LayaScene2dInit() {
        }
        LayaScene2dInit.initData = function () {
            if (!LayaScene2dInit.isConfig) {
                //  Pan3d.Scene_data.fileRoot = " http://" + document.domain + "/res/";
                //替换SceneManager场景管理对象；
                // LayaOverride2dSceneManager.initConfig();
                //替换Engine引擎对象；
                layapan.LayaOverride2dEngine.initConfig();
                Pan3d.Engine.init(mainpan3d.canvas); //初始化场景
                Pan3d.Engine.resetSize(mainpan3d.canvas.width, mainpan3d.canvas.height); //设置canvas大小
                Pan3d.Engine.initPbr();
                LayaScene2dInit.isConfig = true; //完成
                Pan3d.SceneManager.getInstance().ready = true; //场景update可以
                this.sceneItem = new Array;
            }
        };
        LayaScene2dInit.isConfig = false;
        return LayaScene2dInit;
    }());
    layapan.LayaScene2dInit = LayaScene2dInit;
})(layapan || (layapan = {}));
//# sourceMappingURL=LayaScene2dInit.js.map