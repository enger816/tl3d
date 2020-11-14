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
    var LayaOverride2dEngine = /** @class */ (function (_super) {
        __extends(LayaOverride2dEngine, _super);
        function LayaOverride2dEngine() {
            return _super.call(this) || this;
        }
        LayaOverride2dEngine.initConfig = function () {
            var _this = this;
            Pan3d.UIData.resize = function () { _this.uiScaleresize(); }; //更换update
            Pan3d.Engine.update = function () { _this.update(); }; //更换update
            Pan3d.Engine.init = function ($caves) { scene2d_me.Override2dEngine.init($caves); }; //更换引擎初始化
            Pan3d.Engine.resetSize = function (width, height) { scene2d_me.Override2dEngine.resetSize(width, height); }; //更尺寸变化
            Pan3d.Engine.resetViewMatrx3D = function () { scene2d_me.Override2dEngine.resetViewMatrx3D(); };
        };
        LayaOverride2dEngine.uiScaleresize = function () {
            console.log("重置什么也不做");
            Pan3d.UIData.Scale = 1;
        };
        return LayaOverride2dEngine;
    }(scene3d_me.OverrideEngine));
    layapan_me.LayaOverride2dEngine = LayaOverride2dEngine;
})(layapan_me || (layapan_me = {}));
//# sourceMappingURL=LayaOverride2dEngine.js.map