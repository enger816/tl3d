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
    var BaseDiplay3dShader = /** @class */ (function (_super) {
        __extends(BaseDiplay3dShader, _super);
        function BaseDiplay3dShader() {
            return _super.call(this) || this;
        }
        BaseDiplay3dShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
        };
        BaseDiplay3dShader.prototype.getVertexShaderString = function () {
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
        BaseDiplay3dShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 v_texCoord;\n" +
                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                "gl_FragColor =infoUv;\n" +
                "}";
            return $str;
        };
        BaseDiplay3dShader.BaseDiplay3dShader = "BaseDiplay3dShader";
        return BaseDiplay3dShader;
    }(Pan3d.Shader3D));
    Pan3d.BaseDiplay3dShader = BaseDiplay3dShader;
    var BaseDiplay3dSprite = /** @class */ (function (_super) {
        __extends(BaseDiplay3dSprite, _super);
        function BaseDiplay3dSprite() {
            var _this = _super.call(this) || this;
            _this.initData();
            _this.updateMatrix;
            return _this;
        }
        BaseDiplay3dSprite.prototype.initData = function () {
            Pan3d.ProgrmaManager.getInstance().registe(BaseDiplay3dShader.BaseDiplay3dShader, new BaseDiplay3dShader);
            this.shader = Pan3d.ProgrmaManager.getInstance().getProgram(BaseDiplay3dShader.BaseDiplay3dShader);
            this.program = this.shader.program;
            this.objData = new Pan3d.ObjData;
            this.objData.vertices = new Array();
            this.objData.vertices.push(0, 0, 0);
            this.objData.vertices.push(100, 0, 0);
            this.objData.vertices.push(100, 0, 100);
            this.objData.uvs = new Array();
            this.objData.uvs.push(0, 0);
            this.objData.uvs.push(1, 0);
            this.objData.uvs.push(0, 1);
            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 1, 2);
            this.loadTexture();
            this.upToGpu();
        };
        BaseDiplay3dSprite.prototype.loadTexture = function () {
            var $ctx = Pan3d.UIManager.getInstance().getContext2D(128, 128, false);
            $ctx.fillStyle = "rgb(255,255,255)";
            $ctx.fillRect(0, 0, 128, 128);
            this._uvTextureRes = Pan3d.TextureManager.getInstance().getCanvasTexture($ctx);
        };
        BaseDiplay3dSprite.prototype.upToGpu = function () {
            if (this.objData.indexs.length) {
                this.objData.treNum = this.objData.indexs.length;
                this.objData.vertexBuffer = Pan3d.Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer = Pan3d.Scene_data.context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer = Pan3d.Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }
        };
        BaseDiplay3dSprite.prototype.update = function () {
            if (this.objData && this.objData.indexBuffer && this._uvTextureRes) {
                Pan3d.Scene_data.context3D.setProgram(this.program);
                Pan3d.Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", Pan3d.Scene_data.viewMatrx3D.m);
                Pan3d.Scene_data.context3D.setVcMatrix4fv(this.shader, "camMatrix3D", Pan3d.Scene_data.cam3D.cameraMatrix.m);
                Pan3d.Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);
                Pan3d.Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Pan3d.Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
                Pan3d.Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this._uvTextureRes.texture, 0);
                Pan3d.Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            }
        };
        return BaseDiplay3dSprite;
    }(Pan3d.Display3D));
    Pan3d.BaseDiplay3dSprite = BaseDiplay3dSprite;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=BaseDiplay3dSprite.js.map