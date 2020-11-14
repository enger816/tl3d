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
var online;
(function (online) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var OnlineStartEvent = /** @class */ (function (_super) {
        __extends(OnlineStartEvent, _super);
        function OnlineStartEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OnlineStartEvent.SHOW_ONLINE_START_PANEL = "SHOW_ONLINE_START_PANEL";
        return OnlineStartEvent;
    }(BaseEvent));
    online.OnlineStartEvent = OnlineStartEvent;
    var OnlineStartModule = /** @class */ (function (_super) {
        __extends(OnlineStartModule, _super);
        function OnlineStartModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OnlineStartModule.prototype.getModuleName = function () {
            return "OnlineStartModule";
        };
        OnlineStartModule.prototype.listProcessors = function () {
            return [
                new OnlineStartProcessor()
            ];
        };
        return OnlineStartModule;
    }(Module));
    online.OnlineStartModule = OnlineStartModule;
    var OnlineStartProcessor = /** @class */ (function (_super) {
        __extends(OnlineStartProcessor, _super);
        function OnlineStartProcessor() {
            return _super.call(this) || this;
        }
        OnlineStartProcessor.prototype.getName = function () {
            return "OnlineStartProcessor";
        };
        OnlineStartProcessor.prototype.receivedModuleEvent = function ($event) {
            if (!GameData.severinfo.onlinegame.open) {
                return;
            }
            if ($event instanceof OnlineStartEvent) {
                var $endLessEvent = $event;
                switch ($endLessEvent.type) {
                    case OnlineStartEvent.SHOW_ONLINE_START_PANEL:
                        if (!this._onlineStartPanel) {
                            this._onlineStartPanel = new online.OnlineStartPanel();
                        }
                        this._onlineStartPanel.showPanel();
                        break;
                    default:
                        break;
                }
            }
        };
        OnlineStartProcessor.prototype.listenModuleEvents = function () {
            return [
                new OnlineStartEvent(OnlineStartEvent.SHOW_ONLINE_START_PANEL),
            ];
        };
        return OnlineStartProcessor;
    }(BaseProcessor));
    online.OnlineStartProcessor = OnlineStartProcessor;
})(online || (online = {}));
//# sourceMappingURL=OnlineStartProcessor.js.map