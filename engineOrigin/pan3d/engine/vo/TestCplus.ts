class Test{
    public static IMG_TYPE: number = 1;
    public static OBJS_TYPE: number = 2;
    public static MATERIAL_TYPE: number = 3;

    public type: number;
    public name: string;
    public age: number;

    private _byte: Pan3d. Pan3dByteArray;

    public readData($bytes: Pan3d.Pan3dByteArray): void {
        this._byte = $bytes;
        this.type = this._byte.readShort();
        this.name = this._byte.readUTF();
        this.age = this._byte.readInt();
    }

    public writeData(): void {
        this._byte.writeShort(Test.IMG_TYPE);
        this._byte.writeUTF(this.name);
        var sss: number = 90;
        this._byte.writeInt(sss);
    }

} 