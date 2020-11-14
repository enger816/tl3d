import { OverrideSkill } from "./OverrideSkill";
import { SkillFixEffect } from "../../../../tl3d/engine/skill/key/SkillFixEffect";
export declare class OverrideSkillFixEffect extends SkillFixEffect {
    skill: OverrideSkill;
    constructor($skillvo: OverrideSkill);
    protected onPlayCom(event?: Event): void;
    addToRender(): void;
}
