
/**
 * 格子类型数据 
 * @author Gaara
 */	
export class CellType
{
	//---------------------------------------------------------------------------------------GROUP_TERRAIN   地形----------------------------------------------------------------------------------------------
	
	/**普通阻挡 0 */		
	public static NORMAL_STOP:number = 0;
	
	/**墙壁阻挡 1*/		
	public static WALL_STOP:number = 1;
	
	/**悬崖阻挡 2*/		
	public static CLIFF_STOP:number = 2;
	
	/**不可跳跃阻挡 3 */		
	public static NOJUMP_STOP:number = 3;
	
	/**生物造成阻挡 4*/		
	public static BIOLOGY_STOP:number = 4;
	
	/**普通可走  */		
	public static NORMAL_CANGO:number = 6;
	
	/**透明 */		
	public static LAYER_PATH_TRANSPARENT:number = 7;
	
	/**滑行 */		
	public static SANDY_CANGO:number = 8;
	
	/**水域可走 */		
	public static WATERS_CANGO:number = 9;
	
	/**熔岩可走 10 */		
	public static LAVA_CANGO:number = 10;
	
	/**深水可走 11 */		
	public static DEEPWATER_CANGO:number = 11;
	
	/** 楼梯 12 */		
	public static STAIRS_CANGO:number = 12;
	
	/**潜行 13*/		
	public static SNEAK_CANGO:number = 13;
	
	/** 壁走 14*/		
	public static BI_ZOU_CANGO:number = 14;
	
	/** 冲刺15*/		
	public static RUSH_CANGO:number = 15;
	
	/** 行走16*/		
	public static WALK_CANGO:number = 16;
	
	/**冲撞17*/		
	public static CRASH_CANGO:number = 17;
	
	/**滑落18*/		
	public static  SLIDE_CANGO:number = 18;
	
	/**垂死19*/		 
	public static CUISI_CANGO:number = 19;
	
	/** 不走挂机点 */		 
	public static NO_HANGUP_POINTS:number = 20;
	
	//---------------------------------------------------------------------------------------GROUP_TRIGGER   触发----------------------------------------------------------------------------------------------
	
	/** 壁走 50*/		
	public static TRIGGER:number = 50;
}