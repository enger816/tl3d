import { Vector2D } from "./Vector2D";
export declare class Circle {
    _x: number;
    _y: number;
    radius: number;
    constructor($x?: number, $y?: number, $radius?: number);
    setData($x: number, $y: number, $radius: number): void;
    setPos($x: number, $y: number): void;
    set x(value: number);
    get x(): number;
    set y(value: number);
    get y(): number;
    setRadius($radius: number): void;
    testPoint($point: Vector2D): boolean;
}
