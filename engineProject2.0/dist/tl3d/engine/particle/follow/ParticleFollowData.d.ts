import { ParticleBallData } from "../ball/ParticleBallData";
import { Display3DParticle } from "../Display3DParticle";
import { Pan3dByteArray } from "../../math/Pan3dByteArray";
export declare class ParticleFollowData extends ParticleBallData {
    getParticle(): Display3DParticle;
    setAllByteInfo($byte: Pan3dByteArray): void;
    regShader(): void;
}
