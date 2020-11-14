module Pan3d {
    export class UpdateMask {
        private _bytes: Pan3dByteArray;

        public constructor() {
            this._bytes = new Pan3dByteArray();
            this._bytes.endian = Endian.LITTLE_ENDIAN;
        }

        public get baseByteArray(): Pan3dByteArray {
            return this._bytes;
        }

        public Clear(): void {
            this._bytes.clear();
        }

        /**
        * 获取掩码数据列表，是否发生更新 
        * @param pos 索引位置
        * @param len 长度
        * @return 
        */
        public GetBits(pos: number, len: number = 1): boolean {
            for (var i: number = 0; i < len; i++) {
                if (this.GetBit(pos + i))
                    return true;
            }
            return false;
        }


        public GetBit(i: number): boolean {//need			
            if ((i >> 3) < this._bytes.length)
                return (this._bytes.getByte(i >> 3) & (1 << (i & 0x7))) != 0;
            return false;
        }

        public SetBit(i: number): void {//need	
            if (i >> 3 >= this._bytes.length)
                this._bytes.length = (i >> 3) + 1;
            //this._bytes[i >> 3] |= (1 << (i & 0x7));
            this._bytes.setByte(i >> 3, this._bytes.getByte(i >> 3) | (1 << (i & 0x7)));
        }

        public WriteTo(bytes: Pan3dByteArray): boolean {
            this._bytes.position = 0;
            bytes.writeShort(this._bytes.length);
            if (this._bytes.length)
                bytes.writeBytes(this._bytes);
            return true;
        }

        public ReadFrom(bytes: Pan3dByteArray): boolean {
            //要先清空
            this._bytes.clear();
            //先读取uint8的字节数量
            var count: number = bytes.readUnsignedShort();
            this._bytes.length = count;
            if (count) {
                bytes.readBytes(this._bytes, 0, count);
            }
            //var str: string = "";
            //for (var i: number = 0; i < count; i++){
            //    str += this._bytes.getByte(i) + ",";
            //}
            ////console.log("掩码数据：" + str);

            return true;
        }

        public GetCount(): number {
            return this._bytes.length << 3;
        }

        public SetCount(val: number): void {
            this._bytes.length = (val + 7) >> 3;
        }

        public empty(): boolean {//need
            for (var i: number = 0; i < this._bytes.length; i++)
                if (this._bytes.getByte(i) != 0)
                    return false;
            return true;
        }

        /**
            * updateMask的或者掩码操作 
            * @param other
            */
        public or(other: UpdateMask): void {//need
            //取丙个掩码字节数组的最大值
            //如果本身长度不够就拉成大的
            var len: number = other._bytes.length;
            if (this._bytes.length < len)
                this._bytes.length = len;
            for (var i: number = 0; i < len; i++) {
                this._bytes[i] |= other._bytes[i];
            }
        }

        /**
            * 两个updatemask并且成功 
            * @param other
            * @return 
            */
        public test(other: UpdateMask): boolean {
            var len: number = this._bytes.length > other._bytes.length ? other._bytes.length : this._bytes.length;
            for (var i: number = 0; i < len; i++) {
                if (this._bytes[i] & other._bytes[i])
                    return true;
            }
            return false;
        }

        /**
            * 收缩,把byteArray的长度调整到最合理的位置 
            */
        private condense(): void {
            var len: number = this._bytes.length;
            while (len > 0) {
                len--;
                if (this._bytes[len] == 0)
                    this._bytes.length--;
                else break;
            }
        }

        /**
            * 判断两个掩码是否相等 
            * @param other
            * @return 
            */
        public equals(other: UpdateMask): boolean {
            this.condense();
            other.condense();
            if (this._bytes.length != other._bytes.length)
                return false;
            for (var i: number = 0; i < this._bytes.length; i++) {
                ////console.log(this._bytes[i],":",other.this._bytes[i]);
                if (this._bytes[i] != other._bytes[i])
                    return false;
            }
            return true;
        }

        /**
            * 掩码克隆函数 
            * @return 
            */
        public clone(): UpdateMask {
            var o: UpdateMask = new UpdateMask;
            for (var i: number = 0; i < this._bytes.length; i++)
                o._bytes[i] = this._bytes[i];
            return o;
        }
    }
}