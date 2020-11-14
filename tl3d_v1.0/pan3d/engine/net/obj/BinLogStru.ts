module Pan3d {
    export class BinLogStru extends SyncEvent {
        private static _pool: Array<BinLogStru> = new Array;
        /*获得一个可以使用的对象*/
        public static malloc(): BinLogStru {
            if (BinLogStru._pool.length == 0) {
                return new BinLogStru();
            }
            return BinLogStru._pool.pop();
        }

        public static free(ptr: BinLogStru): void {
            ptr.Clear();
            BinLogStru._pool[BinLogStru._pool.length] = ptr;
        }

        //操作类型
        public _opt: number;

        //变量类型
        public _typ: number;

        //下标
        public _index: number;

        //标识原子操作模式 看AtomicOptResult
        public _atomic_opt: number;

        //public _value_u32:number;
        public _value_u32_buffer: DataView = new DataView(new ArrayBuffer(4));
        public _value_dbe: number
        public _value_str: string;

        public _callback_index: number;

        //public _old_value_u32:number;
        public _old_value_u32_buffer: DataView = new DataView(new ArrayBuffer(4));
        public _old_value_dbe: number
        public _old_value_str: string;

        public BinLogStru() {
            this.Clear();
        }

        public get opt(): number {
            return this._opt;
        }

        public set opt(o: number) {
            this._opt = o;
        }

        public get index(): number {
            return this._index;
        }

        public set index(i: number) {
            this._index = i;
        }

        public get offset(): number {
            //return SyncEvent.GetByteValue(this._value_u32, 0);
            return this._value_u32_buffer.getUint8(0);
        }

        public set offset(val: number) {
            //this._value_u32 = SyncEvent.SetByteValue(this._value_u32, val, 0);
            this._value_u32_buffer.setUint8(0, val);
        }

        public get typ(): number {
            return this._typ;
        }

        public set typ(t: number) {
            this._typ = t;
        }

        public get atomic_opt(): number {
            return this._atomic_opt;
        }

        public set atomic_opt(val: number) {
            this._atomic_opt = val;
        }

        public get callback_idx(): number {
            return this._callback_index;
        }

        public set callback_idx(val: number) {
            this._callback_index = val;
        }

        public get uint32(): number {
            //return this._value_u32;
            return this._value_u32_buffer.getUint32(0, true);
        }

        public set uint32(val: number) {
            this._typ = SyncEvent.TYPE_UINT32;
            //this._value_u32 = val;
            this._value_u32_buffer.setUint32(0, val, true);
        }

        public get int32(): number {
            if (this._typ != SyncEvent.TYPE_INT32)
                throw new Error("get int32 but _typ != SyncEvent.TYPE_INT32!");
            //return (this._value_u32 - 0xFFFFFFFF) - 1;	
            return this._value_u32_buffer.getInt32(0, true);
        }

        public set int32(val: number) {
            this._typ = SyncEvent.TYPE_INT32;
            //this._value_u32 = (0xFFFFFFFF+val)+1;
            this._value_u32_buffer.setInt32(0, val, true);
        }

        public set bit(val: number) {
            this._typ = SyncEvent.TYPE_BIT;
            //this._value_u32 = val;
            this._value_u32_buffer.setUint32(0, val, true);
        }

        public get bit(): number {
            if (this._typ != SyncEvent.TYPE_BIT)
                throw new Error("get bit but _typ != SyncEvent.TYPE_BIT");
            //return this._value_u32;
            return this._value_u32_buffer.getUint32(0, true);
        }

        public get old_int32(): number {
            if (this._typ != SyncEvent.TYPE_INT32)
                throw new Error("get int32 but _typ != SyncEvent.TYPE_INT32!");
            //return (this._old_value_u32 - 0xFFFFFFFF) - 1;	
            return this._old_value_u32_buffer.getInt32(0, true);
        }

        public set old_int32(val: number) {
            if (this._typ != SyncEvent.TYPE_INT32)
                throw new Error("get int32 but _typ != SyncEvent.TYPE_INT32!");
            //this._old_value_u32 = (0xFFFFFFFF+val)+1;
            this._old_value_u32_buffer.setInt32(0, val, true);
        }

        public get uint16(): number {
            if (this._typ != SyncEvent.TYPE_UINT16)
                throw new Error("get uint16 but _typ != SyncEvent.TYPE_UINT16!");
            //return SyncEvent.GetUInt16Value(this._value_u32,1);
            return this._value_u32_buffer.getUint16(2, true);
        }

        public set uint16(val: number) {
            this._typ = SyncEvent.TYPE_UINT16;
            //this._value_u32 = SyncEvent.SetUInt16Value(this._value_u32,val,1);
            this._value_u32_buffer.setUint16(2, val, true);
        }

        public get int16(): number {
            if (this._typ != SyncEvent.TYPE_INT16)
                throw new Error("get int16 but _typ != SyncEvent.TYPE_INT16!");
            //return SyncEvent.GetInt16Value(this._value_u32,1);	
            return this._value_u32_buffer.getInt16(2, true);
        }

        public set int16(val: number) {
            this._typ = SyncEvent.TYPE_INT16;
            //this._value_u32 = SyncEvent.SetInt16Value(this._value_u32,val,1);
            this._value_u32_buffer.setInt16(2, val, true);
        }

        public get byte(): number {
            if (this._typ != SyncEvent.TYPE_UINT8)
                throw new Error("get uint8 but _typ != SyncEvent.TYPE_UINT8!");
            //return SyncEvent.GetByteValue(this._value_u32,2);
            return this._value_u32_buffer.getInt8(2);
        }

        public set byte(val: number) {
            this._typ = SyncEvent.TYPE_UINT8;
            //this._value_u32 = SyncEvent.SetByteValue(this._value_u32, val, 2);	
            this._value_u32_buffer.setInt8(2, val);
        }

        public get double(): number {
            return this._value_dbe;
        }

        public set double(val: number) {
            this._value_dbe = val;
        }

        public get float(): number {
            //return SyncEvent.GetFloatValue(this._value_u32);	
            return this._value_u32_buffer.getFloat32(0, true);
        }

        public set float(val: number) {
            //this._value_u32 = SyncEvent.SetFloatValue(val);
            this._value_u32_buffer.setFloat32(0, val, true);
        }

        public get str(): string {
            if (this._typ != SyncEvent.TYPE_STRING)
                throw new Error("get str but _typ != SyncEvent.TYPE_STRING!");
            return this._value_str;
        }

        public set str(v: string) {
            this._typ = SyncEvent.TYPE_STRING;
            this._value_str = v;
        }

        public get old_str(): string {
            if (this._typ != SyncEvent.TYPE_STRING)
                throw new Error("get old_str but _typ != SyncEvent.TYPE_STRING!");
            return this._old_value_str;
        }

        public set old_str(v: string) {
            if (this._typ != SyncEvent.TYPE_STRING)
                throw new Error("set old_str but _typ != SyncEvent.TYPE_STRING!");
            this._old_value_str = v;
        }

        public get value(): number {
            //return this._value_u32;
            return this._value_u32_buffer.getUint32(0, true);
        }

        public set value(v: number) {
            //this._value_u32 = v;
            this._value_u32_buffer.setUint32(0, v, true);
        }

        public get old_value(): number {
            //return this._old_value_u32;
            return this._old_value_u32_buffer.getUint32(0, true);
        }

        public set old_value(v: number) {
            //this._old_value_u32 = v;
            this._old_value_u32_buffer.setUint32(0, v, true);
        }

        public Clear(): void {
            this._opt = 0;
            this._typ = 0;
            this._index = 0;

            this._atomic_opt = SyncEvent.ATOMIC_OPT_RESULT_NO;

            //this._value_u32 = 0;
            this._value_u32_buffer.setUint32(0, 0, true);
            this._value_dbe = 0;
            this._value_str = "";

            this._callback_index = 0;

            //this._old_value_u32 = 0;
            this._old_value_u32_buffer.setUint32(0, 0, true);
            this._old_value_dbe = 0;
            this._old_value_str = "";
        }

        public ReadFrom(bytes: Pan3dByteArray): Boolean {
            this._opt = bytes.readUnsignedByte();
            this._typ = bytes.readUnsignedByte();
            this._index = bytes.readShort();
            this._atomic_opt = bytes.readByte();

            //除了字符串，其他的都通过无符号整形进行转换
            if (this._typ == SyncEvent.TYPE_STRING) {
                this._value_str = bytes.readUTF();
            } else if (this._typ == SyncEvent.TYPE_DOUBLE) {
                this._value_dbe = bytes.readDouble();
            }
            else {
                //this._value_u32 = bytes.readUnsignedInt();
                this.value = bytes.readUnsignedInt();
            }

            if (this._atomic_opt) {
                this._callback_index = bytes.readUnsignedInt();
                if (this._typ == SyncEvent.TYPE_STRING) {
                    this._old_value_str = bytes.readUTF();
                } else if (this._typ == SyncEvent.TYPE_DOUBLE) {
                    this._old_value_dbe = bytes.readDouble();
                } else {
                    //this._old_value_u32 = bytes.readUnsignedInt();
                    this.old_value = bytes.readUnsignedInt();
                }
            }
            return true;
        }

        public WriteTo(bytes: Pan3dByteArray): void {
            bytes.writeByte(this._opt);
            bytes.writeByte(this._typ);
            bytes.writeShort(this._index);
            bytes.writeByte(this._atomic_opt);	//输出非原子操作

            //如果是字符串
            if (this._typ == SyncEvent.TYPE_STRING)
                bytes.writeUTF(this._value_str ? this._value_str : "");
            else if (this._typ == SyncEvent.TYPE_DOUBLE)
                bytes.writeDouble(this._value_dbe);
            else
                bytes.writeUnsignedInt(this.value);
            //bytes.writeUnsignedInt(this._value_u32);
            //如果是原子操作需要加一些成员
            if (this._atomic_opt) {
                bytes.writeUnsignedInt(this._callback_index);
                if (this._typ == SyncEvent.TYPE_STRING)
                    bytes.writeUTF(this._old_value_str ? this._old_value_str : "");
                else if (this._typ == SyncEvent.TYPE_DOUBLE)
                    bytes.writeDouble(this._old_value_dbe);
                else
                    bytes.writeUnsignedInt(this.old_value);
                //bytes.writeUnsignedInt(this._old_value_u32);
            }
        }

        public clone(): BinLogStru {
            var binlog: BinLogStru = BinLogStru.malloc();
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
        }
    }
}