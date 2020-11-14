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
var Pan3d;
(function (Pan3d) {
    var UIVirtualContainer = /** @class */ (function (_super) {
        __extends(UIVirtualContainer, _super);
        function UIVirtualContainer() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.visible = true;
            return _this;
        }
        return UIVirtualContainer;
    }(Pan3d.UIConatiner));
    Pan3d.UIVirtualContainer = UIVirtualContainer;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=UIVirtualContainer.js.map