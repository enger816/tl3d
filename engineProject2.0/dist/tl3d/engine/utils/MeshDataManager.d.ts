import { MeshData } from "../base/MeshData";
import { Pan3dByteArray } from "../math/Pan3dByteArray";
import { ResGC } from "../base/ResGC";
import { SkinMesh } from "../vo/skinanim/SkinMesh";
export declare class MeshDataManager extends ResGC {
    private _loadDic;
    constructor();
    private static _instance;
    static getInstance(): MeshDataManager;
    getMeshData($url: string, $fun: Function, $batchNum?: number): void;
    private roleResCom;
    gc(): void;
    readData(byte: any, $batchNum: any, $url: any, $version: any): SkinMesh;
    private readBindPosByte;
    readMesh2OneBuffer(byte: Pan3dByteArray, meshData: MeshData): void;
    private cloneMeshData;
    private uploadMesh;
    uploadPbrMesh($mesh: MeshData, $useNormal: boolean): void;
    preLoad($url: string): void;
}
