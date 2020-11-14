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
var prop;
(function (prop) {
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var ComboBoxUi = /** @class */ (function (_super) {
        __extends(ComboBoxUi, _super);
        function ComboBoxUi(w, h) {
            if (w === void 0) { w = 128; }
            if (h === void 0) { h = 30; }
            return _super.call(this, w, h) || this;
        }
        ComboBoxUi.prototype.initView = function () {
            this.ui.addEventListener(InteractiveEvent.Down, this.butClik, this);
        };
        ComboBoxUi.prototype.destory = function () {
            this.ui.removeEventListener(InteractiveEvent.Down, this.butClik, this);
            _super.prototype.destory.call(this);
        };
        Object.defineProperty(ComboBoxUi.prototype, "text", {
            set: function (value) {
                LabelTextFont.writeSingleLabel(this.ui.uiRender.uiAtlas, this.ui.skinName, value, 26, TextAlign.LEFT, "#ffffff", "#27262e");
            },
            enumerable: true,
            configurable: true
        });
        ComboBoxUi.prototype.butClik = function (evt) {
            this.dispatchEvent(evt);
        };
        return ComboBoxUi;
    }(prop.TextLabelUI));
    prop.ComboBoxUi = ComboBoxUi;
})(prop || (prop = {}));
//# sourceMappingURL=ComboBoxUi.js.map