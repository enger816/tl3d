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
var shieldui;
(function (shieldui) {
    var ShieldUiModule = /** @class */ (function (_super) {
        __extends(ShieldUiModule, _super);
        function ShieldUiModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ShieldUiModule.prototype.getModuleName = function () {
            return "ShieldUiModule";
        };
        ShieldUiModule.prototype.listProcessors = function () {
            return [new ShieldUiProcessor()];
        };
        return ShieldUiModule;
    }(Module));
    shieldui.ShieldUiModule = ShieldUiModule;
    var ShieldUiEvent = /** @class */ (function (_super) {
        __extends(ShieldUiEvent, _super);
        function ShieldUiEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ShieldUiEvent.SHOW_SHIELD_UI_PANEL = "SHOW_SHIELD_UI_PANEL";
        ShieldUiEvent.HIDE_SHIELD_UI_PANEL = "HIDE_SHIELD_UI_PANEL";
        ShieldUiEvent.PLAYER_STRING_FIELD_BLOCK = "PLAYER_STRING_FIELD_BLOCK";
        return ShieldUiEvent;
    }(BaseEvent));
    shieldui.ShieldUiEvent = ShieldUiEvent;
    var ShieldUiProcessor = /** @class */ (function (_super) {
        __extends(ShieldUiProcessor, _super);
        function ShieldUiProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ShieldUiProcessor.prototype.getName = function () {
            return "ShieldUiProcessor";
        };
        ShieldUiProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof ShieldUiEvent) {
                var evt = $event;
                if (evt.type == ShieldUiEvent.SHOW_SHIELD_UI_PANEL) {
                    this.showPanel();
                }
                if (evt.type == ShieldUiEvent.HIDE_SHIELD_UI_PANEL) {
                    this.hidePanel();
                }
                if (evt.type == ShieldUiEvent.PLAYER_STRING_FIELD_BLOCK) {
                    //console.log("PLAYER_STRING_FIELD_BLOCK")
                    if (this.shieldUiPanel) {
                        this.shieldUiPanel.refresh();
                    }
                }
            }
        };
        ShieldUiProcessor.prototype.hidePanel = function () {
            if (this.shieldUiPanel) {
                this.shieldUiPanel.close();
            }
        };
        ShieldUiProcessor.prototype.showPanel = function () {
            var _this = this;
            if (!this.shieldUiPanel) {
                this.shieldUiPanel = new shieldui.ShieldUiPanel();
            }
            this.shieldUiPanel.load(function () {
                UIManager.getInstance().addUIContainer(_this.shieldUiPanel);
                _this.shieldUiPanel.refresh();
            }, false);
        };
        ShieldUiProcessor.prototype.listenModuleEvents = function () {
            return [
                new ShieldUiEvent(ShieldUiEvent.SHOW_SHIELD_UI_PANEL),
                new ShieldUiEvent(ShieldUiEvent.HIDE_SHIELD_UI_PANEL),
                new ShieldUiEvent(ShieldUiEvent.PLAYER_STRING_FIELD_BLOCK),
            ];
        };
        return ShieldUiProcessor;
    }(BaseProcessor));
    shieldui.ShieldUiProcessor = ShieldUiProcessor;
})(shieldui || (shieldui = {}));
//# sourceMappingURL=ShieldUiProcessor.js.map