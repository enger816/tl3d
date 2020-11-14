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
var newbieguide;
(function (newbieguide) {
    var OptionalGuidePop = /** @class */ (function (_super) {
        __extends(OptionalGuidePop, _super);
        function OptionalGuidePop() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.top = 0;
            _this.left = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._baseRender = new AlphaUIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            return _this;
        }
        OptionalGuidePop.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
        };
        OptionalGuidePop.prototype.applyLoad = function () {
            var _this = this;
            // GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
            // this._bottomRender.uiAtlas = $publicbgUiAtlas;
            this._baseRender.setInfo("ui/uidata/poptimeout/newbieguide.xml", "ui/uidata/poptimeout/newbieguide.png", function () { _this.loadConfigCom(); });
            // });
        };
        OptionalGuidePop.prototype.initData = function ($tb) {
            this.tb = $tb;
            this._type = $tb.type;
            this._text = $tb.text;
            this._rect = this.getLayoutRect();
            this.showItems();
            this._scale = 1;
            this._num = 0;
            TimeUtil.addFrameTick(this.upDataFun);
        };
        OptionalGuidePop.prototype.getLayoutRect = function () {
            var $tb = this.tb;
            var $rect = new Rectangle();
            var $pos = new Vector2D($tb.area[0], $tb.area[1]);
            $pos = UiTweenVo.getPosByPanel($pos, $tb.layout);
            $rect.x = $pos.x;
            $rect.y = $pos.y;
            $rect.width = $tb.area[2];
            $rect.height = $tb.area[3];
            return $rect;
        };
        OptionalGuidePop.prototype.loadConfigCom = function () {
            var _this = this;
            this._topRender.uiAtlas = this._baseRender.uiAtlas;
            this._bottomRender.uiAtlas = this._baseRender.uiAtlas;
            this.initUI();
            this.upDataFun = function (t) { _this.update(t); };
            this.applyLoadComplete();
        };
        OptionalGuidePop.prototype.initUI = function () {
            var renderLevel = this._baseRender;
            this.b_2 = renderLevel.getComponent("b_2");
            this.b_1 = this.addChild(renderLevel.getComponent("b_1"));
            this.b_3 = this.addChild(this._topRender.getComponent("b_3"));
            this.b_4 = this._topRender.getComponent("b_4");
        };
        OptionalGuidePop.prototype.update = function (t) {
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this.upDataFun);
            }
            //this._scale = 1
            //this.b_1.alpha = 1
            var bbb = this._num % 60;
            if (bbb == 0) {
                this._scale = 1.2;
                this.b_1.alpha = 1;
            }
            else {
                this._scale -= 0.003;
                if (bbb >= 49) {
                    this.b_1.alpha -= 0.1;
                }
            }
            var $aaa = this.getNewVect(this._scale);
            this.drawHighlighted($aaa);
            this._baseRender.applyObjData();
            this._num++;
        };
        OptionalGuidePop.prototype.getNewVect = function ($scale) {
            var $rec = new Rectangle();
            if ($scale > 1) {
                $rec.width = $scale * this._rect.width;
                $rec.height = $scale * this._rect.height;
                $rec.x = this._rect.x - (($rec.width - this._rect.width) / 2);
                $rec.y = this._rect.y - (($rec.height - this._rect.height) / 2);
            }
            else {
                $rec = this._rect;
            }
            return $rec;
        };
        OptionalGuidePop.prototype.showItems = function () {
            if (this._text.length > 0) {
                this.setUiListVisibleByItem([this.b_2, this.b_4], true);
                var ary = LabelTextFont.writeText(this._topRender.uiAtlas, this.b_3.skinName, 0, 0, this._text, 16, "#4c2605", 225, true);
                this.b_2.width = ary[0] + 30;
                this.b_2.height = ary[1] + 20;
                var posary = this.getposxAndposy();
                this.b_3.x = posary[0] + 15;
                this.b_3.y = posary[1] + 10;
                this.b_2.x = posary[0];
                this.b_2.y = posary[1];
            }
            else {
                this.setUiListVisibleByItem([this.b_2, this.b_4], false);
                LabelTextFont.clearLabel(this._topRender.uiAtlas, this.b_3.skinName);
            }
            this._baseRender.applyObjData();
        };
        OptionalGuidePop.prototype.drawHighlighted = function ($rect) {
            this.b_1.x = $rect.x;
            this.b_1.y = $rect.y;
            this.b_1.width = $rect.width;
            this.b_1.height = $rect.height;
        };
        OptionalGuidePop.prototype.getposxAndposy = function () {
            var posx;
            var posy;
            var index;
            switch (this._type) {
                case 1:
                    //上
                    posx = this._rect.x - ((this.b_2.width - this._rect.width) / 2);
                    posy = this._rect.y - this.b_2.height - 10;
                    index = 1;
                    this.b_4.x = posx + this.b_2.width / 2 - this.b_4.width / 2;
                    this.b_4.y = this._rect.y - 20;
                    break;
                case 2:
                    //右
                    posx = this._rect.x + this._rect.width + 10;
                    posy = this._rect.y - ((this.b_2.height - this._rect.height) / 2);
                    index = 3;
                    this.b_4.x = posx - this.b_4.width * 0.5;
                    this.b_4.y = posy + this.b_2.height / 2 - this.b_4.height / 2;
                    break;
                case 3:
                    //下
                    posx = this._rect.x - ((this.b_2.width - this._rect.width) / 2);
                    posy = this._rect.y + this._rect.height + 10;
                    index = 0;
                    this.b_4.x = posx + this.b_2.width / 2 - this.b_4.width / 2;
                    this.b_4.y = posy - this.b_4.height * 0.6;
                    break;
                case 4:
                    //左
                    posx = this._rect.x - this.b_2.width - 10;
                    posy = this._rect.y - ((this.b_2.height - this._rect.height) / 2);
                    index = 2;
                    this.b_4.x = this._rect.x - 23;
                    this.b_4.y = posy + this.b_2.height / 2 - this.b_4.height / 2;
                    break;
            }
            this.b_4.goToAndStop(index);
            return [posx, posy];
        };
        OptionalGuidePop.prototype.resize = function () {
            this.width = Scene_data.stageWidth / UIData.Scale;
            this.height = Scene_data.stageHeight / UIData.Scale;
            _super.prototype.resize.call(this);
            this._rect = this.getLayoutRect();
            this.showItems();
        };
        OptionalGuidePop.prototype.clickEvt = function ($evt) {
            return;
        };
        return OptionalGuidePop;
    }(UIPanel));
    newbieguide.OptionalGuidePop = OptionalGuidePop;
})(newbieguide || (newbieguide = {}));
//# sourceMappingURL=OptionalGuidePop.js.map