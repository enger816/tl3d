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
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var Rectangle = Pan3d.Rectangle;
    var OnlineFinishPanel = /** @class */ (function (_super) {
        __extends(OnlineFinishPanel, _super);
        function OnlineFinishPanel() {
            return _super.call(this) || this;
        }
        OnlineFinishPanel.prototype.baseWindowLoadFinish = function () {
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
        OnlineFinishPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.winRect = new Rectangle(0, -20, 400, 400);
            this.addEvntBut("c_finish_but", this._midRender);
            this.addChild(this._topRender.getComponent("c_finish_but_txt"));
            this.addChild(this._topRender.getComponent("c_rank_id_txt"));
            this.addChild(this._topRender.getComponent("c_rank_pic"));
            this.addChild(this._topRender.getComponent("c_rank_name_txt"));
            this.addChild(this._topRender.getComponent("c_rank_res_txt"));
            this.userListUiArr = new Array;
            for (var i = 0; i < 6; i++) {
                var $ui = this.addChild(this._topRender.getComponent("c_user_list_rank"));
                $ui.goToAndStop(i);
                $ui.y = $ui.baseRec.y + 35 * i;
                this.userListUiArr.push($ui);
            }
            this.uiLoadComplte = true;
            this.showPanel();
        };
        OnlineFinishPanel.prototype.drawList = function () {
            online.OnlineManager.getInstance().onleuserlist.sort(function (a, b) { return a.num > b.num ? -1 : 1; });
            for (var i = 0; i < this.userListUiArr.length; i++) {
                var $onlineUserVo = online.OnlineManager.getInstance().onleuserlist[i];
                var $ui = this.userListUiArr[i];
                this.drawPicToUi($ui, $onlineUserVo, i);
            }
        };
        OnlineFinishPanel.prototype.drawPicToUi = function ($temp, $onlineUserVo, $rank) {
            var _this = this;
            GameData.loadImgByPicUrl($onlineUserVo.avatar, function ($img) {
                var $toRect = $temp.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                LabelTextFont.writeSingleLabelToCtx($ctx, String($rank + 1), 18, 0, 0, Pan3d.TextAlign.LEFT, Pan3d.ColorType.Black000000);
                var pictx = 30;
                $ctx.drawImage($img, 0 + pictx, 0, 30, 30);
                $ctx.fillStyle = "rgba(255,255,255,1)";
                $ctx.fillRect(0 + pictx, 0, 2, 30);
                $ctx.fillRect(0 + pictx, 0, 30, 2);
                $ctx.fillRect(0 + pictx, 30 - 2, 30, 2);
                $ctx.fillRect(30 + pictx - 2, 0, 2, 30);
                LabelTextFont.writeSingleLabelToCtx($ctx, $onlineUserVo.name, 18, 10, 0, Pan3d.TextAlign.CENTER, Pan3d.ColorType.Black000000);
                LabelTextFont.writeSingleLabelToCtx($ctx, String($onlineUserVo.num), 18, 100, 0, Pan3d.TextAlign.CENTER, Pan3d.ColorType.Black000000);
                $temp.drawToCtx(_this._topRender.uiAtlas, $ctx);
            });
        };
        OnlineFinishPanel.prototype.butClik = function (evt) {
            for (var i = 0; i < online.OnlineManager.getInstance().onleuserlist.length; i++) {
                if (online.OnlineManager.getInstance().onleuserlist[i].openid == GameData.getStorageSync("openid")) {
                    GameData.hasdiamondsHavenum += online.OnlineManager.getInstance().onleuserlist[i].num;
                }
            }
            var $tadayStr = Pan3d.TimeUtil.getLocalTime0(GameData.getSeverTime() / 1000);
            GameData.setStorageSync("onlineFristEveryDay", $tadayStr);
            this.hidePanel();
            ModuleEventManager.dispatchEvent(new online.OnlineEvent(online.OnlineEvent.CLEAR_ONLINE_SCENE_ALL));
        };
        OnlineFinishPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.drawList();
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        OnlineFinishPanel.prototype.hidePanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().removeUIContainer(this);
            }
        };
        return OnlineFinishPanel;
    }(basewin.BaseWinPanel));
    online.OnlineFinishPanel = OnlineFinishPanel;
})(online || (online = {}));
//# sourceMappingURL=OnlineFinishPanel.js.map