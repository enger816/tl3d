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
var baoxiang;
(function (baoxiang) {
    var Vector3D = Pan3d.Vector3D;
    var Scene_data = Pan3d.Scene_data;
    var Display3DSprite = Pan3d.Display3DSprite;
    var GroupDataManager = Pan3d.GroupDataManager;
    var BaseRes = Pan3d.BaseRes;
    var BaoxiangMeshVo = /** @class */ (function () {
        function BaoxiangMeshVo() {
        }
        BaoxiangMeshVo.prototype.meshObj = function (value) {
            this.id = value.id;
            this.type = value.type;
            this.num = value.num;
            this.random = value.random;
            this.x = value.x;
            this.y = value.y;
            this.z = value.z;
            this.rotation = value.rotation;
        };
        return BaoxiangMeshVo;
    }());
    baoxiang.BaoxiangMeshVo = BaoxiangMeshVo;
    var BaoxiangDisplay3DSprite = /** @class */ (function (_super) {
        __extends(BaoxiangDisplay3DSprite, _super);
        function BaoxiangDisplay3DSprite() {
            return _super.call(this) || this;
        }
        BaoxiangDisplay3DSprite.prototype.update = function () {
            if (!this.isOpen && game.GameDataModel.centenBall && Math.abs(this.y - game.GameDataModel.centenBall.y) < 400) {
                this.sceneVisible = true;
            }
            else {
                this.sceneVisible = false;
            }
            if (this.objData && this.sceneVisible) {
                _super.prototype.update.call(this);
                this.textHitCentenBall();
            }
        };
        BaoxiangDisplay3DSprite.prototype.textHitCentenBall = function () {
            var $dis = Vector3D.distance(new Vector3D(game.GameDataModel.centenBall.x, game.GameDataModel.centenBall.y, game.GameDataModel.centenBall.z), new Vector3D(this.x, this.y, this.z));
            if ($dis < 20) {
                this.isOpen = true;
                this.showFinishEfict();
                GameData.dispatchEvent(new baoxiang.BaoxiangEvent(baoxiang.BaoxiangEvent.SHOW_BAOXIANG_PANEL), this.baoxiangMeshVo);
            }
        };
        BaoxiangDisplay3DSprite.prototype.showFinishEfict = function () {
            var $str = GameData.getStorageSync("hasBaoxiang");
            var $arr;
            if (!$str) {
                console.log("第一次获取钻石");
                $arr = new Array;
            }
            else {
                $arr = JSON.parse($str);
            }
            $arr.push({ name: this.baoxiangMeshVo.name, time: Date.now().toString() });
            GameData.setStorageSync("hasBaoxiang", JSON.stringify($arr));
        };
        BaoxiangDisplay3DSprite.prototype.setModelById = function ($str) {
            var _this = this;
            GroupDataManager.getInstance().getGroupData(Scene_data.fileRoot + getModelUrl($str), function (groupRes) {
                for (var i = 0; i < groupRes.dataAry.length; i++) {
                    var item = groupRes.dataAry[i];
                    if (item.types == BaseRes.PREFAB_TYPE) {
                        _this.setObjUrl(item.objUrl);
                        _this.setMaterialUrl(item.materialUrl, item.materialInfoArr);
                        _this.scale = 0.4;
                    }
                }
            });
        };
        return BaoxiangDisplay3DSprite;
    }(Display3DSprite));
    baoxiang.BaoxiangDisplay3DSprite = BaoxiangDisplay3DSprite;
})(baoxiang || (baoxiang = {}));
//# sourceMappingURL=BaoxiangDisplay3DSprite.js.map