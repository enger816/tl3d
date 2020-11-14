var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var md5list;
(function (md5list) {
    var Vector3D = Pan3d.Vector3D;
    var MeshData = Pan3d.MeshData;
    var Scene_data = Pan3d.Scene_data;
    var ObjectTri = /** @class */ (function () {
        function ObjectTri() {
            this.id = 0;
            this.t0 = 0;
            this.t1 = 0;
            this.t2 = 0;
        }
        return ObjectTri;
    }());
    md5list.ObjectTri = ObjectTri;
    var ObjectWeight = /** @class */ (function () {
        function ObjectWeight() {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 0;
            this.weight = 0;
            this.boneId = 0;
            this.id = 0;
        }
        ObjectWeight.prototype.clone = function () {
            var obj = new ObjectWeight;
            obj.x = this.x;
            obj.y = this.y;
            obj.z = this.z;
            obj.w = this.w;
            obj.weight = this.weight;
            obj.boneId = this.boneId;
            obj.id = this.id;
            return obj;
        };
        return ObjectWeight;
    }());
    md5list.ObjectWeight = ObjectWeight;
    var ObjectUv = /** @class */ (function () {
        function ObjectUv() {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.a = 0;
            this.b = 0;
            this.w = 0;
            this.id = 0;
        }
        return ObjectUv;
    }());
    md5list.ObjectUv = ObjectUv;
    var MeshItem = /** @class */ (function () {
        function MeshItem() {
            this.normal = new Vector3D;
        }
        return MeshItem;
    }());
    md5list.MeshItem = MeshItem;
    var Md5MeshData = /** @class */ (function (_super) {
        __extends(Md5MeshData, _super);
        function Md5MeshData() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Md5MeshData;
    }(MeshData));
    md5list.Md5MeshData = Md5MeshData;
    var MeshImportSort = /** @class */ (function () {
        function MeshImportSort() {
            this.beginKey = 20;
            this.bindWidth = 4;
        }
        MeshImportSort.prototype.processMesh = function (meshData) {
            var weightAry = new Array;
            var i = 0;
            for (i = 0; i < meshData.weightItem.length; i++) {
                weightAry.push(meshData.weightItem[i].clone());
            }
            var mapkeyAry = this.getMapValue(meshData.boneItem);
            for (i = 0; i < weightAry.length; i++) {
                //trace(weightAry[i].boneId,mapkeyAry[weightAry[i].boneId])
                weightAry[i].boneId = mapkeyAry[weightAry[i].boneId];
            }
            //			meshData.souceBoneItem
            meshData.weightItem = weightAry;
            this.processForAgal(meshData);
        };
        MeshImportSort.prototype.processForAgal = function (meshData) {
            var beginKey = 1;
            var uvItem = meshData.uvItem;
            var weightItem = meshData.weightItem;
            var triItem = meshData.triItem;
            var uvArray = new Array();
            var ary = [[], [], [], []];
            var boneWeightAry = new Array;
            var bonetIDAry = new Array;
            var indexAry = new Array;
            var skipNum;
            var beginIndex;
            var allNum;
            var boneUseAry = new Array;
            for (var i = 0; i < uvItem.length; i++) {
                beginIndex = uvItem[i].a;
                allNum = uvItem[i].b;
                for (skipNum = 0; skipNum < 4; skipNum++) {
                    if (skipNum < allNum) {
                        boneUseAry.push((weightItem[beginIndex + skipNum].boneId));
                    }
                    else {
                        boneUseAry.push(boneUseAry[0]);
                    }
                }
            }
            boneUseAry = this.getboneNum(boneUseAry);
            for (i = 0; i < uvItem.length; i++) {
                beginIndex = uvItem[i].a;
                allNum = uvItem[i].b;
                for (skipNum = 0; skipNum < 4; skipNum++) {
                    if (skipNum < allNum) {
                        ary[skipNum].push(weightItem[beginIndex + skipNum].x, weightItem[beginIndex + skipNum].y, weightItem[beginIndex + skipNum].z);
                        bonetIDAry.push(boneUseAry.indexOf((weightItem[beginIndex + skipNum].boneId)));
                        boneWeightAry.push(weightItem[beginIndex + skipNum].w);
                    }
                    else {
                        ary[skipNum].push(0, 0, 0);
                        bonetIDAry.push(boneUseAry.indexOf(0));
                        boneWeightAry.push(0);
                    }
                }
                uvArray.push(uvItem[i].x);
                uvArray.push(uvItem[i].y);
            }
            meshData.boneNewIDAry = boneUseAry;
            for (i = 0; i < triItem.length; i++) {
                indexAry.push(triItem[i].t0, triItem[i].t1, triItem[i].t2);
            }
            meshData.faceNum = indexAry.length / 3;
            meshData.treNum = indexAry.length;
            // console.log(meshData, uvArray, ary, boneWeightAry, bonetIDAry, indexAry)
            this.uplodToGpu(meshData, uvArray, ary, boneWeightAry, bonetIDAry, indexAry);
        };
        MeshImportSort.prototype.uplodToGpu = function (meshData, uvArray, ary3, boneWeightAry, bonetIDAry, indexAry) {
            meshData.uvBuffer = Scene_data.context3D.uploadBuff3D(uvArray);
            meshData.boneWeightAry = boneWeightAry;
            meshData.boneWeightBuffer = Scene_data.context3D.uploadBuff3D(boneWeightAry);
            var arrA = new Array;
            for (var i = 0; i < bonetIDAry.length; i++) {
                arrA.push(Math.max(bonetIDAry[i], 0));
            }
            meshData.boneIDAry = arrA;
            meshData.boneIdBuffer = Scene_data.context3D.uploadBuff3D(arrA);
            meshData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(indexAry);
        };
        MeshImportSort.prototype.getboneNum = function (ary) {
            var numAry = new Array;
            for (var i = 0; i < ary.length; i++) {
                if (numAry.indexOf(ary[i]) == -1) {
                    numAry.push(ary[i]);
                }
            }
            return numAry;
        };
        /**
     * 返回映射关系列表
     * @param targetAry
     * @return
     *
     */
        MeshImportSort.prototype.getMapValue = function (targetAry) {
            var newTargetAry = md5list.MeshToObjUtils.getStorNewTargerArr(targetAry);
            var mapkeyAry = new Array; //新旧ID映射关系
            for (var i = 0; i < targetAry.length; i++) {
                var index = newTargetAry.indexOf(targetAry[i]);
                mapkeyAry.push(index);
            }
            return mapkeyAry;
        };
        return MeshImportSort;
    }());
    md5list.MeshImportSort = MeshImportSort;
})(md5list || (md5list = {}));
//# sourceMappingURL=MeshImportSort.js.map