import { Vector3D } from "../../math/Vector3D";
import { Matrix3D } from "../../math/Matrix3D";
import { SkinMesh } from "./SkinMesh";
import { MeshData } from "../../base/MeshData";
export declare class DualQuatFloat32Array {
    quat: Float32Array;
    pos: Float32Array;
}
export declare class AnimData {
    inLoop: number;
    inter: Array<number>;
    bounds: Array<Vector3D>;
    nameHeight: number;
    posAry: Array<Vector3D>;
    matrixAry: Array<Array<Matrix3D>>;
    boneQPAry: Array<Array<DualQuatFloat32Array>>;
    hasProcess: boolean;
    processMesh($skinMesh: SkinMesh): void;
    private meshBoneQPAryDic;
    private makeArrBoneQPAry;
    getBoneQPAryByMesh($mesh: MeshData): Array<Array<DualQuatFloat32Array>>;
    private conleMatrixArr;
    private makeFrameDualQuatFloatArray;
}
