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
var turnonwarehouse;
(function (turnonwarehouse) {
    var TurnonWarehouseListRender = /** @class */ (function (_super) {
        __extends(TurnonWarehouseListRender, _super);
        function TurnonWarehouseListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TurnonWarehouseListRender.prototype.equClick = function (evt) {
            if (this.itdata && this.itdata.data) {
                if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                    return;
                }
                //选中，事件派发
                this.setSelect();
                var itemevt = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
                itemevt.data = this.itdata.data;
                itemevt.buttonType = 5;
                ModuleEventManager.dispatchEvent(itemevt);
            }
        };
        return TurnonWarehouseListRender;
    }(charbg.BagItemRender));
    turnonwarehouse.TurnonWarehouseListRender = TurnonWarehouseListRender;
    var TurnonWarehousePanel = /** @class */ (function (_super) {
        __extends(TurnonWarehousePanel, _super);
        function TurnonWarehousePanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.setBlackBg();
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._midRender.uiAtlas = new UIAtlas;
            return _this;
        }
        TurnonWarehousePanel.prototype.dispose = function () {
            this._midRender.dispose();
            this._midRender = null;
            if (this._bgList) {
                this._bgList.dispose();
                this._bgList = null;
            }
            _super.prototype.dispose.call(this);
        };
        TurnonWarehousePanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/faction/warehousetreasure/warehousetreasure.xml", "ui/uidata/faction/warehousetreasure/warehousetreasure.png", function () { _this.loadConfigCom(); }, "ui/uidata/faction/warehousetreasure/warehouseuse.png");
        };
        TurnonWarehousePanel.prototype.loadConfigCom = function () {
            this.addChild(this._midRender.getComponent("f_tittle_txt"));
            //this.treasurehouseUpList = new TurnonWarehouseList(this,this._midRender.uiAtlas)
            this.uiAtlasComplet = true;
            this.addList();
            this.applyLoadComplete();
        };
        TurnonWarehousePanel.prototype.addList = function () {
            // var $pos: Vector2D = new Vector2D(130, 120);
            // var $pos: Vector2D = new Vector2D(298, 105);
            // this._bgList = this._listRender.createGridList();
            // this._bgList.x = $pos.x;
            // this._bgList.y = $pos.y;
            // this.perent.addChild(this._bgList);
            this._bgList = new SList(); //this._listRender.createGridList();
            this._bgList.baseAtlas = this._midRender.uiAtlas;
            this._bgList.setData([], TurnonWarehouseListRender, 350, 350, 70, 70, 5, 512, 1024, 5, 10);
            this._bgList.center = 0;
            this._bgList.middle = 0;
            this._bgList.setShowLevel(4);
            this.refreshData();
            //UIManager.getInstance().addUIContainer(this._bgList);
            // this._bgMask = new UIMask();
            // this._bgMask.x = $pos.x;
            // this._bgMask.y = $pos.y;
            // this._bgMask.width = 75 * 5;
            // this._bgMask.height = 75 * 5;
            // this.perent.addMask(this._bgMask);
            // this._bgMask.level = 3
            // this._listRender.mask = this._bgMask;
        };
        TurnonWarehousePanel.prototype.refreshData = function () {
            var $handInQuality = tb.TB_faction_privilege.get_TB_faction_privilege(1).handInQuality;
            var $bgData = GuidData.bag.getEquBgData();
            var ary = new Array;
            for (var i = 0; i < $bgData.length; i++) {
                var $listItemData = new SListItemData();
                if ($bgData[i] && $bgData[i].entryData && $bgData[i].entryData.quality >= $handInQuality) {
                    $listItemData.data = $bgData[i];
                    //$listItemData.clickFun = ($listItemData: ListItemData) => { this.itemDataClick($listItemData) }
                    ary.push($listItemData);
                }
            }
            // while (ary.length < 30) {
            //     var $listItemData: ListItemData = new ListItemData();
            //     $listItemData.data = null
            //     $listItemData.clickFun = ($listItemData: ListItemData) => { this.itemDataClick($listItemData) }
            //     ary.push($listItemData);
            // }
            //this._bgList.contentY = 0;
            // this._bgList.setGridData(ary, TreasurehouseUpListRender, 5, 60, 60, 1024, 1024, 300, 300);
            //this._bgList.setGridData(ary, TurnonWarehouseListRender, 5, 75, 75, 512, 512, 75 * 5, 75 * 5);
            this._bgList.refreshData(ary);
        };
        TurnonWarehousePanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        //private treasurehouseUpList: TurnonWarehouseList;
        TurnonWarehousePanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.c_close:
                    this.hide();
                    break;
            }
        };
        TurnonWarehousePanel.prototype.show = function () {
            if (!this.hasStage) {
                //this.treasurehouseUpList.show()
                UIManager.getInstance().addUIContainer(this);
                UIManager.getInstance().addUIContainer(this._bgList);
                this.refreshData();
            }
        };
        TurnonWarehousePanel.prototype.refresh = function () {
            if (this.hasStage) {
                //this.treasurehouseUpList.show()
                this.refreshData();
            }
        };
        TurnonWarehousePanel.prototype.hide = function () {
            if (this.hasStage) {
                //this.treasurehouseUpList.hide()
                UIManager.getInstance().removeUIContainer(this);
                UIManager.getInstance().removeUIContainer(this._bgList);
            }
        };
        return TurnonWarehousePanel;
    }(WindowCentenMin));
    turnonwarehouse.TurnonWarehousePanel = TurnonWarehousePanel;
})(turnonwarehouse || (turnonwarehouse = {}));
//# sourceMappingURL=TurnonWarehousePanel.js.map