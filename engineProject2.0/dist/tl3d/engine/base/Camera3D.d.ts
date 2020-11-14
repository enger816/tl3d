import { Vector3D } from "../math/Vector3D";
import { Object3D } from "./Object3D";
import { Matrix3D } from "../math/Matrix3D";
export declare class Camera3D extends Object3D {
    cameraMatrix: Matrix3D;
    private _distance;
    offset: Vector3D;
    constructor();
    get distance(): number;
    set distance(value: number);
}
