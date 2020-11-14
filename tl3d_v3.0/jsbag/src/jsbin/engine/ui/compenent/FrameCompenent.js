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
var FrameCompenent = /** @class */ (function (_super) {
    __extends(FrameCompenent, _super);
    function FrameCompenent() {
        var _this = _super.call(this) || this;
        _this.isTrue = false;
        _this.current = 0;
        _this.totalcurrent = 0;
        _this.speed = 6;
        _this.endFlag = false;
        _this.stopStatic = 0;
        _this.speedNum = 0;
        return _this;
    }
    FrameCompenent.prototype.setFrameData = function ($rect) {
        this._frameData = $rect;
        this.totalcurrent = this._frameData.cellX * this._frameData.cellY;
    };
    FrameCompenent.prototype.applyRenderSize = function () {
        if (!this.parent) {
            return;
        }
        this.renderX = this.absoluteX / Scene_data.stageWidth;
        this.renderY = this.absoluteY / Scene_data.stageHeight;
        this.renderWidth = this.absoluteWidth / Scene_data.stageWidth;
        this.renderHeight = this.absoluteHeight / Scene_data.stageHeight;
        this.renderData[0] = this.renderX;
        this.renderData[1] = this.renderY;
        this.renderData[2] = this.renderWidth * this._uvScale;
        this.renderData[3] = this.renderHeight;
        var cellX = this._frameData.cellX;
        var cellY = this._frameData.cellY;
        var tw = (this._frameData.width / cellX);
        var th = (this._frameData.height / cellY);
        var rect = new Rectangle(0, 0, tw, th);
        var tempNum = this.current % (cellX * cellY);
        rect.x = (tempNum % cellX * tw);
        rect.y = (float2int(tempNum / cellX) * th);
        this.renderData2[0] = rect.width * this._uvScale;
        this.renderData2[1] = rect.height;
        this.renderData2[2] = rect.x + this._frameData.x;
        this.renderData2[3] = rect.y + this._frameData.y;
        this.uiRender.makeRenderDataVc(this.vcId);
    };
    FrameCompenent.prototype.getSkinCtxRect = function () {
        var $uiRec = this._frameData;
        var $toRect = new Rectangle;
        $toRect.width = $uiRec.pixelWitdh / $uiRec.cellX;
        $toRect.height = $uiRec.pixelHeight / $uiRec.cellY;
        $toRect.x = ((this.current) % $uiRec.cellX) * $toRect.width;
        $toRect.y = Math.floor((this.current) / $uiRec.cellX) * $toRect.height;
        return $toRect;
    };
    FrameCompenent.prototype.drawToCtx = function ($uiAtlas, $ctx) {
        var $uiRec = this._frameData;
        ;
        var $toRect = this.getSkinCtxRect();
        $uiAtlas.updateCtx($ctx, $uiRec.pixelX + $toRect.x, $uiRec.pixelY + $toRect.y);
    };
    FrameCompenent.prototype.update = function () {
        if (!this._frameData) {
            return;
        }
        if (this.stopStatic == 2) {
            return;
        }
        this.applyRenderSize();
        this.speedNum++;
        if (this.speedNum > this.speed) {
            this.current++;
            this.speedNum = 0;
        }
        var cellX = this._frameData.cellX;
        var cellY = this._frameData.cellY;
        if (this.current > (cellX * cellY - 1)) {
            if (this.stopStatic == 1) {
                this.stopStatic = 2;
                this.endFlag = true;
            }
            else {
                this.current = 0;
            }
        }
    };
    FrameCompenent.prototype.goToAndPlay = function ($num) {
        this.stopStatic = 1;
        this.current = $num;
    };
    FrameCompenent.prototype.goToAndStop = function ($num) {
        this.stopEnd();
        this.current = $num;
        this.applyRenderSize();
    };
    FrameCompenent.prototype.Invisible = function () {
        if (this.renderData[2] != 0 && this.renderData[3] != 0) {
            this.stopEnd();
            this.renderData[0] = 0;
            this.renderData[1] = 0;
            this.renderData[2] = 0;
            this.renderData[3] = 0;
            this.uiRender.makeRenderDataVc(this.vcId);
        }
    };
    FrameCompenent.prototype.play = function () {
        this.stopStatic = 0;
    };
    FrameCompenent.prototype.stopEnd = function () {
        this.stopStatic = 2;
        var cellX = this._frameData.cellX;
        var cellY = this._frameData.cellY;
        this.current = cellX * cellY - 1;
        this.applyRenderSize();
    };
    return FrameCompenent;
}(UICompenent));
//# sourceMappingURL=FrameCompenent.js.map