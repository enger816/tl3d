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
var TextureRes = /** @class */ (function (_super) {
    __extends(TextureRes, _super);
    function TextureRes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextureRes.prototype.destory = function () {
        Scene_data.context3D.deleteTexture(this.texture);
    };
    return TextureRes;
}(ResCount));
//# sourceMappingURL=TextureRes.js.map