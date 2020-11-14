import { ParticleData } from "../ParticleData";
import { Display3DParticle } from "../Display3DParticle";
import { Pan3dByteArray } from "../../math/Pan3dByteArray";
export declare class ParticleModelData extends ParticleData {
    _maxAnimTime: number;
    _depthMode: number;
    getParticle(): Display3DParticle;
    setAllByteInfo($byte: Pan3dByteArray): void;
    initVcData(): void;
    uploadGpu(): void;
    regShader(): void;
    setFloat32Vec(key: string, ary: Array<number>): void;
    setFloat32Mat(key: string, ary: Float32Array): void;
}
