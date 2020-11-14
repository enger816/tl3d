import { Vector3D } from "../../math/Vector3D";
import { Display3D } from "../../display3D/Display3D";
export declare class LineDisplaySprite extends Display3D {
    constructor();
    lineVecPos: Array<number>;
    lineColor: Array<number>;
    lineIndex: Array<number>;
    baseColor: Vector3D;
    makeLineMode(a: Vector3D, b: Vector3D, $color?: Vector3D): void;
    clear(): void;
    upToGpu(): void;
    update(): void;
}
export declare class MulLineSprite extends LineDisplaySprite {
    constructor();
    private itemSprite;
    makeLineMode(a: Vector3D, b: Vector3D, $color?: Vector3D): void;
    private getSprite;
    update(): void;
    upToGpu(): void;
    clear(): void;
}
export declare class GridLineSprite extends LineDisplaySprite {
    constructor();
    private makeGridData;
}
