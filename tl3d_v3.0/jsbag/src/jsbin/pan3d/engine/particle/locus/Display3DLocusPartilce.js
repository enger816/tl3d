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
    var Display3DLocusPartilce = /** @class */ (function (_super) {
        __extends(Display3DLocusPartilce, _super);
        function Display3DLocusPartilce() {
            return _super.call(this) || this;
            //this.objData = new ParticleGpuData();
        }
        Object.defineProperty(Display3DLocusPartilce.prototype, "locusdata", {
            get: function () {
                return this.data;
            },
            enumerable: true,
            configurable: true
        });
        Display3DLocusPartilce.prototype.creatData = function () {
            this.data = new Pan3d.ParticleLocusData;
        };
        Display3DLocusPartilce.prototype.setVa = function () {
            var tf = Pan3d.Scene_data.context3D.pushVa(this.data.objData.vertexBuffer);
            if (!tf) {
                Pan3d.Scene_data.context3D.setVaOffset(0, 3, this.data.objData.stride, 0);
                Pan3d.Scene_data.context3D.setVaOffset(1, 2, this.data.objData.stride, 28);
                if (this.data._watchEye) {
                    Pan3d.Scene_data.context3D.setVaOffset(2, 4, this.data.objData.stride, 12);
                }
            }
            // Scene_data.context3D.setVa(0, 3, this.data.objData.vertexBuffer);
            // Scene_data.context3D.setVa(1, 2, this.data.objData.uvBuffer);
            // if (this.data._watchEye){
            //     Scene_data.context3D.setVa(2, 4, this.data.objData.normalsBuffer);
            // }
            this.setMaterialTexture();
            Pan3d.Scene_data.context3D.drawCall(this.data.objData.indexBuffer, this.data.objData.treNum);
        };
        Display3DLocusPartilce.prototype.setVc = function () {
            this.updateUV();
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
            //this.data.setFloat32Mat("viewMatrix3D", Scene_data.viewMatrx3D.m);//0
            this.data.vcmatData.set(Pan3d.Scene_data.viewMatrx3D.m, 0);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
            //this.data.setFloat32Mat("camMatrix3D", Scene_data.cam3D.cameraMatrix.m);//16
            this.data.vcmatData.set(Pan3d.Scene_data.cam3D.cameraMatrix.m, 16);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "posMatrix3D", this.modelMatrix.m);
            //this.data.setFloat32Mat("posMatrix3D", this.modelMatrix.m);//32
            this.data.vcmatData.set(this.modelMatrix.m, 32);
            //Scene_data.context3D.setVc3fv(this.data.materialParam.shader, "uvMove", this.locusdata._resultUvVec);
            //this.data.setFloat32Vec("uvMove", this.locusdata._resultUvVec);//48
            this.data.vcmatData.set(this.locusdata._resultUvVec, 48);
            if (this.data._watchEye) {
                this.locusdata._caramPosVec[0] = Pan3d.Scene_data.cam3D.x;
                this.locusdata._caramPosVec[1] = Pan3d.Scene_data.cam3D.y;
                this.locusdata._caramPosVec[2] = Pan3d.Scene_data.cam3D.z;
                //Scene_data.context3D.setVc3fv(this.data.materialParam.shader, "camPos", this.locusdata._caramPosVec);
                //this.data.setFloat32Vec("camPos", this.locusdata._caramPosVec);//52
                this.data.vcmatData.set(this.locusdata._caramPosVec, 52);
            }
            if (this.locusdata._changUv) {
                //Scene_data.context3D.setVc3fv(this.data.materialParam.shader, "isUv", this.locusdata._uvVec);
                this.data.setFloat32Vec("isUv", this.locusdata._uvVec); //56
            }
            Pan3d.Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "vcmat", this.data.vcmatData);
            this.setMaterialVc();
        };
        Display3DLocusPartilce.prototype.updateUV = function () {
            var $nowTime = this._time / Pan3d.Scene_data.frameTime;
            var $lifeRoundNum = (this.data._life / 100);
            var $moveUv = this.locusdata._speed * $nowTime / this.locusdata._density / 10;
            if (this.locusdata._isEnd) {
                $moveUv = Math.min(1, $moveUv);
            }
            if (this.locusdata._isLoop) {
                if (this.locusdata._life) {
                    $moveUv = $moveUv % ($lifeRoundNum + 1);
                }
                else {
                    $moveUv = $moveUv % 1;
                }
            }
            this.locusdata._resultUvVec[0] = $moveUv;
        };
        return Display3DLocusPartilce;
    }(Pan3d.Display3DParticle));
    Pan3d.Display3DLocusPartilce = Display3DLocusPartilce;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Display3DLocusPartilce.js.map