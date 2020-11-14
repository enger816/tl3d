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
var uiview;
(function (uiview) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var UIManager = Pan3d.UIManager;
    var Vector3D = Pan3d.Vector3D;
    var TimeUtil = Pan3d.TimeUtil;
    var Scene_data = Pan3d.Scene_data;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var SceneEvent = game.SceneEvent;
    var GameDataModel = game.GameDataModel;
    var SkinListlPanel = skin.SkinListPanel;
    var SetupWinPanel = setup.SetupWinPanel;
    var ResetPlayPanel = ccav.ResetPlayPanel;
    var SelectLevelPanel = level.SelectLevelPanel;
    var MenuSelectPanel = menuselect.MenuSelectPanel;
    var TopUiViewEvent = /** @class */ (function (_super) {
        __extends(TopUiViewEvent, _super);
        function TopUiViewEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TopUiViewEvent.SHOW_TOP_MENU_VIEW = "SHOW_TOP_MENU_VIEW";
        TopUiViewEvent.SHOW_LEVEL_LOSET_VIEW = "SHOW_LEVEL_LOSET_VIEW";
        TopUiViewEvent.SHOW_LEVEL_UP_VIEW = "SHOW_LEVEL_UP_VIEW";
        TopUiViewEvent.SHOW_LOG_TXT = "SHOW_LOG_TXT";
        TopUiViewEvent.SHOW_SPECIAL_EFFECT = "SHOW_SPECIAL_EFFECT";
        TopUiViewEvent.SHOW_TOP_START_VIEW = "SHOW_TOP_START_VIEW";
        TopUiViewEvent.SHOW_ALL_BANG_VIEW = "SHOW_ALL_BANG_VIEW";
        TopUiViewEvent.SHOW_SKIN_LIST_PANEL = "SHOW_SKIN_LIST_PANEL";
        TopUiViewEvent.SHOW_HIDE_LOG_TXT_PANEL = "SHOW_HIDE_LOG_TXT_PANEL";
        TopUiViewEvent.SHOW_SELECT_LEVEL_PANEL = "SHOW_SELECT_LEVEL_PANEL";
        TopUiViewEvent.SHOW_SELECT_MENU_PANEL = "SHOW_SELECT_MENU_PANEL";
        TopUiViewEvent.SHOW_SETUP_WIN_PANEL = "SHOW_SETUP_WIN_PANEL";
        TopUiViewEvent.REFRISH_MAIN_UI = "REFRISH_MAIN_UI";
        TopUiViewEvent.SHOW_SHARE_WX_WINDOW_PANEL = "SHOW_SHARE_WX_WINDOW_PANEL";
        TopUiViewEvent.SHOW_NEED_HELP_PANDA_PANEL = "SHOW_NEED_HELP_PANDA_PANEL";
        TopUiViewEvent.HIDE_SKIN_LIST_PANEL = "HIDE_SKIN_LIST_PANEL";
        TopUiViewEvent.SHOW_WAIT_HELP_USER_ICON_PIC = "SHOW_WAIT_HELP_USER_ICON_PIC";
        TopUiViewEvent.SHOW_PANDA_INFO = "SHOW_PANDA_INFO";
        TopUiViewEvent.SHOW_PROGRESS_BAR = "SHOW_PROGRESS_BAR";
        TopUiViewEvent.CLEAR_PANDA_INFO = "CLEAR_PANDA_INFO";
        return TopUiViewEvent;
    }(BaseEvent));
    uiview.TopUiViewEvent = TopUiViewEvent;
    var TopUiViewModule = /** @class */ (function (_super) {
        __extends(TopUiViewModule, _super);
        function TopUiViewModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TopUiViewModule.prototype.getModuleName = function () {
            return "TopUiViewModule";
        };
        TopUiViewModule.prototype.listProcessors = function () {
            return [new TopUiViewProcessor()
            ];
        };
        return TopUiViewModule;
    }(Module));
    uiview.TopUiViewModule = TopUiViewModule;
    var TopUiViewProcessor = /** @class */ (function (_super) {
        __extends(TopUiViewProcessor, _super);
        function TopUiViewProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TopUiViewProcessor.prototype.getName = function () {
            return "TopUiViewProcessor";
        };
        TopUiViewProcessor.prototype.showFristSelectLevel = function () {
            if (game.GameDataModel.levelNum == 9 && !GameData.getStorageSync("showselectlevel")) {
                var obj = new tips.PandaMeshData();
                obj.url = Scene_data.fileRoot + "ui/panda/6.png";
                obj.type = tips.PandaMeshData.type1;
                obj.key = tips.PandaMeshData.key6; //求助
                obj.data = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_SELECT_LEVEL_PANEL);
                var $topUiViewEvent = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_PANDA_INFO);
                $topUiViewEvent.data = obj;
                Pan3d.ModuleEventManager.dispatchEvent($topUiViewEvent);
                GameData.setStorageSync("showselectlevel", true);
            }
        };
        TopUiViewProcessor.prototype.receivedModuleEvent = function ($event) {
            var _this = this;
            if ($event instanceof TopUiViewEvent) {
                var $topUiViewEvent = $event;
                if ($topUiViewEvent.type == TopUiViewEvent.SHOW_TOP_MENU_VIEW) {
                    this._topMenuView = new uiview.TopMenuView();
                    UIManager.getInstance().addUIContainer(this._topMenuView);
                }
                if ($topUiViewEvent.type == TopUiViewEvent.SHOW_LEVEL_LOSET_VIEW) {
                    if (GameData.gameType == 1) {
                        if (!this._resetPlayPanel) {
                            this._resetPlayPanel = new ResetPlayPanel();
                        }
                        else {
                            this._resetPlayPanel.showPanel();
                        }
                        var useTim = TimeUtil.getTimer() - game.GameDataModel.levelStartTm;
                        var $postStr = "";
                        $postStr += "level=" + GameDataModel.levelNum;
                        $postStr += "&openid=" + GameData.getStorageSync("openid");
                        if (GameData.isOtherPlay()) {
                            GameData.WEB_SEVER_EVENT_AND_BACK("add_fail", $postStr);
                        }
                    }
                }
                if ($topUiViewEvent.type == TopUiViewEvent.SHOW_LEVEL_UP_VIEW) {
                    var isquestHelp = this.testTipHelp();
                    if (!isquestHelp) {
                        console.log(GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL));
                        if (GameDataModel.levelNum > GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL)) {
                            GameData.setStorageSync(GameData.SELF_MAX_LEVEL, GameDataModel.levelNum);
                        }
                        TimeUtil.addTimeOut(1500, function () {
                            if (!_this._levelUpWinPanel) {
                                _this._levelUpWinPanel = new levelup.LevelUpWinPanel();
                            }
                            else {
                                _this._levelUpWinPanel.showPanel();
                            }
                        });
                    }
                    this.showFinishEfict();
                    var $sendInfo = new game.SceneEvent(game.SceneEvent.SEND_TO_APPER_DATA);
                    $sendInfo.data = { key: "显示最佳", data: { level: game.GameDataModel.levelNum } };
                    Pan3d.ModuleEventManager.dispatchEvent($sendInfo);
                    game.GameVideoManager.finishVideo();
                    var useTim = TimeUtil.getTimer() - game.GameDataModel.levelStartTm;
                    var $postStr = "";
                    $postStr += "level=" + GameDataModel.levelNum;
                    $postStr += "&openid=" + GameData.getStorageSync("openid");
                    $postStr += "&time=" + useTim;
                    if (GameData.isOtherPlay()) {
                        if (GameData.userInfo && GameData.userInfo.nickName) {
                            $postStr += "&info=" + GameData.userInfo.nickName + "+" + String(GameData.hasdiamondsHavenum);
                        }
                        else {
                            var $addStrinfo = "";
                            if (GameData.userInfo) {
                                $addStrinfo = String(GameData.userInfo.nickName);
                            }
                            $postStr += "&info=" + "没名-" + $addStrinfo + "-" + String(GameData.hasdiamondsHavenum);
                        }
                        console.log("成功发送参数", $postStr);
                        GameData.WEB_SEVER_EVENT_AND_BACK("add_success", $postStr);
                    }
                    GameData.clearPandaOrInof(1, 5); //清理求助
                    GameData.clearPandaOrInof(1, 8); //清理录像
                    this.showFristSelectLevel();
                }
                if ($topUiViewEvent.type == TopUiViewEvent.SHOW_SPECIAL_EFFECT) {
                    this.showSpecialEffect($topUiViewEvent.effectInof);
                }
                if ($topUiViewEvent.type == TopUiViewEvent.SHOW_TOP_START_VIEW) {
                    UIManager.getInstance().addUIContainer(new uiview.TopStartView());
                }
                if ($topUiViewEvent.type == TopUiViewEvent.SHOW_ALL_BANG_VIEW) {
                    if (!this._topAllBangView) {
                        this._topAllBangView = new uiview.TopAllBangView();
                    }
                    else {
                        this._topAllBangView.showPanel();
                    }
                }
                if ($topUiViewEvent.type == TopUiViewEvent.SHOW_SELECT_LEVEL_PANEL) {
                    if (!this._selectLevelPanel) {
                        this._selectLevelPanel = new SelectLevelPanel();
                    }
                    else {
                        this._selectLevelPanel.showPanel();
                    }
                }
                if ($topUiViewEvent.type == TopUiViewEvent.SHOW_SELECT_MENU_PANEL) {
                    if (!this._menuSelectPanel) {
                        this._menuSelectPanel = new MenuSelectPanel();
                    }
                    else {
                        this._menuSelectPanel.showPanel();
                    }
                }
                if ($topUiViewEvent.type == TopUiViewEvent.SHOW_SKIN_LIST_PANEL) {
                    if (!this._skinListlPanel) {
                        this._skinListlPanel = new SkinListlPanel();
                    }
                    else {
                        this._skinListlPanel.showPanel();
                    }
                }
                if ($topUiViewEvent.type == TopUiViewEvent.SHOW_SETUP_WIN_PANEL) {
                    if (!this._setupWinPanel) {
                        this._setupWinPanel = new SetupWinPanel();
                    }
                    else {
                        this._setupWinPanel.showPanel();
                    }
                }
                if ($topUiViewEvent.type == TopUiViewEvent.SHOW_PROGRESS_BAR) {
                    if (!this._progressBarView) {
                        this._progressBarView = new tips.ProgressBarView();
                    }
                    else {
                        this._progressBarView.showPanel();
                    }
                    this._progressBarView.refristData(Number($topUiViewEvent.data));
                }
                if ($topUiViewEvent.type == TopUiViewEvent.HIDE_SKIN_LIST_PANEL) {
                    this._skinListlPanel.hidePanel();
                }
                if ($topUiViewEvent.type == TopUiViewEvent.SHOW_WAIT_HELP_USER_ICON_PIC) {
                    this._topMenuView.showWaitHelpUserIconPic();
                }
                if ($topUiViewEvent.type == TopUiViewEvent.SHOW_PANDA_INFO) {
                    if (this._topMenuView) {
                        this._topMenuView.showPandaInfo($topUiViewEvent.data);
                    }
                }
                if ($topUiViewEvent.type == TopUiViewEvent.CLEAR_PANDA_INFO) {
                    if (this._topMenuView) {
                        this._topMenuView.clearPandaInfo($topUiViewEvent.data);
                    }
                }
                if ($topUiViewEvent.type == TopUiViewEvent.REFRISH_MAIN_UI) {
                    if (this._topMenuView) {
                        this._topMenuView.refrishUi();
                    }
                }
                if ($topUiViewEvent.type == TopUiViewEvent.SHOW_SHARE_WX_WINDOW_PANEL) {
                    var queryStr = "";
                    queryStr += 'type=' + "only_share";
                    queryStr += '&openid=' + GameData.getStorageSync("openid");
                    GameData.WX_ON_SHARE_APP_MESSAGE("分享有礼", queryStr, function (res) {
                        if (res) {
                            // GameData.saveDiamodsToBagAndShowTip(88,"分享成功奖励")
                            GameData.addShareToWeb(0);
                        }
                        else {
                            console.log("ts 没有分享成功");
                        }
                    }, true);
                }
                if ($topUiViewEvent.type == TopUiViewEvent.SHOW_NEED_HELP_PANDA_PANEL) {
                    GameData.sendToWebCallHelp();
                }
            }
            if ($event instanceof SceneEvent) {
                var $sceneEvent = $event;
                switch ($sceneEvent.type) {
                    case SceneEvent.DIAMONDS_SPRITE_HIT_EVENT:
                        if (this._topMenuView) {
                            this._topMenuView.refrishDiamondNum();
                        }
                        break;
                    default:
                        break;
                }
            }
        };
        TopUiViewProcessor.prototype.testTipHelp = function () {
            if (GameData.wxQuery && GameData.wxQuery.type) {
                if (GameData.wxQuery.type == "call_help" && Number(GameData.wxQuery.level) == GameDataModel.levelNum) {
                    console.log("testTipHelpGameData.wxQuery", GameData.wxQuery);
                    if (!this.help2InfoPanel) {
                        this.help2InfoPanel = new help2info.Help2InfoPanel();
                    }
                    else {
                        this.help2InfoPanel.showPanel();
                    }
                    this.help2InfoPanel.refrish2Data(GameData.wxQuery);
                    var helperinfoStr = "";
                    if (GameData.userInfo && GameData.userInfo.avatarUrl.length) {
                        helperinfoStr = GameData.userInfo.nickName;
                        helperinfoStr += "|" + GameData.userInfo.avatarUrl;
                    }
                    else {
                        helperinfoStr = "没授权用户|https://api.h5key.com/static/wudiqiuqiu/ui/userpic/emptyicon.jpg";
                    }
                    var $postStr = "";
                    $postStr += "level=" + GameDataModel.levelNum;
                    $postStr += "&openid=" + GameData.wxQuery.openid;
                    $postStr += "&helper_info=" + helperinfoStr;
                    GameData.WEB_SEVER_EVENT_AND_BACK("finish_help", $postStr);
                    GameData.clearwxQuery();
                    tips.PandaMeshData.hideCentenTxtInfoType2(tips.PandaMeshData.key105);
                    this._topMenuView.testHasNeedHelpList();
                    return true;
                }
            }
            return false;
        };
        TopUiViewProcessor.prototype.showFinishEfict = function () {
            var $v3d = new Vector3D(GameDataModel.centenBall.x, GameDataModel.centenBall.y, GameDataModel.centenBall.z);
            var $evt = new TopUiViewEvent(TopUiViewEvent.SHOW_SPECIAL_EFFECT);
            $evt.effectInof = { pos: $v3d, name: "levelup" };
            ModuleEventManager.dispatchEvent($evt);
            game.GameSoundManager.getInstance().playSoundByName("pass");
        };
        TopUiViewProcessor.prototype.showSpecialEffect = function (value) {
            var $v3d = value.pos;
            var $name = value.name;
            if (Scene_data.supportBlob) {
                $name = $name.replace("_lyf", "");
                this.playLyf("model/" + $name + "_lyf.txt", $v3d);
            }
            else {
                this.playLyf("model/" + $name + "_base.txt", $v3d);
            }
        };
        TopUiViewProcessor.prototype.playLyf = function ($url, $pos, $r) {
            var _this = this;
            if ($r === void 0) { $r = 0; }
            var $scene = GameDataModel.scene;
            $scene.groupDataManager.scene = $scene;
            $scene.groupDataManager.getGroupData(Pan3d.Scene_data.fileRoot + $url, function (groupRes) {
                for (var i = 0; i < groupRes.dataAry.length; i++) {
                    var item = groupRes.dataAry[i];
                    if (item.types == Pan3d.BaseRes.SCENE_PARTICLE_TYPE) {
                        var $particle = $scene.particleManager.getParticleByte(Pan3d.Scene_data.fileRoot + item.particleUrl);
                        $particle.x = $pos.x;
                        $particle.y = $pos.y;
                        $particle.z = $pos.z;
                        $particle.scaleX = 3;
                        $particle.scaleY = 3;
                        $particle.scaleZ = 3;
                        $particle.rotationY = $r;
                        $scene.particleManager.addParticle($particle);
                        $particle.addEventListener(Pan3d.BaseEvent.COMPLETE, _this.onPlayCom, _this);
                    }
                    else {
                        console.log("播放的不是单纯特效");
                    }
                }
            });
        };
        TopUiViewProcessor.prototype.onPlayCom = function (value) {
            var $scene = GameDataModel.scene;
            $scene.particleManager.removeParticle((value.target));
        };
        TopUiViewProcessor.prototype.listenModuleEvents = function () {
            return [
                new TopUiViewEvent(TopUiViewEvent.SHOW_TOP_MENU_VIEW),
                new TopUiViewEvent(TopUiViewEvent.SHOW_LEVEL_LOSET_VIEW),
                new TopUiViewEvent(TopUiViewEvent.SHOW_LEVEL_UP_VIEW),
                new TopUiViewEvent(TopUiViewEvent.SHOW_LOG_TXT),
                new TopUiViewEvent(TopUiViewEvent.SHOW_TOP_START_VIEW),
                new TopUiViewEvent(TopUiViewEvent.SHOW_ALL_BANG_VIEW),
                new TopUiViewEvent(TopUiViewEvent.SHOW_SPECIAL_EFFECT),
                new TopUiViewEvent(TopUiViewEvent.SHOW_HIDE_LOG_TXT_PANEL),
                new TopUiViewEvent(TopUiViewEvent.SHOW_SKIN_LIST_PANEL),
                new TopUiViewEvent(TopUiViewEvent.SHOW_SELECT_LEVEL_PANEL),
                new TopUiViewEvent(TopUiViewEvent.SHOW_SELECT_MENU_PANEL),
                new TopUiViewEvent(TopUiViewEvent.SHOW_SETUP_WIN_PANEL),
                new TopUiViewEvent(TopUiViewEvent.SHOW_PANDA_INFO),
                new TopUiViewEvent(TopUiViewEvent.SHOW_PROGRESS_BAR),
                new TopUiViewEvent(TopUiViewEvent.REFRISH_MAIN_UI),
                new TopUiViewEvent(TopUiViewEvent.CLEAR_PANDA_INFO),
                new TopUiViewEvent(TopUiViewEvent.SHOW_SHARE_WX_WINDOW_PANEL),
                new TopUiViewEvent(TopUiViewEvent.SHOW_NEED_HELP_PANDA_PANEL),
                new TopUiViewEvent(TopUiViewEvent.SHOW_WAIT_HELP_USER_ICON_PIC),
                new TopUiViewEvent(TopUiViewEvent.HIDE_SKIN_LIST_PANEL),
                new SceneEvent(SceneEvent.DIAMONDS_SPRITE_HIT_EVENT),
            ];
        };
        return TopUiViewProcessor;
    }(BaseProcessor));
    uiview.TopUiViewProcessor = TopUiViewProcessor;
})(uiview || (uiview = {}));
//# sourceMappingURL=TopUiViewProcessor.js.map