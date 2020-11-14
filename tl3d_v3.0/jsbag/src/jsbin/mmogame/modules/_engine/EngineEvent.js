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
var EngineEvent = /** @class */ (function (_super) {
    __extends(EngineEvent, _super);
    function EngineEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EngineEvent.CREAT_SCENE_EVENT = "creat_scene_event";
    EngineEvent.CREAT_MAINCHAR_EVENT = "creat_mainchar_event";
    EngineEvent.ENTER_SCENE_EVENT = "enter_scene_event";
    EngineEvent.MONEY_CHANGE = "MONEY_CHANGE"; // 货币变化
    EngineEvent.MONEY_TYPE_GOLD_INGOT = "MONEY_TYPE_GOLD_INGOT"; // 元宝
    EngineEvent.MONEY_TYPE_BIND_GOLD = "MONEY_TYPE_BIND_GOLD"; // 绑定元宝
    EngineEvent.MONEY_TYPE_SILVER = "MONEY_TYPE_SILVER"; // 身上的银子
    EngineEvent.MONEY_TYPE_SILVER_WAREHOUSE = "MONEY_TYPE_SILVER_WAREHOUSE"; // 仓库的银子
    EngineEvent.MONEY_TYPE_GOLD_WAREHOUSE = "MONEY_TYPE_GOLD_WAREHOUSE"; // 仓库元宝
    EngineEvent.MONEY_TYPE_BIND_GOLD_WAREHOUSE = "MONEY_TYPE_BIND_GOLD_WAREHOUSE"; // 仓库的绑元
    EngineEvent.MONEY_TYPE_QI = "MONEY_TYPE_QI"; // 真气
    EngineEvent.MONEY_TYPE_BEAST = "MONEY_TYPE_BEAST"; // 兽灵
    EngineEvent.MONEY_TYPE_GEM = "MONEY_TYPE_GEM"; // 宝石精华
    EngineEvent.PLAYER_FIELD_VIP_LEVEL = "PLAYER_FIELD_VIP_LEVEL"; // 角色vip等级
    EngineEvent.PLAYER_FIELD_LEVEL = "PLAYER_FIELD_LEVEL"; // 角色等级
    EngineEvent.PLAYER_FIELD_FORCE = "PLAYER_FIELD_FORCE"; // 角色战力
    EngineEvent.PLAYER_FIELD_DIVINE = "PLAYER_FIELD_DIVINE"; // 神兵
    EngineEvent.PLAYER_EXPAND_INT_XP = "PLAYER_EXPAND_INT_XP"; // 经验改变
    EngineEvent.MAP_INT_FIELD_QUESTS_PROCESS = "MAP_INT_FIELD_QUESTS_PROCESS"; // 任务变化
    EngineEvent.CORE_DATA_CREATED_EVENT = "CORE_DATA_CREATED_EVENT";
    EngineEvent.CORE_DATA_COMPLETE_EVENT = "CORE_DATA_COMPLETE_EVENT";
    EngineEvent.SYSTEM_OPEN_EVENT = "SYSTEM_OPEN_EVENT"; //新系统开启事件
    return EngineEvent;
}(BaseEvent));
//# sourceMappingURL=EngineEvent.js.map