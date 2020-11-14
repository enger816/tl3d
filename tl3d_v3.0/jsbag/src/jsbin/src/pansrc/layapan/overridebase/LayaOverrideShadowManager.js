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
    var ShadowManager = Pan3d.ShadowManager;
    var LayaOverrideShadowManager = /** @class */ (function (_super) {
        __extends(LayaOverrideShadowManager, _super);
        function LayaOverrideShadowManager() {
            return _super.call(this) || this;
        }
        return LayaOverrideShadowManager;
    }(ShadowManager));
    layapan_me.LayaOverrideShadowManager = LayaOverrideShadowManager;
})(layapan_me || (layapan_me = {}));
//# sourceMappingURL=LayaOverrideShadowManager.js.map