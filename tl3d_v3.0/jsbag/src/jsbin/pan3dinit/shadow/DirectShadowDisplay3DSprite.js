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
var shadow;
(function (shadow) {
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var TextureManager = Pan3d.TextureManager;
    var Scene_data = Pan3d.Scene_data;
    var ObjDataManager = Pan3d.ObjDataManager;
    var Shader3D = Pan3d.Shader3D;
    var Display3DSprite = Pan3d.Display3DSprite;
    var GroupDataManager = Pan3d.GroupDataManager;
    var BaseRes = Pan3d.BaseRes;
    var DirectShadowDisplay3DShader = /** @class */ (function (_super) {
        __extends(DirectShadowDisplay3DShader, _super);
        function DirectShadowDisplay3DShader() {
            return _super.call(this) || this;
        }
        DirectShadowDisplay3DShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "v2CubeTexST");
            $context.bindAttribLocation(this.program, 2, "v3Normal");
        };
        DirectShadowDisplay3DShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Position;" +
                "attribute vec2 v2CubeTexST;" +
                "varying vec2 v0;" +
                "varying vec3 v_PositionFromLight;" +
                "varying vec3 v2;" +
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
        DirectShadowDisplay3DShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "uniform sampler2D fs0;\n" +
                "uniform sampler2D fs1;\n" +
                "varying vec2 v0;\n" +
                "varying vec3 v_PositionFromLight;\n" +
                "varying vec3 v2;" +
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
                "vec4 ft1 = vec4(v2.xyz, 1.0); " + //法线值
                //  "ft0.xyz = ft1.xyz*ft0.xyz; " +
                "vec4 ft2 = vec4(1, 1, 1, 1); " +
                "float isalp = (ft5.z >0.1254) ? 1.0 : 0.2;\n" + //深度判断1254=  1236
                "gl_FragColor = vec4((ft1.xyz*visibility+ambientColorF.xyz)*ft0.rgb , 1.0); " +
                //    "gl_FragColor = vec4(ft1.xyz+ambientColorF.xyz, 1.0); " +
                "}";
            return $str;
        };
        DirectShadowDisplay3DShader.DirectShadowDisplay3DShader = "DirectShadowDisplay3DShader";
        return DirectShadowDisplay3DShader;
    }(Shader3D));
    shadow.DirectShadowDisplay3DShader = DirectShadowDisplay3DShader;
    var DirectShadowDisplay3DSprite = /** @class */ (function (_super) {
        __extends(DirectShadowDisplay3DSprite, _super);
        function DirectShadowDisplay3DSprite() {
            var _this = _super.call(this) || this;
            _this.needScanShadow = true;
            _this.nrmFlag = 0;
            _this.initData();
            return _this;
        }
        DirectShadowDisplay3DSprite.prototype.initData = function () {
            ProgrmaManager.getInstance().registe(DirectShadowDisplay3DShader.DirectShadowDisplay3DShader, new DirectShadowDisplay3DShader);
            this.modelShder = ProgrmaManager.getInstance().getProgram(DirectShadowDisplay3DShader.DirectShadowDisplay3DShader);
        };
        DirectShadowDisplay3DSprite.prototype.setObjUrl = function (value) {
            var _this = this;
            ObjDataManager.getInstance().getObjData(Scene_data.fileRoot + value, function ($obj) {
                _this.objData = $obj;
            });
        };
        DirectShadowDisplay3DSprite.prototype.update = function () {
            for (var i = 0; i < this.groupItem.length; i++) {
                this.drawTemp(this.groupItem[i]);
            }
        };
        DirectShadowDisplay3DSprite.prototype.drawTemp = function ($dis) {
            if (!this._scene.fbo || !shadow.ShadowModel.shadowViewMatx3D) {
                return;
            }
            var $objdata = $dis.objData;
            var $shader = this.modelShder;
            if ($objdata && $objdata.indexBuffer && this._uvTextureRes) {
                Scene_data.context3D.setProgram($shader.program);
                Scene_data.context3D.setVc3fv($shader, "sunDirect", this._scene.light.sunDirect);
                Scene_data.context3D.setVc3fv($shader, "sunColor", this._scene.light.sunColor);
                Scene_data.context3D.setVc3fv($shader, "ambientColor", this._scene.light.ambientColor);
                Scene_data.context3D.setVcMatrix4fv($shader, "shadowViewMatx3D", shadow.ShadowModel.shadowViewMatx3D.m);
                Scene_data.context3D.setVcMatrix3fv($shader, "rotationMatrix3D", $dis._rotationData);
                Scene_data.context3D.setVcMatrix4fv($shader, "vpMatrix3D", Scene_data.vpMatrix.m);
                Scene_data.context3D.setVcMatrix4fv($shader, "posMatrix3D", this.posMatrix.m);
                Scene_data.context3D.renderContext.bindBuffer(Scene_data.context3D.renderContext.ARRAY_BUFFER, $objdata.vertexBuffer);
                Scene_data.context3D.setVaOffset(0, 3, $objdata.stride, 0);
                Scene_data.context3D.setVaOffset(1, 2, $objdata.stride, $objdata.uvsOffsets);
                Scene_data.context3D.setVaOffset(2, 3, $objdata.stride, $objdata.normalsOffsets);
                Scene_data.context3D.setRenderTexture($shader, "fs0", this._uvTextureRes.texture, 0);
                Scene_data.context3D.setRenderTexture($shader, "fs1", this._scene.fbo.texture, 1);
                Scene_data.context3D.drawCall($objdata.indexBuffer, $objdata.treNum);
            }
        };
        DirectShadowDisplay3DSprite.prototype.updateRotationMatrix = function () {
            _super.prototype.updateRotationMatrix.call(this);
            for (var i = 0; this.groupItem && i < this.groupItem.length; i++) {
                var $dis = this.groupItem[i];
                if ($dis && $dis._rotationData) {
                    if ($dis._rotationData) {
                        this._rotationMatrix.getRotaion($dis._rotationData);
                    }
                }
            }
        };
        DirectShadowDisplay3DSprite.prototype.setPicUrl = function ($str) {
            var _this = this;
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + $str, function ($texture) {
                _this._uvTextureRes = $texture;
            });
        };
        DirectShadowDisplay3DSprite.prototype.setModelById = function ($str) {
            var _this = this;
            this.groupItem = new Array();
            GroupDataManager.getInstance().getGroupData(Scene_data.fileRoot + getModelUrl($str), function (groupRes) {
                for (var i = 0; i < groupRes.dataAry.length; i++) {
                    var item = groupRes.dataAry[i];
                    if (item.types == BaseRes.PREFAB_TYPE) {
                        var $dis = new Display3DSprite();
                        $dis.setObjUrl(item.objUrl);
                        $dis._rotationData = new Float32Array(9);
                        _this.groupItem.push($dis);
                        if (item.materialInfoArr && item.materialInfoArr.length) {
                            _this.setPicUrl(item.materialInfoArr[0].url);
                        }
                        else {
                            console.log("没有指定贴图");
                        }
                    }
                }
                _this.updateRotationMatrix();
            });
        };
        return DirectShadowDisplay3DSprite;
    }(Display3DSprite));
    shadow.DirectShadowDisplay3DSprite = DirectShadowDisplay3DSprite;
})(shadow || (shadow = {}));
//# sourceMappingURL=DirectShadowDisplay3DSprite.js.map