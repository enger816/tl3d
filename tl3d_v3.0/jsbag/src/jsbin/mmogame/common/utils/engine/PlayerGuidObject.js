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
var SystemOpenData = /** @class */ (function () {
    function SystemOpenData() {
    }
    return SystemOpenData;
}());
var factionShopNumData = /** @class */ (function () {
    function factionShopNumData() {
    }
    return factionShopNumData;
}());
// "id": id, "lev": lev, "slot": slot
var SkillUintVo = /** @class */ (function () {
    function SkillUintVo() {
    }
    return SkillUintVo;
}());
var PlayerGuidObject = /** @class */ (function (_super) {
    __extends(PlayerGuidObject, _super);
    function PlayerGuidObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nextCanJumpTM = 0; //下次可跳的时间
        _this.lastLevel = 1;
        return _this;
    }
    PlayerGuidObject.prototype.testping_pong = function () {
        TimeUtil.addTimeTick(5000, function () { NetManager.getInstance().protocolos.ping_pong(); });
    };
    PlayerGuidObject.prototype.onBaseCreated = function () {
        var _this = this;
        GuidData.player = this;
        //this.initPreSkill();
        this.loginTime();
        this.initData();
        this.testping_pong();
        this.AddListen(SharedDef.PLAYER_EXPAND_INT_TO_MAP, function ($binlog) { _this.teleMap(); });
        this.AddListen(SharedDef.PLAYER_FIELD_LEVEL, function ($binlog) { _this.playerFieldLevelChange(); });
        this.AddListen(SharedDef.PLAYER_FIELD_FORCE, function ($binlog) { _this.playerFieldForceChange(); });
        this.AddListen(SharedDef.PLAYER_INT_FIELD_MERIDIAN_FORCE, function ($binlog) {
            ModuleEventManager.dispatchEvent(new meridian.MeridianEvent(meridian.MeridianEvent.CHG_MERIDIAL_FORCE));
            ModuleEventManager.dispatchEvent(new stronger.StrongerEvent(stronger.StrongerEvent.CHG_Stronger_EVENT));
        });
        this.AddListen(SharedDef.PLAYER_FIELD_VIP_LEVEL, function ($binlog) { _this.playerFieldVipChange(); });
        this.AddListen(SharedDef.PLAYER_INT_FIELD_RESTORE_POTION_CD, function ($binlog) { _this.playIntFieldRestorePotioncd(); });
        this.AddListen(SharedDef.PLAYER_EXPAND_INT_XP, function ($binlog) { _this.playerFieldExpandIntXpChange(); });
        this.AddListen(SharedDef.PLAYER_INT_FIELD_DIVINE_ID, function ($binlog) { _this.playerFieldDivineIdChange(); });
        this.AddListen(SharedDef.PLAYER_INT_FIELD_TRIAL_PROCESS, function ($binlog) { _this.playerIntFieldTrialProcess(); });
        this.AddListen(SharedDef.PLAYER_FIELD_EQUIPMENT + SharedDef.EQUIPMENT_TYPE_COAT, function ($binlog) { _this.chgAvatar(); });
        this.AddListen(SharedDef.PLAYER_FIELD_EQUIPMENT + SharedDef.EQUIPMENT_TYPE_MAIN_WEAPON, function ($binlog) { _this.chgWeapon(); });
        this.AddListen(SharedDef.PLAYER_FIELD_EQUIPMENT + SharedDef.EQUIPMENT_TYPE_MAIN_WEAPON, function ($binlog) { _this.chgWeapon(); });
        //复仇次数改变
        this.AddListen(SharedDef.PLAYER_INT_FIELD_REVENGE_TIMES, function ($binlog) { _this.chgRevengeNum(); });
        this.AddListen(SharedDef.PLAYER_INT_FIELD_TITLE_FORCE, function ($binlog) { _this.titleforceChg(); });
        //角色名字变化
        this.AddListenString(SharedDef.BINLOG_STRING_FIELD_NAME, function ($binlog) { _this.Chgname(); });
        //法宝总战力
        this.AddListen(SharedDef.PLAYER_INT_FIELD_TALISMAN_FORCE, function ($binlog) { _this.talismantotalzhanli(); });
        //组队副本首胜flag
        this.AddListen(SharedDef.PLAYER_INT_FIELD_GROUP_INSTANCE_CLEAR_FLAG, function ($binlog) { _this.teamflagchange(); });
        //摇钱树礼包领取状态
        this.AddListen(SharedDef.PLAYER_APPD_INT_FIELD_MONEYTREE_GIFT_FLAG, function ($binlog) { _this.moneyTreeChg(); });
        //排行榜点赞状态变化
        this.AddListen(SharedDef.PLAYER_FIELD_USE_RANK_LIKE, function ($binlog) { _this.rankLikeChg(); });
        this.AddListen(SharedDef.PLAYER_APPD_INT_FIELD_RECHARGE_SUM, function ($binlog) {
            ModuleEventManager.dispatchEvent(new charbg.CharBgEvent(charbg.CharBgEvent.VIP_CHG_EVENT));
            ModuleEventManager.dispatchEvent(new store.StoreEvent(store.StoreEvent.RECHARGE_CHG_EVENT));
        });
        this.AddListen(SharedDef.PLAYER_INT_FIELD_VIPGIFT_FLAG, function ($binlog) {
            ModuleEventManager.dispatchEvent(new charbg.CharBgEvent(charbg.CharBgEvent.VIP_GIFT_EVENT));
        });
        this.AddListen(SharedDef.PLAYER_FIELD_MOUNT_FORCE, function ($binlog) {
            ModuleEventManager.dispatchEvent(new mountui.MountUiEvent(mountui.MountUiEvent.CHG_MOUNT_FORCE));
            ModuleEventManager.dispatchEvent(new stronger.StrongerEvent(stronger.StrongerEvent.CHG_Stronger_EVENT));
        });
        this.AddListen(SharedDef.PLAYER_INT_FIELD_ADVENTURE_SKILL_FORCE, function ($binlog) {
            ModuleEventManager.dispatchEvent(new stronger.StrongerEvent(stronger.StrongerEvent.CHG_Stronger_EVENT));
        });
        this.AddListen(SharedDef.PLAYER_FIELD_EQUIPDEVELOP_FORCE, function ($binlog) {
            ModuleEventManager.dispatchEvent(new stronger.StrongerEvent(stronger.StrongerEvent.CHG_Stronger_EVENT));
        });
        this.AddListen(SharedDef.PLAYER_FILED_EQUIP_FORCE, function ($binlog) {
            ModuleEventManager.dispatchEvent(new stronger.StrongerEvent(stronger.StrongerEvent.CHG_Stronger_EVENT));
        });
        this.AddListen(SharedDef.PLAYER_INT_FIELD_WINGS_FORCE, function ($binlog) {
            ModuleEventManager.dispatchEvent(new stronger.StrongerEvent(stronger.StrongerEvent.CHG_Stronger_EVENT));
        });
        this.AddListen(SharedDef.PLAYER_INT_FIELD_REALMBREAK_FORCE, function ($binlog) {
            ModuleEventManager.dispatchEvent(new stronger.StrongerEvent(stronger.StrongerEvent.CHG_Stronger_EVENT));
        });
        this.AddListen(SharedDef.PLAYER_FIELD_SKILL_FORCE, function ($binlog) {
            ModuleEventManager.dispatchEvent(new stronger.StrongerEvent(stronger.StrongerEvent.CHG_Stronger_EVENT));
        });
        this.AddListen(SharedDef.PLAYER_INT_FIELD_GUIDE_ID_LAST, function ($binlog) {
            //console.log("上次完成的引导")
        });
        this.AddListen(SharedDef.PLAYER_INT_FIELD_APPEARANCE, function ($binlog) {
            ModuleEventManager.dispatchEvent(new exterior.ExteriorEvent(exterior.ExteriorEvent.REFRISH_EXTERIOR_PANEL));
        });
        this.AddListen(SharedDef.PLAYER_INT_FIELD_GUIDE_ID_NOW, function ($binlog) {
            //console.log("当前进行中的引导")
            _this.changePlayerIntFieldGuid();
        });
        this.AddListen(SharedDef.PLAYER_INT_FIELD_MASS_BOSS_TIMES, function ($binlog) {
            ModuleEventManager.dispatchEvent(new sboss.SbossEvent(sboss.SbossEvent.REFRISH_SBOSS_PANEL));
        });
        this.AddListen(SharedDef.PLAYER_FIELD_NOTORIETY, function ($binlog) {
            _this.changeUnitFieldNotoriety();
        });
        this.AddListen(SharedDef.PLAYER_INT_FIELD_MOUNT_LEVEL, function ($binlog) {
            _this.changeHuanhuaMountLevel();
        });
        this.AddListen(SharedDef.PLAYER_FIELD_BYTES_2, function ($binlog) {
            ModuleEventManager.dispatchEvent(new role.RoleUiEvent(role.RoleUiEvent.CHANGE_MY_Designation_EVENT));
        });
        this.AddListen(SharedDef.PLAYER_INT_FIELD_REALMBREAK_LEVEL, function ($binlog) {
            ModuleEventManager.dispatchEvent(new stateup.StateUpEvent(stateup.StateUpEvent.REFRESH_LEV_PANEL));
            ModuleEventManager.dispatchEvent(new stateup.StateUpEvent(stateup.StateUpEvent.POP_SHOW_PANEL));
        });
        this.AddListen(SharedDef.PLAYER_INT_FIELD_REALMBREAK_EXP, function ($binlog) {
            ModuleEventManager.dispatchEvent(new stateup.StateUpEvent(stateup.StateUpEvent.REFRESH_EXP_PANEL));
        });
        this.AddListen(SharedDef.PLAYER_INT_FIELD_REALMBREAK_DAILYQUEST_STATE, function ($binlog) {
            ModuleEventManager.dispatchEvent(new stateup.StateUpEvent(stateup.StateUpEvent.REFRESH_TASK_PANEL));
        });
        this.AddListen(SharedDef.PLAYER_INT_FIELD_OFFLINE_MINUTES, function ($binlog) {
            ModuleEventManager.dispatchEvent(new activity.ActivityEvent(activity.ActivityEvent.ACTIVITY_REFRESHTIME_EVENT));
        });
        this.AddListen(SharedDef.PLAYER_INT_FIELD_AUTO_GROUP_MATCH, function ($binlog) {
            ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.AUTOMATCH_TEAM_PANEL));
        });
        this.AddListen(SharedDef.PLAYER_INT_FIELD_BAG_SORT_TIME, function ($binlog) {
            ModuleEventManager.dispatchEvent(new charbg.CharBgEvent(charbg.CharBgEvent.SHOW_CHAR_BG_PANEL));
        });
        this.AddListen(SharedDef.PLAYER_INT_FIELD_SHOP_CHARGE_FLAG, function ($binlog) {
            ModuleEventManager.dispatchEvent(new store.StoreEvent(store.StoreEvent.RECHARGE_CHG_EVENT));
        });
        this.AddListen(SharedDef.PLAYER_INT_FILED_FACTION_DONATE_GIFT_EXCHANGE_DAILY_COUNT, function ($binlog) {
            ModuleEventManager.dispatchEvent(new warehousetreasure.WarehouseEvent(warehousetreasure.WarehouseEvent.TREASURE_NUM_REFRESH));
        });
        this.AddListen(SharedDef.PLAYER_INT_FIELD_FACTION_TOWER_FLAG, function ($binlog) {
            ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.SHOW_FACTIONACTIVE_TRIP_CHANGE_EVENT));
        });
        this.AddListen(SharedDef.PLAYER_INT_FIELD_RECHARGE_LOTTERY_TIMES, function ($binlog) {
            ModuleEventManager.dispatchEvent(new welfare.WelfareEvent(welfare.WelfareEvent.LOTTERY_CHG_EVENT));
        });
        this._after_update = function ($flag, $intMask, $strMask) { _this.dataUpdate($intMask, $strMask); };
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.CORE_DATA_CREATED_EVENT));
    };
    PlayerGuidObject.prototype.playIntFieldRestorePotioncd = function () {
        var $cdnum = this.GetUInt32(SharedDef.PLAYER_INT_FIELD_RESTORE_POTION_CD);
        $cdnum = $cdnum - GameInstance.getServerNow();
        $cdnum = $cdnum * 1000;
        tb.SkillData.setCdMeshData(SharedDef.PLAYER_INT_FIELD_RESTORE_POTION_CD, $cdnum);
    };
    PlayerGuidObject.prototype.getPlayerIntFieldAppearance = function (value) {
        return this.GetUInt16(SharedDef.PLAYER_INT_FIELD_APPEARANCE, value);
    };
    PlayerGuidObject.prototype.playerIntFieldTrialProcess = function () {
        ModuleEventManager.dispatchEvent(new adventureinfo.AdventurInfoEvent(adventureinfo.AdventurInfoEvent.ADVENTURE_TRIAL_PROCESS));
    };
    PlayerGuidObject.prototype.getPlayerIntFieldTrialProcessCur = function () {
        return this.GetUInt16(SharedDef.PLAYER_INT_FIELD_TRIAL_PROCESS, 0);
    };
    PlayerGuidObject.prototype.getPlayerIntFieldTrialProcessTotal = function () {
        return this.GetUInt16(SharedDef.PLAYER_INT_FIELD_TRIAL_PROCESS, 1);
    };
    PlayerGuidObject.prototype.getPlayerIntFieldTrialFinishedSectionid = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_TRIAL_FINISHED_SECTIONID);
    };
    PlayerGuidObject.prototype.getPlayerIntFieldMassBossBuyedTimes = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_MASS_BOSS_BUYED_TIMES);
    };
    PlayerGuidObject.prototype.getPlayerIntFieldMassBossTimes = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_MASS_BOSS_TIMES);
    };
    PlayerGuidObject.prototype.getPlayerIntFieldMassBossCd = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_MASS_BOSS_CD);
    };
    PlayerGuidObject.prototype.getPlayerIntFiledLevaeRiskTime = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FILED_LEAVE_RISK_TIME);
    };
    PlayerGuidObject.prototype.getPlaerExpAndIntLastLogoutTime = function () {
        return this.GetUInt32(SharedDef.PLAYER_EXPAND_INT_LAST_LOGOUT_TIME);
    };
    PlayerGuidObject.prototype.getPlayerIntFiledLeaveRiskPicked = function () {
        return 0;
    };
    PlayerGuidObject.prototype.getPlayerIntFiledFactionDonateGiftExchangeDailyCount = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FILED_FACTION_DONATE_GIFT_EXCHANGE_DAILY_COUNT);
    };
    PlayerGuidObject.prototype.changePlayerIntFieldGuid = function () {
        ModuleEventManager.dispatchEvent(new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_GUIDE_POP_VIEW));
    };
    PlayerGuidObject.prototype.getPlayerIntFieldGuidIdLast = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_GUIDE_ID_LAST);
    };
    PlayerGuidObject.prototype.getPlayerIntFieldGuideIdNow = function () {
        //console.log("PLAYER_INT_FIELD_GUIDE_ID_NOW",this.GetUInt32(SharedDef.PLAYER_INT_FIELD_GUIDE_ID_NOW))
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_GUIDE_ID_NOW);
    };
    Object.defineProperty(PlayerGuidObject.prototype, "needGuididPop", {
        get: function () {
            // console.log("当前进度",this.getPlayerIntFieldGuidIdLast() ,this.getPlayerIntFieldGuideIdNow())
            return this.getPlayerIntFieldGuidIdLast() != this.getPlayerIntFieldGuideIdNow();
        },
        enumerable: true,
        configurable: true
    });
    PlayerGuidObject.prototype.jumpButcanClik = function () {
        return GuidData.player.nextCanJumpTM < TimeUtil.getTimer();
    };
    PlayerGuidObject.prototype.initData = function () {
        this.lastForceNum = this.getForce();
        this.resetSystemItem();
        this.resetSkillItem();
        this.resetOptionalGuidItem();
        selectserver.SelectServerModel.getInstance().writeServerLog();
    };
    PlayerGuidObject.prototype.resetSkillItem = function () {
        this.skillItem = this.getBaseSkillItem();
    };
    PlayerGuidObject.prototype.getPlayerIntFieldDailyQuestFinished = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_DAILY_QUEST_FINISHED);
    };
    /**
     * 个人帮派归属情况发生变化时，派发事件
     */
    PlayerGuidObject.prototype.getFactionstate = function () {
        //console.log("帮派：" + this.getFactionName())
    };
    /**
     * 获取复仇次数
     */
    PlayerGuidObject.prototype.getSocial_revenge_num = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_REVENGE_TIMES);
    };
    /**
     * 好友数量上线值
     */
    PlayerGuidObject.prototype.getSocial_friend_max_num = function () {
        return SharedDef.SOCIAL_FRIEND_MAX_NUM;
    };
    //3v3积分
    PlayerGuidObject.prototype.get3V3Score = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_WORLD_3V3_SCORE);
    };
    //3v3场数
    PlayerGuidObject.prototype.get3V3Count = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_WORLD_3V3_TREND_INFO);
    };
    //3v3胜场
    PlayerGuidObject.prototype.get3V3Wins = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_WORLD_3V3_WINS);
    };
    PlayerGuidObject.prototype.getUnitfieldhook_num = function () {
        return this.GetUInt16(SharedDef.PLAYER_FIELD_HOOK_SHORT, 0);
    };
    PlayerGuidObject.prototype.isPlayerIntFieldGroupClearFlag = function (idx) {
        return this.GetBit(SharedDef.PLAYER_INT_FIELD_GROUP_INSTANCE_CLEAR_FLAG, idx);
    };
    PlayerGuidObject.prototype.getPlayerFieldDeclineChanel = function () {
        var $arr = new Array();
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_DECLINE_CHANNEL_BYTE0, 0));
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_DECLINE_CHANNEL_BYTE0, 1));
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_DECLINE_CHANNEL_BYTE0, 2));
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_DECLINE_CHANNEL_BYTE0, 3));
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_DECLINE_CHANNEL_BYTE1, 0));
        return $arr;
    };
    PlayerGuidObject.prototype.getUnitfieldhook_id = function () {
        return this.GetUInt16(SharedDef.PLAYER_FIELD_HOOK_SHORT, 1);
    };
    PlayerGuidObject.prototype.getHangUpResurrection = function () {
        return this.GetUInt8(SharedDef.PLAYER_FIELD_HOOK_BYTE3, 0);
    };
    PlayerGuidObject.prototype.getHangupdata = function () {
        var $arr = new Array();
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_HOOK_BYTE0, 0));
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_HOOK_BYTE0, 1));
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_HOOK_BYTE0, 2));
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_HOOK_BYTE0, 3));
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_HOOK_BYTE1, 0));
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_HOOK_BYTE1, 1));
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_HOOK_BYTE1, 2));
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_HOOK_BYTE1, 3));
        // $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_HOOK_BYTE3, 0));
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_HOOK_BYTE3, 1));
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_HOOK_BYTE3, 2));
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_HOOK_BYTE3, 3));
        return $arr;
    };
    PlayerGuidObject.prototype.changeHuanhuaMountLevel = function () {
        var aa = this.GetByte(SharedDef.PLAYER_INT_FIELD_MOUNT_LEVEL, 2);
        var bb = this.GetByte(SharedDef.PLAYER_INT_FIELD_MOUNT_LEVEL, 3);
        //console.log("========监听到幻化坐骑位置======>", aa, bb);
        ModuleEventManager.dispatchEvent(new mountui.MountUiEvent(mountui.MountUiEvent.POP_THE_UNREAL_PANEL));
    };
    PlayerGuidObject.prototype.getMountHuanhua = function () {
        var aa = this.GetByte(SharedDef.PLAYER_INT_FIELD_MOUNT_LEVEL, 2);
        var bb = this.GetByte(SharedDef.PLAYER_INT_FIELD_MOUNT_LEVEL, 3);
        //console.log("========当前幻化坐骑位置======>", aa, bb);
        return bb;
    };
    PlayerGuidObject.prototype.playerFieldExpandIntXpChange = function () {
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.PLAYER_EXPAND_INT_XP));
        // //console.log("经验改变&^^^^^^^^^^^^^^^^^^^^^^^^^")
    };
    PlayerGuidObject.prototype.playerFieldDivineIdChange = function () {
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.PLAYER_FIELD_DIVINE));
        //console.log("神兵改变&^^^^^^^^^^^^^^^^^^^^^^^^^")
        this.resetSkillItem();
    };
    PlayerGuidObject.prototype.playerFieldForceChange = function () {
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.PLAYER_FIELD_FORCE));
    };
    PlayerGuidObject.prototype.playerFieldVipChange = function () {
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.PLAYER_FIELD_VIP_LEVEL));
        ModuleEventManager.dispatchEvent(new charbg.CharBgEvent(charbg.CharBgEvent.VIP_CHG_EVENT));
        //console.log("vip等级变化")
    };
    PlayerGuidObject.prototype.changeUnitFieldNotoriety = function () {
        //  var aa: number = this.GetUInt16(SharedDef.PLAYER_FIELD_NOTORIETY, 0);
        //console.log("========战斗模式换======>");
        ModuleEventManager.dispatchEvent(new topui.TopUiEvent(topui.TopUiEvent.UNIT_FIELD_NOTORIETY));
    };
    PlayerGuidObject.prototype.getPlayerIntFieldDivineId = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_DIVINE_ID);
    };
    PlayerGuidObject.prototype.getUnitFieldNotoriety = function () {
        return this.GetUInt16(SharedDef.PLAYER_FIELD_NOTORIETY, 0);
    };
    PlayerGuidObject.prototype.getUnitFieldNotorietyValue = function () {
        return this.GetUInt16(SharedDef.PLAYER_FIELD_NOTORIETY, 1);
    };
    PlayerGuidObject.prototype.playerFieldLevelChange = function () {
        var curlev = this.getLevel();
        if (curlev != this.lastLevel) {
            this.lastLevel = curlev; //这里有问题，升级后会接收到两次变化
            ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL));
            ModuleEventManager.dispatchEvent(new adventureinfo.AdventurInfoEvent(adventureinfo.AdventurInfoEvent.ADVENTURE_TRIAL_PROCESS));
        }
    };
    //真气数量变化
    PlayerGuidObject.prototype.money_type_qi_change = function () {
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.MONEY_TYPE_QI));
        // ModuleEventManager.dispatchEvent(new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.REFRISH_RES_DATA));
    };
    //身上的银子数量变化
    PlayerGuidObject.prototype.money_type_silver_change = function () {
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.MONEY_TYPE_SILVER));
        // ModuleEventManager.dispatchEvent(new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.REFRISH_RES_DATA));
    };
    //兽灵数量有变化
    PlayerGuidObject.prototype.money_type_beast = function () {
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.MONEY_TYPE_BEAST));
        // ModuleEventManager.dispatchEvent(new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.REFRISH_RES_DATA));
    };
    //元宝数量有变化
    PlayerGuidObject.prototype.gemgoldChange = function () {
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.MONEY_TYPE_GOLD_INGOT));
        // ModuleEventManager.dispatchEvent(new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.REFRISH_RES_DATA));
    };
    //帮贡变化
    PlayerGuidObject.prototype.factionChange = function () {
        ////console.log("帮贡:" + this.getFactionBG());
        ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.REFRESHFACTIONGX_EVENT));
        // ModuleEventManager.dispatchEvent(new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.REFRISH_RES_DATA));
    };
    PlayerGuidObject.prototype.gemChange = function () {
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.MONEY_TYPE_GEM));
        // ModuleEventManager.dispatchEvent(new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.REFRISH_RES_DATA));
        ////console.log("宝石精华：" + this.getGem())
    };
    PlayerGuidObject.prototype.dataUpdate = function ($intMask, $strMask) {
        /** 技能变化回调*/
        var $skillChange = false;
        var $moneyChange = false;
        for (var k in $intMask) {
            var kNum = Number(k);
            if (kNum >= SharedDef.PLAYER_INT_FIELD_SPELL_START && kNum < SharedDef.PLAYER_INT_FIELD_SPELL_END) {
                $skillChange = true;
            }
            else if (kNum >= SharedDef.PLAYER_STRING_FIELD_BLOCK_START && kNum < SharedDef.PLAYER_STRING_FIELD_BLOCK_END) {
                this.playerChatBlockChange(kNum);
            }
            else if (kNum >= SharedDef.PLAYER_FIELD_SHOP_LIMIT_START && kNum < SharedDef.PLAYER_FIELD_SHOP_LIMIT_END) {
                var tid = this.GetUInt16(kNum, 0);
                var num = this.GetUInt16(kNum, 1);
                ModuleEventManager.dispatchEvent(new store.StoreEvent(store.StoreEvent.STORE_NUM_EVENT));
            }
            else if (kNum >= SharedDef.PLAYER_FIELD_MAX_HEALTH && kNum < SharedDef.PLAYER_FIELD_CONTROL_RESIST_RATE) {
            }
            else if (kNum >= SharedDef.PLAYER_INT_FIELD_LOGIN_ACTIVITY_REWARD_STATUS_START && kNum < SharedDef.PLAYER_INT_FIELD_LOGIN_ACTIVITY_REWARD_STATUS_END) {
                //登入大礼领取情况变化
                ModuleEventManager.dispatchEvent(new logingift.LogingiftEvent(logingift.LogingiftEvent.REFRESH_Logingift_EVENT));
            }
            else if (kNum >= SharedDef.PLAYER_INT_FIELD_BUYED_FACTION_SHOP && kNum < SharedDef.PLAYER_INT_FIELD_BUYED_FACTION_SHOP_END) {
                //家族商店已购物品个数变化
                this._factionShopNumList = this.refreshFactionShopNumList();
                ModuleEventManager.dispatchEvent(new store.StoreEvent(store.StoreEvent.STORE_NUM_EVENT));
            }
            else if (kNum >= SharedDef.PLAYER_INT_FIELD_OPTIONAL_GUIDE_START && kNum < SharedDef.PLAYER_INT_FIELD_OPTIONAL_GUIDE_END) {
                this.resetOptionalGuidItem();
                //console.log("非强制引导有变化")
            }
            else if (kNum >= SharedDef.PLAYER_INT_FILED_FACTION_GIFT_START && kNum < SharedDef.PLAYER_INT_FILED_FACTION_GIFT_END) {
                //帮众自己送礼物历史记录
                var changid = (kNum - SharedDef.PLAYER_INT_FILED_FACTION_GIFT_START) % SharedDef.MAX_FACTION_DATA_INT_GIFT;
                if (changid == SharedDef.FACTION_DATA_INT_GIFT_COUNT_ID && this.GetUInt32(kNum - 2) == 0) {
                    //新增数据
                    return;
                }
                if (changid == SharedDef.FACTION_DATA_INT_GIFT_FLAG_THANK) {
                    //数据变化。
                }
            }
            else if (kNum >= SharedDef.PLAYER_INT_FIELD_FACTION_SKILL_LV_START && kNum < SharedDef.PLAYER_INT_FIELD_FACTION_SKILL_LV_END) {
                ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.SHOW_FACTIONSKILL_CHG_EVENT));
            }
            else if (kNum >= SharedDef.PLAYER_EXPAND_INT_MONEY && kNum < SharedDef.PLAYER_EXPAND_INT_MONEY_END) {
                $moneyChange = true;
            }
            else if (kNum >= SharedDef.PLAYER_INT_FIELD_OPEN_MENU_START && kNum < SharedDef.PLAYER_INT_FIELD_OPEN_MENU_END) {
                //系统开启有变化
                ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT));
            }
            //  for (var i: number = SharedDef.PLAYER_INT_FIELD_OPTIONAL_GUIDE_START; i < SharedDef.PLAYER_INT_FIELD_OPTIONAL_GUIDE_END; i += 2) {
        }
        //被动技能变化
        var $passiveChangeBoole = false;
        for (var i = SharedDef.PLAYER_INT_FIELD_PASSIVE_SPELL_START; i < SharedDef.PLAYER_INT_FIELD_PASSIVE_SPELL_END; i++) {
            if ($intMask[i]) {
                $passiveChangeBoole = true;
                if (this._passiveskillLevDic) {
                    var id = this.GetUInt16(i, SharedDef.SHORT_SPELL_ID);
                    if (id == 0) {
                        break;
                    }
                    var lev = this.GetUInt16(i, SharedDef.SHORT_SPELL_LV);
                    this._passiveskillLevDic[id] = lev;
                }
            }
        }
        if ($passiveChangeBoole) {
            ModuleEventManager.dispatchEvent(new divinesword.DivineswordEvent(divinesword.DivineswordEvent.REFRESH_SKILL_PANEL));
        }
        for (var k in $strMask) {
            var kNum1 = Number(k);
            // if (kNum1 >= SharedDef.PLAYER_STRING_INT_FIELD_CULTIVATION_PLUNDER_RECORD_START && kNum1 < SharedDef.PLAYER_STRING_INT_FIELD_CULTIVATION_PLUNDER_RECORD_END) {
            //     //修炼场战斗记录变化
            //     ModuleEventManager.dispatchEvent(new training.TrainingEvent(training.TrainingEvent.RECORD_Training_EVENT));
            // }
        }
        if ($skillChange) {
            this.sendChangeSkillEvent();
        }
        if ($moneyChange) {
            ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.MONEY_CHANGE));
        }
    };
    PlayerGuidObject.prototype.sendChangeSkillEvent = function () {
        //console.log("技能更新 -----");
        var $hasEvet = false;
        var $arr = this.getBaseSkillItem();
        for (var i = 0; i < $arr.length; i++) {
            var $has = false;
            for (var j = 0; j < this.skillItem.length; j++) {
                if ($arr[i].slot == this.skillItem[j].slot) {
                    $has = true;
                }
            }
            if (!$has) {
                //console.log("新插口开启", $arr[i].slot);
                if ($arr[i].slot >= 2 && $arr[i].slot <= 4) {
                    var evt = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.OPEN_SKILL_SLOT);
                    evt.data = $arr[i];
                    ModuleEventManager.dispatchEvent(evt);
                }
                else {
                    this.resetSkillItem();
                    ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.RESET_SKILL_ICON));
                }
                $hasEvet = true;
            }
        }
        if (!$hasEvet) {
            //只是技能数据更新，而不是插孔变化。刷新技能数据
            this.resetSkillItem();
        }
    };
    PlayerGuidObject.prototype.getsyspageopen = function ($sysId, $page) {
        for (var i = SharedDef.PLAYER_INT_FIELD_OPEN_MENU_START; i < SharedDef.PLAYER_INT_FIELD_OPEN_MENU_END; i += SharedDef.MAX_OPEN_MENU_ATTR_COUNT) {
            var systemId = this.GetUInt32(i + SharedDef.OPEN_MENU_MAIN_ID);
            var flag = this.GetUInt32(i + SharedDef.OPEN_MENU_SUB_FLAG);
            if (systemId == $sysId) {
                // 全部解锁
                if (flag & 1) {
                    //   //console.log("全部解锁");
                    return true;
                }
                else {
                    // 部分解锁
                    var off = 1;
                    for (var j = 1; j < 10; j++) {
                        off <<= 1;
                        if (flag & off) {
                            if ($page == j) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    };
    PlayerGuidObject.prototype.resetSystemItem = function () {
        //console.log("开启系统刷新getTimer()", TimeUtil.getTimer())
        this.systemOpenItem = new Array;
        //var $k: number = SharedDef.PLAYER_INT_FIELD_OPEN_MENU_START + SharedDef.MAX_OPEN_MENU_ATTR_COUNT * SharedDef.MAX_PLAYER_OPEN_MENU_COUNT
        for (var i = SharedDef.PLAYER_INT_FIELD_OPEN_MENU_START; i < SharedDef.PLAYER_INT_FIELD_OPEN_MENU_END; i += SharedDef.MAX_OPEN_MENU_ATTR_COUNT) {
            var systemId = this.GetUInt32(i + SharedDef.OPEN_MENU_MAIN_ID);
            var flag = this.GetUInt32(i + SharedDef.OPEN_MENU_SUB_FLAG);
            if (systemId > 0) {
                var $systemOpenData = new SystemOpenData();
                $systemOpenData.systemId = systemId;
                $systemOpenData.data = new Array;
                this.systemOpenItem.push($systemOpenData);
                //console.log("---------------------系统===============", systemId);
                if (systemId == 116) {
                    //    console.log("---------------------组队");
                }
                // 全部解锁
                if (flag & 1) {
                    //   //console.log("全部解锁");
                    $systemOpenData.needShowIcon = true;
                }
                else {
                    // 部分解锁
                    var off = 1;
                    for (var j = 1; j < 10; j++) {
                        off <<= 1;
                        if (flag & off) {
                            $systemOpenData.data.push(j);
                            //  //console.log("j", j);
                            if (tb.TB_system_base.getTempVo(systemId * 10 + j).show) {
                                $systemOpenData.needShowIcon = true;
                                if (systemId == SharedDef.MODULE_FIRST_RECHARGE && GuidData.quest.IsReceiveShouChongReward()) {
                                    $systemOpenData.needShowIcon = false;
                                }
                                if ($systemOpenData.needShowIcon) {
                                    //console.log("显示图标=>", systemId);
                                }
                            }
                        }
                    }
                }
            }
        }
        return this.systemOpenItem;
    };
    PlayerGuidObject.prototype.resetOptionalGuidItem = function () {
        this.optionalGuidItem = new Array;
        for (var i = SharedDef.PLAYER_INT_FIELD_OPTIONAL_GUIDE_START; i < SharedDef.PLAYER_INT_FIELD_OPTIONAL_GUIDE_END; i += 2) {
            var $optionalId = this.GetUInt32(i + 0);
            var $flag = this.GetUInt32(i + 1);
            if ($optionalId > 0) {
                //console.log("$optionalId", $optionalId, $flag)
                this.optionalGuidItem.push(new Vector2D($optionalId, $flag));
            }
        }
        return this.optionalGuidItem;
    };
    /**系统是否开启显示开启效果 */
    PlayerGuidObject.prototype.isOpenSystemNeedShow = function ($id) {
        for (var i = 0; i < this.systemOpenItem.length; i++) {
            if (this.systemOpenItem[i].systemId == $id) {
                return this.systemOpenItem[i].needShowIcon;
            }
        }
        return false;
    };
    /**系统是否开启 */
    PlayerGuidObject.prototype.isOpenSystemById = function ($id) {
        for (var i = 0; i < this.systemOpenItem.length; i++) {
            if (this.systemOpenItem[i].systemId == $id) {
                return this.systemOpenItem[i].needShowIcon;
            }
        }
        return false;
    };
    /**限购商品购买次数 */
    PlayerGuidObject.prototype.getLimShopNum = function (id) {
        for (var i = SharedDef.PLAYER_FIELD_SHOP_LIMIT_START; i < SharedDef.PLAYER_FIELD_SHOP_LIMIT_END; i++) {
            var tid = this.GetUInt16(i, 0);
            if (tid == id) {
                return this.GetUInt16(i, 1);
            }
        }
        return 0;
    };
    PlayerGuidObject.prototype.getFactionShopNumList = function () {
        if (this._factionShopNumList) {
            return this._factionShopNumList;
        }
        this._factionShopNumList = this.refreshFactionShopNumList();
        //console.log("---家族商店购买物品个数---", this._factionShopNumList);
        return this._factionShopNumList;
    };
    PlayerGuidObject.prototype.refreshFactionShopNumList = function () {
        var aa = new Array();
        for (var i = SharedDef.PLAYER_INT_FIELD_BUYED_FACTION_SHOP; i < SharedDef.PLAYER_INT_FIELD_BUYED_FACTION_SHOP_END; i++) {
            var dat = this.getShopData(i);
            if (dat) {
                aa.push(dat);
            }
        }
        //console.log("---880aa---", aa);
        return aa;
    };
    PlayerGuidObject.prototype.getShopData = function (idx) {
        var data = new factionShopNumData;
        var id = this.GetUInt16(idx, 0);
        data.id = id;
        data.num = this.GetUInt16(idx, 1);
        // if (id == 0) {
        // } else {
        //     data.num = this.GetUInt16(idx, 1);
        // }
        return data;
    };
    PlayerGuidObject.prototype.playerChatBlockChange = function ($id) {
        ModuleEventManager.dispatchEvent(new shieldui.ShieldUiEvent(shieldui.ShieldUiEvent.PLAYER_STRING_FIELD_BLOCK));
    };
    PlayerGuidObject.prototype.getPlayChatBlock = function () {
        var $arr = new Array;
        for (var i = SharedDef.PLAYER_STRING_FIELD_BLOCK_START; i < SharedDef.PLAYER_STRING_FIELD_BLOCK_END; i++) {
            var $str = this.GetStr(i);
            $arr.push($str);
        }
        return $arr;
    };
    PlayerGuidObject.prototype.teleMap = function () {
        var $mpaId = this.GetUInt32(SharedDef.PLAYER_EXPAND_INT_TO_MAP);
        if ($mpaId) {
            var $vo = tb.TB_map.getTB_map($mpaId);
            GameInstance.mapName = $vo.mapres;
        }
    };
    PlayerGuidObject.prototype.loginTime = function () {
        GameInstance.skillCdItem = new Array();
        var lt = this.GetUInt32(SharedDef.PLAYER_EXPAND_INT_LAST_LOGIN_TIME);
        for (var i = SharedDef.PLAYER_INT_FIELD_IMPORTANT_SPELL_CD_START; i < SharedDef.PLAYER_INT_FIELD_IMPORTANT_SPELL_CD_END; i += SharedDef.MAX_IMPORTANT_SPELL_ATTR_COUNT) {
            var $id = this.GetUInt32(i);
            var $cd = this.GetUInt32(i + 1) - lt;
            ////console.log("{ id: $id, cd: $cd }");
            ////console.log({ id: $id, cd: $cd })
            GameInstance.skillCdItem.push({ id: $id, cd: $cd });
        }
    };
    /**战斗力 */
    PlayerGuidObject.prototype.getForce = function () {
        return this.GetDouble(SharedDef.PLAYER_FIELD_FORCE);
    };
    PlayerGuidObject.prototype.getPlayerIntFieldMeridianForce = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_MERIDIAN_FORCE);
    };
    PlayerGuidObject.prototype.get1v1Rank = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_DOUJIANTAI_RANK);
    };
    /**vip等级 */
    PlayerGuidObject.prototype.getVipLevel = function () {
        return this.GetUInt32(SharedDef.PLAYER_FIELD_VIP_LEVEL);
    };
    /**是否为VIP */
    PlayerGuidObject.prototype.getIsVIP = function () {
        return this.getVipLevel() > 0;
    };
    /**是否已购买VIP礼包*/
    PlayerGuidObject.prototype.getVIPBuyGift = function (vip) {
        return this.GetBit(SharedDef.PLAYER_INT_FIELD_VIPGIFT_FLAG, vip);
    };
    /**帮派名称 */
    PlayerGuidObject.prototype.getFactionName = function () {
        return this.GetStr(SharedDef.PLAYER_STRING_FIELD_FACTION_NAME);
    };
    /**帮派ID */
    PlayerGuidObject.prototype.getFactionID = function () {
        return this.GetStr(SharedDef.PLAYER_STRING_FIELD_FACTION_GUID);
    };
    /**累积充值 */
    PlayerGuidObject.prototype.getChongZhiSum = function () {
        return this.GetUInt32(SharedDef.PLAYER_APPD_INT_FIELD_RECHARGE_SUM);
    };
    /**已装备称号ID */
    PlayerGuidObject.prototype.getTitleID = function () {
        return this.GetByte(SharedDef.PLAYER_FIELD_BYTES_2, 3);
    };
    PlayerGuidObject.prototype.chgAvatar = function () {
        var evt = new charbg.CharBgEvent(charbg.CharBgEvent.EQUVIEW_CHANGE_EVENT);
        evt.showType = 0;
        ModuleEventManager.dispatchEvent(evt);
    };
    PlayerGuidObject.prototype.chgWeapon = function () {
        var evt = new charbg.CharBgEvent(charbg.CharBgEvent.EQUVIEW_CHANGE_EVENT);
        evt.showType = 1;
        ModuleEventManager.dispatchEvent(evt);
    };
    PlayerGuidObject.prototype.getBaseSkillItem = function () {
        var $arr = new Array;
        var num = (SharedDef.PLAYER_INT_FIELD_SPELL_END - SharedDef.PLAYER_INT_FIELD_SPELL_START);
        for (var i = 0; i < num; i++) {
            var $vo = this.getSkill(i);
            if ($vo) {
                ////console.log($vo)
                $arr.push($vo);
            }
        }
        return $arr;
    };
    PlayerGuidObject.prototype.getSkill = function ($i) {
        var idx = SharedDef.PLAYER_INT_FIELD_SPELL_START + $i;
        var id = this.GetUInt16(idx, 0);
        //    //console.log("get skill index = ", idx, " id = ", id)
        if (id == 0) {
            return null;
        }
        var $vo = new SkillUintVo();
        $vo.id = this.GetUInt16(idx, 0);
        $vo.lev = this.GetUInt8(idx, 2);
        $vo.slot = this.GetUInt8(idx, 3);
        return $vo;
    };
    //获取被动技能数据
    PlayerGuidObject.prototype.getPlayerIntFieldPassiveSpell = function () {
        var item = new Array;
        for (var i = SharedDef.PLAYER_INT_FIELD_PASSIVE_SPELL_START; i < this._uint32_values_len; i++) {
            var id = this.GetUInt16(i, SharedDef.SHORT_SPELL_ID);
            if (id == 0) {
                break;
            }
            var $vo = new SkillUintVo();
            $vo.id = id;
            $vo.lev = this.GetUInt16(i, SharedDef.SHORT_SPELL_LV);
            item.push($vo);
        }
        return item;
    };
    PlayerGuidObject.prototype.getPassiveSkillLev = function ($id) {
        if (!this._passiveskillLevDic) {
            this._passiveskillLevDic = new Object;
            for (var i = SharedDef.PLAYER_INT_FIELD_PASSIVE_SPELL_START; i < SharedDef.PLAYER_INT_FIELD_PASSIVE_SPELL_END; i++) {
                var id = this.GetUInt16(i, SharedDef.SHORT_SPELL_ID);
                if (id == 0) {
                    break;
                }
                var lev = this.GetUInt16(i, SharedDef.SHORT_SPELL_LV);
                this._passiveskillLevDic[id] = lev;
            }
        }
        if (this._passiveskillLevDic[$id]) {
            return this._passiveskillLevDic[$id];
        }
        else {
            return 0;
        }
    };
    /**当前经验 */
    PlayerGuidObject.prototype.getExp = function () {
        return this.GetDouble(SharedDef.PLAYER_EXPAND_INT_XP);
    };
    /**最大经验 */
    PlayerGuidObject.prototype.getMaxExp = function () {
        return this.GetDouble(SharedDef.PLAYER_EXPAND_INT_NEXT_LEVEL_XP);
    };
    //元宝
    PlayerGuidObject.prototype.getGoldIngot = function () {
        var idx = SharedDef.PLAYER_EXPAND_INT_MONEY + 2 * SharedDef.MONEY_TYPE_GOLD_INGOT;
        return this.GetDouble(idx);
    };
    //绑定元宝
    PlayerGuidObject.prototype.getBindGold = function () {
        var idx = SharedDef.PLAYER_EXPAND_INT_MONEY + 2 * SharedDef.MONEY_TYPE_BIND_GOLD;
        return this.GetDouble(idx);
    };
    //银两
    PlayerGuidObject.prototype.getSilver = function () {
        var idx = SharedDef.PLAYER_EXPAND_INT_MONEY + 2 * SharedDef.MONEY_TYPE_SILVER;
        return this.GetDouble(idx);
    };
    //真气
    PlayerGuidObject.prototype.getQI = function () {
        // var idx: number = SharedDef.PLAYER_EXPAND_INT_MONEY + 2 * SharedDef.MONEY_TYPE_QI;
        return 0;
    };
    //斗魂
    PlayerGuidObject.prototype.getDouHun = function () {
        //  var idx: number = SharedDef.PLAYER_EXPAND_INT_MONEY + 2 * SharedDef.MONEY_TYPE_DOUHUN;
        return 0;
    };
    //荣誉
    PlayerGuidObject.prototype.getHonor = function () {
        //  var idx: number = SharedDef.PLAYER_EXPAND_INT_MONEY + 2 * SharedDef.MONEY_TYPE_HONOR;
        return 0;
    };
    //兽灵
    PlayerGuidObject.prototype.getBeast = function () {
        //  var idx: number = SharedDef.PLAYER_EXPAND_INT_MONEY + 2 * SharedDef.MONEY_TYPE_BEAST;
        return 0;
    };
    //宝石精华
    PlayerGuidObject.prototype.getGem = function () {
        //    var idx: number = SharedDef.PLAYER_EXPAND_INT_MONEY + 2 * SharedDef.MONEY_TYPE_GEM;
        return 0;
    };
    //帮贡
    PlayerGuidObject.prototype.getFactionBG = function () {
        //  var idx: number = SharedDef.PLAYER_EXPAND_INT_MONEY + 2 * SharedDef.MONEY_TYPE_FACTION;
        return 0;
    };
    //获取资源
    PlayerGuidObject.prototype.getResType = function ($type) {
        var idx = SharedDef.PLAYER_EXPAND_INT_MONEY + 2 * $type;
        return this.GetDouble(idx);
    };
    //获得标准化资源数目
    PlayerGuidObject.prototype.getResTypeStr = function ($type) {
        return Snum(this.getResType($type));
    };
    /**1男 2女*/
    PlayerGuidObject.prototype.getCharType = function () {
        return this.GetUInt8(SharedDef.PLAYER_FIELD_BYTES_0, 0);
    };
    PlayerGuidObject.prototype.getLevel = function () {
        return this.GetUInt32(SharedDef.PLAYER_FIELD_LEVEL);
    };
    /**
     * 累计消耗元宝
     */
    PlayerGuidObject.prototype.getConsume = function () {
        return this.GetUInt32(SharedDef.PLAYER_APPD_INT_FIELD_CONSUME_SUM);
    };
    PlayerGuidObject.prototype.getBaseName = function () {
        var str = this.getName();
        return str.split(",")[2];
    };
    PlayerGuidObject.prototype.getAvatar = function () {
        return this.GetUInt16(SharedDef.PLAYER_INT_FIELD_APPEARANCE, 1);
    };
    PlayerGuidObject.prototype.getWeapon = function () {
        return this.GetUInt16(SharedDef.PLAYER_INT_FIELD_APPEARANCE, 0);
    };
    /**
     * 家族建筑升级加速每日次数
     */
    PlayerGuidObject.prototype.getFactionSpeedUpNum = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FILED_FACTION_BUILDING_SPEEDUP_DAILY_COUNT);
    };
    /**
     * 获取属性的值
     * @param
     */
    PlayerGuidObject.prototype.getPropById = function ($id) {
        return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_MAX_HEALTH + ($id - 1) * 2) / 100);
    };
    //获得所有防御
    PlayerGuidObject.prototype.getAllArmor = function () {
        return Math.floor((this.GetDouble(SharedDef.PLAYER_FIELD_ARMOR) + this.GetDouble(SharedDef.PLAYER_FIELD_STRENGTH_ARMOR)) / 100);
    };
    // 获得攻击力
    // public getDamage(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_DAMAGE) / 100);
    // }
    // 获得防御力
    // public getArmor(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_ARMOR) / 100);
    // }
    // 获得命中
    // public getHit(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_HIT) / 100);
    // }
    // 获得闪避
    // public getMiss(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_MISS) / 100);
    // }
    // 获得暴击
    // public getCrit(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_CRIT) / 100);
    // }
    // 获得坚韧
    // public getTough(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_TOUGH) / 100);
    // }
    // 获得攻击速度
    // public getAttackSpeed(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_ATTACK_SPEED) / 100);
    // }
    // 获得移动速度
    // public getMoveSpeed(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_MOVE_SPEED) / 100);
    // }
    // 获得忽视防御
    // public getIgnoreArmor(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_IGNORE_ARMOR) / 100);
    // }
    // 获得忽视闪避
    // public getIgnoreMiss(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_IGNORE_MISS) / 100);
    // }
    // 获得生命值回复
    // public getRecovery(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_RECOVERY) / 100);
    // }
    // 获得伤害加深(万分比)
    // public getDamageAmplifyRate(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_DAMAGE_AMPLIFY_RATE) / 100);
    // }
    // 获得伤害减免(万分比)
    // public getDamageResistRate(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_DAMAGE_RESIST_RATE) / 100);
    // }
    // 获得反弹伤害(万分比)
    // public getDamageReturnRate(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_DAMAGE_RETURN_RATE) / 100);
    // }
    // 获得吸血光环(万分比)
    // public getVampiricRate(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_VAMPIRIC_RATE) / 100);
    // }
    // 获得回复效率(万分比)
    // public getRecoveryRate(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_RECOVERY_RATE) / 100);
    // }
    // 获得暴击率(万分比)
    // public getCritRate(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_CRIT_RATE) / 100);
    // }
    // 获得抗暴率(万分比)
    // public getCritResistRate(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_CRIT_RESIST_RATE) / 100);
    // }
    // 获得暴击伤害倍数(万分比)
    // public getCritDamRate(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_CRIT_DAM_RATE) / 100);
    // }
    // 获得降暴伤害倍数(万分比)
    // public getCritResistDamRate(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_CRIT_RESIST_DAM_RATE) / 100);
    // }
    // 获得命中率(万分比)
    // public getHitRate(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_HIT_RATE) / 100);
    // }
    // 获得闪避率(万分比)
    // public getMissRate(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_MISS_RATE) / 100);
    // }
    // 获得眩晕
    PlayerGuidObject.prototype.getStunRate = function () {
        return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_STUN_RATE) / 100);
    };
    // 获得定身
    PlayerGuidObject.prototype.getRootsRate = function () {
        return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_ROOTS_RATE) / 100);
    };
    // 获得沉默
    PlayerGuidObject.prototype.getSilenceRate = function () {
        return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_SILENCE_RATE) / 100);
    };
    // 获得混乱
    PlayerGuidObject.prototype.getChaosRate = function () {
        return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_CHAOS_RATE) / 100);
    };
    // 获得魅惑
    PlayerGuidObject.prototype.getCharmRate = function () {
        return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_CHARM_RATE) / 100);
    };
    // 获得控制增强
    PlayerGuidObject.prototype.getControlEnhanceRate = function () {
        return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_CONTROL_ENHANCE_RATE) / 100);
    };
    // 获得控制减免
    PlayerGuidObject.prototype.getControlResistRate = function () {
        return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_CONTROL_RESIST_RATE) / 100);
    };
    /**角色已装配的神兵id */
    PlayerGuidObject.prototype.getDivineID = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_DIVINE_ID);
    };
    /**今日已点赞状态集合 */
    PlayerGuidObject.prototype.getRankLikeState = function () {
        var ary = new Array;
        for (var i = 0; i < 32; i++) {
            ary.push(this.GetBit(SharedDef.PLAYER_FIELD_USE_RANK_LIKE, i));
        }
        return ary;
    };
    PlayerGuidObject.prototype.rankLikeChg = function () {
        //console.log("---====");
        ModuleEventManager.dispatchEvent(new ranking.RankingEvent(ranking.RankingEvent.RANKING_LIKE_CHG_EVENT));
    };
    /**是否对某个排行榜点赞过 */
    PlayerGuidObject.prototype.testAddLike = function (type, guid) {
        var spkey = "\1";
        var key = guid + spkey + type;
        for (var i = SharedDef.PLAYER_STRING_FIELD_RANKLIKE_START; i < SharedDef.PLAYER_STRING_FIELD_RANKLIKE_ENE; i++) {
            if (this.GetStr(i) == key) {
                return true;
            }
        }
        return false;
    };
    /**神兵总战力 */
    PlayerGuidObject.prototype.getDivineForce = function () {
        return this.GetUInt32(SharedDef.PLAYER_FIELD_DIVINE_FORCE);
    };
    /**技能总战力 */
    PlayerGuidObject.prototype.getSkillForce = function () {
        return this.GetUInt32(SharedDef.PLAYER_FIELD_SKILL_FORCE);
    };
    /**神兵数量 */
    PlayerGuidObject.prototype.getDivineNum = function () {
        return this.GetUInt32(SharedDef.PLAYER_FIELD_DIVINE_NUM);
    };
    /**境界战力 */
    PlayerGuidObject.prototype.getRealmbreakForce = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_REALMBREAK_FORCE);
    };
    /**炼器战力 */
    PlayerGuidObject.prototype.getStrengForce = function () {
        return this.GetUInt32(SharedDef.PLAYER_FIELD_EQUIPDEVELOP_FORCE);
    };
    /**装备战力 */
    PlayerGuidObject.prototype.getEquipForce = function () {
        return this.GetUInt32(SharedDef.PLAYER_FILED_EQUIP_FORCE);
    };
    /**坐骑总战力 */
    PlayerGuidObject.prototype.getMountForce = function () {
        return this.GetUInt32(SharedDef.PLAYER_FIELD_MOUNT_FORCE);
    };
    /**神剑战力 */
    PlayerGuidObject.prototype.getAdventureForce = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_ADVENTURE_SKILL_FORCE);
    };
    /**坐骑阶数 */
    PlayerGuidObject.prototype.getMountLevel = function () {
        return this.GetByte(SharedDef.PLAYER_INT_FIELD_MOUNT_LEVEL, 0);
    };
    /** 坐骑星数*/
    PlayerGuidObject.prototype.getMountStar = function () {
        return this.GetByte(SharedDef.PLAYER_INT_FIELD_MOUNT_LEVEL, 1);
    };
    // 修炼-上次挑战时间戳 冷却使用
    PlayerGuidObject.prototype.getTraininglasttime = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_CULTIVATION_LAST_PLUNDER_TIME);
    };
    // 修炼-当日累计掠夺经验
    PlayerGuidObject.prototype.getTrainingplunderexp = function () {
        //console.log("--expnum--", this.GetUInt32(SharedDef.PLAYER_INT_FIELD_CULTIVATION_TODAY_PLUNDER_EXP));
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_CULTIVATION_TODAY_PLUNDER_EXP);
    };
    // 修炼-当日累计掠夺宝箱数
    PlayerGuidObject.prototype.getTrainingplunderchest = function () {
        //console.log("--bosnum--", this.GetUInt32(SharedDef.PLAYER_INT_FIELD_CULTIVATION_TODAY_PLUNDER_CHEST));
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_CULTIVATION_TODAY_PLUNDER_CHEST);
    };
    // 修炼-当日购买次数
    PlayerGuidObject.prototype.getTrainingplundercount = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_CULTIVATION_TODAY_PURCHASE_COUNT);
    };
    // 修炼-当前剩余挑战次数
    PlayerGuidObject.prototype.getTrainingleftplundercount = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_CULTIVATION_LEFT_PLUNDER_COUNT);
    };
    // 修炼-修炼开始时间
    PlayerGuidObject.prototype.getTrainingStartTime = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_CULTIVATION_START_TIME);
    };
    // 修炼-宝箱掠夺信息
    PlayerGuidObject.prototype.getTrainingLostinfo = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_CULTIVATION_LOST_INFO);
    };
    // 修炼-被掠夺成功数
    PlayerGuidObject.prototype.getTrainingTotalCount = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_CULTIVATION_TOTAL_BEEN_PLUNDER_COUNT);
    };
    // 修炼-战斗记录
    PlayerGuidObject.prototype.getTrainingcombatlog = function () {
        var ary = new Array;
        for (var i = SharedDef.PLAYER_STRING_INT_FIELD_CULTIVATION_PLUNDER_RECORD_START; i < SharedDef.PLAYER_STRING_INT_FIELD_CULTIVATION_PLUNDER_RECORD_END; i++) {
            ary.push(this.GetStr(i));
        }
        return ary;
    };
    // 登录大礼 --累计登录天数
    PlayerGuidObject.prototype.getLogingiftDay = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_LOGIN_ACTIVITY_TOTAL_DAYS);
    };
    // 登录大礼 --奖励领取情况
    PlayerGuidObject.prototype.getLogingiftReward = function () {
        var ary = new Array;
        for (var i = 0; i < 32; i++) {
            ary.push(this.GetBit(SharedDef.PLAYER_INT_FIELD_LOGIN_ACTIVITY_REWARD_STATUS_START, i));
        }
        return ary;
    };
    /**翅膀战斗力 */
    PlayerGuidObject.prototype.getWingForce = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_WINGS_FORCE);
    };
    /**
     * 法宝总战力变化
     */
    PlayerGuidObject.prototype.talismantotalzhanli = function () {
        ModuleEventManager.dispatchEvent(new treasure.TreasureUiEvent(treasure.TreasureUiEvent.CHANGE_ZHANLI_EVENT));
        ModuleEventManager.dispatchEvent(new stronger.StrongerEvent(stronger.StrongerEvent.CHG_Stronger_EVENT));
    };
    /**
      * 法宝总战力
      */
    PlayerGuidObject.prototype.gettalismantotalzhanli = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_TALISMAN_FORCE);
    };
    /**
     * 法宝总战力变化
     */
    PlayerGuidObject.prototype.teamflagchange = function () {
        ModuleEventManager.dispatchEvent(new treasure.TreasureUiEvent(treasure.TreasureUiEvent.CHANGE_ZHANLI_EVENT));
    };
    /**
      * 组队副本首胜通过字段
      */
    PlayerGuidObject.prototype.getteamflag = function () {
        var ary = new Array;
        for (var i = 0; i < 32; i++) {
            ary.push(this.GetBit(SharedDef.PLAYER_INT_FIELD_GROUP_INSTANCE_CLEAR_FLAG, i));
        }
        return ary;
    };
    /**家族首领剩余调整次数 */
    PlayerGuidObject.prototype.getFactionLeadNum = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_FACTION_BOSSDEFENSE_TICKETS);
    };
    /**家族无尽远程层数 */
    PlayerGuidObject.prototype.getFactionTripLev = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_FACTION_TOWER_CLEAR_FLOOR);
    };
    /**家族远程奖励状态*/
    PlayerGuidObject.prototype.getFactionTripReward = function () {
        var ary = new Array;
        for (var i = 1; i < 6; i++) {
            ary.push(this.GetBit(SharedDef.PLAYER_INT_FIELD_FACTION_TOWER_FLAG, i));
        }
        return ary;
    };
    /**扫荡状态*/
    PlayerGuidObject.prototype.getFactionTripSweep = function () {
        return this.GetBit(SharedDef.PLAYER_INT_FIELD_FACTION_TOWER_FLAG, 0);
    };
    /**
     * 排位赛积分
     */
    PlayerGuidObject.prototype.getQualifyScore = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_QUALIFY_SCORE);
    };
    /**家族技能等级 */
    PlayerGuidObject.prototype.getFactionSkillLv = function ($id) {
        return this.GetUInt16(SharedDef.PLAYER_INT_FIELD_FACTION_SKILL_LV_START + $id - 1, 0);
    };
    //已改名次数
    PlayerGuidObject.prototype.getChgNameTime = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_RENAME_TIMES);
    };
    //称号战斗力
    PlayerGuidObject.prototype.getTitleForce = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_TITLE_FORCE);
    };
    //称号战斗力变化
    PlayerGuidObject.prototype.titleforceChg = function () {
        ModuleEventManager.dispatchEvent(new role.RoleUiEvent(role.RoleUiEvent.TITLE_FORCE_CHG_EVENT));
    };
    //名字变化
    PlayerGuidObject.prototype.Chgname = function () {
        ModuleEventManager.dispatchEvent(new role.RoleUiEvent(role.RoleUiEvent.NAME_CHG_EVENT));
    };
    //复仇次数变化
    PlayerGuidObject.prototype.chgRevengeNum = function () {
        ModuleEventManager.dispatchEvent(new social.SocialUiEvent(social.SocialUiEvent.REVENGE_NUM_CHG_EVENT));
    };
    //复仇购买次数
    PlayerGuidObject.prototype.getRevengeBuyNum = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_REVENGE_BUY_TIMES);
    };
    //摇钱树次数
    PlayerGuidObject.prototype.getMoneyTreeNum = function () {
        return this.GetUInt32(SharedDef.PLAYER_APPD_INT_FIELD_MONEYTREE_COUNT);
    };
    //摇钱树满足次数奖励领取状况
    PlayerGuidObject.prototype.getMoneyTreeState = function ($idx) {
        return this.GetBit(SharedDef.PLAYER_APPD_INT_FIELD_MONEYTREE_GIFT_FLAG, $idx);
    };
    //摇钱树领取状态改变
    PlayerGuidObject.prototype.moneyTreeChg = function () {
        ModuleEventManager.dispatchEvent(new moneytree.MoneyTreeEvent(moneytree.MoneyTreeEvent.CHG_MoneyTree_REWARD_EVENT));
    };
    //当前挑战的幻境id
    PlayerGuidObject.prototype.getworldrisklastid = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_WORLD_RISK_LAST_ID);
    };
    //上一次地图子类型
    PlayerGuidObject.prototype.getLastMapType = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_LAST_INSTANCE_TYPE);
    };
    //上一次地图子类型参数
    PlayerGuidObject.prototype.getLastMapParam = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_LAST_INSTANCE_PARAM);
    };
    //模式切换cd
    PlayerGuidObject.prototype.getCDtime = function () {
        return this.GetUInt32(SharedDef.PLAYER_FIELD_PEACE_MODE_CD);
    };
    //境界突破等级
    PlayerGuidObject.prototype.getStateLev = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_REALMBREAK_LEVEL);
    };
    //境界突破经验
    PlayerGuidObject.prototype.getStateExp = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_REALMBREAK_EXP);
    };
    //境界突破任务完成个数
    PlayerGuidObject.prototype.getStateTaskNum = function () {
        return this.GetUInt16(SharedDef.PLAYER_INT_FIELD_REALMBREAK_DAILYQUEST_STATE, 0);
    };
    //境界突破任务奖励领取情况
    PlayerGuidObject.prototype.getStateTaskRecive = function () {
        return this.GetUInt16(SharedDef.PLAYER_INT_FIELD_REALMBREAK_DAILYQUEST_STATE, 1);
    };
    //闯关当前Id
    PlayerGuidObject.prototype.getCurPassId = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_PASSED_STAGE_INSTANCE_ID);
    };
    PlayerGuidObject.prototype.getFactionHonorReward = function () {
        return !this.GetBit(SharedDef.PLAYER_INT_FIELD_FACTION_MATCH_CHAMPION_DAILY_REWARD_FLAG, 0);
    };
    //离线挂机剩余几分钟
    PlayerGuidObject.prototype.getHangUpTime = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_OFFLINE_MINUTES);
    };
    //队伍匹配状态
    PlayerGuidObject.prototype.getTeamAutoMatch = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_AUTO_GROUP_MATCH);
    };
    //背包整理冷却时间
    PlayerGuidObject.prototype.getBagTime = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_BAG_SORT_TIME);
    };
    //本月补签次数
    PlayerGuidObject.prototype.getBackTimes = function () {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_WELFARE_CHECKIN_GETBACK_COUNT);
    };
    //每档首充状态  从1开始，和表id对应
    PlayerGuidObject.prototype.getChongzhiState = function ($id) {
        return this.GetBit(SharedDef.PLAYER_INT_FIELD_SHOP_CHARGE_FLAG, $id);
    };
    PlayerGuidObject.prototype.getLotteryData = function () {
        return [this.GetUInt16(SharedDef.PLAYER_INT_FIELD_RECHARGE_LOTTERY_TIMES, 0), this.GetUInt16(SharedDef.PLAYER_INT_FIELD_RECHARGE_LOTTERY_TIMES, 1)];
    };
    return PlayerGuidObject;
}(GuidObject));
//# sourceMappingURL=PlayerGuidObject.js.map