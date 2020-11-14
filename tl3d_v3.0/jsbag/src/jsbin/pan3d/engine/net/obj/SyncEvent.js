var Pan3d;
(function (Pan3d) {
    var SyncEvent = /** @class */ (function () {
        function SyncEvent() {
        }
        SyncEvent.init = function () {
            SyncEvent.tmpValueBytes = new Pan3d.Pan3dByteArray;
            SyncEvent.tmpValueBytes.endian = Pan3d.Endian.LITTLE_ENDIAN;
        };
        //为了防止对象更新标识与下标更新标识冲突,所以让对象更新标识占用第2位
        SyncEvent.OBJ_OPT_NEW = 0x01; //新对象
        SyncEvent.OBJ_OPT_DELETE = 0x02; //删除对象
        SyncEvent.OBJ_OPT_UPDATE = 0x04; //对象更新
        SyncEvent.OBJ_OPT_BINLOG = 0x08; //BINLOG方式
        SyncEvent.OBJ_OPT_U_GUID = 0x10; //打包方式ID为整形
        SyncEvent.OPT_SET = 0x01;
        SyncEvent.OPT_UNSET = 0x02;
        SyncEvent.OPT_ADD = 0x04;
        SyncEvent.OPT_SUB = 0x08;
        SyncEvent.TYPE_UINT32 = 0;
        SyncEvent.TYPE_UINT16 = 1;
        SyncEvent.TYPE_UINT8 = 2;
        SyncEvent.TYPE_BIT = 3;
        SyncEvent.TYPE_UINT64 = 4;
        SyncEvent.TYPE_INT32 = 5;
        SyncEvent.TYPE_STRING = 6;
        SyncEvent.TYPE_INT16 = 7;
        //		public static TYPE_INT8 :number = 8;
        SyncEvent.TYPE_FLOAT = 9;
        SyncEvent.TYPE_DOUBLE = 10;
        SyncEvent.ATOMIC_OPT_RESULT_NO = 0; //不是原子操作
        SyncEvent.ATOMIC_OPT_RESULT_TRY = 1; //尝试原子操作
        SyncEvent.ATOMIC_OPT_RESULT_OK = 2; //原子操作成功
        SyncEvent.ATOMIC_OPT_RESULT_FAILED = -1; //原子操作失败
        return SyncEvent;
    }());
    Pan3d.SyncEvent = SyncEvent;
    SyncEvent.init();
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SyncEvent.js.map