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
var duihuan;
(function (duihuan) {
    var DuiHuanModule = /** @class */ (function (_super) {
        __extends(DuiHuanModule, _super);
        function DuiHuanModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DuiHuanModule.prototype.getModuleName = function () {
            return "DuiHuanModule";
        };
        DuiHuanModule.prototype.listProcessors = function () {
            return [new DuiHuanProcessor()];
        };
        return DuiHuanModule;
    }(Module));
    duihuan.DuiHuanModule = DuiHuanModule;
    var DuiHuanEvent = /** @class */ (function (_super) {
        __extends(DuiHuanEvent, _super);
        function DuiHuanEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DuiHuanEvent.SHOW_DUIHUAN_PANEL = "SHOW_DUIHUAN_PANEL";
        DuiHuanEvent.HIDE_DUIHUAN_PANEL = "HIDE_DUIHUAN_PANEL";
        return DuiHuanEvent;
    }(BaseEvent));
    duihuan.DuiHuanEvent = DuiHuanEvent;
    var DuiHuanProcessor = /** @class */ (function (_super) {
        __extends(DuiHuanProcessor, _super);
        function DuiHuanProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DuiHuanProcessor.prototype.getName = function () {
            return "DuiHuanProcessor";
        };
        DuiHuanProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof DuiHuanEvent) {
                var evt = $event;
                if (evt.type == DuiHuanEvent.SHOW_DUIHUAN_PANEL) {
                    if ($event.MaxSelectNum > 0) {
                        this.showPanel($event);
                    }
                    else {
                        msgtip.MsgTipManager.outStr("[ff0000]今日次数已用完", 99);
                    }
                }
                if (this.exchangepPanel) {
                    if (evt.type == DuiHuanEvent.HIDE_DUIHUAN_PANEL) {
                        this.hidePanel();
                    }
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this.exchangepPanel) {
                    this.exchangepPanel.dispose();
                    this.exchangepPanel = null;
                    //console.log("释放面板 exchangepPanel")
                }
            }
        };
        DuiHuanProcessor.prototype.hidePanel = function () {
            this.exchangepPanel.hide();
        };
        DuiHuanProcessor.prototype.showPanel = function ($event) {
            var _this = this;
            if (!this.exchangepPanel) {
                this.exchangepPanel = new duihuan.DuiHuanPanel();
            }
            this.exchangepPanel.load(function () {
                UIManager.getInstance().addUIContainer(_this.exchangepPanel);
                _this.exchangepPanel.refresh($event);
            }, false);
        };
        DuiHuanProcessor.prototype.listenModuleEvents = function () {
            return [
                new DuiHuanEvent(DuiHuanEvent.SHOW_DUIHUAN_PANEL),
                new DuiHuanEvent(DuiHuanEvent.HIDE_DUIHUAN_PANEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        return DuiHuanProcessor;
    }(BaseProcessor));
    duihuan.DuiHuanProcessor = DuiHuanProcessor;
})(duihuan || (duihuan = {}));
//# sourceMappingURL=DuiHuanprocessor.js.map