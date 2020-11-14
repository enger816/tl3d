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
var GrowData = /** @class */ (function (_super) {
    __extends(GrowData, _super);
    function GrowData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GrowData.prototype.onBaseCreated = function () {
        var _this = this;
        this._after_update = function ($flag, $intMask, $strMask) { _this.dataUpdate($intMask, $strMask); };
        this.AddListen(SharedDef.SPELL_INT_FIELD_MOUNT_BLESS_EXP, function ($binlog) { _this.mountBlessChange(); });
        this.AddListen(SharedDef.SPELL_STRENGTHEN_ALLMUL, function ($binlog) { _this.strengMulChg(); });
        this.AddListen(SharedDef.SPELL_GEM_ALLMUL, function ($binlog) { _this.gemMulChg(); });
        this.AddListen(SharedDef.SPELL_WINGS_ID, function ($binlog) { _this.wingIDChg(); });
        this.AddListen(SharedDef.SPELL_WINGS_BLESS_EXP, function ($binlog) { _this.wingExpChg(); });
        this.AddListen(SharedDef.SPELL_WINGS_LEVEL, function ($binlog) { _this.wingLevChg(); });
        //   this.AddListen(SharedDef.SPELL_INT_FIELD_MERIDIAN_LEVEL, ($binlog: any) => { this.spellintFieldMeridianLevelChg() });
        //    this.AddListen(SharedDef.SPELL_INT_FIELD_MERIDIAN_EXP, ($binlog: any) => { this.spellIntFieldMeridExpChg() });
        this.AddListen(SharedDef.SPELL_INT_FIELD_MOUNT_LEVEL_BASE, function ($binlog) { _this.spellIntFieldMountlevChg(); });
        this.AddListen(SharedDef.SPELL_INT_FIELD_EQUIPDEVELOP_BONUS_LV, function ($binlog) { _this.masterLevChg(); });
        this.AddListenString(SharedDef.SPELL_STRING_FIELD_EQUIPDEVELOP_WASHATTRS_INFO, function ($binlog) { _this.washChg(); });
        // for (var i: number = SharedDef.SPELL_INT_FIELD_MOUNT_ILLUSION_START; i < SharedDef.SPELL_INT_FIELD_MOUNT_ILLUSION_END; i += SharedDef.MAX_ILLUSION_ATTR_COUNT) {
        //     this.AddListen(i, ($binlog: any) => { this.huanhua($binlog._index) });
        // }
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.CORE_DATA_CREATED_EVENT));
    };
    GrowData.prototype.getHuanhuaID = function () {
        if (this._aryhuanhuaid) {
            return this._aryhuanhuaid;
        }
        this._aryhuanhuaid = this.refresharyhuanhuaid();
        return this._aryhuanhuaid;
    };
    GrowData.prototype.refresharyhuanhuaid = function () {
        var $arr = new Array();
        for (var i = SharedDef.SPELL_INT_FIELD_MOUNT_ILLUSION_START; i < SharedDef.SPELL_INT_FIELD_MOUNT_ILLUSION_END; i += SharedDef.MAX_ILLUSION_ATTR_COUNT) {
            if (this.GetInt32(i) == 0) {
                break;
            }
            $arr.push(this.GetInt32(i));
        }
        return $arr;
    };
    GrowData.prototype.getzuoqiJinengList = function () {
        var $arr = new Array();
        var num = (SharedDef.SPELL_INT_FIELD_MOUNT_SPELL_END - SharedDef.SPELL_INT_FIELD_MOUNT_SPELL_START);
        for (var i = 0; i < num; i++) {
            var idx = SharedDef.SPELL_INT_FIELD_MOUNT_SPELL_START + i;
            var id = GuidData.grow.GetUInt16(idx, 0);
            var lev = GuidData.grow.GetUInt16(idx, 1);
            if (id != 0) {
                $arr.push({ id: id, lev: lev });
            }
        }
        //console.log("-----------zhuoqi jineng----------", $arr);
        return $arr;
    };
    GrowData.prototype.getHuanhuaJinengList = function () {
        var $arr = new Array();
        for (var i = SharedDef.SPELL_INT_FIELD_MOUNT_ILLUSION_START; i < SharedDef.SPELL_INT_FIELD_MOUNT_ILLUSION_END; i += SharedDef.MAX_ILLUSION_ATTR_COUNT) {
            for (var j = SharedDef.ILLUSION_ATTR_SPELL_START; j < SharedDef.ILLUSION_ATTR_SPELL_END; j++) {
                var idx = i + j;
                var id = GuidData.grow.GetUInt16(idx, 0);
                var lev = GuidData.grow.GetUInt16(idx, 1);
                if (id != 0) {
                    //console.log("-----------huanhuajineng----------", id, lev)
                    $arr.push({ id: id, lev: lev });
                }
            }
        }
        return $arr;
    };
    GrowData.prototype.mountBlessChange = function () {
        var idx = SharedDef.SPELL_INT_FIELD_MOUNT_BLESS_EXP;
        //console.log("-----------祝福值-----------", this.GetInt32(idx))
        ModuleEventManager.dispatchEvent(new mountui.MountUiEvent(mountui.MountUiEvent.MOUNT_LEVET_STAR_CHANGE_EVENT));
    };
    GrowData.prototype.dataUpdate = function ($intMask, $strMask) {
        if ($intMask[SharedDef.SPELL_INT_FIELD_MERIDIAN_LEVEL] || $intMask[SharedDef.SPELL_INT_FIELD_MERIDIAN_EXP]) {
            ModuleEventManager.dispatchEvent(new meridian.MeridianEvent(meridian.MeridianEvent.REFRISH_MERIDIAL_PANEL));
        }
        if ($intMask[SharedDef.SPELL_INT_FIELD_MOUNT_LEVEL] || $intMask[SharedDef.SPELL_INT_FIELD_MOUNT_TRAIN_EXP]) {
            //console.log("---经验和等级变化--");
            ModuleEventManager.dispatchEvent(new mountui.MountUiEvent(mountui.MountUiEvent.MOUNT_LEVET_STAR_CHANGE_EVENT));
        }
        //基础技能
        var $jichuChangeBoole = false;
        for (var i = SharedDef.SPELL_INT_FIELD_BASE_SPELL_START; i < SharedDef.SPELL_INT_FIELD_BASE_SPELL_END; i++) {
            if ($intMask[i]) {
                $jichuChangeBoole = true;
                if (this._skillLevDic) {
                    var id = GuidData.grow.GetUInt16(i, 0);
                    var lev = GuidData.grow.GetUInt16(i, 1);
                    this._skillLevDic[id] = lev;
                }
            }
        }
        if ($jichuChangeBoole) {
            ModuleEventManager.dispatchEvent(new skillUi.SkillUiEvent(skillUi.SkillUiEvent.RESET_SKILL_UI_DATA));
        }
        //坐骑技能
        for (var i = SharedDef.SPELL_INT_FIELD_MOUNT_SPELL_START; i < SharedDef.SPELL_INT_FIELD_MOUNT_SPELL_END; i++) {
            if ($intMask[i]) {
                this.zuoqiSkillChange(i);
                ModuleEventManager.dispatchEvent(new mountui.MountUiEvent(mountui.MountUiEvent.SKILL_CHANGE_EVENT));
            }
        }
        //幻化技能列表
        for (var i = SharedDef.SPELL_INT_FIELD_MOUNT_ILLUSION_START; i < SharedDef.SPELL_INT_FIELD_MOUNT_ILLUSION_END; i += SharedDef.MAX_ILLUSION_ATTR_COUNT) {
            for (var j = SharedDef.ILLUSION_ATTR_SPELL_START; j < SharedDef.ILLUSION_ATTR_SPELL_END; j++) {
                if ($intMask[i + j]) {
                    this.huanhuaSkillChange(i + j);
                }
            }
        }
        //强化相关
        for (var i = SharedDef.SPELL_STRENGTHEN_START; i < SharedDef.SPELL_STRENGTHEN_END; i += SharedDef.MAX_STRENGTHEN_COUNT) {
            if ($intMask[i]) {
                //var part: number = i - SharedDef.SPELL_STRENGTHEN_START + 1;
                ////console.log("强化变化:  部位：" + part + "等级：" + this.getStrengLev(part) + ", 祝福值：" + this.getStrengBless(part))
                this.strengDataChg(i - SharedDef.SPELL_STRENGTHEN_START);
            }
        }
        //宝石相关
        for (var key in $intMask) {
            var keyNum = Number(key);
            if (keyNum >= SharedDef.SPELL_GEM_START && keyNum < SharedDef.SPELL_GEM_END) {
                keyNum = (keyNum - SharedDef.SPELL_GEM_START);
                var keyPos = float2int(keyNum / SharedDef.MAX_GEM_COUNT);
                var keyVal = keyNum % SharedDef.MAX_GEM_COUNT;
                var part = keyPos + 1;
                if (keyVal < 3) {
                    ////console.log("宝石部位：" + part + " 第" + keyVal + "个宝石升级" + this.getGemLev(part,keyVal));
                    this.gemLevChg(keyPos);
                }
                else {
                    ////console.log("宝石部位：" +part + " 第" + this.getGemCurrentID(part) + "个宝石的祝福值" + this.getGemBless(part));
                    this.gemBlessChg(keyPos);
                }
            }
        }
        //外观相关
        var appearance_flag = false;
        for (var key in $intMask) {
            var keyNum = Number(key);
            if (keyNum >= SharedDef.SPELL_INT_FIELD_APPEARANCE_START && keyNum < SharedDef.SPELL_INT_FIELD_APPEARANCE_END) {
                appearance_flag = true;
            }
        }
        if (appearance_flag) {
            ModuleEventManager.dispatchEvent(new exterior.ExteriorEvent(exterior.ExteriorEvent.REFRISH_EXTERIOR_PANEL));
        }
        //坐骑相关
        for (var key in $intMask) {
            var keyNum = Number(key);
            if (keyNum >= SharedDef.SPELL_INT_FIELD_MOUNT_ILLUSION_START && keyNum < SharedDef.SPELL_INT_FIELD_MOUNT_ILLUSION_END) {
                var aa = (keyNum - SharedDef.SPELL_INT_FIELD_MOUNT_ILLUSION_START);
                var keyPos = float2int(aa / SharedDef.MAX_ILLUSION_ATTR_COUNT);
                var keyVal = aa % SharedDef.MAX_ILLUSION_ATTR_COUNT;
                if (keyVal == SharedDef.ILLUSION_ATTR_ID) {
                    var cur_huanhuaid = this.GetInt32(keyNum);
                    if (cur_huanhuaid > 0) {
                        var $flag = false;
                        for (var i = 0; i < this._aryhuanhuaid.length; i++) {
                            if (this._aryhuanhuaid[i] == cur_huanhuaid) {
                                $flag = true;
                                break;
                            }
                        }
                        //更新列表
                        this._aryhuanhuaid = this.refresharyhuanhuaid();
                        var $evtt = new mountui.MountUiEvent(mountui.MountUiEvent.POP_THE_UNREAL_PANEL);
                        $evtt.data = 3;
                        ModuleEventManager.dispatchEvent($evtt);
                        if (!$flag) {
                            //新增
                            //console.log("--2222");
                            // var $evtt = new mountui.MountUiEvent(mountui.MountUiEvent.POP_THE_UNREAL_PANEL);
                            // $evtt.data = 3
                            // ModuleEventManager.dispatchEvent($evtt);
                        }
                        else {
                            //变化
                        }
                    }
                }
            }
        }
        /**
         * 神兵相关
         * 神兵id为0时，表示没有神兵。不为0时，表示存在神兵。
         */
        for (var key in $intMask) {
            var keyNum = Number(key);
            if (keyNum >= SharedDef.SPELL_DIVINE_START && keyNum < SharedDef.SPELL_DIVINE_END) {
                var keyTempNum = (keyNum - SharedDef.SPELL_DIVINE_START);
                var keyPos = float2int(keyTempNum / SharedDef.MAX_DIVINE_COUNT);
                var keyVal = keyTempNum % SharedDef.MAX_DIVINE_COUNT;
                if (keyVal == SharedDef.DIVINE_ID_LEV_BLESS) {
                    ////console.log("神兵 id:" + this.getDivineID(keyNum) + " 等级：" + this.getDivineLev(keyNum) + " 祝福值：" + this.getDivineBless(keyNum))
                    var divineID = this.getDivineID(keyNum);
                    if (divineID > 0) {
                        var $flag = false;
                        for (var i = 0; i < this._divineList.length; i++) {
                            if (this._divineList[i].id == divineID) {
                                $flag = true;
                                break;
                            }
                        }
                        if (!$flag) {
                            //新增
                            // ModuleEventManager.dispatchEvent(new sb.ShenBingEvent(sb.ShenBingEvent.NEWADD_DIVINE_EVENT));
                        }
                        else {
                            //变化
                        }
                    }
                }
                // if(keyVal >= SharedDef.DIVINE_SKILL){
                //     var obj:any = this.getDivineSkillDirect(keyNum);
                //     var idIndex:number = SharedDef.SPELL_DIVINE_START + keyPos * SharedDef.MAX_DIVINE_COUNT;
                //     //console.log("神兵 id:" + this.getDivineID(idIndex)  +"神兵 技能" + obj.id + " 等级：" + obj.lev);
                // }else if(keyPos >= SharedDef.DIVINE_PASSIVE_SKILL){
                //     var obj:any = this.getDivineSkillDirect(keyNum);
                //     //console.log("神兵 被动 技能" + obj.id + " 等级：" + obj.lev);
                //}
                //更新列表
                this._divineList = this.refreshDivineList();
                this.changeDivineData();
            }
        }
        /**
         * 法宝相关
         */
        for (var key in $intMask) {
            var keyNum = Number(key);
            if (keyNum >= SharedDef.SPELL_TALISMAN_START && keyNum < SharedDef.SPELL_TALISMAN_END) {
                var keyTempNum = (keyNum - SharedDef.SPELL_TALISMAN_START);
                var keyPos = float2int(keyTempNum / SharedDef.MAX_TALISMAN_COUNT);
                var keyVal = keyTempNum % SharedDef.MAX_TALISMAN_COUNT;
                if (keyVal == SharedDef.TALISMAN_ID_LV) {
                    var talismanid = this.GetByte(keyNum, 0);
                    if (talismanid > 0) {
                        //console.log("talismanid---", talismanid);
                        var $flag = false;
                        for (var i = 0; i < this._treasureList.length; i++) {
                            if (this._treasureList[i].id == talismanid) {
                                $flag = true;
                                break;
                            }
                        }
                        //更新列表
                        this._treasureList = this.refreshTreasureList();
                        //发送事件修改ui
                        if (!$flag) {
                            //新增
                            ModuleEventManager.dispatchEvent(new treasure.TreasureUiEvent(treasure.TreasureUiEvent.UNLOCK_WEAPON_EVENT));
                        }
                        else {
                            //变化
                            ModuleEventManager.dispatchEvent(new treasure.TreasureUiEvent(treasure.TreasureUiEvent.CHANGE_WEAPON_EVENT));
                        }
                    }
                }
            }
            if (keyNum >= SharedDef.SPELL_TALISMAN_SLOT_START && keyNum < SharedDef.SPELL_TALISMAN_SLOT_END) {
                //监听
                console.log("----监听到变化——--");
                ModuleEventManager.dispatchEvent(new treasure.TreasureUiEvent(treasure.TreasureUiEvent.CHANGE_SLOT_EVENT));
            }
        }
        /**
         * 新强化相关
         */
        for (var key in $intMask) {
            var keyNum = Number(key);
            if (keyNum >= SharedDef.SPELL_INT_FIELD_EQUIPDEVELOP_START && keyNum < SharedDef.SPELL_INT_FIELD_EQUIPDEVELOP_END) {
                // 装备培养变化
                var keyTempNum = (keyNum - SharedDef.SPELL_INT_FIELD_EQUIPDEVELOP_START);
                var keyPos = float2int(keyTempNum / SharedDef.MAX_EQUIPDEVELOP_COUNT); //第keyPos + 1个部件变化
                var keyVal = keyTempNum % SharedDef.MAX_EQUIPDEVELOP_COUNT; //第几个属性变化
                var $type;
                if (keyVal == SharedDef.EQUIPDEVELOP_STRENGTH_LV) {
                    //强化等级变化
                    $type = strengthgem.StrengthGemEvent.STRENG_LEV_EVENT;
                }
                else if (keyVal == SharedDef.EQUIPDEVELOP_REFINE_LV) {
                    //0 int16 阶数 1 int16 星数
                    $type = strengthgem.StrengthGemEvent.REFINING_LEV_EVENT;
                }
                else {
                    //宝石变化
                    $type = strengthgem.StrengthGemEvent.GEM_LEV_EVENT;
                }
                var $evttt = new strengthgem.StrengthGemEvent($type);
                $evttt.data = keyPos + 1;
                ModuleEventManager.dispatchEvent($evttt);
            }
        }
        /**
         * 经脉相关
         */
        for (var key in $intMask) {
            var keyNum = Number(key);
            if (keyNum >= SharedDef.SPELL_INT_FIELD_MERIDIAN_CNT_START && keyNum < SharedDef.SPELL_INT_FIELD_MERIDIAN_CNT_END) {
                ModuleEventManager.dispatchEvent(new meridian.MeridianEvent(meridian.MeridianEvent.REFRISH_MERIDIAL_LIST));
            }
        }
        /**
         * 活动数据相关
         */
        var activeFlag = false;
        for (var key in $intMask) {
            var keyNum = Number(key);
            if (keyNum >= SharedDef.SPELL_INT_FIELD_PLAYER_ACTIVITY_DATA_START && keyNum < SharedDef.SPELL_INT_FIELD_PLAYER_ACTIVITY_DATA_END) {
                activeFlag = true;
            }
        }
        if (activeFlag) {
            ModuleEventManager.dispatchEvent(new ActiveEvent(ActiveEvent.ACTIVE_PLAYER_CHANGE_EVENT));
        }
    };
    GrowData.prototype.changeDivineData = function () {
        // ModuleEventManager.dispatchEvent(new sb.ShenBingEvent(sb.ShenBingEvent.CHANGE_SHENBING_DATA_EVENT));
    };
    GrowData.prototype.strengDataChg = function ($index) {
        //console.log("----强化数据变化了-----");
        var evt = new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.STRENGTHGEM_DATA_CHG);
        evt.dataType = 1;
        evt.data = $index;
        ModuleEventManager.dispatchEvent(evt);
    };
    GrowData.prototype.strengMulChg = function () {
        //console.log("----全身奖励变化了-----");
        var evt = new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.STRENGTHGEM_MUL_CHG);
        ModuleEventManager.dispatchEvent(evt);
    };
    GrowData.prototype.gemLevChg = function ($index) {
        //console.log("--gemLevChg--");
        var evt = new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.GEM_UPLEV_CHG);
        evt.data = $index;
        ModuleEventManager.dispatchEvent(evt);
    };
    GrowData.prototype.gemBlessChg = function ($index) {
        //console.log("--gemBlessChg--");
        var evt = new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.GEM_BLESS_CHG);
        evt.data = $index;
        ModuleEventManager.dispatchEvent(evt);
    };
    GrowData.prototype.gemMulChg = function () {
        var evt = new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.GEM_MUL_CHG);
        ModuleEventManager.dispatchEvent(evt);
    };
    //基础技能开始
    GrowData.prototype.getSpellInitFieldBaseSpeell = function () {
        var $arr = new Array();
        var num = (SharedDef.SPELL_INT_FIELD_BASE_SPELL_END - SharedDef.SPELL_INT_FIELD_BASE_SPELL_START);
        for (var i = 0; i < num; i++) {
            var idx = SharedDef.SPELL_INT_FIELD_BASE_SPELL_START + i;
            var id = GuidData.grow.GetUInt16(idx, 0);
            var lev = GuidData.grow.GetUInt16(idx, 1);
            if (id != 0) {
                //console.log("-----------基础技能----------", id, lev)
                $arr.push({ id: id, lev: lev });
            }
        }
        return $arr;
    };
    GrowData.prototype.getSkillLev = function ($id) {
        if (!this._skillLevDic) {
            this._skillLevDic = new Object;
            var num = (SharedDef.SPELL_INT_FIELD_BASE_SPELL_END - SharedDef.SPELL_INT_FIELD_BASE_SPELL_START);
            for (var i = 0; i < num; i++) {
                var idx = SharedDef.SPELL_INT_FIELD_BASE_SPELL_START + i;
                var id = GuidData.grow.GetUInt16(idx, 0);
                var lev = GuidData.grow.GetUInt16(idx, 1);
                this._skillLevDic[id] = lev;
            }
        }
        if (this._skillLevDic[$id]) {
            return this._skillLevDic[$id];
        }
        else {
            return 0;
        }
    };
    //幻化技能更新
    GrowData.prototype.huanhuaSkillChange = function (i) {
        //console.log("-----------huanhuajinengenxing-----------", this.GetInt16(i, 0), this.GetInt16(i, 1))
    };
    //坐骑技能更新
    GrowData.prototype.zuoqiSkillChange = function (i) {
        //console.log("-----------zuoqijinenggengxin-----------", this.GetInt16(i, 0), this.GetInt16(i, 1))
        ModuleEventManager.dispatchEvent(new mountui.MountUiEvent(mountui.MountUiEvent.CHANGE_jingjie_SKILL_PANEL));
    };
    GrowData.prototype.getMountLevel = function () {
        var idx = SharedDef.SPELL_INT_FIELD_MOUNT_LEVEL;
        var $num = this.GetInt16(idx, 0);
        return $num;
    };
    GrowData.prototype.getMountStart = function () {
        var idx = SharedDef.SPELL_INT_FIELD_MOUNT_LEVEL;
        var $num = this.GetInt16(idx, 1);
        return $num;
    };
    //坐骑等级变化
    GrowData.prototype.spellIntFieldMountlevChg = function () {
        //console.log("--坐骑等级变化--");
        ModuleEventManager.dispatchEvent(new mountui.MountUiEvent(mountui.MountUiEvent.MOUNT_LEV_CHANGE_EVENT));
    };
    //获得坐骑等级（非阶级）
    GrowData.prototype.getMountlev = function () {
        return this.GetUInt32(SharedDef.SPELL_INT_FIELD_MOUNT_LEVEL_BASE);
    };
    GrowData.prototype.getSpellIntFieldMeridianLevel = function (value) {
        //// 2shorts(0:经脉等级, 1:是否需要突破)
        return this.GetInt16(SharedDef.SPELL_INT_FIELD_MERIDIAN_LEVEL, value);
    };
    GrowData.prototype.getSpellIntFieldMeridianExp = function () {
        // 经脉经验
        return this.GetInt32(SharedDef.SPELL_INT_FIELD_MERIDIAN_EXP);
    };
    GrowData.prototype.getSpellIntFieldMeridianCnt = function () {
        var $arr = new Array();
        var $num = SharedDef.SPELL_INT_FIELD_MERIDIAN_CNT_END - SharedDef.SPELL_INT_FIELD_MERIDIAN_CNT_START;
        for (var i = 0; i < $num; i++) {
            var idx = SharedDef.SPELL_INT_FIELD_MERIDIAN_CNT_START + i;
            $arr.push(this.GetByte(idx, 0));
            $arr.push(this.GetByte(idx, 1));
            $arr.push(this.GetByte(idx, 2));
            $arr.push(this.GetByte(idx, 3));
        }
        return $arr;
    };
    GrowData.prototype.getSpellIntFieldAppearanceId = function () {
        var $arr = new Array();
        var $num = SharedDef.SPELL_INT_FIELD_APPEARANCE_END - SharedDef.SPELL_INT_FIELD_APPEARANCE_START;
        for (var i = 0; i < $num; i++) {
            var $id = this.GetUInt32(SharedDef.SPELL_INT_FIELD_APPEARANCE_START + i);
            if ($id) {
                $arr.push($id);
            }
        }
        return $arr;
    };
    GrowData.prototype.isSpellIntFieldAppearanceById = function (value) {
        var $arr = this.getSpellIntFieldAppearanceId();
        for (var i = 0; i < $arr.length; i++) {
            if ($arr[i] == value) {
                return true;
            }
        }
        return false;
    };
    GrowData.prototype.getMountExp = function () {
        var idx = SharedDef.SPELL_INT_FIELD_MOUNT_TRAIN_EXP;
        return this.GetInt32(idx);
    };
    GrowData.prototype.getMountBless = function () {
        var idx = SharedDef.SPELL_INT_FIELD_MOUNT_BLESS_EXP;
        return this.GetInt32(idx);
    };
    /**强化等级 */
    GrowData.prototype.getStrengLev = function (part) {
        return this.GetUInt16(SharedDef.SPELL_STRENGTHEN_START + (part - 1) * SharedDef.MAX_STRENGTHEN_COUNT, 0);
    };
    /**强化数值 */
    GrowData.prototype.getStrengValue = function (part) {
        var lev = this.getPartStrengLev(part);
        if (lev <= 0 || part == SharedDef.EQUIPMENT_TYPE_FASHION) {
            return 0;
        }
        else {
            var vo = tb.TB_equipdevelop_strength.get_TB_equipdevelop_strengthById(part, lev);
            return vo.props[0][1];
        }
    };
    GrowData.prototype.getStrengValueByLev = function (part, lev) {
        if (lev <= 0 || part == SharedDef.EQUIPMENT_TYPE_FASHION) {
            return 0;
        }
        else {
            var vo = tb.TB_equipdevelop_strength.get_TB_equipdevelop_strengthById(part, lev);
            return vo.props[0][1];
        }
    };
    /**强化祝福值 */
    GrowData.prototype.getStrengBless = function (part) {
        return this.GetUInt16(SharedDef.SPELL_STRENGTHEN_START + (part - 1) * SharedDef.MAX_STRENGTHEN_COUNT, 1);
    };
    /**全身强化标记 */
    GrowData.prototype.getStrengMul = function () {
        return this.GetUInt32(SharedDef.SPELL_STRENGTHEN_ALLMUL);
    };
    GrowData.prototype.getGemLev = function (part, index) {
        return this.GetUInt32(SharedDef.SPELL_GEM_START + (part - 1) * SharedDef.MAX_GEM_COUNT + index);
    };
    GrowData.prototype.getGemByIndex = function (index) {
        return this.GetUInt32(index);
    };
    GrowData.prototype.getGemBless = function (part) {
        return this.GetUInt16(SharedDef.SPELL_GEM_START + (part - 1) * SharedDef.MAX_GEM_COUNT + SharedDef.GEM_CURID_BLESS, 1);
    };
    GrowData.prototype.getGemCurrentID = function (part) {
        return this.GetUInt16(SharedDef.SPELL_GEM_START + (part - 1) * SharedDef.MAX_GEM_COUNT + SharedDef.GEM_CURID_BLESS, 0);
    };
    GrowData.prototype.getGemMul = function () {
        return this.GetUInt32(SharedDef.SPELL_GEM_ALLMUL);
    };
    /**神兵等级 */
    GrowData.prototype.getDivineLev = function ($index) {
        return this.GetByte($index, 1);
    };
    /**神兵祝福值 */
    GrowData.prototype.getDivineBless = function ($index) {
        return this.GetUInt16($index, 1);
    };
    /**神兵ID */
    GrowData.prototype.getDivineID = function ($index) {
        return this.GetByte($index, 0);
    };
    GrowData.prototype.getDivineSkillDirect = function ($index) {
        var obj = new Object;
        obj.id = this.GetUInt16($index, 0);
        obj.lev = this.GetUInt16($index, 1);
        return obj;
    };
    GrowData.prototype.getDivineSkill = function ($index) {
        var obj = new Object;
        obj.id = this.GetUInt16($index + SharedDef.DIVINE_SKILL, 0);
        obj.lev = this.GetUInt16($index + SharedDef.DIVINE_SKILL, 1);
        return obj;
    };
    GrowData.prototype.getDivinePassiveSkill = function ($index) {
        var ary = new Array;
        for (var i = 0; i < SharedDef.DIVINE_PASSIVE_SKILL_COUNT; i++) {
            var obj = new Object;
            obj.id = this.GetUInt16($index + SharedDef.DIVINE_PASSIVE_SKILL + i, 0);
            obj.lev = this.GetUInt16($index + SharedDef.DIVINE_PASSIVE_SKILL + i, 1);
            ary.push(obj);
        }
        return ary;
    };
    GrowData.prototype.getDivineList = function () {
        if (this._divineList) {
            return this._divineList;
        }
        this._divineList = this.refreshDivineList();
        return this._divineList;
    };
    GrowData.prototype.refreshDivineList = function () {
        var ary = new Array;
        for (var i = SharedDef.SPELL_DIVINE_START; i < SharedDef.SPELL_DIVINE_END; i += SharedDef.MAX_DIVINE_COUNT) {
            var id = this.GetByte(i, 0);
            if (id != 0) {
                var vo = new DivineVo;
                vo.id = id;
                vo.index = i;
                vo.lev = this.GetByte(i, 1);
                vo.bless = this.GetUInt16(i, 1);
                vo.outTime = this.GetUInt32(i + 1);
                ary.push(vo);
            }
        }
        return ary;
    };
    GrowData.prototype.getTreasureList = function () {
        if (this._treasureList) {
            return this._treasureList;
        }
        this._treasureList = this.refreshTreasureList();
        return this._treasureList;
    };
    GrowData.prototype.refreshTreasureList = function () {
        var ary = new Array;
        for (var i = SharedDef.SPELL_TALISMAN_START; i < SharedDef.SPELL_TALISMAN_END; i += SharedDef.MAX_TALISMAN_COUNT) {
            var id = this.GetByte(i, 0);
            if (id == 0) {
                i = SharedDef.SPELL_TALISMAN_END;
            }
            else {
                var vo = new TreasureVo;
                vo.id = id;
                vo.lev = this.GetByte(i, 1);
                vo.power = this.GetUInt32(i + 1);
                ary.push(vo);
            }
        }
        return ary;
    };
    /***翅膀相关****************************************** */
    //翅膀是否被激活
    GrowData.prototype.getWingIsActive = function () {
        return this.GetUInt32(SharedDef.SPELL_WINGS_ID) != 0;
    };
    //翅膀ID
    GrowData.prototype.getWingID = function () {
        return this.GetUInt32(SharedDef.SPELL_WINGS_ID);
    };
    GrowData.prototype.getWingModel = function () {
        if (this.getWingID() == 0) {
            return 0;
        }
        var targetData = TableData.getInstance().getData(TableData.tb_wings_bless, this.getWingID());
        var wingInfo = TableData.getInstance().getData(TableData.tb_wings_base, targetData.rank);
        return wingInfo.model;
    };
    GrowData.prototype.getWingModelByID = function ($id) {
        var targetData = TableData.getInstance().getData(TableData.tb_wings_bless, $id);
        var wingInfo = TableData.getInstance().getData(TableData.tb_wings_base, targetData.rank);
        return wingInfo.model;
    };
    //翅膀强化等级
    GrowData.prototype.getWingQh = function () {
        return this.GetUInt32(SharedDef.SPELL_WINGS_LEVEL);
    };
    //翅膀经验变化
    GrowData.prototype.getWingExp = function () {
        return this.GetUInt32(SharedDef.SPELL_WINGS_BLESS_EXP);
    };
    GrowData.prototype.wingIDChg = function () {
        ModuleEventManager.dispatchEvent(new wing.WingEvent(wing.WingEvent.WING_ID_CHANG_EVENT));
    };
    GrowData.prototype.wingExpChg = function () {
        ModuleEventManager.dispatchEvent(new wing.WingEvent(wing.WingEvent.WING_EXP_CHANG_EVENT));
    };
    GrowData.prototype.wingLevChg = function () {
        ModuleEventManager.dispatchEvent(new wing.WingEvent(wing.WingEvent.WING_LEV_CHANG_EVENT));
    };
    /***新强化相关****************************************** */
    /**部位强化等级 */
    GrowData.prototype.getPartStrengLev = function (part) {
        return this.GetUInt16(SharedDef.SPELL_INT_FIELD_EQUIPDEVELOP_START + SharedDef.EQUIPDEVELOP_STRENGTH_LV + (part - 1) * SharedDef.MAX_EQUIPDEVELOP_COUNT, 0);
    };
    /**部位精炼阶数星数数组 */
    GrowData.prototype.getPartRefineVo = function (part) {
        var idx = SharedDef.SPELL_INT_FIELD_EQUIPDEVELOP_START + SharedDef.EQUIPDEVELOP_REFINE_LV + (part - 1) * SharedDef.MAX_EQUIPDEVELOP_COUNT;
        var ary = new Array;
        ary.push(this.GetUInt16(idx, 0)); // 0 int16 阶数 1 int16 星数
        ary.push(this.GetUInt16(idx, 1));
        return ary;
    };
    /**部位镶嵌宝石等级数组 */
    GrowData.prototype.getPartGemVo = function (part) {
        var tab = tb.TB_equipdevelop_gem_part.get_TB_equipdevelop_gem_partById(part);
        var prefix = SharedDef.SPELL_INT_FIELD_EQUIPDEVELOP_START + (part - 1) * SharedDef.MAX_EQUIPDEVELOP_COUNT;
        var ary = new Array;
        for (var i = 0; i < tab.gem_array.length; i++) {
            ary.push(this.GetUInt16(prefix + SharedDef.EQUIPDEVELOP_GEM_LV_START + Math.floor(i / 2), i % 2));
        }
        return ary;
    };
    GrowData.prototype.getWashVo = function () {
        return this.GetStr(SharedDef.SPELL_STRING_FIELD_EQUIPDEVELOP_WASHATTRS_INFO);
    };
    GrowData.prototype.washChg = function () {
        //洗炼数据变化
        ModuleEventManager.dispatchEvent(new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.WASH_CHG_EVENT));
    };
    //大师等级
    GrowData.prototype.getMasterLevVo = function () {
        var ary = new Array;
        ary.push(this.GetUInt8(SharedDef.SPELL_INT_FIELD_EQUIPDEVELOP_BONUS_LV, 0));
        ary.push(this.GetUInt8(SharedDef.SPELL_INT_FIELD_EQUIPDEVELOP_BONUS_LV, 1));
        ary.push(this.GetUInt8(SharedDef.SPELL_INT_FIELD_EQUIPDEVELOP_BONUS_LV, 2));
        //console.log("-----取用大师等级------");
        return ary;
    };
    // 大师等级变化
    GrowData.prototype.masterLevChg = function () {
        ModuleEventManager.dispatchEvent(new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.WASH_CHG_EVENT));
        //console.log("-----监听到等级变化了------");
    };
    /**角色活动数据 */
    GrowData.prototype.getActivePlayerData = function ($offset) {
        return [this.GetUInt32(SharedDef.SPELL_INT_FIELD_PLAYER_ACTIVITY_DATA_START + $offset * SharedDef.MAX_PLAYERACTIVITTYDATAINT_COUNT),
            this.GetUInt32(SharedDef.SPELL_INT_FIELD_PLAYER_ACTIVITY_DATA_START + $offset * SharedDef.MAX_PLAYERACTIVITTYDATAINT_COUNT + 1),
            this.GetUInt32(SharedDef.SPELL_INT_FIELD_PLAYER_ACTIVITY_DATA_START + $offset * SharedDef.MAX_PLAYERACTIVITTYDATAINT_COUNT + 2),
            this.GetUInt32(SharedDef.SPELL_INT_FIELD_PLAYER_ACTIVITY_DATA_START + $offset * SharedDef.MAX_PLAYERACTIVITTYDATAINT_COUNT + 3)];
    };
    /**
     * 法宝装备列表
     */
    GrowData.prototype.gettalismanslotlist = function () {
        var ary = new Array;
        for (var i = SharedDef.SPELL_TALISMAN_SLOT_START; i < SharedDef.SPELL_TALISMAN_SLOT_END; i = i + SharedDef.MAX_TALISMAN_SLOT_COUNT) {
            var vo = new TreasureWearVo;
            vo.slotid = (i - SharedDef.SPELL_TALISMAN_SLOT_START) / SharedDef.MAX_TALISMAN_SLOT_COUNT + 1;
            vo.state = this.GetByte(i, 1);
            vo.treasureid = this.GetByte(i, 0);
            ary.push(vo);
        }
        return ary;
    };
    return GrowData;
}(GuidObject));
var DivineVo = /** @class */ (function () {
    function DivineVo() {
    }
    return DivineVo;
}());
var TreasureVo = /** @class */ (function () {
    function TreasureVo() {
    }
    return TreasureVo;
}());
var TreasureWearVo = /** @class */ (function () {
    function TreasureWearVo() {
    }
    return TreasureWearVo;
}());
//# sourceMappingURL=GrowData.js.map