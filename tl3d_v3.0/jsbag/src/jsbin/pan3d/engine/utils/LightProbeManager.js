var Pan3d;
(function (Pan3d) {
    var LightProbeManager = /** @class */ (function () {
        function LightProbeManager() {
            this._defaultVec = new Array;
            var ary = [0.4444730390920146, -0.3834955622240026, -0.33124467509627725, 0.09365654209093091,
                -0.05673310882817577, 0.2120523322966496, 0.02945768486978205, -0.04965996229802928, -0.1136529129285836];
            for (var i = 0; i < 9; i++) {
                this._defaultVec.push(new Pan3d.Vector3D(ary[i], ary[i], ary[i]));
            }
        }
        LightProbeManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new LightProbeManager();
            }
            return this._instance;
        };
        LightProbeManager.prototype.setLightProbeData = function ($arr) {
            this._dataAry = $arr;
        };
        LightProbeManager.prototype.clear = function () {
            this._dataAry = null;
        };
        LightProbeManager.prototype.getData = function ($pos) {
            if (!this._dataAry) {
                return this._defaultVec;
            }
            for (var i = 0; i < this._dataAry.length; i++) {
                var lightArea = this._dataAry[i];
                if (this.testPoint(lightArea, $pos)) {
                    var baseV3d = lightArea.postion;
                    var bp = $pos.subtract(baseV3d);
                    return this.getResultData(lightArea.posItem, float2int(bp.x / lightArea.betweenNum), float2int(bp.z / lightArea.betweenNum), float2int(bp.y / lightArea.betweenNum), lightArea.betweenNum, bp);
                }
            }
            return this._defaultVec;
        };
        LightProbeManager.prototype.testPoint = function (lightArea, $pos) {
            var xNum = (lightArea.cubeVec.x - 1) * lightArea.betweenNum;
            var yNum = (lightArea.cubeVec.y - 1) * lightArea.betweenNum;
            var zNum = (lightArea.cubeVec.z - 1) * lightArea.betweenNum;
            var cx = $pos.x - lightArea.postion.x;
            var cy = $pos.y - lightArea.postion.y;
            var cz = $pos.z - lightArea.postion.z;
            if (cx >= 0 && cx < xNum && cy >= 0 && cy < yNum && cz >= 0 && cz < zNum) {
                return true;
            }
            else {
                return false;
            }
        };
        LightProbeManager.prototype.getResultData = function (ary, x, z, y, bNum, $pos) {
            var posAry = new Array;
            posAry.push(new PosItem(ary[x][z][y], $pos));
            posAry.push(new PosItem(ary[x + 1][z][y], $pos));
            posAry.push(new PosItem(ary[x][z + 1][y], $pos));
            posAry.push(new PosItem(ary[x + 1][z + 1][y], $pos));
            posAry.push(new PosItem(ary[x][z][y + 1], $pos));
            posAry.push(new PosItem(ary[x + 1][z][y + 1], $pos));
            posAry.push(new PosItem(ary[x][z + 1][y + 1], $pos));
            posAry.push(new PosItem(ary[x + 1][z + 1][y + 1], $pos));
            var allDis = 0;
            for (var i = 0; i < posAry.length; i++) {
                allDis += posAry[i].dis;
            }
            for (i = 0; i < posAry.length; i++) {
                posAry[i].setBais(allDis);
            }
            var allBais = 0;
            for (i = 0; i < posAry.length; i++) {
                allBais += posAry[i].bais;
            }
            for (i = 0; i < posAry.length; i++) {
                posAry[i].bais = posAry[i].bais / allBais;
            }
            var arr = new Array;
            for (i = 0; i < 9; i++) {
                var v3d = new Pan3d.Vector3D;
                for (var j = 0; j < posAry.length; j++) {
                    var tempV3d = new Pan3d.Vector3D(posAry[j].vecNum[i].x, posAry[j].vecNum[i].y, posAry[j].vecNum[i].z);
                    tempV3d.scaleBy(posAry[j].bais);
                    v3d = v3d.add(tempV3d);
                }
                arr.push(v3d);
            }
            return arr;
        };
        return LightProbeManager;
    }());
    Pan3d.LightProbeManager = LightProbeManager;
    var PosItem = /** @class */ (function () {
        function PosItem(basePos, centerPos) {
            this.pos = new Pan3d.Vector3D(basePos.x, basePos.y, basePos.z);
            this.vecNum = basePos.resultSHVec;
            this.dis = Pan3d.Vector3D.distance(this.pos, centerPos);
        }
        PosItem.prototype.setBais = function (allDis) {
            this.bais = (this.dis / allDis) * (this.dis / allDis);
            this.bais = 1 / this.bais;
        };
        return PosItem;
    }());
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=LightProbeManager.js.map