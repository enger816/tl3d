module Pan3d {
    export class LightProbeManager {

        private static _instance: LightProbeManager;
        public static getInstance(): LightProbeManager {
            if (!this._instance) {
                this._instance = new LightProbeManager();
            }
            return this._instance;
        }

        private _dataAry: Array<any>;
        private _defaultVec: Array<Vector3D>;

        constructor() {
            this._defaultVec = new Array;

            var ary: Array<number> = [0.4444730390920146, -0.3834955622240026, -0.33124467509627725, 0.09365654209093091,
                -0.05673310882817577, 0.2120523322966496, 0.02945768486978205, -0.04965996229802928, -0.1136529129285836]

            for (var i: number = 0; i < 9; i++) {
                this._defaultVec.push(new Vector3D(ary[i], ary[i], ary[i]));
            }
        }

        public setLightProbeData($arr: Array<any>): void {
            this._dataAry = $arr;
        }

        public clear(): void {
            this._dataAry = null;
        }

        public getData($pos: Vector3D): Array<Vector3D> {
            if (!this._dataAry) {
                return this._defaultVec;
            }
            for (var i: number = 0; i < this._dataAry.length; i++) {
                var lightArea: any = this._dataAry[i];
                if (this.testPoint(lightArea, $pos)) {
                    var baseV3d: Vector3D = lightArea.postion;
                    var bp: Vector3D = $pos.subtract(baseV3d);
                    return this.getResultData(lightArea.posItem, float2int(bp.x / lightArea.betweenNum),
                        float2int(bp.z / lightArea.betweenNum), float2int(bp.y / lightArea.betweenNum), lightArea.betweenNum, bp);
                }
            }
            return this._defaultVec;
        }

        public testPoint(lightArea: any, $pos: Vector3D): Boolean {
            var xNum: number = (lightArea.cubeVec.x - 1) * lightArea.betweenNum;
            var yNum: number = (lightArea.cubeVec.y - 1) * lightArea.betweenNum;
            var zNum: number = (lightArea.cubeVec.z - 1) * lightArea.betweenNum;

            var cx: number = $pos.x - lightArea.postion.x;
            var cy: number = $pos.y - lightArea.postion.y;
            var cz: number = $pos.z - lightArea.postion.z;

            if (cx >= 0 && cx < xNum && cy >= 0 && cy < yNum && cz >= 0 && cz < zNum) {
                return true;
            } else {
                return false;
            }
        }

        public getResultData(ary: Array<any>, x: number, z: number, y: number, bNum: Number, $pos: Vector3D): Array<Vector3D> {
            var posAry: Array<PosItem> = new Array;

            posAry.push(new PosItem(ary[x][z][y], $pos));
            posAry.push(new PosItem(ary[x + 1][z][y], $pos));
            posAry.push(new PosItem(ary[x][z + 1][y], $pos));
            posAry.push(new PosItem(ary[x + 1][z + 1][y], $pos));

            posAry.push(new PosItem(ary[x][z][y + 1], $pos));
            posAry.push(new PosItem(ary[x + 1][z][y + 1], $pos));
            posAry.push(new PosItem(ary[x][z + 1][y + 1], $pos));
            posAry.push(new PosItem(ary[x + 1][z + 1][y + 1], $pos));

            var allDis: number = 0;
            for (var i: number = 0; i < posAry.length; i++) {
                allDis += posAry[i].dis;
            }

            for (i = 0; i < posAry.length; i++) {
                posAry[i].setBais(allDis);
            }

            var allBais: number = 0;
            for (i = 0; i < posAry.length; i++) {
                allBais += posAry[i].bais;
            }

            for (i = 0; i < posAry.length; i++) {
                posAry[i].bais = posAry[i].bais / allBais;
            }

            var arr: Array<Vector3D> = new Array;
            for (i = 0; i < 9; i++) {
                var v3d: Vector3D = new Vector3D;
                for (var j: number = 0; j < posAry.length; j++) {
                    var tempV3d: Vector3D = new Vector3D(posAry[j].vecNum[i].x, posAry[j].vecNum[i].y, posAry[j].vecNum[i].z);
                    tempV3d.scaleBy(posAry[j].bais);
                    v3d = v3d.add(tempV3d);
                }
                arr.push(v3d);
            }
            return arr;

        }


    }


    class PosItem {
        public pos: Vector3D;
        public bais: number;
        public dis: number;
        public vecNum: Array<Vector3D>;
        public constructor(basePos: any, centerPos: Vector3D) {
            this.pos = new Vector3D(basePos.x, basePos.y, basePos.z);

            this.vecNum = basePos.resultSHVec;

            this.dis = Vector3D.distance(this.pos, centerPos);
        }

        public setBais(allDis: number): void {
            this.bais = (this.dis / allDis) * (this.dis / allDis);
            this.bais = 1 / this.bais;
        }
    }
}