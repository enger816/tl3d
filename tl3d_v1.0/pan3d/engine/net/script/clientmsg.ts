/***********************************************************************/
/*************** 本代码由协议工具自动生成，请勿手动修改 ****************/
/***********************************************************************/





module Pan3d {


    export class both_sync_mstime {
        public optcode: number = 0;
        public static param_count: number = 3;
        public static optname: string = "onSync_mstime";
        private static input: Pan3dByteArray;

        /**
         * 服务器运行的毫秒数
         */
        public mstime_now: number;	//uint32		
        /**
         * 自然时间
         */
        public time_now: number;	//uint32		
        /**
         * 自然时间的服务器启动时间
         */
        public open_time: number;	//uint32		

        /**
         从输入二进制流中读取结构体
         */
        public static read(self: both_sync_mstime, bytes: Pan3dByteArray): void {
            if (this.input == null)
                this.input = new Pan3dByteArray();
            this.input = bytes;

            //var parmLen:uint;
            //var i:int;
            //服务器运行的毫秒数
            self.mstime_now = this.input.readUint32();

            //自然时间
            self.time_now = this.input.readUint32();

            //自然时间的服务器启动时间
            self.open_time = this.input.readUint32();

        }
    }

    export class both_sync_mstime_app {
        public optcode: number = 0;
        public static param_count: number = 3;
        public static optname: string = "onSync_mstime_app";
        private static input: Pan3dByteArray;

        /**
         * 服务器运行的毫秒数
         */
        public mstime_now: number;	//uint32		
        /**
         * 自然时间
         */
        public time_now: number;	//uint32		
        /**
         * 自然时间的服务器启动时间
         */
        public open_time: number;	//uint32		

        /**
         从输入二进制流中读取结构体
         */
        public static read(self: both_sync_mstime_app, bytes: Pan3dByteArray): void {
            if (this.input == null)
                this.input = new Pan3dByteArray();
            this.input = bytes;

            //var parmLen:uint;
            //var i:int;
            //服务器运行的毫秒数
            self.mstime_now = this.input.readUint32();

            //自然时间
            self.time_now = this.input.readUint32();

            //自然时间的服务器启动时间
            self.open_time = this.input.readUint32();

        }
    }


}