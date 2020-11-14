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
    var TurnonWarehouseModule = /** @class */ (function (_super) {
        __extends(TurnonWarehouseModule, _super);
        function TurnonWarehouseModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TurnonWarehouseModule.prototype.getModuleName = function () {
            return "TurnonWarehouseModule";
        };
        TurnonWarehouseModule.prototype.listProcessors = function () {
            return [new TurnonWarehouseProcessor()];
        };
        return TurnonWarehouseModule;
    }(Module));
    turnonwarehouse.TurnonWarehouseModule = TurnonWarehouseModule;
    var TurnonWarehouseEvent = /** @class */ (function (_super) {
        __extends(TurnonWarehouseEvent, _super);
        function TurnonWarehouseEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TurnonWarehouseEvent.SHOW_TURNON_WAREHOUSE_PANEL = "SHOW_TURNON_WAREHOUSE_PANEL";
        TurnonWarehouseEvent.HIDE_TURNON_WAREHOUSE_PANEL = "HIDE_TURNON_WAREHOUSE_PANEL";
        TurnonWarehouseEvent.FERISH_TURNON_WARHOUSE_DATA = "FERISH_TURNON_WARHOUSE_DATA";
        return TurnonWarehouseEvent;
    }(BaseEvent));
    turnonwarehouse.TurnonWarehouseEvent = TurnonWarehouseEvent;
    var TurnonWarehouseProcessor = /** @class */ (function (_super) {
        __extends(TurnonWarehouseProcessor, _super);
        function TurnonWarehouseProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TurnonWarehouseProcessor.prototype.getName = function () {
            return "TurnonWarehouseProcessor";
        };
        TurnonWarehouseProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof TurnonWarehouseEvent) {
                var evt = $event;
                if (evt.type == TurnonWarehouseEvent.SHOW_TURNON_WAREHOUSE_PANEL) {
                    this.showPanel();
                }
                if (this.turnonWarehousePanel) {
                    if (evt.type == TurnonWarehouseEvent.HIDE_TURNON_WAREHOUSE_PANEL) {
                        this.hidePanel();
                    }
                    if (evt.type == TurnonWarehouseEvent.FERISH_TURNON_WARHOUSE_DATA) {
                    }
                }
            }
            if ($event instanceof charbg.CharBgEvent) {
                if ($event.type == charbg.CharBgEvent.BGDATA_CHANGE_EVENT) {
                    if ($event.showType == BagData.TYPE_EQU_BG && this.turnonWarehousePanel) {
                        this.turnonWarehousePanel.refresh();
                    }
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this.turnonWarehousePanel) {
                    this.turnonWarehousePanel.dispose();
                    this.turnonWarehousePanel = null;
                    //console.log("释放面板 turnonWarehousePanel")
                }
            }
        };
        TurnonWarehouseProcessor.prototype.hidePanel = function () {
            this.turnonWarehousePanel.hide();
        };
        TurnonWarehouseProcessor.prototype.showPanel = function () {
            var _this = this;
            if (!this.turnonWarehousePanel) {
                this.turnonWarehousePanel = new turnonwarehouse.TurnonWarehousePanel();
            }
            this.turnonWarehousePanel.load(function () {
                _this.turnonWarehousePanel.show();
            }, false);
        };
        TurnonWarehouseProcessor.prototype.listenModuleEvents = function () {
            return [
                new TurnonWarehouseEvent(TurnonWarehouseEvent.SHOW_TURNON_WAREHOUSE_PANEL),
                new TurnonWarehouseEvent(TurnonWarehouseEvent.HIDE_TURNON_WAREHOUSE_PANEL),
                new TurnonWarehouseEvent(TurnonWarehouseEvent.FERISH_TURNON_WARHOUSE_DATA),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new charbg.CharBgEvent(charbg.CharBgEvent.BGDATA_CHANGE_EVENT)
            ];
        };
        return TurnonWarehouseProcessor;
    }(BaseProcessor));
    turnonwarehouse.TurnonWarehouseProcessor = TurnonWarehouseProcessor;
})(turnonwarehouse || (turnonwarehouse = {}));
//# sourceMappingURL=TurnonWarehouseProcessor.js.map