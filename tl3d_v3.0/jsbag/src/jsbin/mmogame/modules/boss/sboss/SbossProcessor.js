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
var sboss;
(function (sboss) {
    var SbossModule = /** @class */ (function (_super) {
        __extends(SbossModule, _super);
        function SbossModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SbossModule.prototype.getModuleName = function () {
            return "SbossModule";
        };
        SbossModule.prototype.listProcessors = function () {
            return [new SbossProcessor()];
        };
        return SbossModule;
    }(Module));
    sboss.SbossModule = SbossModule;
    var SbossEvent = /** @class */ (function (_super) {
        __extends(SbossEvent, _super);
        function SbossEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SbossEvent.SHOW_SBOSS_PANEL = "SHOW_SBOSS_PANEL";
        SbossEvent.HIDE_SBOSS_PANEL = "HIDE_SBOSS_PANEL";
        SbossEvent.SHOW_GZ_EVENT = "SHOW_GZ_EVENT";
        SbossEvent.SHOW_BOSSINFO_EVENT = "SHOW_BOSSINFO_EVENT";
        SbossEvent.SELECT_MESH_BOSS_ID = "SELECT_MESH_BOSS_ID";
        SbossEvent.REFRISH_LIST_DATA = "REFRISH_LIST_DATA";
        SbossEvent.REFRISH_SBOSS_PANEL = "REFRISH_SBOSS_PANEL";
        SbossEvent.WBOSS_STATE_CHG = "WBOSS_STATE_CHG";
        SbossEvent.WBOSS_MORE_REWARD = "WBOSS_MORE_REWARD";
        SbossEvent.PBOSS_REFRISH_PANEL = "PBOSS_REFRISH_PANEL";
        SbossEvent.SET_LASTID = "SET_LASTID";
        return SbossEvent;
    }(BaseEvent));
    sboss.SbossEvent = SbossEvent;
    var SbossProcessor = /** @class */ (function (_super) {
        __extends(SbossProcessor, _super);
        function SbossProcessor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._nodeInit = false;
            _this._lastId = 0;
            return _this;
        }
        SbossProcessor.prototype.getName = function () {
            return "SbossProcessor";
        };
        SbossProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof SbossEvent) {
                var $SbossEvent = $event;
                if ($SbossEvent.type == SbossEvent.SHOW_SBOSS_PANEL) {
                    this.showPanel($SbossEvent.data);
                }
                else if ($SbossEvent.type == SbossEvent.SHOW_BOSSINFO_EVENT) {
                    this.showbossinfo($SbossEvent.data);
                }
                else if ($SbossEvent.type == SbossEvent.SHOW_GZ_EVENT) {
                    this.showgz();
                }
                else if ($SbossEvent.type == SbossEvent.SET_LASTID) {
                    this._lastId = 0;
                }
                if (this.sbossPanel && this.sbossPanel.hasStage) {
                    if ($SbossEvent.type == SbossEvent.SELECT_MESH_BOSS_ID) {
                        this.sbossPanel.smassBossPanel.selectMeshBossByVo($SbossEvent.selectMeshBossVo);
                    }
                    else if ($SbossEvent.type == SbossEvent.REFRISH_LIST_DATA) {
                        this.sbossPanel.smassBossPanel.refrishListData();
                    }
                    else if ($SbossEvent.type == SbossEvent.REFRISH_SBOSS_PANEL) {
                        this.sbossPanel.smassBossPanel.refristhPanel();
                    }
                    else if ($SbossEvent.type == SbossEvent.WBOSS_STATE_CHG) {
                        this.wbossChg();
                    }
                    else if ($SbossEvent.type == SbossEvent.PBOSS_REFRISH_PANEL) {
                        this.sbossPanel.personBossPanel.selectMeshBossByVo($SbossEvent.data);
                        // } else if ($SbossEvent.type == SbossEvent.PBOSS_REDPOINT_CHG) {
                        //     //console.log("-------------------红点处理--------------------");
                        //     this.processRedPoint();
                    }
                }
                if ($SbossEvent.type == SbossEvent.WBOSS_MORE_REWARD) {
                    this.showBossReward();
                }
            }
            else if ($event.type == EngineEvent.PLAYER_FIELD_VIP_LEVEL) {
                if (this.sbossPanel && this.sbossPanel.smassBossPanel && this.sbossPanel.smassBossPanel.hasStage) {
                    this.sbossPanel.smassBossPanel.refristhPanel();
                }
            }
            else if ($event.type == EngineEvent.CORE_DATA_COMPLETE_EVENT) {
                //红点初始化
                this.initRedNode();
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this.bossGz) {
                    this.bossGz.dispose();
                    this.bossGz = null;
                    //console.log("释放面板 leaguegz")
                }
            }
        };
        SbossProcessor.prototype.showbossinfo = function ($data) {
            var _this = this;
            if (!this.bossInfoPanel) {
                this.bossInfoPanel = new sboss.BossInfoPanel();
            }
            this.bossInfoPanel.load(function () {
                //停止绘制前面的ui
                _this.bossInfoPanel.show($data);
            });
        };
        SbossProcessor.prototype.showgz = function () {
            var _this = this;
            if (!this.bossGz) {
                this.bossGz = new sboss.BossGz();
            }
            this.bossGz.load(function () {
                //停止绘制前面的ui
                _this.bossGz.show();
            });
        };
        SbossProcessor.prototype.initRedNode = function () {
            var _this = this;
            if (this._nodeInit) {
                return;
            }
            var pnode119 = RedPointManager.getInstance().getNodeByID(119);
            var $arr119 = sboss.SbossModel.getInstance().getPersonBossItemData();
            for (var i = 0; i < $arr119.length; i++) {
                var node = new RedPointNode();
                node.data = $arr119[i].data;
                pnode119.addChild(node);
            }
            this._nodeInit = true;
            this.initQuestFlag();
            this.initTrainingQuestFlag();
            this.setNewDateTime();
            TimeUtil.addTimeTick(1000, function () { _this.gameTimeTick(); });
        };
        SbossProcessor.prototype.setNewDateTime = function () {
            var $ts = GameInstance.getServerNow();
            var $play = new Date($ts * 1000);
            $play.setDate($play.getDate() + 1);
            $play.setHours(0);
            $play.setMinutes(0);
            $play.setSeconds(0);
            $play.setMilliseconds(0);
            this._newdateTime = $play.getTime();
            //console.log("---------$play----------", $play);
        };
        SbossProcessor.prototype.compareTime = function () {
            //服务器当前标准时间
            var $ts = GameInstance.getServerNow();
            var $sever = new Date($ts * 1000);
            //越过时间
            var $endt = $sever.getTime() - this._newdateTime;
            if ($endt >= 0) {
                this.setNewDateTime();
                return true;
            }
            //未到达指定时间
            return false;
        };
        /**
         * 初始化日常任务状态位
         */
        SbossProcessor.prototype.initQuestFlag = function () {
            if (this.showquestPanel) {
                return;
            }
            this.showquestPanel = new Array;
            for (var i = 0; i < 6; i++) {
                this.showquestPanel.push(false);
            }
            var aaa = quest.QuestModel.getInstance().getQuestDailyVo();
            if (aaa && aaa.length > 0) {
                for (var i = 0; i < aaa.length; i++) {
                    var complete = aaa[i].questDataVo.taskState == SharedDef.QUEST_STATUS_END;
                    if (!complete) {
                        var cansubmit;
                        if (aaa[i].tb_quest.targetsPosition[0][0] == 6) {
                            cansubmit = GuidData.bag.getItemCount(aaa[i].tb_quest.targetsPosition[0][aaa[i].tb_quest.targetsPosition[0].length - 1]) >= aaa[i].questDataVo.items[0].num;
                        }
                        else {
                            cansubmit = aaa[i].questDataVo.items[0].process >= aaa[i].questDataVo.items[0].num;
                        }
                        if (cansubmit) {
                            //可交付
                            this.showquestPanel[aaa[i].index] = true;
                        }
                    }
                }
            }
        };
        /**
         * 初始化历练任务状态位
         */
        SbossProcessor.prototype.initTrainingQuestFlag = function () {
            if (this.showTrainingquestPanel) {
                return;
            }
            var bbb = training.TrainingModel.getInstance().getTaskvo();
            this.showTrainingquestPanel = new Array;
            for (var i = 0; i < bbb.length; i++) {
                this.showTrainingquestPanel.push(false);
            }
            if (bbb && bbb.length > 0) {
                for (var i = 0; i < bbb.length; i++) {
                    var vo = bbb[i];
                    if (vo.questData != null && vo.questData.taskState != SharedDef.QUEST_STATUS_END) {
                        if (GuidData.player.getResType(vo.tab_adventure.upres[0]) >= vo.tab_adventure.upres[1]) {
                            //可交付
                            this.showTrainingquestPanel[vo.questData.indx] = true;
                        }
                    }
                }
            }
        };
        SbossProcessor.prototype.gameTimeTick = function () {
            this.processRedPoint();
            this.questPanel();
            this.bossTips();
            this.TrainingquestPanel();
            if (this.compareTime()) {
                //0点重置
                var $ts = GameInstance.getServerNow();
                var $sever = new Date($ts * 1000);
                //console.log("--------------------------------------------------------------------", "-----0点重置-----", $sever);
                this.reset0();
            }
        };
        SbossProcessor.prototype.reset0 = function () {
            for (var i = 0; i < this.showquestPanel.length; i++) {
                this.showquestPanel[i] = false;
            }
            for (var j = 0; j < this.showTrainingquestPanel.length; j++) {
                this.showTrainingquestPanel[j] = false;
            }
        };
        SbossProcessor.prototype.getBossName = function ($bossEntry) {
            var $tb_Vo = tb.TB_creature_template.get_TB_creature_template($bossEntry);
            return $tb_Vo.name;
        };
        SbossProcessor.prototype.bossTips = function () {
            var $tbDataArr = sboss.SbossModel.getInstance().getItemData();
            for (var i = $tbDataArr.length - 1; i >= 0; i--) {
                var meshbossvo = $tbDataArr[i].data;
                var $tm = GameInstance.getGameSecond(meshbossvo.time);
                // //console.log("----全民Boss----", meshbossvo.tb.id, $tm);
                if (!meshbossvo.flag && $tm <= 0) {
                    meshbossvo.flag = true;
                    //boss刷新
                    var curid = meshbossvo.tb.id * 100;
                    if (this._lastId < curid && GameData.configData.getopen_prompting_sboss(i)) {
                        var $evt = new topui.TopUiEvent(topui.TopUiEvent.REFRESH_TOP_PANDA_TIP);
                        $evt.data = ColorType.Brown7a2f21 + "全民BOSS:" + ColorType.Redd92200 + this.getBossName(meshbossvo.tb.bossEntry) + ColorType.Brown7a2f21 + "可挑战了！";
                        ModuleEventManager.dispatchEvent($evt);
                        this._lastId = curid;
                    }
                    return;
                }
            }
            var $tbDataArr1 = sboss.SbossModel.getInstance().getPersonBossItemData();
            for (var j = $tbDataArr1.length - 1; j >= 0; j--) {
                var personvo = $tbDataArr1[j].data;
                if (personvo.openstate) {
                    var $tm = GameInstance.getGameSecond(personvo.times);
                    // //console.log("----个人Boss----", personvo.tabbossinfo.id, $tm, this._lastId);
                    if (!personvo.flag && $tm <= 0) {
                        personvo.flag = true;
                        //boss刷新
                        var curid = personvo.tabbossinfo.id;
                        if (this._lastId < curid && GameData.configData.getopen_prompting_pboss(i)) {
                            var $evt = new topui.TopUiEvent(topui.TopUiEvent.REFRESH_TOP_PANDA_TIP);
                            $evt.data = ColorType.Brown7a2f21 + "个人BOSS:" + ColorType.Redd92200 + this.getBossName(personvo.tabbossinfo.bossEntry) + ColorType.Brown7a2f21 + "可挑战了！";
                            ModuleEventManager.dispatchEvent($evt);
                            this._lastId = curid;
                        }
                        return;
                    }
                }
            }
        };
        SbossProcessor.prototype.questPanel = function () {
            var aaa = quest.QuestModel.getInstance().getQuestDailyVo();
            if (aaa && aaa.length > 0) {
                for (var i = 0; i < aaa.length; i++) {
                    var complete = aaa[i].questDataVo.taskState == SharedDef.QUEST_STATUS_END;
                    if (!complete) {
                        var cansubmit;
                        if (aaa[i].tb_quest.targetsPosition[0][0] == 6) {
                            cansubmit = GuidData.bag.getItemCount(aaa[i].tb_quest.targetsPosition[0][aaa[i].tb_quest.targetsPosition[0].length - 1]) >= aaa[i].questDataVo.items[0].num;
                        }
                        else {
                            cansubmit = aaa[i].questDataVo.items[0].process >= aaa[i].questDataVo.items[0].num;
                        }
                        if (cansubmit && !this.showquestPanel[aaa[i].index]) {
                            //可交付
                            ModulePageManager.openPanel(SharedDef.MODULE_DAILY_TASKS);
                            this.showquestPanel[aaa[i].index] = true;
                            break;
                        }
                    }
                }
            }
        };
        SbossProcessor.prototype.TrainingquestPanel = function () {
            var bbb = training.TrainingModel.getInstance().getTaskvo();
            if (bbb && bbb.length > 0) {
                for (var i = 0; i < bbb.length; i++) {
                    var vo = bbb[i];
                    if (vo.questData != null && vo.questData.taskState != SharedDef.QUEST_STATUS_END) {
                        if (GuidData.player.getResType(vo.tab_adventure.upres[0]) >= vo.tab_adventure.upres[1]) {
                            //可交付
                            if (!this.showTrainingquestPanel[vo.questData.indx]) {
                                ModulePageManager.openPanel(SharedDef.MODULE_EXP, SharedDef.MODULE_EXP_QUEST);
                                this.showTrainingquestPanel[vo.questData.indx] = true;
                                break;
                            }
                        }
                    }
                }
            }
        };
        SbossProcessor.prototype.processRedPoint = function () {
            //福利红点变化
            ModuleEventManager.dispatchEvent(new welfare.WelfareEvent(welfare.WelfareEvent.CHG_REDPOINT));
            //个人boss和全民boss红点变化
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_BOSS, SharedDef.MODULE_BOSS_PERSON_BOSS)) {
                var $arr119 = sboss.SbossModel.getInstance().getPersonBossItemData();
                var ary119 = RedPointManager.getInstance().getNodeByID(119).children;
                for (var j = 0; j < ary119.length; j++) {
                    ary119[j].data = $arr119[j].data;
                    var aa = $arr119[j].data;
                    ary119[j].show = aa.openstate && aa.hasTims() > 0;
                }
            }
            //我要变弱红点变化
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_FISH, SharedDef.MODULE_FISH_ALL)) {
                var node123 = RedPointManager.getInstance().getNodeByID(123);
                var redary = chgfish.ChgfishModel.getInstance().getList();
                node123.show = redary.length > 0;
            }
        };
        SbossProcessor.prototype.hidePanel = function () {
            this.sbossPanel.hide();
        };
        SbossProcessor.prototype.showPanel = function ($data) {
            var _this = this;
            if (!this.sbossPanel) {
                this.sbossPanel = new sboss.SbossPanel();
            }
            this.sbossPanel.load(function () {
                if (!$data) {
                    $data = _this._lastId < 100 ? SharedDef.MODULE_BOSS_PERSON_BOSS : SharedDef.MODULE_BOSS_RISK_BOSS;
                }
                _this.sbossPanel.show($data);
                var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
                $scenePange.data = SharedDef.MODULE_BOSS;
                ModuleEventManager.dispatchEvent($scenePange);
            }, true);
        };
        SbossProcessor.prototype.showBossReward = function () {
            var _this = this;
            if (!this._rewardPanel) {
                this._rewardPanel = new sboss.WbossRewardPanel();
            }
            this._rewardPanel.load(function () {
                _this._rewardPanel.show();
            });
        };
        SbossProcessor.prototype.wbossChg = function () {
            if (this.sbossPanel && this.sbossPanel.hasStage) {
                this.sbossPanel.wbossChg();
            }
        };
        SbossProcessor.prototype.listenModuleEvents = function () {
            return [
                new SbossEvent(SbossEvent.SHOW_SBOSS_PANEL),
                new SbossEvent(SbossEvent.SHOW_GZ_EVENT),
                new SbossEvent(SbossEvent.SHOW_BOSSINFO_EVENT),
                new SbossEvent(SbossEvent.HIDE_SBOSS_PANEL),
                new SbossEvent(SbossEvent.SELECT_MESH_BOSS_ID),
                new SbossEvent(SbossEvent.REFRISH_LIST_DATA),
                new SbossEvent(SbossEvent.REFRISH_SBOSS_PANEL),
                new SbossEvent(SbossEvent.WBOSS_STATE_CHG),
                new SbossEvent(SbossEvent.WBOSS_MORE_REWARD),
                // new SbossEvent(SbossEvent.PBOSS_REDPOINT_CHG),
                new SbossEvent(SbossEvent.PBOSS_REFRISH_PANEL),
                new SbossEvent(SbossEvent.SET_LASTID),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.PLAYER_FIELD_VIP_LEVEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        SbossProcessor.prototype.smsgMassBossInfoRet = function ($byte) {
            if (this.sbossPanel && this.sbossPanel.hasStage) {
                var $personnum = $byte.readUint32();
                var $bloodnum = $byte.readByte();
                //console.log($personnum, $bloodnum)
            }
        };
        SbossProcessor.prototype.smsgMassBossRandResult = function ($byte) {
            var _this = this;
            var $data = new s2c_mass_boss_rank_result();
            s2c_mass_boss_rank_result.read($data, $byte);
            ////console.log($data)
            // if (!this.sbossRandPanel) {
            //     this.sbossRandPanel = new SbossRandPanel();
            // }
            // this.sbossRandPanel.load(() => {
            //     this.sbossRandPanel.setRandData($data);
            // }, false);
            if (!this._rankPanle) {
                this._rankPanle = new WindowRankPanel();
            }
            var list = new Array;
            for (var i = 0; i < $data.info.length; i++) {
                var $obj = new WindowRankVo();
                $obj.rank = String(i + 1);
                $obj.name = getBaseName($data.info[i].name);
                $obj.val = (float2int($data.info[i].value * 100) / 100) + "%";
                list.push($obj);
            }
            this._rankPanle.load(function () {
                _this._rankPanle.show(["排名", "玩家名字", "伤害"], list, "");
            });
        };
        SbossProcessor.prototype.getHanderMap = function () {
            var _this = this;
            var obj = new Object;
            obj[Protocols.SMSG_MASS_BOSS_INFO_RET] = function ($byte) { _this.smsgMassBossInfoRet($byte); };
            obj[Protocols.SMSG_MASS_BOSS_RANK_RESULT] = function ($byte) { _this.smsgMassBossRandResult($byte); };
            return obj;
        };
        return SbossProcessor;
    }(BaseProcessor));
    sboss.SbossProcessor = SbossProcessor;
})(sboss || (sboss = {}));
//# sourceMappingURL=SbossProcessor.js.map