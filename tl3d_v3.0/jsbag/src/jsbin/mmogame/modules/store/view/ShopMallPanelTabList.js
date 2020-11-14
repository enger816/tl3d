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
    var TabVo = /** @class */ (function () {
        function TabVo() {
        }
        return TabVo;
    }());
    store.TabVo = TabVo;
    /**
     * 左侧tablist
     */
    var ShopMallPanelTabList = /** @class */ (function (_super) {
        __extends(ShopMallPanelTabList, _super);
        function ShopMallPanelTabList() {
            var _this = _super.call(this) || this;
            _this.left = 51;
            _this.top = 90;
            return _this;
        }
        ShopMallPanelTabList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        ShopMallPanelTabList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, ShopMallPanelTabRender, 152, 422, 0, 50, 8, 256, 512, 1, 10);
        };
        ShopMallPanelTabList.prototype.refreshDataByNewData = function () {
            var aaa = store.StoreModel.getInstance().getTablist(this._type[0]);
            this._itemDataList = this.getData(aaa);
            this.refreshData(this._itemDataList);
        };
        ShopMallPanelTabList.prototype.getData = function ($aary) {
            var ary = new Array;
            for (var i = 0; i < $aary.length; i++) {
                var bbb = new TabVo();
                bbb.data = tb.TB_shop_base.get_TB_shop_base($aary[i]);
                bbb.id = bbb.data.id;
                var item = new SListItemData;
                item.data = bbb;
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        ShopMallPanelTabList.prototype.show = function ($type) {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this._type = $type;
            this.refreshAndselectIndex();
        };
        ShopMallPanelTabList.prototype.getSelectIdByTid = function ($tid) {
            //console.log("---表id---", $tid);
            for (var i = 0; i < this._itemDataList.length; i++) {
                if (this._itemDataList[i].data.id == $tid) {
                    return this._itemDataList[i].id;
                }
            }
            //console.log("--没有符合的项", $tid);
            return 0;
        };
        ShopMallPanelTabList.prototype.refreshAndselectIndex = function () {
            this.refreshDataByNewData();
            var page = store.StoreModel.getInstance().getPage(this._type[0]);
            if (this._type.length > 1) {
                page = this._type[1];
            }
            // this.setSelectIndexCopy(page);
            var selid = this.getSelectIdByTid(page);
            this.setSelectIndex(selid);
        };
        ShopMallPanelTabList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return ShopMallPanelTabList;
    }(SList));
    store.ShopMallPanelTabList = ShopMallPanelTabList;
    var ShopMallPanelTabRender = /** @class */ (function (_super) {
        __extends(ShopMallPanelTabRender, _super);
        function ShopMallPanelTabRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // private RedPoint: UICompenent;
        ShopMallPanelTabRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.Tabbg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Tabbg", 0, 0, 152, 48);
            $container.addChild(this.Tabbg);
            this.Tabbg.addEventListener(InteractiveEvent.Down, this.equClick, this);
            this.Tabname = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Tabname", 26, 14, 100, 20);
            $container.addChild(this.Tabname);
            // this.RedPoint = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "RedPoint", 136, 0, 17, 16);
            // this.RedPoint.preParent = $container;
            // UiDraw.uiAtlasDrawImg(this.uiAtlas, this.RedPoint.skinName, UIData.publicUi, PuiData.A_RED_POINT);
        };
        Object.defineProperty(ShopMallPanelTabRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                this.applyrender();
                if (val) {
                    var bb = new store.StoreEvent(store.StoreEvent.SELECT_TAB_EVENT);
                    bb.data = this.itdata.data.id;
                    ModuleEventManager.dispatchEvent(bb);
                }
            },
            enumerable: true,
            configurable: true
        });
        ShopMallPanelTabRender.prototype.drawTab = function () {
            var $rec = this._baseRender.uiAtlas.getRec(this.Tabbg.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var vipRect3;
            if (this.selected) {
                vipRect3 = this.parentTarget.baseAtlas.getRec("btn_select");
            }
            else {
                vipRect3 = this.parentTarget.baseAtlas.getRec("btn_noselect");
            }
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, vipRect3.pixelX, vipRect3.pixelY, vipRect3.pixelWitdh, vipRect3.pixelHeight, 0, 0, vipRect3.pixelWitdh, vipRect3.pixelHeight);
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        ShopMallPanelTabRender.prototype.applyrender = function () {
            if (this.itdata && this.itdata.data) {
                var vo = this.itdata.data;
                // if (this.itdata.data) {
                //     this.itdata.data.bindUI(this.RedPoint);
                // }
                this.drawTab();
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Tabname.skinName, vo.data.typename, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }
        };
        ShopMallPanelTabRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data) {
                this.applyrender();
                this.Tabbg.addEventListener(InteractiveEvent.Down, this.equClick, this);
            }
            else {
                this.Tabbg.removeEventListener(InteractiveEvent.Down, this.equClick, this);
                this.setnull();
            }
        };
        ShopMallPanelTabRender.prototype.equClick = function () {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染
            this.setSelect();
        };
        ShopMallPanelTabRender.prototype.setnull = function () {
            UiDraw.clearUI(this.Tabbg);
            UiDraw.clearUI(this.Tabname);
            //    this.RedPoint.preHide();
        };
        return ShopMallPanelTabRender;
    }(SListItem));
    store.ShopMallPanelTabRender = ShopMallPanelTabRender;
})(store || (store = {}));
//# sourceMappingURL=ShopMallPanelTabList.js.map