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
var revive;
(function (revive) {
    var Vector3D = Pan3d.Vector3D;
    var Scene_data = Pan3d.Scene_data;
    var Display3DSprite = Pan3d.Display3DSprite;
    var GroupDataManager = Pan3d.GroupDataManager;
    var BaseRes = Pan3d.BaseRes;
    var ReviveModelSprite = /** @class */ (function (_super) {
        __extends(ReviveModelSprite, _super);
        function ReviveModelSprite() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ReviveModelSprite.prototype, "istobeHit", {
            get: function () {
                return this._istobeHit;
            },
            set: function (value) {
                this._istobeHit = value;
                this.setIsHitEff();
            },
            enumerable: true,
            configurable: true
        });
        ReviveModelSprite.prototype.update = function () {
            _super.prototype.update.call(this);
            if (!this.istobeHit) {
                this.textHitCentenBall();
            }
            if (this.selectParticeModel) {
                if (game.GameDataModel.centenBall && Math.abs(this.y - game.GameDataModel.centenBall.y) < 400) {
                    this.selectParticeModel.sceneVisible = true;
                }
                else {
                    this.selectParticeModel.sceneVisible = false;
                }
            }
        };
        ReviveModelSprite.prototype.textHitCentenBall = function () {
            if (20 > Pan3d.Display3D.distance(game.GameDataModel.centenBall, this)) {
                game.GameDataModel.lastRevivePos = new Vector3D(this.x, this.y, this.z);
                this.istobeHit = true;
            }
        };
        ReviveModelSprite.prototype.selectPartice = function () {
            if (this.particleItem.length == 2 && this._scene) {
                var $scene = this._scene;
                $scene.particleManager.removeParticle(this.selectParticeModel);
                this.selectParticeModel = this.particleItem[0];
                $scene.particleManager.addParticle(this.selectParticeModel);
            }
            else {
                console.log("复活点特效不是设计需求");
            }
        };
        ReviveModelSprite.prototype.setIsHitEff = function () {
            if (this.particleItem.length == 2 && this._scene) {
                var $scene = this._scene;
                $scene.particleManager.removeParticle(this.selectParticeModel);
                this.selectParticeModel = this.particleItem[1];
                $scene.particleManager.addParticle(this.selectParticeModel);
            }
            else {
                console.log("复活点特效不是设计需求");
            }
        };
        ReviveModelSprite.prototype.setReviveTemp = function (value) {
            var _this = this;
            var $str = "reviveeff";
            var $arr = String(value.name).split("_");
            if ($arr[1]) {
                $str = $arr[1];
            }
            this.particleItem = new Array();
            GroupDataManager.getInstance().getGroupData(Scene_data.fileRoot + getModelUrl($str), function (groupRes) {
                for (var i = 0; i < groupRes.dataAry.length; i++) {
                    var item = groupRes.dataAry[i];
                    if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                        var $scene = _this._scene;
                        var $particle = $scene.particleManager.getParticleByte(Pan3d.Scene_data.fileRoot + item.particleUrl);
                        $particle.x = _this.x;
                        $particle.y = _this.y - 7;
                        $particle.z = _this.z;
                        _this.particleItem.push($particle);
                    }
                    else {
                        console.log("复活点特效不是设计需求");
                    }
                }
                _this.selectPartice();
            });
        };
        ReviveModelSprite.prototype.destory = function () {
            _super.prototype.destory.call(this);
            while (this.particleItem.length) {
                var $scene = this._scene;
                $scene.particleManager.removeParticle(this.particleItem.pop());
            }
        };
        return ReviveModelSprite;
    }(Display3DSprite));
    revive.ReviveModelSprite = ReviveModelSprite;
})(revive || (revive = {}));
//# sourceMappingURL=ReviveModelSprite.js.map