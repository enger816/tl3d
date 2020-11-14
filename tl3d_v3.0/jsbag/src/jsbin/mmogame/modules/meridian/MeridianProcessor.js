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
var meridian;
(function (meridian) {
    var MeridianEvent = /** @class */ (function (_super) {
        __extends(MeridianEvent, _super);
        function MeridianEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MeridianEvent.SHOW_MERIDIAN_EVENT = "SHOW_MERIDIAN_EVENT"; //显示面板
        MeridianEvent.SHOW_MERIDIAN_BUY_EVENT = "SHOW_MERIDIAN_BUY_EVENT"; //显示面板
        MeridianEvent.REFRISH_MERIDIAL_PANEL = "REFRISH_MERIDIAL_PANEL"; //显示面板
        MeridianEvent.CHG_MERIDIAL_FORCE = "CHG_MERIDIAL_FORCE"; //战力变化
        MeridianEvent.REFRISH_MERIDIAL_LIST = "REFRISH_MERIDIAL_LIST"; //刷新list
        return MeridianEvent;
    }(BaseEvent));
    meridian.MeridianEvent = MeridianEvent;
    var MeridianModule = /** @class */ (function (_super) {
        __extends(MeridianModule, _super);
        function MeridianModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MeridianModule.prototype.getModuleName = function () {
            return "MeridianModule";
        };
        MeridianModule.prototype.listProcessors = function () {
            return [new MeridianProcessor()];
        };
        return MeridianModule;
    }(Module));
    meridian.MeridianModule = MeridianModule;
    var MeridianProcessor = /** @class */ (function (_super) {
        __extends(MeridianProcessor, _super);
        function MeridianProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MeridianProcessor.prototype.getName = function () {
            return "MeridianProcessor";
        };
        MeridianProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof MeridianEvent) {
                var $MeridianEvent = $event;
                if ($MeridianEvent.type == MeridianEvent.SHOW_MERIDIAN_EVENT) {
                    this.showPanel();
                }
                else if ($MeridianEvent.type == MeridianEvent.SHOW_MERIDIAN_BUY_EVENT) {
                    this.showMeridianBuyPanel();
                }
                else if ($MeridianEvent.type == MeridianEvent.CHG_MERIDIAL_FORCE) {
                    if (this.meridianPanel && this.meridianPanel.hasStage) {
                        this.meridianPanel.setForce();
                    }
                }
                else if ($MeridianEvent.type == MeridianEvent.REFRISH_MERIDIAL_PANEL) {
                    if (this.meridianPanel && this.meridianPanel.hasStage) {
                        this.meridianPanel.refresh();
                    }
                    this.refreshNode();
                }
                else if ($MeridianEvent.type == MeridianEvent.REFRISH_MERIDIAL_LIST) {
                    if (this.meridianPanel && this.meridianPanel.meridianList && this.meridianPanel.meridianList.hasStage) {
                        this.meridianPanel.meridianList.resetData();
                    }
                }
            }
            else if ($event instanceof EngineEvent) {
                if ($event.type == EngineEvent.CORE_DATA_COMPLETE_EVENT || $event.type == EngineEvent.MONEY_CHANGE || $event.type == EngineEvent.SYSTEM_OPEN_EVENT) {
                    this.refreshNode();
                }
            }
            else if ($event instanceof charbg.CharBgEvent) {
                if ($event.type == charbg.CharBgEvent.BGDATA_CHANGE_EVENT) {
                    // if(this._needItem){
                    //     if(this.isNeedItem((<charbg.CharBgEvent>$event).change)){
                    //         this.refreshNode();
                    //     }
                    // }else{
                    this.refreshNode();
                    // }
                    //背包变化,判断有无新增经脉丹
                    if (this.meridianBuyPanel && this.meridianBuyPanel.meridianBuyList && this.meridianBuyPanel.meridianBuyList.hasStage) {
                        this.meridianBuyPanel.meridianBuyList.refreshVo();
                    }
                }
            }
            else if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this.meridianPanel) {
                    this.meridianPanel.dispose();
                    this.meridianPanel = null;
                    //console.log("释放面板 meridianPanel")
                }
                else if (panelEvent.panel == this.meridianBuyPanel) {
                    this.meridianBuyPanel.dispose();
                    this.meridianBuyPanel = null;
                    //console.log("释放面板 meridianBuyPanel");
                }
            }
        };
        MeridianProcessor.prototype.showPanel = function () {
            var _this = this;
            if (!this.meridianPanel) {
                this.meridianPanel = new meridian.MeridianPanel();
            }
            this.meridianPanel.load(function () {
                SceneManager.getInstance().render = false;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
                _this.meridianPanel.show();
                var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
                $scenePange.data = SharedDef.MODULE_TCM;
                ModuleEventManager.dispatchEvent($scenePange);
            }, true);
        };
        MeridianProcessor.prototype.showMeridianBuyPanel = function () {
            var _this = this;
            if (!this.meridianBuyPanel) {
                this.meridianBuyPanel = new meridian.MeridianBuyPanel();
            }
            this.meridianBuyPanel.load(function () {
                _this.meridianBuyPanel.show();
            }, true);
        };
        MeridianProcessor.prototype.refreshNode = function () {
            // if(!this._needItem){
            //     this._needItem = new Array
            // }
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_TCM, SharedDef.MODULE_TCM_ALL)) {
                var $lev = GuidData.grow.getSpellIntFieldMeridianLevel(0);
                var $tupo = GuidData.grow.getSpellIntFieldMeridianLevel(1);
                var $exp = GuidData.grow.getSpellIntFieldMeridianExp();
                var aaary = tb.TB_meridian_info.getItem();
                if (aaary[aaary.length - 1].id <= $lev) {
                    RedPointManager.getInstance().getNodeByID(81).show = false;
                    RedPointManager.getInstance().getNodeByID(117).show = false;
                    return;
                }
                RedPointManager.getInstance().getNodeByID(117).show = false;
                var $aryvo = tb.TB_meridian_item.getItem();
                for (var index = 0; index < $aryvo.length; index++) {
                    // if(this._needItem.indexOf($aryvo[index].itemId) == -1){
                    //     this._needItem.push($aryvo[index].itemId);
                    // }
                    if (hasEnoughResItem([$aryvo[index].itemId, 1])) {
                        RedPointManager.getInstance().getNodeByID(117).show = true;
                        break;
                    }
                }
                var netxTb = tb.TB_meridian_info.getTempVo($lev + 1);
                var $tupoOrxiulian;
                if (netxTb.costMoney.length) {
                    $tupoOrxiulian = true;
                    // if(this._needItem.indexOf(netxTb.costMoney[0][0]) == -1){
                    //     this._needItem.push(netxTb.costMoney[0][0]);
                    // }
                }
                else {
                    $tupoOrxiulian = false;
                }
                if ($tupoOrxiulian) {
                    RedPointManager.getInstance().getNodeByID(81).show = hasEnoughRes(netxTb.costMoney[0]);
                    return;
                }
                RedPointManager.getInstance().getNodeByID(81).show = ($exp >= netxTb.costExp);
            }
        };
        MeridianProcessor.prototype.listenModuleEvents = function () {
            return [
                new MeridianEvent(MeridianEvent.SHOW_MERIDIAN_EVENT),
                new MeridianEvent(MeridianEvent.REFRISH_MERIDIAL_PANEL),
                new MeridianEvent(MeridianEvent.REFRISH_MERIDIAL_LIST),
                new MeridianEvent(MeridianEvent.CHG_MERIDIAL_FORCE),
                new MeridianEvent(MeridianEvent.SHOW_MERIDIAN_BUY_EVENT),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.MONEY_CHANGE),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),
                new charbg.CharBgEvent(charbg.CharBgEvent.BGDATA_CHANGE_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        return MeridianProcessor;
    }(BaseProcessor));
    meridian.MeridianProcessor = MeridianProcessor;
})(meridian || (meridian = {}));
//# sourceMappingURL=MeridianProcessor.js.map