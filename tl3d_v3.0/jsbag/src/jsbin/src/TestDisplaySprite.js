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
var test;
(function (test) {
    var Shader3D = Pan3d.Shader3D;
    var Display3D = Pan3d.Display3D;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var ObjData = Pan3d.ObjData;
    var UIManager = Pan3d.UIManager;
    var TextureManager = Pan3d.TextureManager;
    var Scene_data = Pan3d.Scene_data;
    var TestDisplayShader = /** @class */ (function (_super) {
        __extends(TestDisplayShader, _super);
        function TestDisplayShader() {
            return _super.call(this) || this;
        }
        TestDisplayShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
        };
        TestDisplayShader.prototype.getVertexShaderString = function () {
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
        TestDisplayShader.prototype.getFragmentShaderString = function () {
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
        TestDisplayShader.TestDisplayShader = "TestDisplayShader";
        return TestDisplayShader;
    }(Shader3D));
    test.TestDisplayShader = TestDisplayShader;
    var TestDisplaySprite = /** @class */ (function (_super) {
        __extends(TestDisplaySprite, _super);
        function TestDisplaySprite() {
            var _this = _super.call(this) || this;
            _this.initData();
            _this.updateMatrix;
            return _this;
        }
        TestDisplaySprite.prototype.initData = function () {
            ProgrmaManager.getInstance().registe(TestDisplayShader.TestDisplayShader, new TestDisplayShader);
            this.shader = ProgrmaManager.getInstance().getProgram(TestDisplayShader.TestDisplayShader);
            this.program = this.shader.program;
            this.objData = new ObjData;
            this.objData.vertices = new Array();
            this.objData.vertices.push(-50, +100, 0);
            this.objData.vertices.push(50, +100, 0);
            this.objData.vertices.push(50, -100, 0);
            this.objData.vertices.push(-50, -100, 0);
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
        TestDisplaySprite.prototype.loadTexture = function () {
            var $ctx = UIManager.getInstance().getContext2D(128, 2, false);
            $ctx.fillStyle = "rgba(255,0,0,0.1)";
            $ctx.fillRect(0, 0, 128, 2);
            this._uvTextureRes = TextureManager.getInstance().getCanvasTexture($ctx);
            var $ctx = UIManager.getInstance().getContext2D(64, 2, false);
            $ctx.fillStyle = "rgba(0,0,0,1.0)";
            $ctx.fillRect(0, 0, 64, 2);
            var imgData = $ctx.createImageData(64, 1);
            for (var i = 0; i < imgData.data.length / 4; i++) {
                var index = i * 4;
                imgData.data[index + 0] = 255;
                imgData.data[index + 1] = 255;
                imgData.data[index + 2] = 255;
                imgData.data[index + 3] = 125;
                $ctx.fillStyle = "rgba(255,255,155,1.0)";
                $ctx.fillRect(i, 0, 1, 2);
            }
            this._uvTextureRes = TextureManager.getInstance().getCanvasTexture($ctx);
        };
        TestDisplaySprite.prototype.upToGpu = function () {
            if (this.objData.indexs.length) {
                this.objData.treNum = this.objData.indexs.length;
                this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }
        };
        TestDisplaySprite.prototype.update = function () {
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
        return TestDisplaySprite;
    }(Display3D));
    test.TestDisplaySprite = TestDisplaySprite;
})(test || (test = {}));
//# sourceMappingURL=TestDisplaySprite.js.map