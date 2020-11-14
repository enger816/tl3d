var Pan3d;
(function (Pan3d) {
    var PuiData = /** @class */ (function () {
        function PuiData() {
        }
        /** 方形高亮64*64 */
        PuiData.A_HIGHT_F = "A_hight_f";
        /** tab高亮边框10*10 */
        PuiData.TAB_HIGHT = "Tab_hight";
        /** 圆形高亮75*75 */
        PuiData.A_HIGHT_C = "A_hight_c";
        /** 关闭按钮43*41 */
        PuiData.A_DELETEBTN = "A_deletebtn";
        /** 真气图标27*27 */
        PuiData.A_ZHENQI = "A_zhenqi";
        /** 兽灵图标27*27 */
        PuiData.A_SHOULING = "A_SHOULING";
        /** 精华图标27*27 */
        PuiData.A_JINGHUA = "A_JINGHUA";
        /** 箭头36*44 */
        PuiData.A_JIANTOU = "A_jiantou";
        /** 物品框44*44 */
        PuiData.A_WUPINKUANG = "A_wupinkuang";
        /** 圆形黑框69*69 */
        PuiData.A_BLACK_C = "A_black_c";
        /** 方形黑框64*64 */
        PuiData.A_BLACK_F = "A_black_f";
        /** 黑色星星28*28 */
        PuiData.A_BLACK_START = "A_black_start";
        /** 亮色星星28*28 */
        PuiData.A_HIGHT_START = "A_hight_start";
        /** 圆形头像底色71*71 */
        PuiData.A_BLACK_BASE = "A_black_base ";
        /** 红点17*16 */
        PuiData.A_RED_POINT = "A_red_point";
        /** 银币25*23 */
        PuiData.A_YINBI = "A_yinbi";
        /** 元宝25*23 */
        PuiData.A_YUANBAO = "A_yuanbao";
        /** 帮贡25*25 */
        PuiData.A_BANGGONG = "A_banggong";
        /** 斗魂25*25 */
        PuiData.A_DOUHUN = "A_DOUHUN";
        /** 经验25*25 */
        PuiData.A_EXP = "A_EXP";
        /** 荣誉25*25 */
        PuiData.A_HONOR = "A_HONOR";
        /** 绑定元宝25*23 */
        PuiData.A_BANGYUAN = "A_bangyuan";
        /** 右边括号25*19 */
        PuiData.A_RIGHT_XING = "A_RIGHT_XING";
        /** 单独一个星字18*19 */
        PuiData.A_SSTART = "A_SSTART";
        /** 左边括号8*19 */
        PuiData.A_LEFT_XING = "A_LEFT_XING";
        /** 武器紫色62*62 */
        PuiData.A_GOODS_PURPLE = "A_GOODS_PURPLE";
        /** 武器蓝色62*62 */
        PuiData.A_GOODS_BLUE = "A_GOODS_BLUE";
        /** 武器红色62*62 */
        PuiData.A_GOODS_RED = "A_GOODS_RED";
        /** 武器绿色62*62 */
        PuiData.A_GOODS_GREEN = "A_GOODS_GREEN";
        /** 武器白色62*62 */
        PuiData.A_GOODS_WHITE = "A_GOODS_WHITE";
        /** 武器橙色62*62 */
        PuiData.A_GOODS_ORANGE = "A_GOODS_ORANGE";
        /** 金星背景24*23 */
        PuiData.A_START_BG = "A_START_BG";
        /** 金星24*23 */
        PuiData.A_START = "A_START";
        /** 链条65*65 */
        PuiData.A_CHAIN = "A_CHAIN";
        /** 已装备26*56 */
        PuiData.A_OK = "A_OK";
        /** 前往按钮78*46 */
        PuiData.A_QIANWANG = "A_QIANWANG";
        /** T左31*62 */
        PuiData.T_LEFT = "T_LEFT";
        /** T中8*62 */
        PuiData.T_MID = "T_MID";
        /** T右60*62 */
        PuiData.T_RIGHT = "T_RIGHT";
        /** E左31*62 */
        PuiData.E_LEFT = "E_LEFT";
        /** E中8*62 */
        PuiData.E_MID = "E_MID";
        /** E右60*62 */
        PuiData.E_RIGHT = "E_RIGHT";
        /** F左31*62 */
        PuiData.F_LEFT = "F_LEFT";
        /** F中8*62 */
        PuiData.F_MID = "F_MID";
        /** F右60*62 */
        PuiData.F_RIGHT = "F_RIGHT";
        /** 22*22的物品框 */
        PuiData.A_F_22 = "A_F_22";
        /** 66*66的人物头像框 */
        PuiData.A_BLACK_BASE_66 = "A_BLACK_BASE_66 ";
        /** 66*66的人物头像框亮 */
        PuiData.A_HIGHR_C_66 = "A_HIGHR_C_66";
        /** 22*19Vip的V */
        PuiData.A_V = "A_V";
        /** 8*8赠送物品格的背景 */
        PuiData.A_GIVING_BG = "A_GIVING_BG";
        /** 24*24减号 */
        PuiData.B_SUB = "B_SUB";
        /** 90*90家族头像底框 */
        PuiData.A_FACTION_ICON = "A_FACTION_ICON";
        /** 30*30选中勾选框 */
        PuiData.SELECT_1 = "SELECT_1";
        /** 30*30未选中勾选框 */
        PuiData.SELECT_0 = "SELECT_0";
        /** 15*16排行榜用到的阶字 */
        PuiData.A_JIE = "A_JIE";
        /** 15*16排行榜用到的星字 */
        PuiData.A_XING = "A_XING";
        /** 系统提示文字北京 */
        PuiData.T_tips_txt_bg = "T_tips_txt_bg";
        /** Item底51*51 */
        PuiData.ITEMBG = "ITEMBG";
        /** 左边任务背景 */
        PuiData.A_quest_top = "A_quest_top";
        PuiData.A_quest_mid = "A_quest_mid";
        PuiData.A_quest_bottom = "A_quest_bottom";
        /** 左边任务<主> */
        PuiData.A_quest_ion0 = "A_quest_ion0";
        /** 左边任务<支> */
        PuiData.A_quest_ion1 = "A_quest_ion1";
        /** 左边任务<奇> */
        PuiData.A_quest_ion2 = "A_quest_ion2";
        /** 左边任务<活> */
        PuiData.A_quest_ion3 = "A_quest_ion3";
        /** 左边任务<完成> */
        PuiData.A_quest_finish = "A_quest_finish";
        PuiData.S_sys_tip0 = "S_sys_tip0";
        PuiData.S_sys_tip1 = "S_sys_tip1";
        /** 站力文字 */
        PuiData.A_zhanli_label = "A_zhanli_label";
        PuiData.A_gou = "A_gou";
        PuiData.A_cha = "A_cha";
        /** 战斗飘字 50*25 */
        PuiData.TYPE3 = "TYPE3"; //闪避
        PuiData.TYPE5 = "TYPE5"; //晕眩
        PuiData.TYPE9 = "TYPE9"; //经验
        PuiData.TYPE7 = "TYPE7"; //攻击
        PuiData.B_ZHUFUZHI = "B_ZHUFUZHI"; //
        PuiData.B_DABAOJI = "B_DABAOJI"; //攻击
        PuiData.B_XIAOBAOJI = "B_XIAOBAOJI"; //攻击
        PuiData.B_JINGYAN = "B_JINGYAN"; //攻击
        PuiData.NewPicBg = "NewPicBg"; //图片底
        PuiData.Select = "Select"; //选中
        PuiData.CostBg = "CostBg"; //背景3
        PuiData.BG2 = "BG2"; //背景2
        PuiData.PropBg40 = "PropBg40"; //46*46新物品框
        PuiData.PropBg60 = "PropBg60"; //66*66新物品框
        PuiData.PropBg100 = "PropBg100"; //108*108新物品框
        PuiData.REWARD_BG1 = "REWARD_BG1"; //46*46主界面物品背景
        PuiData.SKILL_BG68 = "SKILL_BG68"; //68*68技能背景
        PuiData.SKILL_BG58 = "SKILL_BG58"; //58*58技能背景
        PuiData.BG6 = "BG6"; //通用背景6
        PuiData.Slist_nselect = "Slist_nselect"; //未选中边框
        PuiData.Slist_select = "Slist_select"; //选中边框
        PuiData.TXTBG = "TXTBG"; //文本底框
        PuiData.ARROW_TOP = "ARROW_TOP"; //上箭头
        PuiData.ARROW_RIGHT = "ARROW_RIGHT"; //右箭头
        PuiData.MASK = "MASK"; //遮罩
        PuiData.BTNADD = "BTNADD"; //添加按钮
        PuiData.BOSSBG76 = "BOSSBG76"; //boss头像底框76*76
        PuiData.BOSSBG64 = "BOSSBG64"; //boss头像底框64*64
        PuiData.CIRCL74 = "CIRCL74"; //圆形头像选中框
        PuiData.LISTITEMBG = "LISTITEMBG"; //slist条纹底
        PuiData.ADDITEM = "ADDITEM"; //加号35*35
        PuiData.HASSEL = "HASSEL"; //已放入背景27*27 .9
        PuiData.SKILL_LEV_BG = "SKILL_LEV_BG"; //技能等级背景53*18 
        PuiData.TITLEBG = "TITLEBG"; //称号背景40*35 .9
        PuiData.TITLEHIGHT = "TITLEHIGHT"; //称号选中46*45 .9
        PuiData.NEWLISTITEMBG = "NEWLISTITEMBG"; //新的item背景 随意拉伸
        PuiData.CHATBG = "CHATBG"; //聊天背景底框 .9
        PuiData.ITEMBIGBG = "ITEMBIGBG"; //底框 .9
        PuiData.I1bg_2 = "I1bg_2"; //福利底框 .9
        PuiData.I1bg_1 = "I1bg_1"; //福利底框 .9
        PuiData.ARROWUP = "ARROWUP"; //上箭头
        PuiData.ARROWDOWN = "ARROWDOWN"; //下箭头   
        PuiData.A_EQULEVBG = "A_EQULEVBG"; //品阶底41*17   
        PuiData.DISABLE = "DISABLE"; //不可用23*23  
        PuiData.EQUBG = "EQUBG"; //道具框粉色背景10*10
        PuiData.RESLISTBG = "RESLISTBG"; //资源获取背景10*10
        PuiData.A_CARD_C = "A_CARD_C"; //采集图标
        PuiData.A_CARD_G = "A_CARD_G"; //怪物图标
        PuiData.A_CARD_B = "A_CARD_B"; //押镖图标
        PuiData.RESBG = "RESBG"; //资源获取list背景
        PuiData.STATEUP_LISTBG = "STATEUP_LISTBG"; //境界突破list背景124*53
        PuiData.A_LEAGUELISTBG = "A_LEAGUELISTBG"; //联赛list背景76*33
        PuiData.TEAMLISTBG = "TEAMLISTBG"; //队伍list背景54*51 22*20 
        PuiData.A_JJ0 = "A_JJ0"; //境界提头
        PuiData.A_JJ1 = "A_JJ1"; //境界提头
        PuiData.A_JJ2 = "A_JJ2"; //境界提头
        PuiData.A_JJ3 = "A_JJ3"; //境界提头
        PuiData.A_JJ4 = "A_JJ4"; //境界提头
        PuiData.A_JJ5 = "A_JJ5"; //境界提头
        PuiData.A_JJ6 = "A_JJ6"; //境界提头
        PuiData.A_JJ7 = "A_JJ7"; //境界提头
        PuiData.A_JJ8 = "A_JJ8"; //境界提头
        PuiData.A_JJ9 = "A_JJ9"; //境界提头
        PuiData.A_JJ10 = "A_JJ10"; //境界提头
        return PuiData;
    }());
    Pan3d.PuiData = PuiData;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=PuiData.js.map