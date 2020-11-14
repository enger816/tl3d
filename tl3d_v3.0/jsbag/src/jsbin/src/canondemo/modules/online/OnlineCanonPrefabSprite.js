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
var online;
(function (online) {
    var MainCanonPrefabSprite = cannondis.MainCanonPrefabSprite;
    var Physics = canonkey.Physics;
    var GameDataModel = game.GameDataModel;
    var OnlineCanonPrefabSprite = /** @class */ (function (_super) {
        __extends(OnlineCanonPrefabSprite, _super);
        function OnlineCanonPrefabSprite(value) {
            var _this = _super.call(this, value) || this;
            _this.userPic = new online.OnlineUserHeadPicSprite();
            return _this;
        }
        Object.defineProperty(OnlineCanonPrefabSprite.prototype, "onlineUserVo", {
            get: function () {
                return this._onlineUserVo;
            },
            set: function (value) {
                this._onlineUserVo = value;
                this.userPic.setPicUrl(this._onlineUserVo.avatar);
                if (isNaN(this._onlineUserVo.skin) || !Boolean(this._onlineUserVo.skin)) {
                    this._onlineUserVo.skin = 1;
                }
                console.log(" this._onlineUserVo.skin", this._onlineUserVo.skin);
                this.changeSkinById(this._onlineUserVo.skin);
            },
            enumerable: true,
            configurable: true
        });
        OnlineCanonPrefabSprite.prototype.playHitDiamonds = function () {
            this._onlineUserVo.num++;
            this.userPic.drawHaveNum(this._onlineUserVo.num);
        };
        OnlineCanonPrefabSprite.prototype.update = function () {
            _super.prototype.update.call(this);
            this.userPic.x = this.x;
            this.userPic.y = this.y + 30;
            this.userPic.z = this.z;
            this.userPic.update();
        };
        OnlineCanonPrefabSprite.addMoveOhterUser = function ($scale, $scene) {
            var $sphere = new CANNON.Sphere($scale / Physics.baseScale10);
            var $body = new CANNON.Body({ mass: 1.00 });
            $body.collisionFilterGroup = GameDataModel.GROUP1;
            $body.collisionFilterMask = GameDataModel.GROUP1 | GameDataModel.GROUP2 | GameDataModel.GROUP3;
            $body.addShape($sphere);
            var $dis = new OnlineCanonPrefabSprite($body);
            $dis._scene = $scene;
            $dis.addToWorld();
            return $dis;
        };
        return OnlineCanonPrefabSprite;
    }(MainCanonPrefabSprite));
    online.OnlineCanonPrefabSprite = OnlineCanonPrefabSprite;
})(online || (online = {}));
//# sourceMappingURL=OnlineCanonPrefabSprite.js.map