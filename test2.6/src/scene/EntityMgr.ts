import { GameEntity } from "../ecs/base/GameEntity";
import { EntityType } from "../ecs/data/EntityType";


/**
 * 
 * 实体管理器 
 * 
 * @author hanmengke
 * @E-mail: [email=809824261@qq.com]809824261@qq.com[/email]
 * @version 1.0.0
 * 创建时间：2016-7-28 上午11:31:40
 * 
 */
export class EntityMgr
{

	/**
	 * 实体列表 
	 */		
	private entityList:any = {};
	
	/** 主角id **/
	public _mainCharKey:string;

	public set mainCharKey(value:string)
	{
		this._mainCharKey = value;
	}

	public get mainCharKey():string
	{
		return this._mainCharKey;
	}

	
	/** 下一帧移除的精灵，渲染中移除的精灵，得放到这里等待下一帧处理 **/
	private laterDestoryKey:string[] = [];
	
	constructor()
	{

	}
	
	/**
	 * 创建实体 
	 * @param entityKey
	 * @param entityType
	 * 
	 */		
	public createEntity(entityKey:string,isMainChar:boolean = false):GameEntity
	{
		if(isMainChar)
		{
			this.mainCharKey = entityKey;
		}

		console.assert(!this.hasEntity(entityKey),"The entity is existing! key="+entityKey);
		var entity:GameEntity = this.entityList[entityKey] = new GameEntity(entityKey);
		return entity;
	}
	
	/**
	 * 是否是主角实体 
	 * @param entityKey
	 * 
	 */		
	public isMainChar($gameEntity:GameEntity):boolean
	{
		return $gameEntity.key == this.mainCharKey;
	}
	/**
	 * 获取主角实体 
	 * @param entityKey
	 * 
	 */		
	public getMainChar():GameEntity
	{
		return this.entityList[this.mainCharKey];
	}

	/**
	 * 获取实体 
	 * @param entityKey
	 * 
	 */		
	public getEntity(entityKey:string,allowCreate:boolean = false):GameEntity
	{
		if(allowCreate && !this.hasEntity(entityKey))
			return this.createEntity(entityKey);
			
		return this.entityList[entityKey];
	}// end for this.createEntity
	
	/**
	 *  功能:返回所有场景实体
	 *  参数:any*/
	public getAllEntitys():any
	{
		return this.entityList;
	}
	
	/**
	 * 销毁实体 
	 * @param entityKey
	 * 
	 */		
	public removeEntity(entityKey:string,later:boolean = false):GameEntity
	{
		console.assert(this.hasEntity(entityKey),"There is no entity! key="+entityKey);
		console.assert(entityKey != this.mainCharKey,"怎么移除了主角");
		if(later)
		{
			if(this.laterDestoryKey.indexOf(entityKey) == -1)
				this.laterDestoryKey.push(entityKey);
			return null;
		}
		
		var entity:GameEntity = this.entityList[entityKey];
		
/* 		EntityUtils.cleanMissMotion(entityKey);

		//清除选中等
		SelectSpriteMouseManager.instance().clearEntity(entity);
		
		//发出删除事件
		var evt:MEvent_Delete_Obj_From_Map = new MEvent_Delete_Obj_From_Map(MEvent_Delete_Obj_From_Map.REMOVE_ENTITY);
		evt.entityKey = entityKey;
		this.dispatcher.dispatchEvent(evt); */

		if(entity)
		{
			if(entity.entityType == EntityType.PLAYER)
			{
/* 				var obj:Object = new Object();
				obj[MessageValueType.id] = entity.key;
				NoticeManager.eventDispatcher.dispatchEvent(new PKEvent(PKEvent.REMOVE_ENTITY, obj));
				DataInfo.instance.teamInfo.removeTeamIdList(entity.key);//玩家离开视野如果有组队信息的话 记录队伍id */
				
				//删除坐骑 //放到children里
	/*			var horseKey:string = "horse" + entityKey;
				var horseEntity:GameEntity = EntityManager.singleton.getEntity(horseKey);
				if(horseEntity){
					var bindComponent:BindComponent = horseEntity.addComponent(ComponentConst.BIND);
					bindComponent.removeBindMesh(EnumBindBone.MOUNT_BIND, false);
					EntityManager.singleton.safeRemoveEntity(horseKey);
				}*/
				
				//删除河妖  //放到children里
		/*		var devilKey:string = entityKey+"_heyao";
				var devilEntity:GameEntity = EntityManager.singleton.getEntity(devilKey);
				if(devilEntity){
					EntityManager.singleton.safeRemoveEntity(devilKey);
				}*/
			}
			
/* 			if(entity.entityType == EntityType.MONSTER && entity.isBoss)
			{ 
				var monsterVo:SceneMonsterVo = entity.infoComponent.<SceneMonsterVo> data;
				if(monsterVo.res.subType == 4 && monsterVo.curHp)
					NoticeManager.eventDispatcher.dispatchEvent(new PanelEvent(PanelEvent.DAMAGE_LIST, entity, "2"));
			}
			
			if(entity.isTombstone)
				NoticeManager.eventDispatcher.dispatchEvent(new PanelEvent(PanelEvent.DAMAGE_LIST, entity, "2")); */
			
			entity.destroy();
		}
		
		
		
		delete this.entityList[entityKey];
		

		return entity;
	}// end for this.removeEntity
	
	/**
	 * 安全的销毁实体 
	 * @param entityKey
	 * 
	 */		
	public safeRemoveEntity(entityKey:string,later:boolean = false):GameEntity
	{
		if(!this.hasEntity(entityKey))
			return null;
		
		var entity:GameEntity = this.removeEntity(entityKey,later);
		
		return entity;
	}// end for this.removeEntity
	
	/**
	 * 是否存在实体 
	 * @param entityKey
	 * @return 
	 * 
	 */		
	public hasEntity(entityKey:string):boolean
	{
		return this.entityList[entityKey] != null;
	}
	

	/**
	 * 返回有伤害列表的boss
	 * @return 
	 * 
	 */		
	public getEntityHasDamageList():GameEntity[]
	{
		var entitys:GameEntity[] = [];
/* 		var entitysList:GameEntity[] = this.getEntityByType(EntityType.MONSTER);
		var info:SceneMonsterVo;
		var index:number;
		for each(var entity:GameEntity in entitysList)
		{
			info = entity.infoComponent.<SceneMonsterVo> data;
			if(info && info.dataObj[MessageValueType.bossDamageList] || entity.isTombstone)
				entitys.push(entity);
			index ++;
		} */
		return entitys;
	}
	
	/**
	 * 获取实体数量 
	 * @return 
	 * 
	 */		
	public getEntitySize():number
	{
		var num:number;
		for(var key in this.entityList)
			num++;
			
		return num;
	}// end for this.getEntitySize
	
	/**
	 * 用显示的对象返回实体 
	 */
/* 	public getEntityByObj(obj:ObjectContainer3D):GameEntity
	{
		for (var entity:GameEntity of this.entityList) 
		{
			var renderCom:RenderComponent = entity.getComponent(ComponentConst.RENDER);
			if(renderCom.getRootContainer() == obj || renderCom.mesh == obj)
				return entity;
		}
		
		return null;
	} */
	
	/**
	 * 获取镜头精灵 
	 * @return 
	 * 
	 */		
	public getCameraEntity():GameEntity
	{
		for(var key in this.entityList) 
		{
			let entity = this.entityList[key];
			if(entity.isCameraObj)
				return entity;
		}
		return null; 
	}

	
	/**
	 * 设置精灵显示 
	 * @param entity
	 * @param visible
	 * @param headVisble
	 * 
	 */
	public setEntityVisible(entity:GameEntity,visible:boolean,headVisble:boolean = true):void
	{
/* 		var renderCom:RenderComponent;
		var headCom:HeadNewComponent;
		renderCom = entity.getComponent(ComponentConst.RENDER);
		if(renderCom)
			renderCom.visible = visible;
		headCom = entity.getComponent(ComponentConst.HEAD_NEW);
		if(headCom && headVisble)
			headCom.visible = visible; */
	}
	/**
	 * 设置血条 colin
	 * @param entity
	 * @param visible
	 * 
	 */		
/* 	public setEntityHeadVisible(entity:GameEntity,visible:boolean):void
	{
		var headCom:HeadNewComponent;
		headCom = entity.getComponent(ComponentConst.HEAD_NEW);
		if(headCom)
			headCom.visible = visible;
	} */
	/**
	 * 移除除主角的精灵
	 */		
	public destroy():void
	{
		for(var entity of this.entityList) 
		{
			if(entity.changeSceneDestroy&&entity.entityType!=EntityType.UI)
				this.removeEntity(entity.key);
		}
	}// end for this.destroy
	
	/**
	 * 处理延时移除的精灵
	 * 一帧只删1个精灵  1秒就是60个精灵，集中删会导致GC特别集中 卡顿很严重
	 */
	public laterDestroy():void
	{
		var index:number=0;
		while(this.laterDestoryKey.length)
		{
			var entityKey:string = this.laterDestoryKey.shift();
			if(this.hasEntity(entityKey)){
				this.removeEntity(entityKey);
				return;
			}
		}
	}
}