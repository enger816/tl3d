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
var stateup;
(function (stateup) {
    var StateUpModule = /** @class */ (function (_super) {
        __extends(StateUpModule, _super);
        function StateUpModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StateUpModule.prototype.getModuleName = function () {
            return "StateUpModule";
        };
        StateUpModule.prototype.listProcessors = function () {
            return [new StateUpProcessor()];
        };
        return StateUpModule;
    }(Module));
    stateup.StateUpModule = StateUpModule;
    var StateUpEvent = /** @class */ (function (_super) {
        __extends(StateUpEvent, _super);
        function StateUpEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StateUpEvent.SHOW_STATEUP_PANEL = "SHOW_STATEUP_PANEL";
        StateUpEvent.HIDE_STATEUP_PANEL = "HIDE_STATEUP_PANEL";
        StateUpEvent.REFRESH_LIST_PANEL = "REFRESH_LIST_PANEL";
        StateUpEvent.REFRESH_TASK_PANEL = "REFRESH_TASK_PANEL";
        StateUpEvent.REFRESH_LEV_PANEL = "REFRESH_LEV_PANEL";
        StateUpEvent.REFRESH_EXP_PANEL = "REFRESH_EXP_PANEL";
        StateUpEvent.SHOW_EFFECT_PANEL = "SHOW_EFFECT_PANEL";
        StateUpEvent.SHOW_GZ_PANEL = "SHOW_GZ_PANEL";
        StateUpEvent.CLICK_EVT = "CLICK_EVT";
        StateUpEvent.POP_SHOW_PANEL = "POP_SHOW_PANEL";
        return StateUpEvent;
    }(BaseEvent));
    stateup.StateUpEvent = StateUpEvent;
    var StateUpProcessor = /** @class */ (function (_super) {
        __extends(StateUpProcessor, _super);
        function StateUpProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StateUpProcessor.prototype.getName = function () {
            return "StateUpProcessor";
        };
        StateUpProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof StateUpEvent) {
                var evt = $event;
                if (evt.type == StateUpEvent.SHOW_STATEUP_PANEL) {
                    this.showPanel(evt.data);
                }
                if (evt.type == StateUpEvent.HIDE_STATEUP_PANEL) {
                    this.hidePanel();
                }
                if (evt.type == StateUpEvent.REFRESH_LIST_PANEL) {
                    this.refreshNode();
                    this.refreshlist();
                }
                if (evt.type == StateUpEvent.REFRESH_TASK_PANEL) {
                    // this.refreshtask()
                }
                if (evt.type == StateUpEvent.REFRESH_LEV_PANEL) {
                    this.refreshlev();
                }
                if (evt.type == StateUpEvent.REFRESH_EXP_PANEL) {
                    this.refreshExp();
                }
                if (evt.type == StateUpEvent.SHOW_EFFECT_PANEL) {
                    this.showeff(evt.data);
                }
                if (evt.type == StateUpEvent.CLICK_EVT) {
                    if (this.stateUpUiPanel) {
                        this.stateUpUiPanel.setpoint(evt.data);
                    }
                }
                if (evt.type == StateUpEvent.POP_SHOW_PANEL) {
                    this.popshow();
                }
                if (evt.type == StateUpEvent.SHOW_GZ_PANEL) {
                    this.showgz();
                }
            }
            if ($event instanceof EngineEvent) {
                var $engineEvent = $event;
                if ($engineEvent.type == EngineEvent.MONEY_CHANGE) {
                }
                else if ($engineEvent.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                }
                else if ($engineEvent.type == EngineEvent.CORE_DATA_COMPLETE_EVENT) {
                    this.refreshNode();
                }
                else if ($engineEvent.type == EngineEvent.SYSTEM_OPEN_EVENT) {
                    this.refreshNode();
                }
            }
            // if ($event instanceof skillUi.SkillUiEvent) {
            //     var skillevent: skillUi.SkillUiEvent = <skillUi.SkillUiEvent>$event;
            //     if (skillevent.type == skillUi.SkillUiEvent.SKILL_UP_EVENT) {
            //         this.showSkillUpEff();
            //     }
            // }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this.stateUpUiPanel) {
                    this.stateUpUiPanel.dispose();
                    this.stateUpUiPanel = null;
                    //console.log("释放面板 trainingUiPanel")
                }
                if (panelEvent.panel == this.stateupGz) {
                    this.stateupGz.dispose();
                    this.stateupGz = null;
                    //console.log("释放面板 leaguegz")
                }
            }
        };
        StateUpProcessor.prototype.refreshNode = function () {
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_REALM, SharedDef.MODULE_REALM_ALL)) {
                var taskcellary = stateup.StateUpModel.getInstance().getTaskAry();
                var node124 = RedPointManager.getInstance().getNodeByID(124);
                node124.show = false;
                for (var i = 0; i < taskcellary.length; i++) {
                    if (taskcellary[i].qusdata.taskState == SharedDef.QUEST_STATUS_COMPLETE) {
                        node124.show = true;
                        break;
                    }
                }
            }
        };
        StateUpProcessor.prototype.showeff = function ($vo) {
            if (this.stateUpUiPanel && this.stateUpUiPanel.hasStage) {
                this.stateUpUiPanel.showBezierEff($vo.num);
                this.stateUpUiPanel.showExpEff();
                // this.stateUpUiPanel.showflyword(ColorType.Yellowedce7e+"境界经验+"+$vo.num);
            }
        };
        StateUpProcessor.prototype.refreshExp = function () {
            if (this.stateUpUiPanel && this.stateUpUiPanel.hasStage) {
                this.stateUpUiPanel.chgExp();
            }
        };
        StateUpProcessor.prototype.refreshlev = function () {
            if (this.stateUpUiPanel && this.stateUpUiPanel.hasStage) {
                this.stateUpUiPanel.chgLev();
                this.stateUpUiPanel.drawPersonLev();
            }
        };
        StateUpProcessor.prototype.refreshlist = function () {
            if (this.stateUpUiPanel && this.stateUpUiPanel.achievementList && this.stateUpUiPanel.achievementList.hasStage) {
                this.stateUpUiPanel.achievementList.refreshDraw();
            }
        };
        StateUpProcessor.prototype.showgz = function () {
            var _this = this;
            if (!this.stateupGz) {
                this.stateupGz = new stateup.StateupGz();
            }
            this.stateupGz.load(function () {
                //停止绘制前面的ui
                _this.stateupGz.show();
            });
        };
        StateUpProcessor.prototype.hidePanel = function () {
            if (this.stateUpUiPanel) {
                this.stateUpUiPanel.hide();
            }
        };
        StateUpProcessor.prototype.showPanel = function ($data) {
            var _this = this;
            if (!this.stateUpUiPanel) {
                this.stateUpUiPanel = new stateup.StateUpUiPanel();
            }
            this.stateUpUiPanel.load(function () {
                //console.log("--$data---", $data);
                if (!$data) {
                    $data = SharedDef.MODULE_REALM_ALL;
                }
                else if ($data instanceof Array) {
                    $data = $data[0];
                }
                _this.stateUpUiPanel.show($data);
                var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
                $scenePange.data = SharedDef.MODULE_REALM;
                ModuleEventManager.dispatchEvent($scenePange);
            }, true);
        };
        StateUpProcessor.prototype.popshow = function () {
            var _this = this;
            if (!this.stateupPopPanel) {
                this.stateupPopPanel = new StateupPopPanel();
            }
            this.stateupPopPanel.load(function () {
                _this.stateupPopPanel.show();
            }, false);
        };
        StateUpProcessor.prototype.listenModuleEvents = function () {
            return [
                new StateUpEvent(StateUpEvent.SHOW_STATEUP_PANEL),
                new StateUpEvent(StateUpEvent.HIDE_STATEUP_PANEL),
                new StateUpEvent(StateUpEvent.REFRESH_LIST_PANEL),
                new StateUpEvent(StateUpEvent.REFRESH_TASK_PANEL),
                new StateUpEvent(StateUpEvent.REFRESH_LEV_PANEL),
                new StateUpEvent(StateUpEvent.REFRESH_EXP_PANEL),
                new StateUpEvent(StateUpEvent.SHOW_EFFECT_PANEL),
                new StateUpEvent(StateUpEvent.CLICK_EVT),
                new StateUpEvent(StateUpEvent.POP_SHOW_PANEL),
                new StateUpEvent(StateUpEvent.SHOW_GZ_PANEL),
                // new StateUpEvent(StateUpEvent.REFRESH_SKILL_PANEL),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),
                new EngineEvent(EngineEvent.MONEY_CHANGE),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        return StateUpProcessor;
    }(BaseProcessor));
    stateup.StateUpProcessor = StateUpProcessor;
})(stateup || (stateup = {}));
//# sourceMappingURL=StateUpProcessor.js.map