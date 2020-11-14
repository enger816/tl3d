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
var Game3dChar = /** @class */ (function (_super) {
    __extends(Game3dChar, _super);
    function Game3dChar() {
        return _super.call(this) || this;
    }
    Game3dChar.prototype.moveTopos3d = function (v) {
        this.moveToPosV2d = v;
        var $selfPos = new tl3d.Vector3D(this.px, this.py, this.pz);
        var $nmr = this.moveToPosV2d.subtract($selfPos);
        $nmr.normalize();
        this.pRotationY = Math.atan2($nmr.x, $nmr.z) * 180 / Math.PI;
    };
    Game3dChar.prototype.updateFrame = function (t) {
        if (this.moveToPosV2d) {
            var $selfPos = new tl3d.Vector3D(this.px, this.py, this.pz);
            var $dis = tl3d.Vector3D.distance($selfPos, this.moveToPosV2d);
            if ($dis > 2) {
                var $nmr = this.moveToPosV2d.subtract($selfPos);
                $nmr.normalize();
                $nmr.scaleBy(1);
                this.px = $selfPos.x + $nmr.x;
                this.pz = $selfPos.z + $nmr.z;
                this.play(tl3d.CharAction.WALK);
            }
            else {
                this.play(tl3d.CharAction.STANAD);
            }
        }
        _super.prototype.updateFrame.call(this, t);
    };
    return Game3dChar;
}(layapan.LayaSceneChar));
//# sourceMappingURL=Game3dChar.js.map