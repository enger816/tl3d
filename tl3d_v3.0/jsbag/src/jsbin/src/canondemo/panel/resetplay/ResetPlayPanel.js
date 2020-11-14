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
var resetplay;
(function (resetplay) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIData = Pan3d.UIData;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var ArtFont = Pan3d.ArtFont;
    var Rectangle = Pan3d.Rectangle;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var SceneEvent = game.SceneEvent;
    var ResetPlayPanel = /** @class */ (function (_super) {
        __extends(ResetPlayPanel, _super);
        function ResetPlayPanel() {
            var _this = _super.call(this) || this;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        ResetPlayPanel.prototype.baseWindowLoadFinish = function () {
            var _this = this;
            _super.prototype.baseWindowLoadFinish.call(this);
            this.timeFun = function () { _this.upTimeFrame(); };
            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);
            this._topTxtRender = new UIRenderComponent();
            this.addRender(this._topTxtRender);
            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/resetplay/resetplay.txt", "panelui/resetplay/resetplay.png", function () { _this.loadConfigCom(); });
        };
        ResetPlayPanel.prototype.toshareEvet = function () {
            var _this = this;
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT), new AllShareMeshVo(function (value) {
                if (value == 1) {
                    _this.selectLevelTo(game.GameDataModel.levelNum);
                }
            }, AllShareMeshVo.type6));
        };
        ResetPlayPanel.prototype.useDiamondsRealPlay = function () {
            if (this.needRestNum > GameData.hasdiamondsHavenum) {
                msgalert.AlertUtil.show("钻石不足", "提示", function (value) {
                    if (value == 1) {
                        ModuleEventManager.dispatchEvent(new invitation.InvitationEvent(invitation.InvitationEvent.SHOW_INVITATIOIN_PANEL));
                    }
                }, 2);
            }
            else {
                this.selectLevelTo(game.GameDataModel.levelNum);
                GameData.hasdiamondsHavenum = GameData.hasdiamondsHavenum - this.needRestNum;
                ModuleEventManager.dispatchEvent(new SceneEvent(SceneEvent.DIAMONDS_SPRITE_HIT_EVENT));
                var $postStr = "";
                $postStr += "level=" + game.GameDataModel.levelNum;
                $postStr += "&openid=" + GameData.getStorageSync("openid");
                GameData.WEB_SEVER_EVENT_AND_BACK("add_revive", $postStr);
            }
        };
        ResetPlayPanel.prototype.butClik = function (evt) {
            var _this = this;
            switch (evt.target) {
                case this.base_win_close:
                    var $num = GameData.hasdiamondsHavenum;
                    if (this.needRestNum <= $num) {
                        msgalert.AlertUtil.show("关闭使用" + this.needRestNum + "钻石复活", "提示", function (value) {
                            if (value == 1) {
                                _this.useDiamondsRealPlay();
                            }
                        }, 2);
                    }
                    else {
                        this.useDiamondsRealPlay();
                    }
                    break;
                case this.r_reset_but_txt:
                    this.useDiamondsRealPlay();
                    break;
                case this.r_reset_but_bg:
                    if (this.isResetBut()) {
                        this.useDiamondsRealPlay();
                    }
                    else {
                        this.toshareEvet();
                    }
                    break;
                default:
                    break;
            }
        };
        ResetPlayPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this._topTxtRender.uiAtlas = this.h5UIAtlas;
            this.winRect = new Rectangle(0, 0, 450, 350);
            this.r_reset_but_bg = this.addEvntButUp("r_reset_but_bg", this._bottomRender);
            this.r_but_frame_txt = this.addChild(this._topRender.getComponent("r_but_frame_txt"));
            this.addChild(this._topRender.getComponent("r_reset_tittle_txt"));
            this.addChild(this._midRender.getComponent("r_reset_time_bg"));
            this.r_reset_time_txt = this.addChild(this._topRender.getComponent("r_reset_time_txt"));
            this.r_reset_but_txt = this.addEvntButUp("r_reset_but_txt", this._topTxtRender);
            this.r_reset_need_diamonds = this._topTxtRender.getComponent("r_reset_need_diamonds");
            this.uiLoadComplte = true;
            this.drawNeedDiamond();
            this.showPanel();
        };
        ResetPlayPanel.prototype.isResetBut = function () {
            if (GameData.severinfo.wxcloudModel == 1 || game.GameDataModel.levelNum < 10) {
                return true;
            }
            else {
                if (GameData.severinfo.canUseShareBut) {
                    return false;
                }
                else {
                    return true;
                }
            }
        };
        ResetPlayPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                this.drawNeedDiamond();
                if (this.isResetBut()) {
                    this.r_but_frame_txt.goToAndStop(1);
                }
                else {
                    this.r_but_frame_txt.goToAndStop(0);
                }
                UIManager.getInstance().addUIContainer(this);
                this.TweenLiteScale(0.3, UIData.Scale, 0.5);
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        ResetPlayPanel.prototype.selectLevelTo = function (value) {
            GameData.dispatchToLevel(value);
            this.hidePanel();
        };
        ResetPlayPanel.prototype.hidePanel = function () {
            var _this = this;
            this.TweenLiteScale(UIData.Scale, 0.3, 0.2, function () {
                UIManager.getInstance().removeUIContainer(_this);
            });
        };
        ResetPlayPanel.prototype.onRemove = function () {
            Pan3d.TimeUtil.removeTimeTick(this.timeFun);
            _super.prototype.onRemove.call(this);
        };
        ResetPlayPanel.prototype.onAdd = function () {
            var $needTm = GameData.getNeedTimeResetPlayByLevel(game.GameDataModel.levelNum);
            this.endTime = Pan3d.TimeUtil.getTimer() + $needTm * 1000;
            this.upTimeFrame();
            Pan3d.TimeUtil.addTimeTick(1000, this.timeFun);
            _super.prototype.onAdd.call(this);
        };
        ResetPlayPanel.prototype.drawNeedDiamond = function () {
            if (this.uiLoadComplte) {
                this.needRestNum = GameData.getNeedDiamodsResetPlayByLevel(game.GameDataModel.levelNum);
                if (this.needRestNum > 0) {
                    // ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.r_reset_need_diamonds.skinName, String(this.needRestNum), "NUM41", TextAlign.CENTER, 2);
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.r_reset_need_diamonds.skinName, Pan3d.ColorType.Black000000 + "x" + String(this.needRestNum), 24);
                    this.r_reset_but_txt.x = this.r_reset_but_txt.baseRec.x;
                    var $num = GameData.hasdiamondsHavenum;
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
                    ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.r_reset_time_txt.skinName, String(Math.ceil($tm / 1000)), "NUM43", TextAlign.CENTER);
                }
                else {
                    this.selectLevelTo(game.GameDataModel.levelNum);
                }
            }
        };
        return ResetPlayPanel;
    }(basewin.BaseWinPanel));
    resetplay.ResetPlayPanel = ResetPlayPanel;
})(resetplay || (resetplay = {}));
//# sourceMappingURL=ResetPlayPanel.js.map