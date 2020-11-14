import { OverrideEngine } from "../../scene3d/override/OverrideEngine";
export declare class Override2dEngine extends OverrideEngine {
    constructor();
    static resetSize(width?: number, height?: number): void;
    static init($caves: HTMLCanvasElement): void;
    static resetViewMatrx3D(): void;
}
