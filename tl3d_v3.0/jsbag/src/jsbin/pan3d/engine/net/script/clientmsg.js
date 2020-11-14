/***********************************************************************/
/*************** 本代码由协议工具自动生成，请勿手动修改 ****************/
/***********************************************************************/
var Pan3d;
(function (Pan3d) {
    var both_sync_mstime = /** @class */ (function () {
        function both_sync_mstime() {
            this.optcode = 0;
        }
        /**
         从输入二进制流中读取结构体
         */
        both_sync_mstime.read = function (self, bytes) {
            if (this.input == null)
                this.input = new Pan3d.Pan3dByteArray();
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
    Pan3d.both_sync_mstime = both_sync_mstime;
    var both_sync_mstime_app = /** @class */ (function () {
        function both_sync_mstime_app() {
            this.optcode = 0;
        }
        /**
         从输入二进制流中读取结构体
         */
        both_sync_mstime_app.read = function (self, bytes) {
            if (this.input == null)
                this.input = new Pan3d.Pan3dByteArray();
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
    Pan3d.both_sync_mstime_app = both_sync_mstime_app;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=clientmsg.js.map