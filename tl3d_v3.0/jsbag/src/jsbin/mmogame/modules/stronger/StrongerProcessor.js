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
var stronger;
(function (stronger) {
    var StrongerModule = /** @class */ (function (_super) {
        __extends(StrongerModule, _super);
        function StrongerModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StrongerModule.prototype.getModuleName = function () {
            return "StrongerModule";
        };
        StrongerModule.prototype.listProcessors = function () {
            return [new StrongerProcessor()];
        };
        return StrongerModule;
    }(Module));
    stronger.StrongerModule = StrongerModule;
    var StrongerEvent = /** @class */ (function (_super) {
        __extends(StrongerEvent, _super);
        function StrongerEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //展示面板
        StrongerEvent.SHOW_Stronger_EVENT = "SHOW_Stronger_EVENT";
        //隐藏面板
        StrongerEvent.HIDE_Stronger_EVENT = "HIDE_Stronger_EVENT";
        //选中Tab，打开相对应的面板事件
        StrongerEvent.SELECTTAB_Stronger_EVENT = "SELECTTAB_Stronger_EVENT";
        //刷新list
        StrongerEvent.CHG_Stronger_EVENT = "CHG_Stronger_EVENT";
        return StrongerEvent;
    }(BaseEvent));
    stronger.StrongerEvent = StrongerEvent;
    var StrongerProcessor = /** @class */ (function (_super) {
        __extends(StrongerProcessor, _super);
        function StrongerProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StrongerProcessor.prototype.getName = function () {
            return "WelfareProcessor";
        };
        StrongerProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof StrongerEvent) {
                var $givingUiEvent = $event;
                if ($givingUiEvent.type == StrongerEvent.SHOW_Stronger_EVENT) {
                    this.showUi($givingUiEvent.data);
                }
                else if ($givingUiEvent.type == StrongerEvent.HIDE_Stronger_EVENT) {
                    this.hideUi();
                }
                else if ($givingUiEvent.type == StrongerEvent.CHG_Stronger_EVENT) {
                    if (this._strongerUiPanel && this._strongerUiPanel.strongerList && this._strongerUiPanel.strongerList.hasStage) {
                        this._strongerUiPanel.strongerList.refreshItem();
                    }
                }
                else if ($givingUiEvent.type == StrongerEvent.SELECTTAB_Stronger_EVENT) {
                    this.selecttabpanel($givingUiEvent.data);
                }
            }
            if ($event instanceof EngineEvent) {
                var $engineEvent = $event;
                if ($engineEvent.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                    //升级监听
                    this.receivelevelreward();
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._strongerUiPanel) {
                    this._strongerUiPanel.dispose();
                    this._strongerUiPanel = null;
                    //console.log("释放面板 _strongerUiPanel")
                }
            }
        };
        StrongerProcessor.prototype.receivelevelreward = function () {
            // if (this._strongerUiPanel && this._strongerUiPanel.welfareLevel && this._strongerUiPanel.welfareLevel.hasStage) {
            //     this._welfareUiPanel.welfareLevel.resetData();
            //     this._welfareUiPanel.welfareTabList.refreshDataByNewData();
            // }
        };
        StrongerProcessor.prototype.selecttabpanel = function ($data) {
            if (this._strongerUiPanel && this._strongerUiPanel.hasStage) {
                this._strongerUiPanel.showStrongerList($data);
            }
        };
        StrongerProcessor.prototype.hideUi = function () {
            this._strongerUiPanel.hide();
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
        };
        StrongerProcessor.prototype.showUi = function ($type) {
            var _this = this;
            if (!this._strongerUiPanel) {
                this._strongerUiPanel = new stronger.StrongerUiPanel();
            }
            this._strongerUiPanel.load(function () {
                //停止绘制前面的ui
                SceneManager.getInstance().render = false;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
                _this._strongerUiPanel.show($type);
            });
        };
        StrongerProcessor.prototype.listenModuleEvents = function () {
            return [
                new StrongerEvent(StrongerEvent.SHOW_Stronger_EVENT),
                new StrongerEvent(StrongerEvent.HIDE_Stronger_EVENT),
                new StrongerEvent(StrongerEvent.SELECTTAB_Stronger_EVENT),
                new StrongerEvent(StrongerEvent.CHG_Stronger_EVENT),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        return StrongerProcessor;
    }(BaseProcessor));
    stronger.StrongerProcessor = StrongerProcessor;
})(stronger || (stronger = {}));
//# sourceMappingURL=StrongerProcessor.js.map