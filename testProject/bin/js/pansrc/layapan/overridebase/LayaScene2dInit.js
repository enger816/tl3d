var layapan;
(function (layapan) {
    var LayaScene2dInit = /** @class */ (function () {
        function LayaScene2dInit() {
        }
        LayaScene2dInit.initData = function () {
            if (!LayaScene2dInit.isConfig) {
                //  Scene_data.fileRoot = " http://" + document.domain + "/res/";
                //替换SceneManager场景管理对象；
                // LayaOverride2dSceneManager.initConfig();
                //替换Engine引擎对象；
                layapan.LayaOverride2dEngine.initConfig();
                tl3d.Engine.init(tl3d.Engine.canvas); //初始化场景
                tl3d.Engine.resetSize(Laya.stage.width, Laya.stage.height); //和laya的canvas大小一致
                tl3d.Engine.initPbr();
                tl3d.Engine.initShadow();
                LayaScene2dInit.isConfig = true; //完成
            }
        };
        LayaScene2dInit.isConfig = false;
        return LayaScene2dInit;
    }());
    layapan.LayaScene2dInit = LayaScene2dInit;
})(layapan || (layapan = {}));
//# sourceMappingURL=LayaScene2dInit.js.map