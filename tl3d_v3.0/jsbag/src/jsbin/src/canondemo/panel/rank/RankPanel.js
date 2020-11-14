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
    var UIData = Pan3d.UIData;
    var UIManager = Pan3d.UIManager;
    var SListItemData = Pan3d.SListItemData;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var ColorType = Pan3d.ColorType;
    var Rectangle = Pan3d.Rectangle;
    var Vector2D = Pan3d.Vector2D;
    var UiDraw = Pan3d.UiDraw;
    var RankPanel = /** @class */ (function (_super) {
        __extends(RankPanel, _super);
        function RankPanel() {
            var _this = _super.call(this) || this;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        RankPanel.prototype.baseWindowLoadFinish = function () {
            var _this = this;
            _super.prototype.baseWindowLoadFinish.call(this);
            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);
            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/rank/rank.txt", "panelui/rank/rank.png", function () { _this.loadConfigCom(); });
        };
        RankPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.base_win_close:
                    this.hidePanel();
                    break;
                case this.a_tab_1:
                    this.selectTab(1);
                    break;
                case this.a_tab_2:
                    this.selectTab(2);
                    break;
                default:
                    break;
            }
        };
        RankPanel.prototype.selectTab = function (value) {
            if (value == 1) {
                this.a_tab_1.selected = false;
                this.a_tab_2.selected = true;
                this.a_tab_txt1.goToAndStop(1);
                this.a_tab_txt2.goToAndStop(2);
                this.getWebLevelList(1);
            }
            if (value == 2) {
                this.a_tab_1.selected = true;
                this.a_tab_2.selected = false;
                this.a_tab_txt1.goToAndStop(0);
                this.a_tab_txt2.goToAndStop(1);
                this.getWebLevelList(2);
            }
        };
        RankPanel.prototype.hidePanel = function () {
            var _this = this;
            if (this.uiLoadComplte) {
                this.TweenLiteScale(UIData.Scale, 0.1, 0.2, function () {
                    UIManager.getInstance().removeUIContainer(_this);
                    _this._rankUiList.hide();
                });
            }
        };
        RankPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
                this._rankUiList.show();
                this.TweenLiteScale(0.1, UIData.Scale, 0.5);
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        RankPanel.prototype.getWebLevelList = function (tabType) {
            var _this = this;
            var $webStr;
            if (tabType == 1) {
                GameData.changeWebUserInfo("level", String(GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL)));
                $webStr = "get_user_level_rank_list";
            }
            else {
                $webStr = "get_money_rank_list";
                GameData.changeWebUserInfo("money", String(GameData.hasdiamondsHavenum));
            }
            var $postStr = "";
            $postStr += "openid=" + GameData.getStorageSync("openid");
            $postStr += "&linage=" + 99;
            if (GameData.userInfo && GameData.userInfo.province) {
                if (GameData.severinfo.rankarea.indexOf(GameData.userInfo.province) != -1) {
                    $postStr += "&area=" + GameData.userInfo.province;
                }
            }
            GameData.WEB_SEVER_EVENT_AND_BACK($webStr, $postStr, function (listRes) {
                var ary = new Array;
                console.log(listRes.data);
                for (var i = 0; listRes.data && i < listRes.data.list.length; i++) {
                    var $vo = new GameUserVo();
                    $vo.resnum = listRes.data.list[i].money;
                    $vo.name = listRes.data.list[i].name;
                    $vo.avatar = listRes.data.list[i].avatar;
                    $vo.selfRank = listRes.data.rank;
                    if (!$vo.avatar || $vo.avatar.length <= 1) {
                        $vo.avatar = GameData.emptyiconUrl;
                    }
                    var item = new SListItemData;
                    item.data = $vo;
                    item.id = listRes.data.list[i].rank;
                    ary.push(item);
                }
                _this._rankUiList.refreshData(ary);
                _this.drawSelfInfo(listRes.data.rank, tabType);
            });
        };
        RankPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this._rankUiList.resize();
        };
        RankPanel.prototype.drawSelfInfo = function (value, tabType) {
            if (GameData.userInfo) {
                var $selfTxt = "";
                if (value >= 1000 || value <= 0) {
                    $selfTxt = "999";
                }
                else {
                    $selfTxt = String(value);
                }
                this.drawPicAndTxt(this.a_self_rank_id, "List_id_bg", $selfTxt, new Vector2D(0, 15), TextAlign.CENTER);
                this._topRender.uiAtlas.upDataWebPicToTexture(GameData.userInfo.avatarUrl, this.a_self_icon.skinName);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_self_name.skinName, GameData.userInfo.nickName, 16, TextAlign.CENTER, ColorType.Black000000);
                var $str = "";
                if (tabType == 1) {
                    $str = String(GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL));
                }
                else {
                    $str = String(GameData.hasdiamondsHavenum);
                }
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_self_res_txt.skinName, $str, 16, TextAlign.CENTER, ColorType.Black000000);
            }
        };
        RankPanel.prototype.drawPicAndTxt = function ($ui, puslicname, txt, pos, $align) {
            if ($align === void 0) { $align = TextAlign.CENTER; }
            var $rect = this._topRender.uiAtlas.getRec($ui.skinName);
            this._topRender.uiAtlas.ctx = UIManager.getInstance().getContext2D($rect.pixelWitdh, $rect.pixelHeight, false);
            UiDraw.cxtDrawImg(this._topRender.uiAtlas.ctx, puslicname, new Rectangle(0, 0, $rect.pixelWitdh, $rect.pixelHeight), UIData.textlist);
            LabelTextFont.writeSingleLabelToCtx(this._topRender.uiAtlas.ctx, txt, 16, pos.x, pos.y, $align);
            Pan3d.TextureManager.getInstance().updateTexture(this._topRender.uiAtlas.texture, $rect.pixelX, $rect.pixelY, this._topRender.uiAtlas.ctx);
        };
        RankPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.winRect = new Rectangle(0, 10, 470, 700);
            this.addChild(this._topRender.getComponent("a_win_tittle_txt"));
            this.a_tab_1 = this.addEvntButUp("a_tab_1", this._midRender);
            this.a_tab_2 = this.addEvntButUp("a_tab_2", this._midRender);
            this.a_tab_txt1 = this.addChild(this._midRender.getComponent("a_tab_txt1"));
            this.a_tab_txt2 = this.addChild(this._midRender.getComponent("a_tab_txt2"));
            this.addEvntButUp("a_self_rank_bg", this._midRender);
            this.a_self_rank_id = this.addChild(this._topRender.getComponent("a_self_rank_id"));
            this.a_self_icon = this.addChild(this._topRender.getComponent("a_self_icon"));
            this.a_self_name = this.addChild(this._topRender.getComponent("a_self_name"));
            this.a_self_res_txt = this.addChild(this._topRender.getComponent("a_self_res_txt"));
            this._rankUiList = new rank.RankUiList();
            this._rankUiList.init(this._topRender.uiAtlas);
            this.uiLoadComplte = true;
            this.showPanel();
            this.selectTab(1);
        };
        return RankPanel;
    }(basewin.BaseWinPanel));
    rank.RankPanel = RankPanel;
})(rank || (rank = {}));
//# sourceMappingURL=RankPanel.js.map