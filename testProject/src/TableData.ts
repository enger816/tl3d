function traceNoTabelData(): void {
    throw new Error("数据表无");
}
module tb {

    export class TB_skill_effect {
        public ID: number;
        public action: string;
        public frame: Array<number>;
        public att_type: number;
        public ballistic: number;
        public effect_id: number;
        public damage_section: Array<number>;

        public static get_TB_skill_effectById($id: number): TB_skill_effect {
            var $obj: any = TableData.getInstance().getData(TableData.tb_skill_effect, $id)
            var $vo: TB_skill_effect = $obj as TB_skill_effect
            return $vo;
        }

        public static get_TB_skill_effect($selectkey: string = null, $selectValue: string = null): Array<TB_skill_effect> {
            var $arr: Array<TB_skill_effect> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_skill_effect)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_skill_effect = $obj.data[$key] as TB_skill_effect
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_skill_effect = $obj.data[$key] as TB_skill_effect
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }


    export class TB_map {
        public ID: number;
        public map_id: string;
        public turnstate: number;
        public mlocal_monster: Array<Array<number>>;
        public formula: Array<number>;
        public scope: Array<number>;
        public amp: Array<number>;
        public mlocal_boss: Array<Array<number>>;
        public mlocal_god: Array<Array<number>>;
        public mskilldot: Array<Array<number>>;
        public mcamera: Array<Array<number>>;
        public blocal_monster: Array<Array<number>>;
        public blocal_god: Array<Array<number>>;
        public bskilldot: Array<Array<number>>;
        public bcamera: Array<Array<number>>;

        public static get_TB_map_ById(id: number): TB_map {
            let $obj: TB_map = <TB_map>TableData.getInstance().getData(TableData.tb_map, id);
            return $obj;
        }

        public static get_TB_map($selectkey: string = null, $selectValue: string = null): Array<TB_map> {
            var $arr: Array<TB_map> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_map)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_map = $obj.data[$key] as TB_map
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_map = $obj.data[$key] as TB_map
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    export class TB_testeffects {
        public ID: number;
        public beizhu: string;

        public static get_TB_testeffects($selectkey: string = null, $selectValue: string = null): Array<TB_testeffects> {
            var $arr: Array<TB_testeffects> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_testeffects)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_testeffects = $obj.data[$key] as TB_testeffects
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_testeffects = $obj.data[$key] as TB_testeffects
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    export class TB_testrole {
        public ID: number;
        public beizhu: string;

        public static get_TB_testrole($selectkey: string = null, $selectValue: string = null): Array<TB_testrole> {
            var $arr: Array<TB_testrole> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_testrole)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_testrole = $obj.data[$key] as TB_testrole
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_testrole = $obj.data[$key] as TB_testrole
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

}
class ResTabelVo {
    public name: string;
    public field: Array<string>;
    public typs: Array<string>;
    public data: Object;
    public size: number = 0;
    public maxId: number = 0;
    public constructor() {
    }
    public parseTable($name: string, $typs: string, $field: string, $data: string): void {

        this.name = $name;
        this.field = [];
        if ($field) {
            this.field = $field.split(",");
        }
        this.typs = [];
        if ($typs) {
            this.typs = $typs.split(",");
        }
        var lines: Array<string> = $data.split(String.fromCharCode(1));

        var tw: number = this.field.length;
        var th: number = lines.length / tw;  //行数
        var id: number = 0;
        this.data = new Object;
        var maxId: number = 0;


        for (var i: number = 0; i < th; i++) {
            //   var $celarr: Array<string> = new Array;
            let cls: any = TableData.mapCls[$name];
            let obj: any = cls ? new cls : new Object; //映射到指定的类或者
            for (var j: number = 0; j < tw; j++) {
                var $str: string = lines[id]
                //      $celarr.push(tempCell);
                switch (this.typs[j]) {
                    case "int":
                    case "float":
                        obj[this.field[j]] = Number($str);
                        break;
                    case "bool":
                        obj[this.field[j]] = $str == "1";
                        break;
                    case "string":
                        obj[this.field[j]] = $str;
                        break;
                    case "array":
                        obj[this.field[j]] = this.parseAry($str);
                        break;
                    case "array2":
                        obj[this.field[j]] = this.parseAry2($str);
                        break;
                    default:
                        obj[this.field[j]] = $str;
                        break;
                }
                id++;
            }
            this.data[obj.ID] = obj;
            if (obj.ID > maxId) {
                maxId = obj.ID;
            }
        }

        this.size = th;
        this.maxId = maxId;

    }

    private parseAry($str: string): Array<any> {
        $str = ($str + "").replace(/，/g, ",");//为了防止策划误填，先进行转换
        $str = $str.trim();
        if ($str === "") return null;
        var tempArr = $str.split(",");
        var arr = [];
        for (var i = 0, li = tempArr.length; i < li; i++) {
            var v = tempArr[i].trim();
            arr.push(!isNaN(Number(v)) ? Number(v) : v);
        }
        if (tempArr.length === 1 && arr[0] == 0) {
            arr = [];
        }
        return arr;

    }

    private parseAry2($str: string) {
        $str = ($str + "").replace(/，/g, ",");//为了防止策划误填，先进行转换
        $str = ($str + "").replace(/},/g, ";").replace(/{/g, "").replace(/}/g, "");
        $str = $str.trim();
        if ($str === "") return null;
        var arr = [];
        var tempArr0 = $str.split(";");
        for (var i = 0, li = tempArr0.length; i < li; ++i) {
            var strI = tempArr0[i].trim();
            if (strI === "") {
                continue;
            }

            // var tempArr1 = strI.split(",");
            // var arr1 = [];
            // for (var j = 0, lj = tempArr1.length; j < lj; j++) {
            //     var v = tempArr1[j].trim();
            //     arr1.push(v);
            // }
            // arr.push(arr1);
            arr.push(this.parseAry(strI));
        }
        // if (tempArr0.length === 1 && arr[0].length === 1 && arr[0][0] == 0) {
        //     arr = [];
        // }
        if (tempArr0.length === 1 && arr[0].length === 0) {
            arr = [];
        }
        return arr;

    }

    public getDataByID($id: number): Object {
        return this.data[$id];
    }




}
class TableData {
    private static _instance: TableData;
    public static getInstance(): TableData {
        if (!this._instance) {
            this._instance = new TableData();
        }
        return this._instance;
    }

    public static tb_hud: string = "tb_hud";
    public static tb_sys_open: string = "tb_sys_open";
    public static tb_role: string = "tb_role";
    public static tb_god: string = "tb_god";
    public static tb_skin: string = "tb_skin";
    public static tb_god_set: string = "tb_god_set";
    public static tb_god_employ_set: string = "tb_god_employ_set";
    public static tb_awaken_conditions: string = "tb_awaken_conditions";
    public static tb_god_awaken: string = "tb_god_awaken";
    public static tb_star_title: string = "tb_star_title";
    public static tb_msgCode: string = "tb_msgCode";
    public static tb_game_set: string = "tb_game_set";
    public static tb_skill: string = "tb_skill";
    public static tb_sub_skill: string = "tb_sub_skill";
    public static tb_effect: string = "tb_effect";
    public static tb_buff: string = "tb_buff";
    public static tb_skill_effect: string = "tb_skill_effect";
    public static tb_buff_effect: string = "tb_buff_effect";
    public static tb_copy: string = "tb_copy";
    public static tb_copy_info: string = "tb_copy_info";
    public static tb_plot: string = "tb_plot";
    public static tb_daily_copy: string = "tb_daily_copy";
    public static tb_expedition: string = "tb_expedition";
    public static tb_copy_set: string = "tb_copy_set";
    public static tb_item: string = "tb_item";
    public static tb_monster: string = "tb_monster";
    public static tb_god_evolution: string = "tb_god_evolution";
    public static tb_god_star: string = "tb_god_star";
    public static tb_wish: string = "tb_wish";
    public static tb_wish_set: string = "tb_wish_set";
    public static tb_task: string = "tb_task";
    public static tb_task_title: string = "tb_task_title";
    public static tb_daily: string = "tb_daily";
    public static tb_daily_reward: string = "tb_daily_reward";
    public static tb_market: string = "tb_market";
    public static tb_market_set: string = "tb_market_set";
    public static tb_god_level: string = "tb_god_level";
    public static tb_god_resolve: string = "tb_god_resolve";
    public static tb_god_fate: string = "tb_god_fate";
    public static tb_fusion_soul: string = "tb_fusion_soul";
    public static tb_evaluation: string = "tb_evaluation";
    public static tb_random_name: string = "tb_random_name";
    public static tb_rune_suit: string = "tb_rune_suit";
    public static tb_rune: string = "tb_rune";
    public static tb_rune_prefix: string = "tb_rune_prefix";
    public static tb_rune_strength: string = "tb_rune_strength";
    public static tb_rune_set: string = "tb_rune_set";
    public static tb_arena_npc: string = "tb_arena_npc";
    public static tb_rank_score: string = "tb_rank_score";
    public static tb_arena_rank: string = "tb_arena_rank";
    // public static tb_arena_set: string = "tb_arena_set";
    public static tb_goods: string = "tb_goods";
    public static tb_trial: string = "tb_trial";
    public static tb_guild: string = "tb_guild";
    public static tb_guild_icon: string = "tb_guild_icon";
    public static tb_guild_skill: string = "tb_guild_skill";
    public static tb_guild_sign: string = "tb_guild_sign";
    public static tb_guild_set: string = "tb_guild_set";
    public static tb_guild_donate: string = "tb_guild_donate";
    public static tb_guild_copy: string = "tb_guild_copy";
    public static tb_copy_reward: string = "tb_copy_reward";
    public static tb_exchange: string = "tb_exchange";
    public static tb_first_recharge: string = "tb_first_recharge";
    public static tb_level: string = "tb_level";
    public static tb_day_sign: string = "tb_day_sign";
    public static tb_total_sign: string = "tb_total_sign";
    public static tb_sevendays: string = "tb_sevendays";
    public static tb_sevendays_time: string = "tb_sevendays_time";
    public static tb_thew: string = "tb_thew";
    public static tb_arena_new: string = "tb_arena_new";
    public static tb_arena_new_npc: string = "tb_arena_new_npc";
    public static tb_arena_draw: string = "tb_arena_draw";
    public static tb_arena_new_set: string = "tb_arena_new_set";
    public static tb_recharge: string = "tb_recharge";
    public static tb_vip: string = "tb_vip";
    public static tb_month_card: string = "tb_month_card";
    public static tb_vip_privilege: string = "tb_vip_privilege";
    public static tb_vip_desc: string = "tb_vip_desc";
    public static tb_escort_set: string = "tb_escort_set";
    public static tb_escort: string = "tb_escort";
    public static tb_adventure: string = "tb_adventure";
    public static tb_adventure_set: string = "tb_adventure_set";
    public static tb_forest: string = "tb_forest";
    public static tb_forest_set: string = "tb_forest_set";
    public static tb_island_set: string = "tb_island_set";
    public static tb_island_level: string = "tb_island_level";
    public static tb_island: string = "tb_island";
    public static tb_worldboss: string = "tb_worldboss";
    public static tb_boss_set: string = "tb_boss_set";
    public static tb_mail: string = "tb_mail";
    public static tb_equip_strength = "tb_equip_strength";
    public static tb_strength_suit = "tb_strength_suit";
    public static tb_refine_suit = "tb_refine_suit";
    public static tb_equip_suit = "tb_equip_suit";
    public static tb_equip_refine = "tb_equip_refine";
    public static tb_equip_recycle = "tb_equip_recycle";
    public static tb_equip_set = "tb_equip_set";
    public static tb_gemstone = "tb_gemstone";
    public static tb_accessory = "tb_accessory";
    public static tb_accessory_suit = "tb_accessory_suit";
    public static tb_accessory_set = "tb_accessory_set";
    public static tb_level_fund = "tb_level_fund";
    public static tb_operate_activity = "tb_operate_activity";
    public static tb_risk_set = "tb_risk_set";
    public static tb_activity_set = "tb_activity_set";
    public static tb_model_dialogue = "tb_model_dialogue";
    public static tb_risk = "tb_risk";
    public static tb_question = "tb_question";
    public static tb_activity_sevendays = "tb_activity_sevendays";
    public static tb_limit_time = "tb_limit_time";
    public static tb_summon_rank = "tb_summon_rank";
    public static tb_summon_box = "tb_summon_box"
    public static tb_group_buying_time = "tb_group_buying_time";
    public static tb_group_buying = "tb_group_buying";
    public static tb_divinity_door = "tb_divinity_door";
    public static tb_divinity_set = "tb_divinity_set";
    public static tb_sevendays_reward = "tb_sevendays_reward";
    public static tb_baptize = "tb_baptize";
    public static tb_artifact = "tb_artifact";
    public static tb_artifact_strength = "tb_artifact_strength";
    public static tb_artifact_enchant = "tb_artifact_enchant";
    public static tb_artifact_baptize = "tb_artifact_baptize";
    public static tb_artifact_obtain = "tb_artifact_obtain";
    public static tb_artifact_skill = "tb_artifact_skill";
    public static tb_artifact_set = "tb_artifact_set";
    public static tb_divinity_replace = "tb_divinity_replace";
    public static tb_version = "tb_version";
    public static tb_notice = "tb_notice";
    public static tb_exchange_set = "tb_exchange_set";
    public static tb_gold_exchange = "tb_gold_exchange";
    public static tb_map = "tb_map";
    public static tb_testeffects = "tb_testeffects";
    public static tb_testrole = "tb_testrole";
    public static tb_shield = "tb_shield";
    public static tb_recommend_squad = "tb_recommend_squad";
    public static tb_dan = "tb_dan";
    public static tb_person_season = "tb_person_season";
    public static tb_guild_season = "tb_guild_season";
    public static tb_guild_war_set = "tb_guild_war_set";
    public static tb_luck_artifact = "tb_luck_artifact";
    public static tb_luck_artifact_time = "tb_luck_artifact_time";
    public static tb_luck_god = "tb_luck_god";
    public static tb_luck_god_time = "tb_luck_god_time";
    public static tb_luck_equip = "tb_luck_equip";
    public static tb_luck_equip_time = "tb_luck_equip_time";
    public static tb_luck_equip_reward = "tb_luck_equip_reward";
    public static tb_recharge_sign = "tb_recharge_sign";
    public static tb_share = "tb_share";
    public static tb_online = "tb_online";
    public static tb_openservice = "tb_openservice";
    public static tb_fight_rank = "tb_fight_rank";
    public static tb_activity_time = "tb_activity_time";
    public static tb_honour = "tb_honour";
    public static tb_honour_reward = "tb_honour_reward";
    public static tb_honour_set = "tb_honour_set";
    public static tb_match = "tb_match";
    public static tb_match_score = "tb_match_score";
    public static tb_match_set = "tb_match_set";
    public static tb_match_box = "tb_match_box";
    public static tb_copy_config = "tb_copy_config";
    public static tb_fight_goddomain = "tb_fight_goddomain";
    public static tb_fight_goddomain_reward = "tb_fight_goddomain_reward";
    public static tb_fight_goddomain_set = "tb_fight_goddomain_set";
    public static tb_rank_type = "tb_rank_type";
    public static tb_growth_guide = "tb_growth_guide";
    public static tb_rank_reward = "tb_rank_reward";
    public static tb_function = "tb_function";
    public static tb_fund = "tb_fund";
    public static tb_fund_reward = "tb_fund_reward";
    public static tb_openservice_gift = "tb_openservice_gift";
    public static tb_gift_time = "tb_gift_time";
    public static tb_optional = "tb_optional";
    public static tb_daily_rechange = "tb_daily_rechange";
    public static tb_chat_quick = "tb_chat_quick";
    static mapCls: Object = {
    };

    public constructor() {
        this.tb = new Object;
    }


    public loadGameData(tbUrl: string, $fun: Function = null, $progessFun: Function = null): void {
        this._completeFun = $fun;
        this._progessFun = $progessFun;
        Pan3d.LoadManager.getInstance().load(tbUrl, Pan3d.LoadManager.XML_TYPE, ($str: any) => {
            this.parseLineByStr($str);
        });
    }

    public tb: Object;
    private _lines: Array<string>;
    private _iter: number = 0;
    private _count: number = 0;
    private _progessFun: Function;
    private _completeFun: Function;
    private parseLineByStr($str: string): void {
        this._lines = $str.split(String.fromCharCode(13));
        this._count = this._lines.length / 4;
        Laya.timer.frameLoop(1, this, this.loopAnlysi);
    }

    //异步解析配置表
    private loopAnlysi(): void  {
        var i = 3;
        while (i > 0)  {
            i--;
            if (this._iter >= this._count) {
                if (this._completeFun) {
                    this._completeFun();
                    this._completeFun = null;
                    this._progessFun = null;
                }
                return;
            }
            if (this._progessFun) {
                this._progessFun(this._iter / this._count);
            }
            var $name: string = this._lines[this._iter * 4 + 0];
            var $field: string = this._lines[this._iter * 4 + 1];
            var $typs: string = this._lines[this._iter * 4 + 2];
            var $data: string = this._lines[this._iter * 4 + 3];
            var vo: ResTabelVo = new ResTabelVo();
            vo.parseTable($name, $typs, $field, $data);
            this.tb[$name] = vo;
            this._iter++;
        }

    }

    public getData($tbName: string, $id: number): Object {
        if (this.tb[$tbName]) {
            //logdebug(this.tb[$tbName].getDataByID($id));
            return this.tb[$tbName].getDataByID($id);
        }
        return null;
    }

    public getTabSize($tbName: string): number {
        if (this.tb[$tbName]) {
            return this.tb[$tbName].size;
        }
        return 0;
    }
    public getTabMaxID($tbName: string): number {
        if (this.tb[$tbName]) {
            return this.tb[$tbName].maxId;
        }
        return 0;
    }
    public getTableByName($tbName: string): any {
        if (this.tb[$tbName]) {
            return this.tb[$tbName]
        }
        return null;
    }
}