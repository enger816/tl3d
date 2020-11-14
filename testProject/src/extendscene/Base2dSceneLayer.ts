
//此类可用于修改场景的渲染队列 或显示3D 或2D的模式
class Base2dSceneLayer extends layapan.LayaInsideSprite {
    public resId: string;
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
    }

    /**基于偏移量设置位置 */
    setPosition(x: number, y?: number): void {
        this.x += x;
        this.y += y;
    }

    /**基于偏移量设置位置 */
    setPos(x: number, y?: number): void {
        this.x = x;
        this.y = y;
    }

    /**
     * 充值镜头
     */
    protected upFrame(): void {
        Scene_data.context3D.setWriteDepth(true);
        Scene_data.context3D.setDepthTest(true);
        tl3d.TimeUtil.update();
        //设置为2D的镜头角度
        Scene_data.focus3D.rotationY = 0;
        Scene_data.focus3D.rotationX = -45;
        Scene_data.cam3D.distance = 250;

        //这是是移动2D的基础坐标
        scene2d.CanvasPostionModel.getInstance().tureMoveV2d = new tl3d.Vector2D(this.x, this.y)
        scene2d.CanvasPostionModel.getInstance().resetSize();


        Scene_data.context3D.renderContext.clear(Scene_data.context3D.renderContext.DEPTH_BUFFER_BIT);//重置深度
        tl3d.MathClass.getCamView(Scene_data.cam3D, Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
        Scene_data.context3D._contextSetTest.clear();
        this.scene.upFrame();

    }

    public get3dPos($x: number, $y: number): tl3d.Vector3D {
        var $nScale: number = 0.25 / scene2d.Override2dEngine.htmlScale
        var $tx: number = $x * $nScale;
        var $tz: number = $y * $nScale / (Math.sin(45 * Math.PI / 180)) * -1;
        return new tl3d.Vector3D($tx, 0, $tz);
    }


    /**
     * 添加ui角色
     * @param mid 
     * @param postionx 
     * @param postiony 
     * @param rotate 
     * @param scale 
     */
    public addModelChar(mid: string, postionx: number, postiony: number, rotate: number = 180, scale: number = 2.7, rotationz: number = 0): GameUIChar {
        if (!this.sceneChar) {
            this.sceneChar = new GameUIChar();
            this.scene.addMovieDisplay(this.sceneChar);
        }
        this.sceneChar.play(tl3d.CharAction.STANAD);
        this.sceneChar.setRoleUrl(getRoleUrl(mid));
        this.sceneChar.forceRotationY = rotate;
        this.sceneChar.rotationZ = rotationz;
        this.sceneChar.set2dPos(postionx, postiony);  //坐标
        this.sceneChar.scale = scale;
        return this.sceneChar;
    }

    //移除UI角色
    public removeModelChar(sceneChar: GameUIChar) {
        if (!sceneChar) return;
        sceneChar.removeSelf();
        sceneChar = null;
    }


    //目标面板
    public targetPanel: Laya.Component;
    //上限坐标控件
    public topBounds: Laya.Component;
    //下限坐标控件
    public bottomBounds: Laya.Component;
    //旋转对象
    public sceneChar: GameUIChar;
    /**鼠标按下状态 */
    private _mouseState: boolean;

    /**
     * 设置模型旋转盒子
     * @param targetp 
     * @param topb 
     * @param bottomb 
     */
    public setModelBox(targetp: Laya.Component, topb: Laya.Component, bottomb: Laya.Component) {
        this.targetPanel = targetp;
        this.topBounds = topb;
        this.bottomBounds = bottomb;

    }

    /**显示 */
    public onShow(): void {
        if (!this.targetPanel) return;
        this.targetPanel.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        this.targetPanel.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        this.targetPanel.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
    }

    /**关闭 */
    public onExit(): void {
        this.sceneChar = null;
        this.scene.removeAllMovieDisplay();
        this.scene.clearAllParticle();
        if (!this.targetPanel) return;
        this.targetPanel.off(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        this.targetPanel.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
    }

    public clearSceneChar() {
        if (this.sceneChar) {
            this.scene.removeMovieDisplay(this.sceneChar);
            this.sceneChar.destory();
            this.sceneChar = null;
        }
    }

    /**点击开始的点 */
    private _startPosX: number = 0;
    private _startPosY: number = 0;
    private _cutShowGods: boolean = false;

    /**点击开始 */
    private mouseDown(e: Laya.Event): void {
        this._mouseState = true;
        this._cutShowGods = false;
        if (e.stageY <= this.bottomBounds.y
            && e.stageY >= this.topBounds.y) {
            this._startPosX = e.stageX;
            this._startPosY = e.stageY;
            this._cutShowGods = true;
        }
    }

    /**点击移动 拖动 */
    private mouseMove(e: Laya.Event): void {
        if (!this._mouseState) {
            return;
        }
        if (e.stageY > this.bottomBounds.y || e.stageY < this.topBounds.y || !this._cutShowGods) {
            return;
        }
        let diffx = (e.stageX - this._startPosX);
        this._startPosX = e.stageX;
        if (this.sceneChar) {
            this.sceneChar.rotationY -= diffx;
        }
    }

    private mouseUp(e: Laya.Event): void {
        this._mouseState = false;
    }

    private getEffectUrl(name: string): string {
        return "effect/scene/" + name + getBaseUrl() + ".txt";
    }

    /**
    * 播放特效
    * @param targetid 
    * @param url 
    * @param pos 
    * @param r 
    */
    public addEffect($thisobj, $effect_id: number, $pos: tl3d.Vector3D, $scale: number = 3, $rotationX: any = 30, $fun: Function = null, rotationY: any = 0, rotationZ: any = 0, autoRemove: boolean = false, timeScale: number = 1) {
        let url = this.getEffectUrl(String($effect_id));
        this.scene.groupDataMgr.scene = this.scene;
        this.scene.groupDataMgr.getGroupData(Scene_data.fileRoot + url, (groupRes: tl3d.GroupRes) => {
            for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                var item: tl3d.GroupItem = groupRes.dataAry[i];
                if (item.types == tl3d.BaseRes.SCENE_PARTICLE_TYPE) {
                    var $particle: tl3d.CombineParticle = tl3d.ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + item.particleUrl);
                    $particle.x = $pos.x;
                    $particle.y = $pos.y;
                    $particle.z = $pos.z;
                    $particle.scaleX = $scale
                    $particle.scaleY = $scale
                    $particle.scaleZ = $scale
                    $particle.rotationZ = rotationZ;
                    $particle.rotationY = rotationY;
                    $particle.rotationX = $rotationX;
                    $particle.timeScale = timeScale;
                    this.scene.addParticle($particle);
                    if ($fun) {
                        $fun.call($thisobj, $particle);
                    }
                    if (autoRemove) {
                        $particle.onComplete = (particle) => {
                            this.scene.removeParticle(particle);
                        };
                    }
                } else {
                    console.log("播放的不是单纯特效");
                }
            }
        })
    }

    /**
     * 移除特效
     * @param particle 
     */
    public removeEffect($particle) {
        this.scene.removeParticle($particle);
    }

}