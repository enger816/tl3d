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
var wing;
(function (wing) {
    var WingModule = /** @class */ (function (_super) {
        __extends(WingModule, _super);
        function WingModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WingModule.prototype.getModuleName = function () {
            return "WingModule";
        };
        WingModule.prototype.listProcessors = function () {
            return [new WingProcessor()];
        };
        return WingModule;
    }(Module));
    wing.WingModule = WingModule;
    var WingEvent = /** @class */ (function (_super) {
        __extends(WingEvent, _super);
        function WingEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WingEvent.SHOW_WING_PANEL_EVENT = "show_wing_panel_event"; //显示翅膀面板
        WingEvent.WING_ID_CHANG_EVENT = "wing_id_chang_event"; //翅膀ID变化
        WingEvent.WING_EXP_CHANG_EVENT = "wing_exp_chang_event"; //翅膀经验变化
        WingEvent.WING_LEV_CHANG_EVENT = "wing_lev_chang_event"; //翅膀强化等级变化
        WingEvent.EFF_EVENT = "EFF_EVENT"; //飘字
        return WingEvent;
    }(BaseEvent));
    wing.WingEvent = WingEvent;
    var WingProcessor = /** @class */ (function (_super) {
        __extends(WingProcessor, _super);
        function WingProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WingProcessor.prototype.getName = function () {
            return "WingProcessor";
        };
        WingProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof WingEvent) {
                var $wingEvent = $event;
                if ($wingEvent.type == WingEvent.SHOW_WING_PANEL_EVENT) {
                    this.showWingPanel($wingEvent.data);
                }
                else if ($wingEvent.type == WingEvent.WING_ID_CHANG_EVENT) {
                    if (this._wingPanel) {
                        this._wingPanel.wingIdChg();
                    }
                    this.refreshNode();
                }
                else if ($wingEvent.type == WingEvent.WING_EXP_CHANG_EVENT) {
                    if (this._wingPanel) {
                        this._wingPanel.wingExpChg();
                    }
                }
                else if ($wingEvent.type == WingEvent.WING_LEV_CHANG_EVENT) {
                    if (this._wingPanel) {
                        this._wingPanel.wingLevChg();
                    }
                }
                else if ($wingEvent.type == WingEvent.EFF_EVENT) {
                    if (this._wingPanel) {
                        this._wingPanel.showflyword($wingEvent.data);
                    }
                }
            }
            else if ($event.type == charbg.CharBgEvent.BGDATA_CHANGE_EVENT) {
                if (this._wingPanel && this._wingPanel.hasStage) {
                    this._wingPanel.refreshItem();
                }
                this.refreshNode();
            }
            else if ($event.type == EngineEvent.MONEY_CHANGE || $event.type == EngineEvent.CORE_DATA_COMPLETE_EVENT) {
                this.refreshNode();
            }
            else if ($event.type == EngineEvent.PLAYER_FIELD_LEVEL || $event.type == EngineEvent.PLAYER_FIELD_VIP_LEVEL) {
                this.sysOpen();
                if (this._wingPanel && this._wingPanel.jinjiePanel && this._wingPanel.jinjiePanel.hasStage) {
                    this._wingPanel.jinjiePanel.drawBtn();
                }
            }
            else if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._wingPanel) {
                    this._wingPanel.dispose();
                    this._wingPanel = null;
                    //console.log("释放面板 _wingPanel")
                }
            }
        };
        WingProcessor.prototype.sysOpen = function () {
            this.refreshNode();
            if (this._wingPanel) {
                this._wingPanel.showTab1();
            }
        };
        WingProcessor.prototype.showWingPanel = function (idx) {
            var _this = this;
            if (!this._wingPanel) {
                this._wingPanel = new wing.WingPanel;
            }
            this._wingPanel.load(function () {
                var tabIdx = 0;
                if (idx > 0) {
                    tabIdx = idx - 1;
                }
                _this._wingPanel.show(tabIdx);
            }, true);
        };
        WingProcessor.prototype.refreshNode = function () {
            if (!GuidData.grow) {
                return;
            }
            if (!GuidData.grow.getWingIsActive()) {
                return;
            }
            var targetData = TableData.getInstance().getData(TableData.tb_wings_bless, GuidData.grow.getWingID());
            if (!targetData) {
                return;
            }
            var node = RedPointManager.getInstance().getNodeByID(52);
            if (targetData.operate_type == 1) {
                if (GuidData.bag.getItemCount(targetData.item_cost[0][0]) >= targetData.item_cost[0][1] && hasEnoughRes(targetData.money_cost[0])) {
                    node.show = true;
                }
                else {
                    node.show = false;
                }
            }
            else if (targetData.operate_type == 0) {
                node.show = false;
            }
            else {
                node.show = hasEnoughRes(targetData.money_cost[0]);
            }
            //一键升级是否满足条件
            var $smeltobj = TableData.getInstance().getData(TableData.tb_vip_uplev, 1);
            var viplev = $smeltobj["viplev"];
            var rolelev = $smeltobj["rolelev"];
            var canred = false;
            if (viplev > 0) {
                canred = GuidData.player.getVipLevel() >= viplev;
            }
            if (!canred && rolelev > 0) {
                canred = GuidData.player.getLevel() >= rolelev;
            }
            if (targetData.operate_type == 2) {
                canred = false;
            }
            RedPointManager.getInstance().getNodeByID(135).show = node.show && canred;
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_WING, SharedDef.MODULE_WING_STRENGTH)) {
                node = RedPointManager.getInstance().getNodeByID(54);
                var nextQhData = TableData.getInstance().getData(TableData.tb_wings_strength, GuidData.grow.getWingQh() + 1);
                if (!nextQhData) {
                    node.show = false;
                    return;
                }
                if (GuidData.bag.getItemCount(nextQhData.item_cost[0][0]) >= nextQhData.item_cost[0][1] && hasEnoughRes(nextQhData.money_cost[0])) {
                    node.show = true;
                }
                else {
                    node.show = false;
                }
            }
        };
        WingProcessor.prototype.listenModuleEvents = function () {
            return [
                new WingEvent(WingEvent.SHOW_WING_PANEL_EVENT),
                new WingEvent(WingEvent.WING_ID_CHANG_EVENT),
                new WingEvent(WingEvent.WING_EXP_CHANG_EVENT),
                new WingEvent(WingEvent.WING_LEV_CHANG_EVENT),
                new WingEvent(WingEvent.EFF_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new charbg.CharBgEvent(charbg.CharBgEvent.BGDATA_CHANGE_EVENT),
                new EngineEvent(EngineEvent.MONEY_CHANGE),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                new EngineEvent(EngineEvent.PLAYER_FIELD_VIP_LEVEL),
            ];
        };
        return WingProcessor;
    }(BaseProcessor));
    wing.WingProcessor = WingProcessor;
})(wing || (wing = {}));
//# sourceMappingURL=WingProcessor.js.map