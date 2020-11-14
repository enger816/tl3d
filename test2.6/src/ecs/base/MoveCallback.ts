import { GameEntity } from "./GameEntity";

/**
 * @author hmk
 * @E-mail: [email=809824261@qq.com]809824261@qq.com[/email]
 * @version 1.0.0
 * 创建时间：2016-8-24 下午10:40:51
 * 
 */
export class MoveCallback
{
	/** * 准备移动函数列表 **/
	private onReadyList:Function[];
	/** * 经过格子函数列表 **/
	private onThroughList:Function[];
	/** * 到达目标函数列表 **/
	private onArriveList:Function[];
	/** * 移动失败函数列表 **/
	private onUnableList:Function[];
	/** * 移动停止函数列表 **/
	private onStopList:Function[];
	
	/**准备移动*/		
	public static READY:number = 0;
	
	/**经过格子 */		
	public static THROUGH:number = 1;
	
	/**到达目标*/		
	public static ARRIVE:number = 2;
	
	/** 移动失败 */		
	public static UNABLE:number = 3;
	
	/**移动停止 */		
	public static STOP:number = 4;
	
	private lists:any[];
	
	public isShowAuto:boolean = true;
	
	public isComplete:boolean = false;
	
	constructor()
	{
		this.onReadyList = [];
		this.onThroughList = [];
		this.onArriveList = [];
		this.onUnableList = [];
		this.onStopList = [];
		
		this.lists = [this.onReadyList,this.onThroughList,this.onArriveList,this.onUnableList,this.onStopList];
	}
		
	
	/**
	 * 准备移动 
	 * @param entity
	 */		
	public onReady(entity:GameEntity):void
	{
		if(this.onReadyList.length == 0)
			return;
		
		var func:Function;
		for(func of this.onReadyList)
		{
			func(entity);
		};
	}
	/**
	 * 经过格子 
	 * @param entity
	 */		
	public onThrough(entity:GameEntity):void
	{
		if(this.onThroughList.length == 0)
			return;
		
		var func:Function;
		for(func of this.onThroughList)
		{
			func(entity);
		};
	}
	
	/**
	 * 到达目的地
	 * @param entity
	 */		
	public onArrive(entity:GameEntity):void
	{
		this.isComplete = true;
		if(this.onArriveList.length == 0)
			return;
		
		var func:Function;
		for(func of this.onArriveList)
		{
			func(entity);
		}
	}
	
	/**
	 * 寻路失败 
	 * @param entity
	 * 
	 */		
	public onUnable(entity:GameEntity):void
	{
		if(this.onUnableList.length == 0)
			return;
		
		var func:Function;
		for(func of this.onUnableList)
		{
			func(entity);
		};
	}
	
	/**
	 * 移动停止 
	 * @param entity
	 * 
	 */		
	public onStop(entity:GameEntity):void
	{
/* 		CONFIG::debug{
		if(Cc.visible){
			GameConsole.instance().ccCh("主角技能","移动停止,停止回调函数个数:" + this.onStopList.length);
		}}; */
		
		
		if(this.onStopList.length == 0)
			return;
		
		var func:Function;
		for(func of this.onStopList)
		{
			func(entity);
		}
	}
	
	public addCallback(type:number,func:Function):void
	{
		var list:Function[] = this.lists[type];
		if (func && list.indexOf(func) == -1)
		{
			list.push(func);
		}
		
		if(type == MoveCallback.STOP)
		{
			console.log("主角技能","添加停止回调函数个数:" + this.onStopList.length);
		}
	}
	
	public removeCallback(type:number,func:Function):void
	{
		var list:Function[] = this.lists[type];
		var funIndex:number = list.indexOf(func);
		if (funIndex != -1)
		{
			list.splice(funIndex, 1);
		}
		
		if(type == MoveCallback.STOP)
		{
			console.log("主角技能","移除停止回调函数个数:" + this.onStopList.length);
		}
	}
	
/*		public clearCallBack(type:number):void
	{
		var list:Function[] = this.lists[type];
		list.length = 0;
	}*/
	
	public clearAll():void
	{
		for(var list of this.lists)
		{
			list.length = 0;
		}
		
		console.log("主角技能","清除全部回调函数个数");
	}
}