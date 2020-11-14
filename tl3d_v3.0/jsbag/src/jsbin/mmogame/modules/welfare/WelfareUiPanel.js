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
var welfare;
(function (welfare) {
    var WelfareUiPanel = /** @class */ (function (_super) {
        __extends(WelfareUiPanel, _super);
        function WelfareUiPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._publicbgRender = new UIRenderComponent;
            _this.addRender(_this._publicbgRender);
            _this._baseRender.uiAtlas = new UIAtlas();
            return _this;
        }
        WelfareUiPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            if (this.welfareEveryCheckin) {
                this.welfareEveryCheckin.dispose();
                this.welfareEveryCheckin = null;
            }
            if (this.welfareLevel) {
                this.welfareLevel.dispose();
                this.welfareLevel = null;
            }
            if (this.welfareRecharge) {
                this.welfareRecharge.dispose();
                this.welfareRecharge = null;
            }
            if (this.welfareCost) {
                this.welfareCost.dispose();
                this.welfareCost = null;
            }
            if (this.welfareRefill) {
                this.welfareRefill.dispose();
                this.welfareRefill = null;
            }
            if (this.welfareExchange) {
                this.welfareExchange.dispose();
                this.welfareExchange = null;
            }
            if (this.welfareSevenDay) {
                this.welfareSevenDay.dispose();
                this.welfareSevenDay = null;
            }
            if (this.welfareTabList) {
                this.welfareTabList.dispose();
                this.welfareTabList = null;
            }
            if (this.popVipPanel) {
                this.popVipPanel.dispose();
                this.popVipPanel = null;
            }
            if (this.popBuqianPanel) {
                this.popBuqianPanel.dispose();
                this.popBuqianPanel = null;
            }
            _super.prototype.dispose.call(this);
        };
        WelfareUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseRender.uiAtlas.setInfo("ui/uidata/welfare/newwelfare.xml", "ui/uidata/welfare/newwelfare.png", function () { _this.loadConfigCom(); }, "ui/uidata/welfare/welfarepc.png");
        };
        WelfareUiPanel.prototype.loadConfigCom = function () {
            this._publicbgRender.uiAtlas = WindowUi.winUIAtlas;
            this.winmidRender.uiAtlas = this._baseRender.uiAtlas;
            var renderLevel = this._baseRender;
            this.slistIndex = this.addChild(renderLevel.getComponent("slistIndex"));
            this.addChild(renderLevel.getComponent("t_title"));
            var bg = this.addChild(this._publicbgRender.getComponent("cnew_coffeeBg"));
            this.setSizeForPanelUiCopy(bg, "a_coffeeBg", renderLevel);
            this._publicbgRender.applyObjData();
            this.applyLoadComplete();
        };
        WelfareUiPanel.prototype.selecttype = function ($value) {
            if ($value == SharedDef.MODULE_WELFARE_MONTH) {
                if (!this.welfareEveryCheckin) {
                    this.welfareEveryCheckin = new welfare.WelfareEveryCheckin();
                    this.welfareEveryCheckin.parent = this;
                    this.welfareEveryCheckin.initUiAtlas(this._baseRender.uiAtlas);
                }
                this.welfareEveryCheckin.show();
                if (this.welfareLevel) {
                    this.welfareLevel.hide();
                }
                if (this.welfareRecharge) {
                    this.welfareRecharge.hide();
                }
                if (this.welfareCost) {
                    this.welfareCost.hide();
                }
                if (this.welfareSevenDay) {
                    this.welfareSevenDay.hide();
                }
                if (this.welfareRefill) {
                    this.welfareRefill.hide();
                }
                if (this.welfareExchange) {
                    this.welfareExchange.hide();
                }
            }
            else if ($value == SharedDef.MODULE_WELFARE_LEVEL) {
                if (!this.welfareLevel) {
                    this.welfareLevel = new welfare.WelfareLevel();
                    this.welfareLevel.initUiAtlas(this._baseRender.uiAtlas);
                }
                this.welfareLevel.show();
                if (this.welfareEveryCheckin) {
                    this.welfareEveryCheckin.hide();
                }
                if (this.welfareRecharge) {
                    this.welfareRecharge.hide();
                }
                if (this.welfareCost) {
                    this.welfareCost.hide();
                }
                if (this.welfareSevenDay) {
                    this.welfareSevenDay.hide();
                }
                if (this.welfareRefill) {
                    this.welfareRefill.hide();
                }
                if (this.welfareExchange) {
                    this.welfareExchange.hide();
                }
            }
            else if ($value == SharedDef.MODULE_WELFARE_SEVEN) {
                if (!this.welfareSevenDay) {
                    this.welfareSevenDay = new welfare.WelfareSevenDay();
                    this.welfareSevenDay.initUiAtlas(this._baseRender.uiAtlas);
                }
                this.welfareSevenDay.show();
                if (this.welfareEveryCheckin) {
                    this.welfareEveryCheckin.hide();
                }
                if (this.welfareLevel) {
                    this.welfareLevel.hide();
                }
                if (this.welfareRecharge) {
                    this.welfareRecharge.hide();
                }
                if (this.welfareCost) {
                    this.welfareCost.hide();
                }
                if (this.welfareRefill) {
                    this.welfareRefill.hide();
                }
                if (this.welfareExchange) {
                    this.welfareExchange.hide();
                }
            }
            else if ($value == SharedDef.MODULE_WELFARE_RECHARGE) {
                if (!this.welfareRecharge) {
                    this.welfareRecharge = new welfare.WelfareRecharge();
                    this.welfareRecharge.initUiAtlas(this._baseRender.uiAtlas);
                }
                this.welfareRecharge.show();
                if (this.welfareEveryCheckin) {
                    this.welfareEveryCheckin.hide();
                }
                if (this.welfareLevel) {
                    this.welfareLevel.hide();
                }
                if (this.welfareCost) {
                    this.welfareCost.hide();
                }
                if (this.welfareSevenDay) {
                    this.welfareSevenDay.hide();
                }
                if (this.welfareRefill) {
                    this.welfareRefill.hide();
                }
                if (this.welfareExchange) {
                    this.welfareExchange.hide();
                }
            }
            else if ($value == SharedDef.MODULE_WELFARE_CONSUME) {
                if (!this.welfareCost) {
                    this.welfareCost = new welfare.WelfareCost();
                    this.welfareCost.initUiAtlas(this._baseRender.uiAtlas);
                }
                this.welfareCost.show();
                if (this.welfareRecharge) {
                    this.welfareRecharge.hide();
                }
                if (this.welfareEveryCheckin) {
                    this.welfareEveryCheckin.hide();
                }
                if (this.welfareLevel) {
                    this.welfareLevel.hide();
                }
                if (this.welfareSevenDay) {
                    this.welfareSevenDay.hide();
                }
                if (this.welfareRefill) {
                    this.welfareRefill.hide();
                }
                if (this.welfareExchange) {
                    this.welfareExchange.hide();
                }
            }
            else if ($value == SharedDef.MODULE_WELFARE_EVERYDAY) {
                if (!this.welfareRefill) {
                    this.welfareRefill = new welfare.WelfareRefill();
                    this.welfareRefill.parent = this;
                    this.welfareRefill.initUiAtlas(this._baseRender.uiAtlas);
                }
                this.welfareRefill.show();
                if (this.welfareCost) {
                    this.welfareCost.hide();
                }
                if (this.welfareRecharge) {
                    this.welfareRecharge.hide();
                }
                if (this.welfareEveryCheckin) {
                    this.welfareEveryCheckin.hide();
                }
                if (this.welfareLevel) {
                    this.welfareLevel.hide();
                }
                if (this.welfareSevenDay) {
                    this.welfareSevenDay.hide();
                }
                if (this.welfareExchange) {
                    this.welfareExchange.hide();
                }
            }
            else if ($value == 7) {
                if (!this.welfareExchange) {
                    this.welfareExchange = new welfare.WelfareExchange();
                    this.welfareExchange.parent = this;
                    this.welfareExchange.initUiAtlas(this._baseRender.uiAtlas);
                }
                this.welfareExchange.show();
                if (this.welfareRefill) {
                    this.welfareRefill.hide();
                }
                if (this.welfareCost) {
                    this.welfareCost.hide();
                }
                if (this.welfareRecharge) {
                    this.welfareRecharge.hide();
                }
                if (this.welfareEveryCheckin) {
                    this.welfareEveryCheckin.hide();
                }
                if (this.welfareLevel) {
                    this.welfareLevel.hide();
                }
                if (this.welfareSevenDay) {
                    this.welfareSevenDay.hide();
                }
            }
        };
        WelfareUiPanel.prototype.show = function ($type) {
            if (!$type) {
                $type = 0;
            }
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                ModulePageManager.showResTittle([1, 2, 3]);
            }
            if (!this.welfareTabList) {
                this.welfareTabList = new WelfareTabList();
                this.welfareTabList.init(this._baseRender.uiAtlas);
            }
            this.welfareTabList.show($type);
            this.resize();
        };
        WelfareUiPanel.prototype.showVipPop = function () {
            if (!this.popVipPanel) {
                this.popVipPanel = new welfare.PopVipPanel();
                this.popVipPanel.initUiAtlas(this._baseRender.uiAtlas, this._publicbgRender.uiAtlas);
            }
            this.popVipPanel.show();
            this.resize();
        };
        WelfareUiPanel.prototype.showBuqianPop = function ($data) {
            if (!this.popBuqianPanel) {
                this.popBuqianPanel = new welfare.PopBuqianPanel();
                this.popBuqianPanel.initUiAtlas(this._baseRender.uiAtlas, this._publicbgRender.uiAtlas);
            }
            this.popBuqianPanel.show($data);
            this.resize();
        };
        WelfareUiPanel.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
            if (this.welfareTabList) {
                this.welfareTabList.hide();
            }
            if (this.welfareEveryCheckin) {
                this.welfareEveryCheckin.hide();
            }
            if (this.welfareLevel) {
                this.welfareLevel.hide();
            }
            if (this.welfareRecharge) {
                this.welfareRecharge.hide();
            }
            if (this.welfareSevenDay) {
                this.welfareSevenDay.hide();
            }
            if (this.welfareCost) {
                this.welfareCost.hide();
            }
            if (this.welfareRefill) {
                this.welfareRefill.hide();
            }
            if (this.welfareExchange) {
                this.welfareExchange.hide();
            }
            ModulePageManager.hideResTittle();
        };
        WelfareUiPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.welfareTabList) {
                this.welfareTabList.left = this.slistIndex.parent.x / UIData.Scale + this.slistIndex.x;
                this.welfareTabList.top = this.slistIndex.parent.y / UIData.Scale + this.slistIndex.y;
            }
        };
        WelfareUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new welfare.WelfareEvent(welfare.WelfareEvent.HIDE_Welfare_EVENT));
                    break;
                default:
                    break;
            }
        };
        return WelfareUiPanel;
    }(WindowUi));
    welfare.WelfareUiPanel = WelfareUiPanel;
    /**
     * 左侧tablist
     */
    var WelfareTabList = /** @class */ (function (_super) {
        __extends(WelfareTabList, _super);
        function WelfareTabList() {
            var _this = _super.call(this) || this;
            _this.left = 52;
            _this.top = 88;
            return _this;
        }
        WelfareTabList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        WelfareTabList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, WelfareTabRender, 153, 420, 0, 50, 8, 256, 512, 1, 10);
        };
        /**
         * refreshData
         */
        WelfareTabList.prototype.refreshDataByNewData = function () {
            var $sListItemData = this.getData();
            this.refreshData($sListItemData);
        };
        WelfareTabList.prototype.getData = function () {
            var ary = new Array;
            var nodeList = RedPointManager.getInstance().getNodeByID(113).children;
            for (var i = 0; i < 7; i++) {
                var item = new SListItemData;
                item.data = nodeList[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        WelfareTabList.prototype.show = function ($type) {
            this._type = $type;
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshAndselectIndex();
        };
        WelfareTabList.prototype.refreshAndselectIndex = function () {
            this.refreshDataByNewData();
            this.setSelectIndex(this._type);
        };
        WelfareTabList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return WelfareTabList;
    }(SList));
    welfare.WelfareTabList = WelfareTabList;
    var WelfareTabRender = /** @class */ (function (_super) {
        __extends(WelfareTabRender, _super);
        function WelfareTabRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WelfareTabRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.Tab = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Tab", 0, 0, 153, 50);
            $container.addChild(this.Tab);
            this.RedPoint = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "RedPoint", 136, 0, 17, 16);
            this.RedPoint.preParent = $container;
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this.RedPoint.skinName, UIData.publicUi, PuiData.A_RED_POINT);
        };
        Object.defineProperty(WelfareTabRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                this.applyrender();
                if (val) {
                    var bb = new welfare.WelfareEvent(welfare.WelfareEvent.SELECTTAB_Welfare_EVENT);
                    bb.data = this.itdata.id + 1;
                    ModuleEventManager.dispatchEvent(bb);
                }
            },
            enumerable: true,
            configurable: true
        });
        WelfareTabRender.prototype.drawTab = function () {
            var $rec = this._baseRender.uiAtlas.getRec(this.Tab.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var vipRect3;
            if (this.selected) {
                vipRect3 = this.parentTarget.baseAtlas.getRec("T" + this.itdata.id + "_1");
            }
            else {
                vipRect3 = this.parentTarget.baseAtlas.getRec("T" + this.itdata.id + "_0");
            }
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, vipRect3.pixelX, vipRect3.pixelY, vipRect3.pixelWitdh, vipRect3.pixelHeight, 0, 0, vipRect3.pixelWitdh, vipRect3.pixelHeight);
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        WelfareTabRender.prototype.applyrender = function () {
            if (this.itdata) {
                if (this.itdata.data) {
                    this.itdata.data.bindUI(this.RedPoint);
                }
                this.drawTab();
            }
        };
        WelfareTabRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data) {
                this.applyrender();
                this.Tab.addEventListener(InteractiveEvent.Down, this.equClick, this);
            }
            else {
                this.Tab.removeEventListener(InteractiveEvent.Down, this.equClick, this);
                this.setnull();
            }
        };
        WelfareTabRender.prototype.equClick = function () {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染
            this.setSelect();
        };
        WelfareTabRender.prototype.setnull = function () {
            UiDraw.clearUI(this.Tab);
            this.RedPoint.preHide();
        };
        return WelfareTabRender;
    }(SListItem));
    welfare.WelfareTabRender = WelfareTabRender;
})(welfare || (welfare = {}));
//# sourceMappingURL=WelfareUiPanel.js.map