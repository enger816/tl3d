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
var GroupRes = /** @class */ (function (_super) {
    __extends(GroupRes, _super);
    function GroupRes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupRes.prototype.load = function (url, $fun) {
        var _this = this;
        this._fun = $fun;
        LoadManager.getInstance().load(url, LoadManager.BYTE_TYPE, function ($byte) {
            _this.loadComplete($byte);
        });
    };
    GroupRes.prototype.loadComplete = function ($byte) {
        var _this = this;
        this.dataAry = new Array;
        this._byte = new ByteArray($byte);
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
        if (types == BaseRes.PREFAB_TYPE) {
            item.objUrl = this._byte.readUTF();
            item.materialUrl = this._byte.readUTF();
            if (this.version >= 4) {
                item.materialInfoArr = this.readMaterialInfo();
            }
            item.types = BaseRes.PREFAB_TYPE;
        }
        else if (types == BaseRes.SCENE_PARTICLE_TYPE) {
            item.particleUrl = this._byte.readUTF();
            item.types = BaseRes.SCENE_PARTICLE_TYPE;
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
                this._objDic[Scene_data.fileRoot + item.objUrl] = true;
            }
            if (item.materialUrl) {
                this._materialDic[Scene_data.fileRoot + item.materialUrl] = true;
            }
            if (item.particleUrl) {
                this._particleDic[Scene_data.fileRoot + item.particleUrl] = true;
            }
        }
        for (var key in this._objDic) {
            ObjDataManager.getInstance().registerUrl(key);
        }
        for (var key in this._materialDic) {
            MaterialManager.getInstance().registerUrl(key);
        }
        for (var key in this._particleDic) {
            ParticleManager.getInstance().registerUrl(key);
        }
    };
    GroupRes.prototype.destory = function () {
        _super.prototype.destory.call(this);
        for (var key in this._objDic) {
            ObjDataManager.getInstance().releaseUrl(key);
        }
        for (var key in this._materialDic) {
            MaterialManager.getInstance().releaseUrl(key);
        }
        for (var key in this._particleDic) {
            ParticleManager.getInstance().releaseUrl(key);
        }
        this.dataAry = null;
        this._objDic = null;
        this._particleDic = null;
        this._materialDic = null;
    };
    return GroupRes;
}(BaseRes));
var GroupItem = /** @class */ (function (_super) {
    __extends(GroupItem, _super);
    function GroupItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GroupItem;
}(Object3D));
//# sourceMappingURL=GroupRes.js.map