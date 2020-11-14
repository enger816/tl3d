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
var GuidObjManager = /** @class */ (function (_super) {
    __extends(GuidObjManager, _super);
    function GuidObjManager() {
        var _this = _super.call(this) || this;
        _this._hashGUID = function (guid) {
            if (ObjectDef.UNIT == ObjectDef.getPrefix(guid)) {
                return ObjectDef.getGUIDIndex(guid);
            }
            else if (ObjectDef.LOOT == ObjectDef.getPrefix(guid)) {
                return ObjectDef.getGUIDIndex(guid);
            }
            else {
                return 0;
            }
        };
        return _this;
    }
    GuidObjManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new GuidObjManager();
        }
        return this._instance;
    };
    //public player: PlayerGuidObject;
    //public map: MapInfo;
    //public bag: BagData;
    GuidObjManager.prototype.CreateObject = function (k) {
        //   console.log("创--------------------------------建：",k);
        var p = this._objs[k];
        if (!p) {
            var types = ObjectDef.getPrefix(k);
            if (types == ObjectDef.STRENGTH) {
                p = new StrengGuidObject(k);
            }
            else if (types == ObjectDef.MAP) {
                p = new MapInfo(k);
                GuidData.map = p;
            }
            else if (types == ObjectDef.UNIT) {
                p = new Unit(k);
            }
            else if (types == ObjectDef.LOOT) {
                p = new Loot(k);
            }
            else if (types == ObjectDef.PLAYER) {
                p = new PlayerGuidObject(k);
                GuidData.player = p;
            }
            else if (types == ObjectDef.BAG) {
                p = new BagData(k);
                GuidData.bag = p;
            }
            else if (types == ObjectDef.FACTION) {
                p = new FactionData(k);
                GuidData.faction = p;
            }
            else if (types == ObjectDef.GROW) {
                p = new GrowData(k);
                GuidData.grow = p;
            }
            else if (types == ObjectDef.INSTANCE) {
                p = new InstanceData(k);
                GuidData.instanceData = p;
            }
            else if (types == ObjectDef.SOCIAL) {
                p = new SocialData(k);
                GuidData.social = p;
            }
            else if (types == ObjectDef.EMAIL) {
                p = new GiftPacksData(k);
                GuidData.giftPacks = p;
            }
            else if (types == ObjectDef.TEAM) {
                p = new TeamData(k);
                GuidData.team = p;
            }
            else if (types == ObjectDef.QUEST) {
                p = new QuestData(k);
                GuidData.quest = p;
            }
            else if (types == ObjectDef.GLOBEL) {
                if (k == ObjectDef.GLOBAL_VALUE) {
                    p = new GlobelValueData(k);
                    GuidData.globelValue = p;
                }
                else {
                    p = new GuidObject(k);
                }
            }
            else {
                p = new GuidObject(k);
            }
            p.guid = k;
            //  //console.log(p);
            this.AttachObject(p);
        }
        return p;
    };
    GuidObjManager.prototype.getGuidObject = function (preStr) {
        for (var key in this._objs) {
            if (key.charAt(0) == preStr) {
                return this._objs[key];
            }
        }
        return null;
    };
    GuidObjManager.prototype.getUnitByID = function ($id) {
        var guid = this._u_2_guid[$id];
        if (guid) {
            var unit = this._objs[guid];
            return unit;
        }
        return null;
    };
    GuidObjManager.prototype.applyJumpShow = function (u_guid, $arr, $t) {
        var guid = this._u_2_guid[u_guid];
        if (guid) {
            var $unit = this._objs[guid];
            $unit.setJumpShow($arr, $t);
        }
    };
    GuidObjManager.prototype.msgSpellStop = function ($guid) {
        var $unit = this._objs[$guid];
        if ($unit) {
            $unit.msgSpellStop();
        }
    };
    GuidObjManager.prototype.applyGridJump = function ($byte) {
        var count = $byte.readShort();
        for (var i = 0; i < count; i++) {
            var u_guid = $byte.readUnsignedInt();
            var xpos = $byte.readUnsignedShort();
            var ypos = $byte.readUnsignedShort();
            var guid = this._u_2_guid[u_guid];
            if (guid) {
                var $unit = this._objs[guid];
                $unit.setJump(new Vector2D(xpos, ypos));
                if ($unit.isMain) {
                    var $mainEvent = new mainUi.MainUiEvent(mainUi.MainUiEvent.PLAYER_SKILL_CD_REFRESH);
                    $mainEvent.data = 1; //跳跃技能CD为1
                    ModuleEventManager.dispatchEvent($mainEvent);
                }
            }
        }
    };
    GuidObjManager.prototype.applyGridMove = function ($byte) {
        var count = $byte.readShort();
        for (var i = 0; i < count; i++) {
            var u_guid = $byte.readUnsignedInt();
            var b = $byte.readByte(); //标志位 FIXME
            var path = new Array;
            var xpos = $byte.readUnsignedShort();
            var ypos = $byte.readUnsignedShort();
            path.push(new Vector2D(xpos, ypos));
            var pathlen = $byte.readUnsignedShort();
            for (var j = 0; j < pathlen; j += 2) {
                xpos += $byte.readByte();
                ypos += $byte.readByte();
                var pos = new Vector2D(xpos, ypos);
                path.push(pos);
            }
            var guid = this._u_2_guid[u_guid];
            if (guid) {
                var unit = this._objs[guid];
                unit.setPath(path);
            }
        }
    };
    GuidObjManager.prototype.applyGridStop = function ($byte) {
        var u_guid = $byte.readUnsignedInt();
        var xpos = $byte.readUnsignedShort();
        var ypos = $byte.readUnsignedShort();
        ////console.log("---收到停止消息" + 　u_guid);
        var guid = this._u_2_guid[u_guid];
        if (guid) {
            var unit = this._objs[guid];
            unit.stop(xpos, ypos);
        }
    };
    return GuidObjManager;
}(GuidObjectTable));
//# sourceMappingURL=GuidObjManager.js.map