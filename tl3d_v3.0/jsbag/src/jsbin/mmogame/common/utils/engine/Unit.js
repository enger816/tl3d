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
//
var SkillServesVo = /** @class */ (function () {
    function SkillServesVo() {
    }
    return SkillServesVo;
}());
var BuffUnit = /** @class */ (function () {
    function BuffUnit($unit) {
        this.unit = $unit;
    }
    BuffUnit.prototype.changeBuffById = function ($indx) {
        var id = $indx >> 1;
        var di = $indx & 1;
        var $buffid = this.unit.GetUInt16(SharedDef.UNIT_FIELD_BUFF + id, di);
        var $endTime = this.unit.GetUInt16(SharedDef.UNIT_FIELD_BUFF_TM + id, di);
        var $effectid = this.unit.GetUInt16(SharedDef.UNIT_FIELD_BUFF_EFFECT_ID + id, di);
        if ($buffid != 0) {
            var $time = $endTime;
            //console.log("buff=》change", $indx);
            //console.log("uffid, time", $buffid, $time);
            this.item[$buffid] = { tm: TimeUtil.getTimer() + $time * 1000, effectid: $effectid };
        }
    };
    BuffUnit.prototype.getBuffGiverByBuffId = function ($id) {
        for (var i = 0; i < SharedDef.MAX_UNIT_BUFF; i++) {
            var id = i >> 1;
            var di = i & 1;
            var $buffid = this.unit.GetUInt16(SharedDef.UNIT_FIELD_BUFF + id, di);
            if ($id == $buffid) {
                return this.unit.GetUInt32(SharedDef.UNIT_FIELD_BUFF_CASTER_GUID + i);
            }
        }
        return -1;
    };
    BuffUnit.prototype.resetAllBufData = function () {
        this.item = new Object;
        for (var i = 0; i < SharedDef.MAX_UNIT_BUFF; i++) {
            this.changeBuffById(i);
        }
        this.resetVisible();
    };
    BuffUnit.prototype.resetVisible = function () {
        if (this.unit.sceneChar) {
            this.unit.sceneChar.showName();
        }
        if (this.unit.isMain) {
            ModuleEventManager.dispatchEvent(new topui.TopUiEvent(topui.TopUiEvent.REFRESH_TOP_LEFT_BUFF));
        }
    };
    BuffUnit.prototype.isBuffNeedGetByID = function ($indx) {
        var $hasBuff = false;
        var id = $indx >> 1;
        var di = $indx & 1;
        var $buffid = this.unit.GetUInt16(SharedDef.UNIT_FIELD_BUFF + id, di);
        var $endTime = this.unit.GetUInt16(SharedDef.UNIT_FIELD_BUFF_TM + id, di);
        if ($buffid != 0) {
            $hasBuff = true;
        }
        return $hasBuff;
    };
    BuffUnit.prototype.getSubscribeInfo = function () {
        var $needGet = false;
        for (var i = SharedDef.UNIT_FIELD_BUFF_CASTER_GUID; i < SharedDef.UNIT_FIELD_FORCE; i++) {
            var $indx = i - SharedDef.UNIT_FIELD_BUFF_CASTER_GUID;
            if (this.isBuffNeedGetByID($indx)) {
                $needGet = true;
            }
        }
        if ($needGet) {
            // //console.log("请求订阅", this.unit.uintGuid);
            NetManager.getInstance().protocolos.clientSubscription(this.unit.uintGuid);
        }
        else {
            this.item = null;
            this.resetVisible();
        }
    };
    BuffUnit.prototype.isBuffByID = function (value) {
        if (this.item && this.item[value]) {
            return true;
        }
        else {
            return false;
        }
    };
    BuffUnit.prototype.getBuffByID = function (value) {
        if (this.item && this.item[value]) {
            return this.item[value];
        }
        else {
            return null;
        }
    };
    return BuffUnit;
}());
var Unit = /** @class */ (function (_super) {
    __extends(Unit, _super);
    function Unit(g) {
        if (g === void 0) { g = ""; }
        var _this = _super.call(this, g) || this;
        _this.path = new Array;
        _this.isMain = false;
        _this.originalRotation = 0;
        _this.optimization = false; //当优化为true的时候 不显示
        _this._hasCreated = false;
        _this.tempSendPath = new Array;
        return _this;
    }
    Unit.prototype.ReadFromCopy = function (flags, bytes, evFilter, applyNew) {
        if (evFilter === void 0) { evFilter = null; }
        if (applyNew === void 0) { applyNew = true; }
        if (!this.buffUnit) {
            this.buffUnit = new BuffUnit(this);
        }
        return _super.prototype.ReadFrom.call(this, flags, bytes, evFilter, applyNew);
    };
    Unit.prototype.ReadFrom = function (flags, bytes, evFilter, applyNew) {
        if (evFilter === void 0) { evFilter = null; }
        if (applyNew === void 0) { applyNew = true; }
        if (this.ReadFromCopy(flags, bytes, evFilter, applyNew)) {
            //创建包会带路径信息
            if (flags & SyncEvent.OBJ_OPT_NEW) {
                var x = bytes.readShort();
                var y = bytes.readShort();
                var last_x = x;
                var last_y = y;
                this.path.push(new Vector2D(last_x, last_y));
                var len = bytes.readShort();
                for (var i = 0; i < len; i += 2) {
                    last_x += bytes.readByte();
                    last_y += bytes.readByte();
                    this.path.push(new Vector2D(last_x, last_y));
                }
                var tempr = bytes.readFloat();
                this.originalRotation = radian2angle(tempr);
                //  this.originalRotation = 0
                if (applyNew) {
                    this.onCreated();
                }
            }
        }
        else {
            return false;
        }
        return true;
    };
    Unit.prototype.onBaseCreated = function () {
        var _this = this;
        this.buffUnit = new BuffUnit(this);
        this._after_update = function ($flag, $intMask, $strMask) { _this.dataUpdate($intMask, $strMask); };
        // console.log("u-------->", this.getGuid(),"--", this.GetUInt16(SharedDef.UNIT_FIELD_UINT16_1, 0));
    };
    Unit.prototype.getUnitStringFieldGroupPeaceId = function () {
        return this.GetStr(SharedDef.UNIT_STRING_FIELD_FACTION_GUID);
    };
    Unit.prototype.getUnitStringFieldFactionGuid = function () {
        return this.GetStr(SharedDef.UNIT_STRING_FIELD_FACTION_GUID);
    };
    Unit.prototype.dataUpdate = function ($intMask, $strMask) {
        var $dic = new Object();
        for (var k in $intMask) {
            var kNum = Number(k);
            if (kNum < SharedDef.UNIT_FIELD_BUFF_CASTER_GUID || kNum >= SharedDef.UNIT_FIELD_FORCE)
                continue;
            var idex = kNum - SharedDef.UNIT_FIELD_BUFF_CASTER_GUID;
            if (!$dic[idex]) {
                $dic[idex] = 1;
            }
        }
        var $needGetBuff = false;
        for (var $key in $dic) {
            $needGetBuff = true;
        }
        if ($needGetBuff) {
            // //console.log(this.uintGuid, "buff数据有变");
            this.buffUnit.getSubscribeInfo();
        }
    };
    Unit.prototype.onCreated = function () {
        var _this = this;
        this.uintGuid = ObjectDef.getGUIDIndex(this._guid);
        this.buffUnit.getSubscribeInfo();
        var tf;
        if (this._hasCreated) {
            tf = this.sceneChar ? true : false;
        }
        else {
            tf = SceneCharManager.getInstance().creatChar(this);
        }
        ////console.log("创建UINT", this.getGuid())
        if (tf) {
            if (!this._hasCreated) {
                this.sceneChar.moveToPos2D = this.path[0];
                if (!this.isMain && this.path.length > 1) {
                    this.path.shift();
                    this.sceneChar.applyWalk(this.path);
                }
            }
            this.sceneChar.speedUseTime = this.getSpeed();
            this.sceneChar.forceRotationY = this.originalRotation;
            this.sceneChar.setAstarNrmAndRotation();
            this.sceneChar.refreshHP();
            RelationManager.getInstance().refresh();
            if (this.isNpc() && GuidData.quest) {
                quest.QuestModel.getInstance().restNpcQuestTittle();
            }
        }
        this.sceneChar.isBoss = this.getIsBoss();
        if (this._hasCreated) {
            return;
        }
        this.AddListen(SharedDef.UNIT_FIELD_MOVE_SPEED, function ($binlog) {
            _this.sceneChar.refreshSpeed();
        });
        this.AddListen(SharedDef.UNIT_FIELD_EQUIPMENT_COAT, function ($binlog) {
            _this.changeCoat();
        });
        this.AddListen(SharedDef.UNIT_FIELD_EQUIPMENT_MAIN_WEAPON, function ($binlog) {
            _this.changeWeapon();
        });
        this.AddListen(SharedDef.UNIT_FIELD_DIVINE_ID, function ($binlog) {
            _this.changeWeapon();
        });
        this.AddListen(SharedDef.UNIT_FIELD_ANGER, function ($binlog) {
            _this.changeAnger();
        });
        this.AddListen(SharedDef.UNIT_FIELD_MOUNT_LEVEL, function ($binlog) {
            _this.mountChange();
        });
        this.AddListen(SharedDef.UINT_INT_FIELD_WINGS_RANK, function ($binlog) {
            _this.wingChange();
        });
        this.AddListen(SharedDef.UNIT_INT_FIELD_MOUNT_RIDE, function ($binlog) {
            _this.mountChange();
        });
        this.AddListen(SharedDef.UNIT_FIELD_MAX_HEALTH, function ($binlog) {
            _this.sceneChar.refreshHP();
            if (_this.isMain) {
                ModuleEventManager.dispatchEvent(new topui.TopUiEvent(topui.TopUiEvent.REFRESH_TOP_LEFT_BLOOD));
            }
        });
        this.AddListen(SharedDef.UNIT_FIELD_BYTE_0, function ($binlog) {
            _this.sceneChar.unitFieldByteChg();
        });
        this.AddListen(SharedDef.UINT_FIELD_XIANFU_INFO, function ($binlog) {
            _this.sceneChar.refreshTittle();
        });
        this.AddListen(SharedDef.UNIT_FIELD_BYTE_2, function ($binlog) {
            _this.sceneChar.refreshTittle();
        });
        this.AddListen(SharedDef.UNIT_INT_FIELD_BOSS_OWN_FLAG, function ($binlog) {
            _this.sceneChar.refreshTittle();
        });
        this.AddListen(SharedDef.UINT_INT_FIELD_ILLUSION, function ($binlog) {
            _this.sceneChar.refreshIllusion();
        });
        this.AddListenString(SharedDef.UNIT_STRING_FIELD_PICK_NAME, function ($binlog) {
            if (_this.sceneChar instanceof SceneCollection) {
                _this.sceneChar.changeState();
            }
        });
        this.AddListenString(SharedDef.BINLOG_STRING_FIELD_OWNER, function ($binlog) {
            RelationManager.getInstance().refresh();
        });
        this.AddListen(SharedDef.UNIT_FIELD_DAO, function ($binlog) {
            _this.sceneChar.showName();
        });
        this.AddListenString(SharedDef.UNIT_STRING_FIELD_DROP_OWNER_NAME, function ($binlog) {
            _this.sceneChar.refreshOwner();
        });
        this._hasCreated = true;
        // console.log("------" + this.getEntry() + "-" + this.getName());
        // console.log("生命" + this.GetUInt32(SharedDef.UNIT_FIELD_MAX_HEALTH)) ;
        // console.log("攻击力" + this.GetUInt32(SharedDef.UNIT_FIELD_DAMAGE));
        // console.log("伤害减免" + this.GetUInt32(SharedDef.UNIT_FIELD_DAMAGE_RESIST_RATE));
    };
    Unit.prototype.getIllusionId = function () {
        return this.GetUInt32(SharedDef.UINT_INT_FIELD_ILLUSION);
    };
    //401 为无敌隐身BUFF
    Unit.prototype.isInvishibel = function () {
        return this.buffUnit.isBuffByID(SharedDef.BUFF_INVISIBLE) || this.buffUnit.isBuffByID(401);
    };
    Unit.prototype.isBuffRoad = function () {
        return this.buffUnit.isBuffByID(SharedDef.BUFF_ROAR);
    };
    Unit.prototype.getOwnerName = function () {
        return this.GetStr(SharedDef.UNIT_STRING_FIELD_DROP_OWNER_NAME);
    };
    Unit.prototype.getFilevirtualCamp = function () {
        return this.GetUInt32(SharedDef.UINT_FIELD_VIRTUAL_CAMP);
    };
    Unit.prototype.getXianfuBaoXiang = function () {
        return this.GetByte(SharedDef.UINT_FIELD_XIANFU_INFO, 0);
    };
    /**战斗力 */
    Unit.prototype.getForce = function () {
        return Math.floor(this.GetDouble(SharedDef.UNIT_FIELD_FORCE));
    };
    Unit.prototype.mountChange = function () {
        this.sceneChar.setMount();
    };
    Unit.prototype.wingChange = function () {
        this.sceneChar.setWing();
    };
    Unit.prototype.getWing = function () {
        //UINT_INT_FIELD_WINGS_RANK
        return this.GetUInt32(SharedDef.UINT_INT_FIELD_WINGS_RANK);
    };
    /**是否骑乘 */
    Unit.prototype.hasMount = function () {
        return Boolean(this.GetUInt32(SharedDef.UNIT_INT_FIELD_MOUNT_RIDE));
    };
    /**坐坐骑上下来**/
    Unit.prototype.setDownMount = function () {
        this.SetByte(SharedDef.UNIT_FIELD_MOUNT_LEVEL, 2, 0);
    };
    /**坐骑阶数*/
    Unit.prototype.getMountRank = function () {
        return this.GetByte(SharedDef.UNIT_FIELD_MOUNT_LEVEL, 0);
    };
    /**坐骑幻化ID */
    Unit.prototype.getMountIllusionID = function () {
        return this.GetByte(SharedDef.UNIT_FIELD_MOUNT_LEVEL, 3);
    };
    Unit.prototype.changeAnger = function () {
        if (this.sceneChar) {
            this.sceneChar.refreshTittle();
        }
    };
    Unit.prototype.getFactionName = function () {
        return this.GetStr(SharedDef.UNIT_STRING_FIELD_FACTION_NAME);
    };
    Unit.prototype.changeCoat = function () {
        // var num: number = this.getAvatar();
        // if (this.sceneChar) {
        //     if (num== 0) {
        //         num = tb.TB_char_info.getTempVo(this.getCharType()).avatar;
        //     } else {
        //         num = tb.TB_appearance_info.getTempVo(num).avatar;
        //     }
        //     this.sceneChar.setAvatar(num);
        // }
        if (this.sceneChar) {
            this.sceneChar.setAvatarExterior();
        }
    };
    Unit.prototype.changeWeapon = function () {
        this.sceneChar.setWeaponDivine();
    };
    Unit.prototype.getTabelAvater = function (value) {
        var roleAvatar;
        if (value == 0) {
            roleAvatar = tb.TB_char_info.getTempVo(this.getCharType()).avatar;
        }
        else {
            roleAvatar = tb.TB_appearance_info.getTempVo(value).avatar;
        }
        return roleAvatar;
    };
    Unit.prototype.getAvatar = function () {
        return this.GetUInt32(SharedDef.UNIT_FIELD_EQUIPMENT_COAT);
    };
    Unit.prototype.getDivine = function () {
        return this.GetUInt32(SharedDef.UNIT_FIELD_DIVINE_ID);
    };
    Unit.prototype.getWeapon = function () {
        return this.GetUInt32(SharedDef.UNIT_FIELD_EQUIPMENT_MAIN_WEAPON);
    };
    //职业
    Unit.prototype.getCharType = function () {
        return this.GetUInt8(SharedDef.UNIT_FIELD_BYTE_1, 0);
    };
    //称号
    Unit.prototype.getCharTittle = function () {
        return this.GetUInt8(SharedDef.UNIT_FIELD_BYTE_2, 3);
    };
    //称号
    Unit.prototype.getUintFieldBossOwnFlag = function () {
        return this.GetUInt32(SharedDef.UNIT_INT_FIELD_BOSS_OWN_FLAG);
    };
    Unit.prototype.getPickName = function () {
        return this.GetStr(SharedDef.UNIT_STRING_FIELD_PICK_NAME);
    };
    Unit.prototype.getPickTime = function () {
        return this.GetUInt32(SharedDef.UNIT_FIELD_PROCESS_TIME);
    };
    Unit.prototype.sendPath = function (sp) {
        if (!this.isMain) {
            return;
        }
        var beginPos = sp[0];
        this.tempSendPath.length = 0;
        for (var i = 1; i < sp.length; i++) {
            if (Vector2D.distance(sp[i], sp[i - 1]) > 100) {
                this.tempSendPath = this.tempSendPath.concat(this.getNeedCutPath(sp[i - 1], sp[i]));
            }
            else {
                this.tempSendPath.push(sp[i].x - sp[i - 1].x, sp[i].y - sp[i - 1].y);
            }
        }
        if (!beginPos) {
            //console.log("有错")
        }
        NetManager.getInstance().protocolos.unit_move(this.uintGuid, beginPos.x, beginPos.y, this.tempSendPath);
    };
    Unit.prototype.getNeedCutPath = function (a, b) {
        var $arr = new Array();
        var $n = Math.ceil(Vector2D.distance(a, b) / 100);
        var $lastPos = new Vector2D(a.x, a.y);
        for (var i = 1; i < $n; i++) {
            var $addV2d = new Vector2D(b.x - a.x, b.y - a.y);
            $addV2d.x = Math.floor($addV2d.x / $n);
            $addV2d.y = Math.floor($addV2d.y / $n);
            var $toV2d = new Vector2D();
            $toV2d.x = $addV2d.x + $lastPos.x;
            $toV2d.y = $addV2d.y + $lastPos.y;
            $arr.push($toV2d.x - $lastPos.x, $toV2d.y - $lastPos.y);
            $lastPos.x = $toV2d.x;
            $lastPos.y = $toV2d.y;
        }
        $arr.push(b.x - $lastPos.x, b.y - $lastPos.y);
        return $arr;
    };
    Unit.prototype.sendStop = function (pos) {
        if (!this.isMain) {
            return;
        }
        NetManager.getInstance().protocolos.move_stop(this.uintGuid, pos.x, pos.y);
    };
    Unit.prototype.setSceneChar = function (sc) {
        if (sc) {
            this.sceneChar = sc;
            sc.unit = this;
        }
    };
    Unit.prototype.setPath = function ($path) {
        // //console.log("收到路径消息：" + this.guid);
        if (!this.isMain && this.sceneChar) {
            this.sceneChar.applyWalk($path);
        }
    };
    Unit.prototype.setJump = function ($topos) {
        if (this.sceneChar) {
            var $arr = new Array();
            var b = AstarUtil.getWorldPosByStart2D($topos);
            b.y = AstarUtil.getHeightByPos(b);
            $arr.push(this.sceneChar.getCurrentPos());
            $arr.push(b);
            this.sceneChar.applyJump($arr, 1000);
        }
    };
    Unit.prototype.msgSpellStop = function () {
        if (this.sceneChar) {
            this.sceneChar.msgSpellStop();
        }
    };
    Unit.prototype.setJumpShow = function ($arr, $t) {
        if (this.sceneChar) {
            var $jumpArr = new Array();
            $jumpArr.push(this.sceneChar.getCurrentPos());
            for (var i = 0; i < $arr.length; i++) {
                var $pos = AstarUtil.getWorldPosByStart2D(new Vector2D($arr[i][0], $arr[i][1]));
                $pos.y = AstarUtil.getHeightByPos($pos);
                if (this.sceneChar.isMount && i < ($arr.length - 1)) {
                    $pos.y -= 40; //40为坐骑高度;
                }
                $jumpArr.push($pos);
            }
        }
        this.sceneChar.applyJump($jumpArr, $t);
    };
    Unit.prototype.stop = function (xpos, ypos) {
        ////console.log("收到停止消息：" + this.guid + "," + xpos + "," + ypos);
        if (this.sceneChar) {
            this.sceneChar.moveToPos2D = (new Vector2D(xpos, ypos));
        }
    };
    Unit.prototype.dispose = function () {
        if (this.sceneChar) {
            SceneCharManager.getInstance().removeSceneChar(this.sceneChar);
        }
        // if (this.getIsBoss()) {
        // }
        _super.prototype.dispose.call(this);
    };
    Unit.prototype.getSpeed = function () {
        return this.GetUInt32(SharedDef.UNIT_FIELD_MOVE_SPEED);
    };
    Unit.prototype.getLevel = function () {
        return this.GetUInt16(SharedDef.UNIT_FIELD_UINT16_0, 1);
    };
    Unit.prototype.getVipLevel = function () {
        return this.GetUInt32(SharedDef.UINT_FIELD_VIP_LEVEL);
    };
    Unit.prototype.getHp = function () {
        return this.GetUInt32(SharedDef.UNIT_FIELD_HEALTH);
    };
    Unit.prototype.getAnger = function () {
        return this.GetUInt32(SharedDef.UNIT_FIELD_ANGER);
    };
    Unit.prototype.setHp = function (val) {
        ////console.log(val,"/",this.getMaxHp())
        this.SetUInt32(SharedDef.UNIT_FIELD_HEALTH, val);
    };
    Unit.prototype.getMaxHp = function () {
        return this.GetUInt32(SharedDef.UNIT_FIELD_MAX_HEALTH);
    };
    //当前血量，展示用
    Unit.prototype.getCurHpView = function () {
        return Math.floor(this.getHp() / 100);
    };
    //最大血量，展示用
    Unit.prototype.getMaxHpView = function () {
        return Math.floor(this.getMaxHp() / 100);
    };
    Unit.prototype.getTypeID = function () {
        return this.GetByte(SharedDef.UNIT_FIELD_BYTE_0, 0);
    };
    Unit.prototype.getAlivestate = function () {
        return this.GetByte(SharedDef.UNIT_FIELD_BYTE_0, 1);
    };
    Unit.prototype.getEntry = function () {
        return this.GetUInt16(SharedDef.UNIT_FIELD_UINT16_0, 0);
    };
    /**是否是Boss */
    Unit.prototype.getIsBoss = function () {
        return this.GetBit(SharedDef.UNIT_FIELD_FLAGS, SharedDef.UNIT_FIELD_FLAGS_IS_BOSS_CREATURE);
    };
    /**是否是野怪 */
    Unit.prototype.isMonster = function () {
        return this.getTypeID() == SharedDef.TYPEID_UNIT && this.GetUInt32(SharedDef.UNIT_FIELD_NPC_FLAG) == 0;
    };
    /**是否是NPC */
    Unit.prototype.isNpc = function () {
        return this.getTypeID() == SharedDef.TYPEID_UNIT && this.GetUInt32(SharedDef.UNIT_FIELD_NPC_FLAG) == 1;
    };
    /**是否是技能用NPC */
    Unit.prototype.isSkillNpc = function () {
        return this.GetBit(SharedDef.UNIT_FIELD_FLAGS, SharedDef.UNIT_FIELD_FLAGS_IS_INVISIBLE_SPELL);
    };
    Unit.prototype.getOwner = function () {
        return this.GetStr(SharedDef.BINLOG_STRING_FIELD_OWNER);
    };
    /**是否是玩家 */
    Unit.prototype.isPlayer = function () {
        return this.getTypeID() == SharedDef.TYPEID_PLAYER;
    };
    /**境界 */
    Unit.prototype.getDao = function () {
        return this.GetUInt32(SharedDef.UNIT_FIELD_DAO);
    };
    Unit.prototype.getPlayerGUID = function () {
        var str = this.getGuid();
        var ary = str.split(".");
        if (ary.length == 3) {
            return ary[1] + "." + ary[2];
        }
        return "";
    };
    /**数值GUID */
    Unit.prototype.getUintGuid = function () {
        var str = this.getGuid();
        str = str.substring(1);
        return Number(str);
    };
    return Unit;
}(GuidObject));
//# sourceMappingURL=Unit.js.map