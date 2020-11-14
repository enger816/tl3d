import { GameMapLayer } from "./layers/GameMapLayer";
import { MapConst } from "./configs/MapConst";

import LayaOverride2dSceneManager = tl3d.LayaOverride2dSceneManager;
import { TApp } from "../TApp";
import { Base2dScene } from "./layers/Base2dScene";
export class GameView2d  implements IGameView{
    private static TEMP_POINT: Laya.Point = new Laya.Point;
    private static TEMP_RECT: Laya.Rectangle = new Laya.Rectangle;

    /** 2d场景 */
    public scene: Base2dScene;

    /** 地图层 **/
    private _ground: GameMapLayer;

    /** 左上角 */
    private _topLeftPos: Laya.Point = new Laya.Point;

    /** 焦点 */
    private _forcusPos: Laya.Point = new Laya.Point;

    /** 视野区域失效 **/
    private _viewRectInvalid: boolean = true;
    private _lastBlockX: number = -1;
    private _lastBlockY: number = -1;
    private _block_rect: Laya.Rectangle = new Laya.Rectangle();

    /** 视野块的范围 **/
    private _checkViewRect: Laya.Rectangle = new Laya.Rectangle(1, 1, 0, 0);

    /**
     * 相机锁定
     */
    public cameraLock: Boolean = false;

    constructor() {
        this.scene = new Base2dScene();
        Laya.stage.addChild(this.scene);
    }

    /** 返回场景管理 */
    public get myScene(): LayaOverride2dSceneManager {
        return this.scene.tscene;
    }

    /**
     *  功能:返回相机顶点坐标 屏幕左上脚坐标
     *  参数:
     **/
    public getCameraTopPoint(): Laya.Point {
        return this._topLeftPos;
    }

    /**
     *  功能:返回相机右下脚坐标 屏幕右下脚坐标
     *  参数:
     **/
    public getCameraBottomRightPoint(): Laya.Point {
        GameView2d.TEMP_POINT.setTo(this._topLeftPos.x + Laya.stage.width, this._topLeftPos.y + Laya.stage.height);
        return GameView2d.TEMP_POINT;
    }


    /**
     *  功能:返回视野的区域
     *  参数:
     **/
    public getCameraTopRect(): Laya.Rectangle {
        GameView2d.TEMP_RECT.setTo(this._topLeftPos.x, this._topLeftPos.y, Laya.stage.width, Laya.stage.height);
        return GameView2d.TEMP_RECT;
    }

    /** 重置尺寸 */
    public resetSize(): void {
        if (this._ground) {
            this._ground.refreshCameraBounds();

            this.onPlayerMoveint(this._forcusPos.x, this._forcusPos.y);

            //坐标未同步前不加载地图
            /*         if(this._lastBlockX != -1 && this._lastBlockY != -1)
                    {
                        // this.syncCamera()
                        this._ground.checkViewport();
                    } */
        }
    }

    /**
     *  功能:设置地图对象
     *  参数:
     **/
    public initScene(): void {
        var gameMapLayer = new GameMapLayer();
		gameMapLayer.createMap(14096, 14096, null);
        this._ground = gameMapLayer;
        let scenIndex: number = Laya.stage.getChildIndex(this.scene);
        Laya.stage.addChildAt(gameMapLayer, scenIndex);

        // var mapModel:MapModel = DGContext.getInstance(MapModel);
        // var xRB:number = mapModel.editorCfg.mapLumpColumns - 3;
        // var yRB:number = mapModel.editorCfg.mapLumpRows - 3;

        this._checkViewRect.width = 40;
        this._checkViewRect.height = 26;

        //添加角色
        TApp.mainChar = this.createChar("role/3001_base.txt", 300, -400);
        this.createChar("role/3003_base.txt", 400, -400);
        this.createChar("role/3004_base.txt", 400, -600);
        //
        this.onPlayerMoveint(200, 200);
    }

    // // //创建角色
    private createChar(url: string, px: number, py: number): tl3d.ModelSceneChar {
        var mchar: tl3d.ModelSceneChar = new tl3d.ModelSceneChar();
        mchar.setRoleUrl(url);
        mchar.x = px;
        mchar.z = py;
        mchar.scale = 5;
        mchar.rotationY = 180;
        mchar.isEnableAnimPlanarShadow=true;
        this.addMovieDisplay(mchar);
        return mchar;
    }

    /**
     * 设置相机位置 
     * @param cx 像素坐标x
     * @param cy 像素坐标y
     */
    public syncCamera(cx: number, cy: number): void {
        if (!this._ground)
            return;

        this._forcusPos.setTo(cx, cy);

        let halfSceenW: number = Laya.stage.width / 2;
        let halfSceenH: number = Laya.stage.height / 2;

        var bound: Laya.Rectangle = this._ground.cameraBounds;

        if (cx < bound.x)
            cx = bound.x;
        if (cy < bound.y)
            cy = bound.y;

        if (cx > bound.width)
            cx = bound.width;
        if (cy > bound.height)
            cy = bound.height;

        //计算左上脚坐标
        cx = Math.floor(cx - halfSceenW);
        cy = Math.floor(cy - halfSceenH);

        this._topLeftPos.setTo(cx, cy);

        this._ground.x = -cx;
        this._ground.y = -cy;

        if (this.scene) {
            this.scene.x = -cx;
            this.scene.y = -cy;
        }


        //计算前后端地图块
        let blockX: number = cx / MapConst.MAP_BLOCK_WIDTH;
        let blockY: number = cy / MapConst.MAP_BLOCK_HEIGHT;

        if (blockX < this._checkViewRect.x)
            blockX = this._checkViewRect.y;

        if (blockY < this._checkViewRect.y)
            blockY = this._checkViewRect.y;

        if (blockX > this._checkViewRect.right)
            blockX = this._checkViewRect.right;

        if (blockY > this._checkViewRect.bottom)
            blockY = this._checkViewRect.bottom;

        if (blockX != this._lastBlockX || blockY != this._lastBlockY) {
            this._lastBlockX = blockX;
            this._lastBlockY = blockY;

            this._viewRectInvalid = true;
        }
    }

    /**
     *  功能:返回视野所处的地图块范围
     *  参数:any*/
    public getViewRect(): Laya.Rectangle {
        if (this._viewRectInvalid) {
            this._viewRectInvalid = false;

            //获取视野范围  contains右和下是小于 ，左和上是大于等于
            var leftBlock: number = this._lastBlockX - 1;
            //			var rightBlock:number = xBlock + 2;
            var topBlock: number = this._lastBlockY - 1;
            //			var bottomBlock:number = yBlock + 2;
            //			var rect:Rectangle = new Rectangle(leftBlock,topBlock,3,3);
            this._block_rect.setTo(leftBlock, topBlock, 3, 3);

            // SystemMgr.singleton.checkViewSystem.blockChange = true;
        }

        return this._block_rect;
    }

    /**
     * 玩家移动 2d场景像素坐标
     * @param px 2d场景像素坐标x
     * @param py 2d场景像素坐标y
     */
    public onPlayerMoveint(px: number, py: number): void {
        if (this.cameraLock)
            return;

        this.syncCamera(px, py);

        if (this._ground)
            this._ground.checkViewport();
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
    public addMovieDisplay(char: tl3d.ModelSceneChar) {
        this.scene.tscene.addMovieDisplay(char);
    }

    /**
     * 删除精灵
     */
    public removeMovieDisplay(char: tl3d.ModelSceneChar) {
        this.scene.tscene.removeMovieDisplay(char);//addMovieDisplay(char);
    }
}