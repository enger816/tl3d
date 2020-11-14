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
var setupui;
(function (setupui) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var SetupWinEvent = /** @class */ (function (_super) {
        __extends(SetupWinEvent, _super);
        function SetupWinEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SetupWinEvent.SHOW_SETUP_WIN_PANEL = "SHOW_SETUP_WIN_PANEL";
        return SetupWinEvent;
    }(BaseEvent));
    setupui.SetupWinEvent = SetupWinEvent;
    var SetupWinModule = /** @class */ (function (_super) {
        __extends(SetupWinModule, _super);
        function SetupWinModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SetupWinModule.prototype.getModuleName = function () {
            return "SetupWinModule";
        };
        SetupWinModule.prototype.listProcessors = function () {
            return [
                new SetupWinProcessor()
            ];
        };
        return SetupWinModule;
    }(Module));
    setupui.SetupWinModule = SetupWinModule;
    var SetupWinProcessor = /** @class */ (function (_super) {
        __extends(SetupWinProcessor, _super);
        function SetupWinProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SetupWinProcessor.prototype.getName = function () {
            return "SetupWinProcessor";
        };
        SetupWinProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof SetupWinEvent) {
                var $endLessEvent = $event;
                switch ($endLessEvent.type) {
                    case SetupWinEvent.SHOW_SETUP_WIN_PANEL:
                        if (!this._SetupWinPanel) {
                            this._SetupWinPanel = new setupui.SetupWinPanel();
                        }
                        this._SetupWinPanel.showPanel();
                        break;
                    default:
                        break;
                }
            }
        };
        SetupWinProcessor.prototype.listenModuleEvents = function () {
            return [
                new SetupWinEvent(SetupWinEvent.SHOW_SETUP_WIN_PANEL),
            ];
        };
        return SetupWinProcessor;
    }(BaseProcessor));
    setupui.SetupWinProcessor = SetupWinProcessor;
})(setupui || (setupui = {}));
//# sourceMappingURL=SetupWinProcessor.js.map