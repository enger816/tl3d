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
var InputPanel = /** @class */ (function (_super) {
    __extends(InputPanel, _super);
    function InputPanel() {
        var _this = _super.call(this) || this;
        _this.textureRect = new Rectangle(0, 0, 256, 256);
        _this.lastVerticalState = false;
        _this.uiAtlasComplet = false;
        _this.layer = 10000;
        _this._bottomRender = new UIRenderComponent();
        _this.addRender(_this._bottomRender);
        _this._midRender = new UIRenderComponent();
        _this.addRender(_this._midRender);
        _this._topRender = new UIRenderComponent();
        _this.addRender(_this._topRender);
        //this.makePanelUi();
        GameData.getPublicUiAtlas(function ($uiAtlas) { _this.makePanelUi($uiAtlas); });
        return _this;
    }
    InputPanel.prototype.makePanelUi = function ($uiAtlas) {
        this._bottomRender.uiAtlas = $uiAtlas;
        this._midRender.uiAtlas = $uiAtlas;
        this._topRender.uiAtlas = $uiAtlas;
        this.winBg = this.addEvntBut("bg_black", this._bottomRender);
        this.winBg.addEventListener(InteractiveEvent.Up, this.butClik, this);
        this.guiBg = this.addEvntButUp("input_bg", this._midRender);
        this.buta = this.addEvntButUp("input_a0", this._midRender);
        this.butb = this.addEvntButUp("input_a1", this._midRender);
        this.winBg.x = 0;
        this.winBg.y = 0;
        this.uiAtlasComplet = true;
        this.resize();
    };
    InputPanel.prototype.initData = function ($bfun, $msg) {
        this.width = UIData.designWidth;
        this.height = UIData.designHeight;
        this.top = 0;
        this.left = 0;
        this.bFun = $bfun;
        this.lastVerticalState = Engine.needVertical;
        Engine.needVertical = false;
        Engine.resetSize();
        this.setHtmlInputVisible(true);
        this.chatHtmlInput.value = $msg;
    };
    InputPanel.prototype.setInputTxtPos = function () {
        if (!this.chatHtmlInput) {
            this.chatHtmlInput = document.createElement("textarea");
            //     this.chatHtmlInput.type = "text";
            this.chatHtmlInput.style.position = "absolute";
            this.chatHtmlInput.style["z-index"] = 100;
            this.chatHtmlInput.style.background = "transparent";
            this.chatHtmlInput.style.color = "#40120a";
            document.body.appendChild(this.chatHtmlInput);
            //ColorType.Brown40120a
        }
        this.chatHtmlInput.style.left = "10px";
        var tx = 0;
        var ty = 0;
        var tw = Scene_data.stageWidth - 20;
        var th = 280;
        var textSize = 100;
        if (Scene_data.isPc) {
            this.chatHtmlInput.style.fontSize = String(Math.floor(textSize * 0.9)) + "px";
        }
        else {
            this.chatHtmlInput.style.fontSize = String(Math.floor(textSize * 0.5)) + "px";
        }
        this.chatHtmlInput.style.width = String(tw) + "px";
        this.chatHtmlInput.style.height = String(th) + "px";
    };
    InputPanel.prototype.setHtmlInputVisible = function (value) {
        if (value) {
            this.setInputTxtPos();
        }
        else {
            if (this.chatHtmlInput && this.chatHtmlInput.parentElement) {
                this.chatHtmlInput.style.left = "9000px";
            }
        }
    };
    InputPanel.prototype.resize = function () {
        if (this.uiAtlasComplet) {
            this.winBg.width = Scene_data.stageWidth / UIData.Scale;
            this.winBg.height = Scene_data.stageHeight / UIData.Scale;
            this.setHtmlInputVisible(true);
            this.buta.y = 350 / UIData.Scale;
            this.buta.x = Scene_data.stageWidth / 3 / UIData.Scale - this.buta.width / 2;
            this.butb.y = 350 / UIData.Scale;
            this.butb.x = Scene_data.stageWidth / 3 / UIData.Scale * 2 - this.buta.width / 2;
            this.guiBg.x = 0;
            this.guiBg.y = 0;
            this.guiBg.width = Scene_data.stageWidth / UIData.Scale - 0;
            this.guiBg.height = 300 / UIData.Scale - 10;
            this._bottomRender.applyObjData();
            this._midRender.applyObjData();
            this._topRender.applyObjData();
        }
        _super.prototype.resize.call(this);
    };
    InputPanel.prototype.resetsize = function (d) {
        this._topRender.applyObjData();
        this._midRender.applyObjData();
    };
    InputPanel.prototype.butClik = function (evt) {
        switch (evt.target) {
            case this.butb:
                this.bFun(this.chatHtmlInput.value);
                this.close();
                break;
            case this.buta:
                this.close();
                break;
            default:
                break;
        }
    };
    InputPanel.prototype.onRemove = function () {
        if (this.chatHtmlInput) {
            console.log("清除input");
            this.chatHtmlInput.style.left = "9999px";
        }
    };
    InputPanel.prototype.close = function () {
        this.setHtmlInputVisible(false);
        UIManager.getInstance().removeUIContainer(this);
        Engine.needVertical = this.lastVerticalState;
        Engine.resetSize();
    };
    /**
     * $type:0 任何字符  1：纯数字 2：纯文本
     * $lengths：字符串长度
     */
    InputPanel.show = function ($bfun, $msg, $type, $lengths) {
        if ($type === void 0) { $type = 0; }
        if ($lengths === void 0) { $lengths = 100; }
        if (!this.inputPanel) {
            this.inputPanel = new InputPanel();
        }
        this.inputPanel.initData($bfun, $msg);
        UIManager.getInstance().addUIContainer(this.inputPanel);
        return this.inputPanel;
    };
    InputPanel.hasPanel = function () {
        if (this.inputPanel && this.inputPanel.hasStage) {
            return true;
        }
        else {
            return false;
        }
    };
    return InputPanel;
}(UIConatiner));
//# sourceMappingURL=InputPanel.js.map