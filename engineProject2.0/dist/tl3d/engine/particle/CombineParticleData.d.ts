import { ResCount } from "../base/ResCount";
import { ParticleData } from "./ParticleData";
import { CombineParticle } from "./CombineParticle";
import { Pan3dByteArray } from "../math/Pan3dByteArray";
export declare class CombineParticleData extends ResCount {
    maxTime: number;
    dataAry: Array<ParticleData>;
    destory(): void;
    getCombineParticle(): CombineParticle;
    setDataByte(byte: Pan3dByteArray): void;
    private getParticleDataType;
}
