/***********************************************************************/
/***************��������Э�鹤���Զ����ɣ������ֶ��޸�****************/
/************************ Э���汾��:#�������ƣ�ע�� ******************************/
/***********************************************************************/
//package cow.net.structs
//{	
//import sys.utils.Stream;	
var Protocols = /** @class */ (function () {
    /**
     * �����������ݰ����Զ����ܣ�
     * @param stream
     */
    function Protocols(f) {
        this._FUNCS = new Object();
        this._stream = new ByteArray;
        this._send_func = f;
        this._stream.endian = Endian.LITTLE_ENDIAN;
        this._FUNCS[0] = "null_action";
        this._FUNCS[1] = "ping_pong";
        this._FUNCS[2] = "forced_into";
        this._FUNCS[3] = "get_session";
        this._FUNCS[4] = "route_trace";
        this._FUNCS[5] = "write_client_log";
        this._FUNCS[7] = "sync_mstime";
        this._FUNCS[9] = "ud_control";
        this._FUNCS[15] = "get_chars_list";
        this._FUNCS[17] = "check_name";
        this._FUNCS[19] = "char_create";
        this._FUNCS[21] = "delete_char";
        this._FUNCS[23] = "player_login";
        this._FUNCS[24] = "player_logout";
        this._FUNCS[25] = "regularise_account";
        this._FUNCS[26] = "char_remotestore";
        this._FUNCS[27] = "char_remotestore_str";
        this._FUNCS[28] = "teleport";
        this._FUNCS[29] = "move_stop";
        this._FUNCS[30] = "unit_move";
        this._FUNCS[31] = "use_gameobject";
        this._FUNCS[32] = "bag_exchange_pos";
        this._FUNCS[33] = "bag_destroy";
        this._FUNCS[34] = "bag_item_split";
        this._FUNCS[35] = "bag_item_user";
        this._FUNCS[39] = "exchange_item";
        this._FUNCS[40] = "bag_extension";
        this._FUNCS[41] = "npc_get_goods_list";
        this._FUNCS[43] = "store_buy";
        this._FUNCS[44] = "npc_sell";
        this._FUNCS[45] = "npc_repurchase";
        this._FUNCS[46] = "avatar_fashion_enable";
        this._FUNCS[47] = "questhelp_talk_option";
        this._FUNCS[48] = "taxi_hello";
        this._FUNCS[50] = "taxi_select_station";
        this._FUNCS[51] = "gossip_select_option";
        this._FUNCS[52] = "gossip_hello";
        this._FUNCS[54] = "questgiver_status_query";
        this._FUNCS[56] = "query_quest_status";
        this._FUNCS[57] = "questhelp_get_canaccept_list";
        this._FUNCS[61] = "questlog_remove_quest";
        this._FUNCS[62] = "questgiver_complete_quest";
        this._FUNCS[64] = "questhelp_complete";
        this._FUNCS[66] = "questhelp_update_status";
        this._FUNCS[68] = "questgiver_accept_quest";
        this._FUNCS[69] = "questupdate_use_item";
        this._FUNCS[70] = "questhelp_query_book";
        this._FUNCS[73] = "set_attack_mode";
        this._FUNCS[74] = "select_target";
        this._FUNCS[77] = "spell_start";
        this._FUNCS[78] = "spell_stop";
        this._FUNCS[79] = "jump";
        this._FUNCS[80] = "resurrection";
        this._FUNCS[81] = "trade_request";
        this._FUNCS[82] = "trade_reply";
        this._FUNCS[84] = "trade_decide_items";
        this._FUNCS[86] = "trade_cancel";
        this._FUNCS[87] = "trade_ready";
        this._FUNCS[89] = "chat_near";
        this._FUNCS[90] = "chat_whisper";
        this._FUNCS[91] = "chat_faction";
        this._FUNCS[92] = "chat_world";
        this._FUNCS[93] = "chat_horn";
        this._FUNCS[94] = "chat_notice";
        this._FUNCS[95] = "query_player_info";
        this._FUNCS[97] = "receive_gift_packs";
        this._FUNCS[101] = "instance_enter";
        this._FUNCS[102] = "instance_next_state";
        this._FUNCS[103] = "instance_exit";
        this._FUNCS[104] = "limit_activity_receive";
        this._FUNCS[107] = "warehouse_save_money";
        this._FUNCS[108] = "warehouse_take_money";
        this._FUNCS[109] = "use_gold_opt";
        this._FUNCS[110] = "use_silver_opt";
        this._FUNCS[113] = "sync_mstime_app";
        this._FUNCS[114] = "open_window";
        this._FUNCS[115] = "player_gag";
        this._FUNCS[116] = "player_kicking";
        this._FUNCS[118] = "rank_list_query";
        this._FUNCS[120] = "client_update_scened";
        this._FUNCS[122] = "loot_select";
        this._FUNCS[123] = "goback_to_game_server";
        this._FUNCS[124] = "world_war_CS_player_info";
        this._FUNCS[126] = "world_war_SC_player_info";
        this._FUNCS[127] = "clientSubscription";
        this._FUNCS[129] = "char_update_info";
        this._FUNCS[131] = "modify_watch";
        this._FUNCS[132] = "kuafu_chuansong";
        this._FUNCS[133] = "show_suit";
        this._FUNCS[134] = "show_position";
        this._FUNCS[135] = "gold_respawn";
        this._FUNCS[137] = "mall_buy";
        this._FUNCS[139] = "strength";
        this._FUNCS[141] = "forceInto";
        this._FUNCS[142] = "create_faction";
        this._FUNCS[143] = "faction_upgrade";
        this._FUNCS[144] = "faction_join";
        this._FUNCS[145] = "raise_base_spell";
        this._FUNCS[146] = "upgrade_anger_spell";
        this._FUNCS[147] = "raise_mount";
        this._FUNCS[148] = "upgrade_mount";
        this._FUNCS[149] = "upgrade_mount_one_step";
        this._FUNCS[150] = "illusion_mount_active";
        this._FUNCS[151] = "illusion_mount";
        this._FUNCS[152] = "ride_mount";
        this._FUNCS[154] = "gem";
        this._FUNCS[155] = "change_battle_mode";
        this._FUNCS[157] = "divine_active";
        this._FUNCS[158] = "divine_uplev";
        this._FUNCS[159] = "divine_switch";
        this._FUNCS[160] = "jump_start";
        this._FUNCS[161] = "enter_vip_instance";
        this._FUNCS[162] = "sweep_vip_instance";
        this._FUNCS[163] = "hang_up";
        this._FUNCS[164] = "hang_up_setting";
        this._FUNCS[165] = "enter_trial_instance";
        this._FUNCS[166] = "sweep_trial_instance";
        this._FUNCS[167] = "reset_trial_instance";
        this._FUNCS[169] = "reenter_instance";
        this._FUNCS[171] = "social_add_friend";
        this._FUNCS[172] = "social_sureadd_friend";
        this._FUNCS[173] = "social_gift_friend";
        this._FUNCS[174] = "social_recommend_friend";
        this._FUNCS[176] = "social_revenge_enemy";
        this._FUNCS[177] = "social_del_friend";
        this._FUNCS[178] = "teleport_main_city";
        this._FUNCS[179] = "chat_by_channel";
        this._FUNCS[181] = "social_clear_apply";
        this._FUNCS[182] = "msg_decline";
        this._FUNCS[184] = "faction_getlist";
        this._FUNCS[185] = "faction_manager";
        this._FUNCS[186] = "faction_member_operate";
        this._FUNCS[187] = "faction_fast_join";
        this._FUNCS[188] = "social_add_friend_byname";
        this._FUNCS[190] = "read_mail";
        this._FUNCS[191] = "pick_mail";
        this._FUNCS[192] = "remove_mail";
        this._FUNCS[193] = "pick_mail_one_step";
        this._FUNCS[194] = "remove_mail_one_step";
        this._FUNCS[195] = "block_chat";
        this._FUNCS[196] = "cancel_block_chat";
        this._FUNCS[200] = "use_broadcast_gameobject";
        this._FUNCS[201] = "world_boss_enroll";
        this._FUNCS[202] = "world_boss_fight";
        this._FUNCS[203] = "change_line";
        this._FUNCS[204] = "roll_world_boss_treasure";
        this._FUNCS[207] = "rank_add_like";
        this._FUNCS[210] = "res_instance_enter";
        this._FUNCS[211] = "res_instance_sweep";
        this._FUNCS[212] = "show_map_line";
        this._FUNCS[216] = "teleport_map";
        this._FUNCS[217] = "teleport_field_boss";
        this._FUNCS[218] = "get_activity_reward";
        this._FUNCS[220] = "get_achieve_reward";
        this._FUNCS[221] = "get_achieve_all_reward";
        this._FUNCS[222] = "set_title";
        this._FUNCS[223] = "init_title";
        this._FUNCS[224] = "welfare_shouchong_reward";
        this._FUNCS[225] = "welfare_checkin";
        this._FUNCS[226] = "welfare_checkin_all";
        this._FUNCS[227] = "welfare_checkin_getback";
        this._FUNCS[228] = "welfare_level";
        this._FUNCS[229] = "welfare_active_getback";
        this._FUNCS[230] = "pick_quest_reward";
        this._FUNCS[231] = "talk_with_npc";
        this._FUNCS[232] = "use_virtual_item";
        this._FUNCS[233] = "pick_quest_chapter_reward";
        this._FUNCS[234] = "kuafu_3v3_match";
        this._FUNCS[236] = "kuafu_3v3_buytimes";
        this._FUNCS[237] = "kuafu_3v3_dayreward";
        this._FUNCS[238] = "kuafu_3v3_getranlist";
        this._FUNCS[240] = "welfare_getalllist_getback";
        this._FUNCS[242] = "welfare_getall_getback";
        this._FUNCS[248] = "kuafu_3v3_getmyrank";
        this._FUNCS[252] = "kuafu_3v3_cancel_match";
        this._FUNCS[253] = "kuafu_3v3_match_oper";
        this._FUNCS[255] = "kuafu_xianfu_match";
        this._FUNCS[258] = "buy_xianfu_item";
        this._FUNCS[259] = "xianfu_random_respawn";
        this._FUNCS[260] = "doujiantai_fight";
        this._FUNCS[261] = "doujiantai_buytime";
        this._FUNCS[262] = "doujiantai_clearcd";
        this._FUNCS[263] = "doujiantai_first_reward";
        this._FUNCS[265] = "doujiantai_get_enemys_info";
        this._FUNCS[266] = "doujiantai_get_rank";
        this._FUNCS[270] = "doujiantai_refresh_enemys";
        this._FUNCS[271] = "doujiantai_top3";
        this._FUNCS[272] = "use_jump_point";
        this._FUNCS[273] = "bag_item_sell";
        this._FUNCS[274] = "bag_item_sort";
        this._FUNCS[280] = "submit_quest_daily2";
        this._FUNCS[284] = "pick_daily2_quest_reward";
        this._FUNCS[285] = "finish_now_guide";
        this._FUNCS[286] = "get_cultivation_info";
        this._FUNCS[288] = "get_cultivation_rivals_info";
        this._FUNCS[290] = "get_cultivation_reward";
        this._FUNCS[291] = "refresh_cultivation_rivals";
        this._FUNCS[292] = "plunder_cultivation_rival";
        this._FUNCS[293] = "revenge_cultivation_rival";
        this._FUNCS[294] = "buy_cultivation_left_plunder_count";
        this._FUNCS[296] = "get_login_activity_reward";
        this._FUNCS[301] = "finish_optional_guide_step";
        this._FUNCS[302] = "execute_quest_cmd_after_accepted";
        this._FUNCS[320] = "back_to_famity";
        this._FUNCS[322] = "challange_boss";
        this._FUNCS[325] = "pick_offline_reward";
        this._FUNCS[327] = "smelting_equip";
        this._FUNCS[328] = "storehouse_hand_in";
        this._FUNCS[329] = "storehouse_exchange";
        this._FUNCS[330] = "storehouse_destroy";
        this._FUNCS[331] = "send_faction_gift";
        this._FUNCS[332] = "get_faction_gift_exreward";
        this._FUNCS[333] = "get_all_faction_gift_exreward";
        this._FUNCS[338] = "get_faction_gift_rank_page";
        this._FUNCS[342] = "divine_forge";
        this._FUNCS[343] = "divine_advance";
        this._FUNCS[344] = "divine_spirit";
        this._FUNCS[352] = "query_mass_boss_info";
        this._FUNCS[354] = "query_mass_boss_rank";
        this._FUNCS[356] = "try_mass_boss";
        this._FUNCS[357] = "buy_mass_boss_times";
        this._FUNCS[358] = "group_instance_match";
        this._FUNCS[359] = "buy_group_instance_times";
        this._FUNCS[360] = "talisman_active";
        this._FUNCS[361] = "talisman_lvup";
        this._FUNCS[362] = "wings_active";
        this._FUNCS[363] = "wings_bless";
        this._FUNCS[364] = "wings_rankup";
        this._FUNCS[365] = "wings_strength";
        this._FUNCS[366] = "meridian_practise";
        this._FUNCS[367] = "add_meridian_exp";
        this._FUNCS[368] = "raise_mount_level_base";
        this._FUNCS[369] = "active_mount";
        this._FUNCS[376] = "match_single_pvp";
        this._FUNCS[377] = "buy_match_single_pvp_times";
        this._FUNCS[378] = "pick_match_single_pvp_extra_reward";
        this._FUNCS[380] = "equipdevelop_operate";
        this._FUNCS[381] = "active_appearance";
        this._FUNCS[382] = "equip_appearance";
        this._FUNCS[383] = "cancel_equip_appearance";
        this._FUNCS[384] = "rename";
        this._FUNCS[385] = "unlock_title";
        this._FUNCS[386] = "social_buy_revenge_times";
        this._FUNCS[387] = "enter_risk_instance";
        this._FUNCS[388] = "social_remove_enemy";
        this._FUNCS[389] = "get_player_overview";
        this._FUNCS[391] = "send_faction_invite";
        this._FUNCS[393] = "buy_vipgift";
        this._FUNCS[394] = "activity_opt_buy_dailygift";
        this._FUNCS[395] = "draw_lottery";
        this._FUNCS[396] = "activity_opt_get_rank_process_reward";
        this._FUNCS[397] = "activity_opt_get_rank_list";
        this._FUNCS[399] = "activity_opt_buy_limitgift";
        this._FUNCS[400] = "welfare_get_recharge_reward";
        this._FUNCS[401] = "welfare_get_consume_reward";
        this._FUNCS[402] = "welfare_get_sevenday_reward";
        this._FUNCS[404] = "risk_get_rank";
        this._FUNCS[406] = "set_orient";
        this._FUNCS[407] = "use_moneytree";
        this._FUNCS[408] = "get_moneytree_gift";
        this._FUNCS[409] = "set_world_risk_last_id";
        this._FUNCS[410] = "enter_private_boss";
        this._FUNCS[411] = "raise_base_spell_all";
        this._FUNCS[413] = "use_restore_potion";
        this._FUNCS[414] = "pick_quest_adventure";
        this._FUNCS[415] = "raise_adventurespell";
        this._FUNCS[416] = "pick_quest_realmbreak";
        this._FUNCS[417] = "pick_realmbreak_daily_reward";
        this._FUNCS[418] = "group_create";
        this._FUNCS[419] = "group_join_request";
        this._FUNCS[420] = "group_join_accept";
        this._FUNCS[421] = "group_quit";
        this._FUNCS[422] = "group_give_captain";
        this._FUNCS[423] = "group_kick";
        this._FUNCS[425] = "enter_stage_instance";
        this._FUNCS[426] = "pick_stage_instance_bonus";
        this._FUNCS[427] = "enter_group_exp";
        this._FUNCS[429] = "select_group_enter";
        this._FUNCS[430] = "buy_group_exp_times";
        this._FUNCS[431] = "buy_inspiration";
        this._FUNCS[440] = "enter_faction_match_map";
        this._FUNCS[441] = "pick_faction_match_champion_daily_reward";
        this._FUNCS[442] = "query_faction_match_info";
        this._FUNCS[444] = "pick_res_instance_first_reward";
        this._FUNCS[445] = "group_send_invite";
        this._FUNCS[447] = "group_agree_invite";
        this._FUNCS[448] = "get_group_search_info_list";
        this._FUNCS[450] = "group_change_config";
        this._FUNCS[452] = "group_join_denied";
        this._FUNCS[453] = "group_invite_denied";
        this._FUNCS[454] = "talisman_equip";
        this._FUNCS[455] = "talisman_unequip";
        this._FUNCS[461] = "auto_group_match";
        this._FUNCS[462] = "cancel_auto_group_match";
        this._FUNCS[463] = "kuafu_3v3_group_match";
        this._FUNCS[470] = "booking_money";
        this._FUNCS[472] = "one_step_robot_up";
        this._FUNCS[473] = "get_seven_day_recharge_extra_reward";
        this._FUNCS[474] = "use_giftcode";
        this._FUNCS[480] = "lottery_recharge";
    }
    /**
     * ��ȡ����Э�麯������
     * @param cmd:uint
     */
    Protocols.prototype.getFuncName = function (cmd) {
        if (this._FUNCS[cmd]) {
            return this._FUNCS[cmd];
        }
        return null;
    };
    Protocols.prototype.null_action = function () {
        this._stream.reset();
        this._stream.optcode = 0;
        this._stream.writeUint16(0);
        this._send_func(this._stream);
    };
    Protocols.prototype.ping_pong = function () {
        this._stream.reset();
        this._stream.optcode = 1;
        this._stream.writeUint16(1);
        this._send_func(this._stream);
    };
    Protocols.prototype.forced_into = function () {
        this._stream.reset();
        this._stream.optcode = 2;
        this._stream.writeUint16(2);
        this._send_func(this._stream);
    };
    Protocols.prototype.get_session = function (sessionkey, account, version) {
        this._stream.reset();
        this._stream.optcode = 3;
        this._stream.writeUint16(3);
        //
        this._stream.writeString(sessionkey);
        //����id
        this._stream.writeString(account);
        //�汾
        this._stream.writeString(version);
        this._send_func(this._stream);
    };
    Protocols.prototype.route_trace = function (val) {
        this._stream.reset();
        this._stream.optcode = 4;
        this._stream.writeUint16(4);
        //
        this._stream.writeString(val);
        this._send_func(this._stream);
    };
    Protocols.prototype.write_client_log = function (type, uid, guid, log) {
        this._stream.reset();
        this._stream.optcode = 5;
        this._stream.writeUint16(5);
        //����
        this._stream.writeUint32(type);
        //uid
        this._stream.writeString(uid);
        //guid
        this._stream.writeString(guid);
        //����
        this._stream.writeString(log);
        this._send_func(this._stream);
    };
    Protocols.prototype.sync_mstime = function (mstime_now, time_now, open_time) {
        this._stream.reset();
        this._stream.optcode = 7;
        this._stream.writeUint16(7);
        //���������еĺ�����
        this._stream.writeUint32(mstime_now);
        //��Ȼʱ��
        this._stream.writeUint32(time_now);
        //��Ȼʱ���ķ���������ʱ��
        this._stream.writeUint32(open_time);
        this._send_func(this._stream);
    };
    Protocols.prototype.ud_control = function () {
        this._stream.reset();
        this._stream.optcode = 9;
        this._stream.writeUint16(9);
        this._send_func(this._stream);
    };
    Protocols.prototype.get_chars_list = function () {
        this._stream.reset();
        this._stream.optcode = 15;
        this._stream.writeUint16(15);
        this._send_func(this._stream);
    };
    Protocols.prototype.check_name = function (name) {
        this._stream.reset();
        this._stream.optcode = 17;
        this._stream.writeUint16(17);
        //����
        this._stream.writeString(name);
        this._send_func(this._stream);
    };
    Protocols.prototype.char_create = function (info) {
        this._stream.reset();
        this._stream.optcode = 19;
        this._stream.writeUint16(19);
        //��ɫ������Ϣ
        info.write(this._stream);
        this._send_func(this._stream);
    };
    Protocols.prototype.delete_char = function (id) {
        this._stream.reset();
        this._stream.optcode = 21;
        this._stream.writeUint16(21);
        //����ID
        this._stream.writeUint32(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.player_login = function (guid) {
        this._stream.reset();
        this._stream.optcode = 23;
        this._stream.writeUint16(23);
        //����ID
        this._stream.writeString(guid);
        this._send_func(this._stream);
    };
    Protocols.prototype.player_logout = function () {
        this._stream.reset();
        this._stream.optcode = 24;
        this._stream.writeUint16(24);
        this._send_func(this._stream);
    };
    Protocols.prototype.regularise_account = function (uid) {
        this._stream.reset();
        this._stream.optcode = 25;
        this._stream.writeUint16(25);
        //
        this._stream.writeString(uid);
        this._send_func(this._stream);
    };
    Protocols.prototype.char_remotestore = function (key, value) {
        this._stream.reset();
        this._stream.optcode = 26;
        this._stream.writeUint16(26);
        //����
        this._stream.writeUint32(key);
        //������Ϣ
        this._stream.writeUint32(value);
        this._send_func(this._stream);
    };
    Protocols.prototype.char_remotestore_str = function (key, value) {
        this._stream.reset();
        this._stream.optcode = 27;
        this._stream.writeUint16(27);
        //����
        this._stream.writeUint32(key);
        //������Ϣ
        this._stream.writeString(value);
        this._send_func(this._stream);
    };
    Protocols.prototype.teleport = function (intGuid) {
        this._stream.reset();
        this._stream.optcode = 28;
        this._stream.writeUint16(28);
        //���͵�intGuid
        this._stream.writeUint32(intGuid);
        this._send_func(this._stream);
    };
    Protocols.prototype.move_stop = function (guid, pos_x, pos_y) {
        this._stream.reset();
        this._stream.optcode = 29;
        this._stream.writeUint16(29);
        //����GUID
        this._stream.writeUint32(guid);
        //
        this._stream.writeUint16(pos_x);
        //
        this._stream.writeUint16(pos_y);
        this._send_func(this._stream);
    };
    Protocols.prototype.unit_move = function (guid, pos_x, pos_y, path) {
        this._stream.reset();
        this._stream.optcode = 30;
        this._stream.writeUint16(30);
        //����GUID
        this._stream.writeUint32(guid);
        //
        this._stream.writeUint16(pos_x);
        //
        this._stream.writeUint16(pos_y);
        //·��
        this._stream.writeUint16(path.length);
        for (var i = 0; i < path.length; i++) {
            this._stream.writeInt8(path[i]);
        }
        this._send_func(this._stream);
    };
    Protocols.prototype.use_gameobject = function (target) {
        this._stream.reset();
        this._stream.optcode = 31;
        this._stream.writeUint16(31);
        //Ŀ��
        this._stream.writeUint32(target);
        this._send_func(this._stream);
    };
    Protocols.prototype.bag_exchange_pos = function (src_bag, src_pos, dst_bag, dst_pos) {
        this._stream.reset();
        this._stream.optcode = 32;
        this._stream.writeUint16(32);
        //Դ����
        this._stream.writeUint32(src_bag);
        //Դλ��
        this._stream.writeUint32(src_pos);
        //Ŀ������
        this._stream.writeUint32(dst_bag);
        //Ŀ��λ��
        this._stream.writeUint32(dst_pos);
        this._send_func(this._stream);
    };
    Protocols.prototype.bag_destroy = function (item_guid, num, bag_id) {
        this._stream.reset();
        this._stream.optcode = 33;
        this._stream.writeUint16(33);
        //��Ʒguid
        this._stream.writeString(item_guid);
        //������Ԥ����
        this._stream.writeUint32(num);
        //����ID
        this._stream.writeUint32(bag_id);
        this._send_func(this._stream);
    };
    Protocols.prototype.bag_item_split = function (bag_id, src_pos, count, dst_pos, dst_bag) {
        this._stream.reset();
        this._stream.optcode = 34;
        this._stream.writeUint16(34);
        //����ID
        this._stream.writeUint8(bag_id);
        //�и��ĸ�λ����Ʒ
        this._stream.writeUint16(src_pos);
        //�и����ٳ�ȥ
        this._stream.writeUint32(count);
        //�иʲôλ��
        this._stream.writeUint16(dst_pos);
        //�иʲô����
        this._stream.writeUint8(dst_bag);
        this._send_func(this._stream);
    };
    Protocols.prototype.bag_item_user = function (item_guid, count) {
        this._stream.reset();
        this._stream.optcode = 35;
        this._stream.writeUint16(35);
        //��Ʒguid
        this._stream.writeString(item_guid);
        //����
        this._stream.writeUint32(count);
        this._send_func(this._stream);
    };
    Protocols.prototype.exchange_item = function (entry, count, tar_entry) {
        this._stream.reset();
        this._stream.optcode = 39;
        this._stream.writeUint16(39);
        //��Ʒģ��
        this._stream.writeUint32(entry);
        //�һ�����
        this._stream.writeUint32(count);
        //�һ���Ʒģ��
        this._stream.writeUint32(tar_entry);
        this._send_func(this._stream);
    };
    Protocols.prototype.bag_extension = function (bag_id, extension_type, bag_pos) {
        this._stream.reset();
        this._stream.optcode = 40;
        this._stream.writeUint16(40);
        //����
        this._stream.writeUint8(bag_id);
        //��չ����
        this._stream.writeUint8(extension_type);
        //����λ��
        this._stream.writeUint32(bag_pos);
        this._send_func(this._stream);
    };
    Protocols.prototype.npc_get_goods_list = function (npc_id) {
        this._stream.reset();
        this._stream.optcode = 41;
        this._stream.writeUint16(41);
        //
        this._stream.writeUint32(npc_id);
        this._send_func(this._stream);
    };
    Protocols.prototype.store_buy = function (id, count) {
        this._stream.reset();
        this._stream.optcode = 43;
        this._stream.writeUint16(43);
        //��Ʒid
        this._stream.writeUint32(id);
        //��Ʒ����
        this._stream.writeUint32(count);
        this._send_func(this._stream);
    };
    Protocols.prototype.npc_sell = function (npc_id, item_guid, num) {
        this._stream.reset();
        this._stream.optcode = 44;
        this._stream.writeUint16(44);
        //NPCID
        this._stream.writeUint32(npc_id);
        //��Ʒguid
        this._stream.writeString(item_guid);
        //����
        this._stream.writeUint32(num);
        this._send_func(this._stream);
    };
    Protocols.prototype.npc_repurchase = function (item_id) {
        this._stream.reset();
        this._stream.optcode = 45;
        this._stream.writeUint16(45);
        //��Ʒguid
        this._stream.writeString(item_id);
        this._send_func(this._stream);
    };
    Protocols.prototype.avatar_fashion_enable = function (pos) {
        this._stream.reset();
        this._stream.optcode = 46;
        this._stream.writeUint16(46);
        //ʱװװ��λ��
        this._stream.writeUint8(pos);
        this._send_func(this._stream);
    };
    Protocols.prototype.questhelp_talk_option = function (quest_id, option_id, value0, value1) {
        this._stream.reset();
        this._stream.optcode = 47;
        this._stream.writeUint16(47);
        //����ID
        this._stream.writeUint32(quest_id);
        //ѡ��ID
        this._stream.writeUint32(option_id);
        //
        this._stream.writeInt32(value0);
        //
        this._stream.writeInt32(value1);
        this._send_func(this._stream);
    };
    Protocols.prototype.taxi_hello = function (guid) {
        this._stream.reset();
        this._stream.optcode = 48;
        this._stream.writeUint16(48);
        //npc guid
        this._stream.writeUint32(guid);
        this._send_func(this._stream);
    };
    Protocols.prototype.taxi_select_station = function (station_id, guid) {
        this._stream.reset();
        this._stream.optcode = 50;
        this._stream.writeUint16(50);
        //
        this._stream.writeUint32(station_id);
        //
        this._stream.writeUint32(guid);
        this._send_func(this._stream);
    };
    Protocols.prototype.gossip_select_option = function (option, guid, unknow) {
        this._stream.reset();
        this._stream.optcode = 51;
        this._stream.writeUint16(51);
        //ѡ��ID
        this._stream.writeUint32(option);
        //NPCguid
        this._stream.writeUint32(guid);
        //����ֵ
        this._stream.writeString(unknow);
        this._send_func(this._stream);
    };
    Protocols.prototype.gossip_hello = function (guid) {
        this._stream.reset();
        this._stream.optcode = 52;
        this._stream.writeUint16(52);
        //����Ŀ��
        this._stream.writeUint32(guid);
        this._send_func(this._stream);
    };
    Protocols.prototype.questgiver_status_query = function (guid) {
        this._stream.reset();
        this._stream.optcode = 54;
        this._stream.writeUint16(54);
        //NPC GUID
        this._stream.writeUint32(guid);
        this._send_func(this._stream);
    };
    Protocols.prototype.query_quest_status = function (quest_array) {
        this._stream.reset();
        this._stream.optcode = 56;
        this._stream.writeUint16(56);
        //
        this._stream.writeUint16(quest_array.length);
        for (var i = 0; i < quest_array.length; i++) {
            quest_array[i].write(this._stream);
        }
        this._send_func(this._stream);
    };
    Protocols.prototype.questhelp_get_canaccept_list = function () {
        this._stream.reset();
        this._stream.optcode = 57;
        this._stream.writeUint16(57);
        this._send_func(this._stream);
    };
    Protocols.prototype.questlog_remove_quest = function (slot, reserve) {
        this._stream.reset();
        this._stream.optcode = 61;
        this._stream.writeUint16(61);
        //�����±�λ��
        this._stream.writeUint8(slot);
        //����
        this._stream.writeUint64(reserve);
        this._send_func(this._stream);
    };
    Protocols.prototype.questgiver_complete_quest = function (guid, quest_id, reward) {
        this._stream.reset();
        this._stream.optcode = 62;
        this._stream.writeUint16(62);
        //NPC_GUID
        this._stream.writeUint32(guid);
        //����ID
        this._stream.writeUint32(quest_id);
        //ѡ��������
        this._stream.writeUint8(reward);
        this._send_func(this._stream);
    };
    Protocols.prototype.questhelp_complete = function (quest_id, quest_statue, reserve) {
        this._stream.reset();
        this._stream.optcode = 64;
        this._stream.writeUint16(64);
        //����ID
        this._stream.writeUint32(quest_id);
        //����
        this._stream.writeUint8(quest_statue);
        //����
        this._stream.writeUint8(reserve);
        this._send_func(this._stream);
    };
    Protocols.prototype.questhelp_update_status = function (quest_id, slot_id, num) {
        this._stream.reset();
        this._stream.optcode = 66;
        this._stream.writeUint16(66);
        //����ID
        this._stream.writeUint32(quest_id);
        //�±�ID
        this._stream.writeUint32(slot_id);
        //��������
        this._stream.writeUint32(num);
        this._send_func(this._stream);
    };
    Protocols.prototype.questgiver_accept_quest = function (npcid, quest_id) {
        this._stream.reset();
        this._stream.optcode = 68;
        this._stream.writeUint16(68);
        //npcGUID
        this._stream.writeUint32(npcid);
        //
        this._stream.writeUint32(quest_id);
        this._send_func(this._stream);
    };
    Protocols.prototype.questupdate_use_item = function (item_id) {
        this._stream.reset();
        this._stream.optcode = 69;
        this._stream.writeUint16(69);
        //������ƷID
        this._stream.writeUint32(item_id);
        this._send_func(this._stream);
    };
    Protocols.prototype.questhelp_query_book = function (dynasty) {
        this._stream.reset();
        this._stream.optcode = 70;
        this._stream.writeUint16(70);
        //����
        this._stream.writeUint32(dynasty);
        this._send_func(this._stream);
    };
    Protocols.prototype.set_attack_mode = function (mode, reserve) {
        this._stream.reset();
        this._stream.optcode = 73;
        this._stream.writeUint16(73);
        //ģʽ
        this._stream.writeUint8(mode);
        //����
        this._stream.writeUint64(reserve);
        this._send_func(this._stream);
    };
    Protocols.prototype.select_target = function (id) {
        this._stream.reset();
        this._stream.optcode = 74;
        this._stream.writeUint16(74);
        //Ŀ��GUID
        this._stream.writeUint32(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.spell_start = function (spell_id, target_pos_x, target_pos_y, caster, target) {
        this._stream.reset();
        this._stream.optcode = 77;
        this._stream.writeUint16(77);
        //����ID
        this._stream.writeUint32(spell_id);
        //
        this._stream.writeUint16(target_pos_x);
        //
        this._stream.writeUint16(target_pos_y);
        //
        this._stream.writeUint32(caster);
        //Ŀ��
        this._stream.writeUint32(target);
        this._send_func(this._stream);
    };
    Protocols.prototype.spell_stop = function (guid) {
        this._stream.reset();
        this._stream.optcode = 78;
        this._stream.writeUint16(78);
        //ֹͣʩ����
        this._stream.writeString(guid);
        this._send_func(this._stream);
    };
    Protocols.prototype.jump = function (guid, pos_x, pos_y) {
        this._stream.reset();
        this._stream.optcode = 79;
        this._stream.writeUint16(79);
        //���Ķ���
        this._stream.writeUint32(guid);
        //Ŀ�ĵ�����
        this._stream.writeFloat(pos_x);
        //
        this._stream.writeFloat(pos_y);
        this._send_func(this._stream);
    };
    Protocols.prototype.resurrection = function (type, reserve) {
        this._stream.reset();
        this._stream.optcode = 80;
        this._stream.writeUint16(80);
        //0:ԭ�ظ��� 1:�سǸ���
        this._stream.writeUint8(type);
        //����
        this._stream.writeUint64(reserve);
        this._send_func(this._stream);
    };
    Protocols.prototype.trade_request = function (guid) {
        this._stream.reset();
        this._stream.optcode = 81;
        this._stream.writeUint16(81);
        //��������guid
        this._stream.writeString(guid);
        this._send_func(this._stream);
    };
    Protocols.prototype.trade_reply = function (guid, reply) {
        this._stream.reset();
        this._stream.optcode = 82;
        this._stream.writeUint16(82);
        //�������׵���guid
        this._stream.writeString(guid);
        //0:�ܾ�1:����
        this._stream.writeUint8(reply);
        this._send_func(this._stream);
    };
    Protocols.prototype.trade_decide_items = function (items, gold_ingot, silver) {
        this._stream.reset();
        this._stream.optcode = 84;
        this._stream.writeUint16(84);
        //ȷ�Ͻ��׵���Ʒ
        if (items.length > 1000)
            throw ("StringArray::length max 1000");
        this._stream.writeUint16(items.length);
        for (var i = 0; i < items.length; i++) {
            this._stream.writeString(items[i]);
        }
        //Ԫ��
        this._stream.writeInt32(gold_ingot);
        //����
        this._stream.writeInt32(silver);
        this._send_func(this._stream);
    };
    Protocols.prototype.trade_cancel = function () {
        this._stream.reset();
        this._stream.optcode = 86;
        this._stream.writeUint16(86);
        this._send_func(this._stream);
    };
    Protocols.prototype.trade_ready = function () {
        this._stream.reset();
        this._stream.optcode = 87;
        this._stream.writeUint16(87);
        this._send_func(this._stream);
    };
    Protocols.prototype.chat_near = function (content) {
        this._stream.reset();
        this._stream.optcode = 89;
        this._stream.writeUint16(89);
        //��������
        this._stream.writeString(content);
        this._send_func(this._stream);
    };
    Protocols.prototype.chat_whisper = function (guid, content) {
        this._stream.reset();
        this._stream.optcode = 90;
        this._stream.writeUint16(90);
        //����id
        this._stream.writeString(guid);
        //˵������
        this._stream.writeString(content);
        this._send_func(this._stream);
    };
    Protocols.prototype.chat_faction = function (guid, name, content, faction) {
        this._stream.reset();
        this._stream.optcode = 91;
        this._stream.writeUint16(91);
        //����id
        this._stream.writeString(guid);
        //��������
        this._stream.writeString(name);
        //˵������
        this._stream.writeString(content);
        //������Ӫ
        this._stream.writeUint8(faction);
        this._send_func(this._stream);
    };
    Protocols.prototype.chat_world = function (guid, faction, name, content) {
        this._stream.reset();
        this._stream.optcode = 92;
        this._stream.writeUint16(92);
        //����guid
        this._stream.writeString(guid);
        //������Ӫ
        this._stream.writeUint8(faction);
        //��������
        this._stream.writeString(name);
        //˵������
        this._stream.writeString(content);
        this._send_func(this._stream);
    };
    Protocols.prototype.chat_horn = function (guid, faction, name, content) {
        this._stream.reset();
        this._stream.optcode = 93;
        this._stream.writeUint16(93);
        //����guid
        this._stream.writeString(guid);
        //������Ӫ
        this._stream.writeUint8(faction);
        //��������
        this._stream.writeString(name);
        //˵������
        this._stream.writeString(content);
        this._send_func(this._stream);
    };
    Protocols.prototype.chat_notice = function (id, content, data) {
        this._stream.reset();
        this._stream.optcode = 94;
        this._stream.writeUint16(94);
        //����id
        this._stream.writeUint32(id);
        //��������
        this._stream.writeString(content);
        //Ԥ������
        this._stream.writeString(data);
        this._send_func(this._stream);
    };
    Protocols.prototype.query_player_info = function (guid, flag, callback_id) {
        this._stream.reset();
        this._stream.optcode = 95;
        this._stream.writeUint16(95);
        //����guid
        this._stream.writeString(guid);
        //ÿһλ��ʾ���Ҹ�����Ϣ
        this._stream.writeUint32(flag);
        //�ص�ID
        this._stream.writeUint32(callback_id);
        this._send_func(this._stream);
    };
    Protocols.prototype.receive_gift_packs = function () {
        this._stream.reset();
        this._stream.optcode = 97;
        this._stream.writeUint16(97);
        this._send_func(this._stream);
    };
    Protocols.prototype.instance_enter = function (instance_id) {
        this._stream.reset();
        this._stream.optcode = 101;
        this._stream.writeUint16(101);
        //����ID
        this._stream.writeUint32(instance_id);
        this._send_func(this._stream);
    };
    Protocols.prototype.instance_next_state = function (level, param) {
        this._stream.reset();
        this._stream.optcode = 102;
        this._stream.writeUint16(102);
        //�����ؿ�
        this._stream.writeUint16(level);
        //Ԥ������
        this._stream.writeUint32(param);
        this._send_func(this._stream);
    };
    Protocols.prototype.instance_exit = function (reserve) {
        this._stream.reset();
        this._stream.optcode = 103;
        this._stream.writeUint16(103);
        //����
        this._stream.writeUint32(reserve);
        this._send_func(this._stream);
    };
    Protocols.prototype.limit_activity_receive = function (id, type) {
        this._stream.reset();
        this._stream.optcode = 104;
        this._stream.writeUint16(104);
        //��ȡid
        this._stream.writeUint32(id);
        //��ȡ����
        this._stream.writeUint32(type);
        this._send_func(this._stream);
    };
    Protocols.prototype.warehouse_save_money = function (money, money_gold, money_bills) {
        this._stream.reset();
        this._stream.optcode = 107;
        this._stream.writeUint16(107);
        //����Ǯ
        this._stream.writeInt32(money);
        //����Ԫ��
        this._stream.writeInt32(money_gold);
        //������Ʊ
        this._stream.writeInt32(money_bills);
        this._send_func(this._stream);
    };
    Protocols.prototype.warehouse_take_money = function (money, money_gold, money_bills) {
        this._stream.reset();
        this._stream.optcode = 108;
        this._stream.writeUint16(108);
        //����Ǯ
        this._stream.writeInt32(money);
        //����Ԫ��
        this._stream.writeInt32(money_gold);
        //������Ʊ
        this._stream.writeInt32(money_bills);
        this._send_func(this._stream);
    };
    Protocols.prototype.use_gold_opt = function (type, param) {
        this._stream.reset();
        this._stream.optcode = 109;
        this._stream.writeUint16(109);
        //��������
        this._stream.writeUint8(type);
        //�ַ���
        this._stream.writeString(param);
        this._send_func(this._stream);
    };
    Protocols.prototype.use_silver_opt = function (type) {
        this._stream.reset();
        this._stream.optcode = 110;
        this._stream.writeUint16(110);
        //ʹ��ͭǮ����
        this._stream.writeUint8(type);
        this._send_func(this._stream);
    };
    Protocols.prototype.sync_mstime_app = function (mstime_now, time_now, open_time) {
        this._stream.reset();
        this._stream.optcode = 113;
        this._stream.writeUint16(113);
        //���������еĺ�����
        this._stream.writeUint32(mstime_now);
        //��Ȼʱ��
        this._stream.writeUint32(time_now);
        //��Ȼʱ���ķ���������ʱ��
        this._stream.writeUint32(open_time);
        this._send_func(this._stream);
    };
    Protocols.prototype.open_window = function (window_type) {
        this._stream.reset();
        this._stream.optcode = 114;
        this._stream.writeUint16(114);
        //��������
        this._stream.writeUint32(window_type);
        this._send_func(this._stream);
    };
    Protocols.prototype.player_gag = function (player_id, end_time, content) {
        this._stream.reset();
        this._stream.optcode = 115;
        this._stream.writeUint16(115);
        //����ID
        this._stream.writeString(player_id);
        //����ʱ��
        this._stream.writeUint32(end_time);
        //��������
        this._stream.writeString(content);
        this._send_func(this._stream);
    };
    Protocols.prototype.player_kicking = function (player_id) {
        this._stream.reset();
        this._stream.optcode = 116;
        this._stream.writeUint16(116);
        //����ID
        this._stream.writeString(player_id);
        this._send_func(this._stream);
    };
    Protocols.prototype.rank_list_query = function (call_back_id, rank_list_type, start_index, end_index) {
        this._stream.reset();
        this._stream.optcode = 118;
        this._stream.writeUint16(118);
        //�ص���
        this._stream.writeUint32(call_back_id);
        //��������
        this._stream.writeUint8(rank_list_type);
        //��ʼ
        this._stream.writeUint16(start_index);
        //����
        this._stream.writeUint16(end_index);
        this._send_func(this._stream);
    };
    Protocols.prototype.client_update_scened = function () {
        this._stream.reset();
        this._stream.optcode = 120;
        this._stream.writeUint16(120);
        this._send_func(this._stream);
    };
    Protocols.prototype.loot_select = function (x, y) {
        this._stream.reset();
        this._stream.optcode = 122;
        this._stream.writeUint16(122);
        //x
        this._stream.writeUint16(x);
        //y
        this._stream.writeUint16(y);
        this._send_func(this._stream);
    };
    Protocols.prototype.goback_to_game_server = function () {
        this._stream.reset();
        this._stream.optcode = 123;
        this._stream.writeUint16(123);
        this._send_func(this._stream);
    };
    Protocols.prototype.world_war_CS_player_info = function () {
        this._stream.reset();
        this._stream.optcode = 124;
        this._stream.writeUint16(124);
        this._send_func(this._stream);
    };
    Protocols.prototype.world_war_SC_player_info = function () {
        this._stream.reset();
        this._stream.optcode = 126;
        this._stream.writeUint16(126);
        this._send_func(this._stream);
    };
    Protocols.prototype.clientSubscription = function (guid) {
        this._stream.reset();
        this._stream.optcode = 127;
        this._stream.writeUint16(127);
        //����guid
        this._stream.writeUint32(guid);
        this._send_func(this._stream);
    };
    Protocols.prototype.char_update_info = function (info) {
        this._stream.reset();
        this._stream.optcode = 129;
        this._stream.writeUint16(129);
        //��ɫ������Ϣ
        info.write(this._stream);
        this._send_func(this._stream);
    };
    Protocols.prototype.modify_watch = function (opt, cid, key) {
        this._stream.reset();
        this._stream.optcode = 131;
        this._stream.writeUint16(131);
        //��������
        this._stream.writeUint8(opt);
        //�޸Ķ�������
        this._stream.writeUint32(cid);
        //����key
        this._stream.writeString(key);
        this._send_func(this._stream);
    };
    Protocols.prototype.kuafu_chuansong = function (str_data, watcher_guid, reserve) {
        this._stream.reset();
        this._stream.optcode = 132;
        this._stream.writeUint16(132);
        //ս����Ϣ
        this._stream.writeString(str_data);
        //�۲���guid
        this._stream.writeString(watcher_guid);
        //Ԥ������
        this._stream.writeUint32(reserve);
        this._send_func(this._stream);
    };
    Protocols.prototype.show_suit = function (position) {
        this._stream.reset();
        this._stream.optcode = 133;
        this._stream.writeUint16(133);
        //������λ��
        this._stream.writeUint8(position);
        this._send_func(this._stream);
    };
    Protocols.prototype.show_position = function (channel) {
        this._stream.reset();
        this._stream.optcode = 134;
        this._stream.writeUint16(134);
        //Ƶ��id
        this._stream.writeUint8(channel);
        this._send_func(this._stream);
    };
    Protocols.prototype.gold_respawn = function (useGold) {
        this._stream.reset();
        this._stream.optcode = 135;
        this._stream.writeUint16(135);
        //�Ƿ�ʹ��Ԫ��
        this._stream.writeUint8(useGold);
        this._send_func(this._stream);
    };
    Protocols.prototype.mall_buy = function (id, count, time) {
        this._stream.reset();
        this._stream.optcode = 137;
        this._stream.writeUint16(137);
        //��Ʒ���к�
        this._stream.writeUint32(id);
        //��Ʒ����
        this._stream.writeUint32(count);
        //ʱЧID
        this._stream.writeUint32(time);
        this._send_func(this._stream);
    };
    Protocols.prototype.strength = function (part) {
        this._stream.reset();
        this._stream.optcode = 139;
        this._stream.writeUint16(139);
        //ǿ����λ��
        this._stream.writeUint8(part);
        this._send_func(this._stream);
    };
    Protocols.prototype.forceInto = function () {
        this._stream.reset();
        this._stream.optcode = 141;
        this._stream.writeUint16(141);
        this._send_func(this._stream);
    };
    Protocols.prototype.create_faction = function (name, icon) {
        this._stream.reset();
        this._stream.optcode = 142;
        this._stream.writeUint16(142);
        //��������
        this._stream.writeString(name);
        //icon
        this._stream.writeUint8(icon);
        this._send_func(this._stream);
    };
    Protocols.prototype.faction_upgrade = function () {
        this._stream.reset();
        this._stream.optcode = 143;
        this._stream.writeUint16(143);
        this._send_func(this._stream);
    };
    Protocols.prototype.faction_join = function (id) {
        this._stream.reset();
        this._stream.optcode = 144;
        this._stream.writeUint16(144);
        //����guid
        this._stream.writeString(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.raise_base_spell = function (raiseType, spellId) {
        this._stream.reset();
        this._stream.optcode = 145;
        this._stream.writeUint16(145);
        //��������
        this._stream.writeUint8(raiseType);
        //����ID
        this._stream.writeUint16(spellId);
        this._send_func(this._stream);
    };
    Protocols.prototype.upgrade_anger_spell = function (spellId) {
        this._stream.reset();
        this._stream.optcode = 146;
        this._stream.writeUint16(146);
        //����ID
        this._stream.writeUint16(spellId);
        this._send_func(this._stream);
    };
    Protocols.prototype.raise_mount = function () {
        this._stream.reset();
        this._stream.optcode = 147;
        this._stream.writeUint16(147);
        this._send_func(this._stream);
    };
    Protocols.prototype.upgrade_mount = function (useItem) {
        this._stream.reset();
        this._stream.optcode = 148;
        this._stream.writeUint16(148);
        //�Ƿ��Զ�ʹ�õ���
        this._stream.writeUint8(useItem);
        this._send_func(this._stream);
    };
    Protocols.prototype.upgrade_mount_one_step = function (useItem) {
        this._stream.reset();
        this._stream.optcode = 149;
        this._stream.writeUint16(149);
        //�Ƿ��Զ�ʹ�õ���
        this._stream.writeUint8(useItem);
        this._send_func(this._stream);
    };
    Protocols.prototype.illusion_mount_active = function (illuId) {
        this._stream.reset();
        this._stream.optcode = 150;
        this._stream.writeUint16(150);
        //�û�����ID
        this._stream.writeUint16(illuId);
        this._send_func(this._stream);
    };
    Protocols.prototype.illusion_mount = function (illuId) {
        this._stream.reset();
        this._stream.optcode = 151;
        this._stream.writeUint16(151);
        //�û�����ID
        this._stream.writeUint16(illuId);
        this._send_func(this._stream);
    };
    Protocols.prototype.ride_mount = function (oper) {
        this._stream.reset();
        this._stream.optcode = 152;
        this._stream.writeUint16(152);
        //1:��&0:��
        this._stream.writeUint8(oper);
        this._send_func(this._stream);
    };
    Protocols.prototype.gem = function (part) {
        this._stream.reset();
        this._stream.optcode = 154;
        this._stream.writeUint16(154);
        //��ʯλ��
        this._stream.writeUint8(part);
        this._send_func(this._stream);
    };
    Protocols.prototype.change_battle_mode = function (mode) {
        this._stream.reset();
        this._stream.optcode = 155;
        this._stream.writeUint16(155);
        //��Ҫ�л���ģʽ
        this._stream.writeUint8(mode);
        this._send_func(this._stream);
    };
    Protocols.prototype.divine_active = function (id) {
        this._stream.reset();
        this._stream.optcode = 157;
        this._stream.writeUint16(157);
        //����ID
        this._stream.writeUint8(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.divine_uplev = function (id) {
        this._stream.reset();
        this._stream.optcode = 158;
        this._stream.writeUint16(158);
        //����ID
        this._stream.writeUint8(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.divine_switch = function (id) {
        this._stream.reset();
        this._stream.optcode = 159;
        this._stream.writeUint16(159);
        //����ID
        this._stream.writeUint8(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.jump_start = function (pos_x, pos_y) {
        this._stream.reset();
        this._stream.optcode = 160;
        this._stream.writeUint16(160);
        //����x
        this._stream.writeUint16(pos_x);
        //����x
        this._stream.writeUint16(pos_y);
        this._send_func(this._stream);
    };
    Protocols.prototype.enter_vip_instance = function (id, hard) {
        this._stream.reset();
        this._stream.optcode = 161;
        this._stream.writeUint16(161);
        //vip��������id
        this._stream.writeUint16(id);
        //vip�����Ѷ�
        this._stream.writeUint8(hard);
        this._send_func(this._stream);
    };
    Protocols.prototype.sweep_vip_instance = function (id) {
        this._stream.reset();
        this._stream.optcode = 162;
        this._stream.writeUint16(162);
        //vip��������id
        this._stream.writeUint16(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.hang_up = function () {
        this._stream.reset();
        this._stream.optcode = 163;
        this._stream.writeUint16(163);
        this._send_func(this._stream);
    };
    Protocols.prototype.hang_up_setting = function (value0, value1, value2, value3) {
        this._stream.reset();
        this._stream.optcode = 164;
        this._stream.writeUint16(164);
        //ͬPLAYER_FIELD_HOOK_BYTE0
        this._stream.writeUint32(value0);
        //ͬPLAYER_FIELD_HOOK_BYTE1
        this._stream.writeUint32(value1);
        //ͬPLAYER_FIELD_HOOK_BYTE2
        this._stream.writeUint32(value2);
        //ͬPLAYER_FIELD_HOOK_BYTE3
        this._stream.writeUint32(value3);
        this._send_func(this._stream);
    };
    Protocols.prototype.enter_trial_instance = function () {
        this._stream.reset();
        this._stream.optcode = 165;
        this._stream.writeUint16(165);
        this._send_func(this._stream);
    };
    Protocols.prototype.sweep_trial_instance = function () {
        this._stream.reset();
        this._stream.optcode = 166;
        this._stream.writeUint16(166);
        this._send_func(this._stream);
    };
    Protocols.prototype.reset_trial_instance = function () {
        this._stream.reset();
        this._stream.optcode = 167;
        this._stream.writeUint16(167);
        this._send_func(this._stream);
    };
    Protocols.prototype.reenter_instance = function () {
        this._stream.reset();
        this._stream.optcode = 169;
        this._stream.writeUint16(169);
        this._send_func(this._stream);
    };
    Protocols.prototype.social_add_friend = function (guid) {
        this._stream.reset();
        this._stream.optcode = 171;
        this._stream.writeUint16(171);
        //����GUID
        this._stream.writeString(guid);
        this._send_func(this._stream);
    };
    Protocols.prototype.social_sureadd_friend = function (guid) {
        this._stream.reset();
        this._stream.optcode = 172;
        this._stream.writeUint16(172);
        //����GUID
        this._stream.writeString(guid);
        this._send_func(this._stream);
    };
    Protocols.prototype.social_gift_friend = function (guid, gift) {
        this._stream.reset();
        this._stream.optcode = 173;
        this._stream.writeUint16(173);
        //����GUID
        this._stream.writeString(guid);
        //�����б�
        this._stream.writeUint16(gift.length);
        for (var i = 0; i < gift.length; i++) {
            gift[i].write(this._stream);
        }
        this._send_func(this._stream);
    };
    Protocols.prototype.social_recommend_friend = function () {
        this._stream.reset();
        this._stream.optcode = 174;
        this._stream.writeUint16(174);
        this._send_func(this._stream);
    };
    Protocols.prototype.social_revenge_enemy = function (guid) {
        this._stream.reset();
        this._stream.optcode = 176;
        this._stream.writeUint16(176);
        //����GUID
        this._stream.writeString(guid);
        this._send_func(this._stream);
    };
    Protocols.prototype.social_del_friend = function (guid) {
        this._stream.reset();
        this._stream.optcode = 177;
        this._stream.writeUint16(177);
        //����GUID
        this._stream.writeString(guid);
        this._send_func(this._stream);
    };
    Protocols.prototype.teleport_main_city = function () {
        this._stream.reset();
        this._stream.optcode = 178;
        this._stream.writeUint16(178);
        this._send_func(this._stream);
    };
    Protocols.prototype.chat_by_channel = function (channel, content) {
        this._stream.reset();
        this._stream.optcode = 179;
        this._stream.writeUint16(179);
        //����Ƶ��
        this._stream.writeUint8(channel);
        //˵������
        this._stream.writeString(content);
        this._send_func(this._stream);
    };
    Protocols.prototype.social_clear_apply = function () {
        this._stream.reset();
        this._stream.optcode = 181;
        this._stream.writeUint16(181);
        this._send_func(this._stream);
    };
    Protocols.prototype.msg_decline = function (value0, value1) {
        this._stream.reset();
        this._stream.optcode = 182;
        this._stream.writeUint16(182);
        //PLAYER_FIELD_DECLINE_CHANNEL_BYTE0
        this._stream.writeUint32(value0);
        //PLAYER_FIELD_DECLINE_CHANNEL_BYTE1
        this._stream.writeUint32(value1);
        this._send_func(this._stream);
    };
    Protocols.prototype.faction_getlist = function (page, num, grep) {
        this._stream.reset();
        this._stream.optcode = 184;
        this._stream.writeUint16(184);
        //��ǰҳ
        this._stream.writeUint8(page);
        //ÿҳ����
        this._stream.writeUint8(num);
        //�Զ�����
        this._stream.writeUint8(grep);
        this._send_func(this._stream);
    };
    Protocols.prototype.faction_manager = function (opt_type, reserve_int1, reserve_int2, reserve_str1, reserve_str2) {
        this._stream.reset();
        this._stream.optcode = 185;
        this._stream.writeUint16(185);
        //��������
        this._stream.writeUint8(opt_type);
        //Ԥ��intֵ1
        this._stream.writeUint16(reserve_int1);
        //Ԥ��intֵ2
        this._stream.writeUint16(reserve_int2);
        //Ԥ��stringֵ1
        this._stream.writeString(reserve_str1);
        //Ԥ��stringֵ2
        this._stream.writeString(reserve_str2);
        this._send_func(this._stream);
    };
    Protocols.prototype.faction_member_operate = function (opt_type, reserve_int1, reserve_int2, reserve_str1, reserve_str2) {
        this._stream.reset();
        this._stream.optcode = 186;
        this._stream.writeUint16(186);
        //��������
        this._stream.writeUint8(opt_type);
        //Ԥ��intֵ1
        this._stream.writeUint16(reserve_int1);
        //Ԥ��intֵ2
        this._stream.writeUint16(reserve_int2);
        //Ԥ��stringֵ1
        this._stream.writeString(reserve_str1);
        //Ԥ��stringֵ2
        this._stream.writeString(reserve_str2);
        this._send_func(this._stream);
    };
    Protocols.prototype.faction_fast_join = function () {
        this._stream.reset();
        this._stream.optcode = 187;
        this._stream.writeUint16(187);
        this._send_func(this._stream);
    };
    Protocols.prototype.social_add_friend_byname = function (name) {
        this._stream.reset();
        this._stream.optcode = 188;
        this._stream.writeUint16(188);
        //����name
        this._stream.writeString(name);
        this._send_func(this._stream);
    };
    Protocols.prototype.read_mail = function (indx) {
        this._stream.reset();
        this._stream.optcode = 190;
        this._stream.writeUint16(190);
        //�ʼ�����
        this._stream.writeUint16(indx);
        this._send_func(this._stream);
    };
    Protocols.prototype.pick_mail = function (indx) {
        this._stream.reset();
        this._stream.optcode = 191;
        this._stream.writeUint16(191);
        //�ʼ�����
        this._stream.writeUint16(indx);
        this._send_func(this._stream);
    };
    Protocols.prototype.remove_mail = function (indx) {
        this._stream.reset();
        this._stream.optcode = 192;
        this._stream.writeUint16(192);
        //�ʼ�����
        this._stream.writeUint16(indx);
        this._send_func(this._stream);
    };
    Protocols.prototype.pick_mail_one_step = function () {
        this._stream.reset();
        this._stream.optcode = 193;
        this._stream.writeUint16(193);
        this._send_func(this._stream);
    };
    Protocols.prototype.remove_mail_one_step = function () {
        this._stream.reset();
        this._stream.optcode = 194;
        this._stream.writeUint16(194);
        this._send_func(this._stream);
    };
    Protocols.prototype.block_chat = function (guid) {
        this._stream.reset();
        this._stream.optcode = 195;
        this._stream.writeUint16(195);
        //����guid
        this._stream.writeString(guid);
        this._send_func(this._stream);
    };
    Protocols.prototype.cancel_block_chat = function (indx) {
        this._stream.reset();
        this._stream.optcode = 196;
        this._stream.writeUint16(196);
        //����
        this._stream.writeUint8(indx);
        this._send_func(this._stream);
    };
    Protocols.prototype.use_broadcast_gameobject = function (target) {
        this._stream.reset();
        this._stream.optcode = 200;
        this._stream.writeUint16(200);
        //gameobject uintguid
        this._stream.writeUint32(target);
        this._send_func(this._stream);
    };
    Protocols.prototype.world_boss_enroll = function () {
        this._stream.reset();
        this._stream.optcode = 201;
        this._stream.writeUint16(201);
        this._send_func(this._stream);
    };
    Protocols.prototype.world_boss_fight = function () {
        this._stream.reset();
        this._stream.optcode = 202;
        this._stream.writeUint16(202);
        this._send_func(this._stream);
    };
    Protocols.prototype.change_line = function (lineNo) {
        this._stream.reset();
        this._stream.optcode = 203;
        this._stream.writeUint16(203);
        //�ߺ�
        this._stream.writeUint32(lineNo);
        this._send_func(this._stream);
    };
    Protocols.prototype.roll_world_boss_treasure = function () {
        this._stream.reset();
        this._stream.optcode = 204;
        this._stream.writeUint16(204);
        this._send_func(this._stream);
    };
    Protocols.prototype.rank_add_like = function (type, guid) {
        this._stream.reset();
        this._stream.optcode = 207;
        this._stream.writeUint16(207);
        //���а�����
        this._stream.writeUint8(type);
        //GUID
        this._stream.writeString(guid);
        this._send_func(this._stream);
    };
    Protocols.prototype.res_instance_enter = function (id) {
        this._stream.reset();
        this._stream.optcode = 210;
        this._stream.writeUint16(210);
        //��������
        this._stream.writeUint8(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.res_instance_sweep = function (id) {
        this._stream.reset();
        this._stream.optcode = 211;
        this._stream.writeUint16(211);
        //��������
        this._stream.writeUint8(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.show_map_line = function () {
        this._stream.reset();
        this._stream.optcode = 212;
        this._stream.writeUint16(212);
        this._send_func(this._stream);
    };
    Protocols.prototype.teleport_map = function (mapid, lineNo) {
        this._stream.reset();
        this._stream.optcode = 216;
        this._stream.writeUint16(216);
        //��ͼid
        this._stream.writeUint32(mapid);
        //���ߺ�
        this._stream.writeUint32(lineNo);
        this._send_func(this._stream);
    };
    Protocols.prototype.teleport_field_boss = function (mapid, lineNo) {
        this._stream.reset();
        this._stream.optcode = 217;
        this._stream.writeUint16(217);
        //��ͼid
        this._stream.writeUint32(mapid);
        //���ߺ�
        this._stream.writeUint32(lineNo);
        this._send_func(this._stream);
    };
    Protocols.prototype.get_activity_reward = function (id, vip) {
        this._stream.reset();
        this._stream.optcode = 218;
        this._stream.writeUint16(218);
        //��������
        this._stream.writeUint8(id);
        //vip����
        this._stream.writeUint8(vip);
        this._send_func(this._stream);
    };
    Protocols.prototype.get_achieve_reward = function (id) {
        this._stream.reset();
        this._stream.optcode = 220;
        this._stream.writeUint16(220);
        //�ɾ�����
        this._stream.writeUint8(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.get_achieve_all_reward = function () {
        this._stream.reset();
        this._stream.optcode = 221;
        this._stream.writeUint16(221);
        this._send_func(this._stream);
    };
    Protocols.prototype.set_title = function (id) {
        this._stream.reset();
        this._stream.optcode = 222;
        this._stream.writeUint16(222);
        //�ƺ�����
        this._stream.writeUint8(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.init_title = function (id) {
        this._stream.reset();
        this._stream.optcode = 223;
        this._stream.writeUint16(223);
        //�ƺ�����
        this._stream.writeUint8(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.welfare_shouchong_reward = function () {
        this._stream.reset();
        this._stream.optcode = 224;
        this._stream.writeUint16(224);
        this._send_func(this._stream);
    };
    Protocols.prototype.welfare_checkin = function () {
        this._stream.reset();
        this._stream.optcode = 225;
        this._stream.writeUint16(225);
        this._send_func(this._stream);
    };
    Protocols.prototype.welfare_checkin_all = function (id) {
        this._stream.reset();
        this._stream.optcode = 226;
        this._stream.writeUint16(226);
        //ǩ������
        this._stream.writeUint8(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.welfare_checkin_getback = function (id) {
        this._stream.reset();
        this._stream.optcode = 227;
        this._stream.writeUint16(227);
        //ǩ������
        this._stream.writeUint8(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.welfare_level = function (id) {
        this._stream.reset();
        this._stream.optcode = 228;
        this._stream.writeUint16(228);
        //�ȼ�����
        this._stream.writeUint8(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.welfare_active_getback = function (id, best, num) {
        this._stream.reset();
        this._stream.optcode = 229;
        this._stream.writeUint16(229);
        //�����
        this._stream.writeUint8(id);
        //�����һ�
        this._stream.writeUint8(best);
        //�һش���
        this._stream.writeUint16(num);
        this._send_func(this._stream);
    };
    Protocols.prototype.pick_quest_reward = function (indx) {
        this._stream.reset();
        this._stream.optcode = 230;
        this._stream.writeUint16(230);
        //��������
        this._stream.writeUint8(indx);
        this._send_func(this._stream);
    };
    Protocols.prototype.talk_with_npc = function (u_guid, questId) {
        this._stream.reset();
        this._stream.optcode = 231;
        this._stream.writeUint16(231);
        //npc uint guid
        this._stream.writeUint32(u_guid);
        //����id
        this._stream.writeUint16(questId);
        this._send_func(this._stream);
    };
    Protocols.prototype.use_virtual_item = function (entry) {
        this._stream.reset();
        this._stream.optcode = 232;
        this._stream.writeUint16(232);
        //itemid
        this._stream.writeUint16(entry);
        this._send_func(this._stream);
    };
    Protocols.prototype.pick_quest_chapter_reward = function (indx) {
        this._stream.reset();
        this._stream.optcode = 233;
        this._stream.writeUint16(233);
        //�½�id
        this._stream.writeUint8(indx);
        this._send_func(this._stream);
    };
    Protocols.prototype.kuafu_3v3_match = function () {
        this._stream.reset();
        this._stream.optcode = 234;
        this._stream.writeUint16(234);
        this._send_func(this._stream);
    };
    Protocols.prototype.kuafu_3v3_buytimes = function (num) {
        this._stream.reset();
        this._stream.optcode = 236;
        this._stream.writeUint16(236);
        //��������
        this._stream.writeUint8(num);
        this._send_func(this._stream);
    };
    Protocols.prototype.kuafu_3v3_dayreward = function (id) {
        this._stream.reset();
        this._stream.optcode = 237;
        this._stream.writeUint16(237);
        //��������
        this._stream.writeUint8(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.kuafu_3v3_getranlist = function () {
        this._stream.reset();
        this._stream.optcode = 238;
        this._stream.writeUint16(238);
        this._send_func(this._stream);
    };
    Protocols.prototype.welfare_getalllist_getback = function (best) {
        this._stream.reset();
        this._stream.optcode = 240;
        this._stream.writeUint16(240);
        //�����һ�
        this._stream.writeUint8(best);
        this._send_func(this._stream);
    };
    Protocols.prototype.welfare_getall_getback = function (best) {
        this._stream.reset();
        this._stream.optcode = 242;
        this._stream.writeUint16(242);
        //�����һ�
        this._stream.writeUint8(best);
        this._send_func(this._stream);
    };
    Protocols.prototype.kuafu_3v3_getmyrank = function () {
        this._stream.reset();
        this._stream.optcode = 248;
        this._stream.writeUint16(248);
        this._send_func(this._stream);
    };
    Protocols.prototype.kuafu_3v3_cancel_match = function (type) {
        this._stream.reset();
        this._stream.optcode = 252;
        this._stream.writeUint16(252);
        //ȡ��ƥ����������
        this._stream.writeUint32(type);
        this._send_func(this._stream);
    };
    Protocols.prototype.kuafu_3v3_match_oper = function (oper) {
        this._stream.reset();
        this._stream.optcode = 253;
        this._stream.writeUint16(253);
        //0:ȡ��& 1:����
        this._stream.writeUint32(oper);
        this._send_func(this._stream);
    };
    Protocols.prototype.kuafu_xianfu_match = function (indx) {
        this._stream.reset();
        this._stream.optcode = 255;
        this._stream.writeUint16(255);
        //�ɸ�����
        this._stream.writeUint8(indx);
        this._send_func(this._stream);
    };
    Protocols.prototype.buy_xianfu_item = function (type, indx, count) {
        this._stream.reset();
        this._stream.optcode = 258;
        this._stream.writeUint16(258);
        //�ɸ�ȯ����
        this._stream.writeUint8(type);
        //��������
        this._stream.writeUint8(indx);
        //��������
        this._stream.writeUint16(count);
        this._send_func(this._stream);
    };
    Protocols.prototype.xianfu_random_respawn = function () {
        this._stream.reset();
        this._stream.optcode = 259;
        this._stream.writeUint16(259);
        this._send_func(this._stream);
    };
    Protocols.prototype.doujiantai_fight = function (rank) {
        this._stream.reset();
        this._stream.optcode = 260;
        this._stream.writeUint16(260);
        //����
        this._stream.writeUint16(rank);
        this._send_func(this._stream);
    };
    Protocols.prototype.doujiantai_buytime = function (num) {
        this._stream.reset();
        this._stream.optcode = 261;
        this._stream.writeUint16(261);
        //����
        this._stream.writeUint8(num);
        this._send_func(this._stream);
    };
    Protocols.prototype.doujiantai_clearcd = function () {
        this._stream.reset();
        this._stream.optcode = 262;
        this._stream.writeUint16(262);
        this._send_func(this._stream);
    };
    Protocols.prototype.doujiantai_first_reward = function (id) {
        this._stream.reset();
        this._stream.optcode = 263;
        this._stream.writeUint16(263);
        //����
        this._stream.writeUint8(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.doujiantai_get_enemys_info = function () {
        this._stream.reset();
        this._stream.optcode = 265;
        this._stream.writeUint16(265);
        this._send_func(this._stream);
    };
    Protocols.prototype.doujiantai_get_rank = function (startIdx, endIdx) {
        this._stream.reset();
        this._stream.optcode = 266;
        this._stream.writeUint16(266);
        //����
        this._stream.writeUint16(startIdx);
        //����
        this._stream.writeUint16(endIdx);
        this._send_func(this._stream);
    };
    Protocols.prototype.doujiantai_refresh_enemys = function () {
        this._stream.reset();
        this._stream.optcode = 270;
        this._stream.writeUint16(270);
        this._send_func(this._stream);
    };
    Protocols.prototype.doujiantai_top3 = function () {
        this._stream.reset();
        this._stream.optcode = 271;
        this._stream.writeUint16(271);
        this._send_func(this._stream);
    };
    Protocols.prototype.use_jump_point = function (id) {
        this._stream.reset();
        this._stream.optcode = 272;
        this._stream.writeUint16(272);
        //����id
        this._stream.writeUint32(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.bag_item_sell = function (item_guid, count) {
        this._stream.reset();
        this._stream.optcode = 273;
        this._stream.writeUint16(273);
        //��Ʒguid
        this._stream.writeString(item_guid);
        //����
        this._stream.writeUint32(count);
        this._send_func(this._stream);
    };
    Protocols.prototype.bag_item_sort = function (bag_type) {
        this._stream.reset();
        this._stream.optcode = 274;
        this._stream.writeUint16(274);
        //��������
        this._stream.writeUint32(bag_type);
        this._send_func(this._stream);
    };
    Protocols.prototype.submit_quest_daily2 = function () {
        this._stream.reset();
        this._stream.optcode = 280;
        this._stream.writeUint16(280);
        this._send_func(this._stream);
    };
    Protocols.prototype.pick_daily2_quest_reward = function (indx) {
        this._stream.reset();
        this._stream.optcode = 284;
        this._stream.writeUint16(284);
        //��������
        this._stream.writeUint8(indx);
        this._send_func(this._stream);
    };
    Protocols.prototype.finish_now_guide = function () {
        this._stream.reset();
        this._stream.optcode = 285;
        this._stream.writeUint16(285);
        this._send_func(this._stream);
    };
    Protocols.prototype.get_cultivation_info = function () {
        this._stream.reset();
        this._stream.optcode = 286;
        this._stream.writeUint16(286);
        this._send_func(this._stream);
    };
    Protocols.prototype.get_cultivation_rivals_info = function () {
        this._stream.reset();
        this._stream.optcode = 288;
        this._stream.writeUint16(288);
        this._send_func(this._stream);
    };
    Protocols.prototype.get_cultivation_reward = function () {
        this._stream.reset();
        this._stream.optcode = 290;
        this._stream.writeUint16(290);
        this._send_func(this._stream);
    };
    Protocols.prototype.refresh_cultivation_rivals = function () {
        this._stream.reset();
        this._stream.optcode = 291;
        this._stream.writeUint16(291);
        this._send_func(this._stream);
    };
    Protocols.prototype.plunder_cultivation_rival = function (index) {
        this._stream.reset();
        this._stream.optcode = 292;
        this._stream.writeUint16(292);
        //��������
        this._stream.writeUint32(index);
        this._send_func(this._stream);
    };
    Protocols.prototype.revenge_cultivation_rival = function (index) {
        this._stream.reset();
        this._stream.optcode = 293;
        this._stream.writeUint16(293);
        //�Ӷ���¼����
        this._stream.writeUint32(index);
        this._send_func(this._stream);
    };
    Protocols.prototype.buy_cultivation_left_plunder_count = function (count) {
        this._stream.reset();
        this._stream.optcode = 294;
        this._stream.writeUint16(294);
        //��������
        this._stream.writeUint32(count);
        this._send_func(this._stream);
    };
    Protocols.prototype.get_login_activity_reward = function (id) {
        this._stream.reset();
        this._stream.optcode = 296;
        this._stream.writeUint16(296);
        //����id
        this._stream.writeUint32(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.finish_optional_guide_step = function (guide_id, step) {
        this._stream.reset();
        this._stream.optcode = 301;
        this._stream.writeUint16(301);
        //����id
        this._stream.writeUint32(guide_id);
        //�����ֲ���
        this._stream.writeUint8(step);
        this._send_func(this._stream);
    };
    Protocols.prototype.execute_quest_cmd_after_accepted = function (indx) {
        this._stream.reset();
        this._stream.optcode = 302;
        this._stream.writeUint16(302);
        //���������±�
        this._stream.writeUint16(indx);
        this._send_func(this._stream);
    };
    Protocols.prototype.back_to_famity = function () {
        this._stream.reset();
        this._stream.optcode = 320;
        this._stream.writeUint16(320);
        this._send_func(this._stream);
    };
    Protocols.prototype.challange_boss = function () {
        this._stream.reset();
        this._stream.optcode = 322;
        this._stream.writeUint16(322);
        this._send_func(this._stream);
    };
    Protocols.prototype.pick_offline_reward = function () {
        this._stream.reset();
        this._stream.optcode = 325;
        this._stream.writeUint16(325);
        this._send_func(this._stream);
    };
    Protocols.prototype.smelting_equip = function (pos_str) {
        this._stream.reset();
        this._stream.optcode = 327;
        this._stream.writeUint16(327);
        //װ��pos �����߸���
        this._stream.writeString(pos_str);
        this._send_func(this._stream);
    };
    Protocols.prototype.storehouse_hand_in = function (pos_str) {
        this._stream.reset();
        this._stream.optcode = 328;
        this._stream.writeUint16(328);
        //װ��pos �����߸���
        this._stream.writeString(pos_str);
        this._send_func(this._stream);
    };
    Protocols.prototype.storehouse_exchange = function (pos) {
        this._stream.reset();
        this._stream.optcode = 329;
        this._stream.writeUint16(329);
        //������pos
        this._stream.writeUint32(pos);
        this._send_func(this._stream);
    };
    Protocols.prototype.storehouse_destroy = function (pos) {
        this._stream.reset();
        this._stream.optcode = 330;
        this._stream.writeUint16(330);
        //������pos
        this._stream.writeUint32(pos);
        this._send_func(this._stream);
    };
    Protocols.prototype.send_faction_gift = function (list, msg, msg_type) {
        this._stream.reset();
        this._stream.optcode = 331;
        this._stream.writeUint16(331);
        //����list
        this._stream.writeUint16(list.length);
        for (var i = 0; i < list.length; i++) {
            list[i].write(this._stream);
        }
        //����
        this._stream.writeString(msg);
        //��������
        this._stream.writeUint32(msg_type);
        this._send_func(this._stream);
    };
    Protocols.prototype.get_faction_gift_exreward = function (count_id) {
        this._stream.reset();
        this._stream.optcode = 332;
        this._stream.writeUint16(332);
        //������count_id
        this._stream.writeUint32(count_id);
        this._send_func(this._stream);
    };
    Protocols.prototype.get_all_faction_gift_exreward = function () {
        this._stream.reset();
        this._stream.optcode = 333;
        this._stream.writeUint16(333);
        this._send_func(this._stream);
    };
    Protocols.prototype.get_faction_gift_rank_page = function (page) {
        this._stream.reset();
        this._stream.optcode = 338;
        this._stream.writeUint16(338);
        //ҳ��
        this._stream.writeUint32(page);
        this._send_func(this._stream);
    };
    Protocols.prototype.divine_forge = function (id, count) {
        this._stream.reset();
        this._stream.optcode = 342;
        this._stream.writeUint16(342);
        //����id
        this._stream.writeUint32(id);
        //����
        this._stream.writeUint32(count);
        this._send_func(this._stream);
    };
    Protocols.prototype.divine_advance = function (id) {
        this._stream.reset();
        this._stream.optcode = 343;
        this._stream.writeUint16(343);
        //����id
        this._stream.writeUint32(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.divine_spirit = function (id, protect, improve) {
        this._stream.reset();
        this._stream.optcode = 344;
        this._stream.writeUint16(344);
        //����id
        this._stream.writeUint32(id);
        //ʧ�ܱ���
        this._stream.writeUint32(protect);
        //��������
        this._stream.writeUint32(improve);
        this._send_func(this._stream);
    };
    Protocols.prototype.query_mass_boss_info = function (id) {
        this._stream.reset();
        this._stream.optcode = 352;
        this._stream.writeUint16(352);
        //ȫ��boss����
        this._stream.writeUint8(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.query_mass_boss_rank = function (id) {
        this._stream.reset();
        this._stream.optcode = 354;
        this._stream.writeUint16(354);
        //ȫ��boss����
        this._stream.writeUint8(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.try_mass_boss = function (id) {
        this._stream.reset();
        this._stream.optcode = 356;
        this._stream.writeUint16(356);
        //ȫ��boss����
        this._stream.writeUint8(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.buy_mass_boss_times = function (cnt) {
        this._stream.reset();
        this._stream.optcode = 357;
        this._stream.writeUint16(357);
        //��������
        this._stream.writeUint8(cnt);
        this._send_func(this._stream);
    };
    Protocols.prototype.group_instance_match = function (indx, isGroup) {
        this._stream.reset();
        this._stream.optcode = 358;
        this._stream.writeUint16(358);
        //���Ӹ�������
        this._stream.writeUint8(indx);
        //�Ƿ����ӽ���
        this._stream.writeUint8(isGroup);
        this._send_func(this._stream);
    };
    Protocols.prototype.buy_group_instance_times = function (count) {
        this._stream.reset();
        this._stream.optcode = 359;
        this._stream.writeUint16(359);
        //����
        this._stream.writeUint8(count);
        this._send_func(this._stream);
    };
    Protocols.prototype.talisman_active = function (id) {
        this._stream.reset();
        this._stream.optcode = 360;
        this._stream.writeUint16(360);
        //����id
        this._stream.writeUint32(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.talisman_lvup = function (id) {
        this._stream.reset();
        this._stream.optcode = 361;
        this._stream.writeUint16(361);
        //����id
        this._stream.writeUint32(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.wings_active = function () {
        this._stream.reset();
        this._stream.optcode = 362;
        this._stream.writeUint16(362);
        this._send_func(this._stream);
    };
    Protocols.prototype.wings_bless = function () {
        this._stream.reset();
        this._stream.optcode = 363;
        this._stream.writeUint16(363);
        this._send_func(this._stream);
    };
    Protocols.prototype.wings_rankup = function () {
        this._stream.reset();
        this._stream.optcode = 364;
        this._stream.writeUint16(364);
        this._send_func(this._stream);
    };
    Protocols.prototype.wings_strength = function () {
        this._stream.reset();
        this._stream.optcode = 365;
        this._stream.writeUint16(365);
        this._send_func(this._stream);
    };
    Protocols.prototype.meridian_practise = function () {
        this._stream.reset();
        this._stream.optcode = 366;
        this._stream.writeUint16(366);
        this._send_func(this._stream);
    };
    Protocols.prototype.add_meridian_exp = function (id) {
        this._stream.reset();
        this._stream.optcode = 367;
        this._stream.writeUint16(367);
        //�������ߵ������б�
        this._stream.writeUint8(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.raise_mount_level_base = function () {
        this._stream.reset();
        this._stream.optcode = 368;
        this._stream.writeUint16(368);
        this._send_func(this._stream);
    };
    Protocols.prototype.active_mount = function () {
        this._stream.reset();
        this._stream.optcode = 369;
        this._stream.writeUint16(369);
        this._send_func(this._stream);
    };
    Protocols.prototype.match_single_pvp = function () {
        this._stream.reset();
        this._stream.optcode = 376;
        this._stream.writeUint16(376);
        this._send_func(this._stream);
    };
    Protocols.prototype.buy_match_single_pvp_times = function (cnt) {
        this._stream.reset();
        this._stream.optcode = 377;
        this._stream.writeUint16(377);
        //��������
        this._stream.writeUint8(cnt);
        this._send_func(this._stream);
    };
    Protocols.prototype.pick_match_single_pvp_extra_reward = function (id) {
        this._stream.reset();
        this._stream.optcode = 378;
        this._stream.writeUint16(378);
        //��ȡ����
        this._stream.writeUint8(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.equipdevelop_operate = function (opt_type, reserve_int1, reserve_int2, reserve_str1, reserve_str2) {
        this._stream.reset();
        this._stream.optcode = 380;
        this._stream.writeUint16(380);
        //��������
        this._stream.writeUint8(opt_type);
        //Ԥ��intֵ1
        this._stream.writeUint16(reserve_int1);
        //Ԥ��intֵ2
        this._stream.writeUint16(reserve_int2);
        //Ԥ��stringֵ1
        this._stream.writeString(reserve_str1);
        //Ԥ��stringֵ2
        this._stream.writeString(reserve_str2);
        this._send_func(this._stream);
    };
    Protocols.prototype.active_appearance = function (id) {
        this._stream.reset();
        this._stream.optcode = 381;
        this._stream.writeUint16(381);
        //����id
        this._stream.writeUint16(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.equip_appearance = function (id) {
        this._stream.reset();
        this._stream.optcode = 382;
        this._stream.writeUint16(382);
        //����id
        this._stream.writeUint16(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.cancel_equip_appearance = function (type) {
        this._stream.reset();
        this._stream.optcode = 383;
        this._stream.writeUint16(383);
        //��������
        this._stream.writeUint8(type);
        this._send_func(this._stream);
    };
    Protocols.prototype.rename = function (name) {
        this._stream.reset();
        this._stream.optcode = 384;
        this._stream.writeUint16(384);
        //�޸ĵ�����
        this._stream.writeString(name);
        this._send_func(this._stream);
    };
    Protocols.prototype.unlock_title = function (indx) {
        this._stream.reset();
        this._stream.optcode = 385;
        this._stream.writeUint16(385);
        //�ƺ�id
        this._stream.writeUint8(indx);
        this._send_func(this._stream);
    };
    Protocols.prototype.social_buy_revenge_times = function (count) {
        this._stream.reset();
        this._stream.optcode = 386;
        this._stream.writeUint16(386);
        //����
        this._stream.writeUint8(count);
        this._send_func(this._stream);
    };
    Protocols.prototype.enter_risk_instance = function () {
        this._stream.reset();
        this._stream.optcode = 387;
        this._stream.writeUint16(387);
        this._send_func(this._stream);
    };
    Protocols.prototype.social_remove_enemy = function (guid) {
        this._stream.reset();
        this._stream.optcode = 388;
        this._stream.writeUint16(388);
        //guid
        this._stream.writeString(guid);
        this._send_func(this._stream);
    };
    Protocols.prototype.get_player_overview = function (guid) {
        this._stream.reset();
        this._stream.optcode = 389;
        this._stream.writeUint16(389);
        //����id
        this._stream.writeString(guid);
        this._send_func(this._stream);
    };
    Protocols.prototype.send_faction_invite = function (guid) {
        this._stream.reset();
        this._stream.optcode = 391;
        this._stream.writeUint16(391);
        //����id
        this._stream.writeString(guid);
        this._send_func(this._stream);
    };
    Protocols.prototype.buy_vipgift = function (id) {
        this._stream.reset();
        this._stream.optcode = 393;
        this._stream.writeUint16(393);
        //����id
        this._stream.writeUint32(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.activity_opt_buy_dailygift = function (act_id, index) {
        this._stream.reset();
        this._stream.optcode = 394;
        this._stream.writeUint16(394);
        //�id
        this._stream.writeUint32(act_id);
        //�����±�
        this._stream.writeUint32(index);
        this._send_func(this._stream);
    };
    Protocols.prototype.draw_lottery = function (actId, type) {
        this._stream.reset();
        this._stream.optcode = 395;
        this._stream.writeUint16(395);
        //�id
        this._stream.writeUint32(actId);
        //����
        this._stream.writeUint8(type);
        this._send_func(this._stream);
    };
    Protocols.prototype.activity_opt_get_rank_process_reward = function (act_id, index) {
        this._stream.reset();
        this._stream.optcode = 396;
        this._stream.writeUint16(396);
        //�id
        this._stream.writeUint32(act_id);
        //�����±�
        this._stream.writeUint32(index);
        this._send_func(this._stream);
    };
    Protocols.prototype.activity_opt_get_rank_list = function (act_id) {
        this._stream.reset();
        this._stream.optcode = 397;
        this._stream.writeUint16(397);
        //�id
        this._stream.writeUint32(act_id);
        this._send_func(this._stream);
    };
    Protocols.prototype.activity_opt_buy_limitgift = function (act_id, index) {
        this._stream.reset();
        this._stream.optcode = 399;
        this._stream.writeUint16(399);
        //�id
        this._stream.writeUint32(act_id);
        //�����±�
        this._stream.writeUint32(index);
        this._send_func(this._stream);
    };
    Protocols.prototype.welfare_get_recharge_reward = function (id) {
        this._stream.reset();
        this._stream.optcode = 400;
        this._stream.writeUint16(400);
        //����id
        this._stream.writeUint8(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.welfare_get_consume_reward = function (id) {
        this._stream.reset();
        this._stream.optcode = 401;
        this._stream.writeUint16(401);
        //����id
        this._stream.writeUint8(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.welfare_get_sevenday_reward = function (id) {
        this._stream.reset();
        this._stream.optcode = 402;
        this._stream.writeUint16(402);
        //����id
        this._stream.writeUint8(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.risk_get_rank = function () {
        this._stream.reset();
        this._stream.optcode = 404;
        this._stream.writeUint16(404);
        this._send_func(this._stream);
    };
    Protocols.prototype.set_orient = function (angle) {
        this._stream.reset();
        this._stream.optcode = 406;
        this._stream.writeUint16(406);
        //�Ƕ�
        this._stream.writeUint16(angle);
        this._send_func(this._stream);
    };
    Protocols.prototype.use_moneytree = function () {
        this._stream.reset();
        this._stream.optcode = 407;
        this._stream.writeUint16(407);
        this._send_func(this._stream);
    };
    Protocols.prototype.get_moneytree_gift = function (id) {
        this._stream.reset();
        this._stream.optcode = 408;
        this._stream.writeUint16(408);
        //����id
        this._stream.writeUint32(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.set_world_risk_last_id = function (id) {
        this._stream.reset();
        this._stream.optcode = 409;
        this._stream.writeUint16(409);
        //�þ�id
        this._stream.writeUint32(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.enter_private_boss = function (id) {
        this._stream.reset();
        this._stream.optcode = 410;
        this._stream.writeUint16(410);
        //Bossid
        this._stream.writeUint32(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.raise_base_spell_all = function (raiseType, spellIdStr) {
        this._stream.reset();
        this._stream.optcode = 411;
        this._stream.writeUint16(411);
        //��������
        this._stream.writeUint8(raiseType);
        //����ID�ַ���
        this._stream.writeString(spellIdStr);
        this._send_func(this._stream);
    };
    Protocols.prototype.use_restore_potion = function () {
        this._stream.reset();
        this._stream.optcode = 413;
        this._stream.writeUint16(413);
        this._send_func(this._stream);
    };
    Protocols.prototype.pick_quest_adventure = function (indx) {
        this._stream.reset();
        this._stream.optcode = 414;
        this._stream.writeUint16(414);
        //�±�
        this._stream.writeUint32(indx);
        this._send_func(this._stream);
    };
    Protocols.prototype.raise_adventurespell = function (spellId) {
        this._stream.reset();
        this._stream.optcode = 415;
        this._stream.writeUint16(415);
        //����ID
        this._stream.writeUint32(spellId);
        this._send_func(this._stream);
    };
    Protocols.prototype.pick_quest_realmbreak = function (indx) {
        this._stream.reset();
        this._stream.optcode = 416;
        this._stream.writeUint16(416);
        //�±�
        this._stream.writeUint32(indx);
        this._send_func(this._stream);
    };
    Protocols.prototype.pick_realmbreak_daily_reward = function () {
        this._stream.reset();
        this._stream.optcode = 417;
        this._stream.writeUint16(417);
        this._send_func(this._stream);
    };
    Protocols.prototype.group_create = function (type, min_lev, max_lev, auto_flag) {
        this._stream.reset();
        this._stream.optcode = 418;
        this._stream.writeUint16(418);
        //��������
        this._stream.writeUint32(type);
        //�������͵ȼ�
        this._stream.writeUint32(min_lev);
        //���������ȼ�
        this._stream.writeUint32(max_lev);
        //�����Զ��������� 0 �ر� 1 ����
        this._stream.writeUint32(auto_flag);
        this._send_func(this._stream);
    };
    Protocols.prototype.group_join_request = function (guid) {
        this._stream.reset();
        this._stream.optcode = 419;
        this._stream.writeUint16(419);
        //����guid
        this._stream.writeString(guid);
        this._send_func(this._stream);
    };
    Protocols.prototype.group_join_accept = function (guid) {
        this._stream.reset();
        this._stream.optcode = 420;
        this._stream.writeUint16(420);
        //����guid
        this._stream.writeString(guid);
        this._send_func(this._stream);
    };
    Protocols.prototype.group_quit = function () {
        this._stream.reset();
        this._stream.optcode = 421;
        this._stream.writeUint16(421);
        this._send_func(this._stream);
    };
    Protocols.prototype.group_give_captain = function (index) {
        this._stream.reset();
        this._stream.optcode = 422;
        this._stream.writeUint16(422);
        //����index
        this._stream.writeUint32(index);
        this._send_func(this._stream);
    };
    Protocols.prototype.group_kick = function (index) {
        this._stream.reset();
        this._stream.optcode = 423;
        this._stream.writeUint16(423);
        //����index
        this._stream.writeUint32(index);
        this._send_func(this._stream);
    };
    Protocols.prototype.enter_stage_instance = function () {
        this._stream.reset();
        this._stream.optcode = 425;
        this._stream.writeUint16(425);
        this._send_func(this._stream);
    };
    Protocols.prototype.pick_stage_instance_bonus = function (id) {
        this._stream.reset();
        this._stream.optcode = 426;
        this._stream.writeUint16(426);
        //�����±�
        this._stream.writeUint32(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.enter_group_exp = function (isGroup) {
        this._stream.reset();
        this._stream.optcode = 427;
        this._stream.writeUint16(427);
        //�Ƿ����ӽ���
        this._stream.writeUint8(isGroup);
        this._send_func(this._stream);
    };
    Protocols.prototype.select_group_enter = function (choise) {
        this._stream.reset();
        this._stream.optcode = 429;
        this._stream.writeUint16(429);
        //����
        this._stream.writeUint8(choise);
        this._send_func(this._stream);
    };
    Protocols.prototype.buy_group_exp_times = function (count) {
        this._stream.reset();
        this._stream.optcode = 430;
        this._stream.writeUint16(430);
        //����
        this._stream.writeUint8(count);
        this._send_func(this._stream);
    };
    Protocols.prototype.buy_inspiration = function (category) {
        this._stream.reset();
        this._stream.optcode = 431;
        this._stream.writeUint16(431);
        //��������
        this._stream.writeUint8(category);
        this._send_func(this._stream);
    };
    Protocols.prototype.enter_faction_match_map = function () {
        this._stream.reset();
        this._stream.optcode = 440;
        this._stream.writeUint16(440);
        this._send_func(this._stream);
    };
    Protocols.prototype.pick_faction_match_champion_daily_reward = function () {
        this._stream.reset();
        this._stream.optcode = 441;
        this._stream.writeUint16(441);
        this._send_func(this._stream);
    };
    Protocols.prototype.query_faction_match_info = function () {
        this._stream.reset();
        this._stream.optcode = 442;
        this._stream.writeUint16(442);
        this._send_func(this._stream);
    };
    Protocols.prototype.pick_res_instance_first_reward = function (id) {
        this._stream.reset();
        this._stream.optcode = 444;
        this._stream.writeUint16(444);
        //����id
        this._stream.writeUint32(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.group_send_invite = function (guid) {
        this._stream.reset();
        this._stream.optcode = 445;
        this._stream.writeUint16(445);
        //����guid
        this._stream.writeString(guid);
        this._send_func(this._stream);
    };
    Protocols.prototype.group_agree_invite = function (guid, sendGuid) {
        this._stream.reset();
        this._stream.optcode = 447;
        this._stream.writeUint16(447);
        //����guid
        this._stream.writeString(guid);
        //������guid
        this._stream.writeString(sendGuid);
        this._send_func(this._stream);
    };
    Protocols.prototype.get_group_search_info_list = function (type) {
        this._stream.reset();
        this._stream.optcode = 448;
        this._stream.writeUint16(448);
        //��������
        this._stream.writeUint32(type);
        this._send_func(this._stream);
    };
    Protocols.prototype.group_change_config = function (type, min_lev, max_lev, auto_flag) {
        this._stream.reset();
        this._stream.optcode = 450;
        this._stream.writeUint16(450);
        //��������
        this._stream.writeUint32(type);
        //�������͵ȼ�
        this._stream.writeUint32(min_lev);
        //���������ȼ�
        this._stream.writeUint32(max_lev);
        //�����Զ��������� 0 �ر� 1 ����
        this._stream.writeUint32(auto_flag);
        this._send_func(this._stream);
    };
    Protocols.prototype.group_join_denied = function (guid) {
        this._stream.reset();
        this._stream.optcode = 452;
        this._stream.writeUint16(452);
        //����guid
        this._stream.writeString(guid);
        this._send_func(this._stream);
    };
    Protocols.prototype.group_invite_denied = function (guid) {
        this._stream.reset();
        this._stream.optcode = 453;
        this._stream.writeUint16(453);
        //����guid
        this._stream.writeString(guid);
        this._send_func(this._stream);
    };
    Protocols.prototype.talisman_equip = function (id) {
        this._stream.reset();
        this._stream.optcode = 454;
        this._stream.writeUint16(454);
        //����id
        this._stream.writeUint32(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.talisman_unequip = function (slot_id) {
        this._stream.reset();
        this._stream.optcode = 455;
        this._stream.writeUint16(455);
        //��λid
        this._stream.writeUint32(slot_id);
        this._send_func(this._stream);
    };
    Protocols.prototype.auto_group_match = function (targetType) {
        this._stream.reset();
        this._stream.optcode = 461;
        this._stream.writeUint16(461);
        //Ŀ������
        this._stream.writeUint32(targetType);
        this._send_func(this._stream);
    };
    Protocols.prototype.cancel_auto_group_match = function () {
        this._stream.reset();
        this._stream.optcode = 462;
        this._stream.writeUint16(462);
        this._send_func(this._stream);
    };
    Protocols.prototype.kuafu_3v3_group_match = function () {
        this._stream.reset();
        this._stream.optcode = 463;
        this._stream.writeUint16(463);
        this._send_func(this._stream);
    };
    Protocols.prototype.booking_money = function (orderid, goodsname, money1, goodsnum) {
        this._stream.reset();
        this._stream.optcode = 470;
        this._stream.writeUint16(470);
        //������
        this._stream.writeString(orderid);
        //��Ʒ����
        this._stream.writeString(goodsname);
        //����
        this._stream.writeString(money1);
        //Ԫ������
        this._stream.writeUint32(goodsnum);
        this._send_func(this._stream);
    };
    Protocols.prototype.one_step_robot_up = function (id) {
        this._stream.reset();
        this._stream.optcode = 472;
        this._stream.writeUint16(472);
        //����
        this._stream.writeUint32(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.get_seven_day_recharge_extra_reward = function (id) {
        this._stream.reset();
        this._stream.optcode = 473;
        this._stream.writeUint16(473);
        //����id
        this._stream.writeUint32(id);
        this._send_func(this._stream);
    };
    Protocols.prototype.use_giftcode = function (giftcode) {
        this._stream.reset();
        this._stream.optcode = 474;
        this._stream.writeUint16(474);
        //�һ���
        this._stream.writeString(giftcode);
        this._send_func(this._stream);
    };
    Protocols.prototype.lottery_recharge = function () {
        this._stream.reset();
        this._stream.optcode = 480;
        this._stream.writeUint16(480);
        this._send_func(this._stream);
    };
    /*��Ч����*/
    Protocols.MSG_NULL_ACTION = 0; //null_action
    /*��������״̬*/
    Protocols.MSG_PING_PONG = 1; //ping_pong
    /*�ߵ����ߵ�׼��ǿ�Ƶ�½*/
    Protocols.CMSG_FORCED_INTO = 2; //forced_into
    /*����Session����*/
    Protocols.CMSG_GET_SESSION = 3; //get_session
    /*���ط����ݰ�·�ɲ���*/
    Protocols.MSG_ROUTE_TRACE = 4; //route_trace
    /*��¼�ͻ�����־*/
    Protocols.CMSG_WRITE_CLIENT_LOG = 5; //write_client_log
    /*����ʧ��*/
    Protocols.SMSG_OPERATION_FAILED = 6; //operation_failed
    /*ͬ��ʱ��*/
    Protocols.MSG_SYNC_MSTIME = 7; //sync_mstime
    /*��������*/
    Protocols.SMSG_UD_OBJECT = 8; //ud_object
    /*�������¿���Э��*/
    Protocols.CMSG_UD_CONTROL = 9; //ud_control
    /*�������¿���Э������*/
    Protocols.SMSG_UD_CONTROL_RESULT = 10; //ud_control_result
    /*GRID�Ķ�������*/
    Protocols.SMSG_GRID_UD_OBJECT = 11; //grid_ud_object
    /*GRID�Ķ�������*/
    Protocols.SMSG_GRID_UD_OBJECT_2 = 12; //grid_ud_object_2
    /*���߿ͻ��ˣ�Ŀǰ�Լ����ڵ�¼���еĵڼ�λ*/
    Protocols.SMSG_LOGIN_QUEUE_INDEX = 13; //login_queue_index
    /*����ԭ��*/
    Protocols.SMSG_KICKING_TYPE = 14; //kicking_type
    /*��ȡ��ɫ�б�*/
    Protocols.CMSG_GET_CHARS_LIST = 15; //get_chars_list
    /*��ɫ�б�*/
    Protocols.SMSG_CHARS_LIST = 16; //chars_list
    /*���������Ƿ�����ʹ��*/
    Protocols.CMSG_CHECK_NAME = 17; //check_name
    /*�������ֽ���*/
    Protocols.SMSG_CHECK_NAME_RESULT = 18; //check_name_result
    /*������ɫ*/
    Protocols.CMSG_CHAR_CREATE = 19; //char_create
    /*��ɫ��������*/
    Protocols.SMSG_CHAR_CREATE_RESULT = 20; //char_create_result
    /*ɾ����ɫ*/
    Protocols.CMSG_DELETE_CHAR = 21; //delete_char
    /*��ɫɾ������*/
    Protocols.SMSG_DELETE_CHAR_RESULT = 22; //delete_char_result
    /*���ҵ�¼*/
    Protocols.CMSG_PLAYER_LOGIN = 23; //player_login
    /*�����˳�*/
    Protocols.CMSG_PLAYER_LOGOUT = 24; //player_logout
    /*��ʱ�˺�ת����*/
    Protocols.CMSG_REGULARISE_ACCOUNT = 25; //regularise_account
    /*��ɫ������Ϣ*/
    Protocols.CMSG_CHAR_REMOTESTORE = 26; //char_remotestore
    /*��ɫ������Ϣ*/
    Protocols.CMSG_CHAR_REMOTESTORE_STR = 27; //char_remotestore_str
    /*���ͣ�������C->S��mapid���������ɴ��͵�ID*/
    Protocols.CMSG_TELEPORT = 28; //teleport
    /*ֹͣ�ƶ�*/
    Protocols.MSG_MOVE_STOP = 29; //move_stop
    /*unit�����ƶ�*/
    Protocols.MSG_UNIT_MOVE = 30; //unit_move
    /*ʹ����Ϸ����*/
    Protocols.CMSG_USE_GAMEOBJECT = 31; //use_gameobject
    /*��������-����λ��*/
    Protocols.CMSG_BAG_EXCHANGE_POS = 32; //bag_exchange_pos
    /*��������-������Ʒ*/
    Protocols.CMSG_BAG_DESTROY = 33; //bag_destroy
    /*�ָ���Ʒ*/
    Protocols.CMSG_BAG_ITEM_SPLIT = 34; //bag_item_split
    /*ʹ����Ʒ*/
    Protocols.CMSG_BAG_ITEM_USER = 35; //bag_item_user
    /*�·���Ʒ��ȴ*/
    Protocols.SMSG_BAG_ITEM_COOLDOWN = 36; //bag_item_cooldown
    /*grid�е�unit�ƶ���������*/
    Protocols.SMSG_GRID_UNIT_MOVE = 37; //grid_unit_move
    /*grid�е�unit�ƶ���������2*/
    Protocols.SMSG_GRID_UNIT_MOVE_2 = 38; //grid_unit_move_2
    /*�һ���Ʒ*/
    Protocols.CMSG_EXCHANGE_ITEM = 39; //exchange_item
    /*������չ*/
    Protocols.CMSG_BAG_EXTENSION = 40; //bag_extension
    /*����NPC��Ʒ�б�*/
    Protocols.CMSG_NPC_GET_GOODS_LIST = 41; //npc_get_goods_list
    /*Npc��Ʒ�б�*/
    Protocols.SMSG_NPC_GOODS_LIST = 42; //npc_goods_list
    /*������Ʒ*/
    Protocols.CMSG_STORE_BUY = 43; //store_buy
    /*������Ʒ*/
    Protocols.CMSG_NPC_SELL = 44; //npc_sell
    /*�ع���Ʒ*/
    Protocols.CMSG_NPC_REPURCHASE = 45; //npc_repurchase
    /*ʱװ�Ƿ�����*/
    Protocols.CMSG_AVATAR_FASHION_ENABLE = 46; //avatar_fashion_enable
    /*�����Ի�ѡ��*/
    Protocols.CMSG_QUESTHELP_TALK_OPTION = 47; //questhelp_talk_option
    /*��NPC�Ի����ô��͵��б�*/
    Protocols.CMSG_TAXI_HELLO = 48; //taxi_hello
    /*���ʹ��͵��б�*/
    Protocols.SMSG_TAXI_STATIONS_LIST = 49; //taxi_stations_list
    /*ѡ�����͵�*/
    Protocols.CMSG_TAXI_SELECT_STATION = 50; //taxi_select_station
    /*��NPC����ѡ��ѡ��*/
    Protocols.CMSG_GOSSIP_SELECT_OPTION = 51; //gossip_select_option
    /*��NPC���Ļ�ȡѡ��*/
    Protocols.CMSG_GOSSIP_HELLO = 52; //gossip_hello
    /*����������Ϣ��ѡ��*/
    Protocols.SMSG_GOSSIP_MESSAGE = 53; //gossip_message
    /*���񷢲���״̬��ѯ*/
    Protocols.CMSG_QUESTGIVER_STATUS_QUERY = 54; //questgiver_status_query
    /*����NPC״̬*/
    Protocols.SMSG_QUESTGIVER_STATUS = 55; //questgiver_status
    /*��ѯ����״̬*/
    Protocols.MSG_QUERY_QUEST_STATUS = 56; //query_quest_status
    /*�ɽ�����*/
    Protocols.CMSG_QUESTHELP_GET_CANACCEPT_LIST = 57; //questhelp_get_canaccept_list
    /*�·��ɽ������б�*/
    Protocols.SMSG_QUESTHELP_CANACCEPT_LIST = 58; //questhelp_canaccept_list
    /*����ʧ��*/
    Protocols.SMSG_QUESTUPDATE_FAILD = 59; //questupdate_faild
    /*������������*/
    Protocols.SMSG_QUESTUPDATE_COMPLETE = 60; //questupdate_complete
    /*��������*/
    Protocols.CMSG_QUESTLOG_REMOVE_QUEST = 61; //questlog_remove_quest
    /*��������*/
    Protocols.CMSG_QUESTGIVER_COMPLETE_QUEST = 62; //questgiver_complete_quest
    /*����������֪ͨ���������¸�����*/
    Protocols.SMSG_QUESTHELP_NEXT = 63; //questhelp_next
    /*����ϵͳǿ����������*/
    Protocols.CMSG_QUESTHELP_COMPLETE = 64; //questhelp_complete
    /*���������ɹ�*/
    Protocols.SMSG_QUESTUPDATE_ACCEPT = 65; //questupdate_accept
    /*������������_�±�����*/
    Protocols.CMSG_QUESTHELP_UPDATE_STATUS = 66; //questhelp_update_status
    /*����������*/
    Protocols.SMSG_QUESTGETTER_COMPLETE = 67; //questgetter_complete
    /*������*/
    Protocols.CMSG_QUESTGIVER_ACCEPT_QUEST = 68; //questgiver_accept_quest
    /*����ʹ����Ʒ*/
    Protocols.CMSG_QUESTUPDATE_USE_ITEM = 69; //questupdate_use_item
    /*��ѯ��������*/
    Protocols.CMSG_QUESTHELP_QUERY_BOOK = 70; //questhelp_query_book
    /*�·��ɽ���������*/
    Protocols.SMSG_QUESTHELP_BOOK_QUEST = 71; //questhelp_book_quest
    /*����ʹ����Ϸ�����Ժ��Ķ���*/
    Protocols.SMSG_USE_GAMEOBJECT_ACTION = 72; //use_gameobject_action
    /*���ù���ģʽ*/
    Protocols.CMSG_SET_ATTACK_MODE = 73; //set_attack_mode
    /*ѡ��Ŀ��*/
    Protocols.MSG_SELECT_TARGET = 74; //select_target
    /*����ս��*/
    Protocols.SMSG_COMBAT_STATE_UPDATE = 75; //combat_state_update
    /*��������*/
    Protocols.SMSG_EXP_UPDATE = 76; //exp_update
    /*�ͻ����ͷż���*/
    Protocols.MSG_SPELL_START = 77; //spell_start
    /*ʩ��ֹͣ*/
    Protocols.MSG_SPELL_STOP = 78; //spell_stop
    /*��*/
    Protocols.MSG_JUMP = 79; //jump
    /*����*/
    Protocols.CMSG_RESURRECTION = 80; //resurrection
    /*���׷�������*/
    Protocols.MSG_TRADE_REQUEST = 81; //trade_request
    /*������������*/
    Protocols.MSG_TRADE_REPLY = 82; //trade_reply
    /*���׿�ʼ*/
    Protocols.SMSG_TRADE_START = 83; //trade_start
    /*����ȷ����Ʒ*/
    Protocols.MSG_TRADE_DECIDE_ITEMS = 84; //trade_decide_items
    /*��������*/
    Protocols.SMSG_TRADE_FINISH = 85; //trade_finish
    /*����ȡ��*/
    Protocols.MSG_TRADE_CANCEL = 86; //trade_cancel
    /*����׼����*/
    Protocols.MSG_TRADE_READY = 87; //trade_ready
    /*���ｲ��*/
    Protocols.SMSG_CHAT_UNIT_TALK = 88; //chat_unit_talk
    /*�ͽ�����*/
    Protocols.CMSG_CHAT_NEAR = 89; //chat_near
    /*˽��*/
    Protocols.CMSG_CHAT_WHISPER = 90; //chat_whisper
    /*��Ӫ����*/
    Protocols.MSG_CHAT_FACTION = 91; //chat_faction
    /*����*/
    Protocols.MSG_CHAT_WORLD = 92; //chat_world
    /*����*/
    Protocols.MSG_CHAT_HORN = 93; //chat_horn
    /*����*/
    Protocols.MSG_CHAT_NOTICE = 94; //chat_notice
    /*��ѯ������Ϣ*/
    Protocols.CMSG_QUERY_PLAYER_INFO = 95; //query_player_info
    /*��ѯ��Ϣ��������*/
    Protocols.SMSG_QUERY_RESULT_UPDATE_OBJECT = 96; //query_result_update_object
    /*��ȡ����*/
    Protocols.CMSG_RECEIVE_GIFT_PACKS = 97; //receive_gift_packs
    /*��ͼ��������*/
    Protocols.SMSG_MAP_UPDATE_OBJECT = 98; //map_update_object
    /*ս����Ϣbinlog*/
    Protocols.SMSG_FIGHTING_INFO_UPDATE_OBJECT = 99; //fighting_info_update_object
    /*ս����Ϣbinlog*/
    Protocols.SMSG_FIGHTING_INFO_UPDATE_OBJECT_2 = 100; //fighting_info_update_object_2
    /*���븱��*/
    Protocols.CMSG_INSTANCE_ENTER = 101; //instance_enter
    /*�������˷��͸���������һ�׶�ָ��*/
    Protocols.CMSG_INSTANCE_NEXT_STATE = 102; //instance_next_state
    /*�����˳�*/
    Protocols.CMSG_INSTANCE_EXIT = 103; //instance_exit
    /*��ʱ���ȡ*/
    Protocols.CMSG_LIMIT_ACTIVITY_RECEIVE = 104; //limit_activity_receive
    /*ɱ����~~��������*/
    Protocols.SMSG_KILL_MAN = 105; //kill_man
    /*��������*/
    Protocols.SMSG_PLAYER_UPGRADE = 106; //player_upgrade
    /*�ֿ���Ǯ*/
    Protocols.CMSG_WAREHOUSE_SAVE_MONEY = 107; //warehouse_save_money
    /*�ֿ�ȡǮ*/
    Protocols.CMSG_WAREHOUSE_TAKE_MONEY = 108; //warehouse_take_money
    /*ʹ��Ԫ������ĳ��*/
    Protocols.CMSG_USE_GOLD_OPT = 109; //use_gold_opt
    /*ʹ��ͭǮ����ĳ��*/
    Protocols.CMSG_USE_SILVER_OPT = 110; //use_silver_opt
    /*��̨����*/
    Protocols.SMSG_GM_RIGHTFLOAT = 111; //gm_rightfloat
    /*ɾ��ĳ����̨����*/
    Protocols.SMSG_DEL_GM_RIGHTFLOAT = 112; //del_gm_rightfloat
    /*Ӧ�÷�ͬ��ʱ��*/
    Protocols.MSG_SYNC_MSTIME_APP = 113; //sync_mstime_app
    /*���Ҵ���ĳ������*/
    Protocols.CMSG_OPEN_WINDOW = 114; //open_window
    /*���Բ���*/
    Protocols.CMSG_PLAYER_GAG = 115; //player_gag
    /*���˲���*/
    Protocols.CMSG_PLAYER_KICKING = 116; //player_kicking
    /*�Ϸ�֪ͨ*/
    Protocols.SMSG_MERGE_SERVER_MSG = 117; //merge_server_msg
    /*��ȡ������Ϣ*/
    Protocols.CMSG_RANK_LIST_QUERY = 118; //rank_list_query
    /*�ͻ��˻�ȡ���а񷵻ؽ���*/
    Protocols.SMSG_RANK_LIST_QUERY_RESULT = 119; //rank_list_query_result
    /*�ͻ����ȸ�����ģ������ȡuint*/
    Protocols.CMSG_CLIENT_UPDATE_SCENED = 120; //client_update_scened
    /*��ֵ��*/
    Protocols.SMSG_NUM_LUA = 121; //num_lua
    /*ս��Ʒʰȡ*/
    Protocols.CMSG_LOOT_SELECT = 122; //loot_select
    /*֪ͨ��¼�������Ҵ�����Ϸ��*/
    Protocols.CMSG_GOBACK_TO_GAME_SERVER = 123; //goback_to_game_server
    /*�ͻ��˰ѱ�����Ա���ݴ���������*/
    Protocols.CMSG_WORLD_WAR_CS_PLAYER_INFO = 124; //world_war_CS_player_info
    /*���Ҽ��������뿪ĳ������*/
    Protocols.SMSG_JOIN_OR_LEAVE_SERVER = 125; //join_or_leave_server
    /*�ͻ�������������Ա����*/
    Protocols.MSG_WORLD_WAR_SC_PLAYER_INFO = 126; //world_war_SC_player_info
    /*�ͻ��˶�����Ϣ*/
    Protocols.MSG_CLIENTSUBSCRIPTION = 127; //clientSubscription
    /*�������·�lua�ű�*/
    Protocols.SMSG_LUA_SCRIPT = 128; //lua_script
    /*��ɫ������Ϣ*/
    Protocols.CMSG_CHAR_UPDATE_INFO = 129; //char_update_info
    /*֪ͨ�ͻ��˹۲��ߵ��ӽ�*/
    Protocols.SMSG_NOTICE_WATCHER_MAP_INFO = 130; //notice_watcher_map_info
    /*�ͻ��˶��Ķ�����Ϣ*/
    Protocols.CMSG_MODIFY_WATCH = 131; //modify_watch
    /*��������*/
    Protocols.CMSG_KUAFU_CHUANSONG = 132; //kuafu_chuansong
    /*��ʾ��ǰװ��*/
    Protocols.CMSG_SHOW_SUIT = 133; //show_suit
    /*��ʾ��ǰ����*/
    Protocols.CMSG_SHOW_POSITION = 134; //show_position
    /*Ԫ������*/
    Protocols.CMSG_GOLD_RESPAWN = 135; //gold_respawn
    /*Ұ����������ʱ*/
    Protocols.SMSG_FIELD_DEATH_COOLDOWN = 136; //field_death_cooldown
    /*�̳ǹ���*/
    Protocols.CMSG_MALL_BUY = 137; //mall_buy
    /*ǿ��*/
    Protocols.CMSG_STRENGTH = 139; //strength
    /*ǿ���ɹ�*/
    Protocols.SMSG_STRENGTH_SUCCESS = 140; //strength_success
    /*ǿ�ƽ���*/
    Protocols.CMSG_FORCEINTO = 141; //forceInto
    /*��������*/
    Protocols.CMSG_CREATE_FACTION = 142; //create_faction
    /*��������*/
    Protocols.CMSG_FACTION_UPGRADE = 143; //faction_upgrade
    /*������������*/
    Protocols.CMSG_FACTION_JOIN = 144; //faction_join
    /*������������*/
    Protocols.CMSG_RAISE_BASE_SPELL = 145; //raise_base_spell
    /*�������׷�ŭ����*/
    Protocols.CMSG_UPGRADE_ANGER_SPELL = 146; //upgrade_anger_spell
    /*������������*/
    Protocols.CMSG_RAISE_MOUNT = 147; //raise_mount
    /*������������*/
    Protocols.CMSG_UPGRADE_MOUNT = 148; //upgrade_mount
    /*����һ����������*/
    Protocols.CMSG_UPGRADE_MOUNT_ONE_STEP = 149; //upgrade_mount_one_step
    /*���������û�����*/
    Protocols.CMSG_ILLUSION_MOUNT_ACTIVE = 150; //illusion_mount_active
    /*�����û�����*/
    Protocols.CMSG_ILLUSION_MOUNT = 151; //illusion_mount
    /*�������˲���*/
    Protocols.CMSG_RIDE_MOUNT = 152; //ride_mount
    /*grid�е�unit��Ծ*/
    Protocols.SMSG_GRID_UNIT_JUMP = 153; //grid_unit_jump
    /*��ʯ*/
    Protocols.CMSG_GEM = 154; //gem
    /*�����л�ģʽ*/
    Protocols.CMSG_CHANGE_BATTLE_MODE = 155; //change_battle_mode
    /*��ƽģʽCD*/
    Protocols.SMSG_PEACE_MODE_CD = 156; //peace_mode_cd
    /*��������*/
    Protocols.CMSG_DIVINE_ACTIVE = 157; //divine_active
    /*��������*/
    Protocols.CMSG_DIVINE_UPLEV = 158; //divine_uplev
    /*�л�����*/
    Protocols.CMSG_DIVINE_SWITCH = 159; //divine_switch
    /*������Ծ*/
    Protocols.CMSG_JUMP_START = 160; //jump_start
    /*��������vip����*/
    Protocols.CMSG_ENTER_VIP_INSTANCE = 161; //enter_vip_instance
    /*����ɨ��vip����*/
    Protocols.CMSG_SWEEP_VIP_INSTANCE = 162; //sweep_vip_instance
    /*���йһ�*/
    Protocols.CMSG_HANG_UP = 163; //hang_up
    /*���йһ�����*/
    Protocols.CMSG_HANG_UP_SETTING = 164; //hang_up_setting
    /*������������������*/
    Protocols.CMSG_ENTER_TRIAL_INSTANCE = 165; //enter_trial_instance
    /*ɨ������������*/
    Protocols.CMSG_SWEEP_TRIAL_INSTANCE = 166; //sweep_trial_instance
    /*����������*/
    Protocols.CMSG_RESET_TRIAL_INSTANCE = 167; //reset_trial_instance
    /*ɨ����������*/
    Protocols.SMSG_SWEEP_INSTANCE_REWARD = 168; //sweep_instance_reward
    /*�ؽ�����*/
    Protocols.CMSG_REENTER_INSTANCE = 169; //reenter_instance
    /*��������Ϣ*/
    Protocols.SMSG_MERRY_GO_ROUND = 170; //merry_go_round
    /*���Ӻ���*/
    Protocols.CMSG_SOCIAL_ADD_FRIEND = 171; //social_add_friend
    /*ͬ�����Ӻ���*/
    Protocols.CMSG_SOCIAL_SUREADD_FRIEND = 172; //social_sureadd_friend
    /*��������*/
    Protocols.CMSG_SOCIAL_GIFT_FRIEND = 173; //social_gift_friend
    /*�Ƽ������б�*/
    Protocols.CMSG_SOCIAL_RECOMMEND_FRIEND = 174; //social_recommend_friend
    /*�Ƽ������б�*/
    Protocols.SMSG_SOCIAL_GET_RECOMMEND_FRIEND = 175; //social_get_recommend_friend
    /*����*/
    Protocols.CMSG_SOCIAL_REVENGE_ENEMY = 176; //social_revenge_enemy
    /*ɾ������*/
    Protocols.CMSG_SOCIAL_DEL_FRIEND = 177; //social_del_friend
    /*�س�*/
    Protocols.CMSG_TELEPORT_MAIN_CITY = 178; //teleport_main_city
    /*��ͬƵ������*/
    Protocols.CMSG_CHAT_BY_CHANNEL = 179; //chat_by_channel
    /*��������*/
    Protocols.SMSG_SEND_CHAT = 180; //send_chat
    /*���������б�*/
    Protocols.CMSG_SOCIAL_CLEAR_APPLY = 181; //social_clear_apply
    /*���þܾ�������Ϣ*/
    Protocols.CMSG_MSG_DECLINE = 182; //msg_decline
    /*�����б�*/
    Protocols.SMSG_FACTION_GET_LIST_RESULT = 183; //faction_get_list_result
    /*��ȡ�����б�*/
    Protocols.CMSG_FACTION_GETLIST = 184; //faction_getlist
    /*���ɹ���*/
    Protocols.CMSG_FACTION_MANAGER = 185; //faction_manager
    /*���ɳ�Ա����*/
    Protocols.CMSG_FACTION_MEMBER_OPERATE = 186; //faction_member_operate
    /*���ټ�������*/
    Protocols.CMSG_FACTION_FAST_JOIN = 187; //faction_fast_join
    /*ͨ���������Ӻ���*/
    Protocols.CMSG_SOCIAL_ADD_FRIEND_BYNAME = 188; //social_add_friend_byname
    /*���ʼ�*/
    Protocols.CMSG_READ_MAIL = 190; //read_mail
    /*��ȡ�ʼ�*/
    Protocols.CMSG_PICK_MAIL = 191; //pick_mail
    /*ɾ���ʼ�*/
    Protocols.CMSG_REMOVE_MAIL = 192; //remove_mail
    /*һ����ȡ�ʼ�*/
    Protocols.CMSG_PICK_MAIL_ONE_STEP = 193; //pick_mail_one_step
    /*һ��ɾ���ʼ�*/
    Protocols.CMSG_REMOVE_MAIL_ONE_STEP = 194; //remove_mail_one_step
    /*����ĳ��*/
    Protocols.CMSG_BLOCK_CHAT = 195; //block_chat
    /*ȡ������*/
    Protocols.CMSG_CANCEL_BLOCK_CHAT = 196; //cancel_block_chat
    /*ʹ����Ҫ�㲥����Ϸ����*/
    Protocols.CMSG_USE_BROADCAST_GAMEOBJECT = 200; //use_broadcast_gameobject
    /*����BOSS����*/
    Protocols.CMSG_WORLD_BOSS_ENROLL = 201; //world_boss_enroll
    /*����BOSS��ս*/
    Protocols.CMSG_WORLD_BOSS_FIGHT = 202; //world_boss_fight
    /*����*/
    Protocols.CMSG_CHANGE_LINE = 203; //change_line
    /*roll����BOSS����*/
    Protocols.CMSG_ROLL_WORLD_BOSS_TREASURE = 204; //roll_world_boss_treasure
    /*roll������*/
    Protocols.SMSG_ROLL_RESULT = 205; //roll_result
    /*��ǰBOSS�˺�����*/
    Protocols.SMSG_BOSS_RANK = 206; //boss_rank
    /*���а�����*/
    Protocols.CMSG_RANK_ADD_LIKE = 207; //rank_add_like
    /*���а����޽���*/
    Protocols.SMSG_RANK_ADD_LIKE_RESULT = 208; //rank_add_like_result
    /*������Դ����*/
    Protocols.CMSG_RES_INSTANCE_ENTER = 210; //res_instance_enter
    /*ɨ����Դ����*/
    Protocols.CMSG_RES_INSTANCE_SWEEP = 211; //res_instance_sweep
    /*�鿴����ͼ�ķ��ߺ�*/
    Protocols.CMSG_SHOW_MAP_LINE = 212; //show_map_line
    /*���ر���ͼ�ķ��ߺ���Ϣ*/
    Protocols.SMSG_SEND_MAP_LINE = 213; //send_map_line
    /*���ý�����ʾ*/
    Protocols.SMSG_ITEM_NOTICE = 214; //item_notice
    /*���͵�ĳ��������ͼ*/
    Protocols.CMSG_TELEPORT_MAP = 216; //teleport_map
    /*���͵�Ұ��boss�Ա�*/
    Protocols.CMSG_TELEPORT_FIELD_BOSS = 217; //teleport_field_boss
    /*��Ծ�Ƚ���*/
    Protocols.CMSG_GET_ACTIVITY_REWARD = 218; //get_activity_reward
    /*�ɾͽ���*/
    Protocols.CMSG_GET_ACHIEVE_REWARD = 220; //get_achieve_reward
    /*�ܳɾͽ���*/
    Protocols.CMSG_GET_ACHIEVE_ALL_REWARD = 221; //get_achieve_all_reward
    /*װ���ƺ�*/
    Protocols.CMSG_SET_TITLE = 222; //set_title
    /*��ʼ���ƺ�*/
    Protocols.CMSG_INIT_TITLE = 223; //init_title
    /*��ȡ�׳佱��*/
    Protocols.CMSG_WELFARE_SHOUCHONG_REWARD = 224; //welfare_shouchong_reward
    /*ÿ��ǩ������*/
    Protocols.CMSG_WELFARE_CHECKIN = 225; //welfare_checkin
    /*�ۻ�ǩ������*/
    Protocols.CMSG_WELFARE_CHECKIN_ALL = 226; //welfare_checkin_all
    /*��ǩ����*/
    Protocols.CMSG_WELFARE_CHECKIN_GETBACK = 227; //welfare_checkin_getback
    /*�ȼ�����*/
    Protocols.CMSG_WELFARE_LEVEL = 228; //welfare_level
    /*��һؽ���*/
    Protocols.CMSG_WELFARE_ACTIVE_GETBACK = 229; //welfare_active_getback
    /*��ȡ��������*/
    Protocols.CMSG_PICK_QUEST_REWARD = 230; //pick_quest_reward
    /*��npc�Ի�*/
    Protocols.CMSG_TALK_WITH_NPC = 231; //talk_with_npc
    /*ʹ��������Ʒ*/
    Protocols.CMSG_USE_VIRTUAL_ITEM = 232; //use_virtual_item
    /*��ȡ�����½ڽ���*/
    Protocols.CMSG_PICK_QUEST_CHAPTER_REWARD = 233; //pick_quest_chapter_reward
    /*3v3����ƥ��*/
    Protocols.CMSG_KUAFU_3V3_MATCH = 234; //kuafu_3v3_match
    /*������ʼƥ��*/
    Protocols.SMSG_KUAFU_MATCH_START = 235; //kuafu_match_start
    /*3v3��������*/
    Protocols.CMSG_KUAFU_3V3_BUYTIMES = 236; //kuafu_3v3_buytimes
    /*3v3ÿ�ջ�Ծ����*/
    Protocols.CMSG_KUAFU_3V3_DAYREWARD = 237; //kuafu_3v3_dayreward
    /*����3v3���а�*/
    Protocols.CMSG_KUAFU_3V3_GETRANLIST = 238; //kuafu_3v3_getranlist
    /*3v3���а������б�*/
    Protocols.SMSG_KUAFU_3V3_RANLIST = 239; //kuafu_3v3_ranlist
    /*�������н����б�*/
    Protocols.CMSG_WELFARE_GETALLLIST_GETBACK = 240; //welfare_getalllist_getback
    /*�����б�*/
    Protocols.SMSG_WELFARE_REWARDLIST_GETBACK = 241; //welfare_rewardlist_getback
    /*һ����ȡ���и���*/
    Protocols.CMSG_WELFARE_GETALL_GETBACK = 242; //welfare_getall_getback
    /*����3v3���а��Լ�������*/
    Protocols.CMSG_KUAFU_3V3_GETMYRANK = 248; //kuafu_3v3_getmyrank
    /*3v3���а��Լ������ν���*/
    Protocols.SMSG_KUAFU_3V3_MYRANK = 249; //kuafu_3v3_myrank
    /*��ɱ����*/
    Protocols.SMSG_KUAFU_3V3_KILL_DETAIL = 250; //kuafu_3v3_kill_detail
    /*����ƥ���ȴ�����*/
    Protocols.SMSG_KUAFU_3V3_WAIT_INFO = 251; //kuafu_3v3_wait_info
    /*ȡ��ƥ��*/
    Protocols.MSG_KUAFU_3V3_CANCEL_MATCH = 252; //kuafu_3v3_cancel_match
    /*ƥ�䵽��&���ܻ��߾ܾ�*/
    Protocols.CMSG_KUAFU_3V3_MATCH_OPER = 253; //kuafu_3v3_match_oper
    /*�ܾ�����*/
    Protocols.SMSG_KUAFU_3V3_DECLINE_MATCH = 254; //kuafu_3v3_decline_match
    /*�ɸ��ᱦ����ƥ��*/
    Protocols.CMSG_KUAFU_XIANFU_MATCH = 255; //kuafu_xianfu_match
    /*��������ƥ���ȴ�*/
    Protocols.SMSG_KUAFU_MATCH_WAIT = 256; //kuafu_match_wait
    /*�ɸ��ᱦС��ͼ��Ϣ*/
    Protocols.SMSG_KUAFU_XIANFU_MINIMAP_INFO = 257; //kuafu_xianfu_minimap_info
    /*�����ɸ�����ȯ*/
    Protocols.CMSG_BUY_XIANFU_ITEM = 258; //buy_xianfu_item
    /*��������*/
    Protocols.CMSG_XIANFU_RANDOM_RESPAWN = 259; //xianfu_random_respawn
    /*����̨��ս*/
    Protocols.CMSG_DOUJIANTAI_FIGHT = 260; //doujiantai_fight
    /*����̨��������*/
    Protocols.CMSG_DOUJIANTAI_BUYTIME = 261; //doujiantai_buytime
    /*����̨����CD*/
    Protocols.CMSG_DOUJIANTAI_CLEARCD = 262; //doujiantai_clearcd
    /*����̨��ʤ����*/
    Protocols.CMSG_DOUJIANTAI_FIRST_REWARD = 263; //doujiantai_first_reward
    /*����̨��ս������Ϣ*/
    Protocols.MSG_DOUJIANTAI_GET_ENEMYS_INFO = 265; //doujiantai_get_enemys_info
    /*����̨���а�*/
    Protocols.CMSG_DOUJIANTAI_GET_RANK = 266; //doujiantai_get_rank
    /*����̨ˢ�¶���*/
    Protocols.CMSG_DOUJIANTAI_REFRESH_ENEMYS = 270; //doujiantai_refresh_enemys
    /*����̨����*/
    Protocols.MSG_DOUJIANTAI_TOP3 = 271; //doujiantai_top3
    /*ʹ������*/
    Protocols.MSG_USE_JUMP_POINT = 272; //use_jump_point
    /*������Ʒ*/
    Protocols.CMSG_BAG_ITEM_SELL = 273; //bag_item_sell
    /*������Ʒ*/
    Protocols.CMSG_BAG_ITEM_SORT = 274; //bag_item_sort
    /*�ύ�ճ�����*/
    Protocols.CMSG_SUBMIT_QUEST_DAILY2 = 280; //submit_quest_daily2
    /*���Ըı�*/
    Protocols.SMSG_ATTRIBUTE_CHANGED = 281; //attribute_changed
    /*�����и�ǿװ��*/
    Protocols.SMSG_BAG_FIND_EQUIP_BETTER = 282; //bag_find_equip_better
    /*ģ������*/
    Protocols.SMSG_MODULE_ACTIVE = 283; //module_active
    /*��ȡ�ճ���������*/
    Protocols.CMSG_PICK_DAILY2_QUEST_REWARD = 284; //pick_daily2_quest_reward
    /*���ɵ�ǰ����*/
    Protocols.CMSG_FINISH_NOW_GUIDE = 285; //finish_now_guide
    /*ȡ����������Ϣ*/
    Protocols.CMSG_GET_CULTIVATION_INFO = 286; //get_cultivation_info
    /*������������Ϣ*/
    Protocols.SMSG_UPDATE_CULTIVATION_INFO = 287; //update_cultivation_info
    /*ȡ�õ�ǰ����������������Ϣ*/
    Protocols.CMSG_GET_CULTIVATION_RIVALS_INFO = 288; //get_cultivation_rivals_info
    /*����������������Ϣ*/
    Protocols.SMSG_UPDATE_CULTIVATION_RIVALS_INFO_LIST = 289; //update_cultivation_rivals_info_list
    /*��ȡ����������*/
    Protocols.CMSG_GET_CULTIVATION_REWARD = 290; //get_cultivation_reward
    /*ˢ������������*/
    Protocols.CMSG_REFRESH_CULTIVATION_RIVALS = 291; //refresh_cultivation_rivals
    /*�Ӷ�����������*/
    Protocols.CMSG_PLUNDER_CULTIVATION_RIVAL = 292; //plunder_cultivation_rival
    /*������������������*/
    Protocols.CMSG_REVENGE_CULTIVATION_RIVAL = 293; //revenge_cultivation_rival
    /*����������ʣ����ս����*/
    Protocols.CMSG_BUY_CULTIVATION_LEFT_PLUNDER_COUNT = 294; //buy_cultivation_left_plunder_count
    /*����������ս������*/
    Protocols.SMSG_SHOW_CULTIVATION_RESULT_LIST = 295; //show_cultivation_result_list
    /*��ȡ��¼��������*/
    Protocols.CMSG_GET_LOGIN_ACTIVITY_REWARD = 296; //get_login_activity_reward
    /*֪ͨ�ͻ����ͷ���������*/
    Protocols.SMSG_CAST_SPELL_START = 300; //cast_spell_start
    /*���ɷ�ǿ�������Ĳ���*/
    Protocols.CMSG_FINISH_OPTIONAL_GUIDE_STEP = 301; //finish_optional_guide_step
    /*ִ�нӵ������Ժ�������*/
    Protocols.CMSG_EXECUTE_QUEST_CMD_AFTER_ACCEPTED = 302; //execute_quest_cmd_after_accepted
    /*֪ͨ�ͻ�����ʾ����*/
    Protocols.SMSG_SHOW_UNIT_ATTRIBUTE = 310; //show_unit_attribute
    /*���ؼ���*/
    Protocols.CMSG_BACK_TO_FAMITY = 320; //back_to_famity
    /*���ؼ���boss����*/
    Protocols.SMSG_FACTION_BOSS_SEND_RESULT = 321; //faction_boss_send_result
    /*��սboss*/
    Protocols.CMSG_CHALLANGE_BOSS = 322; //challange_boss
    /*��ȡ���߽���*/
    Protocols.CMSG_PICK_OFFLINE_REWARD = 325; //pick_offline_reward
    /*���߽�������*/
    Protocols.SMSG_OFFLINE_REWARD_RESULT = 326; //offline_reward_result
    /*����װ��*/
    Protocols.CMSG_SMELTING_EQUIP = 327; //smelting_equip
    /*�Ͻ�װ��*/
    Protocols.CMSG_STOREHOUSE_HAND_IN = 328; //storehouse_hand_in
    /*�һ�װ��*/
    Protocols.CMSG_STOREHOUSE_EXCHANGE = 329; //storehouse_exchange
    /*����װ��*/
    Protocols.CMSG_STOREHOUSE_DESTROY = 330; //storehouse_destroy
    /*��������*/
    Protocols.CMSG_SEND_FACTION_GIFT = 331; //send_faction_gift
    /*��ȡ���⽱��*/
    Protocols.CMSG_GET_FACTION_GIFT_EXREWARD = 332; //get_faction_gift_exreward
    /*��ȡ���ж��⽱��*/
    Protocols.CMSG_GET_ALL_FACTION_GIFT_EXREWARD = 333; //get_all_faction_gift_exreward
    /*���������б�*/
    Protocols.SMSG_SHOW_FACTION_GIFT_PAGE = 334; //show_faction_gift_page
    /*����������Ϣ*/
    Protocols.SMSG_SHOW_FACTION_GIFT_INFO = 335; //show_faction_gift_info
    /*����Ů��δ��л����*/
    Protocols.SMSG_SHOW_FACTION_GIFT_UNTHANK_PAGE = 336; //show_faction_gift_unthank_page
    /*����Ů����ʷ��¼*/
    Protocols.SMSG_SHOW_FACTION_GIFT_HISTORY_PAGE = 337; //show_faction_gift_history_page
    /*����������������*/
    Protocols.CMSG_GET_FACTION_GIFT_RANK_PAGE = 338; //get_faction_gift_rank_page
    /*���ؼ�����������*/
    Protocols.SMSG_SHOW_FACTION_GIFT_RANK_RESULT_LIST = 339; //show_faction_gift_rank_result_list
    /*���ؼ����������б仯*/
    Protocols.SMSG_SHOW_FACTION_GIFT_RANK_CHANGE = 340; //show_faction_gift_rank_change
    /*���ر�������������*/
    Protocols.SMSG_SHOW_FACTION_GIFT_RANK_INFO = 341; //show_faction_gift_rank_info
    /*����ǿ��*/
    Protocols.CMSG_DIVINE_FORGE = 342; //divine_forge
    /*��������*/
    Protocols.CMSG_DIVINE_ADVANCE = 343; //divine_advance
    /*��������*/
    Protocols.CMSG_DIVINE_SPIRIT = 344; //divine_spirit
    /*��ѯȫ��boss��Ϣ*/
    Protocols.CMSG_QUERY_MASS_BOSS_INFO = 352; //query_mass_boss_info
    /*ȫ��boss��Ϣ����*/
    Protocols.SMSG_MASS_BOSS_INFO_RET = 353; //mass_boss_info_ret
    /*��ѯȫ��boss���а�*/
    Protocols.CMSG_QUERY_MASS_BOSS_RANK = 354; //query_mass_boss_rank
    /*ȫ��boss���н���*/
    Protocols.SMSG_MASS_BOSS_RANK_RESULT = 355; //mass_boss_rank_result
    /*��սȫ��boss*/
    Protocols.CMSG_TRY_MASS_BOSS = 356; //try_mass_boss
    /*������սȫ��boss����*/
    Protocols.CMSG_BUY_MASS_BOSS_TIMES = 357; //buy_mass_boss_times
    /*���Ӹ�������ƥ��*/
    Protocols.CMSG_GROUP_INSTANCE_MATCH = 358; //group_instance_match
    /*���Ӹ���������������*/
    Protocols.CMSG_BUY_GROUP_INSTANCE_TIMES = 359; //buy_group_instance_times
    /*��������*/
    Protocols.CMSG_TALISMAN_ACTIVE = 360; //talisman_active
    /*����ע��*/
    Protocols.CMSG_TALISMAN_LVUP = 361; //talisman_lvup
    /*���𼤻�*/
    Protocols.CMSG_WINGS_ACTIVE = 362; //wings_active
    /*����ף��*/
    Protocols.CMSG_WINGS_BLESS = 363; //wings_bless
    /*��������*/
    Protocols.CMSG_WINGS_RANKUP = 364; //wings_rankup
    /*����ǿ��*/
    Protocols.CMSG_WINGS_STRENGTH = 365; //wings_strength
    /*��������*/
    Protocols.CMSG_MERIDIAN_PRACTISE = 366; //meridian_practise
    /*�Ӿ�����������ֵ*/
    Protocols.CMSG_ADD_MERIDIAN_EXP = 367; //add_meridian_exp
    /*���������ȼ�*/
    Protocols.CMSG_RAISE_MOUNT_LEVEL_BASE = 368; //raise_mount_level_base
    /*��������*/
    Protocols.CMSG_ACTIVE_MOUNT = 369; //active_mount
    /*����������ս��������*/
    Protocols.SMSG_SHOW_FACTION_BOSSDEFENSE_DAMAGE_LIST = 370; //show_faction_bossdefense_damage_list
    /*�����޾�Զ��ɨ������*/
    Protocols.SMSG_SHOW_FACTION_TOWER_SWEEP_LIST = 371; //show_faction_tower_sweep_list
    /*��������*/
    Protocols.SMSG_SEND_INSTANCE_RESULT = 375; //send_instance_result
    /*ƥ�䵥��pvp*/
    Protocols.CMSG_MATCH_SINGLE_PVP = 376; //match_single_pvp
    /*��������pvp����*/
    Protocols.CMSG_BUY_MATCH_SINGLE_PVP_TIMES = 377; //buy_match_single_pvp_times
    /*��ȡ����pvp���⽱��*/
    Protocols.CMSG_PICK_MATCH_SINGLE_PVP_EXTRA_REWARD = 378; //pick_match_single_pvp_extra_reward
    /*װ�����ɲ���*/
    Protocols.CMSG_EQUIPDEVELOP_OPERATE = 380; //equipdevelop_operate
    /*��������*/
    Protocols.CMSG_ACTIVE_APPEARANCE = 381; //active_appearance
    /*װ������*/
    Protocols.CMSG_EQUIP_APPEARANCE = 382; //equip_appearance
    /*ȡ��װ������*/
    Protocols.CMSG_CANCEL_EQUIP_APPEARANCE = 383; //cancel_equip_appearance
    /*����*/
    Protocols.CMSG_RENAME = 384; //rename
    /*���߽����ƺ�*/
    Protocols.CMSG_UNLOCK_TITLE = 385; //unlock_title
    /*���򸴳�����*/
    Protocols.CMSG_SOCIAL_BUY_REVENGE_TIMES = 386; //social_buy_revenge_times
    /*������������ð�ո���*/
    Protocols.CMSG_ENTER_RISK_INSTANCE = 387; //enter_risk_instance
    /*ɾ������*/
    Protocols.CMSG_SOCIAL_REMOVE_ENEMY = 388; //social_remove_enemy
    /*�鿴��������*/
    Protocols.CMSG_GET_PLAYER_OVERVIEW = 389; //get_player_overview
    /*������������*/
    Protocols.SMSG_SHOW_PLAYER_OVERVIEW = 390; //show_player_overview
    /*������������*/
    Protocols.CMSG_SEND_FACTION_INVITE = 391; //send_faction_invite
    /*��ʾ����*/
    Protocols.SMSG_SHOW_FACTION_INVITE = 392; //show_faction_invite
    /*����vip����*/
    Protocols.CMSG_BUY_VIPGIFT = 393; //buy_vipgift
    /*�����ÿ������*/
    Protocols.CMSG_ACTIVITY_OPT_BUY_DAILYGIFT = 394; //activity_opt_buy_dailygift
    /*�齱*/
    Protocols.CMSG_DRAW_LOTTERY = 395; //draw_lottery
    /*��ȡ��������н��Ƚ���*/
    Protocols.CMSG_ACTIVITY_OPT_GET_RANK_PROCESS_REWARD = 396; //activity_opt_get_rank_process_reward
    /*��ȡ��������а�*/
    Protocols.CMSG_ACTIVITY_OPT_GET_RANK_LIST = 397; //activity_opt_get_rank_list
    /*���ػ�������а�*/
    Protocols.SMSG_ACTIVITY_OPT_SHOW_RANK_LIST = 398; //activity_opt_show_rank_list
    /*������޶�����*/
    Protocols.CMSG_ACTIVITY_OPT_BUY_LIMITGIFT = 399; //activity_opt_buy_limitgift
    /*��ȡ�ۼƳ�ֵ����*/
    Protocols.CMSG_WELFARE_GET_RECHARGE_REWARD = 400; //welfare_get_recharge_reward
    /*��ȡ�ۼ����ѽ���*/
    Protocols.CMSG_WELFARE_GET_CONSUME_REWARD = 401; //welfare_get_consume_reward
    /*��ȡ���մ�������*/
    Protocols.CMSG_WELFARE_GET_SEVENDAY_REWARD = 402; //welfare_get_sevenday_reward
    /*����������ʱ��*/
    Protocols.SMSG_SEND_SERVER_OPEN_TIME = 403; //send_server_open_time
    /*��������ð�����а�*/
    Protocols.CMSG_RISK_GET_RANK = 404; //risk_get_rank
    /*����ð�����а���Ϣ */
    Protocols.SMSG_RISK_GET_RANK_RESULT = 405; //risk_get_rank_result
    /*���ó���*/
    Protocols.CMSG_SET_ORIENT = 406; //set_orient
    /*ҡ��ҡǮ��*/
    Protocols.CMSG_USE_MONEYTREE = 407; //use_moneytree
    /*��ȡҡǮ������*/
    Protocols.CMSG_GET_MONEYTREE_GIFT = 408; //get_moneytree_gift
    /*�޸Ļþ���������id*/
    Protocols.CMSG_SET_WORLD_RISK_LAST_ID = 409; //set_world_risk_last_id
    /*��������Boss*/
    Protocols.CMSG_ENTER_PRIVATE_BOSS = 410; //enter_private_boss
    /*��������ȫ������*/
    Protocols.CMSG_RAISE_BASE_SPELL_ALL = 411; //raise_base_spell_all
    /*ʹ�ûظ�ҩ*/
    Protocols.CMSG_USE_RESTORE_POTION = 413; //use_restore_potion
    /*�ύð������*/
    Protocols.CMSG_PICK_QUEST_ADVENTURE = 414; //pick_quest_adventure
    /*����ð�ռ���*/
    Protocols.CMSG_RAISE_ADVENTURESPELL = 415; //raise_adventurespell
    /*��ȡ������������*/
    Protocols.CMSG_PICK_QUEST_REALMBREAK = 416; //pick_quest_realmbreak
    /*��ȡ����ÿ�ս���*/
    Protocols.CMSG_PICK_REALMBREAK_DAILY_REWARD = 417; //pick_realmbreak_daily_reward
    /*��������*/
    Protocols.CMSG_GROUP_CREATE = 418; //group_create
    /*������������*/
    Protocols.CMSG_GROUP_JOIN_REQUEST = 419; //group_join_request
    /*ͬ����������*/
    Protocols.CMSG_GROUP_JOIN_ACCEPT = 420; //group_join_accept
    /*�˳�����*/
    Protocols.CMSG_GROUP_QUIT = 421; //group_quit
    /*�ƽ������ӳ�*/
    Protocols.CMSG_GROUP_GIVE_CAPTAIN = 422; //group_give_captain
    /*�߶�Ա*/
    Protocols.CMSG_GROUP_KICK = 423; //group_kick
    /*��ʾ���䶫��*/
    Protocols.SMSG_SHOW_LOOT_ANIMATE = 424; //show_loot_animate
    /*���봳�ظ���*/
    Protocols.CMSG_ENTER_STAGE_INSTANCE = 425; //enter_stage_instance
    /*��ȡ���ظ�������*/
    Protocols.CMSG_PICK_STAGE_INSTANCE_BONUS = 426; //pick_stage_instance_bonus
    /*�������Ӹ���*/
    Protocols.CMSG_ENTER_GROUP_EXP = 427; //enter_group_exp
    /*�ӳ�֪ͨ����ĳ����*/
    Protocols.SMSG_CHECK_FOR_GROUP_ENTER = 428; //check_for_group_enter
    /*������Աѡ��AorD*/
    Protocols.CMSG_SELECT_GROUP_ENTER = 429; //select_group_enter
    /*���鸱����������*/
    Protocols.CMSG_BUY_GROUP_EXP_TIMES = 430; //buy_group_exp_times
    /*��������*/
    Protocols.CMSG_BUY_INSPIRATION = 431; //buy_inspiration
    /*����ս����*/
    Protocols.CMSG_ENTER_FACTION_MATCH_MAP = 440; //enter_faction_match_map
    /*��ȡ����ս����ÿ�ս���*/
    Protocols.CMSG_PICK_FACTION_MATCH_CHAMPION_DAILY_REWARD = 441; //pick_faction_match_champion_daily_reward
    /*��������ս����*/
    Protocols.CMSG_QUERY_FACTION_MATCH_INFO = 442; //query_faction_match_info
    /*���ؼ���ս����*/
    Protocols.SMSG_SHOW_FACTION_MATCH_INFO_LIST = 443; //show_faction_match_info_list
    /*��ȡ��Դ�����״�ͨ�ؽ���*/
    Protocols.CMSG_PICK_RES_INSTANCE_FIRST_REWARD = 444; //pick_res_instance_first_reward
    /*������������*/
    Protocols.CMSG_GROUP_SEND_INVITE = 445; //group_send_invite
    /*��ʾ��������*/
    Protocols.SMSG_SHOW_GROUP_INVITE = 446; //show_group_invite
    /*ͬ����������*/
    Protocols.CMSG_GROUP_AGREE_INVITE = 447; //group_agree_invite
    /*�������Ӷ����б�*/
    Protocols.CMSG_GET_GROUP_SEARCH_INFO_LIST = 448; //get_group_search_info_list
    /*���ر������Ӷ����б�*/
    Protocols.SMSG_SHOW_GROUP_SEARCH_INFO_LIST = 449; //show_group_search_info_list
    /*�޸���������*/
    Protocols.CMSG_GROUP_CHANGE_CONFIG = 450; //group_change_config
    /*��ʾ������������*/
    Protocols.SMSG_SHOW_GROUP_JOIN_REQUEST = 451; //show_group_join_request
    /*�ܾ���������*/
    Protocols.CMSG_GROUP_JOIN_DENIED = 452; //group_join_denied
    /*�ܾ�����*/
    Protocols.CMSG_GROUP_INVITE_DENIED = 453; //group_invite_denied
    /*װ������*/
    Protocols.CMSG_TALISMAN_EQUIP = 454; //talisman_equip
    /*ж�·���*/
    Protocols.CMSG_TALISMAN_UNEQUIP = 455; //talisman_unequip
    /*����Ѫ*/
    Protocols.SMSG_FULLIZE_HP = 460; //fullize_hp
    /*�Զ�ƥ��*/
    Protocols.CMSG_AUTO_GROUP_MATCH = 461; //auto_group_match
    /*ȡ���Զ�ƥ��*/
    Protocols.CMSG_CANCEL_AUTO_GROUP_MATCH = 462; //cancel_auto_group_match
    /*����3v3����ƥ��*/
    Protocols.CMSG_KUAFU_3V3_GROUP_MATCH = 463; //kuafu_3v3_group_match
    /*��¼���򶩵�*/
    Protocols.CMSG_BOOKING_MONEY = 470; //booking_money
    /*��¼���򶩵��ɹ�*/
    Protocols.SMSG_BOOKING_MONEY_RESULT = 471; //booking_money_result
    /*һ��������ǿ��*/
    Protocols.CMSG_ONE_STEP_ROBOT_UP = 472; //one_step_robot_up
    /*��ȡ7�ճ�ֵ���⽱��*/
    Protocols.CMSG_GET_SEVEN_DAY_RECHARGE_EXTRA_REWARD = 473; //get_seven_day_recharge_extra_reward
    /*ʹ�öһ���*/
    Protocols.CMSG_USE_GIFTCODE = 474; //use_giftcode
    /*��ʾ�һ�����*/
    Protocols.SMSG_SHOW_GIFTCODE_REWARD_LIST = 475; //show_giftcode_reward_list
    /*ת�̳齱*/
    Protocols.CMSG_LOTTERY_RECHARGE = 480; //lottery_recharge
    /*ת�̳齱����*/
    Protocols.SMSG_LOTTERY_RECHARGE_RESULT = 481; //lottery_recharge_result
    /*֪ͨǰ���ͷ��˳�������*/
    Protocols.SMSG_SHOW_CAST_REMAIN_SKILL = 482; //show_cast_remain_skill
    /*��ɫ������*/
    Protocols.SMSG_AFTER_CREATE_ROLE = 483; //after_create_role
    return Protocols;
}());
//}
//# sourceMappingURL=Protocols.js.map