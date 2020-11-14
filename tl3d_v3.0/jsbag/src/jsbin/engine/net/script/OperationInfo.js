function OperationFailedToString(type, reason, data) {
    if (type == OprateResult.OPRATE_TYPE_LOGIN) {
        if (reason == OprateResult.OPRATE_RESULT_SUCCESS) {
            return " 登录 - 成功 - " + data;
        }
        if (reason == OprateResult.OPRATE_RESULT_NAME_REPEAT) {
            return " 登录 - 名称重复 - " + data;
        }
        if (reason == OprateResult.OPRATE_RESULT_NAME_ILLEGAL) {
            return " 登录 - 名称非法 - " + data;
        }
        if (reason == OprateResult.OPRATE_RESULT_CHAR_CAP) {
            return " 登录 - 角色数量达到上限 - " + data;
        }
        if (reason == OprateResult.OPRATE_RESULT_SCENED_CLOSE) {
            return " 登录 - 场景服未开启 - " + data;
        }
        if (reason == OprateResult.OPRATE_RESULT_SCENED_ERROR) {
            return " 登录 - 场景服重置，其实就是崩了一个场景服换一个新的 - " + data;
        }
        if (reason == OprateResult.OPRATE_RESULT_LOGINED_IN) {
            return " 登录 - 角色已登录 - " + data;
        }
        if (reason == OprateResult.OPRATE_RESULT_OTHER_LOGINED) {
            return " 登录 - 角色其他地方登录 - " + data;
        }
        if (reason == OprateResult.OPRATE_RESULT_GAME_VERSION_ERROR) {
            return " 登录 - 游戏版本不对 - " + data;
        }
        if (reason == OprateResult.OPRATE_RESULT_MAP_VERSION_ERROR) {
            return " 登录 - 地图素材版本不对 - " + data;
        }
        if (reason == OprateResult.OPRATE_RESULT_DATA_VERSION_ERROR) {
            return " 登录 - data素材版本不对 - " + data;
        }
        if (reason == OprateResult.OPRATE_RESULT_VERSION_FORMAT_ERROR) {
            return " 登录 - 客户端发来的版本信息格式不对 - " + data;
        }
        if (reason == OprateResult.OPRATE_RESULT_APPD_ERROR) {
            return " 登录 - 应用服异常重启 - " + data;
        }
        if (reason == OprateResult.OPRATE_RESULT_LOCK_ACCOUNT) {
            return " 登录 - 帐号被封 - " + data;
        }
        if (reason == OprateResult.OPRATE_RESULT_LOCK_IP) {
            return " 登录 - IP被封 - " + data;
        }
        if (reason == OprateResult.OPRATE_RESULT_APPD_CLOSE) {
            return " 登录 - 应用服未开启 - " + data;
        }
        if (reason == OprateResult.OPRATE_RESULT_NAME_TOO_LONG) {
            return " 登录 - 名字太长 - " + data;
        }
        if (reason == OprateResult.OPRATE_RESULT_NAME_HAS_PINGBI) {
            return " 登录 - 有屏蔽词 - " + data;
        }
        if (reason == OprateResult.OPRATE_RESULT_LOGOUT_UNFINISHED) {
            return " 登录 - 该角色上一次的登出未完成，请等待 - " + data;
        }
        if (reason == OprateResult.OPRATE_RESULT_PID_OR_SID_ERROR) {
            return " 登录 - 服务器id或者平台id错误 - " + data;
        }
        if (reason == OprateResult.OPRATE_RESULT_DB_RESULT_ERROR) {
            return " 登录 - 数据库查询出问题了 - " + data;
        }
        if (reason == OprateResult.OPRATE_RESULT_MERGE_SERVER) {
            return " 登录 - 合服了 - " + data;
        }
        if (reason == OprateResult.OPRATE_RESULT_PLAYER_ZIBAO) {
            return " 登录 - 自爆 - " + data;
        }
        if (reason == OprateResult.OPRATE_RESULT_GENDER_ILLEGAL) {
            return " 登录 - 角色种类异常 - " + data;
        }
        return "未知错误1  OPRATE_TYPE_LOGIN " + reason + "    " + data;
    }
    if (type == OprateResult.OPRATE_TYPE_KICKING) {
        if (reason == OprateResult.KICKING_TYPE_GM_LOCK_IP) {
            return " 踢人 - 封IP - " + data;
        }
        if (reason == OprateResult.KICKING_TYPE_GM_LOCK_ACCOUNT) {
            return " 踢人 - 封号 - " + data;
        }
        if (reason == OprateResult.KICKING_TYPE_GM_KICKING) {
            return " 踢人 - 从GM表中读取的踢人 - " + data;
        }
        if (reason == OprateResult.KICKING_TYPE_KUANGCHANG_RELIVE) {
            return " 踢人 - 荒芜矿场非法复活 - " + data;
        }
        if (reason == OprateResult.KICKING_TYPE_FUCK_PINGBI) {
            return " 踢人 - 聊天点带屏蔽词 - " + data;
        }
        if (reason == OprateResult.KICKING_TYPE_QUEST_GET_ITEM) {
            return " 踢人 - 刷物品 - " + data;
        }
        if (reason == OprateResult.KICKING_TYPE_NOT_MONEY) {
            return " 踢人 - 钱负数还继续消费 - " + data;
        }
        return "未知错误1  OPRATE_TYPE_KICKING " + reason + "    " + data;
    }
    if (type == OprateResult.OPRATE_TYPE_JUMP) {
        if (reason == OprateResult.JUMP_RESULT_NOMAL) {
            return " 跳 - 无，默认结果 - " + data;
        }
        if (reason == OprateResult.JUMP_RESULT_DEAD) {
            return " 跳 - 死了你还跳，果断是诈尸 - " + data;
        }
        if (reason == OprateResult.JUMP_RESULT_ENERGY) {
            return " 跳 - 体力不足 - " + data;
        }
        if (reason == OprateResult.JUMP_RESULT_MAP_CANT_JUMP) {
            return " 跳 - 地图无法跳跃 - " + data;
        }
        if (reason == OprateResult.JUMP_RESULT_CANT_JUMP) {
            return " 跳 - 玩家被限制不能跳跃 - " + data;
        }
        if (reason == OprateResult.JUMP_RESULT_MAX_DISTANCE) {
            return " 跳 - 超过最大距离 - " + data;
        }
        if (reason == OprateResult.JUMP_RESULT_WRONG_COORD) {
            return " 跳 - 无效坐标，障碍点之流 - " + data;
        }
        if (reason == OprateResult.JUMP_RESULT_SPELL_CD) {
            return " 跳 - 跳跃技能cd中 - " + data;
        }
        if (reason == OprateResult.JUMP_RESULT_NOT_ACTIVE_SPELL) {
            return " 跳 - 2段跳没有激活 - " + data;
        }
        return "未知错误1  OPRATE_TYPE_JUMP " + reason + "    " + data;
    }
    if (type == OprateResult.OPRATE_TYPE_ATTK_LOSE) {
        if (reason == OprateResult.ATTACK_LOST_CANTATTACK) {
            return " 攻击失败 - 被限制不能攻击 - " + data;
        }
        if (reason == OprateResult.ATTACK_LOST_TARGET_DEAD) {
            return " 攻击失败 - 目标已经死亡 - " + data;
        }
        if (reason == OprateResult.ATTACK_LOST_NEED_TARGET) {
            return " 攻击失败 - 攻击需要一个目标 - " + data;
        }
        if (reason == OprateResult.ATTACK_LOST_OUT_OF_RANGE) {
            return " 攻击失败 - 超出攻击范围 - " + data;
        }
        if (reason == OprateResult.ATTACK_LOST_WRONG_TARGET) {
            return " 攻击失败 - 错误的目标 - " + data;
        }
        if (reason == OprateResult.ATTACK_LOST_MOVING) {
            return " 攻击失败 - 正在移动状态下不能攻击 - " + data;
        }
        return "未知错误1  OPRATE_TYPE_ATTK_LOSE " + reason + "    " + data;
    }
    if (type == OprateResult.OPRATE_TYPE_SPELL_LOSE) {
        if (reason == OprateResult.LOST_RESON_SPELL_DOENT_EXIST) {
            return " 技能释放失败 - 技能不存在 - " + data;
        }
        if (reason == OprateResult.LOST_RESON_NOT_HAVE_SPELL) {
            return " 技能释放失败 - 你没有这个技能 - " + data;
        }
        if (reason == OprateResult.LOST_RESON_NOT_ENOUGH_ANGER) {
            return " 技能释放失败 - 怒气值不足 - " + data;
        }
        if (reason == OprateResult.LOST_RESON_SPELL_COOLDOWN) {
            return " 技能释放失败 - 冷却 - " + data;
        }
        if (reason == OprateResult.LOST_RESON_ALREADY_CAST) {
            return " 技能释放失败 - 已经在施法 - " + data;
        }
        if (reason == OprateResult.LOST_RESON_TARGET_DEAD) {
            return " 技能释放失败 - 目标已经死亡 - " + data;
        }
        if (reason == OprateResult.LOST_RESON_NEED_TARGET) {
            return " 技能释放失败 - 此技能需要一个目标 - " + data;
        }
        if (reason == OprateResult.LOST_RESON_JUMP_DENY) {
            return " 技能释放失败 - 跳跃状态不能施法 - " + data;
        }
        if (reason == OprateResult.LOST_RESON_SCENE_DENY) {
            return " 技能释放失败 - 场景禁止施法 - " + data;
        }
        if (reason == OprateResult.LOST_RESON_CAN_NOT_CAST) {
            return " 技能释放失败 - 无法施法 - " + data;
        }
        if (reason == OprateResult.LOST_RESON_HAS_CONFLICT_SPELL) {
            return " 技能释放失败 - 有技能冲突 - " + data;
        }
        if (reason == OprateResult.LOST_RESON_NOTHAS_CHUZHAN) {
            return " 技能释放失败 - 当前没有出战兵种 - " + data;
        }
        if (reason == OprateResult.LOST_RESON_WRONG_FACTION) {
            return " 技能释放失败 - 同一阵营不能攻击（争霸天下用） - " + data;
        }
        if (reason == OprateResult.LOST_RESON_ACTIVE_SPELL_SUCCESS) {
            return " 技能释放失败 - 技能激活成功 - " + data;
        }
        if (reason == OprateResult.LOST_RESON_IN_SAFE_ZONE) {
            return " 技能释放失败 - 安全区域不能攻击（大沼泽用） - " + data;
        }
        if (reason == OprateResult.LOST_RESON_YXT_WRONG_FACTION) {
            return " 技能释放失败 - 同一阵营不能攻击（英雄帖用） - " + data;
        }
        if (reason == OprateResult.LOST_RESON_PVP_STATE) {
            return " 技能释放失败 - PVP状态不能释放 - " + data;
        }
        return "未知错误1  OPRATE_TYPE_SPELL_LOSE " + reason + "    " + data;
    }
    if (type == OprateResult.OPRATE_TYPE_INTERACTION) {
        if (reason == OprateResult.INTERACTION_TOO_FAR) {
            return " 交互,如使用GAMEOBJ 与NPC对话，交接任务等 - NPC太远 - " + data;
        }
        if (reason == OprateResult.INTERACTION_BOOK_DAILYNUM_FULL) {
            return " 交互,如使用GAMEOBJ 与NPC对话，交接任务等 - 奇遇日常任务次数已满 - " + data;
        }
        if (reason == OprateResult.INTERACTION_NO_ENOUGH_ENDURANCE) {
            return " 交互,如使用GAMEOBJ 与NPC对话，交接任务等 - 精力值不够 - " + data;
        }
        if (reason == OprateResult.INTERACTION_JHM_ERROR) {
            return " 交互,如使用GAMEOBJ 与NPC对话，交接任务等 - 激活码错误 - " + data;
        }
        if (reason == OprateResult.INTERACTION_WORSHIP) {
            return " 交互,如使用GAMEOBJ 与NPC对话，交接任务等 - 城主膜拜 - " + data;
        }
        if (reason == OprateResult.INTERACTION_JHM_HAVE) {
            return " 交互,如使用GAMEOBJ 与NPC对话，交接任务等 - 激活码奖励已领取 - " + data;
        }
        if (reason == OprateResult.INTERACTION_JHM_IS_USED) {
            return " 交互,如使用GAMEOBJ 与NPC对话，交接任务等 - 激活码已使用 - " + data;
        }
        if (reason == OprateResult.INTERACTION_JHM_NOT_USE_RANGE) {
            return " 交互,如使用GAMEOBJ 与NPC对话，交接任务等 - 不在使用范围内 - " + data;
        }
        return "未知错误1  OPRATE_TYPE_INTERACTION " + reason + "    " + data;
    }
    if (type == OprateResult.OPRATE_TYPE_USE_GAMEOBJECT) {
        if (reason == OprateResult.USE_GAMEOBJECT_SUCCEED) {
            return " 使用游戏对象 - 使用游戏对象成功 - " + data;
        }
        if (reason == OprateResult.USE_GAMEOBJECT_FAIL) {
            return " 使用游戏对象 - 使用游戏对象失败 - " + data;
        }
        if (reason == OprateResult.USE_GAMEOBJECT_QUEST) {
            return " 使用游戏对象 - 采集成功 - " + data;
        }
        if (reason == OprateResult.USE_GAMEOBJECT_TOO_FAST) {
            return " 使用游戏对象 - 采集速度太快 - " + data;
        }
        return "未知错误1  OPRATE_TYPE_USE_GAMEOBJECT " + reason + "    " + data;
    }
    if (type == OprateResult.OPRATE_TYPE_BAG) {
        if (reason == OprateResult.BAG_RESULT_NULL) {
            return " 包裹 - 路过的 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_ITEM_NOT_EXIST) {
            return " 包裹 - 物品不存在 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_CHANGE_ERROR) {
            return " 包裹 - 交换位置错误 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_DESTROY_BIND) {
            return " 包裹 - 删除绑定的 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_ITEM_NOT_SELF) {
            return " 包裹 - 不是自己的物品 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_REPAIR_FULL) {
            return " 包裹 - 修理耐久已满的物品 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_BAG_NOT_EXIST) {
            return " 包裹 - 包裹不存在 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_POS_NOT_EXIST) {
            return " 包裹 - 包裹位置不存在 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_DESTROY_TOOMUCH) {
            return " 包裹 - 数量不够删 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_BAN_FOR_TRADE) {
            return " 包裹 - 交易中不允许操作 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_SPLIT_FAILURE) {
            return " 包裹 - 物品拆分失败 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_LACK_USER) {
            return " 包裹 - 数量不够删 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_BAG_FULL) {
            return " 包裹 - 包裹放不下 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_MAX_COUNT) {
            return " 包裹 - 超过最大拥有数 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_SELL_BIND) {
            return " 包裹 - 定物品不允许出售 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_REPAIR_OK) {
            return " 包裹 - 铜钱宝箱开启成功 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_REPAIR_MONEY_LACK) {
            return " 包裹 - 钱不够无法修理 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_EXTENSION_BAG) {
            return " 包裹 - 包裹不支持扩展 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_EXTENSION_MAX_SIZE) {
            return " 包裹 - 包裹大小已经最大 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_EXTENSION_MATERIAL_LACK) {
            return " 包裹 - 包裹扩展材料不足 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_EXTENSION_TRADE) {
            return " 包裹 - 交易中不允许包裹扩展 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_USE_ITEM_COUNT_MAX) {
            return " 包裹 - 使用物品数量达到上限 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_NOT_ITEM) {
            return " 包裹 - 没开出物品 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_ITEM_USEING) {
            return " 包裹 - 物品使用中 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_GET_ITEMS) {
            return " 包裹 - 获得物品（元宝卡） - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_USE_ITEMS) {
            return " 包裹 - 使用物品（装备宝箱） - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_GET_ITEMS_ORANGE) {
            return " 包裹 - 开启橙色装备 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_USE_ITEMS_GENERALS) {
            return " 包裹 - 使用物品（将魂使用） - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_GET_ITEMS_CABX) {
            return " 包裹 - 获得 财神宝箱 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_GET_ITEMS_CABX_BUFF) {
            return " 包裹 - 获得 财神宝箱的buff 提示 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_ALREADY_KAIGUANG) {
            return " 包裹 - 设备已经开光 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_EXCHANGE_SUCCESS) {
            return " 包裹 - 穿上装备成功 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_OPEN_ITEMS_SUCCESS) {
            return " 包裹 - 打开物品成功（用于概率获得） - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_OPEN_ITEMS_FAIL) {
            return " 包裹 - 打开物品失败（用于概率获得） - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_GET_ITEMS_GENERALS_EQUIP) {
            return " 包裹 - 使用物品获得武将装备 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_GET_SHOWHAND_JIEZHI) {
            return " 包裹 - 获得梭哈戒指 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_USE_WUJIANG_EXP_CARD) {
            return " 包裹 - 使用武将经验卡 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_USE_ITEMS_SUCCESS) {
            return " 包裹 - 物品使用成功 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_BAG_FULL_SEND_MAIL) {
            return " 包裹 - 包裹已满 发送邮箱提示 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_BAG_FULL_AUTO_SELL) {
            return " 包裹 - 包裹已满自动出售 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_BAG_XIULIAN_USE) {
            return " 包裹 - 使用修炼丹获得经验 - " + data;
        }
        if (reason == OprateResult.BAG_RESULT_BAG_SORT_CD) {
            return " 包裹 - 整理功能冷却中 - " + data;
        }
        return "未知错误1  OPRATE_TYPE_BAG " + reason + "    " + data;
    }
    if (type == OprateResult.OPRATE_TYPE_TRADE) {
        if (reason == OprateResult.TRADE_RESULT_TYPE_NOT_TARGET) {
            return " 交易 - 没有交易对象 - " + data;
        }
        if (reason == OprateResult.TRADE_RESULT_TYPE_TRADEING) {
            return " 交易 - 已经交易中无法继续处理交易申请 - " + data;
        }
        if (reason == OprateResult.TRADE_RESULT_TYPE_NOT_TRADE) {
            return " 交易 - 非交易进行中无效操作 - " + data;
        }
        if (reason == OprateResult.TRADE_RESULT_TYPE_BAG_SIZE) {
            return " 交易 - 包裹空间不足交易失败 - " + data;
        }
        if (reason == OprateResult.TRADE_RESULT_TYPE_UNRECOGNISED) {
            return " 交易 - 未确认交易物品 - " + data;
        }
        if (reason == OprateResult.TRADE_RESULT_TYPE_TARGET_CANCEL) {
            return " 交易 - 对方交已取消交易 - " + data;
        }
        if (reason == OprateResult.TRADE_RESULT_TYPE_LACK_MONEY) {
            return " 交易 - 金钱不足 - " + data;
        }
        if (reason == OprateResult.TRADE_RESULT_TYPE_IS_BIND) {
            return " 交易 - 绑定物品不允许交易 - " + data;
        }
        return "未知错误1  OPRATE_TYPE_TRADE " + reason + "    " + data;
    }
    if (type == OprateResult.OPRATE_TYPE_CHAT) {
        if (reason == OprateResult.CHAT_RESULT_NOT_PLAYER) {
            return " 聊天 - 找不到玩家 - " + data;
        }
        if (reason == OprateResult.CHAT_RESULT_IS_GAG) {
            return " 聊天 - 被禁言 - " + data;
        }
        if (reason == OprateResult.CHAT_LEVEL_WHISPER_LEVEL_NO) {
            return " 聊天 - 私聊等级不足 - " + data;
        }
        if (reason == OprateResult.CHAT_LEVEL_WORLD_LEVEL_NO) {
            return " 聊天 - 世界聊天等级不足 - " + data;
        }
        if (reason == OprateResult.CHAT_RESULT_CHECK_LIMIT) {
            return " 聊天 - 您说话太快了，赶紧练级等等再聊天吧… - " + data;
        }
        if (reason == OprateResult.CHAT_RESULT_NO_FACTION) {
            return " 聊天 - 你暂无帮派 - " + data;
        }
        if (reason == OprateResult.CHAT_RESULT_NO_GROUP) {
            return " 聊天 - 你暂无队伍 - " + data;
        }
        return "未知错误1  OPRATE_TYPE_CHAT " + reason + "    " + data;
    }
    if (type == OprateResult.OPERTE_TYPE_RECEIVE_GIFT_PACKS) {
        if (reason == OprateResult.RECEIVE_GIFT_PACKS_NOT_FIND) {
            return " 领取补偿礼包 - 找不到这条补偿礼包 - " + data;
        }
        if (reason == OprateResult.RECEIVE_GIFT_PACKS_CHAR_ERROR) {
            return " 领取补偿礼包 - 这礼包不是你的 - " + data;
        }
        if (reason == OprateResult.RECEIVE_GIFT_PACKS_CHAR_CREATE) {
            return " 领取补偿礼包 - 礼包指定的发放起始时间在你角色创建时间之前 - " + data;
        }
        if (reason == OprateResult.RECEIVE_GIFT_PACKS_RECEIVED) {
            return " 领取补偿礼包 - 该礼包你已经领取过了 - " + data;
        }
        if (reason == OprateResult.RECEIVE_GIFT_PACKS_ONLINE_AWARD) {
            return " 领取补偿礼包 - 在线礼包奖励 - " + data;
        }
        if (reason == OprateResult.RECEIVE_GIFT_PACKS_ONLINE_XIANSHI) {
            return " 领取补偿礼包 - 在线礼包显示用 - " + data;
        }
        if (reason == OprateResult.RECEIVE_GIFT_PACKS_FIRST_RECHARGE_GIFT) {
            return " 领取补偿礼包 - 首充礼包显示用 - " + data;
        }
        if (reason == OprateResult.RECEIVE_GIFT_PACKS_DAY_RECHARGE_GIFT) {
            return " 领取补偿礼包 - 每日充礼包显示用 - " + data;
        }
        return "未知错误1  OPERTE_TYPE_RECEIVE_GIFT_PACKS " + reason + "    " + data;
    }
    if (type == OprateResult.OPERTE_TYPE_QUEST) {
        if (reason == OprateResult.INVALIDREASON_QUEST_FAILED_LOW_LEVEL) {
            return " 任务 -  等级太低 You are not high enough level for that quest. - " + data;
        }
        if (reason == OprateResult.INVALIDREASON_QUEST_FAILED_WRONG_RACE) {
            return " 任务 -  这个任务对于你的角色类别是无效的 That quest is not available to your race. - " + data;
        }
        if (reason == OprateResult.INVALIDREASON_QUEST_ALREADY_DONE) {
            return " 任务 -  任务已经完成 You have completed that quest. - " + data;
        }
        if (reason == OprateResult.INVALIDREASON_QUEST_ONLY_ONE_TIMED) {
            return " 任务 -  任务只能做一次 You can only be on one timed quest at a time. - " + data;
        }
        if (reason == OprateResult.INVALIDREASON_QUEST_ALREADY_ON) {
            return " 任务 -  已经在任务中 You are already on that quest. - " + data;
        }
        if (reason == OprateResult.INVALIDREASON_QUEST_FAILED_EXPANSION) {
            return " 任务 -  物品太少 This quest requires an expansion enabled account. - " + data;
        }
        if (reason == OprateResult.INVALIDREASON_QUEST_ALREADY_ON2) {
            return " 任务 -  已经在任务中 ? You are already on that quest. - " + data;
        }
        if (reason == OprateResult.INVALIDREASON_QUEST_FAILED_MISSING_ITEMS) {
            return " 任务 -  没有完成任务需要的物品 You don't have the required items with you. Check storage. - " + data;
        }
        if (reason == OprateResult.INVALIDREASON_QUEST_FAILED_NOT_ENOUGH_MONEY) {
            return " 任务 -  没有足够的金钱完成任务 You don't have enough money for that quest. - " + data;
        }
        if (reason == OprateResult.INVALIDREASON_DAILY_QUESTS_REMAINING) {
            return " 任务 -  你已经完成了每天的25个任务 You have already completed 25 daily quests today. - " + data;
        }
        if (reason == OprateResult.INVALIDREASON_QUEST_FAILED_CAIS) {
            return " 任务 -  有疲劳时间无法完成任务 You cannot complete quests once you have reached tired time. - " + data;
        }
        if (reason == OprateResult.INVALIDREASON_DAILY_QUEST_COMPLETED_TODAY) {
            return " 任务 -  已经完成当天的任务 You have completed that daily quest today. - " + data;
        }
        if (reason == OprateResult.INVALIDREASON_QUEST_FINISH_ALL_RIHUAN) {
            return " 任务 - 完成所有日环任务了 - " + data;
        }
        return "未知错误1  OPERTE_TYPE_QUEST " + reason + "    " + data;
    }
    if (type == OprateResult.OPERTE_TYPE_NPCBUY) {
        if (reason == OprateResult.QUEST_TYPE_PROCESS) {
            return " 购买商品 - 任务进度, 名字:1/1 - " + data;
        }
        return "未知错误1  OPERTE_TYPE_NPCBUY " + reason + "    " + data;
    }
    if (type == OprateResult.OPERTE_TYPE_FUBEN) {
        if (reason == OprateResult.NPC_BUY_ITEM_NO_EXIST) {
            return " 副本 - 物品不存在 - " + data;
        }
        if (reason == OprateResult.NPC_BUY_ITEM_UNDER) {
            return " 副本 - 下架的物品 - " + data;
        }
        if (reason == OprateResult.NPC_BUY_ITEM_NO_OPEN) {
            return " 副本 - 商品还未到开放时间 - " + data;
        }
        if (reason == OprateResult.NPC_BUY_ITEM_OUT_TIME) {
            return " 副本 - 商品已过期 - " + data;
        }
        if (reason == OprateResult.NPC_BUY_BAG_OUT_SIZE) {
            return " 副本 - 包裹放不下了 - " + data;
        }
        if (reason == OprateResult.NPC_BUY_MONEY_NO_ENOUGH) {
            return " 副本 - 钱不够了 - " + data;
        }
        if (reason == OprateResult.NPC_BUY_MONEY_TRANSFINITE) {
            return " 副本 - 购买金额过大 - " + data;
        }
        if (reason == OprateResult.NPC_BUY_SELL_OUT) {
            return " 副本 - 超出商品限购次数 - " + data;
        }
        return "未知错误1  OPERTE_TYPE_FUBEN " + reason + "    " + data;
    }
    if (type == OprateResult.OPERTE_TYPE_KUAFU) {
        if (reason == OprateResult.FUBEN_OPRATE_NO_GROUP_STATE) {
            return " 跨服 - 玩家不在组队状态 - " + data;
        }
        if (reason == OprateResult.FUBEN_OPRATE_NOT_TWO_PEOPLE) {
            return " 跨服 - 队伍不是2个人 - " + data;
        }
        if (reason == OprateResult.FUBEN_OPRATE_NO_ENERGY) {
            return " 跨服 - 体力不足 - " + data;
        }
        if (reason == OprateResult.FUBEN_OPRATE_NO_MONEY) {
            return " 跨服 - 元宝不足 - " + data;
        }
        if (reason == OprateResult.FUBEN_OPRATE_TEAM_NO_LEVEL) {
            return " 跨服 - 队友等级不足 - " + data;
        }
        if (reason == OprateResult.FUBEN_OPRATE_TEAM_NO_ENERGY) {
            return " 跨服 - 队友体力不足 - " + data;
        }
        if (reason == OprateResult.FUBEN_OPRATE_NO_GROUP) {
            return " 跨服 - 队伍已经解散 - " + data;
        }
        if (reason == OprateResult.FUBEN_OPRATE_SEND_TEAM_FRIEND) {
            return " 跨服 - 邀请队友进入组队副本 - " + data;
        }
        if (reason == OprateResult.FUBEN_OPRATE_TEAM_REFUSE_ENETR) {
            return " 跨服 - 队友拒绝进入组队副本 - " + data;
        }
        if (reason == OprateResult.FUBEN_OPRATE_TEAM_ON_FUBEN_MAP) {
            return " 跨服 - 队友在副本地图中 - " + data;
        }
        if (reason == OprateResult.FUBEN_OPRATE_TEAM_HAVE_FLAGS) {
            return " 跨服 - 队友已经发起邀请了 - " + data;
        }
        if (reason == OprateResult.FUBEN_OPRATE_REFRESH_BOSS) {
            return " 跨服 - 副本刷出boss - " + data;
        }
        if (reason == OprateResult.FUBEN_OPRATE_KILLED_BOSS) {
            return " 跨服 - 玩家成功击杀了boss - " + data;
        }
        if (reason == OprateResult.FUBEN_OPRATE_MORE_TIMES) {
            return " 跨服 - 全屏秒杀超过最大次数 - " + data;
        }
        if (reason == OprateResult.FUBEN_OPRATE_NO_CREATURES) {
            return " 跨服 - 全屏秒杀当前没有怪物 - " + data;
        }
        return "未知错误1  OPERTE_TYPE_KUAFU " + reason + "    " + data;
    }
    if (type == OprateResult.OPERTE_TYPE_RANK_LIST) {
        if (reason == OprateResult.KUAFU_OPERATE_CONN_DISCONN) {
            return " 排行榜 - 游戏服与世界服的链接断开了 - " + data;
        }
        if (reason == OprateResult.KUAFU_OPERATE_HASNOT_REGISTER) {
            return " 排行榜 - 本服还没有向世界服注册成功 - " + data;
        }
        return "未知错误1  OPERTE_TYPE_RANK_LIST " + reason + "    " + data;
    }
    if (type == OprateResult.OPERTE_TYPE_CLOSE) {
        if (reason == OprateResult.RANK_LIST_OPERATE_SUCCEED) {
            return " 连接关闭 - 成功 - " + data;
        }
        if (reason == OprateResult.RANK_LIST_OPERATE_TYPE_ERROR) {
            return " 连接关闭 - 查询类型错误 - " + data;
        }
        if (reason == OprateResult.RANK_LIST_OPERATE_OUT_OF_RANGE) {
            return " 连接关闭 - 查询范围超出界限 - " + data;
        }
        if (reason == OprateResult.RANK_LIST_OPERATE_MAX_LIKE) {
            return " 连接关闭 - 点赞已超过最大次数 - " + data;
        }
        if (reason == OprateResult.RANK_LIST_OPERATE_HAS_LIKE) {
            return " 连接关闭 - 已点过赞了 - " + data;
        }
        return "未知错误1  OPERTE_TYPE_CLOSE " + reason + "    " + data;
    }
    if (type == OprateResult.OPERTE_TYPE_HOSTING) {
        if (reason == OprateResult.ACTIVITY_OPERATE_NOTVIP) {
            return " 托管 - 你不是vip无法领取vip奖励 - " + data;
        }
        if (reason == OprateResult.ACTIVITY_OPERATE_NOENOUGH) {
            return " 托管 - 活跃度不够无法领取 - " + data;
        }
        if (reason == OprateResult.ACTIVITY_OPERATE_HASGET) {
            return " 托管 - 已经领取过该奖励 - " + data;
        }
        return "未知错误1  OPERTE_TYPE_HOSTING " + reason + "    " + data;
    }
    if (type == OprateResult.OPERTE_TYPE_STRENGTH) {
        if (reason == OprateResult.ACHIEVE_OPERATE_NO_FIND) {
            return " 强化 - 找不到成就 - " + data;
        }
        if (reason == OprateResult.ACHIEVE_OPERATE_NO_GET) {
            return " 强化 - 尚未达成成就 - " + data;
        }
        if (reason == OprateResult.ACHIEVE_OPERATE_HASGET) {
            return " 强化 - 已经领取过成就奖励 - " + data;
        }
        if (reason == OprateResult.ACHIEVE_OPERATE_NO_ALL) {
            return " 强化 - 总成就不够无法领取 - " + data;
        }
        if (reason == OprateResult.ACHIEVE_OPERATE_TITLE_SUC) {
            return " 强化 - 设置称号成功 - " + data;
        }
        if (reason == OprateResult.ACHIEVE_OPERATE_TITLE_FAL) {
            return " 强化 - 称号不存在无法设置 - " + data;
        }
        if (reason == OprateResult.ACHIEVE_OPERATE_NO_MONEY) {
            return " 强化 - 钱不够了不能找回 - " + data;
        }
        return "未知错误1  OPERTE_TYPE_STRENGTH " + reason + "    " + data;
    }
    if (type == OprateResult.OPERTE_TYPE_CHANGE_BATTLE_MODE_LOSE) {
        if (reason == OprateResult.ATHLETICS_OPERATE_NO_LEV) {
            return " 切换战斗模式失败 - 等级不够{1}，不能参加3v3 - " + data;
        }
        if (reason == OprateResult.ATHLETICS_OPERATE_NO_FORCE) {
            return " 切换战斗模式失败 - 战力不够{1}，不能参加3v3 - " + data;
        }
        if (reason == OprateResult.ATHLETICS_OPERATE_NO_OPEN) {
            return " 切换战斗模式失败 - 不在活动时间，不能参加 - " + data;
        }
        if (reason == OprateResult.ATHLETICS_OPERATE_NO_TIME_BUY) {
            return " 切换战斗模式失败 - 3v3次数已用完，可以购买次数 - " + data;
        }
        if (reason == OprateResult.ATHLETICS_OPERATE_NO_TIME) {
            return " 切换战斗模式失败 - 3v3次数已用完，请明天再来 - " + data;
        }
        if (reason == OprateResult.ATHLETICS_OPERATE_IN_MATCH) {
            return " 切换战斗模式失败 - 正在匹配中 - " + data;
        }
        if (reason == OprateResult.ATHLETICS_OPERATE_MAX_BUY) {
            return " 切换战斗模式失败 - 超出最大购买次数 - " + data;
        }
        if (reason == OprateResult.ATHLETICS_OPERATE_NO_MONEY) {
            return " 切换战斗模式失败 - 超出最大购买次数 - " + data;
        }
        if (reason == OprateResult.ATHLETICS_OPERATE_HAS_DAY_REWARD) {
            return " 切换战斗模式失败 - 已经领取该奖励 - " + data;
        }
        if (reason == OprateResult.ATHLETICS_OPERATE_NO_DAY_REWARD) {
            return " 切换战斗模式失败 - 尚未到达次数{1} - " + data;
        }
        return "未知错误1  OPERTE_TYPE_CHANGE_BATTLE_MODE_LOSE " + reason + "    " + data;
    }
    if (type == OprateResult.OPERTE_TYPE_SOCIAL) {
        if (reason == OprateResult.ATHLETICS_OPERATE_BUFF_OCCUR) {
            return " 社交 - buff产生 - " + data;
        }
        return "未知错误1  OPERTE_TYPE_SOCIAL " + reason + "    " + data;
    }
    if (type == OprateResult.OPERTE_TYPE_FACTION) {
        if (reason == OprateResult.DOUJIAN_OPERATE_NO_LEV) {
            return " 帮派 - 等级不够，需要{0}才能参与斗剑台 - " + data;
        }
        if (reason == OprateResult.DOUJIAN_OPERATE_ZHUCHENG) {
            return " 帮派 - 只能在主城中参加活动 - " + data;
        }
        if (reason == OprateResult.DOUJIAN_OPERATE_NO_TIME) {
            return " 帮派 - 挑战次数已满 - " + data;
        }
        if (reason == OprateResult.DOUJIAN_OPERATE_IN_CD) {
            return " 帮派 - 挑战CD中 - " + data;
        }
        if (reason == OprateResult.DOUJIAN_OPERATE_MAX_TIME) {
            return " 帮派 - 超过最大购买次数 - " + data;
        }
        if (reason == OprateResult.DOUJIAN_OPERATE_NO_MONEY) {
            return " 帮派 - 元宝不足购买斗剑次数 - " + data;
        }
        if (reason == OprateResult.DOUJIAN_OPERATE_NO_MONEY_CD) {
            return " 帮派 - 元宝不足不能清理CD - " + data;
        }
        return "未知错误1  OPERTE_TYPE_FACTION " + reason + "    " + data;
    }
    if (type == OprateResult.OPERTE_TYPE_FIELD_BOSS) {
        if (reason == OprateResult.DOUJIAN_OPERATE_SELF_BATTLE) {
            return " 野外BOSS - 自己正在被别人挑战 - " + data;
        }
        if (reason == OprateResult.DOUJIAN_OPERATE_OTHER_BATTLE) {
            return " 野外BOSS - 挑战的人正在被别人挑战 - " + data;
        }
        if (reason == OprateResult.DOUJIAN_OPERATE_COUNTDOWN) {
            return " 野外BOSS - 刷新在冷却中 - " + data;
        }
        if (reason == OprateResult.DOUJIAN_OPERATE_REFRESH) {
            return " 野外BOSS - 刷新完成 - " + data;
        }
        return "未知错误1  OPERTE_TYPE_FIELD_BOSS " + reason + "    " + data;
    }
    if (type == OprateResult.OPERTE_TYPE_WORLD_BOSS) {
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_APPD_ONE1) {
            return " 世界BOSS - 插入单个物品时，包裹id 超过最大值 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_APPD_ONE2) {
            return " 世界BOSS - 创建玩家其他的对象的时候，发现之前已经创建过了 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_APPD_ONE3) {
            return " 世界BOSS - 托管到期 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_APPD_ONE4) {
            return " 世界BOSS - GM命令 踢人 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_APPD_ONE5) {
            return " 世界BOSS - GM命令 回档数据 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_APPD_ONE6) {
            return " 世界BOSS -  踢玩家下线 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE4) {
            return " 世界BOSS - 帐号信息不完整 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE5) {
            return " 世界BOSS - Char_Create put  fail! - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE6) {
            return " 世界BOSS - 登录时候不是我的角色 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE7) {
            return " 世界BOSS - 待定 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE8) {
            return " 世界BOSS - 跨服回来的玩家 m_player 不存在 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE9) {
            return " 世界BOSS - 初始化数据库数据失败 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE10) {
            return " 世界BOSS - 看看有没有玩家数据需要修复或者升级的 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE11) {
            return " 世界BOSS - 重设元宝数量 取数据时失败 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE12) {
            return " 世界BOSS - 踢人 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE13) {
            return " 世界BOSS - 如果连接不存在,则根据解开的session结果进行创建对应的session实例(on_create_conn_get_session create_sesstion duplicate) - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE14) {
            return " 世界BOSS - 客户端连接失败 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE15) {
            return " 世界BOSS - 把玩家由pk服回到游戏服,登录失败 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE16) {
            return " 世界BOSS - 检测跨服玩家是否可以登陆 -玩家不存在 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE17) {
            return " 世界BOSS - 检测跨服玩家是否可以登陆 -超时 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE18) {
            return " 世界BOSS - 登陆队列 context->GetGuid().empty(） - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE19) {
            return " 世界BOSS - 合服检测 手游下线 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE20) {
            return " 世界BOSS - 通知场景服玩家加入地图 m_scened_conn不存在 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE21) {
            return " 世界BOSS - 玩家加入地图实例时，玩家binlg不存在  - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE22) {
            return " 世界BOSS - 玩家加入地图 创建实例失败 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE23) {
            return " 世界BOSS - 如果已登录过 !m_account.empty() - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE24) {
            return " 世界BOSS - 帐号名称超长 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE25) {
            return " 世界BOSS - 验证是否可以登录本服验证失败 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE26) {
            return " 世界BOSS - 账户表数据不存在 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE27) {
            return " 世界BOSS - 玩家已在线关闭掉旧链接 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE28) {
            return " 世界BOSS - 手游登录，但是还没有玩家角色 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE39) {
            return " 世界BOSS - 数据准备完毕，玩家开始登录 玩家不存在 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE40) {
            return " 世界BOSS - 获取sessionKey对象,已经登录过 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE41) {
            return " 世界BOSS - 获取sessionKey对象，帐户名称，并且判断一下是否超长(超长则失败) - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE42) {
            return " 世界BOSS - 获取sessionKey对象，Get_Session: other_data size is wrong - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE43) {
            return " 世界BOSS - 获取sessionKey对象，验证session_key是否可以登录这个服务器（为不可登录时候断开） - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE44) {
            return " 世界BOSS - 获取sessionKey对象，LogindContext::Get_Session:%s load account fail(获取帐号表数据异常) - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE45) {
            return " 世界BOSS - 获取sessionKey对象，LogindContext::Get_Session:%s Get_Chars_List fail（获取角色列表数据异常） - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE46) {
            return " 世界BOSS - 跨服读取数据失败 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE47) {
            return " 世界BOSS - 运气不好，登录时碰上正在释放自己数据 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE48) {
            return " 世界BOSS - 合服检测，从服玩家状态 不为 STATUS_LOGGEDIN - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE49) {
            return " 世界BOSS - 封号 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE50) {
            return " 世界BOSS - 踢人 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE51) {
            return " 世界BOSS - 玩家不存在时关闭连接 LuaPlayerLogin %s, but not found - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE52) {
            return " 世界BOSS - 角色在其他地方登陆 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE53) {
            return " 世界BOSS - 登陆是无法获得数据 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE54) {
            return " 世界BOSS - 登陆时 player login call puts fail %s, fd %u - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE55) {
            return " 世界BOSS - on_create_conn_get_session create_mobile_context duplicate - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE56) {
            return " 世界BOSS - 登陆失败 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE57) {
            return " 世界BOSS - Gm命令 @自爆 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE58) {
            return " 世界BOSS - PK服登陆数据异常 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_ONE59) {
            return " 世界BOSS - 从数据库读取玩家数据失败 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_2046) {
            return " 世界BOSS - 一个角色对应两个账号	 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_2047) {
            return " 世界BOSS - 改名字的时候找不到account，刷新就可以过了 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_LOGDIN_2048) {
            return " 世界BOSS - session的account不等于player的account,简单来说,串号了. - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_SCREND_ONE29) {
            return " 世界BOSS - 停止移动，地图模板为null - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_SCREND_ONE30) {
            return " 世界BOSS - 对象移动，地图模板为null - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_SCREND_ONE31) {
            return " 世界BOSS - 对象移动的时候  状态不为 STATUS_LOGGEDIN  时候 （assert error: Handle_Unit_Move  ASSERT(status_ == STATUS_LOGGEDIN)） - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_SCREND_ONE32) {
            return " 世界BOSS - 传送是 状态不为 STATUS_LOGGEDIN （ScenedContext::Teleport status_ != STATUS_LOGGEDIN） - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_SCREND_ONE33) {
            return " 世界BOSS - 如果玩家未正确的加入地图，这个时间传送也是失败的 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_SCREND_ONE34) {
            return " 世界BOSS - 任务链条中断 assert error: Handle_QuestGiver_Status_Query  ASSERT(questGetter) - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_SCREND_ONE35) {
            return " 世界BOSS - 玩家被杀死时，地图数据不存在 Player::OnKilled ASSERT(GetMap()) - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_SCREND_ONE36) {
            return " 世界BOSS - 加入地图宠物不存在的时候  Player::OnJoinMap ASSERT(m_pets.empty()) - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_SCREND_ONE37) {
            return " 世界BOSS - 任务管理者不存在的时候 Player::Create ASSERT(!m_questMgr) - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_SCREND_ONE38) {
            return " 世界BOSS - 传送超时1分钟 - " + data;
        }
        if (reason == OprateResult.PLAYER_CLOSE_OPERTE_POLICED_4001) {
            return " 世界BOSS - 在日志服重复登录 - " + data;
        }
        return "未知错误1  OPERTE_TYPE_WORLD_BOSS " + reason + "    " + data;
    }
    if (type == OprateResult.OPRATE_TYPE_MOUNT_QICHENG) {
        if (reason == OprateResult.OPERTE_TYPE_FACTION_IS_HAVE) {
            return " 坐骑骑乘 - 你已经在帮派中 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_NAME_ERR) {
            return " 坐骑骑乘 - 帮派名称超过6个字符 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_NAME_HAVE_FUCK) {
            return " 坐骑骑乘 - 帮派名称中有非法字符 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_NAME_REPEAT) {
            return " 坐骑骑乘 - 帮派名称重复 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_CREATE_MAX) {
            return " 坐骑骑乘 - 帮派数量达到上限 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_CREATE_COST) {
            return " 坐骑骑乘 - 元宝不足无法创建帮派 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_NOT_MANAGER) {
            return " 坐骑骑乘 - 不是帮主或副帮主无法编辑 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_NOTICE_ERR) {
            return " 坐骑骑乘 - 帮派公告超过144个字符 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_NOTICE_ERR_PB) {
            return " 坐骑骑乘 - 帮派公告包含非法字符 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_LEV_LOW) {
            return " 坐骑骑乘 - 等级不够，不能加入帮派 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_MEMBER_MAX_COUNT) {
            return " 坐骑骑乘 - 帮派人数已满无法加入 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_JOIN_SUCESS) {
            return " 坐骑骑乘 - 恭喜你加入帮派 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_FACTION_REFUSED_JOIN) {
            return " 坐骑骑乘 - 你被拒绝加入帮派 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_KICKED) {
            return " 坐骑骑乘 - 你被移出帮派 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_KICK_SUCCESS) {
            return " 坐骑骑乘 - 踢出帮派成员 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_MAX_ZHIWEI) {
            return " 坐骑骑乘 - 职位人数已满 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_APPOINT_SUCCESS) {
            return " 坐骑骑乘 - 任命成功 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_PROMOTED) {
            return " 坐骑骑乘 - 你被任命为 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_APPOINT_NOSELF) {
            return " 坐骑骑乘 - 自己不能任命自己  - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_DONATIONMAX) {
            return " 坐骑骑乘 - 捐献次数超过最大次数 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_DONATION_GOLD) {
            return " 坐骑骑乘 - 捐献所需金币不够 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_DONATION_YB) {
            return " 坐骑骑乘 - 捐献所需元宝不够 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_SHOP_NUMLOW) {
            return " 坐骑骑乘 - 商品剩余数量不足无法购买 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_DEVOTE) {
            return " 坐骑骑乘 - 帮贡不足 - " + data;
        }
        if (reason == OprateResult.OPEATE_TYPE_FACTION_MONEY_ERR) {
            return " 坐骑骑乘 - 帮派资金不足 - " + data;
        }
        if (reason == OprateResult.OPEATE_TYPE_FACTION_LEVEL_UP) {
            return " 坐骑骑乘 - 帮派升级成功 - " + data;
        }
        if (reason == OprateResult.OPEATE_TYPE_FACTION_NOT_JOIN) {
            return " 坐骑骑乘 - 没有可以加入的帮派 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_PLAYER_OFFLINE) {
            return " 坐骑骑乘 - 对方不在线,无法加入成员 - " + data;
        }
        return "未知错误1  OPRATE_TYPE_MOUNT_QICHENG " + reason + "    " + data;
    }
    if (type == OprateResult.OPRATE_TYPE_TELEPORT) {
        if (reason == OprateResult.OPERTE_TYPE_FACTION_BOSS_START) {
            return " 传送 - 召唤boss - " + data;
        }
        return "未知错误1  OPRATE_TYPE_TELEPORT " + reason + "    " + data;
    }
    if (type == OprateResult.OPRATE_TYPE_UPGRADE) {
        if (reason == OprateResult.OPERTE_TYPE_FACTION_GIFT_THANK) {
            return " 游戏中的升级操作 - 感谢完成 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_GIFT_THANK_ALL) {
            return " 游戏中的升级操作 - 全部感谢完成 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_GIFT_GET_EXREWARD) {
            return " 游戏中的升级操作 - 领取成功 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_GIFT_GET_EXREWARD_ALL) {
            return " 游戏中的升级操作 - 全部领取成功 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_GIFT_SEND) {
            return " 游戏中的升级操作 - 赠送成功 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_GIFT_SEND_FAIL) {
            return " 游戏中的升级操作 - 赠送成功 - " + data;
        }
        return "未知错误1  OPRATE_TYPE_UPGRADE " + reason + "    " + data;
    }
    if (type == OprateResult.OPRATE_TYPE_ACTIVITY) {
        if (reason == OprateResult.OPERTE_TYPE_FACTION_GIFT_NOTICE) {
            return " 活动 - 礼物广播 - " + data;
        }
        return "未知错误1  OPRATE_TYPE_ACTIVITY " + reason + "    " + data;
    }
    if (type == OprateResult.OPRATE_TYPE_ACHIEVE) {
        if (reason == OprateResult.OPERTE_TYPE_FACTION_BOSSDEFENSE_TIME_ERROR) {
            return " 成就 - 非法时间 无法挑战boss - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_NAME_NOT_CHINESE) {
            return " 成就 - 包含中文以外字符 - " + data;
        }
        return "未知错误1  OPRATE_TYPE_ACHIEVE " + reason + "    " + data;
    }
    if (type == OprateResult.OPRATE_TYPE_ATHLETICS) {
        if (reason == OprateResult.OPERTE_TYPE_FACTION_MATCH_DECIDE_FIRST) {
            return " 竞技 - 家族战第一轮对阵表已产生 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_MATCH_OPEN_FIRST) {
            return " 竞技 - 家族战第一轮比赛开放进入,参赛家族成员请及时进入战场 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_MATCH_START_FIRST) {
            return " 竞技 - 家族战第一轮比赛正式开战 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_MATCH_DECIDE_SECOND) {
            return " 竞技 - 家族战第二轮对阵表已产生 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_MATCH_OPEN_SECOND) {
            return " 竞技 - 家族战第二轮比赛开放进入,参赛家族成员请及时进入战场 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_MATCH_START_SECOND) {
            return " 竞技 - 家族战第二轮比赛正式开战 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_MATCH_FINISH) {
            return " 竞技 - 恭喜家族 {1} 成为家族战盟主 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_MATCH_CANNOT_JOIN) {
            return " 竞技 - 不能加入家族 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_FACTION_STORE_IS_FULL) {
            return " 竞技 - 家族商店已满 - " + data;
        }
        return "未知错误1  OPRATE_TYPE_ATHLETICS " + reason + "    " + data;
    }
    if (type == OprateResult.OPRATE_TYPE_XIANFU) {
        if (reason == OprateResult.OPERTE_TYPE_SOCIAL_HAS_SEND) {
            return " 仙府夺宝 - 好友请求信息已发送 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_SOCIAL_NOT_FIND) {
            return " 仙府夺宝 - 角色不存在或者角色不在线 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_SOCIAL_SELF_FULL) {
            return " 仙府夺宝 - 自己好友列表已满 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_SOCIAL_TARGET_FULL) {
            return " 仙府夺宝 - 对方好友列表已满 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_SOCIAL_ALREADY_FRIEND) {
            return " 仙府夺宝 - 对方已经是你的好友 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_SOCIAL_ADD_MYSELF) {
            return " 仙府夺宝 - 不能自己添加自己为好友 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_SOCIAL_HAS_SEND_ADD) {
            return " 仙府夺宝 - 已经发送申请 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_SOCIAL_NO_MONEY) {
            return " 仙府夺宝 - 元宝或者金币不足 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_SOCIAL_NOT_ENEMY) {
            return " 仙府夺宝 - 对方不是仇人 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_SOCIAL_ENEMY_OFFLINE) {
            return " 仙府夺宝 - 对方处于离线中 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_SOCIAL_ENEMY_NOT_IN_FIELD) {
            return " 仙府夺宝 - 对方不在野外 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_SOCIAL_REVENGE_TIMES_NOT_ENOUGH) {
            return " 仙府夺宝 - 复仇传送次数不足 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_SOCIAL_RENAME_SUCCESS) {
            return " 仙府夺宝 - 改名成功 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_SOCIAL_OTHNER_FACTION) {
            return " 仙府夺宝 - 对方已在帮派 - " + data;
        }
        if (reason == OprateResult.OPERTE_TYPE_SOCIAL_SAME_FACTION) {
            return " 仙府夺宝 - 对方已在同帮派 - " + data;
        }
        return "未知错误1  OPRATE_TYPE_XIANFU " + reason + "    " + data;
    }
    if (type == OprateResult.OPRATE_TYPE_REWARD) {
        if (reason == OprateResult.HOSTING_OPERTE_IS_SELF) {
            return " 获得物品 - 无法对自己操作 - " + data;
        }
        if (reason == OprateResult.HOSTING_OPERTE_LEVEL_NOT) {
            return " 获得物品 - 等级不足 - " + data;
        }
        if (reason == OprateResult.HOSTING_OPERTE_IS_HOSTING) {
            return " 获得物品 - 托管中 - " + data;
        }
        if (reason == OprateResult.HOSTING_OPERTE_IS_HOSTING_APPLY) {
            return " 获得物品 - 托管申请 - " + data;
        }
        if (reason == OprateResult.HOSTING_OPERTE_FRIEND_NOT) {
            return " 获得物品 - 好友不存在 - " + data;
        }
        if (reason == OprateResult.HOSTING_OPERTE_HAS_NOT_24H) {
            return " 获得物品 - 还没到24小时 - " + data;
        }
        if (reason == OprateResult.HOSTING_OPERTE_FRIEND_OUTLINE) {
            return " 获得物品 - 好友不在线 - " + data;
        }
        if (reason == OprateResult.HOSTING_OPERTE_FRIEND_ERR) {
            return " 获得物品 - 托管好友错误 - " + data;
        }
        if (reason == OprateResult.HOSTING_OPERTE_NOT_HOSTING) {
            return " 获得物品 - 不在托管中 - " + data;
        }
        if (reason == OprateResult.HOSTING_OPERTE_FRIEND_ONLINE) {
            return " 获得物品 - 好友在线 - " + data;
        }
        if (reason == OprateResult.HOSTING_OPERTE_LOGIN_HOSTING) {
            return " 获得物品 - 托管登录中 - " + data;
        }
        if (reason == OprateResult.HOSTING_OPERTE_FRIEND_APPLY) {
            return " 获得物品 - 申请发送 - " + data;
        }
        if (reason == OprateResult.HOSTING_OPERTE_LOGIN) {
            return " 获得物品 - 登录 - " + data;
        }
        if (reason == OprateResult.HOSTING_OPERTE_SUCCESS) {
            return " 获得物品 - 托管申请成功 - " + data;
        }
        if (reason == OprateResult.HOSTING_OPERTE_CANCEL) {
            return " 获得物品 - 取消托管 - " + data;
        }
        if (reason == OprateResult.HOSTING_OPERTE_REFUSED) {
            return " 获得物品 - 拒绝托管 - " + data;
        }
        if (reason == OprateResult.HOSTING_OPERTE_NOT_DUE_TO) {
            return " 获得物品 - 托管未到期 - " + data;
        }
        if (reason == OprateResult.HOSTING_OPERTE_FRIEND_HOSTING_LOGIN) {
            return " 获得物品 - 对方托管登录中，无法操作 - " + data;
        }
        if (reason == OprateResult.HOSTING_OPERTE_FRIEND_NOT_HAS_YOU) {
            return " 获得物品 - 对方好友列表没有你 - " + data;
        }
        return "未知错误1  OPRATE_TYPE_REWARD " + reason + "    " + data;
    }
    if (type == OprateResult.OPRATE_TYPE_DOUJIAN) {
        if (reason == OprateResult.STRENGTH_OPERTE_FAIL) {
            return " 斗剑台 - 强化失败 - " + data;
        }
        return "未知错误1  OPRATE_TYPE_DOUJIAN " + reason + "    " + data;
    }
    if (type == OprateResult.OPRATE_TYPE_GEM) {
        if (reason == OprateResult.BATTLE_MODE_OPERTE_PEACE_MODE_DENY) {
            return " 宝石 - 战斗中不能切换和平模式 - " + data;
        }
        if (reason == OprateResult.BATTLE_MODE_OPERTE_PEACE_MODE_IN_CD) {
            return " 宝石 - 和平模式在CD中 - " + data;
        }
        return "未知错误1  OPRATE_TYPE_GEM " + reason + "    " + data;
    }
    if (type == OprateResult.OPRATE_TYPE_MONEYTREE) {
        if (reason == OprateResult.FIELD_BOSS_OPERTE_WILL_START) {
            return " 摇钱树 - 野外BOSS即将在{1}分钟后开启, 请大家安排好时间 - " + data;
        }
        if (reason == OprateResult.FIELD_BOSS_OPERTE_WILL_OCCUR) {
            return " 摇钱树 - 野外boss即将出现，请各位大侠做好准备 - " + data;
        }
        if (reason == OprateResult.FIELD_BOSS_OPERTE_OCCUR) {
            return " 摇钱树 - 野外boss已经在各个地图刷新，请各位大侠火速前往击杀 查看详情 - " + data;
        }
        if (reason == OprateResult.FIELD_BOSS_OPERTE_BOSS_BORN) {
            return " 摇钱树 - {1}已出现在{2}，请各位大侠火速前往击杀 立即前往 - " + data;
        }
        if (reason == OprateResult.FIELD_BOSS_OPERTE_BOSS_KILL) {
            return " 摇钱树 - {1}已被成功击杀！恭喜{2}获得{3}1分钟的优先开启权利 - " + data;
        }
        if (reason == OprateResult.FIELD_BOSS_OPERTE_PROTECT) {
            return " 摇钱树 - 九龙宝箱保护时间结束，静待各位大侠开启 - " + data;
        }
        if (reason == OprateResult.FIELD_BOSS_OPERTE_PICKED) {
            return " 摇钱树 - 恭喜{1}最终开启九龙宝箱，获得XXXX - " + data;
        }
        if (reason == OprateResult.FIELD_BOSS_OPERTE_TOO_FAR) {
            return " 摇钱树 - 太远了，你不可能开启这个宝箱 - " + data;
        }
        return "未知错误1  OPRATE_TYPE_MONEYTREE " + reason + "    " + data;
    }
    if (type == OprateResult.OPRATE_TYPE_NEED_NOTICE) {
        if (reason == OprateResult.WORLD_BOSS_OPERTE_NOT_ENROLL) {
            return " 需要跑马灯 - 本次活动您未报名，无法参加 - " + data;
        }
        if (reason == OprateResult.WORLD_BOSS_OPERTE_WILL_START) {
            return " 需要跑马灯 - 世界boss即将开启，请各位大侠做好准备 - " + data;
        }
        if (reason == OprateResult.WORLD_BOSS_OPERTE_WILL_ROLL1) {
            return " 需要跑马灯 - 恭喜{1}赢得本次拼点奖励，BOSS在3秒后恢复正常 - " + data;
        }
        if (reason == OprateResult.WORLD_BOSS_OPERTE_WILL_ROLL2) {
            return " 需要跑马灯 - 恭喜{1}赢得本次拼点奖励，现在可自由离开战场 - " + data;
        }
        if (reason == OprateResult.WORLD_BOSS_OPERTE_ENROLL) {
            return " 需要跑马灯 - 世界BOSS开始报名 - " + data;
        }
        return "未知错误1  OPRATE_TYPE_NEED_NOTICE " + reason + "    " + data;
    }
    if (type == OprateResult.OPRATE_TYPE_GROUP) {
        if (reason == OprateResult.MOUNT_QICHENG_FIGHT) {
            return " 组队相关的 - 战斗状态不能骑乘 - " + data;
        }
        if (reason == OprateResult.MOUNT_QICHENG_JUMP) {
            return " 组队相关的 - 跳跃状态不能骑乘 - " + data;
        }
        return "未知错误1  OPRATE_TYPE_GROUP " + reason + "    " + data;
    }
    if (type == OprateResult.OPRATE_TYPE_GIFTCODE) {
        if (reason == OprateResult.TELEPORT_OPRATE_PVP_STATE) {
            return " 兑换码相关的 - pvp状态不能传送 - " + data;
        }
        return "未知错误1  OPRATE_TYPE_GIFTCODE " + reason + "    " + data;
    }
    return "未知错误2   " + type + "  " + reason + "    " + data;
}
//# sourceMappingURL=OperationInfo.js.map