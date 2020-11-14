module Pan3d {
    export class Display3DLocusPartilce extends Display3DParticle {


        public constructor() {
            super();
            //this.objData = new ParticleGpuData();


        }

        public get locusdata(): ParticleLocusData {
            return <ParticleLocusData>this.data;
        }

        public creatData(): void {
            this.data = new ParticleLocusData;
        }

        public setVa(): void {

            var tf: boolean = Scene_data.context3D.pushVa(this.data.objData.vertexBuffer);
            if (!tf) {
                Scene_data.context3D.setVaOffset(0, 3, this.data.objData.stride, 0);
                Scene_data.context3D.setVaOffset(1, 2, this.data.objData.stride, 28);
                if (this.data._watchEye) {
                    Scene_data.context3D.setVaOffset(2, 4, this.data.objData.stride, 12);
                }
            }



            // Scene_data.context3D.setVa(0, 3, this.data.objData.vertexBuffer);
            // Scene_data.context3D.setVa(1, 2, this.data.objData.uvBuffer);
            // if (this.data._watchEye){
            //     Scene_data.context3D.setVa(2, 4, this.data.objData.normalsBuffer);
            // }

            this.setMaterialTexture();

            Scene_data.context3D.drawCall(this.data.objData.indexBuffer, this.data.objData.treNum);
        }

        public setVc(): void {
            this.updateUV();

            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
            //this.data.setFloat32Mat("viewMatrix3D", Scene_data.viewMatrx3D.m);//0
            this.data.vcmatData.set(Scene_data.viewMatrx3D.m, 0);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
            //this.data.setFloat32Mat("camMatrix3D", Scene_data.cam3D.cameraMatrix.m);//16
            this.data.vcmatData.set(Scene_data.cam3D.cameraMatrix.m, 16);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "posMatrix3D", this.modelMatrix.m);
            //this.data.setFloat32Mat("posMatrix3D", this.modelMatrix.m);//32
            this.data.vcmatData.set(this.modelMatrix.m, 32);
            //Scene_data.context3D.setVc3fv(this.data.materialParam.shader, "uvMove", this.locusdata._resultUvVec);
            //this.data.setFloat32Vec("uvMove", this.locusdata._resultUvVec);//48
            this.data.vcmatData.set(this.locusdata._resultUvVec, 48);

            if (this.data._watchEye) {

                this.locusdata._caramPosVec[0] = Scene_data.cam3D.x;
                this.locusdata._caramPosVec[1] = Scene_data.cam3D.y;
                this.locusdata._caramPosVec[2] = Scene_data.cam3D.z;

                //Scene_data.context3D.setVc3fv(this.data.materialParam.shader, "camPos", this.locusdata._caramPosVec);
                //this.data.setFloat32Vec("camPos", this.locusdata._caramPosVec);//52
                this.data.vcmatData.set(this.locusdata._caramPosVec, 52);
            }

            if (this.locusdata._changUv) {
                //Scene_data.context3D.setVc3fv(this.data.materialParam.shader, "isUv", this.locusdata._uvVec);
                this.data.setFloat32Vec("isUv", this.locusdata._uvVec);//56
            }

            Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "vcmat", this.data.vcmatData);

            this.setMaterialVc();

        }

        public updateUV(): void {
            var $nowTime: number = this._time / Scene_data.frameTime;
            var $lifeRoundNum: number = (this.data._life / 100);
            var $moveUv: number = this.locusdata._speed * $nowTime / this.locusdata._density / 10
            if (this.locusdata._isEnd) {
                $moveUv = Math.min(1, $moveUv);
            }

            if (this.locusdata._isLoop) {
                if (this.locusdata._life) {
                    $moveUv = $moveUv % ($lifeRoundNum + 1)
                } else {
                    $moveUv = $moveUv % 1;
                }
            }

            this.locusdata._resultUvVec[0] = $moveUv;
        }




        //public setAllByteInfo($byte: ByteArray, $allObj: any): void {

        //    this._isLoop = $byte.readBoolean()  //b
        //    this._speed = $byte.readFloat() //f
        //    this._density = $byte.readFloat() //f
        //    this._isEnd = $byte.readBoolean() //b

        //    this.objData.vertices = new Array
        //    this.objData.normals=new Array
        //    this.objData.uvs = new Array
        //    this.objData.indexs = new Array



        //    var vLen: number = $byte.readInt();
        //    for (var i: number = 0; i < vLen; i++) {
        //        this.objData.vertices.push($byte.readFloat())
        //    }
        //    var nLen: number = $byte.readInt();
        //    for (var i: number = 0; i < nLen; i++) {
        //        this.objData.normals.push($byte.readFloat())
        //    }
        //    var uLen: number = $byte.readInt();
        //    for (var j: number = 0; j < uLen; j++) {
        //        this.objData.uvs.push($byte.readFloat())
        //    }
        //    var iLen: number = $byte.readInt();
        //    for (var k: number = 0; k < iLen; k++) {
        //        this.objData.indexs.push($byte.readInt())
        //    }



        //    super.setAllByteInfo($byte, $allObj);

        //    this.initUV();

        //    if (this._watchEye) {
        //        this._caramPosVec = [0, 0, 0];
        //    }

        //    this._uvVec = [this._isU ? -1 : 1, this._isV ? -1 : 1, this._isUV ? 1 : -1]

        //    this.uploadToGpu();

        //}

        //public setAllInfo(allObj: any): void {
        //    var obj: any = allObj.display;

        //    this._isLoop = obj.isLoop;
        //    this._speed = obj.speed;
        //    this._density = obj.density;
        //    this._isEnd = obj.isEnd;

        //    this.objData.vertices = obj.vecData.vec;
        //    this.objData.uvs = obj.vecData.uvs;
        //    this.objData.normals = obj.vecData.normals;
        //    this.objData.indexs = obj.vecData.index;



        //    super.setAllInfo(allObj);

        //    this.initUV();

        //    if (this._watchEye){
        //        this._caramPosVec = [0, 0, 0];
        //    }

        //    this._uvVec = [this._isU ? -1 : 1, this._isV ? -1 : 1, this._isUV ? 1 : -1]

        //    this.uploadToGpu();

        //}

        //public regShader(): void {
        //    if (!this.materialParam) {
        //        return;
        //    }

        //    var isWatchEye: number = this._watchEye ? 1 : 0;
        //    var changeUv: number = 0; 

        //    var hasParticleColor: boolean = this.materialParam.material.hasParticleColor;

        //    if (this._isU || this._isV || this._isUV) {
        //        changeUv = 1;
        //        this._changUv = true;
        //    } else {
        //        this._changUv = false;
        //    }

        //    var shaderParameAry: Array<number>;

        //    shaderParameAry = [isWatchEye, changeUv, hasParticleColor?1:0];

        //    this.materialParam.program = ProgrmaManager.getInstance().getMaterialProgram(Display3DLocusShader.Display3D_Locus_Shader, new Display3DLocusShader(),
        //        this.materialParam.material, shaderParameAry);

        //}

    }
}