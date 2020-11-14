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
var UIPanelEvent = /** @class */ (function (_super) {
    __extends(UIPanelEvent, _super);
    function UIPanelEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIPanelEvent.DISPOSE_PANEL_EVENT = "dispose_panel_event";
    return UIPanelEvent;
}(BaseEvent));
var UIPanel = /** @class */ (function (_super) {
    __extends(UIPanel, _super);
    function UIPanel() {
        return _super.call(this) || this;
    }
    UIPanel.prototype.onAdd = function () {
        if (this._disposeEventFun) {
            TimeUtil.removeTimeOut(this._disposeEventFun);
        }
    };
    UIPanel.prototype.onRemove = function () {
        var _this = this;
        if (!this._disposeEventFun) {
            this._disposeEventFun = function () {
                var evt = new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT);
                evt.panel = _this;
                ModuleEventManager.dispatchEvent(evt);
            };
        }
        TimeUtil.addTimeOut(500000, this._disposeEventFun);
    };
    return UIPanel;
}(UIConatiner));
//# sourceMappingURL=UIPanel.js.map