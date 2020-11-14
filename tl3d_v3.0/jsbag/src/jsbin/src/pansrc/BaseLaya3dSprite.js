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
//此类可用于修改场景的渲染队列 或显示3D 或2D的模式
var BaseLaya3dSprite = /** @class */ (function (_super) {
    __extends(BaseLaya3dSprite, _super);
    function BaseLaya3dSprite() {
        var _this = this;
        if (!layapan.LayaScene2dInit.isConfig) {
            layapan.LayaScene2dInit.initData();
        }
        _this = _super.call(this) || this;
        return _this;
    }
    BaseLaya3dSprite.prototype.upFrame = function () {
        Pan3d.Scene_data.context3D.setWriteDepth(true);
        Pan3d.Scene_data.context3D.setDepthTest(true);
        Pan3d.TimeUtil.update();
        //设置为2D的镜头角度
        Pan3d.Scene_data.focus3D.rotationY = 0;
        Pan3d.Scene_data.focus3D.rotationX = -45;
        Pan3d.Scene_data.cam3D.distance = 250;
        //这是是移动2D的基础坐标
        scene2d.CanvasPostionModel.getInstance().tureMoveV2d = new Pan3d.Vector2D(this.x, this.y);
        scene2d.CanvasPostionModel.getInstance().resetSize();
        Pan3d.Scene_data.context3D.renderContext.clear(Pan3d.Scene_data.context3D.renderContext.DEPTH_BUFFER_BIT); //重置深度
        Pan3d.MathClass.getCamView(Pan3d.Scene_data.cam3D, Pan3d.Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
        Pan3d.Scene_data.context3D._contextSetTest.clear();
        this.scene.upFrame();
    };
    return BaseLaya3dSprite;
}(layapan.LayaInsideSprite));
//# sourceMappingURL=BaseLaya3dSprite.js.map