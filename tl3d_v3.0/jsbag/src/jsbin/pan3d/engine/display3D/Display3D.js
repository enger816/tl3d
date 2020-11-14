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
    var Display3D = /** @class */ (function (_super) {
        __extends(Display3D, _super);
        function Display3D() {
            var _this = _super.call(this) || this;
            _this.sceneVisible = true;
            _this._hasDestory = false;
            _this._onStage = false;
            return _this;
        }
        Display3D.prototype.update = function () {
        };
        Object.defineProperty(Display3D.prototype, "onStage", {
            get: function () {
                return this._onStage;
            },
            enumerable: true,
            configurable: true
        });
        Display3D.prototype.addStage = function () {
            this._onStage = true;
        };
        Display3D.prototype.removeStage = function () {
            this._onStage = false;
        };
        Display3D.prototype.resize = function () {
        };
        Display3D.prototype.destory = function () {
            if (this.objData) {
                this.objData.useNum--;
            }
        };
        return Display3D;
    }(Pan3d.Object3D));
    Pan3d.Display3D = Display3D;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Display3D.js.map