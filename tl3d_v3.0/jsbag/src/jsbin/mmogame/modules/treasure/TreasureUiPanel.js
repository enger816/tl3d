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
var treasure;
(function (treasure) {
    var TreasureUiPanel = /** @class */ (function (_super) {
        __extends(TreasureUiPanel, _super);
        function TreasureUiPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._roleRender = new UIRenderComponent;
            _this.addRender(_this._roleRender);
            _this._redPointRender = new RedPointRender;
            _this.addRender(_this._redPointRender);
            _this._roleRender.uiAtlas = new UIAtlas;
            return _this;
        }
        TreasureUiPanel.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._roleRender.dispose();
            this._roleRender = null;
            this._redPointRender.dispose();
            this._redPointRender = null;
            if (this.treasureWear) {
                this.treasureWear.dispose();
                this.treasureWear = null;
            }
            if (this.treasurePage) {
                this.treasurePage.dispose();
                this.treasurePage = null;
            }
            _super.prototype.dispose.call(this);
        };
        TreasureUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._roleRender.uiAtlas.setInfo("ui/uidata/treasure/treasureui.xml", "ui/uidata/treasure/treasureui.png", function () { _this.loadConfigCom(); }, "ui/uidata/treasure/treasurepc.png");
        };
        TreasureUiPanel.prototype.loadConfigCom = function () {
            this._bgRender.uiAtlas = this._roleRender.uiAtlas;
            this.initData();
            this.resize();
            this.applyLoadComplete();
        };
        TreasureUiPanel.prototype.initData = function () {
            //添加UI控件初始化
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;
            this.TabAry = new Array;
            for (var i = 0; i < 2; i++) {
                var a = this.addChild(this._bgRender.getComponent("tab" + i));
                a.data = SharedDef.MODULE_DIVINE_ALL + i;
                a.addEventListener(InteractiveEvent.Up, this.click, this);
                this.TabAry.push(a);
                this._redPointRender.getRedPointUI(this, 131 + i, new Vector2D(a.x + a.width - 5, a.y));
            }
            this.addChild(this._bgRender.getComponent("a_title"));
            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "rightLinebg", this._roleRender);
            this.winmidRender.applyObjData();
            this.addUIList(["e_line"], this._roleRender);
        };
        TreasureUiPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        TreasureUiPanel.prototype.click = function (evt) {
            this.selectedTab(evt.target.data);
            UIManager.popClikNameFun(evt.target.name);
        };
        TreasureUiPanel.prototype.selectedTab = function ($value) {
            for (var i = 0; i < this.TabAry.length; i++) {
                if (this.TabAry[i].data == $value) {
                    this.TabAry[i].selected = true;
                }
                else {
                    this.TabAry[i].selected = false;
                }
            }
            //公共背景显隐逻辑
            this.hideTabPage($value);
            this.showTabPage($value);
        };
        TreasureUiPanel.prototype.showTabPage = function ($value) {
            switch ($value) {
                case SharedDef.MODULE_DIVINE_ALL:
                    if (!this.treasurePage) {
                        this.treasurePage = new treasure.TreasurePage();
                        this.treasurePage.initUiAtlas(this._roleRender.uiAtlas, this.winmidRender);
                        this.treasurePage.parent = this;
                    }
                    this.treasurePage.show();
                    break;
                case SharedDef.MODULE_DIVINE_USE:
                    if (!this.treasureWear) {
                        this.treasureWear = new treasure.TreasureWear();
                        this.treasureWear.parent = this;
                        this.treasureWear.initUiAtlas(this._roleRender.uiAtlas, this.winmidRender);
                    }
                    this.treasureWear.show();
                    break;
                default:
                    break;
            }
        };
        TreasureUiPanel.prototype.hideTabPage = function ($value) {
            if ($value === void 0) { $value = -1; }
            switch ($value) {
                case SharedDef.MODULE_DIVINE_ALL:
                    if (this.treasureWear) {
                        this.treasureWear.hide();
                    }
                    break;
                case SharedDef.MODULE_DIVINE_USE:
                    if (this.treasurePage) {
                        this.treasurePage.hide();
                    }
                    break;
                default:
                    if (this.treasurePage) {
                        this.treasurePage.hide();
                    }
                    if (this.treasureWear) {
                        this.treasureWear.hide();
                    }
                    break;
            }
        };
        TreasureUiPanel.prototype.show = function ($data) {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            this.selectedTab($data);
            this.resize();
        };
        TreasureUiPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            this.hideTabPage();
            ModulePageManager.hideResTittle();
        };
        TreasureUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.w_close:
                    UIManager.popClikNameFun(this.w_close.name);
                    ModuleEventManager.dispatchEvent(new treasure.TreasureUiEvent(treasure.TreasureUiEvent.HIDE_TREASURE_EVENT));
                    break;
                default:
                    break;
            }
        };
        return TreasureUiPanel;
    }(WindowUi));
    treasure.TreasureUiPanel = TreasureUiPanel;
})(treasure || (treasure = {}));
//# sourceMappingURL=TreasureUiPanel.js.map