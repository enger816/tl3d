import { ParticleBallData } from "../ball/ParticleBallData";
import { Pan3dByteArray } from "../../math/Pan3dByteArray";
import { Display3DParticle } from "../Display3DParticle";
export declare class ParticleLocusballData extends ParticleBallData {
    protected _posAry: Array<number>;
    protected _angleAry: Array<number>;
    protected _tangentAry: Array<number>;
    protected _tangentSpeed: number;
    getParticle(): Display3DParticle;
    initBasePos(): void;
    initSpeed(): void;
    setAllByteInfo($byte: Pan3dByteArray): void;
}
