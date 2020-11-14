var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Pan3d;
(function (Pan3d) {
    var Display3DBallPartilce = /** @class */ (function (_super) {
        __extends(Display3DBallPartilce, _super);
        function Display3DBallPartilce() {
            return _super.call(this) || this;
            //this.objData = new ParticleBallGpuData();
        }
        Object.defineProperty(Display3DBallPartilce.prototype, "balldata", {
            get: function () {
                return this.data;
            },
            enumerable: true,
            configurable: true
        });
        Display3DBallPartilce.prototype.creatData = function () {
            this.data = new Pan3d.ParticleBallData;
        };
        Display3DBallPartilce.prototype.setVa = function () {
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
            Pan3d.Scene_data.context3D.drawCall(this.data.objData.indexBuffer, this.data.objData.treNum);
        };
        Display3DBallPartilce.prototype.setVaCompress = function () {
            var tf = Pan3d.Scene_data.context3D.pushVa(this.data.objData.vertexBuffer);
            if (tf) {
                return;
            }
            Pan3d.Scene_data.context3D.setVaOffset(0, 3, this.data.objData.stride, 0);
            Pan3d.Scene_data.context3D.setVaOffset(1, 3, this.data.objData.stride, 12);
            Pan3d.Scene_data.context3D.setVaOffset(2, 4, this.data.objData.stride, 24);
            Pan3d.Scene_data.context3D.setVaOffset(3, 3, this.data.objData.stride, 40);
            if (this.balldata._needSelfRotation) {
                Pan3d.Scene_data.context3D.setVaOffset(4, 2, this.data.objData.stride, 52);
            }
            if (this.balldata._needRandomColor) {
                Pan3d.Scene_data.context3D.setVaOffset(5, 4, this.particleBallData.stride, this.particleBallData.randomOffset);
            }
        };
        Display3DBallPartilce.prototype.resetVa = function () {
            //Scene_data.context3D.clearVa(2);
            //Scene_data.context3D.clearVa(3);
            //Scene_data.context3D.clearVa(4);
            //Scene_data.context3D.clearVa(5);
        };
        Display3DBallPartilce.prototype.setVc = function () {
            this.updateWatchCaramMatrix();
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
            //this.balldata.setFloat32Mat("viewMatrix3D", Scene_data.viewMatrx3D.m);
            this.balldata.vcmatData.set(Pan3d.Scene_data.viewMatrx3D.m, 0);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
            //this.balldata.setFloat32Mat("camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
            this.balldata.vcmatData.set(Pan3d.Scene_data.cam3D.cameraMatrix.m, 16);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "modelMatrix", this.modelMatrix.m);
            //this.balldata.setFloat32Mat("modelMatrix", this.modelMatrix.m);//32
            this.balldata.vcmatData.set(this.modelMatrix.m, 32);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "watheye", this._rotationMatrix.m);
            //this.balldata.setFloat32Mat("watheye", this._rotationMatrix.m);//48
            this.balldata.vcmatData.set(this._rotationMatrix.m, 48);
            this.balldata._timeVec[0] = this._time / Pan3d.Scene_data.frameTime * this.balldata._playSpeed;
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
                this.balldata._caramPosVec[0] = Pan3d.Scene_data.cam3D.x;
                this.balldata._caramPosVec[1] = Pan3d.Scene_data.cam3D.y;
                this.balldata._caramPosVec[2] = Pan3d.Scene_data.cam3D.z;
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
            Pan3d.Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "vcmat", this.balldata.vcmatData);
            this.setMaterialVc();
        };
        Display3DBallPartilce.prototype.updateWatchCaramMatrix = function () {
            this._rotationMatrix.identity();
            if (this.balldata.facez) {
                this._rotationMatrix.prependRotation(90, Pan3d.Vector3D.X_AXIS);
            }
            else if (this.balldata._is3Dlizi) {
                //if (_axisRotaion) {
                //    _rotationMatrix.prependRotation(-_axisRotaion.num, _axisRotaion.axis);
                //}
                this.timeline.inverAxisRotation(this._rotationMatrix);
                this.inverBind();
            }
            else if (this.balldata._watchEye) {
                //if (_axisRotaion) {
                //    _rotationMatrix.prependRotation(-_axisRotaion.num, _axisRotaion.axis);
                //}
                this.timeline.inverAxisRotation(this._rotationMatrix);
                this.inverBind();
                this._rotationMatrix.prependRotation(-Pan3d.Scene_data.cam3D.rotationY, Pan3d.Vector3D.Y_AXIS);
                this._rotationMatrix.prependRotation(-Pan3d.Scene_data.cam3D.rotationX, Pan3d.Vector3D.X_AXIS);
            }
        };
        Display3DBallPartilce.prototype.updateAllRotationMatrix = function () {
            this.balldata._allRotationMatrix.identity();
            this.balldata._allRotationMatrix.prependScale(this.data.overAllScale * this._scaleX * 0.1 * this.bindScale.x, this.data.overAllScale * this._scaleY * 0.1 * this.bindScale.y, this.data.overAllScale * this._scaleZ * 0.1 * this.bindScale.z);
            //if (_axisRotaion) {
            //    _allRotationMatrix.appendRotation(_axisRotaion.num, _axisRotaion.axis, _axisRotaion.axisPos);
            //}
            this.timeline.inverAxisRotation(this._rotationMatrix);
            if (this.isInGroup) {
                this.balldata._allRotationMatrix.appendRotation(this.groupRotation.x, Pan3d.Vector3D.X_AXIS);
                this.balldata._allRotationMatrix.appendRotation(this.groupRotation.y, Pan3d.Vector3D.Y_AXIS);
                this.balldata._allRotationMatrix.appendRotation(this.groupRotation.z, Pan3d.Vector3D.Z_AXIS);
            }
            if (this.bindMatrix) {
                this.balldata._allRotationMatrix.append(this.bindMatrix);
            }
        };
        Object.defineProperty(Display3DBallPartilce.prototype, "particleBallData", {
            get: function () {
                return (this.data.objData);
            },
            enumerable: true,
            configurable: true
        });
        return Display3DBallPartilce;
    }(Pan3d.Display3DParticle));
    Pan3d.Display3DBallPartilce = Display3DBallPartilce;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Display3DBallPartilce.js.map