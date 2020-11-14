import { Base2dScene } from "./Base2dScene";
import { GroundPosLaya } from "./GroundPosLaya";
import Scene_data = tl3d.Scene_data

export class Base3dScene extends Base2dScene {
    public camMoveFun: Function;
    private _particletime: number;
    constructor() {
        super();
        this._windowRect = new tl3d.Rectangle(0, 0, Scene_data.stageWidth, Scene_data.stageHeight);
        //需要延迟播放粒子，和暂定再把这里打开
        // this.scene.updateParticleTime = () => {
        //     var _tempTime: number = TimeUtil.getTimer(this.scene.startTime);
        //     if (!this._particletime || this._particletime == 0) { //开始
        //         this._particletime = _tempTime;
        //     }
        //     var t: number = _tempTime - this._particletime;
        //     this._particletime = _tempTime;
        //     for (var i: number = 0; i < this.scene.particleList.length; i++) {
        //         if (!this.scene.particleList[i].sceneVisible) {
        //             continue;
        //         }
        //         this.scene.particleList[i].updateTime(this.pauseAni ? 0 : t);
        //     }
        // }
    }


    //画面暂停
    public pauseAni: boolean;
    //画面暂停
    public static spauseAni: boolean;

    public rx: number=-10;
    public ry: number=0;
    public rz: number=0;
    public camFar2: number=100;

    protected upFrame(): void {
        Scene_data.context3D.setWriteDepth(true);
        Scene_data.context3D.setDepthTest(true);
        tl3d.TimeUtil.update();
        //设置为2D的镜头角度
        Scene_data.focus3D.rotationY = this.ry;
        Scene_data.focus3D.rotationX = this.rx;//-45;//tl3d.CanvasPostionModel.SCENE_2D_ROTATION_45;
        Scene_data.focus3D.rotationZ = this.rz;
        Scene_data.cam3D.distance = this.camFar2;
        //这是是移动2D的基础坐标
        tl3d.CanvasPostionModel.getInstance().tureMoveV2d = new tl3d.Vector2D(this.x, this.y)
        tl3d.CanvasPostionModel.getInstance().resetSize();
        Scene_data.context3D.renderContext.clear(WebGLRenderingContext.DEPTH_BUFFER_BIT);//重置深度
        tl3d.MathClass.getCamView(Scene_data.cam3D, Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
        Scene_data.context3D._contextSetTest.clear();
        this.tscene.upFrame();
    }

    // protected upFrame(): void {
    //     if (!this.parent) {
    //         return;
    //     }
    //     Scene_data.context3D.setWriteDepth(true);
    //     Scene_data.context3D.setDepthTest(true);
    //     if (!this.pauseAni) { //让时间停止
    //         tl3d.TimeUtil.update();
    //     }
    //     //这是是移动2D的基础坐标
    //     Scene_data.focus3D.x = 0
    //     Scene_data.focus3D.y = 0
    //     Scene_data.focus3D.z = 0
    //     Scene_data.context3D.renderContext.clear(Scene_data.context3D.renderContext.DEPTH_BUFFER_BIT);//重置深度
    //     var $copyM: tl3d.Matrix3D = Scene_data.viewMatrx3D.clone();
    //     var $copyD: number = Scene_data.cam3D.distance
    //     this.makeNewMatrix()
    //     Scene_data.context3D._contextSetTest.clear();
    //     this.tscene.upFrame();
    //     Scene_data.viewMatrx3D = $copyM;
    //     Scene_data.cam3D.distance = $copyD
    // }

    public getGroundPos($x: number, $y: number): tl3d.Vector3D {
        var $pos: tl3d.Vector3D = GroundPosLaya.getGroundPos($x - this.x, $y - this.y, this.copyCam3d, this._windowRect, this.copyViewMatrx3D)
        return $pos
    }
    private _windowRect: tl3d.Rectangle;

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
    public camViewLH: number = 1.10;  //镜头透视系数  1-3. 修变这个值，需要配合镜头距离
    public camFar: number = 10000; //镜头长短
    // private _camAotuMove: boolean = false
    public camAotuMove: boolean = false

    public makeNewMatrix(): void {
        this._windowRect.x = this.x + this._windowRect.width / 2;
        this._windowRect.y = this.y + this._windowRect.height / 2;
        // var sceneViewHW = Math.max(this._windowRect.width, this._windowRect.height)
        var fovw: number = Scene_data.stageWidth
        var fovh: number = Scene_data.stageHeight
        var sceneViewHW = Math.max(fovw, fovh)
        Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(this.camViewLH, 1, 50, this.camFar);
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

    /**
    * 播放特效
    * @param targetid 
    * @param url 
    * @param pos 
    * @param r 
    */
    // public addEffect($thisobj, $effect_id: number, $pos, $scale: number = 3, $rotationX: any = 30, $fun: Function = null, rotationY: any = 0, rotationZ: any = 0, autoRemove: boolean = false, timeScale: number = 1, completeCb: Function = null) {
    //     let url = getEffectUrl(String($effect_id));
    //     this.scene.groupDataMgr.scene = this.scene;
    //     this.scene.groupDataMgr.getGroupData(Scene_data.fileRoot + url, (groupRes: tl3d.GroupRes) => {
    //         for (var i: number = 0; i < groupRes.dataAry.length; i++) {
    //             var item: tl3d.GroupItem = groupRes.dataAry[i];
    //             if (item.types == tl3d.BaseRes.SCENE_PARTICLE_TYPE) {
    //                 var $particle: tl3d.CombineParticle = tl3d.ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + item.particleUrl);
    //                 $particle.x = $pos.x;
    //                 $particle.y = $pos.y;
    //                 $particle.z = $pos.z;
    //                 $particle.scaleX = $scale
    //                 $particle.scaleY = $scale
    //                 $particle.scaleZ = $scale
    //                 $particle.rotationZ = rotationZ;
    //                 $particle.rotationY = rotationY;
    //                 $particle.rotationX = $rotationX;
    //                 $particle.timeScale = timeScale;
    //                 this.scene.addParticle($particle);
    //                 if ($fun) {
    //                     $fun.call($thisobj, $particle);
    //                 }
    //                 if (autoRemove || completeCb) {
    //                     $particle.onComplete = (particle) => {
    //                         if (autoRemove) {
    //                             this.scene.removeParticle(particle);
    //                         }
    //                         if (completeCb) {
    //                             completeCb.call($thisobj, particle);
    //                         }
    //                     };
    //                 }
    //             } else {
    //                 console.log("播放的不是单纯特效");
    //             }
    //         }
    //     })
    // }

    public setLook(tag: tl3d.Object3D) {
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
    public onExit(): void {
        this.scene.clearStaticScene();
        // tl3d.SceneResManager.getInstance().clearSceneUseById(this.resId);
    }
}

// export class Base3dSceneLayerExt extends Base3dScene {
//     constructor() {
//         super();
//     }

//     public makeNewMatrix(): void {
//         var fovw: number = Scene_data.stageWidth
//         var fovh: number = Scene_data.stageHeight
//         var sceneViewHW = Math.max(fovw, fovh)
//         Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(this.camViewLH, 1, 10, this.camFar);
//         Scene_data.viewMatrx3D.appendScale(1 * (sceneViewHW / fovw * 2), fovw / fovh * (sceneViewHW / fovw * 2), 1);
//         this.copyViewMatrx3D = Scene_data.viewMatrx3D.clone();
//         if (this.camAotuMove) {
//             if (this.camMoveFun) {
//                 this.camMoveFun();
//             }
//         }
//         Scene_data.cam3D.distance = this.camDistance;
//         this.focus3d.rotationX = this.camRotationX;
//         this.focus3d.rotationY = this.camRotationY;
//         this.focus3d.x = this.camPositionX;
//         this.focus3d.y = this.camPositionY;
//         this.focus3d.z = this.camPositionZ;
//         tl3d.MathClass.getCamView(Scene_data.cam3D, this.focus3d); //一定要角色帧渲染后再重置镜头矩阵
//         this.cloneCam3d(Scene_data.cam3D);
//     }
// }

