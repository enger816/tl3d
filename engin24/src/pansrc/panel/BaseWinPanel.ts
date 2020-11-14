import {ui} from "../../../../../zhuilong/src/ui/layaMaxUI"
import Sprite = laya.display.Sprite
import Image = laya.ui.Image
import Event = laya.events.Event
import {Vector3D} from "../../../pan3d/engine/math/Vector3D"
import {MouseType} from "../../../pan3d/engine/utils/KeyControl"
import {LayaOverride2dSceneManager} from "../layapan/overridebase/LayaOverride2dSceneManager"
import {TextJumpUiVo} from "../../../pan3d/engine/utils/BloodManager"
import {TimeUtil} from "../../../pan3d/engine/utils/TimeUtil"
import {Rectangle} from "../../../pan3d/engine/math/Rectangle"
class BaseWinPanel extends Laya.Sprite {
    constructor() {
        super()
        var $imag: Laya.Image = new Laya.Image("res/a.png")
        $imag.alpha = 0
        this.addChild($imag);
        $imag.on(MouseType.MouseDown, this, this.onStartDrag);
    }
    private onStartDrag(e: Event): void {
        this.startDrag(this.dragRegion, true, 100);
    }
    public showJumpText($scene: layapan.LayaOverride2dSceneManager, $pos: Vector3D): void {

        var $jumpVo: TextJumpUiVo = new TextJumpUiVo()
        $jumpVo.str = String(random(999));
        $jumpVo.pos = new Vector3D();
        $jumpVo.pos.x = $pos.x
        $jumpVo.pos.z = $pos.z
        $jumpVo.pos.y = 30
        $jumpVo.type = random(5)
        $jumpVo.starttime = TimeUtil.getTimer();
        $jumpVo.endtime = TimeUtil.getTimer() + 1200;
        $scene.bloodManager.setJumpNum($jumpVo);
    }

    private dragRegion: Laya.Rectangle;
}