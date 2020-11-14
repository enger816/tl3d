var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var colorview;
(function (colorview) {
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var BaseProcessor = Pan3d.BaseProcessor;
    var ColorEvent = /** @class */ (function (_super) {
        __extends(ColorEvent, _super);
        function ColorEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ColorEvent.SHOW_COLOR_PANEL = "SHOW_COLOR_PANEL";
        ColorEvent.HIDE_COLOR_PANEL = "HIDE_COLOR_PANEL";
        return ColorEvent;
    }(BaseEvent));
    colorview.ColorEvent = ColorEvent;
    var ColorModule = /** @class */ (function (_super) {
        __extends(ColorModule, _super);
        function ColorModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ColorModule.prototype.getModuleName = function () {
            return "ColorModule";
        };
        ColorModule.prototype.listProcessors = function () {
            return [new ColorProcessor()];
        };
        return ColorModule;
    }(Module));
    colorview.ColorModule = ColorModule;
    var ColorProcessor = /** @class */ (function (_super) {
        __extends(ColorProcessor, _super);
        function ColorProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ColorProcessor.prototype.getName = function () {
            return "ColorProcessor";
        };
        ColorProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof ColorEvent) {
                var $colorEvent = $event;
                if ($colorEvent.type == ColorEvent.SHOW_COLOR_PANEL) {
                    this.showColorPanel($colorEvent.v3dColor, $colorEvent.bfun);
                }
                if ($colorEvent.type == ColorEvent.HIDE_COLOR_PANEL) {
                    this.hideColorPanel();
                }
            }
        };
        ColorProcessor.prototype.hideColorPanel = function () {
            if (this.colorPanel) {
                this.colorWinPanel.removeUIContainer(this.colorPanel);
                this.colorPanel = null;
            }
        };
        ColorProcessor.prototype.showColorPanel = function ($v3d, $bfun) {
            var _this = this;
            if (!this.colorWinPanel) {
                this.colorWinPanel = new win.Panel();
                win.LayerManager.getInstance().addPanel(this.colorWinPanel, 500);
            }
            if (!this.colorPanel) {
                this.colorPanel = new colorview.ColorPanel;
                this.colorPanel.load(function () {
                    _this.colorPanel.initColor($v3d, $bfun);
                });
            }
            this.colorWinPanel.addUIContainer(this.colorPanel);
        };
        ColorProcessor.prototype.listenModuleEvents = function () {
            return [
                new ColorEvent(ColorEvent.SHOW_COLOR_PANEL),
                new ColorEvent(ColorEvent.HIDE_COLOR_PANEL),
            ];
        };
        return ColorProcessor;
    }(BaseProcessor));
    colorview.ColorProcessor = ColorProcessor;
})(colorview || (colorview = {}));
//# sourceMappingURL=ColorProcessor.js.map