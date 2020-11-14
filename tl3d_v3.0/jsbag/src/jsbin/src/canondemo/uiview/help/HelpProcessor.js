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
var help;
(function (help) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var HelpCallPanel = helpcall.HelpCallPanel;
    var HelpSpeedPanel = helpspeed.HelpSpeedPanel;
    var HelpViewEvent = /** @class */ (function (_super) {
        __extends(HelpViewEvent, _super);
        function HelpViewEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HelpViewEvent.SHOW_HELP_CALL_PANEL = "SHOW_HELP_CALL_PANEL";
        HelpViewEvent.HIDE_HELP_CALL_PANEL = "HIDE_HELP_CALL_PANEL";
        HelpViewEvent.SHOW_HELP_SPEED_PANEL = "SHOW_HELP_SPEED_PANEL";
        HelpViewEvent.HIDE_HELP_SPEED_PANEL = "HIDE_HELP_SPEED_PANEL";
        return HelpViewEvent;
    }(BaseEvent));
    help.HelpViewEvent = HelpViewEvent;
    var HelpViewModule = /** @class */ (function (_super) {
        __extends(HelpViewModule, _super);
        function HelpViewModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HelpViewModule.prototype.getModuleName = function () {
            return "HelpViewModule";
        };
        HelpViewModule.prototype.listProcessors = function () {
            return [new HelpProcessor()
            ];
        };
        return HelpViewModule;
    }(Module));
    help.HelpViewModule = HelpViewModule;
    var HelpProcessor = /** @class */ (function (_super) {
        __extends(HelpProcessor, _super);
        function HelpProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HelpProcessor.prototype.getName = function () {
            return "HelpProcessor";
        };
        HelpProcessor.prototype.receivedModuleEvent = function ($event) {
            var _this = this;
            if ($event instanceof HelpViewEvent) {
                var $helpViewEvent = $event;
                if ($helpViewEvent.type == HelpViewEvent.SHOW_HELP_CALL_PANEL) {
                    var $postStr = "";
                    $postStr += "level=" + GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL);
                    $postStr += "&openid=" + GameData.getStorageSync("openid");
                    GameData.WEB_SEVER_EVENT_AND_BACK("find_random_help_list", $postStr, function (res) {
                        if (res && res.data && res.data.list && res.data.list.length) {
                            if (!_this._helpCallPanel) {
                                _this._helpCallPanel = new HelpCallPanel();
                            }
                            _this._helpCallPanel.showPanel();
                            _this._helpCallPanel.refrishData(res.data.list);
                        }
                        else {
                            msgalert.AlertUtil.show("没有需要帮助的人");
                        }
                    });
                }
                if ($helpViewEvent.type == HelpViewEvent.HIDE_HELP_CALL_PANEL) {
                    if (this._helpCallPanel) {
                        this._helpCallPanel.hidePanel();
                    }
                }
                if ($helpViewEvent.type == HelpViewEvent.SHOW_HELP_SPEED_PANEL) {
                    if (!this._helpSpeedPanel) {
                        this._helpSpeedPanel = new HelpSpeedPanel();
                    }
                    else {
                        this._helpSpeedPanel.showPanel();
                    }
                    this._helpSpeedPanel.refrishData($helpViewEvent.data);
                }
                if ($helpViewEvent.type == HelpViewEvent.HIDE_HELP_SPEED_PANEL) {
                    if (this._helpSpeedPanel) {
                        this._helpSpeedPanel.hidePanel();
                    }
                }
            }
        };
        HelpProcessor.prototype.listenModuleEvents = function () {
            return [
                new HelpViewEvent(HelpViewEvent.SHOW_HELP_CALL_PANEL),
                new HelpViewEvent(HelpViewEvent.HIDE_HELP_CALL_PANEL),
                new HelpViewEvent(HelpViewEvent.SHOW_HELP_SPEED_PANEL),
                new HelpViewEvent(HelpViewEvent.HIDE_HELP_SPEED_PANEL),
            ];
        };
        return HelpProcessor;
    }(BaseProcessor));
    help.HelpProcessor = HelpProcessor;
})(help || (help = {}));
//# sourceMappingURL=HelpProcessor.js.map