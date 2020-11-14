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
var Display3dBg = /** @class */ (function (_super) {
    __extends(Display3dBg, _super);
    function Display3dBg() {
        var _this = _super.call(this) || this;
        _this._scaleData = [1, 1];
        _this.shader = ProgrmaManager.getInstance().getProgram(UIImageShader.UI_IMG_SHADER);
        _this.program = _this.shader;
        _this.initData();
        return _this;
    }
    Display3dBg.prototype.initData = function () {
        this.objData = new ObjData();
        this.objData.vertices.push(-1, 1, 0.99, 1, 1, 0.99, 1, -1, 0.99, -1, -1, 0.99);
        this.objData.uvs.push(0, 0, 1, 0, 1, 1, 0, 1);
        this.objData.indexs.push(0, 1, 2, 0, 2, 3);
        this.objData.treNum = 6;
        this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
        this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
        this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
    };
    Display3dBg.prototype.resize = function () {
        this.appleyPos();
    };
    Display3dBg.prototype.setImgInfo = function ($url, $width, $height) {
        this.setImgUrl($url);
        this._width = $width;
        this._height = $height;
    };
    Display3dBg.prototype.setImgUrl = function ($url) {
        //TextureManager.getInstance().getTexture(Scene_data.fileRoot + $url, ($texture: WebGLTexture) => {
        //    this.texture = $texture;
        //});
    };
    Display3dBg.prototype.appleyPos = function () {
        var widthScale = this._width / Scene_data.stageWidth;
        var heightScale = this._height / Scene_data.stageHeight;
        if (widthScale < heightScale) {
            this._scaleData[0] = 1;
            this._scaleData[1] = (this._height / Scene_data.stageHeight) / widthScale;
        }
        else {
            this._scaleData[0] = (this._width / Scene_data.stageWidth) / heightScale;
            this._scaleData[1] = 1;
        }
    };
    Display3dBg.prototype.update = function () {
        this.appleyPos();
        Scene_data.context3D.setBlendParticleFactors(0);
        Scene_data.context3D.setProgram(this.program);
        Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
        Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
        Scene_data.context3D.setVc2fv(this.shader, "scale", this._scaleData);
        Scene_data.context3D.setVcFloat(this.shader, "alpha", [1.0]);
        Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.texture, 0);
        Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
    };
    return Display3dBg;
}(Display3D));
//# sourceMappingURL=Display3dBg.js.map