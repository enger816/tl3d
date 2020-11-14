import { Vector2D } from "../../tl3d/engine/math/Vector2D";
export declare class CanvasPostionModel {
    /**
     * 2.5d旋转角度
     */
    static SCENE_2D_ROTATION_45: number;
    tureMoveV2d: Vector2D;
    private static _instance;
    static getInstance(): CanvasPostionModel;
    constructor();
    resetSize(): void;
}
