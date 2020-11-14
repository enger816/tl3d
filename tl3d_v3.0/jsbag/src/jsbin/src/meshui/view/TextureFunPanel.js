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
    var Scene_data = Pan3d.Scene_data;
    var TextureFunPanel = /** @class */ (function (_super) {
        __extends(TextureFunPanel, _super);
        function TextureFunPanel() {
            var _this = _super.call(this) || this;
            _this.layaPanel = new win.Panel();
            win.LayerManager.getInstance().addPanel(_this.layaPanel, 501);
            _this.setRect(new Pan3d.Rectangle(100, 100, 500, 400));
            return _this;
        }
        TextureFunPanel.prototype.loadConfigCom = function () {
            _super.prototype.loadConfigCom.call(this);
            this.e_pop_panel = this.addChild(this._closeRender.getComponent("e_pop_panel"));
            this.c_tittle_bg.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.resize();
        };
        TextureFunPanel.prototype.tittleMouseDown = function (evt) {
            this.mouseMoveTaget = evt.target;
            this.lastMousePos = new Vector2D(evt.x, evt.y);
            switch (this.mouseMoveTaget) {
                case this.c_tittle_bg:
                    this.lastPagePos = new Vector2D(this.left, this.top);
                    break;
                default:
                    console.log("nonono");
                    break;
            }
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        };
        TextureFunPanel.prototype.mouseOnTittleMove = function (evt) {
            switch (this.mouseMoveTaget) {
                case this.c_tittle_bg:
                    this.left = this.lastPagePos.x + (evt.x - this.lastMousePos.x);
                    this.top = this.lastPagePos.y + (evt.y - this.lastMousePos.y);
                    this.pageRect.x = this.left;
                    this.pageRect.y = this.top;
                    break;
                default:
                    break;
            }
            this.resize();
        };
        TextureFunPanel.prototype.setInputTxtPos = function () {
            var _this = this;
            if (!this.chatHtmlInput) {
                this.chatHtmlInput = document.createElement("textarea");
                this.chatHtmlInput.style.position = "absolute";
                this.chatHtmlInput.style["z-index"] = 100;
                this.chatHtmlInput.style.background = "transparent";
                this.chatHtmlInput.style.color = "#ffffff";
                document.body.appendChild(this.chatHtmlInput);
                this.chatHtmlInput.addEventListener("change", function (cevt) { _this.changeFile(cevt); });
                //this.chatHtmlInput.style.resize = (cevt: any) => { this.changeInputResize(cevt) };
                this.chatHtmlInput.style.resize = "none";
            }
            this.chatHtmlInput.style.left = 0 + "px";
            this.chatHtmlInput.style.top = 0 + "px";
            var tw = 350;
            var th = 40;
            this.chatHtmlInput.style.fontSize = String(12) + "px";
            this.chatHtmlInput.style.width = String(tw) + "px";
            this.chatHtmlInput.style.height = String(th) + "px";
            this.chatHtmlInput.value = this.mathFunNodeUI.nodeTree.funStr;
            this.resize();
        };
        TextureFunPanel.prototype.butClik = function (evt) {
            if (evt.target == this.b_win_close) {
                this.hidePanel();
            }
        };
        TextureFunPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.e_pop_panel && this.chatHtmlInput) {
                this.chatHtmlInput.style.left = this.left + 5 + "px";
                this.chatHtmlInput.style.top = this.top + 25 + "px";
                this.chatHtmlInput.style.width = this.pageRect.width - 8 + "px";
                this.chatHtmlInput.style.height = this.pageRect.height - 30 + "px";
                this.e_pop_panel.x = 0;
                this.e_pop_panel.y = 0;
                this.e_pop_panel.width = this.pageRect.width;
                this.e_pop_panel.height = this.pageRect.height;
                this._closeRender.applyObjData();
            }
        };
        TextureFunPanel.prototype.changeInputResize = function (evt) {
            console.log(evt);
        };
        TextureFunPanel.prototype.changeFile = function (evt) {
            var $agalStr = this.chatHtmlInput.value;
            if (materialui.NodeTreeFun.isNeedChangePanel($agalStr, this.mathFunNodeUI.nodeTree.funStr)) {
                this.mathFunNodeUI.inPutFunStr($agalStr);
            }
            else {
                this.mathFunNodeUI.nodeTree.funStr = $agalStr;
                this.changeData();
            }
        };
        TextureFunPanel.prototype.changeData = function () {
            Pan3d.ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
        };
        TextureFunPanel.getInstance = function () {
            if (!this._instance) {
                this._instance = new TextureFunPanel();
            }
            return this._instance;
        };
        TextureFunPanel.prototype.showPanel = function (value) {
            this.mathFunNodeUI = value;
            this.layaPanel.addUIContainer(this);
            this.setInputTxtPos();
        };
        TextureFunPanel.prototype.hidePanel = function () {
            var _this = this;
            if (this.chatHtmlInput) {
                this.chatHtmlInput.removeEventListener("change", function (cevt) { _this.changeFile(cevt); });
                document.body.removeChild(this.chatHtmlInput);
                this.chatHtmlInput = null;
            }
            this.layaPanel.removeUIContainer(this);
        };
        return TextureFunPanel;
    }(win.BaseWindow));
    prop.TextureFunPanel = TextureFunPanel;
})(prop || (prop = {}));
//# sourceMappingURL=TextureFunPanel.js.map