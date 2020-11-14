var turnonwarehouse;
(function (turnonwarehouse) {
    var TurnonWarehouseList = /** @class */ (function () {
        function TurnonWarehouseList($perent, $uiAtlas) {
            this.perent = $perent;
            this.uiAtlas = $uiAtlas;
            //this._listRender = new UIListRenderComponent;
            this.addList();
        }
        TurnonWarehouseList.prototype.dispose = function () {
            // this._listRender.dispose();
            // this._listRender  = null;
            if (this._bgList) {
                this._bgList.dispose();
                this._bgList = null;
            }
        };
        TurnonWarehouseList.prototype.addList = function () {
            // var $pos: Vector2D = new Vector2D(130, 120);
            // var $pos: Vector2D = new Vector2D(298, 105);
            // this._bgList = this._listRender.createGridList();
            // this._bgList.x = $pos.x;
            // this._bgList.y = $pos.y;
            // this.perent.addChild(this._bgList);
            this._bgList = new SList(); //this._listRender.createGridList();
            this._bgList.baseAtlas = this.uiAtlas;
            this._bgList.setData([], turnonwarehouse.TurnonWarehouseListRender, 350, 350, 70, 70, 5, 512, 1024, 5, 10);
            this._bgList.center = 0;
            this._bgList.middle = 0;
            UIManager.getInstance().addUIContainer(this._bgList);
            // this._bgMask = new UIMask();
            // this._bgMask.x = $pos.x;
            // this._bgMask.y = $pos.y;
            // this._bgMask.width = 75 * 5;
            // this._bgMask.height = 75 * 5;
            // this.perent.addMask(this._bgMask);
            // this._bgMask.level = 3
            // this._listRender.mask = this._bgMask;
        };
        TurnonWarehouseList.prototype.refreshData = function () {
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
        // public itemDataClick($listItemData: ListItemData): void {
        //     var _listItemArr: Array<ListItemData> ;//= this._bgList.data
        //     for (var i: number = 0; _listItemArr && i < _listItemArr.length; i++) {
        //         if (_listItemArr[i] == $listItemData) {
        //             _listItemArr[i].itemRender.selected = true;
        //         } else {
        //             _listItemArr[i].itemRender.selected = false
        //         }
        //     }
        //     if ($listItemData.data) {
        //         // var $evt: exchange.ExchangepEvent = new exchange.ExchangepEvent(exchange.ExchangepEvent.SHOW_EXCHANGE_PANEL)
        //         // $evt.showType=1
        //         // $evt.data = $listItemData.data
        //         // ModuleEventManager.dispatchEvent($evt)
        //         var evt: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
        //         evt.data = $listItemData.data;
        //         evt.buttonType = 5;
        //         ModuleEventManager.dispatchEvent(evt);
        //     }
        // }
        // private selectDic: Object = new Object
        TurnonWarehouseList.prototype.show = function () {
            //this.perent.addRender(this._listRender);
            UIManager.getInstance().addUIContainer(this._bgList);
            this.refreshData();
        };
        TurnonWarehouseList.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this._bgList);
            //this.perent.removeRender(this._listRender);
        };
        return TurnonWarehouseList;
    }());
    turnonwarehouse.TurnonWarehouseList = TurnonWarehouseList;
})(turnonwarehouse || (turnonwarehouse = {}));
//# sourceMappingURL=TurnonWarehouseList.js.map