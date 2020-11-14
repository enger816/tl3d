/***********************************************************************/
/*************** 本代码由协议工具自动生成，请勿手动修改 ****************/
/***********************************************************************/
var Pan3d;
(function (Pan3d) {
    var point = /** @class */ (function () {
        function point() {
        }
        /**
         从输入二进制流中读取结构体
         */
        point.prototype.read = function (input) {
            var i;
            this.pos_x = input.readFloat();
            this.pos_y = input.readFloat();
        };
        /**
         * 将结构体写入到输出二进制流中
         */
        point.prototype.write = function (output) {
            var i;
            output.writeFloat(this.pos_x);
            output.writeFloat(this.pos_y);
        };
        return point;
    }());
    Pan3d.point = point;
    var taxi_menu_info = /** @class */ (function () {
        function taxi_menu_info() {
            /**
             * 传送地点名称
             */
            this.taxi_text = ""; //String
        }
        /**
         从输入二进制流中读取结构体
         */
        taxi_menu_info.prototype.read = function (input) {
            var i;
            this.id = input.readInt32();
            this.taxi_text = input.readStringByLen(50);
            this.map_id = input.readUint32();
            this.pos_x = input.readUint16();
            this.pos_y = input.readUint16();
        };
        /**
         * 将结构体写入到输出二进制流中
         */
        taxi_menu_info.prototype.write = function (output) {
            var i;
            output.writeInt32(this.id);
            output.writeStringByLen(this.taxi_text, 50);
            output.writeUint32(this.map_id);
            output.writeUint16(this.pos_x);
            output.writeUint16(this.pos_y);
        };
        return taxi_menu_info;
    }());
    Pan3d.taxi_menu_info = taxi_menu_info;
    var char_create_info = /** @class */ (function () {
        function char_create_info() {
            /**
             * 名称
             */
            this.name = ""; //String
            /**
             *
             */
            this.guid = ""; //String
            /**
             * 邀请的帮派id
             */
            this.inviteGuid = ""; //String
            /**
             * 创建的帮派名称
             */
            this.faction_name = ""; //String
        }
        /**
         从输入二进制流中读取结构体
         */
        char_create_info.prototype.read = function (input) {
            var i;
            this.name = input.readStringByLen(50);
            this.faction = input.readUint8();
            this.gender = input.readUint8();
            this.level = input.readUint16();
            this.guid = input.readStringByLen(50);
            this.head_id = input.readUint32();
            this.hair_id = input.readUint32();
            this.race = input.readUint8();
            this.inviteGuid = input.readStringByLen(50);
            this.faction_name = input.readStringByLen(50);
            this.icon = input.readUint8();
        };
        /**
         * 将结构体写入到输出二进制流中
         */
        char_create_info.prototype.write = function (output) {
            var i;
            output.writeStringByLen(this.name, 50);
            output.writeUint8(this.faction);
            output.writeUint8(this.gender);
            output.writeUint16(this.level);
            output.writeStringByLen(this.guid, 50);
            output.writeUint32(this.head_id);
            output.writeUint32(this.hair_id);
            output.writeUint8(this.race);
            output.writeStringByLen(this.inviteGuid, 50);
            output.writeStringByLen(this.faction_name, 50);
            output.writeUint8(this.icon);
        };
        return char_create_info;
    }());
    Pan3d.char_create_info = char_create_info;
    var quest_option = /** @class */ (function () {
        function quest_option() {
            /**
             * 任务标题
             */
            this.quest_title = ""; //String
        }
        /**
         从输入二进制流中读取结构体
         */
        quest_option.prototype.read = function (input) {
            var i;
            this.quest_id = input.readUint32();
            this.quest_icon = input.readUint32();
            this.quest_level = input.readUint16();
            this.quest_title = input.readStringByLen(50);
            this.flags = input.readUint32();
        };
        /**
         * 将结构体写入到输出二进制流中
         */
        quest_option.prototype.write = function (output) {
            var i;
            output.writeUint32(this.quest_id);
            output.writeUint32(this.quest_icon);
            output.writeUint16(this.quest_level);
            output.writeStringByLen(this.quest_title, 50);
            output.writeUint32(this.flags);
        };
        return quest_option;
    }());
    Pan3d.quest_option = quest_option;
    var quest_canaccept_info = /** @class */ (function () {
        function quest_canaccept_info() {
            /**
             * 标题
             */
            this.title = ""; //String
        }
        /**
         从输入二进制流中读取结构体
         */
        quest_canaccept_info.prototype.read = function (input) {
            var i;
            this.quest_id = input.readUint32();
            this.quest_type = input.readUint8();
            this.title = input.readStringByLen(50);
            this.npc_id = input.readUint32();
            this.quest_level = input.readUint32();
        };
        /**
         * 将结构体写入到输出二进制流中
         */
        quest_canaccept_info.prototype.write = function (output) {
            var i;
            output.writeUint32(this.quest_id);
            output.writeUint8(this.quest_type);
            output.writeStringByLen(this.title, 50);
            output.writeUint32(this.npc_id);
            output.writeUint32(this.quest_level);
        };
        return quest_canaccept_info;
    }());
    Pan3d.quest_canaccept_info = quest_canaccept_info;
    var gossip_menu_option_info = /** @class */ (function () {
        function gossip_menu_option_info() {
            /**
             * 选项文本
             */
            this.option_title = ""; //String
        }
        /**
         从输入二进制流中读取结构体
         */
        gossip_menu_option_info.prototype.read = function (input) {
            var i;
            this.id = input.readInt32();
            this.option_icon = input.readInt32();
            this.option_title = input.readStringByLen(200);
        };
        /**
         * 将结构体写入到输出二进制流中
         */
        gossip_menu_option_info.prototype.write = function (output) {
            var i;
            output.writeInt32(this.id);
            output.writeInt32(this.option_icon);
            output.writeStringByLen(this.option_title, 200);
        };
        return gossip_menu_option_info;
    }());
    Pan3d.gossip_menu_option_info = gossip_menu_option_info;
    var item_cooldown_info = /** @class */ (function () {
        function item_cooldown_info() {
        }
        /**
         从输入二进制流中读取结构体
         */
        item_cooldown_info.prototype.read = function (input) {
            var i;
            this.item = input.readUint32();
            this.cooldown = input.readUint32();
        };
        /**
         * 将结构体写入到输出二进制流中
         */
        item_cooldown_info.prototype.write = function (output) {
            var i;
            output.writeUint32(this.item);
            output.writeUint32(this.cooldown);
        };
        return item_cooldown_info;
    }());
    Pan3d.item_cooldown_info = item_cooldown_info;
    var quest_status = /** @class */ (function () {
        function quest_status() {
        }
        /**
         从输入二进制流中读取结构体
         */
        quest_status.prototype.read = function (input) {
            var i;
            this.quest_id = input.readUint16();
            this.status = input.readUint8();
        };
        /**
         * 将结构体写入到输出二进制流中
         */
        quest_status.prototype.write = function (output) {
            var i;
            output.writeUint16(this.quest_id);
            output.writeUint8(this.status);
        };
        return quest_status;
    }());
    Pan3d.quest_status = quest_status;
    var item_reward_info = /** @class */ (function () {
        function item_reward_info() {
        }
        /**
         从输入二进制流中读取结构体
         */
        item_reward_info.prototype.read = function (input) {
            var i;
            this.item_id = input.readUint16();
            this.num = input.readUint32();
        };
        /**
         * 将结构体写入到输出二进制流中
         */
        item_reward_info.prototype.write = function (output) {
            var i;
            output.writeUint16(this.item_id);
            output.writeUint32(this.num);
        };
        return item_reward_info;
    }());
    Pan3d.item_reward_info = item_reward_info;
    var social_friend_info = /** @class */ (function () {
        function social_friend_info() {
            /**
             * 好友guid
             */
            this.guid = ""; //String
            /**
             * 名字
             */
            this.name = ""; //String
            /**
             * 帮派
             */
            this.faction = ""; //String
        }
        /**
         从输入二进制流中读取结构体
         */
        social_friend_info.prototype.read = function (input) {
            var i;
            this.guid = input.readStringByLen(50);
            this.name = input.readStringByLen(50);
            this.faction = input.readStringByLen(50);
            this.level = input.readUint16();
            this.icon = input.readUint16();
            this.vip = input.readUint16();
        };
        /**
         * 将结构体写入到输出二进制流中
         */
        social_friend_info.prototype.write = function (output) {
            var i;
            output.writeStringByLen(this.guid, 50);
            output.writeStringByLen(this.name, 50);
            output.writeStringByLen(this.faction, 50);
            output.writeUint16(this.level);
            output.writeUint16(this.icon);
            output.writeUint16(this.vip);
        };
        return social_friend_info;
    }());
    Pan3d.social_friend_info = social_friend_info;
    var faction_info = /** @class */ (function () {
        function faction_info() {
            /**
             * 帮派guid
             */
            this.faction_guid = ""; //String
            /**
             * 名字
             */
            this.faction_name = ""; //String
            /**
             * 帮主名字
             */
            this.faction_bz = ""; //String
            /**
             * 公告
             */
            this.faction_gg = ""; //String
        }
        /**
         从输入二进制流中读取结构体
         */
        faction_info.prototype.read = function (input) {
            var i;
            this.faction_guid = input.readStringByLen(50);
            this.faction_name = input.readStringByLen(50);
            this.faction_bz = input.readStringByLen(50);
            this.faction_gg = input.readStringByLen(108);
            this.level = input.readUint16();
            this.icon = input.readUint8();
            this.player_count = input.readUint16();
            this.minlev = input.readUint16();
        };
        /**
         * 将结构体写入到输出二进制流中
         */
        faction_info.prototype.write = function (output) {
            var i;
            output.writeStringByLen(this.faction_guid, 50);
            output.writeStringByLen(this.faction_name, 50);
            output.writeStringByLen(this.faction_bz, 50);
            output.writeStringByLen(this.faction_gg, 108);
            output.writeUint16(this.level);
            output.writeUint8(this.icon);
            output.writeUint16(this.player_count);
            output.writeUint16(this.minlev);
        };
        return faction_info;
    }());
    Pan3d.faction_info = faction_info;
    var rank_info = /** @class */ (function () {
        function rank_info() {
            /**
             * 名字
             */
            this.name = ""; //String
        }
        /**
         从输入二进制流中读取结构体
         */
        rank_info.prototype.read = function (input) {
            var i;
            this.name = input.readStringByLen(50);
            this.value = input.readFloat();
        };
        /**
         * 将结构体写入到输出二进制流中
         */
        rank_info.prototype.write = function (output) {
            var i;
            output.writeStringByLen(this.name, 50);
            output.writeFloat(this.value);
        };
        return rank_info;
    }());
    Pan3d.rank_info = rank_info;
    var line_info = /** @class */ (function () {
        function line_info() {
        }
        /**
         从输入二进制流中读取结构体
         */
        line_info.prototype.read = function (input) {
            var i;
            this.lineNo = input.readUint16();
            this.rate = input.readUint8();
        };
        /**
         * 将结构体写入到输出二进制流中
         */
        line_info.prototype.write = function (output) {
            var i;
            output.writeUint16(this.lineNo);
            output.writeUint8(this.rate);
        };
        return line_info;
    }());
    Pan3d.line_info = line_info;
    var wait_info = /** @class */ (function () {
        function wait_info() {
            /**
             * 名字
             */
            this.name = ""; //String
        }
        /**
         从输入二进制流中读取结构体
         */
        wait_info.prototype.read = function (input) {
            var i;
            this.name = input.readStringByLen(50);
            this.state = input.readInt8();
        };
        /**
         * 将结构体写入到输出二进制流中
         */
        wait_info.prototype.write = function (output) {
            var i;
            output.writeStringByLen(this.name, 50);
            output.writeInt8(this.state);
        };
        return wait_info;
    }());
    Pan3d.wait_info = wait_info;
    var cultivation_rivals_info = /** @class */ (function () {
        function cultivation_rivals_info() {
            /**
             * 名字
             */
            this.name = ""; //String
        }
        /**
         从输入二进制流中读取结构体
         */
        cultivation_rivals_info.prototype.read = function (input) {
            var i;
            this.index = input.readUint32();
            this.name = input.readStringByLen(50);
            this.level = input.readUint32();
            this.weapon = input.readUint32();
            this.avatar = input.readUint32();
            this.divine = input.readUint32();
            this.force = input.readUint32();
            this.chest = input.readUint32();
            this.gender = input.readUint32();
        };
        /**
         * 将结构体写入到输出二进制流中
         */
        cultivation_rivals_info.prototype.write = function (output) {
            var i;
            output.writeUint32(this.index);
            output.writeStringByLen(this.name, 50);
            output.writeUint32(this.level);
            output.writeUint32(this.weapon);
            output.writeUint32(this.avatar);
            output.writeUint32(this.divine);
            output.writeUint32(this.force);
            output.writeUint32(this.chest);
            output.writeUint32(this.gender);
        };
        return cultivation_rivals_info;
    }());
    Pan3d.cultivation_rivals_info = cultivation_rivals_info;
    var faction_gift_info = /** @class */ (function () {
        function faction_gift_info() {
            /**
             * 赠送者guid
             */
            this.guid = ""; //String
            /**
             * 赠送者留言
             */
            this.msg = ""; //String
            /**
             * 赠送道具信息
             */
            this.item_list = ""; //String
            /**
             * 回复信息
             */
            this.reply_list = ""; //String
        }
        /**
         从输入二进制流中读取结构体
         */
        faction_gift_info.prototype.read = function (input) {
            var i;
            this.rank = input.readUint32();
            this.id = input.readUint32();
            this.point = input.readUint32();
            this.thank = input.readUint32();
            this.reply = input.readUint32();
            this.time = input.readUint32();
            this.count_id = input.readUint32();
            this.guid = input.readStringByLen(50);
            this.msg = input.readStringByLen(50);
            this.item_list = input.readStringByLen(150);
            this.reply_list = input.readStringByLen(100);
        };
        /**
         * 将结构体写入到输出二进制流中
         */
        faction_gift_info.prototype.write = function (output) {
            var i;
            output.writeUint32(this.rank);
            output.writeUint32(this.id);
            output.writeUint32(this.point);
            output.writeUint32(this.thank);
            output.writeUint32(this.reply);
            output.writeUint32(this.time);
            output.writeUint32(this.count_id);
            output.writeStringByLen(this.guid, 50);
            output.writeStringByLen(this.msg, 50);
            output.writeStringByLen(this.item_list, 150);
            output.writeStringByLen(this.reply_list, 100);
        };
        return faction_gift_info;
    }());
    Pan3d.faction_gift_info = faction_gift_info;
    var faction_gift_rank_info = /** @class */ (function () {
        function faction_gift_rank_info() {
            /**
             * 女王名称
             */
            this.queen_name = ""; //String
            /**
             * 家族名称
             */
            this.faction_name = ""; //String
            /**
             * 骑士名称
             */
            this.guard_name = ""; //String
        }
        /**
         从输入二进制流中读取结构体
         */
        faction_gift_rank_info.prototype.read = function (input) {
            var i;
            this.rank = input.readUint32();
            this.point = input.readUint32();
            this.queen_name = input.readStringByLen(50);
            this.faction_name = input.readStringByLen(50);
            this.guard_name = input.readStringByLen(50);
            this.faction_flag = input.readUint32();
            this.queen_vip = input.readUint32();
            this.guard_vip = input.readUint32();
        };
        /**
         * 将结构体写入到输出二进制流中
         */
        faction_gift_rank_info.prototype.write = function (output) {
            var i;
            output.writeUint32(this.rank);
            output.writeUint32(this.point);
            output.writeStringByLen(this.queen_name, 50);
            output.writeStringByLen(this.faction_name, 50);
            output.writeStringByLen(this.guard_name, 50);
            output.writeUint32(this.faction_flag);
            output.writeUint32(this.queen_vip);
            output.writeUint32(this.guard_vip);
        };
        return faction_gift_rank_info;
    }());
    Pan3d.faction_gift_rank_info = faction_gift_rank_info;
    var mass_boss_info = /** @class */ (function () {
        function mass_boss_info() {
        }
        /**
         从输入二进制流中读取结构体
         */
        mass_boss_info.prototype.read = function (input) {
            var i;
            this.id = input.readUint8();
            this.state = input.readUint8();
            this.time = input.readUint32();
            this.percent = input.readUint8();
            this.count = input.readUint16();
        };
        /**
         * 将结构体写入到输出二进制流中
         */
        mass_boss_info.prototype.write = function (output) {
            var i;
            output.writeUint8(this.id);
            output.writeUint8(this.state);
            output.writeUint32(this.time);
            output.writeUint8(this.percent);
            output.writeUint16(this.count);
        };
        return mass_boss_info;
    }());
    Pan3d.mass_boss_info = mass_boss_info;
    var mass_boss_rank_info = /** @class */ (function () {
        function mass_boss_rank_info() {
            /**
             * 名称
             */
            this.name = ""; //String
        }
        /**
         从输入二进制流中读取结构体
         */
        mass_boss_rank_info.prototype.read = function (input) {
            var i;
            this.name = input.readStringByLen(50);
            this.dam = input.readDouble();
        };
        /**
         * 将结构体写入到输出二进制流中
         */
        mass_boss_rank_info.prototype.write = function (output) {
            var i;
            output.writeStringByLen(this.name, 50);
            output.writeDouble(this.dam);
        };
        return mass_boss_rank_info;
    }());
    Pan3d.mass_boss_rank_info = mass_boss_rank_info;
    var equip_info = /** @class */ (function () {
        function equip_info() {
            /**
             * 装备信息
             */
            this.equip = ""; //String
        }
        /**
         从输入二进制流中读取结构体
         */
        equip_info.prototype.read = function (input) {
            var i;
            this.equip = input.readStringByLen(50);
            this.strength_lv = input.readUint32();
            this.refine_rank = input.readUint32();
            this.refine_star = input.readUint32();
            this.gem1_lv = input.readUint32();
            this.gem2_lv = input.readUint32();
            this.gem3_lv = input.readUint32();
        };
        /**
         * 将结构体写入到输出二进制流中
         */
        equip_info.prototype.write = function (output) {
            var i;
            output.writeStringByLen(this.equip, 50);
            output.writeUint32(this.strength_lv);
            output.writeUint32(this.refine_rank);
            output.writeUint32(this.refine_star);
            output.writeUint32(this.gem1_lv);
            output.writeUint32(this.gem2_lv);
            output.writeUint32(this.gem3_lv);
        };
        return equip_info;
    }());
    Pan3d.equip_info = equip_info;
    var act_rank_info = /** @class */ (function () {
        function act_rank_info() {
            /**
             * 名称
             */
            this.name = ""; //String
        }
        /**
         从输入二进制流中读取结构体
         */
        act_rank_info.prototype.read = function (input) {
            var i;
            this.name = input.readStringByLen(50);
            this.value = input.readUint32();
        };
        /**
         * 将结构体写入到输出二进制流中
         */
        act_rank_info.prototype.write = function (output) {
            var i;
            output.writeStringByLen(this.name, 50);
            output.writeUint32(this.value);
        };
        return act_rank_info;
    }());
    Pan3d.act_rank_info = act_rank_info;
    var faction_match_info = /** @class */ (function () {
        function faction_match_info() {
            /**
             * 家族名称
             */
            this.name = ""; //String
            /**
             * 家族id
             */
            this.guid = ""; //String
        }
        /**
         从输入二进制流中读取结构体
         */
        faction_match_info.prototype.read = function (input) {
            var i;
            this.name = input.readStringByLen(50);
            this.result = input.readUint32();
            this.rank = input.readUint32();
            this.guid = input.readStringByLen(50);
        };
        /**
         * 将结构体写入到输出二进制流中
         */
        faction_match_info.prototype.write = function (output) {
            var i;
            output.writeStringByLen(this.name, 50);
            output.writeUint32(this.result);
            output.writeUint32(this.rank);
            output.writeStringByLen(this.guid, 50);
        };
        return faction_match_info;
    }());
    Pan3d.faction_match_info = faction_match_info;
    var group_search_info = /** @class */ (function () {
        function group_search_info() {
            /**
             * 队伍guid
             */
            this.guid = ""; //String
            /**
             * 队长guid
             */
            this.cap_guid = ""; //String
            /**
             * 队长名称
             */
            this.cap_name = ""; //String
        }
        /**
         从输入二进制流中读取结构体
         */
        group_search_info.prototype.read = function (input) {
            var i;
            this.guid = input.readStringByLen(50);
            this.cap_guid = input.readStringByLen(50);
            this.cap_name = input.readStringByLen(50);
            this.members = input.readUint32();
        };
        /**
         * 将结构体写入到输出二进制流中
         */
        group_search_info.prototype.write = function (output) {
            var i;
            output.writeStringByLen(this.guid, 50);
            output.writeStringByLen(this.cap_guid, 50);
            output.writeStringByLen(this.cap_name, 50);
            output.writeUint32(this.members);
        };
        return group_search_info;
    }());
    Pan3d.group_search_info = group_search_info;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=clientstru.js.map