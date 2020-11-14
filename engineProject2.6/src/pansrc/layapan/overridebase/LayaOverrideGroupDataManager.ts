import { GroupRes } from "../../../tl3d/engine/utils/res/GroupRes";
import { LayaOverride2dSceneManager } from "./LayaOverride2dSceneManager";
import { TimeUtil } from "../../../tl3d/engine/utils/TimeUtil";
import { Scene_data } from "../../../tl3d/engine/context/Scene_data";
import { Pan3dByteArray } from "../../../tl3d/engine/math/Pan3dByteArray";
import { GroupDataManager } from "../../../tl3d/engine/utils/GroupDataManager";

export class LayaGroupRes extends GroupRes {
    public constructor() {
        super();
    }
    public scene: LayaOverride2dSceneManager
    public readParticle(): void {
        var objNum: number = this._byte.readInt();
        //this.particleAry = new Array;
        var time: number = TimeUtil.getTimer();

        for (var i: number = 0; i < objNum; i++) {
            var url: string = Scene_data.fileRoot + this._byte.readUTF();
            var size: number = this._byte.readInt();


            var dataByte: Pan3dByteArray = new Pan3dByteArray;
            dataByte.length = size;
            this._byte.readBytes(dataByte, 0, size)

            this.scene.particleManager.addResByte(url, dataByte);

        }


    }
}
export class LayaOverrideGroupDataManager extends GroupDataManager {


    public scene: LayaOverride2dSceneManager
    public getGroupData($url: string, $fun: Function): void {

        if (this._dic[$url]) {
            var gr: LayaGroupRes = this._dic[$url];
            gr.useNum++;
            $fun(gr);
            return;
        }

        if (this._loadDic[$url]) {
            this._loadDic[$url].push($fun);
            return;
        }

        this._loadDic[$url] = new Array;
        this._loadDic[$url].push($fun);

        var group: LayaGroupRes = new LayaGroupRes();
        group.scene = this.scene;
        group.load($url, () => {
            var ary: Array<Function> = this._loadDic[$url];
            for (var i: number = 0; i < ary.length; i++) {
                var fun: Function = ary[i];
                fun(group);
            }
            this._dic[$url] = group;
            delete this._loadDic[$url];
            group.initReg();
        })




    }

}