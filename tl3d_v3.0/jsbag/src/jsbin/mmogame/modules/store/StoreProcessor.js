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
    var StoreModule = /** @class */ (function (_super) {
        __extends(StoreModule, _super);
        function StoreModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StoreModule.prototype.getModuleName = function () {
            return "StoreModule";
        };
        StoreModule.prototype.listProcessors = function () {
            return [new StoreProcessor()];
        };
        return StoreModule;
    }(Module));
    store.StoreModule = StoreModule;
    var StoreEvent = /** @class */ (function (_super) {
        __extends(StoreEvent, _super);
        function StoreEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //展示面板
        StoreEvent.SHOW_Store_EVENT = "SHOW_Store_EVENT";
        //隐藏面板
        StoreEvent.HIDE_Store_EVENT = "HIDE_Store_EVENT";
        //购买数目发生变化事件
        StoreEvent.STORE_NUM_EVENT = "STORE_NUM_EVENT";
        //选中物品事件
        StoreEvent.SELECT_PROP_EVENT = "SELECT_PROP_EVENT";
        //选中页签事件
        StoreEvent.SELECT_TAB_EVENT = "SELECT_TAB_EVENT";
        //充值界面刷新
        StoreEvent.RECHARGE_CHG_EVENT = "RECHARGE_CHG_EVENT";
        return StoreEvent;
    }(BaseEvent));
    store.StoreEvent = StoreEvent;
    var StoreProcessor = /** @class */ (function (_super) {
        __extends(StoreProcessor, _super);
        function StoreProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StoreProcessor.prototype.getName = function () {
            return "StoreProcessor";
        };
        StoreProcessor.prototype.receivedModuleEvent = function ($event) {
            var _this = this;
            if ($event instanceof StoreEvent) {
                var $givingUiEvent = $event;
                if ($givingUiEvent.type == StoreEvent.SHOW_Store_EVENT) {
                    this.showUi($givingUiEvent.data);
                }
                else if ($givingUiEvent.type == StoreEvent.HIDE_Store_EVENT) {
                    this.hideUi();
                }
                else if ($givingUiEvent.type == StoreEvent.STORE_NUM_EVENT) {
                    this.refreshData();
                }
                else if ($givingUiEvent.type == StoreEvent.SELECT_PROP_EVENT) {
                    this.selectedProp($givingUiEvent.data);
                }
                else if ($givingUiEvent.type == StoreEvent.RECHARGE_CHG_EVENT) {
                    this.setrecharge();
                }
                else if ($givingUiEvent.type == StoreEvent.SELECT_TAB_EVENT) {
                    this.selectTab($givingUiEvent.data);
                }
            }
            if ($event instanceof EngineEvent) {
                var $engineEvent = $event;
                if ($engineEvent.type == EngineEvent.PLAYER_FIELD_VIP_LEVEL) {
                    this.setrecharge();
                }
                if ($engineEvent.type == EngineEvent.MONEY_CHANGE) {
                    if (this._storeUiPanel && this._storeUiPanel.shopMallPanel && this._storeUiPanel.shop && this._storeUiPanel.shop.hasStage) {
                        this._storeUiPanel.shop.setOwnMoney();
                        TimeUtil.addTimeOut(10, function () {
                            _this._storeUiPanel.shop.resetlimNum();
                        });
                    }
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._storeUiPanel) {
                    this._storeUiPanel.dispose();
                    this._storeUiPanel = null;
                    //console.log("释放面板 _storeUiPanel")
                }
            }
        };
        StoreProcessor.prototype.setrecharge = function () {
            if (this._storeUiPanel && this._storeUiPanel.rechargePanel && this._storeUiPanel.rechargePanel.hasStage) {
                this._storeUiPanel.rechargePanel.resetData();
            }
        };
        StoreProcessor.prototype.selectTab = function ($typeid) {
            if (this._storeUiPanel && this._storeUiPanel.shop) {
                this._storeUiPanel.shop.show($typeid);
            }
        };
        StoreProcessor.prototype.selectedProp = function ($data) {
            if (this._storeUiPanel && this._storeUiPanel.shop && this._storeUiPanel.shop.hasStage) {
                this._storeUiPanel.shop.resetData($data);
            }
        };
        StoreProcessor.prototype.refreshData = function () {
            //数目变化时，刷新数据
            if (this._storeUiPanel && this._storeUiPanel.shop && this._storeUiPanel.shop.shoplist && this._storeUiPanel.shop.shoplist.hasStage) {
                this._storeUiPanel.shop.shoplist.refreshDataByNewData();
            }
            // if (this._storeUiPanel && this._storeUiPanel.shopMallPanel && this._storeUiPanel.shop && this._storeUiPanel.shop.hasStage) {
            //     this._storeUiPanel.shop.resetlimNum();
            // }
        };
        StoreProcessor.prototype.hideUi = function () {
            this._storeUiPanel.hide();
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
        };
        StoreProcessor.prototype.showUi = function ($type) {
            var _this = this;
            if ($type === void 0) { $type = null; }
            //console.log("--打开商城--参数", $type);
            if (!this._storeUiPanel) {
                this._storeUiPanel = new store.StoreUiPanel();
            }
            this._storeUiPanel.load(function () {
                //停止绘制前面的ui
                SceneManager.getInstance().render = false;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
                _this._storeUiPanel.show($type);
            });
        };
        StoreProcessor.prototype.listenModuleEvents = function () {
            return [
                new StoreEvent(StoreEvent.SHOW_Store_EVENT),
                new StoreEvent(StoreEvent.HIDE_Store_EVENT),
                new StoreEvent(StoreEvent.STORE_NUM_EVENT),
                new StoreEvent(StoreEvent.SELECT_PROP_EVENT),
                new StoreEvent(StoreEvent.SELECT_TAB_EVENT),
                new StoreEvent(StoreEvent.RECHARGE_CHG_EVENT),
                new EngineEvent(EngineEvent.MONEY_CHANGE),
                new EngineEvent(EngineEvent.PLAYER_FIELD_VIP_LEVEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        return StoreProcessor;
    }(BaseProcessor));
    store.StoreProcessor = StoreProcessor;
})(store || (store = {}));
//# sourceMappingURL=StoreProcessor.js.map