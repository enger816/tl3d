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
var left;
(function (left) {
    var MaterialShader = Pan3d.MaterialShader;
    var BuildMaterialShader = /** @class */ (function (_super) {
        __extends(BuildMaterialShader, _super);
        function BuildMaterialShader() {
            var _this = _super.call(this) || this;
            _this.name = "BuildMaterialShader";
            return _this;
        }
        BuildMaterialShader.prototype.buildParamAry = function ($material) {
            this.paramAry = [$material.useUv, $material.useNormal, $material.useLightUv];
        };
        BuildMaterialShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "v2CubeTexST");
            var useUv = this.paramAry[0];
            var useNormal = this.paramAry[1];
            var useLightUv = this.paramAry[2];
            var id = 2;
            if (useLightUv) {
                $context.bindAttribLocation(this.program, id++, "v2Lightuv");
            }
            if (useNormal) {
                $context.bindAttribLocation(this.program, id++, "v3Tangent");
                $context.bindAttribLocation(this.program, id++, "v3Bitangent");
                $context.bindAttribLocation(this.program, id++, "v3Normal");
            }
        };
        BuildMaterialShader.prototype.getVertexShaderString = function () {
            var useUv = this.paramAry[0];
            var useNormal = this.paramAry[1];
            var useLightUv = this.paramAry[2];
            var $str = "attribute vec3 v3Position;\n" +
                "attribute vec2 v2CubeTexST;\n" +
                "varying vec2 v0;\n";
            if (useLightUv) {
                $str += "attribute vec2 v2Lightuv;\n";
                $str += "varying vec2 lightuv;\n";
            }
            if (useUv) {
                $str += "varying vec2 uvpos;\n";
            }
            if (useNormal) {
                $str +=
                    "attribute vec3 v3Tangent;\n" +
                        "attribute vec3 v3Bitangent;\n" +
                        "attribute vec3 v3Normal;\n" +
                        "varying vec3 T;\n" +
                        "varying vec3 B;\n" +
                        "varying vec3 N;\n";
            }
            $str +=
                "uniform mat4 vpMatrix3D;\n" +
                    "uniform mat4 posMatrix3D;\n" +
                    "uniform mat3 rotationMatrix3D;\n";
            $str +=
                "varying highp vec3 vPos;\n";
            $str +=
                "void main(void){\n" +
                    "v0 = vec2(v2CubeTexST.x, v2CubeTexST.y);\n" +
                    "vec4 vt0= vec4(v3Position, 1.0);\n" +
                    "vt0 = posMatrix3D * vt0;\n";
            if (useUv) {
                $str += "uvpos = v2CubeTexST;\n";
            }
            if (useLightUv) {
                $str += "lightuv = v2Lightuv;\n";
            }
            if (useNormal) {
                $str +=
                    "T = v3Tangent;\n" +
                        "B = v3Bitangent;\n" +
                        "N = v3Normal;\n";
            }
            $str += "vt0 = vpMatrix3D * vt0;\n";
            $str += "gl_Position = vt0;\n";
            $str += "vPos = v3Position;\n";
            $str += "}";
            return $str;
        };
        BuildMaterialShader.BuildMaterialShader = "BuildMaterialShader";
        return BuildMaterialShader;
    }(MaterialShader));
    left.BuildMaterialShader = BuildMaterialShader;
})(left || (left = {}));
//# sourceMappingURL=BuildMaterialShader.js.map