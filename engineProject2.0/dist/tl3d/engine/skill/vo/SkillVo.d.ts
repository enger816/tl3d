import { SkillKeyVo, SkillShockVo } from "./SkillKeyVo";
export declare class SkillVo {
    action: string;
    skillname: string;
    keyAry: Array<SkillKeyVo>;
    shockAry: Array<SkillShockVo>;
    types: number;
    bloodTime: number;
    static defaultBloodTime: number;
    sound: SkillKeyVo;
    setData($info: any): void;
    private getShockAry;
    private getFixEffect;
    private getTrajectoryDynamicTarget;
}
export declare class SkillType {
    static TrajectoryDynamicTarget: number;
    static FixEffect: number;
    static TrajectoryDynamicPoint: number;
}
