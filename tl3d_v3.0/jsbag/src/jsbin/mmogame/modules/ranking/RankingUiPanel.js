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
    var RankingUiPanel = /** @class */ (function (_super) {
        __extends(RankingUiPanel, _super);
        function RankingUiPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._publicRender = new UIRenderComponent;
            _this.addRender(_this._publicRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._baseRender.uiAtlas = new UIAtlas();
            return _this;
        }
        RankingUiPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            if (this.currentServerRanking) {
                this.currentServerRanking.dispose();
                this.currentServerRanking = null;
            }
            _super.prototype.dispose.call(this);
        };
        RankingUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._publicRender.uiAtlas = WindowUi.winUIAtlas;
            this._baseRender.uiAtlas.setInfo("ui/uidata/ranking/ranking.xml", "ui/uidata/ranking/ranking.png", function () { _this.loadConfigCom(); }, "ui/uidata/ranking/rankingpc.png");
        };
        RankingUiPanel.prototype.loadConfigCom = function () {
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;
            var renderLevel = this._baseRender;
            this.addChild(renderLevel.getComponent("title"));
            this.applyLoadComplete();
        };
        /**
         * 0战力
         * 1等级
         * 2家族
         * 3翅膀
         * 4坐骑
         * 5排位赛
         */
        RankingUiPanel.prototype.show = function ($data) {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            if (!this.currentServerRanking) {
                this.currentServerRanking = new ranking.CurrentServerRanking();
                this.currentServerRanking.initUiAtlas(this._baseRender.uiAtlas, this._publicRender.uiAtlas, this.winmidRender);
                this.currentServerRanking.parent = this;
            }
            this.currentServerRanking.show($data);
        };
        RankingUiPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            if (this.currentServerRanking) {
                this.currentServerRanking.hide();
            }
            ModulePageManager.hideResTittle();
        };
        RankingUiPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        RankingUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new ranking.RankingEvent(ranking.RankingEvent.HIDE_RANKING_EVENT));
                    break;
                default:
                    break;
            }
        };
        return RankingUiPanel;
    }(WindowUi));
    ranking.RankingUiPanel = RankingUiPanel;
})(ranking || (ranking = {}));
//# sourceMappingURL=RankingUiPanel.js.map