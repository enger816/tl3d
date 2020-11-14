import { Pan3dByteArray } from "../../math/Pan3dByteArray";
import { ResCount } from "../../base/ResCount";
export declare class BaseRes extends ResCount {
    static IMG_TYPE: number;
    static OBJS_TYPE: number;
    static MATERIAL_TYPE: number;
    static PARTICLE_TYPE: number;
    static SCENE_TYPE: number;
    static ZIP_OBJS_TYPE: number;
    static PREFAB_TYPE: number;
    static SCENE_PARTICLE_TYPE: number;
    protected _byte: Pan3dByteArray;
    protected imgNum: number;
    protected imgLoadNum: number;
    protected _imgComplete: boolean;
    protected _progressFun: Function;
    version: number;
    _imgFun: Function;
    private allImgBytes;
    read($imgFun?: Function): void;
    readZipObj(): void;
    readImg(): void;
    readJpngImg($url: string): void;
    readImgLow(): void;
    loadImg(img: any): void;
    addImg($url: string, img: any): void;
    countImg(): void;
    readObj($srcByte: Pan3dByteArray): void;
    readMaterial(): void;
    readParticle(): void;
    readMaterialInfo(): Array<any>;
    static readFloatTwoByte(byte: Pan3dByteArray, vertices: Array<number>): void;
    static readFloatOneByte(byte: Pan3dByteArray, vertices: Array<number>): void;
    static readIntForTwoByte(byte: Pan3dByteArray, indexs: Array<number>): void;
    static readIntForOneByte(byte: Pan3dByteArray, indexs: Array<number>): void;
    /**
     * $readType
     * 0 readFloatTwoByte
     * 1 readFloatOneByte
     * 2 readIntForOneByte
     *  */
    static readBytes2ArrayBuffer($byte: Pan3dByteArray, $data: DataView, $dataWidth: number, $offset: number, $stride: number, $readType?: number): void;
    static readMaterialParamData(byte: Pan3dByteArray): Array<any>;
    allResCom(): void;
}
