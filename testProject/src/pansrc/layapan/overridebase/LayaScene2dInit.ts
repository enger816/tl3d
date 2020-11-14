module layapan {
    export class LayaScene2dInit {
        public static isConfig: boolean = false;
        public static initData(): void {
            if (!LayaScene2dInit.isConfig) {
              //  Scene_data.fileRoot = " http://" + document.domain + "/res/";
                //替换SceneManager场景管理对象；
              // LayaOverride2dSceneManager.initConfig();
                //替换Engine引擎对象；
                LayaOverride2dEngine.initConfig();

                tl3d.Engine.init(tl3d.Engine.canvas) //初始化场景
                tl3d.Engine.resetSize(Laya.stage.width,Laya.stage.height); //和laya的canvas大小一致
                tl3d.Engine.initPbr();
                tl3d.Engine.initShadow();
                LayaScene2dInit.isConfig = true;   //完成
            }
        }
    }
}