var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SceneEvent = /** @class */ (function (_super) {
    __extends(SceneEvent, _super);
    function SceneEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SceneEvent.SCENE_NEW_ACHIEVEMENT_EVENT = "SCENE_NEW_ACHIEVEMENT_EVENT";
    SceneEvent.SCENE_NEW_DESIGNATION_EVENT = "SCENE_NEW_DESIGNATION_EVENT";
    SceneEvent.SCENE_NEW_WEAPONS_EVENT = "SCENE_NEW_WEAPONS_EVENT";
    return SceneEvent;
}(BaseEvent));
var SceneModule = /** @class */ (function (_super) {
    __extends(SceneModule, _super);
    function SceneModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SceneModule.prototype.getModuleName = function () {
        return "SceneModule";
    };
    SceneModule.prototype.listProcessors = function () {
        return [new SceneProcessor()];
    };
    return SceneModule;
}(Module));
var SceneProcessor = /** @class */ (function (_super) {
    __extends(SceneProcessor, _super);
    function SceneProcessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SceneProcessor.prototype.getName = function () {
        return "SceneProcessor";
    };
    SceneProcessor.prototype.receivedModuleEvent = function ($event) {
        var $sceneEvent = $event;
        if ($sceneEvent.type == SceneEvent.SCENE_NEW_ACHIEVEMENT_EVENT) {
            this.popnewachieventpanel($sceneEvent.data);
        }
        else if ($sceneEvent.type == SceneEvent.SCENE_NEW_DESIGNATION_EVENT) {
            this.popnewdesignationpanel($sceneEvent.data);
        }
    };
    SceneProcessor.prototype.popnewachieventpanel = function ($data) {
        PopNewPromptUtil.show(PopNewPromptUtil.NEW_ACHIEVEMENT, $data);
    };
    SceneProcessor.prototype.popnewdesignationpanel = function ($data) {
        PopNewPromptUtil.show(PopNewPromptUtil.NEW_DESIGNATION, $data);
    };
    SceneProcessor.prototype.listenModuleEvents = function () {
        return [
            new SceneEvent(SceneEvent.SCENE_NEW_ACHIEVEMENT_EVENT),
            new SceneEvent(SceneEvent.SCENE_NEW_DESIGNATION_EVENT),
            new SceneEvent(SceneEvent.SCENE_NEW_WEAPONS_EVENT),
            new EngineEvent(EngineEvent.CREAT_SCENE_EVENT),
        ];
    };
    SceneProcessor.prototype.smsgMapUpdataObject = function ($byte) {
        GuidObjManager.getInstance().ApplyBlock($byte);
    };
    SceneProcessor.prototype.smsgNoticeWatcherMapInfo = function ($byte) {
        var $vo = new s2c_notice_watcher_map_info();
        s2c_notice_watcher_map_info.read($vo, $byte);
        //console.log("观察者信息", $vo);
    };
    SceneProcessor.prototype.newWeapons = function ($byte) {
        var sfdc = new s2c_bag_find_equip_better();
        s2c_bag_find_equip_better.read(sfdc, $byte);
        // UseItemPanel.getInstance().show(sfdc.item_id, "", true, sfdc.pos, 5000);
        var vo = new newbieguide.UseItemVo;
        vo.itemId = sfdc.item_id;
        vo.time = 5000;
        vo.guid = "";
        vo.equPos = sfdc.pos;
        vo.num = 1;
        vo.force = sfdc.force;
        var $evt = new newbieguide.NewbieguideEvent(newbieguide.NewbieguideEvent.SHOW_USEITEM_EVENT);
        $evt.data = vo;
        ModuleEventManager.dispatchEvent($evt);
    };
    SceneProcessor.prototype.msgDeath = function ($byte) {
        var sfdc = new s2c_field_death_cooldown();
        s2c_field_death_cooldown.read(sfdc, $byte);
        //console.log("---死亡面板-==");
        //var evt:
        // if (sfdc.type == SharedDef.DEAD_PLACE_TYPE_XIANFU) {
        //     var evt: kuafu.XianFuEvent = new kuafu.XianFuEvent(kuafu.XianFuEvent.XIANFU_DEATH_EVENT);
        //     evt.data = sfdc;
        //     ModuleEventManager.dispatchEvent(evt);
        // } else {//普通野外复活
        //     DeathPanel.show("[d6e7ff]你被[ce0a00]" + getBaseName(sfdc.killername) + "[d6e7ff]击败了",
        //         null,
        //         "[d6e7ff]秒后自动随机复活", 10, 10, 1,
        //         () => { NetManager.getInstance().protocolos.gold_respawn(1) },
        //         () => { NetManager.getInstance().protocolos.xianfu_random_respawn() });
        // }
        DeathPanel.show(sfdc.type, sfdc.value, sfdc.cooldown);
    };
    SceneProcessor.prototype.smsgShowUnitAttribute = function ($byte) {
        var $len = $byte.readUint16();
        //console.log($len)
        for (var i = 0; i < $len; i++) {
            var id = $byte.readUint32();
            var num = $byte.readUint32();
            //console.log(getKeyProById(id - 1), ":", num);
        }
        //console.log("----------------------------------");
    };
    SceneProcessor.prototype.smsgShowLoot = function ($byte) {
        var sla = new s2c_show_loot_animate();
        s2c_show_loot_animate.read(sla, $byte);
        //console.log(sla.info);
        var ary = sla.info.split(",");
        var size = ary.length / 2;
        var posAry = this.getPosList(new Vector2D(Number(ary[0]), Number(ary[1])), size - 1);
        var scAry = new Array;
        for (var i = 1; i < size; i++) {
            var item = tb.TB_item_template.get_TB_item_template(Number(ary[i * 2]));
            var urlName;
            var sc = new SceneLoot();
            sc.setShadowSize(10);
            sc.setAvatar(6500);
            sc.showName(getColorQua(item.quality) + item.name);
            sc.forceRotationY = 180 - Scene_data.gameAngle;
            var p2d = posAry[i - 1];
            sc.gridX = p2d.x;
            sc.gridY = p2d.y;
            sc.moveToPos2D = posAry[0];
            //GameInstance.addSceneChar(sc);
            sc.data = { item: item, num: ary[i * 2 + 1], idx: i };
            scAry.push(sc);
            var t = 1000 * Math.random();
            this.showLoot(2000 + t, sc, p2d, i);
            this.hideLoot(3000 + t, sc);
            // TimeUtil.addTimeOut(2000 + t,()=>{
            //     var obj:any = sc;
            //     TweenLite.to(obj,1,{px:tpos.x,py:tpos.y,pz:tpos.z});
            // })
            // TimeUtil.addTimeOut(3000 + t,()=>{
            //     GameInstance.removeSceneChar(sc);
            //     sc.destory();
            // })
        }
    };
    SceneProcessor.prototype.showLoot = function (time, obj, targetPos, idx) {
        var _this = this;
        TimeUtil.addTimeOut(idx * 100, function () {
            GameInstance.addSceneChar(obj);
            var targetPy = obj.py + 80;
            var pos = AstarUtil.getWorldPosByStart2D(targetPos);
            pos.y = AstarUtil.getHeightByPos(pos);
            TweenLite.to(obj, 0.3, { py: targetPy, ease: Linear.easeNone, onComplete: function () {
                    TweenLite.to(obj, 0.5, { px: pos.x, py: pos.y, pz: pos.z });
                } });
        });
        TimeUtil.addTimeOut(time, function () {
            var tpos = MathUtil.mathDisplay2Dto3DWorldPos(new Vector2D(BagData.uipos.x, BagData.uipos.y));
            TweenLite.to(obj, 1, { px: tpos.x, py: tpos.y, pz: tpos.z, scale: 0.5 });
            var data = obj.data;
            var $str = "[FFE57E]获得 " + getColorQua(data.item.quality) + data.item.name + "[FFE57E]×" + data.num;
            _this.showTempTime(data.idx * 150, $str, 3);
        });
    };
    SceneProcessor.prototype.hideLoot = function (time, obj) {
        TimeUtil.addTimeOut(time, function () {
            GameInstance.removeSceneChar(obj);
            obj.destory();
        });
    };
    SceneProcessor.prototype.showTempTime = function ($time, $str, $type) {
        TimeUtil.addTimeOut($time, function () {
            msgtip.MsgTipManager.outStr($str, msgtip.MsgTipManager.getPopTypeByTB($type));
        });
    };
    SceneProcessor.prototype.createOffset = function (size, keyDic) {
        for (var i = -size; i <= size; i++) {
            for (var j = -size; j <= size; j++) {
                var key = i + "," + j;
                if (!keyDic[key]) {
                    this.offsetAry.push(new Vector2D(i * 2, j * 2));
                    keyDic[key] = true;
                }
            }
        }
        if (size < 6) {
            this.createOffset(size + 1, keyDic);
        }
    };
    SceneProcessor.prototype.getOffsetAry = function () {
        if (this.offsetAry) {
            return this.offsetAry;
        }
        this.offsetAry = new Array();
        var dic = new Object;
        this.offsetAry.push(new Vector2D(0, 0));
        dic["0,0"] = true;
        this.createOffset(1, dic);
        return this.offsetAry;
    };
    SceneProcessor.prototype.getPosList = function (basePos, size) {
        var basePosAry = this.getOffsetAry();
        var flag = 0;
        var ary = new Array;
        for (var i = 0; i < size;) {
            var tpos = basePosAry[flag];
            flag++;
            tpos = tpos.add(basePos);
            if (!AstarUtil.isGridCanWalk(tpos)) {
                continue;
            }
            i++;
            ary.push(tpos);
        }
        return ary;
    };
    SceneProcessor.prototype.smsgFullizehp = function ($byte) {
        var $str = $byte.readString();
        console.log($str);
        GameInstance.smsgFullizehp = $str;
    };
    SceneProcessor.prototype.getHanderMap = function () {
        var _this = this;
        var obj = new Object;
        obj[Protocols.SMSG_MAP_UPDATE_OBJECT] = function ($byte) { _this.smsgMapUpdataObject($byte); };
        obj[Protocols.SMSG_NOTICE_WATCHER_MAP_INFO] = function ($byte) { _this.smsgNoticeWatcherMapInfo($byte); };
        obj[Protocols.SMSG_FIELD_DEATH_COOLDOWN] = function ($byte) { _this.msgDeath($byte); };
        obj[Protocols.SMSG_BAG_FIND_EQUIP_BETTER] = function ($byte) { _this.newWeapons($byte); };
        obj[Protocols.SMSG_SHOW_UNIT_ATTRIBUTE] = function ($byte) { _this.smsgShowUnitAttribute($byte); };
        obj[Protocols.SMSG_SHOW_LOOT_ANIMATE] = function ($byte) { _this.smsgShowLoot($byte); };
        obj[Protocols.SMSG_FULLIZE_HP] = function ($byte) { _this.smsgFullizehp($byte); };
        return obj;
    };
    return SceneProcessor;
}(BaseProcessor));
//# sourceMappingURL=SceneProcessor.js.map