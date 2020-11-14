
export class EntityType
{
	/**玩家0*/	 		
	public static PLAYER:number = 0;
	
	/**怪物1*/
	public static MONSTER:number = 1;
	
	/**武将(英雄)2*/
	public static HERO:number = 2;
	
	/**陷阱3*/
	public static TRAP:number = 3;
	
	/**采集物*/
	public static GATHER:number = 4;
	
	/**掉落物**/
	public static GOODS:number = 10;
	
	/**NPC**/
	public static NPC:number = 11;
	
	/**传送阵**/
	public static TELEPORT:number = 12;
	
	/**场景物件 13**/
	public static STATIC:number = 13;
	
	/**场景可攻击物件 14**/
	public static STATIC_ATTACK:number = 14;
	
	
	/**场景特效*/
	public static EFFECT:number = 51;
	
	/**武器*/	 		
	public static WEAPON:number = 52;
	/**坐骑*/	 		
	public static HORSE:number = 53;
	/**拖影*/	 		
	public static GHOST:number = 54;
	/**翅膀*/	 		
	public static WING:number = 55;
	/**残影*/	 		
	public static SHADOW:number = 56;
	/**鬼臂*/	 		
//		public static GUIBI:number = 58;
	
	public static HELPEDPEOPLE:number = 59;
	/**UI模型*/	 		
	public static UI:number = 100;
	/**UI特效*/	 		
	public static UI_PARTICLE:number = 200;
	/**UI武器*/	 		
	public static UI_WEAPON:number = 300;
	
	/**跟随物 */		
	public static GENSUI:number = 400;

	/**河妖*/		
	public static DEVIL:number = 401;
	
	
	/**
	 * 宝物
	 */
	public static BAOWU:number = 501;
	
	/** 机器人 **/
	public static ROBOTPLAYER:number = 409;
	
	
	
	//==============剧情创建的实体============//
	public static STORY_LINE_PLAYER:number=600;
	public static STORY_LINE_MONSTER:number=601;
	public static STORY_LINE_NPC:number=602;
	public static STORY_LINE_EFFECT:number=603;
	
	/**
	 * 判断精灵类型是否属于剧情
	 * @param type
	 * @return
	 */
	public static isStoryLine(type:number):boolean{
/* 		switch(type)
		{
			case STORY_LINE_PLAYER:
			case STORY_LINE_MONSTER:
			case STORY_LINE_NPC:
			case STORY_LINE_EFFECT:
			{
				return true;
			}
		} */
		return false;
	}
}