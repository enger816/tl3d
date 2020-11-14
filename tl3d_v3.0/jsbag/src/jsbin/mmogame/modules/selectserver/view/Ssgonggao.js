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
var selectserver;
(function (selectserver) {
    var Ssgonggao = /** @class */ (function (_super) {
        __extends(Ssgonggao, _super);
        function Ssgonggao() {
            var _this = _super.call(this) || this;
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
            _this._bgMask = new UIMask();
            _this._bgMask.x = 146;
            _this._bgMask.y = 110;
            _this._bgMask.width = 695;
            _this._bgMask.height = 355;
            _this.addMask(_this._bgMask);
            _this._topRender.mask = _this._bgMask;
            return _this;
        }
        Ssgonggao.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._bgMask.dispose();
            this._bgMask = null;
        };
        Ssgonggao.prototype.initUiAtlas = function ($uiAtlas) {
            // this._bottomRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        };
        Ssgonggao.prototype.initView = function () {
            var renderLevel = this._baseRender;
            var b_angel3 = this.addChild(renderLevel.getComponent("b_angel3"));
            b_angel3.isU = true;
            b_angel3.isV = true;
            var b_angel1 = this.addChild(renderLevel.getComponent("b_angel1"));
            b_angel1.isU = true;
            this.addChild(renderLevel.getComponent("b_angel0"));
            var b_angel2 = this.addChild(renderLevel.getComponent("b_angel2"));
            b_angel2.isV = true;
            this.addUIList(["b_topline", "b_leftline", "b_leftline_copy", "b_topline_copy", "b_title"], renderLevel);
            this.b_gonggao = this.addChild(this._topRender.getComponent("b_gonggao"));
            this.b_gonggao.addEventListener(InteractiveEvent.Down, this.onDown, this);
        };
        Ssgonggao.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        Ssgonggao.prototype.onDown = function ($e) {
            if (this._bgMask.testPoint($e.x, $e.y)) {
                this._mouseY = $e.y;
                if (!this.scrollLock) {
                    Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.onMove, this);
                    Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.onUp, this);
                }
            }
        };
        Ssgonggao.prototype.onMove = function ($e) {
            var delatY = $e.y - this._mouseY;
            this._mouseY = $e.y;
            // if (delatY < 0 && this.scrollLock) {
            //     return;
            // }
            var scrollYnum = this._txtHight - this._bgMask.height;
            this.curY = this.curY - delatY;
            if (this.curY <= 0) {
                this.b_gonggao.y = 110;
                return;
            }
            if (this.curY >= scrollYnum) {
                this.b_gonggao.y = 110 - scrollYnum;
                return;
            }
            this.b_gonggao.y = this.b_gonggao.y + delatY;
            // this.scrollY(delatY);
        };
        Ssgonggao.prototype.onUp = function ($e) {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.onMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.onUp, this);
        };
        Ssgonggao.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            //请求数据
            this.resetData();
        };
        Ssgonggao.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        Ssgonggao.prototype.resetData = function () {
            var _this = this;
            LoadManager.getInstance().load(Scene_data.fileRoot + "txt/gg.txt", LoadManager.XML_TYPE, function ($str) {
                $str = $str.replace(/\r/g, "\n");
                var aaa = LabelTextFont.writeTextLabel(_this._baseRender.uiAtlas, _this.b_gonggao.skinName, $str, 16, TextAlign.LEFT, 685, ColorType.color9a683f);
                _this._txtHight = aaa[1];
                _this.scrollLock = _this._txtHight <= _this._bgMask.height;
                _this.b_gonggao.y = 110;
            });
            this.resize();
        };
        return Ssgonggao;
    }(UIVirtualContainer));
    selectserver.Ssgonggao = Ssgonggao;
})(selectserver || (selectserver = {}));
//# sourceMappingURL=Ssgonggao.js.map