var HelpOtherVo = /** @class */ (function () {
    function HelpOtherVo() {
    }
    HelpOtherVo.prototype.meshObj = function (value) {
        this.level = value.level;
        this.openid = value.openid;
        this.state = value.state;
        this.time = value.time;
        this.user_info = value.user_info;
        this.helper_info = value.helper_info;
        if (this.user_info) {
            this.userNickName = this.user_info.split("|")[0];
            this.userAvatarUrl = this.user_info.split("|")[1];
        }
        if (this.user_info) {
            this.helpNickName = this.helper_info.split("|")[0];
            this.helpAvatarUrl = this.helper_info.split("|")[1];
        }
    };
    return HelpOtherVo;
}());
//# sourceMappingURL=HelpOtherVo.js.map