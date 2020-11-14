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
var resetplay;
(function (resetplay) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var GameDataModel = game.GameDataModel;
    var ResetPlayEvent = /** @class */ (function (_super) {
        __extends(ResetPlayEvent, _super);
        function ResetPlayEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ResetPlayEvent.SHOW_RESET_PLAY_PANEL = "SHOW_RESET_PLAY_PANEL";
        return ResetPlayEvent;
    }(BaseEvent));
    resetplay.ResetPlayEvent = ResetPlayEvent;
    var ResetPlayModule = /** @class */ (function (_super) {
        __extends(ResetPlayModule, _super);
        function ResetPlayModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ResetPlayModule.prototype.getModuleName = function () {
            return "ResetPlayModule";
        };
        ResetPlayModule.prototype.listProcessors = function () {
            return [
                new ResetPlayProcessor()
            ];
        };
        return ResetPlayModule;
    }(Module));
    resetplay.ResetPlayModule = ResetPlayModule;
    var ResetPlayProcessor = /** @class */ (function (_super) {
        __extends(ResetPlayProcessor, _super);
        function ResetPlayProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ResetPlayProcessor.prototype.getName = function () {
            return "ResetPlayProcessor";
        };
        ResetPlayProcessor.prototype.showEndGame = function () {
        };
        ResetPlayProcessor.prototype.receivedModuleEvent = function ($event) {
            switch ($event.type) {
                case ResetPlayEvent.SHOW_RESET_PLAY_PANEL:
                    if (GameDataModel.lastRevivePos) {
                        if (!this._revivePanel) {
                            this._revivePanel = new revive.RevivePanel();
                        }
                        this._revivePanel.showPanel();
                    }
                    else {
                        if (GameData.gameType == 1) {
                            if (!this._resetPlayPanel) {
                                this._resetPlayPanel = new resetplay.ResetPlayPanel();
                            }
                            this._resetPlayPanel.showPanel();
                            GameData.sendFailToWeb(GameDataModel.levelNum);
                        }
                        if (GameData.gameType == 5) {
                            ModuleEventManager.dispatchEvent(new special.SpecialEvent(special.SpecialEvent.SHOW_SPECIAL_FAIL_PANEL));
                        }
                    }
                    break;
                default:
                    break;
            }
        };
        ResetPlayProcessor.prototype.listenModuleEvents = function () {
            return [
                new ResetPlayEvent(ResetPlayEvent.SHOW_RESET_PLAY_PANEL),
            ];
        };
        return ResetPlayProcessor;
    }(BaseProcessor));
    resetplay.ResetPlayProcessor = ResetPlayProcessor;
})(resetplay || (resetplay = {}));
//# sourceMappingURL=ResetPlayProcessor.js.map