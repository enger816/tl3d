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
/**
 * 强化宝石模块
 *
*/
var strengthgem;
(function (strengthgem) {
    var StrengthGemModule = /** @class */ (function (_super) {
        __extends(StrengthGemModule, _super);
        function StrengthGemModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StrengthGemModule.prototype.getModuleName = function () {
            return "StrengthGemModule";
        };
        StrengthGemModule.prototype.listProcessors = function () {
            return [new StrengthGemProcessor()];
        };
        return StrengthGemModule;
    }(Module));
    strengthgem.StrengthGemModule = StrengthGemModule;
    var StrengthGemEvent = /** @class */ (function (_super) {
        __extends(StrengthGemEvent, _super);
        function StrengthGemEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StrengthGemEvent.SHOW_STRENGTHGEM_PANEL = "show_strengthgem_panel";
        StrengthGemEvent.HIDE_STRENGTHGEM_PANEL = "hide_strengthgem_panel";
        StrengthGemEvent.STRENGTHGEM_DATA_CHG = "strengthgem_data_chg";
        StrengthGemEvent.STRENGTHGEM_MUL_CHG = "strengthgem_mul_chg";
        StrengthGemEvent.GEM_UPLEV_CHG = "gem_uplev_chg";
        StrengthGemEvent.GEM_BLESS_CHG = "gem_bless_chg";
        StrengthGemEvent.GEM_MUL_CHG = "gem_mul_chg";
        //展示祝福值动效
        StrengthGemEvent.SHOW_EFFECTS_MOVE = "SHOW_EFFECTS_MOVE";
        //强化等级变化
        StrengthGemEvent.STRENG_LEV_EVENT = "STRENG_LEV_EVENT";
        //精炼等级变化
        StrengthGemEvent.REFINING_LEV_EVENT = "REFINING_LEV_EVENT";
        //宝石等级变化
        StrengthGemEvent.GEM_LEV_EVENT = "GEM_LEV_EVENT";
        //洗炼数据变化
        StrengthGemEvent.WASH_CHG_EVENT = "WASH_CHG_EVENT";
        //精炼tip
        StrengthGemEvent.SHOW_REFINING_TIPS_EVENT = "SHOW_REFINING_TIPS_EVENT";
        //大师tip
        StrengthGemEvent.SHOW_MASTER_TIPS_EVENT = "SHOW_MASTER_TIPS_EVENT";
        //特效
        StrengthGemEvent.EFF_EVENT = "EFF_EVENT";
        //大师奖励弹出tip
        StrengthGemEvent.POP_TIPS_EVENT = "POP_TIPS_EVENT";
        return StrengthGemEvent;
    }(BaseEvent));
    strengthgem.StrengthGemEvent = StrengthGemEvent;
    var StrengthGemProcessor = /** @class */ (function (_super) {
        __extends(StrengthGemProcessor, _super);
        function StrengthGemProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StrengthGemProcessor.prototype.getName = function () {
            return "StrengthGemProcessor";
        };
        StrengthGemProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof StrengthGemEvent) {
                //红点先处理
                this.processRedPoint();
                var sgEvent = $event;
                if (sgEvent.type == StrengthGemEvent.SHOW_STRENGTHGEM_PANEL) {
                    this.showPanel(sgEvent.data);
                }
                else if (sgEvent.type == StrengthGemEvent.HIDE_STRENGTHGEM_PANEL) {
                    this.hidePanel();
                    // } else if (sgEvent.type == StrengthGemEvent.STRENGTHGEM_DATA_CHG) {
                    //     this._sgPanel.strengthDataChange(sgEvent.data);
                    // } else if (sgEvent.type == StrengthGemEvent.STRENGTHGEM_MUL_CHG) {
                    //     this._sgPanel.strengMulChange();
                    // } else if (sgEvent.type == StrengthGemEvent.GEM_UPLEV_CHG) {
                    //     this._sgPanel.gemLevChange(sgEvent.data);
                    // } else if (sgEvent.type == StrengthGemEvent.GEM_BLESS_CHG) {
                    //     this._sgPanel.gemBlessChange(sgEvent.data);
                    // } else if (sgEvent.type == StrengthGemEvent.GEM_MUL_CHG) {
                    //     this._sgPanel.gemMulChange();
                }
                else if (sgEvent.type == StrengthGemEvent.SHOW_EFFECTS_MOVE) {
                    this.showEffectsMove(sgEvent.data);
                }
                else if (sgEvent.type == StrengthGemEvent.STRENG_LEV_EVENT) {
                    this.strenglevevent(sgEvent.data);
                    this.masterProChg();
                }
                else if (sgEvent.type == StrengthGemEvent.REFINING_LEV_EVENT) {
                    this.refininglevevent(sgEvent.data);
                    this.masterProChg();
                }
                else if (sgEvent.type == StrengthGemEvent.GEM_LEV_EVENT) {
                    this.gemlevevent(sgEvent.data);
                    this.masterProChg();
                }
                else if (sgEvent.type == StrengthGemEvent.WASH_CHG_EVENT) {
                    this.washvochg();
                }
                else if (sgEvent.type == StrengthGemEvent.SHOW_REFINING_TIPS_EVENT) {
                    this.showrefiningtipsPanel(sgEvent.data);
                }
                else if (sgEvent.type == StrengthGemEvent.SHOW_MASTER_TIPS_EVENT) {
                    this.showmastertipsPanel(sgEvent.data);
                }
                else if (sgEvent.type == StrengthGemEvent.EFF_EVENT) {
                    this.effshow();
                }
                else if (sgEvent.type == StrengthGemEvent.POP_TIPS_EVENT) {
                    this.showpoptios(sgEvent.data);
                }
            }
            else if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                // if (panelEvent.panel == this._sgPanel) {
                //     this._sgPanel.dispose();
                //     this._sgPanel = null;
                //     //console.log("释放面板 _sgPanel")
                // }
                if (panelEvent.panel == this._newStrengUiPanel) {
                    this._newStrengUiPanel.dispose();
                    this._newStrengUiPanel = null;
                    //console.log("释放面板 _newStrengUiPanel")
                }
                if (panelEvent.panel == this._refiningtipsPanel) {
                    this._refiningtipsPanel.dispose();
                    this._refiningtipsPanel = null;
                    //console.log("释放面板 _refiningtipsPanel")
                }
                if (panelEvent.panel == this._masterLevtipsPanel) {
                    this._masterLevtipsPanel.dispose();
                    this._masterLevtipsPanel = null;
                    //console.log("释放面板 _masterLevtipsPanel")
                }
                if (panelEvent.panel == this._poplevtipspanel) {
                    this._poplevtipspanel.dispose();
                    this._poplevtipspanel = null;
                    //console.log("释放面板 _poplevtipspanel")
                }
            }
            else if ($event.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                if (this._newStrengUiPanel && this._newStrengUiPanel.strengTab0 && this._newStrengUiPanel.strengTab0.hasStage) {
                    this._newStrengUiPanel.strengTab0.refreshLevAndUp();
                }
            }
            else if ($event.type == EngineEvent.MONEY_CHANGE) {
                this.refreshCost();
                this.processRedPoint();
            }
            else if ($event.type == EngineEvent.CORE_DATA_COMPLETE_EVENT || $event.type == EngineEvent.SYSTEM_OPEN_EVENT) {
                this.processRedPoint();
            }
            else if ($event instanceof charbg.CharBgEvent) {
                if ($event.type == charbg.CharBgEvent.BGDATA_CHANGE_EVENT) {
                    // if(this._needItem){
                    //     if(this.isNeedItem($event.change)){
                    //         this.processRedPoint();
                    //     }
                    // }else{
                    this.processRedPoint();
                    // }
                    if ($event.showType == BagData.TYPE_EQU) {
                        this.bagChg($event.data);
                    }
                    else {
                        // this.refreshCost();
                    }
                    //刷新红点、资源数等UI。
                    if (this._newStrengUiPanel && this._newStrengUiPanel.strengTab0 && this._newStrengUiPanel.strengTab0.hasStage) {
                        this._newStrengUiPanel.strengTab0.refreshPartChg(this._newStrengUiPanel.strengTab0.lastselect + 1);
                    }
                    if (this._newStrengUiPanel && this._newStrengUiPanel.strengTab1 && this._newStrengUiPanel.strengTab1.hasStage) {
                        this._newStrengUiPanel.strengTab1.refreshPartChg(this._newStrengUiPanel.strengTab1.lastselect + 1);
                    }
                    if (this._newStrengUiPanel && this._newStrengUiPanel.strengTab2 && this._newStrengUiPanel.strengTab2.hasStage) {
                        this._newStrengUiPanel.strengTab2.refreshPartChg(this._newStrengUiPanel.strengTab2.lastselect + 1);
                    }
                    if (this._newStrengUiPanel && this._newStrengUiPanel.strengTab3 && this._newStrengUiPanel.strengTab3.hasStage) {
                        this._newStrengUiPanel.strengTab3.drawResItem();
                    }
                }
            }
        };
        // private isNeedItem($chgary:Array<number>):boolean{
        //     if($chgary){
        //         for (let i = 0; i < $chgary.length; i++) {
        //             var hasflag = this._needItem.indexOf($chgary[i]);
        //             if(hasflag != -1){
        //                 return true;
        //             }
        //         }
        //     }
        //     return false;
        // }
        // private _needItem:Array<number>
        StrengthGemProcessor.prototype.processRedPoint = function () {
            // if(!this._needItem){
            //     this._needItem = new Array
            // }
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_MIX, SharedDef.MODULE_MIX_STRENGTH)) {
                //处理节点38下面的子节点
                var strengary = RedPointManager.getInstance().getNodeByID(38).children;
                var uplev = Math.floor(GuidData.player.getLevel() / 10) - 1;
                for (var i = 0; i < strengary.length; i++) {
                    var strengVo = strengthgem.NewStrengModel.getInstance().getstrengvo(i + 1);
                    if (strengVo.state == 0 || (strengVo.curtab.rank == uplev && strengVo.nexttab.rank > uplev)) {
                        //满级或者达到段数上限
                        strengary[i].show = false;
                    }
                    else {
                        var itemtab = strengVo.nexttab ? strengVo.nexttab : strengVo.curtab;
                        var flagarystreng = new Array;
                        for (var j = 0; j < itemtab.cost.length; j++) {
                            flagarystreng.push(hasEnoughResItem(itemtab.cost[j]));
                            // if(this._needItem.indexOf(itemtab.cost[j][0]) == -1){
                            //     this._needItem.push(itemtab.cost[j][0]);
                            // }
                        }
                        strengary[i].show = true;
                        for (var flagid = 0; flagid < flagarystreng.length; flagid++) {
                            strengary[i].show = strengary[i].show && flagarystreng[flagid];
                        }
                    }
                }
            }
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_MIX, SharedDef.MODULE_MIX_POLISHED)) {
                //处理节点41下面的子节点
                var refineary = RedPointManager.getInstance().getNodeByID(41).children;
                for (var i = 0; i < refineary.length; i++) {
                    var refiningVo = strengthgem.NewStrengModel.getInstance().getrefiningvo(i + 1);
                    if (refiningVo.state == 0) {
                        refineary[i].show = false;
                    }
                    else {
                        var refiningtab = refiningVo.nexttab ? refiningVo.nexttab : refiningVo.curtab;
                        var flagaryrefining = new Array;
                        for (var j = 0; j < refiningtab.cost.length; j++) {
                            flagaryrefining.push(hasEnoughResItem(refiningtab.cost[j]));
                            // if(this._needItem.indexOf(refiningtab.cost[j][0]) == -1){
                            //     this._needItem.push(refiningtab.cost[j][0]);
                            // }
                        }
                        refineary[i].show = true;
                        for (var flagid = 0; flagid < flagaryrefining.length; flagid++) {
                            refineary[i].show = refineary[i].show && flagaryrefining[flagid];
                        }
                    }
                }
            }
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_MIX, SharedDef.MODULE_MIX_GEM)) {
                //处理节点44下面的子节点
                var gemary = RedPointManager.getInstance().getNodeByID(44).children;
                for (var i = 0; i < gemary.length; i++) {
                    var gemvoary = strengthgem.NewStrengModel.getInstance().getGemvo(i + 1);
                    for (var index = 0; index < gemvoary.length; index++) {
                        gemary[i].show = false;
                        //宝石数据但凡有一个满足红点需求，无需再往下判断
                        if (gemvoary[index].state == 1 || gemvoary[index].state == 3) {
                            var gemvo = gemvoary[index].nexttab ? gemvoary[index].nexttab : gemvoary[index].curtab;
                            var flagarygem = new Array;
                            for (var j = 0; j < gemvo.cost.length; j++) {
                                flagarygem.push(hasEnoughResItem(gemvo.cost[j]));
                                // if(this._needItem.indexOf(gemvo.cost[j][0]) == -1){
                                //     this._needItem.push(gemvo.cost[j][0]);
                                // }
                            }
                            var aaa = true;
                            for (var flagid = 0; flagid < flagarygem.length; flagid++) {
                                if (!flagarygem[flagid]) {
                                    aaa = false;
                                    break;
                                }
                            }
                            if (aaa) {
                                gemary[i].show = true;
                                break;
                            }
                        }
                    }
                }
            }
            // //console.log("111---",RedPointManager.getInstance().getNodeByID(37));
        };
        StrengthGemProcessor.prototype.showmastertipsPanel = function ($data) {
            var _this = this;
            if (!this._masterLevtipsPanel) {
                this._masterLevtipsPanel = new strengthgem.masterLevtipsPanel();
            }
            this._masterLevtipsPanel.load(function () {
                _this._masterLevtipsPanel.show($data);
            }, false);
        };
        StrengthGemProcessor.prototype.showrefiningtipsPanel = function ($data) {
            var _this = this;
            if (!this._refiningtipsPanel) {
                this._refiningtipsPanel = new strengthgem.refiningtipsPanel();
            }
            this._refiningtipsPanel.load(function () {
                _this._refiningtipsPanel.show($data);
            }, false);
        };
        StrengthGemProcessor.prototype.effshow = function () {
            if (this._newStrengUiPanel) {
                if (this._newStrengUiPanel.strengTab0 && this._newStrengUiPanel.strengTab0.hasStage) {
                    this._newStrengUiPanel.strengTab0.showExpEff();
                }
                if (this._newStrengUiPanel.strengTab1 && this._newStrengUiPanel.strengTab1.hasStage) {
                    this._newStrengUiPanel.strengTab1.showExpEff();
                }
            }
        };
        StrengthGemProcessor.prototype.bagChg = function ($partid) {
            if (this._newStrengUiPanel) {
                if (this._newStrengUiPanel.strengTab0 && this._newStrengUiPanel.strengTab0.hasStage) {
                    this._newStrengUiPanel.strengTab0.refreshEqu();
                }
                if (this._newStrengUiPanel.strengTab1 && this._newStrengUiPanel.strengTab1.hasStage) {
                    this._newStrengUiPanel.strengTab1.refreshEqu();
                }
                if (this._newStrengUiPanel.strengTab2 && this._newStrengUiPanel.strengTab2.hasStage) {
                    this._newStrengUiPanel.strengTab2.refreshEqu();
                }
                if (this._newStrengUiPanel.strengTab3 && this._newStrengUiPanel.strengTab3.hasStage) {
                    this._newStrengUiPanel.strengTab3.refreshEqu();
                    this._newStrengUiPanel.strengTab3.drawAttr();
                }
            }
        };
        StrengthGemProcessor.prototype.masterProChg = function () {
            if (this._newStrengUiPanel && this._newStrengUiPanel.hasStage) {
                this._newStrengUiPanel.drawPage();
            }
        };
        StrengthGemProcessor.prototype.washvochg = function () {
            if (this._newStrengUiPanel && this._newStrengUiPanel.strengTab3 && this._newStrengUiPanel.strengTab3.hasStage) {
                this._newStrengUiPanel.strengTab3.drawNewAttr();
                this._newStrengUiPanel.strengTab3.drawBtn();
            }
            this.masterProChg();
        };
        StrengthGemProcessor.prototype.refreshCost = function () {
            if (this._newStrengUiPanel && this._newStrengUiPanel.strengTab0 && this._newStrengUiPanel.strengTab0.hasStage) {
                this._newStrengUiPanel.strengTab0.drawResItem();
            }
            if (this._newStrengUiPanel && this._newStrengUiPanel.strengTab1 && this._newStrengUiPanel.strengTab1.hasStage) {
                this._newStrengUiPanel.strengTab1.drawResItem();
            }
            if (this._newStrengUiPanel && this._newStrengUiPanel.strengTab3 && this._newStrengUiPanel.strengTab3.hasStage) {
                this._newStrengUiPanel.strengTab3.drawResItem();
            }
        };
        StrengthGemProcessor.prototype.gemlevevent = function ($partid) {
            if (this._newStrengUiPanel && this._newStrengUiPanel.strengTab2 && this._newStrengUiPanel.strengTab2.hasStage) {
                this._newStrengUiPanel.strengTab2.refreshPartChg($partid);
            }
        };
        StrengthGemProcessor.prototype.refininglevevent = function ($partid) {
            if (this._newStrengUiPanel && this._newStrengUiPanel.strengTab1 && this._newStrengUiPanel.strengTab1.hasStage) {
                this._newStrengUiPanel.strengTab1.refreshPartChg($partid);
            }
        };
        StrengthGemProcessor.prototype.strenglevevent = function ($partid) {
            if (this._newStrengUiPanel && this._newStrengUiPanel.strengTab0 && this._newStrengUiPanel.strengTab0.hasStage) {
                this._newStrengUiPanel.strengTab0.refreshPartChg($partid);
            }
        };
        StrengthGemProcessor.prototype.showEffectsMove = function ($num) {
            // if (this._sgPanel && this._sgPanel.strengthPanel && this._sgPanel.strengthPanel.hasStage) {
            //     this._sgPanel.strengthPanel.showEffectsMove($num);
            // }
            // if (this._sgPanel && this._sgPanel.gemPanel && this._sgPanel.gemPanel.hasStage) {
            //     this._sgPanel.gemPanel.showEffectsMove($num);
            // }
        };
        StrengthGemProcessor.prototype.showpoptios = function ($data) {
            var _this = this;
            if (!this._poplevtipspanel) {
                this._poplevtipspanel = new strengthgem.PopLevTipsPanel();
            }
            this._poplevtipspanel.load(function () {
                _this._poplevtipspanel.show($data);
            });
        };
        StrengthGemProcessor.prototype.showPanel = function ($data) {
            var _this = this;
            if (!this._newStrengUiPanel) {
                this._newStrengUiPanel = new strengthgem.NewStrengUiPanel();
            }
            this._newStrengUiPanel.load(function () {
                SceneManager.getInstance().render = false;
                var evt = new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT);
                ModuleEventManager.dispatchEvent(evt);
                if (!$data) {
                    $data = SharedDef.MODULE_MIX_STRENGTH;
                }
                if ($data instanceof Array) {
                    _this._newStrengUiPanel.show($data[0]);
                }
                else {
                    _this._newStrengUiPanel.show($data);
                }
                var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
                $scenePange.data = SharedDef.MODULE_MIX;
                ModuleEventManager.dispatchEvent($scenePange);
            });
        };
        StrengthGemProcessor.prototype.hidePanel = function () {
            if (this._newStrengUiPanel) {
                this._newStrengUiPanel.hide();
            }
            UIManager.popClikNameFun("w_close");
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
        };
        StrengthGemProcessor.prototype.listenModuleEvents = function () {
            return [
                new StrengthGemEvent(StrengthGemEvent.SHOW_STRENGTHGEM_PANEL),
                new StrengthGemEvent(StrengthGemEvent.HIDE_STRENGTHGEM_PANEL),
                new StrengthGemEvent(StrengthGemEvent.STRENGTHGEM_DATA_CHG),
                new StrengthGemEvent(StrengthGemEvent.STRENGTHGEM_MUL_CHG),
                new StrengthGemEvent(StrengthGemEvent.GEM_UPLEV_CHG),
                new StrengthGemEvent(StrengthGemEvent.GEM_BLESS_CHG),
                new StrengthGemEvent(StrengthGemEvent.GEM_MUL_CHG),
                new StrengthGemEvent(StrengthGemEvent.SHOW_EFFECTS_MOVE),
                new EngineEvent(EngineEvent.MONEY_TYPE_SILVER),
                new EngineEvent(EngineEvent.MONEY_TYPE_GOLD_INGOT),
                new EngineEvent(EngineEvent.MONEY_TYPE_GEM),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new charbg.CharBgEvent(charbg.CharBgEvent.BGDATA_CHANGE_EVENT),
                new EngineEvent(EngineEvent.MONEY_CHANGE),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                new StrengthGemEvent(StrengthGemEvent.STRENG_LEV_EVENT),
                new StrengthGemEvent(StrengthGemEvent.REFINING_LEV_EVENT),
                new StrengthGemEvent(StrengthGemEvent.GEM_LEV_EVENT),
                new StrengthGemEvent(StrengthGemEvent.WASH_CHG_EVENT),
                new StrengthGemEvent(StrengthGemEvent.SHOW_REFINING_TIPS_EVENT),
                new StrengthGemEvent(StrengthGemEvent.SHOW_MASTER_TIPS_EVENT),
                new StrengthGemEvent(StrengthGemEvent.EFF_EVENT),
                new StrengthGemEvent(StrengthGemEvent.POP_TIPS_EVENT),
            ];
        };
        return StrengthGemProcessor;
    }(BaseProcessor));
    strengthgem.StrengthGemProcessor = StrengthGemProcessor;
})(strengthgem || (strengthgem = {}));
//# sourceMappingURL=StrengthGemProcessor.js.map