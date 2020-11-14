export declare class ColorTransition {
    private _canvas;
    private _cxt;
    private _gnt;
    private static _instance;
    static getInstance(): ColorTransition;
    constructor();
    getImageData($data: any): ImageData;
    getImageDataByVec($data: any, $lenght: number): ImageData;
    setData(): void;
}
