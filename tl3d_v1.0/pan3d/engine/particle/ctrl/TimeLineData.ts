module Pan3d {
    export class TimeLineData {
        public dataAry: Array<any> = new Array;
        public maxFrameNum: number;
        public beginTime: number;

        public destory(): void {
            this.dataAry = null;
        }

        public setByteData($byte: Pan3dByteArray): void {
            var len: number = $byte.readFloat();
            for (var i: number = 0; i < len; i++) {
                var frameNum: number = $byte.readFloat();
                var key: KeyFrame = this.addKeyFrame(frameNum);
                key.frameNum = frameNum;
                key.baseValue = new Array();
                for (var j: number = 0; j < 10; j++) {
                    key.baseValue.push($byte.readFloat());
                }
                var animLen: number = $byte.readFloat();
                key.animData = new Array
                if (animLen > 0) {
                    for (var k: number = 0; k < animLen; k++) {

                        key.animData.push(this.getByteDataTemp($byte))

                    }
                }
            }
            this.maxFrameNum = this.dataAry[this.dataAry.length - 1].frameNum;
            this.beginTime = this.dataAry[0].frameNum * Scene_data.frameTime;

        }

        public addKeyFrame(num: number): KeyFrame {
            var keyframe: any = new Object();
            keyframe.frameNum = num;
            this.dataAry.push(keyframe);
            return keyframe;
        }

        private getByteDataTemp($byte: Pan3dByteArray): any {
            var obj: any = new Object;
            var animType: number = $byte.readInt()
            var dataLen: number = $byte.readInt()
            obj.data = new Array;
            obj.dataByte = new Array;
            for (var i: number = 0; i < dataLen; i++) {
                var ko: any = new Object;
                ko.type = $byte.readInt();
                //  ko.value = $byte.readUTF();
                // obj.data.push(ko);
                if (ko.type == 1) {
                    var num: number = $byte.readFloat()
                    obj.dataByte.push(num);
                }
                if (ko.type == 2) {
                    var v: Vector3D = new Vector3D();
                    v.x = $byte.readFloat();
                    v.y = $byte.readFloat();
                    v.z = $byte.readFloat();
                    obj.dataByte.push(v);
                }

            }
            obj.type = animType;
            return obj;
        }

    }
}