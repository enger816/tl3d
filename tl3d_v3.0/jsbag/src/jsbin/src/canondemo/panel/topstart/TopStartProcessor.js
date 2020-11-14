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
var topstart;
(function (topstart) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var TopStartEvent = /** @class */ (function (_super) {
        __extends(TopStartEvent, _super);
        function TopStartEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TopStartEvent.SHOW_TOP_START_PANEL = "SHOW_TOP_START_PANEL";
        TopStartEvent.HIDE_TOP_START_PANEL = "HIDE_TOP_START_PANEL";
        return TopStartEvent;
    }(BaseEvent));
    topstart.TopStartEvent = TopStartEvent;
    var TopStartModule = /** @class */ (function (_super) {
        __extends(TopStartModule, _super);
        function TopStartModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TopStartModule.prototype.getModuleName = function () {
            return "TopStartModule";
        };
        TopStartModule.prototype.listProcessors = function () {
            return [
                new GameStartProcessor()
            ];
        };
        return TopStartModule;
    }(Module));
    topstart.TopStartModule = TopStartModule;
    var GameStartProcessor = /** @class */ (function (_super) {
        __extends(GameStartProcessor, _super);
        function GameStartProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GameStartProcessor.prototype.getName = function () {
            return "GameStartProcessor";
        };
        GameStartProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof TopStartEvent) {
                var $endLessEvent = $event;
                switch ($endLessEvent.type) {
                    case TopStartEvent.SHOW_TOP_START_PANEL:
                        if (!this._topStartView) {
                            this._topStartView = new topstart.TopStartView();
                        }
                        this._topStartView.showPanel();
                        break;
                    default:
                        this._topStartView.hidePanel();
                        break;
                }
            }
        };
        GameStartProcessor.prototype.listenModuleEvents = function () {
            return [
                new TopStartEvent(TopStartEvent.SHOW_TOP_START_PANEL),
                new TopStartEvent(TopStartEvent.HIDE_TOP_START_PANEL),
            ];
        };
        return GameStartProcessor;
    }(BaseProcessor));
    topstart.GameStartProcessor = GameStartProcessor;
})(topstart || (topstart = {}));
//# sourceMappingURL=TopStartProcessor.js.map