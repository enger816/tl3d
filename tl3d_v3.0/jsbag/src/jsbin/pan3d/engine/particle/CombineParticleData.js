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
    var CombineParticleData = /** @class */ (function (_super) {
        __extends(CombineParticleData, _super);
        function CombineParticleData() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CombineParticleData.prototype.destory = function () {
            for (var i = 0; i < this.dataAry.length; i++) {
                this.dataAry[i].destory();
            }
        };
        CombineParticleData.prototype.getCombineParticle = function () {
            var particle = new Pan3d.CombineParticle();
            particle.maxTime = this.maxTime;
            for (var i = 0; i < this.dataAry.length; i++) {
                var display = this.dataAry[i].creatPartilce();
                particle.addPrticleItem(display);
            }
            particle.sourceData = this;
            this.useNum++;
            return particle;
        };
        CombineParticleData.prototype.setDataByte = function (byte) {
            byte.position = 0;
            var version = byte.readInt();
            var len = byte.readInt();
            this.maxTime = 0;
            this.dataAry = new Array;
            for (var i = 0; i < len; i++) {
                var $particleType = byte.readInt();
                var pdata = this.getParticleDataType($particleType);
                pdata.version = version;
                pdata.setAllByteInfo(byte);
                this.dataAry.push(pdata);
                if (pdata.timelineData.maxFrameNum > this.maxTime) {
                    this.maxTime = pdata.timelineData.maxFrameNum;
                }
            }
            this.maxTime *= Pan3d.Scene_data.frameTime;
        };
        CombineParticleData.prototype.getParticleDataType = function ($type) {
            var pdata;
            switch ($type) {
                case 1:
                    {
                        pdata = new Pan3d.ParticleFacetData();
                        break;
                    }
                case 18:
                    {
                        pdata = new Pan3d.ParticleBallData();
                        break;
                    }
                case 3:
                    {
                        pdata = new Pan3d.ParticleLocusData();
                        break;
                    }
                case 14:
                    {
                        pdata = new Pan3d.ParticleLocusballData();
                        break;
                    }
                case 9:
                case 4:
                case 7:
                    {
                        pdata = new Pan3d.ParticleModelData();
                        break;
                    }
                case 8:
                    {
                        pdata = new Pan3d.ParticleFollowData();
                        break;
                    }
                case 12:
                    {
                        pdata = new Pan3d.ParticleFollowLocusData();
                        break;
                    }
                case 13:
                    {
                        pdata = new Pan3d.ParticleBoneData();
                        break;
                    }
            }
            return pdata;
        };
        return CombineParticleData;
    }(Pan3d.ResCount));
    Pan3d.CombineParticleData = CombineParticleData;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=CombineParticleData.js.map