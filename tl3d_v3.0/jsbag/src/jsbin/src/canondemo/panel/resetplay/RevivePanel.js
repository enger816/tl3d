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
var revive;
(function (revive) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIData = Pan3d.UIData;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var Rectangle = Pan3d.Rectangle;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var SceneEvent = game.SceneEvent;
    var TimeUtil = Pan3d.TimeUtil;
    var GameDataModel = game.GameDataModel;
    var Physics = canonkey.Physics;
    var RevivePanel = /** @class */ (function (_super) {
        __extends(RevivePanel, _super);
        function RevivePanel() {
            var _this = _super.call(this) || this;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        RevivePanel.prototype.baseWindowLoadFinish = function () {
            var _this = this;
            _super.prototype.baseWindowLoadFinish.call(this);
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
        RevivePanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this._topTxtRender.uiAtlas = this.h5UIAtlas;
            this.winRect = new Rectangle(0, 0, 450, 350);
            this.uiLoadComplte = true;
            this.addChild(this._bottomRender.getComponent("b_tittle"));
            this.b_content_txt = this.addChild(this._midRender.getComponent("b_content_txt"));
            this.b_revive_but = this.addEvntBut("b_revive_but", this._bottomRender);
            this.b_need_label = this._midRender.getComponent("b_need_label");
            this.b_revive_but_label = this.addChild(this._midRender.getComponent("b_revive_but_label"));
            this.b_share_frame = this.addEvntBut("b_share_frame", this._midRender);
            this.showPanel();
        };
        RevivePanel.prototype.setButStatic = function () {
            if (GameData.isCanUseLookVideoBut) {
                this.b_share_frame.goToAndStop(0);
            }
            this.b_share_frame.goToAndStop(1); //现在只支持分享
            this.needRestNum = GameData.getNeedDiamondsReviveByLevel(GameDataModel.levelNum);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_need_label.skinName, Pan3d.ColorType.Redff0000 + this.needRestNum, 20);
            this.setUiListVisibleByItem([this.b_share_frame], GameData.severinfo.canUseShareBut);
        };
        RevivePanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.b_revive_but:
                    if (this.needRestNum > GameData.hasdiamondsHavenum) {
                        msgalert.AlertUtil.show("钻石不足", "提示", function (value) {
                            if (value == 1) {
                                ModuleEventManager.dispatchEvent(new invitation.InvitationEvent(invitation.InvitationEvent.SHOW_INVITATIOIN_PANEL));
                            }
                        }, 2);
                    }
                    else {
                        GameData.hasdiamondsHavenum = GameData.hasdiamondsHavenum - this.needRestNum;
                        ModuleEventManager.dispatchEvent(new SceneEvent(SceneEvent.DIAMONDS_SPRITE_HIT_EVENT));
                        this.toPlay();
                    }
                    break;
                case this.b_share_frame:
                    this.clikFrameBut();
                    break;
                case this.base_win_close:
                    if (GameData.gameType == 5) {
                        ModuleEventManager.dispatchEvent(new special.SpecialEvent(special.SpecialEvent.SELECT_SPECIAL_LEVEL));
                    }
                    else {
                        GameData.dispatchToLevel(GameDataModel.levelNum);
                    }
                    this.hidePanel();
                    break;
                default:
                    break;
            }
        };
        RevivePanel.prototype.clikFrameBut = function () {
            if (this.b_share_frame.current == 0) {
                this.toLookAdAndPlay();
            }
            else {
                this.toshareEvet();
            }
        };
        RevivePanel.prototype.toLookAdAndPlay = function () {
            var _this = this;
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WX_LOOK_VIDEO_VD_EVENT), function (value) {
                if (value == 2) {
                    var $tipStr = "需要看完视屏才能复活";
                    msgalert.AlertUtil.show($tipStr, "提示", function (value) {
                    }, 2);
                }
                if (value == 1) {
                    _this.toPlay();
                }
                if (value == 0) {
                    //视频看完了，就只能分享；
                    _this.toshareEvet();
                }
            });
        };
        RevivePanel.prototype.toshareEvet = function () {
            var _this = this;
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT), new AllShareMeshVo(function (value) {
                if (value == 1) {
                    _this.toPlay();
                }
            }, AllShareMeshVo.type10));
        };
        RevivePanel.prototype.hidePanel = function () {
            var _this = this;
            this.TweenLiteScale(UIData.Scale, 0.3, 0.2, function () {
                UIManager.getInstance().removeUIContainer(_this);
            });
        };
        RevivePanel.prototype.toPlay = function () {
            GameDataModel.centenBall.x = GameDataModel.lastRevivePos.x;
            GameDataModel.centenBall.y = GameDataModel.lastRevivePos.y;
            GameDataModel.centenBall.z = GameDataModel.lastRevivePos.z;
            GameDataModel.centenBall.bodyfouce.x = 0;
            GameDataModel.centenBall.bodyfouce.y = 0;
            GameDataModel.centenBall.bodyfouce.z = 0;
            GameDataModel.centenBall.resetParticlePos();
            GameDataModel.centenBall.body.sleep();
            GameDataModel.centenBall.body.wakeUp();
            GameDataModel.lastMainHitVect.x = GameDataModel.lastRevivePos.x;
            GameDataModel.lastMainHitVect.y = GameDataModel.lastRevivePos.y;
            GameDataModel.lastMainHitVect.z = GameDataModel.lastRevivePos.z;
            GameDataModel.lastMainHitTm = TimeUtil.getTimer();
            Physics.ready = true;
            this.hidePanel();
        };
        RevivePanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
                this.TweenLiteScale(0.3, UIData.Scale, 0.5);
                this.setButStatic();
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        return RevivePanel;
    }(basewin.BaseWinPanel));
    revive.RevivePanel = RevivePanel;
})(revive || (revive = {}));
//# sourceMappingURL=RevivePanel.js.map