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
var canonkey;
(function (canonkey) {
    var Display3DSprite = Pan3d.Display3DSprite;
    var Scene_data = Pan3d.Scene_data;
    var Shader3D = Pan3d.Shader3D;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var DirectShadowDisplay3DSprite = shadow.DirectShadowDisplay3DSprite;
    var ShadowModel = shadow.ShadowModel;
    var DirectShadowColorShader = /** @class */ (function (_super) {
        __extends(DirectShadowColorShader, _super);
        function DirectShadowColorShader() {
            return _super.call(this) || this;
        }
        DirectShadowColorShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "v2CubeTexST");
            $context.bindAttribLocation(this.program, 2, "v3Normal");
        };
        DirectShadowColorShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Position;" +
                "attribute vec2 v2CubeTexST;" +
                "varying vec2 v0;" +
                "varying vec3 v_PositionFromLight;" +
                "varying vec3 v2;" +
                "varying float heighty;" +
                "varying float cosTheta;" +
                "varying float onsunFace;" +
                "varying vec3 ambientColorF;" +
                "attribute vec3 v3Normal;" +
                "uniform vec3 sunDirect;" +
                "uniform vec3 sunColor;" +
                "uniform vec3 ambientColor;" +
                "uniform mat4 vpMatrix3D;" +
                "uniform mat4 posMatrix3D;" +
                "uniform mat4 shadowViewMatx3D;" +
                "uniform mat3 rotationMatrix3D;" +
                "void main(void){;" +
                "ambientColorF =ambientColor;" +
                "v0 = vec2(v2CubeTexST.x, v2CubeTexST.y); " +
                "vec4 vt0= vec4(v3Position, 1.0);" +
                "vt0 = posMatrix3D * vt0;" +
                "vt0 = vpMatrix3D * vt0;" +
                "   vec4 vt1= vec4(v3Position, 1.0);" +
                "   vt1 = posMatrix3D * vt1;" +
                "   heighty = vt1.y;" +
                "   vt1 = shadowViewMatx3D * vt1;" +
                "   v_PositionFromLight = vec3(vt1.x, vt1.y,vt1.z);" +
                "vec3 n = rotationMatrix3D * v3Normal;" +
                "float suncos = dot(n.xyz,sunDirect.xyz);" +
                "onsunFace = suncos;" +
                "cosTheta =1.0-abs(suncos);" +
                "suncos = clamp(suncos,0.0,1.0);" +
                "v2 = sunColor * suncos ;" +
                "gl_Position = vt0;" +
                "}";
            return $str;
        };
        DirectShadowColorShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "uniform sampler2D fs0;\n" +
                "uniform sampler2D fs1;\n" +
                "uniform vec4 focus3d;" +
                "uniform vec3 toColor;" +
                "varying vec2 v0;\n" +
                "varying vec3 v_PositionFromLight;\n" +
                "varying vec3 v2;" +
                "varying float heighty;" +
                "varying float cosTheta;" +
                "varying float onsunFace;" +
                "varying vec3 ambientColorF;" +
                "void main(void)\n" +
                "{\n" +
                "vec4 ft5 = texture2D(fs1, v_PositionFromLight.xy); " + //深度图采样
                "float  bias  = 0.01*cosTheta; " +
                "bias = clamp(bias, 0.003, 0.01); " +
                "float visibility = (v_PositionFromLight.z > ft5.x + bias) ? 0.9 : 1.0;\n" + //深度判断
                "visibility =onsunFace<0.0?1.0:visibility ; " +
                "vec4 ft0 = texture2D(fs0, v0); " + //正常纹理采样
                "float  a=  focus3d.w-heighty; " +
                "a =a/100.0; " +
                "a = clamp(a, 0.0, 1.0); " +
                "vec4 ft1 = vec4(v2.xyz, 1.0); " + //法线值
                //   "ft0.xyz = ft1.xyz*ft0.xyz; " +
                "vec4 ft2 = vec4(1, 1, 1, 1); " +
                "float isalp = (ft5.z >0.1254) ? 1.0 : 0.2;\n" + //深度判断1254=  1236
                "vec4 colorend =vec4((ft1.xyz*visibility+ambientColorF.xyz)*ft0.rgb , 1.0); " +
                "colorend.xyz=colorend.xyz+(toColor.xyz-colorend.xyz)*a; " +
                "gl_FragColor = colorend; " +
                // "gl_FragColor = vec4(focus3d.xyz , 1.0); " +
                "}";
            return $str;
        };
        DirectShadowColorShader.DirectShadowColorShader = "DirectShadowColorShader";
        return DirectShadowColorShader;
    }(Shader3D));
    canonkey.DirectShadowColorShader = DirectShadowColorShader;
    var DirectShadowColorSprite = /** @class */ (function (_super) {
        __extends(DirectShadowColorSprite, _super);
        function DirectShadowColorSprite() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DirectShadowColorSprite.prototype.initData = function () {
            ProgrmaManager.getInstance().registe(DirectShadowColorShader.DirectShadowColorShader, new DirectShadowColorShader);
            this.modelShder = ProgrmaManager.getInstance().getProgram(DirectShadowColorShader.DirectShadowColorShader);
        };
        DirectShadowColorSprite.prototype.drawTemp = function ($dis) {
            if (!this._scene.fbo || !ShadowModel.shadowViewMatx3D) {
                return;
            }
            var $objdata = $dis.objData;
            var $shader = this.modelShder;
            if ($objdata && $objdata.indexBuffer && this._uvTextureRes) {
                Scene_data.context3D.setProgram($shader.program);
                Scene_data.context3D.setVc3fv($shader, "sunDirect", this._scene.light.sunDirect);
                Scene_data.context3D.setVc3fv($shader, "sunColor", this._scene.light.sunColor);
                Scene_data.context3D.setVc3fv($shader, "ambientColor", this._scene.light.ambientColor);
                var $sprite = this._scene.layaSprite;
                Scene_data.context3D.setVc4fv($shader, "focus3d", [$sprite.focus3d.x, $sprite.focus3d.y, $sprite.focus3d.z, this.y + 0]);
                Scene_data.context3D.setVc3fv($shader, "toColor", [GunqiuModel.useColor.modelcolor.x, GunqiuModel.useColor.modelcolor.y, GunqiuModel.useColor.modelcolor.z]);
                //   Scene_data.context3D.setVc3fv($shader, "toColor", [255 / 255, 0 / 255, 0 / 255]);
                Scene_data.context3D.setVcMatrix4fv($shader, "shadowViewMatx3D", ShadowModel.shadowViewMatx3D.m);
                Scene_data.context3D.setVcMatrix3fv($shader, "rotationMatrix3D", $dis._rotationData);
                Scene_data.context3D.setVcMatrix4fv($shader, "vpMatrix3D", Scene_data.vpMatrix.m);
                Scene_data.context3D.setVcMatrix4fv($shader, "posMatrix3D", this.posMatrix.m);
                Scene_data.context3D.renderContext.bindBuffer(Scene_data.context3D.renderContext.ARRAY_BUFFER, $objdata.vertexBuffer);
                Scene_data.context3D.setVaOffset(0, 3, $objdata.stride, 0);
                Scene_data.context3D.setVaOffset(1, 2, $objdata.stride, $objdata.uvsOffsets);
                Scene_data.context3D.setVaOffset(2, 3, $objdata.stride, $objdata.normalsOffsets);
                Scene_data.context3D.setRenderTexture($shader, "fs0", this._uvTextureRes.texture, 0);
                Scene_data.context3D.setRenderTexture($shader, "fs1", this._scene.fbo.texture, 1);
                if (this.y > ($sprite.focus3d.y + 180) || this.y < ($sprite.focus3d.y - 450)) {
                }
                else {
                    Scene_data.context3D.drawCall($objdata.indexBuffer, $objdata.treNum);
                }
                var $nu = Math.abs(this.y - $sprite.focus3d.y);
                if ($nu < 100) {
                    this.needScanShadow = true;
                }
                else {
                    this.needScanShadow = false;
                }
            }
        };
        DirectShadowColorSprite.prototype.setModelInfoData = function (itemObj) {
            this.groupItem = new Array();
            var $dis = new Display3DSprite();
            $dis.setObjUrl(itemObj.objsurl);
            $dis._rotationData = new Float32Array(9);
            this.groupItem.push($dis);
            if (itemObj.materialInfoArr && itemObj.materialInfoArr.length) {
                this.setPicUrl(itemObj.materialInfoArr[0].url);
            }
            else {
                console.log("没有指定贴图");
            }
            this.updateRotationMatrix();
        };
        return DirectShadowColorSprite;
    }(DirectShadowDisplay3DSprite));
    canonkey.DirectShadowColorSprite = DirectShadowColorSprite;
})(canonkey || (canonkey = {}));
//# sourceMappingURL=DirectShadowColorSprite.js.map