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
var warehousetreasure;
(function (warehousetreasure) {
    var WarehouseTreasurePanel = /** @class */ (function (_super) {
        __extends(WarehouseTreasurePanel, _super);
        function WarehouseTreasurePanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.showType = 0;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._midRender.uiAtlas = new UIAtlas;
            return _this;
        }
        WarehouseTreasurePanel.prototype.dispose = function () {
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._midRender.dispose();
            this._midRender = null;
            this._topRender.dispose();
            this._topRender = null;
            if (this.warehousePanel) {
                this.warehousePanel.dispose();
                this.warehousePanel = null;
            }
            if (this.treasurePanel) {
                this.treasurePanel.dispose();
                this.treasurePanel = null;
            }
            if (this.warehouseTreasureLogList) {
                this.warehouseTreasureLogList.dispose();
                this.warehouseTreasureLogList = null;
            }
            _super.prototype.dispose.call(this);
        };
        WarehouseTreasurePanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/faction/warehousetreasure/warehousetreasure.xml", "ui/uidata/faction/warehousetreasure/warehousetreasure.png", function () { _this.loadConfigCom(); });
        };
        WarehouseTreasurePanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;
            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "c_tab_bg", this._topRender);
            var cnew_right_bg_top = this.addChild(this.winmidRender.getComponent("cnew_right_bg_top"));
            this.setSizeForPanelUiCopy(cnew_right_bg_top, "b_right_bg_top", this._topRender);
            var cnew_right_bg_bottom = this.addChild(this.winmidRender.getComponent("cnew_right_bg_bottom"));
            this.setSizeForPanelUiCopy(cnew_right_bg_bottom, "b_right_bg_bottom", this._topRender);
            this.winmidRender.applyObjData();
            this.treasurePanel = new warehousetreasure.TreasurePanel();
            this.treasurePanel.initUiAtlas(this._topRender.uiAtlas);
            this.warehousePanel = new warehousetreasure.WarehousePanel();
            this.warehousePanel.initView(this._topRender.uiAtlas);
            this.addChild(this._midRender.getComponent("c_win_tittle"));
            this.c_log_tittle_line = this.addChild(this._midRender.getComponent("c_log_tittle_line"));
            this.addChild(this._bottomRender.getComponent("a_titlebg"));
            this.c_log_tittle_name = this.addChild(this._midRender.getComponent("c_log_tittle_name"));
            this.c_tab_0 = this.addEvntBut("c_tab_0", this._midRender);
            this.c_tab_1 = this.addEvntBut("c_tab_1", this._midRender);
            var a_bjzs_line_1 = this.addChild(this._topRender.getComponent("a_bjzs_line_1"));
            // var a_bjzs_line_2: UICompenent = this.addChild(this._topRender.getComponent("c_bjzs_line_2"));
            // a_bjzs_line_2.isU = true;
            this.warehouseTreasureLogList = new logall.WarehouseTreasureLogList();
            this.warehouseTreasureLogList.init(this._topRender.uiAtlas);
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        };
        WarehouseTreasurePanel.prototype.refreshWareBagList = function () {
            if (this.uiAtlasComplet) {
                this.warehousePanel.refreshWareBagList();
            }
        };
        WarehouseTreasurePanel.prototype.refreshLog = function () {
            if (this.uiAtlasComplet) {
                var $sListItemData;
                if (this.showType == 0) {
                    //宝库
                    $sListItemData = this.treasurePanel.getListItem();
                }
                else {
                    //仓库
                    $sListItemData = this.warehousePanel.getListItem();
                }
                this.warehouseTreasureLogList.refreshData($sListItemData);
                var $tittleName = ColorType.Orange853d07 + (this.showType == 1 ? "仓库记录" : "捐献记录");
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.c_log_tittle_name.skinName, $tittleName, 16, TextAlign.CENTER);
            }
        };
        WarehouseTreasurePanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this.warehouseTreasureLogList.left = this.c_log_tittle_line.parent.x / UIData.Scale + this.c_log_tittle_line.x - 5;
            this.warehouseTreasureLogList.top = this.c_log_tittle_line.parent.y / UIData.Scale + this.c_log_tittle_line.y + 15;
        };
        WarehouseTreasurePanel.prototype.refresh = function () {
            this.warehouseTreasureLogList.show();
            if (this.showType == 0) {
                this.c_tab_0.selected = true;
                this.c_tab_1.selected = false;
                this.treasurePanel.show();
                this.warehousePanel.hide();
            }
            else {
                this.c_tab_0.selected = false;
                this.c_tab_1.selected = true;
                this.treasurePanel.hide();
                this.warehousePanel.show();
            }
            this.refreshLog();
        };
        WarehouseTreasurePanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.c_tab_0:
                    ModuleEventManager.dispatchEvent(new turnonwarehouse.TurnonWarehouseEvent(turnonwarehouse.TurnonWarehouseEvent.HIDE_TURNON_WAREHOUSE_PANEL));
                    this.showType = 0;
                    this.refresh();
                    break;
                case this.c_tab_1:
                    this.showType = 1;
                    this.refresh();
                    break;
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new warehousetreasure.WarehouseEvent(warehousetreasure.WarehouseEvent.HIDE_WAREHOUSE_PANEL));
                    break;
                default:
                    break;
            }
            //  
        };
        WarehouseTreasurePanel.prototype.hide = function () {
            this.treasurePanel.hide();
            this.warehousePanel.hide();
            this.warehouseTreasureLogList.hide();
            UIManager.getInstance().removeUIContainer(this);
            _super.prototype.hide.call(this);
        };
        return WarehouseTreasurePanel;
    }(WindowUi));
    warehousetreasure.WarehouseTreasurePanel = WarehouseTreasurePanel;
})(warehousetreasure || (warehousetreasure = {}));
//# sourceMappingURL=WarehouseTreasurePanel.js.map