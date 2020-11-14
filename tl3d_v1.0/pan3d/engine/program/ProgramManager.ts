module Pan3d {
    export class ProgrmaManager extends ResGC {
        //private _dic: Object
        private static _instance: ProgrmaManager;
        constructor() {
            //this._dic = new Object();
            super();
        }
        public static getInstance(): ProgrmaManager {
            if (!this._instance) {
                this._instance = new ProgrmaManager();
            }
            return this._instance;
        }
        public getProgram($str: string): Shader3D {
            if (this._dic[$str]) {
                return this._dic[$str];
            } else {
                alert("please registe Program=>" + $str);
                return null
            }
        }
        public registe($str, $shader3D: Shader3D): void {
            if (!this._dic[$str]) {
                $shader3D.encode();
                $shader3D.useNum = 1;
                $shader3D.name = $str;
                this._dic[$str] = $shader3D;
            }

        }

        public getMaterialProgram(key: String, shaderCls: any, $material: Material, paramAry: any = null, parmaByFragmet: boolean = false): Shader3D {
            var keyStr: string = key + "_" + $material.url;

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
                for (var i: number = 0; i < paramAry.length; i++) {
                    keyStr += "_" + paramAry[i];
                }
                if (parmaByFragmet) {
                    keyStr += "true_";
                } else {
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

            var shader: Shader3D = new shaderCls();
            shader.paramAry = paramAry;
            shader.fragment = $material.shaderStr;
            var encodetf: boolean = shader.encode();
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
        }
        public outShader($str: string): void {
            var $item: Array<string> = $str.split("\n")

            //console.log("----")

            for (var i: number = 0; i < $item.length; i++) {
                var str: string = "\"";
                str += $item[i];

                if (i < ($item.length - 1)) {
                    str += "\\n"
                    str += "\""
                    str += "\+"
                } else {
                    str += "\""
                }

                //console.log(str)
            }
            //console.log("----")
        }

        public gc(): void {
            super.gc();
        }


    }
}