var Pan3d;
(function (Pan3d) {
    var TimeLineData = /** @class */ (function () {
        function TimeLineData() {
            this.dataAry = new Array;
        }
        TimeLineData.prototype.destory = function () {
            this.dataAry = null;
        };
        TimeLineData.prototype.setByteData = function ($byte) {
            var len = $byte.readFloat();
            for (var i = 0; i < len; i++) {
                var frameNum = $byte.readFloat();
                var key = this.addKeyFrame(frameNum);
                key.frameNum = frameNum;
                key.baseValue = new Array();
                for (var j = 0; j < 10; j++) {
                    key.baseValue.push($byte.readFloat());
                }
                var animLen = $byte.readFloat();
                key.animData = new Array;
                if (animLen > 0) {
                    for (var k = 0; k < animLen; k++) {
                        key.animData.push(this.getByteDataTemp($byte));
                    }
                }
            }
            this.maxFrameNum = this.dataAry[this.dataAry.length - 1].frameNum;
            this.beginTime = this.dataAry[0].frameNum * Pan3d.Scene_data.frameTime;
        };
        TimeLineData.prototype.addKeyFrame = function (num) {
            var keyframe = new Object();
            keyframe.frameNum = num;
            this.dataAry.push(keyframe);
            return keyframe;
        };
        TimeLineData.prototype.getByteDataTemp = function ($byte) {
            var obj = new Object;
            var animType = $byte.readInt();
            var dataLen = $byte.readInt();
            obj.data = new Array;
            obj.dataByte = new Array;
            for (var i = 0; i < dataLen; i++) {
                var ko = new Object;
                ko.type = $byte.readInt();
                //  ko.value = $byte.readUTF();
                // obj.data.push(ko);
                if (ko.type == 1) {
                    var num = $byte.readFloat();
                    obj.dataByte.push(num);
                }
                if (ko.type == 2) {
                    var v = new Pan3d.Vector3D();
                    v.x = $byte.readFloat();
                    v.y = $byte.readFloat();
                    v.z = $byte.readFloat();
                    obj.dataByte.push(v);
                }
            }
            obj.type = animType;
            return obj;
        };
        return TimeLineData;
    }());
    Pan3d.TimeLineData = TimeLineData;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=TimeLineData.js.map