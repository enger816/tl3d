import { RpgTile } from "./RpgTile";
import { MapConst } from "../configs/MapConst";
import { TApp } from "../../TApp";
import { BaseEvent } from "../../engine/tl3d/engine/events/BaseEvent";
import { CombineParticle } from "../../engine/tl3d/engine/particle/CombineParticle";

/**
 * 地图层
 */
export class GameMapLayer extends Laya.Sprite {
    /** 小地图材质 **/
    private _smallResource: Laya.Texture;

    /** 地图像素尺寸 **/
    private _tempPixelW: number;
    private _tempPixelH: number;

    /**
     * 相机移动范围
     */
    private _cameraBounds: Laya.Rectangle;

    /** 地图块数量 **/
    private _columns: number;
    private _rows: number;

    /** 地图块图片对象 */
    // private _tilesRefResources:Array<Laya.Texture>;

    /** 地图块显示对象 */
    private tiles: RpgTile[];

    /** 贴图加载状态  null=未加载  true=加载中 false=已经释放**/
    //  public _tileMatStatus:Array<Boolean>;

    /**视野相关变量 */
    private tempChunkRect: Laya.Rectangle = new Laya.Rectangle();
    private _lastChunkRect: Laya.Rectangle = new Laya.Rectangle();
    private tempAChunk: number[] = [];
    private tempBChunk: number[] = [];

    /**
     * 初始化地图，侦听地图事件 
     * @param mapLayer 
     */
    public initMapMouseEvent(map: GameMapLayer): void {
        this.mouseEnabled = true;
        this.on(Laya.Event.MOUSE_DOWN, this, this.onClick);
    }

    /**
     * 移除地图场景，移除事件 
     */
    public mapDestory(): void {
        this.off(Laya.Event.MOUSE_DOWN, this, this.onClick);
    }

    /**
     * 鼠标点击地图寻路
     */
    public onClick(e: Laya.Event): void {
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                this.moveToPoint();
                break;
        }
    }

    /**
     * 移除地图场景，移除事件 
     */
    private moveToPoint(): void {
        var intX: number = this.mouseX / MapConst.TILE_SIZE | 0;
        var intY: number = this.mouseY / MapConst.TILE_SIZE | 0;
        var pos = new Laya.Point(intX, intY);
        var scene3d = TApp.gameView.scene.tscene;
        // SystemMgr.singleton.findPathSystem.currMapFindPathFixPos(null,pos);
        //处理光标
        var effect: CombineParticle = scene3d.particleManager.getParticleByte("content/particleresources/ef_all/buff/cursor_effect_byte.txt");
        scene3d.particleManager.addParticle(effect);
        effect.x = this.mouseX;
        effect.z = this.mouseY;
        /*    effectCom.effect.x = this.mapLayer.mouseX;
               effectCom.effect.z = -this.mapLayer.mouseY * Scene_data.SCALE_Z; */
        effect.addEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);
    }

    private onPlayCom(value: BaseEvent): void {
        TApp.gameView.scene.tscene.particleManager.removeParticle(<CombineParticle>(value.target))
    }


    /**
     *  功能:返回相机可移动范围
     *  参数:
     **/
    public get cameraBounds(): Laya.Rectangle {
        return this._cameraBounds;
    }

    /**
     *  功能:创建地图
     *  参数:
     **/
    public createMap(pixelWidth: number, pixelHeight: number, miniMapResource: Laya.Texture): void {
        this._tempPixelW = pixelWidth;
        this._tempPixelH = pixelHeight;

        this._smallResource = miniMapResource;

        this.refreshCameraBounds();
        this.initMap();

        //   this.updateCameraPos(0,0);
    }

    /**
     * 刷新相机范围 
     */
    public refreshCameraBounds(): void {
        let halfSceenW: number = Laya.stage.width / 2;
        let halfSceenH: number = Laya.stage.height / 2;


        this._cameraBounds = new Laya.Rectangle(halfSceenW, halfSceenH, this._tempPixelW - halfSceenW, this._tempPixelH - halfSceenH);
    }

    /**
     *  功能:初始化地图
     *  参数:
     **/
    public initMap(): void {

        this._columns = Math.ceil(this._tempPixelW / MapConst.CHUNK_SIZE);
        this._rows = Math.ceil(this._tempPixelH / MapConst.CHUNK_SIZE);

        this.tiles = [];
        /*         this._tilesRefResources = new Array<Laya.Texture>(this._columns * this._rows);
                this._tileMatStatus = new Array<Boolean>(this._columns * this._rows);
        
                for(let rowIndex:number = 0;rowIndex < this._rows;rowIndex++)
                {
                    for(let columnIndex:number = 0;columnIndex < this._columns;columnIndex++)
                    {
                        var index:number = rowIndex * this._columns + columnIndex;
                        this._tileMatStatus[index] = false;
                    }
                } */
    }

    /**
     * 更新相机位置,移动地图
     * @param  
     * @param  
     */
    public updateCameraPos($x: number, $y: number): void {
        /*     var currCol:number = Math.round($x/MapConst.CHUNK_SIZE);
            var currRow:number = Math.round($y/MapConst.CHUNK_SIZE);
            
            var screenCols:number = Math.ceil(Laya.stage.width/MapConst.CHUNK_SIZE) + 1;
            var screenRows:number = Math.ceil(Laya.stage.height/MapConst.CHUNK_SIZE) + 1;
    
            var halfScreenCols: number = Math.ceil(screenCols / 2);
            var halfScreenRows: number = Math.ceil(screenRows / 2);
    
            var minCol: number = currCol - halfScreenCols;
            var maxCol: number = currCol + halfScreenCols;
            if (minCol < 0) {
                maxCol += -minCol;
                minCol = 0;
            }
            if (maxCol > this._columns) {
                minCol -= (maxCol - this._columns);
                maxCol = this._columns;
            }
            var minRow: number = currRow - halfScreenRows;
            var maxRow: number = currRow + halfScreenRows;
            if (minRow < 0) {
                maxRow += -minRow;
                minRow = 0;
            }
            if (maxRow > this._rows) {
                minRow -= (maxRow - this._rows);
                maxRow = this._rows;
            }
    
            var screenTiles = [];
    
            for(let rowIndex:number = minCol;rowIndex <= maxCol;rowIndex++)
            {
                if(rowIndex < 0 || rowIndex >= this._rows)
                    continue;
    
                for(let columnIndex:number = minRow;columnIndex <= maxRow;columnIndex++)
                {
                    if(columnIndex < 0 || rowIndex >= this._columns)
                        continue;
    
                    var index:number = rowIndex * this._columns + columnIndex;
                    var tileKey: string = rowIndex + "_" + columnIndex;
                    var tile:RpgTile = this.tiles[tileKey];
                    if(!tile){
                        tile = new RpgTile();
                        tile.init(`test`,columnIndex,rowIndex);
                        this.tiles[tileKey] = tile;
                    }
    
                    if(!tile.parent){
                        this.addChild(tile);
                    }
                }
            } */
    }

    /**
     *  功能:检测视野
     *  参数:
     **/
    public checkViewport(): void {


        var topRect: Laya.Rectangle = TApp.gameView.getCameraTopRect();

        this.tempChunkRect.x = Math.floor(topRect.x / MapConst.CHUNK_SIZE);
        this.tempChunkRect.y = Math.floor(topRect.y / MapConst.CHUNK_SIZE);

        this.tempChunkRect.width = Math.ceil(topRect.right / MapConst.CHUNK_SIZE) - this.tempChunkRect.x;
        if (this.tempChunkRect.right > this._columns)
            this.tempChunkRect.width = this._columns - this.tempChunkRect.x;

        this.tempChunkRect.height = Math.ceil(topRect.bottom / MapConst.CHUNK_SIZE) - this.tempChunkRect.y;
        if (this.tempChunkRect.bottom > this._rows)
            this.tempChunkRect.height = this._rows - this.tempChunkRect.y;

        //还必须得同时检测左上和右下脚
        if (this._lastChunkRect.equals(this.tempChunkRect))
            return;

        var getFreeChunks: number[] = this.getSubtractionChunk(this._lastChunkRect, this.tempChunkRect);
        for (let value of getFreeChunks) {
            var freeRowIndex: number = value / this._columns | 0;
            var freeColumnIndex: number = value % this._columns | 0;
            this.tryToFreeTile(freeColumnIndex, freeRowIndex);
        }

        var getAddChunks: number[] = this.getSubtractionChunk(this.tempChunkRect, this._lastChunkRect);
        for (let addValue of getAddChunks) {
            var getRowIndex: number = Math.floor(addValue / this._columns);
            var getColumnIndex: number = addValue % this._columns;
            this.checkAndRequest(getColumnIndex, getRowIndex);
        }

        this._lastChunkRect.copyFrom(this.tempChunkRect);
    }

    /**
     * 检测加载近景
     * @param columnIndex
     * @param rowIndex
     */
    private tryToFreeTile(columnIndex: number, rowIndex: number): void {
        var tileKey: string = rowIndex + "_" + columnIndex;
        var tile: RpgTile = this.tiles[tileKey];
        if (tile) {
            tile.dispose();
            delete this.tiles[tileKey];
        }
    }

    /**
     * 检测加载近景
     * @param columnIndex
     * @param rowIndex
     */
    private checkAndRequest(columnIndex: number, rowIndex: number): void {
        var tileKey: string = rowIndex + "_" + columnIndex;
        var tile: RpgTile = this.tiles[tileKey];
        if (!tile) {
            tile = new RpgTile();
            tile.mouseEnabled = true;
            tile.init(`hs_luochashanzhuang`, columnIndex, rowIndex);
            this.tiles[tileKey] = tile;
        }

        if (!tile.parent) {
            this.addChild(tile);
        }
    }

    /**
     * 返回索引数组 
     * @param rect
     * @param chunks
     */
    private getRectChunks(rect: Laya.Rectangle, chunks: number[]): void {
        chunks.length = 0;
        for (var columnIndex = rect.x; columnIndex < rect.right; columnIndex++) {
            for (var rowIndex = rect.y; rowIndex < rect.bottom; rowIndex++) {
                chunks.push(rowIndex * this._columns + columnIndex);
            }
        }
    }

    /**
     * 计算差集，需要释放的块 
     */
    private getSubtractionChunk(aRect: Laya.Rectangle, bRect: Laya.Rectangle): number[] {
        var getChunks: number[] = [];

        this.getRectChunks(aRect, this.tempAChunk);
        this.getRectChunks(bRect, this.tempBChunk);

        for (var i = 0; i < this.tempAChunk.length; i++) {
            for (var j = 0; j < this.tempBChunk.length; j++) {
                if (this.tempAChunk[i] == this.tempBChunk[j])
                    break;
            }

            if (j == this.tempBChunk.length && this.tempAChunk[i] >= 0)
                getChunks.push(this.tempAChunk[i]);
        }

        return getChunks;
    }


    /**
     * 释放地图 
     * 
     */
    public freeGameMap(): void {
        for (const tile of this.tiles) {
            tile.dispose();
        }

        this.tiles = null;

        this.tempAChunk = null;
        this.tempBChunk = null;

        this._smallResource.disposeBitmap();
        this._smallResource.destroy();
        this._smallResource = null;

        this.destroy();
    }
}