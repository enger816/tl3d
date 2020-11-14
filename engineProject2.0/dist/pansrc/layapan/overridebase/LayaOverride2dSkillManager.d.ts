import { SkillManager } from "../../../tl3d/engine/skill/SkillManager";
import { LayaOverride2dSceneManager } from "./LayaOverride2dSceneManager";
import { SkillData } from "../../../tl3d/engine/skill/SkillData";
import { OverrideSkill } from "./skill/OverrideSkill";
import { SkillRes } from "../../../tl3d/engine/utils/res/SkillRes";
export declare class LayaOverride2dSkillManager extends SkillManager {
    sceneManager: LayaOverride2dSceneManager;
    constructor($sceneManager: LayaOverride2dSceneManager);
    addSrc($url: string, skillData: SkillData): void;
    playSkill($skill: OverrideSkill): void;
    getSkill($url: string, $name: string, $callback?: Function): OverrideSkill;
    protected loadSkillCom($url: string, $skillRes: SkillRes): void;
}
