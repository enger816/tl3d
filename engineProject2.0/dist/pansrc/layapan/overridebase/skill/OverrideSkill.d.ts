import { LayaOverride2dSkillManager } from "../LayaOverride2dSkillManager";
import { Skill } from "../../../../tl3d/engine/skill/Skill";
import { SkillData } from "../../../../tl3d/engine/skill/SkillData";
export declare class OverrideSkill extends Skill {
    skillManager: LayaOverride2dSkillManager;
    baseName: string;
    constructor($skillManager?: LayaOverride2dSkillManager);
    skillComplete(): void;
    setData($data: any, $skillData: SkillData): void;
    setKeyAry(): void;
}
