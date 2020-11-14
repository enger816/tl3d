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
var offline;
(function (offline) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var TimeUtil = Pan3d.TimeUtil;
    var SceneEvent = game.SceneEvent;
    var OffLineEvent = /** @class */ (function (_super) {
        __extends(OffLineEvent, _super);
        function OffLineEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OffLineEvent.SHOW_OFFLINE_PANEL = "SHOW_OFFLINE_PANEL";
        return OffLineEvent;
    }(BaseEvent));
    offline.OffLineEvent = OffLineEvent;
    var OffLineModule = /** @class */ (function (_super) {
        __extends(OffLineModule, _super);
        function OffLineModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OffLineModule.prototype.getModuleName = function () {
            return "OffLineModule";
        };
        OffLineModule.prototype.listProcessors = function () {
            return [
                new OffLineProcessor()
            ];
        };
        return OffLineModule;
    }(Module));
    offline.OffLineModule = OffLineModule;
    var OffLineProcessor = /** @class */ (function (_super) {
        __extends(OffLineProcessor, _super);
        function OffLineProcessor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isFrist = true;
            return _this;
        }
        OffLineProcessor.prototype.getName = function () {
            return "OffLineProcessor";
        };
        OffLineProcessor.prototype.receivedModuleEvent = function ($event) {
            switch ($event.type) {
                case SceneEvent.WX_ON_SHOW:
                    TimeUtil.addTimeOut(1000, function () {
                        Pan3d.ModuleEventManager.dispatchEvent(new OffLineEvent(OffLineEvent.SHOW_OFFLINE_PANEL));
                    });
                    break;
                case OffLineEvent.SHOW_OFFLINE_PANEL:
                    if (GameData.severinfo.wxcloudModel == 1) {
                        return;
                    }
                    if (GameData.hasWinPanel) {
                        return;
                    }
                    var $offLineTm = GameData.getStorageSyncNumber("offlinetime"); //上次离线时间
                    var $tm = GameData.getSeverTime() - $offLineTm; //离线时间
                    console.log("离时间", Pan3d.TimeUtil.getDiffTime1(Math.floor($tm / 1000)));
                    if (!GameData.getStorageSync("isUseEffictSkin") && GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL) >= 15 && Math.floor($tm / 1000) > 60) {
                        //如果还没有领取过魔法球，离线收益就变成提示需要显示魔法球
                        Pan3d.TimeUtil.addTimeOut(1000, function () {
                            Pan3d.ModuleEventManager.dispatchEvent(new skineffict.SkineffictEvent(skineffict.SkineffictEvent.SHOW_SKINEFFICT_PANEL));
                        });
                    }
                    else {
                        offline.OffLinePanel.offLineMessVo = new offline.OffLineMessVo(GameData.severinfo.offline);
                        if (offline.OffLinePanel.offLineMessVo.open && offline.OffLinePanel.offLineMessVo.openlevel <= GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL)) {
                            if ($offLineTm > 0 && $tm > offline.OffLinePanel.offLineMessVo.mintm * 1000) {
                                if (!this.offLinePanel) {
                                    this.offLinePanel = new offline.OffLinePanel();
                                }
                                this.offLinePanel.tmsecond = Math.floor($tm / 1000);
                                this.offLinePanel.showPanel();
                            }
                            else {
                                console.log("时间没到领取离线时间", Math.floor($tm / 1000));
                            }
                            GameData.setStorageSync("offlinetime", GameData.getSeverTime()); //更新离线时间，也包含了onhide也有写
                        }
                    }
                    break;
                case mainui.MainuiEvent.SHOW_MAIN_UI_PANEL:
                    if (this.isFrist) {
                        //每次程序启动走一次
                        this.isFrist = false;
                        TimeUtil.addTimeOut(1000, function () {
                            Pan3d.ModuleEventManager.dispatchEvent(new OffLineEvent(OffLineEvent.SHOW_OFFLINE_PANEL));
                        });
                    }
                    break;
                default:
                    break;
            }
        };
        OffLineProcessor.prototype.listenModuleEvents = function () {
            return [
                new OffLineEvent(OffLineEvent.SHOW_OFFLINE_PANEL),
                new SceneEvent(SceneEvent.WX_ON_SHOW),
                new mainui.MainuiEvent(mainui.MainuiEvent.SHOW_MAIN_UI_PANEL),
            ];
        };
        return OffLineProcessor;
    }(BaseProcessor));
    offline.OffLineProcessor = OffLineProcessor;
})(offline || (offline = {}));
//# sourceMappingURL=OffLineProcessor.js.map