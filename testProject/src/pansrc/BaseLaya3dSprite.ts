
//此类可用于修改场景的渲染队列 或显示3D 或2D的模式
class BaseLaya3dSprite extends layapan.LayaInsideSprite {

    constructor() {
    
        super();
     
    }
    protected upFrame(): void {
        tl3d.Scene_data.context3D.setWriteDepth(true);
        tl3d.Scene_data.context3D.setDepthTest(true);
        tl3d.TimeUtil.update();
        //设置为2D的镜头角度
        tl3d.Scene_data.focus3D.rotationY = 0;
        tl3d.Scene_data.focus3D.rotationX = -45
        tl3d.Scene_data.cam3D.distance = 250;

        //这是是移动2D的基础坐标
        scene2d.CanvasPostionModel.getInstance().tureMoveV2d = new tl3d.Vector2D(this.x, this.y)
        scene2d.CanvasPostionModel.getInstance().resetSize();


        tl3d.Scene_data.context3D.renderContext.clear(tl3d.Scene_data.context3D.renderContext.DEPTH_BUFFER_BIT);//重置深度
        tl3d.MathClass.getCamView(tl3d.Scene_data.cam3D, tl3d.Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
        tl3d.Scene_data.context3D._contextSetTest.clear();
        this.scene.upFrame();

    }
    

}