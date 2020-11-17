import { ParticleData } from "../ParticleData";
import { Display3DParticle } from "../Display3DParticle";
import { Pan3dByteArray } from "../../math/Pan3dByteArray";
import { ObjData } from "../../base/ObjData";
import { BaseRes } from "../../utils/res/BaseRes";
import { Scene_data } from "../../context/Scene_data";
import { Display3DFacetShader } from "../facet/Display3DFacetShader";
import { ProgramManager } from "../../program/ProgramManager";
import { Display3DModelPartilce } from "./Display3DModelPartilce";
import { VertexDeclaration } from "../../../../l3d/VertexDeclaration";
import { VertexMesh } from "../../../../l3d/VertexMesh";
import { VertexBuffer3D } from "../../../../l3d/VertexBuffer3D";
import { IndexBuffer3D } from "../../../../l3d/IndexBuffer3D";

export class ParticleModelData extends ParticleData {
  public _maxAnimTime: number;
  public _depthMode: number
  public getParticle(): Display3DParticle {
    return new Display3DModelPartilce();
  }

  public setAllByteInfo($byte: Pan3dByteArray): void {
    let objData = this.objData = new ObjData;

    this._maxAnimTime = $byte.readFloat()

    // var vLen: number = $byte.readInt();
    // for (var i: number = 0; i < vLen; i++) {
    //     this.objData.vertices.push($byte.readFloat())
    // }
    // var uLen: number = $byte.readInt();
    // for (var j: number = 0; j < uLen; j++) {
    //     this.objData.uvs.push($byte.readFloat())
    // }

    let vertexFlag = "POSITION,UV";
    let vertexDeclaration: VertexDeclaration = VertexMesh.getVertexDeclaration(vertexFlag, true);

    var vLen: number = $byte.getInt();
    let stride = objData.stride = vertexDeclaration.vertexStride;
    var dataWidth = stride / 4;
    var len: number = vLen * stride;

    var arybuff: ArrayBuffer = new ArrayBuffer(len);
    var data: DataView = new DataView(arybuff);

    BaseRes.readBytes2ArrayBuffer($byte, data, 3, 0, dataWidth, 4);//vertices
    BaseRes.readBytes2ArrayBuffer($byte, data, 2, 3, dataWidth, 4);//uv

    let indices = BaseRes.readIndexForInt($byte);

    if (this.version >= 36) {
      this._depthMode = $byte.readInt()//新加模型特效深度信息
    }


    super.setAllByteInfo($byte);

    //this.uploadGpu();

    this.initVcData();
   
    let vertexBuffer: VertexBuffer3D = new VertexBuffer3D(arybuff.byteLength, WebGLRenderingContext.STATIC_DRAW, true);
    vertexBuffer.vertexDeclaration = vertexDeclaration;
    vertexBuffer.setData(arybuff);

    objData.layaVertexBuffer = vertexBuffer;
    // meshData.vertexBuffer = Scene_data.context3D.uploadBuff3DArrayBuffer(arybuff);

    var indexBuffer: IndexBuffer3D = new IndexBuffer3D(objData.indexFormat, indices.length, WebGLRenderingContext.STATIC_DRAW, false);
    indexBuffer.setData(indices);
    objData.layaIndexBuffer = indexBuffer;

    objData._setBuffer(vertexBuffer, indexBuffer);

    objData.treNum = indices.length;
  }

  public initVcData(): void {
    this.vcmatData = new Float32Array(Display3DFacetShader.getVcSize() * 16);
  }

  public uploadGpu(): void {
    this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
    this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
    this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
    this.objData.treNum = this.objData.indexs.length;
  }

  public regShader(): void {
    //var shader: Display3DFacetShader = new Display3DFacetShader()
    this.materialParam.shader = ProgramManager.getInstance().getMaterialProgram(Display3DFacetShader.Display3D_Facet_Shader,
      Display3DFacetShader, this.materialParam.material);
    this.materialParam.program = this.materialParam.shader.program;
  }

  public setFloat32Vec(key: string, ary: Array<number>): void {
    var idxary: Array<number> = Display3DFacetShader.shader_vec4[key];
    var idx: number = idxary[0] * 16 + idxary[1] * 4;
    this.vcmatData.set(ary, idx);
  }
  public setFloat32Mat(key: string, ary: Float32Array): void {
    var idx: number = Display3DFacetShader.shader_mat4[key] * 16;
    this.vcmatData.set(ary, idx);
  }
}