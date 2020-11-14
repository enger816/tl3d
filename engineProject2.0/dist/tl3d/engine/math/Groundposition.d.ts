import { Vector3D } from "./Vector3D";
export declare class Groundposition {
    constructor();
    private static _plantObjectMath;
    private static _plantnormal;
    private static _plane_a;
    static getGroundPos($x: number, $y: number): Vector3D;
}
