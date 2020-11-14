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
var adventurebang;
(function (adventurebang) {
    var AdventureBangModule = /** @class */ (function (_super) {
        __extends(AdventureBangModule, _super);
        function AdventureBangModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AdventureBangModule.prototype.getModuleName = function () {
            return "AdventureBangModule";
        };
        AdventureBangModule.prototype.listProcessors = function () {
            return [new AdventureBangProcessor()];
        };
        return AdventureBangModule;
    }(Module));
    adventurebang.AdventureBangModule = AdventureBangModule;
    var AdventureBangEvent = /** @class */ (function (_super) {
        __extends(AdventureBangEvent, _super);
        function AdventureBangEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AdventureBangEvent.SHOW_ADVENTURE_BANG_PANEL = "SHOW_ADVENTURE_BANG_PANEL";
        AdventureBangEvent.HIDE_ADVENTURE_BANG_PANEL = "HIDE_ADVENTURE_BANG_PANEL";
        return AdventureBangEvent;
    }(BaseEvent));
    adventurebang.AdventureBangEvent = AdventureBangEvent;
    var AdventureBangProcessor = /** @class */ (function (_super) {
        __extends(AdventureBangProcessor, _super);
        function AdventureBangProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AdventureBangProcessor.prototype.getName = function () {
            return "AdventureBangProcessor";
        };
        AdventureBangProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof AdventureBangEvent) {
                var evt = $event;
                if (evt.type == AdventureBangEvent.SHOW_ADVENTURE_BANG_PANEL) {
                    this.showPanel();
                }
                if (this.adventureBangPanel) {
                    if (evt.type == AdventureBangEvent.HIDE_ADVENTURE_BANG_PANEL) {
                        this.hidePanel();
                    }
                }
            }
        };
        AdventureBangProcessor.prototype.hidePanel = function () {
            if (this.adventureBangPanel) {
                UIManager.getInstance().removeUIContainer(this.adventureBangPanel);
            }
        };
        AdventureBangProcessor.prototype.showPanel = function () {
            var _this = this;
            if (!this.adventureBangPanel) {
                this.adventureBangPanel = new adventurebang.AdventureBangPanel();
            }
            this.adventureBangPanel.load(function () {
                UIManager.getInstance().addUIContainer(_this.adventureBangPanel);
                _this.adventureBangPanel.refresh();
            }, false);
        };
        AdventureBangProcessor.prototype.listenModuleEvents = function () {
            return [
                new AdventureBangEvent(AdventureBangEvent.SHOW_ADVENTURE_BANG_PANEL),
                new AdventureBangEvent(AdventureBangEvent.HIDE_ADVENTURE_BANG_PANEL),
            ];
        };
        return AdventureBangProcessor;
    }(BaseProcessor));
    adventurebang.AdventureBangProcessor = AdventureBangProcessor;
})(adventurebang || (adventurebang = {}));
//# sourceMappingURL=AdventureBangProcessor.js.map