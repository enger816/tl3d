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
var fightui;
(function (fightui) {
    var FightUiModule = /** @class */ (function (_super) {
        __extends(FightUiModule, _super);
        function FightUiModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FightUiModule.prototype.getModuleName = function () {
            return "FightUiModule";
        };
        FightUiModule.prototype.listProcessors = function () {
            return [new FightUiProcessor()];
        };
        return FightUiModule;
    }(Module));
    fightui.FightUiModule = FightUiModule;
    var FightUiEvent = /** @class */ (function (_super) {
        __extends(FightUiEvent, _super);
        function FightUiEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FightUiEvent.SHOW_FIGHT_UI_PANEL = "SHOW_FIGHT_UI_PANEL";
        FightUiEvent.HIDE_FIGHT_UI_PANEL = "HIDE_FIGHT_UI_PANEL";
        FightUiEvent.REFRESH_SKILL_AOTUBATTLE = "REFRESH_SKILL_AOTUBATTLE";
        return FightUiEvent;
    }(BaseEvent));
    fightui.FightUiEvent = FightUiEvent;
    var FightUiProcessor = /** @class */ (function (_super) {
        __extends(FightUiProcessor, _super);
        function FightUiProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FightUiProcessor.prototype.getName = function () {
            return "FightUiProcessor";
        };
        FightUiProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof FightUiEvent) {
                var evt = $event;
                if (evt.type == FightUiEvent.SHOW_FIGHT_UI_PANEL) {
                    if (GuidData.map.showAreaById(AreaType.fightSKill_7)) {
                        this.showPanel();
                    }
                }
                if (this._fightUiPanel) {
                    if (evt.type == FightUiEvent.HIDE_FIGHT_UI_PANEL) {
                        this.hidePanel();
                    }
                    // if (evt.type == FightUiEvent.REFRESH_SKILL_AOTUBATTLE) {
                    //     if (this._fightUiPanel.fightSkillPanel) {
                    //         this._fightUiPanel.fightSkillPanel.changeSkillAotu()
                    //     }
                    // }
                }
            }
            if ($event instanceof mainUi.MainUiEvent && this._fightUiPanel && this._fightUiPanel.fightSkillPanel) {
                var $mainUIEvent = $event;
                if ($mainUIEvent.type == mainUi.MainUiEvent.PLAYER_SKILL_CD_REFRESH) {
                    this._fightUiPanel.fightSkillPanel.refreshCdBySkillId(Number($mainUIEvent.data));
                }
                if ($mainUIEvent.type == mainUi.MainUiEvent.RESET_SKILL_ICON) {
                    this._fightUiPanel.fightSkillPanel.refresh();
                }
            }
        };
        FightUiProcessor.prototype.hidePanel = function () {
            if (this._fightUiPanel) {
                UIManager.getInstance().removeUIContainer(this._fightUiPanel);
            }
        };
        FightUiProcessor.prototype.showPanel = function () {
            var _this = this;
            if (!this._fightUiPanel) {
                this._fightUiPanel = new fightui.FightUiPanel();
            }
            this._fightUiPanel.load(function () {
                UIManager.getInstance().addUIContainer(_this._fightUiPanel);
            }, false);
        };
        FightUiProcessor.prototype.listenModuleEvents = function () {
            return [
                new FightUiEvent(FightUiEvent.SHOW_FIGHT_UI_PANEL),
                new FightUiEvent(FightUiEvent.HIDE_FIGHT_UI_PANEL),
                // new FightUiEvent(FightUiEvent.REFRESH_SKILL_AOTUBATTLE),
                new mainUi.MainUiEvent(mainUi.MainUiEvent.RESET_SKILL_ICON),
                new mainUi.MainUiEvent(mainUi.MainUiEvent.PLAYER_SKILL_CD_REFRESH),
            ];
        };
        return FightUiProcessor;
    }(BaseProcessor));
    fightui.FightUiProcessor = FightUiProcessor;
})(fightui || (fightui = {}));
//# sourceMappingURL=FightUiProcessor.js.map