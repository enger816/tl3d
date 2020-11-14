import { Display3DBallPartilce } from "../ball/Display3DBallPartilce";
import { ParticleFollowData } from "./ParticleFollowData";
export declare class Display3DFollowPartilce extends Display3DBallPartilce {
    private _bindMatrixAry;
    private _bindFlagAry;
    private flag;
    constructor();
    get followdata(): ParticleFollowData;
    creatData(): void;
    onCreated(): void;
    setVc(): void;
    private initBingMatrixAry;
    updateBind(): void;
    updateMatrix(): void;
    updateAllRotationMatrix(): void;
    reset(): void;
    updateWatchCaramMatrix(): void;
}
