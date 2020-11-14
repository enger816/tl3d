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
var layapan;
(function (layapan) {
    var LayaOverride2dEngine = /** @class */ (function (_super) {
        __extends(LayaOverride2dEngine, _super);
        function LayaOverride2dEngine() {
            return _super.call(this) || this;
        }
        LayaOverride2dEngine.initConfig = function () {
            tl3d.UIData.resize = function () { LayaOverride2dEngine.uiScaleresize(); }; //更换update
            tl3d.Engine.update = function () { LayaOverride2dEngine.update(); }; //更换update
            tl3d.Engine.init = function ($caves) { scene2d.Override2dEngine.init($caves); }; //更换引擎初始化
            tl3d.Engine.resetSize = function (width, height) { scene2d.Override2dEngine.resetSize(width, height); }; //更尺寸变化
            tl3d.Engine.resetViewMatrx3D = function () { scene2d.Override2dEngine.resetViewMatrx3D(); };
        };
        LayaOverride2dEngine.uiScaleresize = function () {
            //console.log("重置什么也不做")
            tl3d.UIData.Scale = 1.5;
        };
        return LayaOverride2dEngine;
    }(scene3d.OverrideEngine));
    layapan.LayaOverride2dEngine = LayaOverride2dEngine;
})(layapan || (layapan = {}));
//# sourceMappingURL=LayaOverride2dEngine.js.map