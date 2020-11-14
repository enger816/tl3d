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
var divinesword;
(function (divinesword) {
    var DivineswordModule = /** @class */ (function (_super) {
        __extends(DivineswordModule, _super);
        function DivineswordModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DivineswordModule.prototype.getModuleName = function () {
            return "DivineswordModule";
        };
        DivineswordModule.prototype.listProcessors = function () {
            return [new DivineswordProcessor()];
        };
        return DivineswordModule;
    }(Module));
    divinesword.DivineswordModule = DivineswordModule;
    var DivineswordEvent = /** @class */ (function (_super) {
        __extends(DivineswordEvent, _super);
        function DivineswordEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DivineswordEvent.SHOW_TRAINING_PANEL = "SHOW_TRAINING_PANEL";
        DivineswordEvent.HIDE_TRAINING_PANEL = "HIDE_TRAINING_PANEL";
        // public static REFRESH_TRAINING_PANEL: string = "REFRESH_TRAINING_PANEL";
        DivineswordEvent.REFRESH_SKILL_PANEL = "REFRESH_SKILL_PANEL";
        return DivineswordEvent;
    }(BaseEvent));
    divinesword.DivineswordEvent = DivineswordEvent;
    var DivineswordProcessor = /** @class */ (function (_super) {
        __extends(DivineswordProcessor, _super);
        function DivineswordProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DivineswordProcessor.prototype.getName = function () {
            return "DivineswordProcessor";
        };
        DivineswordProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof DivineswordEvent) {
                var evt = $event;
                if (evt.type == DivineswordEvent.SHOW_TRAINING_PANEL) {
                    this.showPanel(evt.data);
                }
                if (evt.type == DivineswordEvent.HIDE_TRAINING_PANEL) {
                    this.hidePanel();
                }
                // if (evt.type == DivineswordEvent.REFRESH_TRAINING_PANEL) {
                //     this.refreshtask()
                // }
                if (evt.type == DivineswordEvent.REFRESH_SKILL_PANEL) {
                    if (this.divineswordUiPanel && this.divineswordUiPanel.divineswordSkill && this.divineswordUiPanel.hasStage) {
                        this.divineswordUiPanel.divineswordSkill.refreshLev();
                    }
                }
            }
            if ($event instanceof EngineEvent) {
                var $engineEvent = $event;
                if ($engineEvent.type == EngineEvent.SYSTEM_OPEN_EVENT) {
                    this.refreshNode();
                }
                else if ($engineEvent.type == EngineEvent.CORE_DATA_COMPLETE_EVENT) {
                    this.initNode();
                }
                else if ($engineEvent.type == EngineEvent.MONEY_CHANGE) {
                    this.refreshNode();
                    // if (this.divineswordUiPanel && this.divineswordUiPanel.divineswordTask && this.divineswordUiPanel.divineswordTask.hasStage) {
                    //     this.divineswordUiPanel.divineswordTask.refreshCurCardNum();
                    // }
                    if (this.divineswordUiPanel && this.divineswordUiPanel.divineswordSkill && this.divineswordUiPanel.divineswordSkill.hasStage) {
                        this.divineswordUiPanel.divineswordSkill.updataRes();
                    }
                }
                else if ($engineEvent.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                    if (this.divineswordUiPanel) {
                        this.divineswordUiPanel.refreshOpenLev();
                    }
                }
            }
            if ($event instanceof skillUi.SkillUiEvent) {
                var skillevent = $event;
                if (skillevent.type == skillUi.SkillUiEvent.SKILL_UP_EVENT) {
                    this.showSkillUpEff();
                }
            }
            if ($event instanceof mountui.MountUiEvent) {
                var mountevent = $event;
                if (mountevent.type == mountui.MountUiEvent.MOUNT_LEVET_STAR_CHANGE_EVENT) {
                    this.refreSel();
                }
            }
            if ($event instanceof wing.WingEvent) {
                var wingevent = $event;
                if (wingevent.type == wing.WingEvent.WING_ID_CHANG_EVENT) {
                    this.refreSel();
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this.divineswordUiPanel) {
                    this.divineswordUiPanel.dispose();
                    this.divineswordUiPanel = null;
                    //console.log("释放面板 trainingUiPanel")
                }
            }
        };
        DivineswordProcessor.prototype.refreSel = function () {
            if (this.divineswordUiPanel && this.divineswordUiPanel.divineswordSkill) {
                this.divineswordUiPanel.divineswordSkill.refreshSel();
            }
        };
        DivineswordProcessor.prototype.showSkillUpEff = function () {
            if (this.divineswordUiPanel && this.divineswordUiPanel.divineswordSkill && this.divineswordUiPanel.divineswordSkill.hasStage) {
                this.divineswordUiPanel.divineswordSkill.showSkillUpEff();
            }
        };
        DivineswordProcessor.prototype.initNode = function () {
            var tabary = tb.TB_adventure_skill_base.get_TB_quest_adventure_base();
            var pnode = RedPointManager.getInstance().getNodeByID(137);
            for (var i = 0; i < tabary.length; i++) {
                var node = new RedPointNode();
                node.data = tabary[i];
                pnode.addChild(node);
            }
            this.refreshNode();
        };
        DivineswordProcessor.prototype.refreshNode = function () {
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_GW, SharedDef.MODULE_GW_ALL)) {
                if (GuidData.player.isOpenSystemNeedShow(SharedDef.MODULE_GW)) {
                    this.refreshNodeByID(137);
                    if (this.divineswordUiPanel && this.divineswordUiPanel.divineswordSkill && this.divineswordUiPanel.divineswordSkill.hasStage) {
                        this.divineswordUiPanel.divineswordSkill.refreshredpoint();
                    }
                }
            }
        };
        DivineswordProcessor.prototype.refreshNodeByID = function ($id) {
            var ary = RedPointManager.getInstance().getNodeByID($id).children;
            for (var i = 0; i < ary.length; i++) {
                var tab = ary[i].data;
                if (tab.prev_limit[0]) {
                    if (!training.TrainingModel.getInstance().getprev_limitflag(tab.prev_limit[0])) {
                        ary[i].show = false;
                    }
                    else {
                        //判断道具足够不
                        ary[i].show = this.hasResEnough(tab);
                    }
                }
                else {
                    //判断道具足够不
                    ary[i].show = this.hasResEnough(tab);
                }
            }
        };
        DivineswordProcessor.prototype.hasResEnough = function (tab) {
            var lev = GuidData.player.getPassiveSkillLev(tab.id);
            var baseData = TableData.getInstance().getData(TableData.tb_skill_base, tab.id);
            var nexttab = TableData.getInstance().getData(TableData.tb_skill_uplevel, (baseData.uplevel_id[0] + lev));
            if (lev > (baseData.uplevel_id[1] - baseData.uplevel_id[0])) {
                nexttab = null;
            }
            if (nexttab == null) {
                return false;
            }
            var costitem = tab.cost[0];
            if (lev > 0) {
                costitem = tb.TB_skill_uplevel.get_TB_skill_uplevel(baseData.uplevel_id[0] + lev - 1).uplevel_cost[0];
            }
            if (hasEnoughRes(costitem)) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * 服务端任务状态变化
         */
        // private refreshtask() {
        //     training.TrainingModel.getInstance().refreshTaskAry();
        //     if (this.divineswordUiPanel && this.divineswordUiPanel.divineswordTask && this.divineswordUiPanel.divineswordTask.hasStage) {
        //         this.divineswordUiPanel.divineswordTask.refreshServerData();
        //     }
        // }
        DivineswordProcessor.prototype.hidePanel = function () {
            if (this.divineswordUiPanel) {
                this.divineswordUiPanel.hide();
            }
        };
        DivineswordProcessor.prototype.showPanel = function ($data) {
            var _this = this;
            if (!this.divineswordUiPanel) {
                this.divineswordUiPanel = new divinesword.DivineswordUiPanel();
            }
            this.divineswordUiPanel.load(function () {
                //console.log("--$data---", $data);
                // if (!$data) {
                //     $data = SharedDef.MODULE_EXP_QUEST
                // }
                _this.divineswordUiPanel.show($data);
                var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
                $scenePange.data = SharedDef.MODULE_GW;
                ModuleEventManager.dispatchEvent($scenePange);
            }, false);
        };
        DivineswordProcessor.prototype.listenModuleEvents = function () {
            return [
                new DivineswordEvent(DivineswordEvent.SHOW_TRAINING_PANEL),
                new DivineswordEvent(DivineswordEvent.HIDE_TRAINING_PANEL),
                // new DivineswordEvent(DivineswordEvent.REFRESH_TRAINING_PANEL),
                new DivineswordEvent(DivineswordEvent.REFRESH_SKILL_PANEL),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),
                new EngineEvent(EngineEvent.MONEY_CHANGE),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new skillUi.SkillUiEvent(skillUi.SkillUiEvent.SKILL_UP_EVENT),
                new mountui.MountUiEvent(mountui.MountUiEvent.MOUNT_LEVET_STAR_CHANGE_EVENT),
                new wing.WingEvent(wing.WingEvent.WING_ID_CHANG_EVENT),
            ];
        };
        return DivineswordProcessor;
    }(BaseProcessor));
    divinesword.DivineswordProcessor = DivineswordProcessor;
})(divinesword || (divinesword = {}));
//# sourceMappingURL=DivineswordProcessor.js.map