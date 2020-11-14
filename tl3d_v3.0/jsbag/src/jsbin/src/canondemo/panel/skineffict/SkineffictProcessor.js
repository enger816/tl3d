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
var skineffict;
(function (skineffict) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var TimeUtil = Pan3d.TimeUtil;
    var Scene_data = Pan3d.Scene_data;
    var SkineffictEvent = /** @class */ (function (_super) {
        __extends(SkineffictEvent, _super);
        function SkineffictEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SkineffictEvent.SHOW_SKINEFFICT_PANEL = "SHOW_SKINEFFICT_PANEL";
        SkineffictEvent.TEST_SKINEFFICT_ADVERTISE = "TEST_SKINEFFICT_ADVERTISE";
        return SkineffictEvent;
    }(BaseEvent));
    skineffict.SkineffictEvent = SkineffictEvent;
    var SkineffictModule = /** @class */ (function (_super) {
        __extends(SkineffictModule, _super);
        function SkineffictModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SkineffictModule.prototype.getModuleName = function () {
            return "SkineffictModule";
        };
        SkineffictModule.prototype.listProcessors = function () {
            return [
                new SkineffictProcessor()
            ];
        };
        return SkineffictModule;
    }(Module));
    skineffict.SkineffictModule = SkineffictModule;
    var SkineffictProcessor = /** @class */ (function (_super) {
        __extends(SkineffictProcessor, _super);
        function SkineffictProcessor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.canTestAdverTm = 0;
            return _this;
        }
        SkineffictProcessor.prototype.getName = function () {
            return "SkineffictProcessor";
        };
        SkineffictProcessor.prototype.receivedModuleEvent = function ($event) {
            switch ($event.type) {
                case SkineffictEvent.SHOW_SKINEFFICT_PANEL:
                    if (!this.skineffictPanel) {
                        this.skineffictPanel = new skineffict.SkineffictPanel();
                    }
                    this.skineffictPanel.showPanel();
                    break;
                case SkineffictEvent.TEST_SKINEFFICT_ADVERTISE:
                    this.testAdvertise();
                    break;
                case mainui.MainuiEvent.SHOW_MAIN_UI_PANEL:
                    if (!GameData.getStorageSync("isUseEffictSkin")) {
                        if (GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL) >= 14 && !this.isFrist) {
                            TimeUtil.addTimeOut(3000, function () {
                                rightpanda.PandaMeshData.showRightPanda(rightpanda.PandaMeshData.key17, Scene_data.fileRoot + "ui/panda/17.png", new SkineffictEvent(SkineffictEvent.SHOW_SKINEFFICT_PANEL));
                            });
                            this.isFrist = true;
                        }
                    }
                    break;
                default:
                    break;
            }
        };
        SkineffictProcessor.prototype.testAdvertise = function () {
            var _this = this;
            if (GameData.getStorageSync("isUseEffictSkin")) {
                console.log("已使用过就不再进行判断");
                return;
            }
            if (TimeUtil.getTimer() < this.canTestAdverTm) {
                //防止重复申请
                return;
            }
            this.canTestAdverTm = TimeUtil.getTimer() + 9 * 1000;
            var $postStr = "";
            $postStr += "openid=" + GameData.getStorageSync("openid");
            $postStr += "&time=" + 0;
            $postStr += "&type=" + 4;
            GameData.WEB_SEVER_EVENT_AND_BACK("get_advertise_list", $postStr, function (res) {
                if (res && res.data && res.data.list && res.data.list.length) {
                    GameData.setStorageSync("isUseEffictSkin", true); //使用过了
                    GameData.setStorageSync("useEffictSkin", true);
                    game.GameDataModel.changeMainEffict();
                    Pan3d.ModuleEventManager.dispatchEvent(new topmenu.TopMenuEvent(topmenu.TopMenuEvent.REFRISH_MAIN_TOP_UI));
                    rightpanda.PandaMeshData.hideCentenTxtInfoType2(rightpanda.PandaMeshData.key106);
                }
                else {
                    TimeUtil.addTimeOut(10 * 1000, function () {
                        _this.testAdvertise();
                        console.log("继续等待", TimeUtil.getTimer());
                    });
                }
            });
        };
        SkineffictProcessor.prototype.listenModuleEvents = function () {
            return [
                new SkineffictEvent(SkineffictEvent.SHOW_SKINEFFICT_PANEL),
                new SkineffictEvent(SkineffictEvent.TEST_SKINEFFICT_ADVERTISE),
                new mainui.MainuiEvent(mainui.MainuiEvent.SHOW_MAIN_UI_PANEL),
            ];
        };
        return SkineffictProcessor;
    }(BaseProcessor));
    skineffict.SkineffictProcessor = SkineffictProcessor;
})(skineffict || (skineffict = {}));
//# sourceMappingURL=SkineffictProcessor.js.map