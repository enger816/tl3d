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
var layapan_me;
(function (layapan_me) {
    var LayaGroupRes = /** @class */ (function (_super) {
        __extends(LayaGroupRes, _super);
        function LayaGroupRes() {
            return _super.call(this) || this;
        }
        LayaGroupRes.prototype.readParticle = function () {
            var objNum = this._byte.readInt();
            //this.particleAry = new Array;
            var time = Pan3d.TimeUtil.getTimer();
            for (var i = 0; i < objNum; i++) {
                var url = Pan3d.Scene_data.fileRoot + this._byte.readUTF();
                var size = this._byte.readInt();
                var dataByte = new Pan3d.Pan3dByteArray;
                dataByte.length = size;
                this._byte.readBytes(dataByte, 0, size);
                this.scene.particleManager.addResByte(url, dataByte);
            }
        };
        return LayaGroupRes;
    }(Pan3d.GroupRes));
    layapan_me.LayaGroupRes = LayaGroupRes;
    var LayaOverrideGroupDataManager = /** @class */ (function (_super) {
        __extends(LayaOverrideGroupDataManager, _super);
        function LayaOverrideGroupDataManager() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LayaOverrideGroupDataManager.prototype.getGroupData = function ($url, $fun) {
            var _this = this;
            if (this._dic[$url]) {
                var gr = this._dic[$url];
                gr.useNum++;
                $fun(gr);
                return;
            }
            if (this._loadDic[$url]) {
                this._loadDic[$url].push($fun);
                return;
            }
            this._loadDic[$url] = new Array;
            this._loadDic[$url].push($fun);
            var group = new LayaGroupRes();
            group.scene = this.scene;
            group.load($url, function () {
                var ary = _this._loadDic[$url];
                for (var i = 0; i < ary.length; i++) {
                    var fun = ary[i];
                    fun(group);
                }
                _this._dic[$url] = group;
                delete _this._loadDic[$url];
                group.initReg();
            });
        };
        return LayaOverrideGroupDataManager;
    }(Pan3d.GroupDataManager));
    layapan_me.LayaOverrideGroupDataManager = LayaOverrideGroupDataManager;
})(layapan_me || (layapan_me = {}));
//# sourceMappingURL=LayaOverrideGroupDataManager.js.map