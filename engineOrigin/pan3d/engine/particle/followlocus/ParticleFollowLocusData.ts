module Pan3d {
    export class ParticleFollowLocusData extends ParticleData {
        public _fenduanshu: number;//分段数

        public getParticle(): Display3DParticle {
            return new Display3DFollowLocusPartilce;
        }

        public setAllByteInfo($byte: Pan3dByteArray): void {

            this._fenduanshu = $byte.readFloat();
            super.setAllByteInfo($byte);
            //this.initBindMatrixAry();
            this.uploadGpu();
            this.initVcData();
        }

        public uploadGpu(): void {
            this.objData = new ObjData;

            this.objData.vertices = new Array;
            this.objData.uvs = new Array;
            this.objData.indexs = new Array;

            for (var i: number = 0; i <= this._fenduanshu; i++) {


                var pA: Vector2D = new Vector2D(i / this._fenduanshu, 0);
                var pB: Vector2D = new Vector2D(i / this._fenduanshu, 1);

                pA.scaleBy(0.9);
                pB.scaleBy(0.9);

                if (this._isU) {
                    pA.x = -pA.x;
                    pB.x = -pB.x;
                }

                if (this._isV) {
                    pA.y = -pA.y;
                    pB.y = -pB.y;
                }

                var vcIndex: number = i * 2;
                this.objData.vertices.push(vcIndex, vcIndex + 1, -this._originWidthScale * this._width / 100);
                if (this._isUV) {
                    this.objData.vertices.push(pA.y, pA.x);
                } else {
                    this.objData.vertices.push(pA.x, pA.y);
                }

                this.objData.vertices.push(vcIndex, vcIndex + 1, (1 - this._originWidthScale) * this._width / 100);
                if (this._isUV) {
                    this.objData.vertices.push(pB.y, pB.x);
                } else {
                    this.objData.vertices.push(pB.x, pB.y);
                }

                // if (this._isUV) {
                //     this.objData.uvs.push(pA.y, pA.x);
                //     this.objData.uvs.push(pB.y, pB.x);
                // } else {
                //     this.objData.uvs.push(pA.x, pA.y);
                //     this.objData.uvs.push(pB.x, pB.y);
                // }

            }

            for (i = 0; i < this._fenduanshu; i++) {
                this.objData.indexs.push(0 + 2 * i, 1 + 2 * i, 2 + 2 * i, 1 + 2 * i, 3 + 2 * i, 2 + 2 * i);
            }


            this.pushToGpu();
        }

        protected pushToGpu(): void {

            this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);

            //this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);

            this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);

            this.objData.stride = 5 * 4;

            this.objData.treNum = this.objData.indexs.length;


        }

        public initVcData(): void {
            this.vcmatData = new Float32Array(Display3DFollowLocusShader.getVcSize() * 16);
        }

        public regShader(): void {
            if (!this.materialParam) {
                return;
            }
            var shader: Display3DFollowLocusShader = new Display3DFollowLocusShader()
            this.materialParam.shader = ProgrmaManager.getInstance().getMaterialProgram(Display3DFollowLocusShader.Display3D_FollowLocus_Shader,
                Display3DFollowLocusShader, this.materialParam.material);
            this.materialParam.program = this.materialParam.shader.program;
        }


    }
}