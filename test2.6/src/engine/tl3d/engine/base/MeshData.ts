import { ObjData } from "./ObjData";
import { MaterialBaseParam } from "../material/MaterialBaseParam";
import { Material } from "../material/Material";
import { Matrix3D } from "../math/Matrix3D";
import { Quaternion } from "../math/Quaternion";
import { Scene_data } from "../context/Scene_data";
import { VertexBuffer3D } from "../../../l3d/VertexBuffer3D";
import { IndexBuffer3D } from "../../../l3d/IndexBuffer3D";

export class MeshData extends ObjData {
    public boneIDAry: Array<number> = new Array;
    public boneWeightAry: Array<number> = new Array;

    public boneWeightBuffer: WebGLBuffer;
    public boneIdBuffer: WebGLBuffer;

    public boneNewIDAry: Array<number> = new Array;//skeleton

    public materialUrl: string;
    public materialParamData: Array<any>;
    public materialParam: MaterialBaseParam;
    public material: Material;
    public particleAry: Array<BindParticle> = new Array;
    public uid: number;

    public boneIDOffsets: number;
    public boneWeightOffsets: number;


    public bindPosAry: Array<Array<number>>;

    public bindPosMatrixAry: Array<Matrix3D>;

    public bindPosInvertMatrixAry: Array<Matrix3D>;

    
    public getBindPosMatrix(): void {
        var ary: Array<Matrix3D> = new Array;
        var invertAry: Array<Matrix3D> = new Array;

        for (var i: number = 0; i < this.bindPosAry.length; i++) {
            var objbone: Array<number> = this.bindPosAry[i];

            var OldQ: Quaternion = new Quaternion(objbone[0], objbone[1], objbone[2]);
            OldQ.setMd5W();
            var newM: Matrix3D = OldQ.toMatrix3D();

            newM.appendTranslation(objbone[3], objbone[4], objbone[5]);
            invertAry.push(newM.clone());
            newM.invert();

            ary.push(newM);
        }

        this.bindPosMatrixAry = ary;
        this.bindPosInvertMatrixAry = invertAry;


    }
    public destory(): void {
        super.destory();

        if (this.materialParam) {
            this.materialParam.destory();
            this.materialParam = null;
            this.materialParamData = null;
        }

        this.boneIDAry.length = 0;
        this.boneWeightAry.length = 0;
        this.boneNewIDAry.length = 0;

        this.boneIDAry = null;
        this.boneWeightAry = null;
        this.boneNewIDAry = null;

        if (this.boneWeightBuffer) {
            Scene_data.context3D.deleteBuffer(this.boneWeightBuffer);
            this.boneWeightBuffer = null;
        }

        if (this.boneIdBuffer) {
            Scene_data.context3D.deleteBuffer(this.boneIdBuffer);
            this.boneIdBuffer = null;
        }


        if (this.material) {
            this.material.clearUseNum();
        }

        this.particleAry.length = 0;
        this.particleAry = null;
        //for (){

        //}
    }

}

export class BindParticle {
    public url: string;
    public socketName: string;
    //public particle: CombineParticle;

    public constructor($url: string, $socketName: string) {
        this.url = $url;
        this.socketName = $socketName;
    }

}