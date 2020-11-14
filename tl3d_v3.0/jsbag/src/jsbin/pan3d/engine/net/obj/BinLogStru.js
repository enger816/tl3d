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
var Pan3d;
(function (Pan3d) {
    var BinLogStru = /** @class */ (function (_super) {
        __extends(BinLogStru, _super);
        function BinLogStru() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            //public _value_u32:number;
            _this._value_u32_buffer = new DataView(new ArrayBuffer(4));
            //public _old_value_u32:number;
            _this._old_value_u32_buffer = new DataView(new ArrayBuffer(4));
            return _this;
        }
        /*获得一个可以使用的对象*/
        BinLogStru.malloc = function () {
            if (BinLogStru._pool.length == 0) {
                return new BinLogStru();
            }
            return BinLogStru._pool.pop();
        };
        BinLogStru.free = function (ptr) {
            ptr.Clear();
            BinLogStru._pool[BinLogStru._pool.length] = ptr;
        };
        BinLogStru.prototype.BinLogStru = function () {
            this.Clear();
        };
        Object.defineProperty(BinLogStru.prototype, "opt", {
            get: function () {
                return this._opt;
            },
            set: function (o) {
                this._opt = o;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BinLogStru.prototype, "index", {
            get: function () {
                return this._index;
            },
            set: function (i) {
                this._index = i;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BinLogStru.prototype, "offset", {
            get: function () {
                //return SyncEvent.GetByteValue(this._value_u32, 0);
                return this._value_u32_buffer.getUint8(0);
            },
            set: function (val) {
                //this._value_u32 = SyncEvent.SetByteValue(this._value_u32, val, 0);
                this._value_u32_buffer.setUint8(0, val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BinLogStru.prototype, "typ", {
            get: function () {
                return this._typ;
            },
            set: function (t) {
                this._typ = t;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BinLogStru.prototype, "atomic_opt", {
            get: function () {
                return this._atomic_opt;
            },
            set: function (val) {
                this._atomic_opt = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BinLogStru.prototype, "callback_idx", {
            get: function () {
                return this._callback_index;
            },
            set: function (val) {
                this._callback_index = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BinLogStru.prototype, "uint32", {
            get: function () {
                //return this._value_u32;
                return this._value_u32_buffer.getUint32(0, true);
            },
            set: function (val) {
                this._typ = Pan3d.SyncEvent.TYPE_UINT32;
                //this._value_u32 = val;
                this._value_u32_buffer.setUint32(0, val, true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BinLogStru.prototype, "int32", {
            get: function () {
                if (this._typ != Pan3d.SyncEvent.TYPE_INT32)
                    throw new Error("get int32 but _typ != SyncEvent.TYPE_INT32!");
                //return (this._value_u32 - 0xFFFFFFFF) - 1;	
                return this._value_u32_buffer.getInt32(0, true);
            },
            set: function (val) {
                this._typ = Pan3d.SyncEvent.TYPE_INT32;
                //this._value_u32 = (0xFFFFFFFF+val)+1;
                this._value_u32_buffer.setInt32(0, val, true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BinLogStru.prototype, "bit", {
            get: function () {
                if (this._typ != Pan3d.SyncEvent.TYPE_BIT)
                    throw new Error("get bit but _typ != SyncEvent.TYPE_BIT");
                //return this._value_u32;
                return this._value_u32_buffer.getUint32(0, true);
            },
            set: function (val) {
                this._typ = Pan3d.SyncEvent.TYPE_BIT;
                //this._value_u32 = val;
                this._value_u32_buffer.setUint32(0, val, true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BinLogStru.prototype, "old_int32", {
            get: function () {
                if (this._typ != Pan3d.SyncEvent.TYPE_INT32)
                    throw new Error("get int32 but _typ != SyncEvent.TYPE_INT32!");
                //return (this._old_value_u32 - 0xFFFFFFFF) - 1;	
                return this._old_value_u32_buffer.getInt32(0, true);
            },
            set: function (val) {
                if (this._typ != Pan3d.SyncEvent.TYPE_INT32)
                    throw new Error("get int32 but _typ != SyncEvent.TYPE_INT32!");
                //this._old_value_u32 = (0xFFFFFFFF+val)+1;
                this._old_value_u32_buffer.setInt32(0, val, true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BinLogStru.prototype, "uint16", {
            get: function () {
                if (this._typ != Pan3d.SyncEvent.TYPE_UINT16)
                    throw new Error("get uint16 but _typ != SyncEvent.TYPE_UINT16!");
                //return SyncEvent.GetUInt16Value(this._value_u32,1);
                return this._value_u32_buffer.getUint16(2, true);
            },
            set: function (val) {
                this._typ = Pan3d.SyncEvent.TYPE_UINT16;
                //this._value_u32 = SyncEvent.SetUInt16Value(this._value_u32,val,1);
                this._value_u32_buffer.setUint16(2, val, true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BinLogStru.prototype, "int16", {
            get: function () {
                if (this._typ != Pan3d.SyncEvent.TYPE_INT16)
                    throw new Error("get int16 but _typ != SyncEvent.TYPE_INT16!");
                //return SyncEvent.GetInt16Value(this._value_u32,1);	
                return this._value_u32_buffer.getInt16(2, true);
            },
            set: function (val) {
                this._typ = Pan3d.SyncEvent.TYPE_INT16;
                //this._value_u32 = SyncEvent.SetInt16Value(this._value_u32,val,1);
                this._value_u32_buffer.setInt16(2, val, true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BinLogStru.prototype, "byte", {
            get: function () {
                if (this._typ != Pan3d.SyncEvent.TYPE_UINT8)
                    throw new Error("get uint8 but _typ != SyncEvent.TYPE_UINT8!");
                //return SyncEvent.GetByteValue(this._value_u32,2);
                return this._value_u32_buffer.getInt8(2);
            },
            set: function (val) {
                this._typ = Pan3d.SyncEvent.TYPE_UINT8;
                //this._value_u32 = SyncEvent.SetByteValue(this._value_u32, val, 2);	
                this._value_u32_buffer.setInt8(2, val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BinLogStru.prototype, "double", {
            get: function () {
                return this._value_dbe;
            },
            set: function (val) {
                this._value_dbe = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BinLogStru.prototype, "float", {
            get: function () {
                //return SyncEvent.GetFloatValue(this._value_u32);	
                return this._value_u32_buffer.getFloat32(0, true);
            },
            set: function (val) {
                //this._value_u32 = SyncEvent.SetFloatValue(val);
                this._value_u32_buffer.setFloat32(0, val, true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BinLogStru.prototype, "str", {
            get: function () {
                if (this._typ != Pan3d.SyncEvent.TYPE_STRING)
                    throw new Error("get str but _typ != SyncEvent.TYPE_STRING!");
                return this._value_str;
            },
            set: function (v) {
                this._typ = Pan3d.SyncEvent.TYPE_STRING;
                this._value_str = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BinLogStru.prototype, "old_str", {
            get: function () {
                if (this._typ != Pan3d.SyncEvent.TYPE_STRING)
                    throw new Error("get old_str but _typ != SyncEvent.TYPE_STRING!");
                return this._old_value_str;
            },
            set: function (v) {
                if (this._typ != Pan3d.SyncEvent.TYPE_STRING)
                    throw new Error("set old_str but _typ != SyncEvent.TYPE_STRING!");
                this._old_value_str = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BinLogStru.prototype, "value", {
            get: function () {
                //return this._value_u32;
                return this._value_u32_buffer.getUint32(0, true);
            },
            set: function (v) {
                //this._value_u32 = v;
                this._value_u32_buffer.setUint32(0, v, true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BinLogStru.prototype, "old_value", {
            get: function () {
                //return this._old_value_u32;
                return this._old_value_u32_buffer.getUint32(0, true);
            },
            set: function (v) {
                //this._old_value_u32 = v;
                this._old_value_u32_buffer.setUint32(0, v, true);
            },
            enumerable: true,
            configurable: true
        });
        BinLogStru.prototype.Clear = function () {
            this._opt = 0;
            this._typ = 0;
            this._index = 0;
            this._atomic_opt = Pan3d.SyncEvent.ATOMIC_OPT_RESULT_NO;
            //this._value_u32 = 0;
            this._value_u32_buffer.setUint32(0, 0, true);
            this._value_dbe = 0;
            this._value_str = "";
            this._callback_index = 0;
            //this._old_value_u32 = 0;
            this._old_value_u32_buffer.setUint32(0, 0, true);
            this._old_value_dbe = 0;
            this._old_value_str = "";
        };
        BinLogStru.prototype.ReadFrom = function (bytes) {
            this._opt = bytes.readUnsignedByte();
            this._typ = bytes.readUnsignedByte();
            this._index = bytes.readShort();
            this._atomic_opt = bytes.readByte();
            //除了字符串，其他的都通过无符号整形进行转换
            if (this._typ == Pan3d.SyncEvent.TYPE_STRING) {
                this._value_str = bytes.readUTF();
            }
            else if (this._typ == Pan3d.SyncEvent.TYPE_DOUBLE) {
                this._value_dbe = bytes.readDouble();
            }
            else {
                //this._value_u32 = bytes.readUnsignedInt();
                this.value = bytes.readUnsignedInt();
            }
            if (this._atomic_opt) {
                this._callback_index = bytes.readUnsignedInt();
                if (this._typ == Pan3d.SyncEvent.TYPE_STRING) {
                    this._old_value_str = bytes.readUTF();
                }
                else if (this._typ == Pan3d.SyncEvent.TYPE_DOUBLE) {
                    this._old_value_dbe = bytes.readDouble();
                }
                else {
                    //this._old_value_u32 = bytes.readUnsignedInt();
                    this.old_value = bytes.readUnsignedInt();
                }
            }
            return true;
        };
        BinLogStru.prototype.WriteTo = function (bytes) {
            bytes.writeByte(this._opt);
            bytes.writeByte(this._typ);
            bytes.writeShort(this._index);
            bytes.writeByte(this._atomic_opt); //输出非原子操作
            //如果是字符串
            if (this._typ == Pan3d.SyncEvent.TYPE_STRING)
                bytes.writeUTF(this._value_str ? this._value_str : "");
            else if (this._typ == Pan3d.SyncEvent.TYPE_DOUBLE)
                bytes.writeDouble(this._value_dbe);
            else
                bytes.writeUnsignedInt(this.value);
            //bytes.writeUnsignedInt(this._value_u32);
            //如果是原子操作需要加一些成员
            if (this._atomic_opt) {
                bytes.writeUnsignedInt(this._callback_index);
                if (this._typ == Pan3d.SyncEvent.TYPE_STRING)
                    bytes.writeUTF(this._old_value_str ? this._old_value_str : "");
                else if (this._typ == Pan3d.SyncEvent.TYPE_DOUBLE)
                    bytes.writeDouble(this._old_value_dbe);
                else
                    bytes.writeUnsignedInt(this.old_value);
                //bytes.writeUnsignedInt(this._old_value_u32);
            }
        };
        BinLogStru.prototype.clone = function () {
            var binlog = BinLogStru.malloc();
            binlog._opt = this._opt;
            binlog._typ = this._typ;
            binlog._index = this._index;
            binlog._atomic_opt = this._atomic_opt;
            //binlog._value_u32 = this._value_u32;
            binlog.value = this.value;
            binlog._value_dbe = this._value_dbe;
            binlog._value_str = this._value_str;
            binlog._callback_index = this._callback_index;
            //binlog._old_value_u32 = this._old_value_u32;
            binlog.old_value = this.old_value;
            binlog._old_value_dbe = this._old_value_dbe;
            binlog._old_value_str = this._old_value_str;
            return binlog;
        };
        BinLogStru._pool = new Array;
        return BinLogStru;
    }(Pan3d.SyncEvent));
    Pan3d.BinLogStru = BinLogStru;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=BinLogStru.js.map