import { SkillKeyVo } from "../vo/SkillKeyVo";
import { CombineParticle } from "../../particle/CombineParticle";
export declare class SkillKey {
    time: number;
    particle: CombineParticle;
    removeCallFun: Function;
    constructor();
    addToRender(): void;
    setInfo(obj: SkillKeyVo): void;
    reset(): void;
    destory(): void;
}
