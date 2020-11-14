
module layapan {
    import SkillType = Pan3d.SkillType;
    import SkillFixEffect = Pan3d.SkillFixEffect;
    import SkillTrajectory = Pan3d.SkillTrajectory;
    import SkillTrajectoryTargetKeyVo = Pan3d.SkillTrajectoryTargetKeyVo;
    import SkillMulTrajectory = Pan3d.SkillMulTrajectory;
    import SkillKey = Pan3d.SkillKey;

    export class OverrideSkillFixEffectKeyVo extends Pan3d.SkillFixEffectKeyVo {
        public constructor() {
            super();
            console.log("OverrideSkillFixEffectKeyVo")
        }
    }
}