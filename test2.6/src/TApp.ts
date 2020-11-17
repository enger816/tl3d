import { CameraView } from "./camera/CameraView";
import { ModelSceneChar } from "./engine/tl3dinit/scenedis/ModelSceneChar";
import { EntityMgr } from "./scene/EntityMgr";

export class TApp{
    static gameView:IGameView;
    static mainChar:ModelSceneChar;
    static entityMgr:EntityMgr=new EntityMgr();
    static cameraView:CameraView;
}