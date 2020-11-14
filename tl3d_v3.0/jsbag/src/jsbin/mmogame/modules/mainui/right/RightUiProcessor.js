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
var rightui;
(function (rightui) {
    var RightUiModule = /** @class */ (function (_super) {
        __extends(RightUiModule, _super);
        function RightUiModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RightUiModule.prototype.getModuleName = function () {
            return "RightUiModule";
        };
        RightUiModule.prototype.listProcessors = function () {
            return [new RightUiProcessor()];
        };
        return RightUiModule;
    }(Module));
    rightui.RightUiModule = RightUiModule;
    var RightUiEvent = /** @class */ (function (_super) {
        __extends(RightUiEvent, _super);
        function RightUiEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RightUiEvent.SHOW_RIGHT_UI_PANEL = "SHOW_RIGHT_UI_PANEL";
        RightUiEvent.HIDE_RIGHT_UI_PANEL = "HIDE_RIGHT_UI_PANEL";
        return RightUiEvent;
    }(BaseEvent));
    rightui.RightUiEvent = RightUiEvent;
    var RightUiProcessor = /** @class */ (function (_super) {
        __extends(RightUiProcessor, _super);
        function RightUiProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RightUiProcessor.prototype.getName = function () {
            return "RightUiProcessor";
        };
        RightUiProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof RightUiEvent) {
                var $topUiEvent = $event;
                if ($topUiEvent.type == RightUiEvent.SHOW_RIGHT_UI_PANEL) {
                    this.showPanel();
                }
                if ($topUiEvent.type == RightUiEvent.HIDE_RIGHT_UI_PANEL) {
                    this.hidePanel();
                }
            }
            if ($event instanceof faction.FactionEvent) {
                if (this.rightUiPanel) {
                    if ($event.type == faction.FactionEvent.REFRESHFACTIONITEMAPPLY_EVENT) {
                        this.rightUiPanel.refreshNotice();
                    }
                }
            }
            if ($event instanceof fightui.FightUiEvent) {
                if (this.rightUiPanel) {
                    if ($event.type == fightui.FightUiEvent.REFRESH_SKILL_AOTUBATTLE) {
                        this.rightUiPanel.changeSkillAotu();
                    }
                }
            }
            if ($event instanceof EngineEvent) {
                var $engineEvent = $event;
                if ($engineEvent.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                    if (this.rightUiPanel) {
                        this.rightUiPanel.drawSysTemTip();
                    }
                }
            }
        };
        RightUiProcessor.prototype.hidePanel = function () {
            if (this.rightUiPanel) {
                this.rightUiPanel.hide();
            }
        };
        RightUiProcessor.prototype.showPanel = function () {
            var _this = this;
            if (!this.rightUiPanel) {
                this.rightUiPanel = new rightui.RightUiPanel();
            }
            this.rightUiPanel.load(function () {
                _this.rightUiPanel.show();
            }, false);
        };
        RightUiProcessor.prototype.listenModuleEvents = function () {
            return [
                new RightUiEvent(RightUiEvent.SHOW_RIGHT_UI_PANEL),
                new RightUiEvent(RightUiEvent.HIDE_RIGHT_UI_PANEL),
                new RightUiEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                new fightui.FightUiEvent(fightui.FightUiEvent.REFRESH_SKILL_AOTUBATTLE),
                new faction.FactionEvent(faction.FactionEvent.REFRESHFACTIONITEMAPPLY_EVENT),
            ];
        };
        return RightUiProcessor;
    }(BaseProcessor));
    rightui.RightUiProcessor = RightUiProcessor;
})(rightui || (rightui = {}));
//# sourceMappingURL=RightUiProcessor.js.map