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
var AlertUtil = /** @class */ (function (_super) {
    __extends(AlertUtil, _super);
    function AlertUtil() {
        var _this = _super.call(this) || this;
        _this.width = UIData.designWidth;
        _this.height = UIData.designHeight;
        _this.center = 0;
        _this.middle = 0;
        _this._bgRender = new UIRenderComponent;
        _this.addRender(_this._bgRender);
        _this._bottomRender = new UIRenderComponent;
        _this.addRender(_this._bottomRender);
        _this._midRender = new UIRenderComponent;
        _this.addRender(_this._midRender);
        _this._topRender = new UIRenderComponent;
        _this.addRender(_this._topRender);
        _this._topRender.setInfo("ui/uidata/alert/alert.xml", "ui/uidata/alert/alert.png", function () { _this.loadConfigCom(); });
        return _this;
    }
    AlertUtil.prototype.loadConfigCom = function () {
        this._bgRender.uiAtlas = this._topRender.uiAtlas;
        this._bottomRender.uiAtlas = this._topRender.uiAtlas;
        this._midRender.uiAtlas = this._topRender.uiAtlas;
        var a_round0 = this.addChild(this._topRender.getComponent("a_round0"));
        a_round0.isU = true;
        a_round0.isV = true;
        var a_round1 = this.addChild(this._topRender.getComponent("a_round1"));
        a_round1.isV = true;
        var a_round2 = this.addChild(this._topRender.getComponent("a_round2"));
        a_round2.isU = true;
        var a_round3 = this.addChild(this._topRender.getComponent("a_round3"));
        this.a_basebg = this.addChild(this._bgRender.getComponent("a_basebg")); //this.addEvntButUp("a_basebg", this._bottomRender);
        this.a_basebg.addEventListener(InteractiveEvent.Down, function () { }, this);
        this.a_basebg.addEventListener(InteractiveEvent.Up, function () { }, this);
        this.addChild(this._bottomRender.getComponent("a_bg"));
        // a_bg.addEventListener(InteractiveEvent.Down, () => { }, this);
        // a_bg.addEventListener(InteractiveEvent.Up, () => { }, this);
        this.addChild(this._midRender.getComponent("a_tittle_bg"));
        this.a_context = this.addChild(this._topRender.getComponent("a_context"));
        this.btnname0 = this.addChild(this._topRender.getComponent("btnname0"));
        this.btnname1 = this.addChild(this._topRender.getComponent("btnname1"));
        this.b_close = this.addEvntButUp("b_close", this._topRender);
        this.a_confirm = this.addEvntButUp("a_confirm", this._midRender);
        this.a_cancel = this.addEvntButUp("a_cancel", this._midRender);
        this.refrish();
    };
    AlertUtil.prototype.resize = function () {
        if (this.a_basebg) {
            this.a_basebg.top = 0;
            this.a_basebg.left = 0;
            this.a_basebg.y = 0;
            this.a_basebg.x = 0;
            this.a_basebg.height = Scene_data.stageHeight / UIData.Scale;
            this.a_basebg.width = Scene_data.stageWidth / UIData.Scale;
        }
        _super.prototype.resize.call(this);
    };
    AlertUtil.prototype.hide = function () {
        UIManager.getInstance().removeUIContainer(this);
    };
    /**
     *
     * @param evt 返回0，取消 返回1：确认 返回2：点叉号
     */
    AlertUtil.prototype.butClik = function (evt) {
        this.hide();
        if (this.handlerFun) {
            switch (evt.target) {
                case this.a_confirm:
                    this.handlerFun(1);
                    break;
                case this.a_cancel:
                    this.handlerFun(0);
                    break;
                case this.b_close:
                    this.handlerFun(2);
                    break;
                default:
                    break;
            }
        }
    };
    AlertUtil.prototype.initData = function ($text, $title, $flags, closeHandler, $btnname) {
        if ($text === void 0) { $text = ""; }
        if ($title === void 0) { $title = ""; }
        if ($flags === void 0) { $flags = 0x4; }
        if (closeHandler === void 0) { closeHandler = null; }
        this.handlerFun = closeHandler;
        this._contentTxt = $text;
        this._tittleTxt = $title;
        this._flags = $flags;
        this._btnname = $btnname;
        this.refrish();
    };
    AlertUtil.prototype.refrish = function () {
        if (this.a_context) {
            // LabelTextFont.writeTextAutoCenter(this._topRender.uiAtlas, this.a_context.skinName, this._contentTxt, 16, ColorType.Brown6a4936, 300, true);
            LabelTextFont.writeTextAutoCenterByAnchor(this._topRender.uiAtlas, this.a_context.skinName, this._contentTxt, 16, ColorType.Brown6a4936, 300);
            if (this._flags == 1) {
                this.a_confirm.x = this.btnname0.x = 427;
            }
            else {
                this.a_confirm.x = this.btnname0.x = 345;
                this.a_cancel.x = this.btnname1.x = 520;
            }
            this.setUiListVisibleByItem([this.a_cancel, this.btnname1], this._flags != 1);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.btnname0.skinName, this._btnname[0], 16, TextAlign.CENTER, ColorType.Brown6a4936);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.btnname1.skinName, this._btnname[1], 16, TextAlign.CENTER, ColorType.Brown6a4936);
        }
        this.resize();
    };
    AlertUtil.show = function (text, title, closeHandler, flags, $btnname) {
        if (text === void 0) { text = ""; }
        if (title === void 0) { title = ""; }
        if (closeHandler === void 0) { closeHandler = null; }
        if (flags === void 0) { flags = 2; }
        if ($btnname === void 0) { $btnname = ["确定", "取消"]; }
        if (!this.alertUtilPan) {
            this.alertUtilPan = new AlertUtil();
        }
        this.alertUtilPan.initData(text, title, flags, closeHandler, $btnname);
        UIManager.getInstance().addUIContainer(this.alertUtilPan);
        return this.alertUtilPan;
    };
    AlertUtil.YES = 0x0001;
    AlertUtil.NO = 0x0002;
    return AlertUtil;
}(UIConatiner));
//# sourceMappingURL=AlertUtil.js.map