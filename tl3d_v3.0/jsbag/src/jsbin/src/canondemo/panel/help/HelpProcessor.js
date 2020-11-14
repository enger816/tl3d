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
    var TimeUtil = Pan3d.TimeUtil;
    var GameDataModel = game.GameDataModel;
    var SceneEvent = game.SceneEvent;
    var PandaMeshData = rightpanda.PandaMeshData;
    var HelpEvent = /** @class */ (function (_super) {
        __extends(HelpEvent, _super);
        function HelpEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HelpEvent.SHOW_HELP_LIST_PANEL = "SHOW_HELP_LIST_PANEL";
        HelpEvent.HIDE_HELP_LIST_PANEL = "HIDE_HELP_LIST_PANEL";
        HelpEvent.SHOW_HELP_ME_PANEL = "SHOW_HELP_SPEED_PANEL";
        HelpEvent.SHOW_HELP_OTHER_PANEL = "SHOW_HELP_OTHER_PANEL";
        HelpEvent.CHECK_SELF_HELP_INFO = "CHECK_SELF_HELP_INFO";
        return HelpEvent;
    }(BaseEvent));
    help.HelpEvent = HelpEvent;
    var HelpModule = /** @class */ (function (_super) {
        __extends(HelpModule, _super);
        function HelpModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HelpModule.prototype.getModuleName = function () {
            return "HelpModule";
        };
        HelpModule.prototype.listProcessors = function () {
            return [new HelpProcessor()
            ];
        };
        return HelpModule;
    }(Module));
    help.HelpModule = HelpModule;
    var HelpProcessor = /** @class */ (function (_super) {
        __extends(HelpProcessor, _super);
        function HelpProcessor() {
            return _super.call(this) || this;
        }
        HelpProcessor.prototype.getName = function () {
            return "HelpProcessor";
        };
        HelpProcessor.prototype.check_self_help_info = function () {
            var _this = this;
            GameData.WEB_SEVER_EVENT_AND_BACK("get_help_info", "openid=" + GameData.getStorageSync("openid"), function (res) {
                if (res && res.data && res.data.success) {
                    if (res.data.info) {
                        var $vo = new HelpOtherVo();
                        $vo.meshObj(res.data.info);
                        if ($vo.state == 1) {
                            console.log("有人帮助了我,每10秒检测试一下有没有帮助成功", $vo);
                            TimeUtil.addTimeOut(1000 * 10, function () { _this.check_self_help_info(); });
                            rightpanda.PandaMeshData.showCentenTxtInfoType(rightpanda.PandaMeshData.key101, Pan3d.ColorType.Black000000 + "正在求助通过第 " + Pan3d.ColorType.Redff0000 + $vo.level + Pan3d.ColorType.Black000000 + " 关", function () {
                                msgalert.AlertUtil.show("是否取消求助", "提示", function (value) {
                                    if (value == 1) {
                                        GameData.WEB_SEVER_EVENT_AND_BACK("check_help_info", "openid=" + GameData.getStorageSync("openid"));
                                    }
                                    else {
                                        _this.check_self_help_info();
                                    }
                                }, 2);
                            });
                        }
                        if ($vo.state == 2) {
                            PandaMeshData.showRightPanda(PandaMeshData.key2, $vo.helpAvatarUrl, function () {
                                GameData.dispatchEvent(new HelpEvent(HelpEvent.SHOW_HELP_ME_PANEL), $vo);
                            });
                            rightpanda.PandaMeshData.hideCentenTxtInfoType2(rightpanda.PandaMeshData.key101);
                        }
                    }
                }
                else {
                    TimeUtil.addTimeOut(1000 * 10, function () { _this.check_self_help_info(); });
                }
            });
        };
        HelpProcessor.prototype.receivedModuleEvent = function ($event) {
            var _this = this;
            switch ($event.type) {
                case HelpEvent.SHOW_HELP_LIST_PANEL:
                    var $postStr = "";
                    $postStr += "level=" + GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL);
                    $postStr += "&openid=" + GameData.getStorageSync("openid");
                    GameData.WEB_SEVER_EVENT_AND_BACK("find_random_help_list", $postStr, function (res) {
                        if (res && res.data && res.data.list && res.data.list.length) {
                            if (!_this._helpCallPanel) {
                                _this._helpCallPanel = new help.HelpListPanelView();
                            }
                            _this._helpCallPanel.showPanel();
                            _this._helpCallPanel.refrishData(res.data.list);
                        }
                        else {
                            msgalert.AlertUtil.show("没有需要帮助的人");
                        }
                    });
                    break;
                case HelpEvent.HIDE_HELP_LIST_PANEL:
                    if (this._helpCallPanel) {
                        this._helpCallPanel.hidePanel();
                    }
                    break;
                case HelpEvent.CHECK_SELF_HELP_INFO:
                    TimeUtil.addTimeOut(1000 * 1, function () { _this.check_self_help_info(); });
                    break;
                case HelpEvent.SHOW_HELP_ME_PANEL:
                    if (!this._helpSpeedPanel) {
                        this._helpSpeedPanel = new help.OtherHelpMePanel();
                    }
                    this._helpSpeedPanel.showPanel();
                    this._helpSpeedPanel.refrishData($event.data);
                    break;
                case HelpEvent.SHOW_HELP_OTHER_PANEL:
                    this.showHelpOtherPanel($event.data);
                    break;
                default:
                    break;
            }
        };
        HelpProcessor.prototype.showHelpOtherPanel = function (value) {
            if (!this.help2InfoPanel) {
                this.help2InfoPanel = new help.HelpOtherPanel();
            }
            this.help2InfoPanel.refrish2Data(value);
            this.help2InfoPanel.showPanel();
            var helperinfoStr = GameData.userInfo.nickName + "|" + GameData.userInfo.avatarUrl;
            var $postStr = "";
            $postStr += "level=" + GameDataModel.levelNum;
            $postStr += "&openid=" + value.openid;
            $postStr += "&helper_info=" + helperinfoStr;
            GameData.WEB_SEVER_EVENT_AND_BACK("finish_help", $postStr);
            PandaMeshData.hideCentenTxtInfoType2(PandaMeshData.key105);
            GameData.helpinfo = null;
        };
        HelpProcessor.prototype.listenModuleEvents = function () {
            return [
                new HelpEvent(HelpEvent.SHOW_HELP_LIST_PANEL),
                new HelpEvent(HelpEvent.HIDE_HELP_LIST_PANEL),
                new HelpEvent(HelpEvent.SHOW_HELP_ME_PANEL),
                new HelpEvent(HelpEvent.SHOW_HELP_OTHER_PANEL),
                new HelpEvent(HelpEvent.CHECK_SELF_HELP_INFO),
                new HelpEvent(SceneEvent.INIT_SCENE_CONFIG),
            ];
        };
        return HelpProcessor;
    }(BaseProcessor));
    help.HelpProcessor = HelpProcessor;
})(help || (help = {}));
//# sourceMappingURL=HelpProcessor.js.map