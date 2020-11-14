var Pan3d;
(function (Pan3d) {
    var UpdateMask = /** @class */ (function () {
        function UpdateMask() {
            this._bytes = new Pan3d.Pan3dByteArray();
            this._bytes.endian = Pan3d.Endian.LITTLE_ENDIAN;
        }
        Object.defineProperty(UpdateMask.prototype, "baseByteArray", {
            get: function () {
                return this._bytes;
            },
            enumerable: true,
            configurable: true
        });
        UpdateMask.prototype.Clear = function () {
            this._bytes.clear();
        };
        /**
        * 获取掩码数据列表，是否发生更新
        * @param pos 索引位置
        * @param len 长度
        * @return
        */
        UpdateMask.prototype.GetBits = function (pos, len) {
            if (len === void 0) { len = 1; }
            for (var i = 0; i < len; i++) {
                if (this.GetBit(pos + i))
                    return true;
            }
            return false;
        };
        UpdateMask.prototype.GetBit = function (i) {
            if ((i >> 3) < this._bytes.length)
                return (this._bytes.getByte(i >> 3) & (1 << (i & 0x7))) != 0;
            return false;
        };
        UpdateMask.prototype.SetBit = function (i) {
            if (i >> 3 >= this._bytes.length)
                this._bytes.length = (i >> 3) + 1;
            //this._bytes[i >> 3] |= (1 << (i & 0x7));
            this._bytes.setByte(i >> 3, this._bytes.getByte(i >> 3) | (1 << (i & 0x7)));
        };
        UpdateMask.prototype.WriteTo = function (bytes) {
            this._bytes.position = 0;
            bytes.writeShort(this._bytes.length);
            if (this._bytes.length)
                bytes.writeBytes(this._bytes);
            return true;
        };
        UpdateMask.prototype.ReadFrom = function (bytes) {
            //要先清空
            this._bytes.clear();
            //先读取uint8的字节数量
            var count = bytes.readUnsignedShort();
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
        };
        UpdateMask.prototype.GetCount = function () {
            return this._bytes.length << 3;
        };
        UpdateMask.prototype.SetCount = function (val) {
            this._bytes.length = (val + 7) >> 3;
        };
        UpdateMask.prototype.empty = function () {
            for (var i = 0; i < this._bytes.length; i++)
                if (this._bytes.getByte(i) != 0)
                    return false;
            return true;
        };
        /**
            * updateMask的或者掩码操作
            * @param other
            */
        UpdateMask.prototype.or = function (other) {
            //取丙个掩码字节数组的最大值
            //如果本身长度不够就拉成大的
            var len = other._bytes.length;
            if (this._bytes.length < len)
                this._bytes.length = len;
            for (var i = 0; i < len; i++) {
                this._bytes[i] |= other._bytes[i];
            }
        };
        /**
            * 两个updatemask并且成功
            * @param other
            * @return
            */
        UpdateMask.prototype.test = function (other) {
            var len = this._bytes.length > other._bytes.length ? other._bytes.length : this._bytes.length;
            for (var i = 0; i < len; i++) {
                if (this._bytes[i] & other._bytes[i])
                    return true;
            }
            return false;
        };
        /**
            * 收缩,把byteArray的长度调整到最合理的位置
            */
        UpdateMask.prototype.condense = function () {
            var len = this._bytes.length;
            while (len > 0) {
                len--;
                if (this._bytes[len] == 0)
                    this._bytes.length--;
                else
                    break;
            }
        };
        /**
            * 判断两个掩码是否相等
            * @param other
            * @return
            */
        UpdateMask.prototype.equals = function (other) {
            this.condense();
            other.condense();
            if (this._bytes.length != other._bytes.length)
                return false;
            for (var i = 0; i < this._bytes.length; i++) {
                ////console.log(this._bytes[i],":",other.this._bytes[i]);
                if (this._bytes[i] != other._bytes[i])
                    return false;
            }
            return true;
        };
        /**
            * 掩码克隆函数
            * @return
            */
        UpdateMask.prototype.clone = function () {
            var o = new UpdateMask;
            for (var i = 0; i < this._bytes.length; i++)
                o._bytes[i] = this._bytes[i];
            return o;
        };
        return UpdateMask;
    }());
    Pan3d.UpdateMask = UpdateMask;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=UpdateMask.js.map