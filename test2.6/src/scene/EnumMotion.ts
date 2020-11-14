
/**
 *  @author:Gaara
 *  2016-6-13
 *  动作类型
 **/
export class EnumMotion
{
	/** 需要播放声音的 动作 **/
	public static SOUNDS:any[] = ["jump_100","jump_101","jump_102","jump_103","jump_104","jump_105","run_3","run_5","run_6","run_water","run","run_0"];
	
	/**移动数组*/		
	public static RUNS:any[] = ["run","run_0"];
	
	/**默认待机  idle*/		
	public static IDLE:string = "idle";
	
	/**没武器  idle0*/		
	public static IDLE_0:string = "idle_0";
	
	/**ui默认待机  idle2*/		
	public static IDLE_2:string = "idle_2";
	
	/**潜行待机  idle_4*/		
	public static IDLE_4:string = "idle_4";
	
	/**壁走待机  idle_5*/		
	public static IDLE_5:string = "idle_5";
	
	/**抱起动作 */
	public static IDLE_6:string = "idle_6";
	
	/**东皇钟后 待机 */
	public static IDLE_8:string = "idle_8";
	
	/**垂死待机 */
	public static IDLE_9:string = "idle_9";
	
	/**武器动作 */
	public static IDLE_10:string = "idle_10";
	
	/**水底待机 idle_water */		
	public static IDLE_WATER:string = "idle_water";
	
	/**待机 stand_1*/		
	public static STAND_1:string = "stand_1";
	
	/**半蹲 */		
	public static STUN:string = "stun";
	
	/**行走 run*/		
	public static RUN:string = "run";
	
	/**没武器 run0*/		
	public static RUN_0:string = "run_0";
	
	/**垂死行走 run9*/		
	public static RUN_9:string = "run_9";
	
	/**行走 walk*/		
	public static WALK:string = "walk";
	
	/**没武器行走walk0*/		
	public static WALK_0:string = "walk_0";
	
	/**抱起动作行走 */
	public static WALK_1:string = "walk_1";
	
	/**海底行走 run_water*/		
	public static RUN_WATER:string = "run_water";
	
	/**沙地行走 run_3*/		
	public static RUN_SANDY:string = "run_3";
	
	/**潜行行走  run_4*/		
	public static RUN_4:string = "run_4";
	
	/**壁走行走 run_5*/		
	public static RUN_5:string = "run_5";
	
	/**冲刺 run_6*/		
	public static RUN_6:string = "run_6";
	
	/**冲撞 run_7*/		
	public static RUN_7:string = "run_7";
	
	/**滑落 run_8*/		
	public static RUN_8:string = "run_8";
	
	
	/**楼梯待机 idleInStandstorm*/		
	public static IDLE_IN_SANDSTORM:string = "idle_InStandstorm";
	
	/**楼梯行走 walkInStandstorm*/		
	public static WALK_IN_SANDSTORM:string = "walk_InSandstorm";
	
	/**死亡倒下  */		
	public static DIE:string = "die";
	
	/**死亡状态*/
	public static DEATH:string = "death";
	
	/** 扔元宝**/
	public static ATTACK:string = "attack";
	
	/** 出生**/
	public static ATTACK_2:string = "attack_2";
	
	/** 攻击 0 **/
	public static ATTACK_0:string = "attack_0";
	
	/** 攻击 1 **/
	public static ATTACK_1:string = "attack_1";
	
	/** 拿火把采集 **/
	public static ATTACK_12:string = "attack_12";
	
	/** 滑索 **/
	public static FLY:string = "fly";
	
	/** 跳跃 起跳1 **/
	public static JUMP_1:string = "jump_101_start"; 
	
	/** 跳跃 浮空 3 **/
	public static JUMP_3:string = "jump_101";
	
	/** 跳跃 落地 4**/
	public static JUMP_4:string = "jump_101_end";
	
	/** 采集下 **/
	public static GATHER_DOWN:string = "gather_down"; 
	
	/** 采集**/
	public static GATHER:string = "gather"; 
	
	/** 采集上 **/
	public static GATHER_UP:string = "gather_up"; 
	
	/** 骑乘 **/
	public static IDLE_RIDE:string = "idle_ride";
	
	/**起立 */	
	public static UP:string = "up";
	
	/**打坐 */		
	public static SIT:string = "sit";
	
	/**击飞上升 */		
	public static HITFLY_RISE:string = "hitfly_rise";
	
	/**击飞浮空 */		
	public static HITFLY:string = "hitfly";
	
	/**击飞下落 */		
	public static HITFLY_FALL:string = "hitfly_fall";
	
	/**击飞倒地 */		
	public static HITFLY_LIE:string = "hitfly_lie";
	
	/**击飞起立 */		
	public static HITFLY_STANDUP:string = "hitfly_standup";
	
	/**被击动作 */		
	public static INJURED:string = "injured";
	
	/** 展示动作*/		
	public static DANCE:string="dance";
	
	/**处决过程 */		
	public static BADLY_HURT_DIE:string = "badly_hurt_die";
	
	/**处决结束 */		
	public static BADLY_HURT_DEATH:string = "badly_hurt_death";
	
	/**全民尬舞动作*/
	public static GAWU:string = "gawu";
	
	public static WABAO:string = "gather_3";
	/**猎鹰出场动作*/
	public static CHUCHANG:string = "chuchang";
	
	/** 重生*/
	public static RECOVER:string = "recover";	

}