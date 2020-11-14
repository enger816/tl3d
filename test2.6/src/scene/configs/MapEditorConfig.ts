import { MapConst } from "./MapConst";

	/**
	 *  @author:Gaara
	 *  2014-3-17
	 *  地图配置
	 **/
export class MapEditorConfig{

    /**前端触发类区域Id字典  yIndex + "_" + xIndex*/		
    public clientTriggerAreaIdDic:any;
    
    /**前端触发类区域Id字典 1:[x,y]*/		
    public clientTriggerAreaIdByTypeDic:any;
    
    /**后端触发类区域Id字典  yIndex + "_" + xIndex*/		
    public serverTriggerAreaIdDic:any;
    
    /**后端触发类区域Id字典 1:[x,y]*/		
    public serverTriggerAreaIdByTypeDic:any;
    
    
    /** 格子数量 **/
    public columns:number;
    public rows:number;

    /** 地图像素宽高 */
    public width:number;
    public height:number;

    /**地图块数量 */	
    public mapLumpColumns:number;
    public mapLumpRows:number;

    /** 小地图url **/
    public smallMapUrl:string;

    /** 多边形点 **/
    public coordinates:number[][];

    /** 地图格子 对应CellType**/
    public mapCells:number[][];
    
    /** 地图格子半透明 对应CellType**/
    public mapTransparents:boolean[][];

    /** 路径区域字典 [y][x]:areaId */		
    public pathAreaIdByPos:number[][];

            
    /**
     * 返回指定格子的区域id
     * @param
     * @return 
     * 
     */
    public getTileArea(tx:number, ty:number):number
    {
        if(!this.pathAreaIdByPos)
            return 1;
        
        var list:number[]= this.pathAreaIdByPos[ty];
        if(list&&list.length>tx){
            return this.pathAreaIdByPos[ty][tx];
        }else{
            throw new Error("区域超出索引"+",最大有效范围为："+this.pathAreaIdByPos.length+"_"+this.pathAreaIdByPos[ty].length+"请求索引："+ty+"_"+tx);
        }
    }
}