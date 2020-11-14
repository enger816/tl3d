import GameConfig from "../../GameConfig";
import { MapConst } from "../configs/MapConst";

export class RpgTile extends Laya.Sprite{

    private _url:string;

    /**
     * 开始加载地图块
     * @param mapID 
     * @param col 
     * @param row 
     */
    public init(mapID:string,col:number,row:number):void{

        this.x = col * MapConst.CHUNK_SIZE;
        this.y = row * MapConst.CHUNK_SIZE;


        this._url = `res/scene/map/map_image/`+mapID+`/`+row+`_`+col+`.jpg`;

        Laya.loader.load(this._url, Laya.Handler.create(this,()=>{
            var map:Laya.Texture = Laya.loader.getRes(this._url);
            if(map)
                this.texture = map;
        }));
    }

    public dispose(): void {
        if(!this.texture)
        {
            Laya.loader.cancelLoadByUrl(this._url);
        }
        else{
            Laya.loader.clearTextureRes(this._url);
            Laya.loader.clearRes(this._url);
        }

        this.texture = null;

        this.destroy();
    }
}