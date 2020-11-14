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
var training;
(function (training) {
    var TrainingModule = /** @class */ (function (_super) {
        __extends(TrainingModule, _super);
        function TrainingModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TrainingModule.prototype.getModuleName = function () {
            return "TrainingModule";
        };
        TrainingModule.prototype.listProcessors = function () {
            return [new TrainingProcessor()];
        };
        return TrainingModule;
    }(Module));
    training.TrainingModule = TrainingModule;
    var TrainingEvent = /** @class */ (function (_super) {
        __extends(TrainingEvent, _super);
        function TrainingEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TrainingEvent.SHOW_TRAINING_PANEL = "SHOW_TRAINING_PANEL";
        TrainingEvent.HIDE_TRAINING_PANEL = "HIDE_TRAINING_PANEL";
        TrainingEvent.REFRESH_TRAINING_PANEL = "REFRESH_TRAINING_PANEL";
        return TrainingEvent;
    }(BaseEvent));
    training.TrainingEvent = TrainingEvent;
    var TrainingProcessor = /** @class */ (function (_super) {
        __extends(TrainingProcessor, _super);
        function TrainingProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TrainingProcessor.prototype.getName = function () {
            return "TrainingProcessor";
        };
        TrainingProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof TrainingEvent) {
                var evt = $event;
                if (evt.type == TrainingEvent.SHOW_TRAINING_PANEL) {
                    this.showPanel(evt.data);
                }
                if (evt.type == TrainingEvent.HIDE_TRAINING_PANEL) {
                    this.hidePanel();
                }
                if (evt.type == TrainingEvent.REFRESH_TRAINING_PANEL) {
                    this.refreshtask();
                }
                // if (evt.type == TrainingEvent.REFRESH_SKILL_PANEL) {
                //     if (this.trainingUiPanel && this.trainingUiPanel.trainingSkill && this.trainingUiPanel.hasStage) {
                //         this.trainingUiPanel.trainingSkill.refreshLev();
                //     }
                // }
            }
            if ($event instanceof EngineEvent) {
                var $engineEvent = $event;
                // if ($engineEvent.type == EngineEvent.SYSTEM_OPEN_EVENT) {
                //     this.refreshNode();
                // } else if ($engineEvent.type == EngineEvent.CORE_DATA_COMPLETE_EVENT) {
                //     this.initNode();
                // } else 
                if ($engineEvent.type == EngineEvent.MONEY_CHANGE) {
                    // this.refreshNode();
                    if (this.trainingUiPanel && this.trainingUiPanel.trainingTask && this.trainingUiPanel.trainingTask.hasStage) {
                        this.trainingUiPanel.trainingTask.refreshCurCardNum();
                    }
                    // if (this.trainingUiPanel && this.trainingUiPanel.trainingSkill && this.trainingUiPanel.trainingSkill.hasStage) {
                    //     this.trainingUiPanel.trainingSkill.updataRes();
                    // }
                }
                else if ($engineEvent.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                    if (this.trainingUiPanel) {
                        this.trainingUiPanel.refreshOpenLev();
                    }
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
                if (panelEvent.panel == this.trainingUiPanel) {
                    this.trainingUiPanel.dispose();
                    this.trainingUiPanel = null;
                    //console.log("释放面板 trainingUiPanel")
                }
            }
        };
        // private showSkillUpEff(): void {
        //     if (this.trainingUiPanel && this.trainingUiPanel.trainingSkill && this.trainingUiPanel.trainingSkill.hasStage) {
        //         this.trainingUiPanel.trainingSkill.showSkillUpEff();
        //     }
        // }
        // private initNode(): void {
        //     var tabary: Array<tb.TB_adventure_skill_base> = tb.TB_adventure_skill_base.get_TB_quest_adventure_base();
        //     var pnode: RedPointNode = RedPointManager.getInstance().getNodeByID(126);
        //     for (var i: number = 0; i < tabary.length; i++) {
        //         var node: RedPointNode = new RedPointNode();
        //         node.data = tabary[i];
        //         pnode.addChild(node);
        //     }
        //     this.refreshNode();
        // }
        // private refreshNode(): void {
        //     if (GuidData.player.getsyspageopen(SharedDef.MODULE_EXP, SharedDef.MODULE_EXP_ARTIFACT)) {
        //         if (GuidData.player.isOpenSystemNeedShow(SharedDef.MODULE_EXP)) {
        //             this.refreshNodeByID(126);
        //             if (this.trainingUiPanel && this.trainingUiPanel.trainingSkill && this.trainingUiPanel.trainingSkill.hasStage) {
        //                 this.trainingUiPanel.trainingSkill.refreshredpoint();
        //             }
        //         }
        //     }
        // }
        // private refreshNodeByID($id: number) {
        //     var ary: Array<RedPointNode> = RedPointManager.getInstance().getNodeByID($id).children;
        //     for (var i: number = 0; i < ary.length; i++) {
        //         var tab: tb.TB_adventure_skill_base = ary[i].data;
        //         if (tab.prev_limit[0]) {
        //             if (GuidData.player.getPassiveSkillLev(tab.prev_limit[0][0]) < tab.prev_limit[0][1]) {
        //                 ary[i].show = false;
        //             } else {
        //                 //判断道具足够不
        //                 ary[i].show = this.hasResEnough(tab);
        //             }
        //         } else {
        //             //判断道具足够不
        //             ary[i].show = this.hasResEnough(tab);
        //         }
        //     }
        // }
        // private hasResEnough(tab: tb.TB_adventure_skill_base): boolean {
        //     var lev: number = GuidData.player.getPassiveSkillLev(tab.id);
        //     var baseData: any = TableData.getInstance().getData(TableData.tb_skill_base, tab.id);
        //     var nexttab = tb.TB_skill_uplevel.get_TB_skill_uplevel(baseData.uplevel_id[0] + lev);
        //     if (lev > (baseData.uplevel_id[1] - baseData.uplevel_id[0])) {
        //         nexttab = null;
        //     }
        //     if (nexttab == null) {
        //         return false;
        //     }
        //     var costitem: Array<number> = tab.cost[0]
        //     if (lev > 0) {
        //         costitem = tb.TB_skill_uplevel.get_TB_skill_uplevel(baseData.uplevel_id[0] + lev - 1).uplevel_cost[0];
        //     }
        //     if (hasEnoughRes(costitem)) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }
        /**
         * 服务端任务状态变化
         */
        TrainingProcessor.prototype.refreshtask = function () {
            training.TrainingModel.getInstance().refreshTaskAry();
            if (this.trainingUiPanel && this.trainingUiPanel.trainingTask && this.trainingUiPanel.trainingTask.hasStage) {
                this.trainingUiPanel.trainingTask.refreshServerData();
            }
        };
        TrainingProcessor.prototype.hidePanel = function () {
            if (this.trainingUiPanel) {
                this.trainingUiPanel.hide();
            }
        };
        TrainingProcessor.prototype.showPanel = function ($data) {
            var _this = this;
            if (!this.trainingUiPanel) {
                this.trainingUiPanel = new training.TrainingUiPanel();
            }
            this.trainingUiPanel.load(function () {
                //console.log("--$data---", $data);
                if (!$data) {
                    $data = SharedDef.MODULE_EXP_QUEST;
                }
                else if ($data instanceof Array) {
                    $data = $data[0];
                }
                _this.trainingUiPanel.show($data);
                var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
                $scenePange.data = SharedDef.MODULE_WORLD_RISK;
                ModuleEventManager.dispatchEvent($scenePange);
            }, false);
        };
        TrainingProcessor.prototype.listenModuleEvents = function () {
            return [
                new TrainingEvent(TrainingEvent.SHOW_TRAINING_PANEL),
                new TrainingEvent(TrainingEvent.HIDE_TRAINING_PANEL),
                new TrainingEvent(TrainingEvent.REFRESH_TRAINING_PANEL),
                // new TrainingEvent(TrainingEvent.REFRESH_SKILL_PANEL),
                // new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                // new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),
                new EngineEvent(EngineEvent.MONEY_CHANGE),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        return TrainingProcessor;
    }(BaseProcessor));
    training.TrainingProcessor = TrainingProcessor;
})(training || (training = {}));
//# sourceMappingURL=TrainingProcessor.js.map