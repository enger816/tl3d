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
var ShadowLaya3dSprite = /** @class */ (function (_super) {
    __extends(ShadowLaya3dSprite, _super);
    function ShadowLaya3dSprite() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShadowLaya3dSprite.prototype.upFrame = function () {
        Pan3d.Scene_data.context3D._contextSetTest.clear();
        shadow.ShadowModel.getInstance().updateDepth(this.scene);
        _super.prototype.upFrame.call(this);
    };
    return ShadowLaya3dSprite;
}(Scene3dLaya3dSprite));
//# sourceMappingURL=ShadowLaya3dSprite.js.map