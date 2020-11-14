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
    var RoleRes = /** @class */ (function (_super) {
        __extends(RoleRes, _super);
        function RoleRes() {
            var _this = _super.call(this) || this;
            _this.meshBatchNum = 1;
            return _this;
        }
        RoleRes.prototype.load = function (url, $fun) {
            var _this = this;
            this._fun = $fun;
            Pan3d.LoadManager.getInstance().load(url, Pan3d.LoadManager.BYTE_TYPE, function ($byte) {
                _this.loadComplete($byte);
            });
        };
        RoleRes.prototype.loadComplete = function ($byte) {
            this._byte = new Pan3d.Pan3dByteArray($byte);
            this._byte.position = 0;
            this.version = this._byte.readInt();
            this.readMesh();
        };
        RoleRes.prototype.readMesh = function () {
            this.roleUrl = this._byte.readUTF();
            if (this.version >= 16) { //环境参数
                this.ambientLightColor = new Pan3d.Vector3D;
                this.sunLigthColor = new Pan3d.Vector3D;
                this.nrmDircet = new Pan3d.Vector3D;
                this.ambientLightColor.x = this._byte.readFloat();
                this.ambientLightColor.y = this._byte.readFloat();
                this.ambientLightColor.z = this._byte.readFloat();
                this.ambientLightIntensity = this._byte.readFloat();
                this.ambientLightColor.scaleBy(this.ambientLightIntensity);
                this.sunLigthColor.x = this._byte.readFloat();
                this.sunLigthColor.y = this._byte.readFloat();
                this.sunLigthColor.z = this._byte.readFloat();
                this.sunLigthIntensity = this._byte.readFloat();
                this.sunLigthColor.scaleBy(this.sunLigthIntensity);
                this.nrmDircet.x = this._byte.readFloat();
                this.nrmDircet.y = this._byte.readFloat();
                this.nrmDircet.z = this._byte.readFloat();
            }
            Pan3d.MeshDataManager.getInstance().readData(this._byte, this.meshBatchNum, this.roleUrl, this.version);
            this.readAction();
        };
        RoleRes.prototype.readAction = function () {
            var _this = this;
            var $actionByte;
            if (this.version >= 30) {
                $actionByte = getZipByte(this._byte);
            }
            else {
                $actionByte = this._byte;
            }
            this.actionAry = new Array;
            var actionNum = $actionByte.readInt();
            for (var i = 0; i < actionNum; i++) {
                var actionName = $actionByte.readUTF();
                Pan3d.AnimManager.getInstance().readData($actionByte, this.roleUrl + actionName);
                this.actionAry.push(actionName);
            }
            this.read(function () { _this.readNext(); }); //readimg 
        };
        RoleRes.prototype.readNext = function () {
            this.read(); //readmaterial
            this.read(); //readparticle;
            this._fun();
        };
        return RoleRes;
    }(Pan3d.BaseRes));
    Pan3d.RoleRes = RoleRes;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=RoleRes.js.map