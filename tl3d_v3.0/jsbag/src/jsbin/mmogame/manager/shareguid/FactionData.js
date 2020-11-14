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
var FactionData = /** @class */ (function (_super) {
    __extends(FactionData, _super);
    function FactionData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //获得自己的职务
        _this._playerIdentity = -1;
        _this._goldDonation = 0;
        _this._ybDonation = 0;
        return _this;
    }
    FactionData.prototype.onBaseCreated = function () {
        //var level: number = this.GetUInt32(0);
        ////console.log("帮派名字：" + this.getName() + " 等级：" + this.getLev() + " 资金：" + this.getMoney());
        var _this = this;
        this.AddListen(SharedDef.FACTION_INT_FIELD_TOKEN_NUM, function ($binlog) { _this.bossTokenNum(); });
        this.AddListen(SharedDef.FACTION_INT_FIELD_TOKEN_POINTS, function ($binlog) { _this.bossTokenPoints(); });
        this.AddListen(SharedDef.FACTION_INT_FIELD_TOKEN_POINTS_COUNT, function ($binlog) { _this.bossTokenPointscount(); });
        this.AddListen(SharedDef.FACTION_INT_FIELD_TOKEN_TODAY_BUY_COUNT, function ($binlog) { _this.bossTokentodaybuycount(); });
        this.AddListen(SharedDef.FACTION_INT_FIELD_CHALLENGE_BOSS_ID_MAX, function ($binlog) { _this.bosschallengeidMax(); });
        this.AddListen(SharedDef.FACTION_INT_FIELD_CHALLENGE_BOSS_ID, function ($binlog) { _this.bosschallengeidCur(); });
        this.AddListen(SharedDef.FACTION_INT_FIELD_BUILDING_LVUP_ID, function ($binlog) { _this.buildCur(); });
        this.AddListen(SharedDef.FACTION_INT_FIELD_BUILDING_LVUP_FINISH_TIME, function ($binlog) { _this.buildEnd(); });
        this.AddListen(SharedDef.FACTION_INT_FIELD_TOWER_TODAY_TOP_FLOOR, function ($binlog) { _this.tripFloorChg(); });
        var list = this.getFactionList();
        var appList = this.getApplyList();
        var evtList = this.getEventList();
        var shopList = this.getShopList();
        /**
        //console.log("--家族列表-----------")
        this.traceList(list);
        //console.log("--家族申请列表-----------")
        this.traceList(appList);
        //console.log("--家族事件列表-----------")
        this.traceEvtList(evtList);
        //console.log("--家族商店列表-----------")
        this.traceShopList(shopList);
        */
        this._after_update = function ($flag, $intMask, $strMask) { _this.dataUpdate($intMask, $strMask); };
        ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.JOINFACTIONITEM_EVENT));
    };
    FactionData.prototype.getFactionStorehouse = function () {
        var $arr = new Array();
        for (var i = SharedDef.FACTION_STRING_FIELD_STOREHOUSE_START; i < SharedDef.FACTION_STRING_FIELD_STOREHOUSE_END; i++) {
            var itemStr = this.GetStr(i);
            if (itemStr.length) {
                var bgItem = BagData.paserItemData(itemStr);
                bgItem.pos = i - SharedDef.FACTION_STRING_FIELD_STOREHOUSE_START;
                $arr.push(bgItem);
            }
            else {
                //$arr.push(null)
            }
        }
        return $arr;
    };
    FactionData.prototype.getFactionStorehouseLog1111 = function () {
        var $arr = new Array();
        for (var i = SharedDef.FACTION_STRING_FIELD_STOREHOUSE_RECORD_START; i < SharedDef.FACTION_STRING_FIELD_STOREHOUSE_RECORD_END; i++) {
            var itemStr = this.GetStr(i);
            if (itemStr.length) {
                //console.log(itemStr)
                $arr.push(itemStr);
            }
        }
        return $arr;
    };
    FactionData.prototype.getFactionStorehouseLog = function () {
        var ret = new Array;
        var cursor = this.GetUInt32(SharedDef.FACTION_INT_FIELD_STOREHOUSE_RECORD_CURSOR);
        var last = (cursor - 1) % SharedDef.MAX_FACTION_STOREHOUSE_RECORD_COUNT;
        var start = cursor % SharedDef.MAX_FACTION_STOREHOUSE_RECORD_COUNT;
        if (last < start) {
            last += SharedDef.MAX_FACTION_STOREHOUSE_RECORD_COUNT;
        }
        for (var i = start; i <= last; ++i) {
            var indx = i % SharedDef.MAX_FACTION_STOREHOUSE_RECORD_COUNT;
            var str = this.GetStr(SharedDef.FACTION_STRING_FIELD_STOREHOUSE_RECORD_START + indx);
            if (str && str.length) {
                ret.push(str);
            }
        }
        return ret;
    };
    FactionData.prototype.dispose = function () {
        GuidData.faction = null;
        ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.FACTION_QUIT_EVENT));
        _super.prototype.dispose.call(this);
    };
    FactionData.prototype.traceList = function (list) {
        var zhiwei = ["族长", "副族长", "长老", "精英", "群众"];
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            console.log("成员：" + item.name + " idx:" + item.index + " 职位：" + zhiwei[item.identity - 1]
                + " 历史贡献：" + item.contribution + " 最后登录时间：" + item.logoutTime + (item.isOnline ? "在线" : "离线"));
        }
        //console.log("-------------------------")
    };
    FactionData.prototype.traceEvtList = function (list) {
        var zhiwei = ["族长", "副族长", "长老", "精英", "群众"];
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            //console.log(item.name + " 捐献方式:" + item.type + " 捐献数量：" + item.value)
        }
        //console.log("-------------------------")
    };
    FactionData.prototype.traceShopList = function (list) {
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            //console.log("商品id：" + item.id + " 数量:" + item.num)
        }
        //console.log("-------------------------")
    };
    FactionData.prototype.dataUpdate = function ($intMask, $strMask) {
        ////console.log("家族数据更新");
        var baseChg = new Array;
        var applyChg = new Array;
        var evtChg = new Array;
        var shopChg = new Array;
        var bagChg = new Array;
        var logChg = new Array;
        for (var k in $intMask) {
            var kNum = Number(k);
            if (kNum >= SharedDef.FACTION_INT_FIELD_PLAYER && kNum < SharedDef.FACTION_INT_FIELD_PLAYER_END) {
                var idx = kNum - ((kNum - SharedDef.FACTION_INT_FIELD_PLAYER) % SharedDef.MAX_FACTION_INT_MEMBER);
                //成员列表变化
                this.pushList(baseChg, idx);
            }
            else if (kNum >= SharedDef.FACTION_INT_FIELD_APPLY_PLAYER && kNum < SharedDef.FACTION_INT_FIELD_APPLY_PLAYER_END) {
                var idx = kNum - ((kNum - SharedDef.FACTION_INT_FIELD_APPLY_PLAYER) % SharedDef.MAX_FACTION_INT_MEMBER);
                //申请列表变化
                this.pushList(applyChg, idx);
            }
            else if (kNum >= SharedDef.FACTION_INT_FIELD_EVENT && kNum < SharedDef.FACTION_INT_FIELD_EVENT_END) {
                var idx = float2int((kNum - SharedDef.FACTION_INT_FIELD_EVENT) / SharedDef.MAX_FACTION_INT_EVENT);
                this.pushList(evtChg, idx);
            }
            else if (kNum >= SharedDef.FACTION_INT_FIELD_SHOP && kNum < SharedDef.FACTION_INT_FIELD_SHOP_END) {
                shopChg.push(kNum);
            }
            else if (kNum == SharedDef.FACTION_INT_FIELD_MONEY) {
                //帮派资金变化
                // //console.log("帮派资金：" + this.getMoney())
                ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.REFRESHFACTIONMONEY_EVENT));
            }
            else if (kNum == SharedDef.FACTION_INT_FIELD_LEVEL) {
                //帮派等级变化
                ////console.log("帮派等级：" + this.getLev())
                ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.REFRESHFACTIONLEV_EVENT));
            }
            else if (kNum >= SharedDef.FACTION_INT_FIELD_GIFT_WEEK_POINT_START && kNum < SharedDef.FACTION_INT_FIELD_GIFT_WEEK_POINT_END) {
                // 礼物周榜魅力值计数监听
                // ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.WEEK_RANK_CHANGE_EVENT));
            }
            else if (kNum >= SharedDef.FACTION_INT_FIELD_BOSSDENFENSE_START && kNum < SharedDef.FACTION_INT_FIELD_BOSSDENFENSE_END) {
                this.leadChange();
            }
            else if (kNum >= SharedDef.FACTION_INT_FIELD_BUILDING_ID_START && kNum < SharedDef.FACTION_INT_FIELD_BUILDING_ID_END) {
                this.buildChange();
            }
        }
        for (var k in $strMask) {
            var kNum = Number(k);
            if (kNum == SharedDef.FACTION_STRING_FIELD_GONGGAO) {
                //帮派公告变化
                var str = this.getNotice();
                var ary = str.split("\1");
                ////console.log("公告：" + ary[0] + " QQ:" + ary[1] + " 微信:" + ary[2]);
                ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.REFRESHFACTIONGG_EVENT));
            }
            else if (kNum >= SharedDef.FACTION_STRING_FIELD_PLAYER && kNum < SharedDef.FACTION_STRING_FIELD_PLAYER_END) {
                var idx = float2int((kNum - SharedDef.FACTION_STRING_FIELD_PLAYER) / SharedDef.MAX_FACTION_STRING_MEMBER)
                    * SharedDef.MAX_FACTION_INT_MEMBER + SharedDef.FACTION_INT_FIELD_PLAYER;
                //成员列表变化
                this.pushList(baseChg, idx);
            }
            else if (kNum >= SharedDef.FACTION_STRING_FIELD_APPLY_PLAYER && kNum < SharedDef.FACTION_STRING_FIELD_APPLY_PLAYER_END) {
                var idx = float2int((kNum - SharedDef.FACTION_STRING_FIELD_APPLY_PLAYER) / SharedDef.MAX_FACTION_STRING_MEMBER)
                    * SharedDef.MAX_FACTION_INT_MEMBER + SharedDef.FACTION_INT_FIELD_APPLY_PLAYER;
                this.pushList(applyChg, idx);
            }
            else if (kNum >= SharedDef.FACTION_STRING_FIELD_STOREHOUSE_START && kNum < SharedDef.FACTION_STRING_FIELD_STOREHOUSE_END) {
                bagChg.push(kNum);
            }
            else if (kNum >= SharedDef.FACTION_STRING_FIELD_STOREHOUSE_RECORD_START && kNum < SharedDef.FACTION_STRING_FIELD_STOREHOUSE_RECORD_END) {
                logChg.push(kNum);
            }
        }
        if (bagChg.length) {
            //console.log("仓库发生变化")
            ModuleEventManager.dispatchEvent(new warehousetreasure.WarehouseEvent(warehousetreasure.WarehouseEvent.WAREHOUSE_BAG_REFRESH));
        }
        if (logChg.length) {
            //console.log("记录发生变化")
            ModuleEventManager.dispatchEvent(new warehousetreasure.WarehouseEvent(warehousetreasure.WarehouseEvent.WAREHOUSE_LOG_REFRESH));
        }
        if (baseChg.length) {
            this.factionListChg(baseChg);
            ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.REFRESHFACTIONITEM_EVENT));
        }
        if (applyChg.length) {
            this.applyListChg(applyChg);
            ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.REFRESHFACTIONITEMAPPLY_EVENT));
        }
        if (evtChg.length) {
            this.evtListChg(evtChg);
            //   ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.REFRESHFACTIONITEMEVENT_EVENT));
            ModuleEventManager.dispatchEvent(new warehousetreasure.WarehouseEvent(warehousetreasure.WarehouseEvent.TREASURE_LOG_REFRESH));
        }
        if (shopChg.length) {
            this.shopChg(shopChg);
            ModuleEventManager.dispatchEvent(new store.StoreEvent(store.StoreEvent.STORE_NUM_EVENT));
        }
        var list = this.getFactionList();
        var appList = this.getApplyList();
        var evtList = this.getEventList();
        var shopList = this.getShopList();
        /**
        //console.log("--家族列表-----------")

        this.traceList(list);
        //console.log("--家族申请列表-----------")
        this.traceList(appList);
        //console.log("--家族事件列表-----------")
        this.traceEvtList(evtList);
        //console.log("--家族商店列表-----------")
        this.traceShopList(shopList);
         */
    };
    FactionData.prototype.pushList = function (list, idx) {
        if (list.indexOf(idx) == -1) {
            list.push(idx);
        }
    };
    FactionData.prototype.factionListChg = function (list) {
        for (var i = 0; i < list.length; i++) {
            for (var j = this._factionList.length - 1; j >= 0; j--) {
                if (this._factionList[j].index == list[i]) {
                    var data = this.getData(list[i], this.baseIdxint2str(list[i]));
                    if (data) {
                        this._factionList[j] = data;
                    }
                    else {
                        this._factionList.splice(j, 1);
                    }
                    break;
                }
            }
            if (j == -1) {
                var data = this.getData(list[i], this.baseIdxint2str(list[i]));
                if (data) {
                    this._factionList.push(data);
                }
            }
        }
    };
    FactionData.prototype.applyListChg = function (list) {
        for (var i = 0; i < list.length; i++) {
            for (var j = this._applyList.length - 1; j >= 0; j--) {
                if (this._applyList[j].index == list[i]) {
                    var data = this.getData(list[i], this.applyIdxint2str(list[i]));
                    if (data) {
                        this._applyList[j] = data;
                    }
                    else {
                        this._applyList.splice(j, 1);
                    }
                    break;
                }
            }
            if (j == -1) {
                var data = this.getData(list[i], this.applyIdxint2str(list[i]));
                if (data) {
                    this._applyList.push(data);
                }
            }
        }
    };
    FactionData.prototype.evtListChg = function (list) {
        for (var i = 0; i < list.length; i++) {
            var pos = list[i];
            var evtData = this.getEventData(pos);
            if (evtData) {
                this._eventList[pos] = evtData;
            }
        }
    };
    FactionData.prototype.shopChg = function (list) {
        for (var i = 0; i < list.length; i++) {
            var pos = list[i];
            var idx = list[i] - SharedDef.FACTION_INT_FIELD_SHOP;
            var dat = this.getShopData(pos);
            if (dat) {
                this._shopList[idx] = dat;
            }
            else if (this._shopList[idx]) {
                this._shopList.splice(idx, 1);
            }
        }
    };
    /**帮派等级 */
    FactionData.prototype.getLev = function () {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_LEVEL);
    };
    /**帮派资金 */
    FactionData.prototype.getMoney = function () {
        return this.GetDouble(SharedDef.FACTION_INT_FIELD_MONEY);
    };
    FactionData.prototype.getNotice = function () {
        return this.GetStr(SharedDef.FACTION_STRING_FIELD_GONGGAO);
    };
    /**家族Icon */
    FactionData.prototype.getIcon = function () {
        return this.GetByte(SharedDef.FACTION_INT_FIELD_FLAGS_ID, 0);
    };
    /**同意自动加入帮派 */
    FactionData.prototype.getAutoJoin = function () {
        return this.GetBit(SharedDef.FACTION_INT_FIELD_FLAG, SharedDef.FACTION_FLAGS_AUTO);
    };
    /**加入帮派最小等级 */
    FactionData.prototype.getJoinLimtLev = function () {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_MINLEV);
    };
    /**招募公告 */
    FactionData.prototype.getZhaomuGG = function () {
        return this.GetStr(SharedDef.FACTION_STRING_FIELD_ZHAOMU_GONGGAO);
    };
    /**帮主名字 */
    FactionData.prototype.getManagerName = function () {
        return this.GetStr(SharedDef.FACTION_STRING_FIELD_MANGER_NAME);
    };
    /**帮主Guid */
    FactionData.prototype.getManagerGuid = function () {
        return this.GetStr(SharedDef.FACTION_STRING_FIELD_MANGER_GUID);
    };
    /**帮派活跃度 */
    FactionData.prototype.getActive = function () {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_ACTIVITY);
    };
    /**帮派总战力 */
    FactionData.prototype.getFactionForce = function () {
        return this.GetDouble(SharedDef.FACTION_INT_FIELD_TOTAL_FORCE);
    };
    FactionData.prototype.getFactionList = function () {
        if (this._factionList) {
            return this._factionList;
        }
        else {
            this._factionList = new Array;
        }
        for (var i = SharedDef.FACTION_INT_FIELD_PLAYER; i < SharedDef.FACTION_INT_FIELD_PLAYER_END; i += SharedDef.MAX_FACTION_INT_MEMBER) {
            var strIdx = this.baseIdxint2str(i);
            var data = this.getData(i, strIdx);
            if (data) {
                this._factionList.push(data);
            }
        }
        return this._factionList;
    };
    /**
     * 职位排序
     * $flag:true 升序
     * $flag:false 降序
     */
    FactionData.prototype.getFactionListSortDuty = function ($flag) {
        var $ary = this.getFactionList();
        $ary.sort(function (a, b) {
            if ($flag) {
                return b.identity - a.identity;
            }
            return a.identity - b.identity;
        });
        return $ary;
    };
    /**
     * 活跃度排序
     * $flag:true 升序
     * $flag:false 降序
     */
    FactionData.prototype.getFactionListSortActive = function ($flag) {
        var $ary = this.getFactionList();
        $ary.sort(function (a, b) {
            if ($flag) {
                return b.active - a.active;
            }
            return a.active - b.active;
        });
        return $ary;
    };
    /**
     * 贡献度排序
     * $flag:true 升序
     * $flag:false 降序
     */
    FactionData.prototype.getFactionListSortContribution = function ($flag) {
        var $ary = this.getFactionList();
        $ary.sort(function (a, b) {
            if ($flag) {
                return a.contribution - b.contribution;
            }
            return b.contribution - a.contribution;
        });
        return $ary;
    };
    /**
     * 战斗力排序
     * $flag:true 升序
     * $flag:false 降序
     */
    FactionData.prototype.getFactionListSortForce = function ($flag) {
        var $ary = this.getFactionList();
        $ary.sort(function (a, b) {
            if ($flag) {
                return a.force - b.force;
            }
            return b.force - a.force;
        });
        return $ary;
    };
    /**
     * 等级排序
     * $flag:true 升序
     * $flag:false 降序
     */
    FactionData.prototype.getFactionListSortLevel = function ($flag) {
        var $ary = this.getFactionList();
        $ary.sort(function (a, b) {
            if ($flag) {
                return a.level - b.level;
            }
            return b.level - a.level;
        });
        return $ary;
    };
    FactionData.prototype.getFactionListBySortType = function ($type, $flag) {
        var $ary;
        switch ($type) {
            case 0:
                $ary = this.getFactionListSortDuty($flag);
                break;
            case 1:
                $ary = this.getFactionListSortLevel($flag);
                break;
            case 2:
                $ary = this.getFactionListSortForce($flag);
                break;
            case 3:
                $ary = this.getFactionListSortContribution($flag);
                break;
            case 4:
                $ary = this.getFactionListSortActive($flag);
                break;
            default:
                break;
        }
        return $ary;
    };
    FactionData.prototype.baseIdxint2str = function (i) {
        return ((i - SharedDef.FACTION_INT_FIELD_PLAYER) / SharedDef.MAX_FACTION_INT_MEMBER) * SharedDef.MAX_FACTION_STRING_MEMBER + SharedDef.FACTION_STRING_FIELD_PLAYER;
    };
    FactionData.prototype.applyIdxint2str = function (i) {
        return ((i - SharedDef.FACTION_INT_FIELD_APPLY_PLAYER) / SharedDef.MAX_FACTION_INT_MEMBER) * SharedDef.MAX_FACTION_STRING_MEMBER + SharedDef.FACTION_STRING_FIELD_APPLY_PLAYER;
    };
    FactionData.prototype.getApplyList = function () {
        if (this._applyList) {
            return this._applyList;
        }
        else {
            this._applyList = new Array;
        }
        for (var i = SharedDef.FACTION_INT_FIELD_APPLY_PLAYER; i < SharedDef.FACTION_INT_FIELD_APPLY_PLAYER_END; i += SharedDef.MAX_FACTION_INT_MEMBER) {
            var strIdx = this.applyIdxint2str(i);
            var data = this.getData(i, strIdx);
            if (data) {
                this._applyList.push(data);
            }
        }
        return this._applyList;
    };
    FactionData.prototype.getEventList = function () {
        if (this._eventList) {
            return this._eventList;
        }
        else {
            this._eventList = new Array;
        }
        for (var i = SharedDef.FACTION_INT_FIELD_EVENT; i < SharedDef.FACTION_INT_FIELD_EVENT_END; i += SharedDef.MAX_FACTION_INT_EVENT) {
            var pos = float2int((i - SharedDef.FACTION_INT_FIELD_EVENT) / SharedDef.MAX_FACTION_INT_EVENT);
            var evtdata = this.getEventData(pos);
            if (evtdata) {
                this._eventList.push(evtdata);
            }
        }
        return this._eventList;
    };
    FactionData.prototype.getEventFlag = function () {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_EVENT_FALG);
    };
    FactionData.prototype.getShopList = function () {
        if (this._shopList) {
            return this._shopList;
        }
        else {
            this._shopList = new Array;
        }
        for (var i = SharedDef.FACTION_INT_FIELD_SHOP; i < SharedDef.FACTION_INT_FIELD_SHOP_END; i++) {
            var dat = this.getShopData(i);
            if (dat) {
                this._shopList.push(dat);
            }
        }
        return this._shopList;
    };
    FactionData.prototype.getShopData = function (idx) {
        var id = this.GetUInt16(idx, 0);
        if (id == 0) {
            return null;
        }
        var data = new FactionShopData;
        data.id = id;
        data.num = this.GetUInt16(idx, 1);
        return data;
    };
    FactionData.prototype.getEventData = function (pos) {
        var strIdx = SharedDef.FACTION_STRING_FIELD_EVENT + pos;
        var name = this.GetStr(strIdx);
        if (!name || name == "") {
            return null;
        }
        var evtData = new FactionEventData;
        evtData.name = name;
        var intIdx = SharedDef.FACTION_INT_FIELD_EVENT + pos * SharedDef.MAX_FACTION_INT_EVENT;
        evtData.type = this.GetUInt16(intIdx, 0);
        evtData.value = this.GetUInt16(intIdx, 1);
        return evtData;
    };
    Object.defineProperty(FactionData.prototype, "playerIdentity", {
        get: function () {
            return this._playerIdentity;
        },
        set: function (val) {
            this._playerIdentity = val;
            ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.REFRESHFACTIONIDENTITY_EVENT));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FactionData.prototype, "goldDonation", {
        get: function () {
            return this._goldDonation;
        },
        set: function (val) {
            this._goldDonation = val;
            ModuleEventManager.dispatchEvent(new warehousetreasure.WarehouseEvent(warehousetreasure.WarehouseEvent.TREASURE_NUM_REFRESH));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FactionData.prototype, "ybDonation", {
        get: function () {
            return this._ybDonation;
        },
        set: function (val) {
            this._ybDonation = val;
            ModuleEventManager.dispatchEvent(new warehousetreasure.WarehouseEvent(warehousetreasure.WarehouseEvent.TREASURE_NUM_REFRESH));
        },
        enumerable: true,
        configurable: true
    });
    FactionData.prototype.getData = function (intIdx, strIdx) {
        var guid = this.GetStr(strIdx + SharedDef.FACTION_STRING_MEMBER_GUID);
        if (!guid || guid == "") {
            return null;
        }
        var data = new FactionItemData();
        data.force = this.GetDouble(intIdx + SharedDef.FACTION_INT_MEMBER_FORCE);
        data.level = this.GetUInt16(intIdx + SharedDef.FACTION_INT_MEMBER_UINT16, 0);
        data.isOnline = this.GetByte(intIdx + SharedDef.FACTION_INT_MEMBER_BYTE, 0) == 1 ? true : false;
        data.identity = this.GetByte(intIdx + SharedDef.FACTION_INT_MEMBER_BYTE, 1);
        data.vipLev = this.GetByte(intIdx + SharedDef.FACTION_INT_MEMBER_BYTE, 2);
        data.logoutTime = this.GetUInt32(intIdx + SharedDef.FACTION_INT_MEMBER_LOGOUT_TIME);
        data.active = this.GetUInt32(intIdx + SharedDef.FACTION_INT_MEMBER_FLAGS);
        data.contribution = this.GetUInt32(intIdx + SharedDef.FACTION_INT_MEMBER_TOTAL_CONTRIBUTION);
        data.guid = guid;
        data.gender = this.GetUInt32(intIdx + SharedDef.FACTION_INT_MEMBER_GENDER);
        if (guid == GuidData.player.guid) {
            this.playerIdentity = data.identity;
            this.goldDonation = this.GetUInt16(intIdx + SharedDef.FACTION_INT_MEMBER_DONATE, 0);
            this.ybDonation = this.GetUInt16(intIdx + SharedDef.FACTION_INT_MEMBER_DONATE, 1);
        }
        data.name = this.GetStr(strIdx + SharedDef.FACTION_STRING_MEMBER_NAME);
        data.index = intIdx;
        return data;
    };
    /**
     * 令牌数量变化
     */
    FactionData.prototype.bossTokenNum = function () {
        //console.log("--令牌数目变化--");
        ModuleEventManager.dispatchEvent(new faction.FactionBossEvent(faction.FactionBossEvent.CHANGE_BOSS_CURRENTNUM));
        ModuleEventManager.dispatchEvent(new faction.FactionBossEvent(faction.FactionBossEvent.BOSS_NEED_REDPOINT));
    };
    FactionData.prototype.getBossTokenNum = function () {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_TOKEN_NUM);
    };
    /**
     * 令牌今日积分进度
     */
    FactionData.prototype.bossTokenPoints = function () {
        //console.log("--令牌今日积分进度--");
        ModuleEventManager.dispatchEvent(new faction.FactionBossEvent(faction.FactionBossEvent.CHANGE_BOSS_INTEGRAL));
    };
    FactionData.prototype.getBossTokenPoints = function () {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_TOKEN_POINTS);
    };
    /**
     * 令牌今日积分完成次数
     */
    FactionData.prototype.bossTokenPointscount = function () {
        //console.log("--令牌今日积分完成次数--");
        ModuleEventManager.dispatchEvent(new faction.FactionBossEvent(faction.FactionBossEvent.CHANGE_BOSS_RESIDUE));
    };
    FactionData.prototype.getBossTokenPointscount = function () {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_TOKEN_POINTS_COUNT);
    };
    /**
     * 今日令牌购买次数
     */
    FactionData.prototype.bossTokentodaybuycount = function () {
        //console.log("--今日令牌购买次数--");
        // ModuleEventManager.dispatchEvent(new faction.FactionBossEvent(faction.FactionBossEvent.CHANGE_BOSS_CURRENTNUM));
    };
    FactionData.prototype.getBossTokentodaybuycount = function () {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_TOKEN_TODAY_BUY_COUNT);
    };
    /**
     * 已挑战最大boss id
     */
    FactionData.prototype.bosschallengeidMax = function () {
        //console.log("--已挑战最大boss id--");
        // ModuleEventManager.dispatchEvent(new faction.FactionBossEvent(faction.FactionBossEvent.CHANGE_BOSS_CURRENTNUM));
    };
    FactionData.prototype.getBosschallengeidMax = function () {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_CHALLENGE_BOSS_ID_MAX);
    };
    /**
     * 当前挑战boss id
     */
    FactionData.prototype.bosschallengeidCur = function () {
        //console.log("--当前挑战boss id--");
        ModuleEventManager.dispatchEvent(new faction.FactionBossEvent(faction.FactionBossEvent.CHANGE_BOSS_CURRENTID));
    };
    FactionData.prototype.getBosschallengeidCur = function () {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_CHALLENGE_BOSS_ID);
    };
    /**
     * boss开始时间（包括等待时间）
     */
    FactionData.prototype.getBosschallengeStartTime = function () {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_CHALLENGE_BOSS_START_TIME);
    };
    /**
     * 排行榜
     */
    FactionData.prototype.getRankList = function () {
        var ary = new Array;
        for (var i = 0; i < SharedDef.MAX_FACTION_MAMBER_COUNT; i++) {
            var str = this.GetStr(SharedDef.FACTION_STRING_FIELD_CHALLENGE_BOSS_DAMAGE_RANK_START + i);
            if (str.length > 0) {
                var vo = new FactionBossRankData();
                vo.guid = str;
                vo.output = this.GetUInt32(SharedDef.FACTION_INT_FIELD_CHALLENGE_BOSS_DAMAGE_RANK_START + i);
                ary.push(vo);
            }
        }
        ary.sort(function (a, b) {
            return b.output - a.output;
        });
        return ary;
    };
    /**
     * 当前正在升级的建筑id
     */
    FactionData.prototype.buildCur = function () {
        //console.log("--当前正在升级的建筑id--");
        ModuleEventManager.dispatchEvent(new faction.FactionBuildEvent(faction.FactionBuildEvent.BUILD_STATE));
    };
    FactionData.prototype.getBuildCur = function () {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_BUILDING_LVUP_ID);
    };
    FactionData.prototype.buildEnd = function () {
        //console.log("--完成时间--");
        ModuleEventManager.dispatchEvent(new faction.FactionBuildEvent(faction.FactionBuildEvent.BUILD_ENDTIME));
    };
    /**
     * 当前升级建筑完成时间戳
     */
    FactionData.prototype.getBuildEndTime = function () {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_BUILDING_LVUP_FINISH_TIME);
    };
    /**
      * 已有建筑id开始
      */
    FactionData.prototype.getHaveBuild = function () {
        var ary = new Array;
        for (var i = SharedDef.FACTION_INT_FIELD_BUILDING_ID_START; i < SharedDef.FACTION_INT_FIELD_BUILDING_ID_END; i++) {
            ary.push(this.GetUInt32(i));
        }
        return ary;
    };
    FactionData.prototype.buildChange = function () {
        ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.FUNBUILD_CHG_EVENT));
    };
    /**
     * getWeekRankGiftList
     */
    FactionData.prototype.getWeekRankGiftList = function () {
        var $data = new Array;
        for (var i = SharedDef.FACTION_STRING_FIELD_GIFT_PLAYER_GUID_START; i < SharedDef.FACTION_STRING_FIELD_GIFT_PLAYER_GUID_END; i++) {
            var pointid = SharedDef.FACTION_INT_FIELD_GIFT_WEEK_POINT_START + (i - SharedDef.FACTION_STRING_FIELD_GIFT_PLAYER_GUID_START);
            var point = this.GetUInt32(pointid);
            var guid = this.GetStr(i);
            if (point != 0 && guid && guid.length > 0) {
                var vo = this.getInfomation(guid);
                vo.point = point;
                $data.push(vo);
            }
        }
        $data.sort(function (a, b) {
            return b.point - a.point;
        });
        return $data;
    };
    //通过guid找到对应的用户数据
    FactionData.prototype.getInfomation = function ($guid) {
        var ary = this.getFactionList();
        for (var i = 0; i < ary.length; i++) {
            if (ary[i].guid == $guid) {
                return ary[i];
            }
        }
        return null;
    };
    /**
     * 礼物未处理信息
     */
    FactionData.prototype.Giftflag = function () {
        //console.log("--当前正在升级的建筑id--");
        ModuleEventManager.dispatchEvent(new faction.FactionBuildEvent(faction.FactionBuildEvent.BUILD_STATE));
    };
    FactionData.prototype.getGiftflag = function () {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_BUILDING_LVUP_ID);
    };
    FactionData.prototype.getLeaderData = function () {
        if (this._listAry) {
            return this._listAry;
        }
        this._listAry = new Array();
        var flag = 0;
        for (var i = SharedDef.FACTION_INT_FIELD_BOSSDENFENSE_START; i < SharedDef.FACTION_INT_FIELD_BOSSDENFENSE_END; i += SharedDef.MAX_FACTION_BOSSDEFENSE) {
            var leadData = new FactionLeadData();
            leadData.idx = flag;
            leadData.id = this.GetUInt32(i + SharedDef.FACTION_INT_BOSSDEFENSE_POOL_ID);
            leadData.hp = this.GetUInt32(i + SharedDef.FACTION_INT_BOSSDEFENSE_HP);
            leadData.maxHp = this.GetUInt32(i + SharedDef.FACTION_INT_BOSSDEFENSE_MAX_HP);
            leadData.state = this.GetUInt32(i + SharedDef.FACTION_INT_BOSSDEFENSE_STATUS);
            leadData.pool = TableData.getInstance().getData(TableData.tb_faction_bossdefense_pool, leadData.id);
            leadData.boos = tb.TB_creature_template.get_TB_creature_template(leadData.pool.entry);
            this._listAry.push(leadData);
            flag++;
        }
        return this._listAry;
    };
    FactionData.prototype.leadChange = function () {
        if (!this._listAry) {
            return;
        }
        var flag = 0;
        for (var i = SharedDef.FACTION_INT_FIELD_BOSSDENFENSE_START; i < SharedDef.FACTION_INT_FIELD_BOSSDENFENSE_END; i += SharedDef.MAX_FACTION_BOSSDEFENSE) {
            var leadData = this._listAry[flag];
            var newID = this.GetUInt32(i + SharedDef.FACTION_INT_BOSSDEFENSE_POOL_ID);
            if (newID != leadData.id) {
                leadData.id = newID;
                leadData.pool = TableData.getInstance().getData(TableData.tb_faction_bossdefense_pool, leadData.id);
                leadData.boos = tb.TB_creature_template.get_TB_creature_template(leadData.pool.entry);
            }
            leadData.id = this.GetUInt32(i + SharedDef.FACTION_INT_BOSSDEFENSE_POOL_ID);
            leadData.hp = this.GetUInt32(i + SharedDef.FACTION_INT_BOSSDEFENSE_HP);
            leadData.maxHp = this.GetUInt32(i + SharedDef.FACTION_INT_BOSSDEFENSE_MAX_HP);
            leadData.state = this.GetUInt32(i + SharedDef.FACTION_INT_BOSSDEFENSE_STATUS);
            flag++;
        }
        ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.SHOW_FACTIONACTIVE_LEAD_CHANGE_EVENT));
    };
    /**无尽的远程关卡通关人数 */
    FactionData.prototype.getTripNum = function (tripLev) {
        var num = 0;
        for (var i = SharedDef.FACTION_INT_FIELD_PLAYER; i < SharedDef.FACTION_INT_FIELD_PLAYER_END; i += SharedDef.MAX_FACTION_INT_MEMBER) {
            var lev = this.GetUInt32(i + SharedDef.FACTION_INT_MEMBER_TOWER_TODAY_FLOOR);
            if (lev >= tripLev) {
                num++;
            }
        }
        return num;
    };
    /**
     * 最高通关信息
     */
    FactionData.prototype.getMaxTripRole = function () {
        var obj = new Object();
        obj.name = this.GetStr(SharedDef.FACTION_STRING_FIELD_TOWER_TODAY_TOP_NAME);
        obj.icon = this.GetUInt32(SharedDef.FACTION_INT_FIELD_TOWER_TODAY_TOP_ICON);
        obj.floor = this.GetUInt32(SharedDef.FACTION_INT_FIELD_TOWER_TODAY_TOP_FLOOR);
        obj.force = this.GetDouble(SharedDef.FACTION_INT_FIELD_TOWER_TODAY_TOP_FORCE);
        return obj;
    };
    FactionData.prototype.tripFloorChg = function () {
        ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.SHOW_FACTIONACTIVE_TRIP_CHANGE_EVENT));
    };
    return FactionData;
}(GuidObject));
var FactionItemData = /** @class */ (function () {
    function FactionItemData() {
        this.force = 0; //成员战斗力
        this.level = 0; //0.成员等级
        this.isOnline = false; //是否在线
        this.identity = 0; //身份
        this.logoutTime = 0; //最后离线时间
        this.vipLev = 0; //VIP
        this.active = 0; //活跃度
        this.contribution = 0; //历史贡献
    }
    return FactionItemData;
}());
var FactionEventData = /** @class */ (function () {
    function FactionEventData() {
    }
    return FactionEventData;
}());
var FactionShopData = /** @class */ (function () {
    function FactionShopData() {
    }
    return FactionShopData;
}());
var FactionBossRankData = /** @class */ (function () {
    function FactionBossRankData() {
    }
    return FactionBossRankData;
}());
var FactionLeadData = /** @class */ (function () {
    function FactionLeadData() {
    }
    return FactionLeadData;
}());
//# sourceMappingURL=FactionData.js.map