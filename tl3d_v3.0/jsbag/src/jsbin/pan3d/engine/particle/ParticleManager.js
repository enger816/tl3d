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
    var ParticleManager = /** @class */ (function (_super) {
        __extends(ParticleManager, _super);
        function ParticleManager() {
            var _this = _super.call(this) || this;
            _this._time = 0;
            _this.renderDic = new Object;
            _this._particleList = new Array;
            return _this;
        }
        ParticleManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new ParticleManager();
            }
            return this._instance;
        };
        ParticleManager.prototype.getParticleByte = function ($url) {
            $url = $url.replace("_byte.txt", ".txt");
            $url = $url.replace(".txt", "_byte.txt");
            var combineParticle = new Pan3d.CombineParticle();
            var url = $url;
            if (this._dic[url]) {
                var baseData = this._dic[url];
                combineParticle = baseData.getCombineParticle();
            }
            // else {
            //     LoadManager.getInstance().load(url, LoadManager.BYTE_TYPE, ($byte: ArrayBuffer) => {
            //         var byte: ByteArray = new ByteArray($byte);
            //         combineParticle.setDataByte(byte)
            //     });
            // }
            combineParticle.url = url;
            return combineParticle;
        };
        ParticleManager.prototype.registerUrl = function ($url) {
            $url = $url.replace("_byte.txt", ".txt");
            $url = $url.replace(".txt", "_byte.txt");
            if (this._dic[$url]) {
                var baseData = this._dic[$url];
                baseData.useNum++;
            }
        };
        ParticleManager.prototype.releaseUrl = function ($url) {
            $url = $url.replace("_byte.txt", ".txt");
            $url = $url.replace(".txt", "_byte.txt");
            if (this._dic[$url]) {
                var baseData = this._dic[$url];
                baseData.clearUseNum();
            }
        };
        ParticleManager.prototype.addResByte = function ($url, $data) {
            if (!this._dic[$url]) {
                var baseData = new Pan3d.CombineParticleData();
                ////console.log("load particle",$url);
                baseData.setDataByte($data);
                this._dic[$url] = baseData;
            }
        };
        ParticleManager.prototype.update = function () {
            // for (var i: number = 0; i < this._particleList.length; i++) {
            //     this._particleList[i].update();
            // }
            this.updateRenderDic();
            this.clearPaticleVa();
        };
        ParticleManager.prototype.clearPaticleVa = function () {
            Pan3d.Scene_data.context3D.clearVa(2);
            Pan3d.Scene_data.context3D.clearVa(3);
            Pan3d.Scene_data.context3D.clearVa(4);
            Pan3d.Scene_data.context3D.clearVa(5);
        };
        ParticleManager.prototype.setHide = function () {
            for (var i = 0; i < this._particleList.length; i++) {
                if (!this._particleList[i].dynamic) {
                    //  this._particleList[i].sceneVisible = false;
                }
            }
        };
        Object.defineProperty(ParticleManager.prototype, "particleList", {
            get: function () {
                return this._particleList;
            },
            enumerable: true,
            configurable: true
        });
        ParticleManager.prototype.updateTime = function () {
            var _tempTime = Pan3d.TimeUtil.getTimer();
            var t = _tempTime - this._time;
            for (var i = 0; i < this._particleList.length; i++) {
                if (!this._particleList[i].sceneVisible) {
                    continue;
                }
                this._particleList[i].updateTime(t);
            }
            this._time = _tempTime;
        };
        ParticleManager.prototype.addRenderDic = function ($particle) {
            var url = $particle.url;
            if (!this.renderDic[url]) {
                this.renderDic[url] = new Array;
            }
            this.renderDic[url].push($particle);
        };
        ParticleManager.prototype.removeRenderDic = function ($particle) {
            var url = $particle.url;
            var indexs = this.renderDic[url].indexOf($particle);
            if (indexs == -1) {
                return;
            }
            this.renderDic[url].splice(indexs, 1);
            if (this.renderDic[url].length == 0) {
                delete this.renderDic[url];
            }
        };
        ParticleManager.prototype.updateRenderDic = function () {
            for (var key in this.renderDic) {
                var list = this.renderDic[key];
                if (list.length == 1) {
                    list[0].update();
                }
                else {
                    var size = list[0].size;
                    for (var j = 0; j < size; j++) {
                        for (var i = 0; i < list.length; i++) {
                            list[i].updateItem(j);
                        }
                    }
                }
            }
        };
        ParticleManager.prototype.addParticle = function ($particle) {
            if (this._particleList.lastIndexOf($particle) != -1) {
                return;
            }
            this._particleList.push($particle);
            this.addRenderDic($particle);
        };
        ParticleManager.prototype.removeParticle = function ($particle) {
            var indexs = this._particleList.indexOf($particle);
            if (indexs == -1) {
                return;
            }
            this._particleList.splice(indexs, 1);
            this.removeRenderDic($particle);
        };
        ParticleManager.prototype.gc = function () {
            _super.prototype.gc.call(this);
        };
        return ParticleManager;
    }(Pan3d.ResGC));
    Pan3d.ParticleManager = ParticleManager;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ParticleManager.js.map