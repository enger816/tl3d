import { Display3DParticle } from "../Display3DParticle";
import { ParticleLocusData } from "./ParticleLocusData";
export declare class Display3DLocusPartilce extends Display3DParticle {
    constructor();
    get locusdata(): ParticleLocusData;
    creatData(): void;
    setVa(): void;
    setVc(): void;
    updateUV(): void;
}
