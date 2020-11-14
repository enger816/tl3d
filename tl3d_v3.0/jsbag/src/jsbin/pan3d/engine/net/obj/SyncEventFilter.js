var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
     * 用于记录所有的同步事件，目前最常用于ui重绘
     * 记录时，先通过testRecorder验证是否是关心的对象，
     * 再调用push将所关心的的binlog用自定义的格式记录下来
     * 现在使用的格式为(数量-short,(index-short,oldValue-unumber)...)
     * 通过pop可以得到当前队列中的所有符合条件的事件消息，并调用相应的处理函数
     * @author linbc
     */
var Pan3d;
(function (Pan3d) {
    var SyncEventFilter = /** @class */ (function (_super) {
        __extends(SyncEventFilter, _super);
        function SyncEventFilter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SyncEventFilter.prototype.open = function () {
            if (!this._opening)
                this._opening = true;
        };
        /**
         * 关闭对象事件管理
         */
        SyncEventFilter.prototype.close = function () {
            if (this._opening) {
                this._opening = false;
                this._curObj = null;
                this._curEventCount = 0;
                this._eventObjs.length = 0;
                this._eventParams.clear();
            }
        };
        /**
         * 初始化
         */
        SyncEventFilter.prototype.SyncEventFilter = function () {
            this._opening = false;
            this._curObj = null;
            this._curEventCount = 0;
            this._eventParams = new Pan3d.Pan3dByteArray;
            this._eventParams.endian = Pan3d.Endian.LITTLE_ENDIAN;
            this._eventObjs = new Array();
        };
        SyncEventFilter.prototype.beginPush = function (obj) {
            //如果以前的当前对象不等于空，则需要判断是否是空
            if (this._curObj)
                this.endPush();
            this._curObj = obj;
            //插入对象ID及事件数量，0显然是不准的 ,仅用于占位
            this._eventObjs.push(obj.guid);
            this._eventParams.writeShort(0);
            return true;
        };
        /**
         * 有始有终嘛，修改binlog数量,或者移除符合条件，但是没有记录到事件的对象ID
         */
        SyncEventFilter.prototype.endPush = function () {
            if (this._curEventCount) {
                var curPos = this._eventParams.position;
                //两个short加上一个number 8个字节
                this._eventParams.position -= 8 * this._curEventCount;
                //向前移动两个字节，用于记录数量
                this._eventParams.position -= 2;
                this._eventParams.writeShort(this._curEventCount);
                this._curEventCount = 0;
                this._eventParams.position = curPos;
            }
            else {
                //移除该guid
                this._eventObjs.splice(this._eventObjs.length - 1, 1);
                //移除binlog数量的记录值,short占用两个字节
                this._eventParams.position -= 2;
            }
            this._curObj = null;
        };
        SyncEventFilter.prototype.writeParam = function (ev, index, oldVal) {
            this._eventParams.writeShort(ev);
            this._eventParams.writeShort(index);
            this._eventParams.writeInt(oldVal);
            this._curEventCount++;
        };
        SyncEventFilter.prototype.pushDelete = function () {
            this.writeParam(SyncEventFilter.EV_DEL, 0, 0);
        };
        SyncEventFilter.prototype.pushNew = function () {
            this.writeParam(SyncEventFilter.EV_NEW, 0, 0);
        };
        SyncEventFilter.prototype.pushUpdateMask = function (typ, mask) {
            //var opt:number = (typ == TYPE_STRING?EV_UPDATE_S:EV_UPDATE_I);	
            var len = mask.GetCount();
            var i;
            if (typ == Pan3d.SyncEvent.TYPE_STRING) {
                //对于字符串而言无需要保存旧值，这里写入的错误的值，但是没有关系
                for (i = 0; i < len; i++) {
                    if (mask.GetBit(i))
                        this.writeParam(SyncEventFilter.EV_UPDATE_S, i, 0);
                }
            }
            else {
                for (i = 0; i < len; i++) {
                    if (mask.GetBit(i))
                        this.writeParam(SyncEventFilter.EV_UPDATE_I, i, this._curObj.GetInt32(i));
                }
            }
        };
        /**
         * 对象更新调用该接口进行数据插入,相应的会记录成UI可以理解的数据格式
         * @param binlog
         *
         */
        SyncEventFilter.prototype.pushBinlog = function (binlog) {
            //如果是原子操作则忽略
            if (binlog._atomic_opt != 0)
                return;
            var opt = (binlog._typ == Pan3d.SyncEvent.TYPE_STRING ? SyncEventFilter.EV_UPDATE_S : SyncEventFilter.EV_UPDATE_I);
            this.writeParam(opt, binlog.index, this._curObj.GetInt32(binlog.index));
        };
        /**
         * 开始读之先，置一下，数组的位置
         *
         */
        SyncEventFilter.prototype.beginPop = function () {
            this._eventParams.position = 0;
        };
        /**
         * 开始弹出一个对象的事件,返回空的时候就是没有对象
         * @param params
         * @return 对象的guid
         *
         */
        SyncEventFilter.prototype.pop = function (params) {
            if (this._eventObjs.length == 0)
                return "";
            //先清空
            params.length = 0;
            var len = this._eventParams.readShort();
            for (var i = 0; i < len; i++) {
                //读取一个
                params.push(this._eventParams.readShort()); //操作类型
                params.push(this._eventParams.readShort()); //变化下标
                params.push(this._eventParams.readInt()); //原值
            }
            return this._eventObjs.shift();
        };
        /**
         * 读完了，清空一下数据
         *
         */
        SyncEventFilter.prototype.endPop = function () {
            if (this._eventObjs.length == 0)
                this._eventParams.clear();
        };
        SyncEventFilter.prototype.Clear = function () {
            this._curObj = null;
            this._eventObjs = null;
            if (this._eventParams) {
                this._eventParams.clear();
                this._eventParams = null;
            }
        };
        /**
             * 标识为是个新对象
             */
        SyncEventFilter.EV_NEW = 0;
        /**
         * 标识为对象消失
         */
        SyncEventFilter.EV_DEL = 1;
        /**
         * 对象整型下标发生变化
         */
        SyncEventFilter.EV_UPDATE_I = 2;
        /**
         * 对象字符串下标发生变化
         */
        SyncEventFilter.EV_UPDATE_S = 3;
        return SyncEventFilter;
    }(Pan3d.SyncEvent));
    Pan3d.SyncEventFilter = SyncEventFilter;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SyncEventFilter.js.map