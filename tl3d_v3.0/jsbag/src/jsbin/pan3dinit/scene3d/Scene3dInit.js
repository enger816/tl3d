var scene3d_me;
(function (scene3d_me) {
    var Scene3dInit = /** @class */ (function () {
        function Scene3dInit() {
        }
        Scene3dInit.initData = function () {
            //替换SceneManager场景管理对象；
            scene3d_me.OverrideSceneManager.initConfig();
            //替换Engine引擎对象；
            scene3d_me.OverrideEngine.initConfig();
            //初始化场景
            Pan3d.Engine.init(mainpan3d_me.canvas);
            scene3d_me.OverrideBloodManager.getInstance();
            Pan3d.Engine.resetSize(mainpan3d_me.canvas.width, mainpan3d_me.canvas.height); //设置canvas大小
            Pan3d.Engine.initPbr();
            Scene3dInit.isConfig = true; //完成
            Pan3d.SceneManager.getInstance().ready = true; //场景update可以
        };
        Scene3dInit.isConfig = false;
        return Scene3dInit;
    }());
    scene3d_me.Scene3dInit = Scene3dInit;
})(scene3d_me || (scene3d_me = {}));
//# sourceMappingURL=Scene3dInit.js.map