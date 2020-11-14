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
var menuselectpan;
(function (menuselectpan) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var MenuSelectEvent = /** @class */ (function (_super) {
        __extends(MenuSelectEvent, _super);
        function MenuSelectEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MenuSelectEvent.SHOW_MENU_SELECT_PANEL = "SHOW_MENU_SELECT_PANEL";
        return MenuSelectEvent;
    }(BaseEvent));
    menuselectpan.MenuSelectEvent = MenuSelectEvent;
    var MenuSelectModule = /** @class */ (function (_super) {
        __extends(MenuSelectModule, _super);
        function MenuSelectModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MenuSelectModule.prototype.getModuleName = function () {
            return "MenuSelectModule";
        };
        MenuSelectModule.prototype.listProcessors = function () {
            return [
                new GameStartProcessor()
            ];
        };
        return MenuSelectModule;
    }(Module));
    menuselectpan.MenuSelectModule = MenuSelectModule;
    var GameStartProcessor = /** @class */ (function (_super) {
        __extends(GameStartProcessor, _super);
        function GameStartProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GameStartProcessor.prototype.getName = function () {
            return "GameStartProcessor";
        };
        GameStartProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof MenuSelectEvent) {
                var $endLessEvent = $event;
                switch ($endLessEvent.type) {
                    case MenuSelectEvent.SHOW_MENU_SELECT_PANEL:
                        if (!this._menuSelectPanel) {
                            this._menuSelectPanel = new menuselectpan.MenuSelectPanel();
                        }
                        else {
                            this._menuSelectPanel.showPanel();
                        }
                        break;
                    default:
                        break;
                }
            }
        };
        GameStartProcessor.prototype.listenModuleEvents = function () {
            return [
                new MenuSelectEvent(MenuSelectEvent.SHOW_MENU_SELECT_PANEL),
            ];
        };
        return GameStartProcessor;
    }(BaseProcessor));
    menuselectpan.GameStartProcessor = GameStartProcessor;
})(menuselectpan || (menuselectpan = {}));
//# sourceMappingURL=MenuSelectProcessor.js.map