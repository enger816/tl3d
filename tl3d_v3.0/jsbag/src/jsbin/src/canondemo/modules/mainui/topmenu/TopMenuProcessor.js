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
var topmenu;
(function (topmenu) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var TopMenuEvent = /** @class */ (function (_super) {
        __extends(TopMenuEvent, _super);
        function TopMenuEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TopMenuEvent.SHOW_TOP_MENU_PANEL = "SHOW_TOP_MENU_PANEL";
        TopMenuEvent.REFRISH_MAIN_TOP_UI = "REFRISH_MAIN_TOP_UI";
        TopMenuEvent.SET_TOP_TITTLE_TXT = "SET_TOP_TITTLE_TXT";
        TopMenuEvent.HIDE_TOP_MENU_PANEL = "HIDE_TOP_MENU_PANEL";
        TopMenuEvent.SHOW_CENTEN_INFO_TXT = "SHOW_CENTEN_INFO_TXT";
        TopMenuEvent.HIDE_CENTEN_INFO_TXT = "HIDE_CENTEN_INFO_TXT";
        return TopMenuEvent;
    }(BaseEvent));
    topmenu.TopMenuEvent = TopMenuEvent;
    var TopMenuModule = /** @class */ (function (_super) {
        __extends(TopMenuModule, _super);
        function TopMenuModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TopMenuModule.prototype.getModuleName = function () {
            return "TopMenuModule";
        };
        TopMenuModule.prototype.listProcessors = function () {
            return [
                new TopMenuProcessor()
            ];
        };
        return TopMenuModule;
    }(Module));
    topmenu.TopMenuModule = TopMenuModule;
    var TopMenuProcessor = /** @class */ (function (_super) {
        __extends(TopMenuProcessor, _super);
        function TopMenuProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TopMenuProcessor.prototype.getName = function () {
            return "TopMenuProcessor";
        };
        TopMenuProcessor.prototype.receivedModuleEvent = function ($event) {
            switch ($event.type) {
                case TopMenuEvent.SHOW_TOP_MENU_PANEL:
                    if (!this._topMenuPanel) {
                        this._topMenuPanel = new topmenu.TopMenuPanel();
                    }
                    this._topMenuPanel.showPanel();
                    break;
                case TopMenuEvent.HIDE_TOP_MENU_PANEL:
                    if (this._topMenuPanel) {
                        this._topMenuPanel.hidePanel();
                    }
                    break;
                case TopMenuEvent.SET_TOP_TITTLE_TXT:
                    if (this._topMenuPanel) {
                        this._topMenuPanel.setTittleTxt($event.data);
                    }
                    break;
                case game.SceneEvent.DIAMONDS_CHANGE_EVENT:
                case game.SceneEvent.SELECT_SCENE_LEVEL:
                case TopMenuEvent.REFRISH_MAIN_TOP_UI:
                    if (this._topMenuPanel) {
                        this._topMenuPanel.refrishUi();
                    }
                    break;
                case TopMenuEvent.SHOW_CENTEN_INFO_TXT:
                    if (this._topMenuPanel && this._topMenuPanel.centreInofTxtView) {
                        this._topMenuPanel.centreInofTxtView.pushTextInfo($event.data);
                    }
                    break;
                case TopMenuEvent.HIDE_CENTEN_INFO_TXT:
                    if (this._topMenuPanel && this._topMenuPanel.centreInofTxtView) {
                        this._topMenuPanel.centreInofTxtView.clearTextInfo($event.data);
                    }
                    break;
                default:
                    break;
            }
        };
        TopMenuProcessor.prototype.listenModuleEvents = function () {
            return [
                new TopMenuEvent(TopMenuEvent.SHOW_TOP_MENU_PANEL),
                new TopMenuEvent(TopMenuEvent.HIDE_TOP_MENU_PANEL),
                new TopMenuEvent(TopMenuEvent.SHOW_CENTEN_INFO_TXT),
                new TopMenuEvent(TopMenuEvent.HIDE_CENTEN_INFO_TXT),
                new TopMenuEvent(TopMenuEvent.SET_TOP_TITTLE_TXT),
                new TopMenuEvent(TopMenuEvent.REFRISH_MAIN_TOP_UI),
                new game.SceneEvent(game.SceneEvent.DIAMONDS_CHANGE_EVENT),
                new game.SceneEvent(game.SceneEvent.SELECT_SCENE_LEVEL),
            ];
        };
        return TopMenuProcessor;
    }(BaseProcessor));
    topmenu.TopMenuProcessor = TopMenuProcessor;
})(topmenu || (topmenu = {}));
//# sourceMappingURL=TopMenuProcessor.js.map