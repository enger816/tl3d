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
var Pan3d;
(function (Pan3d) {
    var GroupRes = /** @class */ (function (_super) {
        __extends(GroupRes, _super);
        function GroupRes() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GroupRes.prototype.load = function (url, $fun) {
            var _this = this;
            this._fun = $fun;
            Pan3d.LoadManager.getInstance().load(url, Pan3d.LoadManager.BYTE_TYPE, function ($byte) {
                _this.loadComplete($byte);
            });
        };
        GroupRes.prototype.loadComplete = function ($byte) {
            var _this = this;
            this.dataAry = new Array;
            this._byte = new Pan3d.Pan3dByteArray($byte);
            this._byte.position = 0;
            this.version = this._byte.readInt();
            this.read(function () { _this.readNext(); }); //img
        };
        GroupRes.prototype.readNext = function () {
            this.read(); //obj
            this.read(); //material
            this.read(); //particle;
            var isGroup = this._byte.readBoolean();
            if (isGroup) {
                var length = this._byte.readInt();
                for (var i = 0; i < length; i++) {
                    this.readItem(true);
                }
            }
            else {
                this.readItem(false);
            }
            this._fun();
            this._fun = null;
            this._byte = null;
        };
        GroupRes.prototype.readItem = function (isG) {
            var types = this._byte.readInt();
            var item = new GroupItem();
            item.isGroup = isG;
            if (isG) {
                item.x = this._byte.readFloat();
                item.y = this._byte.readFloat();
                item.z = this._byte.readFloat();
                item.scaleX = this._byte.readFloat();
                item.scaleY = this._byte.readFloat();
                item.scaleZ = this._byte.readFloat();
                item.rotationX = this._byte.readFloat();
                item.rotationY = this._byte.readFloat();
                item.rotationZ = this._byte.readFloat();
            }
            if (types == Pan3d.BaseRes.PREFAB_TYPE) {
                item.objUrl = this._byte.readUTF();
                item.materialUrl = this._byte.readUTF();
                if (this.version >= 4) {
                    item.materialInfoArr = this.readMaterialInfo();
                }
                item.types = Pan3d.BaseRes.PREFAB_TYPE;
            }
            else if (types == Pan3d.BaseRes.SCENE_PARTICLE_TYPE) {
                item.particleUrl = this._byte.readUTF();
                item.types = Pan3d.BaseRes.SCENE_PARTICLE_TYPE;
            }
            this.dataAry.push(item);
        };
        GroupRes.prototype.initReg = function () {
            this._objDic = new Object;
            this._materialDic = new Object;
            this._particleDic = new Object;
            for (var i = 0; i < this.dataAry.length; i++) {
                var item = this.dataAry[i];
                if (item.objUrl) {
                    this._objDic[Pan3d.Scene_data.fileRoot + item.objUrl] = true;
                }
                if (item.materialUrl) {
                    this._materialDic[Pan3d.Scene_data.fileRoot + item.materialUrl] = true;
                }
                if (item.particleUrl) {
                    this._particleDic[Pan3d.Scene_data.fileRoot + item.particleUrl] = true;
                }
            }
            for (var key in this._objDic) {
                Pan3d.ObjDataManager.getInstance().registerUrl(key);
            }
            for (var key in this._materialDic) {
                Pan3d.MaterialManager.getInstance().registerUrl(key);
            }
            for (var key in this._particleDic) {
                Pan3d.ParticleManager.getInstance().registerUrl(key);
            }
        };
        GroupRes.prototype.destory = function () {
            _super.prototype.destory.call(this);
            for (var key in this._objDic) {
                Pan3d.ObjDataManager.getInstance().releaseUrl(key);
            }
            for (var key in this._materialDic) {
                Pan3d.MaterialManager.getInstance().releaseUrl(key);
            }
            for (var key in this._particleDic) {
                Pan3d.ParticleManager.getInstance().releaseUrl(key);
            }
            this.dataAry = null;
            this._objDic = null;
            this._particleDic = null;
            this._materialDic = null;
        };
        return GroupRes;
    }(Pan3d.BaseRes));
    Pan3d.GroupRes = GroupRes;
    var GroupItem = /** @class */ (function (_super) {
        __extends(GroupItem, _super);
        function GroupItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return GroupItem;
    }(Pan3d.Object3D));
    Pan3d.GroupItem = GroupItem;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=GroupRes.js.map