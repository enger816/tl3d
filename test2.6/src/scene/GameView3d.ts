import { ModelSceneChar } from "../engine/tl3dinit/scenedis/ModelSceneChar";
import { TApp } from "../TApp";
import { Base3dScene } from "./layers/Base3dScene";
export class GameView3d implements IGameView {

    /** 2d场景 */
    public scene: Base3dScene;

    /**
     * 相机锁定
     */
    public cameraLock: Boolean = false;

    constructor() {
        this.scene = new Base3dScene();
        Laya.stage.addChild(this.scene);
    }

    /** 重置尺寸 */
    public resetSize(): void {

    }

    public getViewRect(): Laya.Rectangle {
        return null;
    }

    public getCameraTopRect(): Laya.Rectangle {
        return null;
    }

    /**
     *  功能:设置地图对象
     *  参数:
     **/
    public initScene(): void {
        this.scene.tscene.loadScene("10000_base", (comp: any) => { }, (process: any) => { }, (anly: any) => { });
        //添加角色
        TApp.mainChar = this.createChar("role/3001_base.txt", 300, -400);
        this.createChar("role/3003_base.txt", 400, -400);
        this.createChar("role/3004_base.txt", 400, -600);
        //
        // this.onPlayerMoveint(200, 200);
        Laya.stage.on(Laya.Event.MOUSE_WHEEL, this, this.onWheel);
        TApp.cameraView.rotationX.changeHandler = Laya.Handler.create(this, this.onRXChange,null,false);
        TApp.cameraView.rotationY.changeHandler = Laya.Handler.create(this, this.onRYChange,null,false);
        TApp.cameraView.posX.changeHandler = Laya.Handler.create(this, this.onPoXChange,null,false);
        TApp.cameraView.posY.changeHandler = Laya.Handler.create(this, this.onPoYChange,null,false);
        TApp.cameraView.posZ.changeHandler = Laya.Handler.create(this, this.onPoZChange,null,false);
        TApp.cameraView.rotationY.value=this.scene.camDistance;
    }

    private onWheel(e: Laya.Event): void {
        this.scene.camDistance += e.delta;
    }

    private onRXChange(): void {
        this.scene.camRotationX = TApp.cameraView.rotationX.value;
        console.log("this.scene3d.rx:",this.scene.camRotationX);
    }

    private onRYChange(): void {
        this.scene.camDistance = TApp.cameraView.rotationY.value;
        console.log("this.scene3d.ry:",this.scene.camDistance);
    }

    private onPoXChange(): void {
        this.scene.camPositionX = TApp.cameraView.posX.value;
        console.log("this.scene3d.PosX:",this.scene.camPositionX);
    }

    private onPoYChange(): void {
        this.scene.camPositionY = TApp.cameraView.posY.value;
        console.log("this.scene3d.posY:",this.scene.camPositionY);
    }

    private onPoZChange(): void {
        this.scene.camPositionZ = TApp.cameraView.posZ.value;
        console.log("this.scene3d.posZ:",this.scene.camPositionZ);
    }

    // // //创建角色
    private createChar(url: string, px: number, py: number): ModelSceneChar {
        var mchar: ModelSceneChar = new ModelSceneChar();
        mchar.setRoleUrl(url);
        mchar.x = px;
        mchar.z = py;
        mchar.scale = 5;
        mchar.rotationY = 180;
        mchar.isEnableAnimPlanarShadow = true;
        this.addMovieDisplay(mchar);
        return mchar;
    }

    /**
     * 玩家移动 2d场景像素坐标
     * @param px 2d场景像素坐标x
     * @param py 2d场景像素坐标y
     */
    public onPlayerMoveint(px: number, py: number): void {
        if (this.cameraLock)
            return;
    }

    /**
     *  移动地图，2d地图坐标
     * @param mapX 
     * @param mapY
     * 
     */
    public syncMap(mapX: number, mapY: number): void {
        this.onPlayerMoveint(mapX, mapY);
    }


    /**
     * 添加精灵
     */
    public addMovieDisplay(char: ModelSceneChar) {
        this.scene.tscene.addMovieDisplay(char);
    }

    /**
     * 删除精灵
     */
    public removeMovieDisplay(char: ModelSceneChar) {
        this.scene.tscene.removeMovieDisplay(char);//addMovieDisplay(char);
    }
}