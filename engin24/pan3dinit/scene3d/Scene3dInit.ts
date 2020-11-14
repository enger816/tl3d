import {OverrideSceneManager} from "./override/OverrideSceneManager"
import {OverrideEngine} from "./override/OverrideEngine"
import {Engine} from "../../pan3d/engine/Engine"
import {OverrideBloodManager} from "./override/OverrideBloodManager"
import {SceneManager} from "../../pan3d/engine/scene/SceneManager"

    export class Scene3dInit {
        public static isConfig: boolean = false
        public static initData(): void {
            //替换SceneManager场景管理对象；
            OverrideSceneManager.initConfig()
            //替换Engine引擎对象；
            OverrideEngine.initConfig()
            //初始化场景
            Engine.init(maincanvas)
            OverrideBloodManager.getInstance()
            Engine.resetSize(maincanvas.width, maincanvas.height); //设置canvas大小
            Engine.initPbr();
            Scene3dInit.isConfig = true;   //完成
            SceneManager.getInstance().ready = true; //场景update可以
        }

    }
