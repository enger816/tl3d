class Base3dSceneLayer extends Base2dSceneLayer {

    protected upFrame(): void {
        Pan3d.Scene_data.context3D.setWriteDepth(true);
        Pan3d.Scene_data.context3D.setDepthTest(true);
        Pan3d.TimeUtil.update();

        //这是是移动2D的基础坐标
        Pan3d.Scene_data.focus3D.x = 0
        Pan3d.Scene_data.focus3D.y = 0
        Pan3d.Scene_data.focus3D.z = 0


        Pan3d.Scene_data.context3D.renderContext.clear(Pan3d.Scene_data.context3D.renderContext.DEPTH_BUFFER_BIT);//重置深度
        var $copyM: Pan3d.Matrix3D = Pan3d.Scene_data.viewMatrx3D.clone();
        var $copyD: number = Pan3d.Scene_data.cam3D.distance
        this.makeNewMatrix()
        Pan3d.Scene_data.context3D._contextSetTest.clear();

        if (this._uiMask) {
            this._uiMask.x = this.x - 0
            this._uiMask.y = this.y - 0
            var renderContext: WebGLRenderingContext = Pan3d.Scene_data.context3D.renderContext;
            renderContext.enable(renderContext.STENCIL_TEST);
            renderContext.stencilMask(0xFF);
            renderContext.stencilFunc(renderContext.NEVER, this._uiMask.level, 0xFF);
            renderContext.stencilOp(renderContext.REPLACE, renderContext.REPLACE, renderContext.REPLACE);
            this._uiMask.update()
            renderContext.stencilFunc(renderContext.LESS, this._uiMask.level - 1, 0xFF);
            renderContext.stencilOp(renderContext.KEEP, renderContext.KEEP, renderContext.KEEP);

         //   this._uiMask.update()
        } 
              
        this.scene.upFrame();
        if (this._uiMask) {
            Pan3d.Scene_data.context3D.renderContext.disable(Pan3d.Scene_data.context3D.renderContext.STENCIL_TEST);
        }

        Pan3d.Scene_data.viewMatrx3D = $copyM;
        Pan3d.Scene_data.cam3D.distance = $copyD
    }
    public getGroundPos($x: number, $y: number): Pan3d.Vector3D {
        var $pos: Pan3d.Vector3D = GroundPosLaya.getGroundPos($x - this.x, $y - this.y, this.copyCam3d, this._windowRect, this.copyViewMatrx3D)
        return $pos
    }
    private _windowRect: Pan3d.Rectangle = new Pan3d.Rectangle(0, 0, 512, 512);
    private _uiMask: MaskScene3dLaya;
    private static maskeLevel: number=2
    public addMaskUi($w: number, $h: number): void {
        if (!this._uiMask) {
            this._uiMask = new MaskScene3dLaya();
            Base3dSceneLayer.maskeLevel++
            this._uiMask.level = Base3dSceneLayer.maskeLevel;
        }
        this._windowRect.width = $w
        this._windowRect.height = $h
        this._uiMask.width = this._windowRect.width;
        this._uiMask.height = this._windowRect.height;
    }
   
    private focus3d: Pan3d.Object3D = new Pan3d.Object3D;

    private copyViewMatrx3D: Pan3d.Matrix3D;
    public copyCam3d: Pan3d.Camera3D;

    public camDistance: number = 700;
    public camRotationX: number = -35
    public camRotationY: number = 0;
    public camPositionX:number=0;
    public camPositionY:number=0;
    public camPositionZ:number=0;
	public camViewLH: number = 1.25  //镜头透视系数  1-3. 修变这个值，需要配合镜头距离
    public camFar:number=2000; //镜头长短
    private makeNewMatrix(): void {
        this._windowRect.x = this.x + this._windowRect.width / 2;
        this._windowRect.y = this.y + this._windowRect.height / 2;

   
        var sceneViewHW = Math.max(this._windowRect.width, this._windowRect.height)

        var fovw: number = Pan3d.Scene_data.stageWidth 
        var fovh: number = Pan3d.Scene_data.stageHeight 
        sceneViewHW = Math.max(fovw, fovh)

        Pan3d.Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(this.camViewLH, 1, 10, this.camFar);
        Pan3d.Scene_data.viewMatrx3D.appendScale(1 * (sceneViewHW / fovw * 2), fovw / fovh * (sceneViewHW / fovw * 2), 1);
        this.copyViewMatrx3D = Pan3d.Scene_data.viewMatrx3D.clone();


        Pan3d.Scene_data.cam3D.distance = this.camDistance;
        this.focus3d.rotationX = this.camRotationX;
        this.focus3d.rotationY = this.camRotationY;
        this.focus3d.x = this.camPositionX;
        this.focus3d.y = this.camPositionY;
        this.focus3d.z = this.camPositionZ;
        // Pan3d.Scene_data.viewMatrx3D.appendTranslation(-1 + (this._windowRect.x / Pan3d.Scene_data.stageWidth) * 2, 1 - (this._windowRect.y / Pan3d.Scene_data.stageHeight) * 2, 0)
        Pan3d.MathClass.getCamView(Pan3d.Scene_data.cam3D, this.focus3d); //一定要角色帧渲染后再重置镜头矩阵

        this.cloneCam3d(Pan3d.Scene_data.cam3D);
    }
    private cloneCam3d($temp: Pan3d.Camera3D): void {
        this.copyCam3d = new Pan3d.Camera3D;
        this.copyCam3d.x = $temp.x
        this.copyCam3d.y = $temp.y
        this.copyCam3d.z = $temp.z
        this.copyCam3d.rotationX = $temp.rotationX
        this.copyCam3d.rotationY = $temp.rotationY
        this.copyCam3d.rotationZ = $temp.rotationZ
    }
}
