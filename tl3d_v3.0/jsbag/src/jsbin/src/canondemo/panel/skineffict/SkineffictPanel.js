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
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIData = Pan3d.UIData;
    var FrameUIRender = Pan3d.FrameUIRender;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var GameDataModel = game.GameDataModel;
    var PandaMeshData = rightpanda.PandaMeshData;
    var SkineffictPanel = /** @class */ (function (_super) {
        __extends(SkineffictPanel, _super);
        function SkineffictPanel() {
            var _this = _super.call(this) || this;
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
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("panelui/skineffict/skineffict.txt", "panelui/skineffict/skineffict.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        SkineffictPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.win_tip_bg = this.addEvntBut("a_win_tip_bg", this._bottomRender);
            this.win_tip_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.a_wait_info_txt = this._topRender.getComponent("a_wait_info_txt");
            this.addChild(this._topRender.getComponent("a_win_tittle"));
            this.addChild(this._midRender.getComponent("a_big_frame_bg"));
            this.a_big_frame_pic = this.addChild(this._topRender.getComponent("a_big_frame_pic"));
            this.a_select_but = this.addEvntButUp("a_select_but", this._midRender);
            this.a_but_frame_txt = this.addChild(this._topRender.getComponent("a_but_frame_txt"));
            this.a_win_close = this.addEvntBut("a_win_close", this._topRender);
            this.a_experience_but = this.addEvntBut("a_experience_but", this._topRender);
            this.uiLoadComplte = true;
            this.showExpEff();
            this.showPanel();
        };
        SkineffictPanel.prototype.showExpEff = function () {
            var _this = this;
            if (!this._effRender) {
                this._effRender = new FrameUIRender();
                this.addRender(this._effRender);
                this._effRender.setImg("panelui/skineffict/frame001.jpg", 10, 9, function ($ui) {
                    _this.expEff = $ui;
                    _this.expEff.x = _this.a_big_frame_pic.x;
                    _this.expEff.y = _this.a_big_frame_pic.y;
                    _this.expEff.width = _this.a_big_frame_pic.width;
                    _this.expEff.height = _this.a_big_frame_pic.height;
                    _this.expEff.speed = 1;
                    _this.expEff.playOne(_this);
                    _this.expEff.play();
                });
            }
        };
        SkineffictPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_select_but:
                    switch (this.a_but_frame_txt.current) {
                        case 0:
                            console.log("邀请");
                            this.shareBut_Clik();
                            break;
                        case 1:
                            if (!GameData.getStorageSync("isUseEffictSkin")) {
                                this.hidePanel();
                            }
                            GameData.setStorageSync("isUseEffictSkin", true); //使用过了
                            GameData.setStorageSync("useEffictSkin", true);
                            game.GameDataModel.changeMainEffict();
                            Pan3d.ModuleEventManager.dispatchEvent(new topmenu.TopMenuEvent(topmenu.TopMenuEvent.REFRISH_MAIN_TOP_UI));
                            break;
                        case 2:
                            GameData.setStorageSync("useEffictSkin", false);
                            game.GameDataModel.changeMainEffict();
                            break;
                        default:
                            break;
                    }
                    this.resetBut();
                    break;
                case this.a_experience_but:
                    this.experienceSkin();
                case this.a_win_close:
                    this.hidePanel();
                    break;
                default:
                    break;
            }
        };
        SkineffictPanel.prototype.experienceSkin = function () {
            var $dis = GameDataModel.centenBall;
            var $scale = 1.4;
            var $effictName = "skin001";
            $dis.changeSkinById(4);
            if (Scene_data.supportBlob) {
                $dis.playLyf("model/" + $effictName + "_lyf.txt", null, $scale);
            }
            else {
                $dis.playLyf("model/" + $effictName + "_base.txt", null, $scale);
            }
            Pan3d.TimeUtil.addTimeOut(1000 * 60, function () {
                game.GameDataModel.changeMainEffict();
                if (!GameData.getStorageSync("isUseEffictSkin")) {
                    var $postStr = "";
                    $postStr += "openid=" + GameData.getStorageSync("openid");
                    $postStr += "&time=" + 0;
                    $postStr += "&type=" + 4;
                    GameData.WEB_SEVER_EVENT_AND_BACK("get_advertise_list", $postStr, function (res) {
                        if (res && res.data && res.data.list && res.data.list.length) {
                        }
                        else {
                            if (!GameData.hasWinPanel) {
                                msgalert.AlertUtil.show("你邀请的好友还没加入游戏，体验结束，请再邀请", "提示", function (value) {
                                    if (value == 1) {
                                        Pan3d.ModuleEventManager.dispatchEvent(new skineffict.SkineffictEvent(skineffict.SkineffictEvent.SHOW_SKINEFFICT_PANEL));
                                    }
                                }, 2);
                            }
                        }
                    });
                }
            });
        };
        SkineffictPanel.prototype.shareBut_Clik = function () {
            var _this = this;
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT), new AllShareMeshVo(function (value) {
                if (value == 1) {
                    _this.setUiListVisibleByItem([_this.a_wait_info_txt], true);
                    _this.setUiListVisibleByItem([_this.a_experience_but], true);
                    LabelTextFont.writeSingleLabel(_this._topRender.uiAtlas, _this.a_wait_info_txt.skinName, Pan3d.ColorType.Whiteffffff + "好友进入游戏后便可领取", 18);
                    Pan3d.ModuleEventManager.dispatchEvent(new skineffict.SkineffictEvent(skineffict.SkineffictEvent.TEST_SKINEFFICT_ADVERTISE));
                    rightpanda.PandaMeshData.showCentenTxtInfoType(rightpanda.PandaMeshData.key106, "等待好友加入获取魔法 ", function () {
                        Pan3d.ModuleEventManager.dispatchEvent(new skineffict.SkineffictEvent(skineffict.SkineffictEvent.SHOW_SKINEFFICT_PANEL));
                    });
                }
            }, AllShareMeshVo.type4));
        };
        SkineffictPanel.prototype.showPanel = function () {
            var _this = this;
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
                this.TweenLiteScale(0.3, UIData.Scale, 0.5);
                this.setUiListVisibleByItem([this.a_win_close], false);
                this.setUiListVisibleByItem([this.a_wait_info_txt], false);
                this.setUiListVisibleByItem([this.a_experience_but], false);
                Pan3d.TimeUtil.addTimeOut(500, function () {
                    _this.setUiListVisibleByItem([_this.a_win_close], true);
                });
                this.getAdvertiseBy4();
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        SkineffictPanel.prototype.getAdvertiseBy4 = function () {
            var _this = this;
            this.setUiListVisibleByItem([this.a_select_but, this.a_select_but], false);
            var $postStr = "";
            $postStr += "openid=" + GameData.getStorageSync("openid");
            $postStr += "&time=" + 0;
            $postStr += "&type=" + 4;
            GameData.WEB_SEVER_EVENT_AND_BACK("get_advertise_list", $postStr, function (res) {
                _this.advertiseListLen = 0;
                if (res && res.data && res.data.list && res.data.list.length) {
                    _this.advertiseListLen = res.data.list.length;
                }
                _this.resetBut();
                _this.setUiListVisibleByItem([_this.a_select_but, _this.a_select_but], true);
            });
        };
        SkineffictPanel.prototype.resetBut = function () {
            if (this.advertiseListLen > 0) {
                if (GameData.getStorageSync("useEffictSkin")) {
                    this.a_but_frame_txt.goToAndStop(2);
                }
                else {
                    this.a_but_frame_txt.goToAndStop(1);
                }
            }
            else {
                this.a_but_frame_txt.goToAndStop(0);
            }
        };
        SkineffictPanel.prototype.hidePanel = function () {
            var _this = this;
            if (this.uiLoadComplte) {
                this.setUiListVisibleByItem([this.a_win_close], false);
            }
            this.TweenLiteScale(UIData.Scale, 0.3, 0.2, function () {
                UIManager.getInstance().removeUIContainer(_this);
            });
            if (!GameData.getStorageSync("isUseEffictSkin")) {
                PandaMeshData.showRightPanda(PandaMeshData.key17, Scene_data.fileRoot + "ui/panda/17.png", new skineffict.SkineffictEvent(skineffict.SkineffictEvent.SHOW_SKINEFFICT_PANEL));
            }
        };
        return SkineffictPanel;
    }(H5UIConatiner));
    skineffict.SkineffictPanel = SkineffictPanel;
})(skineffict || (skineffict = {}));
//# sourceMappingURL=SkineffictPanel.js.map