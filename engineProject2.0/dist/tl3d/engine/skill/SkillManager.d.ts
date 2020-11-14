import { ResGC } from "../base/ResGC";
import { Skill } from "./Skill";
import { SkillData } from "./SkillData";
import { SkillRes } from "../utils/res/SkillRes";
export declare class SkillManager extends ResGC {
    _skillDic: Object;
    _loadDic: Object;
    _preLoadDic: Object;
    _skillAry: Array<Skill>;
    protected _time: number;
    private static _instance;
    constructor();
    static getInstance(): SkillManager;
    update(): void;
    preLoadSkill($url: string): void;
    getSkill($url: string, $name: string, $callback?: Function): Skill;
    protected loadSkillCom($url: string, $skillRes: SkillRes): void;
    addSrc($url: string, skillData: SkillData): void;
    playSkill($skill: Skill): void;
    removeSkill($skill: Skill): void;
    gcSkill(skill: Skill): void;
    gc(): void;
}
export declare class ShockUtil {
    private static _instance;
    static getInstance(): ShockUtil;
    constructor();
    private upFun;
    private time;
    private amp;
    private ctime;
    private update;
    shock(time: number, amp: number): void;
}
