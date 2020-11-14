/*
* name;
*/
class GameUIChar extends Game2dChar {
    /**guid */
    public guid: string;
    /**模板id */
    public tempId: number;
    /**是否玩家 */
    public isPlayer: boolean;
    /**最大血量 */
    public maxHp: number;
    /**当前血量 */
    public hp: number;
    /**血量百分比 */
    public hpr: number;
    /**死亡回调 */
    public onDead: Function;
    /**拥有技能 */
    public skillData: Array<number>;
    /**初始位置 */
    public pos: tl3d.Vector3D;
    /**初始角度 */
    public rotation: number;
    /**移动完成*/
    public movesucc:boolean = false;
    public skin:number;

    constructor() {
        super();

    }

    //重写一下2d界面角度 -45+30
    public updateMatrix(): void {
        this.posMatrix.identity();
        this.posMatrix.appendScale(this._scaleX, this._scaleY, this._scaleZ);
        this.posMatrix.appendRotation(this._rotationY, tl3d.Vector3D.Y_AXIS)
        this.posMatrix.appendRotation(30, tl3d.Vector3D.X_AXIS)
        this.posMatrix.appendRotation(this._rotationZ, tl3d.Vector3D.Z_AXIS)
        this.posMatrix.appendTranslation(this._x, this._y, this._z);
    }


    /**
     * 设置血量
     */
    // public setHp(value: number, $time: number,$cb:Function): void {
    //     this.hptick = setTimeout(() => {
    //         if (!this.isPlayer) {
    //             this.hp -= value;
    //             if (this.hp < 0) {
    //                 this.hp = 0;
    //             }
    //             this.lifenum = (this.hp / this.maxHp) * 100;
    //         }

    //         this.play(this.hp <= 0 ? Pan3d.CharAction.DEATH : Pan3d.CharAction.INJURED, this.hp <= 0 ? 1 : 2, false);
    //         if($cb){
    //             $cb(new Pan3d.Vector3D(this.px,this.py + 50, this.pz));
    //         }
    //         if (this.hp <= 0) {
    //             this.onDie();
    //         }
    //     }, $time);
    // }

    /**
     * 角色死亡
     * @param force 
     */
    // public onDie(): void {
    //     this.clearBloodBar();
    //     this.dietick = setTimeout(() => {
    //         this.removeSelf();
    //         if (this.onDead) {
    //             this.onDead.call(null, [this.guid]);
    //         }
    //     }, 1500);
    // }

    private dietick:number;
    private hptick:number;

    /**
     * 移除显示
     */
    public removeSelf(): void {
        if (this._hasDestory) {
            return;
        }
        clearTimeout(this.hptick);
        clearTimeout(this.dietick);
        // this.lifenum = 0;
        this.hp = 0;
        this.clearBloodBar();
        this._scene.removeMovieDisplay(this);
        this.destory();
    }

    /**
     * 删除血条
     */
    public clearBloodBar(): void {
        // if (this._charBloodVo) {
        //     (<BloodManagerExt>(this._scene).bloodMgr).clearBloodLineMeshVo(this._charBloodVo);
        //     this._charBloodVo.destory();
        //     this._charBloodVo = null;
        // }
    }

}