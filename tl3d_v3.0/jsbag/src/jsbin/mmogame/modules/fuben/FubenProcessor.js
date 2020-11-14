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
var fb;
(function (fb) {
    var FubenEvent = /** @class */ (function (_super) {
        __extends(FubenEvent, _super);
        function FubenEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FubenEvent.SHOW_FUBEN_EVENT = "SHOW_FUBEN_EVENT"; //显示面板
        //public static FUBEN_REFRESH: string = "FUBEN_REFRESH";
        FubenEvent.FUBEN_RANKING_DATA_EVENT = "FUBEN_RANKING_DATA_EVENT";
        FubenEvent.FUBEN_SHOW_FINISH_PANEL_EVENT = "FUBEN_SHOW_FINISH_PANEL_EVENT";
        FubenEvent.FUBEN_SHOW_REWARD_EVENT = "FUBEN_SHOW_REWARD_EVENT";
        FubenEvent.FUBEN_SHOW_FAIL_EVENT = "FUBEN_SHOW_FAIL_EVENT";
        FubenEvent.FUBEN_SHOW_LEFT_PANEL_EVENT = "FUBEN_SHOW_LEFT_PANEL_EVENT";
        FubenEvent.FUBEN_EXP_SHOW_LEFT_PANEL_EVENT = "FUBEN_EXP_SHOW_LEFT_PANEL_EVENT";
        FubenEvent.FUBEN_FACTION_SHOW_LEFT_PANEL_EVENT = "FUBEN_FACTION_SHOW_LEFT_PANEL_EVENT";
        FubenEvent.FUBEN_EXP_DATA_CHG_EVENT = "fuben_exp_data_chg_event";
        FubenEvent.FUBEN_FACTION_DATA_CHG_EVENT = "FUBEN_FACTION_DATA_CHG_EVENT";
        FubenEvent.FUBEN_BOSS_SHOW_LEFT_PANEL_EVENT = "FUBEN_BOSS_SHOW_LEFT_PANEL_EVENT";
        FubenEvent.REFRESH_FUBEN_SCENE_LEFT_QUEST = "REFRESH_FUBEN_SCENE_LEFT_QUEST";
        FubenEvent.FUBEN_TRIAL_RANK_LIST_QUERY_RESULT = "FUBEN_TRIAL_RANK_LIST_QUERY_RESULT"; // 更新到试练塔排行数据
        return FubenEvent;
    }(BaseEvent));
    fb.FubenEvent = FubenEvent;
    var FubenModule = /** @class */ (function (_super) {
        __extends(FubenModule, _super);
        function FubenModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FubenModule.prototype.getModuleName = function () {
            return "FubenModule";
        };
        FubenModule.prototype.listProcessors = function () {
            return [new FubenProcessor(),
                new fb.ExpProcessor()];
        };
        return FubenModule;
    }(Module));
    fb.FubenModule = FubenModule;
    var FubenProcessor = /** @class */ (function (_super) {
        __extends(FubenProcessor, _super);
        function FubenProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FubenProcessor.prototype.getName = function () {
            return "FubenProcessor";
        };
        FubenProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof FubenEvent) {
                var $fubenEvent = $event;
                if ($fubenEvent.type == FubenEvent.FUBEN_SHOW_LEFT_PANEL_EVENT) {
                    this.showFubenLeftPanel();
                }
                else if ($fubenEvent.type == FubenEvent.FUBEN_EXP_SHOW_LEFT_PANEL_EVENT) {
                    this.showExpFubenLeftPanel();
                    this.showFubenRightPanel();
                }
                else if ($fubenEvent.type == FubenEvent.FUBEN_BOSS_SHOW_LEFT_PANEL_EVENT) {
                    this.showFubenLeftBossPanel();
                }
                else if ($fubenEvent.type == FubenEvent.FUBEN_FACTION_SHOW_LEFT_PANEL_EVENT) {
                    this.showFactionFubenLeftPanel();
                }
                else if ($fubenEvent.type == FubenEvent.FUBEN_EXP_DATA_CHG_EVENT) {
                    if (this.expFubenLeftPanel) {
                        this.expFubenLeftPanel.refreshQuestList();
                    }
                }
                else if ($fubenEvent.type == FubenEvent.FUBEN_FACTION_DATA_CHG_EVENT) {
                    if (this.factionFubenLeftPanel) {
                        this.factionFubenLeftPanel.refresh();
                    }
                }
                else if ($fubenEvent.type == FubenEvent.REFRESH_FUBEN_SCENE_LEFT_QUEST) {
                    if (this.fubenLeftPanel) {
                        this.fubenLeftPanel.refreshQuestList();
                    }
                }
            }
            else if ($event instanceof topui.TopUiEvent) {
                if ($event.type == topui.TopUiEvent.REFRESH_TOP_LEFT_BUFF) {
                    if (this.expFubenLeftPanel && this.expFubenLeftPanel.hasStage) {
                        this.expFubenLeftPanel.refreshQuestList();
                    }
                }
            }
        };
        FubenProcessor.prototype.showFubenLeftPanel = function () {
            if (!this.fubenLeftPanel) {
                this.fubenLeftPanel = new fb.FubenLeftPanel();
            }
            UIManager.getInstance().addUIContainer(this.fubenLeftPanel);
            this.fubenLeftPanel.refresh();
            var stim = GameInstance.getGameSecond(GuidData.map.getMapIntFieldStartTm()) * 1000;
            if (stim > 0) {
                PopTimeOutUtil.show(PopTimeOutUtil.SHUGUAI, stim);
            }
        };
        FubenProcessor.prototype.showFubenLeftBossPanel = function () {
            if (!this.fubenBossLeftPanel) {
                this.fubenBossLeftPanel = new fb.FubenLeftBossPanel();
            }
            UIManager.getInstance().addUIContainer(this.fubenBossLeftPanel);
            this.fubenBossLeftPanel.refresh();
        };
        FubenProcessor.prototype.showExpFubenLeftPanel = function () {
            if (!this.expFubenLeftPanel) {
                this.expFubenLeftPanel = new fb.FubenLeftTeamPanel();
            }
            UIManager.getInstance().addUIContainer(this.expFubenLeftPanel);
            this.expFubenLeftPanel.refresh();
            var stim = GameInstance.getGameSecond(GuidData.map.getMapIntFieldStartTm()) * 1000;
            if (stim > 0) {
                PopTimeOutUtil.show(PopTimeOutUtil.SHUGUAI, stim, function () {
                    AotuSkillManager.getInstance().aotuBattle = true;
                    var endtime = GameInstance.getGameSecond(GuidData.map.getMapIntFieldQuestEndTm()) * 1000;
                    PopTimeOutUtil.show(PopTimeOutUtil.END, endtime);
                });
            }
            else {
                AotuSkillManager.getInstance().aotuBattle = true;
                var endtime = GameInstance.getGameSecond(GuidData.map.getMapIntFieldQuestEndTm()) * 1000;
                PopTimeOutUtil.show(PopTimeOutUtil.END, endtime);
            }
        };
        FubenProcessor.prototype.showFactionFubenLeftPanel = function () {
            if (!this.factionFubenLeftPanel) {
                this.factionFubenLeftPanel = new fb.FubenLeftFactionPanel();
            }
            UIManager.getInstance().addUIContainer(this.factionFubenLeftPanel);
            this.factionFubenLeftPanel.reset();
            this.factionFubenLeftPanel.refresh();
            var stim = GameInstance.getGameSecond(GuidData.map.getMapIntFieldStartTm()) * 1000;
            if (stim > 0) {
                PopTimeOutUtil.show(PopTimeOutUtil.PLAYGO, stim, function () {
                    AotuSkillManager.getInstance().aotuBattle = true;
                    var endtime = GameInstance.getGameSecond(GuidData.map.getMapIntFieldQuestEndTm()) * 1000;
                    PopTimeOutUtil.show(PopTimeOutUtil.END, endtime);
                });
            }
            else {
                AotuSkillManager.getInstance().aotuBattle = true;
                var endtime = GameInstance.getGameSecond(GuidData.map.getMapIntFieldQuestEndTm()) * 1000;
                PopTimeOutUtil.show(PopTimeOutUtil.END, endtime);
            }
        };
        FubenProcessor.prototype.showFubenRightPanel = function () {
            if (!this.fubenRightPanel) {
                this.fubenRightPanel = new fb.FubenRightPanel();
            }
            UIManager.getInstance().addUIContainer(this.fubenRightPanel);
        };
        FubenProcessor.prototype.showFubenRewardPanel = function ($vo) {
            var _this = this;
            if (!this.fubenRewardPanel) {
                this.fubenRewardPanel = new fb.FubenRewardPanel();
            }
            TimeUtil.addTimeOut(3000, function () {
                _this.fubenRewardPanel.load(function () {
                    _this.fubenRewardPanel.show($vo);
                });
            });
        };
        FubenProcessor.prototype.showFubenFailPanel = function () {
            var _this = this;
            this.fubenFailPanel = new fb.FubenFailPanel();
            this.fubenFailPanel.load(function () {
                _this.fubenFailPanel.show();
            });
        };
        FubenProcessor.prototype.listenModuleEvents = function () {
            return [
                new FubenEvent(FubenEvent.FUBEN_SHOW_LEFT_PANEL_EVENT),
                new FubenEvent(FubenEvent.REFRESH_FUBEN_SCENE_LEFT_QUEST),
                new FubenEvent(FubenEvent.FUBEN_SHOW_REWARD_EVENT),
                new FubenEvent(FubenEvent.FUBEN_SHOW_FAIL_EVENT),
                new FubenEvent(FubenEvent.FUBEN_EXP_SHOW_LEFT_PANEL_EVENT),
                new FubenEvent(FubenEvent.FUBEN_EXP_DATA_CHG_EVENT),
                new FubenEvent(FubenEvent.FUBEN_FACTION_DATA_CHG_EVENT),
                new FubenEvent(FubenEvent.FUBEN_FACTION_SHOW_LEFT_PANEL_EVENT),
                new FubenEvent(FubenEvent.FUBEN_BOSS_SHOW_LEFT_PANEL_EVENT),
                new topui.TopUiEvent(topui.TopUiEvent.REFRESH_TOP_LEFT_BUFF),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        FubenProcessor.prototype.smsgSendInstanceResult = function ($byte) {
            var $vo = new s2c_send_instance_result();
            s2c_send_instance_result.read($vo, $byte);
            //console.log($vo)
            if ($vo.state == MapInfo.STATE_249 && $vo.type != 15 && $vo.type != 7) {
                this.showFubenFailPanel();
            }
            else {
                this.showFubenRewardPanel($vo);
            }
        };
        FubenProcessor.prototype.teamTest = function ($byte) {
            var $vo = new s2c_check_for_group_enter();
            s2c_check_for_group_enter.read($vo, $byte);
            AlertUtil.show("", "");
            AlertUtil.show("组队？", "提示", function (a) {
                NetManager.getInstance().protocolos.select_group_enter(a);
            }, 2, ["确定", "取消"]);
            //select_group_enter
            //
            //console.log($vo)
        };
        FubenProcessor.prototype.getHanderMap = function () {
            var _this = this;
            var obj = new Object;
            obj[Protocols.SMSG_SEND_INSTANCE_RESULT] = function ($byte) { _this.smsgSendInstanceResult($byte); };
            obj[Protocols.SMSG_CHECK_FOR_GROUP_ENTER] = function ($byte) { _this.teamTest($byte); };
            return obj;
        };
        return FubenProcessor;
    }(BaseProcessor));
    fb.FubenProcessor = FubenProcessor;
})(fb || (fb = {}));
//# sourceMappingURL=FubenProcessor.js.map