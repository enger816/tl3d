var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var layapan_me;
(function (layapan_me) {
    var SkillType = Pan3d.SkillType;
    var SkillVo = Pan3d.SkillVo;
    var OverrideSkill = /** @class */ (function (_super) {
        __extends(OverrideSkill, _super);
        function OverrideSkill($skillManager) {
            if ($skillManager === void 0) { $skillManager = null; }
            var _this = _super.call(this) || this;
            _this.baseName = "OverrideSkill";
            _this.skillManager = $skillManager;
            return _this;
        }
        OverrideSkill.prototype.skillComplete = function () {
            this.skillManager.removeSkill(this);
            this.isDeath = true;
            if (this.completeFun) {
                this.completeFun();
            }
            this.idleTime = 0;
        };
        OverrideSkill.prototype.setData = function ($data, $skillData) {
            if (this.hasDestory) {
                return;
            }
            this.skillVo = new SkillVo();
            this.skillVo.setData($data);
            this.setKeyAry();
            this.trajectoryAry = new Array;
            this._skillData = $skillData;
        };
        OverrideSkill.prototype.setKeyAry = function () {
            var _this = this;
            this.keyAry = new Array;
            if (this.skillVo.types == SkillType.FixEffect) {
                for (var i = 0; i < this.skillVo.keyAry.length; i++) {
                    var keySkill = new layapan_me.OverrideSkillFixEffect(this);
                    keySkill.setInfo(this.skillVo.keyAry[i]);
                    keySkill.removeCallFun = function ($key) { _this.removeKey($key); };
                    keySkill.active = this.active;
                    this.keyAry.push(keySkill);
                }
            }
            else if (this.skillVo.types == SkillType.TrajectoryDynamicTarget || this.skillVo.types == SkillType.TrajectoryDynamicPoint) {
                for (var i = 0; i < this.skillVo.keyAry.length; i++) {
                    var trajectory;
                    var tkv = (this.skillVo.keyAry[i]);
                    if (tkv.multype == 1) {
                        //trajectory = new SkillMulTrajectory();
                    }
                    else {
                        trajectory = new layapan_me.OverrideSkillTrajectory();
                        trajectory.skill = this;
                    }
                    trajectory.setInfo(this.skillVo.keyAry[i]);
                    this.keyAry.push(trajectory);
                }
            }
        };
        return OverrideSkill;
    }(Pan3d.Skill));
    layapan_me.OverrideSkill = OverrideSkill;
})(layapan_me || (layapan_me = {}));
//# sourceMappingURL=OverrideSkill.js.map