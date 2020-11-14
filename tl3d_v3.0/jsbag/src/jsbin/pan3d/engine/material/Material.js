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
    var Material = /** @class */ (function (_super) {
        __extends(Material, _super);
        function Material() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.texList = new Array;
            _this.constList = new Array;
            _this.killNum = 0;
            _this.writeZbuffer = true;
            _this.fogMode = 0;
            _this.fcNum = 0;
            return _this;
        }
        Material.prototype.update = function (t) {
            this.updateTime(t);
            //this.updateCam();
            this.updateScene();
        };
        Material.prototype.updateTime = function (t) {
            if (this.hasTime) {
                this.fcData[1] = t;
            }
        };
        Material.prototype.updateCam = function (x, y, z) {
            if (this.usePbr || this.fogMode == 1) {
                var idx = this.fcIDAry[0] * 4;
                this.fcData[0 + idx] = x;
                this.fcData[1 + idx] = y;
                this.fcData[2 + idx] = z;
            }
        };
        Material.prototype.updateScene = function () {
            if (this.sceneNumId == Pan3d.Scene_data.sceneNumId) {
                return;
            }
            this.sceneNumId = Pan3d.Scene_data.sceneNumId;
            if (this.fogMode != 0) {
                var idx = this.fcIDAry[1] * 4;
                this.fcData[0 + idx] = Pan3d.Scene_data.fogColor[0];
                this.fcData[1 + idx] = Pan3d.Scene_data.fogColor[1];
                this.fcData[2 + idx] = Pan3d.Scene_data.fogColor[2];
            }
            if (this.scaleLightMap) {
                var idx = this.fcIDAry[2] * 4;
                this.fcData[0 + idx] = Pan3d.Scene_data.scaleLight[0];
            }
        };
        Material.prototype.initFcData = function () {
            this.fcData = new Float32Array(this.fcNum * 4);
            if (this.fcNum <= 0) {
                return;
            }
            this.sceneNumId = Pan3d.Scene_data.sceneNumId;
            if (this.hasTime || this.useKill || this.fogMode != 0) { //fc0
                if (this.useKill) {
                    this.fcData[0] = this.killNum;
                }
                if (this.fogMode != 0) {
                    this.fcData[2] = Pan3d.Scene_data.fogData[0];
                    this.fcData[3] = Pan3d.Scene_data.fogData[1];
                }
            }
            if (this.usePbr || this.fogMode == 1) {
                var idx = this.fcIDAry[0] * 4;
                this.fcData[0 + idx] = Pan3d.Scene_data.cam3D.x / 100;
                this.fcData[1 + idx] = Pan3d.Scene_data.cam3D.y / 100;
                this.fcData[2 + idx] = Pan3d.Scene_data.cam3D.z / 100;
            }
            if (this.fogMode != 0) {
                var idx = this.fcIDAry[1] * 4;
                this.fcData[0 + idx] = Pan3d.Scene_data.fogColor[0];
                this.fcData[1 + idx] = Pan3d.Scene_data.fogColor[1];
                this.fcData[2 + idx] = Pan3d.Scene_data.fogColor[2];
            }
            if (this.scaleLightMap) {
                var idx = this.fcIDAry[2] * 4;
                this.fcData[0 + idx] = Pan3d.Scene_data.scaleLight[0];
            }
        };
        Material.prototype.setCompileData = function (_compileData) {
            if (!_compileData) {
                return;
            }
            this.shaderStr = _compileData.shaderStr;
            this.hasTime = _compileData.hasTime;
            this.timeSpeed = _compileData.timeSpeed;
            this.blendMode = _compileData.blendMode;
            this.backCull = _compileData.backCull;
            this.killNum = _compileData.killNum;
            this.hasVertexColor = _compileData.hasVertexColor;
            this.usePbr = _compileData.usePbr;
            this.useNormal = _compileData.useNormal;
            this.roughness = _compileData.roughness;
            this.writeZbuffer = _compileData.writeZbuffer;
            this.hasFresnel = _compileData.hasFresnel;
            this.useDynamicIBL = _compileData.useDynamicIBL;
            this.normalScale = _compileData.normalScale;
            this.lightProbe = _compileData.lightProbe;
            this.useKill = _compileData.useKill;
            this.directLight = _compileData.directLight;
            this.noLight = _compileData.noLight;
            this.scaleLightMap = _compileData.scaleLightMap;
            this.fogMode = _compileData.fogMode;
            this.hasParticleColor = false;
            this.initFcData();
            if (_compileData.texList) {
                var ary = _compileData.texList;
                this.texList = new Array;
                for (var i = 0; i < ary.length; i++) {
                    var texItem = new Pan3d.TexItem;
                    texItem.id = ary[i].id;
                    texItem.url = ary[i].url;
                    texItem.isDynamic = ary[i].isDynamic;
                    texItem.paramName = ary[i].paramName;
                    texItem.isMain = ary[i].isMain;
                    texItem.isParticleColor = ary[i].isParticleColor;
                    texItem.type = ary[i].type;
                    texItem.wrap = ary[i].wrap;
                    texItem.filter = ary[i].filter;
                    texItem.mipmap = ary[i].mipmap;
                    this.texList.push(texItem);
                    if (texItem.isParticleColor) {
                        this.hasParticleColor = true;
                    }
                }
            }
            if (_compileData.constList) {
                ary = _compileData.constList;
                this.constList = new Array;
                for (i = 0; i < ary.length; i++) {
                    var constItem = new Pan3d.ConstItem;
                    constItem.setData(ary[i]);
                    constItem.creat(this.fcData);
                    this.constList.push(constItem);
                }
            }
        };
        Material.prototype.setByteData = function (byte) {
            var fs = byte;
            var vesion = fs.readInt();
            this.shaderStr = fs.readUTF(); //fs.writeUTF(_compileData.shaderStr)
            this.hasTime = fs.readBoolean(); //fs.writeBoolean(_compileData.hasTime);
            this.timeSpeed = fs.readFloat(); //fs.writeFloat(_compileData.timeSpeed);
            this.blendMode = fs.readFloat(); //fs.writeFloat(_compileData.blendMode);
            this.backCull = fs.readBoolean(); //fs.writeBoolean(_compileData.backCull);
            this.killNum = fs.readFloat(); //fs.writeFloat(_compileData.killNum);
            this.hasVertexColor = fs.readBoolean(); //fs.writeBoolean(_compileData.hasVertexColor);
            this.usePbr = fs.readBoolean(); //fs.writeBoolean(_compileData.usePbr);
            this.useNormal = fs.readBoolean(); //fs.writeBoolean(_compileData.useNormal);
            this.roughness = fs.readFloat(); //fs.writeFloat(_compileData.roughness);
            this.writeZbuffer = fs.readBoolean(); //fs.writeBoolean(_compileData.writeZbuffer);
            this.hasFresnel = fs.readBoolean(); //fs.writeBoolean(_compileData.hasFresnel);
            this.useDynamicIBL = fs.readBoolean(); //fs.writeBoolean(_compileData.useDynamicIBL);
            this.normalScale = fs.readFloat(); //fs.writeFloat(_compileData.normalScale);
            this.lightProbe = fs.readBoolean(); //fs.writeBoolean(_compileData.lightProbe);
            this.useKill = fs.readBoolean(); //fs.writeBoolean(_compileData.useKill);
            this.directLight = fs.readBoolean(); //fs.writeBoolean(_compileData.directLight);
            this.noLight = fs.readBoolean(); //fs.writeBoolean(_compileData.noLight);
            this.scaleLightMap = fs.readBoolean(); //fs.writeBoolean(_compileData.scaleLightMap)
            if (vesion > 2) {
                this.fogMode = fs.readInt();
            }
            if (vesion >= 22) {
                this.fcNum = fs.readByte();
                var leg = fs.readByte();
                this.fcIDAry = new Array;
                for (var i = 0; i < leg; i++) {
                    this.fcIDAry.push(fs.readByte());
                }
            }
            else {
                // //console.log("ddddd");
            }
            this.hasParticleColor = false;
            this.initFcData();
            this.readTexList(fs);
            this.readConstLis(fs);
        };
        Material.prototype.readConstLis = function (fs) {
            var constLisLen = fs.readInt();
            this.constList = new Array;
            for (var i = 0; i < constLisLen; i++) {
                var constItem = new Pan3d.ConstItem;
                constItem.id = fs.readFloat();
                constItem.value = new Pan3d.Vector3D(fs.readFloat(), fs.readFloat(), fs.readFloat(), fs.readFloat());
                constItem.paramName0 = fs.readUTF();
                constItem.param0Type = fs.readFloat();
                constItem.param0Index = fs.readFloat();
                constItem.paramName1 = fs.readUTF();
                constItem.param1Type = fs.readFloat();
                constItem.param1Index = fs.readFloat();
                constItem.paramName2 = fs.readUTF();
                constItem.param2Type = fs.readFloat();
                constItem.param2Index = fs.readFloat();
                constItem.paramName3 = fs.readUTF();
                constItem.param3Type = fs.readFloat();
                constItem.param3Index = fs.readFloat();
                constItem.creat(this.fcData);
                this.constList.push(constItem);
            }
        };
        Material.prototype.readTexList = function (fs) {
            var texListLen = fs.readInt();
            this.texList = new Array;
            for (var i = 0; i < texListLen; i++) {
                var texItem = new Pan3d.TexItem;
                texItem.id = fs.readFloat();
                texItem.url = fs.readUTF();
                texItem.isDynamic = fs.readBoolean();
                texItem.paramName = fs.readUTF();
                texItem.isMain = fs.readBoolean();
                texItem.isParticleColor = fs.readBoolean();
                texItem.type = fs.readFloat();
                texItem.wrap = fs.readFloat();
                texItem.filter = fs.readFloat();
                texItem.mipmap = fs.readFloat();
                if (texItem.isParticleColor) {
                    this.hasParticleColor = true;
                }
                this.texList.push(texItem);
            }
        };
        Material.prototype.destory = function () {
            for (var i = 0; i < this.texList.length; i++) {
                this.texList[i].destory();
            }
            this.texList = null;
            this.constList = null;
            if (this.shader) {
                this.shader.clearUseNum();
            }
        };
        return Material;
    }(Pan3d.ResCount));
    Pan3d.Material = Material;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Material.js.map