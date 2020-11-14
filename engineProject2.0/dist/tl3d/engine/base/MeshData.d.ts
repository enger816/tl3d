import { ObjData } from "./ObjData";
import { MaterialBaseParam } from "../material/MaterialBaseParam";
import { Material } from "../material/Material";
import { Matrix3D } from "../math/Matrix3D";
export declare class MeshData extends ObjData {
    boneIDAry: Array<number>;
    boneWeightAry: Array<number>;
    boneWeightBuffer: WebGLBuffer;
    boneIdBuffer: WebGLBuffer;
    boneNewIDAry: Array<number>;
    materialUrl: string;
    materialParamData: Array<any>;
    materialParam: MaterialBaseParam;
    material: Material;
    particleAry: Array<BindParticle>;
    uid: number;
    boneIDOffsets: number;
    boneWeightOffsets: number;
    bindPosAry: Array<Array<number>>;
    bindPosMatrixAry: Array<Matrix3D>;
    bindPosInvertMatrixAry: Array<Matrix3D>;
    getBindPosMatrix(): void;
    destory(): void;
}
export declare class BindParticle {
    url: string;
    socketName: string;
    constructor($url: string, $socketName: string);
}
