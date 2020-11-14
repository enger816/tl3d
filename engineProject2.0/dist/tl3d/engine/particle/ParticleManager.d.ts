import { CombineParticle } from "./CombineParticle";
import { Pan3dByteArray } from "../math/Pan3dByteArray";
import { ResGC } from "../base/ResGC";
export declare class ParticleManager extends ResGC {
    static _instance: ParticleManager;
    static getInstance(): ParticleManager;
    private _particleList;
    private _time;
    constructor();
    getParticleByte($url: string): CombineParticle;
    registerUrl($url: string): void;
    releaseUrl($url: string): void;
    addResByte($url: string, $data: Pan3dByteArray): void;
    update(): void;
    clearPaticleVa(): void;
    setHide(): void;
    get particleList(): Array<CombineParticle>;
    updateTime(): void;
    private renderDic;
    private addRenderDic;
    private removeRenderDic;
    private updateRenderDic;
    addParticle($particle: CombineParticle): void;
    removeParticle($particle: CombineParticle): void;
    gc(): void;
}
