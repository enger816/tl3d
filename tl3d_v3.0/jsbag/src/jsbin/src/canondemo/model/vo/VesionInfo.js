var VesionInfo = /** @class */ (function () {
    function VesionInfo() {
    }
    VesionInfo.prototype.meshObj = function (value) {
        for (var key in value) {
            this[key] = value[key];
        }
    };
    Object.defineProperty(VesionInfo.prototype, "canUseShareBut", {
        get: function () {
            if (this.shareRatio.open) {
                if (GameData.getStorageSyncNumber("loginnum") > this.shareRatio.minLogin) {
                    console.log("登入次数", GameData.getStorageSyncNumber("loginnum"), "分享次数", AllShareMeshVo.shareSkipId, "人数", GameData.haveAdvertiseListLen, "系数", this.shareRatio.num);
                    if (GameData.haveAdvertiseListLen >= this.shareRatio.advertisemax) {
                        console.log("已分享邀请成功大于或等于", this.shareRatio.advertisemax);
                        return true;
                    }
                    if (AllShareMeshVo.shareSkipId > (GameData.haveAdvertiseListLen + 1) * this.shareRatio.num) {
                        //如果 登入次数大于 3 ,分享获取人数+1 * 10  .就关闭分享按钮；
                        console.log("不能使用分享按钮");
                        return false;
                    }
                }
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return VesionInfo;
}());
//# sourceMappingURL=VesionInfo.js.map