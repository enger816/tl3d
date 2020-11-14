import { Vector3D } from "./Vector3D";
import { Camera3D } from "../base/Camera3D";
import { Object3D } from "../base/Object3D";
export declare class MathClass {
    constructor();
    static getCamView(_Cam: Camera3D, _focus_3d: Object3D): Float32Array;
    static updateVp(): void;
    static viewBoxVecItem: Array<Vector3D>;
    static GetViewHitBoxDataCopy($dis: number): void;
    private static gettempPos;
    static math_distance(x1: number, y1: number, x2: number, y2: number): number;
}
