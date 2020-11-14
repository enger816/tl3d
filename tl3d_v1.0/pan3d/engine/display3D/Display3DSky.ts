module Pan3d {
    export class Display3DSky extends Display3D {

        public objurl: string;

        public cubeTextList: Array<WebGLTexture>;

        constructor() {
            super();
            this.shader = ProgrmaManager.getInstance().getProgram(SkyShader.Sky_Shader);
            this.program = this.shader.program;
        }

        public setObjUrl(value: string): void {
            this.objurl = value;
            ObjDataManager.getInstance().getObjData(Scene_data.fileRoot + value, ($objData: ObjData) => {
                this.objData = $objData;
            });
        }

        public setCubeUrl(value: string): void {
            TextureManager.getInstance().loadCubeTexture(value, ($ary: any) => { this.cubeTextList = $ary })
        }

        public update(): void {

            Scene_data.context3D.setProgram(this.program);
            Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
            Scene_data.context3D.setVcMatrix4fv(this.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
            Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);

            if (this.cubeTextList) {
                Scene_data.context3D.setRenderTextureCube(this.program, "s_texture", this.cubeTextList[0], 0);
            }

            Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
            Scene_data.context3D.setVa(1, 3, this.objData.normalsBuffer);
            Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);

        }

    }
}