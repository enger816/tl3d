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
var PopMenuUtil = /** @class */ (function (_super) {
    __extends(PopMenuUtil, _super);
    function PopMenuUtil() {
        var _this = _super.call(this) || this;
        _this._canclick = true;
        _this._complete = false;
        _this.width = UIData.designWidth;
        _this.height = UIData.designHeight;
        _this._bgRender = new UIRenderComponent;
        _this.addRender(_this._bgRender);
        _this._topRender = new UIRenderComponent;
        _this.addRender(_this._topRender);
        _this._topRender.setInfo("ui/uidata/dropmenu/dropmenu.xml", "ui/uidata/dropmenu/dropmenu.png", function () { _this.loadConfigCom(); });
        return _this;
    }
    PopMenuUtil.prototype.initData = function ($data, $x, $y, $backFun) {
        if ($backFun === void 0) { $backFun = null; }
        if (this._canclick) {
            this._canclick = false;
            UIManager.getInstance().addUIContainer(this);
            this._data = $data;
            this._posx = $x;
            this._posy = $y;
            this._backFun = $backFun;
            this.RefreshItems();
        }
    };
    PopMenuUtil.prototype.RefreshItems = function () {
        if (this._complete) {
            this.showItems(this._data, this._posx, this._posy);
        }
    };
    PopMenuUtil.prototype.loadConfigCom = function () {
        this._bgRender.uiAtlas = this._topRender.uiAtlas;
        this.initUI();
        this._complete = true;
        this.RefreshItems();
    };
    PopMenuUtil.prototype.initUI = function () {
        this.AList = new Array();
        this.Aline = new Array();
        for (var i = 0; i < 13; i++) {
            var btn = this._topRender.getComponent("b_" + i);
            btn.addEventListener(InteractiveEvent.Down, this.butClik, this);
            this.AList.push(btn);
        }
        for (var j = 0; j < 12; j++) {
            this.Aline.push(this._topRender.getComponent("line"));
        }
        this.bg = this.addChild(this._bgRender.getComponent("bg"));
    };
    PopMenuUtil.prototype.addtip = function ($data) {
        this.setUiListVisibleByItem(this.AList, false);
        this.setUiListVisibleByItem(this.Aline, false);
        this.bg.height = $data.data.items.length * 38;
        for (var i = 0; i < $data.data.items.length; i++) {
            this.addChild(this.AList[$data.data.items[i]]);
            this.AList[$data.data.items[i]].y = 2 + i * 38;
        }
        for (var j = 0; j < $data.data.items.length - 1; j++) {
            this.setUiListVisibleByItem([this.Aline[j]], true);
            this.Aline[j].y = (j + 1) * 38;
        }
        this._panelheight = this.bg.height;
        this._panelwidth = this.bg.width;
        this._bgRender.applyObjData();
    };
    PopMenuUtil.prototype.movetip = function ($posx, $posy) {
        // var x = $posx / UIData.Scale;
        // var y = $posy / UIData.Scale;
        var x = ($posx + 25) / UIData.Scale;
        var y = ($posy + 25) / UIData.Scale;
        if ((x + this._panelwidth) > UIData.designWidth) {
            x = UIData.designWidth - this._panelwidth;
        }
        if ((y + this._panelheight) > UIData.designHeight) {
            y = UIData.designHeight - this._panelheight;
        }
        this.left = x;
        this.top = y;
    };
    PopMenuUtil.prototype.butClik = function (evt) {
        var $str = evt.target.name;
        if (this._backFun) {
            this._backFun(Number($str.substring(2, $str.length)));
        }
        this.close();
    };
    PopMenuUtil.prototype.showItems = function ($data, x, y) {
        this._data = $data;
        this.addtip($data);
        this.movetip(x, y);
        Scene_data.uiStage.addEventListener(InteractiveEvent.Down, this.clickEvt, this);
    };
    PopMenuUtil.prototype.close = function () {
        var _this = this;
        this._data = null;
        this._backFun = null;
        if (this.hasStage) {
            UIManager.getInstance().removeUIContainer(this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Down, this.clickEvt, this);
        }
        TimeUtil.addTimeOut(500, function () {
            _this._canclick = true;
        });
    };
    PopMenuUtil.prototype.clickEvt = function ($evt) {
        this.close();
    };
    PopMenuUtil.show = function ($data, $backFun, $x, $y) {
        if ($backFun === void 0) { $backFun = null; }
        if ($x === void 0) { $x = 136; }
        if ($y === void 0) { $y = 115; }
        if (!this.popMenuUtil) {
            this.popMenuUtil = new PopMenuUtil();
        }
        this.popMenuUtil.initData($data, $x, $y, $backFun);
        return this.popMenuUtil;
    };
    return PopMenuUtil;
}(UIConatiner));
//# sourceMappingURL=PopMenuUtil.js.map