var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Display3dShadow = /** @class */ (function (_super) {
    __extends(Display3dShadow, _super);
    function Display3dShadow() {
        var _this = _super.call(this) || this;
        _this.needUpdate = false;
        _this.locationFloat32 = new Float32Array(0);
        _this.shadowList = new Array;
        _this.objData = new ObjData;
        _this.shader = ProgrmaManager.getInstance().getProgram(Display3DShadowShader.Display3DShadowShader);
        _this.program = _this.shader.program;
        _this.posProLocation = Scene_data.context3D.getLocation(_this.program, "pos");
        return _this;
    }
    Display3dShadow.prototype.addShadow = function ($shdow) {
        this.shadowList.push($shdow);
        $shdow.display = this;
        this.applyObjData();
    };
    Display3dShadow.prototype.removeShadow = function ($shdow) {
        var index = this.shadowList.indexOf($shdow);
        if (index != -1) {
            this.shadowList.splice(index, 1);
            this.applyObjData();
        }
        if (this.shadowList.length == 0) {
        }
    };
    Display3dShadow.prototype.stateChage = function () {
        for (var i = 0; i < this.shadowList.length; i++) {
            if (this.shadowList[i].visible) {
                break;
            }
        }
        if (i == this.shadowList.length) {
            this.needUpdate = false;
        }
        else {
            this.needUpdate = true;
        }
    };
    Display3dShadow.prototype.hasIdle = function () {
        return this.shadowList.length < 30;
    };
    Display3dShadow.prototype.applyObjData = function () {
        this.objData.vertices.length = 0;
        this.objData.uvs.length = 0;
        this.objData.indexs.length = 0;
        var wh = 1;
        for (var i = 0; i < this.shadowList.length; i++) {
            this.objData.vertices.push(-wh, 0, wh, wh, 0, wh, wh, 0, -wh, -wh, 0, -wh);
            this.objData.uvs.push(0, 0, i, 0, 1, i, 1, 1, i, 1, 0, i);
            this.objData.indexs.push(i * 4, 1 + i * 4, 2 + i * 4, i * 4, 2 + i * 4, 3 + i * 4);
        }
        this.objData.treNum = this.shadowList.length * 6;
        if (this.objData.vertexBuffer) {
            Scene_data.context3D.uploadBuff3DByBuffer(this.objData.vertexBuffer, this.objData.vertices);
            Scene_data.context3D.uploadBuff3DByBuffer(this.objData.uvBuffer, this.objData.uvs);
            Scene_data.context3D.uploadIndexBuff3DByBuffer(this.objData.indexBuffer, this.objData.indexs);
        }
        else {
            this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
            this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
            this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
        }
    };
    Display3dShadow.prototype.update = function () {
        if (!this.needUpdate || this.shadowList.length == 0) {
            return;
        }
        if (this.objData.treNum) {
            Scene_data.context3D.setBlendParticleFactors(0);
            Scene_data.context3D.setProgram(this.program);
            Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
            Scene_data.context3D.setVcMatrix4fv(this.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
            if (this.locationFloat32.length != this.shadowList.length * 4) {
                this.locationFloat32 = new Float32Array(this.shadowList.length * 4);
            }
            for (var i = 0; i < this.shadowList.length; i++) {
                //Scene_data.context3D.setVc4fv(this.program, "pos[" + i + "]", this.shadowList[i].data);
                if (!this.shadowList[i].visible) {
                    //Scene_data.context3D.setVc4fvLocation(this.locationAry[i], [0, 10000, 0, 0]);
                    this.locationFloat32[i * 4 + 0] = 0;
                    this.locationFloat32[i * 4 + 1] = 10000;
                    this.locationFloat32[i * 4 + 2] = 0;
                    this.locationFloat32[i * 4 + 3] = 0;
                }
                else {
                    this.locationFloat32[i * 4 + 0] = this.shadowList[i].data[0];
                    this.locationFloat32[i * 4 + 1] = this.shadowList[i].data[1];
                    this.locationFloat32[i * 4 + 2] = this.shadowList[i].data[2];
                    this.locationFloat32[i * 4 + 3] = this.shadowList[i].data[3];
                }
            }
            Scene_data.context3D.setVc4fvLocation(this.posProLocation, this.locationFloat32);
            Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
            Scene_data.context3D.setVa(1, 3, this.objData.uvBuffer);
            Scene_data.context3D.setRenderTexture(this.shader, "s_texture", Display3dShadow.texture, 0);
            Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
        }
    };
    return Display3dShadow;
}(Display3D));
//# sourceMappingURL=Display3dShadow.js.map