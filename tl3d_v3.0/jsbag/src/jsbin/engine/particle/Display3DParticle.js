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
var Display3DParticle = /** @class */ (function (_super) {
    __extends(Display3DParticle, _super);
    function Display3DParticle() {
        var _this = _super.call(this) || this;
        _this.isInGroup = false;
        _this.visible = true;
        _this._rotationMatrix = new Matrix3D();
        _this.modelMatrix = new Matrix3D();
        return _this;
    }
    Display3DParticle.prototype.onCreated = function () {
    };
    Display3DParticle.prototype.setBind = function ($pos, $rotation, $scale, $invertRotation, $groupMatrix) {
        this.bindVecter3d = $pos;
        this.bindMatrix = $rotation;
        this.bindScale = $scale;
        this.invertBindMatrix = $invertRotation;
        this.groupMatrix = $groupMatrix;
    };
    Display3DParticle.prototype.getMulBindList = function () {
        return null;
    };
    Display3DParticle.prototype.updateMatrix = function () {
        if (!this.bindMatrix) {
            return;
        }
        this.modelMatrix.identity();
        if (!this.groupMatrix.isIdentity) {
            this.posMatrix.append(this.groupMatrix);
        }
        this.modelMatrix.append(this.posMatrix);
        this.modelMatrix.append(this.bindMatrix);
        this.modelMatrix.appendTranslation(this.bindVecter3d.x, this.bindVecter3d.y, this.bindVecter3d.z);
    };
    Object.defineProperty(Display3DParticle.prototype, "cantUseEffectsLev", {
        //特效配置等级显示  是否能显示
        get: function () {
            var temp = this.data._renderPriority <= Scene_data.effectsLev; //0
            return !temp;
        },
        enumerable: true,
        configurable: true
    });
    Display3DParticle.prototype.updateTime = function (t) {
        if (this.cantUseEffectsLev) {
            return;
        }
        this._time = t - this._beginTime;
        this._time += this.data._delayedTime; //加上延时 
        this.timeline.updateTime(t);
        this.visible = this.timeline.visible;
        this.posMatrix.identity();
        this.posMatrix.prependScale(this._scaleX * 0.1 * this.bindScale.x * this.data.overAllScale, this._scaleY * 0.1 * this.bindScale.y * this.data.overAllScale, this._scaleZ * 0.1 * this.bindScale.z * this.data.overAllScale);
        this.timeline.updateMatrix(this.posMatrix, this);
    };
    Display3DParticle.prototype.reset = function () {
        this.timeline.reset();
        this.updateTime(0);
    };
    Display3DParticle.prototype.clearAllAnim = function () {
    };
    Display3DParticle.prototype.update = function () {
        if (this.cantUseEffectsLev) {
            return;
        }
        if (!this.visible) {
            return;
        }
        if (!this.data.materialParam) {
            return;
        }
        Scene_data.context3D.setBlendParticleFactors(this.data._alphaMode);
        Scene_data.context3D.cullFaceBack(this.data.materialParam.material.backCull);
        if (this.data.materialParam) {
            Scene_data.context3D.setProgram(this.data.materialParam.program);
        }
        this.updateMatrix();
        this.setVc();
        this.setVa();
        this.resetVa();
    };
    Display3DParticle.prototype.setVc = function () {
    };
    Display3DParticle.prototype.pushVc = function () {
        Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "vcmat", this.data.vcmatData);
    };
    Display3DParticle.prototype.setVa = function () {
    };
    Display3DParticle.prototype.resetVa = function () {
    };
    Display3DParticle.prototype.setMaterialVc = function () {
        if (!this.data.materialParam) {
            return;
        }
        var dynamicConstList = this.data.materialParam.dynamicConstList;
        var t = this._time % (Scene_data.frameTime * this.data._life);
        ////console.log(this._time);
        for (var i = 0; i < dynamicConstList.length; i++) {
            dynamicConstList[i].update(t);
        }
        if (this.data.materialParam.material.fcNum <= 0) {
            return;
        }
        t = t * this.data.materialParam.material.timeSpeed;
        this.data.materialParam.material.update(t);
        ////console.log("fc5",this.data.materialParam.material.fcData[4]);
        Scene_data.context3D.setVc4fv(this.data.materialParam.shader, "fc", this.data.materialParam.material.fcData);
        // Scene_data.context3D.setVc4fv(this.data.materialParam.shader,"fc",[1,0,0,0,this.data.materialParam.material.fcData[4],0,0,0]); 
        /**
        if (this.data.materialParam.material.hasTime) {
            t = t * this.data.materialParam.material.timeSpeed;

            Scene_data.context3D.setVc4fv(this.data.materialParam.shader, "fc0", [1, 0, 0, t])
        }

        var constVec: Array<ConstItem> = this.data.materialParam.material.constList;
        for (var i:number = 0; i < constVec.length; i++) {
            Scene_data.context3D.setVc4fv(this.data.materialParam.shader, "fc" + constVec[i].id, constVec[i].vecNum);
        }
         */
    };
    Display3DParticle.prototype.setMaterialTexture = function () {
        if (!this.data.materialParam) {
            return;
        }
        var texVec = this.data.materialParam.material.texList;
        for (var i = 0; i < texVec.length; i++) {
            if (texVec[i].isDynamic) {
                continue;
            }
            //_context3D.setTextureAt(texVec[i].id, texVec[i].texture);
            Scene_data.context3D.setRenderTexture(this.data.materialParam.shader, texVec[i].name, texVec[i].texture, texVec[i].id, true);
        }
        var texDynamicVec = this.data.materialParam.dynamicTexList;
        for (var i = 0; i < texDynamicVec.length; i++) {
            // _context3D.setTextureAt(texDynamicVec[i].target.id, texDynamicVec[i].texture);
            Scene_data.context3D.setRenderTexture(this.data.materialParam.shader, texDynamicVec[i].target.name, texDynamicVec[i].texture, texDynamicVec[i].target.id, true);
        }
    };
    Display3DParticle.prototype.inverBind = function () {
        if (!this.invertBindMatrix.isIdentity) {
            //this.bindMatrix.invert();
            this._rotationMatrix.prepend(this.invertBindMatrix);
            //this.bindMatrix.invert();
        }
    };
    Display3DParticle.prototype.resetPos = function () {
    };
    Display3DParticle.prototype.resetMulPos = function (ary) {
    };
    Display3DParticle.prototype.getVector3DByObject = function (obj) {
        if (!obj) {
            return null;
        }
        return new Vector3D(obj.x, obj.y, obj.z, obj.w);
    };
    Display3DParticle.prototype.clone = function () {
        return null;
    };
    Display3DParticle.prototype.setAllByteInfo = function ($byte, version) {
        if (version === void 0) { version = 0; }
        this.creatData();
        this.data.version = version;
        this.data.setAllByteInfo($byte);
        this.timeline = new TimeLine();
        this.timeline.setAllDataInfo(this.data.timelineData);
        this._beginTime = this.timeline.beginTime;
    };
    Display3DParticle.prototype.creatData = function () {
        this.data = new ParticleData;
    };
    Display3DParticle.prototype.setTimeLine = function ($tl) {
        this.timeline = $tl;
        this._beginTime = $tl.beginTime;
    };
    Display3DParticle.prototype.destory = function () {
        this.timeline = null;
        this.bindMatrix = null;
        this.bindVecter3d = null;
        this.bindScale = null;
        this.invertBindMatrix = null;
        this.groupMatrix = null;
        this._rotationMatrix = null;
        this.modelMatrix = null;
        this.groupPos = null;
        this.groupScale = null;
        this.groupRotation = null;
    };
    return Display3DParticle;
}(Object3D));
//# sourceMappingURL=Display3DParticle.js.map