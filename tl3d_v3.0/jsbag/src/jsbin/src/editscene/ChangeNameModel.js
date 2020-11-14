var editscene;
(function (editscene) {
    var UIManager = Pan3d.UIManager;
    var MouseType = Pan3d.MouseType;
    var ChangeNameModel = /** @class */ (function () {
        function ChangeNameModel() {
            var _this = this;
            this.onMouseDownFun = function ($evt) { _this.onMouseDown($evt); };
            this.changFun = function (cevt) { _this.changeInputTxt(cevt); };
        }
        ChangeNameModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new ChangeNameModel();
            }
            return this._instance;
        };
        Object.defineProperty(ChangeNameModel.prototype, "chatHtmlInput", {
            get: function () {
                return this._chatHtmlInput;
            },
            set: function (value) {
                console.log("value", value);
                this._chatHtmlInput = value;
            },
            enumerable: true,
            configurable: true
        });
        ChangeNameModel.prototype.setInputTxtPos = function () {
            if (!this.chatHtmlInput) {
                this.chatHtmlInput = document.createElement("input");
                this.chatHtmlInput.style.position = "absolute";
                this.chatHtmlInput.style["z-index"] = 100;
                document.body.appendChild(this.chatHtmlInput);
                //    this.chatHtmlInput.addEventListener("change", this.changFun);
                document.addEventListener(MouseType.MouseDown, this.onMouseDownFun);
            }
        };
        ChangeNameModel.prototype.changeInputTxt = function (evt) {
            if (this.chatHtmlInput) {
                this.changeBfun(this.chatHtmlInput.value);
                win.LayerManager.isHideMouseEvent = false;
                document.removeEventListener(MouseType.MouseDown, this.onMouseDownFun);
                if (this.chatHtmlInput.parentElement) {
                    document.body.removeChild(this.chatHtmlInput);
                }
                this.chatHtmlInput = null;
            }
        };
        ChangeNameModel.prototype.getTextMetrics = function ($str, fontsize) {
            if (fontsize === void 0) { fontsize = 12; }
            var $ctx = UIManager.getInstance().getContext2D(100, 100, false);
            $ctx.font = fontsize + "px serif";
            return $ctx.measureText($str);
        };
        ChangeNameModel.prototype.changeName = function (rect, str, bfun) {
            var _this = this;
            this.changeBfun = bfun;
            this.setInputTxtPos();
            win.LayerManager.isHideMouseEvent = true;
            this.chatHtmlInput.style.left = rect.x + "px";
            this.chatHtmlInput.style.top = rect.y + "px";
            this.chatHtmlInput.style.fontSize = String(12) + "px";
            this.chatHtmlInput.style.width = String(rect.width) + "px";
            this.chatHtmlInput.style.height = String(rect.height) + "px";
            this.chatHtmlInput.value = str;
            setTimeout(function () { _this.chatHtmlInput.focus(); }, 1);
        };
        ChangeNameModel.prototype.onMouseDown = function ($e) {
            if ($e.target != this.chatHtmlInput) {
                this.changeInputTxt(null);
            }
            else {
                console.log("还在");
            }
        };
        return ChangeNameModel;
    }());
    editscene.ChangeNameModel = ChangeNameModel;
})(editscene || (editscene = {}));
//# sourceMappingURL=ChangeNameModel.js.map