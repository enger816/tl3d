import { TApp } from "../../TApp";
import { GameEntity } from "./GameEntity";

/**
 * 
 * 组件基类
 * 
 * @author hanmengke
 * @E-mail: [email=809824261@qq.com]809824261@qq.com[/email]
 * @version 1.0.0
 * 创建时间：2016-7-28 上午11:31:40
 * 
 */
export class Component
{
	public entityKey:string;
	
	/** 是否已经释放 **/
	public isDisposed:boolean;
	
	constructor(entityKey:string)
	{
		this.entityKey = entityKey;

		console.assert(entityKey != null,"异常异常");
	}
	
	public destroy():void
	{
	
	}
	
	public destroyKey():void
	{
		this.isDisposed = true;
		this.entityKey = null;
	}
	
	/**
	 * 组件类型 
	 * @return 
	 * 
	 */		
	public get type():number
	{
		throw new Error("Component this.type 未定义！");
	}
	
	/**
	 *  功能:返回精灵
	 *  参数:any*/
	public get entity():GameEntity
	{
		var gameEnity:GameEntity = TApp.entityMgr.getEntity(this.entityKey);
		return gameEnity;
	}
	
	/**
	 * 返回组件 
	 * @param componentType
	 * @param allowCreate
	 * @return 
	 */
	public getComponent(componentType:number,allowCreate:boolean = false):any
	{
		var gameEnity:GameEntity = this.entity;
		var getCom:Component = gameEnity.getComponent(componentType,allowCreate);
		return getCom;
	}
}