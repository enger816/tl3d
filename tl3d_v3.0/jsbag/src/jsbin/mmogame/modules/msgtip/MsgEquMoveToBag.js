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
var msgtip;
(function (msgtip) {
    var MoveTipUiRender = /** @class */ (function (_super) {
        __extends(MoveTipUiRender, _super);
        function MoveTipUiRender() {
            var _this = _super.call(this) || this;
            _this.uiAtlas = new UIAtlas();
            _this.uiAtlas.configData = new Array();
            return _this;
        }
        MoveTipUiRender.prototype.makeSamplePic = function () {
            var _this = this;
            this.uiAtlas.configData.push(this.uiAtlas.getObject("picSkin", 0, 0, this.uiAtlas.textureRes.width, this.uiAtlas.textureRes.height, this.uiAtlas.textureRes.width, this.uiAtlas.textureRes.height));
            this.picUi = this.creatBaseComponent("picSkin");
            var $basePos = UiTweenVo.getPosByPanel(new Vector2D(150, 123), { width: UIData.designWidth, height: UIData.designHeight, left: 0, middle: 0 });
            //this.picUi.width = this.uiAtlas.textureRes.width;
            //this.picUi.height = this.uiAtlas.textureRes.height;
            this.picUi.width = 50;
            this.picUi.height = 50;
            this.picUi.x = $basePos.x;
            this.picUi.y = $basePos.y;
            this.container.addChild(this.picUi);
            var $bagPos = UiTweenVo.getPosByPanel(new Vector2D(277, 476), { width: UIData.designWidth, height: UIData.designHeight, center: 0, bottom: 0 });
            TweenMoveTo(this.picUi, 1, { x: $bagPos.x, y: $bagPos.y, width: 30, height: 30, onComplete: function () { _this.changeButEnd(); } });
        };
        MoveTipUiRender.prototype.changeButEnd = function () {
            if (this.bFun) {
                this.bFun();
            }
        };
        MoveTipUiRender.prototype.setTextures = function ($textureRes) {
            this.uiAtlas.textureRes = $textureRes;
            this.makeSamplePic();
        };
        return MoveTipUiRender;
    }(AlphaUIRenderComponent));
    msgtip.MoveTipUiRender = MoveTipUiRender;
    var MoveTipUi = /** @class */ (function () {
        function MoveTipUi($cs) {
            this.container = $cs;
            this.moveTipUiRender = new MoveTipUiRender();
            this.container.addRender(this.moveTipUiRender);
        }
        MoveTipUi.prototype.loadPicData = function ($id) {
            var _this = this;
            var a = GameData.getIconCopyUrl($id);
            this.moveTipUiRender.bFun = function () { _this.playEnd(); };
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + a, function ($aaaa) {
                _this.moveTipUiRender.setTextures($aaaa);
            });
        };
        MoveTipUi.prototype.playEnd = function () {
            this.container.removeRender(this.moveTipUiRender);
            this.moveTipUiRender.dispose();
        };
        return MoveTipUi;
    }());
    msgtip.MoveTipUi = MoveTipUi;
    var MsgEquMoveToBag = /** @class */ (function (_super) {
        __extends(MsgEquMoveToBag, _super);
        function MsgEquMoveToBag() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.top = 0;
            _this.left = 0;
            _this.frameUpFun = function (t) { _this.upData(t); };
            TimeUtil.addFrameTick(_this.frameUpFun);
            return _this;
        }
        MsgEquMoveToBag.prototype.upData = function (t) {
            if (this.renderList.length <= 0) {
                this.close();
            }
        };
        MsgEquMoveToBag.prototype.setSystemData = function ($id) {
            var $vo = new MoveTipUi(this);
            $vo.loadPicData($id);
        };
        MsgEquMoveToBag.prototype.close = function () {
            UIManager.getInstance().removeUIContainer(this);
            this.dispose();
        };
        MsgEquMoveToBag.prototype.dispose = function () {
            MsgEquMoveToBag.msgEquMoveToBag = null;
            TimeUtil.removeFrameTick(this.frameUpFun);
            this.frameUpFun = null;
        };
        MsgEquMoveToBag.show = function (value) {
            if (!this.msgEquMoveToBag) {
                this.msgEquMoveToBag = new MsgEquMoveToBag();
            }
            this.msgEquMoveToBag.setSystemData(value);
            UIManager.getInstance().addUIContainer(this.msgEquMoveToBag);
        };
        return MsgEquMoveToBag;
    }(UIConatiner));
    msgtip.MsgEquMoveToBag = MsgEquMoveToBag;
})(msgtip || (msgtip = {}));
//# sourceMappingURL=MsgEquMoveToBag.js.map