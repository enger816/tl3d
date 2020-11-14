var keyProp = [
    "生命", "攻击", "防御", "命中", "闪避", "暴击", "抗暴", "攻速", "移速", "破防", "忽视闪避", "生命值回复", "伤害加深", "伤害减免", "反弹伤害" //15个
    ,
    "吸血", "回复效率", "暴击", "抗暴", "暴击伤害", "暴伤减免", "命中率", "闪避率", "眩晕", "定身", "沉默", "混乱", "魅惑", "控制增强", "控制减免" //15个
    ,
    "防御", "境界", "PVP伤害增加", "减少PVP伤害", "增加PVE伤害", "减少伤害",
];
function getKeyProById($id) {
    return keyProp[$id - 1];
}
// function getKeyCostById($id: number): string {
//     return TableData.getInstance().getData(TableData.tb_item_template,$id)["name"];
// }
//消耗类资源名
function getResName($id) {
    return TableData.getInstance().getData(TableData.tb_item_template, $id)["name"];
}
var btnClickTime = 500;
var professionalKey = [
    "", "枪客", "枪客", "道士", "道士", "剑客", "剑客"
];
function getProfessional($type) {
    return professionalKey[$type];
}
var quaColorAry = [ColorType.Whitefff4d6, ColorType.color2daa35, ColorType.color4392ff, ColorType.colorb759ff, ColorType.colorff7200, ColorType.colorce0a00];
function getColorQua(qua) {
    return this.quaColorAry[qua];
}
var colorNameAry = ["白色", "绿色", "蓝色", "紫色", "橙色", "红色"];
function getQuaName(qua) {
    return this.colorNameAry[qua];
}
var dailyAry = ["日", "一", "二", "三", "四", "五", "六"];
function getDateName(qua) {
    return this.dailyAry[qua];
}
function getRoleUrl(name) {
    // if (name.search("2242") != -1) {
    //     //console.log("2242224222422242")
    // }
    // if (name == "0") {
    //     //console.log("没有这个装备")
    // }
    return "role/" + name + getBaseUrl() + ".txt";
}
function getRoleUIUrl(name) {
    // if (name.search("6013") != -1) {
    //     //console.log("6013")
    // }
    // if (name == "0") {
    //     //console.log("没有这个装备")
    // }
    return "role/ui/" + name + getBaseUrl() + ".txt";
}
function getSkillUrl(name) {
    if (!name || name.length == 0) {
        //console.log("没有技能")
    }
    var str = "skill/" + name + getBaseUrl() + ".txt";
    return str.replace(".txt", "_byte.txt");
}
function getModelUrl(name) {
    return "model/" + name + getBaseUrl() + ".txt";
}
function getModelUIUrl(name) {
    return "model/" + name + getBaseUrl() + ".txt";
}
function getMapUrl(name) {
    return "map/" + name + ".txt";
}
function getfactionmapUrl(name) {
    return "ui/load/map/world/" + name + ".png";
}
function getZipMapUrl(name) {
    return "map/" + name + "/";
}
function getactivityIconUrl(name) {
    return "ui/load/activity/icon/" + name + ".jpg";
}
//玩家头像
function getTouPic(gender) {
    // return gender == 1 ? "ui/tou/1.png" : "ui/tou/2.png";
    return "ui/tou/" + (gender % 2) + ".png";
}
function getVipIconUrl(name) {
    return "ui/load/Vip/" + name + ".png";
}
function getExteriorIconUrl(name) {
    return "ui/load/exterior/" + name + ".png";
}
function getFactionBuildMapUrl(name) {
    return "ui/load/map/factionbuildmap/" + name + ".png";
}
function geteqiconIconUrl(name) {
    return "ui/eqicon/" + name + ".png";
}
function getrestaskhardIconUrl(name) {
    return "ui/load/rescopy/hardlev/" + name + ".png";
}
function getstrongerIconUrl(name) {
    return "ui/load/stronger/" + name + ".png";
}
function getgemIconUrl(name) {
    return "ui/load/gem/" + name + ".png";
}
function getRoleIconUrl(name) {
    return "ui/roleicon/" + name + ".png";
}
function getStateUpIconUrl(name) {
    return "ui/load/stateup/" + name + ".png";
}
function getKaifuIconUrl(name) {
    return "ui/load/kaifu/" + name + ".png";
}
function getTeamcopyIconUrl(name) {
    return "ui/load/teamcopy/" + name + ".png";
}
function getSuccesspromptUrl(name) {
    return "ui/load/toptip/txt/" + name + ".png";
}
function getSkillIconUrl(name) {
    return "ui/skillicon/" + name + ".png";
}
function getTreasureIconUrl(name) {
    return "ui/load/treasure/" + name + "_c.png";
}
function getEffectUIUrl(name) {
    return "ui/load/effect/" + name + ".png";
}
function getMountIconUrl(name) {
    return "ui/load/mount/photo/" + name + ".png";
}
function getload_IconUrl(name) {
    return "ui/load/icon/" + name + ".png";
}
function getload_FacBuildUrl(name) {
    return "ui/load/faction/buildicon/" + name + ".png";
}
function getload_LogingiftUrl(name) {
    return "ui/load/Logingift/Name/" + name + ".png";
}
function getload_LogingiftInfoUrl(name) {
    return "ui/load/Logingift/Info/" + name + ".png";
}
function getUIIconUrl(name) {
    return "ui/uiicon/" + name + ".png";
}
function getQueenIconUrl(id) {
    return Scene_data.fileRoot + "ui/load/queen/" + id + ".jpg";
}
function getUItimeOutUrl(name) {
    return "ui/load/timeOut/" + name + ".png";
}
function getUIpkGradeUrl(name) {
    return "ui/load/pkGrade/" + name + ".png";
}
function getUItittleUrl(name) {
    return "ui/load/tittle/" + name + ".png";
}
function getOutBossUiUrl(name, pre) {
    if (pre) {
        return "ui/tittlename/oboss/t_" + name + ".png";
    }
    else {
        return "ui/tittlename/oboss/" + name + ".png";
    }
}
/**前端战斗力计算 */
function getForceByAtt(att_id, att_val) {
    var num = 0;
    for (var i = 0; i < att_val.length; i++) {
        num += tb.TB_battle_force.get_TB_battle_forceById(att_id[i]).rate * att_val[i];
    }
    //console.log("---NAN--", float2int(num / 1000000));
    return float2int(num / 1000000);
}
/**标准化数字 */
function Snum($num) {
    if ($num > 999999) {
        return float2int($num / 10000) + "万";
    }
    else if ($num > 999999999) {
        return float2int($num / 100000000) + "亿";
    }
    else {
        return String(float2int($num));
    }
}
/** 获得vip加成 */
function getvipadd($idstr) {
    var viptabary = tb.TB_vip_base.getTB_vip_base();
    var curviprare = viptabary[GuidData.player.getVipLevel()][$idstr];
    for (var i = GuidData.player.getVipLevel(); i < viptabary.length; i++) {
        var element = viptabary[i];
        if (curviprare != element[$idstr]) {
            //console.log("----",curviprare,$idstr);
            return "VIP" + element.id + "结算奖励增加" + element[$idstr] + "%";
        }
    }
    //console.log("----",curviprare,$idstr);
    return "结算奖励增加" + viptabary[viptabary.length - 1][$idstr] + "%";
}
function converItem2Cost(ary) {
    var m = TableData.getInstance().getData(TableData.tb_item_template, ary[0])["money_type"];
    return [m, ary[1]];
}
/**将道具中的资源类，转换为消耗资源id */
function getresIdByreward($itemid) {
    return $itemid;
}
/**将后台名称 2.1001.张三 解析成 1001.张三  跨服使用 */
function getServerAndName(name) {
    var ary = name.split(",");
    if (ary.length == 3) {
        return ary[1] + ary[2];
    }
    else {
        return name;
    }
}
/**将后台名称 2.1001.张三 解析成 张三 */
function getBaseName(name) {
    var ary = name.split(",");
    if (ary.length == 3) {
        return ary[2];
    }
    else {
        return name;
    }
}
/** 获取npc身上的模块id */
function getNpcmodul(npcid) {
    var $aa = tb.TB_creature_template.get_TB_creature_template(npcid);
    var sdv = tb.TB_creature_dialogue.get_TB_creature_dialogue($aa.dialogue_id);
    return sdv.typedata[0][0];
}
function getAvataByID($id) {
    var $aa = tb.TB_creature_template.get_TB_creature_template($id);
    return $aa.avatar;
}
// /**资源是否足够 -道具模式 */
// function hasEnoughResItem($costary: Array<number>): boolean {
//     return hasEnoughRes([getresIdByreward($costary[0]), $costary[1]])
// }
/**资源是否足够 */
function hasEnoughRes($costary) {
    return ($costary[1] <= GuidData.player.getResType($costary[0]));
}
function costRes($costary, fun, failFun) {
    if (failFun === void 0) { failFun = null; }
    var curNum = GuidData.player.getResType($costary[0]);
    if ($costary[1] <= curNum) {
        fun();
    }
    else if ($costary[0] == SharedDef.MONEY_TYPE_BIND_GOLD) {
        curNum += GuidData.player.getResType(SharedDef.MONEY_TYPE_GOLD_INGOT);
        if ($costary[1] <= curNum) {
            AlertUtil.show("绑定元宝不足，将消耗元宝", "消耗提示", function (flag) {
                if (flag == 1) {
                    fun();
                }
            });
        }
        else {
            var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
            $aaa.data = SharedDef.MONEY_TYPE_BIND_GOLD;
            ModuleEventManager.dispatchEvent($aaa);
            if (failFun) {
                failFun();
            }
        }
    }
    else {
        var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
        $aaa.data = $costary[0];
        ModuleEventManager.dispatchEvent($aaa);
        if (failFun) {
            failFun();
        }
    }
}
// /**
//  * 道具或者资源是否足够
//  * @param  $costary道具数组
//  */
function hasEnoughResItem($costary) {
    var $vo = tb.TB_item_template.get_TB_item_template($costary[0]);
    if (!$vo) {
        return false;
    }
    if ($vo.money_type > 0) {
        //资源
        return (GuidData.player.getResType($vo.money_type) >= $costary[1]);
    }
    else {
        //材料
        return GuidData.bag.hasItem($costary[0], $costary[1]);
    }
}
//# sourceMappingURL=GameUtils.js.map