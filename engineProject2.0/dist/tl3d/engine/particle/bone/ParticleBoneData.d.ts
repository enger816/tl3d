import { ParticleData } from "../ParticleData";
import { Display3DParticle } from "../Display3DParticle";
import { MeshData } from "../../base/MeshData";
import { AnimData } from "../../vo/skinanim/AnimData";
import { Pan3dByteArray } from "../../math/Pan3dByteArray";
export declare class ParticleBoneData extends ParticleData {
    _maxAnimTime: number;
    getParticle(): Display3DParticle;
    destory(): void;
    meshData: MeshData;
    animData: AnimData;
    objScale: number;
    setAllByteInfo($byte: Pan3dByteArray): void;
    initVcData(): void;
    setFloat32Mat(key: string, ary: Float32Array): void;
    private readFrameQua;
    uploadGpu(): void;
    private uploadMesh;
    regShader(): void;
}
