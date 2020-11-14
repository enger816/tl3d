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
var sboss;
(function (sboss) {
    var WbossRewardPanel = /** @class */ (function (_super) {
        __extends(WbossRewardPanel, _super);
        function WbossRewardPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.middle = 0;
            _this.center = 0;
            _this.setBlackBg();
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            return _this;
        }
        WbossRewardPanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseUiAtlas = new UIAtlas();
            this._baseUiAtlas.setInfo("ui/uidata/boss/sboss/wbossreward.xml", "ui/uidata/boss/sboss/wbossreward.png", function () { _this.loadConfigCom(); });
        };
        //private labAry: Array<UICompenent>;
        //private myInfo: UICompenent;
        WbossRewardPanel.prototype.loadConfigCom = function () {
            this._baseRender.uiAtlas = this._baseUiAtlas;
            this.addUIList(["t_line1", "t_line2", "t_win_title"], this._baseRender);
            var ui;
            ui = this.addChild(this._baseRender.getComponent("t_title1"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "排行", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            ui = this.addChild(this._baseRender.getComponent("t_title2"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "奖励", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            ui = this.addChild(this._baseRender.getComponent("t_reward_title"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "奖励说明", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            ui = this.addChild(this._baseRender.getComponent("t_info"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "●对boss造成伤害的玩家都可以获得奖励。\n排名越高的玩家获得的奖励越多", 16, TextAlign.LEFT, ColorType.Green2ca937);
            this.addLists();
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        };
        WbossRewardPanel.prototype.addLists = function () {
            this.rewardSList = new WbossRewardSList;
            this.rewardSList.init(this._baseUiAtlas);
        };
        WbossRewardPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        WbossRewardPanel.prototype.butClik = function (evt) {
            if (evt.target == this.c_close) {
                this.hide();
            }
        };
        WbossRewardPanel.prototype.hide = function () {
            this.rewardSList.hide();
            UIManager.getInstance().removeUIContainer(this);
        };
        WbossRewardPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.rewardSList.show();
        };
        return WbossRewardPanel;
    }(WindowCentenMin));
    sboss.WbossRewardPanel = WbossRewardPanel;
    var WbossRewardSList = /** @class */ (function (_super) {
        __extends(WbossRewardSList, _super);
        function WbossRewardSList() {
            return _super.call(this) || this;
        }
        WbossRewardSList.prototype.init = function ($uiAtlas) {
            WbossRewardSListRender.baseAtlas = $uiAtlas;
            this.initData();
        };
        WbossRewardSList.prototype.initData = function () {
            var $ary = new Array();
            var w = 400;
            var h = 288;
            this.setData($ary, WbossRewardSListRender, w, h, 355, 56, 5, 256, 512, 1, 6);
            this.center = 20;
            this.middle = -10;
            this.setRankData();
        };
        WbossRewardSList.prototype.setRankData = function () {
            var $tbDataArr = new Array();
            var size = TableData.getInstance().getTabSize(TableData.tb_worldboss_rank_reward);
            for (var i = 0; i < size; i++) {
                var $vo = new SListItemData();
                var tabObj = TableData.getInstance().getData(TableData.tb_worldboss_rank_reward, i + 1);
                var obj = new Object;
                if (tabObj.range[0] == tabObj.range[1]) {
                    obj.rank = String(tabObj.range[0]);
                }
                else if (tabObj.range[1] > 0) {
                    obj.rank = tabObj.range[0] + "-" + tabObj.range[1];
                }
                else {
                    obj.rank = tabObj.range[0] + "以上";
                }
                obj.reward = tabObj.showRewards;
                $vo.id = i;
                $vo.data = obj;
                $tbDataArr.push($vo);
            }
            this.refreshData($tbDataArr);
        };
        WbossRewardSList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.setShowLevel(2);
        };
        WbossRewardSList.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        return WbossRewardSList;
    }(SList));
    sboss.WbossRewardSList = WbossRewardSList;
    var WbossRewardSListRender = /** @class */ (function (_super) {
        __extends(WbossRewardSListRender, _super);
        function WbossRewardSListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WbossRewardSListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.r_rank = this.creatSUI($baseRender, WbossRewardSListRender.baseAtlas, "s_lab", 5, 16, 100, 20);
            $container.addChild(this.r_rank);
            this.r_bg = this.creatGrid9SUI($bgRender, WbossRewardSListRender.baseAtlas, "s_bg", 0, 0, 356, 56, 5, 5);
            $container.addChild(this.r_bg);
            this.iconAry = new Array;
            for (var i = 0; i < 4; i++) {
                var icon = this.creatSUI($baseRender, WbossRewardSListRender.baseAtlas, "s_r" + i, 120 + i * 55, 6, 48, 48);
                $container.addChild(icon);
                this.iconAry.push(icon);
            }
        };
        WbossRewardSListRender.prototype.applyRender = function () {
            if (!(this.itdata.id % 2)) {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.r_bg.skinName, UIData.publicUi, PuiData.LISTITEMBG);
            }
            var $vo = this.itdata.data;
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.r_rank.skinName, ColorType.Brown7a2f21 + $vo.rank, 14, TextAlign.CENTER);
            for (var i = 0; i < this.iconAry.length; i++) {
                if ($vo.reward[i]) {
                    IconManager.getInstance().drawItemIcon40(this.iconAry[i], $vo.reward[i][0], $vo.reward[i][1]);
                }
            }
        };
        WbossRewardSListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if (this.itdata && this.itdata.data) {
                this.applyRender();
            }
        };
        return WbossRewardSListRender;
    }(SListItem));
    sboss.WbossRewardSListRender = WbossRewardSListRender;
})(sboss || (sboss = {}));
//# sourceMappingURL=WbossRewardPanel.js.map