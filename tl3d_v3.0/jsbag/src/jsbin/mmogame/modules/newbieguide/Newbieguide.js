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
    var Newbieguide = /** @class */ (function (_super) {
        __extends(Newbieguide, _super);
        function Newbieguide() {
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
        Newbieguide.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this.layer = 300;
        };
        Newbieguide.prototype.applyLoad = function () {
            var _this = this;
            // GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
            // this._bottomRender.uiAtlas = $publicbgUiAtlas;
            this._baseRender.setInfo("ui/uidata/poptimeout/newbieguide.xml", "ui/uidata/poptimeout/newbieguide.png", function () { _this.loadConfigCom(); });
            // });
        };
        Newbieguide.prototype.initData = function ($tb) {
            this.tb = $tb;
            this._type = $tb.type;
            this._text = $tb.text;
            this._rect = this.getLayoutRect();
            this.showItems();
            this._scale = 1;
            this._num = 0;
            TimeUtil.addFrameTick(this.upDataFun);
        };
        Newbieguide.prototype.getLayoutRect = function () {
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
        Newbieguide.prototype.loadConfigCom = function () {
            var _this = this;
            this._topRender.uiAtlas = this._baseRender.uiAtlas;
            this._bottomRender.uiAtlas = this._baseRender.uiAtlas;
            this.initUI();
            this.upDataFun = function (t) { _this.update(t); };
            this.applyLoadComplete();
        };
        Newbieguide.prototype.initUI = function () {
            var renderLevel = this._baseRender;
            this.a_2 = renderLevel.getComponent("a_2");
            this.a_1 = this.addChild(renderLevel.getComponent("a_1"));
            this.a_3 = this.addChild(this._topRender.getComponent("a_3"));
            this.a_4 = this._topRender.getComponent("a_4");
            this.arybg_2_1 = new Array;
            for (var i = 0; i < 4; i++) {
                var basebg = this.addChild(this._bottomRender.getComponent("basebg"));
                basebg.addEventListener(InteractiveEvent.Up, this.clickEvt, this);
                basebg.addEventListener(InteractiveEvent.Down, this.clickEvt, this);
                this.arybg_2_1.push(basebg);
            }
        };
        Newbieguide.prototype.update = function (t) {
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this.upDataFun);
            }
            var bbb = this._num % 60;
            if (bbb == 0) {
                this._scale = 1.2;
                this.a_1.alpha = 1;
            }
            else {
                this._scale -= 0.003;
                if (bbb >= 49) {
                    this.a_1.alpha -= 0.1;
                }
            }
            var $aaa = this.getNewVect(this._scale);
            this.drawHighlighted($aaa);
            this._baseRender.applyObjData();
            this._num++;
        };
        Newbieguide.prototype.getNewVect = function ($scale) {
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
        Newbieguide.prototype.movetip = function () {
            this.arybg_2_1[0].x = 0;
            this.arybg_2_1[0].y = 0;
            this.arybg_2_1[0].width = this._rect.x;
            this.arybg_2_1[0].height = this.height;
            this.arybg_2_1[1].x = this._rect.x;
            this.arybg_2_1[1].y = 0;
            this.arybg_2_1[1].width = this._rect.width;
            this.arybg_2_1[1].height = this._rect.y;
            this.arybg_2_1[2].x = this._rect.x + this._rect.width;
            this.arybg_2_1[2].y = 0;
            this.arybg_2_1[2].width = this.width - (this._rect.x + this._rect.width);
            this.arybg_2_1[2].height = this.height;
            this.arybg_2_1[3].x = this._rect.x;
            this.arybg_2_1[3].y = this._rect.y + this._rect.height;
            this.arybg_2_1[3].width = this._rect.width;
            this.arybg_2_1[3].height = this.height - (this._rect.y + this._rect.height);
        };
        Newbieguide.prototype.showItems = function () {
            this.movetip();
            if (this._text.length > 0) {
                this.setUiListVisibleByItem([this.a_2, this.a_4], true);
                var ary = LabelTextFont.writeText(this._topRender.uiAtlas, this.a_3.skinName, 0, 0, this._text, 16, "#4c2605", 225, true);
                this.a_2.width = ary[0] + 30;
                this.a_2.height = ary[1] + 20;
                var posary = this.getposxAndposy();
                this.a_3.x = posary[0] + 15;
                this.a_3.y = posary[1] + 10;
                this.a_2.x = posary[0];
                this.a_2.y = posary[1];
            }
            else {
                this.setUiListVisibleByItem([this.a_2, this.a_4], false);
                LabelTextFont.clearLabel(this._topRender.uiAtlas, this.a_3.skinName);
            }
            this._baseRender.applyObjData();
        };
        Newbieguide.prototype.drawHighlighted = function ($rect) {
            this.a_1.x = $rect.x;
            this.a_1.y = $rect.y;
            this.a_1.width = $rect.width;
            this.a_1.height = $rect.height;
        };
        Newbieguide.prototype.getposxAndposy = function () {
            var posx;
            var posy;
            var index;
            switch (this._type) {
                case 1:
                    //上
                    posx = this._rect.x - ((this.a_2.width - this._rect.width) / 2);
                    posy = this._rect.y - this.a_2.height - 10;
                    index = 1;
                    this.a_4.x = posx + this.a_2.width / 2 - this.a_4.width / 2;
                    this.a_4.y = this._rect.y - 20;
                    break;
                case 2:
                    //右
                    posx = this._rect.x + this._rect.width + 10;
                    posy = this._rect.y - ((this.a_2.height - this._rect.height) / 2);
                    index = 3;
                    this.a_4.x = posx - this.a_4.width * 0.5;
                    this.a_4.y = posy + this.a_2.height / 2 - this.a_4.height / 2;
                    break;
                case 3:
                    //下
                    posx = this._rect.x - ((this.a_2.width - this._rect.width) / 2);
                    posy = this._rect.y + this._rect.height + 10;
                    index = 0;
                    this.a_4.x = posx + this.a_2.width / 2 - this.a_4.width / 2;
                    this.a_4.y = posy - this.a_4.height * 0.6;
                    break;
                case 4:
                    //左
                    posx = this._rect.x - this.a_2.width - 10;
                    posy = this._rect.y - ((this.a_2.height - this._rect.height) / 2);
                    index = 2;
                    this.a_4.x = this._rect.x - 23;
                    this.a_4.y = posy + this.a_2.height / 2 - this.a_4.height / 2;
                    break;
            }
            this.a_4.goToAndStop(index);
            return [posx, posy];
        };
        Newbieguide.prototype.resize = function () {
            this.width = Scene_data.stageWidth / UIData.Scale;
            this.height = Scene_data.stageHeight / UIData.Scale;
            _super.prototype.resize.call(this);
            this._rect = this.getLayoutRect();
            this.showItems();
        };
        Newbieguide.prototype.clickEvt = function ($evt) {
            return;
        };
        return Newbieguide;
    }(UIPanel));
    newbieguide.Newbieguide = Newbieguide;
})(newbieguide || (newbieguide = {}));
//# sourceMappingURL=Newbieguide.js.map