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
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var MouseType = Pan3d.MouseType;
    var InputTextUi = /** @class */ (function (_super) {
        __extends(InputTextUi, _super);
        function InputTextUi(w, h) {
            if (w === void 0) { w = 64; }
            if (h === void 0) { h = 64; }
            var _this = _super.call(this, w, h) || this;
            _this.onHtmlInputMouseDownFun = function ($evt) { _this.onHtmlInputMouseDown($evt); };
            return _this;
        }
        InputTextUi.prototype.onHtmlInputMouseDown = function ($e) {
            if ($e.target != this.chatHtmlInput) {
                if (this.chatHtmlInput) {
                    this.chatHtmlInput.hidden = true;
                }
                document.removeEventListener(MouseType.MouseDown, this.onHtmlInputMouseDownFun);
            }
        };
        InputTextUi.prototype.initView = function () {
            this.setInputTxtPos();
            this.addEvets();
        };
        InputTextUi.prototype.destory = function () {
            if (this.chatHtmlInput) {
                document.body.removeChild(this.chatHtmlInput);
                this.chatHtmlInput = null;
            }
            _super.prototype.destory.call(this);
        };
        InputTextUi.prototype.setInputTxtPos = function () {
            var _this = this;
            if (!this.chatHtmlInput) {
                this.chatHtmlInput = document.createElement("input");
                this.chatHtmlInput.style.position = "absolute";
                this.chatHtmlInput.style["z-index"] = 100;
                //this.chatHtmlInput.style.background = "transparent"
                this.chatHtmlInput.style.color = "#000000";
                document.body.appendChild(this.chatHtmlInput);
                this.chatHtmlInput.addEventListener("change", function (cevt) { _this.changeInputTxt(cevt); });
            }
            this.chatHtmlInput.style.left = 0 + "px";
            this.chatHtmlInput.style.top = 0 + "px";
            var tw = 40;
            var th = 20;
            this.chatHtmlInput.style.fontSize = String(12) + "px";
            this.chatHtmlInput.style.width = String(tw) + "px";
            this.chatHtmlInput.style.height = String(th) + "px";
            this.chatHtmlInput.value = "99.99";
            this.chatHtmlInput.hidden = true;
        };
        InputTextUi.prototype.changeInputTxt = function (evt) {
            var $agalStr = this.chatHtmlInput.value;
            var $reflectionEvet = new prop.ReflectionEvet(prop.ReflectionEvet.CHANGE_DATA);
            $reflectionEvet.data = $agalStr;
            this.dispatchEvent($reflectionEvet);
        };
        InputTextUi.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this.chatHtmlInput.style.left = (this.textureContext.left + this.x - 10) + "px";
            this.chatHtmlInput.style.top = (this.textureContext.top + this.y - 5) + "px";
        };
        Object.defineProperty(InputTextUi.prototype, "visible", {
            set: function (value) {
                //this.chatHtmlInput.hidden = !value
                //this.chatHtmlInput.hidden = true
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InputTextUi.prototype, "text", {
            set: function (value) {
                LabelTextFont.writeSingleLabel(this.ui.uiRender.uiAtlas, this.ui.skinName, value, 26, TextAlign.LEFT, "#ffffff", "#27262e");
                this.chatHtmlInput.value = value;
            },
            enumerable: true,
            configurable: true
        });
        InputTextUi.prototype.butClik = function (evt) {
            var _this = this;
            if (this.chatHtmlInput.hidden) {
                // console.log("添加事件")
                this.chatHtmlInput.hidden = false;
                setTimeout(function () { _this.chatHtmlInput.focus(); }, 1);
                document.addEventListener(MouseType.MouseDown, this.onHtmlInputMouseDownFun);
            }
        };
        return InputTextUi;
    }(prop.TextLabelUI));
    prop.InputTextUi = InputTextUi;
})(prop || (prop = {}));
//# sourceMappingURL=InputTextUi.js.map