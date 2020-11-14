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
var skinui;
(function (skinui) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var TimeUtil = Pan3d.TimeUtil;
    var GameDataModel = game.GameDataModel;
    var SkinListEvent = /** @class */ (function (_super) {
        __extends(SkinListEvent, _super);
        function SkinListEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SkinListEvent.SHOW_SKIN_LIST_PANEL = "SHOW_SKIN_LIST_PANEL";
        SkinListEvent.HIDE_SKIN_LIST_PANEL = "HIDE_SKIN_LIST_PANEL";
        SkinListEvent.LEVEL_UP_TEST_NEED_SKIN = "LEVEL_UP_TEST_NEED_SKIN";
        return SkinListEvent;
    }(BaseEvent));
    skinui.SkinListEvent = SkinListEvent;
    var SkinListModule = /** @class */ (function (_super) {
        __extends(SkinListModule, _super);
        function SkinListModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SkinListModule.prototype.getModuleName = function () {
            return "SkinListModule";
        };
        SkinListModule.prototype.listProcessors = function () {
            return [
                new SkinListProcessor()
            ];
        };
        return SkinListModule;
    }(Module));
    skinui.SkinListModule = SkinListModule;
    var SkinListProcessor = /** @class */ (function (_super) {
        __extends(SkinListProcessor, _super);
        function SkinListProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SkinListProcessor.prototype.getName = function () {
            return "SkinListProcessor";
        };
        SkinListProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof SkinListEvent) {
                //  var $endLessEvent: SkinListEvent = <SkinListEvent>$event;
            }
            switch ($event.type) {
                case SkinListEvent.SHOW_SKIN_LIST_PANEL:
                    if (!this._SkinListPanel) {
                        this._SkinListPanel = new skinui.SkinListPanel();
                    }
                    this._SkinListPanel.showPanel();
                    break;
                case SkinListEvent.HIDE_SKIN_LIST_PANEL:
                    this._SkinListPanel.hidePanel();
                    break;
                case SkinListEvent.LEVEL_UP_TEST_NEED_SKIN:
                    var $haveSkinList = GameData.getStorageSync("haveSkinList");
                    if (!$haveSkinList) {
                        $haveSkinList = new Array();
                    }
                    if (GameData.hasdiamondsHavenum >= 10 && !GameData.getStorageSync("isUseEffictSkin")) {
                        TimeUtil.addTimeOut(1000, function () {
                            if (GameDataModel.levelNum > 10 && $haveSkinList.length < 1) {
                                msgalert.AlertUtil.show("需要购买一个新皮肤才能继续进行", "提示", function (value) {
                                    if (value == 1) {
                                        Pan3d.ModuleEventManager.dispatchEvent(new SkinListEvent(SkinListEvent.SHOW_SKIN_LIST_PANEL));
                                    }
                                }, 2);
                            }
                        });
                    }
                    break;
                default:
                    break;
            }
        };
        SkinListProcessor.prototype.listenModuleEvents = function () {
            return [
                new SkinListEvent(SkinListEvent.SHOW_SKIN_LIST_PANEL),
                new SkinListEvent(SkinListEvent.HIDE_SKIN_LIST_PANEL),
                new SkinListEvent(SkinListEvent.LEVEL_UP_TEST_NEED_SKIN),
            ];
        };
        return SkinListProcessor;
    }(BaseProcessor));
    skinui.SkinListProcessor = SkinListProcessor;
})(skinui || (skinui = {}));
//# sourceMappingURL=SkinListProcessor.js.map