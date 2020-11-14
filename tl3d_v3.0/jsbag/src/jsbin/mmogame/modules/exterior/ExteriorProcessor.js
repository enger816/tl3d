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
var exterior;
(function (exterior) {
    var ExteriorEvent = /** @class */ (function (_super) {
        __extends(ExteriorEvent, _super);
        function ExteriorEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ExteriorEvent.SHOW_EXTERIOR_EVENT = "SHOW_EXTERIOR_EVENT"; //显示面板
        ExteriorEvent.REFRISH_EXTERIOR_PANEL = "REFRISH_EXTERIOR_PANEL"; //显示面板
        ExteriorEvent.SELECT_EXTERIOR_CELL = "SELECT_EXTERIOR_CELL"; //显示面板
        ExteriorEvent.SHOW_IDENTIFICATION_EVENT = "SHOW_IDENTIFICATION_EVENT"; //显示面板
        return ExteriorEvent;
    }(BaseEvent));
    exterior.ExteriorEvent = ExteriorEvent;
    var ExteriorModule = /** @class */ (function (_super) {
        __extends(ExteriorModule, _super);
        function ExteriorModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ExteriorModule.prototype.getModuleName = function () {
            return "ExteriorModule";
        };
        ExteriorModule.prototype.listProcessors = function () {
            return [new ExteriorProcessor()];
        };
        return ExteriorModule;
    }(Module));
    exterior.ExteriorModule = ExteriorModule;
    var ExteriorProcessor = /** @class */ (function (_super) {
        __extends(ExteriorProcessor, _super);
        function ExteriorProcessor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._nodeInit = false;
            return _this;
        }
        ExteriorProcessor.prototype.getName = function () {
            return "ExteriorProcessor";
        };
        ExteriorProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof ExteriorEvent) {
                var $ExteriorEvent = $event;
                if ($ExteriorEvent.type == ExteriorEvent.SHOW_EXTERIOR_EVENT) {
                    this.showPanel();
                }
                if ($ExteriorEvent.type == ExteriorEvent.SHOW_IDENTIFICATION_EVENT) {
                    this.showIdentificationPanel();
                }
                if (this.exteriorPanel) {
                    if ($ExteriorEvent.type == ExteriorEvent.REFRISH_EXTERIOR_PANEL) {
                        this.processRedPoint();
                        this.exteriorPanel.refrish();
                        //console.log("外观变化")
                    }
                    if ($ExteriorEvent.type == ExteriorEvent.SELECT_EXTERIOR_CELL) {
                        this.exteriorPanel.selectCell($ExteriorEvent.exteriorCellVo);
                    }
                }
            }
            else if ($event.type == EngineEvent.CORE_DATA_COMPLETE_EVENT) {
                this.initRedNode();
            }
            else if ($event.type == EngineEvent.SYSTEM_OPEN_EVENT) {
                this.processRedPoint();
            }
            else if ($event.type == charbg.CharBgEvent.BGDATA_CHANGE_EVENT) {
                // if(this._needItem){
                //     if(this.isNeedItem((<charbg.CharBgEvent>$event).change)){
                //         this.processRedPoint();
                //     }
                // }else{
                this.processRedPoint();
                // }
            }
            else if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this.exteriorPanel) {
                    var pnode22 = RedPointManager.getInstance().getNodeByID(22).children;
                    for (var i = 0; i < pnode22.length; i++) {
                        pnode22[i].unBind();
                    }
                    var pnode25 = RedPointManager.getInstance().getNodeByID(25).children;
                    for (var i = 0; i < pnode25.length; i++) {
                        pnode25[i].unBind();
                    }
                    this.exteriorPanel.dispose();
                    this.exteriorPanel = null;
                    //console.log("释放面板 exteriorPanel")
                }
                else if (panelEvent.panel == this.identificationPanel) {
                    this.identificationPanel.dispose();
                    this.identificationPanel = null;
                    //console.log("释放面板 exteriorPanel");
                }
            }
        };
        ExteriorProcessor.prototype.showPanel = function () {
            var _this = this;
            if (!this.exteriorPanel) {
                this.exteriorPanel = new exterior.ExteriorPanel();
            }
            this.exteriorPanel.load(function () {
                _this.exteriorPanel.show();
                var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
                $scenePange.data = SharedDef.MODULE_FASHION;
                ModuleEventManager.dispatchEvent($scenePange);
            }, false);
        };
        ExteriorProcessor.prototype.showIdentificationPanel = function () {
            var _this = this;
            if (!this.identificationPanel) {
                this.identificationPanel = new exterior.IdentificationPanel();
            }
            this.identificationPanel.load(function () {
                _this.identificationPanel.show();
            }, false);
        };
        ExteriorProcessor.prototype.initRedNode = function () {
            if (this._nodeInit) {
                return;
            }
            var pnode = RedPointManager.getInstance().getNodeByID(22);
            var $arr;
            $arr = tb.TB_char_info.getTempVo(GuidData.player.getCharType()).waiguan;
            for (var i = 0; i < $arr.length; i++) {
                var tbObj = tb.TB_appearance_info.getTempVo($arr[i]);
                var node = new RedPointNode();
                node.data = tbObj;
                pnode.addChild(node);
            }
            pnode = RedPointManager.getInstance().getNodeByID(25);
            $arr = tb.TB_char_info.getTempVo(GuidData.player.getCharType()).weaponwg;
            for (var i = 0; i < $arr.length; i++) {
                var tbObj = tb.TB_appearance_info.getTempVo($arr[i]);
                var node = new RedPointNode();
                node.data = tbObj;
                pnode.addChild(node);
            }
            this._nodeInit = true;
            this.processRedPoint();
        };
        ExteriorProcessor.prototype.processRedPoint = function () {
            // if(!this._needItem){
            //     this._needItem = new Array
            // }
            var $hasIdArr = GuidData.grow.getSpellIntFieldAppearanceId();
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_FASHION, SharedDef.MODULE_FASHION_CLOTHES)) {
                this.processRedPointByID(22, $hasIdArr);
            }
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_FASHION, SharedDef.MODULE_FASHION_WEAPON)) {
                this.processRedPointByID(25, $hasIdArr);
            }
        };
        ExteriorProcessor.prototype.processRedPointByID = function ($id, $hasIdArr) {
            var ary = RedPointManager.getInstance().getNodeByID($id).children;
            for (var i = 0; i < ary.length; i++) {
                var obj = ary[i].data;
                // if(this._needItem.indexOf(obj.costs[0][0]) == -1){
                //     this._needItem.push(obj.costs[0][0]);
                // }
                if (GuidData.bag.getItemCount(obj.costs[0][0]) >= obj.costs[0][1] && $hasIdArr.indexOf(obj.id) == -1) {
                    ary[i].show = true;
                }
                else {
                    ary[i].show = false;
                }
            }
        };
        ExteriorProcessor.prototype.listenModuleEvents = function () {
            return [
                new ExteriorEvent(ExteriorEvent.SHOW_EXTERIOR_EVENT),
                new ExteriorEvent(ExteriorEvent.REFRISH_EXTERIOR_PANEL),
                new ExteriorEvent(ExteriorEvent.SELECT_EXTERIOR_CELL),
                new ExteriorEvent(ExteriorEvent.SHOW_IDENTIFICATION_EVENT),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),
                new charbg.CharBgEvent(charbg.CharBgEvent.BGDATA_CHANGE_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        return ExteriorProcessor;
    }(BaseProcessor));
    exterior.ExteriorProcessor = ExteriorProcessor;
})(exterior || (exterior = {}));
//# sourceMappingURL=ExteriorProcessor.js.map