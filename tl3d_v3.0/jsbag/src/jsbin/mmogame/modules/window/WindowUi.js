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
var WindowUi = /** @class */ (function (_super) {
    __extends(WindowUi, _super);
    function WindowUi(titlenum) {
        if (titlenum === void 0) { titlenum = 0; }
        var _this = _super.call(this) || this;
        _this._titlenum = titlenum;
        _this.addWinUiPanel();
        return _this;
    }
    WindowUi.prototype.addWinUiPanel = function () {
        this._baImg = new UIBackImg();
        this._baImg.alpha = 0.5;
        // this._baImg.setImgInfo("ui/uidata/basebg/skillbg.png", 128, 64);
        this._baImg.setFbo();
        this.addRender(this._baImg);
        this.winbgRender = new UIRenderComponent;
        this.addRender(this.winbgRender);
        this.bigPic = new UIRenderOnlyPicComponent;
        this.addRender(this.bigPic);
        this.winmidRender = new UIRenderComponent;
        this.addRender(this.winmidRender);
        this.wintopRender = new UIRenderComponent;
        this.addRender(this.wintopRender);
    };
    WindowUi.prototype.loadBigPicByUrl = function ($url) {
        this.bigPic.setImgUrl($url);
        if (!this.bigPicUI) {
            this.bigPicUI = this.addChild(this.bigPic.getComponent("w_bg"));
        }
        return this.bigPicUI;
    };
    WindowUi.prototype.addBigPic = function () {
        if (this.bigPicUI && !this.bigPicUI.parent) {
            this.addChild(this.bigPicUI);
        }
    };
    WindowUi.prototype.removeBigPic = function () {
        if (this.bigPicUI && this.bigPicUI.parent) {
            this.removeChild(this.bigPicUI);
        }
    };
    WindowUi.prototype.makeBaseWinUi = function () {
        var _this = this;
        if (!WindowUi.winUIAtlas) {
            WindowUi.winUIAtlas = new UIAtlas;
        }
        if (!WindowUi.winUIAtlas.configData) {
            WindowUi.winUIAtlas.setInfo("ui/uidata/window/window.xml", "ui/uidata/window/window.png", function () { _this.winComplete(); });
        }
        else {
            if (this.wintopRender.uiAtlas) {
                this.applyLoad();
            }
            else {
                this.winComplete();
            }
        }
    };
    WindowUi.prototype.winComplete = function () {
        this.wintopRender.uiAtlas = WindowUi.winUIAtlas;
        this.winbgRender.uiAtlas = WindowUi.winUIAtlas;
        this.bigPic.uiAtlas = WindowUi.winUIAtlas;
        this.addChild(this.winbgRender.getComponent("w_bg"));
        // var w_bg: UICompenent = this.addEvntBut("w_bg", this.winbgRender)
        // w_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);
        this.w_height_left = this.addChild(this.wintopRender.getComponent("w_height"));
        this.w_height_right = this.addChild(this.wintopRender.getComponent("w_height"));
        this.w_width = this.addChild(this.wintopRender.getComponent("w_width"));
        this.w_tittle_bg_left = this.addChild(this.wintopRender.getComponent("w_tittle_bg"));
        this.w_tittle_bg_right = this.addChild(this.wintopRender.getComponent("w_tittle_bg"));
        this.w_angle_right = this.addChild(this.wintopRender.getComponent("w_angle"));
        this.w_angle_left = this.addChild(this.wintopRender.getComponent("w_angle"));
        this.w_close = this.addEvntButUp("w_close", this.wintopRender);
        this.applyLoad();
    };
    WindowUi.prototype.resize = function () {
        _super.prototype.resize.call(this);
        if (this.w_tittle_bg_right) {
            this.w_tittle_bg_right.isU = true;
            this.w_tittle_bg_right.x = this.w_tittle_bg_left.x + this.w_tittle_bg_left.width - 0;
            this.w_angle_right.isU = true;
            this.w_angle_right.x = (this.w_tittle_bg_right.x + this.w_tittle_bg_right.width) - this.w_angle_right.width - 7;
            this.w_height_right.isU = true;
            this.w_height_right.x = this.w_angle_right.x + this.w_angle_right.width - this.w_height_right.width - 9;
            this.wintopRender.applyObjData();
        }
    };
    WindowUi.prototype.hide = function () {
        ModuleEventManager.dispatchEvent(new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.HIDE_WINDOW_RES_TITTLE_PANEL));
    };
    WindowUi.prototype.onAdd = function () {
        _super.prototype.onAdd.call(this);
        SceneManager.getInstance().updateFBO();
    };
    WindowUi.prototype.dispose = function () {
        if (this.winbgRender) {
            this.winbgRender.uiAtlas = null;
            this.winbgRender.dispose();
        }
        if (this.bigPic) {
            this.bigPic.uiAtlas = null;
            this.bigPic.dispose();
        }
        if (this.winmidRender) {
            this.winmidRender.uiAtlas = null;
            this.winmidRender.dispose();
        }
        if (this.wintopRender) {
            this.wintopRender.uiAtlas = null;
            this.wintopRender.dispose();
        }
        if (this._baImg) {
            this._baImg.dispose();
        }
    };
    return WindowUi;
}(UIPanel));
//# sourceMappingURL=WindowUi.js.map