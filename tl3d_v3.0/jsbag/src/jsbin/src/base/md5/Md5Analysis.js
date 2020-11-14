var md5list;
(function (md5list) {
    var Dictionary = Pan3d.Dictionary;
    var ObjectBone = Pan3d.ObjectBone;
    var Md5Analysis = /** @class */ (function () {
        function Md5Analysis() {
        }
        Md5Analysis.prototype.addMesh = function (str) {
            var arr;
            if (str.indexOf("mesh") != -1) {
                //存入没一个元件MESH;
                var meshData = new md5list.Md5MeshData();
                var meshSmaple = new Dictionary([]);
                arr = str.split(/[\n\r]{2}/);
                var numverts = false;
                var numvertsIndex = 0;
                var currentnumvertsIndex = 0;
                var numvertsArray = new Array();
                var numtris = false;
                var numtrisIndex = 0;
                var currentnumtrisIndex = 0;
                var numtrisArray = new Array();
                var numweights = false;
                var numweightsIndex = 0;
                var currentnumweightsIndex = 0;
                var numweightsArray = new Array();
                var joints;
                var jointAry = new Array;
                var reg = /\d+/;
                for (var m = 0; m < arr.length; m++) {
                    if (numverts) {
                        if (currentnumvertsIndex < numvertsIndex) {
                            numvertsArray.push(arr[m]);
                            currentnumvertsIndex++;
                        }
                        else {
                            //mesh["numverts"] = numvertsArray;
                            meshSmaple["numverts"] = numvertsArray;
                            numverts = false;
                        }
                    }
                    if (numtris) {
                        if (currentnumtrisIndex < numtrisIndex) {
                            numtrisArray.push(arr[m]);
                            currentnumtrisIndex++;
                        }
                        else {
                            //mesh["numtris"] = numtrisArray;
                            meshSmaple["numtris"] = numtrisArray;
                            numtris = false;
                        }
                    }
                    if (numweights) {
                        if (currentnumweightsIndex < numweightsIndex) {
                            numweightsArray.push(arr[m]);
                            currentnumweightsIndex++;
                        }
                        else {
                            //mesh["numweights"] = numweightsArray;
                            meshSmaple["numweights"] = numweightsArray;
                            numweights = false;
                        }
                    }
                    if (joints) {
                        jointAry.push(arr[m]);
                    }
                    if (String(arr[m]).indexOf("numverts") != -1) {
                        numverts = true;
                        numvertsIndex = Number(arr[m].match(reg)[0]);
                    }
                    if (String(arr[m]).indexOf("numtris") != -1) {
                        numtris = true;
                        numtrisIndex = Number(arr[m].match(reg)[0]);
                    }
                    if (String(arr[m]).indexOf("numweights") != -1) {
                        numweights = true;
                        numweightsIndex = Number(arr[m].match(reg)[0]);
                    }
                    if (String(arr[m]).indexOf("joints") != -1) {
                        joints = true;
                    }
                    if (String(arr[m]).indexOf("mesh") != -1) {
                        joints = false;
                        meshSmaple["joints"] = jointAry;
                    }
                    if (String(arr[m]).indexOf("commandline") != -1) {
                    }
                }
                meshData.mesh = meshSmaple;
                this.joinTri(meshData);
                this.joinPoint(meshData);
                this.joinUV(meshData);
                this.joinJoints(meshData);
                // console.log(meshData)
                return meshData;
            }
            return null;
        };
        Md5Analysis.prototype.joinJoints = function (meshData) {
            var jointAry = meshData.mesh["joints"];
            meshData.boneItem = new Array;
            for (var i = 0; i < jointAry.length; i++) {
                var line = jointAry[i];
                if (line.length < 9) {
                    break;
                }
                var boneName = line.match(/\".+\"/)[0];
                line = line.replace(boneName, "");
                var boneNameAry = TpGame.getArrByStr(line);
                if (boneNameAry.length == 1) {
                    break;
                }
                var bone = new ObjectBone();
                bone.name = boneName;
                bone.father = Number(boneNameAry[0]);
                bone.tx = Number(boneNameAry[2]);
                bone.ty = Number(boneNameAry[3]);
                bone.tz = Number(boneNameAry[4]);
                bone.qx = Number(boneNameAry[7]);
                bone.qy = Number(boneNameAry[8]);
                bone.qz = Number(boneNameAry[9]);
                meshData.boneItem.push(bone);
            }
        };
        Md5Analysis.prototype.joinUV = function (meshData) {
            var _meshNumverts = meshData.mesh["numverts"];
            meshData.uvItem = new Array();
            var _str = "";
            var _arr = new Array();
            var i = 0;
            for (i = 0; i < _meshNumverts.length; i++) {
                _str = this.genewStr(_meshNumverts[i]);
                _arr = _str.split(" ");
                var _temp = new md5list.ObjectUv();
                _temp.id = Number(_arr[1]);
                _temp.x = Number(_arr[2]);
                _temp.y = Number(_arr[3]);
                _temp.a = Number(_arr[4]);
                _temp.b = Number(_arr[5]);
                meshData.uvItem.push(_temp);
            }
        };
        Md5Analysis.prototype.joinPoint = function (meshData) {
            var _meshNumweights = meshData.mesh["numweights"];
            meshData.weightItem = new Array;
            var _str = "";
            var _arr = new Array();
            var i = 0;
            for (i = 0; i < _meshNumweights.length; i++) {
                _str = this.genewStr(_meshNumweights[i]);
                _arr = _str.split(" ");
                var _temp = new md5list.ObjectWeight();
                _temp.id = Number(_arr[1]);
                _temp.boneId = Number(_arr[2]);
                _temp.w = Number(_arr[3]);
                _temp.x = Number(_arr[4]);
                _temp.y = Number(_arr[5]);
                _temp.z = Number(_arr[6]);
                meshData.weightItem.push(_temp);
            }
        };
        Md5Analysis.prototype.joinTri = function (meshData) {
            var _meshNumtris = meshData.mesh["numtris"];
            meshData.triItem = new Array;
            var _str = "";
            var _arr = new Array();
            var i = 0;
            for (i = 0; i < _meshNumtris.length; i++) {
                _str = this.genewStr(_meshNumtris[i]);
                _arr = _str.split(" ");
                var _temp = new md5list.ObjectTri();
                _temp.id = Number(_arr[1]);
                _temp.t0 = Number(_arr[2]);
                _temp.t1 = Number(_arr[3]);
                _temp.t2 = Number(_arr[4]);
                meshData.triItem.push(_temp);
            }
        };
        Md5Analysis.prototype.genewStr = function (_str) {
            var _s = "";
            var _t = "";
            var _e = " ";
            var i = 0;
            while (i < _str.length) {
                _t = _str.charAt(i);
                switch (_t) {
                    case "(":
                        break;
                    case ")":
                        break;
                    case "\"":
                        break;
                    case "	":
                        if (_e != " ") {
                            _s = _s + " ";
                        }
                        _e = " ";
                        break;
                    case " ":
                        if (_e != " ") {
                            _s = _s + " ";
                        }
                        _e = " ";
                        break;
                    default:
                        _s = _s + _t;
                        _e = _t;
                        break;
                }
                i++;
            }
            return _s;
        };
        return Md5Analysis;
    }());
    md5list.Md5Analysis = Md5Analysis;
})(md5list || (md5list = {}));
//# sourceMappingURL=Md5Analysis.js.map