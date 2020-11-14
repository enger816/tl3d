module Pan3d {
    export class ParticleFollowData extends ParticleBallData {

        public getParticle(): Display3DParticle {
            return new Display3DFollowPartilce;
        }

        public setAllByteInfo($byte: Pan3dByteArray): void {

            super.setAllByteInfo($byte);
            //this.initBingMatrixAry();
            this.uploadGpu();
        }

        public regShader(): void {
            if (!this.materialParam) {
                return;
            }

            var shaderParameAry: Array<number> = this.getShaderParam();
            //var shader: Display3DFollowShader = new Display3DFollowShader()
            this.materialParam.shader = ProgrmaManager.getInstance().getMaterialProgram(Display3DFollowShader.Display3D_Follow_Shader,
                Display3DFollowShader, this.materialParam.material, shaderParameAry);
            this.materialParam.program = this.materialParam.shader.program;
        }

    }
}