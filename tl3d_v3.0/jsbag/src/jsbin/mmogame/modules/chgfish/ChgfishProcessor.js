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
var chgfish;
(function (chgfish) {
    var ChgfishModule = /** @class */ (function (_super) {
        __extends(ChgfishModule, _super);
        function ChgfishModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ChgfishModule.prototype.getModuleName = function () {
            return "ChgfishModule";
        };
        ChgfishModule.prototype.listProcessors = function () {
            return [new ChgfishProcessor()];
        };
        return ChgfishModule;
    }(Module));
    chgfish.ChgfishModule = ChgfishModule;
    var ChgfishEvent = /** @class */ (function (_super) {
        __extends(ChgfishEvent, _super);
        function ChgfishEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //展示面板
        ChgfishEvent.SHOW_Chgfish_EVENT = "SHOW_Chgfish_EVENT";
        //隐藏面板
        ChgfishEvent.HIDE_Chgfish_EVENT = "HIDE_Chgfish_EVENT";
        //刷新
        ChgfishEvent.REFRESH_Chgfish_EVENT = "REFRESH_Chgfish_EVENT";
        return ChgfishEvent;
    }(BaseEvent));
    chgfish.ChgfishEvent = ChgfishEvent;
    var ChgfishProcessor = /** @class */ (function (_super) {
        __extends(ChgfishProcessor, _super);
        function ChgfishProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ChgfishProcessor.prototype.getName = function () {
            return "ChgfishProcessor";
        };
        ChgfishProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof ChgfishEvent) {
                var $givingUiEvent = $event;
                if ($givingUiEvent.type == ChgfishEvent.SHOW_Chgfish_EVENT) {
                    this.showUi($givingUiEvent.data);
                }
                else if ($givingUiEvent.type == ChgfishEvent.HIDE_Chgfish_EVENT) {
                    this.hideUi();
                }
                else if ($givingUiEvent.type == ChgfishEvent.REFRESH_Chgfish_EVENT) {
                    if (this._chgfishUiPanel && this._chgfishUiPanel.fishTabList && this._chgfishUiPanel.fishTabList.hasStage) {
                        this._chgfishUiPanel.fishTabList.refreshDataByNewData();
                    }
                }
            }
            if ($event instanceof RedPointEvent) {
                var redPointEvent = $event;
                if (redPointEvent.type == RedPointEvent.SHOW_REDPOINT_EVENT) {
                    chgfish.ChgfishModel.getInstance().addItem(redPointEvent.node);
                }
                else if (redPointEvent.type == RedPointEvent.HIDE_REDPOINT_EVENT) {
                    chgfish.ChgfishModel.getInstance().removeItem(redPointEvent.node);
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._chgfishUiPanel) {
                    this._chgfishUiPanel.dispose();
                    this._chgfishUiPanel = null;
                    //console.log("释放面板 _chgfishUiPanel")
                }
            }
        };
        ChgfishProcessor.prototype.hideUi = function () {
            this._chgfishUiPanel.hide();
        };
        ChgfishProcessor.prototype.showUi = function ($ui) {
            var _this = this;
            if (!this._chgfishUiPanel) {
                this._chgfishUiPanel = new chgfish.ChgfishUiPanel();
            }
            this._chgfishUiPanel.load(function () {
                //停止绘制前面的ui
                _this._chgfishUiPanel.show($ui);
            });
        };
        ChgfishProcessor.prototype.listenModuleEvents = function () {
            return [
                new ChgfishEvent(ChgfishEvent.SHOW_Chgfish_EVENT),
                new ChgfishEvent(ChgfishEvent.HIDE_Chgfish_EVENT),
                new ChgfishEvent(ChgfishEvent.REFRESH_Chgfish_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new RedPointEvent(RedPointEvent.SHOW_REDPOINT_EVENT),
                new RedPointEvent(RedPointEvent.HIDE_REDPOINT_EVENT),
            ];
        };
        return ChgfishProcessor;
    }(BaseProcessor));
    chgfish.ChgfishProcessor = ChgfishProcessor;
})(chgfish || (chgfish = {}));
//# sourceMappingURL=ChgfishProcessor.js.map