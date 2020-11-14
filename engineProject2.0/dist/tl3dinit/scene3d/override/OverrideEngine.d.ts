import { Engine } from "../../../tl3d/engine/Engine";
export declare class OverrideEngine extends Engine {
    constructor();
    static resetSize(width?: number, height?: number): void;
    static init($caves: HTMLCanvasElement): void;
}
