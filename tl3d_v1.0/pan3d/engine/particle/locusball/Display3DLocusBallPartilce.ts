module Pan3d {
    export class Display3DLocusBallPartilce extends Display3DBallPartilce {

        //protected _posAry: Array<number>;
        //protected _angleAry: Array<number>;
        //protected _tangentAry: Array<number>;
        //protected _tangentSpeed:number;
        public constructor() {
            super();
        }

        public creatData(): void {
            this.data = new ParticleLocusballData;
        }

        //public setAllInfo(allObj: any): void {

        //    var obj: any = allObj.display;

        //    this._tangentSpeed = obj.tangentSpeed;
        //    this._posAry = obj.vecData.pos;
        //    this._angleAry = obj.vecData.angle;
        //    this._tangentAry = obj.vecData.tangent;

        //    super.setAllInfo(allObj);
        //}


    }
}