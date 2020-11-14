import { Matrix3D } from './../../tl3d/engine/math/Matrix3D';
import { MaterialAnimShader } from "../../tl3d/engine/program/MaterialAnimShader";
import { Shader3D } from "../../tl3d/engine/program/Shader3D";
import { Vector3D } from "../../tl3d/engine/math/Vector3D";

export class PlanarShadowShader  extends Shader3D {
    static PLANAR_SHADOW_SHADER : string = "PlanarShadowShader";
    constructor() {
        super();
    }
    binLocation($context:WebGLRenderingContext): void {
        $context.bindAttribLocation(this.program, 0, "v3Position");
    }
    getVertexShaderString(): string {
        var $str: string =
            "attribute vec3 v3Position;" +
            "uniform mat4 uMMatrix;" +
            "uniform mat4 uMProjCameraMatrix;" +
            "uniform vec3 uLightLocation;" +

            "void main(void)" +
            "{" +
            "   vec3 A=vec3(0.0,0.1,0.0);" +
            "   vec3 n=vec3(0.0,1.0,0.0);" +
            "   vec3 S=uLightLocation;" +
            "   vec3 V=(uMMatrix*vec4(v3Position,1)).xyz; " +
            "   vec3 VL=S+(V-S)*(dot(n,(A-S))/dot(n,(V-S)));" +
            "   gl_Position = uMProjCameraMatrix*vec4(VL,1);" +
            "}"
        return $str
    }
    getFragmentShaderString(): string {
        var $str: string =
            "precision mediump float;\n" +
            "void main(){\n" +
            "   gl_FragColor = vec4(0,0,0,0.5);\n" +

            "}\n" 
        return $str

    }

    public static singleton : PlanarShadowShader;

    private static makePlanarShadowShader (): PlanarShadowShader
    {
        var planarShadowShader = new PlanarShadowShader();

        planarShadowShader.encode();

        return planarShadowShader;
    }

    public static getInst() : PlanarShadowShader
    {
        if(!PlanarShadowShader.singleton)
            PlanarShadowShader.singleton = PlanarShadowShader.makePlanarShadowShader();
        return PlanarShadowShader.singleton
    }

    static lightPos =  new Vector3D(3800, -4000, -1400);
    static lightPosArray = new Float32Array([3800, -4000, -1400]);

    static setLightPos(v:Vector3D) : void
    {
        PlanarShadowShader.lightPos.x = v.x;
        PlanarShadowShader.lightPos.y = v.y;
        PlanarShadowShader.lightPos.z = v.z;
    }

    static getLightPosArry(posMatrix : Matrix3D) : Float32Array
    {
        PlanarShadowShader.lightPosArray[0] = posMatrix.x + PlanarShadowShader.lightPos.x;
        PlanarShadowShader.lightPosArray[1] = posMatrix.y + PlanarShadowShader.lightPos.y;
        PlanarShadowShader.lightPosArray[2] = posMatrix.z + PlanarShadowShader.lightPos.z;
        return  PlanarShadowShader.lightPosArray;
    }
}

export class AnimPlanarShadowShader  extends MaterialAnimShader {
    public static ANIM_PLANAR_SHADOW_SHADER : string = "AnimPlanarShadowShader";

    constructor() {
        super();
        this.name =  AnimPlanarShadowShader.ANIM_PLANAR_SHADOW_SHADER;
    }

    binLocation($context:WebGLRenderingContext): void {
        $context.bindAttribLocation(this.program, 0, "pos");
        $context.bindAttribLocation(this.program, 1, "v2Uv");
        $context.bindAttribLocation(this.program, 2, "boneID");
        $context.bindAttribLocation(this.program, 3, "boneWeight");
    
    }

    getVertexShaderString(): string {
        var $str = 
        "attribute vec4 pos;\n" +
        "attribute vec2 v2Uv;\n" +
        "attribute vec4 boneID;\n" +
        "attribute vec4 boneWeight;\n" +

        "uniform vec4 boneQ[54];\n" +
        "uniform vec3 boneD[54];\n" +
        
        "uniform mat4 uMMatrix;" +
        "uniform mat4 uMProjCameraMatrix;\n" +
        "uniform vec3 uLightLocation;\n" +
        
        MaterialAnimShader.getMd5M44Str() + "\n"+
        
        "void main(void)" +
        "{\n" +
        "   vec4 v3Position = getQDdata(vec3(pos.x,pos.y,pos.z));\n" +
        "   vec3 A=vec3(0.0,0.1,0.0);\n" +
        "   vec3 n=vec3(0.0,1.0,0.0);\n" +
        "   vec3 S=uLightLocation;\n" +
        "   vec3 V=(uMMatrix*vec4(v3Position.xyz,1)).xyz;\n" +
        "   vec3 VL=S+(V-S)*(dot(n,(A-S))/dot(n,(V-S)));\n" +
        "   gl_Position = uMProjCameraMatrix*vec4(VL,1);\n" +
        "}\n";
        return $str
    }

    getFragmentShaderString(): string {
        var $str: string =
            "precision mediump float;\n" +
            "void main(){\n" +
            "   gl_FragColor = vec4(0,0,0,0.5);\n" +

            "}\n" 
        return $str
    }

}

/*

在 Display3dMovie.ts 加入 
        public static planarShadowShader : PlanarShadowShader;
        makePlanarShadowShader() {
	        var planarShadowShader = new PlanarShadowShader();
			if(planarShadowShader.encode())
			console.log("MAKE PlanarShadowShader！！！！");
	        return planarShadowShader;
        }
        

        在 该类的updateMaterialMesh 函数， 加入 

        //shadow pass
			//if(false)
	        {
				var gl = Scene_data.context3D.renderContext;

				//
	            if (!Display3dMovie.planarShadowShader) {
	                Display3dMovie.planarShadowShader = this.makePlanarShadowShader();
				}

				//gl.useProgram(Display3dMovie.planarShadowShader.program);
				Scene_data.context3D.setProgram(Display3dMovie.planarShadowShader.program);

				Scene_data.context3D.setVcMatrix4fv(Display3dMovie.planarShadowShader, "uMProjCameraMatrix", new Float32Array (Scene_data.vpMatrix.m));
				Scene_data.context3D.setVcMatrix4fv(Display3dMovie.planarShadowShader, "uMMatrix", new Float32Array(this.posMatrix.m));
				Scene_data.context3D.setVc3fv(Display3dMovie.planarShadowShader, "uLightLocation", Display3dMovie.lightDirection);
				
				
				{

					//gl.enableVertexAttribArray(gl.getAttribLocation(Display3dMovie.planarShadowShader.program, "v3Position"));
					//gl.bindBuffer(gl.ARRAY_BUFFER,$mesh.vertexBuffer);
					//gl.vertexAttribPointer(gl.getAttribLocation(Display3dMovie.planarShadowShader.program, "v3Position"), 3, gl.FLOAT, false, 0, 0);
					//gl.drawArrays(gl.TRIANGLES, 0,$mesh.treNum);

				}
				
				
				{
					this.setVa($mesh);
					//this.setMeshVc($mesh);

					Scene_data.context3D.drawCallL3d($mesh.treNum);
					
					$mesh._bufferState.unBind();
                }
            }


*/