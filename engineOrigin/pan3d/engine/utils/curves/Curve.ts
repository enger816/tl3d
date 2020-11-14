module Pan3d {
    export class Curve {
        public type: number;
        public valueVec: Array<Array<number>>;
        private valueV3d: Array<number>;
        public begintFrame: number;
        public maxFrame: number;
        public constructor() {
            this.valueV3d = [1, 1, 1, 1];
        }

        public getValue($t: number): Array<number> {
            if (!this.valueVec || this.begintFrame == -1) {
                return this.valueV3d;
            }
            var flag: number = float2int($t / Scene_data.frameTime - this.begintFrame);

            if (flag < 0) {
                flag = 0;
            } else if (flag > this.maxFrame - this.begintFrame) {
                flag = this.maxFrame - this.begintFrame;
            }

            return this.valueVec[flag];
            /**
    
            if (this.type == 1) {
                this.valueV3d.x = this.valueVec[0][flag];
            } else if (this.type == 2) {
                this.valueV3d.x = this.valueVec[0][flag];
                this.valueV3d.y = this.valueVec[1][flag];
            } else if (this.type == 3) {
                this.valueV3d.x = this.valueVec[0][flag];
                this.valueV3d.y = this.valueVec[1][flag];
                this.valueV3d.z = this.valueVec[2][flag];
            } else if (this.type == 4) {
                this.valueV3d.x = this.valueVec[0][flag];
                this.valueV3d.y = this.valueVec[1][flag];
                this.valueV3d.z = this.valueVec[2][flag];
                this.valueV3d.w = this.valueVec[3][flag];
    
                this.valueV3d.scaleBy(this.valueV3d.w);
    
            }
            return this.valueV3d;
    
             */
        }

        public setData(obj: any): void {
            this.type = obj.type;
            this.maxFrame = obj.maxFrame;
            if (obj.items.length) {
                this.begintFrame = obj.items[0].frame;
            } else {
                this.begintFrame = -1;
            }

            var len: number = obj.values[0].length;
            var ary: Array<Array<number>> = new Array;
            for (var i: number = 0; i < len; i++) {
                var itemAry: Array<number> = new Array;
                if (this.type == 1) {
                    itemAry.push(obj.values[0][i]);
                } else if (this.type == 2) {
                    itemAry.push(obj.values[0][i], obj.values[1][i]);
                } else if (this.type == 3) {
                    itemAry.push(obj.values[0][i], obj.values[1][i], obj.values[2][i]);
                } else if (this.type == 4) {
                    var w: number = obj.values[3][i];
                    itemAry.push(obj.values[0][i] * w, obj.values[1][i] * w, obj.values[2][i] * w, w);
                }
                ary.push(itemAry);
            }

            this.valueVec = ary;
        }
    }
}