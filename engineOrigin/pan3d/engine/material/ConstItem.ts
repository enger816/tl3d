/**
* 
* 
* pramaType 0 表示无类型 1表示 float 2表示 vec2 3表示vec3
*/
module Pan3d {
    export class ConstItem {
        private _id: number;
        public name: string;
        public value: Vector3D = new Vector3D;
        public vecNum: Float32Array;

        public paramName0: string;
        public param0Type: number;
        public param0Index: number;

        public paramName1: string;
        public param1Type: number;
        public param1Index: number;

        public paramName2: string;
        public param2Type: number;
        public param2Index: number;

        public paramName3: string;
        public param3Type: number;
        public param3Index: number;

        public isDynamic: Boolean;

        public offset: number = 0;

        public set id(value: number) {
            this._id = value;
            this.name = "fc" + value;
            this.offset = value * 4;
        }

        public get id(): number {
            return this._id;
        }

        public creat($vc: Float32Array): void {
            this.vecNum = $vc;
            this.vecNum[0 + this.offset] = this.value.x;
            this.vecNum[1 + this.offset] = this.value.y;
            this.vecNum[2 + this.offset] = this.value.z;
            this.vecNum[3 + this.offset] = this.value.w;
        }



        public setData(obj: any): void {
            this.id = obj.id;
            this.value = new Vector3D(obj.value.x, obj.value.y, obj.value.z, obj.value.w);

            this.paramName0 = obj.paramName0;
            this.param0Type = obj.param0Type;
            this.param0Index = obj.param0Index;

            this.paramName1 = obj.paramName1;
            this.param1Type = obj.param1Type;
            this.param1Index = obj.param1Index;

            this.paramName2 = obj.paramName2;
            this.param2Type = obj.param2Type;
            this.param2Index = obj.param2Index;

            this.paramName3 = obj.paramName3;
            this.param3Type = obj.param3Type;
            this.param3Index = obj.param3Index;



        }

        public setDynamicOffset($dynamic: DynamicBaseConstItem): void {
            if (this.paramName0 == $dynamic.paramName) {
                $dynamic.targetOffset = this.param0Index + this.offset;
            } else if (this.paramName1 == $dynamic.paramName) {
                $dynamic.targetOffset = this.param1Index + this.offset;
            } else if (this.paramName2 == $dynamic.paramName) {
                $dynamic.targetOffset = this.param2Index + this.offset;
            } else if (this.paramName3 == $dynamic.paramName) {
                $dynamic.targetOffset = this.param3Index + this.offset;
            }
        }

        public setDynamicDirect($ary: Array<number>, $offset): void {
            this.vecNum.set($ary, $offset);
        }
        public setDynamic($dynamic: DynamicBaseConstItem): void {
            try {
                this.vecNum.set($dynamic.currentValue, $dynamic.targetOffset);
            }
            catch (err) {
                //console.log("在此处理错误2");
            }
            /**
            if (this.paramName0 == $dynamic.paramName) {
                if (this.param0Type == 1) {
                    this.vecNum[this.param0Index + this.offset] = $dynamic.currentValue.x;
                } else if (this.param0Type == 2) {
                    this.vecNum[this.param0Index + this.offset] = $dynamic.currentValue.x;
                    this.vecNum[this.param0Index + 1 + this.offset] = $dynamic.currentValue.y;
                } else if (this.param0Type == 3) {
                    this.vecNum[this.param0Index + this.offset] = $dynamic.currentValue.x;
                    this.vecNum[this.param0Index + 1 + this.offset] = $dynamic.currentValue.y;
                    this.vecNum[this.param0Index + 2 + this.offset] = $dynamic.currentValue.z;
                } else if (this.param0Type == 4) {
                    this.vecNum[this.param0Index + this.offset] = $dynamic.currentValue.x;
                    this.vecNum[this.param0Index + 1 + this.offset] = $dynamic.currentValue.y;
                    this.vecNum[this.param0Index + 2 + this.offset] = $dynamic.currentValue.z;
                    this.vecNum[this.param0Index + 3 + this.offset] = $dynamic.currentValue.w;
                }
            } else if (this.paramName1 == $dynamic.paramName) {
                if (this.param1Type == 1) {
                    this.vecNum[this.param1Index + this.offset] = $dynamic.currentValue.x;
                } else if (this.param1Type == 2) {
                    this.vecNum[this.param1Index + this.offset] = $dynamic.currentValue.x;
                    this.vecNum[this.param1Index + 1 + this.offset] = $dynamic.currentValue.y;
                } else if (this.param1Type == 3) {
                    this.vecNum[this.param1Index + this.offset] = $dynamic.currentValue.x;
                    this.vecNum[this.param1Index + 1 + this.offset] = $dynamic.currentValue.y;
                    this.vecNum[this.param1Index + 2 + this.offset] = $dynamic.currentValue.z;
                } else if (this.param1Type == 4) {
                    this.vecNum[this.param1Index + this.offset] = $dynamic.currentValue.x;
                    this.vecNum[this.param1Index + 1 + this.offset] = $dynamic.currentValue.y;
                    this.vecNum[this.param1Index + 2 + this.offset] = $dynamic.currentValue.z;
                    this.vecNum[this.param1Index + 3 + this.offset] = $dynamic.currentValue.w;
                }
            } else if (this.paramName2 == $dynamic.paramName) {
                if (this.param2Type == 1) {
                    this.vecNum[this.param2Index + this.offset] = $dynamic.currentValue.x;
                } else if (this.param2Type == 2) {
                    this.vecNum[this.param2Index + this.offset] = $dynamic.currentValue.x;
                    this.vecNum[this.param2Index + 1 + this.offset] = $dynamic.currentValue.y;
                } else if (this.param2Type == 3) {
                    this.vecNum[this.param2Index + this.offset] = $dynamic.currentValue.x;
                    this.vecNum[this.param2Index + 1 + this.offset] = $dynamic.currentValue.y;
                    this.vecNum[this.param2Index + 2 + this.offset] = $dynamic.currentValue.z;
                } else if (this.param2Type == 4) {
                    this.vecNum[this.param2Index + this.offset] = $dynamic.currentValue.x;
                    this.vecNum[this.param2Index + 1 + this.offset] = $dynamic.currentValue.y;
                    this.vecNum[this.param2Index + 2 + this.offset] = $dynamic.currentValue.z;
                    this.vecNum[this.param2Index + 3 + this.offset] = $dynamic.currentValue.w;
                }
            } else if (this.paramName3 == $dynamic.paramName) {
                if (this.param3Type == 1) {
                    this.vecNum[this.param3Index + this.offset] = $dynamic.currentValue.x;
                } else if (this.param3Type == 2) {
                    this.vecNum[this.param3Index + this.offset] = $dynamic.currentValue.x;
                    this.vecNum[this.param3Index + 1 + this.offset] = $dynamic.currentValue.y;
                } else if (this.param3Type == 3) {
                    this.vecNum[this.param3Index + this.offset] = $dynamic.currentValue.x;
                    this.vecNum[this.param3Index + 1 + this.offset] = $dynamic.currentValue.y;
                    this.vecNum[this.param3Index + 2 + this.offset] = $dynamic.currentValue.z;
                } else if (this.param3Type == 4) {
                    this.vecNum[this.param3Index + this.offset] = $dynamic.currentValue.x;
                    this.vecNum[this.param3Index + 1 + this.offset] = $dynamic.currentValue.y;
                    this.vecNum[this.param3Index + 2 + this.offset] = $dynamic.currentValue.z;
                    this.vecNum[this.param3Index + 3 + this.offset] = $dynamic.currentValue.w;
                }
    
            }
             */

        }




    }

}