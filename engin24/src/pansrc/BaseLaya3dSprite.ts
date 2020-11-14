import {Vector2D} from "../../pan3d/engine/math/Vector2D"
import {LayaInsideSprite} from "./layapan/LayaInsideSprite"
import {LayaScene2dInit} from "./layapan/overridebase/LayaScene2dInit"
import {Scene_data} from "../../pan3d/engine/context/Scene_data"
import {TimeUtil} from "../../pan3d/engine/utils/TimeUtil"
import {CanvasPostionModel} from "../../pan3dinit/scene2d/CanvasPostionModel"
import {MathClass} from "../../pan3d/engine/math/MathClass"

//此类可用于修改场景的渲染队列 或显示3D 或2D的模式
class BaseLaya3dSprite extends layapan.LayaInsideSprite {

    constructor() {
        if (!layapan.LayaScene2dInit.isConfig) {
            layapan.LayaScene2dInit.initData();
        }
        super();
     
    }
    protected upFrame(): void {
        Scene_data.context3D.setWriteDepth(true);
        Scene_data.context3D.setDepthTest(true);
        TimeUtil.update();
        //设置为2D的镜头角度
        Scene_data.focus3D.rotationY = 0;
        Scene_data.focus3D.rotationX = -45
        Scene_data.cam3D.distance = 250;

        //这是是移动2D的基础坐标
        scene2d.CanvasPostionModel.getInstance().tureMoveV2d = new Vector2D(this.x, this.y)
        scene2d.CanvasPostionModel.getInstance().resetSize();


        Scene_data.context3D.renderContext.clear(Scene_data.context3D.renderContext.DEPTH_BUFFER_BIT);//重置深度
        MathClass.getCamView(Scene_data.cam3D, Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
        Scene_data.context3D._contextSetTest.clear();
        this.scene.upFrame();

    }
    

}