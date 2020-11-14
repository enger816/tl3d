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
var cannondis;
(function (cannondis) {
    var Vector3D = Pan3d.Vector3D;
    var Matrix3D = Pan3d.Matrix3D;
    var TextureManager = Pan3d.TextureManager;
    var DirectShadowDisplay3DSprite = shadow.DirectShadowDisplay3DSprite;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var Scene_data = Pan3d.Scene_data;
    var Shader3D = Pan3d.Shader3D;
    var ShadowModel = shadow.ShadowModel;
    var MainNoShadowShader = /** @class */ (function (_super) {
        __extends(MainNoShadowShader, _super);
        function MainNoShadowShader() {
            return _super.call(this) || this;
        }
        MainNoShadowShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "v2CubeTexST");
            $context.bindAttribLocation(this.program, 2, "v3Normal");
        };
        MainNoShadowShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Position;" +
                "attribute vec2 v2CubeTexST;" +
                "attribute vec3 v3Normal;" +
                "varying vec2 v0; " +
                "varying vec3 v2;" +
                "varying vec3 ambientColorF;" +
                "uniform vec3 sunDirect;" +
                "uniform vec3 sunColor;" +
                "uniform vec3 ambientColor;" +
                "uniform mat4 vpMatrix3D;" +
                "uniform mat4 posMatrix3D;" +
                "uniform mat3 rotationMatrix3D;" +
                "void main(void){;" +
                "ambientColorF =ambientColor;" +
                "v0 = vec2(v2CubeTexST.x, v2CubeTexST.y); " +
                "gl_Position= vpMatrix3D * posMatrix3D *vec4(v3Position, 1.0);" +
                "vec3 n = rotationMatrix3D * v3Normal;" +
                "float suncos =  clamp(dot(n.xyz,sunDirect.xyz),0.0,1.0);" +
                "v2 = sunColor * suncos ;" +
                "}";
            return $str;
        };
        MainNoShadowShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "uniform sampler2D fs0; " +
                "varying vec2 v0; " +
                "varying vec3 v2;" +
                "varying vec3 ambientColorF;" +
                "void main(void)\n" +
                "{\n" +
                "vec4 ft0 = texture2D(fs0, v0); " +
                "vec4 colorend =vec4((v2.xyz+ambientColorF.xyz)*ft0.xyz, 1); " +
                "gl_FragColor = colorend; " +
                "}";
            return $str;
        };
        MainNoShadowShader.MainNoShadowShader = "MainNoShadowShader";
        return MainNoShadowShader;
    }(Shader3D));
    cannondis.MainNoShadowShader = MainNoShadowShader;
    var MainDirectShadowDisplay3DSprite = /** @class */ (function (_super) {
        __extends(MainDirectShadowDisplay3DSprite, _super);
        function MainDirectShadowDisplay3DSprite() {
            var _this = _super.call(this) || this;
            _this.renderType = 0;
            ProgrmaManager.getInstance().registe(MainNoShadowShader.MainNoShadowShader, new MainNoShadowShader);
            _this.noShadowShder = ProgrmaManager.getInstance().getProgram(MainNoShadowShader.MainNoShadowShader);
            return _this;
        }
        MainDirectShadowDisplay3DSprite.prototype.setOtherPic = function ($str) {
            var _this = this;
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + $str, function ($texture) {
                _this.skinTexture = $texture;
            });
        };
        MainDirectShadowDisplay3DSprite.prototype.drawBaseSunColor = function ($dis) {
            var $objdata = $dis.objData;
            var $shader;
            if (shadow.ShadowModel.visible) {
                $shader = this.modelShder;
            }
            else {
                $shader = this.noShadowShder;
            }
            if ($objdata && $objdata.indexBuffer && this._uvTextureRes) {
                Scene_data.context3D.setProgram($shader.program);
                var $numr = new Vector3D(0.5, 0.6, -0.7);
                $numr.normalize();
                var mGamA = new Matrix3D;
                mGamA.appendRotation(-game.GameDataModel.gameAngle, Vector3D.Y_AXIS);
                $numr = mGamA.transformVector($numr);
                Scene_data.context3D.setVc3fv($shader, "sunDirect", [$numr.x, $numr.y, $numr.z]);
                Scene_data.context3D.setVc3fv($shader, "sunColor", [0.8, 0.8, 0.8]);
                Scene_data.context3D.setVc3fv($shader, "ambientColor", [0.2, 0.2, 0.2]);
                Scene_data.context3D.setVcMatrix3fv($shader, "rotationMatrix3D", $dis._rotationData);
                Scene_data.context3D.setVcMatrix4fv($shader, "vpMatrix3D", Scene_data.vpMatrix.m);
                Scene_data.context3D.setVcMatrix4fv($shader, "posMatrix3D", this.posMatrix.m);
                Scene_data.context3D.renderContext.bindBuffer(Scene_data.context3D.renderContext.ARRAY_BUFFER, $objdata.vertexBuffer);
                Scene_data.context3D.setVaOffset(0, 3, $objdata.stride, 0);
                Scene_data.context3D.setVaOffset(1, 2, $objdata.stride, $objdata.uvsOffsets);
                Scene_data.context3D.setVaOffset(2, 3, $objdata.stride, $objdata.normalsOffsets);
                if (this.skinTexture) {
                    Scene_data.context3D.setRenderTexture($shader, "fs0", this.skinTexture.texture, 0);
                }
                else {
                    Scene_data.context3D.setRenderTexture($shader, "fs0", this._uvTextureRes.texture, 0);
                }
                if (shadow.ShadowModel.visible) {
                    Scene_data.context3D.setVcMatrix4fv($shader, "shadowViewMatx3D", ShadowModel.shadowViewMatx3D.m);
                    Scene_data.context3D.setRenderTexture($shader, "fs1", this._scene.fbo.texture, 1);
                }
                Scene_data.context3D.drawCall($objdata.indexBuffer, $objdata.treNum);
            }
        };
        MainDirectShadowDisplay3DSprite.prototype.drawTemp = function ($dis) {
            if (this.renderType == 0) {
                this.drawBaseSunColor($dis);
            }
            else if (this.renderType == 1) {
                _super.prototype.drawTemp.call(this, $dis);
            }
        };
        return MainDirectShadowDisplay3DSprite;
    }(DirectShadowDisplay3DSprite));
    cannondis.MainDirectShadowDisplay3DSprite = MainDirectShadowDisplay3DSprite;
})(cannondis || (cannondis = {}));
//# sourceMappingURL=MainDirectShadowDisplay3DSprite.js.map