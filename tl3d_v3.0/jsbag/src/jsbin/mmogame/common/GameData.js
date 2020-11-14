var AreaType = /** @class */ (function () {
    function AreaType() {
    }
    AreaType.restAreaPanel = function () {
        if (GuidData.map.showAreaById(AreaType.fubenLeftPane_20)) {
            ModuleEventManager.dispatchEvent(new fb.FubenEvent(fb.FubenEvent.FUBEN_SHOW_LEFT_PANEL_EVENT)); //显示副本左边任务
        }
        if (GuidData.map.showAreaById(AreaType.expfuben_21)) {
            ModuleEventManager.dispatchEvent(new fb.FubenEvent(fb.FubenEvent.FUBEN_EXP_SHOW_LEFT_PANEL_EVENT)); //显示副本左边任务
        }
        if (GuidData.map.showAreaById(AreaType.fubenFactionLeftPane_28)) {
            ModuleEventManager.dispatchEvent(new fb.FubenEvent(fb.FubenEvent.FUBEN_FACTION_SHOW_LEFT_PANEL_EVENT)); //显示副本左边任务
        }
        if (GuidData.map.showAreaById(AreaType.fubenBossLeftPane_29)) {
            ModuleEventManager.dispatchEvent(new fb.FubenEvent(fb.FubenEvent.FUBEN_BOSS_SHOW_LEFT_PANEL_EVENT)); //显示副本左边任务
        }
        if (GuidData.map.showAreaById(AreaType.worldboos_22)) {
            //   ModuleEventManager.dispatchEvent(new worldboss.WorldBossEvent(worldboss.WorldBossEvent.SHOW_LEFT_WORLD_BOSS_PANEL));//世界BOSS
        }
        if (GuidData.map.showAreaById(AreaType.kuafu1V1top_23)) {
            ModuleEventManager.dispatchEvent(new kuafu.KuaFu1v1Event(kuafu.KuaFu1v1Event.SHOW_1V1_SCENE_PANEL)); //跨服1v1
        }
        if (GuidData.map.showAreaById(AreaType.xiuliantop_26)) {
            ModuleEventManager.dispatchEvent(new kuafu.KuaFu1v1Event(kuafu.KuaFu1v1Event.SHOW_1V1_SCENE_PANEL)); //修炼
        }
        // if (GuidData.map.showAreaById(AreaType.kuafu3V3top_24)) {
        //     ModuleEventManager.dispatchEvent(new kuafu.KuaFu3v3PkEvent(kuafu.KuaFu3v3PkEvent.SHOW_KUAFU_3V3_SCENE_PANEL));//显示跨服3V3副本面板
        // }
        // if (GuidData.map.showAreaById(AreaType.kuafuXFtop_25)) {
        //     ModuleEventManager.dispatchEvent(new kuafu.XianFuEvent(kuafu.XianFuEvent.SHOW_XIANFU_SCENEPANEL_EVENT)); //仙府
        // }
    };
    AreaType.topleft_1 = 1; //左上角头像
    AreaType.topleftpalce_2 = 2; //左边任务
    AreaType.toprightPanda_3 = 3; //右上角系统列表
    AreaType.toprightmap_4 = 4; //左上角地图
    //    public static midleftQuest_5: number = 5;
    AreaType.rightChange_6 = 6; //右边切换和家族
    AreaType.fightSKill_7 = 7; //只显示技能
    AreaType.sceneExit_30 = 30; //副本推出按钮
    AreaType.fubenLeftPane_20 = 20; //副本左边任务
    AreaType.expfuben_21 = 21;
    AreaType.worldboos_22 = 22;
    AreaType.kuafu1V1top_23 = 23;
    AreaType.kuafu3V3top_24 = 24;
    AreaType.kuafuXFtop_25 = 25;
    AreaType.xiuliantop_26 = 26;
    AreaType.sceneExit_27 = 27;
    AreaType.fubenFactionLeftPane_28 = 28; //副本左边任务
    AreaType.fubenBossLeftPane_29 = 29; //副本左边任务
    return AreaType;
}());
var Play_Skill_Vo = /** @class */ (function () {
    function Play_Skill_Vo() {
    }
    Play_Skill_Vo.get_Play_Skill_Vo = function ($id) {
        var k = new Play_Skill_Vo();
        k.tb_skill_base = tb.TB_skill_base.get_TB_skill_base($id);
        return k;
    };
    Play_Skill_Vo.prototype.destory = function () {
        this.skill = null;
    };
    return Play_Skill_Vo;
}());
var tb;
(function (tb) {
    //自己技能相关
    var SkillData = /** @class */ (function () {
        function SkillData() {
            var $obj = TableData.getInstance().getData(TableData.tb_skill_show, GuidData.player.getCharType());
            this.parse($obj);
        }
        SkillData.prototype.parse = function ($obj) {
            this.zhudong_list = new Array;
            this.anger_list = new Array;
            this.passive_list = new Array;
            makeArray($obj.zhudong_list, this.zhudong_list);
            makeArray($obj.anger_list, this.anger_list);
            makeArray($obj.passive_list, this.passive_list);
        };
        SkillData.getInstance = function () {
            if (!this._instance) {
                this._instance = new SkillData();
            }
            return this._instance;
        };
        SkillData.initData = function () {
            if (!SkillData.threeSkillList) {
                SkillData.threeSkillList = new Array();
                SkillData.skillList = this.getZhuDongList();
                SkillData.passiveSkillList = this.getPassiveList();
                this.initeCdMesh();
            }
        };
        //收获主动技能列表数据
        SkillData.getZhuDongList = function () {
            var $arr = new Array();
            for (var i = 0; i < tb.SkillData.getInstance().zhudong_list.length; i++) {
                var $id = tb.SkillData.getInstance().zhudong_list[i];
                var $vo = tb.SkillDataVo.getSkillBaseDataById($id);
                $arr.push($vo);
            }
            return $arr;
        };
        SkillData.getPassiveList = function () {
            var $arr = new Array();
            for (var i = 0; i < tb.SkillData.getInstance().passive_list.length; i++) {
                var $id = tb.SkillData.getInstance().passive_list[i];
                var $vo = tb.SkillDataVo.getSkillBaseDataById($id);
                $arr.push($vo);
            }
            return $arr;
        };
        SkillData.initeCdMesh = function () {
            if (!this.cdMeshObj) {
                this.cdMeshObj = new Object();
                for (var i = 0; i < GameInstance.skillCdItem.length; i++) {
                    var $obj = GameInstance.skillCdItem[i];
                    if ($obj.cd <= 0) {
                        this.cdMeshObj[$obj.id] = TimeUtil.getTimer();
                    }
                    else {
                        this.cdMeshObj[$obj.id] = $obj.cd + TimeUtil.getTimer();
                    }
                }
            }
        };
        SkillData.setCdMeshData = function ($skillId, $singleCD) {
            this.cdMeshObj[$skillId] = TimeUtil.getTimer() + $singleCD;
        };
        SkillData.getCdMeshBySkillId = function ($skillId) {
            if (!this.cdMeshObj) {
                return 0;
            }
            return this.cdMeshObj[$skillId];
        };
        SkillData.resetSkillData = function () {
            if (!tb.SkillData.skillList) {
                tb.SkillData.initData();
            }
            var $arr = GuidData.player.skillItem;
            ////console.log($arr)
            for (var i = 0; i < $arr.length; i++) {
                var $skillUintVo = $arr[i];
                if ($skillUintVo) {
                    if ($skillUintVo.lev == 0 || $skillUintVo.slot == 0) {
                        break;
                    }
                    if ($skillUintVo.slot == 1) {
                        this.addThreeSkillList($skillUintVo.id, $skillUintVo.lev, $skillUintVo.slot);
                    }
                    else {
                        this.setDataToSkillVo($skillUintVo.id, $skillUintVo.lev, $skillUintVo.slot);
                    }
                    this.initPreSkill($skillUintVo.id);
                }
            }
            this.jumpSkillVo = SkillDataVo.getSkillBaseDataById(10001);
        };
        SkillData.initPreSkill = function ($skillId) {
            //  var $skilldata: TB_skill_Vo = TableData.getInstance().getTBskillVo($skillId);
            var $skilldata = tb.SkillDataVo.getSkillBaseDataById($skillId);
            if ($skilldata.tb_skill_base.effect_file) {
                SkillManager.getInstance().preLoadSkill(getSkillUrl($skilldata.tb_skill_base.effect_file)); //FIXME
                //SkillManager.getInstance().preLoadSkill(getSkillUrl("nuqi"));//FIXME
            }
        };
        SkillData.setDataToSkillVo = function ($id, $lev, $slot) {
            for (var i = 0; i < tb.SkillData.skillList.length; i++) {
                if (tb.SkillData.skillList[i].id == $id) {
                    tb.SkillData.skillList[i].level = $lev;
                    tb.SkillData.skillList[i].slot = $slot;
                    tb.SkillData.skillList[i].activation = true;
                }
            }
            if ($slot == 6) {
                if (!tb.SkillData.angerSkillVo) {
                    tb.SkillData.angerSkillVo = tb.SkillDataVo.getSkillBaseDataById($id);
                }
                tb.SkillData.angerSkillVo.level = $lev;
                tb.SkillData.angerSkillVo.slot = $slot;
            }
        };
        SkillData.addThreeSkillList = function ($id, $lev, $slot) {
            var tempSkill = this.gteThreeSillById($id);
            if (!tempSkill) {
                tempSkill = tb.SkillDataVo.getSkillBaseDataById($id);
                tb.SkillData.threeSkillList.push(tempSkill);
            }
            tempSkill.level = $lev;
            tempSkill.slot = $slot;
        };
        SkillData.gteThreeSillById = function ($id) {
            for (var i = 0; i < tb.SkillData.threeSkillList.length; i++) {
                if (tb.SkillData.threeSkillList[i].id == $id) {
                    return tb.SkillData.threeSkillList[i];
                }
            }
            return null;
        };
        return SkillData;
    }());
    tb.SkillData = SkillData;
    var SkillDataVo = /** @class */ (function () {
        function SkillDataVo($obj) {
            if (!$obj) {
                //console.log("技能表无")
            }
            this.id = $obj.id;
            this.is_initiative = $obj.is_initiative;
            this.singleCD = $obj.singleCD;
            this.levelUpStat = $obj.uplevel_id[0];
            this.maxLev = $obj.uplevel_id[1] - this.levelUpStat + 1;
            this.drawChange = true;
            ;
        }
        Object.defineProperty(SkillDataVo.prototype, "showGreenUp", {
            get: function () {
                return this._showGreenUp;
            },
            set: function (value) {
                if (this._showGreenUp != value) {
                    this.drawChange = true;
                }
                this._showGreenUp = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillDataVo.prototype, "activation", {
            get: function () {
                return this._activation;
            },
            set: function (value) {
                if (this._activation != value) {
                    this.drawChange = true;
                }
                this._activation = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillDataVo.prototype, "level", {
            get: function () {
                return this._level;
            },
            set: function (value) {
                if (this._level != value) {
                    this.drawChange = true;
                }
                this._level = value;
                this.tb_skill_uplevel = tb.TB_skill_uplevel.get_TB_skill_uplevel(this.levelUpStat + this.level - 1);
            },
            enumerable: true,
            configurable: true
        });
        SkillDataVo.getSkillBaseDataById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_skill_base, $id);
            var $vo = new tb.SkillDataVo($obj);
            $vo.tb_skill_base = tb.TB_skill_base.get_TB_skill_base($id);
            return $vo;
        };
        //获取升级条件
        SkillDataVo.getLevelUpInof = function ($skillId, $nextLevel) {
            var $objB = TableData.getInstance().getData(TableData.tb_skill_uplevel, $nextLevel);
            var $vo = new tb.SkillLearnVo();
            if (!$objB) {
                //console.log("没有数据")
            }
            $vo.resource = $objB.uplevel_cost;
            $vo.playerLevel = $objB.need_level;
            return $vo;
        };
        //是否有升级条件
        SkillDataVo.isCanUpLevel = function ($Vo) {
            if ($Vo.skillLearnVo.playerLevel) {
                if ($Vo.skillLearnVo.playerLevel > GameInstance.mainChar.unit.getLevel()) {
                    return false;
                }
            }
            if ($Vo.skillLearnVo.item) {
                if (!this.havaMoreDaojuItem($Vo.skillLearnVo.item)) {
                    return false;
                }
            }
            if ($Vo.skillLearnVo.resource) {
                if (!this.havaMoreResourceItem($Vo.skillLearnVo.resource)) {
                    return false;
                }
            }
            if ($Vo.level == $Vo.maxLev) {
                if ($Vo.typtId != skillUi.SkillBaseType.NUQI) {
                    return false;
                }
            }
            return true;
        };
        //道具是否足够
        SkillDataVo.havaMoreDaojuItem = function ($item) {
            for (var i = 0; i < $item.length; i++) {
                var $id = $item[i][0];
                var $num = $item[i][1];
                if (!skillUi.SkillUiModel.haveMoneyType($id, $num)) {
                    return false;
                }
            }
            return true;
        };
        //资源是否足够
        SkillDataVo.havaMoreResourceItem = function ($item) {
            for (var i = 0; i < $item.length; i++) {
                var $id = $item[i][0];
                var $num = $item[i][1];
                if (!skillUi.SkillUiModel.haveMoneyType($id, $num)) {
                    return false;
                }
            }
            return true;
        };
        //刷新对象数据用于显示
        SkillDataVo.prototype.refresh = function () {
            var $objA = TableData.getInstance().getData(TableData.tb_skill_uplevel, this.levelUpStat + this.level - 1);
            this.singleCDA = this.singleCD - $objA.mcd;
            this.infoA = this.replaceInfo($objA, true);
            this.fight_value = $objA.fight_value;
            if (this.level < this.maxLev) {
                var $objB = TableData.getInstance().getData(TableData.tb_skill_uplevel, this.levelUpStat + this.level);
                this.infoB = this.replaceInfo($objB, false);
                this.singleCDB = this.singleCD - $objB.mcd;
            }
            else {
                this.infoB = "";
                this.singleCDB = NaN;
            }
        };
        SkillDataVo.prototype.replaceInfo = function ($obj, $flag) {
            var temp = this.getStrByInfo(this.tb_skill_base.info);
            for (var key in $obj) {
                var kkkk = "{" + key + "}";
                temp = temp.replace(kkkk, $flag ? "[ffffff]" + $obj[key] + "[8595ae]" : "[00ff00]" + $obj[key] + "[8595ae]");
            }
            return temp;
        };
        SkillDataVo.prototype.getStrByInfo = function ($str) {
            var endStr = "";
            var $canAdd = true;
            for (var i = 0; i < $str.length; i++) {
                if ($canAdd) {
                    if ($str.substr(i, 1) != "<") {
                        endStr += $str.substr(i, 1);
                    }
                    else {
                        $canAdd = false;
                    }
                }
                else {
                    if ($str.substr(i, 1) == ">") {
                        $canAdd = true;
                    }
                }
            }
            return endStr;
        };
        SkillDataVo.getSkillDesc = function ($skillID, $lev) {
            if ($lev === void 0) { $lev = 1; }
            var tabObj = tb.TB_skill_base.get_TB_skill_base($skillID);
            var desc = tabObj.info;
            var keyAry = desc.match(/\{\w+#*\d*\_*\d*\}/g);
            if (!keyAry || keyAry.length == 0) {
                return desc;
            }
            var $objA = TableData.getInstance().getData(TableData.tb_skill_uplevel, tabObj.uplevel_id[0] + $lev - 1);
            for (var i = 0; i < keyAry.length; i++) {
                var key = keyAry[i];
                var sKey = key.substring(1, key.length - 1);
                var param;
                if (sKey.indexOf("#") != -1) {
                    var ks = sKey.split("#");
                    sKey = ks[0];
                    var ssKs = ks[1].split("_");
                    var temp = $objA[sKey];
                    var needMath = (sKey == "passive_type");
                    var ptype = 0;
                    for (var j = 0; j < ssKs.length; j++) {
                        if (temp) {
                            if (j == (ssKs.length - 1)) {
                                ptype = temp[Number(ssKs[j]) - 1];
                            }
                            temp = temp[Number(ssKs[j])];
                        }
                        else {
                            temp = 0;
                            break;
                        }
                    }
                    param = temp;
                    if (needMath) {
                        // if(ptype < 13 || ptype == 20 || ptype == 21){
                        //     param = float2int(temp / 100);                            
                        // }else{
                        //     param = float2int(temp);
                        // }  
                        param = temp / 100;
                    }
                }
                else {
                    param = $objA[sKey];
                }
                var r;
                if ((param - Math.floor(param)) > 0) {
                    r = param.toFixed(2);
                }
                else {
                    r = float2int(param).toString();
                }
                desc = desc.replace(key, r);
            }
            return desc;
        };
        return SkillDataVo;
    }());
    tb.SkillDataVo = SkillDataVo;
})(tb || (tb = {}));
var MergeServerMsgVo = /** @class */ (function () {
    //public localData: any;
    //public sessionData: any;
    function MergeServerMsgVo() {
        this.type = 3; //默认在游戏服  
        //MERGE_TYPE_MERGE = 0,	//从服迁移连接到主服
        //MERGE_TYPE_GAME_TO_PK = 1,	//游戏服到Pk服
        //MERGE_TYPE_PK_TO_GAME = 2,	//pk服到游戏服
        if (!this.getLocalData()) {
            return;
        }
        // var $portId: number = 443;
        // var $hostId: string = this.localData.ipurl;//localStorage.getItem("ipurl");
        // this.port = $portId;
        // this.host = $hostId;
    }
    MergeServerMsgVo.prototype.getLocalData = function () {
        var $indexUrl = window.location.toString();
        var idx = $indexUrl.lastIndexOf("/");
        var r = $indexUrl.slice(0, idx);
        var objStr = localStorage.getItem(r);
        var sesStr = sessionStorage.getItem(r);
        if (sesStr) {
            var sessionData = JSON.parse(sesStr);
            this.userName = sessionData.name;
            this.sid = sessionData.sid;
            this.platformid = sessionData.platformid;
            this.port = 443;
            this.host = sessionData.ipurl;
            return true;
        }
        else if (objStr) {
            var localData = JSON.parse(objStr);
            this.userName = localData.name;
            this.sid = localData.sid;
            this.platformid = localData.platformid;
            this.port = 443;
            this.host = localData.ipurl;
            return true;
        }
        return false;
    };
    MergeServerMsgVo.prototype.makeBaseKey = function () {
        if (this.userName) {
            this.key = this.makesession(this.userName, this.sid, this.platformid, false, false);
        }
    };
    MergeServerMsgVo.prototype.makesession = function (userName, m_sid, platformid, indulge, mobile) {
        if (indulge === void 0) { indulge = false; }
        if (mobile === void 0) { mobile = false; }
        //var platformid: string = localStorage.getItem("platformid");
        GameInstance.sid = m_sid;
        var m_pid;
        if (platformid && platformid.length) {
            m_pid = Number(platformid);
        }
        else {
            m_pid = 2; //内网2.外网3
        }
        var m_uid = userName;
        var m_remote_ip = "";
        var m_login_key = "84adc98ee63b26e2063a796ac982ad77";
        var session_key = "";
        var sIndulge = "n";
        if (indulge)
            sIndulge = "y";
        var now = (new Date().getTime() / 1000) | 0;
        var inviteGuid = null;
        if (getUrlParam("inviteGuid")) {
            inviteGuid = getUrlParam("inviteGuid");
        }
        //b64加密
        var src;
        src = "pid=" + m_pid + "&sid=" + m_sid + "&uid=" + m_uid + "&time=" + now + "&indulge=" + sIndulge
            + "&mobile=" + (mobile ? "y" : "n") + "&remote_ip=" + m_remote_ip + (inviteGuid ? "&factionguid=" + inviteGuid : "");
        var b = new Base64();
        var auth = b.encode(src);
        var md5_str = hex_md5(auth + m_login_key);
        var session_key = "?auth=" + auth + "&sign=" + md5_str;
        ////console.log(auth);
        ////console.log(md5_str);
        ////console.log(session_key);
        return session_key;
    };
    MergeServerMsgVo.prototype.readData = function ($byte) {
        this.host = $byte.readUTF();
        this.port = $byte.readUint32();
        this.key = $byte.readUTF();
        this.type = $byte.readUint32();
        this.reserve = $byte.readUint32();
        this.reserve2 = $byte.readUint32();
    };
    return MergeServerMsgVo;
}());
var GameConfigData = /** @class */ (function () {
    function GameConfigData() {
        this._open_prompting_pboss = ""; //个人boss提醒设置
        this._open_prompting_sboss = ""; //全民boss提醒设置
    }
    GameConfigData.prototype.read = function () {
        // read cookie
        if (!localStorage.getItem("gameconfig_block_other_plr")) {
            this._block_other_plr = 0;
        }
        else {
            this._block_other_plr = Number(localStorage.getItem("gameconfig_block_other_plr"));
        }
        if (!localStorage.getItem("gameconfig_block_effect_ski")) {
            this._block_effect_ski = 0;
        }
        else {
            this._block_effect_ski = Number(localStorage.getItem("gameconfig_block_effect_ski"));
        }
        if (!localStorage.getItem("gameconfig_block_plr_flyword")) {
            this._block_plr_flyword = 0;
        }
        else {
            this._block_plr_flyword = Number(localStorage.getItem("gameconfig_block_plr_flyword"));
        }
        //如果是ios，默认是无音效
        if (Scene_data.isIos) {
            this.block_volume_set = 0;
        }
        else {
            if (!localStorage.getItem("gameconfig_block_volume_set")) {
                this.block_volume_set = 1;
            }
            else {
                this.block_volume_set = Number(localStorage.getItem("gameconfig_block_volume_set"));
            }
        }
        // SoundManager.getInstance().setVolume(this._block_volume_set);
        if (!localStorage.getItem("gameconfig_block_sound_set")) {
            this._block_sound_set = 1;
        }
        else {
            this._block_sound_set = Number(localStorage.getItem("gameconfig_block_sound_set"));
        }
        SoundManager.getInstance().setSkillVolume(this._block_sound_set);
        if (!localStorage.getItem("gameconfig_open_prompting_pboss")) {
            var ary = tb.Tb_private_boss_info.get_Tb_private_boss_info();
            for (var i = 0; i < ary.length; i++) {
                this._open_prompting_pboss += "1|";
            }
        }
        else {
            this._open_prompting_pboss = localStorage.getItem("gameconfig_open_prompting_pboss");
        }
        if (!localStorage.getItem("gameconfig_open_prompting_sboss")) {
            var ary1 = tb.TB_mass_boss_info.getItem();
            for (var i = 0; i < ary1.length; i++) {
                this._open_prompting_sboss += "0|";
            }
        }
        else {
            this._open_prompting_sboss = localStorage.getItem("gameconfig_open_prompting_sboss");
        }
    };
    Object.defineProperty(GameConfigData.prototype, "block_other_plr", {
        get: function () {
            return this._block_other_plr;
        },
        set: function (val) {
            this._block_other_plr = val;
            // write cookie
            localStorage.setItem("gameconfig_block_other_plr", String(this._block_other_plr));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfigData.prototype, "block_effect_ski", {
        get: function () {
            return this._block_effect_ski;
        },
        set: function (val) {
            this._block_effect_ski = val;
            // write cookie
            localStorage.setItem("gameconfig_block_effect_ski", String(val));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfigData.prototype, "block_plr_flyword", {
        get: function () {
            return this._block_plr_flyword;
        },
        set: function (val) {
            this._block_plr_flyword = val;
            // write cookie
            localStorage.setItem("gameconfig_block_plr_flyword", String(val));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfigData.prototype, "block_volume_set", {
        get: function () {
            return this._block_volume_set;
        },
        set: function (val) {
            this._block_volume_set = val;
            // write cookie
            SoundManager.getInstance().setVolume(this._block_volume_set);
            localStorage.setItem("gameconfig_block_volume_set", String(val));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfigData.prototype, "block_sound_set", {
        get: function () {
            return this._block_sound_set;
        },
        set: function (val) {
            this._block_sound_set = val;
            // write cookie
            SoundManager.getInstance().setSkillVolume(this._block_sound_set);
            localStorage.setItem("gameconfig_block_sound_set", String(val));
        },
        enumerable: true,
        configurable: true
    });
    GameConfigData.prototype.setopen_prompting_pboss = function (id, val) {
        var ary = this._open_prompting_pboss.split("|");
        ary[id] = val ? "1" : "0";
        var cc = "";
        for (var i = 0; i < ary.length; i++) {
            cc += ary[i].concat("|");
        }
        this._open_prompting_pboss = cc;
        //console.log("----cccccccccccccc-------------------",cc);
        // write cookie
        localStorage.setItem("gameconfig_open_prompting_pboss", cc);
    };
    GameConfigData.prototype.getopen_prompting_pboss = function (id) {
        var ary = this._open_prompting_pboss.split("|");
        //console.log("--------------------dddddddddddddddddd----------",id,ary);
        return Number(ary[id]) == 1;
    };
    GameConfigData.prototype.setopen_prompting_sboss = function (id, val) {
        var ary = this._open_prompting_sboss.split("|");
        ary[id] = val ? "1" : "0";
        var cc = "";
        for (var i = 0; i < ary.length; i++) {
            cc += ary[i].concat("|");
        }
        this._open_prompting_sboss = cc;
        //console.log("----cccccccccccccc-------------------",id,cc,val);
        // write cookie
        localStorage.setItem("gameconfig_open_prompting_sboss", cc);
    };
    GameConfigData.prototype.getopen_prompting_sboss = function (id) {
        var ary = this._open_prompting_sboss.split("|");
        //console.log("--------------------dddddddddddddddddd----------",id,ary);
        return Number(ary[id]) == 1;
    };
    return GameConfigData;
}());
var GameData = /** @class */ (function () {
    function GameData() {
    }
    /*
    *$typeId  模块面板ID
    *data:属性显示
    */
    GameData.changeMsgToMainUi = function ($panelId, value) {
        GameData.changeMsgToMainUi;
        msgtip.MsgTipManager.outStrById(22, 7);
    };
    GameData.getIconCopyUrl = function ($id) {
        var $vo = tb.TB_item_template.get_TB_item_template($id);
        return geteqiconIconUrl($vo.icon);
    };
    GameData.getPropName = function ($id) {
        var $vo = tb.TB_item_template.get_TB_item_template($id);
        return $vo.name;
    };
    GameData.getAvataCopyUrl = function ($id) {
        var $aa = tb.TB_creature_template.get_TB_creature_template($id);
        return $aa.avatar;
    };
    GameData.getJoinTimeByItem = function ($arr) {
        var $str = "";
        if ($arr[0] < 10) {
            $str += "0";
        }
        $str += $arr[0] + ":";
        if ($arr[1] < 10) {
            $str += "0";
        }
        $str += $arr[1];
        $str += "-";
        if ($arr[2] < 10) {
            $str += "0";
        }
        $str += $arr[2] + ":";
        if ($arr[3] < 10) {
            $str += "0";
        }
        $str += $arr[3];
        return $str;
    };
    GameData.drawEquToSkinName = function ($key, $id, $num, $uiAtlas) {
        LoadManager.getInstance().load(Scene_data.fileRoot + GameData.getIconCopyUrl($id), LoadManager.IMG_TYPE, function ($img) {
            var $skillrec = $uiAtlas.getRec($key);
            var $ctx = UIManager.getInstance().getContext2D($skillrec.pixelWitdh, $skillrec.pixelHeight, false);
            UiDraw.cxtDrawImg($ctx, PuiData.A_BLACK_F, new Rectangle(0, 0, $skillrec.pixelWitdh, $skillrec.pixelHeight), UIData.publicUi);
            $ctx.drawImage($img, 2, 2, $skillrec.pixelWitdh - 4, $skillrec.pixelHeight - 4);
            if ($num > 1) {
                ArtFont.getInstance().writeFontToCtxRight($ctx, String($num), ArtFont.num1, $skillrec.pixelWitdh - 2, $skillrec.pixelHeight - 20, 3);
            }
            $uiAtlas.updateCtx($ctx, $skillrec.pixelX, $skillrec.pixelY);
        });
    };
    GameData.getPublicUiAtlas = function ($fun) {
        var _this = this;
        if (!this.publicbgUiAtlas) {
            this.publicbgUiAtlas = new UIAtlas;
            this.publicbgUiAtlas.setInfo("ui/uidata/public/publicbg.xml", "ui/uidata/public/publicbg.png", function () {
                $fun(_this.publicbgUiAtlas);
            });
        }
        else {
            $fun(this.publicbgUiAtlas);
        }
    };
    GameData.needCreatChar = true;
    GameData.roleInitPos = new Vector2D();
    GameData.initGMbg = false;
    GameData.collectionType = 0; //基础攻击0, 采集1,对话2
    GameData.configData = new GameConfigData;
    return GameData;
}());
//# sourceMappingURL=GameData.js.map