import {Override2dSceneManager} from "./override2d/Override2dSceneManager"
import {Override2dEngine} from "./override2d/Override2dEngine"
import {Scene_data} from "../../pan3d/engine/context/Scene_data"
import {Engine} from "../../pan3d/engine/Engine"
import {SceneManager} from "../../pan3d/engine/scene/SceneManager"
import {ProgrmaManager} from "../../pan3d/engine/program/ProgramManager"
import {LineDisplayShader} from "../../pan3d/engine/scene/grldLevel/LineDisplayShader"
import {GridLineSprite} from "../../pan3d/engine/scene/grldLevel/LineDisplaySprite"

    export class Scene2dInit {
        public static isConfig: boolean = false
        public static initData(): void {
            //替换SceneManager场景管理对象；
            Override2dSceneManager.initConfig();
            //替换Engine引擎对象；
            Override2dEngine.initConfig();
            Scene_data.fileRoot = " http://" + document.domain + "/res/";

            Engine.init(maincanvas) //初始化场景
            Engine.resetSize(maincanvas.width, maincanvas.height); //设置canvas大小
            Engine.initPbr();
            Scene2dInit.isConfig = true;   //完成
            SceneManager.getInstance().ready = true; //场景update可以


        }
        private static addGridLineSprite(): void {
            ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
            SceneManager.getInstance().addDisplay(new GridLineSprite());
        }




    }
