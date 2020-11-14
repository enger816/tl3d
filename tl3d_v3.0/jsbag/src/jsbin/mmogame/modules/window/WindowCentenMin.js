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
var WindowCentenMin = /** @class */ (function (_super) {
    __extends(WindowCentenMin, _super);
    function WindowCentenMin(titlenum) {
        if (titlenum === void 0) { titlenum = 0; }
        var _this = _super.call(this) || this;
        _this._needBlackBg = false;
        _this._hasInit = false;
        _this._titlenum = titlenum;
        _this.addWinUiPanel();
        return _this;
    }
    WindowCentenMin.prototype.dispose = function () {
        if (this.winbgRender) {
            this.winbgRender.uiAtlas = null;
            this.winbgRender.dispose();
        }
        if (this.winBlackBgRender) {
            this.winBlackBgRender.uiAtlas = null;
            this.winBlackBgRender.dispose();
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
    WindowCentenMin.prototype.setBlackBg = function () {
        this._needBlackBg = true;
        if (this._hasInit) {
            this.addBlackBg();
        }
    };
    WindowCentenMin.prototype.addBlackBg = function () {
        this.winBlackBgRender = new UIRenderComponent;
        this.winBlackBgRender.uiAtlas = WindowUi.winUIAtlas;
        this.addRenderAt(this.winBlackBgRender, 0);
        this._blackBgUI = this.winBlackBgRender.getComponent("w_black_bg");
        this.addChild(this._blackBgUI);
        this._blackBgUI.addEventListener(InteractiveEvent.Down, function (v) { }, this);
        this._blackBgUI.addEventListener(InteractiveEvent.Up, function (v) { }, this);
    };
    WindowCentenMin.prototype.addWinUiPanel = function () {
        this.winbgRender = new UIRenderComponent;
        this.addRender(this.winbgRender);
        this.winmidRender = new UIRenderComponent;
        this.addRender(this.winmidRender);
        this.wintopRender = new UIRenderComponent;
        this.addRender(this.wintopRender);
    };
    WindowCentenMin.prototype.makeBaseWinUi = function () {
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
    WindowCentenMin.prototype.winComplete = function () {
        this.wintopRender.uiAtlas = WindowUi.winUIAtlas;
        this.winbgRender.uiAtlas = WindowUi.winUIAtlas;
        this.c_bg = this.addChild(this.winbgRender.getComponent("c_bg"));
        this.c_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);
        this.c_tittle_bg_left = this.addChild(this.wintopRender.getComponent("c_tittle_bg"));
        this.c_height_left = this.addChild(this.winbgRender.getComponent("c_height"));
        this.c_angle_left = this.addChild(this.wintopRender.getComponent("c_angle"));
        this.c_tittle_bg_right = this.addChild(this.wintopRender.getComponent("c_tittle_bg"));
        this.c_height_right = this.addChild(this.winbgRender.getComponent("c_height"));
        this.c_angle_right = this.addChild(this.wintopRender.getComponent("c_angle"));
        this.c_width = this.addChild(this.wintopRender.getComponent("c_width"));
        this.c_close = this.addEvntButUp("c_close", this.wintopRender);
        if (this._needBlackBg) {
            this.addBlackBg();
        }
        this._hasInit = true;
        this.applyLoad();
    };
    WindowCentenMin.prototype.resize = function () {
        _super.prototype.resize.call(this);
        if (this.winbgRender) {
            this.c_tittle_bg_right.isU = true;
            this.c_tittle_bg_right.x = this.c_tittle_bg_left.x + this.c_tittle_bg_left.width - 1;
            this.c_angle_right.isU = true;
            this.c_angle_right.x = (this.c_tittle_bg_right.x + this.c_tittle_bg_right.width) - this.c_angle_right.width - 21;
            this.c_height_right.isU = true;
            this.c_height_right.x = this.c_angle_right.x + this.c_angle_right.width - this.c_height_right.width + 2;
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
    WindowCentenMin.prototype.hide = function () {
        // ModuleEventManager.dispatchEvent(new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.HIDE_WINDOW_RES_TITTLE_PANEL))
    };
    return WindowCentenMin;
}(UIPanel));
//# sourceMappingURL=WindowCentenMin.js.map