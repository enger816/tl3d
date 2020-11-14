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
var sboss;
(function (sboss) {
    var BossGz = /** @class */ (function (_super) {
        __extends(BossGz, _super);
        function BossGz() {
            var _this = _super.call(this) || this;
            _this.posx = 305;
            _this.posy = 100;
            _this.posW = 346;
            _this.posH = 385;
            _this._mouseY = 0;
            _this.curY = 0;
            _this.scrollLock = true;
            _this._txtHight = 0;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            // this._bottomRender = new UIRenderComponent;
            // this.addRender(this._bottomRender)
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this.setBlackBg();
            _this._bgMask = new UIMask();
            _this._bgMask.x = _this.posx;
            _this._bgMask.y = _this.posy;
            _this._bgMask.width = _this.posW;
            _this._bgMask.height = _this.posH;
            _this.addMask(_this._bgMask);
            _this._topRender.mask = _this._bgMask;
            _this._topRender.uiAtlas = new UIAtlas();
            return _this;
        }
        BossGz.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._bgMask.dispose();
            this._bgMask = null;
        };
        BossGz.prototype.applyLoad = function () {
            var _this = this;
            this._topRender.uiAtlas.setInfo("ui/uidata/faction/league/gz/leaguegz.xml", "ui/uidata/faction/league/gz/leaguegz.png", function () { _this.loadConfigCom(); });
        };
        BossGz.prototype.loadConfigCom = function () {
            this._baseRender.uiAtlas = this._topRender.uiAtlas;
            var renderLevel = this._baseRender;
            this.addChild(renderLevel.getComponent("a_title3"));
            this.b_gonggao = this.addChild(this._topRender.getComponent("b_txt"));
            this.b_gonggao.addEventListener(InteractiveEvent.Down, this.onDown, this);
            this.layer = 310;
            this.applyLoadComplete();
        };
        BossGz.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        BossGz.prototype.onDown = function ($e) {
            if (this._bgMask.testPoint($e.x, $e.y)) {
                this._mouseY = $e.y;
                if (!this.scrollLock) {
                    Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.onMove, this);
                    Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.onUp, this);
                }
            }
        };
        BossGz.prototype.onMove = function ($e) {
            var delatY = $e.y - this._mouseY;
            this._mouseY = $e.y;
            // if (delatY < 0 && this.scrollLock) {
            //     return;
            // }
            var scrollYnum = this._txtHight - this._bgMask.height;
            this.curY = this.curY - delatY;
            if (this.curY <= 0) {
                this.b_gonggao.y = this.posy;
                return;
            }
            if (this.curY >= scrollYnum) {
                this.b_gonggao.y = this.posy - scrollYnum;
                return;
            }
            this.b_gonggao.y = this.b_gonggao.y + delatY;
        };
        BossGz.prototype.onUp = function ($e) {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.onMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.onUp, this);
        };
        BossGz.prototype.butClik = function (evt) {
            if (evt.target == this.c_close) {
                this.hide();
            }
        };
        BossGz.prototype.show = function ($url) {
            if ($url === void 0) { $url = null; }
            UIManager.getInstance().addUIContainer(this);
            //请求数据
            if ($url) {
                this.setUrlData($url);
            }
            else {
                this.resetData();
            }
        };
        BossGz.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        BossGz.prototype.resetData = function () {
            var _this = this;
            LoadManager.getInstance().load(Scene_data.fileRoot + "txt/quanminboss.txt", LoadManager.XML_TYPE, function ($str) {
                $str = $str.replace(/\r/g, "");
                //notepad++默认一个回车键入\n\r ,所以默认将所有的\r隐藏
                var aaa = LabelTextFont.writeTextLabel(_this._baseRender.uiAtlas, _this.b_gonggao.skinName, $str, 16, TextAlign.LEFT, 330, ColorType.color9a683f);
                _this._txtHight = aaa[1];
                _this.scrollLock = _this._txtHight <= _this._bgMask.height;
                _this.b_gonggao.y = _this.posy;
            });
            this.resize();
        };
        BossGz.prototype.setUrlData = function ($url) {
            var _this = this;
            LoadManager.getInstance().load(Scene_data.fileRoot + "txt/" + $url + ".txt", LoadManager.XML_TYPE, function ($str) {
                $str = $str.replace(/\r/g, "");
                //notepad++默认一个回车键入\n\r ,所以默认将所有的\r隐藏
                var aaa = LabelTextFont.writeTextLabel(_this._baseRender.uiAtlas, _this.b_gonggao.skinName, $str, 16, TextAlign.LEFT, 330, ColorType.color9a683f);
                _this._txtHight = aaa[1];
                _this.scrollLock = _this._txtHight <= _this._bgMask.height;
                _this.b_gonggao.y = _this.posy;
            });
            this.resize();
        };
        return BossGz;
    }(WindowCentenMin));
    sboss.BossGz = BossGz;
})(sboss || (sboss = {}));
//# sourceMappingURL=BossGz.js.map