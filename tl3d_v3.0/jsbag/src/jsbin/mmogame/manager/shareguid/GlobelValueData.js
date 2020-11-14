var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GlobelValueData = /** @class */ (function (_super) {
    __extends(GlobelValueData, _super);
    function GlobelValueData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GlobelValueData.prototype.onBaseCreated = function () {
        var _this = this;
        ////console.log("globevalue")
        this.AddListen(SharedDef.GLOBALVALUE_INT_FIELD_WORLD_BOSS_STATE, function ($binlog) {
            ModuleEventManager.dispatchEvent(new sboss.SbossEvent(sboss.SbossEvent.WBOSS_STATE_CHG));
        });
        //家族联赛阶段变化监听
        this.AddListen(SharedDef.GLOBALVALUE_INT_FIELD_FACTION_MATCH_CURRENT_PHASE, function ($binlog) {
            //console.log("-----阶段变化了----", this.getFactionLeagueStage());
            ModuleEventManager.dispatchEvent(new faction.FactionLeaguEvent(faction.FactionLeaguEvent.REFRESH_STAGE_EVENT));
        });
        //家族联赛第几届变化监听
        this.AddListen(SharedDef.GLOBALVALUE_INT_FIELD_FACTION_MATCH_GAMES, function ($binlog) {
            ModuleEventManager.dispatchEvent(new faction.FactionLeaguEvent(faction.FactionLeaguEvent.REFRESH_SESSION_EVENT));
        });
        this._after_update = function ($flag, $intMask, $strMask) { _this.dataUpdate($intMask, $strMask); };
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.CORE_DATA_CREATED_EVENT));
    };
    GlobelValueData.prototype.getWorldBossId = function () {
        //  GLOBALVALUE_INT_FIELD_WORLD_BOSS_ID
        // 0:世界BOSS类型1, 1:世界BOSS类型2, 2:当前选定的类型
        var idx = SharedDef.GLOBALVALUE_INT_FIELD_WORLD_BOSS_ID;
        var a = this.GetByte(idx, 0);
        var b = this.GetByte(idx, 1);
        var c = this.GetByte(idx, 2);
        var d = this.GetByte(idx, 3);
        //return { id0: a, id1: b };
        return [a, b];
    };
    //    -- GLOBALVALUE_STRING_FIELD_XIANFU_RECORD_START
    //--MAX_XIANFU_RECORD_COUNT
    //--GLOBALVALUE_INT_FIELD_XIANFU_RECORD_CURSOR
    GlobelValueData.prototype.dataUpdate = function ($intMask, $strMask) {
        var $massBossChange = false;
        var choujinangFlag = false;
        for (var k in $intMask) {
            var $kNum = Number(k);
            if ($kNum >= SharedDef.GLOBALVALUE_INT_FIELD_MASS_BOSS_START && $kNum < SharedDef.GLOBALVALUE_INT_FIELD_MASS_BOSS_START + SharedDef.MAX_MASS_BOSS_INT_FIELD_COUNT * SharedDef.MAX_MASS_BOSS_COUNT) {
                $massBossChange = true;
            }
            else if ($kNum >= SharedDef.GLOBALVALUE_INT_FIELD_LOTTERY_RECORD_CURSOR_START && $kNum < SharedDef.GLOBALVALUE_INT_FIELD_LOTTERY_RECORD_CURSOR_END) {
                choujinangFlag = true;
            }
        }
        if (choujinangFlag) {
            ModuleEventManager.dispatchEvent(new ActiveEvent(ActiveEvent.ACTIVE_GLOBEL_CHOUJIANG_EVENT));
        }
        if ($massBossChange) {
            ModuleEventManager.dispatchEvent(new sboss.SbossEvent(sboss.SbossEvent.REFRISH_LIST_DATA));
        }
    };
    GlobelValueData.prototype.getXianfuRecords = function () {
        var ret = new Array;
        var cursor = this.GetUInt32(SharedDef.GLOBALVALUE_INT_FIELD_XIANFU_RECORD_CURSOR);
        var last = (cursor - 1) % SharedDef.MAX_XIANFU_RECORD_COUNT;
        var start = cursor % SharedDef.MAX_XIANFU_RECORD_COUNT;
        if (last < start) {
            last += SharedDef.MAX_XIANFU_RECORD_COUNT;
        }
        //console.log(start, last);
        for (var i = start; i <= last; ++i) {
            var indx = i % SharedDef.MAX_XIANFU_RECORD_COUNT;
            var str = this.GetStr(SharedDef.GLOBALVALUE_STRING_FIELD_XIANFU_RECORD_START + indx);
            if (str && str.length) {
                ret.push(str);
            }
        }
        return ret;
    };
    GlobelValueData.prototype.getCurrentBossInfo = function () {
        var idx = this.getBossIndex(GuidData.map.getMapID(), GuidData.map.getLineID());
        return this.getBaseBossInfo(idx);
    };
    GlobelValueData.prototype.getBossInfo = function ($mapID, $lineId) {
        var idx = this.getBossIndex($mapID, $lineId);
        return this.getBaseBossInfo(idx);
    };
    GlobelValueData.prototype.getFieldMassBoss = function (value) {
        var idx = SharedDef.GLOBALVALUE_INT_FIELD_MASS_BOSS_START + SharedDef.MAX_MASS_BOSS_INT_FIELD_COUNT * value;
        var $state = this.GetUInt32(idx + SharedDef.MASS_BOSS_STATE);
        var $time = this.GetUInt32(idx + SharedDef.MASS_BOSS_TIME);
        return { state: $state, time: $time };
        /*
          for (var i: number = 0; i < SharedDef.MAX_MASS_BOSS_COUNT; i++) {
            var idx: number = SharedDef.GLOBALVALUE_INT_FIELD_MASS_BOSS_START + SharedDef.MAX_MASS_BOSS_INT_FIELD_COUNT * i;
            var $state: number = this.GetUInt32(idx + SharedDef.MASS_BOSS_STATE);
            var $time: number = this.GetUInt32(idx + SharedDef.MASS_BOSS_TIME);
        
          }
        */
    };
    GlobelValueData.prototype.getMoneyChangeMassBossBuyTimes = function () {
        return this.GetUInt32(SharedDef.MONEY_CHANGE_MASS_BOSS_BUY_TIMES);
    };
    // GLOBALVALUE_INT_FIELD_WORLD_BOSS_STATE
    GlobelValueData.prototype.getWorldBossState = function () {
        var $id = SharedDef.GLOBALVALUE_INT_FIELD_WORLD_BOSS_STATE;
        return this.GetUInt32($id);
    };
    GlobelValueData.prototype.getBossIndex = function ($mapID, $lineId) {
        var config = TableData.getInstance().getData(TableData.tb_map_field_boss, $mapID);
        var idx = config.indx;
        return idx * SharedDef.MAX_DEFAULT_LINE_COUNT + $lineId - 1;
    };
    GlobelValueData.prototype.getBaseBossInfo = function (idx) {
        var time = this.GetUInt32(SharedDef.GLOBALVALUE_INT_FIELD_FIELD_BOSS_START
            + idx * SharedDef.MAX_FIELD_BOSS_INT_DATA_COUNT + SharedDef.FIELD_BOSS_DATA_PRIORITY_TIME);
        var refreshTime = this.GetUInt32(SharedDef.GLOBALVALUE_INT_FIELD_FIELD_BOSS_START
            + idx * SharedDef.MAX_FIELD_BOSS_INT_DATA_COUNT + SharedDef.FIELD_BOSS_DATA_NEXT_BORN_TIME);
        var type = this.GetUInt32(SharedDef.GLOBALVALUE_INT_FIELD_FIELD_BOSS_START
            + idx * SharedDef.MAX_FIELD_BOSS_INT_DATA_COUNT + SharedDef.FIELD_BOSS_DATA_PROCESS_TYPE);
        var ownerGuid = this.GetStr(SharedDef.GLOBALVALUE_STRING_FIELD_FIELD_BOSS_START + idx * SharedDef.MAX_FIELD_BOSS_STR_DATA_COUNT + SharedDef.FIELD_BOSS_DATA_MAX_DAMAGE_GUID);
        var ownerName = this.GetStr(SharedDef.GLOBALVALUE_STRING_FIELD_FIELD_BOSS_START + idx * SharedDef.MAX_FIELD_BOSS_STR_DATA_COUNT + SharedDef.FIELD_BOSS_DATA_NAME);
        //console.log("----111---", { "time": time, "refreshTime": refreshTime, "type": type, "owner": ownerGuid, "name": ownerName });
        return { "time": time, "refreshTime": refreshTime, "type": type, "owner": ownerGuid, "name": ownerName };
    };
    GlobelValueData.prototype.getQueenChampion = function () {
        var flag = this.GetUInt32(SharedDef.GLOBALVALUE_INT_FIELD_GIFT_RANK_WINER_FACTION_FLAG);
        var name1 = this.GetStr(SharedDef.GLOBALVALUE_STRING_FIELD_GIFT_RANK_WINER_QUEEN_NAME);
        var name2 = this.GetStr(SharedDef.GLOBALVALUE_STRING_FIELD_GIFT_RANK_WINER_GUARD_NAME);
        return { img: flag, queen: name1, qs: name2 };
    };
    GlobelValueData.prototype.getQueenRankRound = function () {
        return this.GetUInt32(SharedDef.GLOBALVALUE_INT_FIELD_GIFT_RANK_CUR_ROUND);
    };
    GlobelValueData.prototype.getQueenRankTime = function () {
        return this.GetUInt32(SharedDef.GLOBALVALUE_INT_FIELD_GIFT_RANK_NEXT_UPDATE_TIME);
    };
    // /**正在开启的活动列表 */
    GlobelValueData.prototype.getActiveList = function () {
        var ary = new Array;
        for (var i = SharedDef.GLOBALVALUE_INT_FIELD_ACTIVITIES_RUNNING_START; i < SharedDef.GLOBALVALUE_INT_FIELD_ACTIVITIES_RUNNING_END; i++) {
            var id = this.GetUInt32(i);
            if (id > 0) {
                ary.push(id);
            }
        }
        return ary;
    };
    /**开服活动列表*/
    GlobelValueData.prototype.getKaiFuActiveList = function () {
        var ary = new Array;
        var allList = this.getActiveList();
        for (var i = 0; i < allList.length; i++) {
            var tabObj = TableData.getInstance().getData(TableData.tb_activity_time, allList[i]);
            if (tabObj.type == 1) {
                ary.push(allList[i]);
            }
        }
        return ary;
    };
    GlobelValueData.prototype.getLotteryRecord = function ($id) {
        var ret = new Array;
        $id--;
        var cursor = this.GetUInt32(SharedDef.GLOBALVALUE_INT_FIELD_LOTTERY_RECORD_CURSOR_START + $id);
        var start = SharedDef.GLOBALVALUE_STRING_FIELD_LOTTERY_RECORD_START + $id * SharedDef.MAX_LOTTERY_RECORD_COUNT;
        var center = start + cursor;
        var end = start + SharedDef.MAX_LOTTERY_RECORD_COUNT;
        for (var i = center; i < end; ++i) {
            var str = this.GetStr(i);
            if (str) {
                ret.push(str);
            }
        }
        for (var i = start; i < center; ++i) {
            var str = this.GetStr(i);
            if (str) {
                ret.push(str);
            }
        }
        return ret.reverse();
    };
    //家族联赛第几届  第0届时不能获取列表
    GlobelValueData.prototype.getFactionLeagueSession = function () {
        return this.GetUInt32(SharedDef.GLOBALVALUE_INT_FIELD_FACTION_MATCH_GAMES);
    };
    //家族联赛进行到哪个阶段
    GlobelValueData.prototype.getFactionLeagueStage = function () {
        return this.GetUInt32(SharedDef.GLOBALVALUE_INT_FIELD_FACTION_MATCH_CURRENT_PHASE);
    };
    //家族联赛开启日期
    GlobelValueData.prototype.getFactionLeagueTime = function () {
        return this.GetUInt32(SharedDef.GLOBALVALUE_INT_FIELD_FACTION_MATCH_GAMES_NEXT_TIME);
    };
    GlobelValueData.prototype.getFactionHonorInfo = function () {
        var obj = new Object;
        obj.name = this.GetStr(SharedDef.GLOBALVALUE_STRING_FIELD_FACTION_MATCH_CHAMPION_FACTION_NAME);
        obj.ls = this.GetUInt32(SharedDef.GLOBALVALUE_INT_FIELD_FACTION_MATCH_CHAMPION_WINSTRIKE_COUNT);
        obj.char = this.GetUInt32(SharedDef.GLOBALVALUE_INT_FIELD_FACTION_MATCH_CHAMPION_BANGZHU_GENDER); // = 399	-- 家族战盟主帮主角色
        obj.coat = this.GetUInt32(SharedDef.GLOBALVALUE_INT_FIELD_FACTION_MATCH_CHAMPION_BANGZHU_COAT); // = 400	-- 家族战盟主帮主外观
        obj.weapon = this.GetUInt32(SharedDef.GLOBALVALUE_INT_FIELD_FACTION_MATCH_CHAMPION_BANGZHU_WEAPON); // = 401	-- 家族战盟主帮主武器
        obj.wing = this.GetUInt32(SharedDef.GLOBALVALUE_INT_FIELD_FACTION_MATCH_CHAMPION_BANGZHU_WINGSID); // = 402	-- 家族战盟主帮主翅膀
        obj.guid = this.GetStr(SharedDef.GLOBALVALUE_STRING_FIELD_FACTION_MATCH_CHAMPION_FACTION_GUID);
        obj.hname = this.GetStr(SharedDef.GLOBALVALUE_STRING_FIELD_FACTION_MATCH_CHAMPION_BANGZHU_NAME);
        return obj;
    };
    GlobelValueData.prototype.getFactionHonorLS = function () {
        return this.GetUInt32(SharedDef.GLOBALVALUE_INT_FIELD_FACTION_MATCH_CHAMPION_WINSTRIKE_COUNT);
    };
    return GlobelValueData;
}(GuidObject));
//# sourceMappingURL=GlobelValueData.js.map