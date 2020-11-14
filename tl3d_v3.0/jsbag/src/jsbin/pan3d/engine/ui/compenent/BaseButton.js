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
    var BaseButton = /** @class */ (function (_super) {
        __extends(BaseButton, _super);
        function BaseButton() {
            var _this = _super.call(this) || this;
            _this.trDown = new Pan3d.Rectangle;
            _this._state = 0;
            _this._currentState = 0;
            return _this;
        }
        BaseButton.prototype.update = function () {
            if (this._currentState != this._state) {
                this.applyRenderSize();
                this._currentState = this._state;
            }
        };
        BaseButton.prototype.applyRenderSize = function () {
            _super.prototype.applyRenderSize.call(this);
            if (this._state == 0) {
                this.renderData2[0] = this.tr.width;
                this.renderData2[1] = this.tr.height;
                this.renderData2[2] = this.tr.x;
                this.renderData2[3] = this.tr.y;
            }
            else if (this._state == 1) {
                this.renderData2[0] = this.trDown.width;
                this.renderData2[1] = this.trDown.height;
                this.renderData2[2] = this.trDown.x;
                this.renderData2[3] = this.trDown.y;
            }
            this.uiRender.makeRenderDataVc(this.vcId);
        };
        return BaseButton;
    }(Pan3d.UICompenent));
    Pan3d.BaseButton = BaseButton;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=BaseButton.js.map