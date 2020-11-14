import { Matrix3D } from "./Matrix3D";
import { Vector3D } from "./Vector3D";
export declare class Quaternion {
    x: number;
    y: number;
    z: number;
    w: number;
    constructor($x?: number, $y?: number, $z?: number, $w?: number);
    print(): void;
    toEulerAngles(target?: Vector3D): Vector3D;
    toMatrix3D($matrix3d?: Matrix3D): Matrix3D;
    fromAxisAngle(axis: Vector3D, angle: number): void;
    normalize(val?: number): void;
    fromMatrix($matrix: Matrix3D): void;
    setMd5W(): void;
    slerp(qa: Quaternion, qb: Quaternion, t: number): void;
}
