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
    var ProgrmaManager = /** @class */ (function (_super) {
        __extends(ProgrmaManager, _super);
        function ProgrmaManager() {
            //this._dic = new Object();
            return _super.call(this) || this;
        }
        ProgrmaManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new ProgrmaManager();
            }
            return this._instance;
        };
        ProgrmaManager.prototype.getProgram = function ($str) {
            if (this._dic[$str]) {
                return this._dic[$str];
            }
            else {
                alert("please registe Program=>" + $str);
                return null;
            }
        };
        ProgrmaManager.prototype.registe = function ($str, $shader3D) {
            if (!this._dic[$str]) {
                $shader3D.encode();
                $shader3D.useNum = 1;
                $shader3D.name = $str;
                this._dic[$str] = $shader3D;
            }
        };
        ProgrmaManager.prototype.getMaterialProgram = function (key, shaderCls, $material, paramAry, parmaByFragmet) {
            if (paramAry === void 0) { paramAry = null; }
            if (parmaByFragmet === void 0) { parmaByFragmet = false; }
            var keyStr = key + "_" + $material.url;
            //if (keyStr.search("/standard_byte1111") != -1 &&true) { //FIXME
            //    //console.log(keyStr)
            //    this.outShader($material.shaderStr)
            //    $material.shaderStr =
            //    "precision mediump float;\n" +
            //    "uniform sampler2D fs0;\n" +
            //    "uniform sampler2D fs1;\n" +
            //    "uniform vec4 fc2;\n" +
            //    "uniform vec2 fogdata;\n" +
            //    "uniform vec3 fogcolor;\n" +
            //    "varying vec2 v0;\n" +
            //    "varying vec2 v2;\n" +
            //    "varying vec3 v1;\n" +
            //    "void main(void){\n" +
            //    "\n" +
            //    "vec4 ft0 = texture2D(fs0,v0);\n" +
            //    "vec4 ft1 = texture2D(fs1,v2);\n" +
            //    "ft1.xyz = ft1.xyz * 2.0;\n" +
            //    "ft1.xyz = ft1.xyz * ft0.xyz;\n" +
            //    "vec4 ft2 = vec4(0,0,0,1);\n" +
            //    "ft2.xyz = ft1.xyz;\n" +
            //    "ft2.w = 1.0;\n" +
            //   "ft1.x = distance(v1.xyz*0.01, fc2.xyz)*100.0;\n" +
            //   "ft1.x = ft1.x - fogdata.x;\n"+
            //   "ft1.x = fogdata.y * ft1.x;\n" +
            //   "ft1.x = clamp(ft1.x,0.0,1.0);\n"+
            //   "ft2.xyz = mix(ft2.xyz,fogcolor.xyz,ft1.x);\n" +
            //    "gl_FragColor = ft2;\n"+
            //     "}"
            //}
            if (paramAry) {
                for (var i = 0; i < paramAry.length; i++) {
                    keyStr += "_" + paramAry[i];
                }
                if (parmaByFragmet) {
                    keyStr += "true_";
                }
                else {
                    keyStr += "false_";
                }
            }
            if (this._dic[keyStr]) {
                this._dic[keyStr].useNum++;
                return this._dic[keyStr];
            }
            if (parmaByFragmet) {
                paramAry = [$material.usePbr, $material.useNormal, $material.hasFresnel,
                    $material.useDynamicIBL, $material.lightProbe, $material.directLight,
                    $material.noLight, $material.fogMode];
            }
            var shader = new shaderCls();
            shader.paramAry = paramAry;
            shader.fragment = $material.shaderStr;
            var encodetf = shader.encode();
            shader.useNum++;
            if (!encodetf) {
                //console.log("**********错误" + keyStr);
                //console.log(shader.vertex);
                //console.log(shader.fragment);
            }
            //if (keyStr.search("staticstandtrans") != -1 && true) {
            //this.outShader(shader.vertex)
            ////console.log(shader.vertex);
            ////console.log(shader.fragment);
            //}
            this._dic[keyStr] = shader;
            return shader;
        };
        ProgrmaManager.prototype.outShader = function ($str) {
            var $item = $str.split("\n");
            //console.log("----")
            for (var i = 0; i < $item.length; i++) {
                var str = "\"";
                str += $item[i];
                if (i < ($item.length - 1)) {
                    str += "\\n";
                    str += "\"";
                    str += "\+";
                }
                else {
                    str += "\"";
                }
                //console.log(str)
            }
            //console.log("----")
        };
        ProgrmaManager.prototype.gc = function () {
            _super.prototype.gc.call(this);
        };
        return ProgrmaManager;
    }(Pan3d.ResGC));
    Pan3d.ProgrmaManager = ProgrmaManager;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ProgramManager.js.map