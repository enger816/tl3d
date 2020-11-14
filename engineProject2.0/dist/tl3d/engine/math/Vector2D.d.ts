export declare class Vector2D {
    x: number;
    y: number;
    constructor($x?: number, $y?: number);
    normalize(): void;
    get length(): number;
    scaleBy(value: number): void;
    sub(val: Vector2D): Vector2D;
    add(val: Vector2D): Vector2D;
    toString(): String;
    static distance(p1: Vector2D, p2: Vector2D): number;
    subtract(value: Vector2D): Vector2D;
}
