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
var vip;
(function (vip) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var TimeUtil = Pan3d.TimeUtil;
    var SceneEvent = game.SceneEvent;
    var VipEvent = /** @class */ (function (_super) {
        __extends(VipEvent, _super);
        function VipEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        VipEvent.SHOW_VIP_PANEL = "SHOW_VIP_PANEL";
        return VipEvent;
    }(BaseEvent));
    vip.VipEvent = VipEvent;
    var VipModule = /** @class */ (function (_super) {
        __extends(VipModule, _super);
        function VipModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        VipModule.prototype.getModuleName = function () {
            return "VipModule";
        };
        VipModule.prototype.listProcessors = function () {
            return [
                new VipProcessor()
            ];
        };
        return VipModule;
    }(Module));
    vip.VipModule = VipModule;
    var VipProcessor = /** @class */ (function (_super) {
        __extends(VipProcessor, _super);
        function VipProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        VipProcessor.prototype.getName = function () {
            return "VipProcessor";
        };
        VipProcessor.prototype.receivedModuleEvent = function ($event) {
            var _this = this;
            switch ($event.type) {
                case VipEvent.SHOW_VIP_PANEL:
                    if (!this._vipPanel) {
                        this._vipPanel = new vip.VipPanel();
                    }
                    this._vipPanel.showPanel();
                    break;
                case SceneEvent.WX_ON_SHOW:
                    if (!GameData.getStorageSync("isvip")) {
                        TimeUtil.addTimeOut(3000, function () {
                            _this.wxOnShow($event.data);
                        });
                    }
                    break;
                default:
                    break;
            }
        };
        VipProcessor.prototype.wxOnShow = function (value) {
            console.log("接收到群连接进来的", value);
            var query = value.query;
            if (query && query.sharetype == AllShareMeshVo.type12) {
                if (GameData.getStorageSync("openid") == query.openid) {
                    if (value.scene == 1044) {
                        msgalert.AlertUtil.show("已开启vip权限，点击vip可变化场景");
                        GameData.setStorageSync("isvip", true);
                        Pan3d.ModuleEventManager.dispatchEvent(new topmenu.TopMenuEvent(topmenu.TopMenuEvent.REFRISH_MAIN_TOP_UI));
                        if (this._vipPanel) {
                            this._vipPanel.hidePanel();
                        }
                    }
                    else {
                        msgalert.AlertUtil.show("需要从聊天群的连接进入才能获取VIP权限", "提示", function (value) {
                            if (value == 1) {
                                Pan3d.ModuleEventManager.dispatchEvent(new VipEvent(VipEvent.SHOW_VIP_PANEL));
                            }
                        }, 2);
                    }
                }
            }
        };
        VipProcessor.prototype.listenModuleEvents = function () {
            return [
                new VipEvent(VipEvent.SHOW_VIP_PANEL),
                new game.SceneEvent(game.SceneEvent.WX_ON_SHOW)
            ];
        };
        return VipProcessor;
    }(BaseProcessor));
    vip.VipProcessor = VipProcessor;
})(vip || (vip = {}));
//# sourceMappingURL=VipProcessor.js.map