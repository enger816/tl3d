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
var linkplay;
(function (linkplay) {
    var Vector3D = Pan3d.Vector3D;
    var TimeUtil = Pan3d.TimeUtil;
    var MainCanonPrefabSprite = cannondis.MainCanonPrefabSprite;
    var Physics = canonkey.Physics;
    var GameDataModel = game.GameDataModel;
    var LinkPlayCanonPrefabSprite = /** @class */ (function (_super) {
        __extends(LinkPlayCanonPrefabSprite, _super);
        function LinkPlayCanonPrefabSprite(value) {
            var _this = _super.call(this, value) || this;
            _this.interpolationNum = -1000;
            _this.moveInfoVoItem = new Array;
            _this.bodyfouce = new Vector3D();
            return _this;
        }
        LinkPlayCanonPrefabSprite.prototype.playHitDiamonds = function () {
        };
        LinkPlayCanonPrefabSprite.prototype.update = function () {
            this.getToMoveInfoVo();
            _super.prototype.update.call(this);
        };
        LinkPlayCanonPrefabSprite.prototype.getToMoveInfoVo = function () {
            if (this.moveInfoVoItem.length) {
                var tm = TimeUtil.getTimer() - GameDataModel.levelStartTm;
                tm += this.interpolationNum; //设计一个延时
                if (this.moveInfoVoItem[0].tm <= tm) {
                    var vo = this.moveInfoVoItem.shift();
                    if (!this.bodyfouce) {
                        this.bodyfouce = new Vector3D();
                    }
                    this.body.angularVelocity.x = vo.angularVelocity.x;
                    this.body.angularVelocity.y = vo.angularVelocity.y;
                    this.body.angularVelocity.z = vo.angularVelocity.z;
                    this.bodyfouce.x = vo.bodyfouce.x;
                    this.bodyfouce.y = vo.bodyfouce.y;
                    this.bodyfouce.z = vo.bodyfouce.z;
                    this.body.position.x = vo.position.x;
                    this.body.position.y = vo.position.y;
                    this.body.position.z = vo.position.z;
                    this.body.velocity.x = vo.velocity.x;
                    this.body.velocity.y = vo.velocity.y;
                    this.body.velocity.z = vo.velocity.z;
                }
            }
        };
        LinkPlayCanonPrefabSprite.prototype.pushVO = function (vo) {
            this.moveInfoVoItem.push(vo);
            var tm = TimeUtil.getTimer() - GameDataModel.levelStartTm;
            this.interpolationNum = this.interpolationNum + (vo.tm - tm - this.interpolationNum) / 5;
        };
        LinkPlayCanonPrefabSprite.addMoveOhterUser = function ($scale, $scene) {
            var $sphere = new CANNON.Sphere($scale / Physics.baseScale10);
            var $body = new CANNON.Body({ mass: 1.00 });
            $body.collisionFilterGroup = GameDataModel.GROUP1;
            $body.collisionFilterMask = GameDataModel.GROUP1 | GameDataModel.GROUP2 | GameDataModel.GROUP3;
            $body.addShape($sphere);
            var $dis = new LinkPlayCanonPrefabSprite($body);
            $dis._scene = $scene;
            $dis.addToWorld();
            return $dis;
        };
        return LinkPlayCanonPrefabSprite;
    }(MainCanonPrefabSprite));
    linkplay.LinkPlayCanonPrefabSprite = LinkPlayCanonPrefabSprite;
})(linkplay || (linkplay = {}));
//# sourceMappingURL=LinkPlayCanonPrefabSprite.js.map