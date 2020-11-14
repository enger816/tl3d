module Pan3d {
    export class Display3DModelPartilce extends Display3DParticle {

        //protected _maxAnimTime: number;


        protected _resultUvVec: Array<number>;

        public constructor() {
            super();
            //this.objData = new ParticleGpuData();
            this._resultUvVec = new Array(2);
        }

        public get modeldata(): ParticleModelData {
            return <ParticleModelData>this.data;
        }

        public creatData(): void {
            this.data = new ParticleModelData;
        }

        public setVc(): void {

            this.updateWatchCaramMatrix();
            this.updateUV();

            // Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
            // Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
            // Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "posMatrix3D", this.modelMatrix.m);
            // Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "rotationMatrix3D", this._rotationMatrix.m);
            // Scene_data.context3D.setVc2fv(this.data.materialParam.shader, "uvMove", this._resultUvVec);

            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
            //this.data.setFloat32Mat("viewMatrix3D", Scene_data.viewMatrx3D.m);//0
            this.data.vcmatData.set(Scene_data.viewMatrx3D.m, 0);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
            //this.data.setFloat32Mat("camMatrix3D", Scene_data.cam3D.cameraMatrix.m);//16
            this.data.vcmatData.set(Scene_data.cam3D.cameraMatrix.m, 16);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "posMatrix3D", this.modelMatrix.m);
            //this.data.setFloat32Mat("posMatrix3D", this.modelMatrix.m);//48
            this.data.vcmatData.set(this.modelMatrix.m, 48);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "rotationMatrix3D", this._rotationMatrix.m);
            //this.data.setFloat32Mat("rotationMatrix3D", this._rotationMatrix.m);//32
            this.data.vcmatData.set(this._rotationMatrix.m, 32);
            //Scene_data.context3D.setVc2fv(this.data.materialParam.shader, "uvMove", this._resultUvVec);
            //this.data.setFloat32Vec("uvMove",this._resultUvVec);//64
            this.data.vcmatData.set(this._resultUvVec, 64);

            Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "vcmat", this.data.vcmatData);

            this.setMaterialVc();

        }

        public setVa(): void {
            //Scene_data.context3D.setVa(0, 3, this.data.objData.vertexBuffer);
            //Scene_data.context3D.setVa(1, 2, this.data.objData.uvBuffer);
            Scene_data.context3D.setWriteDepth((<ParticleModelData >this.data)._depthMode == 1)
            var tf: boolean = Scene_data.context3D.pushVa(this.data.objData.vertexBuffer);
            if (!tf) {
                Scene_data.context3D.setVaOffset(0, 3, this.data.objData.stride, 0);
                Scene_data.context3D.setVaOffset(1, 2, this.data.objData.stride, 12);
            }
            this.setMaterialTexture();
            Scene_data.context3D.drawCall(this.data.objData.indexBuffer, this.data.objData.treNum);

            Scene_data.context3D.setWriteDepth(false)
        }

        public updateWatchCaramMatrix(): void {
            this._rotationMatrix.identity();

            if (this.data._watchEye) {
                this.timeline.inverAxisRotation(this._rotationMatrix);

                this._rotationMatrix.prependRotation(-Scene_data.cam3D.rotationY, Vector3D.Y_AXIS);

                this._rotationMatrix.prependRotation(-Scene_data.cam3D.rotationX, Vector3D.X_AXIS);
            }

            if (this.data._isZiZhuan) {
                this.timeline.applySelfRotation(this._rotationMatrix, this.data._ziZhuanAngly);
            }


            //if (_axisRotaion) {
            //    _rotationMatrix.prependRotation(-_axisRotaion.num, _axisRotaion.axis);
            //}

        }

        public updateUV(): void {


            var currentFrame: number = Math.floor((this._time / Scene_data.frameTime) / this.data._animInterval);
            var _maxAnimTime: number = this.data._animLine * this.data._animRow;
            this._resultUvVec[0] = Math.floor(currentFrame % this.data._animLine) / this.data._animLine;
            this._resultUvVec[1] = Math.floor(currentFrame / this.data._animLine) / this.data._animRow;


            this._resultUvVec[0] += this._time / Scene_data.frameTime * this.data._uSpeed;
            this._resultUvVec[1] += this._time / Scene_data.frameTime * this.data._vSpeed;

        }

        //protected uploadToGpu(): void {
        //    this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
        //    this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
        //    this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
        //    this.objData.treNum = this.objData.indexs.length;
        //}


        //public setAllInfo(allObj: any): void {

        //    var obj: any = allObj.display;

        //    this._maxAnimTime = obj.maxAnimTime;

        //    this.objData.vertices = obj.vecData.ves;
        //    this.objData.uvs = obj.vecData.uvs;
        //    this.objData.indexs = obj.vecData.indexs;


        //    super.setAllInfo(allObj);

        //    this.uploadToGpu();
        //}



    }
}