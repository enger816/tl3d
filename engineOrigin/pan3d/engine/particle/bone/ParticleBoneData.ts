module Pan3d {
    export class ParticleBoneData extends ParticleData {
        public _maxAnimTime: number;

        public getParticle(): Display3DParticle {
            return new Display3DBonePartilce();
        }
        public destory(): void {
            super.destory();
            //this.timelineData.destory();
            //this.timelineData = null;
            this.meshData.destory();
            this.animData = null;
        }
        public meshData: MeshData;
        public animData: AnimData;
        public objScale: number = 1
        public setAllByteInfo($byte: Pan3dByteArray): void {

            this.meshData = new MeshData();
            this.animData = new AnimData();
            this.objScale = $byte.readFloat();




            var dataWidth = 13;
            var len: number = $byte.getInt();
            len *= dataWidth * 4;

            var arybuff: ArrayBuffer = new ArrayBuffer(len);
            var data: DataView = new DataView(arybuff);

            BaseRes.readBytes2ArrayBuffer($byte, data, 3, 0, dataWidth);//vertices
            BaseRes.readBytes2ArrayBuffer($byte, data, 2, 3, dataWidth);//uvs
            BaseRes.readIntForTwoByte($byte, this.meshData.indexs);
            BaseRes.readBytes2ArrayBuffer($byte, data, 4, 5, dataWidth, 2);//boneIDAry
            BaseRes.readBytes2ArrayBuffer($byte, data, 4, 9, dataWidth, 3);//boneWeightAry

            this.meshData.stride = dataWidth * 4;


            // BaseRes.readFloatTwoByte($byte, this.meshData.vertices)
            // //console.log($byte.position);
            // BaseRes.readFloatTwoByte($byte, this.meshData.uvs)
            // //console.log($byte.position);
            // BaseRes.readIntForTwoByte($byte, this.meshData.indexs);
            // //console.log($byte.position);

            // var numLength: number = $byte.readInt();
            // this.meshData.boneIDAry = new Array
            // for (var j: number = 0; j < numLength; j++) {
            //     this.meshData.boneIDAry.push($byte.readByte())
            // }
            // //console.log($byte.position);

            // numLength = $byte.readInt();
            // this.meshData.boneWeightAry = new Array
            // for (var j: number = 0; j < numLength; j++) {
            //     this.meshData.boneWeightAry.push(($byte.readByte() + 128) / 255);
            // }
            // //console.log($byte.position);

            this.readFrameQua($byte);
            ////console.log($byte.position);
            super.setAllByteInfo($byte);
            //this.uploadGpu();
            this.initVcData();

            this.meshData.vertexBuffer = Scene_data.context3D.uploadBuff3DArrayBuffer(arybuff);
            this.meshData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.meshData.indexs);
            this.meshData.treNum = this.meshData.indexs.length;
        }
        public initVcData(): void {
            this.vcmatData = new Float32Array(Display3DBoneShader.getVcSize() * 16);
        }
        public setFloat32Mat(key: string, ary: Float32Array): void {
            var idx: number = Display3DBoneShader.shader_mat4[key] * 16;
            this.vcmatData.set(ary, idx);
        }
        private readFrameQua($byte: Pan3dByteArray): void {
            var $tempNum: number = $byte.readFloat()
            var $RGB32767: number = 32767
            var $frameNum: number = $byte.readInt();
            var $frameDualQuat: Array<DualQuatFloat32Array> = new Array;
            for (var i: number = 0; i < $frameNum; i++) {
                var $len: number = $byte.readInt();

                var $DualQuatFloat32Array: DualQuatFloat32Array = new DualQuatFloat32Array;
                $DualQuatFloat32Array.quat = new Float32Array($len * 4);
                $DualQuatFloat32Array.pos = new Float32Array($len * 3);
                for (var j: number = 0; j < $len; j++) {

                    $DualQuatFloat32Array.quat[j * 4 + 0] = $byte.readShort() / $RGB32767;
                    $DualQuatFloat32Array.quat[j * 4 + 1] = $byte.readShort() / $RGB32767;
                    $DualQuatFloat32Array.quat[j * 4 + 2] = $byte.readShort() / $RGB32767;
                    $DualQuatFloat32Array.quat[j * 4 + 3] = $byte.readShort() / $RGB32767;

                    $DualQuatFloat32Array.pos[j * 3 + 0] = $byte.readShort() / $RGB32767 * $tempNum;
                    $DualQuatFloat32Array.pos[j * 3 + 1] = $byte.readShort() / $RGB32767 * $tempNum;
                    $DualQuatFloat32Array.pos[j * 3 + 2] = $byte.readShort() / $RGB32767 * $tempNum;


                }
                $frameDualQuat.push($DualQuatFloat32Array)
            }
            this.animData.boneQPAry = new Array;
            this.animData.boneQPAry.push($frameDualQuat);
        }

        public uploadGpu(): void {
            this.uploadMesh(this.meshData)
        }
        private uploadMesh($mesh: MeshData): void {
            $mesh.vertexBuffer = Scene_data.context3D.uploadBuff3D($mesh.vertices);
            $mesh.uvBuffer = Scene_data.context3D.uploadBuff3D($mesh.uvs);
            $mesh.boneIdBuffer = Scene_data.context3D.uploadBuff3D($mesh.boneIDAry);
            $mesh.boneWeightBuffer = Scene_data.context3D.uploadBuff3D($mesh.boneWeightAry);
            $mesh.indexBuffer = Scene_data.context3D.uploadIndexBuff3D($mesh.indexs);
            $mesh.treNum = $mesh.indexs.length
        }
        public regShader(): void {
            this.materialParam.shader = ProgrmaManager.getInstance().getMaterialProgram(Display3DBoneShader.Display3DBoneShader,
                Display3DBoneShader, this.materialParam.material);
            this.materialParam.program = this.materialParam.shader.program;
        }
    }
}