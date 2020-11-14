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
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var TimeUtil = Pan3d.TimeUtil;
    var Rectangle = Pan3d.Rectangle;
    var OnlineStartPanel = /** @class */ (function (_super) {
        __extends(OnlineStartPanel, _super);
        function OnlineStartPanel() {
            var _this = _super.call(this) || this;
            _this.skipNum = 0;
            return _this;
        }
        OnlineStartPanel.prototype.baseWindowLoadFinish = function () {
            var _this = this;
            _super.prototype.baseWindowLoadFinish.call(this);
            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);
            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/online/online.txt", "panelui/online/online.png", function () { _this.loadConfigCom(); });
        };
        OnlineStartPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.uiLoadComplte = true;
            this.winRect = new Rectangle(0, -20, 400, 400);
            this.ureCellItem = new Array;
            for (var i = 0; i < 6; i++) {
                var $a_usre_cell = this.addChild(this._topRender.getComponent("a_usre_cell"));
                $a_usre_cell.goToAndStop(i);
                $a_usre_cell.x = $a_usre_cell.baseRec.x + 75 * (i % 3);
                $a_usre_cell.y = $a_usre_cell.baseRec.y + 70 * Math.floor(i / 3);
                this.ureCellItem.push($a_usre_cell);
            }
            this.addChild(this._topRender.getComponent("a_tittle_txt"));
            this.a_base_but_bg = this.addEvntBut("a_base_but_bg", this._midRender);
            this.addChild(this._topRender.getComponent("a_online_start_txt"));
            ;
            this.win_tip_bg.addEventListener(InteractiveEvent.Down, this.butClik, this);
            this.win_tip_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.showPanel();
        };
        OnlineStartPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_base_but_bg:
                    if (this.skipNum > 4) {
                        Pan3d.ModuleEventManager.dispatchEvent(new mainui.MainuiEvent(mainui.MainuiEvent.HIDE_MAIN_UI_PANEL));
                        if (GameData.gameType == 1) {
                            this.hidePanel();
                            var $tadayStr = Pan3d.TimeUtil.getLocalTime0(GameData.getSeverTime() / 1000);
                            var $lastGetDate = GameData.getStorageSync("onlineFristEveryDay");
                            if ($lastGetDate != $tadayStr) {
                                online.OnlineManager.getInstance().canAotuPlay = true;
                            }
                            else {
                                online.OnlineManager.getInstance().canAotuPlay = false;
                            }
                            ModuleEventManager.dispatchEvent(new online.OnlineEvent(online.OnlineEvent.PLAY_ONLINE_SCENE_START));
                            ModuleEventManager.dispatchEvent(new online.OnlineEvent(online.OnlineEvent.SHOW_ONLINE_MAIN_PANEL));
                        }
                    }
                    break;
                case this.win_tip_bg:
                    break;
                default:
                    this.hidePanel();
                    break;
            }
        };
        OnlineStartPanel.prototype.clearAll = function () {
            this.skipNum = 0;
            for (var i = 0; i < this.ureCellItem.length; i++) {
                var $ui = this.ureCellItem[i];
                var $toRect = $ui.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                $ctx.fillStyle = "rgba(66,66,66,1)";
                $ctx.fillRect(0, 0, $toRect.width, $toRect.width);
                $ui.drawToCtx(this._topRender.uiAtlas, $ctx);
            }
        };
        OnlineStartPanel.prototype.oneByOne = function () {
            var _this = this;
            if (this.skipNum < this.ureCellItem.length) {
                var $onlineUserVo = online.OnlineManager.getInstance().onleuserlist[this.skipNum];
                this.drawTempUre(this.ureCellItem[this.skipNum], $onlineUserVo.avatar);
                this.skipNum++;
                TimeUtil.addTimeOut(100, function () { _this.oneByOne(); });
            }
        };
        OnlineStartPanel.prototype.drawTempUre = function ($ui, $url) {
            var _this = this;
            GameData.loadImgByPicUrl($url, function ($img) {
                var $toRect = $ui.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                var context = $ctx;
                $ctx.drawImage($img, 0, 0, $toRect.width, $toRect.height);
                $ctx.fillStyle = "rgba(255,255,255,1)";
                $ctx.fillRect(0, 0, 5, $toRect.height);
                $ctx.fillRect(0, 0, $toRect.width, 5);
                $ctx.fillRect(0, $toRect.height - 5, $toRect.width, 5);
                $ctx.fillRect($toRect.width - 5, 0, 5, $toRect.height);
                $ui.drawToCtx(_this._topRender.uiAtlas, $ctx);
                console.log("小熊猫加载成功", $img);
            });
        };
        OnlineStartPanel.prototype.getWebUser = function () {
            var _this = this;
            var $arr = new Array;
            var $postStr = "";
            $postStr += "openid=" + GameData.getStorageSync("openid");
            $postStr += "&linage=" + 6;
            GameData.WEB_SEVER_EVENT_AND_BACK("get_money_rank_list", $postStr, function (listRes) {
                var ary = new Array;
                $arr.push(_this.getSelfVo());
                for (var i = 0; listRes.data && i < listRes.data.list.length; i++) {
                    var $vo = new online.OnlineUserVo();
                    $vo.name = listRes.data.list[i].name;
                    $vo.avatar = listRes.data.list[i].avatar;
                    $vo.openid = listRes.data.list[i].openid;
                    $vo.skin = listRes.data.list[i].skin;
                    if (!$vo.avatar || $vo.avatar.length <= 1) {
                        $vo.avatar = GameData.emptyiconUrl;
                    }
                    if ($arr.length < 6 && $vo.openid != GameData.getStorageSync("openid")) {
                        $arr.push($vo);
                    }
                    console.log(listRes);
                }
                online.OnlineManager.getInstance().onleuserlist = $arr;
                _this.oneByOne();
            });
        };
        OnlineStartPanel.prototype.getSelfVo = function () {
            var $vo = new online.OnlineUserVo();
            $vo.name = "我自己";
            $vo.avatar = GameData.emptyiconUrl;
            $vo.openid = GameData.getStorageSync("openid");
            $vo.skin = GameData.getStorageSyncNumber("skinType");
            if (GameData.userInfo) {
                $vo.avatar = GameData.userInfo.avatarUrl;
                $vo.name = GameData.userInfo.nickName;
            }
            return $vo;
        };
        OnlineStartPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.clearAll();
                this.getWebUser();
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        OnlineStartPanel.prototype.hidePanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().removeUIContainer(this);
                GameData.setStorageSync("onlineTm", GameData.getSeverTime());
            }
        };
        return OnlineStartPanel;
    }(basewin.BaseWinPanel));
    online.OnlineStartPanel = OnlineStartPanel;
})(online || (online = {}));
//# sourceMappingURL=OnlineStartPanel.js.map