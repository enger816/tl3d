import { ResGC } from "../base/ResGC";
import { TextureRes } from "./TextureRes";
export declare class TextureManager extends ResGC {
    private _loadDic;
    private _resDic;
    defaultLightMap: WebGLTexture;
    constructor();
    private static _instance;
    static getInstance(): TextureManager;
    hasTexture($url: string): boolean;
    getTexture($url: string, $fun: Function, $wrapType?: number, $info?: any, $filteType?: number, $mipmapType?: number): void;
    getImageData($url: string, $fun: Function): void;
    getImgResByurl($url: string): any;
    addRes($url: string, $img: any): void;
    addImgRes($url: string, $img: any): void;
    getCanvasTexture(ctx: CanvasRenderingContext2D): TextureRes;
    getImageDataTexture(imgdata: any): WebGLTexture;
    getTextureRes($img: any): TextureRes;
    updateTexture($texture: WebGLTexture, $offsetx: number, $offsety: number, ctx: CanvasRenderingContext2D): void;
    loadCubeTexture($url: string, $fun: Function): void;
    loadTextureCom($img: any, _info: TextureLoad): void;
    initDefaultLightMapTexture(): void;
    gc(): void;
}
export declare class TextureLoad {
    fun: Function;
    info: any;
    url: string;
    wrap: number;
    filter: number;
    mipmap: number;
    constructor($fun: Function, $info: any, $url: string, $wrap: number, $filter: number, $mipmap: number);
}
export declare class CubemapLoad {
    private ary;
    private fun;
    private flagNum;
    loadCube($url: string, $fun: Function): void;
    loadCom($img: HTMLImageElement, $info: any): void;
}
