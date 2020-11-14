import { Pan3dByteArray } from "./Pan3dByteArray";
export declare class Vector3D {
    x: number;
    y: number;
    z: number;
    w: number;
    static X_AXIS: Vector3D;
    static Y_AXIS: Vector3D;
    static Z_AXIS: Vector3D;
    constructor($x?: number, $y?: number, $z?: number, $w?: number);
    normalize(): void;
    get length(): number;
    scaleBy(value: number): void;
    divideScalar(value: number): void;
    distanceToSquared(v: Vector3D): number;
    scaleByW(): void;
    add(value: Vector3D): Vector3D;
    subtract(value: Vector3D): Vector3D;
    addByNum($x: number, $y: number, $z: number, $w?: number): void;
    setTo($x: number, $y: number, $z: number): void;
    setByte(byte: Pan3dByteArray): void;
    cross(value: Vector3D): Vector3D;
    dot(value: Vector3D): number;
    clone(): Vector3D;
    static distance(v1: Vector3D, v2: Vector3D): number;
    toString(): String;
}
