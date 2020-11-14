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
var WindowMinUi = /** @class */ (function (_super) {
    __extends(WindowMinUi, _super);
    function WindowMinUi() {
        var _this = _super.call(this) || this;
        _this._needBlackBg = false;
        _this._hasInit = false;
        _this.width = UIData.designWidth;
        _this.height = UIData.designHeight;
        _this.right = 0;
        _this.middle = 0;
        _this.addWinUiPanel();
        return _this;
    }
    WindowMinUi.prototype.dispose = function () {
        if (this.winbgRender) {
            this.winbgRender.uiAtlas = null;
            this.winbgRender.dispose();
        }
        if (this.winBlackBgRender) {
            this.winBlackBgRender.uiAtlas = null;
            this.winBlackBgRender.dispose();
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
    };
    WindowMinUi.prototype.addWinUiPanel = function () {
        this.winbgRender = new UIRenderComponent;
        this.addRender(this.winbgRender);
        this.bigPic = new UIRenderOnlyPicComponent;
        this.addRender(this.bigPic);
        this.winmidRender = new UIRenderComponent;
        this.addRender(this.winmidRender);
        this.wintopRender = new UIRenderComponent;
        this.addRender(this.wintopRender);
    };
    WindowMinUi.prototype.setBlackBg = function () {
        this._needBlackBg = true;
        if (this._hasInit) {
            this.addBlackBg();
        }
    };
    WindowMinUi.prototype.addBlackBg = function () {
        this.winBlackBgRender = new UIRenderComponent;
        this.winBlackBgRender.uiAtlas = WindowUi.winUIAtlas;
        this.addRenderAt(this.winBlackBgRender, 0);
        this._blackBgUI = this.winBlackBgRender.getComponent("w_black_bg");
        this.addChild(this._blackBgUI);
        this._blackBgUI.addEventListener(InteractiveEvent.Down, function (v) { }, this);
        this._blackBgUI.addEventListener(InteractiveEvent.Up, function (v) { }, this);
    };
    WindowMinUi.prototype.makeBaseWinUi = function () {
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
    WindowMinUi.prototype.winComplete = function () {
        this.wintopRender.uiAtlas = WindowUi.winUIAtlas;
        this.winbgRender.uiAtlas = WindowUi.winUIAtlas;
        this.baseBg = this.addEvntBut("baseBg", this.winbgRender);
        this.e_bg = this.addEvntBut("e_bg", this.winbgRender);
        this.e_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);
        this.e_tittle_bg_left = this.addChild(this.wintopRender.getComponent("e_tittle_bg"));
        this.e_height_left = this.addChild(this.winbgRender.getComponent("e_height"));
        this.e_angle_left = this.addChild(this.wintopRender.getComponent("e_angle"));
        this.e_tittle_bg_right = this.addChild(this.wintopRender.getComponent("e_tittle_bg"));
        this.e_height_right = this.addChild(this.winbgRender.getComponent("e_height"));
        this.e_angle_right = this.addChild(this.wintopRender.getComponent("e_angle"));
        this.e_width = this.addChild(this.wintopRender.getComponent("e_width"));
        this.e_close = this.addEvntButUp("e_close", this.wintopRender);
        if (this._needBlackBg) {
            this.addBlackBg();
        }
        this._hasInit = true;
        this.applyLoad();
        this.resize();
    };
    WindowMinUi.prototype.resize = function () {
        _super.prototype.resize.call(this);
        if (this.wintopRender.uiAtlas) {
            this.e_tittle_bg_right.isU = true;
            this.e_tittle_bg_right.x = this.e_tittle_bg_left.x + this.e_tittle_bg_left.width - 0;
            this.e_angle_right.isU = true;
            this.e_angle_right.x = (this.e_tittle_bg_right.x + this.e_tittle_bg_right.width) - this.e_angle_right.width - 8;
            this.e_height_right.isU = true;
            this.e_height_right.x = this.e_angle_right.x + this.e_angle_right.width - this.e_height_right.width - 9;
            this.winbgRender.applyObjData();
            this.wintopRender.applyObjData();
            if (this._blackBgUI) {
                this._blackBgUI.left = 0;
                this._blackBgUI.top = 0;
                this._blackBgUI.height = Scene_data.stageHeight / UIData.Scale;
                this._blackBgUI.width = Scene_data.stageWidth / UIData.Scale;
            }
        }
    };
    WindowMinUi.prototype.hide = function () {
        // ModuleEventManager.dispatchEvent(new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.HIDE_WINDOW_RES_TITTLE_PANEL))
    };
    return WindowMinUi;
}(UIPanel));
//# sourceMappingURL=WindowMinUi.js.map