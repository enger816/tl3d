import { Display3DParticle } from "../Display3DParticle";
import { ParticleModelData } from "./ParticleModelData";
export declare class Display3DModelPartilce extends Display3DParticle {
    protected _resultUvVec: Array<number>;
    constructor();
    get modeldata(): ParticleModelData;
    creatData(): void;
    setVc(): void;
    setVa(): void;
    updateWatchCaramMatrix(): void;
    updateUV(): void;
}
