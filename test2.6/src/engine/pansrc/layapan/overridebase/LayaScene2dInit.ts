﻿import { Engine } from "../../../tl3d/engine/Engine";
import { SceneManager } from "../../../tl3d/engine/scene/SceneManager";
import { LayaOverride2dSceneManager } from "./LayaOverride2dSceneManager";
import { LayaOverride2dEngine } from "./LayaOverride2dEngine";

export class LayaScene2dInit {
    public static isConfig: boolean = false
    public static initData(): void {
        if (!LayaScene2dInit.isConfig) {
            //  Scene_data.fileRoot = " http://" + document.domain + "/res/";
            //替换SceneManager场景管理对象；
            // LayaOverride2dSceneManager.initConfig();
            //替换Engine引擎对象；
            LayaOverride2dEngine.initConfig();

            Engine.init() //初始化场景
            Engine.resetSize(); //设置canvas大小
        //    Engine.initPbr();
            LayaScene2dInit.isConfig = true;   //完成
            SceneManager.getInstance().ready = true; //场景update可以
            this.sceneItem = new Array;
        }

    }
    public static sceneItem: Array<LayaOverride2dSceneManager>;


}