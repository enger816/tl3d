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
var invitation;
(function (invitation) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var TimeUtil = Pan3d.TimeUtil;
    var ColorType = Pan3d.ColorType;
    var InvitationPanel = /** @class */ (function (_super) {
        __extends(InvitationPanel, _super);
        function InvitationPanel() {
            var _this = _super.call(this) || this;
            _this.interfaceUI = false;
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
            _this.h5UIAtlas.setInfo("ui/invitation/invitation.txt", "ui/invitation/invitation.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        InvitationPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_win_close:
                    this.hidePanel();
                    break;
                case this.a_but_bg:
                    Pan3d.ModuleEventManager.dispatchEvent(new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_SHARE_WX_WINDOW_PANEL));
                    break;
                default:
                    break;
            }
            var ui = evt.target;
            if (ui.skinName == "A_get_but_txt") {
                var frameui = ui;
                if (frameui.data >= 0) {
                    console.log("取得");
                    frameui.goToAndStop(2);
                    switch (frameui.data) {
                        case 0:
                            GameData.hasdiamondsHavenum += 100;
                            break;
                        case 1:
                            GameData.hasdiamondsHavenum += 300;
                            break;
                        case 2:
                            GameData.hasdiamondsHavenum += 500;
                            break;
                        case 3:
                            GameData.hasdiamondsHavenum += 800;
                            break;
                        default:
                            console.log("没有记录");
                            break;
                    }
                    this.invitationData[frameui.data] = true;
                    GameData.setStorageSync("invitation", JSON.stringify(this.invitationData));
                    this.invitationData = GameData.getStorageSync("invitation");
                    frameui.data = -1;
                }
            }
        };
        InvitationPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this._topTxtRender.uiAtlas = this.h5UIAtlas;
            var a_tip_bg = this.addEvntBut("a_tip_bg", this._bottomRender);
            a_tip_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);
            a_tip_bg.top = 0;
            a_tip_bg.left = 0;
            a_tip_bg.width = 540 * Pan3d.UIData.Scale;
            a_tip_bg.height = 960 * Pan3d.UIData.Scale;
            this.addChild(this._midRender.getComponent("a_win_bg"));
            this.a_win_close = this.addEvntButUp("a_win_close", this._topRender);
            this.useIconItem = new Array;
            this.useNameItem = new Array;
            this.rewardTxtItem = new Array;
            this.rewardGetItem = new Array;
            for (var i = 0; i < 4; i++) {
                this.useIconItem.push(this.addChild(this._topRender.getComponent("a_user_icon" + i)));
                this.useNameItem.push(this.addChild(this._topRender.getComponent("a_user_name" + i)));
                this.rewardTxtItem.push(this.addChild(this._topRender.getComponent("a_reward_cell" + i)));
                var $getbutFrame = this.addEvntButUp("a_get_but_txt" + i, this._topTxtRender);
                this.rewardGetItem.push($getbutFrame);
                $getbutFrame.goToAndStop(0);
            }
            this.a_but_bg = this.addEvntButUp("a_but_bg", this._topRender);
            this.addChild(this._topTxtRender.getComponent("a_invitation_big_txt"));
            this.uiLoadComplte = true;
            this.showPanel();
        };
        InvitationPanel.prototype.refrishData = function () {
            var _this = this;
            //GameData.getStorageSync("openid")
            var $openid = GameData.getStorageSync("openid");
            //  $openid="id1538898472540_5742"
            console.log("$openid", $openid);
            var $postStr = "";
            $postStr += "openid=" + $openid;
            $postStr += "&time=" + 0;
            GameData.WEB_SEVER_EVENT_AND_BACK("get_advertise_list", $postStr, function (res) {
                _this.userWebItem = new Array;
                if (res && res.data && res.data.list && res.data.list.length) {
                    console.log("回来的列表", res.data.list);
                    var $openidarr = new Array;
                    for (var i = 0; i < res.data.list.length; i++) {
                        $openidarr.push(res.data.list[i].openid);
                    }
                    GameData.GET_USER_INFO_LIST($openidarr, function ($listArr) {
                        if ($listArr && $listArr.length) {
                            for (var j = 0; j < $listArr.length; j++) {
                                var $gameUserVo = new GameUserVo();
                                $gameUserVo.name = $listArr[j].name;
                                $gameUserVo.openid = $listArr[j].openid;
                                $gameUserVo.avatar = $listArr[j].avatar;
                                _this.userWebItem.push($gameUserVo);
                            }
                            _this.drawinfolabelpic();
                        }
                    });
                }
                else {
                    _this.drawinfolabelpic();
                }
            });
        };
        InvitationPanel.prototype.drawinfolabelpic = function () {
            for (var i = 0; i < 4; i++) {
                var $iconUi = this.useIconItem[i];
                var $nameUi = this.useNameItem[i];
                var $gameUserVo = this.userWebItem[i];
                if ($gameUserVo) {
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, $nameUi.skinName, ColorType.Redd92200 + $gameUserVo.name, 16);
                    this._topRender.uiAtlas.upDataWebPicToTexture($gameUserVo.avatar, $iconUi.skinName);
                }
                else {
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, $nameUi.skinName, ColorType.Black000000 + "添加", 16);
                }
            }
            this.drawRewardLabelAndBut();
        };
        InvitationPanel.prototype.drawRewardLabelAndBut = function () {
            var textarr = new Array;
            textarr.push("1.邀请成功1位好友 奖励100钻石");
            textarr.push("2.邀请成功2位好友 奖励300钻石");
            textarr.push("3.邀请成功3位好友 奖励500钻石");
            textarr.push("4.邀请成功4位好友 奖励800钻石");
            //  GameData.setStorageSync("invitation", JSON.stringify({}));
            if (GameData.getStorageSync("invitation")) {
                this.invitationData = JSON.parse(GameData.getStorageSync("invitation"));
            }
            else {
                this.invitationData = {};
            }
            for (var i = 0; i < 4; i++) {
                var $gameUserVo = this.userWebItem[i];
                var $getlabel = this.rewardTxtItem[i];
                var $getbut = this.rewardGetItem[i];
                $getbut.goToAndStop(0);
                $getbut.data = -1;
                var $color = ColorType.Black000000;
                if ($gameUserVo) {
                    $color = ColorType.Green20a200;
                    if (this.invitationData[i]) {
                        $getbut.goToAndStop(2);
                    }
                    else {
                        $getbut.goToAndStop(1);
                        $getbut.data = i;
                    }
                }
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, $getlabel.skinName, $color + textarr[i], 20, TextAlign.LEFT);
            }
            console.log(this.invitationData);
        };
        InvitationPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.refrishData();
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        InvitationPanel.prototype.hidePanel = function () {
            var _this = this;
            Pan3d.UIManager.getInstance().removeUIContainer(this);
            TimeUtil.addTimeOut(5 * 60 * 1000, function () {
                _this.tipRankTip();
            });
        };
        InvitationPanel.prototype.tipRankTip = function () {
            var obj = new tips.PandaMeshData();
            obj.url = Scene_data.fileRoot + "ui/panda/12.png";
            obj.type = tips.PandaMeshData.type1;
            obj.key = tips.PandaMeshData.key12;
            obj.data = new rank.RankEvent(rank.RankEvent.SHOW_RANK_PANEL);
            var $topUiViewEvent = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_PANDA_INFO);
            $topUiViewEvent.data = obj;
            Pan3d.ModuleEventManager.dispatchEvent($topUiViewEvent);
        };
        return InvitationPanel;
    }(H5UIConatiner));
    invitation.InvitationPanel = InvitationPanel;
})(invitation || (invitation = {}));
//# sourceMappingURL=InvitationPanel.js.map