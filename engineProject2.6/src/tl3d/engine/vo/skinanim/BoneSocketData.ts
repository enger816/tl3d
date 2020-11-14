export class BoneSocketData {

    public name: string;
    public boneName: string;
    public index: number;
    public x: number;
    public y: number;
    public z: number;
    public rotationX: number;
    public rotationY: number;
    public rotationZ: number;

    private static cloneIDIndex: number = 0;

    clone(): BoneSocketData {
        var result: BoneSocketData = new BoneSocketData();
        result.name = this.name + BoneSocketData.cloneIDIndex;
        result.boneName = this.boneName;
        result.index = this.index;
        result.x = this.x;
        result.y = this.y;
        result.z = this.z;

        result.rotationX = this.rotationX;
        result.rotationY = this.rotationY;
        result.rotationZ = this.rotationZ;

        return result;
    }
}