import { Vector2D } from "./Vector2D";
export declare class TestTriangle {
    static baseTri: TestTriangle;
    p1: Vector2D;
    p2: Vector2D;
    p3: Vector2D;
    precision: number;
    constructor($p1?: Vector2D, $p2?: Vector2D, $p3?: Vector2D, $precision?: number);
    setAllPoint($p1: Vector2D, $p2: Vector2D, $p3: Vector2D): void;
    checkPointIn(tp: Vector2D): Boolean;
    getArea(): number;
    static getAreaByPoints(p1: Vector2D, p2: Vector2D, p3: Vector2D): number;
}
