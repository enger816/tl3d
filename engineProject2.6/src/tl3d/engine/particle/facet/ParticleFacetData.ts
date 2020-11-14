import { Display3DParticle } from "../Display3DParticle";
import { ParticleData } from "../ParticleData";
import { Pan3dByteArray } from "../../math/Pan3dByteArray";
import { Display3DFacetParticle } from "./Display3DFacetParticle";
import { ObjData } from "../../base/ObjData";
import { Vector2D } from "../../math/Vector2D";
import { Scene_data } from "../../context/Scene_data";
import { Display3DFacetShader } from "./Display3DFacetShader";
import { ProgramManager } from "../../program/ProgramManager";
import { VertexBuffer3D } from "../../../../l3d/VertexBuffer3D";
import { IndexBuffer3D } from "../../../../l3d/IndexBuffer3D";
import { VertexDeclaration } from "../../../../l3d/VertexDeclaration";
import { VertexElement } from "../../../../l3d/VertexElement";
import { VertexElementFormat } from "../../../../l3d/VertexElementFormat";
import { VertexMesh } from "../../../../l3d/VertexMesh";

    export class ParticleFacetData extends ParticleData {
        public _maxAnimTime: number;
        public _lockx: boolean;
        public _locky: boolean;
        public _isCycle: boolean = false;//是否循环


        public setAllByteInfo($byte: Pan3dByteArray): void {
            this._maxAnimTime = $byte.readFloat();
            this._isCycle = $byte.readBoolean();
            this._lockx = $byte.readBoolean();
            this._locky = $byte.readBoolean();

            super.setAllByteInfo($byte);

            this.initVcData();

            this.uploadGpu();

        }

        public getParticle(): Display3DParticle {
            return new Display3DFacetParticle;
        }

        public uploadGpu(): void {
            this.objData = new ObjData;

            this.makeRectangleData(this._width, this._height, this._originWidthScale, this._originHeightScale,
                this._isUV, this._isU, this._isV, this._animLine, this._animRow);
        }

        private makeRectangleData(width: number, height: number, offsetX: number = 0.5, offsetY: number = 0.5,
            isUV: boolean = false, isU: boolean = false, isV: boolean = false,
            animLine: number = 1, animRow: number = 1): void {

            var uvAry: Array<number> = new Array;
            var verterList: Array<number> = new Array;



            var ary: Array<Vector2D> = new Array;
            ary.push(new Vector2D(0, 0));
            ary.push(new Vector2D(0, 1 / animRow));
            ary.push(new Vector2D(1 / animLine, 1 / animRow));
            ary.push(new Vector2D(1 / animLine, 0));

            if (isU) {
                for (var i: number = 0; i < ary.length; i++) {
                    ary[i].x = - ary[i].x;
                }
            }

            if (isV) {
                for (var i: number = 0; i < ary.length; i++) {
                    ary[i].y = - ary[i].y;
                }
            }

            if (isUV) {
                ary.push(ary.shift());
            }

            for (var i: number = 0; i < ary.length; i++) {
                uvAry.push(ary[i].x, ary[i].y);
            }

            verterList.push(-offsetX * width, height - offsetY * height, 0);
            verterList.push(ary[0].x, ary[0].y);
            verterList.push(width - offsetX * width, height - offsetY * height, 0);
            verterList.push(ary[1].x, ary[1].y);
            verterList.push(width - offsetX * width, -offsetY * height, 0);
            verterList.push(ary[2].x, ary[2].y);
            verterList.push(-offsetX * width, -offsetY * height, 0);
            verterList.push(ary[3].x, ary[3].y);

            var indices: Uint16Array = new Uint16Array([0, 1, 2, 0, 2, 3]);

            let objData = this.objData;
            objData.stride = 5 * 4;

            let arybuff = new Float32Array(verterList)
            let vertexBuffer: VertexBuffer3D = new VertexBuffer3D(arybuff.byteLength, WebGLRenderingContext.STATIC_DRAW, false);
            
            let eles:VertexElement[] = [
                new VertexElement(0,VertexElementFormat.Vector3,VertexMesh.MESH_POSITION0),
                new VertexElement(12,VertexElementFormat.Vector2,VertexMesh.MESH_TEXTURECOORDINATE0),
            ]
            vertexBuffer.vertexDeclaration = new VertexDeclaration(objData.stride,eles)
            vertexBuffer.setData(arybuff);
            objData.layaVertexBuffer = vertexBuffer;
            
            // this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(verterList);
            //this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(uvAry);
            // this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(indexs);

            var indexBuffer: IndexBuffer3D = new IndexBuffer3D(objData.indexFormat, indices.length, WebGLRenderingContext.STATIC_DRAW, false);
            indexBuffer.setData(indices);
            objData.layaIndexBuffer = indexBuffer;
    
            objData._setBuffer(vertexBuffer,indexBuffer);

            objData.treNum = indices.length;
        }

        public initVcData(): void {
            this.vcmatData = new Float32Array(Display3DFacetShader.getVcSize() * 16);


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

        public regShader(): void {
            //var shader: Display3DFacetShader = new Display3DFacetShader();
            this.materialParam.shader = ProgramManager.getInstance().getMaterialProgram(Display3DFacetShader.Display3D_Facet_Shader,
                Display3DFacetShader, this.materialParam.material);
            this.materialParam.program = this.materialParam.shader.program;
        }
    }