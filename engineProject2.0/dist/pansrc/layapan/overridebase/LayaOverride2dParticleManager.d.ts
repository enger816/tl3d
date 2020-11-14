import { ParticleManager } from "../../../tl3d/engine/particle/ParticleManager";
import { CombineParticle } from "../../../tl3d/engine/particle/CombineParticle";
import { Pan3dByteArray } from "../../../tl3d/engine/math/Pan3dByteArray";
export declare class LayaOverride2dParticleManager extends ParticleManager {
    constructor();
    getParticleByte($url: string): CombineParticle;
    registerUrl($url: string): void;
    releaseUrl($url: string): void;
    addResByte($url: string, $data: Pan3dByteArray): void;
}
