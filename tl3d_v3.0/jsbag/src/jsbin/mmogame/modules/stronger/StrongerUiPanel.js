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
var stronger;
(function (stronger) {
    var StrongerUiPanel = /** @class */ (function (_super) {
        __extends(StrongerUiPanel, _super);
        function StrongerUiPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._publicbgRender = new UIRenderComponent;
            _this.addRender(_this._publicbgRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._baseRender.uiAtlas = new UIAtlas();
            return _this;
        }
        StrongerUiPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            // this._publicbgRender.dispose();
            // this._publicbgRender = null;
            this._topRender.dispose();
            this._topRender = null;
            if (this.strongerTabList) {
                this.strongerTabList.dispose();
                this.strongerTabList = null;
            }
            if (this.strongerList) {
                this.strongerList.dispose();
                this.strongerList = null;
            }
            _super.prototype.dispose.call(this);
        };
        StrongerUiPanel.prototype.applyLoad = function () {
            var _this = this;
            // this._baseRender.setInfo("ui/uidata/ranking/ranking.xml", "ui/uidata/ranking/ranking.png", () => { this.loadConfigCom() });
            GameData.getPublicUiAtlas(function ($publicbgUiAtlas) {
                _this._publicbgRender.uiAtlas = $publicbgUiAtlas;
                _this._baseRender.uiAtlas.setInfo("ui/uidata/stronger/stronger.xml", "ui/uidata/stronger/stronger.png", function () { _this.loadConfigCom(); }, "ui/uidata/stronger/strongerpc.png");
            });
        };
        StrongerUiPanel.prototype.loadConfigCom = function () {
            this._topRender.uiAtlas = this._baseRender.uiAtlas;
            var renderLevel = this._baseRender;
            this.listindex0 = this.addChild(renderLevel.getComponent("listindex0"));
            this.listindex1 = this.addChild(renderLevel.getComponent("listindex1"));
            this.addUIList(["a_4", "a_3", "a_2"], this._topRender);
            this.addUIList(["a_bg0", "a_bg1", "line_s", "line1", "a_title"], this._baseRender);
            this.curlev = this.addChild(this._topRender.getComponent("a_7"));
            this.curzhanli = this.addChild(this._topRender.getComponent("a_5"));
            this.goodzhanli = this.addChild(this._topRender.getComponent("a_6"));
            this.a_zhanli_numAry = new Array;
            for (var i = 0; i < 5; i++) {
                this.a_zhanli_numAry.push(this.addChild(this._topRender.getComponent("a_zhanli_num" + i)));
            }
            var bg = this.addChild(this._publicbgRender.getComponent("cnew_coffeeBg"));
            this.setSizeForPanelUiCopy(bg, "c_coffeeBg", renderLevel);
            this._publicbgRender.applyObjData();
            this.applyLoadComplete();
        };
        StrongerUiPanel.prototype.show = function ($type) {
            if (!$type) {
                $type = 1;
            }
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                ModulePageManager.showResTittle([1, 2, 3]);
            }
            if (!this.strongerTabList) {
                this.strongerTabList = new stronger.StrongerTabList();
                this.strongerTabList.init(this._baseRender.uiAtlas);
            }
            this.strongerTabList.show($type);
            this.fresh();
            this.resize();
        };
        StrongerUiPanel.prototype.fresh = function () {
            var curlev = GuidData.player.getLevel();
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.curlev.skinName, String(curlev), 16, TextAlign.RIGHT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.curzhanli.skinName, Snum(GuidData.player.getForce()), 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            var tabvo = tb.TB_bianqiang_value.get_TB_bianqiang_valueById(curlev);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.goodzhanli.skinName, Snum(tabvo.value), 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            var lev = stronger.StrongerUitl.getGrade(Math.floor(GuidData.player.getForce()), tabvo.value);
            for (var i = 0; i < 5; i++) {
                var selx = lev >= i ? 0 : 1;
                this.a_zhanli_numAry[i].goToAndStop(selx);
            }
        };
        StrongerUiPanel.prototype.showStrongerList = function ($index) {
            if (!this.strongerList) {
                this.strongerList = new stronger.StrongerList();
                this.strongerList.init(this._baseRender.uiAtlas);
            }
            this.strongerList.show($index);
        };
        StrongerUiPanel.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
            if (this.strongerTabList) {
                this.strongerTabList.hide();
            }
            if (this.strongerList) {
                this.strongerList.hide();
            }
            ModulePageManager.hideResTittle();
        };
        StrongerUiPanel.prototype.resize = function () {
            // this.b_bg1_1.top = 53
            // // this.b_bg1_1.y = 0;
            // this.b_bg1_1.height = Scene_data.stageHeight / UIData.Scale;
            // this.b_bg1_1.width = Scene_data.stageWidth / UIData.Scale;
            _super.prototype.resize.call(this);
            if (this.strongerTabList) {
                this.strongerTabList.left = this.listindex0.parent.x / UIData.Scale + this.listindex0.x;
                this.strongerTabList.top = this.listindex0.parent.y / UIData.Scale + this.listindex0.y;
            }
            if (this.strongerList) {
                this.strongerList.left = this.listindex1.parent.x / UIData.Scale + this.listindex1.x;
                this.strongerList.top = this.listindex1.parent.y / UIData.Scale + this.listindex1.y;
            }
        };
        StrongerUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new stronger.StrongerEvent(stronger.StrongerEvent.HIDE_Stronger_EVENT));
                    break;
                default:
                    break;
            }
        };
        return StrongerUiPanel;
    }(WindowUi));
    stronger.StrongerUiPanel = StrongerUiPanel;
})(stronger || (stronger = {}));
//# sourceMappingURL=StrongerUiPanel.js.map