module Pan3d {
    export class ParticleModelData extends ParticleData {
        public _maxAnimTime: number;
        public _depthMode: number
        public getParticle(): Display3DParticle {
            return new Display3DModelPartilce();
        }

        public setAllByteInfo($byte: Pan3dByteArray): void {
            this.objData = new ObjData;

            this._maxAnimTime = $byte.readFloat()

            // var vLen: number = $byte.readInt();
            // for (var i: number = 0; i < vLen; i++) {
            //     this.objData.vertices.push($byte.readFloat())
            // }
            // var uLen: number = $byte.readInt();
            // for (var j: number = 0; j < uLen; j++) {
            //     this.objData.uvs.push($byte.readFloat())
            // }

            var vLen: number = $byte.getInt();

            var dataWidth = 5;
            var len: number = vLen * dataWidth * 4;

            var arybuff: ArrayBuffer = new ArrayBuffer(len);
            var data: DataView = new DataView(arybuff);

            BaseRes.readBytes2ArrayBuffer($byte, data, 3, 0, dataWidth, 4);//vertices
            BaseRes.readBytes2ArrayBuffer($byte, data, 2, 3, dataWidth, 4);//uv

            var iLen: number = $byte.readInt();
            for (var k: number = 0; k < iLen; k++) {
                this.objData.indexs.push($byte.readInt())
            }

            this.objData.stride = dataWidth * 4;

            if (this.version >= 36) {
                this._depthMode=$byte.readInt()//新加模型特效深度信息
            }


            super.setAllByteInfo($byte);

            //this.uploadGpu();

            this.initVcData();

            this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3DArrayBuffer(arybuff);
            this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            this.objData.treNum = this.objData.indexs.length;

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
            this.materialParam.shader = ProgrmaManager.getInstance().getMaterialProgram(Display3DFacetShader.Display3D_Facet_Shader,
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
}