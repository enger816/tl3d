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
    var Display3DFollowPartilce = /** @class */ (function (_super) {
        __extends(Display3DFollowPartilce, _super);
        function Display3DFollowPartilce() {
            var _this = _super.call(this) || this;
            _this.flag = 0;
            return _this;
        }
        Object.defineProperty(Display3DFollowPartilce.prototype, "followdata", {
            get: function () {
                return this.data;
            },
            enumerable: true,
            configurable: true
        });
        Display3DFollowPartilce.prototype.creatData = function () {
            this.data = new Pan3d.ParticleFollowData;
        };
        Display3DFollowPartilce.prototype.onCreated = function () {
            this.initBingMatrixAry();
        };
        // public setAllByteInfo($byte: ByteArray, version: number = 0): void {
        //     super.setAllByteInfo($byte, version);
        //     this.initBingMatrixAry();
        // }
        Display3DFollowPartilce.prototype.setVc = function () {
            _super.prototype.setVc.call(this);
            this.updateBind();
            // for (var i: number = 0; i < this.followdata._totalNum; i++) {
            //     Scene_data.context3D.setVc3fv(this.data.materialParam.shader, "bindpos[" + i + "]", this._bindMatrixAry[i]);
            // }
            Pan3d.Scene_data.context3D.setVc3fv(this.data.materialParam.shader, "bindpos", this._bindMatrixAry);
        };
        Display3DFollowPartilce.prototype.initBingMatrixAry = function () {
            this._bindMatrixAry = new Float32Array(40 * 3);
            this._bindFlagAry = new Array;
            for (var i = 0; i < this.followdata._totalNum; i++) {
                //this._bindMatrixAry.push([0, 0, 0]);
                this._bindFlagAry.push(0);
            }
        };
        Display3DFollowPartilce.prototype.updateBind = function () {
            var time = this._time / Pan3d.Scene_data.frameTime;
            for (var i = this.flag; i < this.followdata._totalNum; i++) {
                var temp = (time - i * this.followdata._shootSpeed) / this.followdata._life;
                if (temp >= this._bindFlagAry[i]) {
                    //   //console.log(this.bindVecter3d);
                    var flag = i * 3;
                    this._bindMatrixAry[flag] = this.bindVecter3d.x;
                    this._bindMatrixAry[flag + 1] = this.bindVecter3d.y;
                    this._bindMatrixAry[flag + 2] = this.bindVecter3d.z;
                    this._bindFlagAry[i]++;
                }
            }
        };
        Display3DFollowPartilce.prototype.updateMatrix = function () {
            if (!this.bindMatrix) {
                return;
            }
            this.modelMatrix.identity();
            if (!this.groupMatrix.isIdentity) {
                this.posMatrix.append(this.groupMatrix);
            }
            this.modelMatrix.append(this.posMatrix);
        };
        Display3DFollowPartilce.prototype.updateAllRotationMatrix = function () {
            this.followdata._allRotationMatrix.identity();
            this.followdata._allRotationMatrix.prependScale(this.followdata.overAllScale * this._scaleX * 0.1 * this.bindScale.x, this.followdata.overAllScale * this._scaleY * 0.1 * this.bindScale.y, this.followdata.overAllScale * this._scaleZ * 0.1 * this.bindScale.z);
            if (this.isInGroup) {
                this.followdata._allRotationMatrix.appendRotation(this.groupRotation.x, Pan3d.Vector3D.X_AXIS);
                this.followdata._allRotationMatrix.appendRotation(this.groupRotation.y, Pan3d.Vector3D.Y_AXIS);
                this.followdata._allRotationMatrix.appendRotation(this.groupRotation.z, Pan3d.Vector3D.Z_AXIS);
            }
        };
        Display3DFollowPartilce.prototype.reset = function () {
            _super.prototype.reset.call(this);
            for (var i = 0; i < this.followdata._totalNum; i++) {
                this._bindMatrixAry[i * 3] = 0;
                this._bindMatrixAry[i * 3 + 1] = 0;
                this._bindMatrixAry[i * 3 + 2] = 0;
                this._bindFlagAry[i] = 0;
            }
        };
        Display3DFollowPartilce.prototype.updateWatchCaramMatrix = function () {
            this._rotationMatrix.identity();
            if (this.followdata.facez) {
                this._rotationMatrix.prependRotation(90, Pan3d.Vector3D.X_AXIS);
            }
            else if (this.followdata._watchEye) {
                this._rotationMatrix.prependRotation(-Pan3d.Scene_data.cam3D.rotationY, Pan3d.Vector3D.Y_AXIS);
                this._rotationMatrix.prependRotation(-Pan3d.Scene_data.cam3D.rotationX, Pan3d.Vector3D.X_AXIS);
            }
        };
        return Display3DFollowPartilce;
    }(Pan3d.Display3DBallPartilce));
    Pan3d.Display3DFollowPartilce = Display3DFollowPartilce;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Display3DFollowPartilce.js.map