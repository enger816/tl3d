import { ParticleBallData } from "../ball/ParticleBallData";
import { Display3DParticle } from "../Display3DParticle";
import { Display3DFollowPartilce } from "./Display3DFollowPartilce";
import { Pan3dByteArray } from "../../math/Pan3dByteArray";
import { ProgramManager } from "../../program/ProgramManager";
import { Display3DFollowShader } from "./Display3DFollowShader";

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
            this.materialParam.shader = ProgramManager.getInstance().getMaterialProgram(Display3DFollowShader.Display3D_Follow_Shader,
                Display3DFollowShader, this.materialParam.material, shaderParameAry);
            this.materialParam.program = this.materialParam.shader.program;
        }

    }