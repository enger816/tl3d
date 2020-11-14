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
    var TextAlign = Pan3d.TextAlign;
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var AlphaUIRenderComponent = Pan3d.AlphaUIRenderComponent;
    var InteractiveEvent = Pan3d.InteractiveEvent;
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
            _this.h5UIAtlas.setInfo("panelui/alert/alert.txt", "panelui/alert/alert.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        AlertUtil.prototype.loadConfigCom = function () {
            this._bgRender.uiAtlas = this.h5UIAtlas;
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.win_tip_bg = this.addChild(this._bgRender.getComponent("a_basebg")); //this.addEvntButUp("a_basebg", this._bottomRender);
            this.win_tip_bg.addEventListener(InteractiveEvent.Down, function () { }, this);
            this.win_tip_bg.addEventListener(InteractiveEvent.Up, function () { }, this);
            this.addChild(this._midRender.getComponent("a_bg"));
            this.addChild(this._bottomRender.getComponent("a_tittle_bg"));
            this.a_context = this.addChild(this._topRender.getComponent("a_context"));
            this.a_confirm = this.addEvntButUp("a_confirm", this._midRender);
            this.a_cancel = this.addEvntButUp("a_cancel", this._midRender);
            this.a_close_but = this.addEvntButUp("a_close_but", this._midRender);
            this.uiLoadComplte = true;
            this.showPanel();
            this.refrish();
        };
        AlertUtil.prototype.hidePanel = function () {
            var _this = this;
            this.TweenLiteScale(UIData.Scale, 0.1, 0.2, function () {
                UIManager.getInstance().removeUIContainer(_this);
            });
        };
        AlertUtil.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
                this.TweenLiteScale(0.1, UIData.Scale);
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
                        this.handlerFun(0);
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
            if (this.uiLoadComplte && this._contentTxt) {
                var $linenum = 0;
                for (var i = 0; i < this._contentTxt.length; i++) {
                    if (this._contentTxt.substr(i, 1) == "\n") {
                        $linenum++;
                    }
                }
                this.a_context.y = this.a_context.baseRec.y - 10 * $linenum + 20;
                LabelTextFont.writeTextAutoCenterByAnchor(this._topRender.uiAtlas, this.a_context.skinName, this._contentTxt, 22, ColorType.Brown6a4936, 300);
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
    var OnlyTopTxt = /** @class */ (function (_super) {
        __extends(OnlyTopTxt, _super);
        function OnlyTopTxt() {
            var _this = _super.call(this) || this;
            _this._timenum = 0;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this.layer = 9999;
            _this._bottomRender = new AlphaUIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._topRender = new AlphaUIRenderComponent;
            _this.addRender(_this._topRender);
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("panelui/alert/alert.txt", "panelui/alert/alert.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        OnlyTopTxt.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.b_top_only_bg = this.addChild(this._bottomRender.getComponent("b_top_only_bg"));
            this.b_top_only_txt = this.addChild(this._topRender.getComponent("b_top_only_txt"));
            this.uiLoadComplte = true;
            this.showPanel();
            this.refrish();
        };
        OnlyTopTxt.prototype.hidePanel = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        OnlyTopTxt.prototype.onAdd = function () {
            var _this = this;
            this.timenum = 3;
            TweenLite.to(this, 4, {
                timenum: 0, onComplete: function () {
                    _this.hidePanel();
                }
            });
        };
        Object.defineProperty(OnlyTopTxt.prototype, "timenum", {
            get: function () {
                return this._timenum;
            },
            set: function (value) {
                this._timenum = value;
                var $num = Math.min(this._timenum, 1);
                this.b_top_only_bg.alpha = $num;
                this.b_top_only_txt.alpha = $num;
                this.middle = $num * 100;
            },
            enumerable: true,
            configurable: true
        });
        OnlyTopTxt.prototype.onRemove = function () {
            console.log("移出");
        };
        OnlyTopTxt.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                if (!this.hasStage) {
                    UIManager.getInstance().addUIContainer(this);
                }
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        OnlyTopTxt.prototype.initData = function ($text) {
            if ($text === void 0) { $text = ""; }
            this.topTxtTextStr = $text;
            this.refrish();
        };
        OnlyTopTxt.prototype.refrish = function () {
            if (this.uiLoadComplte && this.topTxtTextStr) {
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_top_only_txt.skinName, ColorType.Whiteffffff + this.topTxtTextStr, 20, TextAlign.CENTER);
                var $ctx = UIManager.getInstance().getContext2D(10, 10, false);
                var $textMetrics = Pan3d.TextRegExp.getTextMetrics($ctx, this.topTxtTextStr);
                this.b_top_only_bg.width = $textMetrics.width * 1.8;
                this.b_top_only_bg.height = 35;
                this.b_top_only_bg.x = this.b_top_only_bg.baseRec.x - this.b_top_only_bg.width / 2;
                this.b_top_only_bg.y = this.b_top_only_txt.y - 5;
            }
            this.resize();
        };
        OnlyTopTxt.show = function (text) {
            if (!this.onlyTopTxt) {
                this.onlyTopTxt = new OnlyTopTxt();
            }
            this.onlyTopTxt.initData(text);
            this.onlyTopTxt.showPanel();
            return this.onlyTopTxt;
        };
        return OnlyTopTxt;
    }(H5UIConatiner));
    msgalert.OnlyTopTxt = OnlyTopTxt;
})(msgalert || (msgalert = {}));
//# sourceMappingURL=AlertUtil.js.map