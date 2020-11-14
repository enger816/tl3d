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
var pack;
(function (pack) {
    var PrefabStaticMesh = /** @class */ (function (_super) {
        __extends(PrefabStaticMesh, _super);
        function PrefabStaticMesh() {
            var _this = _super.call(this) || this;
            _this.sunColor = new Vector3D(2, 3, 4, 1);
            return _this;
        }
        PrefabStaticMesh.prototype.getObject = function () {
            var obj = {};
            obj.material = this.material;
            obj.name = this.getName();
            obj.objsurl = this.objsurl;
            obj.paramInfo = this.paramInfo;
            obj.sunColor = this.sunColor;
            obj.textureurl = this.textureurl;
            obj.url = this.url;
            return obj;
        };
        return PrefabStaticMesh;
    }(pack.Prefab));
    pack.PrefabStaticMesh = PrefabStaticMesh;
})(pack || (pack = {}));
//# sourceMappingURL=PrefabStaticMesh.js.map