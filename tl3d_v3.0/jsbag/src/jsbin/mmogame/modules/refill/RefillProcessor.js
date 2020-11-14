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
var refill;
(function (refill) {
    var RefillModule = /** @class */ (function (_super) {
        __extends(RefillModule, _super);
        function RefillModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RefillModule.prototype.getModuleName = function () {
            return "RefillModule";
        };
        RefillModule.prototype.listProcessors = function () {
            return [new RefillProcessor()];
        };
        return RefillModule;
    }(Module));
    refill.RefillModule = RefillModule;
    var RefillEvent = /** @class */ (function (_super) {
        __extends(RefillEvent, _super);
        function RefillEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //展示面板
        RefillEvent.SHOW_Refill_EVENT = "SHOW_Refill_EVENT";
        //隐藏面板
        RefillEvent.HIDE_Refill_EVENT = "HIDE_Refill_EVENT";
        //主面板弹窗提示
        RefillEvent.POP_Refill_EVENT = "POP_Refill_EVENT";
        return RefillEvent;
    }(BaseEvent));
    refill.RefillEvent = RefillEvent;
    var RefillProcessor = /** @class */ (function (_super) {
        __extends(RefillProcessor, _super);
        function RefillProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RefillProcessor.prototype.getName = function () {
            return "RefillProcessor";
        };
        RefillProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof RefillEvent) {
                var $givingUiEvent = $event;
                if ($givingUiEvent.type == RefillEvent.SHOW_Refill_EVENT) {
                    this.showUi();
                }
                else if ($givingUiEvent.type == RefillEvent.POP_Refill_EVENT) {
                    this.poppanel($event.data);
                }
                else if ($givingUiEvent.type == RefillEvent.HIDE_Refill_EVENT) {
                    this.hideUi();
                }
            }
            if ($event instanceof EngineEvent) {
                var $engineEvent = $event;
                if ($engineEvent.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                    if (!GuidData.quest.IsReceiveShouChongReward()) {
                        var $obj = TableData.getInstance().getTableByName(TableData.tb_refill_main_poppanel_level);
                        for (var $key in $obj.data) {
                            if ($obj.data[$key]["lev"] == GuidData.player.getLevel()) {
                                ModuleEventManager.dispatchEvent(new topui.TopUiEvent(topui.TopUiEvent.SHOW_REFILL_POP_PANDA));
                            }
                        }
                    }
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._refillUiPanel) {
                    this._refillUiPanel.dispose();
                    this._refillUiPanel = null;
                    //console.log("释放面板 _RefillUiPanel")
                }
                if (panelEvent.panel == this.popTipspanel) {
                    this.popTipspanel.dispose();
                    this.popTipspanel = null;
                    //console.log("释放面板 popTipspanel")
                }
            }
        };
        RefillProcessor.prototype.poppanel = function ($data) {
            var _this = this;
            if (!this.popTipspanel) {
                this.popTipspanel = new refill.PopPanel();
            }
            this.popTipspanel.load(function () {
                _this.popTipspanel.show($data);
            }, false);
        };
        RefillProcessor.prototype.hideUi = function () {
            if (this._refillUiPanel && this._refillUiPanel.hasStage) {
                this._refillUiPanel.hide();
                SceneManager.getInstance().render = true;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            }
        };
        RefillProcessor.prototype.showUi = function () {
            var _this = this;
            if (!this._refillUiPanel) {
                this._refillUiPanel = new refill.RefillUiPanel();
            }
            this._refillUiPanel.load(function () {
                //停止绘制前面的ui
                SceneManager.getInstance().render = false;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
                _this._refillUiPanel.show();
            });
        };
        RefillProcessor.prototype.listenModuleEvents = function () {
            return [
                new RefillEvent(RefillEvent.SHOW_Refill_EVENT),
                new RefillEvent(RefillEvent.HIDE_Refill_EVENT),
                new RefillEvent(RefillEvent.POP_Refill_EVENT),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        return RefillProcessor;
    }(BaseProcessor));
    refill.RefillProcessor = RefillProcessor;
})(refill || (refill = {}));
//# sourceMappingURL=RefillProcessor.js.map