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
var ccav;
(function (ccav) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIManager = Pan3d.UIManager;
    var TextAlign = Pan3d.TextAlign;
    var ArtFont = Pan3d.ArtFont;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var SceneEvent = game.SceneEvent;
    var ResetPlayPanel = /** @class */ (function (_super) {
        __extends(ResetPlayPanel, _super);
        function ResetPlayPanel() {
            var _this = _super.call(this) || this;
            _this.tempLostNum = 0;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this._topTxtRender = new UIRenderComponent();
            _this.addRender(_this._topTxtRender);
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("ui/topview/topview.txt", "ui/topview/topview.png", function () { _this.loadConfigCom(); });
            _this.timeFun = function () { _this.upTimeFrame(); };
            return _this;
        }
        ResetPlayPanel.prototype.toshareEvet = function () {
            var _this = this;
            if (GameData.severinfo.invitation) {
                if (Math.random() < GameData.severinfo.invitation) {
                    Pan3d.ModuleEventManager.dispatchEvent(new invitation.InvitationEvent(invitation.InvitationEvent.SHOW_INVITATIOIN_PANEL));
                    return;
                }
            }
            var queryStr = "";
            queryStr += 'type=' + "only_share";
            queryStr += '&openid=' + GameData.getStorageSync("openid");
            GameData.WX_ON_SHARE_APP_MESSAGE("分享有礼", queryStr, function (res) {
                if (res) {
                    if (res == "needshareTicket") {
                        msgalert.AlertUtil.show("本次需要转发到群，希望理解");
                    }
                    else {
                        GameData.addShareToWeb(0);
                        _this.selectLevelTo(game.GameDataModel.levelNum);
                        console.log("分享成功");
                    }
                }
                else {
                    console.log("ts 没有分享成功");
                    msgalert.AlertUtil.show("分享不成功，不能重新开始");
                }
            }, false);
        };
        ResetPlayPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.r_reset_but_bg:
                    var $num = GameData.hasdiamondsHavenum;
                    if (this.needRestNum > $num) {
                        if (GameData.severinfo.share_flag) {
                            this.toshareEvet();
                        }
                        else {
                            msgalert.AlertUtil.show("钻石不足");
                        }
                    }
                    else {
                        this.selectLevelTo(game.GameDataModel.levelNum);
                        GameData.hasdiamondsHavenum = $num - this.needRestNum;
                        ModuleEventManager.dispatchEvent(new SceneEvent(SceneEvent.DIAMONDS_SPRITE_HIT_EVENT));
                        var $postStr = "";
                        $postStr += "level=" + game.GameDataModel.levelNum;
                        $postStr += "&openid=" + GameData.getStorageSync("openid");
                        GameData.WEB_SEVER_EVENT_AND_BACK("add_revive", $postStr);
                    }
                    break;
                case this.r_look_at_video_but:
                    game.GameVideoManager.playReaplayVideo();
                    this.hidePanel();
                    break;
                case this.r_submit_bg_txt:
                    game.GameVideoManager.submitBugToSave();
                    break;
                case this.r_share_realplay:
                    this.toshareEvet();
                    break;
                default:
                    break;
            }
        };
        ResetPlayPanel.prototype.findShowNextPanda = function () {
            if (!GameData.isPlayVideo) {
                if (this.lastLostLevel == game.GameDataModel.levelNum) {
                    this.tempLostNum++;
                    if (this.tempLostNum % 3 == 1) {
                        var obj = new tips.PandaMeshData();
                        obj.url = Scene_data.fileRoot + "ui/panda/5.png";
                        obj.type = tips.PandaMeshData.type1;
                        obj.key = tips.PandaMeshData.key5; //求助
                        obj.data = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_NEED_HELP_PANDA_PANEL);
                        var $topUiViewEvent = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_PANDA_INFO);
                        $topUiViewEvent.data = obj;
                        Pan3d.ModuleEventManager.dispatchEvent($topUiViewEvent);
                        if (!Boolean(GameData.getStorageSync("aoutFristhHelp"))) {
                            GameData.setStorageSync("aoutFristhHelp", true);
                            GameData.sendToWebCallHelp();
                        }
                    }
                    if (this.tempLostNum % 3 == 2) {
                        this.showLookVideo();
                    }
                }
                else {
                    this.lastLostLevel = game.GameDataModel.levelNum;
                    this.tempLostNum = 0;
                }
            }
        };
        ResetPlayPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this._topTxtRender.uiAtlas = this.h5UIAtlas;
            this.r_tip_bg = this.addEvntButUp("r_tip_bg", this._bottomRender);
            this.r_tip_bg.top = 0;
            this.r_tip_bg.left = 0;
            this.r_tip_bg.width = 540 * Pan3d.UIData.Scale;
            this.r_tip_bg.height = 960 * Pan3d.UIData.Scale;
            this.addChild(this._midRender.getComponent("r_window_bg"));
            this.addChild(this._topRender.getComponent("r_reset_tittle_txt"));
            this.addChild(this._midRender.getComponent("r_reset_time_bg"));
            this.r_reset_time_txt = this.addChild(this._topRender.getComponent("r_reset_time_txt"));
            this.r_reset_but_bg = this.addEvntButUp("r_reset_but_bg", this._topRender);
            this.r_reset_but_txt = this.addChild(this._topTxtRender.getComponent("r_reset_but_txt"));
            this.r_diamonds_icon = this.addChild(this._topTxtRender.getComponent("r_diamonds_icon"));
            this.r_reset_need_diamonds = this.addChild(this._topTxtRender.getComponent("r_reset_need_diamonds"));
            this.r_look_at_video_but = this.addEvntButUp("r_look_at_video_but", this._topTxtRender);
            this.r_submit_bg_txt = this.addEvntButUp("r_submit_bg_txt", this._topTxtRender);
            this.r_share_realplay = this.addEvntButUp("r_share_realplay", this._topTxtRender);
            this.setUiListVisibleByItem([this.r_share_realplay], GameData.severinfo.share_flag);
            this.uiLoadComplte = true;
            this.drawNeedDiamond();
            this.upTimeFrame();
            this.showPanel();
        };
        ResetPlayPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                this.drawNeedDiamond();
                this.setUiListVisibleByItem([this.r_submit_bg_txt], GameData.isPlayVideo);
                UIManager.getInstance().addUIContainer(this);
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        ResetPlayPanel.prototype.showLookVideo = function () {
            var obj = new tips.PandaMeshData();
            obj.url = Scene_data.fileRoot + "ui/panda/8.png";
            obj.type = tips.PandaMeshData.type1;
            obj.key = tips.PandaMeshData.key8;
            var $topUiViewEvent = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_PANDA_INFO);
            $topUiViewEvent.data = obj;
            Pan3d.ModuleEventManager.dispatchEvent($topUiViewEvent);
        };
        ResetPlayPanel.prototype.selectLevelTo = function (value) {
            console.log("去了下个场景", value);
            GameData.isPlayVideo = false;
            GameData.dispatchToLevel(value);
            this.hidePanel();
        };
        ResetPlayPanel.prototype.hidePanel = function () {
            UIManager.getInstance().removeUIContainer(this);
            Pan3d.ModuleEventManager.dispatchEvent(new online.OnlineEvent(online.OnlineEvent.TEST_FRIST_TIP_ONLINE_PLAY));
            this.findShowNextPanda();
        };
        ResetPlayPanel.prototype.onRemove = function () {
            Pan3d.TimeUtil.removeTimeTick(this.timeFun);
            _super.prototype.onRemove.call(this);
        };
        ResetPlayPanel.prototype.onAdd = function () {
            this.endTime = Pan3d.TimeUtil.getTimer() + GameData.getNeedTimeResetPlayByLevel(game.GameDataModel.levelNum) * 1000;
            Pan3d.TimeUtil.addTimeTick(1000, this.timeFun);
            _super.prototype.onAdd.call(this);
        };
        ResetPlayPanel.prototype.drawNeedDiamond = function () {
            var _this = this;
            if (this.uiLoadComplte) {
                this.needRestNum = GameData.getNeedDiamodsResetPlayByLevel(game.GameDataModel.levelNum);
                if (this.needRestNum > 0) {
                    ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.r_reset_need_diamonds.skinName, String(this.needRestNum), "NUM41", TextAlign.CENTER, 2);
                    this.r_reset_but_txt.x = this.r_reset_but_txt.baseRec.x;
                    var $num = GameData.hasdiamondsHavenum;
                    if (this.needRestNum > $num) {
                        if (GameData.wxQuery && GameData.wxQuery.type && GameData.wxQuery.type == "call_help") {
                            msgalert.AlertUtil.show("很感谢你的热情帮助\n,虽然你很努力了,但实力还不足", "提示", function (value) {
                                if (value == 1) {
                                    game.GameDataModel.levelNum = Math.min(GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL) + 1, game.GameDataModel.levelNum);
                                    _this.selectLevelTo(game.GameDataModel.levelNum);
                                }
                            }, 2);
                            GameData.clearwxQuery();
                            tips.PandaMeshData.hideCentenTxtInfoType2(tips.PandaMeshData.key105);
                        }
                    }
                }
                else {
                    this.r_reset_but_txt.x = this.r_reset_but_txt.baseRec.x - 20;
                    this._topRender.uiAtlas.clearCtxTextureBySkilname(this.r_reset_need_diamonds.skinName);
                }
                this.setUiListVisibleByItem([this.r_diamonds_icon], this.needRestNum > 0);
            }
        };
        ResetPlayPanel.prototype.upTimeFrame = function () {
            if (this.uiLoadComplte && this.hasStage) {
                var $tm = this.endTime - Pan3d.TimeUtil.getTimer();
                if ($tm > 0) {
                    ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.r_reset_time_txt.skinName, String(Math.floor($tm / 1000)), "NUM43", TextAlign.CENTER);
                }
                else {
                    this.selectLevelTo(game.GameDataModel.levelNum);
                }
            }
        };
        return ResetPlayPanel;
    }(H5UIConatiner));
    ccav.ResetPlayPanel = ResetPlayPanel;
})(ccav || (ccav = {}));
//# sourceMappingURL=ResetPlayPanel.js.map