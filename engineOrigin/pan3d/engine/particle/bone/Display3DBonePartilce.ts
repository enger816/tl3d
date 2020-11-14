module Pan3d {
    export class Display3DBoneShader extends Shader3D {
        static Display3DBoneShader: string = "Display3DBoneShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "pos");
            $context.bindAttribLocation(this.program, 1, "v2uv");
            $context.bindAttribLocation(this.program, 2, "boneWeight");
            $context.bindAttribLocation(this.program, 3, "boneID");
        }
        public static shader_mat4 = { viewMatrix3D: 0, camMatrix3D: 1, posMatrix3D: 2 };

        public getMat4Str(key: string): string {
            //return key;
            return "vcmat[" + Display3DBoneShader.shader_mat4[key] + "]";
        }

        public static getVcSize(): number {
            return 3;
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 pos;" +
                "attribute vec2 v2uv;" +
                "attribute vec4 boneWeight;" +
                "attribute vec4 boneID;" +
                "uniform vec4 boneQ[54];\n" +
                "uniform vec3 boneD[54];\n" +
                "uniform mat4 vcmat[" + Display3DBoneShader.getVcSize() + "];\n" +//所有vc值
                //"uniform mat4 viewMatrix3D;\n" +
                //"uniform mat4 camMatrix3D;\n" +
                //"uniform mat4 posMatrix3D;\n" +
                "varying vec2 v0;\n" +
                MaterialAnimShader.getMd5M44Str() +
                "void main(void)" +
                "{" +
                "v0 = v2uv;\n" +
                "vec4 vt0 = getQDdata(vec3(pos.x,pos.y,pos.z));\n" +
                " gl_Position = " + this.getMat4Str("viewMatrix3D") + " * " + this.getMat4Str("camMatrix3D") + " *" + this.getMat4Str("posMatrix3D") + "* vt0;" +
                "}"
            return $str
        }
        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "varying vec2 v0;\n" +
                "void main(void)\n" +
                "{\n" +
                "gl_FragColor = vec4(1.0,0.0,1.0,1.0);\n" +
                "}"
            return $str

        }
    }
    export class Display3DBonePartilce extends Display3DParticle {


        public constructor() {
            super();

        }

        public get modeldata(): ParticleBoneData {
            return <ParticleBoneData>this.data;
        }

        public creatData(): void {
            this.data = new ParticleBoneData;
        }

        public update(): void {
            Scene_data.context3D.setWriteDepth(false);
            super.update()
         //   Scene_data.context3D.setWriteDepth(false);
        }
        private skipNum: number = 0
        public setVc(): void {
            var currentFrame: number = float2int((this._time / Scene_data.frameTime) / 2);

            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
            //this.data.setFloat32Mat("viewMatrix3D", Scene_data.viewMatrx3D.m);
            this.data.vcmatData.set(Scene_data.viewMatrx3D.m, 0);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
            //this.data.setFloat32Mat("camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
            this.data.vcmatData.set(Scene_data.cam3D.cameraMatrix.m, 16);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "posMatrix3D", this.modelMatrix.m);
            //this.data.setFloat32Mat("posMatrix3D", this.modelMatrix.m);
            this.data.vcmatData.set(this.modelMatrix.m, 32);

            Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "vcmat", this.data.vcmatData);

            var $frameDualQuat: Array<DualQuatFloat32Array> = this.modeldata.animData.boneQPAry[0]
            var $frameLen: number = $frameDualQuat.length;
            var $frameId: number = currentFrame % $frameLen;

            /*
            for (var i: number = 0; i < this.modeldata.boneQDitem[$frameId].length; i++) {
                var $dq: ObjectBone = this.modeldata.boneQDitem[$frameId][i]
    
                Scene_data.context3D.setVc4fv(this.data.materialParam.program, "boneQ[" + i + "]", [$dq.qx, $dq.qy, $dq.qz, $dq.qw]);
                Scene_data.context3D.setVc3fv(this.data.materialParam.program, "boneD[" + i + "]", [$dq.tx, $dq.ty, $dq.tz]);
            }
            */

            var $dualQuatFrame: DualQuatFloat32Array = $frameDualQuat[$frameId];
            Scene_data.context3D.setVc4fv(this.data.materialParam.shader, "boneQ", $dualQuatFrame.quat); //旋转
            Scene_data.context3D.setVc3fv(this.data.materialParam.shader, "boneD", $dualQuatFrame.pos);  //所有的位移

            this.setMaterialVc();
        }
        public setVa(): void {
            var tf: boolean = Scene_data.context3D.pushVa(this.modeldata.meshData.vertexBuffer);

            if (!tf) {
                Scene_data.context3D.setVaOffset(0, 3, this.modeldata.meshData.stride, 0);
                Scene_data.context3D.setVaOffset(1, 2, this.modeldata.meshData.stride, 12);
                Scene_data.context3D.setVaOffset(3, 4, this.modeldata.meshData.stride, 20);
                Scene_data.context3D.setVaOffset(2, 4, this.modeldata.meshData.stride, 36);
            }



            // Scene_data.context3D.setVa(0, 3, this.modeldata.meshData.vertexBuffer);
            // Scene_data.context3D.setVa(1, 2, this.modeldata.meshData.uvBuffer);
            // Scene_data.context3D.setVa(2, 4, this.modeldata.meshData.boneWeightBuffer);
            // Scene_data.context3D.setVa(3, 4, this.modeldata.meshData.boneIdBuffer);
            this.setMaterialTexture();
            Scene_data.context3D.drawCall(this.modeldata.meshData.indexBuffer, this.modeldata.meshData.treNum);
        }
        public resetVa(): void {
            //Scene_data.context3D.clearVa(2);
            //Scene_data.context3D.clearVa(3);
            super.resetVa();
        }



    }
}