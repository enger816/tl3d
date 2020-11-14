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
var InstanceData = /** @class */ (function (_super) {
    __extends(InstanceData, _super);
    function InstanceData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InstanceData.prototype.onBaseCreated = function () {
        var _this = this;
        this._after_update = function ($flag, $intMask, $strMask) { _this.dataUpdate($intMask, $strMask); };
        // this.AddListen(SharedDef.INSTANCE_INT_FIELD_TRIAL_SWEEP_SHORT, ($binlog: any) => { this.instanceIntFieldTrialSweep() });
        this.AddListen(SharedDef.INSTANCE_INT_FIELD_ACTIVE, function ($binlog) {
            ModuleEventManager.dispatchEvent(new activity.ActivityEvent(activity.ActivityEvent.ACTIVITY_CHANGE_EVENT));
            ModuleEventManager.dispatchEvent(new activity.ActivityEvent(activity.ActivityEvent.ACTIVITY_REWARD_EVENT));
        });
        this.AddListen(SharedDef.INSTANCE_INT_FIELD_ACTIVE_REWARD, function ($binlog) {
            ModuleEventManager.dispatchEvent(new activity.ActivityEvent(activity.ActivityEvent.ACTIVITY_REWARD_EVENT));
        });
        this.AddListen(SharedDef.INSTANCE_INT_FIELD_3V3_TIMES, function ($binlog) {
            ModuleEventManager.dispatchEvent(new kuafu.KuaFuEvent(kuafu.KuaFuEvent.INSTANCE_INT_FIELD_3V3_TIMES)); //跨服匹配
        });
        this.AddListen(SharedDef.INSTANCE_INT_FIELD_3V3_DAY_REWARD, function ($binlog) {
            ModuleEventManager.dispatchEvent(new kuafu.KuaFuEvent(kuafu.KuaFuEvent.INSTANCE_INT_FIELD_3V3_DAY_REWARD)); //跨服匹配
        });
        this.AddListen(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_FIRST_REWARD, function ($binlog) { _this.FirstvictoryrewardChange(); });
        this.AddListen(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_TIMES, function ($binlog) {
            ModuleEventManager.dispatchEvent(new kuafu.KuaFuEvent(kuafu.KuaFuEvent.KUAFU_1V1_REFRESH)); //1V1
        });
        // this.AddListen(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_FIGHT_CD, ($binlog: any) => {
        //     ModuleEventManager.dispatchEvent(new kuafu.KuaFuEvent(kuafu.KuaFuEvent.KUAFU_1V1_REFRESH));//1V1
        // });
        //组队副本剩余挑战次数
        this.AddListen(SharedDef.INSTANCE_INT_FIELD_GROUP_INSTANCE_CHALLENGE_COUNT, function ($binlog) {
            ModuleEventManager.dispatchEvent(new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.CHG_TEAM_NUM)); //1V1
        });
        this.AddListen(SharedDef.INSTANCE_INT_FIELD_QUALIFY_EXTRA_PICKED, function ($binlog) {
            ModuleEventManager.dispatchEvent(new kuafu.KuaFuEvent(kuafu.KuaFuEvent.KUAFU_ARENA_QUALIFY_REWARD_EVENT));
        });
        this.AddListen(SharedDef.INSTANCE_INT_FIELD_QUALIFY_DAILY_TIMES, function ($binlog) {
            ModuleEventManager.dispatchEvent(new kuafu.KuaFuEvent(kuafu.KuaFuEvent.KUAFU_ARENA_QUALIFY_NUM_EVENT));
        });
        this.AddListen(SharedDef.INSTANCE_INT_FIELD_GROUP_EXP_TIMES, function ($binlog) {
            ModuleEventManager.dispatchEvent(new fb.ExpEvent(fb.ExpEvent.REFRESH_TIMES_PANEL));
        });
        this.AddListen(SharedDef.INSTANCE_INT_FIELD_TRIAL_SWEEP_SHORT, function ($binlog) {
            ModuleEventManager.dispatchEvent(new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.TOWER_FUBEN_SWEEP));
        });
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.CORE_DATA_CREATED_EVENT));
    };
    InstanceData.prototype.dataUpdate = function ($intMask, $strMask) {
        for (var k in $intMask) {
            var $kNum = Number(k);
            if ($kNum >= SharedDef.INSTANCE_INT_FIELD_VIP_START && $kNum < SharedDef.INSTANCE_INT_FIELD_VIP_END) {
                ModuleEventManager.dispatchEvent(new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.RES_FUBEN_REFRESH));
            }
            else if ($kNum >= SharedDef.INSTANCE_INT_FIELD_RES_START && $kNum < SharedDef.INSTANCE_INT_FIELD_RES_END) {
                //console.log("------监听到数据变化--------");
                ModuleEventManager.dispatchEvent(new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.RES_FUBEN_REFRESH));
            }
            else if ($kNum >= SharedDef.INSTANCE_INT_FIELD_ACTIVE_START && $kNum < SharedDef.INSTANCE_INT_FIELD_ACTIVE_END) {
                var evt = new activity.ActivityEvent(activity.ActivityEvent.ACTIVITY_ITEM_CHANGE_EVENT);
                evt.data = $kNum;
                ModuleEventManager.dispatchEvent(evt);
            }
            else if ($kNum >= SharedDef.INSTANCE_INT_FIELD_PRIVATE_BOSS_RECOVER_TIME_START && $kNum < SharedDef.INSTANCE_INT_FIELD_PRIVATE_BOSS_RECOVER_TIME_END) {
                //个人boss次数回复时间戳监听
                // ModuleEventManager.dispatchEvent(new sboss.SbossEvent(sboss.SbossEvent.PBOSS_REDPOINT_CHG));
            }
            else if ($kNum >= SharedDef.INSTANCE_INT_FIELD_STAGE_INSTANCE_BONUS_FLAG_START && $kNum < SharedDef.INSTANCE_INT_FIELD_STAGE_INSTANCE_BONUS_FLAG_END) {
                this._passboxreceiveary = this.refreshBoxReceive();
                ModuleEventManager.dispatchEvent(new pass.PassEvent(pass.PassEvent.REFFRESH_BOX_PANEL));
            }
        }
    };
    /** 已挑战次数 */
    InstanceData.prototype.getHasChallengeNum = function () {
        return this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_TIMES, 0);
    };
    /** 今日连胜记录 */
    InstanceData.prototype.getwinningstreakrecord = function () {
        return this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_COMBATWIN, 0);
    };
    /** 首胜最高记录 */
    InstanceData.prototype.getvictoryrecord = function () {
        return this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_MAX_RANK);
    };
    /** 已可购买挑战次数 */
    InstanceData.prototype.getCanbuyChallengeNum = function () {
        return this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_TIMES, 1);
    };
    /** 斗剑台挑战CD时间戳 */
    InstanceData.prototype.getDJcdtime = function () {
        return this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_FIGHT_CD);
    };
    /** 首胜奖励领取情况vo */
    InstanceData.prototype.getFirstvictoryList = function () {
        var $aryflag = new Array;
        for (var i = 0; i < 20; i++) {
            var vo = new FirstvictoryVo();
            //是否达到该名次
            var a = this.GetBit(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_FIRST_GET, i + 1);
            if (a) {
                //达到
                //是否领取
                var b = this.GetBit(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_FIRST_REWARD, i + 1);
                if (b) {
                    vo.state = 2;
                }
                else {
                    vo.state = 0;
                }
            }
            else {
                //未达到
                vo.state = 1;
            }
            vo.data = tb.TB_doujiantai_first.get_TB_doujiantai_firstById(i + 1);
            $aryflag.push(vo);
        }
        $aryflag.sort(function (a, b) {
            if (a.state == b.state) {
                return a.data.id - b.data.id;
            }
            else {
                return a.state - b.state;
            }
        });
        return $aryflag;
    };
    InstanceData.prototype.FirstvictoryrewardChange = function () {
        ModuleEventManager.dispatchEvent(new kuafu.KuaFuEvent(kuafu.KuaFuEvent.FIRSTREWARD_DJ_EVENT));
    };
    InstanceData.prototype.instanceIntFieldTrialSweep = function () {
        ModuleEventManager.dispatchEvent(new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.RES_FUBEN_REFRESH));
    };
    InstanceData.prototype.getInstanceIntFieldVipSatrt = function () {
        var $arr = new Array();
        for (var i = SharedDef.INSTANCE_INT_FIELD_VIP_START; i < SharedDef.INSTANCE_INT_FIELD_VIP_END; i++) {
            //vip副本开始	每个信息4个byte[0:预留, 1:预留, 2:挑战次数, 3:购买次数]
            var idx = i;
            var passed = this.GetByte(idx, 1);
            var num = this.GetByte(idx, 2);
            var buys = this.GetByte(idx, 3);
            $arr.push({ num: num, passed: passed, buys: buys });
        }
        return $arr;
    };
    InstanceData.prototype.getInstanceIntFieldResSatrt = function () {
        var $arr = new Array();
        for (var i = SharedDef.INSTANCE_INT_FIELD_RES_START; i < SharedDef.INSTANCE_INT_FIELD_RES_END; i++) {
            //vip副本开始	 每个信息4个byte[0:挑战次数,1:是否通关,2:预留,3:预留]
            var idx = i;
            var num = this.GetByte(idx, 0);
            var passed = this.GetByte(idx, 1);
            var recive = this.GetByte(idx, 2);
            $arr.push({ num: num, passed: passed, recive: recive });
        }
        //console.log("===$arr==", $arr);
        return $arr;
    };
    InstanceData.prototype.getInstanceIntFieldTrialPassed = function () {
        //(0:今日可扫荡层数,1:历史通关层数)
        var sweepCurrent = this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_TRIAL_PASSED_SHORT, 0);
        var trialCurrent = this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_TRIAL_PASSED_SHORT, 1);
        //var sweepCurrent: number = 1
        //var trialCurrent: number = 1
        return [sweepCurrent, trialCurrent];
        // //console.log({ sweepCurrent: sweepCurrent, trialCurrent: trialCurrent })
        // return { sweepCurrent: sweepCurrent, trialCurrent: trialCurrent }
    };
    InstanceData.prototype.getInstanceIntFieldXianfuDayTimes = function () {
        //仙府使用次数
        return this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_XIANFU_DAY_TIMES);
    };
    InstanceData.prototype.getInstanceIntFieldTrialSweep = function () {
        // (0:扫荡次数,1:可购买扫荡次数)
        var sweepNum = this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_TRIAL_SWEEP_SHORT, 0);
        var canBuyNum = this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_TRIAL_SWEEP_SHORT, 1);
        // var sweepNum: number = 1
        // var canBuyNum: number = 1
        ////console.log({ sweepNum: sweepNum, canBuyNum: canBuyNum })
        //return { sweepNum: sweepNum, canBuyNum: canBuyNum }
        return [sweepNum, canBuyNum];
    };
    /**活动次数 */
    InstanceData.prototype.getActivityNum = function ($idx) {
        return this.GetUInt32($idx);
    };
    /**通过ID活动次数 */
    InstanceData.prototype.getActivityNumByID = function ($id) {
        var idx = $id - 1 + SharedDef.INSTANCE_INT_FIELD_ACTIVE_START;
        return this.GetUInt32(idx);
    };
    /**活跃度数值 */
    InstanceData.prototype.getActivity = function () {
        return this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_ACTIVE);
    };
    //3v3参与次数
    InstanceData.prototype.getInstanceIntField3V3Times0 = function () {
        return this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_3V3_TIMES, 0);
    };
    //3v3购买次数
    InstanceData.prototype.getInstanceIntField3V3Times1 = function () {
        return this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_3V3_TIMES, 1);
    };
    //3v3每日奖励
    InstanceData.prototype.getInstanceIntField3V3DayReward = function () {
        var $arr = new Array;
        $arr.push(this.GetByte(SharedDef.INSTANCE_INT_FIELD_3V3_DAY_REWARD, 0));
        $arr.push(this.GetByte(SharedDef.INSTANCE_INT_FIELD_3V3_DAY_REWARD, 1));
        $arr.push(this.GetByte(SharedDef.INSTANCE_INT_FIELD_3V3_DAY_REWARD, 2));
        $arr.push(this.GetByte(SharedDef.INSTANCE_INT_FIELD_3V3_DAY_REWARD, 3));
        //console.log($arr)
        return $arr;
    };
    //3v3每日奖励领取
    InstanceData.prototype.get3V3DayRewardState = function (id) {
        return this.GetByte(SharedDef.INSTANCE_INT_FIELD_3V3_DAY_REWARD, id - 1) == 1;
    };
    /**活跃度奖励领取状态 */
    InstanceData.prototype.getActivityRewardState = function () {
        var ary = new Array;
        for (var i = 0; i < SharedDef.MAX_ACTIVE_COUNT; i++) {
            var idx = i * 2 + 2;
            ary.push(this.GetBit(SharedDef.INSTANCE_INT_FIELD_ACTIVE_REWARD, idx));
            ary.push(this.GetBit(SharedDef.INSTANCE_INT_FIELD_ACTIVE_REWARD, idx + 1));
        }
        return ary;
    };
    InstanceData.prototype.get1v1Records = function () {
        var ret = new Array;
        var cursor = this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_DOUJIANTAI_CURSOR);
        var last = (cursor - 1) % SharedDef.MAX_DOUJIANTAI_RECORD_COUNT;
        var start = cursor % SharedDef.MAX_DOUJIANTAI_RECORD_COUNT;
        if (last < start) {
            last += SharedDef.MAX_DOUJIANTAI_RECORD_COUNT;
        }
        //console.log(start, last);
        for (var i = start; i <= last; ++i) {
            var indx = i % SharedDef.MAX_DOUJIANTAI_RECORD_COUNT;
            var str = this.GetStr(SharedDef.INSTANCE_STR_FIELD_DOUJIANTAI_RECORD_START + indx);
            //console.log(str);
            if (str) {
                ret.push(str);
            }
        }
        return ret;
    };
    /**
     * 当日组队副本挑战次数购买次数
     */
    InstanceData.prototype.getBuyTeamCopyNum = function () {
        return this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_GROUP_INSTANCE_BUY_COUNT);
    };
    /**
     * 组队副本剩余挑战次数
     */
    InstanceData.prototype.getTeamCopyNum = function () {
        return this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_GROUP_INSTANCE_CHALLENGE_COUNT);
    };
    //排位赛胜利额外可领取奖励
    InstanceData.prototype.getQualifyExtra = function () {
        var ary = new Array;
        for (var i = 0; i < 3; i++) {
            ary.push(this.GetBit(SharedDef.INSTANCE_INT_FIELD_QUALIFY_EXTRA, i));
        }
        return ary;
    };
    //排位赛胜利额外已领取奖励
    InstanceData.prototype.getQualifyExtraPicked = function () {
        var ary = new Array;
        for (var i = 0; i < 3; i++) {
            ary.push(this.GetBit(SharedDef.INSTANCE_INT_FIELD_QUALIFY_EXTRA_PICKED, i));
        }
        return ary;
    };
    //排位赛每天次数
    InstanceData.prototype.getQualifyDailyTimes = function () {
        return this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_QUALIFY_DAILY_TIMES);
    };
    // 排位赛购买次数
    InstanceData.prototype.getQualifyBuyTimes = function () {
        return this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_QUALIFY_BUY_TIMES);
    };
    //排位赛记录
    InstanceData.prototype.getQualify1Log = function () {
        var ret = new Array;
        var cursor = this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_QUALIFY_CURSOR);
        var last = (cursor - 1) % SharedDef.MAX_QUALIFY_RECORD_COUNT;
        var start = cursor % SharedDef.MAX_QUALIFY_RECORD_COUNT;
        if (last < start) {
            last += SharedDef.MAX_QUALIFY_RECORD_COUNT;
        }
        //console.log(start, last);
        for (var i = start; i <= last; ++i) {
            var indx = i % SharedDef.MAX_QUALIFY_RECORD_COUNT;
            var str = this.GetStr(SharedDef.INSTANCE_STR_FIELD_QUALIFY_RECORD_START + indx);
            if (str) {
                ret.push(str);
            }
        }
        return ret;
    };
    /**
     * 个人boss次数回复时间戳
     */
    InstanceData.prototype.getPersonbosstime = function () {
        var aa = new Array;
        for (var i = SharedDef.INSTANCE_INT_FIELD_PRIVATE_BOSS_RECOVER_TIME_START; i < SharedDef.INSTANCE_INT_FIELD_PRIVATE_BOSS_RECOVER_TIME_END; i++) {
            aa.push(this.GetUInt32(i));
        }
        return aa;
    };
    InstanceData.prototype.getOpenPassBoxReceiveAry = function () {
        if (!this._passboxreceiveary) {
            this._passboxreceiveary = this.refreshBoxReceive();
        }
        return this._passboxreceiveary;
    };
    InstanceData.prototype.refreshBoxReceive = function () {
        var aa = new Array;
        for (var i = SharedDef.INSTANCE_INT_FIELD_STAGE_INSTANCE_BONUS_FLAG_START; i < SharedDef.INSTANCE_INT_FIELD_STAGE_INSTANCE_BONUS_FLAG_END; i++) {
            for (var j = 0; j < 32; j++) {
                aa.push(this.GetBit(i, j));
            }
        }
        return aa;
    };
    /**
     * 经验副本次数
     */
    InstanceData.prototype.getExptaskTimes = function () {
        return this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_GROUP_EXP_TIMES);
    };
    /**
     * 经验副本已购买次数
     */
    InstanceData.prototype.getExpBuyNum = function () {
        return this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_GROUP_EXP_BUYED_TIMES);
    };
    return InstanceData;
}(GuidObject));
//# sourceMappingURL=InstanceData.js.map