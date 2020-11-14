/**
	 * 用于记录所有的同步事件，目前最常用于ui重绘
	 * 记录时，先通过testRecorder验证是否是关心的对象，
	 * 再调用push将所关心的的binlog用自定义的格式记录下来
	 * 现在使用的格式为(数量-short,(index-short,oldValue-unumber)...)
	 * 通过pop可以得到当前队列中的所有符合条件的事件消息，并调用相应的处理函数
	 * @author linbc
	 */	
module Pan3d {
    export class SyncEventFilter extends SyncEvent {
        /**
             * 标识为是个新对象 
             */
        public static EV_NEW: number = 0;
		/**
		 * 标识为对象消失 
		 */
        public static EV_DEL: number = 1;
		/**
		 * 对象整型下标发生变化 
		 */
        public static EV_UPDATE_I: number = 2;
		/**
		 * 对象字符串下标发生变化 
		 */
        public static EV_UPDATE_S: number = 3;

        //该消息管理是否属于活动状态
        private _opening: Boolean;

        //用于标记开始记录的事件属于哪个对象
        //当这个对象发生变化的时候，必须打包一个对象变化值
        private _curObj: GuidObject;//need
        private _curEventCount: number;

        //事件对象队列
        private _eventObjs: Array<string>;

        //事件的参数,使用ByteArray进行记录，参数格式由应用自行决定
        private _eventParams: Pan3dByteArray;

        public open(): void {
            if (!this._opening)
                this._opening = true;
        }

		/**
		 * 关闭对象事件管理 
		 */
        public close(): void {
            if (this._opening) {
                this._opening = false;
                this._curObj = null;
                this._curEventCount = 0;
                this._eventObjs.length = 0;
                this._eventParams.clear();
            }
        }

		/**
		 * 初始化
		 */
        public SyncEventFilter() {
            this._opening = false;
            this._curObj = null;
            this._curEventCount = 0;
            this._eventParams = new Pan3dByteArray;
            this._eventParams.endian = Endian.LITTLE_ENDIAN;
            this._eventObjs = new Array<string>();
        }

        public beginPush(obj: GuidObject): Boolean {//need
            //如果以前的当前对象不等于空，则需要判断是否是空
            if (this._curObj)
                this.endPush();

            this._curObj = obj;
            //插入对象ID及事件数量，0显然是不准的 ,仅用于占位
            this._eventObjs.push(obj.guid);
            this._eventParams.writeShort(0);
            return true;
        }

		/**
		 * 有始有终嘛，修改binlog数量,或者移除符合条件，但是没有记录到事件的对象ID
		 */
        public endPush(): void {
            if (this._curEventCount) {
                var curPos: number = this._eventParams.position;
                //两个short加上一个number 8个字节
                this._eventParams.position -= 8 * this._curEventCount;
                //向前移动两个字节，用于记录数量
                this._eventParams.position -= 2;
                this._eventParams.writeShort(this._curEventCount);
                this._curEventCount = 0;
                this._eventParams.position = curPos;
            } else {
                //移除该guid
                this._eventObjs.splice(this._eventObjs.length - 1, 1);
                //移除binlog数量的记录值,short占用两个字节
                this._eventParams.position -= 2;
            }
            this._curObj = null;
        }


        private writeParam(ev: number, index: number, oldVal: number): void {
            this._eventParams.writeShort(ev);
            this._eventParams.writeShort(index);
            this._eventParams.writeInt(oldVal);
            this._curEventCount++;
        }


        public pushDelete(): void {
            this.writeParam(SyncEventFilter.EV_DEL, 0, 0);
        }

        public pushNew(): void {
            this.writeParam(SyncEventFilter.EV_NEW, 0, 0);
        }

        public pushUpdateMask(typ: number, mask: UpdateMask): void {
            //var opt:number = (typ == TYPE_STRING?EV_UPDATE_S:EV_UPDATE_I);	
            var len: number = mask.GetCount();
            var i: number;
            if (typ == SyncEvent.TYPE_STRING) {
                //对于字符串而言无需要保存旧值，这里写入的错误的值，但是没有关系
                for (i = 0; i < len; i++) {
                    if (mask.GetBit(i))
                        this.writeParam(SyncEventFilter.EV_UPDATE_S, i, 0);
                }
            } else {
                for (i = 0; i < len; i++) {
                    if (mask.GetBit(i))
                        this.writeParam(SyncEventFilter.EV_UPDATE_I, i, this._curObj.GetInt32(i));
                }
            }
        }

		/**
		 * 对象更新调用该接口进行数据插入,相应的会记录成UI可以理解的数据格式 
		 * @param binlog
		 * 
		 */

        public pushBinlog(binlog: BinLogStru): void {
            //如果是原子操作则忽略
            if (binlog._atomic_opt != 0)
                return;
            var opt: number = (binlog._typ == SyncEvent.TYPE_STRING ? SyncEventFilter.EV_UPDATE_S : SyncEventFilter.EV_UPDATE_I);
            this.writeParam(opt, binlog.index, this._curObj.GetInt32(binlog.index));
        }

		/**
		 * 开始读之先，置一下，数组的位置 
		 * 
		 */
        public beginPop(): void {
            this._eventParams.position = 0;
        }

		/**
		 * 开始弹出一个对象的事件,返回空的时候就是没有对象 
		 * @param params
		 * @return 对象的guid
		 * 
		 */
        public pop(params: Array<number>): string {
            if (this._eventObjs.length == 0)
                return "";
            //先清空
            params.length = 0;
            var len: number = this._eventParams.readShort();
            for (var i: number = 0; i < len; i++) {
                //读取一个
                params.push(this._eventParams.readShort());	//操作类型
                params.push(this._eventParams.readShort());	//变化下标
                params.push(this._eventParams.readInt());	//原值
            }
            return this._eventObjs.shift();
        }

		/**
		 * 读完了，清空一下数据 
		 * 
		 */
        public endPop(): void {
            if (this._eventObjs.length == 0)
                this._eventParams.clear();
        }

        public Clear(): void {
            this._curObj = null;
            this._eventObjs = null;
            if (this._eventParams) {
                this._eventParams.clear();
                this._eventParams = null;
            }
        }
    }
}