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
    var Display3DFollowLocusPartilce = /** @class */ (function (_super) {
        __extends(Display3DFollowLocusPartilce, _super);
        function Display3DFollowLocusPartilce() {
            var _this = _super.call(this) || this;
            _this.flag = 0;
            //this.objData = new ParticleGpuData();
            _this._caramPosVec = [0, 0, 0];
            return _this;
        }
        Object.defineProperty(Display3DFollowLocusPartilce.prototype, "followlocusdata", {
            get: function () {
                return this.data;
            },
            enumerable: true,
            configurable: true
        });
        Display3DFollowLocusPartilce.prototype.creatData = function () {
            this.data = new Pan3d.ParticleFollowLocusData;
        };
        // public setAllByteInfo($byte: ByteArray, version: number = 0): void {
        //     super.setAllByteInfo($byte, version);
        //     this.initBindMatrixAry();
        // }
        Display3DFollowLocusPartilce.prototype.onCreated = function () {
            this.initBindMatrixAry();
        };
        Display3DFollowLocusPartilce.prototype.initBindMatrixAry = function () {
            this._bindPosAry = new Array;
            this._gpuVc = new Float32Array(this.followlocusdata._fenduanshu * 6);
            for (var i = 0; i <= this.followlocusdata._fenduanshu; i++) {
                this._bindPosAry.push([0, 0, 5 * i]);
                this._bindPosAry.push([0, 0, 1]);
            }
        };
        Display3DFollowLocusPartilce.prototype.setVa = function () {
            var tf = Pan3d.Scene_data.context3D.pushVa(this.data.objData.vertexBuffer);
            if (!tf) {
                Pan3d.Scene_data.context3D.setVaOffset(0, 3, this.data.objData.stride, 0);
                Pan3d.Scene_data.context3D.setVaOffset(1, 2, this.data.objData.stride, 12);
            }
            // Scene_data.context3D.setVa(0, 3, this.data.objData.vertexBuffer);
            // Scene_data.context3D.setVa(1, 2, this.data.objData.uvBuffer);
            this.setMaterialTexture();
            Pan3d.Scene_data.context3D.drawCall(this.data.objData.indexBuffer, this.data.objData.treNum);
        };
        Display3DFollowLocusPartilce.prototype.setVc = function () {
            this.updateMatrix();
            this.updateBind();
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
            this.data.vcmatData.set(Pan3d.Scene_data.viewMatrx3D.m, 0);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
            this.data.vcmatData.set(Pan3d.Scene_data.cam3D.cameraMatrix.m, 16);
            this._caramPosVec[0] = Pan3d.Scene_data.cam3D.x;
            this._caramPosVec[1] = Pan3d.Scene_data.cam3D.y;
            this._caramPosVec[2] = Pan3d.Scene_data.cam3D.z;
            //Scene_data.context3D.setVc3fv(this.data.materialParam.shader, "camPos", this._caramPosVec);
            this.data.vcmatData.set(this._caramPosVec, 32);
            Pan3d.Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "vcmat", this.data.vcmatData);
            this.setBindPosVc();
            this.setMaterialVc();
        };
        Display3DFollowLocusPartilce.prototype.setBindPosVc = function () {
            for (var i = 0; i < this._bindPosAry.length; i++) {
                Pan3d.Scene_data.context3D.setVc3fv(this.data.materialParam.shader, "bindpos[" + i + "]", this._bindPosAry[i]);
            }
        };
        Display3DFollowLocusPartilce.prototype.reset = function () {
            this.resetPos();
            _super.prototype.reset.call(this);
        };
        Display3DFollowLocusPartilce.prototype.updateMatrix = function () {
            this.modelMatrix.identity();
            this.modelMatrix.prepend(this.posMatrix);
        };
        Display3DFollowLocusPartilce.prototype.resetPos = function () {
            for (var i = 0; i < this._bindPosAry.length; i += 2) {
                this._bindPosAry[i][0] = this.bindVecter3d.x;
                this._bindPosAry[i][1] = this.bindVecter3d.y;
                this._bindPosAry[i][2] = this.bindVecter3d.z;
            }
            this.flag = Pan3d.TimeUtil.getTimer();
        };
        Display3DFollowLocusPartilce.prototype.updateBind = function () {
            var ctime = Pan3d.TimeUtil.getTimer();
            if ((ctime - this.flag) >= Display3DFollowLocusPartilce.waitCdTime) {
                var normal = this._bindPosAry.pop();
                var pos = this._bindPosAry.pop();
                pos[0] = this.bindVecter3d.x;
                pos[1] = this.bindVecter3d.y;
                pos[2] = this.bindVecter3d.z;
                var pos0 = this._bindPosAry[0];
                var normal0 = this._bindPosAry[1];
                var v3d = new Pan3d.Vector3D(pos[0] - pos0[0], pos[1] - pos0[1], pos[2] - pos0[2]);
                v3d.normalize();
                normal0[0] = v3d.x;
                normal[0] = v3d.x;
                normal0[1] = v3d.y;
                normal[1] = v3d.y;
                normal0[2] = v3d.z;
                normal[2] = v3d.z;
                this._bindPosAry.unshift(normal);
                this._bindPosAry.unshift(pos);
                this.flag = ctime;
            }
        };
        Display3DFollowLocusPartilce.waitCdTime = 35;
        return Display3DFollowLocusPartilce;
    }(Pan3d.Display3DParticle));
    Pan3d.Display3DFollowLocusPartilce = Display3DFollowLocusPartilce;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Display3DFollowLocusPartilce.js.map