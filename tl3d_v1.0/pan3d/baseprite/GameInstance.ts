module Pan3d {
    export class QuestMoveVo {
        public pos: Vector2D;
        public data: any;
        public autoplay: boolean = false;
    }
    export class GameInstance {


        public static smsgFullizehp: string
        public static gameSyncTime: both_sync_mstime; //场景服时间
        public static gameSyncClientTime: number;//同步客户端场景时间 毫秒
        public static appSynctTime: both_sync_mstime_app; //应用服时间
        public static appSyncClientTime: number;  //同步客户端应用时间 毫秒
        public static serverOpenTime: number;//开服时间

        public static getGameEndMillisecond($endT: number): number   //传入服务器场景结束时间 返回剩余时间  都是毫秒;
        {
            return TimeUtil.getTimer() + ($endT - GameInstance.gameSyncTime.time_now) * 1000
        }
        public static getGameSecond($endT: number): number {  //返回剩余时间秒;都是秒;
            // var $a: number = Math.floor(GameInstance.gameSyncTime.time_now + (TimeUtil.getTimer() - GameInstance.gameSyncClientTime) / 1000);
            var $a: number = this.getServerNow();
            return $endT - $a;
        }
        public static getServerNow(): number {
            var $t: number = (TimeUtil.getTimer() - GameInstance.appSyncClientTime) / 1000 + GameInstance.appSynctTime.time_now;
            return float2int($t);
        }

     
        public static pingpontm: number = 9999999
        public static pandaVisibel: boolean = true
        public static canclikFightui: boolean = true
        public static mapName: string;
        public static roleList: Array<SceneChar> = new Array;
        private static loadComplteFun: Function;
        private static loadProgressFun: Function;
        public static mainChar: SceneChar;
        public static skillCdItem: Array<any>;
        public static bagCdItem: any = new Object
        private static _attackTarget: SceneChar;
        // public static fightSkillSelect: tb.SkillDataVo;//按键选中的技能
        public static sid: string
        public static useYaoGan: boolean = false
        private static _threeBattarId: number = 0; //三连击序号 换场景从0开始
        public static sceneResEqu: boolean = false;

        public static set threeBattarId(value: number) {
            this._threeBattarId = value
            ////console.log("this._threeBattarId", this._threeBattarId)
        }
        public static get threeBattarId(): number {
            return this._threeBattarId
        }

        public static setAttackTargetByName($name: string): void {
            for (var i: number = 0; i < this.roleList.length; i++) {
                if (this.roleList[i].unit.getName() == $name) {
                    this.attackTarget = this.roleList[i];
                    break;
                }
            }
        }

        public static init(): void {
;
        }
        public static set attackTarget(value: SceneChar) {
            if (GameInstance._attackTarget) {
                GameInstance._attackTarget.removePart(SceneChar.SEL_PART)
            }
            GameInstance._attackTarget = value;
            if (GameInstance._attackTarget) {
                GameInstance._attackTarget.addPart(SceneChar.SEL_PART, SceneChar.NONE_SLOT, getModelUIUrl("6301"))
            }

        }

    
  


    }
}