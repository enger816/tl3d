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
var FrameUIRender = /** @class */ (function (_super) {
    __extends(FrameUIRender, _super);
    function FrameUIRender() {
        return _super.call(this) || this;
    }
    FrameUIRender.prototype.setImg = function (url, wNum, hNum, fun, num) {
        var _this = this;
        if (num === void 0) { num = 1; }
        TextureManager.getInstance().getTexture(Scene_data.fileRoot + url, function ($texture) {
            var ui = new UIAtlas;
            ui.textureRes = $texture;
            _this.uiAtlas = ui;
            if (num == 1) {
                fun(_this.getFrameTipComponent(wNum, hNum));
            }
            else {
                var ary = new Array;
                for (var i = 0; i < num; i++) {
                    ary.push(_this.getFrameTipComponent(wNum, hNum));
                }
                fun(ary);
            }
        });
    };
    FrameUIRender.prototype.update = function () {
        _super.prototype.update.call(this);
        for (var i = this._uiList.length - 1; i >= 0; i--) {
            if (this._uiList[i] instanceof FrameTipCompenent) {
                this._uiList[i].updateEnd();
            }
        }
    };
    FrameUIRender.prototype.getFrameTipComponent = function (wNum, hNum) {
        var frameTipCom = new FrameTipCompenent;
        var rec = new UIRectangle;
        rec.x = 0;
        rec.y = 0;
        rec.width = 1;
        rec.height = 1;
        rec.pixelWitdh = this.uiAtlas.textureRes.width;
        rec.pixelHeight = this.uiAtlas.textureRes.height;
        rec.pixelX = 0;
        rec.pixelY = 0;
        rec.type = 2;
        rec.cellX = wNum;
        rec.cellY = hNum;
        frameTipCom.setFrameData(rec);
        frameTipCom.uiRender = this;
        var rect = new Object;
        rect.width = this.uiAtlas.textureRes.width / wNum;
        rect.height = this.uiAtlas.textureRes.height / hNum;
        rect.x = 0;
        rect.y = 0;
        frameTipCom.width = rect.width;
        frameTipCom.height = rect.height;
        frameTipCom.x = rect.x;
        frameTipCom.y = rect.y;
        frameTipCom.baseRec = rect;
        return frameTipCom;
    };
    return FrameUIRender;
}(UIRenderComponent));
var FrameTipCompenent = /** @class */ (function (_super) {
    __extends(FrameTipCompenent, _super);
    function FrameTipCompenent() {
        return _super.call(this) || this;
    }
    FrameTipCompenent.prototype.playOne = function ($container) {
        if (!this.parent) {
            $container.addChild(this);
        }
        this.endFlag = false;
        this.goToAndPlay(0);
    };
    FrameTipCompenent.prototype.updateEnd = function () {
        if (this.endFlag) {
            this.parent.removeChild(this);
        }
    };
    return FrameTipCompenent;
}(FrameCompenent));
//# sourceMappingURL=FrameUIRender.js.map