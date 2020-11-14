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
var endless;
(function (endless) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var EndLessStartEvent = /** @class */ (function (_super) {
        __extends(EndLessStartEvent, _super);
        function EndLessStartEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EndLessStartEvent.SHOW_ENDLESS_START_PANEL = "SHOW_ENDLESS_START_PANEL";
        return EndLessStartEvent;
    }(BaseEvent));
    endless.EndLessStartEvent = EndLessStartEvent;
    var EndLessStartModule = /** @class */ (function (_super) {
        __extends(EndLessStartModule, _super);
        function EndLessStartModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EndLessStartModule.prototype.getModuleName = function () {
            return "EndLessStartModule";
        };
        EndLessStartModule.prototype.listProcessors = function () {
            return [
                new EndLessStartProcessor()
            ];
        };
        return EndLessStartModule;
    }(Module));
    endless.EndLessStartModule = EndLessStartModule;
    var EndLessStartProcessor = /** @class */ (function (_super) {
        __extends(EndLessStartProcessor, _super);
        function EndLessStartProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EndLessStartProcessor.prototype.getName = function () {
            return "EndLessStartProcessor";
        };
        EndLessStartProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof EndLessStartEvent) {
                var $topMenuEvent = $event;
                switch ($topMenuEvent.type) {
                    case EndLessStartEvent.SHOW_ENDLESS_START_PANEL:
                        if (!this._topMenuPanel) {
                            this._topMenuPanel = new endless.EndLessStartPanel();
                        }
                        this._topMenuPanel.showPanel();
                        break;
                    default:
                        break;
                }
            }
        };
        EndLessStartProcessor.prototype.listenModuleEvents = function () {
            return [
                new EndLessStartEvent(EndLessStartEvent.SHOW_ENDLESS_START_PANEL),
            ];
        };
        return EndLessStartProcessor;
    }(BaseProcessor));
    endless.EndLessStartProcessor = EndLessStartProcessor;
})(endless || (endless = {}));
//# sourceMappingURL=EndLessStartProcessor.js.map