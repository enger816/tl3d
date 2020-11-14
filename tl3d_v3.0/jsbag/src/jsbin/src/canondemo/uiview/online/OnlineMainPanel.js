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
var online;
(function (online) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var ArtFont = Pan3d.ArtFont;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var TimeUtil = Pan3d.TimeUtil;
    var OnlineMainPanel = /** @class */ (function (_super) {
        __extends(OnlineMainPanel, _super);
        function OnlineMainPanel() {
            var _this = _super.call(this) || this;
            _this.interfaceUI = true;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this._aoutRender = new UIRenderComponent();
            _this.frameFun = function () { _this.upFrame(); };
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("ui/online/online.txt", "ui/online/online.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        OnlineMainPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this._aoutRender.uiAtlas = this.h5UIAtlas;
            this.addChild(this._topRender.getComponent("b_tittle_txt"));
            this.b_time_txt = this.addChild(this._topRender.getComponent("b_time_txt"));
            this.b_exit_online_but_bg = this.addEvntBut("b_exit_online_but_bg", this._midRender);
            this.addChild(this._topRender.getComponent("b_exit_online_but"));
            this.b_aotu_but = this.addEvntBut("b_aotu_but", this._topRender);
            this.b_aotu_but.goToAndStop(0);
            this.userListUiArr = new Array;
            for (var i = 0; i < 6; i++) {
                var $ui = this.addChild(this._topRender.getComponent("b_user_list"));
                $ui.goToAndStop(i);
                $ui.y = $ui.baseRec.y + 32 * i;
                this.userListUiArr.push($ui);
            }
            this.aotuTxtItem = new Array;
            for (var j = 0; j < 5; j++) {
                var $outuui = this.addChild(this._aoutRender.getComponent("b_aotu_txt" + j));
                this.aotuTxtItem.push($outuui);
            }
            this.uiLoadComplte = true;
            this.showPanel();
        };
        OnlineMainPanel.prototype.upFrame = function () {
            var $n = this.endTm - TimeUtil.getTimer();
            if ($n > 0) {
                this.drawTimeTime(Math.floor($n / 1000));
                this.drawUserListData();
                for (var i = 0; i < this.aotuTxtItem.length; i++) {
                    var $tm = TimeUtil.getTimer() / 5;
                    var $ui = this.aotuTxtItem[i];
                    // console.log($ui.baseRec);
                    // width: 30, height
                    $tm = $tm - i * 50;
                    var $v = Math.sin($tm * Math.PI / 180) * 0.2;
                    $ui.width = $ui.baseRec.width * (1 + $v);
                    $ui.height = $ui.baseRec.height * (1 + $v);
                    $ui.x = $ui.baseRec.x - $ui.width / 2 + $ui.baseRec.width / 2;
                    $ui.y = $ui.baseRec.y - $ui.height / 2 + $ui.baseRec.height / 2;
                }
                // this._aoutRender.applyObjData()
            }
            else {
                TimeUtil.removeFrameTick(this.frameFun);
                ModuleEventManager.dispatchEvent(new online.OnlineEvent(online.OnlineEvent.SHOW_ONLINE_FINISH_PANEL));
            }
        };
        OnlineMainPanel.prototype.drawTimeTime = function (value) {
            var s = Math.floor(value / 60);
            var m = Math.floor((value % 60));
            var str = (s < 10 ? "0" : "") + s + ":" + (m < 10 ? "0" : "") + m;
            if (this.b_time_txt.data != str) {
                this.b_time_txt.data = str;
                ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.b_time_txt.skinName, str, "NUM44", TextAlign.CENTER);
            }
        };
        OnlineMainPanel.prototype.drawUserListData = function () {
            if (this.canDrawTm < TimeUtil.getTimer()) {
                online.OnlineManager.getInstance().onleuserlist.sort(function (a, b) { return a.num > b.num ? -1 : 1; });
                for (var i = 0; i < this.userListUiArr.length; i++) {
                    var $onlineUserVo = online.OnlineManager.getInstance().onleuserlist[i];
                    var $ui = this.userListUiArr[i];
                    if ($ui.data != $onlineUserVo) {
                        $ui.data = $onlineUserVo;
                        this.drawPicToUi($ui, $onlineUserVo, i);
                    }
                }
                this.canDrawTm = TimeUtil.getTimer() + 5000;
            }
        };
        OnlineMainPanel.prototype.drawPicToUi = function ($temp, $onlineUserVo, $rank) {
            var _this = this;
            GameData.loadImgByPicUrl($onlineUserVo.avatar, function ($img) {
                var $toRect = $temp.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                $ctx.drawImage($img, 0, 0, 30, 30);
                $ctx.fillStyle = "rgba(255,255,255,1)";
                $ctx.fillRect(0, 0, 2, 30);
                $ctx.fillRect(0, 0, 30, 2);
                $ctx.fillRect(0, 30 - 2, 30, 2);
                $ctx.fillRect(30 - 2, 0, 2, 30);
                LabelTextFont.writeSingleLabelToCtx($ctx, $onlineUserVo.name, 18, 30, 0, Pan3d.TextAlign.LEFT, Pan3d.ColorType.Black000000);
                $temp.drawToCtx(_this._topRender.uiAtlas, $ctx);
            });
        };
        OnlineMainPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.b_aotu_but:
                    if (!online.OnlineManager.getInstance().canAotuPlay) {
                        if (!GameData.advertiseList || GameData.advertiseList.length < 1) {
                            msgalert.AlertUtil.show("需要邀请一位好友助力才可以", "提示", function (value) {
                                if (value == 1) {
                                    ModuleEventManager.dispatchEvent(new invitation.InvitationEvent(invitation.InvitationEvent.SHOW_INVITATIOIN_PANEL));
                                }
                            }, 2);
                            return;
                        }
                    }
                    online.OnlineManager.getInstance().isAotuPaly = !online.OnlineManager.getInstance().isAotuPaly;
                    if (online.OnlineManager.getInstance().isAotuPaly) {
                        this.b_aotu_but.goToAndStop(1);
                        this.b_aotu_but.y = this.b_aotu_but.baseRec.y;
                        this.addRender(this._aoutRender);
                    }
                    else {
                        this.b_aotu_but.goToAndStop(0);
                        this.b_aotu_but.y = this.b_aotu_but.baseRec.y;
                        this.removeRender(this._aoutRender);
                    }
                    break;
                case this.b_exit_online_but_bg:
                    msgalert.AlertUtil.show("是否确定退出，本局夺宝将不记为奖励", "提示", function (value) {
                        if (value == 1) {
                            ModuleEventManager.dispatchEvent(new online.OnlineEvent(online.OnlineEvent.CLEAR_ONLINE_SCENE_ALL));
                        }
                    }, 2);
                    break;
                default:
                    this.hidePanel();
                    break;
            }
        };
        OnlineMainPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.endTm = TimeUtil.getTimer() + GameData.severinfo.onlinegame.playtime * 1000;
                this.canDrawTm = 0;
                TimeUtil.addFrameTick(this.frameFun);
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        OnlineMainPanel.prototype.hidePanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().removeUIContainer(this);
                TimeUtil.removeFrameTick(this.frameFun);
            }
        };
        return OnlineMainPanel;
    }(H5UIConatiner));
    online.OnlineMainPanel = OnlineMainPanel;
})(online || (online = {}));
//# sourceMappingURL=OnlineMainPanel.js.map