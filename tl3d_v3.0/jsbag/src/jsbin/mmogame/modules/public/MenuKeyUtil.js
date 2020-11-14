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
var MenuKeyUtil = /** @class */ (function (_super) {
    __extends(MenuKeyUtil, _super);
    function MenuKeyUtil() {
        var _this = _super.call(this) || this;
        _this._complete = false;
        _this.width = UIData.designWidth;
        _this.height = UIData.designHeight;
        _this._bottomRender = new UIRenderComponent;
        _this.addRender(_this._bottomRender);
        _this._baseRender = new UIRenderComponent;
        _this.addRender(_this._baseRender);
        _this._topRender = new UIRenderComponent;
        _this.addRender(_this._topRender);
        _this._topRender.setInfo("ui/uidata/dropmenu/dropmenu.xml", "ui/uidata/dropmenu/dropmenu.png", function () { _this.loadConfigCom(); });
        return _this;
    }
    MenuKeyUtil.prototype.initData = function ($x, $y, $backFun) {
        if ($backFun === void 0) { $backFun = null; }
        this._posx = $x;
        this._posy = $y;
        this._backFun = $backFun;
        this.RefreshItems();
    };
    MenuKeyUtil.prototype.RefreshItems = function () {
        if (this._complete) {
            this.showItems(this._posx, this._posy);
        }
    };
    MenuKeyUtil.prototype.loadConfigCom = function () {
        this._bottomRender.uiAtlas = this._topRender.uiAtlas;
        this._baseRender.uiAtlas = this._topRender.uiAtlas;
        this.initUI();
        this._complete = true;
        this.RefreshItems();
    };
    MenuKeyUtil.prototype.initUI = function () {
        var renderLevel = this._baseRender;
        this.keyPanel = this.addChild(this._bottomRender.getComponent("keyPanel"));
        this.one = this.addEvntBut("1", renderLevel);
        this.one.data = 1;
        this.two = this.addEvntBut("2", renderLevel);
        this.two.data = 2;
        this.three = this.addEvntBut("3", renderLevel);
        this.three.data = 3;
        this.four = this.addEvntBut("4", renderLevel);
        this.four.data = 4;
        this.five = this.addEvntBut("5", renderLevel);
        this.five.data = 5;
        this.six = this.addEvntBut("6", renderLevel);
        this.six.data = 6;
        this.seven = this.addEvntBut("7", renderLevel);
        this.seven.data = 7;
        this.eight = this.addEvntBut("8", renderLevel);
        this.eight.data = 8;
        this.nine = this.addEvntBut("9", renderLevel);
        this.nine.data = 9;
        this.delete = this.addEvntBut("delete", renderLevel);
        this.delete.data = -1;
        this.zero = this.addEvntBut("0", renderLevel);
        this.zero.data = 0;
        this.ok = this.addEvntBut("ok", renderLevel);
        this.ok.data = 10;
        this.addChild(this._topRender.getComponent("key_1"));
        this.addChild(this._topRender.getComponent("key_2"));
        this.addChild(this._topRender.getComponent("key_3"));
        this.addChild(this._topRender.getComponent("key_4"));
        this.addChild(this._topRender.getComponent("key_6"));
        this.addChild(this._topRender.getComponent("key_5"));
        this.addChild(this._topRender.getComponent("key_0"));
        this.addChild(this._topRender.getComponent("key_9"));
        this.addChild(this._topRender.getComponent("key_8"));
        this.addChild(this._topRender.getComponent("key_7"));
    };
    MenuKeyUtil.prototype.movetip = function ($posx, $posy) {
        this.left = $posx / UIData.Scale;
        this.top = $posy / UIData.Scale;
    };
    MenuKeyUtil.prototype.butClik = function (evt) {
        var $num = evt.target.data;
        if (this._backFun) {
            this._backFun($num);
        }
    };
    MenuKeyUtil.prototype.showItems = function (x, y) {
        this.movetip(x, y);
        Scene_data.uiStage.addEventListener(InteractiveEvent.Down, this.clickEvt, this);
    };
    MenuKeyUtil.prototype.close = function () {
        if (this.hasStage) {
            UIManager.getInstance().removeUIContainer(this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Down, this.clickEvt, this);
        }
    };
    MenuKeyUtil.closeMune = function () {
        if (this.menuKeyUtil) {
            this.menuKeyUtil.close();
        }
    };
    MenuKeyUtil.prototype.clickEvt = function ($evt) {
        var rect = new Rectangle(this.keyPanel.absoluteX, this.keyPanel.absoluteY, this.keyPanel.absoluteWidth, this.keyPanel.absoluteHeight);
        if (rect.isHitByPoint($evt.x, $evt.y)) {
        }
        else {
            this.close();
        }
    };
    MenuKeyUtil.show = function ($backFun, $x, $y) {
        if ($backFun === void 0) { $backFun = null; }
        if (!this.menuKeyUtil) {
            this.menuKeyUtil = new MenuKeyUtil();
        }
        this.menuKeyUtil.initData($x, $y, $backFun);
        UIManager.getInstance().addUIContainer(this.menuKeyUtil);
        return this.menuKeyUtil;
    };
    return MenuKeyUtil;
}(UIConatiner));
//# sourceMappingURL=MenuKeyUtil.js.map