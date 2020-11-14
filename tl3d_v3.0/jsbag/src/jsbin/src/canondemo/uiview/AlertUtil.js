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
var msgalert;
(function (msgalert) {
    var UIManager = Pan3d.UIManager;
    var UIData = Pan3d.UIData;
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var Scene_data = Pan3d.Scene_data;
    var LabelTextFont = Pan3d.LabelTextFont;
    var ColorType = Pan3d.ColorType;
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
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("ui/alert/alert.txt", "ui/alert/alert.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        AlertUtil.prototype.loadConfigCom = function () {
            this._bgRender.uiAtlas = this.h5UIAtlas;
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.a_basebg = this.addChild(this._bgRender.getComponent("a_basebg")); //this.addEvntButUp("a_basebg", this._bottomRender);
            this.a_basebg.top = 0;
            this.a_basebg.left = 0;
            this.a_basebg.height = Scene_data.stageHeight / UIData.Scale;
            this.a_basebg.width = Scene_data.stageWidth / UIData.Scale;
            this.a_basebg.addEventListener(InteractiveEvent.Down, function () { }, this);
            this.a_basebg.addEventListener(InteractiveEvent.Up, function () { }, this);
            this.addChild(this._bottomRender.getComponent("a_bg"));
            this.addChild(this._midRender.getComponent("a_tittle_bg"));
            this.a_context = this.addChild(this._topRender.getComponent("a_context"));
            this.a_confirm = this.addEvntButUp("a_confirm", this._midRender);
            this.a_cancel = this.addEvntButUp("a_cancel", this._midRender);
            this.uiLoadComplte = true;
            this.showPanel();
            this.refrish();
        };
        AlertUtil.prototype.hidePanel = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        AlertUtil.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        AlertUtil.prototype.butClik = function (evt) {
            this.hidePanel();
            if (this.handlerFun) {
                switch (evt.target) {
                    case this.a_confirm:
                        this.handlerFun(1);
                        break;
                    case this.a_cancel:
                        this.handlerFun(0);
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
            if (this.uiLoadComplte) {
                LabelTextFont.writeTextAutoCenterByAnchor(this._topRender.uiAtlas, this.a_context.skinName, this._contentTxt, 20, ColorType.Brown6a4936, 300);
            }
            this.resize();
        };
        AlertUtil.show = function (text, title, closeHandler, flags, $btnname) {
            if (text === void 0) { text = ""; }
            if (title === void 0) { title = ""; }
            if (closeHandler === void 0) { closeHandler = null; }
            if (flags === void 0) { flags = 2; }
            if ($btnname === void 0) { $btnname = ["取消", "确定"]; }
            if (!this.alertUtilPan) {
                this.alertUtilPan = new AlertUtil();
            }
            this.alertUtilPan.initData(text, title, flags, closeHandler, $btnname);
            this.alertUtilPan.showPanel();
            return this.alertUtilPan;
        };
        AlertUtil.YES = 0x0001;
        AlertUtil.NO = 0x0002;
        return AlertUtil;
    }(H5UIConatiner));
    msgalert.AlertUtil = AlertUtil;
})(msgalert || (msgalert = {}));
//# sourceMappingURL=AlertUtil.js.map