var social;
(function (social) {
    //技能的三个类型
    var SkillBaseType = /** @class */ (function () {
        function SkillBaseType() {
        }
        SkillBaseType.ZHUDONG = 0;
        SkillBaseType.NUQI = 1;
        SkillBaseType.BEIDONG = 2;
        return SkillBaseType;
    }());
    social.SkillBaseType = SkillBaseType;
    var SocialgivingData = /** @class */ (function () {
        function SocialgivingData() {
        }
        return SocialgivingData;
    }());
    social.SocialgivingData = SocialgivingData;
    var SocialModel = /** @class */ (function () {
        function SocialModel() {
        }
        SocialModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new SocialModel();
            }
            return this._instance;
        };
        return SocialModel;
    }());
    social.SocialModel = SocialModel;
})(social || (social = {}));
//# sourceMappingURL=SocialModel.js.map