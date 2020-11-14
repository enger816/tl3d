var materialui;
(function (materialui) {
    var Vector3D = Pan3d.Vector3D;
    var MaterialBaseData = /** @class */ (function () {
        function MaterialBaseData() {
            this.baseColor = new Vector3D;
            this.roughness = 0;
            this.specular = 0;
            this.metallic = 0;
            this.usePbr = false;
        }
        MaterialBaseData.prototype.setData = function (obj) {
            if (!obj) {
                return;
            }
            this.baseColorUrl = obj.baseColorUrl;
            if (obj.baseColor) {
                this.baseColor = new Vector3D(obj.baseColor.x, obj.baseColor.y, obj.baseColor.z);
            }
            this.roughness = obj.roughness;
            this.specular = obj.specular;
            this.metallic = obj.metallic;
            this.normalUrl = obj.normalUrl;
            this.usePbr = obj.usePbr;
            this.url = obj.url;
        };
        return MaterialBaseData;
    }());
    materialui.MaterialBaseData = MaterialBaseData;
})(materialui || (materialui = {}));
//# sourceMappingURL=MaterialBaseData.js.map