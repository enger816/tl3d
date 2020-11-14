
//此类可用于修改场景的渲染队列 或显示3D 或2D的模式
class BaseLaya3dSprite extends layapan.LayaInsideSprite {

    constructor() {
    
        super();
     
    }
    protected upFrame(): void {
        Pan3d.Scene_data.context3D.setWriteDepth(true);
        Pan3d.Scene_data.context3D.setDepthTest(true);
        Pan3d.TimeUtil.update();
        //设置为2D的镜头角度
        Pan3d.Scene_data.focus3D.rotationY = 0;
        Pan3d.Scene_data.focus3D.rotationX = -45
        Pan3d.Scene_data.cam3D.distance = 250;

        //这是是移动2D的基础坐标
        scene2d.CanvasPostionModel.getInstance().tureMoveV2d = new Pan3d.Vector2D(this.x, this.y)
        scene2d.CanvasPostionModel.getInstance().resetSize();


        Pan3d.Scene_data.context3D.renderContext.clear(Pan3d.Scene_data.context3D.renderContext.DEPTH_BUFFER_BIT);//重置深度
        Pan3d.MathClass.getCamView(Pan3d.Scene_data.cam3D, Pan3d.Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
        Pan3d.Scene_data.context3D._contextSetTest.clear();
        this.scene.upFrame();

    }
    

}