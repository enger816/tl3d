import { Component } from "./Component";


/**
 * 游戏实体
 * 
 * @author hanmengke
 * @E-mail: [email=809824261@qq.com]809824261@qq.com[/email]
 * @version 1.0.0
 * 创建时间：2016-7-29 下午3:39:41
 * 
 */
export class GameEntity
{
	/**
	 * 组件列表
	 */		
	private components:any[] = []; 
	
	/**
	 * 精灵唯一标识 
	 */		
	public key:string;
	/**
	 * 精灵Type 
	 */		
	public entityType:number = -1;
	
	/**
	 *子类型 
		*/
	public entityChildType:number = -1;
	
	/** 显示模型 **/
	//	public _mesh:SkinMesh;
	/**
	 * 是否剧情实体 
	 */		
	public isDrama:boolean = false;
	/**
	 * 是否相机对象 
	 */		
	public isCameraObj:boolean = false;
	
	/**
	 * 是否是可控制对象，可控制对象在做控制时需要发消息给服务器 
	 */
	public isNeedControl:boolean = false;
	
	/**
	 * 是否需要销毁 
	 */	
	public changeSceneDestroy:boolean = true;

	/** 是否是半透明 **/
	private _isTransparent:boolean = false;
	/** 当前透明度 **/
	private _curAlpha:number = 1;
	/** 是否是隐身状态 **/
	private _isHide:boolean = false;
	/**
	 * 伤害偏移标识
	 */
	public disBoolean:boolean = false;
	
	public parent:GameEntity;
	
	private _childList:any[] = []; 
	
	/**
	 * 掉落物用,使用已经拾取 
	 */
	public alreadyPickUP:boolean = false;
	
	/** 当前实体所属,武器归属 **/
	public ownerKey:string;
	
	/** 是否能采集 **/
	private _isCanCollect:boolean = true;
	
	constructor(entityKey:string)
	{
		this.key = entityKey;
	}
	
	/**
	 * 是否主角 
	 * @return 
	 */		
	// public get isMain():boolean
	// {
	// 	return this.key == DGApp.entityMgr.mainCharKey;
	// }

	/**
	 * 是否已经销毁 
	 * @return 
	 */
	public isDestroy():boolean
	{
		return this.key == null;
	}
	
	/**
	 * 添加组件 
	 * @param componentType
	 * @param entityKey
	 * @return 
	 * 
	 */		
	public addComponent(componentType:number):any
	{
		// console.assert(this.isDestroy() == false,"精灵已经释放了");
		
		// var component:Component = this.components[componentType] as Component;
		// if(component)
		// 	return component;
		
		// var componentClass:any = ComponentFactory.createComponent(componentType);
		// component = new componentClass(this.key) as Component;

		// this.components[componentType] = component;
		// return component;
		return null;
	}
	
	/**
	 * 销毁组件 
	 * @param componentType
	 * @param entityKey
	 * @return 
	 * 
	 */		
	public removeComponent(componentType:number):void
	{
		if(this.hasComponent(componentType))
		{
			var component:Component = this.getComponent(componentType);
			component.destroy();
			component.destroyKey();
			delete this.components[componentType];
		}
	}// end for this.removeComponent
	
	/**
	 * 是否包含组件
	 * @param componentType
	 * @param entityKey
	 * @return 
	 */		
	public hasComponent(componentType:number):boolean
	{
		return this.components[componentType];
	}// end for this.getComponent
	
	/**
	 * 获取组件 
	 * @param componentType
	 * @allowCreate 不存在是否允许创建
	 * @return 
	 */		
	public getComponent(componentType:number,allowCreate:boolean = false):any
	{
		var component:Component=this.components[componentType];
		if(component){
			return component;
		}
		if(allowCreate){
			return this.addComponent(componentType);
		}
		return null;
	}

	/**
	 * 信息组件 
	 * @return 
	 */		
	// public get infoComponent():InfoComponent
	// {
	// 	return this.getComponent(ComponentConst.INFO,true) as InfoComponent;
	// }
	// /**
	//  * 移动组件 
	//  * @return 
	//  */		
	// public get moveComponent():MoveComponent
	// {
	// 	return this.getComponent(ComponentConst.MOVE,true) as MoveComponent;
	// }
	
	// /**
	//  * render组件 
	//  * @return 
	//  */		
	// public get renderComponent():RenderComponent
	// {
	// 	return this.getComponent(ComponentConst.RENDER,true) as RenderComponent;
	// }
	// /**
	//  * 位置组件 
	//  * @return 
	//  * 
	//  */		
	// public get positionComponent():PositionComponent
	// {
	// 	return this.getComponent(ComponentConst.POSITION,true) as PositionComponent;
	// }

	/**
	 * 得到精灵数据 
	 * @return 
	 * 
	 */		
	// public get dataInfo():BaseSpriteData
	// {
	// 	var infoCom:InfoComponent = this.infoComponent;
	// 	if(infoCom)
	// 		return infoCom.data;
		
	// 	return null;
	// }

	/**
	 * 设置半透明状态 
	 * @param value
	 * 
	 */
	public setTransParent(value:boolean):void
	{
		this._isTransparent = value;
	}
	
	/**
	 * 销毁 
	 * 
	 */		
	public destroy():void
	{
		if(this.isDestroy())
			return;
		
/* 		if(this.parent && !this.parent.isDestroy()){
			this.parent.removeChild(this,false);
			this.parent = null;
		} */
		
		
		for(var comp of this.components)
		{
			if(comp)
			{
				comp.destroy();
				comp.destroyKey();
			}
		}
		this.components.length = 0;
		
		this.isDrama = false;
		this.key = null;

		
		this._childList.length = 0;
		this._childList = null;
	}
	
}