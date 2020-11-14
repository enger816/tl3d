import { Vector2D } from "../../math/Vector2D";
import { ResCount } from "../../base/ResCount";
import { MeshData } from "../../base/MeshData";
import { Vector3D } from "../../math/Vector3D";
export declare class SkinMesh extends ResCount {
    meshAry: Array<MeshData>;
    boneSocketDic: Object;
    fileScale: number;
    tittleHeight: number;
    hitBox: Vector2D;
    type: number;
    animDic: Object;
    ready: boolean;
    animUrlAry: Array<string>;
    lightData: Array<Array<number>>;
    hitPosItem: Array<Vector3D>;
    allParticleDic: Object;
    url: string;
    hasDestory: boolean;
    makeHitBoxItem(): void;
    addMesh($mesh: MeshData): void;
    loadParticle(): void;
    loadMaterial($fun?: Function): void;
    private loadByteMeshDataMaterial;
    setAction(actionAry: Array<string>, roleUrl: string): void;
    destory(): void;
}
