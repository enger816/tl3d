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
var hornui;
(function (hornui) {
    var HornUiModule = /** @class */ (function (_super) {
        __extends(HornUiModule, _super);
        function HornUiModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HornUiModule.prototype.getModuleName = function () {
            return "HornUiModule";
        };
        HornUiModule.prototype.listProcessors = function () {
            return [new HornUiProcessor()];
        };
        return HornUiModule;
    }(Module));
    hornui.HornUiModule = HornUiModule;
    var HornUiEvent = /** @class */ (function (_super) {
        __extends(HornUiEvent, _super);
        function HornUiEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HornUiEvent.SHOW_HORN_UI_PANEL = "SHOW_HORN_UI_PANEL";
        HornUiEvent.HIDE_HORN_UI_PANEL = "HIDE_HORN_UI_PANEL";
        return HornUiEvent;
    }(BaseEvent));
    hornui.HornUiEvent = HornUiEvent;
    var HornUiProcessor = /** @class */ (function (_super) {
        __extends(HornUiProcessor, _super);
        function HornUiProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HornUiProcessor.prototype.getName = function () {
            return "HornUiProcessor";
        };
        HornUiProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof HornUiEvent) {
                var evt = $event;
                if (evt.type == HornUiEvent.SHOW_HORN_UI_PANEL) {
                    this.showPanel();
                }
                if (evt.type == HornUiEvent.HIDE_HORN_UI_PANEL) {
                    this.hidePanel();
                }
            }
        };
        HornUiProcessor.prototype.hidePanel = function () {
            if (this.hornUiPanel) {
                UIManager.getInstance().removeUIContainer(this.hornUiPanel);
            }
        };
        HornUiProcessor.prototype.showPanel = function () {
            var _this = this;
            if (!this.hornUiPanel) {
                this.hornUiPanel = new hornui.HornUiPanel();
            }
            this.hornUiPanel.load(function () {
                UIManager.getInstance().addUIContainer(_this.hornUiPanel);
            }, false);
        };
        HornUiProcessor.prototype.listenModuleEvents = function () {
            return [
                new HornUiEvent(HornUiEvent.SHOW_HORN_UI_PANEL),
                new HornUiEvent(HornUiEvent.HIDE_HORN_UI_PANEL),
            ];
        };
        return HornUiProcessor;
    }(BaseProcessor));
    hornui.HornUiProcessor = HornUiProcessor;
})(hornui || (hornui = {}));
//# sourceMappingURL=HornUiProcessor.js.map