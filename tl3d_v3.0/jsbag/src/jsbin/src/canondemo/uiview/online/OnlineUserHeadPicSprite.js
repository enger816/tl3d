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
var online;
(function (online) {
    var Shader3D = Pan3d.Shader3D;
    var Display3D = Pan3d.Display3D;
    var ObjData = Pan3d.ObjData;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var UIManager = Pan3d.UIManager;
    var TextureManager = Pan3d.TextureManager;
    var Scene_data = Pan3d.Scene_data;
    var ArtFont = Pan3d.ArtFont;
    var OnlineUserHeadPicShader = /** @class */ (function (_super) {
        __extends(OnlineUserHeadPicShader, _super);
        function OnlineUserHeadPicShader() {
            return _super.call(this) || this;
        }
        OnlineUserHeadPicShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
        };
        OnlineUserHeadPicShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Position;" +
                "attribute vec2 u2Texture;" +
                "uniform mat4 viewMatrix3D;" +
                "uniform mat4 camMatrix3D;" +
                "uniform mat4 posMatrix3D;" +
                "varying vec2 v_texCoord;" +
                "void main(void)" +
                "{" +
                "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   vt0 = posMatrix3D * vt0;" +
                "   vt0 = camMatrix3D * vt0;" +
                "   vt0 = viewMatrix3D * vt0;" +
                "   gl_Position = vt0;" +
                "}";
            return $str;
        };
        OnlineUserHeadPicShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 v_texCoord;\n" +
                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                "if (infoUv.a <= 0.9) {\n" +
                "     discard;\n" +
                "}\n" +
                "gl_FragColor =infoUv;\n" +
                "}";
            return $str;
        };
        OnlineUserHeadPicShader.OnlineUserHeadPicShader = "OnlineUserHeadPicShader";
        return OnlineUserHeadPicShader;
    }(Shader3D));
    online.OnlineUserHeadPicShader = OnlineUserHeadPicShader;
    var OnlineUserHeadPicSprite = /** @class */ (function (_super) {
        __extends(OnlineUserHeadPicSprite, _super);
        function OnlineUserHeadPicSprite() {
            var _this = _super.call(this) || this;
            _this.picSize64 = 64;
            _this.initData();
            _this.updateMatrix;
            return _this;
        }
        OnlineUserHeadPicSprite.prototype.initData = function () {
            ProgrmaManager.getInstance().registe(OnlineUserHeadPicShader.OnlineUserHeadPicShader, new OnlineUserHeadPicShader);
            this.shader = ProgrmaManager.getInstance().getProgram(OnlineUserHeadPicShader.OnlineUserHeadPicShader);
            this.program = this.shader.program;
            var $w = 8;
            var $h = 16;
            this.objData = new ObjData;
            this.objData.vertices = new Array();
            this.objData.vertices.push(-$w, +$h, 0);
            this.objData.vertices.push(+$w, +$h, 0);
            this.objData.vertices.push(+$w, -$h, 0);
            this.objData.vertices.push(-$w, -$h, 0);
            this.objData.uvs = new Array();
            this.objData.uvs.push(0, 0);
            this.objData.uvs.push(1, 0);
            this.objData.uvs.push(1, 1);
            this.objData.uvs.push(0, 1);
            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 1, 2);
            this.objData.indexs.push(0, 2, 3);
            this.loadTexture();
            this.upToGpu();
        };
        OnlineUserHeadPicSprite.prototype.loadTexture = function () {
            var $ctx = UIManager.getInstance().getContext2D(this.picSize64, this.picSize64 * 2, false);
            $ctx.fillStyle = "rgb(255,255,255,0)";
            $ctx.fillRect(0, 0, this.picSize64, this.picSize64 * 2);
            this._uvTextureRes = TextureManager.getInstance().getCanvasTexture($ctx);
        };
        OnlineUserHeadPicSprite.prototype.setPicUrl = function ($url) {
            var _this = this;
            GameData.loadImgByPicUrl($url, function ($img) {
                var $ctx = UIManager.getInstance().getContext2D(_this.picSize64, _this.picSize64, false);
                var context = $ctx;
                $ctx.drawImage($img, 0, 0, _this.picSize64, _this.picSize64);
                $ctx.fillStyle = "rgba(255,255,255,1)";
                $ctx.fillRect(0, 0, 5, _this.picSize64);
                $ctx.fillRect(0, 0, _this.picSize64, 5);
                $ctx.fillRect(0, _this.picSize64 - 5, _this.picSize64, 5);
                $ctx.fillRect(_this.picSize64 - 5, 0, 5, _this.picSize64);
                TextureManager.getInstance().updateTexture(_this._uvTextureRes.texture, 0, _this.picSize64, $ctx);
            });
        };
        OnlineUserHeadPicSprite.prototype.drawHaveNum = function (value) {
            var $ctx = UIManager.getInstance().getContext2D(this.picSize64, this.picSize64, false);
            $ctx.fillStyle = "rgb(60,60,60,1)";
            $ctx.fillRect(0, 20, this.picSize64, 30);
            ArtFont.getInstance().writeFontToCtxCenten($ctx, String(value), "NUM44", 30, 20, 6);
            TextureManager.getInstance().updateTexture(this._uvTextureRes.texture, 0, 0, $ctx);
        };
        OnlineUserHeadPicSprite.prototype.upToGpu = function () {
            if (this.objData.indexs.length) {
                this.objData.treNum = this.objData.indexs.length;
                this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }
        };
        OnlineUserHeadPicSprite.prototype.update = function () {
            if (this.objData && this.objData.indexBuffer && this._uvTextureRes) {
                Scene_data.context3D.setProgram(this.program);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);
                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
                Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this._uvTextureRes.texture, 0);
                Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            }
        };
        return OnlineUserHeadPicSprite;
    }(Display3D));
    online.OnlineUserHeadPicSprite = OnlineUserHeadPicSprite;
})(online || (online = {}));
//# sourceMappingURL=OnlineUserHeadPicSprite.js.map