var DualQuatFloat32Array = /** @class */ (function () {
    function DualQuatFloat32Array() {
    }
    return DualQuatFloat32Array;
}());
var AnimData = /** @class */ (function () {
    function AnimData() {
        this.inLoop = 0;
        this.inter = new Array;
        this.bounds = new Array;
        this.nameHeight = 0;
        this.posAry = new Array;
        this.hasProcess = false;
    }
    AnimData.prototype.processMesh = function ($skinMesh) {
        if (this.hasProcess) {
            //console.log("has process logic error");
            return;
        }
        for (var i = 0; i < this.matrixAry.length; i++) {
            var frameAry = this.matrixAry[i];
            for (var j = 0; j < frameAry.length; j++) {
                frameAry[j].prepend($skinMesh.bindPosMatrixAry[j]);
            }
        }
        this.makeFrameDualQuatFloatArray($skinMesh);
        this.hasProcess = true;
    };
    AnimData.prototype.makeFrameDualQuatFloatArray = function ($skinMesh) {
        this.boneQPAry = new Array();
        var tempMatrix = new Matrix3D();
        for (var i = 0; i < $skinMesh.meshAry.length; i++) {
            var $frameDualQuat = new Array;
            var newIDBoneArr = $skinMesh.meshAry[i].boneNewIDAry;
            for (var j = 0; j < this.matrixAry.length; j++) {
                var baseBone = this.matrixAry[j];
                var $DualQuatFloat32Array = new DualQuatFloat32Array;
                $DualQuatFloat32Array.quat = new Float32Array(newIDBoneArr.length * 4);
                $DualQuatFloat32Array.pos = new Float32Array(newIDBoneArr.length * 3);
                for (var k = 0; k < newIDBoneArr.length; k++) {
                    var $m = baseBone[newIDBoneArr[k]].clone(tempMatrix);
                    $m.appendScale(-1, 1, 1); //特别标记，因为四元数和矩阵运算结果不一
                    var $q = new Quaternion();
                    $q.fromMatrix($m);
                    var $p = $m.position;
                    $DualQuatFloat32Array.quat[k * 4 + 0] = $q.x;
                    $DualQuatFloat32Array.quat[k * 4 + 1] = $q.y;
                    $DualQuatFloat32Array.quat[k * 4 + 2] = $q.z;
                    $DualQuatFloat32Array.quat[k * 4 + 3] = $q.w;
                    $DualQuatFloat32Array.pos[k * 3 + 0] = $p.x;
                    $DualQuatFloat32Array.pos[k * 3 + 1] = $p.y;
                    $DualQuatFloat32Array.pos[k * 3 + 2] = $p.z;
                }
                $frameDualQuat.push($DualQuatFloat32Array);
            }
            this.boneQPAry.push($frameDualQuat);
        }
    };
    return AnimData;
}());
//# sourceMappingURL=AnimData.js.map