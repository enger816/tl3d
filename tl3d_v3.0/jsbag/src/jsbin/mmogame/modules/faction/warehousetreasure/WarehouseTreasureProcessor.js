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
    var WarehouseTreasureModule = /** @class */ (function (_super) {
        __extends(WarehouseTreasureModule, _super);
        function WarehouseTreasureModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WarehouseTreasureModule.prototype.getModuleName = function () {
            return "WarehouseTreasureModule";
        };
        WarehouseTreasureModule.prototype.listProcessors = function () {
            return [new WarehouseTreasureProcessor()];
        };
        return WarehouseTreasureModule;
    }(Module));
    warehousetreasure.WarehouseTreasureModule = WarehouseTreasureModule;
    var WarehouseEvent = /** @class */ (function (_super) {
        __extends(WarehouseEvent, _super);
        function WarehouseEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WarehouseEvent.SHOW_WAREHOUSE_PANEL = "SHOW_WAREHOUSE_PANEL";
        WarehouseEvent.HIDE_WAREHOUSE_PANEL = "HIDE_WAREHOUSE_PANEL";
        WarehouseEvent.WAREHOUSE_LOG_REFRESH = "WAREHOUSE_LOG_REFRESH";
        WarehouseEvent.WAREHOUSE_BAG_REFRESH = "WAREHOUSE_BAG_REFRESH";
        WarehouseEvent.TREASURE_LOG_REFRESH = "TREASURE_LOG_REFRESH";
        WarehouseEvent.TREASURE_NUM_REFRESH = "TREASURE_NUM_REFRESH";
        return WarehouseEvent;
    }(BaseEvent));
    warehousetreasure.WarehouseEvent = WarehouseEvent;
    var WarehouseTreasureProcessor = /** @class */ (function (_super) {
        __extends(WarehouseTreasureProcessor, _super);
        function WarehouseTreasureProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WarehouseTreasureProcessor.prototype.getName = function () {
            return "WarehouseTreasureProcessor";
        };
        WarehouseTreasureProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof WarehouseEvent) {
                var evt = $event;
                if (evt.type == WarehouseEvent.SHOW_WAREHOUSE_PANEL) {
                    this.showPanel();
                }
                if (this.warehousePanel) {
                    if (evt.type == WarehouseEvent.HIDE_WAREHOUSE_PANEL) {
                        this.hidePanel();
                    }
                    if (evt.type == WarehouseEvent.WAREHOUSE_BAG_REFRESH) {
                        this.warehousePanel.refreshWareBagList();
                    }
                    if (evt.type == WarehouseEvent.WAREHOUSE_LOG_REFRESH) {
                        this.warehousePanel.refreshLog();
                    }
                    if (evt.type == WarehouseEvent.TREASURE_LOG_REFRESH) {
                        this.warehousePanel.refreshLog();
                    }
                    if (evt.type == WarehouseEvent.TREASURE_NUM_REFRESH) {
                        this.warehousePanel.treasurePanel.refrishDuiHuanTxt();
                        this.warehousePanel.treasurePanel.setdonationByYuanBaoTimes();
                        this.warehousePanel.treasurePanel.setdonationByYinBiTimes();
                    }
                }
            }
            if ($event instanceof EngineEvent) {
                if ($event.type == EngineEvent.MONEY_CHANGE) {
                    if (this.warehousePanel && this.warehousePanel.treasurePanel && this.warehousePanel.treasurePanel.hasStage) {
                        this.warehousePanel.treasurePanel.refrishDuiHuanTxt();
                    }
                    if (this.warehousePanel && this.warehousePanel && this.warehousePanel.hasStage) {
                        this.warehousePanel.refreshWareBagList();
                    }
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this.warehousePanel) {
                    this.warehousePanel.dispose();
                    this.warehousePanel = null;
                    //console.log("释放面板 warehousePanel")
                }
            }
        };
        WarehouseTreasureProcessor.prototype.hidePanel = function () {
            this.warehousePanel.hide();
        };
        WarehouseTreasureProcessor.prototype.showPanel = function () {
            // if (!GuidData.faction) {
            //     msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "你还没有加入家族", 99);
            //     return;
            // }
            var _this = this;
            // var vo: tb.TB_faction_building = faction.FactionBuildModel.getInstance().getTabvo(SharedDef.FACTION_BUILDING_TYPE_STOREHOUSE);
            // if(!vo){
            //     msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "模块未开启", 99);
            //     return;
            // }
            if (GuidData.faction) {
                if (!this.warehousePanel) {
                    this.warehousePanel = new warehousetreasure.WarehouseTreasurePanel();
                }
                this.warehousePanel.load(function () {
                    UIManager.getInstance().addUIContainer(_this.warehousePanel);
                    ModulePageManager.showResTittle([1, 2, 3]);
                    _this.warehousePanel.refresh();
                }, false);
            }
            else {
                ModulePageManager.openPanel(SharedDef.MODULE_FACTION);
            }
        };
        WarehouseTreasureProcessor.prototype.listenModuleEvents = function () {
            return [
                new WarehouseEvent(WarehouseEvent.SHOW_WAREHOUSE_PANEL),
                new WarehouseEvent(WarehouseEvent.HIDE_WAREHOUSE_PANEL),
                new WarehouseEvent(WarehouseEvent.WAREHOUSE_BAG_REFRESH),
                new WarehouseEvent(WarehouseEvent.WAREHOUSE_LOG_REFRESH),
                new WarehouseEvent(WarehouseEvent.TREASURE_LOG_REFRESH),
                new WarehouseEvent(WarehouseEvent.TREASURE_NUM_REFRESH),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new EngineEvent(EngineEvent.MONEY_CHANGE),
            ];
        };
        return WarehouseTreasureProcessor;
    }(BaseProcessor));
    warehousetreasure.WarehouseTreasureProcessor = WarehouseTreasureProcessor;
})(warehousetreasure || (warehousetreasure = {}));
//# sourceMappingURL=WarehouseTreasureProcessor.js.map