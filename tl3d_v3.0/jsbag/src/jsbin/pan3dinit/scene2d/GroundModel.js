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
var scene2d_me;
(function (scene2d_me) {
    var Ground2dBaseShader = /** @class */ (function (_super) {
        __extends(Ground2dBaseShader, _super);
        function Ground2dBaseShader() {
            return _super.call(this) || this;
        }
        Ground2dBaseShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
        };
        Ground2dBaseShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Position;" +
                "attribute vec2 u2Texture;" +
                "varying vec2 v_texCoord;" +
                "uniform vec4 movesize;" +
                "void main(void)" +
                "{" +
                "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   vt0.xy*=movesize.zw;" +
                "   vt0.xy+=movesize.xy;" +
                "   gl_Position = vt0;" +
                "}";
            return $str;
        };
        Ground2dBaseShader.prototype.getFragmentShaderString = function () {
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
        Ground2dBaseShader.Ground2dBaseShader = "Ground2dBaseShader";
        return Ground2dBaseShader;
    }(Pan3d.Shader3D));
    scene2d_me.Ground2dBaseShader = Ground2dBaseShader;
    var Ground2dBaseSprite = /** @class */ (function (_super) {
        __extends(Ground2dBaseSprite, _super);
        function Ground2dBaseSprite() {
            var _this = _super.call(this) || this;
            _this.x = 0;
            _this.y = 0;
            _this.width = 100;
            _this.height = 100;
            _this.initData();
            return _this;
        }
        Ground2dBaseSprite.prototype.initData = function () {
            Pan3d.ProgrmaManager.getInstance().registe(Ground2dBaseShader.Ground2dBaseShader, new Ground2dBaseShader);
            this.shader = Pan3d.ProgrmaManager.getInstance().getProgram(Ground2dBaseShader.Ground2dBaseShader);
            this.program = this.shader.program;
            this.objData = new Pan3d.ObjData;
            this.objData.vertices = new Array();
            this.objData.vertices.push(0, -1, 0);
            this.objData.vertices.push(1, -1, 0);
            this.objData.vertices.push(1, 0, 0);
            this.objData.vertices.push(0, 0, 0);
            this.objData.uvs = new Array();
            this.objData.uvs.push(0, 1);
            this.objData.uvs.push(1, 1);
            this.objData.uvs.push(1, 0);
            this.objData.uvs.push(0, 0);
            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 1, 2);
            this.objData.indexs.push(0, 2, 3);
            this.loadTexture();
            this.upToGpu();
        };
        Ground2dBaseSprite.prototype.loadTexture = function () {
            var $ctx = Pan3d.UIManager.getInstance().getContext2D(128, 128, false);
            $ctx.fillStyle = "rgb(255,255,255)";
            $ctx.fillRect(0, 0, 128, 128);
            this._uvTextureRes = Pan3d.TextureManager.getInstance().getCanvasTexture($ctx);
        };
        Ground2dBaseSprite.prototype.setPicUrl = function ($url) {
            var _this = this;
            //  var $url: string = Scene_data.fileRoot + "pan/zymap2d/scene/1007/maps/0_0.jpg"
            Pan3d.TextureManager.getInstance().getTexture($url, function ($texture) {
                _this._uvTextureRes = $texture;
            });
        };
        Ground2dBaseSprite.prototype.upToGpu = function () {
            if (this.objData.indexs.length) {
                this.objData.treNum = this.objData.indexs.length;
                this.objData.vertexBuffer = Pan3d.Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer = Pan3d.Scene_data.context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer = Pan3d.Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }
        };
        Ground2dBaseSprite.prototype.update = function () {
            if (this.objData && this.objData.indexBuffer && this._uvTextureRes) {
                Pan3d.Scene_data.context3D.setProgram(this.program);
                Pan3d.Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Pan3d.Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
                Pan3d.Scene_data.context3D.setVc4fv(this.shader, "movesize", this.getMoveSizeData());
                Pan3d.Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this._uvTextureRes.texture, 0);
                Pan3d.Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            }
        };
        Ground2dBaseSprite.prototype.getMoveSizeData = function () {
            var $tx = (this.x + Ground2dBaseSprite.perentpos.x) / (Pan3d.Scene_data.stageWidth / 2) - 1;
            var $ty = 1 - (this.y + Ground2dBaseSprite.perentpos.y) / (Pan3d.Scene_data.stageHeight / 2);
            var $tw = this.width / (Pan3d.Scene_data.stageWidth / 2);
            var $th = this.height / (Pan3d.Scene_data.stageHeight / 2);
            return [$tx, $ty, $tw, $th];
        };
        Ground2dBaseSprite.perentpos = new Pan3d.Vector2D();
        return Ground2dBaseSprite;
    }(Pan3d.Display3D));
    scene2d_me.Ground2dBaseSprite = Ground2dBaseSprite;
    var GroundModel = /** @class */ (function () {
        function GroundModel() {
            this._groundItem = new Array();
        }
        GroundModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new GroundModel();
            }
            return this._instance;
        };
        GroundModel.prototype.update = function () {
            Pan3d.Scene_data.context3D.setWriteDepth(false);
            Pan3d.Scene_data.context3D.setDepthTest(false);
            for (var i = 0; i < this._groundItem.length; i++) {
                this._groundItem[i].update();
            }
        };
        GroundModel.prototype.addGroundPicByeUrl = function ($url, $rect) {
            if ($url === void 0) { $url = null; }
            if ($rect === void 0) { $rect = null; }
            var $dis = new Ground2dBaseSprite();
            if ($url) {
                $dis.setPicUrl($url);
            }
            if ($rect) {
                $dis.x = $rect.x;
                $dis.y = $rect.y;
                $dis.width = $rect.width;
                $dis.height = $rect.height;
            }
            this._groundItem.push($dis);
            return $dis;
        };
        return GroundModel;
    }());
    scene2d_me.GroundModel = GroundModel;
})(scene2d_me || (scene2d_me = {}));
//# sourceMappingURL=GroundModel.js.map