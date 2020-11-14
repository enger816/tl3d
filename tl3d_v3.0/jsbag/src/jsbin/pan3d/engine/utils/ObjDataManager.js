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
var Pan3d;
(function (Pan3d) {
    var ObjDataManager = /** @class */ (function (_super) {
        __extends(ObjDataManager, _super);
        function ObjDataManager() {
            var _this = 
            //this._dic = new Object();
            _super.call(this) || this;
            _this._loadList = new Object();
            return _this;
        }
        ObjDataManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new ObjDataManager();
            }
            return this._instance;
        };
        ObjDataManager.prototype.getObjData = function ($url, $fun) {
            var _this = this;
            if (this._dic[$url]) {
                $fun(this._dic[$url]);
                this._dic[$url].useNum++;
                return;
            }
            var ary;
            if (!this._loadList[$url]) {
                this._loadList[$url] = new Array;
                Pan3d.LoadManager.getInstance().load($url, Pan3d.LoadManager.BYTE_TYPE, function ($byte) {
                    _this.loadObjCom($byte, $url);
                });
            }
            ary = this._loadList[$url];
            ary.push($fun);
        };
        ObjDataManager.prototype.registerUrl = function ($url) {
            if (this._dic[$url]) {
                this._dic[$url].useNum++;
            }
        };
        ObjDataManager.prototype.releaseUrl = function ($url) {
            if (this._dic[$url]) {
                this._dic[$url].clearUseNum();
            }
        };
        ObjDataManager.prototype.gc = function () {
            _super.prototype.gc.call(this);
        };
        ObjDataManager.prototype.readFloatNrm = function (byte, vertices) {
            var verLength = byte.readInt();
            if (verLength > 0) {
                for (var i = 0; i < verLength; i++) {
                    vertices.push(byte.readFloat());
                }
            }
        };
        ObjDataManager.prototype.readcollisionItem = function (byte, $objData) {
            //将碰撞体都写入对象的OBJ对象中
            var $len = byte.readInt();
            if ($len > 0) {
                $objData.collision = new Pan3d.CollisionItemVo();
                $objData.collision.collisionItem = new Array;
                for (var i = 0; i < $len; i++) {
                    var $xmlcollisionVo = JSON.parse(byte.readUTF());
                    var $collisionVo = new Pan3d.CollisionVo();
                    $collisionVo.scaleX = $xmlcollisionVo.scale_x;
                    $collisionVo.scaleY = $xmlcollisionVo.scale_y;
                    $collisionVo.scaleZ = $xmlcollisionVo.scale_z;
                    $collisionVo.x = $xmlcollisionVo.x;
                    $collisionVo.y = $xmlcollisionVo.y;
                    $collisionVo.z = $xmlcollisionVo.z;
                    $collisionVo.rotationX = $xmlcollisionVo.rotationX;
                    $collisionVo.rotationY = $xmlcollisionVo.rotationY;
                    $collisionVo.rotationZ = $xmlcollisionVo.rotationZ;
                    $collisionVo.scaleX = this.getFloadNum($collisionVo.scaleX);
                    $collisionVo.scaleY = this.getFloadNum($collisionVo.scaleY);
                    $collisionVo.scaleZ = this.getFloadNum($collisionVo.scaleZ);
                    $collisionVo.rotationX = this.getFloadNum($collisionVo.rotationX);
                    $collisionVo.rotationY = this.getFloadNum($collisionVo.rotationY);
                    $collisionVo.rotationZ = this.getFloadNum($collisionVo.rotationZ);
                    $collisionVo.type = $xmlcollisionVo.type;
                    $collisionVo.data = $xmlcollisionVo.data;
                    $objData.collision.collisionItem.push($collisionVo);
                }
            }
        };
        ObjDataManager.prototype.getFloadNum = function (value) {
            return Math.floor(value * 1000) / 1000;
        };
        ObjDataManager.prototype.loadObjCom = function ($byte, $url) {
            if (this._dic[$url]) {
                return;
            }
            ////console.log($objData);
            var $objData = new Pan3d.ObjData();
            var byte = new Pan3d.Pan3dByteArray($byte);
            var version = byte.readInt();
            var str = byte.readUTF();
            if (version >= 20) {
                this.readObj2OneBuffer(byte, $objData);
                if (version >= 37 && byte.position < byte.length) { //加上碰撞体
                    this.readcollisionItem(byte, $objData);
                }
            }
            else {
                Pan3d.BaseRes.readFloatTwoByte(byte, $objData.vertices);
                Pan3d.BaseRes.readFloatTwoByte(byte, $objData.uvs);
                Pan3d.BaseRes.readFloatOneByte(byte, $objData.lightuvs);
                Pan3d.BaseRes.readFloatTwoByte(byte, $objData.normals);
                Pan3d.BaseRes.readIntForTwoByte(byte, $objData.indexs);
                Pan3d.BaseRes.readFloatTwoByte(byte, $objData.tangents);
                Pan3d.BaseRes.readFloatTwoByte(byte, $objData.bitangents);
                $objData.vertexBuffer = Pan3d.Scene_data.context3D.uploadBuff3D($objData.vertices);
                $objData.uvBuffer = Pan3d.Scene_data.context3D.uploadBuff3D($objData.uvs);
                $objData.lightUvBuffer = Pan3d.Scene_data.context3D.uploadBuff3D($objData.lightuvs);
                $objData.normalsBuffer = Pan3d.Scene_data.context3D.uploadBuff3D($objData.normals);
            }
            $objData.treNum = $objData.indexs.length;
            $objData.indexBuffer = Pan3d.Scene_data.context3D.uploadIndexBuff3D($objData.indexs);
            this._dic[$url] = $objData;
            var ary = this._loadList[$url];
            if (ary) {
                for (var i = 0; i < ary.length; i++) {
                    ary[i]($objData);
                }
                delete this._loadList[$url];
            }
            return $objData;
        };
        ObjDataManager.prototype.readObj2OneBuffer = function (byte, $objData) {
            var typeItem = new Array;
            var len;
            var typeItem = new Array;
            var dataWidth = 0;
            for (var i = 0; i < 6; i++) {
                var tf = byte.readBoolean();
                typeItem.push(tf);
                if (tf) {
                    switch (i) {
                        case 1: //uv
                            dataWidth += 2;
                            break;
                        case 2: //lightuv
                            dataWidth += 2;
                            break;
                        default:
                            dataWidth += 3;
                            break;
                    }
                }
            }
            len = byte.readFloat();
            var baseLenght = len;
            len *= dataWidth * 4;
            var arybuff = new ArrayBuffer(len);
            var data = new DataView(arybuff);
            var uvsOffsets = 3;
            var lightuvsOffsets = uvsOffsets + 2;
            var normalsOffsets = typeItem[2] ? (lightuvsOffsets + 2) : (uvsOffsets + 2);
            var tangentsOffsets = normalsOffsets + 3;
            var bitangentsOffsets = tangentsOffsets + 3;
            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 3, 0, dataWidth); //vertices
            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 2, uvsOffsets, dataWidth); //uvs
            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 2, lightuvsOffsets, dataWidth, 1); //lightuvs
            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 3, normalsOffsets, dataWidth); //normals
            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 3, tangentsOffsets, dataWidth); //tangents
            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 3, bitangentsOffsets, dataWidth); //bitangents
            $objData.dataView = data;
            // BaseRes.readFloatTwoByte(byte, $objData.vertices);
            // BaseRes.readFloatTwoByte(byte, $objData.uvs);
            // BaseRes.readLightUvForByte(byte, $objData.lightuvs);
            // BaseRes.readFloatTwoByte(byte, $objData.normals);
            // BaseRes.readFloatTwoByte(byte, $objData.tangents);
            // BaseRes.readFloatTwoByte(byte, $objData.bitangents);
            Pan3d.BaseRes.readIntForTwoByte(byte, $objData.indexs);
            // var dataAry: Array<number> = new Array;
            // for (var i: number = 0; i < baseLenght; i++) {
            //     dataAry.push($objData.vertices[i * 3]);
            //     dataAry.push($objData.vertices[i * 3 + 1]);
            //     dataAry.push($objData.vertices[i * 3 + 2]);
            //     dataAry.push($objData.uvs[i * 2]);
            //     dataAry.push($objData.uvs[i * 2 + 1]);
            //     dataAry.push($objData.lightuvs[i * 2]);
            //     dataAry.push($objData.lightuvs[i * 2 + 1]);
            // }
            ////console.log(dataAry);
            // $objData.vertexBuffer = Scene_data.context3D.uploadBuff3D($objData.vertices);
            // $objData.uvBuffer = Scene_data.context3D.uploadBuff3D($objData.uvs);
            // $objData.lightUvBuffer = Scene_data.context3D.uploadBuff3D($objData.lightuvs);
            // $objData.normalsBuffer = Scene_data.context3D.uploadBuff3D($objData.normals);
            $objData.vertexBuffer = Pan3d.Scene_data.context3D.uploadBuff3DArrayBuffer(arybuff);
            $objData.compressBuffer = true;
            $objData.uvsOffsets = uvsOffsets * 4;
            $objData.lightuvsOffsets = lightuvsOffsets * 4;
            $objData.normalsOffsets = normalsOffsets * 4;
            $objData.tangentsOffsets = tangentsOffsets * 4;
            $objData.bitangentsOffsets = bitangentsOffsets * 4;
            $objData.stride = dataWidth * 4;
            console.log("$objData.stride ", $objData.stride);
        };
        ObjDataManager.prototype.creatTBNBuffer = function ($objData) {
            $objData.tangentBuffer = Pan3d.Scene_data.context3D.uploadBuff3D($objData.tangents);
            $objData.bitangentBuffer = Pan3d.Scene_data.context3D.uploadBuff3D($objData.bitangents);
        };
        return ObjDataManager;
    }(Pan3d.ResGC));
    Pan3d.ObjDataManager = ObjDataManager;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ObjDataManager.js.map