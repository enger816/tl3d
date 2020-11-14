
import DGApp from "../../../../../com/dg/applictions/DGApp";
import { MapEditorConfig } from "../../configs/MapEditorConfig";
import { MapConst } from "../../configs/MapConst";
import { MapModel } from "../../../model/MapModel";
import { DGContext } from "../../../../../com/dg/core/mvc/DGContext";


export class MapLoader{

    /**
     *  功能:加载地图配置
     *  参数:
     **/
    static loadMapConfig(mapResConfigUrl:string,smallMapUrl:string,triggerPath:string,hander:laya.utils.Handler):void{
        Laya.loader.load(mapResConfigUrl, Laya.Handler.create(this, ()=>{
            let cellBytesAB:ArrayBuffer = Laya.loader.getRes(mapResConfigUrl);
       
            console.assert(cellBytesAB != null,mapResConfigUrl,`加载失败`);

            let inflate:Zlib.RawInflate = new Zlib.RawInflate(cellBytesAB);
            var plain:Uint8Array = inflate.decompress();

            let cellBytes:Laya.Byte = new Laya.Byte(plain);
            let endian:string = cellBytes.endian;
            cellBytes.pos = 0;
            let version:number = cellBytes.readInt32();
            console.log('test');

            var mapModel:MapModel = DGContext.getInstance(MapModel);
            var mapConfig:MapEditorConfig = mapModel.editorCfg = new MapEditorConfig();
            mapConfig.width = cellBytes.readInt32();
            mapConfig.height = cellBytes.readInt32();
            mapConfig.columns = cellBytes.readInt32();
            mapConfig.rows = cellBytes.readInt32();
            mapConfig.mapLumpColumns = Math.ceil(mapConfig.width/MapConst.MAP_BLOCK_WIDTH);
            mapConfig.mapLumpRows = Math.ceil(mapConfig.height/MapConst.MAP_BLOCK_HEIGHT);
    
            var mapSolids:number[][] = mapConfig.mapCells = [];
			var mapTransparents:boolean[][] = mapConfig.mapTransparents = [];


			var clientTriggerAreaIdDic:any = mapConfig.clientTriggerAreaIdDic = {};
			var clientTriggerAreaIdByTypeDic:any = mapConfig.clientTriggerAreaIdByTypeDic = {};
			
			var serverTriggerAreaIdDic:any = mapConfig.serverTriggerAreaIdDic = {};
			var serverTriggerAreaIdByTypeDic:any = mapConfig.serverTriggerAreaIdByTypeDic = {};

            var pathAreaList:number[][] = mapConfig.pathAreaIdByPos = [];

            var tileAres:number;
            var clientTriggerArea:number = 0;
			var serverTriggerArea:number = 0;
            var path:number;
            var transparent:boolean;//半透明

            var total:number=mapConfig.columns * mapConfig.rows;
            var nums:number = total;
            var xIndex:number = 0;
			var yIndex:number = 0;
            while(nums-- > 0)
            {
                path = cellBytes.readByte();

                transparent = Boolean(cellBytes.readByte());
                tileAres = cellBytes.readInt16();

                clientTriggerArea = cellBytes.readInt16();
                serverTriggerArea = cellBytes.readInt16();

                if(yIndex >= mapSolids.length || !mapSolids[yIndex])
                {
                    mapSolids[yIndex] = [];
                    mapTransparents[yIndex] = [];
                    pathAreaList[yIndex] = [];
                }

                mapSolids[yIndex][xIndex] = path;
                mapTransparents[yIndex][xIndex] = transparent;
                pathAreaList[yIndex][xIndex] = tileAres;

				if(clientTriggerArea != 0)//有效的 动态区域ID
				{
					clientTriggerAreaIdDic[yIndex + "_" + xIndex] = clientTriggerArea;
					if(!clientTriggerAreaIdByTypeDic.hasOwnProperty(clientTriggerArea))
						clientTriggerAreaIdByTypeDic[clientTriggerArea] = [];
					clientTriggerAreaIdByTypeDic[clientTriggerArea].push([xIndex, yIndex]);
				}
				
				
                if(serverTriggerArea != 0)//有效的 动态区域ID
                {
                    serverTriggerAreaIdDic[yIndex + "_" + xIndex] = serverTriggerArea;
                    if(!serverTriggerAreaIdByTypeDic.hasOwnProperty(serverTriggerArea))
                        serverTriggerAreaIdByTypeDic[serverTriggerArea] = [];
                    serverTriggerAreaIdByTypeDic[serverTriggerArea].push([xIndex, yIndex]);
                }

                if (xIndex == Number(mapConfig.columns - 1))
				{
					yIndex++;
					xIndex = 0;
				}
				else
				{
					xIndex++;
				}
            }

    
            while(cellBytes.bytesAvailable)
            {
                let type = cellBytes.readInt16();
                switch(type)
                {
                    case 1://导航数据
                        mapConfig.coordinates = []
                        var pathGroup:number = cellBytes.readInt16();
                        while(pathGroup-- > 0){
                
                            var points:Array<number> = [];
                            mapConfig.coordinates.push(points);
                            var pathNum:number = cellBytes.readInt16();
                            while(pathNum-- > 0){
                                points.push(cellBytes.readInt16());
                            }
                        }
                        break;
                }
            }

            console.log('MapConfig over');

            Laya.loader.load(smallMapUrl, Laya.Handler.create(this,()=>{
                console.log('smallMapUrl Loaded');

                var map:Laya.Texture = Laya.loader.getRes(smallMapUrl);
                if(!map)
                {
                    console.log(smallMapUrl,`加载失败`);
                }
                Laya.loader.load(triggerPath,Laya.Handler.create(this,()=>{
                    var eventXml:any = Laya.loader.getRes(triggerPath);
                    if(eventXml)
                    {
                        var mapModel:MapModel = DGContext.getInstance(MapModel);
                        mapModel.mapStaticObject = eventXml;
                    }

                    hander.runWith(map);
                }),null,Laya.Loader.JSON);   
              
 //               Laya.loader.clearRes(smallMapUrl);
            }),null,Laya.Loader.IMAGE);
        }),null,Laya.Loader.BUFFER);
    }
}