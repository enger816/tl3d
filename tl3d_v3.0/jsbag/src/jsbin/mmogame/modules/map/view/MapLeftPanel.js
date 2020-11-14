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
var map;
(function (map) {
    var MapLeftPanel = /** @class */ (function (_super) {
        __extends(MapLeftPanel, _super);
        function MapLeftPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        MapLeftPanel.prototype.setRender = function ($bottom, $top) {
            this._bottomRender = $bottom;
            this._topRender = $top;
            this.loadConfigCom();
        };
        MapLeftPanel.prototype.loadConfigCom = function () {
            var renderLevel = this._topRender;
            this.a_tab_0 = this.addEvntBut("a_tab_0", this._topRender);
            this.a_tab_1 = this.addEvntBut("a_tab_1", this._topRender);
            this.addUIList(["a_red_line_0", "a_red_line_1"], this._topRender);
        };
        MapLeftPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_tab_0:
                    this.parent.setTabType(0);
                    break;
                case this.a_tab_1:
                    this.parent.setTabType(1);
                    break;
                default:
                    break;
            }
        };
        MapLeftPanel.prototype.setTabType = function (value) {
            if (value == 0) {
                this.a_tab_0.enable = false;
                this.a_tab_0.selected = true;
                this.a_tab_1.enable = true;
                this.a_tab_1.selected = false;
            }
            else {
                this.a_tab_0.enable = true;
                this.a_tab_0.selected = false;
                this.a_tab_1.enable = false;
                this.a_tab_1.selected = true;
            }
        };
        return MapLeftPanel;
    }(UIVirtualContainer));
    map.MapLeftPanel = MapLeftPanel;
})(map || (map = {}));
//# sourceMappingURL=MapLeftPanel.js.map