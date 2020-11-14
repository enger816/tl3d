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
var SceneLoadUI = /** @class */ (function (_super) {
    __extends(SceneLoadUI, _super);
    function SceneLoadUI() {
        var _this = _super.call(this) || this;
        _this.skipNum = 0;
        _this.interfaceUI = true;
        _this.width = 400;
        _this.height = 80;
        _this.center = 0;
        _this.bottom = 50;
        _this._baImg = new UIBackImg();
        //   this._baImg.setImgInfo("ui/load/lod.jpg", 1024, 512);
        _this.addRender(_this._baImg);
        _this._baseRender = new UIRenderComponent;
        _this.addRender(_this._baseRender);
        _this._midRender = new UIRenderComponent;
        _this.addRender(_this._midRender);
        _this.loadConfigCom();
        _this.layer = 500;
        return _this;
    }
    SceneLoadUI.prototype.loadBackImg = function ($url) {
        this._baImg.setImgInfo($url, 1024, 512);
    };
    SceneLoadUI.prototype.loadConfigCom = function () {
        var _this = this;
        this._baseRender.uiAtlas = new UIAtlas();
        this._midRender.uiAtlas = this._baseRender.uiAtlas;
        var $uiAtlas = this._baseRender.uiAtlas;
        $uiAtlas.configData = new Array;
        $uiAtlas.configData.push($uiAtlas.getObject("numLabel", 0, 40, 100, 18, 256, 64));
        $uiAtlas.configData.push($uiAtlas.getObject("numText", 100, 40, 60, 20, 256, 64));
        $uiAtlas.configData.push($uiAtlas.getObject("barA", 0, 0, 15, 16, 256, 64));
        $uiAtlas.configData.push($uiAtlas.getObject("barB", 15, 0, 24, 16, 256, 64));
        $uiAtlas.configData.push($uiAtlas.getObject("barC", 54 - 15, 0, 15, 16, 256, 64));
        $uiAtlas.configData.push($uiAtlas.getObject("backA", 100, 0, 20, 32, 256, 64));
        $uiAtlas.configData.push($uiAtlas.getObject("backB", 122, 0, 15, 32, 256, 64));
        $uiAtlas.configData.push($uiAtlas.getObject("backC", 164 - 20, 0, 20, 32, 256, 64));
        $uiAtlas.configData.push($uiAtlas.getObject("flashMc", 256 - 64, 0, 64, 64, 256, 64));
        $uiAtlas.ctx = UIManager.getInstance().getContext2D(256, 64, false);
        UiDraw.cxtDrawImg($uiAtlas.ctx, "load_yellow_bar", new Rectangle(0, 0, 54, 16), UIData.textlist);
        UiDraw.cxtDrawImg($uiAtlas.ctx, "load_yellow_bg", new Rectangle(100, 0, 64, 32), UIData.textlist);
        UiDraw.cxtDrawImg($uiAtlas.ctx, "load_flash", new Rectangle(256 - 64, 0, 64, 64), UIData.textlist);
        UiDraw.cxtDrawImg($uiAtlas.ctx, "load_txt", new Rectangle(0, 40, 100, 20), UIData.textlist);
        $uiAtlas.textureRes = TextureManager.getInstance().getCanvasTexture($uiAtlas.ctx);
        var backA = this._baseRender.creatBaseComponent("backA");
        backA.x = 0 - 20;
        this.addChild(backA);
        var backB = this._baseRender.creatBaseComponent("backB");
        backB.x = 0;
        backB.width = 400 - 2;
        this.addChild(backB);
        var backC = this._baseRender.creatBaseComponent("backC");
        backC.x = backB.width + backB.x;
        this.addChild(backC);
        var barA = this._midRender.creatBaseComponent("barA");
        barA.x = 2;
        barA.y = 7;
        this.addChild(barA);
        this.barB = this._midRender.creatBaseComponent("barB");
        this.barB.x = 13;
        this.barB.y = barA.y;
        this.addChild(this.barB);
        this.barC = this._midRender.creatBaseComponent("barC");
        this.barC.x = 26;
        this.barC.y = barA.y;
        this.addChild(this.barC);
        var numLabel = this._baseRender.creatBaseComponent("numLabel");
        numLabel.y = 22 + 20;
        numLabel.x = 3;
        this.addChild(numLabel);
        var numText = this._baseRender.creatBaseComponent("numText");
        numText.y = 20 + 20;
        numText.x = 100;
        this.addChild(numText);
        this.flashMc = this._midRender.creatBaseComponent("flashMc");
        this.flashMc.x = 0;
        this.flashMc.y = -15;
        this.addChild(this.flashMc);
        this.setProgress(0.01);
        this.upDataFun = function () { _this.updData(0); };
    };
    SceneLoadUI.prototype.remove = function () {
        TimeUtil.removeFrameTick(this.upDataFun);
    };
    SceneLoadUI.prototype.show = function () {
        TimeUtil.addFrameTick(this.upDataFun);
    };
    SceneLoadUI.prototype.updData = function ($num) {
        if (this.barB) {
            if (this.skipNum > 50) {
                this.skipNum = 0;
            }
            var str = "";
            for (var i = 0; i < this.skipNum / 10; i++) {
                str += ".";
            }
            ArtFont.getInstance().upArtFont(this._baseRender.uiAtlas, "numText", str, 15, ArtFont.Yellow, TextAlign.LEFT);
            this.skipNum++;
        }
    };
    SceneLoadUI.prototype.setProgress = function (num) {
        if (this.barB) {
            if ((400 - 50) > 0) {
                this.barB.width = (400 - 31) * num;
                this.barC.x = this.barB.width + this.barB.x;
                this.barB.x = 13;
                this.flashMc.x = this.barC.x - 20;
            }
            else {
                this.barB.x = 10000;
                this.barC.x = 10000;
            }
        }
    };
    SceneLoadUI.prototype.setTxt = function (str) {
        //  this.loadAtals.setTxt(str);
    };
    SceneLoadUI.prototype.resize = function () {
        _super.prototype.resize.call(this);
        this._baImg.resize();
    };
    return SceneLoadUI;
}(UIConatiner));
//# sourceMappingURL=SceneLoadUI.js.map