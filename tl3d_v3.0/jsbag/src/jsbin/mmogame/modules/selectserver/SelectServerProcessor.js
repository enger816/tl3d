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
var selectserver;
(function (selectserver) {
    var SelectServerModule = /** @class */ (function (_super) {
        __extends(SelectServerModule, _super);
        function SelectServerModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SelectServerModule.prototype.getModuleName = function () {
            return "SelectServerModule";
        };
        SelectServerModule.prototype.listProcessors = function () {
            return [new SelectServerProcessor()];
        };
        return SelectServerModule;
    }(Module));
    selectserver.SelectServerModule = SelectServerModule;
    var SelectServerEvent = /** @class */ (function (_super) {
        __extends(SelectServerEvent, _super);
        function SelectServerEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //选中一级标签页
        SelectServerEvent.SELECT_TAB_EVENT = "SELECT_TAB_EVENT";
        //展示进入游戏面板
        SelectServerEvent.SHOW_JOINGAME_EVENT = "SHOW_JOINGAME_EVENT";
        //隐藏进入游戏面板
        SelectServerEvent.HIDE_JOINGAME_EVENT = "HIDE_JOINGAME_EVENT";
        //展示选服面板
        SelectServerEvent.OPEN_SELECTSERVER_EVENT = "OPEN_SELECTSERVER_EVENT";
        //隐藏选服面板
        SelectServerEvent.HIDE_SELECTSERVER_EVENT = "HIDE_SELECTSERVER_EVENT";
        //展示公告面板
        SelectServerEvent.OPEN_GG_EVENT = "OPEN_GG_EVENT";
        //隐藏公告面板
        SelectServerEvent.HIDE_GG_EVENT = "HIDE_GG_EVENT";
        return SelectServerEvent;
    }(BaseEvent));
    selectserver.SelectServerEvent = SelectServerEvent;
    var SelectServerProcessor = /** @class */ (function (_super) {
        __extends(SelectServerProcessor, _super);
        function SelectServerProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SelectServerProcessor.prototype.getName = function () {
            return "SelectServerProcessor";
        };
        SelectServerProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof SelectServerEvent) {
                var $givingUiEvent = $event;
                if ($givingUiEvent.type == SelectServerEvent.OPEN_SELECTSERVER_EVENT) {
                    this.showUiss();
                }
                else if ($givingUiEvent.type == SelectServerEvent.HIDE_SELECTSERVER_EVENT) {
                    this.hideUiss();
                }
                else if ($givingUiEvent.type == SelectServerEvent.OPEN_GG_EVENT) {
                    this.showUigg();
                }
                else if ($givingUiEvent.type == SelectServerEvent.HIDE_GG_EVENT) {
                    this.hideUigg();
                }
                else if ($givingUiEvent.type == SelectServerEvent.SELECT_TAB_EVENT) {
                    this.selecttab($givingUiEvent.data);
                }
                else if ($givingUiEvent.type == SelectServerEvent.SHOW_JOINGAME_EVENT) {
                    this.showjoingameUi();
                }
                else if ($givingUiEvent.type == SelectServerEvent.HIDE_JOINGAME_EVENT) {
                    this.hidejoingameUi();
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._selectServerUiPanel) {
                    this._selectServerUiPanel.dispose();
                    this._selectServerUiPanel = null;
                    //console.log("释放面板 _selectServerUiPanel")
                }
                if (panelEvent.panel == this._joinGameUiPanel) {
                    this._joinGameUiPanel.dispose();
                    this._joinGameUiPanel = null;
                    //console.log("释放面板 _joinGameUiPanel")
                }
            }
        };
        SelectServerProcessor.prototype.selecttab = function ($data) {
            if (this._selectServerUiPanel && this._selectServerUiPanel.ssxuanfu && this._selectServerUiPanel.ssxuanfu.hasStage) {
                this._selectServerUiPanel.ssxuanfu.refreshData($data);
            }
        };
        SelectServerProcessor.prototype.hideUiss = function () {
            if (this._selectServerUiPanel) {
                this._selectServerUiPanel.hidess();
            }
        };
        SelectServerProcessor.prototype.showUiss = function () {
            var _this = this;
            if (!this._selectServerUiPanel) {
                this._selectServerUiPanel = new selectserver.SelectServerUiPanel();
            }
            this._selectServerUiPanel.load(function () {
                //停止绘制前面的ui
                _this._selectServerUiPanel.showss();
            });
        };
        SelectServerProcessor.prototype.hideUigg = function () {
            if (this._selectServerUiPanel) {
                this._selectServerUiPanel.hidegg();
            }
        };
        SelectServerProcessor.prototype.showUigg = function () {
            var _this = this;
            if (!this._selectServerUiPanel) {
                this._selectServerUiPanel = new selectserver.SelectServerUiPanel();
            }
            this._selectServerUiPanel.load(function () {
                //停止绘制前面的ui
                _this._selectServerUiPanel.showgg();
            });
        };
        SelectServerProcessor.prototype.hidejoingameUi = function () {
            // this._selectServerUiPanel.hide();
            // this._selectServerUiPanel.hidegg();
            if (this._joinGameUiPanel) {
                this._joinGameUiPanel.hide();
            }
        };
        SelectServerProcessor.prototype.showjoingameUi = function () {
            var _this = this;
            if (!this._joinGameUiPanel) {
                this._joinGameUiPanel = new selectserver.JoinGameUiPanel();
            }
            this._joinGameUiPanel.load(function () {
                //停止绘制前面的ui
                _this._joinGameUiPanel.show();
            });
        };
        SelectServerProcessor.prototype.listenModuleEvents = function () {
            return [
                new SelectServerEvent(SelectServerEvent.OPEN_SELECTSERVER_EVENT),
                new SelectServerEvent(SelectServerEvent.HIDE_SELECTSERVER_EVENT),
                new SelectServerEvent(SelectServerEvent.OPEN_GG_EVENT),
                new SelectServerEvent(SelectServerEvent.HIDE_GG_EVENT),
                new SelectServerEvent(SelectServerEvent.SELECT_TAB_EVENT),
                new SelectServerEvent(SelectServerEvent.SHOW_JOINGAME_EVENT),
                new SelectServerEvent(SelectServerEvent.HIDE_JOINGAME_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        return SelectServerProcessor;
    }(BaseProcessor));
    selectserver.SelectServerProcessor = SelectServerProcessor;
})(selectserver || (selectserver = {}));
//# sourceMappingURL=SelectServerProcessor.js.map