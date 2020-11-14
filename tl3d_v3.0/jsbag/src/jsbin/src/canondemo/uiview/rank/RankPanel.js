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
var rank;
(function (rank) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIManager = Pan3d.UIManager;
    var SListItemData = Pan3d.SListItemData;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var ColorType = Pan3d.ColorType;
    var RankPanel = /** @class */ (function (_super) {
        __extends(RankPanel, _super);
        function RankPanel() {
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
            _this.h5UIAtlas.setInfo("ui/rank/rank.txt", "ui/rank/rank.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        RankPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_win_close:
                    this.hidePanel();
                    break;
                default:
                    break;
            }
        };
        RankPanel.prototype.hidePanel = function () {
            if (this.uiLoadComplte) {
                UIManager.getInstance().removeUIContainer(this);
                this._skinList.hide();
            }
        };
        RankPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
                this._skinList.show();
                this.getWebList();
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        RankPanel.prototype.getWebList = function () {
            var _this = this;
            GameData.changeWebUserInfo("money", String(GameData.hasdiamondsHavenum));
            // get_money_rank_list(openid, area, page)
            var $postStr = "";
            $postStr += "openid=" + GameData.getStorageSync("openid");
            $postStr += "&linage=" + 99;
            GameData.WEB_SEVER_EVENT_AND_BACK("get_money_rank_list", $postStr, function (listRes) {
                var ary = new Array;
                console.log(listRes);
                for (var i = 0; listRes.data && i < listRes.data.list.length; i++) {
                    var $vo = new GameUserVo();
                    $vo.money = listRes.data.list[i].money;
                    $vo.name = listRes.data.list[i].name;
                    $vo.avatar = listRes.data.list[i].avatar;
                    $vo.selfRank = listRes.data.rank;
                    if (!$vo.avatar || $vo.avatar.length <= 1) {
                        $vo.avatar = "https://api.h5key.com/static/wudiqiuqiu/ui/userpic/emptyicon.jpg";
                    }
                    var item = new SListItemData;
                    item.data = $vo;
                    item.id = listRes.data.list[i].rank;
                    ary.push(item);
                }
                _this._skinList.refreshData(ary);
                _this.drawSelfInfo(listRes.data.rank);
            });
        };
        RankPanel.prototype.drawSelfInfo = function (value) {
            if (GameData.userInfo) {
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_self_rank_id.skinName, String(value), 16, TextAlign.CENTER, ColorType.Black000000);
                this._topRender.uiAtlas.upDataWebPicToTexture(GameData.userInfo.avatarUrl, this.a_self_icon.skinName);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_self_name.skinName, GameData.userInfo.nickName, 16, TextAlign.CENTER, ColorType.Black000000);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_self_res_txt.skinName, String(GameData.hasdiamondsHavenum), 16, TextAlign.CENTER, ColorType.Black000000);
            }
        };
        RankPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.a_tip_bg = this.addChild(this._bottomRender.getComponent("a_tip_bg"));
            this.a_tip_bg.top = 0;
            this.a_tip_bg.left = 0;
            this.a_tip_bg.width = 540 * Pan3d.UIData.Scale;
            this.a_tip_bg.height = 960 * Pan3d.UIData.Scale;
            this.addChild(this._midRender.getComponent("a_win_bg"));
            this.a_win_close = this.addEvntBut("a_win_close", this._midRender);
            this.addChild(this._topRender.getComponent("a_res_label"));
            this.addChild(this._topRender.getComponent("a_name_label"));
            this.addChild(this._topRender.getComponent("a_icon_label"));
            this.addChild(this._topRender.getComponent("a_id_label"));
            this.addChild(this._midRender.getComponent("a_self_rank_bg"));
            this.a_self_rank_id = this.addChild(this._topRender.getComponent("a_self_rank_id"));
            this.a_self_icon = this.addChild(this._topRender.getComponent("a_self_icon"));
            this.a_self_name = this.addChild(this._topRender.getComponent("a_self_name"));
            this.a_self_res_txt = this.addChild(this._topRender.getComponent("a_self_res_txt"));
            this._skinList = new rank.RankUiList();
            this._skinList.init(this._topRender.uiAtlas);
            this.uiLoadComplte = true;
            this.showPanel();
        };
        return RankPanel;
    }(H5UIConatiner));
    rank.RankPanel = RankPanel;
})(rank || (rank = {}));
//# sourceMappingURL=RankPanel.js.map