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
var minmap;
(function (minmap) {
    var MinMapModule = /** @class */ (function (_super) {
        __extends(MinMapModule, _super);
        function MinMapModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MinMapModule.prototype.getModuleName = function () {
            return "MinMapModule";
        };
        MinMapModule.prototype.listProcessors = function () {
            return [new MinMapProcessor()];
        };
        return MinMapModule;
    }(Module));
    minmap.MinMapModule = MinMapModule;
    var MinMapProcessor = /** @class */ (function (_super) {
        __extends(MinMapProcessor, _super);
        function MinMapProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MinMapProcessor.prototype.getName = function () {
            return "MapProcessor";
        };
        MinMapProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof EngineEvent) {
                var $comandEvent = $event;
                if ($comandEvent.type == EngineEvent.ENTER_SCENE_EVENT) {
                    // if (GuidData.map.showAreaById(AreaType.toprightmap_4)) {  
                    this.showUi();
                    this._mapPanel.refresh();
                }
            }
            if ($event instanceof mainUi.MainUiEvent) {
                var $mainUIEvent = $event;
                if ($mainUIEvent.type == mainUi.MainUiEvent.SHOW_MAINUI_EVENT) {
                    this.showUi();
                }
                else if ($mainUIEvent.type == mainUi.MainUiEvent.HIDE_MAINUI_EVENT) {
                    this.hideUi();
                }
            }
        };
        MinMapProcessor.prototype.showUi = function () {
            if (!this._mapPanel) {
                this._mapPanel = new minmap.MinMapPanel();
            }
            if (GuidData.map.showAreaById(AreaType.toprightmap_4)) {
                UIManager.getInstance().addUIContainer(this._mapPanel);
            }
        };
        MinMapProcessor.prototype.hideUi = function () {
            if (this._mapPanel) {
                UIManager.getInstance().removeUIContainer(this._mapPanel);
            }
        };
        MinMapProcessor.prototype.listenModuleEvents = function () {
            return [
                new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT),
                new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT),
                new EngineEvent(EngineEvent.ENTER_SCENE_EVENT),
            ];
        };
        return MinMapProcessor;
    }(BaseProcessor));
    minmap.MinMapProcessor = MinMapProcessor;
})(minmap || (minmap = {}));
//# sourceMappingURL=MinMapProcessor.js.map