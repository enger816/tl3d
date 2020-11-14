import { TApp } from "../TApp";
import { MoveComponent } from "./MoveComponent";
import { MoveSystem } from "./MoveSystem";

/**
 * 系统管理器
 */
export class SystemMgr
{
    /** 给别的功能使用的时间,每帧更新一次,不精确 */
    public Time:number;

    /** 上次更新的时间 **/
    private lastTime:number;

    /** 是否准备完成 **/
    public ready:boolean = false;

    /** 移动系统 **/
    public moveSystem:MoveSystem = new MoveSystem();
    public moveComp:MoveComponent=new MoveComponent("");

    public constructor()
    {
        if(SystemMgr._singleton){
            throw new Error("SystemManager: only one instance!");
        }
    }
    
    //singleton
    private static _singleton:SystemMgr = new SystemMgr();

    public static get singleton():SystemMgr
    {
        return this._singleton;
    }


    /**
     *  功能:运行系统功能
     *  参数:
     **/    
    public run(time:number):void{
        if(!this.ready)
            return;

        if(this.lastTime == 0)
            this.lastTime = time;

        let duration:number = time - this.lastTime;
        this.Time = this.lastTime = time;

        var rect:Laya.Rectangle = TApp.gameView.getViewRect();

        // var entitys:any = DGApp.entityMgr.getAllEntitys();
       
        this.moveSystem.run(TApp.mainChar,duration,rect);

        //检查npc和特效
        // this.checkViewSystem.checkLoadRes(rect);
    }
}