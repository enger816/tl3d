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
var editscene;
(function (editscene) {
    var Panel = win.Panel;
    var EditLeftPanel = /** @class */ (function (_super) {
        __extends(EditLeftPanel, _super);
        function EditLeftPanel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EditLeftPanel.prototype.addUIContainer = function ($container) {
            if ($container["only"]) { //唯一标记
                this.removeNeedRemove();
            }
            _super.prototype.addUIContainer.call(this, $container);
            if ($container["propPanle"]) { //特殊添加组件面板
                this.addChild($container["propPanle"]);
            }
        };
        EditLeftPanel.prototype.removeNeedRemove = function () {
            for (var i = (this._containerList.length - 1); i >= 0; i--) {
                if (this._containerList[i]["only"]) { //标记需要移除，不能同时存在的面板
                    this.removeUIContainer(this._containerList[i]);
                }
            }
        };
        EditLeftPanel.prototype.removeUIContainer = function ($container) {
            if ($container["propPanle"]) { //特殊添加组件面板
                this.removeChild($container["propPanle"]);
            }
            _super.prototype.removeUIContainer.call(this, $container);
        };
        EditLeftPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].resize();
            }
        };
        return EditLeftPanel;
    }(Panel));
    editscene.EditLeftPanel = EditLeftPanel;
})(editscene || (editscene = {}));
//# sourceMappingURL=EditLeftPanel.js.map