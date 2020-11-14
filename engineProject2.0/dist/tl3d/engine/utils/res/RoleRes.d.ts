import { BaseRes } from "./BaseRes";
import { Vector3D } from "../../math/Vector3D";
export declare class RoleRes extends BaseRes {
    roleUrl: string;
    actionAry: Array<string>;
    private actionByte;
    private actionNum;
    private actionIndex;
    private _fun;
    meshBatchNum: number;
    ambientLightColor: Vector3D;
    ambientLightIntensity: number;
    sunLigthColor: Vector3D;
    sunLigthIntensity: number;
    nrmDircet: Vector3D;
    protected resState: string;
    NONE: string;
    READ_MESH: string;
    READ_ACTION: string;
    READ_IMAGE: string;
    READ_IMAGE_LOADING: string;
    READ_MATERIAL: string;
    READ_PARTICLE: string;
    READ_COMPLETE: string;
    constructor();
    load(url: string, $fun: Function): void;
    updateState(): void;
    updateTick: () => void;
    loadComplete($byte: ArrayBuffer): void;
    readMesh(): void;
    /**读取动作*/
    private readActions;
    /**读取单个动作*/
    private readAction;
    /**图片读取完毕*/
    allResCom(): void;
    /**读取材质*/
    readMaterial(): void;
    /**读取粒子*/
    readParticle(): void;
}
