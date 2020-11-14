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
var Display3DModelObjParticle = /** @class */ (function (_super) {
    __extends(Display3DModelObjParticle, _super);
    function Display3DModelObjParticle() {
        return _super.call(this) || this;
    }
    Display3DModelObjParticle.prototype.update = function () {
        if (this._depthMode) {
            Scene_data.context3D.setDepthTest(true);
        }
        _super.prototype.update.call(this);
        if (this._depthMode) {
            Scene_data.context3D.setDepthTest(false);
        }
    };
    return Display3DModelObjParticle;
}(Display3DModelPartilce));
//# sourceMappingURL=Display3DModelObjParticle.js.map