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
var fb;
(function (fb) {
    var ExpEvent = /** @class */ (function (_super) {
        __extends(ExpEvent, _super);
        function ExpEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ExpEvent.SHOW_EXP_PANEL = "SHOW_EXP_PANEL";
        ExpEvent.HIDE_EXP_PANEL = "HIDE_EXP_PANEL";
        ExpEvent.REFRESH_TIMES_PANEL = "REFRESH_TIMES_PANEL";
        return ExpEvent;
    }(BaseEvent));
    fb.ExpEvent = ExpEvent;
    var ExpProcessor = /** @class */ (function (_super) {
        __extends(ExpProcessor, _super);
        function ExpProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ExpProcessor.prototype.getName = function () {
            return "ExpProcessor";
        };
        ExpProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof ExpEvent) {
                var evt = $event;
                if (evt.type == ExpEvent.SHOW_EXP_PANEL) {
                    this.showPanel(evt.data, evt.seltab);
                }
                if (evt.type == ExpEvent.HIDE_EXP_PANEL) {
                    this.hidePanel();
                }
                if (evt.type == ExpEvent.REFRESH_TIMES_PANEL) {
                    this.refreshTimes();
                }
            }
            if ($event instanceof copytask.CopytaskUiEvent) {
                if ($event.type == copytask.CopytaskUiEvent.SELECT_ITEM_EVENT) {
                    this.selectitem($event.data);
                }
                if ($event.type == copytask.CopytaskUiEvent.CHG_TEAM_NUM) {
                    this.refreshTeamNum();
                }
            }
            if ($event instanceof EngineEvent) {
                if ($event.type == EngineEvent.SYSTEM_OPEN_EVENT) {
                    if (this._expUiPanel && this._expUiPanel.hasStage) {
                        this._expUiPanel.showTab1();
                    }
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._expUiPanel) {
                    this._expUiPanel.dispose();
                    this._expUiPanel = null;
                    //console.log("释放面板 trainingUiPanel")
                }
            }
        };
        ExpProcessor.prototype.selectitem = function ($data) {
            if (this._expUiPanel && this._expUiPanel.teamcopyUiPanel) {
                this._expUiPanel.teamcopyUiPanel.resetData($data.data);
            }
        };
        ExpProcessor.prototype.refreshTeamNum = function () {
            if (this._expUiPanel && this._expUiPanel.teamcopyUiPanel && this._expUiPanel.teamcopyUiPanel.hasStage) {
                this._expUiPanel.teamcopyUiPanel.drawBuynum();
            }
        };
        ExpProcessor.prototype.refreshTimes = function () {
            if (this._expUiPanel && this._expUiPanel.exptaskpanel && this._expUiPanel.exptaskpanel.hasStage) {
                this._expUiPanel.exptaskpanel.refreshNum();
            }
        };
        ExpProcessor.prototype.hidePanel = function () {
            if (this._expUiPanel) {
                this._expUiPanel.hide();
            }
        };
        ExpProcessor.prototype.showPanel = function ($data, $seltab) {
            var _this = this;
            if (!this._expUiPanel) {
                this._expUiPanel = new fb.ExpUiPanel();
            }
            this._expUiPanel.load(function () {
                if (!$data) {
                    $data = [SharedDef.MODULE_TEAMINSTANCE_EXP, SharedDef.MODULE_TEAMINSTANCE_TEAM];
                }
                else {
                    if (!($data instanceof Array)) {
                        $data = [$data];
                    }
                }
                if (!$seltab) {
                    $seltab = $data[0];
                }
                else {
                    if ($seltab instanceof Array) {
                        $seltab = $seltab[0];
                    }
                }
                _this._expUiPanel.show($data, $seltab);
                var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
                $scenePange.data = SharedDef.MODULE_GW;
                ModuleEventManager.dispatchEvent($scenePange);
            }, true);
        };
        ExpProcessor.prototype.listenModuleEvents = function () {
            return [
                new ExpEvent(ExpEvent.SHOW_EXP_PANEL),
                new ExpEvent(ExpEvent.HIDE_EXP_PANEL),
                new ExpEvent(ExpEvent.REFRESH_TIMES_PANEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),
                new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.CHG_TEAM_NUM),
                new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.SELECT_ITEM_EVENT),
            ];
        };
        return ExpProcessor;
    }(BaseProcessor));
    fb.ExpProcessor = ExpProcessor;
})(fb || (fb = {}));
//# sourceMappingURL=ExpProcessor.js.map