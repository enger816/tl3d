var AllShareMeshVo = /** @class */ (function () {
    function AllShareMeshVo(value, $type) {
        if ($type === void 0) { $type = 0; }
        this.sharetype = $type;
        this.bfun = value;
        this.id = GameData.getStorageSyncNumber("userShareNum");
        GameData.setStorageSync("userShareNum", this.id + 1);
        AllShareMeshVo.shareSkipId = this.id;
    }
    AllShareMeshVo.shareSkipId = 0;
    AllShareMeshVo.type1 = 1; //转盘
    AllShareMeshVo.type2 = 2; //邀请
    AllShareMeshVo.type3 = 3; //必须邀请的通关 暂时没用到
    AllShareMeshVo.type4 = 4; //魔法球
    AllShareMeshVo.type5 = 5; //离线领取双位奖励
    AllShareMeshVo.type6 = 6; //原来复活
    AllShareMeshVo.type7 = 7; //任务获取
    AllShareMeshVo.type8 = 8; //时间礼物，现在还没用上
    AllShareMeshVo.type9 = 9; //进入神秘关卡
    AllShareMeshVo.type10 = 10; //复活点复活
    AllShareMeshVo.type11 = 11; //开起宝箱
    AllShareMeshVo.type12 = 12; //vip
    return AllShareMeshVo;
}());
//# sourceMappingURL=AllShareMeshVo.js.map