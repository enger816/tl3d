import { Rectangle } from "../math/Rectangle";
export declare class UIManager {
    static cando: boolean;
    static popClikNameFun: Function;
    private static _instance;
    static getInstance(): UIManager;
    static uiClikName($name: string, $id: number): void;
    private _ctx;
    private _canvas;
    constructor();
    getContext2D($width: number, $height: number, alianDefault?: boolean): CanvasRenderingContext2D;
    getGrayImageDatabyImg($img: any): ImageData;
    makeCtxToGray($ctx: CanvasRenderingContext2D, $rect: Rectangle): void;
    showCanvas($x?: number, $y?: number): void;
}
