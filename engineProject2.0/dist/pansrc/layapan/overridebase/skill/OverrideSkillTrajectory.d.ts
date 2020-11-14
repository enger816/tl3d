import { SkillTrajectory } from "../../../../tl3d/engine/skill/key/SkillTrajectory";
import { OverrideSkill } from "./OverrideSkill";
import { BaseEvent } from "../../../../tl3d/engine/events/BaseEvent";
import { SkillKeyVo } from "../../../../tl3d/engine/skill/vo/SkillKeyVo";
export declare class OverrideSkillTrajectory extends SkillTrajectory {
    skill: OverrideSkill;
    reset(): void;
    addToRender(): void;
    endPlayFun(e?: BaseEvent): void;
    setInfo(obj: SkillKeyVo): void;
}
