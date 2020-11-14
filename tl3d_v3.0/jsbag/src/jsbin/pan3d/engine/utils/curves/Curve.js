var Pan3d;
(function (Pan3d) {
    var Curve = /** @class */ (function () {
        function Curve() {
            this.valueV3d = [1, 1, 1, 1];
        }
        Curve.prototype.getValue = function ($t) {
            if (!this.valueVec || this.begintFrame == -1) {
                return this.valueV3d;
            }
            var flag = float2int($t / Pan3d.Scene_data.frameTime - this.begintFrame);
            if (flag < 0) {
                flag = 0;
            }
            else if (flag > this.maxFrame - this.begintFrame) {
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
        };
        Curve.prototype.setData = function (obj) {
            this.type = obj.type;
            this.maxFrame = obj.maxFrame;
            if (obj.items.length) {
                this.begintFrame = obj.items[0].frame;
            }
            else {
                this.begintFrame = -1;
            }
            var len = obj.values[0].length;
            var ary = new Array;
            for (var i = 0; i < len; i++) {
                var itemAry = new Array;
                if (this.type == 1) {
                    itemAry.push(obj.values[0][i]);
                }
                else if (this.type == 2) {
                    itemAry.push(obj.values[0][i], obj.values[1][i]);
                }
                else if (this.type == 3) {
                    itemAry.push(obj.values[0][i], obj.values[1][i], obj.values[2][i]);
                }
                else if (this.type == 4) {
                    var w = obj.values[3][i];
                    itemAry.push(obj.values[0][i] * w, obj.values[1][i] * w, obj.values[2][i] * w, w);
                }
                ary.push(itemAry);
            }
            this.valueVec = ary;
        };
        return Curve;
    }());
    Pan3d.Curve = Curve;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Curve.js.map