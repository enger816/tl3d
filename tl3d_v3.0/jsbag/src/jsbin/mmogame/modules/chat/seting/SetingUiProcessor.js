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
var setingui;
(function (setingui) {
    var SetingUiModule = /** @class */ (function (_super) {
        __extends(SetingUiModule, _super);
        function SetingUiModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SetingUiModule.prototype.getModuleName = function () {
            return "SetingUiModule";
        };
        SetingUiModule.prototype.listProcessors = function () {
            return [new SetingUiProcessor()];
        };
        return SetingUiModule;
    }(Module));
    setingui.SetingUiModule = SetingUiModule;
    var SetingUiEvent = /** @class */ (function (_super) {
        __extends(SetingUiEvent, _super);
        function SetingUiEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SetingUiEvent.SHOW_SETING_UI_PANEL = "SHOW_SETING_UI_PANEL";
        SetingUiEvent.HIDE_SETING_UI_PANEL = "HIDE_SETING_UI_PANEL";
        return SetingUiEvent;
    }(BaseEvent));
    setingui.SetingUiEvent = SetingUiEvent;
    var SetingUiProcessor = /** @class */ (function (_super) {
        __extends(SetingUiProcessor, _super);
        function SetingUiProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SetingUiProcessor.prototype.getName = function () {
            return "SetingUiProcessor";
        };
        SetingUiProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof SetingUiEvent) {
                var evt = $event;
                if (evt.type == SetingUiEvent.SHOW_SETING_UI_PANEL) {
                    this.showPanel();
                }
                if (evt.type == SetingUiEvent.HIDE_SETING_UI_PANEL) {
                    this.hidePanel();
                }
            }
        };
        SetingUiProcessor.prototype.hidePanel = function () {
            if (this.setingUiPanel) {
                UIManager.getInstance().removeUIContainer(this.setingUiPanel);
            }
        };
        SetingUiProcessor.prototype.showPanel = function () {
            var _this = this;
            if (!this.setingUiPanel) {
                this.setingUiPanel = new setingui.SetingUiPanel();
            }
            this.setingUiPanel.load(function () {
                UIManager.getInstance().addUIContainer(_this.setingUiPanel);
                _this.setingUiPanel.refresh();
            }, false);
        };
        SetingUiProcessor.prototype.listenModuleEvents = function () {
            return [
                new SetingUiEvent(SetingUiEvent.SHOW_SETING_UI_PANEL),
                new SetingUiEvent(SetingUiEvent.HIDE_SETING_UI_PANEL),
            ];
        };
        return SetingUiProcessor;
    }(BaseProcessor));
    setingui.SetingUiProcessor = SetingUiProcessor;
})(setingui || (setingui = {}));
//# sourceMappingURL=SetingUiProcessor.js.map