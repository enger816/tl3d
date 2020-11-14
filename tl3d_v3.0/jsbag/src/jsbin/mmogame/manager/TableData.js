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
function traceNoTabelData() {
    //console.log("数据表无")
    throw new Error("数据表无");
}
var tb;
(function (tb) {
    var SkillLevelVo = /** @class */ (function () {
        function SkillLevelVo() {
        }
        return SkillLevelVo;
    }());
    tb.SkillLevelVo = SkillLevelVo;
    var TB_item_template = /** @class */ (function () {
        function TB_item_template($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.info = $obj.info;
            this.output_info = $obj.output_info;
            this.zhuangbility = $obj.zhuangbility;
            this.icon = $obj.icon;
            this.avatar = $obj.avatar;
            this.level = $obj.level;
            this.money_type = $obj.money_type;
            this.rank = $obj.rank;
            this.bind_type = $obj.bind_type;
            this.type = $obj.type;
            this.type_c = $obj.type_c;
            this.type_name = $obj.type_name;
            this.pos = $obj.pos;
            this.quality = $obj.quality;
            this.sex = $obj.sex;
            this.price = $obj.price;
            this.is_transaction = $obj.is_transaction;
            this.max_overlap = $obj.max_overlap;
            this.Auto = $obj.Auto;
            this.is_slather = $obj.is_slather;
            this.output = new Array;
            makeArray($obj.output, this.output);
            this.use_result = $obj.use_result;
            this.isdoubleclick = $obj.isdoubleclick;
            this.double_click = new Array;
            makeArray($obj.double_click, this.double_click);
            this.basic_properties = new Array;
            makeArray($obj.basic_properties, this.basic_properties);
            this.suit_id = new Array;
            makeArray($obj.suit_id, this.suit_id);
            this.using_effect = new Array;
            makeArray($obj.using_effect, this.using_effect);
            this.category = $obj.category;
            this.category_cooldown = $obj.category_cooldown;
            this.cooldown = $obj.cooldown;
            this.goods_id = $obj.goods_id;
            this.arrange = $obj.arrange;
            this.expend_data = $obj.expend_data;
            this.use_object = $obj.use_object;
            this.quest = $obj.quest;
            this.forge_pro_max = new Array;
            makeArray($obj.forge_pro_max, this.forge_pro_max);
            this.forge_pro = new Array;
            makeArray($obj.forge_pro, this.forge_pro);
            this.is_auction = $obj.is_auction;
            this.auction_money = $obj.auction_money;
            this.out_bag = $obj.out_bag;
            this.suitId = $obj.suitId;
            this.realmbreak_level = $obj.realmbreak_level;
            this.handInReward = new Array;
            makeArray($obj.handInReward, this.handInReward);
            this.exchangeCost = new Array;
            makeArray($obj.exchangeCost, this.exchangeCost);
            this.destroyReward = $obj.destroyReward;
            if (!this.avatar) {
                this.avatar = this.id;
            }
        }
        TB_item_template.get_TB_item_template = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_item_template, $id);
            return new TB_item_template($obj);
        };
        TB_item_template.getAvatarById = function ($id) {
            if ($id == 0) {
                return 0;
            }
            return this.get_TB_item_template($id).avatar;
        };
        TB_item_template.prototype.getColorName = function () {
            var $str = "[" + tb.TB_item_quality_color.getTempVo(this.quality).color + "]";
            //console.log("--------颜色---------",$str);
            return $str + this.name;
        };
        return TB_item_template;
    }());
    tb.TB_item_template = TB_item_template;
    var SkillLearnVo = /** @class */ (function () {
        function SkillLearnVo() {
        }
        SkillLearnVo.prototype.parse = function ($obj) {
            this.playerLevel = $obj.playerLevel;
            this.questid = $obj.questid;
            this.Pre_skill = $obj.Pre_skill;
            this.item = new Array;
            makeArray($obj.item, this.item);
            this.resource = new Array;
            makeArray($obj.resource, this.resource);
        };
        return SkillLearnVo;
    }());
    tb.SkillLearnVo = SkillLearnVo;
    var TB_restore_potion_base = /** @class */ (function () {
        function TB_restore_potion_base($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.cd = $obj.cd;
        }
        TB_restore_potion_base.get_TB_restore_potion_base = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_restore_potion_base, $id);
            var $vo = new TB_restore_potion_base($obj);
            return $vo;
        };
        return TB_restore_potion_base;
    }());
    tb.TB_restore_potion_base = TB_restore_potion_base;
    var TB_item_output = /** @class */ (function () {
        function TB_item_output($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.npc = $obj.npc;
            this.name = $obj.name;
            this.output = new Array;
            makeArray($obj.output, this.output);
        }
        TB_item_output.get_TB_item_output = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_item_output, $id);
            var $vo = new TB_item_output($obj);
            //console.log("----id---",$id,$vo);
            return $vo;
        };
        return TB_item_output;
    }());
    tb.TB_item_output = TB_item_output;
    var TB_skill_uplevel = /** @class */ (function () {
        function TB_skill_uplevel($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.distance = $obj.distance;
            this.mcd = $obj.mcd;
            this.num = $obj.num;
            this.hurt_percent = $obj.hurt_percent;
            this.cannot_defence_hure = $obj.cannot_defence_hure;
            this.fight_value = $obj.fight_value;
            this.uplevel_item = new Array;
            makeArray($obj.uplevel_item, this.uplevel_item);
            this.need_level = $obj.need_level;
            this.uplevel_cost = new Array;
            makeArray($obj.uplevel_cost, this.uplevel_cost);
        }
        TB_skill_uplevel.get_TB_skill_uplevel = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_skill_uplevel, $id);
            var $vo = new TB_skill_uplevel($obj);
            return $vo;
        };
        return TB_skill_uplevel;
    }());
    tb.TB_skill_uplevel = TB_skill_uplevel;
    var TB_world_map = /** @class */ (function () {
        function TB_world_map($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.mapid = $obj.mapid;
            this.x = $obj.x;
            this.y = $obj.y;
            this.info = $obj.info;
        }
        TB_world_map.getItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_world_map);
            for (var $key in $obj.data) {
                var $vo = new TB_world_map($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_world_map.getTempVo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_world_map, $id);
            var $vo = new TB_world_map($obj);
            return $vo;
        };
        return TB_world_map;
    }());
    tb.TB_world_map = TB_world_map;
    var TB_char_info = /** @class */ (function () {
        function TB_char_info($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.avatar = $obj.avatar;
            this.weapon = $obj.weapon;
            this.waiguan = new Array;
            makeArray($obj.waiguan, this.waiguan);
            this.weaponwg = new Array;
            makeArray($obj.weaponwg, this.weaponwg);
            this.waiguantj = new Array;
            makeArray($obj.waiguantj, this.waiguantj);
        }
        TB_char_info.getTempVo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_char_info, $id);
            var $vo = new TB_char_info($obj);
            return $vo;
        };
        return TB_char_info;
    }());
    tb.TB_char_info = TB_char_info;
    var TB_appearance_info = /** @class */ (function () {
        function TB_appearance_info($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.avatar = $obj.avatar;
            this.icon = $obj.icon;
            this.level = $obj.level;
            this.attrKeys = new Array;
            makeArray($obj.attrKeys, this.attrKeys);
            this.attrValues = new Array;
            makeArray($obj.attrValues, this.attrValues);
            this.costs = new Array;
            makeArray($obj.costs, this.costs);
        }
        TB_appearance_info.getItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_appearance_info);
            for (var $key in $obj.data) {
                var $vo = new TB_appearance_info($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_appearance_info.getTempVo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_appearance_info, $id);
            var $vo = new TB_appearance_info($obj);
            return $vo;
        };
        return TB_appearance_info;
    }());
    tb.TB_appearance_info = TB_appearance_info;
    var TB_appearance_pokedex = /** @class */ (function () {
        function TB_appearance_pokedex($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.attrKeys = new Array;
            makeArray($obj.attrKeys, this.attrKeys);
            this.attrValues = new Array;
            makeArray($obj.attrValues, this.attrValues);
            this.exterior = new Array;
            makeArray($obj.exterior, this.exterior);
        }
        TB_appearance_pokedex.getItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_appearance_pokedex);
            for (var $key in $obj.data) {
                var $vo = new TB_appearance_pokedex($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_appearance_pokedex.getTempVo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_appearance_pokedex, $id);
            var $vo = new TB_appearance_pokedex($obj);
            return $vo;
        };
        return TB_appearance_pokedex;
    }());
    tb.TB_appearance_pokedex = TB_appearance_pokedex;
    var TB_meridian_item = /** @class */ (function () {
        function TB_meridian_item($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.itemId = $obj.itemId;
            this.name = $obj.name;
            this.exp = $obj.exp;
            this.goto = $obj.goto;
            this.goto_sub = new Array;
            makeArray($obj.goto_sub, this.goto_sub);
        }
        TB_meridian_item.getItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_meridian_item);
            for (var $key in $obj.data) {
                var $vo = new TB_meridian_item($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_meridian_item.getTempVo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_meridian_item, $id);
            var $vo = new TB_meridian_item($obj);
            return $vo;
        };
        return TB_meridian_item;
    }());
    tb.TB_meridian_item = TB_meridian_item;
    var TB_meridian_source = /** @class */ (function () {
        function TB_meridian_source($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.exp = $obj.exp;
            this.limit = $obj.limit;
            this.goto = new Array;
            makeArray($obj.goto, this.goto);
        }
        TB_meridian_source.getItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_meridian_source);
            for (var $key in $obj.data) {
                var $vo = new TB_meridian_source($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_meridian_source.getTempVo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_meridian_source, $id);
            var $vo = new TB_meridian_source($obj);
            return $vo;
        };
        return TB_meridian_source;
    }());
    tb.TB_meridian_source = TB_meridian_source;
    var TB_meridian_info = /** @class */ (function () {
        function TB_meridian_info($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.costExp = $obj.costExp;
            this.pic = $obj.pic;
            this.costMoney = new Array;
            makeArray($obj.costMoney, this.costMoney);
            //this.currAttr = new Array;
            //makeArray($obj.currAttr, this.currAttr);
            this.attrKeys0 = new Array;
            makeArray($obj.attrKeys0, this.attrKeys0);
            this.attrValues0 = new Array;
            makeArray($obj.attrValues0, this.attrValues0);
            this.attrKeys1 = new Array;
            makeArray($obj.attrKeys1, this.attrKeys1);
            this.attrValues1 = new Array;
            makeArray($obj.attrValues1, this.attrValues1);
            this.attrKeys2 = new Array;
            makeArray($obj.attrKeys2, this.attrKeys2);
            this.attrValues2 = new Array;
            makeArray($obj.attrValues2, this.attrValues2);
            this.pos = new Array;
            makeArray($obj.pos, this.pos);
        }
        TB_meridian_info.prototype.refrishById = function ($id) {
            var $v = Math.floor(($id - 1) / 2);
            if ($v == 0) {
                this.attrKeys = this.attrKeys0;
                this.attrValues = this.attrValues0;
            }
            if ($v == 1) {
                this.attrKeys = this.attrKeys1;
                this.attrValues = this.attrValues1;
            }
            if ($v == 2) {
                this.attrKeys = this.attrKeys2;
                this.attrValues = this.attrValues2;
            }
        };
        TB_meridian_info.getItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_meridian_info);
            for (var $key in $obj.data) {
                var $vo = new TB_meridian_info($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_meridian_info.getTempVo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_meridian_info, $id);
            var $vo = new TB_meridian_info($obj);
            return $vo;
        };
        return TB_meridian_info;
    }());
    tb.TB_meridian_info = TB_meridian_info;
    var TB_group_instance_base = /** @class */ (function () {
        function TB_group_instance_base($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.mapid = $obj.mapid;
            this.name = $obj.name;
            this.info = $obj.info;
            this.need_Num = $obj.need_Num;
            this.recom_force = $obj.recom_force;
            this.map_pic = $obj.map_pic;
            this.monster = new Array;
            makeArray($obj.monster, this.monster);
            this.passRewardId = new Array;
            makeArray($obj.passRewardId, this.passRewardId);
            this.passRewardCnt = new Array;
            makeArray($obj.passRewardCnt, this.passRewardCnt);
            this.fpRewardId = new Array;
            makeArray($obj.fpRewardId, this.fpRewardId);
            this.fpRewardCnt = new Array;
            makeArray($obj.fpRewardCnt, this.fpRewardCnt);
            this.times = $obj.times;
            this.limLev = $obj.limLev;
        }
        TB_group_instance_base.getItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_group_instance_base);
            for (var $key in $obj.data) {
                var $vo = new TB_group_instance_base($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_group_instance_base.getTempVo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_group_instance_base, $id);
            var $vo = new TB_group_instance_base($obj);
            return $vo;
        };
        return TB_group_instance_base;
    }());
    tb.TB_group_instance_base = TB_group_instance_base;
    var TB_group_instance_buy = /** @class */ (function () {
        function TB_group_instance_buy($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.daily_reset = $obj.daily_reset;
            this.buy_type = new Array;
            makeArray($obj.buy_type, this.buy_type);
            this.buy_price = new Array;
            makeArray($obj.buy_price, this.buy_price);
        }
        TB_group_instance_buy.getItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_group_instance_buy);
            for (var $key in $obj.data) {
                var $vo = new TB_group_instance_buy($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_group_instance_buy.getTempVo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_group_instance_buy, $id);
            var $vo = new TB_group_instance_buy($obj);
            return $vo;
        };
        return TB_group_instance_buy;
    }());
    tb.TB_group_instance_buy = TB_group_instance_buy;
    var TB_faction_match_base = /** @class */ (function () {
        function TB_faction_match_base($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.born_2 = new Array;
            makeArray($obj.born_2, this.born_2);
            this.born_1 = new Array;
            makeArray($obj.born_1, this.born_1);
            this.flag_pos = new Array;
            makeArray($obj.flag_pos, this.flag_pos);
        }
        TB_faction_match_base.getItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_faction_match_base);
            for (var $key in $obj.data) {
                var $vo = new TB_faction_match_base($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_faction_match_base.getTempVo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_faction_match_base, $id);
            var $vo = new TB_faction_match_base($obj);
            return $vo;
        };
        return TB_faction_match_base;
    }());
    tb.TB_faction_match_base = TB_faction_match_base;
    var TB_mass_boss_info = /** @class */ (function () {
        function TB_mass_boss_info($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.mapid = $obj.mapid;
            this.bossEntry = $obj.bossEntry;
            this.level = $obj.level;
            this.bossPos = new Array;
            makeArray($obj.bossPos, this.bossPos);
            this.show = new Array;
            makeArray($obj.show, this.show);
            this.props = new Array;
            makeArray($obj.props, this.props);
        }
        TB_mass_boss_info.getItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_mass_boss_info);
            for (var $key in $obj.data) {
                var $vo = new TB_mass_boss_info($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_mass_boss_info.getTempVo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_mass_boss_info, $id);
            var $vo = new TB_mass_boss_info($obj);
            return $vo;
        };
        return TB_mass_boss_info;
    }());
    tb.TB_mass_boss_info = TB_mass_boss_info;
    var TB_mass_boss_base = /** @class */ (function () {
        function TB_mass_boss_base($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.cd = $obj.mapid;
            this.dailytimes = $obj.dailytimes;
        }
        TB_mass_boss_base.getTempVo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_mass_boss_base, $id);
            var $vo = new TB_mass_boss_base($obj);
            return $vo;
        };
        return TB_mass_boss_base;
    }());
    tb.TB_mass_boss_base = TB_mass_boss_base;
    var TB_mass_boss_times = /** @class */ (function () {
        function TB_mass_boss_times($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.cost = new Array;
            makeArray($obj.cost, this.cost);
        }
        TB_mass_boss_times.getItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_mass_boss_times);
            for (var $key in $obj.data) {
                var $vo = new TB_mass_boss_times($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_mass_boss_times.getTempVo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_mass_boss_times, $id);
            var $vo = new TB_mass_boss_times($obj);
            return $vo;
        };
        return TB_mass_boss_times;
    }());
    tb.TB_mass_boss_times = TB_mass_boss_times;
    var TB_anger_limit = /** @class */ (function () {
        function TB_anger_limit(value) {
            if (!value) {
                traceNoTabelData();
            }
            this.id = value.id;
            this.limit = value.limit;
        }
        TB_anger_limit.get_TB_anger_limit = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_anger_limit, $id);
            var $vo = new TB_anger_limit($obj);
            return $vo;
        };
        return TB_anger_limit;
    }());
    tb.TB_anger_limit = TB_anger_limit;
    var TB_item_illusion = /** @class */ (function () {
        function TB_item_illusion($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.divine = $obj.divine;
            this.avatar = $obj.avatar;
            this.skills = new Array;
            makeArray($obj.skills, this.skills);
        }
        TB_item_illusion.get_TB_item_illusion = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_item_illusion, $id);
            var $vo = new TB_item_illusion($obj);
            return $vo;
        };
        return TB_item_illusion;
    }());
    tb.TB_item_illusion = TB_item_illusion;
    var TB_system_guide = /** @class */ (function () {
        function TB_system_guide($obj) {
            if (!$obj) {
                // traceNoTabelData();
                return;
            }
            this.id = $obj.id;
            this.params = $obj.params;
            this.skinName = this.params.split(",")[1];
            this.isMainui = Boolean(Number(this.params.split(",")[0]) == 1);
            this.isfinish = $obj.isfinish;
            this.type = $obj.type;
            this.text = $obj.text;
            this.area = new Array;
            makeArray($obj.area, this.area);
            var $arr = $obj.layout.split(",");
            this.layout = new Object;
            for (var i = 0; i < $arr.length; i++) {
                var dddddd = $arr[i].split(":");
                var $key = trim(dddddd[0]);
                this.layout[$key] = Number(dddddd[1]);
            }
        }
        TB_system_guide.get_TB_system_guide = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_system_guide, $id);
            if ($obj) {
                var $vo = new TB_system_guide($obj);
                return $vo;
            }
            else {
                return null;
            }
        };
        return TB_system_guide;
    }());
    tb.TB_system_guide = TB_system_guide;
    var TB_quest_daily2_base = /** @class */ (function () {
        // id,limit
        // int,int
        function TB_quest_daily2_base($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.dailyLimit = $obj.dailyLimit;
            this.questshow = $obj.questshow;
        }
        TB_quest_daily2_base.getTempVo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_quest_daily2_base, $id);
            var $vo = new TB_quest_daily2_base($obj);
            return $vo;
        };
        return TB_quest_daily2_base;
    }());
    tb.TB_quest_daily2_base = TB_quest_daily2_base;
    var TB_map_field_boss = /** @class */ (function () {
        function TB_map_field_boss($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.indx = $obj.indx;
            this.entry = $obj.entry;
            this.show = new Array;
            makeArray($obj.show, this.show);
        }
        TB_map_field_boss.getItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_map_field_boss);
            for (var $key in $obj.data) {
                var $vo = new TB_map_field_boss($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_map_field_boss.getTempVo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_map_field_boss, $id);
            var $vo = new TB_map_field_boss($obj);
            return $vo;
        };
        return TB_map_field_boss;
    }());
    tb.TB_map_field_boss = TB_map_field_boss;
    var TB_item_slot = /** @class */ (function () {
        function TB_item_slot($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.slot = $obj.slot;
            this.uislot = $obj.uislot;
        }
        TB_item_slot.getItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_item_slot);
            for (var $key in $obj.data) {
                var $vo = new TB_item_slot($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_item_slot.getTempVo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_item_slot, $id);
            if ($obj) {
                var $vo = new TB_item_slot($obj);
                return $vo;
            }
            else {
                return null;
            }
        };
        return TB_item_slot;
    }());
    tb.TB_item_slot = TB_item_slot;
    var TB_quest_daily2_set = /** @class */ (function () {
        // id,limit
        // int,int
        function TB_quest_daily2_set($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.questSet = new Array;
            makeArray($obj.questSet, this.questSet);
            this.rewards = new Array;
            makeArray($obj.rewards, this.rewards);
            this.quality = $obj.quality;
        }
        TB_quest_daily2_set.getTempVo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_quest_daily2_set, $id);
            var $vo = new TB_quest_daily2_set($obj);
            return $vo;
        };
        return TB_quest_daily2_set;
    }());
    tb.TB_quest_daily2_set = TB_quest_daily2_set;
    var TB_quest_daily2_finish_reward = /** @class */ (function () {
        // id,limit
        // int,int
        function TB_quest_daily2_finish_reward($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.rewards = new Array;
            makeArray($obj.rewards, this.rewards);
        }
        TB_quest_daily2_finish_reward.getTempVo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_quest_daily2_finish_reward, $id);
            var $vo = new TB_quest_daily2_finish_reward($obj);
            return $vo;
        };
        return TB_quest_daily2_finish_reward;
    }());
    tb.TB_quest_daily2_finish_reward = TB_quest_daily2_finish_reward;
    var TB_quest_daily2 = /** @class */ (function () {
        // id,limit
        // int,int
        function TB_quest_daily2($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.levelrange = new Array;
            makeArray($obj.levelrange, this.levelrange);
            this.questSet = new Array;
            makeArray($obj.questSet, this.questSet);
            this.questSelectNum = new Array;
            makeArray($obj.questSelectNum, this.questSelectNum);
            this.finishQuestsNum = new Array;
            makeArray($obj.finishQuestsNum, this.finishQuestsNum);
            this.rewardsSelect = new Array;
            makeArray($obj.rewardsSelect, this.rewardsSelect);
            this.allFinishrewards = new Array;
            makeArray($obj.allFinishrewards, this.allFinishrewards);
        }
        TB_quest_daily2.getTempVo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_quest_daily2, $id);
            var $vo = new TB_quest_daily2($obj);
            return $vo;
        };
        return TB_quest_daily2;
    }());
    tb.TB_quest_daily2 = TB_quest_daily2;
    var TB_item_quality_color = /** @class */ (function () {
        function TB_item_quality_color($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.color = $obj.color;
        }
        TB_item_quality_color.getTempVo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_item_quality_color, $id);
            var $vo = new TB_item_quality_color($obj);
            return $vo;
        };
        return TB_item_quality_color;
    }());
    tb.TB_item_quality_color = TB_item_quality_color;
    var TB_quest_daily_base = /** @class */ (function () {
        function TB_quest_daily_base(value) {
            if (!value) {
                traceNoTabelData();
            }
            this.id = value.id;
            this.dailyLimit = value.dailyLimit;
        }
        TB_quest_daily_base.getTempByID = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_quest_daily_base, $id);
            var $vo = new TB_quest_daily_base($obj);
            return $vo;
        };
        return TB_quest_daily_base;
    }());
    tb.TB_quest_daily_base = TB_quest_daily_base;
    var TB_kuafu3v3_month_reward = /** @class */ (function () {
        function TB_kuafu3v3_month_reward($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.score = $obj.score;
            this.title = $obj.title;
            this.type = $obj.type;
            this.reward = new Array();
            makeArray($obj.reward, this.reward);
            this.rewardtype = new Array;
            makeArray($obj.rewardtype, this.rewardtype);
        }
        TB_kuafu3v3_month_reward.getItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_kuafu3v3_month_reward);
            for (var $key in $obj.data) {
                var $vo = new TB_kuafu3v3_month_reward($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_kuafu3v3_month_reward.getTempByID = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_kuafu3v3_month_reward, $id);
            var $vo = new TB_kuafu3v3_month_reward($obj);
            return $vo;
        };
        return TB_kuafu3v3_month_reward;
    }());
    tb.TB_kuafu3v3_month_reward = TB_kuafu3v3_month_reward;
    var TB_map_jump_point_detail = /** @class */ (function () {
        function TB_map_jump_point_detail($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.last = $obj.last;
            this.show = new Array();
            makeArray($obj.show, this.show);
        }
        TB_map_jump_point_detail.getTempByID = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_map_jump_point_detail, $id);
            var $vo = new TB_map_jump_point_detail($obj);
            return $vo;
        };
        return TB_map_jump_point_detail;
    }());
    tb.TB_map_jump_point_detail = TB_map_jump_point_detail;
    var TB_kuafu3v3_week_reward = /** @class */ (function () {
        function TB_kuafu3v3_week_reward($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.reward = new Array();
            makeArray($obj.reward, this.reward);
            this.rank = new Array();
            makeArray($obj.rank, this.rank);
        }
        TB_kuafu3v3_week_reward.getItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_kuafu3v3_week_reward);
            for (var $key in $obj.data) {
                var $vo = new TB_kuafu3v3_week_reward($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_kuafu3v3_week_reward.getTempByID = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_kuafu3v3_week_reward, $id);
            var $vo = new TB_kuafu3v3_week_reward($obj);
            return $vo;
        };
        return TB_kuafu3v3_week_reward;
    }());
    tb.TB_kuafu3v3_week_reward = TB_kuafu3v3_week_reward;
    var TB_kuafu3v3_base = /** @class */ (function () {
        function TB_kuafu3v3_base($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.daytimes = $obj.daytimes;
            this.daybuytimes = $obj.daybuytimes;
            this.daybuycost = new Array();
            makeArray($obj.daybuycost, this.daybuycost);
        }
        TB_kuafu3v3_base.getItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_kuafu3v3_base);
            for (var $key in $obj.data) {
                var $vo = new TB_kuafu3v3_base($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_kuafu3v3_base;
    }());
    tb.TB_kuafu3v3_base = TB_kuafu3v3_base;
    var TB_kuafu3v3_day_reward = /** @class */ (function () {
        function TB_kuafu3v3_day_reward($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.num = $obj.num;
            this.reward = new Array();
            makeArray($obj.reward, this.reward);
        }
        TB_kuafu3v3_day_reward.getItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_kuafu3v3_day_reward);
            for (var $key in $obj.data) {
                var $vo = new TB_kuafu3v3_day_reward($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_kuafu3v3_day_reward.getTempByID = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_kuafu3v3_day_reward, $id);
            var $vo = new TB_kuafu3v3_day_reward($obj);
            return $vo;
        };
        return TB_kuafu3v3_day_reward;
    }());
    tb.TB_kuafu3v3_day_reward = TB_kuafu3v3_day_reward;
    var Tb_rank_reward = /** @class */ (function () {
        function Tb_rank_reward(value) {
            if (!value) {
                traceNoTabelData();
            }
            this.id = value.id;
            this.type = value.type;
            this.rank = value.rank;
            this.reward = value.reward;
            this.title = value.title;
        }
        Tb_rank_reward.getTempByID = function ($type, $rankid) {
            var $id = $type * 10 + $rankid;
            var $obj = TableData.getInstance().getData(TableData.tb_rank_reward, $id);
            var $vo = new Tb_rank_reward($obj);
            return $vo;
        };
        return Tb_rank_reward;
    }());
    tb.Tb_rank_reward = Tb_rank_reward;
    var TB_faction_creat = /** @class */ (function () {
        function TB_faction_creat(value) {
            if (!value) {
                traceNoTabelData();
            }
            this.id = value.id;
            this.cost = new Array;
            makeArray(value.cost, this.cost);
            this.maxnum = value.maxnum;
        }
        TB_faction_creat.getItemById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_faction_creat, $id);
            var $vo = new TB_faction_creat($obj);
            return $vo;
        };
        return TB_faction_creat;
    }());
    tb.TB_faction_creat = TB_faction_creat;
    var Tb_faction_icon = /** @class */ (function () {
        function Tb_faction_icon(value) {
            if (!value) {
                traceNoTabelData();
            }
            this.id = value.id;
            this.icon = value.icon;
        }
        Tb_faction_icon.getTempByID = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_faction_icon);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new Tb_faction_icon($obj.data[$key]);
                $vo.isactivityflag = false;
                $vo.isvisiable = false;
                $arr.push($vo);
            }
            return $arr;
        };
        Object.defineProperty(Tb_faction_icon.prototype, "isactivityflag", {
            get: function () {
                return this.isactivity;
            },
            set: function (value) {
                this.isactivity = value;
            },
            enumerable: true,
            configurable: true
        });
        return Tb_faction_icon;
    }());
    tb.Tb_faction_icon = Tb_faction_icon;
    var Tb_faction_base = /** @class */ (function () {
        function Tb_faction_base(value) {
            if (!value) {
                traceNoTabelData();
            }
            this.id = value.id;
            this.cost = value.cost;
            this.maxnum = value.maxnum;
            this.golddonation = value.golddonation;
            this.ybdonation = value.ybdonation;
            this.shop = value.shop;
            this.token_max_buy = value.token_max_buy;
            this.token_buy_price = new Array;
            makeArray(value.token_buy_price, this.token_buy_price);
            this.token_daily = value.token_daily;
            this.token_max_keep = value.token_max_keep;
            this.token_points = value.token_points;
            this.gift_points_must_reply = value.gift_points_must_reply;
            this.gift_view_rows = value.gift_view_rows;
        }
        Tb_faction_base.get_Tb_faction_base = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_faction_base);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new Tb_faction_base($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        Tb_faction_base.get_Tb_faction_baseById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_faction_base, $id);
            var $vo = new Tb_faction_base($obj);
            return $vo;
        };
        return Tb_faction_base;
    }());
    tb.Tb_faction_base = Tb_faction_base;
    var Tb_faction_zhiwei = /** @class */ (function () {
        function Tb_faction_zhiwei(value) {
            if (!value) {
                traceNoTabelData();
            }
            this.id = value.id;
            this.num = value.num;
            this.reward = value.reward;
            this.info = value.info;
            this.title = value.title;
        }
        Tb_faction_zhiwei.get_Tb_faction_zhiwei = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_faction_zhiwei);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new Tb_faction_zhiwei($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        Tb_faction_zhiwei.get_Tb_faction_zhiweiById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_faction_zhiwei, $id);
            var $vo = new Tb_faction_zhiwei($obj);
            return $vo;
        };
        return Tb_faction_zhiwei;
    }());
    tb.Tb_faction_zhiwei = Tb_faction_zhiwei;
    var Tb_faction_donation = /** @class */ (function () {
        function Tb_faction_donation(value) {
            if (!value) {
                traceNoTabelData();
            }
            this.id = value.id;
            this.devote = value.devote;
            this.money = value.money;
            this.cost = new Array;
            makeArray(value.cost, this.cost);
        }
        Tb_faction_donation.get_Tb_faction_donation = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_faction_donation);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new Tb_faction_donation($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        Tb_faction_donation.get_Tb_faction_donationById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_faction_donation, $id);
            var $vo = new Tb_faction_donation($obj);
            return $vo;
        };
        return Tb_faction_donation;
    }());
    tb.Tb_faction_donation = Tb_faction_donation;
    var Tb_faction_shop = /** @class */ (function () {
        function Tb_faction_shop(value) {
            if (!value) {
                traceNoTabelData();
            }
            this.id = value.id;
            this.itemId = value.itemId;
            this.itemNum = value.itemNum;
            this.num = value.num;
            this.lev = value.lev;
            this.costResource = new Array;
            makeArray(value.costResource, this.costResource);
            this.discount_flag = value.discount_flag;
        }
        Tb_faction_shop.get_Tb_faction_shop = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_faction_shop);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new Tb_faction_shop($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        Tb_faction_shop.get_Tb_faction_shopById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_faction_shop, $id);
            var $vo = new Tb_faction_shop($obj);
            return $vo;
        };
        return Tb_faction_shop;
    }());
    tb.Tb_faction_shop = Tb_faction_shop;
    var TB_skill_base = /** @class */ (function () {
        function TB_skill_base($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.desc = $obj.desc;
            this.info = $obj.info;
            this.icon = $obj.icon;
            this.is_initiative = $obj.is_initiative;
            this.skill_type = $obj.skill_type;
            this.type = $obj.type;
            this.target_type = $obj.target_type;
            this.pre = $obj.pre;
            this.is_end = $obj.is_end;
            this.follow = new Array;
            makeArray($obj.follow, this.follow);
            this.time_change = new Array;
            makeArray($obj.time_change, this.time_change);
            this.singleCD = $obj.singleCD;
            this.groupCD = $obj.groupCD;
            this.self_cd = $obj.self_cd;
            this.group = $obj.group;
            this.uplevel_id = new Array;
            makeArray($obj.uplevel_id, this.uplevel_id);
            this.magic_type = $obj.magic_type;
            this.nuqi_change = $obj.nuqi_change;
            this.attack_mast = new Array;
            makeArray($obj.attack_mast, this.attack_mast);
            this.is_fix = $obj.is_fix;
            this.effect_file = $obj.effect_file;
            this.effect = $obj.effect;
            this.isOrbit = $obj.isOrbit;
            this.condition_skill = $obj.condition_skill;
            this.study_requirement = $obj.study_requirement;
            this.alarmEffect = $obj.alarmEffect;
            this.can_move = $obj.can_move;
            this.is_remain = $obj.is_remain;
            this.is_play_forbid = $obj.is_play_forbid;
            this.lock_type = $obj.lock_type;
            this.timeout = $obj.timeout;
            this.specialtype = $obj.specialtype;
        }
        TB_skill_base.get_TB_skill_base = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_skill_base, $id);
            var $vo = new TB_skill_base($obj);
            return $vo;
        };
        return TB_skill_base;
    }());
    tb.TB_skill_base = TB_skill_base;
    //坐骑基本属性
    var TB_mount_base_vo = /** @class */ (function () {
        // public activation: boolean;//是否激活
        // public current: boolean;  //是否为当前阶
        // public needExp: number;//一星到下一星培养需要总经验
        // public prosItem: Array<any>  //存放当前属性数据;
        // public nextprosItem: Array<any>  //存放下一属性数据;
        // public combatNum: number  //战斗力;
        function TB_mount_base_vo($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.mountID = $obj.mountID;
            this.addTrainExp = $obj.addTrainExp;
            this.speed = $obj.speed;
            this.skills = new Array;
            makeArray($obj.skills, this.skills);
        }
        TB_mount_base_vo.get_TB_mount_base_vo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_mount_base, $id);
            var $vo = new TB_mount_base_vo($obj);
            return $vo;
        };
        TB_mount_base_vo.getItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_mount_base);
            for (var $key in $obj.data) {
                var $vo = new TB_mount_base_vo($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_mount_base_vo;
    }());
    tb.TB_mount_base_vo = TB_mount_base_vo;
    var TB_quest_chapter = /** @class */ (function () {
        function TB_quest_chapter($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.items = new Array;
            makeArray($obj.items, this.items);
        }
        TB_quest_chapter.get_TB_quest_chapter = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_quest_chapter, $id);
            var $vo = new TB_quest_chapter($obj);
            return $vo;
        };
        return TB_quest_chapter;
    }());
    tb.TB_quest_chapter = TB_quest_chapter;
    var TB_risk_chapter = /** @class */ (function () {
        function TB_risk_chapter($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.icon = $obj.icon;
            this.iconpos = new Array;
            makeArray($obj.iconpos, this.iconpos);
        }
        TB_risk_chapter.getItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_risk_chapter);
            for (var $key in $obj.data) {
                var $vo = new TB_risk_chapter($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_risk_chapter.get_TB_risk_chapter = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_risk_chapter, $id);
            var $vo = new TB_risk_chapter($obj);
            return $vo;
        };
        return TB_risk_chapter;
    }());
    tb.TB_risk_chapter = TB_risk_chapter;
    var TB_risk_menu = /** @class */ (function () {
        function TB_risk_menu($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.count = $obj.count;
        }
        TB_risk_menu.get_TB_risk_menu = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_risk_menu, $id);
            var $vo = new TB_risk_menu($obj);
            return $vo;
        };
        return TB_risk_menu;
    }());
    tb.TB_risk_menu = TB_risk_menu;
    var TB_risk_data = /** @class */ (function () {
        function TB_risk_data($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.mapid = $obj.mapid;
            this.name = $obj.name;
            this.nextId = $obj.nextId;
            this.advisepoint = $obj.advisepoint;
            this.parentid = $obj.parentid;
            this.bossId = $obj.bossId;
            this.suitScore = $obj.suitScore;
            this.suitScoreChange = $obj.suitScoreChange;
            this.level = $obj.level;
            this.goldReward = new Array;
            makeArray($obj.goldReward, this.goldReward);
            this.expReward = new Array;
            makeArray($obj.expReward, this.expReward);
            this.showitems = new Array;
            makeArray($obj.showitems, this.showitems);
            this.chapterId = Math.floor((this.id % 1000000) / 1000);
            this.cardId = Math.floor(this.id % 1000);
            this.bossmap = Math.floor(this.id / 1000000);
        }
        TB_risk_data.get_TB_risk_data = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_risk_data, $id);
            var $vo = new TB_risk_data($obj);
            return $vo;
        };
        return TB_risk_data;
    }());
    tb.TB_risk_data = TB_risk_data;
    var TB_risk_base = /** @class */ (function () {
        function TB_risk_base($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.firstSection = $obj.firstSection;
        }
        TB_risk_base.get_TB_risk_base = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_risk_base, $id);
            var $vo = new TB_risk_base($obj);
            return $vo;
        };
        return TB_risk_base;
    }());
    tb.TB_risk_base = TB_risk_base;
    /**
     * 挂机品质选择表数据
     */
    var TB_hook_quality_Vo = /** @class */ (function () {
        function TB_hook_quality_Vo($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.quality = $obj.quality;
            this.text = $obj.text;
        }
        return TB_hook_quality_Vo;
    }());
    tb.TB_hook_quality_Vo = TB_hook_quality_Vo;
    /**
     * 挂机血瓶种类表数据
     */
    var TB_hook_hp_item_Vo = /** @class */ (function () {
        function TB_hook_hp_item_Vo($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.items = new Array;
            makeArray($obj.items, this.items);
        }
        TB_hook_hp_item_Vo.get_TB_hook_hp_item_Vo = function ($id) {
            var $upgradeobj = TableData.getInstance().getData(TableData.tb_hook_hp_item, $id);
            var $vo = new TB_hook_hp_item_Vo($upgradeobj);
            return $vo;
        };
        return TB_hook_hp_item_Vo;
    }());
    tb.TB_hook_hp_item_Vo = TB_hook_hp_item_Vo;
    /*
    *坐骑升星表
    */
    var TB_mount_train_vo = /** @class */ (function () {
        function TB_mount_train_vo($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.level = $obj.level;
            this.star = $obj.star;
            this.exp = $obj.exp;
            this.prosKeys = new Array;
            makeArray($obj.prosKeys, this.prosKeys);
            this.prosValues = new Array;
            makeArray($obj.prosValues, this.prosValues);
            this.traincost = new Array;
            makeArray($obj.traincost, this.traincost);
        }
        TB_mount_train_vo.getTB_mount_train_vo = function ($level, $star) {
            var $id = ($level - 1) * 11 + $star + 1;
            var $obj = TableData.getInstance().getData(TableData.tb_mount_train, $id);
            var $vo = new TB_mount_train_vo($obj);
            return $vo;
        };
        TB_mount_train_vo.getTabelItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_mount_train);
            for (var $key in $obj.data) {
                var $vo = new TB_mount_train_vo($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_mount_train_vo;
    }());
    tb.TB_mount_train_vo = TB_mount_train_vo;
    /*
    *坐骑进阶表数据
    */
    var TB_mount_upgrade = /** @class */ (function () {
        function TB_mount_upgrade($obj) {
            this.id = $obj.id;
            this.upgradeExp = $obj.upgradeExp;
            this.upgradeMode = $obj.upgradeMode;
            this.upgradecost = new Array;
            makeArray($obj.upgradecost, this.upgradecost);
        }
        TB_mount_upgrade.get_TB_mount_upgrade = function ($id) {
            var $upgradeobj = TableData.getInstance().getData(TableData.tb_mount_upgrade, $id);
            var $vo = new TB_mount_upgrade($upgradeobj);
            return $vo;
        };
        return TB_mount_upgrade;
    }());
    tb.TB_mount_upgrade = TB_mount_upgrade;
    //坐骑幻化数据
    var TB_mount_illusion_vo = /** @class */ (function () {
        function TB_mount_illusion_vo($obj) {
            this.spellVolist = new Array; //坐骑幻化技能列表
            this.prosKeys = new Array; //坐骑属性key
            this.prosValues = new Array; //坐骑属性值
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.mountID = $obj.mountID;
            this.condition = $obj.condition;
            this.mountLevel = $obj.mountLevel;
            this.last = $obj.last;
            this.battlepoint = $obj.battlepoint;
            this.force = $obj.force;
            this.costResource = new Array;
            this.costItem = new Array;
            this.spells = new Array;
            makeArray($obj.costResource, this.costResource);
            makeArray($obj.costItem, this.costItem);
            makeArray($obj.spells, this.spells);
            this.prosKeys = new Array;
            makeArray($obj.prosKeys, this.prosKeys);
            this.prosValues = new Array;
            makeArray($obj.prosValues, this.prosValues);
        }
        TB_mount_illusion_vo.getTabelItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_mount_illusion);
            for (var $key in $obj.data) {
                var $vo = new TB_mount_illusion_vo($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_mount_illusion_vo.get_TB_mount_illusion_vo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_mount_illusion, $id);
            var $vo = new TB_mount_illusion_vo($obj);
            return $vo;
        };
        return TB_mount_illusion_vo;
    }());
    tb.TB_mount_illusion_vo = TB_mount_illusion_vo;
    //坐骑幻化技能
    var SpellVo = /** @class */ (function () {
        function SpellVo() {
        }
        SpellVo.prototype.parse = function ($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.desc = $obj.desc;
            this.info = $obj.info;
            this.icon = $obj.icon;
            this.is_initiative = $obj.is_initiative;
            this.uplevel_id = new Array;
            makeArray($obj.uplevel_id, this.uplevel_id);
        };
        return SpellVo;
    }());
    tb.SpellVo = SpellVo;
    var TB_divine_skill_vo = /** @class */ (function (_super) {
        __extends(TB_divine_skill_vo, _super);
        function TB_divine_skill_vo($obj) {
            return _super.call(this, $obj) || this;
        }
        TB_divine_skill_vo.getTB_divine_skillById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_skill_base, $id);
            var $vo = new tb.TB_divine_skill_vo($obj);
            return $vo;
        };
        return TB_divine_skill_vo;
    }(tb.SkillDataVo));
    tb.TB_divine_skill_vo = TB_divine_skill_vo;
    var TB_divine_streng = /** @class */ (function () {
        function TB_divine_streng($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.divineid = $obj.divineid;
            this.lev = $obj.lev;
            this.props = new Array;
            makeArray($obj.props, this.props);
        }
        TB_divine_streng.get_TB_divine_streng = function ($id) {
            var $upgradeobj = TableData.getInstance().getData(TableData.tb_divine_streng, $id);
            var $vo = new TB_divine_streng($upgradeobj);
            return $vo;
        };
        return TB_divine_streng;
    }());
    tb.TB_divine_streng = TB_divine_streng;
    var TB_divine_bless = /** @class */ (function () {
        function TB_divine_bless($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.bless = $obj.bless;
            this.cost = new Array;
            makeArray($obj.cost, this.cost);
        }
        TB_divine_bless.get_TB_divine_bless = function ($id) {
            var $upgradeobj = TableData.getInstance().getData(TableData.tb_divine_bless, $id);
            var $vo = new TB_divine_bless($upgradeobj);
            return $vo;
        };
        return TB_divine_bless;
    }());
    tb.TB_divine_bless = TB_divine_bless;
    var TB_creature_template = /** @class */ (function () {
        function TB_creature_template($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.info = $obj.info;
            this.npcflag = $obj.npcflag;
            this.monster_type = $obj.monster_type;
            this.hp_num = $obj.hp_num;
            this.level = $obj.level;
            //this.pro = new Array
            //makeArray($obj.pro, this.pro)
            //this.spell = new Array
            //makeArray($obj.spell, this.spell)
            this.ainame = $obj.ainame;
            this.attack_type = $obj.attack_type;
            this.avatar = Number($obj.avatar);
            this.lockfaceto = $obj.lockfaceto;
            this.title_flag = $obj.title_flag;
            this.drop_belong = $obj.drop_belong;
            this.dialogue_id = $obj.dialogue_id;
        }
        TB_creature_template.getTabelItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_creature_template);
            for (var $key in $obj.data) {
                var $vo = new TB_creature_template($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_creature_template.get_TB_creature_template = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_creature_template, $id);
            var $vo = new TB_creature_template($obj);
            return $vo;
        };
        return TB_creature_template;
    }());
    tb.TB_creature_template = TB_creature_template;
    var TB_quest_vip_instance = /** @class */ (function () {
        function TB_quest_vip_instance($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.texst = $obj.texst;
        }
        TB_quest_vip_instance.get_TB_quest_vip_instance = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_quest_vip_instance, $id);
            var $vo = new TB_quest_vip_instance($obj);
            return $vo;
        };
        return TB_quest_vip_instance;
    }());
    tb.TB_quest_vip_instance = TB_quest_vip_instance;
    var TB_divine_base = /** @class */ (function () {
        function TB_divine_base($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.model = Number($obj.model);
            this.skill = $obj.skill;
            this.avtivetype = $obj.avtivetype;
            this.icon = $obj.icon;
            this.time = $obj.time;
            this.strength = $obj.strength;
            this.type = $obj.type;
            this.avtivedata = new Array;
            makeArray($obj.avtivedata, this.avtivedata);
            this.passiveskill = new Array;
            makeArray($obj.passiveskill, this.passiveskill);
        }
        TB_divine_base.get_TB_divine_base = function ($id) {
            var $upgradeobj = TableData.getInstance().getData(TableData.tb_divine_base, $id);
            var $vo = new TB_divine_base($upgradeobj);
            return $vo;
        };
        return TB_divine_base;
    }());
    tb.TB_divine_base = TB_divine_base;
    var TB_divine_baseVO = /** @class */ (function () {
        function TB_divine_baseVO($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.tb = TB_divine_base.get_TB_divine_base($obj.id);
            this.skillvo = tb.SkillDataVo.getSkillBaseDataById($obj.skill);
            this.passiveskillItem = new Array;
            for (var i = 0; i < this.tb.passiveskill.length; i++) {
                var $tempOjb = this.tb.passiveskill[i];
                var $skillVo = tb.TB_divine_skill_vo.getTB_divine_skillById($tempOjb[0]);
                $skillVo.openSart = $tempOjb[1];
                this.passiveskillItem.push($skillVo);
            }
        }
        TB_divine_baseVO.getTabelItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_divine_base);
            for (var $key in $obj.data) {
                var $vo = new TB_divine_baseVO($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_divine_baseVO.get_TB_divine_base = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_divine_base, $id);
            var $vo = new TB_divine_baseVO($obj);
            return $vo;
        };
        return TB_divine_baseVO;
    }());
    tb.TB_divine_baseVO = TB_divine_baseVO;
    var TB_map = /** @class */ (function () {
        //id,parentid,name,type, inst_type, is_instance, shadow, count, day_limit, week_limit, music
        //int, int, string, int, int, int, int, int, int, int, string
        function TB_map($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.type = $obj.type;
            this.mapres = $obj.mapres;
            this.levellimit = $obj.levellimit;
            this.is_PK = $obj.is_PK;
            this.inst_sub_type = $obj.inst_sub_type;
            this.aotubattle = $obj.aotubattle;
            this.allowChangeMode = $obj.allowChangeMode;
            this.types = $obj.types;
            this.inst_type = $obj.inst_type;
            this.is_instance = $obj.is_instance;
            var $mainshow = new Array;
            makeArray($obj.mainshow, $mainshow);
            var $show = new Array;
            makeArray($obj.show, $show);
            this.show = $mainshow.concat($show);
            this.minimapinfo = new Array;
            makeArray($obj.minimapinfo, this.minimapinfo);
            this.path = new Array;
            makeArray($obj.path, this.path);
            this.block = new Array;
            makeArray($obj.block, this.block);
            this.teleportmap = new Array;
            makeArray($obj.teleportmap, this.teleportmap);
        }
        TB_map.prototype.getTeleportmap = function ($toId) {
            for (var i = 0; i < this.teleportmap.length; i++) {
                if (this.teleportmap[i][0] == $toId) {
                    return new Vector2D(this.teleportmap[i][1], this.teleportmap[i][2]);
                }
            }
            return null;
        };
        TB_map.prototype.showAreaById = function ($id) {
            for (var i = 0; i < this.show.length; i++) {
                if (this.show[i] == $id) {
                    return true;
                }
            }
            return false;
        };
        TB_map.getTB_map = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_map, $id);
            var $vo = new TB_map($obj);
            return $vo;
        };
        TB_map.getTabelItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_map);
            for (var $key in $obj.data) {
                var $vo = new TB_map($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_map;
    }());
    tb.TB_map = TB_map;
    var TB_map_trial = /** @class */ (function () {
        // id,model,firstReward,showreward,force,resetgold,time
        //   int,int,array,array,int,int,int
        function TB_map_trial($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.model = $obj.model;
            this.force = $obj.force;
            this.resetgold = $obj.resetgold;
            this.time = $obj.time;
            this.firstReward = new Array;
            makeArray($obj.firstReward, this.firstReward);
            this.showreward = new Array;
            makeArray($obj.showreward, this.showreward);
        }
        TB_map_trial.get_TB_map_trial = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_instance_trial, $id);
            var $vo = new TB_map_trial($obj);
            return $vo;
        };
        TB_map_trial.getTabelItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_instance_trial);
            for (var $key in $obj.data) {
                var $vo = new TB_map_trial($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_map_trial;
    }());
    tb.TB_map_trial = TB_map_trial;
    var TB_store = /** @class */ (function () {
        function TB_store($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.limit = $obj.limit;
            this.costResource = new Array;
            makeArray($obj.costResource, this.costResource);
        }
        TB_store.get_TB_store = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_store, $id);
            var $vo = new TB_store($obj);
            return $vo;
        };
        return TB_store;
    }());
    tb.TB_store = TB_store;
    var TB_shop_base = /** @class */ (function () {
        function TB_shop_base($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.typename = $obj.typename;
        }
        TB_shop_base.get_TB_shop_base = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_shop_base, $id);
            var $vo = new TB_shop_base($obj);
            return $vo;
        };
        return TB_shop_base;
    }());
    tb.TB_shop_base = TB_shop_base;
    var TB_shop = /** @class */ (function () {
        function TB_shop($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.itemId = $obj.itemId;
            this.tab = $obj.tab;
            this.type = $obj.type;
            this.recommend = $obj.recommend;
            this.limtime = $obj.limtime;
            this.limtype = $obj.limtype;
            this.limdata = $obj.limdata;
            this.discount = $obj.discount;
            this.count = $obj.count;
            this.time = $obj.time;
            this.limit = $obj.limit;
            this.costResource = new Array;
            makeArray($obj.costResource, this.costResource);
        }
        TB_shop.get_TB_shopById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_shop, $id);
            var $vo = new TB_shop($obj);
            return $vo;
        };
        TB_shop.get_TB_shop = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_shop);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_shop($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_shop;
    }());
    tb.TB_shop = TB_shop;
    var TB_map_navigation = /** @class */ (function () {
        function TB_map_navigation($obj) {
            this.navi = new Array;
            if (!$obj) {
                traceNoTabelData();
                return;
            }
            this.id = $obj.id;
            makeArray($obj.navi, this.navi);
        }
        TB_map_navigation.get_TB_map_navigation = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_map_navigation, $id);
            if (!$obj) {
                return null;
            }
            var $vo = new TB_map_navigation($obj);
            return $vo;
        };
        return TB_map_navigation;
    }());
    tb.TB_map_navigation = TB_map_navigation;
    var TB_map_object = /** @class */ (function () {
        //    id,type, name, position, color
        //int, int, string, array, int
        function TB_map_object($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.type = $obj.type;
            this.name = $obj.name;
            this.color = $obj.color;
            this.position = new Vector2D();
            this.position.x = $obj.position[0];
            this.position.y = $obj.position[1];
        }
        TB_map_object.get_TB_map_object = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_map_object, $id);
            var $vo = new TB_map_object($obj);
            return $vo;
        };
        return TB_map_object;
    }());
    tb.TB_map_object = TB_map_object;
    var TB_map_vip = /** @class */ (function () {
        //id,indx,vip,modle,reward,raiseHardBattlePoints
        //  int,int,int,int,array,array
        function TB_map_vip($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.vip = $obj.vip;
            this.times = $obj.times;
            this.forces = new Array;
            makeArray($obj.forces, this.forces);
            this.reward = new Array;
            makeArray($obj.reward, this.reward);
            this.cost = new Array;
            makeArray($obj.cost, this.cost);
            this.creatures = new Array;
            makeArray($obj.creatures, this.creatures);
        }
        TB_map_vip.get_TB_map_vip = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_map_vip, $id);
            var $vo = new TB_map_vip($obj);
            return $vo;
        };
        TB_map_vip.getTabelItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_map_vip);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_map_vip($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_map_vip;
    }());
    tb.TB_map_vip = TB_map_vip;
    var Tb_social_familiay = /** @class */ (function () {
        function Tb_social_familiay($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.exp = $obj.exp;
        }
        Tb_social_familiay.get_Tb_social_familiay = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_social_familiay, $id);
            var $vo = new Tb_social_familiay($obj);
            return $vo;
        };
        return Tb_social_familiay;
    }());
    tb.Tb_social_familiay = Tb_social_familiay;
    var Tb_social_shop = /** @class */ (function () {
        function Tb_social_shop($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.itemId = $obj.itemId;
            this.familiay = $obj.familiay;
            this.costResource = new Array;
            makeArray($obj.costResource, this.costResource);
        }
        Tb_social_shop.get_Tb_social_shopItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_social_shop);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new Tb_social_shop($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return Tb_social_shop;
    }());
    tb.Tb_social_shop = Tb_social_shop;
    var TB_msg_text_type = /** @class */ (function () {
        function TB_msg_text_type($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.content = $obj.content;
        }
        TB_msg_text_type.get_TB_msg_text_type = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_msg_text_type, $id);
            var $vo = new TB_msg_text_type($obj);
            return $vo;
        };
        return TB_msg_text_type;
    }());
    tb.TB_msg_text_type = TB_msg_text_type;
    var TB_worldboss_base = /** @class */ (function () {
        //id,entry,items
        //int,int,array
        function TB_worldboss_base($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.entry = $obj.entry;
            this.items = new Array;
            makeArray($obj.items, this.items);
        }
        TB_worldboss_base.get_TB_worldboss_base = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_worldboss_base, $id);
            var $vo = new TB_worldboss_base($obj);
            return $vo;
        };
        return TB_worldboss_base;
    }());
    tb.TB_worldboss_base = TB_worldboss_base;
    var TB_worldboss_time = /** @class */ (function () {
        //id,entry,items
        //int,int,array
        function TB_worldboss_time($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.enrolllast = $obj.enrolllast;
            this.time_last = $obj.time_last;
            this.time = new Array;
            makeArray($obj.time, this.time);
        }
        TB_worldboss_time.get_TB_worldboss_time = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_worldboss_time, $id);
            var $vo = new TB_worldboss_time($obj);
            return $vo;
        };
        return TB_worldboss_time;
    }());
    tb.TB_worldboss_time = TB_worldboss_time;
    var TB_vip_base = /** @class */ (function () {
        function TB_vip_base($obj) {
            if (!$obj) {
                traceNoTabelData();
                ;
            }
            this.id = $obj.id;
            this.factiondonation = $obj.factiondonation;
            this.factionybdonation = $obj.factionybdonation;
            this.resReward = $obj.resReward;
            this.djtReward = $obj.djtReward;
            this.qualifyReward = $obj.qualifyReward;
            this.groupReward = $obj.groupReward;
            this.worldbossReward = $obj.worldbossReward;
            this.trialReward = $obj.trialReward;
            this.riskReward = $obj.riskReward;
            this.massbossBuyTimes = $obj.massbossBuyTimes;
            this.djtBuyTimes = $obj.djtBuyTimes;
            this.chongzhi = $obj.chongzhi;
            this.treeTimes = $obj.treeTimes;
            this.desc = $obj.desc;
            this.gift = new Array;
            makeArray($obj.gift, this.gift);
            this.cost = new Array;
            makeArray($obj.cost, this.cost);
            this.fake_cost = new Array;
            makeArray($obj.fake_cost, this.fake_cost);
        }
        TB_vip_base.get_TB_vip_baseById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_vip_base, $id);
            var $vo = new TB_vip_base($obj);
            return $vo;
        };
        TB_vip_base.getTB_vip_base = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_vip_base);
            for (var $key in $obj.data) {
                var $vo = new TB_vip_base($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_vip_base;
    }());
    tb.TB_vip_base = TB_vip_base;
    var TB_worldboss_rank_reward = /** @class */ (function () {
        function TB_worldboss_rank_reward($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.id2 = $obj.id2;
            this.reward = $obj.reward;
        }
        TB_worldboss_rank_reward.getTabelItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_worldboss_rank_reward);
            for (var $key in $obj.data) {
                var $vo = new TB_worldboss_rank_reward($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_worldboss_rank_reward;
    }());
    tb.TB_worldboss_rank_reward = TB_worldboss_rank_reward;
    var TB_skill_show = /** @class */ (function () {
        function TB_skill_show($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.zhudong_list = new Array;
            makeArray($obj.zhudong_list, this.zhudong_list);
            this.anger_list = new Array;
            makeArray($obj.anger_list, this.anger_list);
            this.passive_list = new Array;
            makeArray($obj.passive_list, this.passive_list);
        }
        TB_skill_show.get_TB_skill_show = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_skill_show, $id);
            var $vo = new TB_skill_show($obj);
            return $vo;
        };
        return TB_skill_show;
    }());
    tb.TB_skill_show = TB_skill_show;
    var TB_msg = /** @class */ (function () {
        function TB_msg($obj) {
            if (!$obj) {
                traceNoTabelData();
                return;
            }
            this.id = $obj.id;
            this.type = $obj.type;
            this.reason = $obj.reason;
            this.text = $obj.text;
            this.msgtype = $obj.msgtype;
        }
        TB_msg.get_TB_msg = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_msg, $id);
            var $vo = new TB_msg($obj);
            return $vo;
        };
        return TB_msg;
    }());
    tb.TB_msg = TB_msg;
    var TB_activity_base = /** @class */ (function () {
        function TB_activity_base($obj) {
            if (!$obj) {
                traceNoTabelData();
                return;
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.nums = $obj.nums;
            this.active = $obj.active;
            this.icon = $obj.icon;
            this.npc = $obj.npc;
            this.greptimelim = $obj.greptimelim;
            this.grepone = $obj.grepone;
            this.grepgroup = $obj.grepgroup;
            this.grepfaction = $obj.grepfaction;
            this.recommend = $obj.recommend;
            this.pvp = $obj.pvp;
            this.limtype = $obj.limtype;
            this.limdata = $obj.limdata;
            this.goto = $obj.goto;
            this.server_open_day = $obj.server_open_day;
            this.goto_sub = $obj.goto_sub;
            this.day = new Array;
            makeArray($obj.day, this.day);
            this.vipnums = new Array;
            makeArray($obj.vipnums, this.vipnums);
            this.time = new Array;
            makeArray($obj.time, this.time);
            this.basereward = new Array;
            makeArray($obj.basereward, this.basereward);
            this.reward = new Array;
            makeArray($obj.reward, this.reward);
            this.info = $obj.info;
        }
        TB_activity_base.get_TB_activity_baseByid = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_activity_base, $id);
            var $vo = new TB_activity_base($obj);
            return $vo;
        };
        TB_activity_base.get_TB_activity_base = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_activity_base);
            for (var $key in $obj.data) {
                var $vo = new TB_activity_base($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_activity_base;
    }());
    tb.TB_activity_base = TB_activity_base;
    var TB_activity_reward = /** @class */ (function () {
        function TB_activity_reward($obj) {
            if (!$obj) {
                traceNoTabelData();
                return;
            }
            this.id = $obj.id;
            this.active = $obj.active;
            this.reward = new Array;
            makeArray($obj.reward, this.reward);
            this.vipreward = new Array;
            makeArray($obj.vipreward, this.vipreward);
        }
        TB_activity_reward.get_TB_activity_rewardByid = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_activity_reward, $id);
            var $vo = new TB_activity_reward($obj);
            return $vo;
        };
        TB_activity_reward.get_TB_activity_reward = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_activity_reward);
            for (var $key in $obj.data) {
                var $vo = new TB_activity_reward($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_activity_reward;
    }());
    tb.TB_activity_reward = TB_activity_reward;
    var TB_social_num = /** @class */ (function () {
        function TB_social_num($obj) {
            if (!$obj) {
                traceNoTabelData();
                return;
            }
            this.id = $obj.id;
            this.num = $obj.num;
        }
        TB_social_num.get_TB_social_num = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_social_num, $id);
            var $vo = new TB_social_num($obj);
            return $vo;
        };
        return TB_social_num;
    }());
    tb.TB_social_num = TB_social_num;
    var TB_creature_dialogue = /** @class */ (function () {
        function TB_creature_dialogue($obj) {
            if (!$obj) {
                traceNoTabelData();
                return;
            }
            this.id = $obj.id;
            this.npc_dialogue = $obj.npc_dialogue;
            this.next_id = $obj.next_id;
            this.type = $obj.type;
            this.who = $obj.who;
            this.typedata = $obj.typedata;
        }
        TB_creature_dialogue.get_TB_creature_dialogue = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_creature_dialogue, $id);
            var $vo = new TB_creature_dialogue($obj);
            return $vo;
        };
        return TB_creature_dialogue;
    }());
    tb.TB_creature_dialogue = TB_creature_dialogue;
    var TB_quest = /** @class */ (function () {
        function TB_quest($obj) {
            if (!$obj) {
                traceNoTabelData();
                return;
            }
            this.id = $obj.id;
            this.start = $obj.start;
            this.type = $obj.type;
            this.ctype = $obj.ctype;
            this.showpage = Number($obj.showpage);
            this.level = $obj.level;
            this.chapterName = $obj.chapterName;
            this.chapter = $obj.chapter;
            this.questName = $obj.questName;
            this.desc = $obj.desc;
            this.popup = $obj.popup;
            this.flag = $obj.flag;
            this.dialogue = $obj.dialogue;
            this.talk = $obj.talk;
            this.belongSet = $obj.belongSet;
            this.specialButton = $obj.specialButton;
            this.hint = new Array;
            makeArray($obj.hint, this.hint);
            this.icon = new Array;
            makeArray($obj.icon, this.icon);
            this.text = new Array;
            makeArray($obj.text, this.text);
            this.targetsPosition = new Array;
            makeArray($obj.targetsPosition, this.targetsPosition);
            this.rewards = new Array;
            makeArray($obj.rewards, this.rewards);
        }
        TB_quest.getItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_quest);
            for (var $key in $obj.data) {
                var $vo = new TB_quest($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_quest.getTbById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_quest, $id);
            var $vo = new TB_quest($obj);
            return $vo;
        };
        return TB_quest;
    }());
    tb.TB_quest = TB_quest;
    var TB_instance_res = /** @class */ (function () {
        function TB_instance_res($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.mapid = $obj.mapid;
            this.name = $obj.name;
            this.force = $obj.force;
            this.hardDesc = $obj.hardDesc;
            this.type = $obj.type;
            this.time = $obj.time;
            this.times = $obj.times;
            this.limLev = $obj.limLev;
            this.boss = $obj.boss;
            this.refresnum = $obj.refresnum;
            this.firstReward = new Array;
            makeArray($obj.firstReward, this.firstReward);
            this.basereward = new Array;
            makeArray($obj.basereward, this.basereward);
            //console.log("TB_instance_res", this, $obj)
        }
        TB_instance_res.getTabelItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_instance_res);
            for (var $key in $obj.data) {
                var $vo = new TB_instance_res($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_instance_res.get_TB_TB_instance_res = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_instance_res, $id);
            var $vo = new TB_instance_res($obj);
            return $vo;
        };
        return TB_instance_res;
    }());
    tb.TB_instance_res = TB_instance_res;
    var TB_achieve_base = /** @class */ (function () {
        function TB_achieve_base($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.type = $obj.type;
            this.stype = $obj.stype;
            this.info = $obj.info;
            this.maxnum = $obj.maxnum;
            this.icon = $obj.icon;
            this.linktype = $obj.linktype;
            this.reward = new Array;
            makeArray($obj.reward, this.reward);
            this.achval = $obj.achval;
            this.title = $obj.title;
        }
        TB_achieve_base.getTB_achieve_base = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_achieve_base);
            for (var $key in $obj.data) {
                var $vo = new TB_achieve_base($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_achieve_base.get_TB_achieve_baseById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_achieve_base, $id);
            var $vo = new TB_achieve_base($obj);
            return $vo;
        };
        return TB_achieve_base;
    }());
    tb.TB_achieve_base = TB_achieve_base;
    var TB_achieve_progress = /** @class */ (function () {
        function TB_achieve_progress($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.achval = $obj.achval;
            this.reward = new Array;
            makeArray($obj.reward, this.reward);
        }
        TB_achieve_progress.getTB_achieve_progress = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_achieve_progress);
            for (var $key in $obj.data) {
                var $vo = new TB_achieve_progress($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_achieve_progress.get_TB_achieve_progressById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_achieve_progress, $id);
            var $vo = new TB_achieve_progress($obj);
            return $vo;
        };
        return TB_achieve_progress;
    }());
    tb.TB_achieve_progress = TB_achieve_progress;
    var TB_title_base = /** @class */ (function () {
        function TB_title_base($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.type = $obj.type;
            this.info = $obj.info;
            this.getinfo = $obj.getinfo;
            this.limtime = $obj.limtime;
            this.unlock_type = $obj.unlock_type;
            this.qua = $obj.qua;
            this.prop = new Array;
            makeArray($obj.prop, this.prop);
            this.unlock_cost = new Array;
            makeArray($obj.unlock_cost, this.unlock_cost);
        }
        TB_title_base.getTB_title_base = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_title_base);
            for (var $key in $obj.data) {
                var $vo = new TB_title_base($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_title_base.get_TB_title_baseById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_title_base, $id);
            var $vo = new TB_title_base($obj);
            return $vo;
        };
        return TB_title_base;
    }());
    tb.TB_title_base = TB_title_base;
    var TB_shop_chongzhi = /** @class */ (function () {
        function TB_shop_chongzhi($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.yuanbao = $obj.yuanbao;
            this.cost = $obj.cost;
            this.first_reward = $obj.first_reward;
            this.rate = $obj.rate;
            this.non_first_extra_gold = $obj.non_first_extra_gold;
        }
        TB_shop_chongzhi.getTB_shop_chongzhi = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_shop_chongzhi);
            for (var $key in $obj.data) {
                var $vo = new TB_shop_chongzhi($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_shop_chongzhi;
    }());
    tb.TB_shop_chongzhi = TB_shop_chongzhi;
    var TB_gameobject_template = /** @class */ (function () {
        function TB_gameobject_template($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.time = $obj.time;
            this.actionState = $obj.actionState;
            this.regX = $obj.regX;
            this.regY = $obj.regY;
            this.taskShow = $obj.taskShow;
            this.judge = $obj.judge;
            this.quest_id0 = $obj.quest_id0;
            this.quest_id1 = $obj.quest_id1;
            this.quest_id2 = $obj.quest_id2;
            this.quest_id3 = $obj.quest_id3;
            this.trigger_width = $obj.trigger_width;
            this.trigger_height = $obj.trigger_height;
            this.avatar = Number($obj.avatar);
            this.style = $obj.style;
            this.hitarray = new Array;
            makeArray($obj.hitarray, this.hitarray);
        }
        TB_gameobject_template.get_TB_gameobject_template = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_gameobject_template, $id);
            var $vo = new TB_gameobject_template($obj);
            return $vo;
        };
        return TB_gameobject_template;
    }());
    tb.TB_gameobject_template = TB_gameobject_template;
    var TB_welfare_shouchong = /** @class */ (function () {
        function TB_welfare_shouchong($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.item = new Array;
            makeArray($obj.item, this.item);
        }
        TB_welfare_shouchong.get_TB_welfare_shouchongById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_welfare_shouchong, $id);
            var $vo = new TB_welfare_shouchong($obj);
            return $vo;
        };
        TB_welfare_shouchong.get_TB_welfare_shouchong = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_welfare_shouchong);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_welfare_shouchong($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_welfare_shouchong;
    }());
    tb.TB_welfare_shouchong = TB_welfare_shouchong;
    var TB_welfare_checkin = /** @class */ (function () {
        function TB_welfare_checkin($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.item = new Array;
            makeArray($obj.item, this.item);
            this.getback_cost = new Array;
            makeArray($obj.getback_cost, this.getback_cost);
            this.vip = $obj.vip;
            this.times = $obj.times;
        }
        TB_welfare_checkin.get_TB_welfare_checkinById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_welfare_checkin, $id);
            var $vo = new TB_welfare_checkin($obj);
            return $vo;
        };
        TB_welfare_checkin.get_TB_welfare_checkin = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_welfare_checkin);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_welfare_checkin($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_welfare_checkin;
    }());
    tb.TB_welfare_checkin = TB_welfare_checkin;
    var TB_welfare_checkin_all = /** @class */ (function () {
        function TB_welfare_checkin_all($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.num = $obj.num;
            this.item = new Array;
            makeArray($obj.item, this.item);
        }
        TB_welfare_checkin_all.get_TB_welfare_checkin_allById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_welfare_checkin_all, $id);
            var $vo = new TB_welfare_checkin_all($obj);
            return $vo;
        };
        TB_welfare_checkin_all.get_TB_welfare_checkin_all = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_welfare_checkin_all);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_welfare_checkin_all($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_welfare_checkin_all;
    }());
    tb.TB_welfare_checkin_all = TB_welfare_checkin_all;
    var TB_welfare_level = /** @class */ (function () {
        function TB_welfare_level($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.lev = $obj.lev;
            this.item = new Array;
            makeArray($obj.item, this.item);
        }
        TB_welfare_level.get_TB_welfare_levelById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_welfare_level, $id);
            var $vo = new TB_welfare_level($obj);
            return $vo;
        };
        TB_welfare_level.get_TB_welfare_level = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_welfare_level);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_welfare_level($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_welfare_level;
    }());
    tb.TB_welfare_level = TB_welfare_level;
    var TB_welfare_back = /** @class */ (function () {
        function TB_welfare_back($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.basecost = new Array;
            makeArray($obj.basecost, this.basecost);
            this.allcost = new Array;
            makeArray($obj.allcost, this.allcost);
            this.basedc = $obj.basedc;
            this.alldc = $obj.alldc;
            this.name = $obj.name;
            this.basereward = new Array;
            makeArray($obj.basereward, this.basereward);
            this.allreward = new Array;
            makeArray($obj.allreward, this.allreward);
        }
        TB_welfare_back.get_TB_welfare_backById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_welfare_back, $id);
            var $vo = new TB_welfare_back($obj);
            return $vo;
        };
        TB_welfare_back.get_TB_welfare_back = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_welfare_back);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_welfare_back($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_welfare_back;
    }());
    tb.TB_welfare_back = TB_welfare_back;
    var TB_kuafu_xianfu_condition = /** @class */ (function () {
        function TB_kuafu_xianfu_condition($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.levelrange = new Array;
            makeArray($obj.levelrange, this.levelrange);
            this.ticket = new Array;
            makeArray($obj.ticket, this.ticket);
            this.price = new Array;
            makeArray($obj.price, this.price);
            this.boxid = $obj.boxid;
            this.joinReward = new Array;
            makeArray($obj.joinReward, this.joinReward);
            this.ticketid = $obj.ticketid;
            this.showReward = new Array;
            makeArray($obj.showReward, this.showReward);
        }
        TB_kuafu_xianfu_condition.get_TB_kuafu_xianfu_conditionById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_kuafu_xianfu_condition, $id);
            var $vo = new TB_kuafu_xianfu_condition($obj);
            return $vo;
        };
        TB_kuafu_xianfu_condition.get_TB_kuafu_xianfu_condition = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_kuafu_xianfu_condition);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_kuafu_xianfu_condition($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_kuafu_xianfu_condition;
    }());
    tb.TB_kuafu_xianfu_condition = TB_kuafu_xianfu_condition;
    var TB_welfare_level_show = /** @class */ (function () {
        function TB_welfare_level_show($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.item = new Array;
            makeArray($obj.item, this.item);
        }
        TB_welfare_level_show.get_TB_welfare_level_show = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_welfare_level_show);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_welfare_level_show($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_welfare_level_show;
    }());
    tb.TB_welfare_level_show = TB_welfare_level_show;
    var TB_kuafu_xianfu_base = /** @class */ (function () {
        function TB_kuafu_xianfu_base($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.dailytimes = $obj.dailytimes;
            this.boxid = $obj.boxid;
            this.joinTime = new Array;
            makeArray($obj.joinTime, this.joinTime);
        }
        TB_kuafu_xianfu_base.getTempVo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_kuafu_xianfu_base, $id);
            var $vo = new TB_kuafu_xianfu_base($obj);
            return $vo;
        };
        return TB_kuafu_xianfu_base;
    }());
    tb.TB_kuafu_xianfu_base = TB_kuafu_xianfu_base;
    var TB_doujiantai_first = /** @class */ (function () {
        function TB_doujiantai_first($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.rank = $obj.rank;
            this.reward = new Array;
            makeArray($obj.reward, this.reward);
        }
        TB_doujiantai_first.get_TB_doujiantai_firstById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_doujiantai_first, $id);
            var $vo = new TB_doujiantai_first($obj);
            return $vo;
        };
        TB_doujiantai_first.get_TB_doujiantai_first = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_doujiantai_first);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_doujiantai_first($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_doujiantai_first;
    }());
    tb.TB_doujiantai_first = TB_doujiantai_first;
    var TB_doujiantai_day = /** @class */ (function () {
        function TB_doujiantai_day($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.rank = $obj.rank;
            this.reward = $obj.reward;
        }
        TB_doujiantai_day.get_TB_doujiantai_dayById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_doujiantai_day, $id);
            var $vo = new TB_doujiantai_day($obj);
            return $vo;
        };
        TB_doujiantai_day.get_TB_doujiantai_day = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_doujiantai_day);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_doujiantai_day($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_doujiantai_day;
    }());
    tb.TB_doujiantai_day = TB_doujiantai_day;
    var TB_system_preview = /** @class */ (function () {
        function TB_system_preview($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.type2 = $obj.type2;
            this.name = $obj.name;
            this.level = $obj.level;
            this.npc = $obj.npc;
            this.level_start = $obj.level_start;
            this.info = $obj.info;
            this.system_id = new Array;
            makeArray($obj.system_id, this.system_id);
        }
        TB_system_preview.getTempVo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_system_preview, $id);
            var $vo = new TB_system_preview($obj);
            return $vo;
        };
        TB_system_preview.getItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_system_preview);
            for (var $key in $obj.data) {
                var $vo = new TB_system_preview($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_system_preview;
    }());
    tb.TB_system_preview = TB_system_preview;
    var TB_system_icon = /** @class */ (function () {
        function TB_system_icon($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.position = $obj.position;
            this.index = $obj.index;
            this.move = $obj.move;
            this.index = $obj.index;
            this.text = $obj.text;
            this.showmodel = $obj.showmodel;
            this.list = new Array;
            this.bindactive = new Array;
            makeArray($obj.list, this.list);
            makeArray($obj.bindactive, this.bindactive);
            this.optional_list = new Array;
            if ($obj.optional_list) {
                makeArray($obj.optional_list, this.optional_list);
            }
            //  this.text="就这样显示在这里"
        }
        TB_system_icon.getItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_system_icon);
            for (var $key in $obj.data) {
                var $vo = new TB_system_icon($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_system_icon.getTempVo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_system_icon, $id);
            var $vo = new TB_system_icon($obj);
            return $vo;
        };
        return TB_system_icon;
    }());
    tb.TB_system_icon = TB_system_icon;
    var TB_system_base = /** @class */ (function () {
        function TB_system_base($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.level = $obj.level;
            this.position = $obj.position;
            this.index = $obj.index;
            this.view = $obj.view;
            this.isguide = $obj.isguide;
            this.guide_id = $obj.guide_id;
            this.condition_info = $obj.condition_info;
            this.info = $obj.info;
            this.show = $obj.show;
        }
        TB_system_base.getTempVo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_system_base, $id);
            var $vo = new TB_system_base($obj);
            return $vo;
        };
        TB_system_base.getItem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_system_base);
            for (var $key in $obj.data) {
                var $vo = new TB_system_base($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_system_base;
    }());
    tb.TB_system_base = TB_system_base;
    var TB_doujiantai_combat_win = /** @class */ (function () {
        function TB_doujiantai_combat_win($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.reward = $obj.reward;
        }
        TB_doujiantai_combat_win.get_TB_doujiantai_combat_winById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_doujiantai_combat_win, $id);
            if ($obj) {
                var $vo = new TB_doujiantai_combat_win($obj);
                return $vo;
            }
            else {
                return null;
            }
        };
        TB_doujiantai_combat_win.get_TB_doujiantai_combat_win = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_doujiantai_combat_win);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_doujiantai_combat_win($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_doujiantai_combat_win;
    }());
    tb.TB_doujiantai_combat_win = TB_doujiantai_combat_win;
    var TB_doujiantai_base = /** @class */ (function () {
        function TB_doujiantai_base($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.joinTime = new Array;
            makeArray($obj.joinTime, this.joinTime);
            this.dailytimes = $obj.dailytimes;
            this.level = $obj.level;
            this.changeRate = $obj.changeRate;
            this.refreshCountdown = $obj.refreshCountdown;
            this.tryReward = new Array;
            makeArray($obj.tryReward, this.tryReward);
            this.buyInfo = new Array;
            makeArray($obj.buyInfo, this.buyInfo);
            this.battleCountdown = new Array;
            makeArray($obj.battleCountdown, this.battleCountdown);
        }
        TB_doujiantai_base.get_TB_doujiantai_baseById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_doujiantai_base, $id);
            var $vo = new TB_doujiantai_base($obj);
            return $vo;
        };
        TB_doujiantai_base.get_TB_doujiantai_base = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_doujiantai_base);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_doujiantai_base($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_doujiantai_base;
    }());
    tb.TB_doujiantai_base = TB_doujiantai_base;
    var TB_bianqiang_sub = /** @class */ (function () {
        function TB_bianqiang_sub($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.parent_id = $obj.parent_id;
            this.icon = $obj.icon;
            this.npc = $obj.npc;
            this.name = $obj.name;
            this.info = $obj.info;
            this.value_type = $obj.value_type;
            this.priority = $obj.priority;
            this.goto = $obj.goto;
            this.goto_sub = new Array;
            makeArray($obj.goto_sub, this.goto_sub);
            this.limitlev = $obj.limitlev;
        }
        TB_bianqiang_sub.get_TB_bianqiang_subById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_bianqiang_sub, $id);
            var $vo = new TB_bianqiang_sub($obj);
            return $vo;
        };
        TB_bianqiang_sub.get_TB_bianqiang_sub = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_bianqiang_sub);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_bianqiang_sub($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_bianqiang_sub;
    }());
    tb.TB_bianqiang_sub = TB_bianqiang_sub;
    var TB_bianqiang_value = /** @class */ (function () {
        function TB_bianqiang_value($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.value = $obj.value;
            this.value_devide = new Array;
            makeArray($obj.value_devide, this.value_devide);
        }
        TB_bianqiang_value.get_TB_bianqiang_valueById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_bianqiang_value, $id);
            var $vo = new TB_bianqiang_value($obj);
            return $vo;
        };
        TB_bianqiang_value.get_TB_bianqiang_value = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_bianqiang_value);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_bianqiang_value($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_bianqiang_value;
    }());
    tb.TB_bianqiang_value = TB_bianqiang_value;
    var TB_bianqiang_rank = /** @class */ (function () {
        function TB_bianqiang_rank($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.info = $obj.info;
            this.color = $obj.color;
            this.percent = $obj.percent;
            this.icon = $obj.icon;
        }
        TB_bianqiang_rank.get_TB_bianqiang_rankById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_bianqiang_rank, $id);
            var $vo = new TB_bianqiang_rank($obj);
            return $vo;
        };
        TB_bianqiang_rank.get_TB_bianqiang_rank = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_bianqiang_rank);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_bianqiang_rank($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_bianqiang_rank;
    }());
    tb.TB_bianqiang_rank = TB_bianqiang_rank;
    var TB_xiulianchang_base = /** @class */ (function () {
        function TB_xiulianchang_base($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.max_plunder_recover_count = $obj.max_plunder_recover_count;
            this.plunder_recover_time = $obj.plunder_recover_time;
            this.rival_refresh_cd = $obj.rival_refresh_cd;
            this.module_id = $obj.module_id;
            this.base_exp_reward = $obj.base_exp_reward;
            this.plunder_exp_reward = $obj.plunder_exp_reward;
            this.get_reward_time_limit = $obj.get_reward_time_limit;
            this.base_exp_time_unit = $obj.base_exp_time_unit;
            this.max_been_plunder_count = $obj.max_been_plunder_count;
            this.plunder_exp_lost = $obj.plunder_exp_lost;
        }
        TB_xiulianchang_base.get_TB_xiulianchang_baseById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_xiulianchang_base, $id);
            var $vo = new TB_xiulianchang_base($obj);
            return $vo;
        };
        TB_xiulianchang_base.get_TB_xiulianchang_base = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_xiulianchang_base);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_xiulianchang_base($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_xiulianchang_base;
    }());
    tb.TB_xiulianchang_base = TB_xiulianchang_base;
    var TB_xiulianchang_vip = /** @class */ (function () {
        function TB_xiulianchang_vip($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.time_limit = $obj.time_limit;
            this.buy_limit = $obj.buy_limit;
            this.plunder_limit = $obj.plunder_limit;
            this.extend_exp_reward = $obj.extend_exp_reward;
            this.buy_price = new Array;
            makeArray($obj.buy_price, this.buy_price);
        }
        TB_xiulianchang_vip.get_TB_xiulianchang_vipById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_xiulianchang_vip, $id);
            var $vo = new TB_xiulianchang_vip($obj);
            return $vo;
        };
        TB_xiulianchang_vip.get_TB_xiulianchang_vip = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_xiulianchang_vip);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_xiulianchang_vip($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_xiulianchang_vip;
    }());
    tb.TB_xiulianchang_vip = TB_xiulianchang_vip;
    var TB_faction_privilege = /** @class */ (function () {
        function TB_faction_privilege($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.destroyItem = $obj.destroyItem;
            this.manager = $obj.manager;
            this.coreManager = $obj.coreManager;
            this.replaceFlag = $obj.replaceFlag;
            this.handInQuality = $obj.handInQuality;
        }
        TB_faction_privilege.get_TB_faction_privilege = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_faction_privilege, $id);
            var $vo = new TB_faction_privilege($obj);
            return $vo;
        };
        return TB_faction_privilege;
    }());
    tb.TB_faction_privilege = TB_faction_privilege;
    var TB_xiulianchang_reward = /** @class */ (function () {
        function TB_xiulianchang_reward($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.time = $obj.time;
            this.vip_label = $obj.vip_label;
            this.reward = new Array;
            makeArray($obj.reward, this.reward);
        }
        TB_xiulianchang_reward.get_TB_xiulianchang_rewardById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_xiulianchang_reward, $id);
            var $vo = new TB_xiulianchang_reward($obj);
            return $vo;
        };
        TB_xiulianchang_reward.get_TB_xiulianchang_reward = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_xiulianchang_reward);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_xiulianchang_reward($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_xiulianchang_reward;
    }());
    tb.TB_xiulianchang_reward = TB_xiulianchang_reward;
    var TB_char_level = /** @class */ (function () {
        function TB_char_level($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.next_exp = $obj.next_exp;
        }
        TB_char_level.get_TB_char_levelById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_char_level, $id);
            var $vo = new TB_char_level($obj);
            return $vo;
        };
        TB_char_level.get_TB_char_level = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_char_level);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_char_level($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_char_level;
    }());
    tb.TB_char_level = TB_char_level;
    var TB_login_activity_reward = /** @class */ (function () {
        function TB_login_activity_reward($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.day = $obj.day;
            this.reward = new Array;
            makeArray($obj.reward, this.reward);
            this.menu_title = $obj.menu_title;
            this.indx = $obj.indx;
        }
        TB_login_activity_reward.get_TB_login_activity_rewardById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_login_activity_reward, $id);
            var $vo = new TB_login_activity_reward($obj);
            return $vo;
        };
        TB_login_activity_reward.get_TB_login_activity_reward = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_login_activity_reward);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_login_activity_reward($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_login_activity_reward;
    }());
    tb.TB_login_activity_reward = TB_login_activity_reward;
    var TB_login_activity_preview = /** @class */ (function () {
        function TB_login_activity_preview($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.preview_name = $obj.preview_name;
            this.preview_model = $obj.preview_model;
            this.preview_effect = $obj.preview_effect;
            this.preview_info = $obj.preview_info;
            this.day = $obj.day;
            this.type = $obj.type;
        }
        TB_login_activity_preview.get_TB_login_activity_previewById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_login_activity_preview, $id);
            var $vo = new TB_login_activity_preview($obj);
            return $vo;
        };
        TB_login_activity_preview.get_TB_login_activity_preview = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_login_activity_preview);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_login_activity_preview($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_login_activity_preview;
    }());
    tb.TB_login_activity_preview = TB_login_activity_preview;
    var TB_worldboss_roll = /** @class */ (function () {
        function TB_worldboss_roll($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.itemid = $obj.itemid;
        }
        TB_worldboss_roll.get_TB_worldboss_rollById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_worldboss_roll, $id);
            var $vo = new TB_worldboss_roll($obj);
            return $vo;
        };
        TB_worldboss_roll.get_TB_worldboss_roll = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_worldboss_roll);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_worldboss_roll($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_worldboss_roll;
    }());
    tb.TB_worldboss_roll = TB_worldboss_roll;
    var TB_faction_boss = /** @class */ (function () {
        function TB_faction_boss($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.entry = $obj.entry;
            this.faction_zhiwei_limit = new Array;
            makeArray($obj.faction_zhiwei_limit, this.faction_zhiwei_limit);
            this.faction_lv_limit = $obj.faction_lv_limit;
            this.wait_time = $obj.wait_time;
            this.time = $obj.time;
            this.token_cost = $obj.token_cost;
            this.difficult = $obj.difficult;
            this.all_rewards = new Array;
            makeArray($obj.all_rewards, this.all_rewards);
        }
        TB_faction_boss.get_TB_faction_bossById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_faction_boss, $id);
            var $vo = new TB_faction_boss($obj);
            return $vo;
        };
        TB_faction_boss.get_TB_faction_boss = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_faction_boss);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_faction_boss($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_faction_boss;
    }());
    tb.TB_faction_boss = TB_faction_boss;
    var TB_faction_boss_reward = /** @class */ (function () {
        function TB_faction_boss_reward($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.monster_id = $obj.monster_id;
            this.rank = new Array;
            makeArray($obj.rank, this.rank);
            this.reward = new Array;
            makeArray($obj.reward, this.reward);
            this.fail_reward = new Array;
            makeArray($obj.fail_reward, this.fail_reward);
        }
        TB_faction_boss_reward.get_TB_faction_boss_rewardById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_faction_boss_reward, $id);
            var $vo = new TB_faction_boss_reward($obj);
            return $vo;
        };
        TB_faction_boss_reward.get_TB_faction_boss_reward = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_faction_boss_reward);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_faction_boss_reward($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_faction_boss_reward;
    }());
    tb.TB_faction_boss_reward = TB_faction_boss_reward;
    var TB_faction_building_base = /** @class */ (function () {
        function TB_faction_building_base($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.zhiwei_limit = new Array;
            makeArray($obj.zhiwei_limit, this.zhiwei_limit);
            this.speedup_cost = new Array;
            makeArray($obj.speedup_cost, this.speedup_cost);
            this.speedup_time = $obj.speedup_time;
            this.speedup_limit = $obj.speedup_limit;
            this.speedup_donate = $obj.speedup_donate;
        }
        TB_faction_building_base.get_TB_faction_building_baseById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_faction_building_base, $id);
            var $vo = new TB_faction_building_base($obj);
            return $vo;
        };
        TB_faction_building_base.get_TB_faction_building_base = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_faction_building_base);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_faction_building_base($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_faction_building_base;
    }());
    tb.TB_faction_building_base = TB_faction_building_base;
    var TB_faction_building = /** @class */ (function () {
        function TB_faction_building($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.type = $obj.type;
            this.level = $obj.level;
            this.name = $obj.name;
            this.unlock = $obj.unlock;
            this.need_buildinglv = new Array;
            makeArray($obj.need_buildinglv, this.need_buildinglv);
            this.cost = $obj.cost;
            this.time = $obj.time;
            this.can_lvup = $obj.can_lvup;
            this.desc = new Array;
            makeArray($obj.desc, this.desc);
            this.params = new Array;
            makeArray($obj.params, this.params);
            this.goto = $obj.goto;
            this.icon = $obj.icon;
            this.goto_sub = new Array;
            makeArray($obj.goto_sub, this.goto_sub);
            this.pos = new Array;
            makeArray($obj.pos, this.pos);
        }
        TB_faction_building.get_TB_faction_buildingById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_faction_building, $id);
            var $vo = new TB_faction_building($obj);
            return $vo;
        };
        TB_faction_building.get_TB_faction_building = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_faction_building);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_faction_building($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_faction_building;
    }());
    tb.TB_faction_building = TB_faction_building;
    var TB_faction_gift = /** @class */ (function () {
        function TB_faction_gift($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.point = $obj.point;
            this.reward = new Array;
            makeArray($obj.reward, this.reward);
            this.ex_reward = new Array;
            makeArray($obj.ex_reward, this.ex_reward);
        }
        TB_faction_gift.get_TB_faction_giftById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_faction_gift, $id);
            var $vo = new TB_faction_gift($obj);
            return $vo;
        };
        TB_faction_gift.get_TB_faction_gift = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_faction_gift);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_faction_gift($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_faction_gift;
    }());
    tb.TB_faction_gift = TB_faction_gift;
    var TB_talisman_base = /** @class */ (function () {
        function TB_talisman_base($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.quality = $obj.quality;
            this.model = $obj.model;
            this.icon = $obj.icon;
            this.avtivetype = $obj.avtivetype;
            this.passiveskill = new Array;
            makeArray($obj.passiveskill, this.passiveskill);
            this.avtivedata = new Array;
            makeArray($obj.avtivedata, this.avtivedata);
            this.props = new Array;
            makeArray($obj.props, this.props);
        }
        TB_talisman_base.get_TB_talisman_baseById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_talisman_base, $id);
            var $vo = new TB_talisman_base($obj);
            return $vo;
        };
        TB_talisman_base.get_TB_talisman_base = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_talisman_base);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_talisman_base($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_talisman_base;
    }());
    tb.TB_talisman_base = TB_talisman_base;
    var TB_mount_raise_level = /** @class */ (function () {
        function TB_mount_raise_level($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.cost = new Array;
            makeArray($obj.cost, this.cost);
            this.prosKeys = new Array;
            makeArray($obj.prosKeys, this.prosKeys);
            this.prosValues = new Array;
            makeArray($obj.prosValues, this.prosValues);
        }
        TB_mount_raise_level.get_TB_mount_raise_levelById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_mount_raise_level, $id);
            var $vo = new TB_mount_raise_level($obj);
            return $vo;
        };
        TB_mount_raise_level.get_TB_mount_raise_level = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_mount_raise_level);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_mount_raise_level($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_mount_raise_level;
    }());
    tb.TB_mount_raise_level = TB_mount_raise_level;
    var TB_talisman_spirit = /** @class */ (function () {
        function TB_talisman_spirit($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.talisman_id = $obj.talisman_id;
            this.level = $obj.level;
            this.attr_id = new Array;
            makeArray($obj.attr_id, this.attr_id);
            this.attr_value = new Array;
            makeArray($obj.attr_value, this.attr_value);
            this.item_cost = new Array;
            makeArray($obj.item_cost, this.item_cost);
        }
        TB_talisman_spirit.get_TB_talisman_spiritById = function ($index, $lev) {
            var $id = $index * 1000 + $lev;
            var $obj = TableData.getInstance().getData(TableData.tb_talisman_spirit, $id);
            var $vo = new TB_talisman_spirit($obj);
            return $vo;
        };
        TB_talisman_spirit.get_TB_talisman_spirit = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_talisman_spirit);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_talisman_spirit($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        TB_talisman_spirit.get_TB_talisman_spiritByIdArray = function ($id) {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_talisman_spirit);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_talisman_spirit($obj.data[$key]);
                if ($id == $vo.talisman_id) {
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_talisman_spirit;
    }());
    tb.TB_talisman_spirit = TB_talisman_spirit;
    var TB_equipdevelop_strength = /** @class */ (function () {
        function TB_equipdevelop_strength($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.part = $obj.part;
            this.level = $obj.level;
            this.rank = $obj.rank;
            this.star = $obj.star;
            this.props0 = new Array;
            makeArray($obj.props0, this.props0);
            this.props1 = new Array;
            makeArray($obj.props1, this.props1);
            this.props2 = new Array;
            makeArray($obj.props2, this.props2);
            this.cost = new Array;
            makeArray($obj.cost, this.cost);
        }
        TB_equipdevelop_strength.prototype.refrishById = function ($id) {
            var $v = Math.floor(($id - 1) / 2);
            if ($v == 0) {
                this.props = this.props0;
            }
            if ($v == 1) {
                this.props = this.props1;
            }
            if ($v == 2) {
                this.props = this.props2;
            }
        };
        TB_equipdevelop_strength.get_TB_equipdevelop_strengthById = function ($partid, $partlev) {
            var $id = $partid * 1000 + $partlev;
            var $obj = TableData.getInstance().getData(TableData.tb_equipdevelop_strength, $id);
            var $vo = new TB_equipdevelop_strength($obj);
            $vo.refrishById(GuidData.player.getCharType());
            return $vo;
        };
        TB_equipdevelop_strength.get_TB_equipdevelop_strength = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_equipdevelop_strength);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_equipdevelop_strength($obj.data[$key]);
                $vo.refrishById(GuidData.player.getCharType());
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_equipdevelop_strength;
    }());
    tb.TB_equipdevelop_strength = TB_equipdevelop_strength;
    var TB_equipdevelop_refine = /** @class */ (function () {
        function TB_equipdevelop_refine($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.part = $obj.part;
            this.rank = $obj.rank;
            this.star = $obj.star;
            this.lvup_type = $obj.lvup_type;
            this.chance = $obj.chance;
            this.fail_to_star = $obj.fail_to_star;
            this.advance_chance = $obj.advance_chance;
            this.cost = new Array;
            makeArray($obj.cost, this.cost);
            this.props0 = new Array;
            makeArray($obj.props0, this.props0);
            this.props1 = new Array;
            makeArray($obj.props1, this.props1);
            this.props2 = new Array;
            makeArray($obj.props2, this.props2);
            this.advance_cost = new Array;
            makeArray($obj.advance_cost, this.advance_cost);
            this.advance_by_money = new Array;
            makeArray($obj.advance_by_money, this.advance_by_money);
        }
        TB_equipdevelop_refine.prototype.refrishById = function ($id) {
            var $v = Math.floor(($id - 1) / 2);
            if ($v == 0) {
                this.props = this.props0;
            }
            if ($v == 1) {
                this.props = this.props1;
            }
            if ($v == 2) {
                this.props = this.props2;
            }
        };
        TB_equipdevelop_refine.get_TB_equipdevelop_refineById = function ($partid, $lev, $star) {
            var $id = $partid * 10000 + $lev * 100 + $star;
            var $obj = TableData.getInstance().getData(TableData.tb_equipdevelop_refine, $id);
            var $vo = new TB_equipdevelop_refine($obj);
            $vo.refrishById(GuidData.player.getCharType());
            return $vo;
        };
        TB_equipdevelop_refine.get_TB_equipdevelop_refine = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_equipdevelop_refine);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_equipdevelop_refine($obj.data[$key]);
                $vo.refrishById(GuidData.player.getCharType());
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_equipdevelop_refine;
    }());
    tb.TB_equipdevelop_refine = TB_equipdevelop_refine;
    var TB_equipdevelop_gem_part = /** @class */ (function () {
        function TB_equipdevelop_gem_part($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.gem_array = new Array;
            makeArray($obj.gem_array, this.gem_array);
            this.unlock_strength_lv = new Array;
            makeArray($obj.unlock_strength_lv, this.unlock_strength_lv);
            this.unlock_refine_lv = new Array;
            makeArray($obj.unlock_refine_lv, this.unlock_refine_lv);
        }
        TB_equipdevelop_gem_part.get_TB_equipdevelop_gem_partById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_equipdevelop_gem_part, $id);
            var $vo = new TB_equipdevelop_gem_part($obj);
            return $vo;
        };
        TB_equipdevelop_gem_part.get_TB_equipdevelop_gem_part = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_equipdevelop_gem_part);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_equipdevelop_gem_part($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_equipdevelop_gem_part;
    }());
    tb.TB_equipdevelop_gem_part = TB_equipdevelop_gem_part;
    var TB_equipdevelop_gem = /** @class */ (function () {
        function TB_equipdevelop_gem($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.type = $obj.type;
            this.level = $obj.level;
            this.props = new Array;
            makeArray($obj.props, this.props);
            this.cost = new Array;
            makeArray($obj.cost, this.cost);
        }
        TB_equipdevelop_gem.get_TB_equipdevelop_gemById = function ($gemid, $gemlev) {
            var $id = $gemid * 1000 + $gemlev;
            var $obj = TableData.getInstance().getData(TableData.tb_equipdevelop_gem, $id);
            var $vo = new TB_equipdevelop_gem($obj);
            return $vo;
        };
        TB_equipdevelop_gem.get_TB_equipdevelop_gem = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_equipdevelop_gem);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_equipdevelop_gem($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_equipdevelop_gem;
    }());
    tb.TB_equipdevelop_gem = TB_equipdevelop_gem;
    var TB_equipdevelop_washattrs = /** @class */ (function () {
        function TB_equipdevelop_washattrs($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.part = $obj.part;
            this.rare = $obj.rare;
            this.cost = new Array;
            makeArray($obj.cost, this.cost);
        }
        TB_equipdevelop_washattrs.get_TB_equipdevelop_washattrsById = function ($partid, $que) {
            var $id = $partid * 100 + $que;
            var $obj = TableData.getInstance().getData(TableData.tb_equipdevelop_washattrs, $id);
            var $vo = new TB_equipdevelop_washattrs($obj);
            return $vo;
        };
        TB_equipdevelop_washattrs.get_TB_equipdevelop_washattrs = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_equipdevelop_washattrs);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_equipdevelop_washattrs($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_equipdevelop_washattrs;
    }());
    tb.TB_equipdevelop_washattrs = TB_equipdevelop_washattrs;
    var TB_equipdevelop_bonus = /** @class */ (function () {
        function TB_equipdevelop_bonus($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.type = $obj.type;
            this.level = $obj.level;
            this.need_lv = new Array;
            makeArray($obj.need_lv, this.need_lv);
            this.props0 = new Array;
            makeArray($obj.props0, this.props0);
            this.props1 = new Array;
            makeArray($obj.props1, this.props1);
            this.props2 = new Array;
            makeArray($obj.props2, this.props2);
        }
        TB_equipdevelop_bonus.prototype.refrishById = function ($id) {
            var $v = Math.floor(($id - 1) / 2);
            if ($v == 0) {
                this.props = this.props0;
            }
            if ($v == 1) {
                this.props = this.props1;
            }
            if ($v == 2) {
                this.props = this.props2;
            }
        };
        TB_equipdevelop_bonus.get_TB_equipdevelop_bonusById = function ($type, $lev) {
            var $id = $type * 100 + $lev;
            var $obj = TableData.getInstance().getData(TableData.tb_equipdevelop_bonus, $id);
            var $vo = new TB_equipdevelop_bonus($obj);
            $vo.refrishById(GuidData.player.getCharType());
            return $vo;
        };
        TB_equipdevelop_bonus.get_TB_equipdevelop_bonus = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_equipdevelop_bonus);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_equipdevelop_bonus($obj.data[$key]);
                $vo.refrishById(GuidData.player.getCharType());
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_equipdevelop_bonus;
    }());
    tb.TB_equipdevelop_bonus = TB_equipdevelop_bonus;
    var TB_equipdevelop_base = /** @class */ (function () {
        function TB_equipdevelop_base($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.unlocklev = $obj.unlocklev;
        }
        TB_equipdevelop_base.get_TB_equipdevelop_baseById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_equipdevelop_base, $id);
            var $vo = new TB_equipdevelop_base($obj);
            return $vo;
        };
        TB_equipdevelop_base.get_TB_equipdevelop_base = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_equipdevelop_base);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_equipdevelop_base($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_equipdevelop_base;
    }());
    tb.TB_equipdevelop_base = TB_equipdevelop_base;
    var TB_battle_force = /** @class */ (function () {
        function TB_battle_force($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.rate0 = $obj.rate0;
            this.rate1 = $obj.rate1;
            this.rate2 = $obj.rate2;
        }
        TB_battle_force.prototype.refrishById = function ($id) {
            var $v = Math.floor(($id - 1) / 2);
            if ($v == 0) {
                this.rate = this.rate0;
            }
            if ($v == 1) {
                this.rate = this.rate1;
            }
            if ($v == 2) {
                this.rate = this.rate2;
            }
        };
        TB_battle_force.get_TB_battle_forceById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_battle_force, $id);
            var $vo = new TB_battle_force($obj);
            $vo.refrishById(GuidData.player.getCharType());
            return $vo;
        };
        TB_battle_force.get_TB_battle_force = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_battle_force);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_battle_force($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_battle_force;
    }());
    tb.TB_battle_force = TB_battle_force;
    var TB_rename_info = /** @class */ (function () {
        function TB_rename_info($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.range = new Array;
            makeArray($obj.range, this.range);
            this.costs = new Array;
            makeArray($obj.costs, this.costs);
        }
        TB_rename_info.get_TB_rename_infoById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_rename_info, $id);
            var $vo = new TB_rename_info($obj);
            return $vo;
        };
        TB_rename_info.get_TB_rename_info = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_rename_info);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_rename_info($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_rename_info;
    }());
    tb.TB_rename_info = TB_rename_info;
    var TB_enemy_revenge_buy = /** @class */ (function () {
        function TB_enemy_revenge_buy($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.cost = new Array;
            makeArray($obj.cost, this.cost);
        }
        TB_enemy_revenge_buy.get_TB_enemy_revenge_buyById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_enemy_revenge_buy, $id);
            var $vo = new TB_enemy_revenge_buy($obj);
            return $vo;
        };
        TB_enemy_revenge_buy.get_TB_enemy_revenge_buy = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_enemy_revenge_buy);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_enemy_revenge_buy($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_enemy_revenge_buy;
    }());
    tb.TB_enemy_revenge_buy = TB_enemy_revenge_buy;
    var TB_enemy_revenge_base = /** @class */ (function () {
        function TB_enemy_revenge_base($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.daily_revenge_times = $obj.daily_revenge_times;
        }
        TB_enemy_revenge_base.get_TB_enemy_revenge_baseById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_enemy_revenge_base, $id);
            var $vo = new TB_enemy_revenge_base($obj);
            return $vo;
        };
        return TB_enemy_revenge_base;
    }());
    tb.TB_enemy_revenge_base = TB_enemy_revenge_base;
    var TB_welfare_base = /** @class */ (function () {
        function TB_welfare_base($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.lev_info = $obj.lev_info;
            this.recharge_info = $obj.recharge_info;
            this.expense_info = $obj.expense_info;
        }
        TB_welfare_base.get_TB_welfare_baseById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_welfare_base, $id);
            var $vo = new TB_welfare_base($obj);
            return $vo;
        };
        return TB_welfare_base;
    }());
    tb.TB_welfare_base = TB_welfare_base;
    var TB_welfare_consume = /** @class */ (function () {
        function TB_welfare_consume($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.money = $obj.money;
            this.item = new Array;
            makeArray($obj.item, this.item);
        }
        TB_welfare_consume.get_TB_welfare_consumeById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_welfare_consume, $id);
            var $vo = new TB_welfare_consume($obj);
            return $vo;
        };
        TB_welfare_consume.get_TB_welfare_consume = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_welfare_consume);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_welfare_consume($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_welfare_consume;
    }());
    tb.TB_welfare_consume = TB_welfare_consume;
    var TB_welfare_recharge = /** @class */ (function () {
        function TB_welfare_recharge($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.money = $obj.money;
            this.item = new Array;
            makeArray($obj.item, this.item);
        }
        TB_welfare_recharge.get_TB_welfare_rechargeById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_welfare_recharge, $id);
            var $vo = new TB_welfare_recharge($obj);
            return $vo;
        };
        TB_welfare_recharge.get_TB_welfare_recharge = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_welfare_recharge);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_welfare_recharge($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_welfare_recharge;
    }());
    tb.TB_welfare_recharge = TB_welfare_recharge;
    var TB_welfare_sevengift = /** @class */ (function () {
        function TB_welfare_sevengift($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.item = new Array;
            makeArray($obj.item, this.item);
            this.show = $obj.show;
        }
        TB_welfare_sevengift.get_TB_welfare_sevengiftById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_welfare_sevengift, $id);
            var $vo = new TB_welfare_sevengift($obj);
            return $vo;
        };
        TB_welfare_sevengift.get_TB_welfare_sevengift = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_welfare_sevengift);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_welfare_sevengift($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_welfare_sevengift;
    }());
    tb.TB_welfare_sevengift = TB_welfare_sevengift;
    var TB_moneytree_base = /** @class */ (function () {
        function TB_moneytree_base($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.cost = new Array;
            makeArray($obj.cost, this.cost);
            this.rate = $obj.rate;
        }
        TB_moneytree_base.get_TB_moneytree_baseById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_moneytree_base, $id);
            var $vo = new TB_moneytree_base($obj);
            return $vo;
        };
        TB_moneytree_base.get_TB_moneytree_base = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_moneytree_base);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_moneytree_base($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_moneytree_base;
    }());
    tb.TB_moneytree_base = TB_moneytree_base;
    var TB_moneytree_lv = /** @class */ (function () {
        function TB_moneytree_lv($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.reward = new Array;
            makeArray($obj.reward, this.reward);
        }
        TB_moneytree_lv.get_TB_moneytree_lvById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_moneytree_lv, $id);
            var $vo = new TB_moneytree_lv($obj);
            return $vo;
        };
        TB_moneytree_lv.get_TB_moneytree_lv = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_moneytree_lv);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_moneytree_lv($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_moneytree_lv;
    }());
    tb.TB_moneytree_lv = TB_moneytree_lv;
    var TB_moneytree_gift = /** @class */ (function () {
        function TB_moneytree_gift($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.rewards = new Array;
            makeArray($obj.rewards, this.rewards);
            this.count = $obj.count;
        }
        TB_moneytree_gift.get_TB_moneytree_giftById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_moneytree_gift, $id);
            var $vo = new TB_moneytree_gift($obj);
            return $vo;
        };
        TB_moneytree_gift.get_TB_moneytree_gift = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_moneytree_gift);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_moneytree_gift($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_moneytree_gift;
    }());
    tb.TB_moneytree_gift = TB_moneytree_gift;
    var TB_char_skill = /** @class */ (function () {
        function TB_char_skill($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.unlocks = new Array;
            makeArray($obj.unlocks, this.unlocks);
        }
        TB_char_skill.get_TB_char_skillById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_char_skill, $id);
            var $vo = new TB_char_skill($obj);
            return $vo;
        };
        TB_char_skill.get_TB_char_skill = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_char_skill);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_char_skill($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_char_skill;
    }());
    tb.TB_char_skill = TB_char_skill;
    var Tb_buff_effect = /** @class */ (function () {
        function Tb_buff_effect($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.value = $obj.value;
        }
        Tb_buff_effect.get_Tb_buff_effectById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_buff_effect, $id);
            var $vo = new Tb_buff_effect($obj);
            return $vo;
        };
        Tb_buff_effect.get_Tb_buff_effect = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_buff_effect);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new Tb_buff_effect($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return Tb_buff_effect;
    }());
    tb.Tb_buff_effect = Tb_buff_effect;
    var Tb_private_boss_info = /** @class */ (function () {
        function Tb_private_boss_info($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.mapId = $obj.mapId;
            this.bossEntry = $obj.bossEntry;
            this.rebornTime = $obj.rebornTime;
            this.maxTimes = $obj.maxTimes;
            this.permitLevel = $obj.permitLevel;
            this.force = $obj.force;
            this.show_0 = new Array;
            makeArray($obj.show_0, this.show_0);
            this.show_1 = new Array;
            makeArray($obj.show_1, this.show_1);
            this.show_2 = new Array;
            makeArray($obj.show_2, this.show_2);
        }
        Tb_private_boss_info.prototype.refrishById = function ($id) {
            var $v = Math.floor(($id - 1) / 2);
            if ($v == 0) {
                this.show = this.show_0;
            }
            if ($v == 1) {
                this.show = this.show_1;
            }
            if ($v == 2) {
                this.show = this.show_2;
            }
        };
        Tb_private_boss_info.get_Tb_private_boss_infoById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_private_boss_info, $id);
            var $vo = new Tb_private_boss_info($obj);
            $vo.refrishById(GuidData.player.getCharType());
            return $vo;
        };
        Tb_private_boss_info.get_Tb_private_boss_info = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_private_boss_info);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new Tb_private_boss_info($obj.data[$key]);
                $vo.refrishById(GuidData.player.getCharType());
                $arr.push($vo);
            }
            return $arr;
        };
        return Tb_private_boss_info;
    }());
    tb.Tb_private_boss_info = Tb_private_boss_info;
    var TB_group_type = /** @class */ (function () {
        function TB_group_type($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.sort = $obj.sort;
            this.lv = $obj.lv;
            this.name = $obj.name;
            this.min_lev = new Array;
            makeArray($obj.min_lev, this.min_lev);
            this.max_lev = new Array;
            makeArray($obj.max_lev, this.max_lev);
        }
        TB_group_type.get_TB_group_typeById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_group_type, $id);
            var $vo = new TB_group_type($obj);
            return $vo;
        };
        TB_group_type.get_TB_group_type = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_group_type);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_group_type($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_group_type;
    }());
    tb.TB_group_type = TB_group_type;
    var Tb_private_boss_buff = /** @class */ (function () {
        function Tb_private_boss_buff($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.force_range_left = $obj.force_range_left;
            this.force_range_right = $obj.force_range_right;
            this.buffeffect_id = $obj.buffeffect_id;
        }
        Tb_private_boss_buff.get_Tb_private_boss_buffById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_private_boss_buff, $id);
            var $vo = new Tb_private_boss_buff($obj);
            return $vo;
        };
        Tb_private_boss_buff.get_Tb_private_boss_buff = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_private_boss_buff);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new Tb_private_boss_buff($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return Tb_private_boss_buff;
    }());
    tb.Tb_private_boss_buff = Tb_private_boss_buff;
    var TB_red_point = /** @class */ (function () {
        function TB_red_point($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.tip = $obj.tip;
            this.link = new Array;
            makeArray($obj.link, this.link);
        }
        TB_red_point.get_TB_red_pointById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_red_point, $id);
            var $vo = new TB_red_point($obj);
            return $vo;
        };
        return TB_red_point;
    }());
    tb.TB_red_point = TB_red_point;
    var TB_quest_adventure_base = /** @class */ (function () {
        function TB_quest_adventure_base($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.type = $obj.type;
            this.quest_id = $obj.quest_id;
            this.map_id = $obj.map_id;
            this.upres = new Array;
            makeArray($obj.upres, this.upres);
        }
        TB_quest_adventure_base.get_TB_quest_adventure_baseById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_quest_adventure_base, $id);
            var $vo = new TB_quest_adventure_base($obj);
            return $vo;
        };
        TB_quest_adventure_base.get_TB_quest_adventure_base = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_quest_adventure_base);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_quest_adventure_base($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_quest_adventure_base;
    }());
    tb.TB_quest_adventure_base = TB_quest_adventure_base;
    var TB_adventure_skill_base = /** @class */ (function () {
        function TB_adventure_skill_base($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.line = $obj.line;
            this.order = $obj.order;
            this.prev_limit = new Array;
            makeArray($obj.prev_limit, this.prev_limit);
            this.cost = new Array;
            makeArray($obj.cost, this.cost);
            this.goto = new Array;
            makeArray($obj.goto, this.goto);
        }
        TB_adventure_skill_base.get_TB_adventure_skill_baseById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_adventure_skill_base, $id);
            var $vo = new TB_adventure_skill_base($obj);
            return $vo;
        };
        TB_adventure_skill_base.get_TB_quest_adventure_base = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_adventure_skill_base);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_adventure_skill_base($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_adventure_skill_base;
    }());
    tb.TB_adventure_skill_base = TB_adventure_skill_base;
    var TB_recharge_7day_extra_reward = /** @class */ (function () {
        function TB_recharge_7day_extra_reward($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.day = $obj.day;
            this.reward = new Array;
            makeArray($obj.reward, this.reward);
        }
        TB_recharge_7day_extra_reward.get_TB_recharge_7day_extra_rewardById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_recharge_7day_extra_reward, $id);
            var $vo = new TB_recharge_7day_extra_reward($obj);
            return $vo;
        };
        TB_recharge_7day_extra_reward.get_TB_quest_adventure_base = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_recharge_7day_extra_reward);
            // //console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo = new TB_recharge_7day_extra_reward($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_recharge_7day_extra_reward;
    }());
    tb.TB_recharge_7day_extra_reward = TB_recharge_7day_extra_reward;
})(tb || (tb = {}));
var ResTabelVo = /** @class */ (function () {
    function ResTabelVo() {
        this.size = 0;
        this.maxId = 0;
    }
    ResTabelVo.prototype.parseTable = function ($name, $typs, $field, $data) {
        this.name = $name;
        this.field = $field.split(",");
        this.typs = $typs.split(",");
        var lines = $data.split(String.fromCharCode(1));
        var tw = this.field.length;
        var th = lines.length / tw; //行数
        var id = 0;
        this.data = new Object;
        var maxId = 0;
        for (var i = 0; i < th; i++) {
            //   var $celarr: Array<string> = new Array;
            var obj = new Object;
            for (var j = 0; j < tw; j++) {
                var $str = lines[id];
                //      $celarr.push(tempCell);
                switch (this.typs[j]) {
                    case "int":
                        obj[this.field[j]] = Number($str);
                        break;
                    case "string":
                        obj[this.field[j]] = $str;
                        break;
                    case "array":
                        try {
                            obj[this.field[j]] = JSON.parse($str);
                        }
                        catch (ex) {
                            //console.log($name,i,this.field[j], $str)
                            throw new Error("数据表有错");
                        }
                        break;
                    default:
                        obj[this.field[j]] = $str;
                        break;
                }
                id++;
            }
            this.data[obj.id] = obj;
            if (obj.id > maxId) {
                maxId = obj.id;
            }
        }
        this.size = th;
        this.maxId = maxId;
    };
    ResTabelVo.prototype.getDataByID = function ($id) {
        return this.data[$id];
    };
    return ResTabelVo;
}());
var TableData = /** @class */ (function () {
    function TableData() {
        this.tb = new Object;
    }
    TableData.getInstance = function () {
        if (!this._instance) {
            this._instance = new TableData();
        }
        return this._instance;
    };
    TableData.prototype.loadGameData = function ($fun, $progessFun) {
        var _this = this;
        if ($fun === void 0) { $fun = null; }
        if ($progessFun === void 0) { $progessFun = null; }
        var configUrl = Scene_data.fileRoot + "data/scene.txt";
        var tbUrl = Scene_data.fileRoot + "data/tb.txt";
        var configComplete = false;
        var tbComplte = false;
        var loadFun = function () {
            if (configComplete && tbComplte) {
                $fun();
            }
        };
        LoadManager.getInstance().load(configUrl, LoadManager.XML_TYPE, function ($str) {
            SceneRes.sceneConfigData = JSON.parse($str);
            configComplete = true;
            loadFun();
        });
        LoadManager.getInstance().load(tbUrl, LoadManager.XML_TYPE, function ($str) {
            _this.parseLineByStr($str);
            tbComplte = true;
            loadFun();
        }, null, $progessFun);
    };
    TableData.prototype.loadZipGameData = function ($fun, $progessFun) {
        var _this = this;
        if ($fun === void 0) { $fun = null; }
        if ($progessFun === void 0) { $progessFun = null; }
        var tbUrl = Scene_data.fileRoot + "data/tb.zip.txt" + "?v=" + GameStart.appVersion;
        LoadManager.getInstance().load(tbUrl, LoadManager.BYTE_TYPE, function ($buf) {
            var byte = new ByteArray($buf);
            var zipLength = byte.readInt();
            var zipBuf = $buf.slice(4, 4 + zipLength);
            byte.position += zipLength;
            var sceneLenght = byte.readInt();
            var str = byte.readUTFBytes(sceneLenght);
            SceneRes.sceneConfigData = JSON.parse(str);
            ////console.log(this.sceneConfigData);
            zipBuf = unZip(zipBuf);
            byte = new ByteArray(zipBuf);
            //var t:number = TimeUtil.getTimer();
            str = byte.readUTFBytes(byte.length);
            ////console.log(TimeUtil.getTimer() - t);
            _this.parseLineByStr(str);
            ////console.log(TimeUtil.getTimer() - t);
            $fun();
        }, null, $progessFun);
    };
    TableData.prototype.loadTbDataByName = function ($tbName, $fun) {
        var _this = this;
        if ($fun === void 0) { $fun = null; }
        var $url = Scene_data.fileRoot + "data/" + $tbName + ".txt";
        LoadManager.getInstance().load($url, LoadManager.XML_TYPE, function ($str) {
            _this.parseLineByStr($str);
            if ($fun) {
                $fun();
            }
        });
    };
    TableData.prototype.loadTbItemByArr = function ($item, $fun) {
        var _this = this;
        if ($item.length > 0) {
            var $url = Scene_data.fileRoot + "data/" + $item.pop() + ".txt";
            LoadManager.getInstance().load($url, LoadManager.XML_TYPE, function ($str) {
                _this.parseLineByStr($str);
                _this.loadTbItemByArr($item, $fun);
            });
        }
        else {
            $fun();
        }
    };
    TableData.prototype.parseLineByStr = function ($str) {
        var lines = $str.split(String.fromCharCode(13));
        var loop = lines.length / 4;
        for (var i = 0; i < loop; ++i) {
            var $name = lines[i * 4 + 0];
            var $field = lines[i * 4 + 1];
            var $typs = lines[i * 4 + 2];
            var $data = lines[i * 4 + 3];
            var vo = new ResTabelVo();
            vo.parseTable($name, $typs, $field, $data);
            // console.log("表", $name);
            // if ($name == TableData.tb_skill_uplevel) {
            //        console.log("表", $name);
            // }
            this.tb[$name] = vo;
        }
        this.processExtData();
        ////console.log("parse table data Over");
    };
    TableData.prototype.getData = function ($tbName, $id) {
        if (this.tb[$tbName]) {
            return this.tb[$tbName].getDataByID($id);
        }
        return null;
    };
    TableData.prototype.getTabSize = function ($tbName) {
        if (this.tb[$tbName]) {
            return this.tb[$tbName].size;
        }
        return 0;
    };
    TableData.prototype.getTabMaxID = function ($tbName) {
        if (this.tb[$tbName]) {
            return this.tb[$tbName].maxId;
        }
        return 0;
    };
    TableData.prototype.getTableByName = function ($tbName) {
        if (this.tb[$tbName]) {
            return this.tb[$tbName];
        }
        return null;
    };
    TableData.prototype.processExtData = function () {
        var dic = this.tb[TableData.tb_risk_data].data;
        for (var key in dic) {
            var item = dic[key];
            if (dic[item.nextId]) {
                dic[item.nextId].parentid = item.id;
            }
        }
    };
    //   public static BAG: string = "tb_item_template";
    TableData.tb_creature_template = "tb_creature_template";
    TableData.tb_item_slot = "tb_item_slot";
    TableData.tb_skill_base = "tb_skill_base";
    TableData.tb_skill_uplevel = "tb_skill_uplevel";
    TableData.tb_gameobject_template = "tb_gameobject_template";
    TableData.tb_skill_show = "tb_skill_show";
    TableData.tb_char_skill = "tb_char_skill";
    TableData.tb_anger_limit = "tb_anger_limit";
    TableData.tb_learn_spell = "tb_learn_spell";
    TableData.tb_assistangerspell_upgrade = "tb_assistangerspell_upgrade";
    TableData.tb_mount_illusion = "tb_mount_illusion";
    TableData.tb_mount_base = "tb_mount_base";
    TableData.tb_mount_upgrade = "tb_mount_upgrade";
    TableData.tb_mount_train = "tb_mount_train";
    TableData.tb_item_template = "tb_item_template";
    TableData.tb_strengthen_bless = "tb_strengthen_bless";
    TableData.tb_strengthen_base = "tb_strengthen_base";
    TableData.tb_strengthen_mul = "tb_strengthen_mul";
    TableData.tb_gem_pos = "tb_gem_pos";
    TableData.tb_gem_cost = "tb_gem_cost";
    TableData.tb_gem_icon = "tb_gem_icon";
    TableData.tb_gem_base = "tb_gem_base";
    TableData.tb_gem_mul = "tb_gem_mul";
    TableData.tb_divine_base = "tb_divine_base";
    TableData.tb_divine_streng = "tb_divine_streng";
    TableData.tb_divine_clinet = "tb_divine_clinet";
    TableData.tb_divine_bless = "tb_divine_bless";
    TableData.tb_map_vip = "tb_map_vip";
    TableData.tb_map = "tb_map";
    TableData.tb_map_field_boss_time = "tb_map_field_boss_time";
    TableData.tb_instance_trial = "tb_instance_trial";
    TableData.tb_quest_vip_instance = "tb_quest_vip_instance";
    TableData.tb_hook_quality = "tb_hook_quality";
    TableData.tb_hook_hp_item = "tb_hook_hp_item";
    TableData.tb_store = "tb_store"; //商店 银俩
    TableData.tb_shop = "tb_shop"; //商城 元宝
    TableData.tb_shop_item_relate_id = "tb_shop_item_relate_id"; //商城 元宝
    TableData.tb_shop_base = "tb_shop_base";
    TableData.tb_social_familiay = "tb_social_familiay";
    TableData.tb_social_shop = "tb_social_shop";
    TableData.tb_msg_text_type = "tb_msg_text_type";
    TableData.tb_map_field_boss = "tb_map_field_boss";
    TableData.tb_world_map = "tb_world_map";
    TableData.tb_faction_icon = "tb_faction_icon";
    TableData.tb_faction_creat = "tb_faction_creat";
    TableData.tb_faction_base = "tb_faction_base";
    TableData.tb_faction_zhiwei = "tb_faction_zhiwei";
    TableData.tb_faction_donation = "tb_faction_donation";
    TableData.tb_faction_shop = "tb_faction_shop";
    TableData.tb_map_object = "tb_map_object";
    TableData.tb_map_navigation = "tb_map_navigation";
    TableData.tb_worldboss_base = "tb_worldboss_base";
    TableData.tb_worldboss_rank_reward = "tb_worldboss_rank_reward";
    TableData.tb_worldboss_time = "tb_worldboss_time";
    TableData.tb_instance_res = "tb_instance_res";
    TableData.tb_vip_base = "tb_vip_base";
    TableData.tb_rank_reward = "tb_rank_reward";
    TableData.tb_msg = "tb_msg";
    TableData.tb_social_num = "tb_social_num";
    TableData.tb_activity_base = "tb_activity_base";
    TableData.tb_activity_reward = "tb_activity_reward";
    TableData.tb_quest = "tb_quest";
    TableData.tb_achieve_base = "tb_achieve_base";
    TableData.tb_achieve_progress = "tb_achieve_progress";
    TableData.tb_activity_time = "tb_activity_time";
    TableData.tb_activity_lottery_base = "tb_activity_lottery_base";
    TableData.tb_activity_lottery_high = "tb_activity_lottery_high";
    TableData.tb_activity_lottery_middle = "tb_activity_lottery_middle";
    TableData.tb_activity_lottery_low = "tb_activity_lottery_low";
    TableData.tb_activity_rank_base = "tb_activity_rank_base";
    TableData.tb_activity_rank_process_reward = "tb_activity_rank_process_reward";
    TableData.tb_activity_rank_rank_reward = "tb_activity_rank_rank_reward";
    TableData.tb_activity_limit_gift_base = "tb_activity_limit_gift_base";
    TableData.tb_activity_daily_gift_base = "tb_activity_daily_gift_base";
    TableData.tb_activity_limit_gift = "tb_activity_limit_gift";
    TableData.tb_activity_daily_gift = "tb_activity_daily_gift";
    TableData.tb_title_base = "tb_title_base";
    TableData.tb_shop_chongzhi = "tb_shop_chongzhi";
    TableData.tb_creature_dialogue = "tb_creature_dialogue";
    TableData.tb_quest_chapter = "tb_quest_chapter";
    TableData.tb_welfare_shouchong = "tb_welfare_shouchong";
    TableData.tb_welfare_checkin = "tb_welfare_checkin";
    TableData.tb_welfare_checkin_all = "tb_welfare_checkin_all";
    TableData.tb_welfare_level = "tb_welfare_level";
    TableData.tb_welfare_back = "tb_welfare_back";
    TableData.tb_welfare_level_show = "tb_welfare_level_show";
    TableData.tb_kuafu3v3_base = "tb_kuafu3v3_base";
    TableData.tb_kuafu3v3_month_reward = "tb_kuafu3v3_month_reward";
    TableData.tb_kuafu3v3_day_reward = "tb_kuafu3v3_day_reward";
    TableData.tb_kuafu3v3_week_reward = "tb_kuafu3v3_week_reward";
    TableData.tb_local3v3_daily_reward = "tb_local3v3_daily_reward";
    TableData.tb_kuafu_xianfu_base = "tb_kuafu_xianfu_base";
    TableData.tb_kuafu_xianfu_condition = "tb_kuafu_xianfu_condition";
    TableData.tb_doujiantai_first = "tb_doujiantai_first";
    TableData.tb_doujiantai_day = "tb_doujiantai_day";
    TableData.tb_doujiantai_combat_win = "tb_doujiantai_combat_win";
    TableData.tb_doujiantai_base = "tb_doujiantai_base";
    TableData.tb_map_jump_point_detail = "tb_map_jump_point_detail";
    TableData.tb_quest_daily_base = "tb_quest_daily_base";
    TableData.tb_quest_daily2_base = "tb_quest_daily2_base";
    TableData.tb_quest_daily2 = "tb_quest_daily2";
    TableData.tb_quest_daily2_set = "tb_quest_daily2_set";
    TableData.tb_system_preview = "tb_system_preview";
    TableData.tb_quest_daily2_finish_reward = "tb_quest_daily2_finish_reward";
    TableData.tb_system_base = "tb_system_base";
    TableData.tb_item_quality_color = "tb_item_quality_color";
    TableData.tb_system_icon = "tb_system_icon";
    TableData.tb_bianqiang_sub = "tb_bianqiang_sub";
    TableData.tb_bianqiang_value = "tb_bianqiang_value";
    TableData.tb_bianqiang_rank = "tb_bianqiang_rank";
    TableData.tb_system_guide = "tb_system_guide";
    TableData.tb_xiulianchang_base = "tb_xiulianchang_base";
    TableData.tb_xiulianchang_vip = "tb_xiulianchang_vip";
    TableData.tb_xiulianchang_reward = "tb_xiulianchang_reward";
    TableData.tb_char_level = "tb_char_level";
    TableData.tb_item_illusion = "tb_item_illusion";
    TableData.tb_login_activity_preview = "tb_login_activity_preview";
    TableData.tb_login_activity_reward = "tb_login_activity_reward";
    TableData.tb_worldboss_roll = "tb_worldboss_roll";
    TableData.tb_faction_boss = "tb_faction_boss";
    TableData.tb_faction_boss_reward = "tb_faction_boss_reward";
    TableData.tb_faction_gift_rank_reward = "tb_faction_gift_rank_reward";
    TableData.tb_risk_data = "tb_risk_data";
    TableData.tb_risk_base = "tb_risk_base";
    TableData.tb_risk_chapter = "tb_risk_chapter";
    TableData.tb_risk_menu = "tb_risk_menu";
    TableData.tb_faction_building_base = "tb_faction_building_base";
    TableData.tb_faction_building = "tb_faction_building";
    TableData.tb_faction_gift = "tb_faction_gift";
    TableData.tb_faction_privilege = "tb_faction_privilege";
    TableData.tb_faction_match_champion = "tb_faction_match_champion";
    TableData.tb_talisman_base = "tb_talisman_base";
    TableData.tb_talisman_spirit = "tb_talisman_spirit";
    TableData.tb_mass_boss_info = "tb_mass_boss_info";
    TableData.tb_mass_boss_base = "tb_mass_boss_base";
    TableData.tb_mass_boss_times = "tb_mass_boss_times";
    TableData.tb_wings_bless = "tb_wings_bless";
    TableData.tb_wings_base = "tb_wings_base";
    TableData.tb_wings_strength = "tb_wings_strength";
    TableData.tb_group_instance_base = "tb_group_instance_base";
    TableData.tb_group_instance_buy = "tb_group_instance_buy";
    TableData.tb_meridian_info = "tb_meridian_info";
    TableData.tb_meridian_source = "tb_meridian_source";
    TableData.tb_mount_raise_level = "tb_mount_raise_level";
    TableData.tb_meridian_item = "tb_meridian_item";
    TableData.tb_faction_bossdefense_pool = "tb_faction_bossdefense_pool";
    TableData.tb_faction_bossdefense_point = "tb_faction_bossdefense_point";
    TableData.tb_faction_bossdefense_base = "tb_faction_bossdefense_base";
    TableData.tb_faction_tower_base = "tb_faction_tower_base";
    TableData.tb_faction_tower_floor = "tb_faction_tower_floor";
    TableData.tb_single_pvp_base = "tb_single_pvp_base";
    TableData.tb_single_pvp_extra = "tb_single_pvp_extra";
    TableData.tb_single_pvp_grade = "tb_single_pvp_grade";
    TableData.tb_single_pvp_times = "tb_single_pvp_times";
    TableData.tb_buff_effect = "tb_buff_effect";
    TableData.tb_buff_base = "tb_buff_base";
    TableData.tb_equipdevelop_strength = "tb_equipdevelop_strength";
    TableData.tb_equipdevelop_refine = "tb_equipdevelop_refine";
    TableData.tb_equipdevelop_gem_part = "tb_equipdevelop_gem_part";
    TableData.tb_equipdevelop_gem = "tb_equipdevelop_gem";
    TableData.tb_equipdevelop_washattrs = "tb_equipdevelop_washattrs";
    TableData.tb_equipdevelop_bonus = "tb_equipdevelop_bonus";
    TableData.tb_faction_skill_base = "tb_faction_skill_base";
    TableData.tb_faction_skill_building = "tb_faction_skill_building";
    TableData.tb_faction_skill_lvup = "tb_faction_skill_lvup";
    TableData.tb_appearance_info = "tb_appearance_info";
    TableData.tb_appearance_pokedex = "tb_appearance_pokedex";
    TableData.tb_char_info = "tb_char_info";
    TableData.tb_battle_force = "tb_battle_force";
    TableData.tb_equipdevelop_base = "tb_equipdevelop_base";
    TableData.tb_rename_info = "tb_rename_info";
    TableData.tb_enemy_revenge_base = "tb_enemy_revenge_base";
    TableData.tb_enemy_revenge_buy = "tb_enemy_revenge_buy";
    TableData.tb_red_point = "tb_red_point";
    TableData.tb_welfare_base = "tb_welfare_base";
    TableData.tb_welfare_consume = "tb_welfare_consume";
    TableData.tb_welfare_recharge = "tb_welfare_recharge";
    TableData.tb_welfare_sevengift = "tb_welfare_sevengift";
    TableData.tb_moneytree_base = "tb_moneytree_base";
    TableData.tb_moneytree_lv = "tb_moneytree_lv";
    TableData.tb_moneytree_gift = "tb_moneytree_gift";
    TableData.tb_creature_worldrisk = "tb_creature_worldrisk";
    TableData.tb_private_boss_info = "tb_private_boss_info";
    TableData.tb_private_boss_buff = "tb_private_boss_buff";
    TableData.tb_restore_potion_base = "tb_restore_potion_base";
    TableData.tb_item_output = "tb_item_output";
    TableData.tb_quest_adventure_base = "tb_quest_adventure_base";
    TableData.tb_adventure_skill_base = "tb_adventure_skill_base";
    TableData.tb_equip_suit_base = "tb_equip_suit_base";
    TableData.tb_equip_suit_effect = "tb_equip_suit_effect";
    TableData.tb_achieve_page = "tb_achieve_page";
    TableData.tb_realmbreak_dailyquest_base = "tb_realmbreak_dailyquest_base";
    TableData.tb_realmbreak_base = "tb_realmbreak_base";
    TableData.tb_instance_stage_chapter = "tb_instance_stage_chapter";
    TableData.tb_instance_stage = "tb_instance_stage";
    TableData.tb_instance_stage_bonus = "tb_instance_stage_bonus";
    TableData.tb_instance_stage_base = "tb_instance_stage_base";
    TableData.tb_instance_stage_auto = "tb_instance_stage_auto";
    TableData.tb_instance_group_exp = "tb_instance_group_exp";
    TableData.tb_faction_match_phase = "tb_faction_match_phase";
    TableData.tb_faction_match_base = "tb_faction_match_base";
    TableData.tb_faction_match_winstrike = "tb_faction_match_winstrike";
    TableData.tb_offline_exp_base = "tb_offline_exp_base";
    TableData.tb_talisman_slot = "tb_talisman_slot";
    TableData.tb_group_type = "tb_group_type";
    TableData.tb_group_exp = "tb_group_exp";
    TableData.tb_item_sort_cd = "tb_item_sort_cd";
    TableData.tb_vip_uplev = "tb_vip_uplev";
    TableData.tb_recharge_7day_extra_reward = "tb_recharge_7day_extra_reward";
    TableData.tb_recharge_7day_reward = "tb_recharge_7day_reward";
    TableData.tb_recharge_first_reward = "tb_recharge_first_reward";
    TableData.tb_refill_main_poppanel_level = "tb_refill_main_poppanel_level";
    TableData.tb_recharge_wheel = "tb_recharge_wheel";
    return TableData;
}());
//# sourceMappingURL=TableData.js.map