import { Component } from "../ecs/base/Component";
import { MoveCallback } from "../ecs/base/MoveCallback";

/**
 *  @author:Gaara
 *  2016-8-19
 *  移动组件
 **/
export class MoveComponent extends Component
{
	/** 开始移动剩余时间 **/
	//		public delay:number;
	
	/** 路径点数组 **/
	private _movePathArr:any;
	
	/** 跨场景或跨区域 路径 **/
	private _autoMapPath:any;
	
	/** 路径分割发送 **/
	// public movePathCutter:PathCutter;
	
	private _moveCallback:MoveCallback
	
	/** 移动中 **/
	public isMoving:boolean;

	/** 跳跃点跳跃中 **/
	private _isJumping:boolean;
	
	/** 跳跃结束回调 */
	public jumpEndFunc:any = [];


	constructor(entityKey:string)
	{
		super(entityKey);
	}
	
	
	/** 移动回调 **/
	public get moveCallback():MoveCallback
	{
		return this._moveCallback;
	}

	/**
	 * @private
	 */
	public setMoveCallback(value:MoveCallback,log:string):void
	{
		this._moveCallback = value;
		console.log("主角技能","设置移动回调:"+log);
	}

	/** 路径点数组 **/
	public get movePathArr():any[]
	{
		return this._movePathArr;
	}
	
	/**
	 * @private
	 */
	public set movePathArr(value:any[])
	{
		this._movePathArr = value;
	}
	
	/** 跳跃中 **/
	public get isJumping():boolean
	{
		return this._isJumping;
	}
	
	/**
	 * @private
	 */
	public set isJumping(value:boolean)
	{
		if(value == true)
		{
			value;
		}
		if(this._isJumping == true && value == false)
		{
			this._isJumping = value;
			for(var i:number = 0; i < this.jumpEndFunc.length; i++)
			{
				this.jumpEndFunc[i][0].apply(null, this.jumpEndFunc[i][1]);
				this.jumpEndFunc[i].length = 0;
			}
			this.jumpEndFunc.length = 0
		}
		else
		{
			this._isJumping = value;
		}
	}
	
	/** 跨场景或跨区域 路径 **/
	public get autoMapPath():any
	{
		return this._autoMapPath;
	}
	
	/**
	 * @private
	 */
	public set autoMapPath(value:any)
	{
		this._autoMapPath = value;
	}
	
	/**
	 * 返回下一个小目标 
	 */		
	public getNextTarget():Object
	{
		if(this.movePathArr && this.movePathArr.length > 0)
			return this.movePathArr[this.movePathArr.length - 1];
		
		return null;
	}
	
	/**
	 *  功能:清理数据
	 *  参数:any*/
	public clear():void
	{
		// if(this.movePathCutter)
		// 	this.movePathCutter.clear();
		
		this.movePathArr = null;
		this.autoMapPath = null;
		this.isMoving = false;
	}
	
	/**
	 *  功能:创建路径分割和发送器
	 *  参数:any*/
	// public getPathCutter():PathCutter
	// {
	// 	if(!this.movePathCutter)
	// 	{
	// 		this.movePathCutter = new PathCutter();
	// 	}
	// 	return this.movePathCutter
	// }
	
	/**
	 *  功能:设置路径
	 *  参数:any*/
	public setMovePath(paths:any[],delFirst:boolean = true):void
	{
		if(paths.length <= 1)
			return;
		
		// if(this.movePathCutter)
		// {
			// this.movePathCutter.clear();
			// this.movePathCutter.cutMovePath(paths.concat());
			// var nextPathArr:SpritePoint[] = this.getPathCutter().getNextPath();
			// this.sendNextPath(nextPathArr);
		// }
		
		//删除第一个格子 
		if(delFirst)
			paths.shift();
		
		this.movePathArr = paths;
		
		this.isMoving = true;
	}

	/**
	 * 发送下一组路径 
	 */
	public sendNextPath(nextPathArr:SpritePoint[]):void
	{
		// if(this.entity.isMain)
		// {
		// 	//发送下一个点的路径 154
		// 	var posMoveProxy:PosMoveProxy = DGContext.getInstance(PosMoveProxy);
		// 	posMoveProxy.sendMove(this.entity,nextPathArr); 
		// }
	}

	/**
	 *  功能:清除之前路径数据
	 *  参数:any*/
	public clearPath():void
	{
		if(this.movePathArr)
			this.movePathArr.length = 0
		
		this.isMoving = false;
	}
	
	/**
	 * 是否已经到达目标地址 
	 * 
	 */
	public get isArrive():boolean
	{
		if(this.autoMapPath && this.autoMapPath.length > 0)
			return false;
		
		if(this.movePathArr && this.movePathArr.length > 0)
			return false;
		
		return true;
	}
	
	/**
	 * 停止移动 
	 */		
	public onStop():void
	{
		//放在util里
//			if(entity.isMain)
//			dispatch.dispatchEvent(new MoveEvent(MoveEvent.MAIN_CHAR_STOP, entityKey));
		
		if(this.moveCallback)
			this.moveCallback.onStop(this.entity);
	}
	
	public onThrough():void
	{
		if(this.moveCallback)
		{
			this.moveCallback.onThrough(this.entity);
		}
	}
	
	/**
	 * 是否已经到达目标地址 
	 * 
	 */
	public onArrive():void
	{
		if(this.isArrive)
		{
/* 			var motion:MotionComponent = entity.getComponent(ComponentConst.MOTION);
			if(motion.currMotion && motion.currMotion.indexOf("run") != -1)
				EntityUtils.playAnimation(entity, EnumMotion.IDLE);
			
			if(this.moveCallback)
			{
				TimerManager.ins.doFrameOnce(1,this.moveCallback.onArrive,[entity]);
			} */
			this.isMoving = false;
		}
	}

	/**
	 * 移除路径中和主角当前点重合的点 
	 */
	public removePathCurrPoint():void
	{
		// var posCom:PositionComponent =  this.getComponent(ComponentConst.POSITION);
		// //下一个地图目标点
		
		// if(!this.autoMapPath || this.autoMapPath.length ==0)
		// 	return;
		
		// var nextMap:any[] = this.autoMapPath[0];
		// while(this.autoMapPath.length > 1 &&  nextMap[1] == posCom.tile_x && nextMap[2] == posCom.tile_y)
		// {
		// 	this.autoMapPath.shift();
			
		// 	nextMap = this.autoMapPath[0];
		// }
	}
	
	/**
	 *  功能:检测主角是否有下一个路径目标点
	 *  参数:any*/
	public checkMainCharNextMoveTarget():void
	{
		//mainCharMove(nextPoint);
		// if(!SystemMgr.singleton.ready || !NetManager.singleton.ready)
		// 	return;
		
		// var moveCom:MoveComponent = this.getComponent(ComponentConst.MOVE);
		// if(moveCom)
		// {
		// 	if(moveCom.autoMapPath && moveCom.autoMapPath.length > 0)
		// 	{
		// 		this.removePathCurrPoint();
				
		// 		//下一个地图目标点
		// 		var nextMap:any[] = moveCom.autoMapPath.shift();
				
		// 		console.log("自动任务","下一个目标："+nextMap + " "+moveCom.autoMapPath);
				
		// 		var mapModel:MapModel = DGContext.getInstance(MapModel);
		// 		if(nextMap[0] != mapModel.mapID)
		// 		{
		// 			console.log("自动任务","地图ID不同,停止移动"+mapModel.mapID);
					
		// 			SystemMgr.singleton.moveSystem.stopMove(this.entityKey,"checkMainCharNextMoveTarget");
		// 			return;
		// 		}
				
		// 		var nextPoint:Laya.Point = new Laya.Point(nextMap[1],nextMap[2]);
		// 		SystemMgr.singleton.findPathSystem.entityCharMove(this.entity,nextPoint,nextMap[3],moveCom.moveCallback);
		// 	}
		// 	else 
		// 	{
		// 		console.log("自动任务","下一个目标，已经到达!");
				
		// 		// AutoFight.ins.autoWalk(false);
		// 		if(this.moveCallback)
		// 		this.moveCallback.onArrive(this.entity);
		// 	}
		// }
		// else 
		// {
		// 	console.log("自动任务","没有移动组件，不再移动!");
		// }
	}


	public destroy():void
	{
		this.clearPath();
		//			if(!entity.isDestroy()){
		//				EntityUtils.playAnimation(entity,EnumMotion.STAND,0,1);
		//			}
		
		if(this.moveCallback)
		{
			console.log("主角技能","停止回调:,组件销毁");

			//移动中发送停止移动消息
			this.moveCallback.onStop(this.entity);
		}
		
		this.setMoveCallback(null,",组件销毁");
		
		// if(this.entity && !this.entity.isDestroy() && this.entity.isMain){
			// AutoFight.ins.autoWalk(false);
		// }
		super.destroy();
	}
}