var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
            LoadManager.getInstance().load($url, LoadManager.BYTE_TYPE, function ($byte) {
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
    ObjDataManager.prototype.loadObjCom = function ($byte, $url) {
        if (this._dic[$url]) {
            return;
        }
        ////console.log($objData);
        var $objData = new ObjData();
        var byte = new ByteArray($byte);
        var version = byte.readInt();
        var str = byte.readUTF();
        if (version >= 20) {
            this.readObj2OneBuffer(byte, $objData);
        }
        else {
            BaseRes.readFloatTwoByte(byte, $objData.vertices);
            BaseRes.readFloatTwoByte(byte, $objData.uvs);
            BaseRes.readFloatOneByte(byte, $objData.lightuvs);
            BaseRes.readFloatTwoByte(byte, $objData.normals);
            BaseRes.readIntForTwoByte(byte, $objData.indexs);
            BaseRes.readFloatTwoByte(byte, $objData.tangents);
            BaseRes.readFloatTwoByte(byte, $objData.bitangents);
            $objData.vertexBuffer = Scene_data.context3D.uploadBuff3D($objData.vertices);
            $objData.uvBuffer = Scene_data.context3D.uploadBuff3D($objData.uvs);
            $objData.lightUvBuffer = Scene_data.context3D.uploadBuff3D($objData.lightuvs);
            $objData.normalsBuffer = Scene_data.context3D.uploadBuff3D($objData.normals);
        }
        $objData.treNum = $objData.indexs.length;
        $objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D($objData.indexs);
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
                    case 1://uv
                        dataWidth += 2;
                        break;
                    case 2://lightuv
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
        BaseRes.readBytes2ArrayBuffer(byte, data, 3, 0, dataWidth); //vertices
        BaseRes.readBytes2ArrayBuffer(byte, data, 2, uvsOffsets, dataWidth); //uvs
        BaseRes.readBytes2ArrayBuffer(byte, data, 2, lightuvsOffsets, dataWidth, 1); //lightuvs
        BaseRes.readBytes2ArrayBuffer(byte, data, 3, normalsOffsets, dataWidth); //normals
        BaseRes.readBytes2ArrayBuffer(byte, data, 3, tangentsOffsets, dataWidth); //tangents
        BaseRes.readBytes2ArrayBuffer(byte, data, 3, bitangentsOffsets, dataWidth); //bitangents
        // BaseRes.readFloatTwoByte(byte, $objData.vertices);
        // BaseRes.readFloatTwoByte(byte, $objData.uvs);
        // BaseRes.readLightUvForByte(byte, $objData.lightuvs);
        // BaseRes.readFloatTwoByte(byte, $objData.normals);
        // BaseRes.readFloatTwoByte(byte, $objData.tangents);
        // BaseRes.readFloatTwoByte(byte, $objData.bitangents);
        BaseRes.readIntForTwoByte(byte, $objData.indexs);
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
        $objData.vertexBuffer = Scene_data.context3D.uploadBuff3DArrayBuffer(arybuff);
        $objData.compressBuffer = true;
        $objData.uvsOffsets = uvsOffsets * 4;
        $objData.lightuvsOffsets = lightuvsOffsets * 4;
        $objData.normalsOffsets = normalsOffsets * 4;
        $objData.tangentsOffsets = tangentsOffsets * 4;
        $objData.bitangentsOffsets = bitangentsOffsets * 4;
        $objData.stride = dataWidth * 4;
    };
    ObjDataManager.prototype.creatTBNBuffer = function ($objData) {
        $objData.tangentBuffer = Scene_data.context3D.uploadBuff3D($objData.tangents);
        $objData.bitangentBuffer = Scene_data.context3D.uploadBuff3D($objData.bitangents);
    };
    return ObjDataManager;
}(ResGC));
//# sourceMappingURL=ObjDataManager.js.map