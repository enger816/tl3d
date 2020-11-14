import { TApp } from "../TApp";
import { MapConst } from "./configs/MapConst";
import { EnumMotion } from "./EnumMotion";
import { MoveComponent } from "./MoveComponent";
import { SystemMgr } from "./SystemMgr";
import MathUtil = tl3d.MathUtil;
import Point = Laya.Point;

export class MoveSystem {

    /** 旋转速度 **/
    private static ROT_SPEED: number = 10.0;

    /**
     * 帧频处理移动
     * @param entity 待处理精灵
     * @param tickTime 距离上次处理间隔的时间
     * @param rect 视野范围
     * 
     */
    public run(entity: tl3d.ModelSceneChar, tickTime: number, rect: Laya.Rectangle): void {
        //移动精灵并返回是否穿过一个格子
        if (!this.entityMove(entity, tickTime))
            return;
        var px = entity.x;
        var py = entity.z;
        //相机对象需要被相机跟踪
        // TApp.gameView.onPlayerMoveint(px, py);
        this.checkOtherCurrTile(entity, rect);
    }

    private lastBlockX: number;
    private lastBlockY: number;

    /**
     * 检查其它玩家的地图块是否改变，用于检查移除
     */
    public checkOtherCurrTile(entity: tl3d.ModelSceneChar, rect: Laya.Rectangle): void {
        if (!entity)
            return;

        var px = entity.x;
        var py = entity.z;
        var newBlockX: number = px / MapConst.MAP_BLOCK_WIDTH | 0;
        var newBlockY: number = py / MapConst.MAP_BLOCK_HEIGHT | 0;

        if (this.lastBlockX != newBlockX || this.lastBlockY != newBlockY) {
            //其它玩家切块检查是否出视野
            // if (this.lastBlockX != -1 || this.lastBlockY != -1)
            //     this.checkSpriteOutView(entity, rect);

            this.lastBlockX = newBlockX;
            this.lastBlockY = newBlockY;
        }
    }


    /**
     *  功能:精灵移动
     *  参数:any  返回值:表示是否穿过一个格子
     **/
    public entityMove(entity: tl3d.ModelSceneChar, duration: number): boolean {
        var moveCom: MoveComponent =  SystemMgr.singleton.moveComp;
        var nextPoint: SpritePoint = moveCom.movePathArr[0];
        if (!nextPoint)//没有下一个格子
        {
            return false;
        }
        var angle=TApp.mainChar.rotationY;
        var px=TApp.mainChar.px;
        var py=TApp.mainChar.py;
        var isMain: boolean = true;//是否主角
        //所在点
        var currPoint: Laya.Point = new Laya.Point(px, py);

        //下一个点
        var nextPixel: Laya.Point = new Laya.Point(nextPoint.x * MapConst.TILE_SIZE + MapConst.TILE_SIZE / 2, nextPoint.y * MapConst.TILE_SIZE + MapConst.TILE_SIZE / 2);
        //方向
        var angle: number = MathUtil.getTowPointsAngle2(currPoint.x, currPoint.y, nextPixel.x, nextPixel.y) + 90;
        // var motionCom: MotionComponent = entity.getComponent(ComponentConst.MOTION);
        var mSpeed: number = 10;

        //距离
        var distance: number = currPoint.distance(nextPixel.x, nextPixel.y);
        var move: number = duration * mSpeed / 1000;

        var value: number = angle;
        value = (value % 360 + 360) % 360;
        angle = (angle % 360 + 360) % 360;
        if (move < distance)//没有到达下一个点则设置坐标
        {
            // public static TO_RAD:number = Math.PI / 180;//0.0174532925199433
            var radian: number = MathUtil.getTowPointsAngle(currPoint, nextPixel) * (Math.PI / 180);
            if (!isMain) {
                console.log("移动", "cx" + Number(currPoint.x) + "cy" + Number(currPoint.y) + " tx" + Number(nextPixel.x) + "ty" + Number(nextPixel.y) + " angle:" + angle);
            }

            currPoint.x += move * Math.cos(radian);
            currPoint.y += move * Math.sin(radian);
            TApp.mainChar.x = currPoint.x;
            TApp.mainChar.z = currPoint.y;

            var disAngle: number;
            var dis1: number;
            var dis2: number;
            var speed: number = MoveSystem.ROT_SPEED;
            if (value > angle) {
                dis1 = value - angle;//正向
                dis2 = angle + 360 - value;//反向
                if (dis1 > dis2) {
                    disAngle = dis2;
                }
                else {
                    speed = -MoveSystem.ROT_SPEED
                    disAngle = dis1;
                }
            }
            else {
                dis1 = angle - value;
                dis2 = value + 360 - angle;
                if (dis1 > dis2) {
                    disAngle = dis2;
                    speed = -MoveSystem.ROT_SPEED;
                }
                else {
                    disAngle = dis1;
                }
            }
            //out(value, angle,  disAngle);
            if (disAngle > 5) {
                TApp.mainChar.rotationY = value + disAngle / 4 * (speed / MoveSystem.ROT_SPEED);
            }

        }
        else//超过距离则直接把坐标设置为下一个点 并从数组中取出再下一个点
        {
            TApp.mainChar.rotationY = angle;
            TApp.mainChar.x = nextPixel.x;
            TApp.mainChar.y = nextPixel.y;
            var crossTile: SpritePoint = moveCom.movePathArr.shift();
            // if (moveCom.movePathCutter && moveCom.movePathCutter.isCrossTile(crossTile)) {
            //     var nextPathArr: SpritePoint[] = moveCom.getPathCutter().getNextPath();
            //     var nextPathFristTile: SpritePoint = nextPathArr[0];
                // if (jumpModel.isJump(nextPathFristTile.x, nextPathFristTile.y)) {//站在跳跃点上
                //     console.log("站在跳跃点上");
                // }
                // else {
                //     moveCom.sendNextPath(nextPathArr);
                // }
            // }
        }

        //已经到达目标点
        if (moveCom.isArrive) {
            //motionCom.playAnimation(EnumActor.ACTION_STAND);
            TApp.mainChar.play(EnumMotion.IDLE);

            // if (postion.isCrossTile && moveCom.moveCallback) {
            //     // DGGame.eventDispatcher.event(MoveEvent.MOVE_THROUGH, entity.key);
            //     moveCom.moveCallback.onThrough(entity);
            // }


            // if (entity.isMain) {
            //     DGGame.eventDispatcher.event(MoveEvent.MAIN_CHAR_ARRIVE, entity.key);
            // } else {
            //     if (moveCom.moveCallback)
            //         moveCom.moveCallback.onArrive(entity);
            // }
        }
        else {
            // if (postion.isCrossTile && moveCom.moveCallback) {
            //     // DGGame.eventDispatcher.event(MoveEvent.MOVE_THROUGH, entity.key);
            //     moveCom.moveCallback.onThrough(entity);
            // }
            // if (isMain) {
            //     // DGGame.eventDispatcher.event(MoveEvent.MAIN_CHAR_MOVE);
            // }
        }

        if (isMain) {
            //检测有没有穿过动态区域
            // var mapProxy: MapProxy = DGContext.getInstance(MapProxy);
            // SystemMgr.singleton.areaTriggerSystem.checkClientChangeTriggerArea(entity);
        }
        return true;
    }


    /**
     * 停止移动 
     * @param entityKey
     * @param callBack
     */
    public stopMove(entityKey: string, debug: string, isChangeMap: boolean = false, needChangeMotion: boolean = true): void {
        if (TApp.mainChar)
            TApp.mainChar.play(EnumMotion.IDLE);
    }
}