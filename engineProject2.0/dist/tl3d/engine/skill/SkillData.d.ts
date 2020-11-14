import { ResCount } from "../base/ResCount";
import { Skill } from "./Skill";
export declare class SkillData extends ResCount {
    data: any;
    private srcList;
    srcOutAry: Array<Skill>;
    addSrcSkill($skill: Skill): void;
    destory(): void;
    testDestory(): boolean;
}
