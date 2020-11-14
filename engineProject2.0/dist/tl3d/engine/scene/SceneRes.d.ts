import { BaseRes } from "../utils/res/BaseRes";
export declare class SceneRes extends BaseRes {
    static sceneConfigData: any;
    private _completeFun;
    private _readDataFun;
    protected _progressFun: Function;
    sceneData: any;
    load($url: string, $completeFun: Function, $progressFun: Function, $readDataFun: Function): void;
    loadZipMap(name: string, size: number): void;
    isNeedReload(): boolean;
    loadComplete($byte: ArrayBuffer): void;
    applyByteArray(): void;
    readNext(): void;
    readScene(): void;
    private _terrainDataItem;
    private readTerrainIdInfoBitmapData;
    private _astarDataMesh;
    private readAstat;
    private readAstarFromByte;
}
