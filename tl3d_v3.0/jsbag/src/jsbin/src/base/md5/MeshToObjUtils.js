var md5list;
(function (md5list) {
    var MeshData = Pan3d.MeshData;
    var Quaternion = Pan3d.Quaternion;
    var Vector3D = Pan3d.Vector3D;
    var Scene_data = Pan3d.Scene_data;
    var MeshToObjUtils = /** @class */ (function () {
        function MeshToObjUtils() {
        }
        MeshToObjUtils.prototype.getObj = function (mesh) {
            var objData = new MeshData;
            objData.vertices = new Array;
            objData.uvs = new Array;
            objData.normals = new Array;
            objData.indexs = new Array;
            var bindPosAry = new Array;
            var invertAry = new Array;
            var meshItemAry = new Array;
            var boneItemAry = this.processBoneNew(mesh.boneItem);
            for (var i = 0; i < boneItemAry.length; i++) {
                var objbone = boneItemAry[i];
                var OldQ = new Quaternion(objbone.qx, objbone.qy, objbone.qz);
                OldQ.w = this.getW(OldQ.x, OldQ.y, OldQ.z);
                var newM = OldQ.toMatrix3D();
                newM.appendTranslation(objbone.tx, objbone.ty, objbone.tz);
                objbone.matrix = newM;
                bindPosAry.push(newM);
                var inverMatrix = newM.clone();
                inverMatrix.invert();
                invertAry.push(inverMatrix);
            }
            for (i = 0; i < mesh.uvItem.length; i++) {
                var objuv = mesh.uvItem[i];
                var v3d = new Vector3D;
                var wAry = new Array;
                for (var j = 0; j < objuv.b; j++) {
                    var weightID = objuv.a + j;
                    var objWeight = mesh.weightItem[weightID];
                    var ma = boneItemAry[objWeight.boneId].matrix;
                    var tempV3d = new Vector3D(objWeight.x, objWeight.y, objWeight.z);
                    tempV3d = ma.transformVector(tempV3d);
                    tempV3d.scaleBy(objWeight.w);
                    v3d = v3d.add(tempV3d);
                    wAry.push(objWeight.w);
                }
                objData.vertices.push(v3d.x, v3d.y, v3d.z);
                objData.uvs.push(objuv.x, objuv.y);
                var meshitem = new md5list.MeshItem;
                meshitem.verts = new Vector3D(v3d.x, v3d.y, v3d.z);
                meshitem.uvInfo = objuv;
                meshItemAry.push(meshitem);
            }
            for (i = 0; i < mesh.triItem.length; i++) {
                objData.indexs.push(mesh.triItem[i].t0, mesh.triItem[i].t1, mesh.triItem[i].t2);
            }
            objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(objData.vertices);
            objData.uvBuffer = Scene_data.context3D.uploadBuff3D(objData.uvs);
            objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(objData.indexs);
            objData.bindPosAry = bindPosAry;
            objData.invertAry = invertAry;
            return objData;
        };
        MeshToObjUtils.prototype.getW = function (x, y, z) {
            var t = 1 - (x * x + y * y + z * z);
            if (t < 0) {
                t = 0;
            }
            else {
                t = -Math.sqrt(t);
            }
            return t;
        };
        MeshToObjUtils.prototype.processBoneNew = function (targetAry) {
            var newTargetAry = MeshToObjUtils.getStorNewTargerArr(targetAry);
            //添加bip骨骼到新数组
            var mapkeyAry = new Array; //新旧ID映射关系
            for (var i = 0; i < targetAry.length; i++) {
                var index = newTargetAry.indexOf(targetAry[i]);
                mapkeyAry.push(index);
            }
            var resultAry = new Array; //最终更新的数据
            for (i = 0; i < newTargetAry.length; i++) { //数据复制
                var $kkkk = newTargetAry[i];
                resultAry.push($kkkk.clone());
            }
            for (i = 0; i < resultAry.length; i++) { //从映射关系更新父级id
                index = resultAry[i].father;
                if (index != -1) {
                    resultAry[i].father = mapkeyAry[index];
                }
            }
            return resultAry;
        };
        MeshToObjUtils.getStorNewTargerArr = function (targetAry) {
            var newTargetAry = new Array;
            var i;
            /*
               for (i = 0; i < targetAry.length; i++) {
                   if (targetAry[i].name.indexOf("origin") != -1) {
                       newTargetAry.push(targetAry[i]);
                   }
               }
       
               for (i = 0; i < targetAry.length; i++) {
                   if (targetAry[i].name.indexOf("Bip") != -1) {
                       newTargetAry.push(targetAry[i]);
                   }
               }
               //添加weapon骨骼到新数组
               for (i = 0; i < targetAry.length; i++) {
                   if (targetAry[i].name.indexOf("weapon") != -1) {
                       newTargetAry.push(targetAry[i]);
                   }
               }
       
               */
            //添加剩余的骨骼到新数组
            for (i = 0; i < targetAry.length; i++) {
                if (newTargetAry.indexOf(targetAry[i]) == -1) {
                    newTargetAry.push(targetAry[i]);
                }
            }
            return newTargetAry;
        };
        return MeshToObjUtils;
    }());
    md5list.MeshToObjUtils = MeshToObjUtils;
})(md5list || (md5list = {}));
//# sourceMappingURL=MeshToObjUtils.js.map