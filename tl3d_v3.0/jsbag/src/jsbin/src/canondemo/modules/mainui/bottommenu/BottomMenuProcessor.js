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
var bottommenuA;
(function (bottommenuA) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var BottomMenuEvent = /** @class */ (function (_super) {
        __extends(BottomMenuEvent, _super);
        function BottomMenuEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BottomMenuEvent.SHOW_BOTTOM_MENU_PANEL = "SHOW_BOTTOM_MENU_PANEL";
        BottomMenuEvent.HIDE_BOTTOM_MENU_PANEL = "HIDE_BOTTOM_MENU_PANEL";
        return BottomMenuEvent;
    }(BaseEvent));
    bottommenuA.BottomMenuEvent = BottomMenuEvent;
    var BottomMenuModule = /** @class */ (function (_super) {
        __extends(BottomMenuModule, _super);
        function BottomMenuModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BottomMenuModule.prototype.getModuleName = function () {
            return "BottomMenuModule";
        };
        BottomMenuModule.prototype.listProcessors = function () {
            return [
                new BottomMenuProcessor(),
            ];
        };
        return BottomMenuModule;
    }(Module));
    bottommenuA.BottomMenuModule = BottomMenuModule;
    var BottomMenuProcessor = /** @class */ (function (_super) {
        __extends(BottomMenuProcessor, _super);
        function BottomMenuProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BottomMenuProcessor.prototype.getName = function () {
            return "BottomMenuProcessor";
        };
        BottomMenuProcessor.prototype.receivedModuleEvent = function ($event) {
            switch ($event.type) {
                case BottomMenuEvent.SHOW_BOTTOM_MENU_PANEL:
                    if (!this._bottomMenuPanel) {
                        this._bottomMenuPanel = new bottommenuA.BottomMenuPanel();
                    }
                    this._bottomMenuPanel.showPanel();
                    break;
                case BottomMenuEvent.HIDE_BOTTOM_MENU_PANEL:
                    if (this._bottomMenuPanel) {
                        this._bottomMenuPanel.hidePanel();
                    }
                    break;
                default:
                    break;
            }
        };
        BottomMenuProcessor.prototype.listenModuleEvents = function () {
            return [
                new BottomMenuEvent(BottomMenuEvent.SHOW_BOTTOM_MENU_PANEL),
                new BottomMenuEvent(BottomMenuEvent.HIDE_BOTTOM_MENU_PANEL),
            ];
        };
        return BottomMenuProcessor;
    }(BaseProcessor));
    bottommenuA.BottomMenuProcessor = BottomMenuProcessor;
})(bottommenuA || (bottommenuA = {}));
//# sourceMappingURL=BottomMenuProcessor.js.map