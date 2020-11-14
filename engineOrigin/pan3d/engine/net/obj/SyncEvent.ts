module Pan3d {
    export class SyncEvent {
        //为了防止对象更新标识与下标更新标识冲突,所以让对象更新标识占用第2位

        public static OBJ_OPT_NEW: number = 0x01;		//新对象
        public static OBJ_OPT_DELETE: number = 0x02;	//删除对象
        public static OBJ_OPT_UPDATE: number = 0x04;	//对象更新
        public static OBJ_OPT_BINLOG: number = 0x08;	//BINLOG方式
        public static OBJ_OPT_U_GUID: number = 0x10;	//打包方式ID为整形

        public static OPT_SET: number = 0x01;
        public static OPT_UNSET: number = 0x02;
        public static OPT_ADD: number = 0x04;
        public static OPT_SUB: number = 0x08;

        public static TYPE_UINT32: number = 0;
        public static TYPE_UINT16: number = 1;
        public static TYPE_UINT8: number = 2;
        public static TYPE_BIT: number = 3;
        public static TYPE_UINT64: number = 4;
        public static TYPE_INT32: number = 5;
        public static TYPE_STRING: number = 6;
        public static TYPE_INT16: number = 7;
        //		public static TYPE_INT8 :number = 8;
        public static TYPE_FLOAT: number = 9;
        public static TYPE_DOUBLE: number = 10;

        public static ATOMIC_OPT_RESULT_NO: number = 0;		//不是原子操作
        public static ATOMIC_OPT_RESULT_TRY: number = 1;	//尝试原子操作
        public static ATOMIC_OPT_RESULT_OK: number = 2;		//原子操作成功
        public static ATOMIC_OPT_RESULT_FAILED: number = -1;	//原子操作失败

        public static tmpValueBytes: Pan3dByteArray;

        public constructor() {

        }
        public static init(): void {
            SyncEvent.tmpValueBytes = new Pan3dByteArray;
            SyncEvent.tmpValueBytes.endian = Endian.LITTLE_ENDIAN;
        }
        /*
        

		protected static GetInt32Value(val:number):number{
			return (val - 0xFFFFFFFF) - 1;
		}
		
		protected static SetInt32Value(val:number):number{
			return (val + 1) + 0xFFFFFFFF;
		}
		
		protected static GetUInt16Value(vaule:number, offset:number):number{
			return (vaule & (0x0000FFFF << (offset << 4))) >> (offset << 4) & 0xFFFF;
		}
		
		protected static SetUInt16Value(old:number, value:number, offset:number):number{
			return old & (0xFFFFFFFF ^ (0xFFFF << (offset << 4))) | (value << (offset << 4));
		}
		
		protected static GetInt16Value(vaule:number, offset:number):number{
			var v:number = (vaule & (0x0000FFFF << (offset << 4))) >> (offset << 4) & 0xFFFF;
			return v > 32768 ? v - 65535 : v;
		}
		
		protected static SetInt16Value(old:number, value:number, offset:number):number{
			if(value < 0) value += 65535;
			return old & (0xFFFFFFFF ^ (0xFFFF << (offset << 4))) | (value << (offset << 4));
		}
		
		protected static GetByteValue(value:number, offset:number):number{
			return (value&(0x000000FF << (offset<<3)))>> (offset<<3) & 0xFF;
		}	
		
		protected static SetByteValue(old:number, value:number, offset:number):number{
			return old & (0xFFFFFFFF ^ (0xFF << (offset << 3))) | (value << (offset << 3));			
		}

		protected static SetBitValue(old:number, value:number, offset:number):number{
			return old & (0xFFFFFFFF ^ (0x1 << offset)) | (value << offset);
		}
		
		
		
		protected static GetDoubleValue(_uint32_values:Array<number>,index:number):number{
			SyncEvent.tmpValueBytes.position = 0;
			SyncEvent.tmpValueBytes.writeUnsignedInt(_uint32_values[index]);
			SyncEvent.tmpValueBytes.writeUnsignedInt(_uint32_values[index+1]);
			SyncEvent.tmpValueBytes.position = 0;
			var v:number = SyncEvent.tmpValueBytes.readDouble();
			return v;
		}
		
		protected static SetDoubleValue(_uint32_values:Array<number>,index:number,value:number):void{
			var v:number;
			SyncEvent.tmpValueBytes.position = 0;
			SyncEvent.tmpValueBytes.writeDouble(value);
			SyncEvent.tmpValueBytes.position = 0;
			//低位
			v = SyncEvent.tmpValueBytes.readUnsignedInt()
			_uint32_values[index] = v;
			//高位
			v = SyncEvent.tmpValueBytes.readUnsignedInt()
			_uint32_values[index+1] = v;
		}
		
		protected static SetFloatValue(v:number):number{
			SyncEvent.tmpValueBytes.position = 0;
			SyncEvent.tmpValueBytes.writeFloat(v)
			SyncEvent.tmpValueBytes.position = 0;;
			return SyncEvent.tmpValueBytes.readUnsignedInt();
		}
		
		protected static GetFloatValue(v:number):number{
			SyncEvent.tmpValueBytes.position = 0;
			SyncEvent.tmpValueBytes.writeUnsignedInt(v);
			SyncEvent.tmpValueBytes.position = 0;
			return SyncEvent.tmpValueBytes.readFloat();
		}
    */
    }

    SyncEvent.init();

}