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
var ranking;
(function (ranking) {
    var RankReward = /** @class */ (function (_super) {
        __extends(RankReward, _super);
        function RankReward() {
            var _this = _super.call(this) || this;
            _this.setBlackBg();
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._bgRender.uiAtlas = new UIAtlas();
            return _this;
        }
        RankReward.prototype.dispose = function () {
            this._midRender.dispose();
            this._midRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            _super.prototype.dispose.call(this);
        };
        RankReward.prototype.applyLoad = function () {
            var _this = this;
            this._bgRender.uiAtlas.setInfo("ui/uidata/window/windowrank.xml", "ui/uidata/window/windowrank.png", function () { _this.loadConfigCom(); });
        };
        RankReward.prototype.loadConfigCom = function () {
            this._midRender.uiAtlas = this._bgRender.uiAtlas;
            this._baseRender.uiAtlas = this._bgRender.uiAtlas;
            this.addUIList(["b_title", "b_line2", "b_line1", "b_line", "b_bg2", "b_bg1"], this._bgRender);
            this.addUIList(["b_info", "b_rank3", "b_rank2", "b_rank1", "b_titlebg1", "b_titlebg2", "b_titlebg3", "b_1", "b_2"], this._baseRender);
            this._rewardAry = new Array;
            for (var i = 0; i < 3; i++) {
                this._rewardAry.push(this.addChild(this._midRender.getComponent("b_reward" + i)));
            }
            this.resize();
            this.applyLoadComplete();
        };
        RankReward.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        RankReward.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.c_close:
                    UIManager.getInstance().removeUIContainer(this);
                    break;
                default:
                    break;
            }
        };
        RankReward.prototype.show = function ($type) {
            UIManager.getInstance().addUIContainer(this);
            for (var i = 0; i < 3; i++) {
                var tabrankreward = tb.Tb_rank_reward.getTempByID($type, (i + 1));
                this._midRender.uiAtlas.upDataPicToTexture(getUItittleUrl(String(tabrankreward.title)), this._rewardAry[i].skinName);
            }
        };
        return RankReward;
    }(WindowCentenMin));
    ranking.RankReward = RankReward;
})(ranking || (ranking = {}));
//# sourceMappingURL=RankReward.js.map