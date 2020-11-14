class Base3dSceneLayer extends Base2dSceneLayer {
    public camMoveFun: Function;

    constructor() {
        super();
    }

    protected upFrame(): void {
        Scene_data.context3D.setWriteDepth(true);
        Scene_data.context3D.setDepthTest(true);
        tl3d.TimeUtil.update();

        //这是是移动2D的基础坐标
        Scene_data.focus3D.x = 0
        Scene_data.focus3D.y = 0
        Scene_data.focus3D.z = 0


        Scene_data.context3D.renderContext.clear(Scene_data.context3D.renderContext.DEPTH_BUFFER_BIT);//重置深度
        var $copyM: tl3d.Matrix3D = Scene_data.viewMatrx3D.clone();
        var $copyD: number = Scene_data.cam3D.distance
        this.makeNewMatrix()
        Scene_data.context3D._contextSetTest.clear();
        this.scene.upFrame();
        Scene_data.viewMatrx3D = $copyM;
        Scene_data.cam3D.distance = $copyD
    }
    public getGroundPos($x: number, $y: number): tl3d.Vector3D {
        var $pos: tl3d.Vector3D = GroundPosLaya.getGroundPos($x - this.x, $y - this.y, this.copyCam3d, this._windowRect, this.copyViewMatrx3D)
        return $pos
    }
    private _windowRect: tl3d.Rectangle = new tl3d.Rectangle(0, 0, 512, 512);

    public focus3d: tl3d.Object3D = new tl3d.Object3D;
    // public lookTag: tl3d.Object3D;

    public copyViewMatrx3D: tl3d.Matrix3D;
    public copyCam3d: tl3d.Camera3D;

    public camDistance: number = 700;
    public camRotationX: number = -35
    public camRotationY: number = 0;
    public camPositionX: number = 0;
    public camPositionY: number = 0;
    public camPositionZ: number = 0;
    public camViewLH: number = 0.85  //镜头透视系数  1-3. 修变这个值，需要配合镜头距离
    public camFar: number = 5000; //镜头长短
    // private _camAotuMove: boolean = false
    public camAotuMove: boolean = false

    public makeNewMatrix(): void {
        this._windowRect.x = this.x + this._windowRect.width / 2;
        this._windowRect.y = this.y + this._windowRect.height / 2;


        // var sceneViewHW = Math.max(this._windowRect.width, this._windowRect.height)

        var fovw: number = Scene_data.stageWidth
        var fovh: number = Scene_data.stageHeight
        var sceneViewHW = Math.max(fovw, fovh)

        Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(this.camViewLH, 1, 10, this.camFar);
        Scene_data.viewMatrx3D.appendScale(1 * (sceneViewHW / fovw * 2), fovw / fovh * (sceneViewHW / fovw * 2), 1);
        this.copyViewMatrx3D = Scene_data.viewMatrx3D.clone();

        if (this.camAotuMove) {
            if (this.camMoveFun) {
                this.camMoveFun();
            }
        }

        Scene_data.cam3D.distance = this.camDistance;
        this.focus3d.rotationX = this.camRotationX;
        this.focus3d.rotationY = this.camRotationY;
        this.focus3d.x = this.camPositionX;
        this.focus3d.y = this.camPositionY;
        this.focus3d.z = this.camPositionZ;
        Scene_data.viewMatrx3D.appendTranslation(-1 + (this._windowRect.x / Scene_data.stageWidth) * 2, 1 - (this._windowRect.y / Scene_data.stageHeight) * 2, 0)
        tl3d.MathClass.getCamView(Scene_data.cam3D, this.focus3d); //一定要角色帧渲染后再重置镜头矩阵
        this.cloneCam3d(Scene_data.cam3D);
    }

    public setLook(tag:tl3d.Object3D){
        this.focus3d.rotationX = tag.rotationX;
        this.focus3d.rotationY = tag.rotationY;
        this.focus3d.x = tag.x;
        this.focus3d.y = tag.y;
        this.focus3d.z = tag.z;
        // Scene_data.cam3D.lookAt(tag);
    }

    public cloneCam3d($temp: tl3d.Camera3D): void {
        this.copyCam3d = new tl3d.Camera3D;
        this.copyCam3d.x = $temp.x
        this.copyCam3d.y = $temp.y
        this.copyCam3d.z = $temp.z
        this.copyCam3d.rotationX = $temp.rotationX
        this.copyCam3d.rotationY = $temp.rotationY
        this.copyCam3d.rotationZ = $temp.rotationZ
    }

    //退出3d场景
    public onExit(): void  {
        this.scene.clearStaticScene();
        tl3d.SceneResManager.getInstance().clearSceneUseById(this.resId);
    }
}

class Base3dSceneLayerExt extends Base3dSceneLayer {
    constructor() {
        super();
    }

    public makeNewMatrix(): void {
        var fovw: number = Scene_data.stageWidth
        var fovh: number = Scene_data.stageHeight
        var sceneViewHW = Math.max(fovw, fovh)

        Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(this.camViewLH, 1, 10, this.camFar);
        Scene_data.viewMatrx3D.appendScale(1 * (sceneViewHW / fovw * 2), fovw / fovh * (sceneViewHW / fovw * 2), 1);
        this.copyViewMatrx3D = Scene_data.viewMatrx3D.clone();

        if (this.camAotuMove) {
            if (this.camMoveFun) {
                this.camMoveFun();
            }
        }

        Scene_data.cam3D.distance = this.camDistance;
        this.focus3d.rotationX = this.camRotationX;
        this.focus3d.rotationY = this.camRotationY;
        this.focus3d.x = this.camPositionX;
        this.focus3d.y = this.camPositionY;
        this.focus3d.z = this.camPositionZ;
        tl3d.MathClass.getCamView(Scene_data.cam3D, this.focus3d); //一定要角色帧渲染后再重置镜头矩阵
        this.cloneCam3d(Scene_data.cam3D);
    }
}
