import { ParticleGpuData } from "../ParticleGpuData";
export declare class ParticleBallGpuData extends ParticleGpuData {
    basePos: Array<number>;
    basePosBuffer: WebGLBuffer;
    beMove: Array<number>;
    beMoveBuffer: WebGLBuffer;
    randomColor: Array<number>;
    randomColorBuffer: WebGLBuffer;
    randomOffset: number;
    baseRotation: Array<number>;
    baseRotationBuffer: WebGLBuffer;
    destory(): void;
}
