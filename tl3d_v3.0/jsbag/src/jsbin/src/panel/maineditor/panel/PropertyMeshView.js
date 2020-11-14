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
var maineditor;
(function (maineditor) {
    var Vector3D = Pan3d.Vector3D;
    var MetaDataView = prop.MetaDataView;
    var ReflectionData = prop.ReflectionData;
    var PropertyMeshView = /** @class */ (function (_super) {
        __extends(PropertyMeshView, _super);
        function PropertyMeshView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PropertyMeshView.prototype.getView = function () {
            var ary = [
                { Type: ReflectionData.Vec3, Label: "坐标:", FunKey: "pos", target: this, Step: 1, Category: "属性" },
                { Type: ReflectionData.Vec3, Label: "比例:", FunKey: "scale", target: this, Step: 0.1, Category: "属性" },
                { Type: ReflectionData.Vec3, Label: "角度:", FunKey: "rotation", target: this, Step: 1, Category: "属性" },
            ];
            return ary;
        };
        PropertyMeshView.prototype.resize = function () {
            var ty = this._top;
            for (var i = 0; this.ui && i < this.ui.length; i++) {
                this.ui[i].y = ty;
                this.ui[i].x = 20;
                ty += this.ui[i].height;
                if (this.ui.length > 1) { //展开的情况需要处理
                    ty += 10; //特殊间隔加上10，显得比平时宽一点
                }
                this.ui[i].width = this.width;
                this.ui[i].resize();
            }
            this._height = ty - this._top;
        };
        Object.defineProperty(PropertyMeshView.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                var _this = this;
                this._data = value;
                this.xyzPosData = this.data;
                this.xyzPosData.dataUpDate = function () {
                    _this.refreshViewValue();
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropertyMeshView.prototype, "pos", {
            get: function () {
                return new Vector3D(this.xyzPosData.x, this.xyzPosData.y, this.xyzPosData.z);
            },
            set: function (value) {
                this.xyzPosData.x = value.x;
                this.xyzPosData.y = value.y;
                this.xyzPosData.z = value.z;
                this.xyzPosData.changeModelMatrix3d();
                this.xyzPosData.upRootMatrix3DToItem();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropertyMeshView.prototype, "rotation", {
            get: function () {
                return new Vector3D(this.xyzPosData.rotationX, this.xyzPosData.rotationY, this.xyzPosData.rotationZ);
            },
            set: function (value) {
                this.xyzPosData.rotationX = value.x;
                this.xyzPosData.rotationY = value.y;
                this.xyzPosData.rotationZ = value.z;
                this.xyzPosData.changeModelMatrix3d();
                this.xyzPosData.upRootMatrix3DToItem();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropertyMeshView.prototype, "scale", {
            get: function () {
                return new Vector3D(this.xyzPosData.scaleX, this.xyzPosData.scaleY, this.xyzPosData.scaleZ);
            },
            set: function (value) {
                this.xyzPosData.scaleX = value.x;
                this.xyzPosData.scaleY = value.y;
                this.xyzPosData.scaleZ = value.z;
                this.xyzPosData.changeModelMatrix3d();
                this.xyzPosData.upRootMatrix3DToItem();
            },
            enumerable: true,
            configurable: true
        });
        return PropertyMeshView;
    }(MetaDataView));
    maineditor.PropertyMeshView = PropertyMeshView;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=PropertyMeshView.js.map