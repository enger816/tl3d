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
    var Object3D = /** @class */ (function (_super) {
        __extends(Object3D, _super);
        function Object3D($x, $y, $z) {
            if ($x === void 0) { $x = 0; }
            if ($y === void 0) { $y = 0; }
            if ($z === void 0) { $z = 0; }
            var _this = _super.call(this) || this;
            _this._x = $x;
            _this._y = $y;
            _this._z = $z;
            _this._scaleX = 1;
            _this._scaleY = 1;
            _this._scaleZ = 1;
            _this._rotationX = 0;
            _this._rotationY = 0;
            _this._rotationZ = 0;
            _this.posMatrix = new Pan3d.Matrix3D;
            return _this;
        }
        Object3D.prototype.toStringout = function () {
            return "Object3D(" + String(this._x) + "," + String(this._y) + "," + String(this._z) + ")";
        };
        Object.defineProperty(Object3D.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
                this.updateMatrix();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
                this.updateMatrix();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "z", {
            get: function () {
                return this._z;
            },
            set: function (value) {
                this._z = value;
                this.updateMatrix();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "scale", {
            set: function (value) {
                this._scaleX = this._scaleY = this._scaleZ = value;
                this.updateMatrix();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "scaleX", {
            get: function () {
                return this._scaleX;
            },
            set: function (value) {
                this._scaleX = value;
                this.updateMatrix();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "scaleY", {
            get: function () {
                return this._scaleY;
            },
            set: function (value) {
                this._scaleY = value;
                this.updateMatrix();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "scaleZ", {
            get: function () {
                return this._scaleZ;
            },
            set: function (value) {
                this._scaleZ = value;
                this.updateMatrix();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "rotationX", {
            get: function () {
                return this._rotationX;
            },
            set: function (value) {
                this._rotationX = value;
                this.updateMatrix();
                this.updateRotationMatrix();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "rotationY", {
            get: function () {
                return this._rotationY;
            },
            set: function (value) {
                if (isNaN(value)) {
                    console.log("有错");
                }
                this._rotationY = value;
                this.updateMatrix();
                this.updateRotationMatrix();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "rotationZ", {
            get: function () {
                return this._rotationZ;
            },
            set: function (value) {
                this._rotationZ = value;
                this.updateMatrix();
                this.updateRotationMatrix();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "px", {
            get: function () { return 0; },
            set: function (val) { },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "py", {
            get: function () { return 0; },
            set: function (val) { },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "pz", {
            get: function () { return 0; },
            set: function (val) { },
            enumerable: true,
            configurable: true
        });
        Object3D.prototype.updateMatrix = function () {
            this.posMatrix.identity();
            this.posMatrix.appendScale(this._scaleX, this._scaleY, this._scaleZ);
            this.posMatrix.appendRotation(this._rotationX, Pan3d.Vector3D.X_AXIS);
            this.posMatrix.appendRotation(this._rotationY, Pan3d.Vector3D.Y_AXIS);
            this.posMatrix.appendRotation(this._rotationZ, Pan3d.Vector3D.Z_AXIS);
            this.posMatrix.appendTranslation(this._x, this._y, this._z);
        };
        Object3D.prototype.updateRotationMatrix = function () {
        };
        return Object3D;
    }(Pan3d.EventDispatcher));
    Pan3d.Object3D = Object3D;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Object3D.js.map