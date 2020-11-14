import { CameraView } from "./camera/CameraView";
import { EntityMgr } from "./scene/EntityMgr";

export class TApp{
    static gameView:IGameView;
    static mainChar:tl3d.ModelSceneChar;
    static entityMgr:EntityMgr=new EntityMgr();
    static cameraView:CameraView;
}