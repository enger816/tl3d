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
var divinesword;
(function (divinesword) {
    var DivineswordUiPanel = /** @class */ (function (_super) {
        __extends(DivineswordUiPanel, _super);
        function DivineswordUiPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._redPointRender = new RedPointRender;
            _this.addRender(_this._redPointRender);
            _this._bgRender.uiAtlas = new UIAtlas;
            return _this;
        }
        DivineswordUiPanel.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._redPointRender.dispose();
            this._redPointRender = null;
            // if (this.divineswordTask) {
            //     this.divineswordTask.dispose();
            //     this.divineswordTask = null;
            // }
            if (this.divineswordSkill) {
                this.divineswordSkill.dispose();
                this.divineswordSkill = null;
            }
            _super.prototype.dispose.call(this);
        };
        DivineswordUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;
            this._bgRender.uiAtlas.setInfo("ui/uidata/training/training.xml", "ui/uidata/training/training.png", function () { _this.loadConfigCom(); }, "ui/uidata/training/trainingps.png");
        };
        DivineswordUiPanel.prototype.loadConfigCom = function () {
            this._baseRender.uiAtlas = this._bgRender.uiAtlas;
            this.initData();
            this.resize();
            this.applyLoadComplete();
        };
        DivineswordUiPanel.prototype.initData = function () {
            this.TabAry = new Array;
            // for (var i = 0; i < 2; i++) {
            //     var a = <SelectButton>this.addChild(this._bgRender.getComponent("tab" + i));
            //     a.data = i + 1;
            //     a.addEventListener(InteractiveEvent.Up, this.click, this);
            //     this.TabAry.push(a);
            // }
            var a = this.addChild(this._bgRender.getComponent("tab2"));
            a.data = SharedDef.MODULE_GW_ALL;
            a.addEventListener(InteractiveEvent.Up, this.click, this);
            this.TabAry.push(a);
            this._redPointRender.getRedPointUI(this, 127, new Vector2D(this.TabAry[0].x + this.TabAry[0].width - 5, this.TabAry[0].y));
            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "rightLinebg", this._bgRender);
            this.UnlockUIAry = new Array;
            // this.t_unlock0 = this.addEvntBut("t_unlock0", this._bgRender);
            // this.UnlockUIAry.push(this.t_unlock0);
            this.t_unlock2 = this.addEvntBut("t_unlock2", this._bgRender);
            this.UnlockUIAry.push(this.t_unlock2);
            this.winmidRender.applyObjData();
            this.addUIList(["a_tittle_name"], this._bgRender);
            this.addUIList(["t_bgline"], this._baseRender);
        };
        DivineswordUiPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        DivineswordUiPanel.prototype.refreshOpenLev = function () {
            //判断解锁情况
            // for (var i = 0; i < 2; i++) {
            //     if (GuidData.player.getsyspageopen(SharedDef.MODULE_EXP, SharedDef.MODULE_EXP_QUEST + i)) {
            //         this.setUiListVisibleByItem([this.TabAry[i]], true);
            //         this.setUiListVisibleByItem([this.UnlockUIAry[i]], false);
            //     } else {
            //         this.setUiListVisibleByItem([this.TabAry[i]], false);
            //         this.setUiListVisibleByItem([this.UnlockUIAry[i]], true);
            //         this.UnlockUIAry[i].data = tb.TB_system_base.getTempVo(SharedDef.MODULE_EXP * 10 + SharedDef.MODULE_EXP_QUEST + i);
            //     }
            // }
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_GW, SharedDef.MODULE_GW_ALL)) {
                this.setUiListVisibleByItem([this.TabAry[0]], true);
                this.setUiListVisibleByItem([this.UnlockUIAry[0]], false);
            }
            else {
                this.setUiListVisibleByItem([this.TabAry[0]], false);
                this.setUiListVisibleByItem([this.UnlockUIAry[0]], true);
                this.UnlockUIAry[0].data = tb.TB_system_base.getTempVo(SharedDef.MODULE_GW * 10 + SharedDef.MODULE_GW_ALL);
            }
        };
        DivineswordUiPanel.prototype.show = function ($data) {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                ModulePageManager.showResTittle([1, 2, 3]);
            }
            this.refreshOpenLev();
            this.selectedTab(SharedDef.MODULE_GW_ALL);
        };
        DivineswordUiPanel.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
            this.hideTabPage();
            ModulePageManager.hideResTittle();
        };
        DivineswordUiPanel.prototype.selectedTab = function ($value) {
            this._lastvalue = $value;
            // for (var i = 0; i < this.TabAry.length; i++) {
            //     if (this.TabAry[i].data == $value) {
            //         this.TabAry[i].selected = true;
            //     } else {
            //         this.TabAry[i].selected = false;
            //     }
            // }
            this.TabAry[0].selected = true;
            this.hideTabPage($value);
            this.showTabPage($value);
        };
        DivineswordUiPanel.prototype.showTabPage = function ($value) {
            switch ($value) {
                // case SharedDef.MODULE_EXP_QUEST:
                // if (!this.divineswordTask) {
                //     this.divineswordTask = new DivineswordTask();
                //     this.divineswordTask.initUiAtlas(this._bgRender.uiAtlas);
                // }
                // this.divineswordTask.show();
                // break;
                case SharedDef.MODULE_GW_ALL:
                    if (!this.divineswordSkill) {
                        this.divineswordSkill = new divinesword.DivineswordSkill();
                        this.divineswordSkill.parent = this;
                        this.divineswordSkill.initUiAtlas(this._bgRender.uiAtlas, this.winmidRender);
                    }
                    this.divineswordSkill.show();
                    break;
                default:
                    break;
            }
        };
        DivineswordUiPanel.prototype.hideTabPage = function ($value) {
            if ($value === void 0) { $value = -1; }
            switch ($value) {
                case SharedDef.MODULE_GW_ALL:
                    if (this.divineswordSkill) {
                        this.divineswordSkill.hide();
                    }
                    break;
                // case SharedDef.MODULE_EXP_ARTIFACT:
                //     if (this.divineswordTask) {
                //         this.divineswordTask.hide();
                //     }
                //     break;
                default:
                    // if (this.divineswordTask) {
                    //     this.divineswordTask.hide();
                    // }
                    if (this.divineswordSkill) {
                        this.divineswordSkill.hide();
                    }
                    break;
            }
        };
        DivineswordUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.w_close:
                    UIManager.popClikNameFun(this.w_close.name);
                    ModuleEventManager.dispatchEvent(new divinesword.DivineswordEvent(divinesword.DivineswordEvent.HIDE_TRAINING_PANEL));
                    break;
                // case this.t_unlock0:
                //     msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + this.t_unlock0.data.level + "级后解锁", 99);
                //     break;
                case this.t_unlock2:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + this.t_unlock2.data.level + "级后解锁", 99);
                    break;
                default:
                    break;
            }
        };
        DivineswordUiPanel.prototype.click = function (evt) {
            this.selectedTab(evt.target.data);
            UIManager.popClikNameFun(evt.target.name);
        };
        return DivineswordUiPanel;
    }(WindowUi));
    divinesword.DivineswordUiPanel = DivineswordUiPanel;
})(divinesword || (divinesword = {}));
//# sourceMappingURL=DivineswordUiPanel.js.map