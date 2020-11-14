module Pan3d {
    export class BuildShader extends Shader3D {
        static buildShader: string = "BuildShader";
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
                //"attribute vec2 v2LightBuff;" +
                "uniform mat4 viewMatrix3D;" +
                "uniform mat4 camMatrix3D;" +
                "uniform mat4 posMatrix3D;" +

                "varying vec2 v_texCoord;" +
                //"varying vec2 v_texLight;" +
                "void main(void)" +
                "{" +
                "   v_texCoord = vec2(v2CubeTexST.x, v2CubeTexST.y);" +
                //"   v_texLight = vec2(v2LightBuff.x, v2LightBuff.y);" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +

                "   vt0 = posMatrix3D * vt0;" +
                "   vt0 = camMatrix3D * vt0;" +
                "   vt0 = viewMatrix3D * vt0;" +

                "   gl_Position = vt0;" +
                "}"
            return $str


        }
        getFragmentShaderString(): string {
            var $str: string =

                //"#ifdef GL_FRAGMENT_PRECISION_HIGH\n" +
                //"precision highp float;\n" +
                //" #else\n" +
                " precision mediump float;\n" +
                //" #endif\n" +
                "uniform sampler2D s_texture;\n" +
                //"uniform sampler2D light_texture;\n" +

                "uniform vec4 testconst;" +
                "uniform vec4 testconst2;" +

                "varying vec2 v_texCoord;\n" +
                //"varying vec2 v_texLight;\n" +

                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                //"if (infoUv.a <= 0.9) {\n" +
                //"     discard;\n" +
                //"}\n" +
                //"vec4 infoLight = texture2D(light_texture, v_texLight);\n" +
                //"vec4 test = vec4(0.5,0,0,1);\n" +
                "vec4 test = vec4(0,0,0,1);\n" +
                "test.xyz = mix(vec3(1,1,1)*0.5,testconst.xyz,0.5);\n" +
                //"test = test * testconst2;\n" +
                "infoUv.xyz = test.xyz * infoUv.xyz;\n" +
                //"info.rgb = info.rgb / 0.15;\n" +
                "gl_FragColor = infoUv;\n" +
                "}"
            return $str

        }

    }
}