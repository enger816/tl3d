class BaseWinPanel extends Laya.Sprite {
    constructor() {
        super()
        var $imag: Laya.Image = new Laya.Image(Pan3d.Scene_data.fileRoot+"a.png")
        this.addChild($imag);
        $imag.on(Pan3d.MouseType.MouseDown, this, this.onStartDrag);
    }
    private onStartDrag(e: Event): void {
        this.startDrag(this.dragRegion, true, 100);
    }
    public showJumpText($scene: layapan.LayaOverride2dSceneManager, $pos: Pan3d.Vector3D): void {

        var $jumpVo: Pan3d.TextJumpUiVo = new Pan3d.TextJumpUiVo()
        $jumpVo.str = String(random(999));
        $jumpVo.pos = new Pan3d.Vector3D();
        $jumpVo.pos.x = $pos.x
        $jumpVo.pos.z = $pos.z
        $jumpVo.pos.y = 30
        $jumpVo.type = random(5)
        $jumpVo.starttime = Pan3d.TimeUtil.getTimer();
        $jumpVo.endtime = Pan3d.TimeUtil.getTimer() + 1200;
        $scene.bloodManager.setJumpNum($jumpVo);
    }

    private dragRegion: Laya.Rectangle;
}