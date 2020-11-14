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
var fb;
(function (fb) {
    var ExpUiPanel = /** @class */ (function (_super) {
        __extends(ExpUiPanel, _super);
        function ExpUiPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._bgRender.uiAtlas = new UIAtlas;
            return _this;
        }
        ExpUiPanel.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            if (this.teamcopyUiPanel) {
                this.teamcopyUiPanel.dispose();
                this.teamcopyUiPanel = null;
            }
            if (this.exptaskpanel) {
                this.exptaskpanel.dispose();
                this.exptaskpanel = null;
            }
            _super.prototype.dispose.call(this);
        };
        ExpUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;
            this._bgRender.uiAtlas.setInfo("ui/uidata/fuben/exp/exp.xml", "ui/uidata/fuben/exp/exp.png", function () { _this.loadConfigCom(); });
        };
        ExpUiPanel.prototype.loadConfigCom = function () {
            this._baseRender.uiAtlas = this._bgRender.uiAtlas;
            this.initData();
            this.resize();
            this.applyLoadComplete();
        };
        ExpUiPanel.prototype.initData = function () {
            this.TabAry = new Array;
            for (var i = 0; i < 2; i++) {
                var a = this.addChild(this._bgRender.getComponent("tab" + i));
                a.data = SharedDef.MODULE_TEAMINSTANCE_EXP + i;
                a.addEventListener(InteractiveEvent.Up, this.click, this);
                this.TabAry.push(a);
            }
            this.tab1dis = this._baseRender.getComponent("t_tab1_dis");
            this.tab1dis.addEventListener(InteractiveEvent.Up, this.butClik, this);
            // var a = <SelectButton>this.addChild(this._bgRender.getComponent("tab0"));
            // a.data = SharedDef.MODULE_TEAMINSTANCE_EXP;
            // a.addEventListener(InteractiveEvent.Up, this.click, this);
            // this.TabAry.push(a);
            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "rightLinebg", this._bgRender);
            this.winmidRender.applyObjData();
            this.addUIList(["a_title"], this._bgRender);
            this.addUIList(["a_line1"], this._baseRender);
        };
        ExpUiPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        ExpUiPanel.prototype.showTab1 = function () {
            if (this.tab1dis.parent) {
                this.refreshOpenLev(this.TabAry[1]);
            }
        };
        ExpUiPanel.prototype.refreshOpenLev = function ($tab) {
            var $page = $tab.data;
            if ($page == SharedDef.MODULE_TEAMINSTANCE_EXP) {
                this.setUiListVisibleByItem([$tab], true);
                return;
            }
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_TEAMINSTANCE, $page)) {
                this.setUiListVisibleByItem([$tab], true);
                this.setUiListVisibleByItem([this.tab1dis], false);
            }
            else {
                var $tb_system_base = tb.TB_system_base.getTempVo(Number(SharedDef.MODULE_TEAMINSTANCE * 10 + $page));
                this.setUiListVisibleByItem([$tab], false);
                this.setUiListVisibleByItem([this.tab1dis], true);
                this.tab1dis.data = $tb_system_base;
                this.tab1dis.y = $tab.y;
            }
        };
        ExpUiPanel.prototype.getTabidx = function ($aryTab, $curTab) {
            return $aryTab.indexOf($curTab);
        };
        //只能默认选中第一个。如果需要设定选中哪个，则自己调整Tab顺序
        ExpUiPanel.prototype.show = function ($aryTab, $selTab) {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                ModulePageManager.showResTittle([1, 2, 3]);
            }
            for (var i = 0; i < this.TabAry.length; i++) {
                var $idx = this.getTabidx($aryTab, Number(this.TabAry[i].data));
                if ($idx != -1) {
                    this.TabAry[i].y = $idx * 94 + 100;
                    this.refreshOpenLev(this.TabAry[i]);
                }
                else {
                    this.setUiListVisibleByItem([this.TabAry[i], this.tab1dis], false);
                }
            }
            this.selectedTab($selTab);
            this.resize();
        };
        ExpUiPanel.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
            this.hideTabPage();
            ModulePageManager.hideResTittle();
        };
        ExpUiPanel.prototype.selectedTab = function ($value) {
            for (var i = 0; i < this.TabAry.length; i++) {
                if (this.TabAry[i].data == $value) {
                    this.TabAry[i].selected = true;
                }
                else {
                    this.TabAry[i].selected = false;
                }
            }
            this.hideTabPage($value);
            this.showTabPage($value);
        };
        ExpUiPanel.prototype.showTabPage = function ($value) {
            switch ($value) {
                case SharedDef.MODULE_TEAMINSTANCE_EXP:
                    if (!this.exptaskpanel) {
                        this.exptaskpanel = new fb.ExpTaskPanel();
                        this.exptaskpanel.parent = this;
                        this.exptaskpanel.initUiAtlas(this._bgRender.uiAtlas, WindowUi.winUIAtlas);
                    }
                    this.exptaskpanel.show();
                    break;
                case SharedDef.MODULE_TEAMINSTANCE_TEAM:
                    if (!this.teamcopyUiPanel) {
                        this.teamcopyUiPanel = new copytask.TeamcopyUiPanel();
                        this.teamcopyUiPanel.initUiAtlas(this._bgRender.uiAtlas, WindowUi.winUIAtlas, this.winmidRender);
                    }
                    this.teamcopyUiPanel.show();
                    break;
                default:
                    break;
            }
        };
        ExpUiPanel.prototype.hideTabPage = function ($value) {
            if ($value === void 0) { $value = -1; }
            switch ($value) {
                case SharedDef.MODULE_TEAMINSTANCE_EXP:
                    if (this.teamcopyUiPanel) {
                        this.teamcopyUiPanel.hide();
                    }
                    break;
                case SharedDef.MODULE_TEAMINSTANCE_TEAM:
                    if (this.exptaskpanel) {
                        this.exptaskpanel.hide();
                    }
                    break;
                default:
                    if (this.exptaskpanel) {
                        this.exptaskpanel.hide();
                    }
                    if (this.teamcopyUiPanel) {
                        this.teamcopyUiPanel.hide();
                    }
                    break;
            }
        };
        ExpUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new fb.ExpEvent(fb.ExpEvent.HIDE_EXP_PANEL));
                    break;
                case this.tab1dis:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + this.tab1dis.data.level + "级后解锁", 99);
                    break;
                default:
                    break;
            }
        };
        ExpUiPanel.prototype.click = function (evt) {
            this.selectedTab(evt.target.data);
            UIManager.popClikNameFun(evt.target.name);
        };
        return ExpUiPanel;
    }(WindowUi));
    fb.ExpUiPanel = ExpUiPanel;
})(fb || (fb = {}));
//# sourceMappingURL=ExpUiPanel.js.map