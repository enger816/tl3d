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
var NetBaseProcessor = /** @class */ (function (_super) {
    __extends(NetBaseProcessor, _super);
    function NetBaseProcessor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._lasttime = 0;
        return _this;
    }
    NetBaseProcessor.prototype.getName = function () {
        return "NetBaseProcessor";
    };
    NetBaseProcessor.prototype.receivedModuleEvent = function ($event) {
    };
    NetBaseProcessor.prototype.getError = function ($byte) {
        if (!GameStart.ready) {
            return;
        }
        var $msgVo = new s2c_operation_failed();
        s2c_operation_failed.read($msgVo, $byte);
        var str = OperationFailedToString($msgVo.type, $msgVo.reason, $msgVo.data);
        msgtip.MsgTipManager.setMsgData($msgVo);
        if ($msgVo.type == 27 && ($msgVo.reason == 22 || $msgVo.reason == 37)) {
            this.showLevelUp(5);
        }
        else if ($msgVo.type == 20 && $msgVo.reason == 1) {
            var $massBossCdNum = GameInstance.getGameSecond(GuidData.player.getCDtime());
            if ($massBossCdNum > 0) {
                msgtip.MsgTipManager.outStr(getScencdStr($massBossCdNum) + "后可设置为和平模式", 99);
            }
        }
        else if ($msgVo.type == 27 && $msgVo.reason == 0) {
            this.showLevelUp(5);
            ModuleEventManager.dispatchEvent(new skillUi.SkillUiEvent(skillUi.SkillUiEvent.SKILL_UP_EVENT));
        }
        else if ($msgVo.type == 27 && $msgVo.reason == 1) {
            var aaa = new mountui.MountUiEvent(mountui.MountUiEvent.EFF_EVENT);
            aaa.data = $msgVo.data;
            ModuleEventManager.dispatchEvent(aaa);
        }
        else if ($msgVo.type == 27 && $msgVo.reason == 2) {
            this.showLevelUp(1);
        }
        else if ($msgVo.type == 27 && $msgVo.reason == 10) {
            this.showLevelUp(12);
        }
        else if ($msgVo.type == 27 && $msgVo.reason == 3) {
            this.showLevelUp(55);
        }
        else if ($msgVo.type == 27 && ($msgVo.reason == 9 || $msgVo.reason == 29 || $msgVo.reason == 30 || $msgVo.reason == 31 || $msgVo.reason == 32)) {
            this.showLevelUp(3);
            //console.log("---$msgVo.type，$msgVo.type----", $msgVo.type, $msgVo.reason);
        }
        else if ($msgVo.type == 27 && $msgVo.reason == 12) {
            this.showLevelUp(4);
        }
        else if ($msgVo.type == 27 && $msgVo.reason == 14) {
            this.showLevelUp(13);
        }
        else if ($msgVo.type == 27 && $msgVo.reason == 15) {
            this.showLevelUp(14);
        }
        else if ($msgVo.type == 27 && $msgVo.reason == 16) {
            ModuleEventManager.dispatchEvent(new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.EFF_EVENT));
            this.showLevelUp(2);
        }
        else if ($msgVo.type == 27 && $msgVo.reason == 17) {
            ModuleEventManager.dispatchEvent(new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.EFF_EVENT));
            this.showLevelUp(15);
        }
        else if ($msgVo.type == 27 && $msgVo.reason == 18) {
            this.showLevelUp(16);
        }
        else if ($msgVo.type == 27 && $msgVo.reason == 21) {
            this.showLevelUp(17);
        }
        else if ($msgVo.type == 27 && $msgVo.reason >= 25 && $msgVo.reason <= 27) {
            var poptips = new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.POP_TIPS_EVENT);
            poptips.data = [$msgVo.reason, $msgVo.data];
            ModuleEventManager.dispatchEvent(poptips);
        }
        else if ($msgVo.type == 27 && $msgVo.reason == 33) {
            this.showLevelUp(8);
        }
        else if ($msgVo.type == 27 && $msgVo.reason == 34) {
            this.showLevelUp(9);
        }
        else if ($msgVo.type == 27 && $msgVo.reason == 35) {
            this.showLevelUp(6);
        }
        else if ($msgVo.type == 27 && $msgVo.reason == 36) {
            this.showLevelUp(7);
        }
        else if ($msgVo.type == 27 && $msgVo.reason == 39) {
            this.showLevelUp(18);
        }
        else if ($msgVo.type == 27 && $msgVo.reason == 40) {
            var bbb = new wing.WingEvent(wing.WingEvent.EFF_EVENT);
            bbb.data = $msgVo.data;
            ModuleEventManager.dispatchEvent(bbb);
        }
        else if ($msgVo.type == 35 && $msgVo.reason == 0) {
            ModuleEventManager.dispatchEvent(new moneytree.MoneyTreeEvent(moneytree.MoneyTreeEvent.SHOW_EFF_MoneyTree_EVENT));
        }
        else if ($msgVo.type == 35 && $msgVo.reason == 1) {
            var bbb = new moneytree.MoneyTreeEvent(moneytree.MoneyTreeEvent.EFF_EVENT);
            bbb.data = $msgVo.data;
            ModuleEventManager.dispatchEvent(bbb);
        }
        if ($msgVo.type == OprateResult.OPRATE_TYPE_LOGIN && $msgVo.reason == OprateResult.OPRATE_RESULT_LOGINED_IN) {
            NetManager.getInstance().protocolos.forced_into();
            TimeUtil.addTimeOut(200, function () {
                var connetEvt = new LoginEvent(LoginEvent.LOGIN_RECONNET_EVENT);
                ModuleEventManager.dispatchEvent(connetEvt);
            });
            //console.log("强制登录");
        }
        if ($msgVo.type == OprateResult.OPRATE_TYPE_LOGIN && $msgVo.reason == OprateResult.OPRATE_RESULT_SCENED_ERROR) {
            var $indexUrl = window.location.toString();
            window.location.href = $indexUrl;
        }
    };
    /**
     * 各类提示
     */
    NetBaseProcessor.prototype.showLevelUp = function ($id) {
        var $obj = new msgtip.MsgPicData;
        $obj.type = 2; //加载图片
        $obj.info = getSuccesspromptUrl(String($id));
        var $MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_MSG_PIC_DATA);
        $MsgTipEvent.data = $obj;
        ModuleEventManager.dispatchEvent($MsgTipEvent);
    };
    NetBaseProcessor.prototype.guidObj = function ($byte) {
        GuidObjManager.getInstance().ApplyBlock($byte);
    };
    NetBaseProcessor.prototype.gridObj = function ($byte) {
        GuidObjManager.getInstance().ApplyBlock($byte);
    };
    NetBaseProcessor.prototype.guidCtrl = function ($byte) {
        // //console.log("对象更新协议控制");
    };
    NetBaseProcessor.prototype.sysTime = function ($byte) {
        GameInstance.gameSyncTime = new both_sync_mstime();
        both_sync_mstime.read(GameInstance.gameSyncTime, $byte);
        ////console.log("场景服时间同步");
        GameInstance.gameSyncClientTime = TimeUtil.getTimer();
    };
    NetBaseProcessor.prototype.sysOpenTime = function ($byte) {
        var sssot = new s2c_send_server_open_time();
        s2c_send_server_open_time.read(sssot, $byte);
        GameInstance.serverOpenTime = sssot.open_time;
    };
    NetBaseProcessor.prototype.sysAppTime = function ($byte) {
        GameInstance.appSynctTime = new both_sync_mstime_app();
        both_sync_mstime_app.read(GameInstance.appSynctTime, $byte);
        // //console.log("应用服时间同步");
        GameInstance.appSyncClientTime = TimeUtil.getTimer();
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.CORE_DATA_CREATED_EVENT));
    };
    NetBaseProcessor.prototype.gridMove = function ($byte) {
        GuidObjManager.getInstance().applyGridMove($byte);
    };
    NetBaseProcessor.prototype.gridJump = function ($byte) {
        //console.log("收到gridJump=>>")
        GuidObjManager.getInstance().applyGridJump($byte);
    };
    NetBaseProcessor.prototype.gridStop = function ($byte) {
        GuidObjManager.getInstance().applyGridStop($byte);
    };
    NetBaseProcessor.prototype.fight = function ($byte) {
        FightManager.getInstance().fightUpdate($byte);
    };
    NetBaseProcessor.prototype.task = function ($byte) {
        // //console.log("任务相关");
    };
    NetBaseProcessor.prototype.aiChat = function ($byte) {
        var chat = new s2c_chat_unit_talk();
        s2c_chat_unit_talk.read(chat, $byte);
        ////console.log("ai chat:" + chat.say);
    };
    NetBaseProcessor.prototype.listenModuleEvents = function () {
        return [];
    };
    NetBaseProcessor.prototype.smsgRankListQueryResult = function ($byte) {
        var rankTypeId = $byte.readUint32(); //回调ID
        var $selfLevel = $byte.readInt(); //自己的排名
        var allNum = $byte.readUint32(); //排行榜总长度
        var $list = new Array;
        var len = $byte.readShort();
        for (var i = 0; i < len; i++) {
            var $guidObject = new RankData();
            var $intLen = $byte.readShort();
            for (var j = 0; j < $intLen; j++) {
                var $intValue = $byte.readUint32();
                $guidObject.SetUInt32(j, $intValue);
            }
            var $strLen = $byte.readShort();
            for (var k = 0; k < $strLen; k++) {
                var $strValue = $byte.readUTF();
                $guidObject.SetStr(k, $strValue);
            }
            $list.push($guidObject);
        }
        switch (rankTypeId) {
            case SharedDef.RANK_TYPE_TRIAL:
                var fbevt = new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.SHOW_TOWER_RANK);
                fbevt.data = { list: $list, self: $selfLevel };
                ModuleEventManager.dispatchEvent(fbevt);
                break;
            case SharedDef.RANK_TYPE_SINGLE_PVP:
                var pvpevt = new kuafu.KuaFuEvent(kuafu.KuaFuEvent.KUAFU_ARENA_QUALIFY_RANK_EVENT);
                pvpevt.data = $selfLevel;
                ModuleEventManager.dispatchEvent(pvpevt);
                break;
            case SharedDef.RANK_TYPE_FACTION:
                //var evt:faction.FactionEvent = new faction.FactionEvent(faction.FactionEvent.FACTION_GET_LIST_EVENT);
                //evt.data = $list;
                //ModuleEventManager.dispatchEvent(evt);
                break;
            case SharedDef.RANK_TYPE_POWER://排行榜callbackid决定的返回结果
                // case SharedDef.RANK_TYPE_DOUJIANTAI:
                var evt = new ranking.RankingEvent(ranking.RankingEvent.RANKING_DATA_EVENT);
                var data = new ranking.RankQueryData();
                data.type = rankTypeId;
                data.rank = $selfLevel;
                data.list = $list;
                data.allNum = allNum;
                evt.data = data;
                ModuleEventManager.dispatchEvent(evt);
                break;
            case SharedDef.RANK_TYPE_DOUJIANTAI:
                var kuafuevt = new kuafu.KuaFuEvent(kuafu.KuaFuEvent.SHOW_DJT_RANK);
                kuafuevt.data = { list: $list, self: $selfLevel };
                ModuleEventManager.dispatchEvent(kuafuevt);
                break;
            case SharedDef.RANK_TYPE_3V3:
                var kuafuevt = new kuafu.KuaFuEvent(kuafu.KuaFuEvent.KUAFU_ARENA_3V3_RANK_EVENT);
                kuafuevt.data = { list: $list, self: $selfLevel, all: allNum };
                ModuleEventManager.dispatchEvent(kuafuevt);
                break;
            default:
                break;
        }
    };
    NetBaseProcessor.prototype.smsgExpUpData = function ($byte) {
        var $exp = $byte.readInt32();
        var $add = $byte.readUint8();
        // var $vipExp: number = $byte.readInt32();
        // var $color: string = "[ff00ff]"
        var $expStr = ($exp > 0 ? "+" : "") + Snum($exp);
        if ($exp > 0) {
            $expStr += "[" + $add + "%]";
            var bsc = GameInstance.mainChar;
            var $textJumpUiVo = new Pan3d.TextJumpUiVo();
            $textJumpUiVo.str = String($expStr);
            $textJumpUiVo.type = Pan3d.TextJumpType.EXPERIENCE;
            $textJumpUiVo.starttime = TimeUtil.getTimer();
            if ($textJumpUiVo.starttime - this._lasttime < 250) {
                $textJumpUiVo.starttime = this._lasttime + 250;
            }
            $textJumpUiVo.endtime = $textJumpUiVo.starttime + 1000;
            //飘字初始化位置均为玩家头顶
            this._lasttime = $textJumpUiVo.starttime;
            if (bsc) {
                $textJumpUiVo.pos = new Vector3D(bsc.x, bsc.y + bsc.tittleHeight - 5, bsc.z);
            }
            else {
                $textJumpUiVo.pos = new Vector3D(Scene_data.focus3D.x, Scene_data.focus3D.y, Scene_data.focus3D.z);
            }
            // //console.log("经验加了");
            BloodManager.getInstance().setExpJumpNum($textJumpUiVo);
            // console.log("----$exp---", $textJumpUiVo.starttime);
        }
    };
    NetBaseProcessor.prototype.smsgItemNotice = function ($byte) {
        var $vo = new s2c_item_notice;
        s2c_item_notice.read($vo, $byte);
        for (var i = 0; i < $vo.list.length; i++) {
            var $item_reward_info = $vo.list[i];
            var $obj = tb.TB_item_template.get_TB_item_template($item_reward_info.item_id);
            var $str = "[FFE57E]获得 " + getColorQua($obj.quality) + $obj.name + "[FFE57E]×" + $item_reward_info.num;
            // var $str: string = "[FFE57E]获得 " + $obj.getColorName() + "[FFE57E]×" + $item_reward_info.num;
            // var $str: string = "[ffffff]获得 " + $obj.name + "*" + $item_reward_info.num;
            //   var $str: string = "[b9d4f2]" + getServerAndName(kkk[0]) + $A.getColorName() + "[b9d4f2]获得" + $B.getColorName() + "[b9d4f2]x" + kkk[3];
            this.showTempTime(i * 150, $str, 3);
        }
        switch ($vo.showType) {
            case SharedDef.ITEM_SHOW_TYPE_MINI_QUEST_BAR:
                var $MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_SMSG_ITEM_NOTICE);
                $MsgTipEvent.data = $vo;
                ModuleEventManager.dispatchEvent($MsgTipEvent);
                break;
            case SharedDef.ITEM_SHOW_TYPE_MINI_QUEST_DAILY2:
                break;
            default:
        }
    };
    NetBaseProcessor.prototype.showTempTime = function ($time, $str, $type) {
        TimeUtil.addTimeOut($time, function () {
            msgtip.MsgTipManager.outStr($str, msgtip.MsgTipManager.getPopTypeByTB($type));
        });
    };
    NetBaseProcessor.prototype.msgClientsubscription = function ($byte) {
        //  //console.log("msgClientsubscription回来了");
        GuidObjManager.getInstance().msgClientsubscription($byte);
    };
    NetBaseProcessor.prototype.smsgCastSpellStart = function ($byte) {
        var $vo = new s2c_cast_spell_start;
        s2c_cast_spell_start.read($vo, $byte);
        var posItem = $vo.data.split("|");
        var $v2d = new Vector2D(Number(posItem[1]), Number(posItem[2]));
        var $v3d = AstarUtil.getWorldPosByStart2D($v2d);
        var $skillVo = tb.TB_skill_base.get_TB_skill_base($vo.spellid);
        if ($skillVo.alarmEffect) {
            //console.log("预警特效---->预警特效");
            $v3d.y = AstarUtil.getHeightByPos($v3d) + 1;
            $v3d.w = Number(posItem[0]);
            SceneCharManager.getInstance().addWarningEffectChar($v3d, $skillVo.alarmEffect);
        }
        else {
            var $skillFile = SkillManager.getInstance().getSkill(getSkillUrl($skillVo.effect_file), $skillVo.effect);
            if ($skillFile) {
                $skillFile.reset();
                //$skillFile.isDeath = false;
                var $play_Skill_Vo = Play_Skill_Vo.get_Play_Skill_Vo($skillVo.id);
                var $sc = SceneCharManager.getInstance().getSceneCharByUID($vo.caster_guid);
                if (!$sc) {
                    return;
                }
                //console.log("连续技能", TimeUtil.getTimer());
                if ($skillVo.is_remain == 1) {
                    $sc.isSinging = true;
                }
                else {
                    $sc.isSinging = false;
                }
                $skillFile.tbSkillId = $skillVo.id;
                FightManager.getInstance().playFixEffect($skillFile, $play_Skill_Vo, $v2d, $sc, null);
                if ($sc.unit.isMain) {
                    var $mainEvent = new mainUi.MainUiEvent(mainUi.MainUiEvent.PLAYER_SKILL_CD_REFRESH);
                    $mainEvent.data = $skillVo.id;
                    ModuleEventManager.dispatchEvent($mainEvent);
                    // if ($skillVo.is_remain) {
                    //     var $MsgTipEvent: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_SKILL_TIP_DATA)
                    //     $MsgTipEvent.data = $skillVo.icon;
                    //     ModuleEventManager.dispatchEvent($MsgTipEvent);
                    // }
                }
            }
        }
    };
    NetBaseProcessor.prototype.msgUseJumpPoint = function ($byte) {
        //console.log("接收到跳跃消息");
        var $id = $byte.readUint32();
        var $uintGuid = $byte.readUint32();
        var $vo = tb.TB_map_jump_point_detail.getTempByID($id);
        var $len = $vo.show.length;
        GuidObjManager.getInstance().applyJumpShow($uintGuid, $vo.show, $vo.last * 1000);
    };
    NetBaseProcessor.prototype.msgSpellStop = function ($byte) {
        var guidstr = $byte.readString();
        //console.log("msgSpellStop", guidstr);
        GuidObjManager.getInstance().msgSpellStop(guidstr);
    };
    NetBaseProcessor.prototype.smsgOfflineRewardResult = function ($byte) {
        //console.log("---离线数据");
        var $vo = new s2c_offline_reward_result;
        s2c_offline_reward_result.read($vo, $byte);
        var $evt = new offlinereward.OfflineRewardEvent(offlinereward.OfflineRewardEvent.SHOW_OFFLINE_REWARD_PANEL);
        $evt.data = $vo;
        TimeUtil.addTimeOut(2000, function () {
            ModuleEventManager.dispatchEvent($evt);
        });
    };
    NetBaseProcessor.prototype.bookResult = function ($byte) {
        var $vo = new s2c_booking_money_result;
        s2c_booking_money_result.read($vo, $byte);
        if ($vo.result) {
            GamePay.applyPay($vo.orderid);
        }
    };
    NetBaseProcessor.prototype.bookResult481 = function ($byte) {
        console.log("bookResult481==>");
        var $vo = new s2c_lottery_recharge_result;
        s2c_lottery_recharge_result.read($vo, $byte);
        console.log($vo.indx);
    };
    NetBaseProcessor.prototype.msgpingpong = function ($byte) {
        GameInstance.pingpontm = TimeUtil.getTimer();
        //console.log(GameInstance.pingpontm)
    };
    NetBaseProcessor.prototype.initPingPongTm = function () {
        TimeUtil.addTimeTick(10000, function () {
            if ((TimeUtil.getTimer() - GameInstance.pingpontm) > (2000 * 60)) {
                AlertUtil.show("你已经断开网络", "提示", function (flag) {
                    if (flag == 1) {
                        window.location.href = "index.html";
                    }
                }, 1);
            }
        });
    };
    NetBaseProcessor.prototype.getHanderMap = function () {
        var _this = this;
        // this.initPingPongTm()
        var obj = new Object;
        obj[Protocols.SMSG_OPERATION_FAILED] = function ($byte) { _this.getError($byte); };
        obj[Protocols.SMSG_UD_OBJECT] = function ($byte) { _this.guidObj($byte); };
        obj[Protocols.CMSG_UD_CONTROL] = function ($byte) { _this.guidCtrl($byte); };
        obj[Protocols.MSG_SYNC_MSTIME] = function ($byte) { _this.sysTime($byte); };
        obj[Protocols.MSG_SYNC_MSTIME_APP] = function ($byte) { _this.sysAppTime($byte); };
        obj[Protocols.SMSG_GRID_UD_OBJECT] = function ($byte) { _this.gridObj($byte); };
        obj[Protocols.SMSG_GRID_UD_OBJECT_2] = function ($byte) { _this.gridObj($byte); };
        obj[Protocols.SMSG_QUESTHELP_CANACCEPT_LIST] = function ($byte) { _this.task($byte); };
        obj[Protocols.SMSG_CHAT_UNIT_TALK] = function ($byte) { _this.aiChat($byte); };
        obj[Protocols.SMSG_GRID_UNIT_MOVE] = function ($byte) { _this.gridMove($byte); };
        obj[Protocols.SMSG_GRID_UNIT_JUMP] = function ($byte) { _this.gridJump($byte); };
        obj[Protocols.SMSG_EXP_UPDATE] = function ($byte) {
            //  //console.log("--经验来了---");
            _this.smsgExpUpData($byte);
        };
        obj[Protocols.SMSG_ITEM_NOTICE] = function ($byte) { _this.smsgItemNotice($byte); };
        obj[Protocols.MSG_CLIENTSUBSCRIPTION] = function ($byte) { _this.msgClientsubscription($byte); };
        obj[Protocols.SMSG_GRID_UNIT_MOVE_2] = function ($byte) { _this.gridMove($byte); };
        obj[Protocols.MSG_MOVE_STOP] = function ($byte) { _this.gridStop($byte); };
        obj[Protocols.SMSG_FIGHTING_INFO_UPDATE_OBJECT] = function ($byte) { _this.fight($byte); };
        obj[Protocols.SMSG_FIGHTING_INFO_UPDATE_OBJECT_2] = function ($byte) { _this.fight($byte); };
        obj[Protocols.SMSG_RANK_LIST_QUERY_RESULT] = function ($byte) { _this.smsgRankListQueryResult($byte); };
        obj[Protocols.MSG_USE_JUMP_POINT] = function ($byte) { _this.msgUseJumpPoint($byte); };
        obj[Protocols.SMSG_CAST_SPELL_START] = function ($byte) { _this.smsgCastSpellStart($byte); };
        obj[Protocols.MSG_SPELL_STOP] = function ($byte) { _this.msgSpellStop($byte); };
        obj[Protocols.SMSG_OFFLINE_REWARD_RESULT] = function ($byte) { _this.smsgOfflineRewardResult($byte); };
        obj[Protocols.SMSG_SEND_SERVER_OPEN_TIME] = function ($byte) { _this.sysOpenTime($byte); };
        obj[Protocols.SMSG_BOOKING_MONEY_RESULT] = function ($byte) { _this.bookResult($byte); };
        obj[Protocols.SMSG_LOTTERY_RECHARGE_RESULT] = function ($byte) { _this.bookResult481($byte); };
        obj[Protocols.MSG_PING_PONG] = function ($byte) { _this.msgpingpong($byte); };
        return obj;
    };
    return NetBaseProcessor;
}(BaseProcessor));
//# sourceMappingURL=NetBaseProcessor.js.map