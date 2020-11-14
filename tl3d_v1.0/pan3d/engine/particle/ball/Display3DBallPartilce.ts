module Pan3d {
    export class Display3DBallPartilce extends Display3DParticle {

        public constructor() {
            super();
            //this.objData = new ParticleBallGpuData();
        }

        public get balldata(): ParticleBallData {
            return <ParticleBallData>this.data;
        }

        public creatData(): void {
            this.data = new ParticleBallData;
        }

        public setVa(): void {
            this.setVaCompress();
            /**
            Scene_data.context3D.setVa(0, 3, this.data.objData.vertexBuffer);
            Scene_data.context3D.setVa(1, 3, this.data.objData.uvBuffer);
            Scene_data.context3D.setVa(2, 4, this.particleBallData.basePosBuffer);
            Scene_data.context3D.setVa(3, 3, this.particleBallData.beMoveBuffer);
    
            if (this.balldata._needSelfRotation) {
                Scene_data.context3D.setVa(4, 2, this.particleBallData.baseRotationBuffer);
            }
    
            if (this.balldata._needRandomColor) {
                Scene_data.context3D.setVa(5, 4, this.particleBallData.randomColorBuffer);
            }
             */
            this.setMaterialTexture();

            Scene_data.context3D.drawCall(this.data.objData.indexBuffer, this.data.objData.treNum);
        }

        public setVaCompress(): void {
            var tf: boolean = Scene_data.context3D.pushVa(this.data.objData.vertexBuffer);
            if (tf) {
                return;
            }

            Scene_data.context3D.setVaOffset(0, 3, this.data.objData.stride, 0);
            Scene_data.context3D.setVaOffset(1, 3, this.data.objData.stride, 12);
            Scene_data.context3D.setVaOffset(2, 4, this.data.objData.stride, 24);
            Scene_data.context3D.setVaOffset(3, 3, this.data.objData.stride, 40);

            if (this.balldata._needSelfRotation) {
                Scene_data.context3D.setVaOffset(4, 2, this.data.objData.stride, 52);
            }

            if (this.balldata._needRandomColor) {
                Scene_data.context3D.setVaOffset(5, 4, this.particleBallData.stride, this.particleBallData.randomOffset);
            }


        }

        public resetVa(): void {
            //Scene_data.context3D.clearVa(2);
            //Scene_data.context3D.clearVa(3);
            //Scene_data.context3D.clearVa(4);
            //Scene_data.context3D.clearVa(5);
        }

        public setVc(): void {
            this.updateWatchCaramMatrix();

            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
            //this.balldata.setFloat32Mat("viewMatrix3D", Scene_data.viewMatrx3D.m);
            this.balldata.vcmatData.set(Scene_data.viewMatrx3D.m, 0);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
            //this.balldata.setFloat32Mat("camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
            this.balldata.vcmatData.set(Scene_data.cam3D.cameraMatrix.m, 16);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "modelMatrix", this.modelMatrix.m);
            //this.balldata.setFloat32Mat("modelMatrix", this.modelMatrix.m);//32
            this.balldata.vcmatData.set(this.modelMatrix.m, 32);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "watheye", this._rotationMatrix.m);
            //this.balldata.setFloat32Mat("watheye", this._rotationMatrix.m);//48
            this.balldata.vcmatData.set(this._rotationMatrix.m, 48);

            this.balldata._timeVec[0] = this._time / Scene_data.frameTime * this.balldata._playSpeed;
            //Scene_data.context3D.setVc4fv(this.data.materialParam.shader, "time", this.balldata._timeVec);
            //this.balldata.setFloat32Vec("time", this.balldata._timeVec);//80
            this.balldata.vcmatData.set(this.balldata._timeVec, 80);

            /**
             if (this.balldata._needAddSpeed){
                 Scene_data.context3D.setVc3fv(this.data.materialParam.shader, "force", this.balldata._addSpeedVec);
             }
    
             if (this.balldata._needScale){
                 Scene_data.context3D.setVc4fv(this.data.materialParam.shader, "scale", this.balldata._scaleVec);
                 Scene_data.context3D.setVc4fv(this.data.materialParam.shader, "scaleCtrl", this.balldata._scaleCtrlVec);
             }
            */
            if (this.balldata._is3Dlizi) {
                this.updateAllRotationMatrix();

                this.balldata._wordPosVec[0] = this.bindVecter3d.x;
                this.balldata._wordPosVec[1] = this.bindVecter3d.y;
                this.balldata._wordPosVec[2] = this.bindVecter3d.z;

                this.balldata._caramPosVec[0] = Scene_data.cam3D.x;
                this.balldata._caramPosVec[1] = Scene_data.cam3D.y;
                this.balldata._caramPosVec[2] = Scene_data.cam3D.z;

                //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "rotationMatrix", this.balldata._allRotationMatrix.m);
                //this.balldata.setFloat32Mat("rotationMatrix", this.balldata._allRotationMatrix.m);//64
                this.balldata.vcmatData.set(this.balldata._allRotationMatrix.m, 64);
                //Scene_data.context3D.setVc3fv(this.data.materialParam.shader, "worldPos", this.balldata._wordPosVec);
                //this.balldata.setFloat32Vec("worldPos", this.balldata._wordPosVec);//96
                this.balldata.vcmatData.set(this.balldata._wordPosVec, 96);
                //Scene_data.context3D.setVc3fv(this.data.materialParam.shader, "camPos", this.balldata._caramPosVec);
                //this.balldata.setFloat32Vec("camPos", this.balldata._caramPosVec);//100
                this.balldata.vcmatData.set(this.balldata._caramPosVec, 100);
            }
            /**
            if (this.balldata._uvType == 1) {
                Scene_data.context3D.setVc3fv(this.data.materialParam.shader, "animCtrl", this.balldata._animCtrlVec);
            } else if (this.balldata._uvType == 2) {
                Scene_data.context3D.setVc2fv(this.data.materialParam.shader, "uvCtrl", this.balldata._uvCtrlVec);
            }
             */

            Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "vcmat", this.balldata.vcmatData);

            this.setMaterialVc();

        }


        public updateWatchCaramMatrix(): void {
            this._rotationMatrix.identity();

            if (this.balldata.facez) {
                this._rotationMatrix.prependRotation(90, Vector3D.X_AXIS);
            } else if (this.balldata._is3Dlizi) {
                //if (_axisRotaion) {
                //    _rotationMatrix.prependRotation(-_axisRotaion.num, _axisRotaion.axis);
                //}
                this.timeline.inverAxisRotation(this._rotationMatrix);
                this.inverBind();
            } else if (this.balldata._watchEye) {
                //if (_axisRotaion) {
                //    _rotationMatrix.prependRotation(-_axisRotaion.num, _axisRotaion.axis);
                //}
                this.timeline.inverAxisRotation(this._rotationMatrix);
                this.inverBind();

                this._rotationMatrix.prependRotation(-Scene_data.cam3D.rotationY, Vector3D.Y_AXIS);
                this._rotationMatrix.prependRotation(-Scene_data.cam3D.rotationX, Vector3D.X_AXIS);

            }


        }

        public updateAllRotationMatrix(): void {
            this.balldata._allRotationMatrix.identity();

            this.balldata._allRotationMatrix.prependScale(this.data.overAllScale * this._scaleX * 0.1 * this.bindScale.x,
                this.data.overAllScale * this._scaleY * 0.1 * this.bindScale.y,
                this.data.overAllScale * this._scaleZ * 0.1 * this.bindScale.z);

            //if (_axisRotaion) {
            //    _allRotationMatrix.appendRotation(_axisRotaion.num, _axisRotaion.axis, _axisRotaion.axisPos);
            //}

            this.timeline.inverAxisRotation(this._rotationMatrix);

            if (this.isInGroup) {
                this.balldata._allRotationMatrix.appendRotation(this.groupRotation.x, Vector3D.X_AXIS);
                this.balldata._allRotationMatrix.appendRotation(this.groupRotation.y, Vector3D.Y_AXIS);
                this.balldata._allRotationMatrix.appendRotation(this.groupRotation.z, Vector3D.Z_AXIS);
            }

            if (this.bindMatrix) {
                this.balldata._allRotationMatrix.append(this.bindMatrix);
            }


        }

        public get particleBallData(): ParticleBallGpuData {
            return <ParticleBallGpuData>(this.data.objData);
        }





        //public setAllInfo(allObj:any): void {


        //    var obj: any = allObj.display;
        //    this._totalNum = obj.totalNum;
        //    this._acceleration = obj.acceleration;
        //    this._toscale = obj.toscale;
        //    this._shootSpeed = obj.shootSpeed;
        //    this._isRandom = obj.isRandom;
        //    this._isSendRandom = obj.isSendRandom;
        //    this._round = this.getVector3DByObject(obj.round);
        //    this._is3Dlizi = obj.is3Dlizi;
        //    this._halfCircle = obj.halfCircle;
        //    this._shootAngly = this.getVector3DByObject(obj.shootAngly);
        //    this._speed = obj.speed;
        //    this._isLoop = obj.isLoop;
        //    this._isSendAngleRandom = obj.isSendAngleRandom;
        //    this._waveform = this.getVector3DByObject(obj.waveform);
        //    this._closeSurface = obj.closeSurface;
        //    this._isEven = obj.isEven;
        //    this._paticleMaxScale = obj.paticleMaxScale;
        //    this._paticleMinScale = obj.paticleMinScale;
        //    this._basePositon = this.getVector3DByObject(obj.basePositon);
        //    this._baseRandomAngle = obj.baseRandomAngle;
        //    this._shapeType = obj.shapeType;

        //    this._lockX = obj.lockX;
        //    this._lockY = obj.lockY;

        //    this._textureRandomColorInfo = obj.randomColor;

        //    this._addforce = this.getVector3DByObject(obj.addforce);
        //    this._addforce.scaleByW();

        //    this._lixinForce = this.getVector3DByObject(obj.lixinForce);

        //    this._islixinAngly = obj.islixinAngly;
        //    this._particleRandomScale = this.getVector3DByObject(obj.particleRandomScale);
        //    this._playSpeed = obj.playSpeed;
        //    this.facez = obj.facez;
        //    this._beginScale = obj.beginScale;


        //    if (this._acceleration != 0 || this._addforce.x != 0 || this._addforce.y != 0 || this._addforce.z != 0) {
        //        this._needAddSpeed = true;
        //        this._addSpeedVec = [this._addforce.x, this._addforce.y, this._addforce.z];
        //    } else {
        //        this._needAddSpeed = false;
        //    }






        //    if (this._toscale != 0 || this._waveform.x != 0 || this._waveform.y != 0) {
        //        this._needScale = true;
        //        this._scaleVec = [this._toscale, this._waveform.x, this._waveform.y, this._beginScale];
        //        this._widthFixed = obj.widthFixed;
        //        this._heightFixed = obj.heightFixed;
        //        this._scaleCtrlVec = [this._widthFixed ? 0 : 1, this._heightFixed ? 0 : 1, this._paticleMaxScale - 1, this._paticleMinScale - 1];
        //    } else {
        //        this._needScale = false;
        //    }

        //    super.setAllInfo(allObj);

        //    this._timeVec = [0, this._acceleration, this._life, this._isLoop ? 1 : -1];

        //    if (this._is3Dlizi){
        //        this._wordPosVec = [0, 0, 0];
        //        this._caramPosVec = [0, 0, 0];

        //        this._allRotationMatrix = new Matrix3D();
        //    }


        //    this.uploadToGpu();

        //}



        //public regShader(): void {
        //    if (!this.materialParam) {
        //        return;
        //    }

        //    var shaderParameAry: Array<number> = this.getShaderParam();

        //    this.materialParam.program = ProgrmaManager.getInstance().getMaterialProgram(Display3DBallShader.Display3D_Ball_Shader, new Display3DBallShader(), this.materialParam.material, shaderParameAry);

        //}

        //public getShaderParam(): Array<number> {
        //    if (this._animRow != 1 || this._animLine != 1) {
        //        this._uvType = 1;
        //        this._animCtrlVec = [this._animLine, this._animRow, this._animInterval];
        //    } else if (this._uSpeed != 0 || this._vSpeed != 0) {
        //        this._uvType = 2;
        //        this._uvCtrlVec = [this._uSpeed, this._vSpeed];
        //    } else {
        //        this._uvType = 0;
        //    }

        //    var hasParticleColor: boolean = this.materialParam.material.hasParticleColor;
        //    this._needRandomColor = this.materialParam.material.hasVertexColor;
        //    if (this._needRandomColor) {
        //        this.initBaseColor();
        //    }

        //    var shaderParameAry: Array<number>;

        //    var hasParticle: number;
        //    if (hasParticleColor) {
        //        hasParticle = 1;
        //    } else {
        //        hasParticle = 0;
        //    }

        //    var hasRandomClolr: number = this._needRandomColor ? 1 : 0;

        //    var isMul: number = this._is3Dlizi ? 1 : 0;

        //    var needRotation: number = this._needSelfRotation ? 1 : 0;

        //    var needScale: number = this._needScale ? 1 : 0;

        //    var needAddSpeed: number = this._needAddSpeed ? 1 : 0;

        //    shaderParameAry = [hasParticle, hasRandomClolr, isMul, needRotation, needScale, needAddSpeed, this._uvType];

        //    return shaderParameAry;
        //}


    }
}