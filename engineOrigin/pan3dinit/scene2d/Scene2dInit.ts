module scene2d {
    export class Scene2dInit {
        public static isConfig: boolean = false
        public static initData(): void {
            //替换SceneManager场景管理对象；
            Override2dSceneManager.initConfig();
            //替换Engine引擎对象；
            Override2dEngine.initConfig();
            Pan3d.Scene_data.fileRoot = " http://" + document.domain + "/res/";

            Pan3d.Engine.init(mainpan3d.canvas) //初始化场景
            Pan3d.Engine.resetSize(mainpan3d.canvas.width, mainpan3d.canvas.height); //设置canvas大小
            Pan3d.Engine.initPbr();
            Scene2dInit.isConfig = true;   //完成
            Pan3d.SceneManager.getInstance().ready = true; //场景update可以


        }
        private static addGridLineSprite(): void {
            Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
            Pan3d.SceneManager.getInstance().addDisplay(new Pan3d.GridLineSprite());
        }




    }
}