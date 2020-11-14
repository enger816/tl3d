import { Display3DParticle } from "../Display3DParticle";
import { ParticleFacetData } from "./ParticleFacetData";
export declare class Display3DFacetParticle extends Display3DParticle {
    private _lifeVisible;
    private _resultUvVec;
    constructor();
    get facetdata(): ParticleFacetData;
    creatData(): void;
    update(): void;
    reset(): void;
    setVc(): void;
    setVa(): void;
    updateRotaionMatrix(): void;
    updateUV(): void;
}
