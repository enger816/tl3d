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
var kuafu;
(function (kuafu) {
    var KuaFu1v1Event = /** @class */ (function (_super) {
        __extends(KuaFu1v1Event, _super);
        function KuaFu1v1Event() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KuaFu1v1Event.SHOW_1V1_LOG_PANEL = "SHOW_1V1_LOG_PANEL";
        KuaFu1v1Event.SHOW_1V1_SCENE_PANEL = "SHOW_1V1_SCENE_PANEL";
        KuaFu1v1Event.SHOW_1V1_END_PANEL = "SHOW_1V1_END_PANEL";
        return KuaFu1v1Event;
    }(BaseEvent));
    kuafu.KuaFu1v1Event = KuaFu1v1Event;
    var KuaFu1v1Processor = /** @class */ (function (_super) {
        __extends(KuaFu1v1Processor, _super);
        function KuaFu1v1Processor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KuaFu1v1Processor.prototype.getName = function () {
            return "KuaFu1v1Processor";
        };
        KuaFu1v1Processor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof KuaFu1v1Event) {
                var $kuaFu1v1Event = $event;
                if ($kuaFu1v1Event.type == KuaFu1v1Event.SHOW_1V1_LOG_PANEL) {
                    //this.showKuafu1v1LogPanel();
                }
                if ($kuaFu1v1Event.type == KuaFu1v1Event.SHOW_1V1_SCENE_PANEL) {
                    this.showKuafu1v1SceneTopPanel();
                }
                if ($kuaFu1v1Event.type == KuaFu1v1Event.SHOW_1V1_END_PANEL) {
                    //     this.showKuafu1V1EndPanel();
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                // if(panelEvent.panel == this._kuafu1V1EndPanel){
                //     this._kuafu1V1EndPanel.dispose();
                //     this._kuafu1V1EndPanel = null;
                //     //console.log("释放面板 _kuafu1V1EndPanel")
                // }
                // if(panelEvent.panel == this._kuafu1v1LogPanel){
                //     this._kuafu1v1LogPanel.dispose();
                //     this._kuafu1v1LogPanel = null;
                //     //console.log("释放面板 _kuafu1v1LogPanel")
                // }
                if (panelEvent.panel == this._kuafu1v1SceneTopPanel) {
                    this._kuafu1v1SceneTopPanel.dispose();
                    this._kuafu1v1SceneTopPanel = null;
                    //console.log("释放面板 _kuafu1v1SceneTopPanel")
                }
            }
        };
        KuaFu1v1Processor.prototype.showKuafu1v1SceneTopPanel = function () {
            var _this = this;
            if (!this._kuafu1v1SceneTopPanel) {
                this._kuafu1v1SceneTopPanel = new kuafu.Kuafu1v1SceneTopPanel();
            }
            this._kuafu1v1SceneTopPanel.load(function () {
                _this._kuafu1v1SceneTopPanel.show();
            }, false);
        };
        KuaFu1v1Processor.prototype.listenModuleEvents = function () {
            return [
                new KuaFu1v1Event(KuaFu1v1Event.SHOW_1V1_LOG_PANEL),
                new KuaFu1v1Event(KuaFu1v1Event.SHOW_1V1_SCENE_PANEL),
                new KuaFu1v1Event(KuaFu1v1Event.SHOW_1V1_END_PANEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        return KuaFu1v1Processor;
    }(BaseProcessor));
    kuafu.KuaFu1v1Processor = KuaFu1v1Processor;
})(kuafu || (kuafu = {}));
//# sourceMappingURL=KuaFu1v1Processor.js.map