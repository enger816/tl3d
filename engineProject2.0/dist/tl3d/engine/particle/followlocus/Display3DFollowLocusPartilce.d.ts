import { Display3DParticle } from "../Display3DParticle";
import { ParticleFollowLocusData } from "./ParticleFollowLocusData";
export declare class Display3DFollowLocusPartilce extends Display3DParticle {
    protected _bindPosAry: Array<Array<number>>;
    protected _gpuVc: Float32Array;
    protected _caramPosVec: Array<number>;
    constructor();
    get followlocusdata(): ParticleFollowLocusData;
    creatData(): void;
    onCreated(): void;
    protected initBindMatrixAry(): void;
    setVa(): void;
    setVc(): void;
    setBindPosVc(): void;
    reset(): void;
    updateMatrix(): void;
    resetPos(): void;
    protected flag: number;
    static waitCdTime: number;
    updateBind(): void;
}
