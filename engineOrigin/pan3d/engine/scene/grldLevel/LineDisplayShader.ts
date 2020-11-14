module Pan3d {
    export class LineDisplayShader extends Shader3D {
        static LineShader: string = "LineShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "v3Color");

        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Position;" +
                "attribute vec3 v3Color;" +

                "uniform mat4 viewMatrix3D;" +
                "uniform mat4 camMatrix3D;" +
                "uniform mat4 posMatrix3D;" +

                "varying vec4 colorData;" +

                "void main(void)" +
                "{" +

                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   colorData =vec4(v3Color,1) ;" +
                "   vt0 = posMatrix3D * vt0;" +
                "   vt0 = camMatrix3D * vt0;" +
                "   vt0 = viewMatrix3D * vt0;" +
                "   gl_Position = vt0;" +
                "}"
            return $str


        }
        getFragmentShaderString(): string {
            var $str: string =
                " precision mediump float;\n" +
                "varying vec4 colorData;\n" +
                "void main(void)\n" +
                "{\n" +

                "gl_FragColor =colorData;\n" +
                "}"
            return $str

        }

    }
}