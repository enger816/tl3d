/***********************************************************************/
/*************** 本代码由协议工具自动生成，请勿手动修改 ****************/
/***********************************************************************/






module Pan3d {
    export class point {
        /**
         * 坐标X
         */
        public pos_x: number;	//float		
        /**
         * 坐标Y
         */
        public pos_y: number;	//float		
        /**
         从输入二进制流中读取结构体
         */
        public read(input: Pan3dByteArray): void {
            var i: number;
            this.pos_x = input.readFloat();
            this.pos_y = input.readFloat();
        }

        /**
         * 将结构体写入到输出二进制流中
         */
        public write(output: Pan3dByteArray): void {
            var i: number;
            output.writeFloat(this.pos_x);
            output.writeFloat(this.pos_y);
        }
    }




    export class taxi_menu_info {
        /**
         * 
         */
        public id: number;	//int32		
        /**
         * 传送地点名称
         */
        public taxi_text: string = "";	//String
        /**
         * 地图ID
         */
        public map_id: number;	//uint32		
        /**
         * 坐标X
         */
        public pos_x: number;	//uint16		
        /**
         * 坐标Y
         */
        public pos_y: number;	//uint16		
        /**
         从输入二进制流中读取结构体
         */
        public read(input: Pan3dByteArray): void {
            var i: number;
            this.id = input.readInt32();
            this.taxi_text = input.readStringByLen(50);
            this.map_id = input.readUint32();
            this.pos_x = input.readUint16();
            this.pos_y = input.readUint16();
        }

        /**
         * 将结构体写入到输出二进制流中
         */
        public write(output: Pan3dByteArray): void {
            var i: number;
            output.writeInt32(this.id);
            output.writeStringByLen(this.taxi_text, 50);
            output.writeUint32(this.map_id);
            output.writeUint16(this.pos_x);
            output.writeUint16(this.pos_y);
        }
    }




    export class char_create_info {
        /**
         * 名称
         */
        public name: string = "";	//String
        /**
         * 阵营
         */
        public faction: number;	//uint8		
        /**
         * 性别
         */
        public gender: number;	//uint8		
        /**
         * 等级
         */
        public level: number;	//uint16		
        /**
         * 
         */
        public guid: string = "";	//String
        /**
         * 头像
         */
        public head_id: number;	//uint32		
        /**
         * 发型ID
         */
        public hair_id: number;	//uint32		
        /**
         * 种族，猛男美女萝莉那些
         */
        public race: number;	//uint8		
        /**
         * 邀请的帮派id
         */
        public inviteGuid: string = "";	//String
        /**
         * 创建的帮派名称
         */
        public faction_name: string = "";	//String
        /**
         * 创建的帮派标志
         */
        public icon: number;	//uint8		
        /**
         从输入二进制流中读取结构体
         */
        public read(input: Pan3dByteArray): void {
            var i: number;
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
        }

        /**
         * 将结构体写入到输出二进制流中
         */
        public write(output: Pan3dByteArray): void {
            var i: number;
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
        }
    }




    export class quest_option {
        /**
         * 任务id
         */
        public quest_id: number;	//uint32		
        /**
         * 图标
         */
        public quest_icon: number;	//uint32		
        /**
         * 任务等级
         */
        public quest_level: number;	//uint16		
        /**
         * 任务标题
         */
        public quest_title: string = "";	//String
        /**
         * 标识
         */
        public flags: number;	//uint32		
        /**
         从输入二进制流中读取结构体
         */
        public read(input: Pan3dByteArray): void {
            var i: number;
            this.quest_id = input.readUint32();
            this.quest_icon = input.readUint32();
            this.quest_level = input.readUint16();
            this.quest_title = input.readStringByLen(50);
            this.flags = input.readUint32();
        }

        /**
         * 将结构体写入到输出二进制流中
         */
        public write(output: Pan3dByteArray): void {
            var i: number;
            output.writeUint32(this.quest_id);
            output.writeUint32(this.quest_icon);
            output.writeUint16(this.quest_level);
            output.writeStringByLen(this.quest_title, 50);
            output.writeUint32(this.flags);
        }
    }




    export class quest_canaccept_info {
        /**
         * 任务ID
         */
        public quest_id: number;	//uint32		
        /**
         * 任务类别
         */
        public quest_type: number;	//uint8		
        /**
         * 标题
         */
        public title: string = "";	//String
        /**
         * 接受任务NPC模板id
         */
        public npc_id: number;	//uint32		
        /**
         * 任务等级
         */
        public quest_level: number;	//uint32		
        /**
         从输入二进制流中读取结构体
         */
        public read(input: Pan3dByteArray): void {
            var i: number;
            this.quest_id = input.readUint32();
            this.quest_type = input.readUint8();
            this.title = input.readStringByLen(50);
            this.npc_id = input.readUint32();
            this.quest_level = input.readUint32();
        }

        /**
         * 将结构体写入到输出二进制流中
         */
        public write(output: Pan3dByteArray): void {
            var i: number;
            output.writeUint32(this.quest_id);
            output.writeUint8(this.quest_type);
            output.writeStringByLen(this.title, 50);
            output.writeUint32(this.npc_id);
            output.writeUint32(this.quest_level);
        }
    }




    export class gossip_menu_option_info {
        /**
         * id
         */
        public id: number;	//int32		
        /**
         * 选项icon图标
         */
        public option_icon: number;	//int32		
        /**
         * 选项文本
         */
        public option_title: string = "";	//String
        /**
         从输入二进制流中读取结构体
         */
        public read(input: Pan3dByteArray): void {
            var i: number;
            this.id = input.readInt32();
            this.option_icon = input.readInt32();
            this.option_title = input.readStringByLen(200);
        }

        /**
         * 将结构体写入到输出二进制流中
         */
        public write(output: Pan3dByteArray): void {
            var i: number;
            output.writeInt32(this.id);
            output.writeInt32(this.option_icon);
            output.writeStringByLen(this.option_title, 200);
        }
    }




    export class item_cooldown_info {
        /**
         * 物品摸版
         */
        public item: number;	//uint32		
        /**
         * 冷却时间
         */
        public cooldown: number;	//uint32		
        /**
         从输入二进制流中读取结构体
         */
        public read(input: Pan3dByteArray): void {
            var i: number;
            this.item = input.readUint32();
            this.cooldown = input.readUint32();
        }

        /**
         * 将结构体写入到输出二进制流中
         */
        public write(output: Pan3dByteArray): void {
            var i: number;
            output.writeUint32(this.item);
            output.writeUint32(this.cooldown);
        }
    }




    export class quest_status {
        /**
         * 任务ID
         */
        public quest_id: number;	//uint16		
        /**
         * 任务状态
         */
        public status: number;	//uint8		
        /**
         从输入二进制流中读取结构体
         */
        public read(input: Pan3dByteArray): void {
            var i: number;
            this.quest_id = input.readUint16();
            this.status = input.readUint8();
        }

        /**
         * 将结构体写入到输出二进制流中
         */
        public write(output: Pan3dByteArray): void {
            var i: number;
            output.writeUint16(this.quest_id);
            output.writeUint8(this.status);
        }
    }




    export class item_reward_info {
        /**
         * 道具id
         */
        public item_id: number;	//uint16		
        /**
         * 道具数量
         */
        public num: number;	//uint32		
        /**
         从输入二进制流中读取结构体
         */
        public read(input: Pan3dByteArray): void {
            var i: number;
            this.item_id = input.readUint16();
            this.num = input.readUint32();
        }

        /**
         * 将结构体写入到输出二进制流中
         */
        public write(output: Pan3dByteArray): void {
            var i: number;
            output.writeUint16(this.item_id);
            output.writeUint32(this.num);
        }
    }




    export class social_friend_info {
        /**
         * 好友guid
         */
        public guid: string = "";	//String
        /**
         * 名字
         */
        public name: string = "";	//String
        /**
         * 帮派
         */
        public faction: string = "";	//String
        /**
         * 等级
         */
        public level: number;	//uint16		
        /**
         * 头像
         */
        public icon: number;	//uint16		
        /**
         * 头像
         */
        public vip: number;	//uint16		
        /**
         从输入二进制流中读取结构体
         */
        public read(input: Pan3dByteArray): void {
            var i: number;
            this.guid = input.readStringByLen(50);
            this.name = input.readStringByLen(50);
            this.faction = input.readStringByLen(50);
            this.level = input.readUint16();
            this.icon = input.readUint16();
            this.vip = input.readUint16();
        }

        /**
         * 将结构体写入到输出二进制流中
         */
        public write(output: Pan3dByteArray): void {
            var i: number;
            output.writeStringByLen(this.guid, 50);
            output.writeStringByLen(this.name, 50);
            output.writeStringByLen(this.faction, 50);
            output.writeUint16(this.level);
            output.writeUint16(this.icon);
            output.writeUint16(this.vip);
        }
    }




    export class faction_info {
        /**
         * 帮派guid
         */
        public faction_guid: string = "";	//String
        /**
         * 名字
         */
        public faction_name: string = "";	//String
        /**
         * 帮主名字
         */
        public faction_bz: string = "";	//String
        /**
         * 公告
         */
        public faction_gg: string = "";	//String
        /**
         * 等级
         */
        public level: number;	//uint16		
        /**
         * 头像
         */
        public icon: number;	//uint8		
        /**
         * 帮派人数
         */
        public player_count: number;	//uint16		
        /**
         * 等级限制
         */
        public minlev: number;	//uint16		
        /**
         从输入二进制流中读取结构体
         */
        public read(input: Pan3dByteArray): void {
            var i: number;
            this.faction_guid = input.readStringByLen(50);
            this.faction_name = input.readStringByLen(50);
            this.faction_bz = input.readStringByLen(50);
            this.faction_gg = input.readStringByLen(108);
            this.level = input.readUint16();
            this.icon = input.readUint8();
            this.player_count = input.readUint16();
            this.minlev = input.readUint16();
        }

        /**
         * 将结构体写入到输出二进制流中
         */
        public write(output: Pan3dByteArray): void {
            var i: number;
            output.writeStringByLen(this.faction_guid, 50);
            output.writeStringByLen(this.faction_name, 50);
            output.writeStringByLen(this.faction_bz, 50);
            output.writeStringByLen(this.faction_gg, 108);
            output.writeUint16(this.level);
            output.writeUint8(this.icon);
            output.writeUint16(this.player_count);
            output.writeUint16(this.minlev);
        }
    }




    export class rank_info {
        /**
         * 名字
         */
        public name: string = "";	//String
        /**
         * 伤害百分比
         */
        public value: number;	//float		
        /**
         从输入二进制流中读取结构体
         */
        public read(input: Pan3dByteArray): void {
            var i: number;
            this.name = input.readStringByLen(50);
            this.value = input.readFloat();
        }

        /**
         * 将结构体写入到输出二进制流中
         */
        public write(output: Pan3dByteArray): void {
            var i: number;
            output.writeStringByLen(this.name, 50);
            output.writeFloat(this.value);
        }
    }




    export class line_info {
        /**
         * 分线号
         */
        public lineNo: number;	//uint16		
        /**
         * 玩家比率
         */
        public rate: number;	//uint8		
        /**
         从输入二进制流中读取结构体
         */
        public read(input: Pan3dByteArray): void {
            var i: number;
            this.lineNo = input.readUint16();
            this.rate = input.readUint8();
        }

        /**
         * 将结构体写入到输出二进制流中
         */
        public write(output: Pan3dByteArray): void {
            var i: number;
            output.writeUint16(this.lineNo);
            output.writeUint8(this.rate);
        }
    }




    export class wait_info {
        /**
         * 名字
         */
        public name: string = "";	//String
        /**
         * 状态
         */
        public state: number;	//int8		
        /**
         从输入二进制流中读取结构体
         */
        public read(input: Pan3dByteArray): void {
            var i: number;
            this.name = input.readStringByLen(50);
            this.state = input.readInt8();
        }

        /**
         * 将结构体写入到输出二进制流中
         */
        public write(output: Pan3dByteArray): void {
            var i: number;
            output.writeStringByLen(this.name, 50);
            output.writeInt8(this.state);
        }
    }




    export class cultivation_rivals_info {
        /**
         * 序号
         */
        public index: number;	//uint32		
        /**
         * 名字
         */
        public name: string = "";	//String
        /**
         * 等级
         */
        public level: number;	//uint32		
        /**
         * 武器
         */
        public weapon: number;	//uint32		
        /**
         * 外观
         */
        public avatar: number;	//uint32		
        /**
         * 神兵
         */
        public divine: number;	//uint32		
        /**
         * 战力
         */
        public force: number;	//uint32		
        /**
         * 宝箱
         */
        public chest: number;	//uint32		
        /**
         * 性别
         */
        public gender: number;	//uint32		
        /**
         从输入二进制流中读取结构体
         */
        public read(input: Pan3dByteArray): void {
            var i: number;
            this.index = input.readUint32();
            this.name = input.readStringByLen(50);
            this.level = input.readUint32();
            this.weapon = input.readUint32();
            this.avatar = input.readUint32();
            this.divine = input.readUint32();
            this.force = input.readUint32();
            this.chest = input.readUint32();
            this.gender = input.readUint32();
        }

        /**
         * 将结构体写入到输出二进制流中
         */
        public write(output: Pan3dByteArray): void {
            var i: number;
            output.writeUint32(this.index);
            output.writeStringByLen(this.name, 50);
            output.writeUint32(this.level);
            output.writeUint32(this.weapon);
            output.writeUint32(this.avatar);
            output.writeUint32(this.divine);
            output.writeUint32(this.force);
            output.writeUint32(this.chest);
            output.writeUint32(this.gender);
        }
    }




    export class faction_gift_info {
        /**
         * 排行
         */
        public rank: number;	//uint32		
        /**
         * id
         */
        public id: number;	//uint32		
        /**
         * 魅力值
         */
        public point: number;	//uint32		
        /**
         * 感谢标识
         */
        public thank: number;	//uint32		
        /**
         * 女王回复标识
         */
        public reply: number;	//uint32		
        /**
         * 时间
         */
        public time: number;	//uint32		
        /**
         * count_id
         */
        public count_id: number;	//uint32		
        /**
         * 赠送者guid
         */
        public guid: string = "";	//String
        /**
         * 赠送者留言
         */
        public msg: string = "";	//String
        /**
         * 赠送道具信息
         */
        public item_list: string = "";	//String
        /**
         * 回复信息
         */
        public reply_list: string = "";	//String
        /**
         从输入二进制流中读取结构体
         */
        public read(input: Pan3dByteArray): void {
            var i: number;
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
        }

        /**
         * 将结构体写入到输出二进制流中
         */
        public write(output: Pan3dByteArray): void {
            var i: number;
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
        }
    }




    export class faction_gift_rank_info {
        /**
         * 排行
         */
        public rank: number;	//uint32		
        /**
         * 魅力值
         */
        public point: number;	//uint32		
        /**
         * 女王名称
         */
        public queen_name: string = "";	//String
        /**
         * 家族名称
         */
        public faction_name: string = "";	//String
        /**
         * 骑士名称
         */
        public guard_name: string = "";	//String
        /**
         * 家族旗子
         */
        public faction_flag: number;	//uint32		
        /**
         * 女王vip等级
         */
        public queen_vip: number;	//uint32		
        /**
         * 骑士vip等级
         */
        public guard_vip: number;	//uint32		
        /**
         从输入二进制流中读取结构体
         */
        public read(input: Pan3dByteArray): void {
            var i: number;
            this.rank = input.readUint32();
            this.point = input.readUint32();
            this.queen_name = input.readStringByLen(50);
            this.faction_name = input.readStringByLen(50);
            this.guard_name = input.readStringByLen(50);
            this.faction_flag = input.readUint32();
            this.queen_vip = input.readUint32();
            this.guard_vip = input.readUint32();
        }

        /**
         * 将结构体写入到输出二进制流中
         */
        public write(output: Pan3dByteArray): void {
            var i: number;
            output.writeUint32(this.rank);
            output.writeUint32(this.point);
            output.writeStringByLen(this.queen_name, 50);
            output.writeStringByLen(this.faction_name, 50);
            output.writeStringByLen(this.guard_name, 50);
            output.writeUint32(this.faction_flag);
            output.writeUint32(this.queen_vip);
            output.writeUint32(this.guard_vip);
        }
    }




    export class mass_boss_info {
        /**
         * 全民boss编号
         */
        public id: number;	//uint8		
        /**
         * 全民boss状态
         */
        public state: number;	//uint8		
        /**
         * 全民boss刷新时间
         */
        public time: number;	//uint32		
        /**
         * boss血量
         */
        public percent: number;	//uint8		
        /**
         * 挑战boss人数
         */
        public count: number;	//uint16		
        /**
         从输入二进制流中读取结构体
         */
        public read(input: Pan3dByteArray): void {
            var i: number;
            this.id = input.readUint8();
            this.state = input.readUint8();
            this.time = input.readUint32();
            this.percent = input.readUint8();
            this.count = input.readUint16();
        }

        /**
         * 将结构体写入到输出二进制流中
         */
        public write(output: Pan3dByteArray): void {
            var i: number;
            output.writeUint8(this.id);
            output.writeUint8(this.state);
            output.writeUint32(this.time);
            output.writeUint8(this.percent);
            output.writeUint16(this.count);
        }
    }




    export class mass_boss_rank_info {
        /**
         * 名称
         */
        public name: string = "";	//String
        /**
         * 伤害
         */
        public dam: number;	//double		
        /**
         从输入二进制流中读取结构体
         */
        public read(input: Pan3dByteArray): void {
            var i: number;
            this.name = input.readStringByLen(50);
            this.dam = input.readDouble();
        }

        /**
         * 将结构体写入到输出二进制流中
         */
        public write(output: Pan3dByteArray): void {
            var i: number;
            output.writeStringByLen(this.name, 50);
            output.writeDouble(this.dam);
        }
    }




    export class equip_info {
        /**
         * 装备信息
         */
        public equip: string = "";	//String
        /**
         * 强化
         */
        public strength_lv: number;	//uint32		
        /**
         * 精炼阶级
         */
        public refine_rank: number;	//uint32		
        /**
         * 精炼星级
         */
        public refine_star: number;	//uint32		
        /**
         * 宝石1等级
         */
        public gem1_lv: number;	//uint32		
        /**
         * 宝石1等级
         */
        public gem2_lv: number;	//uint32		
        /**
         * 宝石1等级
         */
        public gem3_lv: number;	//uint32		
        /**
         从输入二进制流中读取结构体
         */
        public read(input: Pan3dByteArray): void {
            var i: number;
            this.equip = input.readStringByLen(50);
            this.strength_lv = input.readUint32();
            this.refine_rank = input.readUint32();
            this.refine_star = input.readUint32();
            this.gem1_lv = input.readUint32();
            this.gem2_lv = input.readUint32();
            this.gem3_lv = input.readUint32();
        }

        /**
         * 将结构体写入到输出二进制流中
         */
        public write(output: Pan3dByteArray): void {
            var i: number;
            output.writeStringByLen(this.equip, 50);
            output.writeUint32(this.strength_lv);
            output.writeUint32(this.refine_rank);
            output.writeUint32(this.refine_star);
            output.writeUint32(this.gem1_lv);
            output.writeUint32(this.gem2_lv);
            output.writeUint32(this.gem3_lv);
        }
    }




    export class act_rank_info {
        /**
         * 名称
         */
        public name: string = "";	//String
        /**
         * 数值
         */
        public value: number;	//uint32		
        /**
         从输入二进制流中读取结构体
         */
        public read(input: Pan3dByteArray): void {
            var i: number;
            this.name = input.readStringByLen(50);
            this.value = input.readUint32();
        }

        /**
         * 将结构体写入到输出二进制流中
         */
        public write(output: Pan3dByteArray): void {
            var i: number;
            output.writeStringByLen(this.name, 50);
            output.writeUint32(this.value);
        }
    }




    export class faction_match_info {
        /**
         * 家族名称
         */
        public name: string = "";	//String
        /**
         * 比赛结果
         */
        public result: number;	//uint32		
        /**
         * 本届结果
         */
        public rank: number;	//uint32		
        /**
         * 家族id
         */
        public guid: string = "";	//String
        /**
         从输入二进制流中读取结构体
         */
        public read(input: Pan3dByteArray): void {
            var i: number;
            this.name = input.readStringByLen(50);
            this.result = input.readUint32();
            this.rank = input.readUint32();
            this.guid = input.readStringByLen(50);
        }

        /**
         * 将结构体写入到输出二进制流中
         */
        public write(output: Pan3dByteArray): void {
            var i: number;
            output.writeStringByLen(this.name, 50);
            output.writeUint32(this.result);
            output.writeUint32(this.rank);
            output.writeStringByLen(this.guid, 50);
        }
    }




    export class group_search_info {
        /**
         * 队伍guid
         */
        public guid: string = "";	//String
        /**
         * 队长guid
         */
        public cap_guid: string = "";	//String
        /**
         * 队长名称
         */
        public cap_name: string = "";	//String
        /**
         * 家族id
         */
        public members: number;	//uint32		
        /**
         从输入二进制流中读取结构体
         */
        public read(input: Pan3dByteArray): void {
            var i: number;
            this.guid = input.readStringByLen(50);
            this.cap_guid = input.readStringByLen(50);
            this.cap_name = input.readStringByLen(50);
            this.members = input.readUint32();
        }

        /**
         * 将结构体写入到输出二进制流中
         */
        public write(output: Pan3dByteArray): void {
            var i: number;
            output.writeStringByLen(this.guid, 50);
            output.writeStringByLen(this.cap_guid, 50);
            output.writeStringByLen(this.cap_name, 50);
            output.writeUint32(this.members);
        }
    }


}