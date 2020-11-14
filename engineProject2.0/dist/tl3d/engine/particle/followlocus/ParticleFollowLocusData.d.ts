import { ParticleData } from "../ParticleData";
import { Display3DParticle } from "../Display3DParticle";
import { Pan3dByteArray } from "../../math/Pan3dByteArray";
export declare class ParticleFollowLocusData extends ParticleData {
    _fenduanshu: number;
    getParticle(): Display3DParticle;
    setAllByteInfo($byte: Pan3dByteArray): void;
    uploadGpu(): void;
    protected pushToGpu(): void;
    initVcData(): void;
    regShader(): void;
}
