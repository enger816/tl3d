/***********************************************************************/
/*************** 本代码由协议工具自动生成，请勿手动修改 ****************/
/***********************************************************************/
var both_null_action = /** @class */ (function () {
    function both_null_action() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    both_null_action.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    both_null_action.param_count = 0;
    both_null_action.optname = "onNull_action";
    return both_null_action;
}());
var both_ping_pong = /** @class */ (function () {
    function both_ping_pong() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    both_ping_pong.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    both_ping_pong.param_count = 0;
    both_ping_pong.optname = "onPing_pong";
    return both_ping_pong;
}());
var c2s_forced_into = /** @class */ (function () {
    function c2s_forced_into() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_forced_into.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_forced_into.param_count = 0;
    c2s_forced_into.optname = "onForced_into";
    return c2s_forced_into;
}());
var c2s_get_session = /** @class */ (function () {
    function c2s_get_session() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_get_session.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //
        self.sessionkey = this.input.readString();
        //玩家id
        self.account = this.input.readString();
        //版本
        self.version = this.input.readString();
    };
    c2s_get_session.param_count = 3;
    c2s_get_session.optname = "onGet_session";
    return c2s_get_session;
}());
var both_route_trace = /** @class */ (function () {
    function both_route_trace() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    both_route_trace.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //
        self.val = this.input.readString();
    };
    both_route_trace.param_count = 1;
    both_route_trace.optname = "onRoute_trace";
    return both_route_trace;
}());
var c2s_write_client_log = /** @class */ (function () {
    function c2s_write_client_log() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_write_client_log.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //类型
        self.type = this.input.readUint32();
        //uid
        self.uid = this.input.readString();
        //guid
        self.guid = this.input.readString();
        //内容
        self.log = this.input.readString();
    };
    c2s_write_client_log.param_count = 4;
    c2s_write_client_log.optname = "onWrite_client_log";
    return c2s_write_client_log;
}());
var s2c_operation_failed = /** @class */ (function () {
    function s2c_operation_failed() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_operation_failed.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //操作类型
        self.type = this.input.readUint16();
        //失败原因
        self.reason = this.input.readUint16();
        //预留参数
        self.data = this.input.readString();
    };
    s2c_operation_failed.param_count = 3;
    s2c_operation_failed.optname = "onOperation_failed";
    return s2c_operation_failed;
}());
var both_sync_mstime = /** @class */ (function () {
    function both_sync_mstime() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    both_sync_mstime.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //服务器运行的毫秒数
        self.mstime_now = this.input.readUint32();
        //自然时间
        self.time_now = this.input.readUint32();
        //自然时间的服务器启动时间
        self.open_time = this.input.readUint32();
    };
    both_sync_mstime.param_count = 3;
    both_sync_mstime.optname = "onSync_mstime";
    return both_sync_mstime;
}());
var s2c_ud_object = /** @class */ (function () {
    function s2c_ud_object() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_ud_object.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    s2c_ud_object.param_count = 0;
    s2c_ud_object.optname = "onUd_object";
    return s2c_ud_object;
}());
var c2s_ud_control = /** @class */ (function () {
    function c2s_ud_control() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_ud_control.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_ud_control.param_count = 0;
    c2s_ud_control.optname = "onUd_control";
    return c2s_ud_control;
}());
var s2c_ud_control_result = /** @class */ (function () {
    function s2c_ud_control_result() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_ud_control_result.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    s2c_ud_control_result.param_count = 0;
    s2c_ud_control_result.optname = "onUd_control_result";
    return s2c_ud_control_result;
}());
var s2c_grid_ud_object = /** @class */ (function () {
    function s2c_grid_ud_object() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_grid_ud_object.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    s2c_grid_ud_object.param_count = 0;
    s2c_grid_ud_object.optname = "onGrid_ud_object";
    return s2c_grid_ud_object;
}());
var s2c_grid_ud_object_2 = /** @class */ (function () {
    function s2c_grid_ud_object_2() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_grid_ud_object_2.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    s2c_grid_ud_object_2.param_count = 0;
    s2c_grid_ud_object_2.optname = "onGrid_ud_object_2";
    return s2c_grid_ud_object_2;
}());
var s2c_login_queue_index = /** @class */ (function () {
    function s2c_login_queue_index() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_login_queue_index.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //目前自己排在登录队列的第几位
        self.index = this.input.readUint32();
    };
    s2c_login_queue_index.param_count = 1;
    s2c_login_queue_index.optname = "onLogin_queue_index";
    return s2c_login_queue_index;
}());
var s2c_kicking_type = /** @class */ (function () {
    function s2c_kicking_type() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_kicking_type.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //踢人枚举
        self.k_type = this.input.readUint32();
    };
    s2c_kicking_type.param_count = 1;
    s2c_kicking_type.optname = "onKicking_type";
    return s2c_kicking_type;
}());
var c2s_get_chars_list = /** @class */ (function () {
    function c2s_get_chars_list() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_get_chars_list.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_get_chars_list.param_count = 0;
    c2s_get_chars_list.optname = "onGet_chars_list";
    return c2s_get_chars_list;
}());
var s2c_chars_list = /** @class */ (function () {
    function s2c_chars_list() {
        this.optcode = 0;
        /**
         * 角色列表
         */
        this.list = new Array(); //char_create_info
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_chars_list.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //角色列表
        if (self.list.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _list = new char_create_info;
            _list.read(this.input);
            self.list.push(_list);
        }
        //家族名称
        self.faction_name = this.input.readString();
        //女王名称
        self.queen_name = this.input.readString();
        //图标
        self.icon = this.input.readUint8();
    };
    s2c_chars_list.param_count = 4;
    s2c_chars_list.optname = "onChars_list";
    return s2c_chars_list;
}());
var c2s_check_name = /** @class */ (function () {
    function c2s_check_name() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_check_name.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //名称
        self.name = this.input.readString();
    };
    c2s_check_name.param_count = 1;
    c2s_check_name.optname = "onCheck_name";
    return c2s_check_name;
}());
var s2c_check_name_result = /** @class */ (function () {
    function s2c_check_name_result() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_check_name_result.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //结果
        self.result = this.input.readUint8();
    };
    s2c_check_name_result.param_count = 1;
    s2c_check_name_result.optname = "onCheck_name_result";
    return s2c_check_name_result;
}());
var c2s_char_create = /** @class */ (function () {
    function c2s_char_create() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_char_create.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //角色创建信息
        self.info = new char_create_info;
        self.info.read(this.input);
    };
    c2s_char_create.param_count = 1;
    c2s_char_create.optname = "onChar_create";
    return c2s_char_create;
}());
var s2c_char_create_result = /** @class */ (function () {
    function s2c_char_create_result() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_char_create_result.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //结果
        self.result = this.input.readUint8();
    };
    s2c_char_create_result.param_count = 1;
    s2c_char_create_result.optname = "onChar_create_result";
    return s2c_char_create_result;
}());
var c2s_delete_char = /** @class */ (function () {
    function c2s_delete_char() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_delete_char.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //玩家ID
        self.id = this.input.readUint32();
    };
    c2s_delete_char.param_count = 1;
    c2s_delete_char.optname = "onDelete_char";
    return c2s_delete_char;
}());
var s2c_delete_char_result = /** @class */ (function () {
    function s2c_delete_char_result() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_delete_char_result.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //结果
        self.result = this.input.readUint8();
    };
    s2c_delete_char_result.param_count = 1;
    s2c_delete_char_result.optname = "onDelete_char_result";
    return s2c_delete_char_result;
}());
var c2s_player_login = /** @class */ (function () {
    function c2s_player_login() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_player_login.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //玩家ID
        self.guid = this.input.readString();
    };
    c2s_player_login.param_count = 1;
    c2s_player_login.optname = "onPlayer_login";
    return c2s_player_login;
}());
var c2s_player_logout = /** @class */ (function () {
    function c2s_player_logout() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_player_logout.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_player_logout.param_count = 0;
    c2s_player_logout.optname = "onPlayer_logout";
    return c2s_player_logout;
}());
var c2s_regularise_account = /** @class */ (function () {
    function c2s_regularise_account() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_regularise_account.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //
        self.uid = this.input.readString();
    };
    c2s_regularise_account.param_count = 1;
    c2s_regularise_account.optname = "onRegularise_account";
    return c2s_regularise_account;
}());
var c2s_char_remotestore = /** @class */ (function () {
    function c2s_char_remotestore() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_char_remotestore.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //类型
        self.key = this.input.readUint32();
        //配置信息
        self.value = this.input.readUint32();
    };
    c2s_char_remotestore.param_count = 2;
    c2s_char_remotestore.optname = "onChar_remotestore";
    return c2s_char_remotestore;
}());
var c2s_char_remotestore_str = /** @class */ (function () {
    function c2s_char_remotestore_str() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_char_remotestore_str.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //类型
        self.key = this.input.readUint32();
        //配置信息
        self.value = this.input.readString();
    };
    c2s_char_remotestore_str.param_count = 2;
    c2s_char_remotestore_str.optname = "onChar_remotestore_str";
    return c2s_char_remotestore_str;
}());
var c2s_teleport = /** @class */ (function () {
    function c2s_teleport() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_teleport.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //传送点intGuid
        self.intGuid = this.input.readUint32();
    };
    c2s_teleport.param_count = 1;
    c2s_teleport.optname = "onTeleport";
    return c2s_teleport;
}());
var both_move_stop = /** @class */ (function () {
    function both_move_stop() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    both_move_stop.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //玩家GUID
        self.guid = this.input.readUint32();
        //
        self.pos_x = this.input.readUint16();
        //
        self.pos_y = this.input.readUint16();
    };
    both_move_stop.param_count = 3;
    both_move_stop.optname = "onMove_stop";
    return both_move_stop;
}());
var both_unit_move = /** @class */ (function () {
    function both_unit_move() {
        this.optcode = 0;
        /**
         * 路线
         */
        this.path = new Array(); //int8
    }
    /**
     从输入二进制流中读取结构体
     */
    both_unit_move.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //怪物GUID
        self.guid = this.input.readUint32();
        //
        self.pos_x = this.input.readUint16();
        //
        self.pos_y = this.input.readUint16();
        //路线
        self.path.length = 0; //清空数组				
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            self.path.push(this.input.readInt8());
        }
    };
    both_unit_move.param_count = 4;
    both_unit_move.optname = "onUnit_move";
    return both_unit_move;
}());
var c2s_use_gameobject = /** @class */ (function () {
    function c2s_use_gameobject() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_use_gameobject.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //目标
        self.target = this.input.readUint32();
    };
    c2s_use_gameobject.param_count = 1;
    c2s_use_gameobject.optname = "onUse_gameobject";
    return c2s_use_gameobject;
}());
var c2s_bag_exchange_pos = /** @class */ (function () {
    function c2s_bag_exchange_pos() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_bag_exchange_pos.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //源包裹
        self.src_bag = this.input.readUint32();
        //源位置
        self.src_pos = this.input.readUint32();
        //目标包裹
        self.dst_bag = this.input.readUint32();
        //目标位置
        self.dst_pos = this.input.readUint32();
    };
    c2s_bag_exchange_pos.param_count = 4;
    c2s_bag_exchange_pos.optname = "onBag_exchange_pos";
    return c2s_bag_exchange_pos;
}());
var c2s_bag_destroy = /** @class */ (function () {
    function c2s_bag_destroy() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_bag_destroy.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //物品guid
        self.item_guid = this.input.readString();
        //数量（预留）
        self.num = this.input.readUint32();
        //包裹ID
        self.bag_id = this.input.readUint32();
    };
    c2s_bag_destroy.param_count = 3;
    c2s_bag_destroy.optname = "onBag_destroy";
    return c2s_bag_destroy;
}());
var c2s_bag_item_split = /** @class */ (function () {
    function c2s_bag_item_split() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_bag_item_split.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //包裹ID
        self.bag_id = this.input.readUint8();
        //切割哪个位置物品
        self.src_pos = this.input.readUint16();
        //切割多少出去
        self.count = this.input.readUint32();
        //切割到什么位置
        self.dst_pos = this.input.readUint16();
        //切割到什么包裹
        self.dst_bag = this.input.readUint8();
    };
    c2s_bag_item_split.param_count = 5;
    c2s_bag_item_split.optname = "onBag_item_split";
    return c2s_bag_item_split;
}());
var c2s_bag_item_user = /** @class */ (function () {
    function c2s_bag_item_user() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_bag_item_user.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //物品guid
        self.item_guid = this.input.readString();
        //个数
        self.count = this.input.readUint32();
    };
    c2s_bag_item_user.param_count = 2;
    c2s_bag_item_user.optname = "onBag_item_user";
    return c2s_bag_item_user;
}());
var s2c_bag_item_cooldown = /** @class */ (function () {
    function s2c_bag_item_cooldown() {
        this.optcode = 0;
        /**
         * 冷却信息列表
         */
        this.list = new Array(); //item_cooldown_info
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_bag_item_cooldown.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //冷却信息列表
        if (self.list.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _list = new item_cooldown_info;
            _list.read(this.input);
            self.list.push(_list);
        }
    };
    s2c_bag_item_cooldown.param_count = 1;
    s2c_bag_item_cooldown.optname = "onBag_item_cooldown";
    return s2c_bag_item_cooldown;
}());
var s2c_grid_unit_move = /** @class */ (function () {
    function s2c_grid_unit_move() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_grid_unit_move.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    s2c_grid_unit_move.param_count = 0;
    s2c_grid_unit_move.optname = "onGrid_unit_move";
    return s2c_grid_unit_move;
}());
var s2c_grid_unit_move_2 = /** @class */ (function () {
    function s2c_grid_unit_move_2() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_grid_unit_move_2.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    s2c_grid_unit_move_2.param_count = 0;
    s2c_grid_unit_move_2.optname = "onGrid_unit_move_2";
    return s2c_grid_unit_move_2;
}());
var c2s_exchange_item = /** @class */ (function () {
    function c2s_exchange_item() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_exchange_item.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //物品模版
        self.entry = this.input.readUint32();
        //兑换数量
        self.count = this.input.readUint32();
        //兑换物品模版
        self.tar_entry = this.input.readUint32();
    };
    c2s_exchange_item.param_count = 3;
    c2s_exchange_item.optname = "onExchange_item";
    return c2s_exchange_item;
}());
var c2s_bag_extension = /** @class */ (function () {
    function c2s_bag_extension() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_bag_extension.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //包裹
        self.bag_id = this.input.readUint8();
        //扩展类型
        self.extension_type = this.input.readUint8();
        //开启位置
        self.bag_pos = this.input.readUint32();
    };
    c2s_bag_extension.param_count = 3;
    c2s_bag_extension.optname = "onBag_extension";
    return c2s_bag_extension;
}());
var c2s_npc_get_goods_list = /** @class */ (function () {
    function c2s_npc_get_goods_list() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_npc_get_goods_list.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //
        self.npc_id = this.input.readUint32();
    };
    c2s_npc_get_goods_list.param_count = 1;
    c2s_npc_get_goods_list.optname = "onNpc_get_goods_list";
    return c2s_npc_get_goods_list;
}());
var s2c_npc_goods_list = /** @class */ (function () {
    function s2c_npc_goods_list() {
        this.optcode = 0;
        /**
         * 商品列表
         */
        this.goods = new Array(); //uint32
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_npc_goods_list.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //商品列表
        self.goods.length = 0; //清空数组				
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            self.goods.push(this.input.readUint32());
        }
        //
        self.npc_id = this.input.readUint32();
    };
    s2c_npc_goods_list.param_count = 2;
    s2c_npc_goods_list.optname = "onNpc_goods_list";
    return s2c_npc_goods_list;
}());
var c2s_store_buy = /** @class */ (function () {
    function c2s_store_buy() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_store_buy.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //商品id
        self.id = this.input.readUint32();
        //商品数量
        self.count = this.input.readUint32();
    };
    c2s_store_buy.param_count = 2;
    c2s_store_buy.optname = "onStore_buy";
    return c2s_store_buy;
}());
var c2s_npc_sell = /** @class */ (function () {
    function c2s_npc_sell() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_npc_sell.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //NPCID
        self.npc_id = this.input.readUint32();
        //物品guid
        self.item_guid = this.input.readString();
        //数量
        self.num = this.input.readUint32();
    };
    c2s_npc_sell.param_count = 3;
    c2s_npc_sell.optname = "onNpc_sell";
    return c2s_npc_sell;
}());
var c2s_npc_repurchase = /** @class */ (function () {
    function c2s_npc_repurchase() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_npc_repurchase.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //物品guid
        self.item_id = this.input.readString();
    };
    c2s_npc_repurchase.param_count = 1;
    c2s_npc_repurchase.optname = "onNpc_repurchase";
    return c2s_npc_repurchase;
}());
var c2s_avatar_fashion_enable = /** @class */ (function () {
    function c2s_avatar_fashion_enable() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_avatar_fashion_enable.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //时装装备位置
        self.pos = this.input.readUint8();
    };
    c2s_avatar_fashion_enable.param_count = 1;
    c2s_avatar_fashion_enable.optname = "onAvatar_fashion_enable";
    return c2s_avatar_fashion_enable;
}());
var c2s_questhelp_talk_option = /** @class */ (function () {
    function c2s_questhelp_talk_option() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_questhelp_talk_option.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //任务ID
        self.quest_id = this.input.readUint32();
        //选项ID
        self.option_id = this.input.readUint32();
        //
        self.value0 = this.input.readInt32();
        //
        self.value1 = this.input.readInt32();
    };
    c2s_questhelp_talk_option.param_count = 4;
    c2s_questhelp_talk_option.optname = "onQuesthelp_talk_option";
    return c2s_questhelp_talk_option;
}());
var c2s_taxi_hello = /** @class */ (function () {
    function c2s_taxi_hello() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_taxi_hello.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //npc guid
        self.guid = this.input.readUint32();
    };
    c2s_taxi_hello.param_count = 1;
    c2s_taxi_hello.optname = "onTaxi_hello";
    return c2s_taxi_hello;
}());
var s2c_taxi_stations_list = /** @class */ (function () {
    function s2c_taxi_stations_list() {
        this.optcode = 0;
        /**
         * 传送点列表
         */
        this.stations = new Array(); //taxi_menu_info
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_taxi_stations_list.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //
        self.npcid = this.input.readUint32();
        //传送点列表
        if (self.stations.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _stations = new taxi_menu_info;
            _stations.read(this.input);
            self.stations.push(_stations);
        }
    };
    s2c_taxi_stations_list.param_count = 2;
    s2c_taxi_stations_list.optname = "onTaxi_stations_list";
    return s2c_taxi_stations_list;
}());
var c2s_taxi_select_station = /** @class */ (function () {
    function c2s_taxi_select_station() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_taxi_select_station.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //
        self.station_id = this.input.readUint32();
        //
        self.guid = this.input.readUint32();
    };
    c2s_taxi_select_station.param_count = 2;
    c2s_taxi_select_station.optname = "onTaxi_select_station";
    return c2s_taxi_select_station;
}());
var c2s_gossip_select_option = /** @class */ (function () {
    function c2s_gossip_select_option() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_gossip_select_option.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //选项ID
        self.option = this.input.readUint32();
        //NPCguid
        self.guid = this.input.readUint32();
        //输入值
        self.unknow = this.input.readString();
    };
    c2s_gossip_select_option.param_count = 3;
    c2s_gossip_select_option.optname = "onGossip_select_option";
    return c2s_gossip_select_option;
}());
var c2s_gossip_hello = /** @class */ (function () {
    function c2s_gossip_hello() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_gossip_hello.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //交流目标
        self.guid = this.input.readUint32();
    };
    c2s_gossip_hello.param_count = 1;
    c2s_gossip_hello.optname = "onGossip_hello";
    return c2s_gossip_hello;
}());
var s2c_gossip_message = /** @class */ (function () {
    function s2c_gossip_message() {
        this.optcode = 0;
        /**
         * 闲聊列表
         */
        this.gossip_items = new Array(); //gossip_menu_option_info
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_gossip_message.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //NPC ID
        self.npcid = this.input.readUint32();
        //npc模版id
        self.npc_entry = this.input.readUint32();
        //闲聊素材表id
        self.option_id = this.input.readUint32();
        //闲聊文本
        self.option_text = this.input.readString();
        //闲聊列表
        if (self.gossip_items.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _gossip_items = new gossip_menu_option_info;
            _gossip_items.read(this.input);
            self.gossip_items.push(_gossip_items);
        }
    };
    s2c_gossip_message.param_count = 5;
    s2c_gossip_message.optname = "onGossip_message";
    return s2c_gossip_message;
}());
var c2s_questgiver_status_query = /** @class */ (function () {
    function c2s_questgiver_status_query() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_questgiver_status_query.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //NPC GUID
        self.guid = this.input.readUint32();
    };
    c2s_questgiver_status_query.param_count = 1;
    c2s_questgiver_status_query.optname = "onQuestgiver_status_query";
    return c2s_questgiver_status_query;
}());
var s2c_questgiver_status = /** @class */ (function () {
    function s2c_questgiver_status() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_questgiver_status.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //NPC GUI
        self.guid = this.input.readUint32();
        //状态
        self.status = this.input.readUint8();
    };
    s2c_questgiver_status.param_count = 2;
    s2c_questgiver_status.optname = "onQuestgiver_status";
    return s2c_questgiver_status;
}());
var both_query_quest_status = /** @class */ (function () {
    function both_query_quest_status() {
        this.optcode = 0;
        /**
         *
         */
        this.quest_array = new Array(); //quest_status
    }
    /**
     从输入二进制流中读取结构体
     */
    both_query_quest_status.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //
        if (self.quest_array.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _quest_array = new quest_status;
            _quest_array.read(this.input);
            self.quest_array.push(_quest_array);
        }
    };
    both_query_quest_status.param_count = 1;
    both_query_quest_status.optname = "onQuery_quest_status";
    return both_query_quest_status;
}());
var c2s_questhelp_get_canaccept_list = /** @class */ (function () {
    function c2s_questhelp_get_canaccept_list() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_questhelp_get_canaccept_list.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_questhelp_get_canaccept_list.param_count = 0;
    c2s_questhelp_get_canaccept_list.optname = "onQuesthelp_get_canaccept_list";
    return c2s_questhelp_get_canaccept_list;
}());
var s2c_questhelp_canaccept_list = /** @class */ (function () {
    function s2c_questhelp_canaccept_list() {
        this.optcode = 0;
        /**
         * 任务列表
         */
        this.quests = new Array(); //uint32
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_questhelp_canaccept_list.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //任务列表
        self.quests.length = 0; //清空数组				
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            self.quests.push(this.input.readUint32());
        }
    };
    s2c_questhelp_canaccept_list.param_count = 1;
    s2c_questhelp_canaccept_list.optname = "onQuesthelp_canaccept_list";
    return s2c_questhelp_canaccept_list;
}());
var s2c_questupdate_faild = /** @class */ (function () {
    function s2c_questupdate_faild() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_questupdate_faild.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //失败原因
        self.reason = this.input.readUint8();
    };
    s2c_questupdate_faild.param_count = 1;
    s2c_questupdate_faild.optname = "onQuestupdate_faild";
    return s2c_questupdate_faild;
}());
var s2c_questupdate_complete = /** @class */ (function () {
    function s2c_questupdate_complete() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_questupdate_complete.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //任务ID
        self.quest_id = this.input.readUint32();
    };
    s2c_questupdate_complete.param_count = 1;
    s2c_questupdate_complete.optname = "onQuestupdate_complete";
    return s2c_questupdate_complete;
}());
var c2s_questlog_remove_quest = /** @class */ (function () {
    function c2s_questlog_remove_quest() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_questlog_remove_quest.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //任务下标位置
        self.slot = this.input.readUint8();
        //保留
        self.reserve = this.input.readUint64();
    };
    c2s_questlog_remove_quest.param_count = 2;
    c2s_questlog_remove_quest.optname = "onQuestlog_remove_quest";
    return c2s_questlog_remove_quest;
}());
var c2s_questgiver_complete_quest = /** @class */ (function () {
    function c2s_questgiver_complete_quest() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_questgiver_complete_quest.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //NPC_GUID
        self.guid = this.input.readUint32();
        //任务ID
        self.quest_id = this.input.readUint32();
        //选择奖励项
        self.reward = this.input.readUint8();
    };
    c2s_questgiver_complete_quest.param_count = 3;
    c2s_questgiver_complete_quest.optname = "onQuestgiver_complete_quest";
    return c2s_questgiver_complete_quest;
}());
var s2c_questhelp_next = /** @class */ (function () {
    function s2c_questhelp_next() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_questhelp_next.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //当前任务
        self.current_id = this.input.readUint32();
        //下一个任务
        self.next_id = this.input.readUint32();
        //NPC_GUID
        self.guid = this.input.readUint32();
    };
    s2c_questhelp_next.param_count = 3;
    s2c_questhelp_next.optname = "onQuesthelp_next";
    return s2c_questhelp_next;
}());
var c2s_questhelp_complete = /** @class */ (function () {
    function c2s_questhelp_complete() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_questhelp_complete.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //任务ID
        self.quest_id = this.input.readUint32();
        //任务
        self.quest_statue = this.input.readUint8();
        //保留
        self.reserve = this.input.readUint8();
    };
    c2s_questhelp_complete.param_count = 3;
    c2s_questhelp_complete.optname = "onQuesthelp_complete";
    return c2s_questhelp_complete;
}());
var s2c_questupdate_accept = /** @class */ (function () {
    function s2c_questupdate_accept() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_questupdate_accept.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //任务ID
        self.quest_id = this.input.readUint32();
    };
    s2c_questupdate_accept.param_count = 1;
    s2c_questupdate_accept.optname = "onQuestupdate_accept";
    return s2c_questupdate_accept;
}());
var c2s_questhelp_update_status = /** @class */ (function () {
    function c2s_questhelp_update_status() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_questhelp_update_status.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //任务ID
        self.quest_id = this.input.readUint32();
        //下标ID
        self.slot_id = this.input.readUint32();
        //增加数量
        self.num = this.input.readUint32();
    };
    c2s_questhelp_update_status.param_count = 3;
    c2s_questhelp_update_status.optname = "onQuesthelp_update_status";
    return c2s_questhelp_update_status;
}());
var s2c_questgetter_complete = /** @class */ (function () {
    function s2c_questgetter_complete() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_questgetter_complete.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //任务ID
        self.quest_id = this.input.readUint32();
    };
    s2c_questgetter_complete.param_count = 1;
    s2c_questgetter_complete.optname = "onQuestgetter_complete";
    return s2c_questgetter_complete;
}());
var c2s_questgiver_accept_quest = /** @class */ (function () {
    function c2s_questgiver_accept_quest() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_questgiver_accept_quest.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //npcGUID
        self.npcid = this.input.readUint32();
        //
        self.quest_id = this.input.readUint32();
    };
    c2s_questgiver_accept_quest.param_count = 2;
    c2s_questgiver_accept_quest.optname = "onQuestgiver_accept_quest";
    return c2s_questgiver_accept_quest;
}());
var c2s_questupdate_use_item = /** @class */ (function () {
    function c2s_questupdate_use_item() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_questupdate_use_item.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //任务物品ID
        self.item_id = this.input.readUint32();
    };
    c2s_questupdate_use_item.param_count = 1;
    c2s_questupdate_use_item.optname = "onQuestupdate_use_item";
    return c2s_questupdate_use_item;
}());
var c2s_questhelp_query_book = /** @class */ (function () {
    function c2s_questhelp_query_book() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_questhelp_query_book.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //朝代
        self.dynasty = this.input.readUint32();
    };
    c2s_questhelp_query_book.param_count = 1;
    c2s_questhelp_query_book.optname = "onQuesthelp_query_book";
    return c2s_questhelp_query_book;
}());
var s2c_questhelp_book_quest = /** @class */ (function () {
    function s2c_questhelp_book_quest() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_questhelp_book_quest.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //任务ID
        self.quest_id = this.input.readUint32();
    };
    s2c_questhelp_book_quest.param_count = 1;
    s2c_questhelp_book_quest.optname = "onQuesthelp_book_quest";
    return s2c_questhelp_book_quest;
}());
var s2c_use_gameobject_action = /** @class */ (function () {
    function s2c_use_gameobject_action() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_use_gameobject_action.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //玩家ID
        self.player_id = this.input.readUint32();
        //游戏对象ID
        self.gameobject_id = this.input.readUint32();
    };
    s2c_use_gameobject_action.param_count = 2;
    s2c_use_gameobject_action.optname = "onUse_gameobject_action";
    return s2c_use_gameobject_action;
}());
var c2s_set_attack_mode = /** @class */ (function () {
    function c2s_set_attack_mode() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_set_attack_mode.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //模式
        self.mode = this.input.readUint8();
        //保留
        self.reserve = this.input.readUint64();
    };
    c2s_set_attack_mode.param_count = 2;
    c2s_set_attack_mode.optname = "onSet_attack_mode";
    return c2s_set_attack_mode;
}());
var both_select_target = /** @class */ (function () {
    function both_select_target() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    both_select_target.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //目标GUID
        self.id = this.input.readUint32();
    };
    both_select_target.param_count = 1;
    both_select_target.optname = "onSelect_target";
    return both_select_target;
}());
var s2c_combat_state_update = /** @class */ (function () {
    function s2c_combat_state_update() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_combat_state_update.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //当前状态 0：脱离战斗 1：进入战斗
        self.cur_state = this.input.readUint8();
    };
    s2c_combat_state_update.param_count = 1;
    s2c_combat_state_update.optname = "onCombat_state_update";
    return s2c_combat_state_update;
}());
var s2c_exp_update = /** @class */ (function () {
    function s2c_exp_update() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_exp_update.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //改变的经验
        self.exp = this.input.readInt32();
        //加成
        self.added = this.input.readUint8();
    };
    s2c_exp_update.param_count = 2;
    s2c_exp_update.optname = "onExp_update";
    return s2c_exp_update;
}());
var both_spell_start = /** @class */ (function () {
    function both_spell_start() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    both_spell_start.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //技能ID
        self.spell_id = this.input.readUint32();
        //
        self.target_pos_x = this.input.readUint16();
        //
        self.target_pos_y = this.input.readUint16();
        //
        self.caster = this.input.readUint32();
        //目标
        self.target = this.input.readUint32();
    };
    both_spell_start.param_count = 5;
    both_spell_start.optname = "onSpell_start";
    return both_spell_start;
}());
var both_spell_stop = /** @class */ (function () {
    function both_spell_stop() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    both_spell_stop.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //停止施法者
        self.guid = this.input.readString();
    };
    both_spell_stop.param_count = 1;
    both_spell_stop.optname = "onSpell_stop";
    return both_spell_stop;
}());
var both_jump = /** @class */ (function () {
    function both_jump() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    both_jump.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //跳的对象
        self.guid = this.input.readUint32();
        //目的地坐标
        self.pos_x = this.input.readFloat();
        //
        self.pos_y = this.input.readFloat();
    };
    both_jump.param_count = 3;
    both_jump.optname = "onJump";
    return both_jump;
}());
var c2s_resurrection = /** @class */ (function () {
    function c2s_resurrection() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_resurrection.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //0:原地复活 1:回城复活
        self.type = this.input.readUint8();
        //保留
        self.reserve = this.input.readUint64();
    };
    c2s_resurrection.param_count = 2;
    c2s_resurrection.optname = "onResurrection";
    return c2s_resurrection;
}());
var both_trade_request = /** @class */ (function () {
    function both_trade_request() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    both_trade_request.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //被请求人guid
        self.guid = this.input.readString();
    };
    both_trade_request.param_count = 1;
    both_trade_request.optname = "onTrade_request";
    return both_trade_request;
}());
var both_trade_reply = /** @class */ (function () {
    function both_trade_reply() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    both_trade_reply.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //请求交易的人guid
        self.guid = this.input.readString();
        //0:拒绝1:接受
        self.reply = this.input.readUint8();
    };
    both_trade_reply.param_count = 2;
    both_trade_reply.optname = "onTrade_reply";
    return both_trade_reply;
}());
var s2c_trade_start = /** @class */ (function () {
    function s2c_trade_start() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_trade_start.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //你的交易目标
        self.guid = this.input.readString();
    };
    s2c_trade_start.param_count = 1;
    s2c_trade_start.optname = "onTrade_start";
    return s2c_trade_start;
}());
var both_trade_decide_items = /** @class */ (function () {
    function both_trade_decide_items() {
        this.optcode = 0;
        /**
         * 确认交易的物品
         */
        this.items = new Array(); //String
    }
    /**
     从输入二进制流中读取结构体
     */
    both_trade_decide_items.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //确认交易的物品
        self.items.length = 0; //清空数组				
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            self.items.push(this.input.readString());
        }
        //元宝
        self.gold_ingot = this.input.readInt32();
        //银子
        self.silver = this.input.readInt32();
    };
    both_trade_decide_items.param_count = 3;
    both_trade_decide_items.optname = "onTrade_decide_items";
    return both_trade_decide_items;
}());
var s2c_trade_finish = /** @class */ (function () {
    function s2c_trade_finish() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_trade_finish.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    s2c_trade_finish.param_count = 0;
    s2c_trade_finish.optname = "onTrade_finish";
    return s2c_trade_finish;
}());
var both_trade_cancel = /** @class */ (function () {
    function both_trade_cancel() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    both_trade_cancel.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    both_trade_cancel.param_count = 0;
    both_trade_cancel.optname = "onTrade_cancel";
    return both_trade_cancel;
}());
var both_trade_ready = /** @class */ (function () {
    function both_trade_ready() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    both_trade_ready.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    both_trade_ready.param_count = 0;
    both_trade_ready.optname = "onTrade_ready";
    return both_trade_ready;
}());
var s2c_chat_unit_talk = /** @class */ (function () {
    function s2c_chat_unit_talk() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_chat_unit_talk.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //发言者id
        self.guid = this.input.readUint32();
        //发言内容摸版id
        self.content = this.input.readUint32();
        //发言字符
        self.say = this.input.readString();
    };
    s2c_chat_unit_talk.param_count = 3;
    s2c_chat_unit_talk.optname = "onChat_unit_talk";
    return s2c_chat_unit_talk;
}());
var c2s_chat_near = /** @class */ (function () {
    function c2s_chat_near() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_chat_near.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //发言内容
        self.content = this.input.readString();
    };
    c2s_chat_near.param_count = 1;
    c2s_chat_near.optname = "onChat_near";
    return c2s_chat_near;
}());
var c2s_chat_whisper = /** @class */ (function () {
    function c2s_chat_whisper() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_chat_whisper.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //玩家id
        self.guid = this.input.readString();
        //说话内容
        self.content = this.input.readString();
    };
    c2s_chat_whisper.param_count = 2;
    c2s_chat_whisper.optname = "onChat_whisper";
    return c2s_chat_whisper;
}());
var both_chat_faction = /** @class */ (function () {
    function both_chat_faction() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    both_chat_faction.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //玩家id
        self.guid = this.input.readString();
        //玩家名称
        self.name = this.input.readString();
        //说话内容
        self.content = this.input.readString();
        //玩家阵营
        self.faction = this.input.readUint8();
    };
    both_chat_faction.param_count = 4;
    both_chat_faction.optname = "onChat_faction";
    return both_chat_faction;
}());
var both_chat_world = /** @class */ (function () {
    function both_chat_world() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    both_chat_world.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //玩家guid
        self.guid = this.input.readString();
        //玩家阵营
        self.faction = this.input.readUint8();
        //玩家名称
        self.name = this.input.readString();
        //说话内容
        self.content = this.input.readString();
    };
    both_chat_world.param_count = 4;
    both_chat_world.optname = "onChat_world";
    return both_chat_world;
}());
var both_chat_horn = /** @class */ (function () {
    function both_chat_horn() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    both_chat_horn.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //玩家guid
        self.guid = this.input.readString();
        //玩家阵营
        self.faction = this.input.readUint8();
        //玩家名称
        self.name = this.input.readString();
        //说话内容
        self.content = this.input.readString();
    };
    both_chat_horn.param_count = 4;
    both_chat_horn.optname = "onChat_horn";
    return both_chat_horn;
}());
var both_chat_notice = /** @class */ (function () {
    function both_chat_notice() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    both_chat_notice.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //公告id
        self.id = this.input.readUint32();
        //公告内容
        self.content = this.input.readString();
        //预留参数
        self.data = this.input.readString();
    };
    both_chat_notice.param_count = 3;
    both_chat_notice.optname = "onChat_notice";
    return both_chat_notice;
}());
var c2s_query_player_info = /** @class */ (function () {
    function c2s_query_player_info() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_query_player_info.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //玩家guid
        self.guid = this.input.readString();
        //每一位表示玩家各种信息
        self.flag = this.input.readUint32();
        //回调ID
        self.callback_id = this.input.readUint32();
    };
    c2s_query_player_info.param_count = 3;
    c2s_query_player_info.optname = "onQuery_player_info";
    return c2s_query_player_info;
}());
var s2c_query_result_update_object = /** @class */ (function () {
    function s2c_query_result_update_object() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_query_result_update_object.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    s2c_query_result_update_object.param_count = 0;
    s2c_query_result_update_object.optname = "onQuery_result_update_object";
    return s2c_query_result_update_object;
}());
var c2s_receive_gift_packs = /** @class */ (function () {
    function c2s_receive_gift_packs() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_receive_gift_packs.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_receive_gift_packs.param_count = 0;
    c2s_receive_gift_packs.optname = "onReceive_gift_packs";
    return c2s_receive_gift_packs;
}());
var s2c_map_update_object = /** @class */ (function () {
    function s2c_map_update_object() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_map_update_object.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    s2c_map_update_object.param_count = 0;
    s2c_map_update_object.optname = "onMap_update_object";
    return s2c_map_update_object;
}());
var s2c_fighting_info_update_object = /** @class */ (function () {
    function s2c_fighting_info_update_object() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_fighting_info_update_object.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    s2c_fighting_info_update_object.param_count = 0;
    s2c_fighting_info_update_object.optname = "onFighting_info_update_object";
    return s2c_fighting_info_update_object;
}());
var s2c_fighting_info_update_object_2 = /** @class */ (function () {
    function s2c_fighting_info_update_object_2() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_fighting_info_update_object_2.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    s2c_fighting_info_update_object_2.param_count = 0;
    s2c_fighting_info_update_object_2.optname = "onFighting_info_update_object_2";
    return s2c_fighting_info_update_object_2;
}());
var c2s_instance_enter = /** @class */ (function () {
    function c2s_instance_enter() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_instance_enter.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //副本ID
        self.instance_id = this.input.readUint32();
    };
    c2s_instance_enter.param_count = 1;
    c2s_instance_enter.optname = "onInstance_enter";
    return c2s_instance_enter;
}());
var c2s_instance_next_state = /** @class */ (function () {
    function c2s_instance_next_state() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_instance_next_state.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //进入关卡
        self.level = this.input.readUint16();
        //预留参数
        self.param = this.input.readUint32();
    };
    c2s_instance_next_state.param_count = 2;
    c2s_instance_next_state.optname = "onInstance_next_state";
    return c2s_instance_next_state;
}());
var c2s_instance_exit = /** @class */ (function () {
    function c2s_instance_exit() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_instance_exit.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //保留
        self.reserve = this.input.readUint32();
    };
    c2s_instance_exit.param_count = 1;
    c2s_instance_exit.optname = "onInstance_exit";
    return c2s_instance_exit;
}());
var c2s_limit_activity_receive = /** @class */ (function () {
    function c2s_limit_activity_receive() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_limit_activity_receive.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //领取id
        self.id = this.input.readUint32();
        //领取类型
        self.type = this.input.readUint32();
    };
    c2s_limit_activity_receive.param_count = 2;
    c2s_limit_activity_receive.optname = "onLimit_activity_receive";
    return c2s_limit_activity_receive;
}());
var s2c_kill_man = /** @class */ (function () {
    function s2c_kill_man() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_kill_man.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //杀人者
        self.killer = this.input.readString();
        //杀人者名字
        self.killer_name = this.input.readString();
        //被杀者
        self.victim = this.input.readString();
        //被杀者名字
        self.victim_name = this.input.readString();
    };
    s2c_kill_man.param_count = 4;
    s2c_kill_man.optname = "onKill_man";
    return s2c_kill_man;
}());
var s2c_player_upgrade = /** @class */ (function () {
    function s2c_player_upgrade() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_player_upgrade.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //升级的玩家低位GUID
        self.guid = this.input.readUint32();
    };
    s2c_player_upgrade.param_count = 1;
    s2c_player_upgrade.optname = "onPlayer_upgrade";
    return s2c_player_upgrade;
}());
var c2s_warehouse_save_money = /** @class */ (function () {
    function c2s_warehouse_save_money() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_warehouse_save_money.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //多少钱
        self.money = this.input.readInt32();
        //多少元宝
        self.money_gold = this.input.readInt32();
        //多少银票
        self.money_bills = this.input.readInt32();
    };
    c2s_warehouse_save_money.param_count = 3;
    c2s_warehouse_save_money.optname = "onWarehouse_save_money";
    return c2s_warehouse_save_money;
}());
var c2s_warehouse_take_money = /** @class */ (function () {
    function c2s_warehouse_take_money() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_warehouse_take_money.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //多少钱
        self.money = this.input.readInt32();
        //多少元宝
        self.money_gold = this.input.readInt32();
        //多少银票
        self.money_bills = this.input.readInt32();
    };
    c2s_warehouse_take_money.param_count = 3;
    c2s_warehouse_take_money.optname = "onWarehouse_take_money";
    return c2s_warehouse_take_money;
}());
var c2s_use_gold_opt = /** @class */ (function () {
    function c2s_use_gold_opt() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_use_gold_opt.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //操作类型
        self.type = this.input.readUint8();
        //字符串
        self.param = this.input.readString();
    };
    c2s_use_gold_opt.param_count = 2;
    c2s_use_gold_opt.optname = "onUse_gold_opt";
    return c2s_use_gold_opt;
}());
var c2s_use_silver_opt = /** @class */ (function () {
    function c2s_use_silver_opt() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_use_silver_opt.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //使用铜钱类型
        self.type = this.input.readUint8();
    };
    c2s_use_silver_opt.param_count = 1;
    c2s_use_silver_opt.optname = "onUse_silver_opt";
    return c2s_use_silver_opt;
}());
var s2c_gm_rightfloat = /** @class */ (function () {
    function s2c_gm_rightfloat() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_gm_rightfloat.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //ID
        self.id = this.input.readUint32();
        //结束时间
        self.end_time = this.input.readUint32();
        //0-7点
        self.zone1 = this.input.readUint32();
        //8-13点
        self.zone2 = this.input.readUint32();
        //14-23点
        self.zone3 = this.input.readUint32();
        //标题
        self.subject = this.input.readString();
        //内容
        self.content = this.input.readString();
        //链接地址
        self.link = this.input.readString();
        //模式 0:根据zone1，zone2，zone3设置的时间段弹 1:进入游戏1分钟后弹
        self.mode = this.input.readUint8();
    };
    s2c_gm_rightfloat.param_count = 9;
    s2c_gm_rightfloat.optname = "onGm_rightfloat";
    return s2c_gm_rightfloat;
}());
var s2c_del_gm_rightfloat = /** @class */ (function () {
    function s2c_del_gm_rightfloat() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_del_gm_rightfloat.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //ID
        self.id = this.input.readUint32();
    };
    s2c_del_gm_rightfloat.param_count = 1;
    s2c_del_gm_rightfloat.optname = "onDel_gm_rightfloat";
    return s2c_del_gm_rightfloat;
}());
var both_sync_mstime_app = /** @class */ (function () {
    function both_sync_mstime_app() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    both_sync_mstime_app.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //服务器运行的毫秒数
        self.mstime_now = this.input.readUint32();
        //自然时间
        self.time_now = this.input.readUint32();
        //自然时间的服务器启动时间
        self.open_time = this.input.readUint32();
    };
    both_sync_mstime_app.param_count = 3;
    both_sync_mstime_app.optname = "onSync_mstime_app";
    return both_sync_mstime_app;
}());
var c2s_open_window = /** @class */ (function () {
    function c2s_open_window() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_open_window.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //窗口类型
        self.window_type = this.input.readUint32();
    };
    c2s_open_window.param_count = 1;
    c2s_open_window.optname = "onOpen_window";
    return c2s_open_window;
}());
var c2s_player_gag = /** @class */ (function () {
    function c2s_player_gag() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_player_gag.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //玩家ID
        self.player_id = this.input.readString();
        //结束时间
        self.end_time = this.input.readUint32();
        //禁言理由
        self.content = this.input.readString();
    };
    c2s_player_gag.param_count = 3;
    c2s_player_gag.optname = "onPlayer_gag";
    return c2s_player_gag;
}());
var c2s_player_kicking = /** @class */ (function () {
    function c2s_player_kicking() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_player_kicking.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //玩家ID
        self.player_id = this.input.readString();
    };
    c2s_player_kicking.param_count = 1;
    c2s_player_kicking.optname = "onPlayer_kicking";
    return c2s_player_kicking;
}());
var s2c_merge_server_msg = /** @class */ (function () {
    function s2c_merge_server_msg() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_merge_server_msg.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //合服域名
        self.merge_host = this.input.readString();
        //合服端口
        self.merge_port = this.input.readUint32();
        //合服sessionkey
        self.merge_key = this.input.readString();
        //合服类型
        self.merge_type = this.input.readUint32();
        //预留
        self.reserve = this.input.readUint32();
        //预留2
        self.reserve2 = this.input.readUint32();
    };
    s2c_merge_server_msg.param_count = 6;
    s2c_merge_server_msg.optname = "onMerge_server_msg";
    return s2c_merge_server_msg;
}());
var c2s_rank_list_query = /** @class */ (function () {
    function c2s_rank_list_query() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_rank_list_query.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //回调号
        self.call_back_id = this.input.readUint32();
        //排行类型
        self.rank_list_type = this.input.readUint8();
        //开始
        self.start_index = this.input.readUint16();
        //结束
        self.end_index = this.input.readUint16();
    };
    c2s_rank_list_query.param_count = 4;
    c2s_rank_list_query.optname = "onRank_list_query";
    return c2s_rank_list_query;
}());
var s2c_rank_list_query_result = /** @class */ (function () {
    function s2c_rank_list_query_result() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_rank_list_query_result.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    s2c_rank_list_query_result.param_count = 0;
    s2c_rank_list_query_result.optname = "onRank_list_query_result";
    return s2c_rank_list_query_result;
}());
var c2s_client_update_scened = /** @class */ (function () {
    function c2s_client_update_scened() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_client_update_scened.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_client_update_scened.param_count = 0;
    c2s_client_update_scened.optname = "onClient_update_scened";
    return c2s_client_update_scened;
}());
var s2c_num_lua = /** @class */ (function () {
    function s2c_num_lua() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_num_lua.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    s2c_num_lua.param_count = 0;
    s2c_num_lua.optname = "onNum_lua";
    return s2c_num_lua;
}());
var c2s_loot_select = /** @class */ (function () {
    function c2s_loot_select() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_loot_select.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //x
        self.x = this.input.readUint16();
        //y
        self.y = this.input.readUint16();
    };
    c2s_loot_select.param_count = 2;
    c2s_loot_select.optname = "onLoot_select";
    return c2s_loot_select;
}());
var c2s_goback_to_game_server = /** @class */ (function () {
    function c2s_goback_to_game_server() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_goback_to_game_server.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_goback_to_game_server.param_count = 0;
    c2s_goback_to_game_server.optname = "onGoback_to_game_server";
    return c2s_goback_to_game_server;
}());
var c2s_world_war_CS_player_info = /** @class */ (function () {
    function c2s_world_war_CS_player_info() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_world_war_CS_player_info.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_world_war_CS_player_info.param_count = 0;
    c2s_world_war_CS_player_info.optname = "onWorld_war_CS_player_info";
    return c2s_world_war_CS_player_info;
}());
var s2c_join_or_leave_server = /** @class */ (function () {
    function s2c_join_or_leave_server() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_join_or_leave_server.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //加入或者离开
        self.join_or_leave = this.input.readUint8();
        //服务器类型
        self.server_type = this.input.readUint8();
        //服务器进程id
        self.server_pid = this.input.readUint32();
        //服务器连接id
        self.server_fd = this.input.readUint32();
        //加入或者离开的时间点
        self.time = this.input.readUint32();
    };
    s2c_join_or_leave_server.param_count = 5;
    s2c_join_or_leave_server.optname = "onJoin_or_leave_server";
    return s2c_join_or_leave_server;
}());
var both_world_war_SC_player_info = /** @class */ (function () {
    function both_world_war_SC_player_info() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    both_world_war_SC_player_info.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    both_world_war_SC_player_info.param_count = 0;
    both_world_war_SC_player_info.optname = "onWorld_war_SC_player_info";
    return both_world_war_SC_player_info;
}());
var both_clientSubscription = /** @class */ (function () {
    function both_clientSubscription() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    both_clientSubscription.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //玩家guid
        self.guid = this.input.readUint32();
    };
    both_clientSubscription.param_count = 1;
    both_clientSubscription.optname = "onClientSubscription";
    return both_clientSubscription;
}());
var s2c_lua_script = /** @class */ (function () {
    function s2c_lua_script() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_lua_script.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    s2c_lua_script.param_count = 0;
    s2c_lua_script.optname = "onLua_script";
    return s2c_lua_script;
}());
var c2s_char_update_info = /** @class */ (function () {
    function c2s_char_update_info() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_char_update_info.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //角色更改信息
        self.info = new char_create_info;
        self.info.read(this.input);
    };
    c2s_char_update_info.param_count = 1;
    c2s_char_update_info.optname = "onChar_update_info";
    return c2s_char_update_info;
}());
var s2c_notice_watcher_map_info = /** @class */ (function () {
    function s2c_notice_watcher_map_info() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_notice_watcher_map_info.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //观察者guid
        self.wather_guid = this.input.readString();
        //地图id
        self.map_id = this.input.readUint32();
        //实例id
        self.instance_id = this.input.readUint32();
    };
    s2c_notice_watcher_map_info.param_count = 3;
    s2c_notice_watcher_map_info.optname = "onNotice_watcher_map_info";
    return s2c_notice_watcher_map_info;
}());
var c2s_modify_watch = /** @class */ (function () {
    function c2s_modify_watch() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_modify_watch.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //操作类型
        self.opt = this.input.readUint8();
        //修改对象订阅
        self.cid = this.input.readUint32();
        //订阅key
        self.key = this.input.readString();
    };
    c2s_modify_watch.param_count = 3;
    c2s_modify_watch.optname = "onModify_watch";
    return c2s_modify_watch;
}());
var c2s_kuafu_chuansong = /** @class */ (function () {
    function c2s_kuafu_chuansong() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_kuafu_chuansong.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //战斗信息
        self.str_data = this.input.readString();
        //观察者guid
        self.watcher_guid = this.input.readString();
        //预留参数
        self.reserve = this.input.readUint32();
    };
    c2s_kuafu_chuansong.param_count = 3;
    c2s_kuafu_chuansong.optname = "onKuafu_chuansong";
    return c2s_kuafu_chuansong;
}());
var c2s_show_suit = /** @class */ (function () {
    function c2s_show_suit() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_show_suit.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //主背包位置
        self.position = this.input.readUint8();
    };
    c2s_show_suit.param_count = 1;
    c2s_show_suit.optname = "onShow_suit";
    return c2s_show_suit;
}());
var c2s_show_position = /** @class */ (function () {
    function c2s_show_position() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_show_position.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //频道id
        self.channel = this.input.readUint8();
    };
    c2s_show_position.param_count = 1;
    c2s_show_position.optname = "onShow_position";
    return c2s_show_position;
}());
var c2s_gold_respawn = /** @class */ (function () {
    function c2s_gold_respawn() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_gold_respawn.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //是否使用元宝
        self.useGold = this.input.readUint8();
    };
    c2s_gold_respawn.param_count = 1;
    c2s_gold_respawn.optname = "onGold_respawn";
    return c2s_gold_respawn;
}());
var s2c_field_death_cooldown = /** @class */ (function () {
    function s2c_field_death_cooldown() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_field_death_cooldown.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //原地复活类型&0:元宝&1:时间戳
        self.type = this.input.readUint8();
        //时间戳或者元宝值
        self.value = this.input.readUint32();
        //杀人者名字
        self.killername = this.input.readString();
        //自动复活倒计时
        self.cooldown = this.input.readUint16();
        //参数
        self.params = this.input.readString();
    };
    s2c_field_death_cooldown.param_count = 5;
    s2c_field_death_cooldown.optname = "onField_death_cooldown";
    return s2c_field_death_cooldown;
}());
var c2s_mall_buy = /** @class */ (function () {
    function c2s_mall_buy() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_mall_buy.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //商品序列号
        self.id = this.input.readUint32();
        //商品数量
        self.count = this.input.readUint32();
        //时效ID
        self.time = this.input.readUint32();
    };
    c2s_mall_buy.param_count = 3;
    c2s_mall_buy.optname = "onMall_buy";
    return c2s_mall_buy;
}());
var c2s_strength = /** @class */ (function () {
    function c2s_strength() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_strength.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //强化的位置
        self.part = this.input.readUint8();
    };
    c2s_strength.param_count = 1;
    c2s_strength.optname = "onStrength";
    return c2s_strength;
}());
var s2c_strength_success = /** @class */ (function () {
    function s2c_strength_success() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_strength_success.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //当前强化等级
        self.level = this.input.readUint16();
    };
    s2c_strength_success.param_count = 1;
    s2c_strength_success.optname = "onStrength_success";
    return s2c_strength_success;
}());
var c2s_forceInto = /** @class */ (function () {
    function c2s_forceInto() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_forceInto.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_forceInto.param_count = 0;
    c2s_forceInto.optname = "onForceInto";
    return c2s_forceInto;
}());
var c2s_create_faction = /** @class */ (function () {
    function c2s_create_faction() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_create_faction.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //帮派名称
        self.name = this.input.readString();
        //icon
        self.icon = this.input.readUint8();
    };
    c2s_create_faction.param_count = 2;
    c2s_create_faction.optname = "onCreate_faction";
    return c2s_create_faction;
}());
var c2s_faction_upgrade = /** @class */ (function () {
    function c2s_faction_upgrade() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_faction_upgrade.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_faction_upgrade.param_count = 0;
    c2s_faction_upgrade.optname = "onFaction_upgrade";
    return c2s_faction_upgrade;
}());
var c2s_faction_join = /** @class */ (function () {
    function c2s_faction_join() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_faction_join.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //帮派guid
        self.id = this.input.readString();
    };
    c2s_faction_join.param_count = 1;
    c2s_faction_join.optname = "onFaction_join";
    return c2s_faction_join;
}());
var c2s_raise_base_spell = /** @class */ (function () {
    function c2s_raise_base_spell() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_raise_base_spell.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //技能类型
        self.raiseType = this.input.readUint8();
        //技能ID
        self.spellId = this.input.readUint16();
    };
    c2s_raise_base_spell.param_count = 2;
    c2s_raise_base_spell.optname = "onRaise_base_spell";
    return c2s_raise_base_spell;
}());
var c2s_upgrade_anger_spell = /** @class */ (function () {
    function c2s_upgrade_anger_spell() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_upgrade_anger_spell.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //技能ID
        self.spellId = this.input.readUint16();
    };
    c2s_upgrade_anger_spell.param_count = 1;
    c2s_upgrade_anger_spell.optname = "onUpgrade_anger_spell";
    return c2s_upgrade_anger_spell;
}());
var c2s_raise_mount = /** @class */ (function () {
    function c2s_raise_mount() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_raise_mount.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_raise_mount.param_count = 0;
    c2s_raise_mount.optname = "onRaise_mount";
    return c2s_raise_mount;
}());
var c2s_upgrade_mount = /** @class */ (function () {
    function c2s_upgrade_mount() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_upgrade_mount.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //是否自动使用道具
        self.useItem = this.input.readUint8();
    };
    c2s_upgrade_mount.param_count = 1;
    c2s_upgrade_mount.optname = "onUpgrade_mount";
    return c2s_upgrade_mount;
}());
var c2s_upgrade_mount_one_step = /** @class */ (function () {
    function c2s_upgrade_mount_one_step() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_upgrade_mount_one_step.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //是否自动使用道具
        self.useItem = this.input.readUint8();
    };
    c2s_upgrade_mount_one_step.param_count = 1;
    c2s_upgrade_mount_one_step.optname = "onUpgrade_mount_one_step";
    return c2s_upgrade_mount_one_step;
}());
var c2s_illusion_mount_active = /** @class */ (function () {
    function c2s_illusion_mount_active() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_illusion_mount_active.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //幻化坐骑ID
        self.illuId = this.input.readUint16();
    };
    c2s_illusion_mount_active.param_count = 1;
    c2s_illusion_mount_active.optname = "onIllusion_mount_active";
    return c2s_illusion_mount_active;
}());
var c2s_illusion_mount = /** @class */ (function () {
    function c2s_illusion_mount() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_illusion_mount.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //幻化坐骑ID
        self.illuId = this.input.readUint16();
    };
    c2s_illusion_mount.param_count = 1;
    c2s_illusion_mount.optname = "onIllusion_mount";
    return c2s_illusion_mount;
}());
var c2s_ride_mount = /** @class */ (function () {
    function c2s_ride_mount() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_ride_mount.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //1:上&0:下
        self.oper = this.input.readUint8();
    };
    c2s_ride_mount.param_count = 1;
    c2s_ride_mount.optname = "onRide_mount";
    return c2s_ride_mount;
}());
var s2c_grid_unit_jump = /** @class */ (function () {
    function s2c_grid_unit_jump() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_grid_unit_jump.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    s2c_grid_unit_jump.param_count = 0;
    s2c_grid_unit_jump.optname = "onGrid_unit_jump";
    return s2c_grid_unit_jump;
}());
var c2s_gem = /** @class */ (function () {
    function c2s_gem() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_gem.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //宝石位置
        self.part = this.input.readUint8();
    };
    c2s_gem.param_count = 1;
    c2s_gem.optname = "onGem";
    return c2s_gem;
}());
var c2s_change_battle_mode = /** @class */ (function () {
    function c2s_change_battle_mode() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_change_battle_mode.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //需要切换的模式
        self.mode = this.input.readUint8();
    };
    c2s_change_battle_mode.param_count = 1;
    c2s_change_battle_mode.optname = "onChange_battle_mode";
    return c2s_change_battle_mode;
}());
var s2c_peace_mode_cd = /** @class */ (function () {
    function s2c_peace_mode_cd() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_peace_mode_cd.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //和平模式CD
        self.mode = this.input.readUint8();
    };
    s2c_peace_mode_cd.param_count = 1;
    s2c_peace_mode_cd.optname = "onPeace_mode_cd";
    return s2c_peace_mode_cd;
}());
var c2s_divine_active = /** @class */ (function () {
    function c2s_divine_active() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_divine_active.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //神兵ID
        self.id = this.input.readUint8();
    };
    c2s_divine_active.param_count = 1;
    c2s_divine_active.optname = "onDivine_active";
    return c2s_divine_active;
}());
var c2s_divine_uplev = /** @class */ (function () {
    function c2s_divine_uplev() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_divine_uplev.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //神兵ID
        self.id = this.input.readUint8();
    };
    c2s_divine_uplev.param_count = 1;
    c2s_divine_uplev.optname = "onDivine_uplev";
    return c2s_divine_uplev;
}());
var c2s_divine_switch = /** @class */ (function () {
    function c2s_divine_switch() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_divine_switch.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //神兵ID
        self.id = this.input.readUint8();
    };
    c2s_divine_switch.param_count = 1;
    c2s_divine_switch.optname = "onDivine_switch";
    return c2s_divine_switch;
}());
var c2s_jump_start = /** @class */ (function () {
    function c2s_jump_start() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_jump_start.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //坐标x
        self.pos_x = this.input.readUint16();
        //坐标x
        self.pos_y = this.input.readUint16();
    };
    c2s_jump_start.param_count = 2;
    c2s_jump_start.optname = "onJump_start";
    return c2s_jump_start;
}());
var c2s_enter_vip_instance = /** @class */ (function () {
    function c2s_enter_vip_instance() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_enter_vip_instance.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //vip副本序号id
        self.id = this.input.readUint16();
        //vip副本难度
        self.hard = this.input.readUint8();
    };
    c2s_enter_vip_instance.param_count = 2;
    c2s_enter_vip_instance.optname = "onEnter_vip_instance";
    return c2s_enter_vip_instance;
}());
var c2s_sweep_vip_instance = /** @class */ (function () {
    function c2s_sweep_vip_instance() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_sweep_vip_instance.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //vip副本序号id
        self.id = this.input.readUint16();
    };
    c2s_sweep_vip_instance.param_count = 1;
    c2s_sweep_vip_instance.optname = "onSweep_vip_instance";
    return c2s_sweep_vip_instance;
}());
var c2s_hang_up = /** @class */ (function () {
    function c2s_hang_up() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_hang_up.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_hang_up.param_count = 0;
    c2s_hang_up.optname = "onHang_up";
    return c2s_hang_up;
}());
var c2s_hang_up_setting = /** @class */ (function () {
    function c2s_hang_up_setting() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_hang_up_setting.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //同PLAYER_FIELD_HOOK_BYTE0
        self.value0 = this.input.readUint32();
        //同PLAYER_FIELD_HOOK_BYTE1
        self.value1 = this.input.readUint32();
        //同PLAYER_FIELD_HOOK_BYTE2
        self.value2 = this.input.readUint32();
        //同PLAYER_FIELD_HOOK_BYTE3
        self.value3 = this.input.readUint32();
    };
    c2s_hang_up_setting.param_count = 4;
    c2s_hang_up_setting.optname = "onHang_up_setting";
    return c2s_hang_up_setting;
}());
var c2s_enter_trial_instance = /** @class */ (function () {
    function c2s_enter_trial_instance() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_enter_trial_instance.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_enter_trial_instance.param_count = 0;
    c2s_enter_trial_instance.optname = "onEnter_trial_instance";
    return c2s_enter_trial_instance;
}());
var c2s_sweep_trial_instance = /** @class */ (function () {
    function c2s_sweep_trial_instance() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_sweep_trial_instance.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_sweep_trial_instance.param_count = 0;
    c2s_sweep_trial_instance.optname = "onSweep_trial_instance";
    return c2s_sweep_trial_instance;
}());
var c2s_reset_trial_instance = /** @class */ (function () {
    function c2s_reset_trial_instance() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_reset_trial_instance.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_reset_trial_instance.param_count = 0;
    c2s_reset_trial_instance.optname = "onReset_trial_instance";
    return c2s_reset_trial_instance;
}());
var s2c_sweep_instance_reward = /** @class */ (function () {
    function s2c_sweep_instance_reward() {
        this.optcode = 0;
        /**
         * 道具列表
         */
        this.list = new Array(); //item_reward_info
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_sweep_instance_reward.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //扫荡副本子类型
        self.inst_sub_type = this.input.readUint8();
        //扫荡副本数据1
        self.data1 = this.input.readUint8();
        //扫荡副本数据2
        self.data2 = this.input.readUint8();
        //扫荡副本数据3
        self.data3 = this.input.readUint8();
        //道具列表
        if (self.list.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _list = new item_reward_info;
            _list.read(this.input);
            self.list.push(_list);
        }
    };
    s2c_sweep_instance_reward.param_count = 5;
    s2c_sweep_instance_reward.optname = "onSweep_instance_reward";
    return s2c_sweep_instance_reward;
}());
var c2s_reenter_instance = /** @class */ (function () {
    function c2s_reenter_instance() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_reenter_instance.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_reenter_instance.param_count = 0;
    c2s_reenter_instance.optname = "onReenter_instance";
    return c2s_reenter_instance;
}());
var s2c_merry_go_round = /** @class */ (function () {
    function s2c_merry_go_round() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_merry_go_round.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    s2c_merry_go_round.param_count = 0;
    s2c_merry_go_round.optname = "onMerry_go_round";
    return s2c_merry_go_round;
}());
var c2s_social_add_friend = /** @class */ (function () {
    function c2s_social_add_friend() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_social_add_friend.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //好友GUID
        self.guid = this.input.readString();
    };
    c2s_social_add_friend.param_count = 1;
    c2s_social_add_friend.optname = "onSocial_add_friend";
    return c2s_social_add_friend;
}());
var c2s_social_sureadd_friend = /** @class */ (function () {
    function c2s_social_sureadd_friend() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_social_sureadd_friend.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //好友GUID
        self.guid = this.input.readString();
    };
    c2s_social_sureadd_friend.param_count = 1;
    c2s_social_sureadd_friend.optname = "onSocial_sureadd_friend";
    return c2s_social_sureadd_friend;
}());
var c2s_social_gift_friend = /** @class */ (function () {
    function c2s_social_gift_friend() {
        this.optcode = 0;
        /**
         * 礼物列表
         */
        this.gift = new Array(); //item_reward_info
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_social_gift_friend.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //好友GUID
        self.guid = this.input.readString();
        //礼物列表
        if (self.gift.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _gift = new item_reward_info;
            _gift.read(this.input);
            self.gift.push(_gift);
        }
    };
    c2s_social_gift_friend.param_count = 2;
    c2s_social_gift_friend.optname = "onSocial_gift_friend";
    return c2s_social_gift_friend;
}());
var c2s_social_recommend_friend = /** @class */ (function () {
    function c2s_social_recommend_friend() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_social_recommend_friend.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_social_recommend_friend.param_count = 0;
    c2s_social_recommend_friend.optname = "onSocial_recommend_friend";
    return c2s_social_recommend_friend;
}());
var s2c_social_get_recommend_friend = /** @class */ (function () {
    function s2c_social_get_recommend_friend() {
        this.optcode = 0;
        /**
         * 好友列表
         */
        this.list = new Array(); //social_friend_info
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_social_get_recommend_friend.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //好友列表
        if (self.list.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _list = new social_friend_info;
            _list.read(this.input);
            self.list.push(_list);
        }
    };
    s2c_social_get_recommend_friend.param_count = 1;
    s2c_social_get_recommend_friend.optname = "onSocial_get_recommend_friend";
    return s2c_social_get_recommend_friend;
}());
var c2s_social_revenge_enemy = /** @class */ (function () {
    function c2s_social_revenge_enemy() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_social_revenge_enemy.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //仇人GUID
        self.guid = this.input.readString();
    };
    c2s_social_revenge_enemy.param_count = 1;
    c2s_social_revenge_enemy.optname = "onSocial_revenge_enemy";
    return c2s_social_revenge_enemy;
}());
var c2s_social_del_friend = /** @class */ (function () {
    function c2s_social_del_friend() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_social_del_friend.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //好友GUID
        self.guid = this.input.readString();
    };
    c2s_social_del_friend.param_count = 1;
    c2s_social_del_friend.optname = "onSocial_del_friend";
    return c2s_social_del_friend;
}());
var c2s_teleport_main_city = /** @class */ (function () {
    function c2s_teleport_main_city() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_teleport_main_city.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_teleport_main_city.param_count = 0;
    c2s_teleport_main_city.optname = "onTeleport_main_city";
    return c2s_teleport_main_city;
}());
var c2s_chat_by_channel = /** @class */ (function () {
    function c2s_chat_by_channel() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_chat_by_channel.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //聊天频道
        self.channel = this.input.readUint8();
        //说话内容
        self.content = this.input.readString();
    };
    c2s_chat_by_channel.param_count = 2;
    c2s_chat_by_channel.optname = "onChat_by_channel";
    return c2s_chat_by_channel;
}());
var s2c_send_chat = /** @class */ (function () {
    function s2c_send_chat() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_send_chat.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //聊天频道
        self.channel = this.input.readUint8();
        //玩家guid
        self.guid = this.input.readString();
        //称号
        self.title = this.input.readUint8();
        //名字
        self.name = this.input.readString();
        //VIP
        self.vip = this.input.readUint8();
        //转生
        self.zs = this.input.readUint8();
        //等级
        self.lvl = this.input.readUint8();
        //头像
        self.gender = this.input.readUint8();
        //说话内容
        self.content = this.input.readString();
        //收到的guid
        self.to_guid = this.input.readString();
        //帮派guid
        self.faction_guid = this.input.readString();
    };
    s2c_send_chat.param_count = 11;
    s2c_send_chat.optname = "onSend_chat";
    return s2c_send_chat;
}());
var c2s_social_clear_apply = /** @class */ (function () {
    function c2s_social_clear_apply() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_social_clear_apply.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_social_clear_apply.param_count = 0;
    c2s_social_clear_apply.optname = "onSocial_clear_apply";
    return c2s_social_clear_apply;
}());
var c2s_msg_decline = /** @class */ (function () {
    function c2s_msg_decline() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_msg_decline.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //PLAYER_FIELD_DECLINE_CHANNEL_BYTE0
        self.value0 = this.input.readUint32();
        //PLAYER_FIELD_DECLINE_CHANNEL_BYTE1
        self.value1 = this.input.readUint32();
    };
    c2s_msg_decline.param_count = 2;
    c2s_msg_decline.optname = "onMsg_decline";
    return c2s_msg_decline;
}());
var s2c_faction_get_list_result = /** @class */ (function () {
    function s2c_faction_get_list_result() {
        this.optcode = 0;
        /**
         * 帮派列表
         */
        this.list = new Array(); //faction_info
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_faction_get_list_result.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //帮派列表
        if (self.list.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _list = new faction_info;
            _list.read(this.input);
            self.list.push(_list);
        }
        //当前页
        self.curpag = this.input.readUint8();
        //最大页
        self.maxpag = this.input.readUint8();
    };
    s2c_faction_get_list_result.param_count = 3;
    s2c_faction_get_list_result.optname = "onFaction_get_list_result";
    return s2c_faction_get_list_result;
}());
var c2s_faction_getlist = /** @class */ (function () {
    function c2s_faction_getlist() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_faction_getlist.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //当前页
        self.page = this.input.readUint8();
        //每页数量
        self.num = this.input.readUint8();
        //自动过滤
        self.grep = this.input.readUint8();
    };
    c2s_faction_getlist.param_count = 3;
    c2s_faction_getlist.optname = "onFaction_getlist";
    return c2s_faction_getlist;
}());
var c2s_faction_manager = /** @class */ (function () {
    function c2s_faction_manager() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_faction_manager.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //操作类型
        self.opt_type = this.input.readUint8();
        //预留int值1
        self.reserve_int1 = this.input.readUint16();
        //预留int值2
        self.reserve_int2 = this.input.readUint16();
        //预留string值1
        self.reserve_str1 = this.input.readString();
        //预留string值2
        self.reserve_str2 = this.input.readString();
    };
    c2s_faction_manager.param_count = 5;
    c2s_faction_manager.optname = "onFaction_manager";
    return c2s_faction_manager;
}());
var c2s_faction_member_operate = /** @class */ (function () {
    function c2s_faction_member_operate() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_faction_member_operate.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //操作类型
        self.opt_type = this.input.readUint8();
        //预留int值1
        self.reserve_int1 = this.input.readUint16();
        //预留int值2
        self.reserve_int2 = this.input.readUint16();
        //预留string值1
        self.reserve_str1 = this.input.readString();
        //预留string值2
        self.reserve_str2 = this.input.readString();
    };
    c2s_faction_member_operate.param_count = 5;
    c2s_faction_member_operate.optname = "onFaction_member_operate";
    return c2s_faction_member_operate;
}());
var c2s_faction_fast_join = /** @class */ (function () {
    function c2s_faction_fast_join() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_faction_fast_join.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_faction_fast_join.param_count = 0;
    c2s_faction_fast_join.optname = "onFaction_fast_join";
    return c2s_faction_fast_join;
}());
var c2s_social_add_friend_byname = /** @class */ (function () {
    function c2s_social_add_friend_byname() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_social_add_friend_byname.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //好友name
        self.name = this.input.readString();
    };
    c2s_social_add_friend_byname.param_count = 1;
    c2s_social_add_friend_byname.optname = "onSocial_add_friend_byname";
    return c2s_social_add_friend_byname;
}());
var c2s_read_mail = /** @class */ (function () {
    function c2s_read_mail() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_read_mail.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //邮件索引
        self.indx = this.input.readUint16();
    };
    c2s_read_mail.param_count = 1;
    c2s_read_mail.optname = "onRead_mail";
    return c2s_read_mail;
}());
var c2s_pick_mail = /** @class */ (function () {
    function c2s_pick_mail() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_pick_mail.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //邮件索引
        self.indx = this.input.readUint16();
    };
    c2s_pick_mail.param_count = 1;
    c2s_pick_mail.optname = "onPick_mail";
    return c2s_pick_mail;
}());
var c2s_remove_mail = /** @class */ (function () {
    function c2s_remove_mail() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_remove_mail.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //邮件索引
        self.indx = this.input.readUint16();
    };
    c2s_remove_mail.param_count = 1;
    c2s_remove_mail.optname = "onRemove_mail";
    return c2s_remove_mail;
}());
var c2s_pick_mail_one_step = /** @class */ (function () {
    function c2s_pick_mail_one_step() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_pick_mail_one_step.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_pick_mail_one_step.param_count = 0;
    c2s_pick_mail_one_step.optname = "onPick_mail_one_step";
    return c2s_pick_mail_one_step;
}());
var c2s_remove_mail_one_step = /** @class */ (function () {
    function c2s_remove_mail_one_step() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_remove_mail_one_step.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_remove_mail_one_step.param_count = 0;
    c2s_remove_mail_one_step.optname = "onRemove_mail_one_step";
    return c2s_remove_mail_one_step;
}());
var c2s_block_chat = /** @class */ (function () {
    function c2s_block_chat() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_block_chat.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //人物guid
        self.guid = this.input.readString();
    };
    c2s_block_chat.param_count = 1;
    c2s_block_chat.optname = "onBlock_chat";
    return c2s_block_chat;
}());
var c2s_cancel_block_chat = /** @class */ (function () {
    function c2s_cancel_block_chat() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_cancel_block_chat.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //索引
        self.indx = this.input.readUint8();
    };
    c2s_cancel_block_chat.param_count = 1;
    c2s_cancel_block_chat.optname = "onCancel_block_chat";
    return c2s_cancel_block_chat;
}());
var c2s_use_broadcast_gameobject = /** @class */ (function () {
    function c2s_use_broadcast_gameobject() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_use_broadcast_gameobject.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //gameobject uintguid
        self.target = this.input.readUint32();
    };
    c2s_use_broadcast_gameobject.param_count = 1;
    c2s_use_broadcast_gameobject.optname = "onUse_broadcast_gameobject";
    return c2s_use_broadcast_gameobject;
}());
var c2s_world_boss_enroll = /** @class */ (function () {
    function c2s_world_boss_enroll() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_world_boss_enroll.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_world_boss_enroll.param_count = 0;
    c2s_world_boss_enroll.optname = "onWorld_boss_enroll";
    return c2s_world_boss_enroll;
}());
var c2s_world_boss_fight = /** @class */ (function () {
    function c2s_world_boss_fight() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_world_boss_fight.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_world_boss_fight.param_count = 0;
    c2s_world_boss_fight.optname = "onWorld_boss_fight";
    return c2s_world_boss_fight;
}());
var c2s_change_line = /** @class */ (function () {
    function c2s_change_line() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_change_line.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //线号
        self.lineNo = this.input.readUint32();
    };
    c2s_change_line.param_count = 1;
    c2s_change_line.optname = "onChange_line";
    return c2s_change_line;
}());
var c2s_roll_world_boss_treasure = /** @class */ (function () {
    function c2s_roll_world_boss_treasure() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_roll_world_boss_treasure.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_roll_world_boss_treasure.param_count = 0;
    c2s_roll_world_boss_treasure.optname = "onRoll_world_boss_treasure";
    return c2s_roll_world_boss_treasure;
}());
var s2c_roll_result = /** @class */ (function () {
    function s2c_roll_result() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_roll_result.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //数值点
        self.point = this.input.readUint8();
        //名字
        self.name = this.input.readString();
        //是否当前最高
        self.isHighest = this.input.readUint8();
        //服务器结束roll点时间戳
        self.timestamp = this.input.readUint32();
        //rollid
        self.rollid = this.input.readUint8();
    };
    s2c_roll_result.param_count = 5;
    s2c_roll_result.optname = "onRoll_result";
    return s2c_roll_result;
}());
var s2c_boss_rank = /** @class */ (function () {
    function s2c_boss_rank() {
        this.optcode = 0;
        /**
         * 排名
         */
        this.rankList = new Array(); //rank_info
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_boss_rank.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //boss类型
        self.rankType = this.input.readUint8();
        //排名
        if (self.rankList.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _rankList = new rank_info;
            _rankList.read(this.input);
            self.rankList.push(_rankList);
        }
        //我的排名
        self.mine = this.input.readUint8();
    };
    s2c_boss_rank.param_count = 3;
    s2c_boss_rank.optname = "onBoss_rank";
    return s2c_boss_rank;
}());
var c2s_rank_add_like = /** @class */ (function () {
    function c2s_rank_add_like() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_rank_add_like.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //排行榜类型
        self.type = this.input.readUint8();
        //GUID
        self.guid = this.input.readString();
    };
    c2s_rank_add_like.param_count = 2;
    c2s_rank_add_like.optname = "onRank_add_like";
    return c2s_rank_add_like;
}());
var s2c_rank_add_like_result = /** @class */ (function () {
    function s2c_rank_add_like_result() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_rank_add_like_result.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //排行榜类型
        self.type = this.input.readUint8();
        //GUID
        self.guid = this.input.readString();
        //like
        self.num = this.input.readUint32();
    };
    s2c_rank_add_like_result.param_count = 3;
    s2c_rank_add_like_result.optname = "onRank_add_like_result";
    return s2c_rank_add_like_result;
}());
var c2s_res_instance_enter = /** @class */ (function () {
    function c2s_res_instance_enter() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_res_instance_enter.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //副本类型
        self.id = this.input.readUint8();
    };
    c2s_res_instance_enter.param_count = 1;
    c2s_res_instance_enter.optname = "onRes_instance_enter";
    return c2s_res_instance_enter;
}());
var c2s_res_instance_sweep = /** @class */ (function () {
    function c2s_res_instance_sweep() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_res_instance_sweep.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //副本类型
        self.id = this.input.readUint8();
    };
    c2s_res_instance_sweep.param_count = 1;
    c2s_res_instance_sweep.optname = "onRes_instance_sweep";
    return c2s_res_instance_sweep;
}());
var c2s_show_map_line = /** @class */ (function () {
    function c2s_show_map_line() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_show_map_line.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_show_map_line.param_count = 0;
    c2s_show_map_line.optname = "onShow_map_line";
    return c2s_show_map_line;
}());
var s2c_send_map_line = /** @class */ (function () {
    function s2c_send_map_line() {
        this.optcode = 0;
        /**
         * 分线号信息
         */
        this.info = new Array(); //line_info
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_send_map_line.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //分线号信息
        if (self.info.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _info = new line_info;
            _info.read(this.input);
            self.info.push(_info);
        }
    };
    s2c_send_map_line.param_count = 1;
    s2c_send_map_line.optname = "onSend_map_line";
    return s2c_send_map_line;
}());
var s2c_item_notice = /** @class */ (function () {
    function s2c_item_notice() {
        this.optcode = 0;
        /**
         * 道具列表
         */
        this.list = new Array(); //item_reward_info
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_item_notice.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //显示位置类型
        self.showType = this.input.readUint8();
        //道具列表
        if (self.list.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _list = new item_reward_info;
            _list.read(this.input);
            self.list.push(_list);
        }
    };
    s2c_item_notice.param_count = 2;
    s2c_item_notice.optname = "onItem_notice";
    return s2c_item_notice;
}());
var c2s_teleport_map = /** @class */ (function () {
    function c2s_teleport_map() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_teleport_map.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //地图id
        self.mapid = this.input.readUint32();
        //分线号
        self.lineNo = this.input.readUint32();
    };
    c2s_teleport_map.param_count = 2;
    c2s_teleport_map.optname = "onTeleport_map";
    return c2s_teleport_map;
}());
var c2s_teleport_field_boss = /** @class */ (function () {
    function c2s_teleport_field_boss() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_teleport_field_boss.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //地图id
        self.mapid = this.input.readUint32();
        //分线号
        self.lineNo = this.input.readUint32();
    };
    c2s_teleport_field_boss.param_count = 2;
    c2s_teleport_field_boss.optname = "onTeleport_field_boss";
    return c2s_teleport_field_boss;
}());
var c2s_get_activity_reward = /** @class */ (function () {
    function c2s_get_activity_reward() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_get_activity_reward.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //礼包序号
        self.id = this.input.readUint8();
        //vip奖励
        self.vip = this.input.readUint8();
    };
    c2s_get_activity_reward.param_count = 2;
    c2s_get_activity_reward.optname = "onGet_activity_reward";
    return c2s_get_activity_reward;
}());
var c2s_get_achieve_reward = /** @class */ (function () {
    function c2s_get_achieve_reward() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_get_achieve_reward.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //成就序号
        self.id = this.input.readUint8();
    };
    c2s_get_achieve_reward.param_count = 1;
    c2s_get_achieve_reward.optname = "onGet_achieve_reward";
    return c2s_get_achieve_reward;
}());
var c2s_get_achieve_all_reward = /** @class */ (function () {
    function c2s_get_achieve_all_reward() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_get_achieve_all_reward.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_get_achieve_all_reward.param_count = 0;
    c2s_get_achieve_all_reward.optname = "onGet_achieve_all_reward";
    return c2s_get_achieve_all_reward;
}());
var c2s_set_title = /** @class */ (function () {
    function c2s_set_title() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_set_title.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //称号序号
        self.id = this.input.readUint8();
    };
    c2s_set_title.param_count = 1;
    c2s_set_title.optname = "onSet_title";
    return c2s_set_title;
}());
var c2s_init_title = /** @class */ (function () {
    function c2s_init_title() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_init_title.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //称号序号
        self.id = this.input.readUint8();
    };
    c2s_init_title.param_count = 1;
    c2s_init_title.optname = "onInit_title";
    return c2s_init_title;
}());
var c2s_welfare_shouchong_reward = /** @class */ (function () {
    function c2s_welfare_shouchong_reward() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_welfare_shouchong_reward.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_welfare_shouchong_reward.param_count = 0;
    c2s_welfare_shouchong_reward.optname = "onWelfare_shouchong_reward";
    return c2s_welfare_shouchong_reward;
}());
var c2s_welfare_checkin = /** @class */ (function () {
    function c2s_welfare_checkin() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_welfare_checkin.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_welfare_checkin.param_count = 0;
    c2s_welfare_checkin.optname = "onWelfare_checkin";
    return c2s_welfare_checkin;
}());
var c2s_welfare_checkin_all = /** @class */ (function () {
    function c2s_welfare_checkin_all() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_welfare_checkin_all.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //签到序号
        self.id = this.input.readUint8();
    };
    c2s_welfare_checkin_all.param_count = 1;
    c2s_welfare_checkin_all.optname = "onWelfare_checkin_all";
    return c2s_welfare_checkin_all;
}());
var c2s_welfare_checkin_getback = /** @class */ (function () {
    function c2s_welfare_checkin_getback() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_welfare_checkin_getback.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //签到序号
        self.id = this.input.readUint8();
    };
    c2s_welfare_checkin_getback.param_count = 1;
    c2s_welfare_checkin_getback.optname = "onWelfare_checkin_getback";
    return c2s_welfare_checkin_getback;
}());
var c2s_welfare_level = /** @class */ (function () {
    function c2s_welfare_level() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_welfare_level.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //等级序号
        self.id = this.input.readUint8();
    };
    c2s_welfare_level.param_count = 1;
    c2s_welfare_level.optname = "onWelfare_level";
    return c2s_welfare_level;
}());
var c2s_welfare_active_getback = /** @class */ (function () {
    function c2s_welfare_active_getback() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_welfare_active_getback.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //活动类型
        self.id = this.input.readUint8();
        //完美找回
        self.best = this.input.readUint8();
        //找回次数
        self.num = this.input.readUint16();
    };
    c2s_welfare_active_getback.param_count = 3;
    c2s_welfare_active_getback.optname = "onWelfare_active_getback";
    return c2s_welfare_active_getback;
}());
var c2s_pick_quest_reward = /** @class */ (function () {
    function c2s_pick_quest_reward() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_pick_quest_reward.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //任务序号
        self.indx = this.input.readUint8();
    };
    c2s_pick_quest_reward.param_count = 1;
    c2s_pick_quest_reward.optname = "onPick_quest_reward";
    return c2s_pick_quest_reward;
}());
var c2s_talk_with_npc = /** @class */ (function () {
    function c2s_talk_with_npc() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_talk_with_npc.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //npc uint guid
        self.u_guid = this.input.readUint32();
        //任务id
        self.questId = this.input.readUint16();
    };
    c2s_talk_with_npc.param_count = 2;
    c2s_talk_with_npc.optname = "onTalk_with_npc";
    return c2s_talk_with_npc;
}());
var c2s_use_virtual_item = /** @class */ (function () {
    function c2s_use_virtual_item() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_use_virtual_item.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //itemid
        self.entry = this.input.readUint16();
    };
    c2s_use_virtual_item.param_count = 1;
    c2s_use_virtual_item.optname = "onUse_virtual_item";
    return c2s_use_virtual_item;
}());
var c2s_pick_quest_chapter_reward = /** @class */ (function () {
    function c2s_pick_quest_chapter_reward() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_pick_quest_chapter_reward.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //章节id
        self.indx = this.input.readUint8();
    };
    c2s_pick_quest_chapter_reward.param_count = 1;
    c2s_pick_quest_chapter_reward.optname = "onPick_quest_chapter_reward";
    return c2s_pick_quest_chapter_reward;
}());
var c2s_kuafu_3v3_match = /** @class */ (function () {
    function c2s_kuafu_3v3_match() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_kuafu_3v3_match.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_kuafu_3v3_match.param_count = 0;
    c2s_kuafu_3v3_match.optname = "onKuafu_3v3_match";
    return c2s_kuafu_3v3_match;
}());
var s2c_kuafu_match_start = /** @class */ (function () {
    function s2c_kuafu_match_start() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_kuafu_match_start.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //跨服类型
        self.indx = this.input.readUint8();
    };
    s2c_kuafu_match_start.param_count = 1;
    s2c_kuafu_match_start.optname = "onKuafu_match_start";
    return s2c_kuafu_match_start;
}());
var c2s_kuafu_3v3_buytimes = /** @class */ (function () {
    function c2s_kuafu_3v3_buytimes() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_kuafu_3v3_buytimes.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //购买次数
        self.num = this.input.readUint8();
    };
    c2s_kuafu_3v3_buytimes.param_count = 1;
    c2s_kuafu_3v3_buytimes.optname = "onKuafu_3v3_buytimes";
    return c2s_kuafu_3v3_buytimes;
}());
var c2s_kuafu_3v3_dayreward = /** @class */ (function () {
    function c2s_kuafu_3v3_dayreward() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_kuafu_3v3_dayreward.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //购买次数
        self.id = this.input.readUint8();
    };
    c2s_kuafu_3v3_dayreward.param_count = 1;
    c2s_kuafu_3v3_dayreward.optname = "onKuafu_3v3_dayreward";
    return c2s_kuafu_3v3_dayreward;
}());
var c2s_kuafu_3v3_getranlist = /** @class */ (function () {
    function c2s_kuafu_3v3_getranlist() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_kuafu_3v3_getranlist.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_kuafu_3v3_getranlist.param_count = 0;
    c2s_kuafu_3v3_getranlist.optname = "onKuafu_3v3_getranlist";
    return c2s_kuafu_3v3_getranlist;
}());
var s2c_kuafu_3v3_ranlist = /** @class */ (function () {
    function s2c_kuafu_3v3_ranlist() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_kuafu_3v3_ranlist.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //列表
        self.list = this.input.readString();
    };
    s2c_kuafu_3v3_ranlist.param_count = 1;
    s2c_kuafu_3v3_ranlist.optname = "onKuafu_3v3_ranlist";
    return s2c_kuafu_3v3_ranlist;
}());
var c2s_welfare_getalllist_getback = /** @class */ (function () {
    function c2s_welfare_getalllist_getback() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_welfare_getalllist_getback.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //完美找回
        self.best = this.input.readUint8();
    };
    c2s_welfare_getalllist_getback.param_count = 1;
    c2s_welfare_getalllist_getback.optname = "onWelfare_getalllist_getback";
    return c2s_welfare_getalllist_getback;
}());
var s2c_welfare_rewardlist_getback = /** @class */ (function () {
    function s2c_welfare_rewardlist_getback() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_welfare_rewardlist_getback.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //道具列表
        self.list = this.input.readString();
        //消耗资源
        self.cost = this.input.readString();
    };
    s2c_welfare_rewardlist_getback.param_count = 2;
    s2c_welfare_rewardlist_getback.optname = "onWelfare_rewardlist_getback";
    return s2c_welfare_rewardlist_getback;
}());
var c2s_welfare_getall_getback = /** @class */ (function () {
    function c2s_welfare_getall_getback() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_welfare_getall_getback.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //完美找回
        self.best = this.input.readUint8();
    };
    c2s_welfare_getall_getback.param_count = 1;
    c2s_welfare_getall_getback.optname = "onWelfare_getall_getback";
    return c2s_welfare_getall_getback;
}());
var c2s_kuafu_3v3_getmyrank = /** @class */ (function () {
    function c2s_kuafu_3v3_getmyrank() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_kuafu_3v3_getmyrank.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_kuafu_3v3_getmyrank.param_count = 0;
    c2s_kuafu_3v3_getmyrank.optname = "onKuafu_3v3_getmyrank";
    return c2s_kuafu_3v3_getmyrank;
}());
var s2c_kuafu_3v3_myrank = /** @class */ (function () {
    function s2c_kuafu_3v3_myrank() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_kuafu_3v3_myrank.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //名次
        self.rank = this.input.readUint8();
    };
    s2c_kuafu_3v3_myrank.param_count = 1;
    s2c_kuafu_3v3_myrank.optname = "onKuafu_3v3_myrank";
    return s2c_kuafu_3v3_myrank;
}());
var s2c_kuafu_3v3_kill_detail = /** @class */ (function () {
    function s2c_kuafu_3v3_kill_detail() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_kuafu_3v3_kill_detail.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //击杀者下标
        self.indx1 = this.input.readUint32();
        //被击杀者下标
        self.indx2 = this.input.readUint32();
    };
    s2c_kuafu_3v3_kill_detail.param_count = 2;
    s2c_kuafu_3v3_kill_detail.optname = "onKuafu_3v3_kill_detail";
    return s2c_kuafu_3v3_kill_detail;
}());
var s2c_kuafu_3v3_wait_info = /** @class */ (function () {
    function s2c_kuafu_3v3_wait_info() {
        this.optcode = 0;
        /**
         * 匹配数据
         */
        this.list = new Array(); //wait_info
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_kuafu_3v3_wait_info.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //匹配数据
        if (self.list.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _list = new wait_info;
            _list.read(this.input);
            self.list.push(_list);
        }
    };
    s2c_kuafu_3v3_wait_info.param_count = 1;
    s2c_kuafu_3v3_wait_info.optname = "onKuafu_3v3_wait_info";
    return s2c_kuafu_3v3_wait_info;
}());
var both_kuafu_3v3_cancel_match = /** @class */ (function () {
    function both_kuafu_3v3_cancel_match() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    both_kuafu_3v3_cancel_match.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //取消匹配跨服类型
        self.type = this.input.readUint32();
    };
    both_kuafu_3v3_cancel_match.param_count = 1;
    both_kuafu_3v3_cancel_match.optname = "onKuafu_3v3_cancel_match";
    return both_kuafu_3v3_cancel_match;
}());
var c2s_kuafu_3v3_match_oper = /** @class */ (function () {
    function c2s_kuafu_3v3_match_oper() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_kuafu_3v3_match_oper.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //0:取消& 1:接受
        self.oper = this.input.readUint32();
    };
    c2s_kuafu_3v3_match_oper.param_count = 1;
    c2s_kuafu_3v3_match_oper.optname = "onKuafu_3v3_match_oper";
    return c2s_kuafu_3v3_match_oper;
}());
var s2c_kuafu_3v3_decline_match = /** @class */ (function () {
    function s2c_kuafu_3v3_decline_match() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_kuafu_3v3_decline_match.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //拒绝匹配跨服类型
        self.type = this.input.readUint32();
    };
    s2c_kuafu_3v3_decline_match.param_count = 1;
    s2c_kuafu_3v3_decline_match.optname = "onKuafu_3v3_decline_match";
    return s2c_kuafu_3v3_decline_match;
}());
var c2s_kuafu_xianfu_match = /** @class */ (function () {
    function c2s_kuafu_xianfu_match() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_kuafu_xianfu_match.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //仙府类型
        self.indx = this.input.readUint8();
    };
    c2s_kuafu_xianfu_match.param_count = 1;
    c2s_kuafu_xianfu_match.optname = "onKuafu_xianfu_match";
    return c2s_kuafu_xianfu_match;
}());
var s2c_kuafu_match_wait = /** @class */ (function () {
    function s2c_kuafu_match_wait() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_kuafu_match_wait.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //匹配类型
        self.type = this.input.readUint8();
        //需要匹配个数
        self.target = this.input.readUint8();
        //当前匹配个数
        self.count = this.input.readUint8();
        //int参数
        self.data = this.input.readUint32();
        //str参数
        self.params = this.input.readString();
    };
    s2c_kuafu_match_wait.param_count = 5;
    s2c_kuafu_match_wait.optname = "onKuafu_match_wait";
    return s2c_kuafu_match_wait;
}());
var s2c_kuafu_xianfu_minimap_info = /** @class */ (function () {
    function s2c_kuafu_xianfu_minimap_info() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_kuafu_xianfu_minimap_info.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    s2c_kuafu_xianfu_minimap_info.param_count = 0;
    s2c_kuafu_xianfu_minimap_info.optname = "onKuafu_xianfu_minimap_info";
    return s2c_kuafu_xianfu_minimap_info;
}());
var c2s_buy_xianfu_item = /** @class */ (function () {
    function c2s_buy_xianfu_item() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_buy_xianfu_item.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //仙府券类型
        self.type = this.input.readUint8();
        //购买类型
        self.indx = this.input.readUint8();
        //购买数量
        self.count = this.input.readUint16();
    };
    c2s_buy_xianfu_item.param_count = 3;
    c2s_buy_xianfu_item.optname = "onBuy_xianfu_item";
    return c2s_buy_xianfu_item;
}());
var c2s_xianfu_random_respawn = /** @class */ (function () {
    function c2s_xianfu_random_respawn() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_xianfu_random_respawn.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_xianfu_random_respawn.param_count = 0;
    c2s_xianfu_random_respawn.optname = "onXianfu_random_respawn";
    return c2s_xianfu_random_respawn;
}());
var c2s_doujiantai_fight = /** @class */ (function () {
    function c2s_doujiantai_fight() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_doujiantai_fight.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //排名
        self.rank = this.input.readUint16();
    };
    c2s_doujiantai_fight.param_count = 1;
    c2s_doujiantai_fight.optname = "onDoujiantai_fight";
    return c2s_doujiantai_fight;
}());
var c2s_doujiantai_buytime = /** @class */ (function () {
    function c2s_doujiantai_buytime() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_doujiantai_buytime.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //排名
        self.num = this.input.readUint8();
    };
    c2s_doujiantai_buytime.param_count = 1;
    c2s_doujiantai_buytime.optname = "onDoujiantai_buytime";
    return c2s_doujiantai_buytime;
}());
var c2s_doujiantai_clearcd = /** @class */ (function () {
    function c2s_doujiantai_clearcd() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_doujiantai_clearcd.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_doujiantai_clearcd.param_count = 0;
    c2s_doujiantai_clearcd.optname = "onDoujiantai_clearcd";
    return c2s_doujiantai_clearcd;
}());
var c2s_doujiantai_first_reward = /** @class */ (function () {
    function c2s_doujiantai_first_reward() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_doujiantai_first_reward.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //序号
        self.id = this.input.readUint8();
    };
    c2s_doujiantai_first_reward.param_count = 1;
    c2s_doujiantai_first_reward.optname = "onDoujiantai_first_reward";
    return c2s_doujiantai_first_reward;
}());
var both_doujiantai_get_enemys_info = /** @class */ (function () {
    function both_doujiantai_get_enemys_info() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    both_doujiantai_get_enemys_info.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    both_doujiantai_get_enemys_info.param_count = 0;
    both_doujiantai_get_enemys_info.optname = "onDoujiantai_get_enemys_info";
    return both_doujiantai_get_enemys_info;
}());
var c2s_doujiantai_get_rank = /** @class */ (function () {
    function c2s_doujiantai_get_rank() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_doujiantai_get_rank.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //类型
        self.startIdx = this.input.readUint16();
        //类型
        self.endIdx = this.input.readUint16();
    };
    c2s_doujiantai_get_rank.param_count = 2;
    c2s_doujiantai_get_rank.optname = "onDoujiantai_get_rank";
    return c2s_doujiantai_get_rank;
}());
var c2s_doujiantai_refresh_enemys = /** @class */ (function () {
    function c2s_doujiantai_refresh_enemys() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_doujiantai_refresh_enemys.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_doujiantai_refresh_enemys.param_count = 0;
    c2s_doujiantai_refresh_enemys.optname = "onDoujiantai_refresh_enemys";
    return c2s_doujiantai_refresh_enemys;
}());
var both_doujiantai_top3 = /** @class */ (function () {
    function both_doujiantai_top3() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    both_doujiantai_top3.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    both_doujiantai_top3.param_count = 0;
    both_doujiantai_top3.optname = "onDoujiantai_top3";
    return both_doujiantai_top3;
}());
var both_use_jump_point = /** @class */ (function () {
    function both_use_jump_point() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    both_use_jump_point.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //跳点id
        self.id = this.input.readUint32();
    };
    both_use_jump_point.param_count = 1;
    both_use_jump_point.optname = "onUse_jump_point";
    return both_use_jump_point;
}());
var c2s_bag_item_sell = /** @class */ (function () {
    function c2s_bag_item_sell() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_bag_item_sell.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //物品guid
        self.item_guid = this.input.readString();
        //个数
        self.count = this.input.readUint32();
    };
    c2s_bag_item_sell.param_count = 2;
    c2s_bag_item_sell.optname = "onBag_item_sell";
    return c2s_bag_item_sell;
}());
var c2s_bag_item_sort = /** @class */ (function () {
    function c2s_bag_item_sort() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_bag_item_sort.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //背包类型
        self.bag_type = this.input.readUint32();
    };
    c2s_bag_item_sort.param_count = 1;
    c2s_bag_item_sort.optname = "onBag_item_sort";
    return c2s_bag_item_sort;
}());
var c2s_submit_quest_daily2 = /** @class */ (function () {
    function c2s_submit_quest_daily2() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_submit_quest_daily2.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_submit_quest_daily2.param_count = 0;
    c2s_submit_quest_daily2.optname = "onSubmit_quest_daily2";
    return c2s_submit_quest_daily2;
}());
var s2c_attribute_changed = /** @class */ (function () {
    function s2c_attribute_changed() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_attribute_changed.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    s2c_attribute_changed.param_count = 0;
    s2c_attribute_changed.optname = "onAttribute_changed";
    return s2c_attribute_changed;
}());
var s2c_bag_find_equip_better = /** @class */ (function () {
    function s2c_bag_find_equip_better() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_bag_find_equip_better.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //物品id
        self.item_id = this.input.readUint32();
        //背包位置
        self.pos = this.input.readUint32();
        //物品战力
        self.force = this.input.readUint32();
    };
    s2c_bag_find_equip_better.param_count = 3;
    s2c_bag_find_equip_better.optname = "onBag_find_equip_better";
    return s2c_bag_find_equip_better;
}());
var s2c_module_active = /** @class */ (function () {
    function s2c_module_active() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_module_active.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //模块id
        self.moduleId = this.input.readUint32();
    };
    s2c_module_active.param_count = 1;
    s2c_module_active.optname = "onModule_active";
    return s2c_module_active;
}());
var c2s_pick_daily2_quest_reward = /** @class */ (function () {
    function c2s_pick_daily2_quest_reward() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_pick_daily2_quest_reward.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //任务序号
        self.indx = this.input.readUint8();
    };
    c2s_pick_daily2_quest_reward.param_count = 1;
    c2s_pick_daily2_quest_reward.optname = "onPick_daily2_quest_reward";
    return c2s_pick_daily2_quest_reward;
}());
var c2s_finish_now_guide = /** @class */ (function () {
    function c2s_finish_now_guide() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_finish_now_guide.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_finish_now_guide.param_count = 0;
    c2s_finish_now_guide.optname = "onFinish_now_guide";
    return c2s_finish_now_guide;
}());
var c2s_get_cultivation_info = /** @class */ (function () {
    function c2s_get_cultivation_info() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_get_cultivation_info.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_get_cultivation_info.param_count = 0;
    c2s_get_cultivation_info.optname = "onGet_cultivation_info";
    return c2s_get_cultivation_info;
}());
var s2c_update_cultivation_info = /** @class */ (function () {
    function s2c_update_cultivation_info() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_update_cultivation_info.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //修炼开始时间
        self.start_time = this.input.readUint32();
        //宝箱掠夺信息
        self.lost = this.input.readUint32();
    };
    s2c_update_cultivation_info.param_count = 2;
    s2c_update_cultivation_info.optname = "onUpdate_cultivation_info";
    return s2c_update_cultivation_info;
}());
var c2s_get_cultivation_rivals_info = /** @class */ (function () {
    function c2s_get_cultivation_rivals_info() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_get_cultivation_rivals_info.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_get_cultivation_rivals_info.param_count = 0;
    c2s_get_cultivation_rivals_info.optname = "onGet_cultivation_rivals_info";
    return c2s_get_cultivation_rivals_info;
}());
var s2c_update_cultivation_rivals_info_list = /** @class */ (function () {
    function s2c_update_cultivation_rivals_info_list() {
        this.optcode = 0;
        /**
         * 对手信息列表
         */
        this.list = new Array(); //cultivation_rivals_info
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_update_cultivation_rivals_info_list.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //对手信息列表
        if (self.list.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _list = new cultivation_rivals_info;
            _list.read(this.input);
            self.list.push(_list);
        }
    };
    s2c_update_cultivation_rivals_info_list.param_count = 1;
    s2c_update_cultivation_rivals_info_list.optname = "onUpdate_cultivation_rivals_info_list";
    return s2c_update_cultivation_rivals_info_list;
}());
var c2s_get_cultivation_reward = /** @class */ (function () {
    function c2s_get_cultivation_reward() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_get_cultivation_reward.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_get_cultivation_reward.param_count = 0;
    c2s_get_cultivation_reward.optname = "onGet_cultivation_reward";
    return c2s_get_cultivation_reward;
}());
var c2s_refresh_cultivation_rivals = /** @class */ (function () {
    function c2s_refresh_cultivation_rivals() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_refresh_cultivation_rivals.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_refresh_cultivation_rivals.param_count = 0;
    c2s_refresh_cultivation_rivals.optname = "onRefresh_cultivation_rivals";
    return c2s_refresh_cultivation_rivals;
}());
var c2s_plunder_cultivation_rival = /** @class */ (function () {
    function c2s_plunder_cultivation_rival() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_plunder_cultivation_rival.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //对手序号
        self.index = this.input.readUint32();
    };
    c2s_plunder_cultivation_rival.param_count = 1;
    c2s_plunder_cultivation_rival.optname = "onPlunder_cultivation_rival";
    return c2s_plunder_cultivation_rival;
}());
var c2s_revenge_cultivation_rival = /** @class */ (function () {
    function c2s_revenge_cultivation_rival() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_revenge_cultivation_rival.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //掠夺记录序号
        self.index = this.input.readUint32();
    };
    c2s_revenge_cultivation_rival.param_count = 1;
    c2s_revenge_cultivation_rival.optname = "onRevenge_cultivation_rival";
    return c2s_revenge_cultivation_rival;
}());
var c2s_buy_cultivation_left_plunder_count = /** @class */ (function () {
    function c2s_buy_cultivation_left_plunder_count() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_buy_cultivation_left_plunder_count.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //购买数量
        self.count = this.input.readUint32();
    };
    c2s_buy_cultivation_left_plunder_count.param_count = 1;
    c2s_buy_cultivation_left_plunder_count.optname = "onBuy_cultivation_left_plunder_count";
    return c2s_buy_cultivation_left_plunder_count;
}());
var s2c_show_cultivation_result_list = /** @class */ (function () {
    function s2c_show_cultivation_result_list() {
        this.optcode = 0;
        /**
         *
         */
        this.list = new Array(); //item_reward_info
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_show_cultivation_result_list.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //战斗结果-1:失败  1:胜利
        self.result = this.input.readInt32();
        //对方名称
        self.name = this.input.readString();
        //
        if (self.list.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _list = new item_reward_info;
            _list.read(this.input);
            self.list.push(_list);
        }
    };
    s2c_show_cultivation_result_list.param_count = 3;
    s2c_show_cultivation_result_list.optname = "onShow_cultivation_result_list";
    return s2c_show_cultivation_result_list;
}());
var c2s_get_login_activity_reward = /** @class */ (function () {
    function c2s_get_login_activity_reward() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_get_login_activity_reward.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //奖励id
        self.id = this.input.readUint32();
    };
    c2s_get_login_activity_reward.param_count = 1;
    c2s_get_login_activity_reward.optname = "onGet_login_activity_reward";
    return c2s_get_login_activity_reward;
}());
var s2c_cast_spell_start = /** @class */ (function () {
    function s2c_cast_spell_start() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_cast_spell_start.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //释放玩家
        self.caster_guid = this.input.readUint32();
        //攻击玩家
        self.target_guid = this.input.readUint32();
        //技能id
        self.spellid = this.input.readUint16();
        //参数
        self.data = this.input.readString();
    };
    s2c_cast_spell_start.param_count = 4;
    s2c_cast_spell_start.optname = "onCast_spell_start";
    return s2c_cast_spell_start;
}());
var c2s_finish_optional_guide_step = /** @class */ (function () {
    function c2s_finish_optional_guide_step() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_finish_optional_guide_step.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //引导id
        self.guide_id = this.input.readUint32();
        //引导分步骤
        self.step = this.input.readUint8();
    };
    c2s_finish_optional_guide_step.param_count = 2;
    c2s_finish_optional_guide_step.optname = "onFinish_optional_guide_step";
    return c2s_finish_optional_guide_step;
}());
var c2s_execute_quest_cmd_after_accepted = /** @class */ (function () {
    function c2s_execute_quest_cmd_after_accepted() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_execute_quest_cmd_after_accepted.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //任务序号下标
        self.indx = this.input.readUint16();
    };
    c2s_execute_quest_cmd_after_accepted.param_count = 1;
    c2s_execute_quest_cmd_after_accepted.optname = "onExecute_quest_cmd_after_accepted";
    return c2s_execute_quest_cmd_after_accepted;
}());
var s2c_show_unit_attribute = /** @class */ (function () {
    function s2c_show_unit_attribute() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_show_unit_attribute.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    s2c_show_unit_attribute.param_count = 0;
    s2c_show_unit_attribute.optname = "onShow_unit_attribute";
    return s2c_show_unit_attribute;
}());
var c2s_back_to_famity = /** @class */ (function () {
    function c2s_back_to_famity() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_back_to_famity.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_back_to_famity.param_count = 0;
    c2s_back_to_famity.optname = "onBack_to_famity";
    return c2s_back_to_famity;
}());
var s2c_faction_boss_send_result = /** @class */ (function () {
    function s2c_faction_boss_send_result() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_faction_boss_send_result.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //结果标识
        self.result = this.input.readUint32();
        //bossId
        self.boss_id = this.input.readUint32();
        //家族资金变化量
        self.money = this.input.readUint32();
    };
    s2c_faction_boss_send_result.param_count = 3;
    s2c_faction_boss_send_result.optname = "onFaction_boss_send_result";
    return s2c_faction_boss_send_result;
}());
var c2s_challange_boss = /** @class */ (function () {
    function c2s_challange_boss() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_challange_boss.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_challange_boss.param_count = 0;
    c2s_challange_boss.optname = "onChallange_boss";
    return c2s_challange_boss;
}());
var c2s_pick_offline_reward = /** @class */ (function () {
    function c2s_pick_offline_reward() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_pick_offline_reward.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_pick_offline_reward.param_count = 0;
    c2s_pick_offline_reward.optname = "onPick_offline_reward";
    return c2s_pick_offline_reward;
}());
var s2c_offline_reward_result = /** @class */ (function () {
    function s2c_offline_reward_result() {
        this.optcode = 0;
        /**
         *
         */
        this.list = new Array(); //item_reward_info
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_offline_reward_result.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //备用
        self.reserve = this.input.readUint32();
        //备用2
        self.reserve2 = this.input.readUint32();
        //备用3
        self.reserve3 = this.input.readUint32();
        //备用4
        self.reserve4 = this.input.readUint32();
        //备用5
        self.reserve5 = this.input.readUint32();
        //
        if (self.list.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _list = new item_reward_info;
            _list.read(this.input);
            self.list.push(_list);
        }
    };
    s2c_offline_reward_result.param_count = 6;
    s2c_offline_reward_result.optname = "onOffline_reward_result";
    return s2c_offline_reward_result;
}());
var c2s_smelting_equip = /** @class */ (function () {
    function c2s_smelting_equip() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_smelting_equip.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //装备pos 用竖线隔开
        self.pos_str = this.input.readString();
    };
    c2s_smelting_equip.param_count = 1;
    c2s_smelting_equip.optname = "onSmelting_equip";
    return c2s_smelting_equip;
}());
var c2s_storehouse_hand_in = /** @class */ (function () {
    function c2s_storehouse_hand_in() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_storehouse_hand_in.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //装备pos 用竖线隔开
        self.pos_str = this.input.readString();
    };
    c2s_storehouse_hand_in.param_count = 1;
    c2s_storehouse_hand_in.optname = "onStorehouse_hand_in";
    return c2s_storehouse_hand_in;
}());
var c2s_storehouse_exchange = /** @class */ (function () {
    function c2s_storehouse_exchange() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_storehouse_exchange.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //宝库的pos
        self.pos = this.input.readUint32();
    };
    c2s_storehouse_exchange.param_count = 1;
    c2s_storehouse_exchange.optname = "onStorehouse_exchange";
    return c2s_storehouse_exchange;
}());
var c2s_storehouse_destroy = /** @class */ (function () {
    function c2s_storehouse_destroy() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_storehouse_destroy.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //宝库的pos
        self.pos = this.input.readUint32();
    };
    c2s_storehouse_destroy.param_count = 1;
    c2s_storehouse_destroy.optname = "onStorehouse_destroy";
    return c2s_storehouse_destroy;
}());
var c2s_send_faction_gift = /** @class */ (function () {
    function c2s_send_faction_gift() {
        this.optcode = 0;
        /**
         * 礼物list
         */
        this.list = new Array(); //item_reward_info
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_send_faction_gift.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //礼物list
        if (self.list.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _list = new item_reward_info;
            _list.read(this.input);
            self.list.push(_list);
        }
        //留言
        self.msg = this.input.readString();
        //留言类型
        self.msg_type = this.input.readUint32();
    };
    c2s_send_faction_gift.param_count = 3;
    c2s_send_faction_gift.optname = "onSend_faction_gift";
    return c2s_send_faction_gift;
}());
var c2s_get_faction_gift_exreward = /** @class */ (function () {
    function c2s_get_faction_gift_exreward() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_get_faction_gift_exreward.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //礼物的count_id
        self.count_id = this.input.readUint32();
    };
    c2s_get_faction_gift_exreward.param_count = 1;
    c2s_get_faction_gift_exreward.optname = "onGet_faction_gift_exreward";
    return c2s_get_faction_gift_exreward;
}());
var c2s_get_all_faction_gift_exreward = /** @class */ (function () {
    function c2s_get_all_faction_gift_exreward() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_get_all_faction_gift_exreward.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_get_all_faction_gift_exreward.param_count = 0;
    c2s_get_all_faction_gift_exreward.optname = "onGet_all_faction_gift_exreward";
    return c2s_get_all_faction_gift_exreward;
}());
var s2c_show_faction_gift_page = /** @class */ (function () {
    function s2c_show_faction_gift_page() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_show_faction_gift_page.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    s2c_show_faction_gift_page.param_count = 0;
    s2c_show_faction_gift_page.optname = "onShow_faction_gift_page";
    return s2c_show_faction_gift_page;
}());
var s2c_show_faction_gift_info = /** @class */ (function () {
    function s2c_show_faction_gift_info() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_show_faction_gift_info.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    s2c_show_faction_gift_info.param_count = 0;
    s2c_show_faction_gift_info.optname = "onShow_faction_gift_info";
    return s2c_show_faction_gift_info;
}());
var s2c_show_faction_gift_unthank_page = /** @class */ (function () {
    function s2c_show_faction_gift_unthank_page() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_show_faction_gift_unthank_page.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    s2c_show_faction_gift_unthank_page.param_count = 0;
    s2c_show_faction_gift_unthank_page.optname = "onShow_faction_gift_unthank_page";
    return s2c_show_faction_gift_unthank_page;
}());
var s2c_show_faction_gift_history_page = /** @class */ (function () {
    function s2c_show_faction_gift_history_page() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_show_faction_gift_history_page.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    s2c_show_faction_gift_history_page.param_count = 0;
    s2c_show_faction_gift_history_page.optname = "onShow_faction_gift_history_page";
    return s2c_show_faction_gift_history_page;
}());
var c2s_get_faction_gift_rank_page = /** @class */ (function () {
    function c2s_get_faction_gift_rank_page() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_get_faction_gift_rank_page.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //页数
        self.page = this.input.readUint32();
    };
    c2s_get_faction_gift_rank_page.param_count = 1;
    c2s_get_faction_gift_rank_page.optname = "onGet_faction_gift_rank_page";
    return c2s_get_faction_gift_rank_page;
}());
var s2c_show_faction_gift_rank_result_list = /** @class */ (function () {
    function s2c_show_faction_gift_rank_result_list() {
        this.optcode = 0;
        /**
         * 排行列表
         */
        this.list = new Array(); //faction_gift_rank_info
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_show_faction_gift_rank_result_list.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //排行列表
        if (self.list.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _list = new faction_gift_rank_info;
            _list.read(this.input);
            self.list.push(_list);
        }
        //本帮派排行信息
        self.info = new faction_gift_rank_info;
        self.info.read(this.input);
        //页数
        self.page = this.input.readUint32();
    };
    s2c_show_faction_gift_rank_result_list.param_count = 3;
    s2c_show_faction_gift_rank_result_list.optname = "onShow_faction_gift_rank_result_list";
    return s2c_show_faction_gift_rank_result_list;
}());
var s2c_show_faction_gift_rank_change = /** @class */ (function () {
    function s2c_show_faction_gift_rank_change() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_show_faction_gift_rank_change.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //原排行
        self.old_rank = this.input.readUint32();
        //新排行
        self.new_rank = this.input.readUint32();
        //本帮派排行信息
        self.info = new faction_gift_rank_info;
        self.info.read(this.input);
    };
    s2c_show_faction_gift_rank_change.param_count = 3;
    s2c_show_faction_gift_rank_change.optname = "onShow_faction_gift_rank_change";
    return s2c_show_faction_gift_rank_change;
}());
var s2c_show_faction_gift_rank_info = /** @class */ (function () {
    function s2c_show_faction_gift_rank_info() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_show_faction_gift_rank_info.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //本帮派排行信息
        self.info = new faction_gift_rank_info;
        self.info.read(this.input);
    };
    s2c_show_faction_gift_rank_info.param_count = 1;
    s2c_show_faction_gift_rank_info.optname = "onShow_faction_gift_rank_info";
    return s2c_show_faction_gift_rank_info;
}());
var c2s_divine_forge = /** @class */ (function () {
    function c2s_divine_forge() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_divine_forge.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //神兵id
        self.id = this.input.readUint32();
        //次数
        self.count = this.input.readUint32();
    };
    c2s_divine_forge.param_count = 2;
    c2s_divine_forge.optname = "onDivine_forge";
    return c2s_divine_forge;
}());
var c2s_divine_advance = /** @class */ (function () {
    function c2s_divine_advance() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_divine_advance.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //神兵id
        self.id = this.input.readUint32();
    };
    c2s_divine_advance.param_count = 1;
    c2s_divine_advance.optname = "onDivine_advance";
    return c2s_divine_advance;
}());
var c2s_divine_spirit = /** @class */ (function () {
    function c2s_divine_spirit() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_divine_spirit.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //神兵id
        self.id = this.input.readUint32();
        //失败保护
        self.protect = this.input.readUint32();
        //提升概率
        self.improve = this.input.readUint32();
    };
    c2s_divine_spirit.param_count = 3;
    c2s_divine_spirit.optname = "onDivine_spirit";
    return c2s_divine_spirit;
}());
var c2s_query_mass_boss_info = /** @class */ (function () {
    function c2s_query_mass_boss_info() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_query_mass_boss_info.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //全民boss编号
        self.id = this.input.readUint8();
    };
    c2s_query_mass_boss_info.param_count = 1;
    c2s_query_mass_boss_info.optname = "onQuery_mass_boss_info";
    return c2s_query_mass_boss_info;
}());
var s2c_mass_boss_info_ret = /** @class */ (function () {
    function s2c_mass_boss_info_ret() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_mass_boss_info_ret.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //全民boss参加人数
        self.count = this.input.readUint32();
        //当前boss血量
        self.percent = this.input.readUint8();
    };
    s2c_mass_boss_info_ret.param_count = 2;
    s2c_mass_boss_info_ret.optname = "onMass_boss_info_ret";
    return s2c_mass_boss_info_ret;
}());
var c2s_query_mass_boss_rank = /** @class */ (function () {
    function c2s_query_mass_boss_rank() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_query_mass_boss_rank.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //全民boss编号
        self.id = this.input.readUint8();
    };
    c2s_query_mass_boss_rank.param_count = 1;
    c2s_query_mass_boss_rank.optname = "onQuery_mass_boss_rank";
    return c2s_query_mass_boss_rank;
}());
var s2c_mass_boss_rank_result = /** @class */ (function () {
    function s2c_mass_boss_rank_result() {
        this.optcode = 0;
        /**
         * 全民boss排名信息
         */
        this.info = new Array(); //rank_info
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_mass_boss_rank_result.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //全民boss排名信息
        if (self.info.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _info = new rank_info;
            _info.read(this.input);
            self.info.push(_info);
        }
    };
    s2c_mass_boss_rank_result.param_count = 1;
    s2c_mass_boss_rank_result.optname = "onMass_boss_rank_result";
    return s2c_mass_boss_rank_result;
}());
var c2s_try_mass_boss = /** @class */ (function () {
    function c2s_try_mass_boss() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_try_mass_boss.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //全民boss编号
        self.id = this.input.readUint8();
    };
    c2s_try_mass_boss.param_count = 1;
    c2s_try_mass_boss.optname = "onTry_mass_boss";
    return c2s_try_mass_boss;
}());
var c2s_buy_mass_boss_times = /** @class */ (function () {
    function c2s_buy_mass_boss_times() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_buy_mass_boss_times.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //购买次数
        self.cnt = this.input.readUint8();
    };
    c2s_buy_mass_boss_times.param_count = 1;
    c2s_buy_mass_boss_times.optname = "onBuy_mass_boss_times";
    return c2s_buy_mass_boss_times;
}());
var c2s_group_instance_match = /** @class */ (function () {
    function c2s_group_instance_match() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_group_instance_match.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //组队副本类型
        self.indx = this.input.readUint8();
        //是否组队进入
        self.isGroup = this.input.readUint8();
    };
    c2s_group_instance_match.param_count = 2;
    c2s_group_instance_match.optname = "onGroup_instance_match";
    return c2s_group_instance_match;
}());
var c2s_buy_group_instance_times = /** @class */ (function () {
    function c2s_buy_group_instance_times() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_buy_group_instance_times.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //数量
        self.count = this.input.readUint8();
    };
    c2s_buy_group_instance_times.param_count = 1;
    c2s_buy_group_instance_times.optname = "onBuy_group_instance_times";
    return c2s_buy_group_instance_times;
}());
var c2s_talisman_active = /** @class */ (function () {
    function c2s_talisman_active() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_talisman_active.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //法宝id
        self.id = this.input.readUint32();
    };
    c2s_talisman_active.param_count = 1;
    c2s_talisman_active.optname = "onTalisman_active";
    return c2s_talisman_active;
}());
var c2s_talisman_lvup = /** @class */ (function () {
    function c2s_talisman_lvup() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_talisman_lvup.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //法宝id
        self.id = this.input.readUint32();
    };
    c2s_talisman_lvup.param_count = 1;
    c2s_talisman_lvup.optname = "onTalisman_lvup";
    return c2s_talisman_lvup;
}());
var c2s_wings_active = /** @class */ (function () {
    function c2s_wings_active() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_wings_active.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_wings_active.param_count = 0;
    c2s_wings_active.optname = "onWings_active";
    return c2s_wings_active;
}());
var c2s_wings_bless = /** @class */ (function () {
    function c2s_wings_bless() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_wings_bless.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_wings_bless.param_count = 0;
    c2s_wings_bless.optname = "onWings_bless";
    return c2s_wings_bless;
}());
var c2s_wings_rankup = /** @class */ (function () {
    function c2s_wings_rankup() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_wings_rankup.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_wings_rankup.param_count = 0;
    c2s_wings_rankup.optname = "onWings_rankup";
    return c2s_wings_rankup;
}());
var c2s_wings_strength = /** @class */ (function () {
    function c2s_wings_strength() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_wings_strength.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_wings_strength.param_count = 0;
    c2s_wings_strength.optname = "onWings_strength";
    return c2s_wings_strength;
}());
var c2s_meridian_practise = /** @class */ (function () {
    function c2s_meridian_practise() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_meridian_practise.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_meridian_practise.param_count = 0;
    c2s_meridian_practise.optname = "onMeridian_practise";
    return c2s_meridian_practise;
}());
var c2s_add_meridian_exp = /** @class */ (function () {
    function c2s_add_meridian_exp() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_add_meridian_exp.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //修炼道具的序号列表
        self.id = this.input.readUint8();
    };
    c2s_add_meridian_exp.param_count = 1;
    c2s_add_meridian_exp.optname = "onAdd_meridian_exp";
    return c2s_add_meridian_exp;
}());
var c2s_raise_mount_level_base = /** @class */ (function () {
    function c2s_raise_mount_level_base() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_raise_mount_level_base.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_raise_mount_level_base.param_count = 0;
    c2s_raise_mount_level_base.optname = "onRaise_mount_level_base";
    return c2s_raise_mount_level_base;
}());
var c2s_active_mount = /** @class */ (function () {
    function c2s_active_mount() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_active_mount.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_active_mount.param_count = 0;
    c2s_active_mount.optname = "onActive_mount";
    return c2s_active_mount;
}());
var s2c_show_faction_bossdefense_damage_list = /** @class */ (function () {
    function s2c_show_faction_bossdefense_damage_list() {
        this.optcode = 0;
        /**
         * 输出排行
         */
        this.list = new Array(); //mass_boss_rank_info
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_show_faction_bossdefense_damage_list.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //输出排行
        if (self.list.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _list = new mass_boss_rank_info;
            _list.read(this.input);
            self.list.push(_list);
        }
    };
    s2c_show_faction_bossdefense_damage_list.param_count = 1;
    s2c_show_faction_bossdefense_damage_list.optname = "onShow_faction_bossdefense_damage_list";
    return s2c_show_faction_bossdefense_damage_list;
}());
var s2c_show_faction_tower_sweep_list = /** @class */ (function () {
    function s2c_show_faction_tower_sweep_list() {
        this.optcode = 0;
        /**
         * 扫荡物品
         */
        this.list = new Array(); //item_reward_info
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_show_faction_tower_sweep_list.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //扫荡物品
        if (self.list.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _list = new item_reward_info;
            _list.read(this.input);
            self.list.push(_list);
        }
    };
    s2c_show_faction_tower_sweep_list.param_count = 1;
    s2c_show_faction_tower_sweep_list.optname = "onShow_faction_tower_sweep_list";
    return s2c_show_faction_tower_sweep_list;
}());
var s2c_send_instance_result = /** @class */ (function () {
    function s2c_send_instance_result() {
        this.optcode = 0;
        /**
         * 道具列表
         */
        this.list = new Array(); //item_reward_info
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_send_instance_result.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //副本状态(249:副本失败&250:副本通关&251:副本未通关)
        self.state = this.input.readUint8();
        //副本cd
        self.cd = this.input.readUint8();
        //道具列表
        if (self.list.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _list = new item_reward_info;
            _list.read(this.input);
            self.list.push(_list);
        }
        //副本类型
        self.type = this.input.readUint8();
        //额外数据
        self.data = this.input.readString();
    };
    s2c_send_instance_result.param_count = 5;
    s2c_send_instance_result.optname = "onSend_instance_result";
    return s2c_send_instance_result;
}());
var c2s_match_single_pvp = /** @class */ (function () {
    function c2s_match_single_pvp() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_match_single_pvp.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_match_single_pvp.param_count = 0;
    c2s_match_single_pvp.optname = "onMatch_single_pvp";
    return c2s_match_single_pvp;
}());
var c2s_buy_match_single_pvp_times = /** @class */ (function () {
    function c2s_buy_match_single_pvp_times() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_buy_match_single_pvp_times.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //购买次数
        self.cnt = this.input.readUint8();
    };
    c2s_buy_match_single_pvp_times.param_count = 1;
    c2s_buy_match_single_pvp_times.optname = "onBuy_match_single_pvp_times";
    return c2s_buy_match_single_pvp_times;
}());
var c2s_pick_match_single_pvp_extra_reward = /** @class */ (function () {
    function c2s_pick_match_single_pvp_extra_reward() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_pick_match_single_pvp_extra_reward.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //领取序号
        self.id = this.input.readUint8();
    };
    c2s_pick_match_single_pvp_extra_reward.param_count = 1;
    c2s_pick_match_single_pvp_extra_reward.optname = "onPick_match_single_pvp_extra_reward";
    return c2s_pick_match_single_pvp_extra_reward;
}());
var c2s_equipdevelop_operate = /** @class */ (function () {
    function c2s_equipdevelop_operate() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_equipdevelop_operate.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //操作类型
        self.opt_type = this.input.readUint8();
        //预留int值1
        self.reserve_int1 = this.input.readUint16();
        //预留int值2
        self.reserve_int2 = this.input.readUint16();
        //预留string值1
        self.reserve_str1 = this.input.readString();
        //预留string值2
        self.reserve_str2 = this.input.readString();
    };
    c2s_equipdevelop_operate.param_count = 5;
    c2s_equipdevelop_operate.optname = "onEquipdevelop_operate";
    return c2s_equipdevelop_operate;
}());
var c2s_active_appearance = /** @class */ (function () {
    function c2s_active_appearance() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_active_appearance.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //外观id
        self.id = this.input.readUint16();
    };
    c2s_active_appearance.param_count = 1;
    c2s_active_appearance.optname = "onActive_appearance";
    return c2s_active_appearance;
}());
var c2s_equip_appearance = /** @class */ (function () {
    function c2s_equip_appearance() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_equip_appearance.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //外观id
        self.id = this.input.readUint16();
    };
    c2s_equip_appearance.param_count = 1;
    c2s_equip_appearance.optname = "onEquip_appearance";
    return c2s_equip_appearance;
}());
var c2s_cancel_equip_appearance = /** @class */ (function () {
    function c2s_cancel_equip_appearance() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_cancel_equip_appearance.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //外观类型
        self.type = this.input.readUint8();
    };
    c2s_cancel_equip_appearance.param_count = 1;
    c2s_cancel_equip_appearance.optname = "onCancel_equip_appearance";
    return c2s_cancel_equip_appearance;
}());
var c2s_rename = /** @class */ (function () {
    function c2s_rename() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_rename.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //修改的名称
        self.name = this.input.readString();
    };
    c2s_rename.param_count = 1;
    c2s_rename.optname = "onRename";
    return c2s_rename;
}());
var c2s_unlock_title = /** @class */ (function () {
    function c2s_unlock_title() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_unlock_title.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //称号id
        self.indx = this.input.readUint8();
    };
    c2s_unlock_title.param_count = 1;
    c2s_unlock_title.optname = "onUnlock_title";
    return c2s_unlock_title;
}());
var c2s_social_buy_revenge_times = /** @class */ (function () {
    function c2s_social_buy_revenge_times() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_social_buy_revenge_times.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //次数
        self.count = this.input.readUint8();
    };
    c2s_social_buy_revenge_times.param_count = 1;
    c2s_social_buy_revenge_times.optname = "onSocial_buy_revenge_times";
    return c2s_social_buy_revenge_times;
}());
var c2s_enter_risk_instance = /** @class */ (function () {
    function c2s_enter_risk_instance() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_enter_risk_instance.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_enter_risk_instance.param_count = 0;
    c2s_enter_risk_instance.optname = "onEnter_risk_instance";
    return c2s_enter_risk_instance;
}());
var c2s_social_remove_enemy = /** @class */ (function () {
    function c2s_social_remove_enemy() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_social_remove_enemy.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //guid
        self.guid = this.input.readString();
    };
    c2s_social_remove_enemy.param_count = 1;
    c2s_social_remove_enemy.optname = "onSocial_remove_enemy";
    return c2s_social_remove_enemy;
}());
var c2s_get_player_overview = /** @class */ (function () {
    function c2s_get_player_overview() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_get_player_overview.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //玩家id
        self.guid = this.input.readString();
    };
    c2s_get_player_overview.param_count = 1;
    c2s_get_player_overview.optname = "onGet_player_overview";
    return c2s_get_player_overview;
}());
var s2c_show_player_overview = /** @class */ (function () {
    function s2c_show_player_overview() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_show_player_overview.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //玩家id
        self.guid = this.input.readString();
        //名称
        self.name = this.input.readString();
        //战力
        self.force = this.input.readUint32();
        //vip
        self.vip = this.input.readUint32();
        //称号
        self.title = this.input.readUint32();
        //性别
        self.gender = this.input.readUint32();
        //外观
        self.coat = this.input.readUint32();
        //武器外观
        self.weapon = this.input.readUint32();
    };
    s2c_show_player_overview.param_count = 8;
    s2c_show_player_overview.optname = "onShow_player_overview";
    return s2c_show_player_overview;
}());
var c2s_send_faction_invite = /** @class */ (function () {
    function c2s_send_faction_invite() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_send_faction_invite.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //玩家id
        self.guid = this.input.readString();
    };
    c2s_send_faction_invite.param_count = 1;
    c2s_send_faction_invite.optname = "onSend_faction_invite";
    return c2s_send_faction_invite;
}());
var s2c_show_faction_invite = /** @class */ (function () {
    function s2c_show_faction_invite() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_show_faction_invite.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //玩家id
        self.guid = this.input.readString();
        //玩家名称
        self.name = this.input.readString();
        //家族id
        self.faction_guid = this.input.readString();
        //家族名称
        self.faction_name = this.input.readString();
    };
    s2c_show_faction_invite.param_count = 4;
    s2c_show_faction_invite.optname = "onShow_faction_invite";
    return s2c_show_faction_invite;
}());
var c2s_buy_vipgift = /** @class */ (function () {
    function c2s_buy_vipgift() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_buy_vipgift.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //礼包id
        self.id = this.input.readUint32();
    };
    c2s_buy_vipgift.param_count = 1;
    c2s_buy_vipgift.optname = "onBuy_vipgift";
    return c2s_buy_vipgift;
}());
var c2s_activity_opt_buy_dailygift = /** @class */ (function () {
    function c2s_activity_opt_buy_dailygift() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_activity_opt_buy_dailygift.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //活动id
        self.act_id = this.input.readUint32();
        //礼包下标
        self.index = this.input.readUint32();
    };
    c2s_activity_opt_buy_dailygift.param_count = 2;
    c2s_activity_opt_buy_dailygift.optname = "onActivity_opt_buy_dailygift";
    return c2s_activity_opt_buy_dailygift;
}());
var c2s_draw_lottery = /** @class */ (function () {
    function c2s_draw_lottery() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_draw_lottery.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //活动id
        self.actId = this.input.readUint32();
        //类型
        self.type = this.input.readUint8();
    };
    c2s_draw_lottery.param_count = 2;
    c2s_draw_lottery.optname = "onDraw_lottery";
    return c2s_draw_lottery;
}());
var c2s_activity_opt_get_rank_process_reward = /** @class */ (function () {
    function c2s_activity_opt_get_rank_process_reward() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_activity_opt_get_rank_process_reward.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //活动id
        self.act_id = this.input.readUint32();
        //奖励下标
        self.index = this.input.readUint32();
    };
    c2s_activity_opt_get_rank_process_reward.param_count = 2;
    c2s_activity_opt_get_rank_process_reward.optname = "onActivity_opt_get_rank_process_reward";
    return c2s_activity_opt_get_rank_process_reward;
}());
var c2s_activity_opt_get_rank_list = /** @class */ (function () {
    function c2s_activity_opt_get_rank_list() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_activity_opt_get_rank_list.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //活动id
        self.act_id = this.input.readUint32();
    };
    c2s_activity_opt_get_rank_list.param_count = 1;
    c2s_activity_opt_get_rank_list.optname = "onActivity_opt_get_rank_list";
    return c2s_activity_opt_get_rank_list;
}());
var s2c_activity_opt_show_rank_list = /** @class */ (function () {
    function s2c_activity_opt_show_rank_list() {
        this.optcode = 0;
        /**
         * 排行列表
         */
        this.list = new Array(); //act_rank_info
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_activity_opt_show_rank_list.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //活动id
        self.act_id = this.input.readUint32();
        //排行列表
        if (self.list.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _list = new act_rank_info;
            _list.read(this.input);
            self.list.push(_list);
        }
    };
    s2c_activity_opt_show_rank_list.param_count = 2;
    s2c_activity_opt_show_rank_list.optname = "onActivity_opt_show_rank_list";
    return s2c_activity_opt_show_rank_list;
}());
var c2s_activity_opt_buy_limitgift = /** @class */ (function () {
    function c2s_activity_opt_buy_limitgift() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_activity_opt_buy_limitgift.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //活动id
        self.act_id = this.input.readUint32();
        //礼包下标
        self.index = this.input.readUint32();
    };
    c2s_activity_opt_buy_limitgift.param_count = 2;
    c2s_activity_opt_buy_limitgift.optname = "onActivity_opt_buy_limitgift";
    return c2s_activity_opt_buy_limitgift;
}());
var c2s_welfare_get_recharge_reward = /** @class */ (function () {
    function c2s_welfare_get_recharge_reward() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_welfare_get_recharge_reward.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //奖励id
        self.id = this.input.readUint8();
    };
    c2s_welfare_get_recharge_reward.param_count = 1;
    c2s_welfare_get_recharge_reward.optname = "onWelfare_get_recharge_reward";
    return c2s_welfare_get_recharge_reward;
}());
var c2s_welfare_get_consume_reward = /** @class */ (function () {
    function c2s_welfare_get_consume_reward() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_welfare_get_consume_reward.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //奖励id
        self.id = this.input.readUint8();
    };
    c2s_welfare_get_consume_reward.param_count = 1;
    c2s_welfare_get_consume_reward.optname = "onWelfare_get_consume_reward";
    return c2s_welfare_get_consume_reward;
}());
var c2s_welfare_get_sevenday_reward = /** @class */ (function () {
    function c2s_welfare_get_sevenday_reward() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_welfare_get_sevenday_reward.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //奖励id
        self.id = this.input.readUint8();
    };
    c2s_welfare_get_sevenday_reward.param_count = 1;
    c2s_welfare_get_sevenday_reward.optname = "onWelfare_get_sevenday_reward";
    return c2s_welfare_get_sevenday_reward;
}());
var s2c_send_server_open_time = /** @class */ (function () {
    function s2c_send_server_open_time() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_send_server_open_time.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //时间戳
        self.open_time = this.input.readUint32();
    };
    s2c_send_server_open_time.param_count = 1;
    s2c_send_server_open_time.optname = "onSend_server_open_time";
    return s2c_send_server_open_time;
}());
var c2s_risk_get_rank = /** @class */ (function () {
    function c2s_risk_get_rank() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_risk_get_rank.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_risk_get_rank.param_count = 0;
    c2s_risk_get_rank.optname = "onRisk_get_rank";
    return c2s_risk_get_rank;
}());
var s2c_risk_get_rank_result = /** @class */ (function () {
    function s2c_risk_get_rank_result() {
        this.optcode = 0;
        /**
         * 排行列表
         */
        this.list = new Array(); //act_rank_info
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_risk_get_rank_result.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //排行列表
        if (self.list.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _list = new act_rank_info;
            _list.read(this.input);
            self.list.push(_list);
        }
    };
    s2c_risk_get_rank_result.param_count = 1;
    s2c_risk_get_rank_result.optname = "onRisk_get_rank_result";
    return s2c_risk_get_rank_result;
}());
var c2s_set_orient = /** @class */ (function () {
    function c2s_set_orient() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_set_orient.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //角度
        self.angle = this.input.readUint16();
    };
    c2s_set_orient.param_count = 1;
    c2s_set_orient.optname = "onSet_orient";
    return c2s_set_orient;
}());
var c2s_use_moneytree = /** @class */ (function () {
    function c2s_use_moneytree() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_use_moneytree.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_use_moneytree.param_count = 0;
    c2s_use_moneytree.optname = "onUse_moneytree";
    return c2s_use_moneytree;
}());
var c2s_get_moneytree_gift = /** @class */ (function () {
    function c2s_get_moneytree_gift() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_get_moneytree_gift.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //礼包id
        self.id = this.input.readUint32();
    };
    c2s_get_moneytree_gift.param_count = 1;
    c2s_get_moneytree_gift.optname = "onGet_moneytree_gift";
    return c2s_get_moneytree_gift;
}());
var c2s_set_world_risk_last_id = /** @class */ (function () {
    function c2s_set_world_risk_last_id() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_set_world_risk_last_id.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //幻境id
        self.id = this.input.readUint32();
    };
    c2s_set_world_risk_last_id.param_count = 1;
    c2s_set_world_risk_last_id.optname = "onSet_world_risk_last_id";
    return c2s_set_world_risk_last_id;
}());
var c2s_enter_private_boss = /** @class */ (function () {
    function c2s_enter_private_boss() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_enter_private_boss.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //Bossid
        self.id = this.input.readUint32();
    };
    c2s_enter_private_boss.param_count = 1;
    c2s_enter_private_boss.optname = "onEnter_private_boss";
    return c2s_enter_private_boss;
}());
var c2s_raise_base_spell_all = /** @class */ (function () {
    function c2s_raise_base_spell_all() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_raise_base_spell_all.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //技能类型
        self.raiseType = this.input.readUint8();
        //技能ID字符串
        self.spellIdStr = this.input.readString();
    };
    c2s_raise_base_spell_all.param_count = 2;
    c2s_raise_base_spell_all.optname = "onRaise_base_spell_all";
    return c2s_raise_base_spell_all;
}());
var c2s_use_restore_potion = /** @class */ (function () {
    function c2s_use_restore_potion() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_use_restore_potion.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_use_restore_potion.param_count = 0;
    c2s_use_restore_potion.optname = "onUse_restore_potion";
    return c2s_use_restore_potion;
}());
var c2s_pick_quest_adventure = /** @class */ (function () {
    function c2s_pick_quest_adventure() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_pick_quest_adventure.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //下标
        self.indx = this.input.readUint32();
    };
    c2s_pick_quest_adventure.param_count = 1;
    c2s_pick_quest_adventure.optname = "onPick_quest_adventure";
    return c2s_pick_quest_adventure;
}());
var c2s_raise_adventurespell = /** @class */ (function () {
    function c2s_raise_adventurespell() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_raise_adventurespell.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //技能ID
        self.spellId = this.input.readUint32();
    };
    c2s_raise_adventurespell.param_count = 1;
    c2s_raise_adventurespell.optname = "onRaise_adventurespell";
    return c2s_raise_adventurespell;
}());
var c2s_pick_quest_realmbreak = /** @class */ (function () {
    function c2s_pick_quest_realmbreak() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_pick_quest_realmbreak.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //下标
        self.indx = this.input.readUint32();
    };
    c2s_pick_quest_realmbreak.param_count = 1;
    c2s_pick_quest_realmbreak.optname = "onPick_quest_realmbreak";
    return c2s_pick_quest_realmbreak;
}());
var c2s_pick_realmbreak_daily_reward = /** @class */ (function () {
    function c2s_pick_realmbreak_daily_reward() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_pick_realmbreak_daily_reward.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_pick_realmbreak_daily_reward.param_count = 0;
    c2s_pick_realmbreak_daily_reward.optname = "onPick_realmbreak_daily_reward";
    return c2s_pick_realmbreak_daily_reward;
}());
var c2s_group_create = /** @class */ (function () {
    function c2s_group_create() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_group_create.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //队伍类型
        self.type = this.input.readUint32();
        //队伍最低等级
        self.min_lev = this.input.readUint32();
        //队伍最大等级
        self.max_lev = this.input.readUint32();
        //队伍自动接受申请 0 关闭 1 打开
        self.auto_flag = this.input.readUint32();
    };
    c2s_group_create.param_count = 4;
    c2s_group_create.optname = "onGroup_create";
    return c2s_group_create;
}());
var c2s_group_join_request = /** @class */ (function () {
    function c2s_group_join_request() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_group_join_request.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //队伍guid
        self.guid = this.input.readString();
    };
    c2s_group_join_request.param_count = 1;
    c2s_group_join_request.optname = "onGroup_join_request";
    return c2s_group_join_request;
}());
var c2s_group_join_accept = /** @class */ (function () {
    function c2s_group_join_accept() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_group_join_accept.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //玩家guid
        self.guid = this.input.readString();
    };
    c2s_group_join_accept.param_count = 1;
    c2s_group_join_accept.optname = "onGroup_join_accept";
    return c2s_group_join_accept;
}());
var c2s_group_quit = /** @class */ (function () {
    function c2s_group_quit() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_group_quit.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_group_quit.param_count = 0;
    c2s_group_quit.optname = "onGroup_quit";
    return c2s_group_quit;
}());
var c2s_group_give_captain = /** @class */ (function () {
    function c2s_group_give_captain() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_group_give_captain.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //玩家index
        self.index = this.input.readUint32();
    };
    c2s_group_give_captain.param_count = 1;
    c2s_group_give_captain.optname = "onGroup_give_captain";
    return c2s_group_give_captain;
}());
var c2s_group_kick = /** @class */ (function () {
    function c2s_group_kick() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_group_kick.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //玩家index
        self.index = this.input.readUint32();
    };
    c2s_group_kick.param_count = 1;
    c2s_group_kick.optname = "onGroup_kick";
    return c2s_group_kick;
}());
var s2c_show_loot_animate = /** @class */ (function () {
    function s2c_show_loot_animate() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_show_loot_animate.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //玩家guid
        self.info = this.input.readString();
    };
    s2c_show_loot_animate.param_count = 1;
    s2c_show_loot_animate.optname = "onShow_loot_animate";
    return s2c_show_loot_animate;
}());
var c2s_enter_stage_instance = /** @class */ (function () {
    function c2s_enter_stage_instance() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_enter_stage_instance.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_enter_stage_instance.param_count = 0;
    c2s_enter_stage_instance.optname = "onEnter_stage_instance";
    return c2s_enter_stage_instance;
}());
var c2s_pick_stage_instance_bonus = /** @class */ (function () {
    function c2s_pick_stage_instance_bonus() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_pick_stage_instance_bonus.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //宝箱下标
        self.id = this.input.readUint32();
    };
    c2s_pick_stage_instance_bonus.param_count = 1;
    c2s_pick_stage_instance_bonus.optname = "onPick_stage_instance_bonus";
    return c2s_pick_stage_instance_bonus;
}());
var c2s_enter_group_exp = /** @class */ (function () {
    function c2s_enter_group_exp() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_enter_group_exp.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //是否组队进入
        self.isGroup = this.input.readUint8();
    };
    c2s_enter_group_exp.param_count = 1;
    c2s_enter_group_exp.optname = "onEnter_group_exp";
    return c2s_enter_group_exp;
}());
var s2c_check_for_group_enter = /** @class */ (function () {
    function s2c_check_for_group_enter() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_check_for_group_enter.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //副本子类型
        self.instSubType = this.input.readUint32();
    };
    s2c_check_for_group_enter.param_count = 1;
    s2c_check_for_group_enter.optname = "onCheck_for_group_enter";
    return s2c_check_for_group_enter;
}());
var c2s_select_group_enter = /** @class */ (function () {
    function c2s_select_group_enter() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_select_group_enter.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //结果
        self.choise = this.input.readUint8();
    };
    c2s_select_group_enter.param_count = 1;
    c2s_select_group_enter.optname = "onSelect_group_enter";
    return c2s_select_group_enter;
}());
var c2s_buy_group_exp_times = /** @class */ (function () {
    function c2s_buy_group_exp_times() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_buy_group_exp_times.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //数量
        self.count = this.input.readUint8();
    };
    c2s_buy_group_exp_times.param_count = 1;
    c2s_buy_group_exp_times.optname = "onBuy_group_exp_times";
    return c2s_buy_group_exp_times;
}());
var c2s_buy_inspiration = /** @class */ (function () {
    function c2s_buy_inspiration() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_buy_inspiration.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //购买类型
        self.category = this.input.readUint8();
    };
    c2s_buy_inspiration.param_count = 1;
    c2s_buy_inspiration.optname = "onBuy_inspiration";
    return c2s_buy_inspiration;
}());
var c2s_enter_faction_match_map = /** @class */ (function () {
    function c2s_enter_faction_match_map() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_enter_faction_match_map.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_enter_faction_match_map.param_count = 0;
    c2s_enter_faction_match_map.optname = "onEnter_faction_match_map";
    return c2s_enter_faction_match_map;
}());
var c2s_pick_faction_match_champion_daily_reward = /** @class */ (function () {
    function c2s_pick_faction_match_champion_daily_reward() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_pick_faction_match_champion_daily_reward.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_pick_faction_match_champion_daily_reward.param_count = 0;
    c2s_pick_faction_match_champion_daily_reward.optname = "onPick_faction_match_champion_daily_reward";
    return c2s_pick_faction_match_champion_daily_reward;
}());
var c2s_query_faction_match_info = /** @class */ (function () {
    function c2s_query_faction_match_info() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_query_faction_match_info.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_query_faction_match_info.param_count = 0;
    c2s_query_faction_match_info.optname = "onQuery_faction_match_info";
    return c2s_query_faction_match_info;
}());
var s2c_show_faction_match_info_list = /** @class */ (function () {
    function s2c_show_faction_match_info_list() {
        this.optcode = 0;
        /**
         * 排行列表
         */
        this.list = new Array(); //faction_match_info
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_show_faction_match_info_list.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //排行列表
        if (self.list.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _list = new faction_match_info;
            _list.read(this.input);
            self.list.push(_list);
        }
    };
    s2c_show_faction_match_info_list.param_count = 1;
    s2c_show_faction_match_info_list.optname = "onShow_faction_match_info_list";
    return s2c_show_faction_match_info_list;
}());
var c2s_pick_res_instance_first_reward = /** @class */ (function () {
    function c2s_pick_res_instance_first_reward() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_pick_res_instance_first_reward.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //副本id
        self.id = this.input.readUint32();
    };
    c2s_pick_res_instance_first_reward.param_count = 1;
    c2s_pick_res_instance_first_reward.optname = "onPick_res_instance_first_reward";
    return c2s_pick_res_instance_first_reward;
}());
var c2s_group_send_invite = /** @class */ (function () {
    function c2s_group_send_invite() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_group_send_invite.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //玩家guid
        self.guid = this.input.readString();
    };
    c2s_group_send_invite.param_count = 1;
    c2s_group_send_invite.optname = "onGroup_send_invite";
    return c2s_group_send_invite;
}());
var s2c_show_group_invite = /** @class */ (function () {
    function s2c_show_group_invite() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_show_group_invite.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //队伍guid
        self.guid = this.input.readString();
        //邀请者名称
        self.name = this.input.readString();
        //队伍类型
        self.type = this.input.readUint32();
        //邀请者等级
        self.level = this.input.readUint32();
        //邀请者战力
        self.force = this.input.readDouble();
        //邀请者guid
        self.sender_guid = this.input.readString();
    };
    s2c_show_group_invite.param_count = 6;
    s2c_show_group_invite.optname = "onShow_group_invite";
    return s2c_show_group_invite;
}());
var c2s_group_agree_invite = /** @class */ (function () {
    function c2s_group_agree_invite() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_group_agree_invite.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //队伍guid
        self.guid = this.input.readString();
        //邀请者guid
        self.sendGuid = this.input.readString();
    };
    c2s_group_agree_invite.param_count = 2;
    c2s_group_agree_invite.optname = "onGroup_agree_invite";
    return c2s_group_agree_invite;
}());
var c2s_get_group_search_info_list = /** @class */ (function () {
    function c2s_get_group_search_info_list() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_get_group_search_info_list.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //队伍类型
        self.type = this.input.readUint32();
    };
    c2s_get_group_search_info_list.param_count = 1;
    c2s_get_group_search_info_list.optname = "onGet_group_search_info_list";
    return c2s_get_group_search_info_list;
}());
var s2c_show_group_search_info_list = /** @class */ (function () {
    function s2c_show_group_search_info_list() {
        this.optcode = 0;
        /**
         * 队伍信息
         */
        this.list = new Array(); //group_search_info
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_show_group_search_info_list.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //队伍信息
        if (self.list.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _list = new group_search_info;
            _list.read(this.input);
            self.list.push(_list);
        }
    };
    s2c_show_group_search_info_list.param_count = 1;
    s2c_show_group_search_info_list.optname = "onShow_group_search_info_list";
    return s2c_show_group_search_info_list;
}());
var c2s_group_change_config = /** @class */ (function () {
    function c2s_group_change_config() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_group_change_config.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //队伍类型
        self.type = this.input.readUint32();
        //队伍最低等级
        self.min_lev = this.input.readUint32();
        //队伍最大等级
        self.max_lev = this.input.readUint32();
        //队伍自动接受申请 0 关闭 1 打开
        self.auto_flag = this.input.readUint32();
    };
    c2s_group_change_config.param_count = 4;
    c2s_group_change_config.optname = "onGroup_change_config";
    return c2s_group_change_config;
}());
var s2c_show_group_join_request = /** @class */ (function () {
    function s2c_show_group_join_request() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_show_group_join_request.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //玩家guid
        self.guid = this.input.readString();
        //玩家名称
        self.name = this.input.readString();
        //玩家职业
        self.gender = this.input.readUint32();
        //玩家等级
        self.level = this.input.readUint32();
        //玩家vip等级
        self.vip = this.input.readUint32();
        //玩家战力
        self.force = this.input.readDouble();
    };
    s2c_show_group_join_request.param_count = 6;
    s2c_show_group_join_request.optname = "onShow_group_join_request";
    return s2c_show_group_join_request;
}());
var c2s_group_join_denied = /** @class */ (function () {
    function c2s_group_join_denied() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_group_join_denied.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //玩家guid
        self.guid = this.input.readString();
    };
    c2s_group_join_denied.param_count = 1;
    c2s_group_join_denied.optname = "onGroup_join_denied";
    return c2s_group_join_denied;
}());
var c2s_group_invite_denied = /** @class */ (function () {
    function c2s_group_invite_denied() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_group_invite_denied.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //队伍guid
        self.guid = this.input.readString();
    };
    c2s_group_invite_denied.param_count = 1;
    c2s_group_invite_denied.optname = "onGroup_invite_denied";
    return c2s_group_invite_denied;
}());
var c2s_talisman_equip = /** @class */ (function () {
    function c2s_talisman_equip() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_talisman_equip.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //法宝id
        self.id = this.input.readUint32();
    };
    c2s_talisman_equip.param_count = 1;
    c2s_talisman_equip.optname = "onTalisman_equip";
    return c2s_talisman_equip;
}());
var c2s_talisman_unequip = /** @class */ (function () {
    function c2s_talisman_unequip() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_talisman_unequip.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //槽位id
        self.slot_id = this.input.readUint32();
    };
    c2s_talisman_unequip.param_count = 1;
    c2s_talisman_unequip.optname = "onTalisman_unequip";
    return c2s_talisman_unequip;
}());
var s2c_fullize_hp = /** @class */ (function () {
    function s2c_fullize_hp() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_fullize_hp.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //地图id
        self.guid = this.input.readString();
    };
    s2c_fullize_hp.param_count = 1;
    s2c_fullize_hp.optname = "onFullize_hp";
    return s2c_fullize_hp;
}());
var c2s_auto_group_match = /** @class */ (function () {
    function c2s_auto_group_match() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_auto_group_match.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //目标类型
        self.targetType = this.input.readUint32();
    };
    c2s_auto_group_match.param_count = 1;
    c2s_auto_group_match.optname = "onAuto_group_match";
    return c2s_auto_group_match;
}());
var c2s_cancel_auto_group_match = /** @class */ (function () {
    function c2s_cancel_auto_group_match() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_cancel_auto_group_match.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_cancel_auto_group_match.param_count = 0;
    c2s_cancel_auto_group_match.optname = "onCancel_auto_group_match";
    return c2s_cancel_auto_group_match;
}());
var c2s_kuafu_3v3_group_match = /** @class */ (function () {
    function c2s_kuafu_3v3_group_match() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_kuafu_3v3_group_match.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_kuafu_3v3_group_match.param_count = 0;
    c2s_kuafu_3v3_group_match.optname = "onKuafu_3v3_group_match";
    return c2s_kuafu_3v3_group_match;
}());
var c2s_booking_money = /** @class */ (function () {
    function c2s_booking_money() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_booking_money.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //订单号
        self.orderid = this.input.readString();
        //商品名称
        self.goodsname = this.input.readString();
        //金额
        self.money1 = this.input.readString();
        //元宝数量
        self.goodsnum = this.input.readUint32();
    };
    c2s_booking_money.param_count = 4;
    c2s_booking_money.optname = "onBooking_money";
    return c2s_booking_money;
}());
var s2c_booking_money_result = /** @class */ (function () {
    function s2c_booking_money_result() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_booking_money_result.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //订单号
        self.orderid = this.input.readString();
        //成功或者失败
        self.result = this.input.readUint8();
    };
    s2c_booking_money_result.param_count = 2;
    s2c_booking_money_result.optname = "onBooking_money_result";
    return s2c_booking_money_result;
}());
var c2s_one_step_robot_up = /** @class */ (function () {
    function c2s_one_step_robot_up() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_one_step_robot_up.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //参数
        self.id = this.input.readUint32();
    };
    c2s_one_step_robot_up.param_count = 1;
    c2s_one_step_robot_up.optname = "onOne_step_robot_up";
    return c2s_one_step_robot_up;
}());
var c2s_get_seven_day_recharge_extra_reward = /** @class */ (function () {
    function c2s_get_seven_day_recharge_extra_reward() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_get_seven_day_recharge_extra_reward.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //奖励id
        self.id = this.input.readUint32();
    };
    c2s_get_seven_day_recharge_extra_reward.param_count = 1;
    c2s_get_seven_day_recharge_extra_reward.optname = "onGet_seven_day_recharge_extra_reward";
    return c2s_get_seven_day_recharge_extra_reward;
}());
var c2s_use_giftcode = /** @class */ (function () {
    function c2s_use_giftcode() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_use_giftcode.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //兑换码
        self.giftcode = this.input.readString();
    };
    c2s_use_giftcode.param_count = 1;
    c2s_use_giftcode.optname = "onUse_giftcode";
    return c2s_use_giftcode;
}());
var s2c_show_giftcode_reward_list = /** @class */ (function () {
    function s2c_show_giftcode_reward_list() {
        this.optcode = 0;
        /**
         * 道具
         */
        this.list = new Array(); //item_reward_info
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_show_giftcode_reward_list.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //道具
        if (self.list.length)
            throw Error("通讯对象池有异常");
        var parmLen = this.input.readUint16();
        for (var i = 0; i < parmLen; i++) {
            var _list = new item_reward_info;
            _list.read(this.input);
            self.list.push(_list);
        }
    };
    s2c_show_giftcode_reward_list.param_count = 1;
    s2c_show_giftcode_reward_list.optname = "onShow_giftcode_reward_list";
    return s2c_show_giftcode_reward_list;
}());
var c2s_lottery_recharge = /** @class */ (function () {
    function c2s_lottery_recharge() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    c2s_lottery_recharge.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
    };
    c2s_lottery_recharge.param_count = 0;
    c2s_lottery_recharge.optname = "onLottery_recharge";
    return c2s_lottery_recharge;
}());
var s2c_lottery_recharge_result = /** @class */ (function () {
    function s2c_lottery_recharge_result() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_lottery_recharge_result.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //抽奖indx
        self.indx = this.input.readUint8();
    };
    s2c_lottery_recharge_result.param_count = 1;
    s2c_lottery_recharge_result.optname = "onLottery_recharge_result";
    return s2c_lottery_recharge_result;
}());
var s2c_show_cast_remain_skill = /** @class */ (function () {
    function s2c_show_cast_remain_skill() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_show_cast_remain_skill.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //技能id
        self.id = this.input.readUint32();
    };
    s2c_show_cast_remain_skill.param_count = 1;
    s2c_show_cast_remain_skill.optname = "onShow_cast_remain_skill";
    return s2c_show_cast_remain_skill;
}());
var s2c_after_create_role = /** @class */ (function () {
    function s2c_after_create_role() {
        this.optcode = 0;
    }
    /**
     从输入二进制流中读取结构体
     */
    s2c_after_create_role.read = function (self, bytes) {
        if (this.input == null)
            this.input = new ByteArray();
        this.input = bytes;
        //var parmLen:uint;
        //var i:int;
        //服务器id
        self.serverId = this.input.readString();
        //角色id
        self.guid = this.input.readString();
        //玩家名称
        self.nickname = this.input.readString();
    };
    s2c_after_create_role.param_count = 3;
    s2c_after_create_role.optname = "onAfter_create_role";
    return s2c_after_create_role;
}());
//# sourceMappingURL=clientmsg.js.map