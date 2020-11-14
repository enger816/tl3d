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
var adventureinfo;
(function (adventureinfo) {
    var AdventureInfoModule = /** @class */ (function (_super) {
        __extends(AdventureInfoModule, _super);
        function AdventureInfoModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AdventureInfoModule.prototype.getModuleName = function () {
            return "AdventureInfoModule";
        };
        AdventureInfoModule.prototype.listProcessors = function () {
            return [new AdventureInfoProcessor()];
        };
        return AdventureInfoModule;
    }(Module));
    adventureinfo.AdventureInfoModule = AdventureInfoModule;
    var AdventurInfoEvent = /** @class */ (function (_super) {
        __extends(AdventurInfoEvent, _super);
        function AdventurInfoEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AdventurInfoEvent.SHOW_ADVENTURE_INFO_UI_PANEL = "SHOW_ADVENTURE_INFO_UI_PANEL";
        AdventurInfoEvent.HIDE_ADVENTURE_INFO_UI_PANEL = "HIDE_ADVENTURE_INFO_UI_PANEL";
        AdventurInfoEvent.ADVENTURE_TRIAL_PROCESS = "ADVENTURE_TRIAL_PROCESS";
        AdventurInfoEvent.ADVENTURE_BOSS_PROCESS_FINISH = "ADVENTURE_BOSS_PROCESS_FINISH";
        AdventurInfoEvent.UPLEV_SHOW = "UPLEV_SHOW";
        AdventurInfoEvent.SET_AUTOFLAG = "SET_AUTOFLAG";
        return AdventurInfoEvent;
    }(BaseEvent));
    adventureinfo.AdventurInfoEvent = AdventurInfoEvent;
    var AdventureInfoProcessor = /** @class */ (function (_super) {
        __extends(AdventureInfoProcessor, _super);
        function AdventureInfoProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AdventureInfoProcessor.prototype.getName = function () {
            return "AdventureInfoProcessor";
        };
        AdventureInfoProcessor.prototype.receivedModuleEvent = function ($event) {
            var _this = this;
            if ($event instanceof AdventurInfoEvent) {
                var evt = $event;
                if (evt.type == AdventurInfoEvent.UPLEV_SHOW) {
                    this.showuplevfoPanelPanel();
                }
                if (evt.type == AdventurInfoEvent.SHOW_ADVENTURE_INFO_UI_PANEL) {
                    if (GuidData.map.isAdventureScene()) {
                        this.showPanel();
                    }
                    else {
                        this.hidePanel();
                    }
                }
                if (this.adventureInfoPanel) {
                    if (evt.type == AdventurInfoEvent.HIDE_ADVENTURE_INFO_UI_PANEL) {
                        this.hidePanel();
                    }
                    if (evt.type == AdventurInfoEvent.ADVENTURE_TRIAL_PROCESS) {
                        this.adventureInfoPanel.refresh();
                    }
                    if (evt.type == AdventurInfoEvent.ADVENTURE_BOSS_PROCESS_FINISH) {
                        this.adventureInfoPanel.hideExitBossBut();
                    }
                }
                if (evt.type == AdventurInfoEvent.SET_AUTOFLAG) {
                    if (this.adventureInfoPanel && this.adventureInfoPanel.hasStage) {
                        this.adventureInfoPanel.setautoflag(false);
                    }
                }
            }
            if ($event.type == EngineEvent.ENTER_SCENE_EVENT) {
                if (GuidData.map.isAdventureScene() && this.adventureInfoPanel) {
                    if (this.adventureInfoPanel.needUpLevShow()) {
                        if (GameInstance.sceneResEqu) {
                            this.hidePanel();
                            AotuSkillManager.getInstance().aotuBattle = false;
                            //TimeUtil.addTimeOut(200,()=>{ModuleEventManager.dispatchEvent(new SceneLoadEvent(SceneLoadEvent.SCENE_TRANSITION_EVENT))});
                            ModuleEventManager.dispatchEvent(new SceneLoadEvent(SceneLoadEvent.SCENE_TRANSITION_HIDE_EVENT));
                            TimeUtil.addTimeOut(2500, function () {
                                _this.showPanel();
                                _this.adventureInfoPanel.showuppanel();
                                AotuSkillManager.getInstance().aotuBattle = true;
                            });
                        }
                        else {
                            ModuleEventManager.dispatchEvent(new SceneLoadEvent(SceneLoadEvent.SCENE_TRANSITION_HIDE_EVENT));
                            this.adventureInfoPanel.showuppanel();
                        }
                    }
                }
                else {
                    ModuleEventManager.dispatchEvent(new SceneLoadEvent(SceneLoadEvent.SCENE_TRANSITION_HIDE_EVENT));
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this.uplevfoPanel) {
                    this.uplevfoPanel.dispose();
                    this.uplevfoPanel = null;
                    //console.log("释放面板 uplevfoPanel")
                }
            }
            if ($event instanceof newbieguide.NewbieguideEvent) {
                if (this.adventureInfoPanel) {
                    if ($event.type == newbieguide.NewbieguideEvent.SHOW_BIEGUIDE_EVENT) {
                        this.adventureInfoPanel.setautoflag(false);
                    }
                    else if ($event.type == newbieguide.NewbieguideEvent.HIDE_BIEGUIDE_EVENT) {
                        this.adventureInfoPanel.setautoflag(true);
                    }
                }
            }
        };
        AdventureInfoProcessor.prototype.hidePanel = function () {
            if (this.adventureInfoPanel) {
                UIManager.getInstance().removeUIContainer(this.adventureInfoPanel);
            }
        };
        AdventureInfoProcessor.prototype.showPanel = function () {
            var _this = this;
            if (!this.adventureInfoPanel) {
                this.adventureInfoPanel = new adventureinfo.AdventureInfoPanel();
            }
            this.adventureInfoPanel.load(function () {
                UIManager.getInstance().addUIContainer(_this.adventureInfoPanel);
                _this.adventureInfoPanel.refresh();
            }, false);
        };
        AdventureInfoProcessor.prototype.showuplevfoPanelPanel = function () {
            var _this = this;
            if (!this.uplevfoPanel) {
                this.uplevfoPanel = new adventureinfo.UplevfoPanel();
            }
            this.uplevfoPanel.load(function () {
                _this.uplevfoPanel.show();
            }, false);
        };
        AdventureInfoProcessor.prototype.listenModuleEvents = function () {
            return [
                new AdventurInfoEvent(AdventurInfoEvent.SHOW_ADVENTURE_INFO_UI_PANEL),
                new AdventurInfoEvent(AdventurInfoEvent.HIDE_ADVENTURE_INFO_UI_PANEL),
                new AdventurInfoEvent(AdventurInfoEvent.ADVENTURE_TRIAL_PROCESS),
                new AdventurInfoEvent(AdventurInfoEvent.ADVENTURE_BOSS_PROCESS_FINISH),
                new AdventurInfoEvent(AdventurInfoEvent.UPLEV_SHOW),
                new AdventurInfoEvent(AdventurInfoEvent.SET_AUTOFLAG),
                new EngineEvent(EngineEvent.ENTER_SCENE_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new newbieguide.NewbieguideEvent(newbieguide.NewbieguideEvent.SHOW_BIEGUIDE_EVENT),
                new newbieguide.NewbieguideEvent(newbieguide.NewbieguideEvent.HIDE_BIEGUIDE_EVENT),
            ];
        };
        return AdventureInfoProcessor;
    }(BaseProcessor));
    adventureinfo.AdventureInfoProcessor = AdventureInfoProcessor;
})(adventureinfo || (adventureinfo = {}));
//# sourceMappingURL=AdventureInfoProcessor.js.map