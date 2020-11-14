import { Vector3D } from "./Vector3D";
/**
 * Endian 类中包含一些值，它们表示用于表示多字节数字的字节顺序。
 * 字节顺序为 bigEndian（最高有效字节位于最前）或 littleEndian（最低有效字节位于最前）。
 * @class egret.Endian
 * @classdesc
 */
export declare class Endian {
    /**
     * 表示多字节数字的最低有效字节位于字节序列的最前面。
     * 十六进制数字 0x12345678 包含 4 个字节（每个字节包含 2 个十六进制数字）。最高有效字节为 0x12。最低有效字节为 0x78。（对于等效的十进制数字 305419896，最高有效数字是 3，最低有效数字是 6）。
     * @constant {string} egret.Endian.LITTLE_ENDIAN
     */
    static LITTLE_ENDIAN: string;
    /**
     * 表示多字节数字的最高有效字节位于字节序列的最前面。
     * 十六进制数字 0x12345678 包含 4 个字节（每个字节包含 2 个十六进制数字）。最高有效字节为 0x12。最低有效字节为 0x78。（对于等效的十进制数字 305419896，最高有效数字是 3，最低有效数字是 6）。
     * @constant {string} egret.Endian.BIG_ENDIAN
     */
    static BIG_ENDIAN: string;
}
/**
 * @class ByteArray
 * @classdesc
 * ByteArray 类提供用于优化读取、写入以及处理二进制数据的方法和属性。
 * 注意：ByteArray 类适用于需要在字节层访问数据的高级 开发人员。
 */
export declare class Pan3dByteArray {
    private static SIZE_OF_BOOLEAN;
    private static SIZE_OF_INT8;
    private static SIZE_OF_INT16;
    private static SIZE_OF_INT32;
    private static SIZE_OF_UINT8;
    private static SIZE_OF_UINT16;
    private static SIZE_OF_UINT32;
    private static SIZE_OF_FLOAT32;
    private static SIZE_OF_FLOAT64;
    private BUFFER_EXT_SIZE;
    private data;
    private _position;
    private write_position;
    /**
     * 更改或读取数据的字节顺序；egret.Endian.BIG_ENDIAN 或 egret.Endian.LITTLE_ENDIAN。
     * @default egret.Endian.BIG_ENDIAN
     * @member ByteArray#endian
     */
    endian: string;
    /**
     * 创建一个 ByteArray 对象以引用指定的 ArrayBuffer 对象
     * @param buffer {ArrayBuffer} 数据源
     */
    constructor(buffer?: ArrayBuffer);
    private _setArrayBuffer;
    setdata(srcByte: Pan3dByteArray): void;
    get buffer(): ArrayBuffer;
    /**
     * @private
     */
    set buffer(value: ArrayBuffer);
    get dataView(): DataView;
    /**
     * @private
     */
    set dataView(value: DataView);
    /**
     * @private
     */
    get bufferOffset(): number;
    getByte(i: number): number;
    setByte(i: number, num: number): void;
    /**
     * 将文件指针的当前位置（以字节为单位）移动或返回到 ByteArray 对象中。下一次调用读取方法时将在此位置开始读取，或者下一次调用写入方法时将在此位置开始写入。
     * @member {number} ByteArray#position
     */
    get position(): number;
    set position(value: number);
    reset(): void;
    optcode: number;
    /**
     * ByteArray 对象的长度（以字节为单位）。
     * 如果将长度设置为大于当前长度的值，则用零填充字节数组的右侧。
     * 如果将长度设置为小于当前长度的值，将会截断该字节数组。
     * @member {number} ByteArray#length
     */
    get length(): number;
    set length(value: number);
    /**
     * 可从字节数组的当前位置到数组末尾读取的数据的字节数。
     * 每次访问 ByteArray 对象时，将 bytesAvailable 属性与读取方法结合使用，以确保读取有效的数据。
     * @member {number} ByteArray#bytesAvailable
     */
    get bytesAvailable(): number;
    /**
     * 清除字节数组的内容，并将 length 和 position 属性重置为 0。
     * @method ByteArray#clear
     */
    clear(): void;
    /**
     * 从字节流中读取布尔值。读取单个字节，如果字节非零，则返回 true，否则返回 false
     * @return 如果字节不为零，则返回 true，否则返回 false
     * @method ByteArray#readBoolean
     */
    readBoolean(): boolean;
    /**
     * 从字节流中读取带符号的字节
     * @return 介于 -128 和 127 之间的整数
     * @method ByteArray#readByte
     */
    readByte(): number;
    /**
     * 从字节流中读取 length 参数指定的数据字节数。从 offset 指定的位置开始，将字节读入 bytes 参数指定的 ByteArray 对象中，并将字节写入目标 ByteArray 中
     * @param bytes 要将数据读入的 ByteArray 对象
     * @param offset bytes 中的偏移（位置），应从该位置写入读取的数据
     * @param length 要读取的字节数。默认值 0 导致读取所有可用的数据
     * @method ByteArray#readBytes
     */
    readBytes(bytes: Pan3dByteArray, offset?: number, length?: number): void;
    /**
     * 从字节流中读取一个 IEEE 754 双精度（64 位）浮点数
     * @return 双精度（64 位）浮点数
     * @method ByteArray#readDouble
     */
    readDouble(): number;
    /**
     * 从字节流中读取一个 IEEE 754 单精度（32 位）浮点数
     * @return 单精度（32 位）浮点数
     * @method ByteArray#readFloat
     */
    readFloat(): number;
    /**
     * 从字节流中读取一个带符号的 32 位整数
     * @return 介于 -2147483648 和 2147483647 之间的 32 位带符号整数
     * @method ByteArray#readFloat
     */
    readInt(): number;
    getInt(): number;
    readInt32(): number;
    /**
     * 使用指定的字符集从字节流中读取指定长度的多字节字符串
     * @param length 要从字节流中读取的字节数
     * @param charSet 表示用于解释字节的字符集的字符串。可能的字符集字符串包括 "shift-jis"、"cn-gb"、"iso-8859-1"”等
     * @return UTF-8 编码的字符串
     * @method ByteArray#readMultiByte
     */
    /**
     * 从字节流中读取一个带符号的 16 位整数
     * @return 介于 -32768 和 32767 之间的 16 位带符号整数
     * @method ByteArray#readShort
     */
    readShort(): number;
    readFloatTwoByte($scaleNum: number): number;
    readFloatOneByte(): number;
    /**
     * 从字节流中读取无符号的字节
     * @return 介于 0 和 255 之间的 32 位无符号整数
     * @method ByteArray#readUnsignedByte
     */
    readUnsignedByte(): number;
    readUint8(): number;
    readInt8(): number;
    /**
     * 从字节流中读取一个无符号的 32 位整数
     * @return 介于 0 和 4294967295 之间的 32 位无符号整数
     * @method ByteArray#readUnsignedInt
     */
    readUnsignedInt(): number;
    readUint32(): number;
    readUint64(): number;
    /**
     * 从字节流中读取一个无符号的 16 位整数
     * @return 介于 0 和 65535 之间的 16 位无符号整数
     * @method ByteArray#readUnsignedShort
     */
    readUnsignedShort(): number;
    readUint16(): number;
    /**
     * 从字节流中读取一个 UTF-8 字符串。假定字符串的前缀是无符号的短整型（以字节表示长度）
     * @return UTF-8 编码的字符串
     * @method ByteArray#readUTF
     */
    readUTF(): string;
    readString(): string;
    /**
     * 从字节流中读取一个由 length 参数指定的 UTF-8 字节序列，并返回一个字符串
     * @param length 指明 UTF-8 字节长度的无符号短整型数
     * @return 由指定长度的 UTF-8 字节组成的字符串
     * @method ByteArray#readUTFBytes
     */
    readUTFBytes(length: number): string;
    readStringByLen(len: number): string;
    /**
     * 写入布尔值。根据 value 参数写入单个字节。如果为 true，则写入 1，如果为 false，则写入 0
     * @param value 确定写入哪个字节的布尔值。如果该参数为 true，则该方法写入 1；如果该参数为 false，则该方法写入 0
     * @method ByteArray#writeBoolean
     */
    writeBoolean(value: boolean): void;
    /**
     * 在字节流中写入一个字节
     * 使用参数的低 8 位。忽略高 24 位
     * @param value 一个 32 位整数。低 8 位将被写入字节流
     * @method ByteArray#writeByte
     */
    writeByte(value: number): void;
    writeUint8(value: number): void;
    writeInt8(value: number): void;
    /**
     * 将指定字节数组 bytes（起始偏移量为 offset，从零开始的索引）中包含 length 个字节的字节序列写入字节流
     * 如果省略 length 参数，则使用默认长度 0；该方法将从 offset 开始写入整个缓冲区。如果还省略了 offset 参数，则写入整个缓冲区
     * 如果 offset 或 length 超出范围，它们将被锁定到 bytes 数组的开头和结尾
     * @param bytes ByteArray 对象
     * @param offset 从 0 开始的索引，表示在数组中开始写入的位置
     * @param length 一个无符号整数，表示在缓冲区中的写入范围
     * @method ByteArray#writeBytes
     */
    writeBytes(bytes: Pan3dByteArray, offset?: number, length?: number): void;
    /**
     * 在字节流中写入一个 IEEE 754 双精度（64 位）浮点数
     * @param value 双精度（64 位）浮点数
     * @method ByteArray#writeDouble
     */
    writeDouble(value: number): void;
    /**
     * 在字节流中写入一个 IEEE 754 单精度（32 位）浮点数
     * @param value 单精度（32 位）浮点数
     * @method ByteArray#writeFloat
     */
    writeFloat(value: number): void;
    /**
     * 在字节流中写入一个带符号的 32 位整数
     * @param value 要写入字节流的整数
     * @method ByteArray#writeInt
     */
    writeInt(value: number): void;
    writeInt32(value: number): void;
    /**
     * 使用指定的字符集将多字节字符串写入字节流
     * @param value 要写入的字符串值
     * @param charSet 表示要使用的字符集的字符串。可能的字符集字符串包括 "shift-jis"、"cn-gb"、"iso-8859-1"”等
     * @method ByteArray#writeMultiByte
     */
    /**
     * 在字节流中写入一个 16 位整数。使用参数的低 16 位。忽略高 16 位
     * @param value 32 位整数，该整数的低 16 位将被写入字节流
     * @method ByteArray#writeShort
     */
    writeUnsignedShort(value: number): void;
    writeUint16(value: number): void;
    writeUint64(value: number): void;
    writeShort(value: number): void;
    /**
     * 在字节流中写入一个无符号的 32 位整数
     * @param value 要写入字节流的无符号整数
     * @method ByteArray#writeUnsignedInt
     */
    writeUnsignedInt(value: number): void;
    writeUint32(value: number): void;
    /**
     * 将 UTF-8 字符串写入字节流。先写入以字节表示的 UTF-8 字符串长度（作为 16 位整数），然后写入表示字符串字符的字节
     * @param value 要写入的字符串值
     * @method ByteArray#writeUTF
     */
    writeUTF(value: string): void;
    writeString(value: string): void;
    writeStringByLen(value: string, len: number): void;
    readVector3D($w?: boolean): Vector3D;
    /**
     * 将 UTF-8 字符串写入字节流。类似于 writeUTF() 方法，但 writeUTFBytes() 不使用 16 位长度的词为字符串添加前缀
     * @param value 要写入的字符串值
     * @method ByteArray#writeUTFBytes
     */
    writeUTFBytes(value: string): void;
    toString(): string;
    /**
     * 将 Uint8Array 写入字节流
     * @param bytes 要写入的Uint8Array
     * @param validateBuffer
     */
    _writeUint8Array(bytes: Uint8Array, validateBuffer?: boolean): void;
    /**
     * @private
     */
    validate(len: number): boolean;
    /**********************/
    /**********************/
    private validateBuffer;
    /**
     * UTF-8 Encoding/Decoding
     */
    private encodeUTF8;
    private decodeUTF8;
    private encoderError;
    private decoderError;
    private EOF_byte;
    private EOF_code_point;
    private inRange;
    private div;
    private stringToCodePoints;
}
