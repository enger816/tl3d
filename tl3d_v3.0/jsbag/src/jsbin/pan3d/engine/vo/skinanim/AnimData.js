var Pan3d;
(function (Pan3d) {
    var DualQuatFloat32Array = /** @class */ (function () {
        function DualQuatFloat32Array() {
        }
        return DualQuatFloat32Array;
    }());
    Pan3d.DualQuatFloat32Array = DualQuatFloat32Array;
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
            this.makeArrBoneQPAry($skinMesh);
            this.hasProcess = true;
        };
        AnimData.prototype.makeArrBoneQPAry = function ($skinMesh) {
            this.meshBoneQPAryDic = new Pan3d.Dictionary([]);
            for (var k = 0; k < $skinMesh.meshAry.length; k++) {
                var $conleM = this.conleMatrixArr();
                for (var i = 0; i < $conleM.length; i++) {
                    var frameAry = $conleM[i];
                    for (var j = 0; j < frameAry.length; j++) {
                        if ($skinMesh.meshAry[k].bindPosMatrixAry[j]) {
                            frameAry[j].prepend($skinMesh.meshAry[k].bindPosMatrixAry[j]);
                        }
                    }
                }
                var temp = this.makeFrameDualQuatFloatArray($skinMesh, $conleM);
                this.meshBoneQPAryDic[$skinMesh.meshAry[k].uid] = temp;
                this.boneQPAry = temp; //存一下到原来数据中
            }
            this.matrixAry = $conleM; //将最后一个回传给插孔
        };
        AnimData.prototype.getBoneQPAryByMesh = function ($mesh) {
            return this.meshBoneQPAryDic[$mesh.uid];
        };
        AnimData.prototype.conleMatrixArr = function () {
            var $arr = new Array();
            for (var i = 0; i < this.matrixAry.length; i++) {
                var frameAry = this.matrixAry[i];
                var temp = new Array();
                for (var j = 0; j < frameAry.length; j++) {
                    temp.push(frameAry[j].clone());
                }
                $arr.push(temp);
            }
            return $arr;
        };
        AnimData.prototype.makeFrameDualQuatFloatArray = function ($skinMesh, $matrixAry) {
            var $backArr = new Array();
            var tempMatrix = new Pan3d.Matrix3D();
            for (var i = 0; i < $skinMesh.meshAry.length; i++) {
                var $frameDualQuat = new Array;
                var newIDBoneArr = $skinMesh.meshAry[i].boneNewIDAry;
                for (var j = 0; j < $matrixAry.length; j++) {
                    var baseBone = $matrixAry[j];
                    var $DualQuatFloat32Array = new DualQuatFloat32Array;
                    $DualQuatFloat32Array.quat = new Float32Array(newIDBoneArr.length * 4);
                    $DualQuatFloat32Array.pos = new Float32Array(newIDBoneArr.length * 3);
                    for (var k = 0; k < newIDBoneArr.length; k++) {
                        var $m = baseBone[newIDBoneArr[k]].clone(tempMatrix);
                        $m.appendScale(-1, 1, 1); //特别标记，因为四元数和矩阵运算结果不一
                        var $q = new Pan3d.Quaternion();
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
                $backArr.push($frameDualQuat);
            }
            return $backArr;
        };
        return AnimData;
    }());
    Pan3d.AnimData = AnimData;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=AnimData.js.map