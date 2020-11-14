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
var store;
(function (store) {
    var StoreUiPanel = /** @class */ (function (_super) {
        __extends(StoreUiPanel, _super);
        function StoreUiPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._baImg = new UIBackImg();
            _this._baImg.alpha = 0.5;
            _this._baImg.setFbo();
            _this.addRender(_this._baImg);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._baseRender.uiAtlas = new UIAtlas();
            return _this;
        }
        StoreUiPanel.prototype.dispose = function () {
            this._baImg.dispose();
            this._baImg = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            if (this.shopMallPanel) {
                this.shopMallPanel.dispose();
                this.shopMallPanel = null;
            }
            this.rechargePanel.dispose();
            this.rechargePanel = null;
        };
        StoreUiPanel.prototype.onAdd = function () {
            _super.prototype.onAdd.call(this);
            SceneManager.getInstance().updateFBO();
        };
        StoreUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseRender.uiAtlas.setInfo("ui/uidata/store/store.xml", "ui/uidata/store/store.png", function () { _this.loadConfigCom(); }, "ui/uidata/store/storepc.png");
        };
        StoreUiPanel.prototype.loadConfigCom = function () {
            this._topRender.uiAtlas = this._baseRender.uiAtlas;
            var renderLevel = this._baseRender;
            this.Slistindex = this.addChild(this._topRender.getComponent("slistindex"));
            this.addChild(renderLevel.getComponent("b_bg"));
            this.addChild(renderLevel.getComponent("b_bgborrow"));
            var bg_2 = this.addChild(renderLevel.getComponent("bg_2"));
            var bg_21 = this.addChild(renderLevel.getComponent("bg_2"));
            bg_21.isU = true;
            bg_21.x = 912;
            var bg_1 = this.addChild(renderLevel.getComponent("bg_1"));
            var bg_1_1 = this.addChild(renderLevel.getComponent("bg_1"));
            bg_1_1.isU = true;
            bg_1_1.x = bg_1.x + 477;
            this.addChild(renderLevel.getComponent("bg_title"));
            var b_titleribbon = this.addChild(renderLevel.getComponent("b_titleribbon"));
            var b_titleribbon1 = this.addChild(renderLevel.getComponent("b_titleribbon"));
            b_titleribbon1.isU = true;
            b_titleribbon1.x = 560;
            var bg_3 = this.addChild(renderLevel.getComponent("bg_3"));
            var bg_31 = this.addChild(renderLevel.getComponent("bg_3"));
            bg_31.isU = true;
            bg_31.x = 901;
            var b_bgribbon = this.addChild(renderLevel.getComponent("b_bgribbon"));
            var b_bgribbon1 = this.addChild(renderLevel.getComponent("b_bgribbon"));
            b_bgribbon1.isU = true;
            b_bgribbon1.x = 910;
            this.addChild(renderLevel.getComponent("b_bghuawen3"));
            this.addChild(renderLevel.getComponent("b_bghuwen1"));
            this.addChild(renderLevel.getComponent("b_bghuawen2"));
            this.addChild(renderLevel.getComponent("b_bg_bottomline"));
            this.tab_yuanbao = this.addEvntBut("tab_0", this._topRender);
            this.tab_duihuan = this.addEvntBut("tab_1", this._topRender);
            this.tab_money = this.addEvntBut("tab_2", this._topRender);
            this.addChild(this._topRender.getComponent("b_rightline"));
            this.b_bgleft = this._topRender.getComponent("b_bgleft");
            this.b_close = this.addEvntButUp("b_close", this._topRender);
            this.applyLoadComplete();
            this.resize();
        };
        StoreUiPanel.prototype.selecttype = function ($value) {
            if (!$value) {
                $value = [SharedDef.MODULE_MALL_GOLD];
            }
            if (!this.shop) {
                this.shop = new store.Shop();
                this.shop.initUiAtlas(this._baseRender.uiAtlas);
            }
            if (!this.shopMallPanel) {
                this.shopMallPanel = new store.ShopMallPanelTabList();
                this.shopMallPanel.init(this._baseRender.uiAtlas);
            }
            if (!this.rechargePanel) {
                this.rechargePanel = new store.RechargePanel();
                this.rechargePanel.initUiAtlas(this._baseRender.uiAtlas);
            }
            this.setUiListVisibleByItem([this.b_bgleft], $value[0] != SharedDef.MODULE_MALL_RECHARGE);
            if ($value[0] == SharedDef.MODULE_MALL_GOLD) {
                this.tab_yuanbao.selected = true;
                this.tab_duihuan.selected = false;
                this.tab_money.selected = false;
                this.shopMallPanel.show($value);
                this.rechargePanel.hide();
            }
            else if ($value[0] == SharedDef.MODULE_MALL_SCORE) {
                this.tab_duihuan.selected = true;
                this.tab_yuanbao.selected = false;
                this.tab_money.selected = false;
                this.shopMallPanel.show($value);
                this.rechargePanel.hide();
            }
            else {
                this.tab_money.selected = true;
                this.tab_yuanbao.selected = false;
                this.tab_duihuan.selected = false;
                this.rechargePanel.show();
                this.shopMallPanel.hide();
                this.shop.hide();
            }
        };
        StoreUiPanel.prototype.show = function ($type) {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            this.selecttype($type);
        };
        StoreUiPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            if (this.shopMallPanel) {
                this.shopMallPanel.hide();
            }
            if (this.rechargePanel) {
                this.rechargePanel.hide();
            }
            if (this.shop) {
                this.shop.hide();
            }
            ModulePageManager.hideResTittle();
        };
        StoreUiPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.shopMallPanel) {
                this.shopMallPanel.left = this.Slistindex.parent.x / UIData.Scale + this.Slistindex.x;
                this.shopMallPanel.top = this.Slistindex.parent.y / UIData.Scale + this.Slistindex.y;
            }
        };
        StoreUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.tab_yuanbao:
                    this.selecttype([SharedDef.MODULE_MALL_GOLD]);
                    break;
                case this.tab_duihuan:
                    this.selecttype([SharedDef.MODULE_MALL_SCORE]);
                    break;
                case this.tab_money:
                    this.selecttype([SharedDef.MODULE_MALL_RECHARGE]);
                    break;
                case this.b_close:
                    ModuleEventManager.dispatchEvent(new store.StoreEvent(store.StoreEvent.HIDE_Store_EVENT));
                    break;
                default:
                    break;
            }
        };
        return StoreUiPanel;
    }(UIPanel));
    store.StoreUiPanel = StoreUiPanel;
})(store || (store = {}));
//# sourceMappingURL=StoreUiPanel.js.map