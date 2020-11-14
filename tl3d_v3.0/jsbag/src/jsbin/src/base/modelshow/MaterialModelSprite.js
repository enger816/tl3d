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
/*
class MaterialModelShader extends Shader3D {
    static MaterialModelShader: string = "MaterialModelShader";
    constructor() {
        super();
    }
    binLocation($context: WebGLRenderingContext): void {
        $context.bindAttribLocation(this.program, 0, "v3Position");
        $context.bindAttribLocation(this.program, 1, "v2CubeTexST");
    }
    getVertexShaderString(): string {
        var $str: string =
            "attribute vec3 v3Position;" +
            "attribute vec2 v2CubeTexST;" +
            "uniform mat4 vpMatrix3D;" +
            "uniform mat4 posMatrix3D;" +
            "varying vec2 v_texCoord;" +
            "void main(void)" +
            "{" +
            "   v_texCoord = vec2(v2CubeTexST.x, v2CubeTexST.y);" +
            "   vec4 vt0= vec4(v3Position, 1.0);" +
            "   vt0 = posMatrix3D * vt0;" +
            "   vt0 = vpMatrix3D * vt0;" +
            "   gl_Position = vt0;" +
            "}"
        return $str


    }
    getFragmentShaderString(): string {
        var $str: string =
            "precision mediump float;\n" +
            "uniform sampler2D fs0;\n" +
            "varying vec2 v_texCoord;\n" +
            "void main(void)\n" +
            "{\n" +
                "vec4 infoUv = texture2D(fs0, v_texCoord.xy);\n" +
                "gl_FragColor =vec4(1.0,0.0,0.0,1.0);\n" +
            "}"
        return $str

    }

}
*/
var left;
(function (left) {
    var Display3DSprite = Pan3d.Display3DSprite;
    var Scene_data = Pan3d.Scene_data;
    var TexItem = Pan3d.TexItem;
    var ObjData = Pan3d.ObjData;
    var TimeUtil = Pan3d.TimeUtil;
    var MaterialModelSprite = /** @class */ (function (_super) {
        __extends(MaterialModelSprite, _super);
        function MaterialModelSprite() {
            return _super.call(this) || this;
        }
        MaterialModelSprite.prototype.setMaterialVc = function ($material, $mp) {
            if ($mp === void 0) { $mp = null; }
            var $materialTree = $material;
            Scene_data.context3D.setBlendParticleFactors($materialTree.blendMode);
            Scene_data.context3D.setDepthTest($materialTree.zbuff);
            Scene_data.context3D.setWriteDepth($materialTree.writeZbuffer);
            if ($materialTree.hasTime) {
                var timeLen = ($materialTree.timeValue.x * 1000);
                var t = (TimeUtil.getTimer() - this.time) % timeLen; //时间间隔
                t /= timeLen;
                t *= $materialTree.timeValue.y; //数值比例
                Scene_data.context3D.setuniform1f($material.shader, "time", t);
            }
            Scene_data.context3D.setuniform3f($material.shader, "cam3DPos", Scene_data.cam3D.x, Scene_data.cam3D.y, Scene_data.cam3D.z);
            $material.update(t);
            if ($mp) {
                $mp.update();
            }
            Scene_data.context3D.setVc4fv($material.shader, "fc", $material.fcData);
        };
        MaterialModelSprite.prototype.setMaterialTexture = function ($material, $mp) {
            if ($mp === void 0) { $mp = null; }
            var texVec = $material.texList;
            for (var i = 0; i < texVec.length; i++) {
                if (texVec[i].texture) {
                    if (texVec[i].type == TexItem.CUBEMAP) {
                        Scene_data.context3D.setRenderTextureCube($material.shader.program, texVec[i].name, texVec[i].texture, texVec[i].id);
                    }
                    else {
                        Scene_data.context3D.setRenderTexture($material.shader, texVec[i].name, texVec[i].texture, texVec[i].id);
                    }
                }
                else {
                    console.log("还没加载好");
                }
            }
            if ($mp) {
                for (i = 0; i < $mp.dynamicTexList.length; i++) {
                    if ($mp.dynamicTexList[i].target && $mp.dynamicTexList[i].texture) {
                        Scene_data.context3D.setRenderTexture($material.shader, $mp.dynamicTexList[i].target.name, $mp.dynamicTexList[i].texture, $mp.dynamicTexList[i].target.id);
                    }
                }
            }
        };
        MaterialModelSprite.prototype.setMaterialVaIndependent = function () {
            Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
            Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
            var id = 2;
            if (this.material.useLightUv) {
                Scene_data.context3D.setVa(id++, 2, this.objData.lightUvBuffer);
            }
            if (this.material.useNormal) {
                Scene_data.context3D.setVa(id++, 3, this.objData.tangentBuffer);
                Scene_data.context3D.setVa(id++, 3, this.objData.bitangentBuffer);
                Scene_data.context3D.setVa(id++, 3, this.objData.normalsBuffer);
            }
        };
        MaterialModelSprite.prototype.setBaseMaterialVc = function ($material) {
            var t = 0;
            if ($material.hasTime) {
                t = (TimeUtil.getTimer() - this.time) % 100000 * 0.001;
            }
            $material.updateTime(t);
        };
        MaterialModelSprite.prototype.readTxtToModel = function ($str) {
            var objstr = JSON.parse($str);
            var $objdata = new ObjData();
            $objdata.vertices = objstr.vertices;
            $objdata.normals = objstr.normals;
            $objdata.uvs = objstr.uvs;
            $objdata.lightuvs = objstr.lightuvs;
            $objdata.indexs = objstr.indexs;
            $objdata.treNum = $objdata.indexs.length;
            TBNUtils.processTBN($objdata);
            $objdata.vertexBuffer = Scene_data.context3D.uploadBuff3D($objdata.vertices);
            $objdata.uvBuffer = Scene_data.context3D.uploadBuff3D($objdata.uvs);
            $objdata.lightUvBuffer = Scene_data.context3D.uploadBuff3D($objdata.lightuvs);
            $objdata.tangentBuffer = Scene_data.context3D.uploadBuff3D($objdata.tangents);
            $objdata.bitangentBuffer = Scene_data.context3D.uploadBuff3D($objdata.bitangents);
            $objdata.normalsBuffer = Scene_data.context3D.uploadBuff3D($objdata.normals);
            $objdata.indexBuffer = Scene_data.context3D.uploadIndexBuff3D($objdata.indexs);
            this.objData = $objdata;
        };
        Object.defineProperty(MaterialModelSprite.prototype, "isTextureLoadFinish", {
            get: function () {
                if (this.material) {
                    if (this.material.texList) {
                        for (var i = 0; i < this.material.texList.length; i++) {
                            if (!this.material.texList[i].texture) {
                                return false;
                            }
                        }
                        return true;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return false;
                }
            },
            enumerable: true,
            configurable: true
        });
        MaterialModelSprite.prototype.update = function () {
            if (this.isTextureLoadFinish && this.sceneVisible) {
                if (this.material) {
                    var $materialTree = this.material;
                    $materialTree.shader = $materialTree.modelShader;
                }
                _super.prototype.update.call(this);
            }
        };
        return MaterialModelSprite;
    }(Display3DSprite));
    left.MaterialModelSprite = MaterialModelSprite;
})(left || (left = {}));
//# sourceMappingURL=MaterialModelSprite.js.map