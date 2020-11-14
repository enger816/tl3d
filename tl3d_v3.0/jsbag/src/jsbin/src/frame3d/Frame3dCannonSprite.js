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
var frame3d;
(function (frame3d) {
    var Display3D = Pan3d.Display3D;
    var CanonFrame3DSprite = /** @class */ (function (_super) {
        __extends(CanonFrame3DSprite, _super);
        function CanonFrame3DSprite() {
            var _this = _super.call(this) || this;
            _this.delayedTm = 0;
            return _this;
        }
        CanonFrame3DSprite.prototype.clik = function (value) {
            this.isStop = !this.isStop;
            for (var i = 0; this.spriteItem && i < this.spriteItem.length; i++) {
                this.spriteItem[i].isStop = this.isStop;
            }
            console.log("点到了", this.isStop);
        };
        CanonFrame3DSprite.prototype.setInfo = function (value) {
            var _this = this;
            this.frame3dUrl = "frame3d/jiguan001_frame_base.txt"; //获得frame3D的地址
            if (value.name) {
                this.setSpecialDataByName(value.name);
            }
            this.spriteItem = new Array();
            this.frame3dRes = new frame3d.Frame3dRes();
            this.frame3dRes.load(Pan3d.Scene_data.fileRoot + this.frame3dUrl, function () { return _this.loadFrame3DFinish(); });
        };
        CanonFrame3DSprite.prototype.setSpecialDataByName = function (value) {
            var arr = value.split("_");
            if (Pan3d.Scene_data.supportBlob) {
                this.frame3dUrl = "frame3d/" + arr[0] + "_frame.txt"; //[0] 为机关名
            }
            else {
                this.frame3dUrl = "frame3d/" + arr[0] + "_frame_base.txt"; //[0] 为机关名
            }
            if (arr[1] && !isNaN(Number(arr[1]))) {
                this.delayedTm = Number(arr[1]);
            }
            else {
                this.delayedTm = 0;
            }
        };
        CanonFrame3DSprite.prototype.destory = function () {
            console.log("清理机关");
            while (this.spriteItem.length) {
                var dis = this.spriteItem.pop();
                dis.destory();
            }
            _super.prototype.destory.call(this);
        };
        CanonFrame3DSprite.prototype.loadFrame3DFinish = function () {
            if (!this._scene) {
                return;
            }
            for (var i = 0; i < this.frame3dRes.frameItem.length; i++) {
                var $box = new CANNON.Box(new CANNON.Vec3(0.001, 0.001, 0.001));
                var $body = new CANNON.Body({ mass: 1 });
                $body.collisionFilterGroup = game.GameDataModel.GROUP2;
                $body.collisionFilterMask = game.GameDataModel.GROUP1;
                $body.type = CANNON.Body.KINEMATIC;
                $body.addShape($box);
                var $sprite = new frame3d.FrameCanonPrefabSprite($body);
                $sprite.frame3dRes = this.frame3dRes;
                $sprite._scene = this._scene;
                $sprite.makeSpriteByData(this.frame3dRes.frameItem[i]);
                $sprite.delayedTm = this.delayedTm;
                $sprite.addToWorld();
                this.spriteItem.push($sprite);
                for (var j = 0; j < this.frame3dRes.frameItem[i].pointitem.length; j++) {
                    $sprite.maxTime = Math.max($sprite.maxTime, this.frame3dRes.frameItem[i].pointitem[j].time);
                }
                $sprite.bindMatrix = this.posMatrix;
            }
        };
        return CanonFrame3DSprite;
    }(Display3D));
    frame3d.CanonFrame3DSprite = CanonFrame3DSprite;
})(frame3d || (frame3d = {}));
//# sourceMappingURL=Frame3dCannonSprite.js.map