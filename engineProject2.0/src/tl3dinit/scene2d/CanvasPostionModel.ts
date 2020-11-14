import { Vector2D } from "../../tl3d/engine/math/Vector2D";
import { Override2dEngine } from "./override2d/Override2dEngine";
import { Scene_data } from "../../tl3d/engine/context/Scene_data";
import { Vector3D } from "../../tl3d/engine/math/Vector3D";
import { Object3D } from "../../tl3d/engine/base/Object3D";

export  class CanvasPostionModel {
    /**
     * 2.5d旋转角度
     */
    public static SCENE_2D_ROTATION_45: number = 30;

    public tureMoveV2d: Vector2D;

    private static _instance: CanvasPostionModel;
    public static getInstance(): CanvasPostionModel {
        if (!this._instance) {
            this._instance = new CanvasPostionModel();
        }
        return this._instance;
    }
    constructor() {
        this.tureMoveV2d = new Vector2D(0,0)
    }

 
    public resetSize(): void {

        let scaleZ:number = Scene_data.SCALE_Z;

        let halfScreenW:number = Laya.stage.width / 2;
        let halfScreenH:number = Laya.stage.height / 2;

        let f:Object3D =  Scene_data.focus3D;
        f.x = 0 + halfScreenW;
        f.z = 0 - halfScreenH * scaleZ;

        f.x -= this.tureMoveV2d.x;
        f.z += this.tureMoveV2d.y * scaleZ;
    }
}