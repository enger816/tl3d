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
var Display3DSky = /** @class */ (function (_super) {
    __extends(Display3DSky, _super);
    function Display3DSky() {
        var _this = _super.call(this) || this;
        _this.shader = ProgrmaManager.getInstance().getProgram(SkyShader.Sky_Shader);
        _this.program = _this.shader.program;
        return _this;
    }
    Display3DSky.prototype.setObjUrl = function (value) {
        var _this = this;
        this.objurl = value;
        ObjDataManager.getInstance().getObjData(Scene_data.fileRoot + value, function ($objData) {
            _this.objData = $objData;
        });
    };
    Display3DSky.prototype.setCubeUrl = function (value) {
        var _this = this;
        TextureManager.getInstance().loadCubeTexture(value, function ($ary) { _this.cubeTextList = $ary; });
    };
    Display3DSky.prototype.update = function () {
        Scene_data.context3D.setProgram(this.program);
        Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
        Scene_data.context3D.setVcMatrix4fv(this.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
        Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);
        if (this.cubeTextList) {
            Scene_data.context3D.setRenderTextureCube(this.program, "s_texture", this.cubeTextList[0], 0);
        }
        Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
        Scene_data.context3D.setVa(1, 3, this.objData.normalsBuffer);
        Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
    };
    return Display3DSky;
}(Display3D));
//# sourceMappingURL=Display3DSky.js.map