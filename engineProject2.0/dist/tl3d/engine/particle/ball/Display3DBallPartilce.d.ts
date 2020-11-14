import { Display3DParticle } from "../Display3DParticle";
import { ParticleBallData } from "./ParticleBallData";
import { ParticleBallGpuData } from "./ParticleBallGpuData";
export declare class Display3DBallPartilce extends Display3DParticle {
    constructor();
    get balldata(): ParticleBallData;
    creatData(): void;
    setVa(): void;
    setVaCompress(): void;
    resetVa(): void;
    setVc(): void;
    updateWatchCaramMatrix(): void;
    updateAllRotationMatrix(): void;
    get particleBallData(): ParticleBallGpuData;
}
