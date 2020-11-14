declare module battle {
    export const enum NotifyType {
        /**战斗结束 */
        BattleEnd,
        /**战场初始化 */
        BattleSceneInitSuccess,
        /**回合播放结束 */
        RoundPlayEnd,
        /**指令选择中 */
        RoundSelect,
        /**指令操作完毕 */
        RoundOprateEnd,
        /** 使用物品 */
        BattleDrugInUse,
        /** 战斗中技能更改 */
        AutoBattleSkillChange,
        /**死亡 */
        FighterDie,
    }
    export const enum NewDemoResultDataType {
        /** 受击者血量变化，为正是加血，为负是扣血 */
        HP_CHANGE = 1,
        /** 受击者魔法变化，为正是加蓝，为负是扣蓝 */
        MP_CHANGE = 2,
        /** 受击者怒气变化，为正是加怒气，为负是扣怒气 */
        SP_CHANGE = 3,
        /** 受击者当前血上限变化，为正是加，为负是减 */
        UL_HP_CHANGE = 4,
        /** 受击者结果类型，ResultType型枚举值叠加 */
        TARGET_RESULT = 5,
        /** 受击方造成的反伤值，如果为0则代表没有反伤 */
        RETURN_HURT = 6,
        /** 受击方造成的反击值，如果为0则代表没有反击 */
        ATTACK_BACK = 7,
        /** 攻击方产生的吸血值，如果为0则代表没有吸血 */
        STEAL_HP = 8,
        /** 攻击者结果类型，ResultType型枚举值叠加 */
        ATTACKER_RESULT = 9,
        /** 保护者ID */
        PROTECTER_ID = 10,
        /** 保护者血量变化，为正是加血，为负是扣血（显然是为负的） */
        PROTECTER_HP_CHANGE = 11,
        /** 保护者结果类型，ResultType型枚举值叠加 */
        PROTECTER_RESULT = 12,
        /** 合击者ID */
        ASSISTER_ID = 13,
        /** 攻击方产生的吸蓝值，如果为0则代表没有吸蓝 */
        STEAL_MP = 14,
        /** 攻击者因为被反伤或反击致死而产生的伤的变化 */
        RETURN_HURT_DEATH = 15,
        /** 保护者因为保护致死而产生的伤的变化 */
        PROTECTER_MAXHP_CHANGE = 16,
        /** 行动时弹的提示ID */
        MESSAGE_ID = 17,
        /** 神佑血量变化 */
        HP_GODBLESS = 18,
        /** 受击者效果点变化，为正是加效果点，为负是扣效果点 */
        EP_CHANGE = 19,
        /** 模型改变 */
        SHAPE_CHANGE = 20,
    }

    export const enum BattleResult {
        eBattleResult_Null,
        eBattleResult_HPChange = 1 << 0,	//生命值变化
        eBattleResult_MPChange = 1 << 1,	//魔法值变化
        eBattleResult_SPChange = 1 << 2,	//目标怒气变化
        eBattleResult_ULHPChange = 1 << 3,	//目标当前血上限变化
        eBattleResult_Rest = 1 << 4,	//目标休息
        eBattleResult_Hit = 1 << 5,	//目标受伤
        eBattleResult_Critic = 1 << 6,	//目标被暴击
        eBattleResult_Defence = 1 << 7,	//目标防御
        eBattleResult_Parry = 1 << 8,	//目标招架
        eBattleResult_Dodge = 1 << 9,	//目标闪避
        eBattleResult_Runaway = 1 << 10,//目标逃跑
        eBattleResult_Seized = 1 << 11,//目标被捕捉
        eBattleResult_Summonback = 1 << 12,//目标被召回
        eBattleResult_Death = 1 << 13,//目标死亡,倒在原地(现在只有人可以这样)
        eBattleResult_FlyOut = 1 << 14,//目标被击飞
        eBattleResult_Ghost = 1 << 15,//目标进入鬼魂状态
        eBattleResult_Relive = 1 << 16,//目标被复活
        eBattleResult_Summon = 1 << 17,//目标被召唤
        eBattleResult_NotDefence = 1 << 18,//忽略防御
        eBattleResult_Absorb = 1 << 19,//吸收
        eBattleResult_DestroyMP = 1 << 20,//打蓝
        eBattleResult_GodBless = 1 << 21,//神佑
        //eBattleResult_RiseHalf	= 1<<21,//目标倒地后原地复活（半血半蓝）
        //eBattleResult_RiseFull	= 1<<22,//目标倒地后原地复活（满血满蓝）
        eBattleResult_EPChange = 1 << 23,//连击点
        eBattleResultMax,
    }

    export const enum OperationType {
        /** 攻击 */
        ACTION_ATTACK = 1,
        /** 使用技能 */
        ACTION_SKILL = 2,
        /** 使用物品 */
        ACTION_USEITEM = 3,
        /** 防御 */
        ACTION_DEFEND = 4,
        /** 保护 */
        ACTION_PROTECT = 5,
        /** 召唤宠物 */
        ACTION_SUMMON = 6,
        /** 召还宠物 */
        ACTION_WITHDRAW = 7,
        /** 捕捉 */
        ACTION_CATHCH = 8,
        /** 逃跑 */
        ACTION_ESCAPE = 9,
        /** 休息 */
        ACTION_REST = 10,
        /** 特殊技能 */
        ACTION_SPECIAL_SKILL = 11,
        /** 瞬时召唤 */
        ACTION_SUMMON_INSTANT = 12,
        /** 瞬时逃跑 */
        ACTION_ESCAPE_INSTANT = 13,
        /** 操作失败 */
        ACTION_FAILURE = 14,
        /** 战斗结束，有AI怪的AI指令有这个Action */
        ACTION_BATTLE_END = 15,
        /** 不带施法者的Demo，attackID填0 */
        ACTION_ENVIRONMENTDEMO = 16,
        /** 战场环境改变 operateid填战场环境id */
        ACTION_ENVIRONMENTCHANGE = 17,
        /** 回合末结算demo */
        ACTION_ROUNDENDDEMO = 18,
        /** 绝技 */
        ACTION_UNIQUE_SKILL = 19,
        /** 操作失败_不带叹号的！ */
        ACTION_FAILURE_NO_WONDER = 20,
        /** 替换 */
        ACTION_REPLACE = 21,
    }

    export const enum FighterType {
        /**角色 */
        FIGHTER_ROLE = 1,
        /**宠物 */
        FIGHTER_PET = 2,
        /**伙伴（玩家自带助战） */
        FIGHTER_PARTNER = 3,
        /**暗雷野怪（20000~23999） */
        FIGHTER_MONSTER_HIDE = 4,
        /**战斗npc（24000以上） */
        FIGHTER_MONSTER_NPC = 5,
        /**系统安排的助战 */
        FIGHTER_SYSTEM_PARTNER = 6,
    }

    export const enum BattleConst {
        /**回合数量 */
        MAX_ROUND = 10,
        /**回合操作倒计时, 毫秒 */
        ROUND_DELAY = 10000,
        /**阵位数量 */
        MAX_POS = 14,
        /**战将数量 */
        MAX_ROLE = 28,
        /**观战者开始位置 */
        WATCHER_START_POS = 31,
        /** 中间观战者 */
        WATCHER_MIDDLE_POS = 35,
        /**最大怒气点数 */
        MAX_ANGER = 100,
        /**普攻涨怒气点数 */
        ADD_ANGER = 1,
        /**普通攻击技能id */
        Normal_Attack_Skill_id = 1000010,

        /**宠物和主角之间的位置相差5 */
        PET_INDEX = 5,
    }
    /** 战斗中技能类型 */
    export const enum SkillType {
        /**被动技能 */
        UNACTIVE = 10,
        /** 辅助技能 */
        AUXILIARY_SKILLS = 7,
        /** 装备附魔技能 */
        EQUIP_ENCHANTING = 11,

    }
    /** 模型跑动类型 */
    export const enum RunType
    {
        /** 捕捉跑动 */
        MATCH_RUN = 1,
        /** 捕捉返回跑动 */
        MATCH_BACK = 2,
    }

    export const enum BattleStep {
        Inint, //初始化
        Opera, //回合操作
        Wait, //操作完成等待
        Play //播放战斗表现
    }

    /**
     * 操作的角色类型
     */
    export const enum OperateRoleType {
        None = -1, //没有操作
        Pet = 0,  //宠物
        Role = 1, //玩家
    }
    /**
     * 操作类型
     */
    export const enum OperateType {
        /** 自动 */
        Auto_Fight = 1,
        /** 手动 */
        Manual_Fight = 0,
    }

    /**
     * 特效释放方式
     */
    export const enum eMagicPosType {
        eMagicPos_Null = -1,
        eMagicPos_Static = 0,	//静止于人物
        eMagicPos_Friend = 1,	//友方阵型中间
        eMagicPos_Enemy = 2,	//敌方阵型中间
        eMagicPos_Fly = 3,	    //飞行魔法(配置表未使用，暂不实现)
        eMagicPos_Middle = 4,	//战场中央(配置表未使用，暂不实现)
        eMagicPos_ToSelf = 5,	//受击者身上
        eMagicPos_HeadTop = 6,	//头顶(配置表未使用，暂不实现)
        eMagicPos_Banner = 7,	//技能名称(配置表未使用，暂不实现)
    }

    /**
     * actiontype对应的动作 参考cstageinfo.actiontype
     */
    export const enum ActionType {
        NULL = 0,
        STAND = 1,//站立
        STAND_RANDOM = 2,//随机站立
        BATTLE_STAND = 3,//警戒站立
        RUN = 5,//跑动
        BATTLE_RUN = 6,//战斗中跑动
        ATTACKED = 7,//受击
        ATTACK = 8,//攻击
        MAGIC = 9,//施法
        RUNAWAY = 10,//逃跑
        DEFEND = 11,//防御
        DODGE = 12,//闪避
        DYING = 13,// 倒地
        DEATH = 14, //死亡
        ROLL = 15,//击飞
        DEATH_STILL = 16,//静止倒地

	    //使用3D之后扩展的动作
	    BATTLE_JUMP	= 27,	//战斗中跳跃 用于跳斩
	    STAND_READY	= 30,//战斗警戒状态
	    ATTACK2	= 42,		//攻击2
	    ACTION_MAX
    }

    /**
     * 技能目标
     */
    export const enum SkillTarget {
        ENEMY = 480,
        /**选取自己方 */
        FRIEND = 4127,
        /**除自己以外的己方 */
        FRIEND_NOT_OWN = 4126,
        /**选取己方空位 */
        FRIEND_FREE = 8192,
        /**己方不包括宠物 */
        FRIEND_NOT_PET = 4117,
        /**战斗主角 */
        OWN = 1,
        /**主角宠物 */
        OWN_PET = 2,
        /**友方角色 */
        FREIDN_ROLE = 4,
        /**友方宠物 */
        FRIEND_PET = 8,
        /**友方NPC */
        FRIEND_NPC = 16,
        /**敌方角色 */
        ENEMY_ROLE = 32,
        /**敌方宠物 */
        ENEMY_PET = 64,
        /**敌方NPC */
        ENEMY_NPC = 128,
        /**敌方怪物 */
        ENEMY_MONSTER = 256,
        /**夫妻 */
        COUPLE = 512,
        /**结拜 */
        BROTHER = 1024,
        /**师徒 */
        MASTER = 2048,
        /**友方地面 */
        FRIEND_FLOOR = 8192,
    }
    /**飘字样式 */
    export const enum FlyTextType {
        /**纯数字 */
        NUM_TAB = 1,
        /**数字+底图 */
        NUM_PIC = 2,
        /**美术字单图 */
        PIC = 3,

    }
    /** 阵法对象 */
    export const enum ZhenFaType {
        /** 敌方阵法 */
        ENEMY_ZHENFA = 1,
        /** 我方阵法 */
        FRIEND_ZHENFA = 2,
    }

    /** 移动类型 */
    export const enum eMoveType{
	eMove_Target,
	eMove_Pos, 
	eMove_Back, 
	eMove_Release
 }
}