import { ParticleData } from "../ParticleData";
import { Display3DParticle } from "../Display3DParticle";
import { Pan3dByteArray } from "../../math/Pan3dByteArray";
export declare class ParticleLocusData extends ParticleData {
    _speed: number;
    _isLoop: boolean;
    _density: number;
    _isEnd: boolean;
    _resultUvVec: Array<number>;
    _caramPosVec: Array<number>;
    _changUv: boolean;
    _uvVec: Array<number>;
    getParticle(): Display3DParticle;
    setAllByteInfo($byte: Pan3dByteArray): void;
    initUV(): void;
    uploadGpu(): void;
    regShader(): void;
    initVcData(): void;
    setFloat32Vec(key: string, ary: Array<number>): void;
    setFloat32Mat(key: string, ary: Float32Array): void;
}
