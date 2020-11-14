var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game2dChar = /** @class */ (function (_super) {
    __extends(Game2dChar, _super);
    function Game2dChar() {
        var _this = _super.call(this) || this;
        _this.runspeed = 3;
        _this.moveEndAction = tl3d.CharAction.STANAD;
        return _this;
    }
    Game2dChar.prototype.moveTopos = function (v) {
        this.moveToPosV2d = v;
        var $nmr = this.pixelPos.sub(this.moveToPosV2d);
        this.pRotationY = 180 - Math.atan2($nmr.x, $nmr.y) * 180 / Math.PI;
    };
    Game2dChar.prototype.set2dPos = function ($x, $y) {
        _super.prototype.set2dPos.call(this, $x, $y);
        this.pixelPos = new tl3d.Vector2D($x, $y);
    };
    Game2dChar.prototype.stopMove = function (stopPos) {
        if (this.moveToPosV2d) {
            this.moveToPosV2d = null;
            if (this.moveEndAction) {
                this.play(this.moveEndAction);
            }
            if (stopPos) {
                _super.prototype.set2dPos.call(this, stopPos.x, stopPos.y);
            }
        }
    };
    Game2dChar.prototype.updateFrame = function (t) {
        if (this.moveToPosV2d) {
            var $dis = tl3d.Vector2D.distance(this.pixelPos, this.moveToPosV2d);
            if ($dis > 10) {
                var $nmr = this.pixelPos.sub(this.moveToPosV2d);
                $nmr.normalize();
                $nmr.scaleBy(this.runspeed);
                this.pixelPos.x += $nmr.x;
                this.pixelPos.y += $nmr.y;
                _super.prototype.set2dPos.call(this, this.pixelPos.x, this.pixelPos.y);
                // this.play(tl3d.CharAction.WALK);
                if (this.movetocb) {
                    this.movetocb(this.pixelPos);
                }
            }
            else {
                _super.prototype.set2dPos.call(this, this.moveToPosV2d.x, this.moveToPosV2d.y);
                this.moveToPosV2d = null;
                // this.play(tl3d.CharAction.STANAD);
                if (this.moveEndAction) {
                    this.play(this.moveEndAction);
                }
                //移动回调
                if (this.moveokcb)
                    this.moveokcb();
            }
        }
        _super.prototype.updateFrame.call(this, t);
        if (!this._partDic)
            return;
        var dicAry = this._partDic["mesh"];
        for (var i = 0; dicAry && i < dicAry.length; i++) {
            if (dicAry[i].scaleX != this.scale) {
                dicAry[i].scaleX = this.scale;
                dicAry[i].scaleY = this.scale;
                dicAry[i].scaleZ = this.scale;
            }
        }
    };
    return Game2dChar;
}(layapan.LayaSceneChar));
//# sourceMappingURL=Game2dChar.js.map