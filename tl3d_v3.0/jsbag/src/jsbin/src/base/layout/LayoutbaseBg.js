var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var win;
(function (win) {
    var LayoutbaseBg = /** @class */ (function (_super) {
        __extends(LayoutbaseBg, _super);
        function LayoutbaseBg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LayoutbaseBg.prototype.loadConfigCom = function () {
            _super.prototype.loadConfigCom.call(this);
            this.setUiListVisibleByItem([this.a_scroll_bar, this.a_scroll_bar_bg], false);
            this.setUiListVisibleByItem([this.e_panel_1], false);
        };
        return LayoutbaseBg;
    }(win.BaseWindow));
    win.LayoutbaseBg = LayoutbaseBg;
})(win || (win = {}));
//# sourceMappingURL=LayoutbaseBg.js.map