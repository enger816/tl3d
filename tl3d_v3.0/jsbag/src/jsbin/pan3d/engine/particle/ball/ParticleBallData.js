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
    var ParticleBallData = /** @class */ (function (_super) {
        __extends(ParticleBallData, _super);
        function ParticleBallData() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._totalNum = 1;
            _this._acceleration = 0.2;
            _this._toscale = 0.00;
            _this._shootAngly = new Pan3d.Vector3D(1, 0, 0);
            _this._shootSpeed = 0;
            _this._isRandom = false;
            _this._isSendRandom = false;
            _this._isSendAngleRandom = false;
            _this._paticleMaxScale = 1;
            _this._paticleMinScale = 1;
            _this._addforce = new Pan3d.Vector3D(0, 0, 0);
            _this._lixinForce = new Pan3d.Vector3D(0, 0, 0);
            _this._waveform = new Pan3d.Vector3D(0, 0, 0, 0);
            _this._round = new Pan3d.Vector3D();
            _this._is3Dlizi = false;
            _this._speed = 1;
            _this._isLoop = false;
            _this._basePositon = new Pan3d.Vector3D(0, 0, 0);
            _this._baseRandomAngle = 0;
            _this._shapeType = 0;
            _this._playSpeed = 1;
            _this._beginScale = 0;
            return _this;
        }
        ParticleBallData.prototype.getParticle = function () {
            return new Pan3d.Display3DBallPartilce;
        };
        ParticleBallData.prototype.setAllByteInfo = function ($byte) {
            this._totalNum = $byte.readFloat();
            this._acceleration = $byte.readFloat();
            this._toscale = $byte.readFloat();
            this._shootSpeed = $byte.readFloat();
            this._isRandom = $byte.readBoolean();
            this._isSendRandom = $byte.readBoolean();
            this._round.x = $byte.readFloat();
            this._round.y = $byte.readFloat();
            this._round.z = $byte.readFloat();
            this._round.w = $byte.readFloat();
            this._is3Dlizi = $byte.readBoolean();
            this._halfCircle = $byte.readBoolean();
            this._shootAngly.x = $byte.readFloat();
            this._shootAngly.y = $byte.readFloat();
            this._shootAngly.z = $byte.readFloat();
            this._shootAngly.w = $byte.readFloat();
            this._shootAngly.normalize(); //发射锥角，设置为摸范围内 原来没有做处理，新加
            this._speed = $byte.readFloat();
            this._isLoop = $byte.readBoolean();
            this._isSendAngleRandom = $byte.readBoolean();
            this._waveform.x = $byte.readFloat();
            this._waveform.y = $byte.readFloat();
            this._waveform.z = $byte.readFloat();
            this._waveform.w = $byte.readFloat();
            this._closeSurface = $byte.readBoolean();
            this._isEven = $byte.readBoolean();
            this._paticleMaxScale = $byte.readFloat();
            this._paticleMinScale = $byte.readFloat();
            this._basePositon.x = $byte.readFloat();
            this._basePositon.y = $byte.readFloat();
            this._basePositon.z = $byte.readFloat();
            this._basePositon.w = $byte.readFloat();
            this._baseRandomAngle = $byte.readFloat();
            this._shapeType = $byte.readFloat();
            this._lockX = $byte.readBoolean();
            this._lockY = $byte.readBoolean();
            this._addforce.x = $byte.readFloat();
            this._addforce.y = $byte.readFloat();
            this._addforce.z = $byte.readFloat();
            this._addforce.w = $byte.readFloat();
            this._addforce.scaleByW();
            this._lixinForce.x = $byte.readFloat();
            this._lixinForce.y = $byte.readFloat();
            this._lixinForce.z = $byte.readFloat();
            this._lixinForce.w = $byte.readFloat();
            this._islixinAngly = $byte.readBoolean();
            this._particleRandomScale = new Pan3d.Vector3D();
            this._particleRandomScale.x = $byte.readFloat();
            this._particleRandomScale.y = $byte.readFloat();
            this._particleRandomScale.z = $byte.readFloat();
            this._particleRandomScale.w = $byte.readFloat();
            this._playSpeed = $byte.readFloat();
            this.facez = $byte.readBoolean();
            this._beginScale = $byte.readFloat();
            this._widthFixed = $byte.readBoolean();
            this._heightFixed = $byte.readBoolean();
            this.readRandomColor($byte);
            if (this._acceleration != 0 || this._addforce.x != 0 || this._addforce.y != 0 || this._addforce.z != 0) {
                this._needAddSpeed = true;
                this._addSpeedVec = [this._addforce.x, this._addforce.y, this._addforce.z];
            }
            else {
                this._needAddSpeed = false;
            }
            if (this._toscale != 0 || this._waveform.x != 0 || this._waveform.y != 0) {
                this._needScale = true;
                this._scaleVec = [this._toscale, this._waveform.x, this._waveform.y, this._beginScale];
                this._scaleCtrlVec = [this._widthFixed ? 0 : 1, this._heightFixed ? 0 : 1, this._paticleMaxScale - 1, this._paticleMinScale - 1];
            }
            else {
                this._needScale = false;
            }
            _super.prototype.setAllByteInfo.call(this, $byte);
            this._timeVec = [0, this._acceleration, this._life, this._isLoop ? 1 : -1];
            if (this._is3Dlizi) {
                this._wordPosVec = [0, 0, 0];
                this._caramPosVec = [0, 0, 0];
                this._allRotationMatrix = new Pan3d.Matrix3D();
            }
            this.initVcData();
        };
        ParticleBallData.prototype.readRandomColor = function ($byte) {
            var randomColorLen = $byte.readInt();
            var obj = new Object;
            obj.alpha = new Array;
            obj.color = new Array;
            obj.pos = new Array;
            //fs.writeFloat(randomColor.alpha[i])
            //fs.writeFloat(randomColor.color[i])
            //fs.writeFloat(randomColor.pos[i])
            for (var i = 0; i < randomColorLen; i++) {
                obj.alpha.push($byte.readFloat());
                obj.color.push($byte.readFloat());
                obj.pos.push($byte.readFloat());
            }
            this._textureRandomColorInfo = obj;
        };
        Object.defineProperty(ParticleBallData.prototype, "objBallData", {
            get: function () {
                return (this.objData);
            },
            enumerable: true,
            configurable: true
        });
        ParticleBallData.prototype.uploadGpu = function () {
            this.objData = new Pan3d.ParticleBallGpuData();
            this.initBaseData();
            this.initBasePos();
            this.initSpeed();
            this.initSelfRotaion();
            if (this._needRandomColor) {
                this.initBaseColor();
            }
            this.pushToGpu();
        };
        ParticleBallData.prototype.initBaseData = function () {
            var verterList = new Array;
            var uvAry = new Array;
            var indexs = new Array;
            for (var i = 0; i < this._totalNum; i++) {
                this.makeRectangleData(verterList, uvAry, this._width, this._height, this._originWidthScale, this._originHeightScale, this._isUV, this._isU, this._isV, this._animLine, this._animRow, i);
                indexs.push(0 + i * 4, 1 + i * 4, 2 + i * 4, 0 + i * 4, 2 + i * 4, 3 + i * 4);
            }
            this.objBallData.vertices = verterList;
            this.objBallData.uvs = uvAry;
            this.objBallData.indexs = indexs;
        };
        ParticleBallData.prototype.makeRectangleData = function (verterList, uvAry, width, height, offsetX, offsetY, isUV, isU, isV, animLine, animRow, indexID) {
            if (offsetX === void 0) { offsetX = 0.5; }
            if (offsetY === void 0) { offsetY = 0.5; }
            if (isUV === void 0) { isUV = false; }
            if (isU === void 0) { isU = false; }
            if (isV === void 0) { isV = false; }
            if (animLine === void 0) { animLine = 1; }
            if (animRow === void 0) { animRow = 1; }
            if (indexID === void 0) { indexID = 0; }
            var ranScale = Math.random() * (this._particleRandomScale.x - this._particleRandomScale.y) + this._particleRandomScale.y;
            verterList.push((-offsetX * width) * ranScale, (height - offsetY * height) * ranScale, 0);
            verterList.push((width - offsetX * width) * ranScale, (height - offsetY * height) * ranScale, 0);
            verterList.push((width - offsetX * width) * ranScale, (-offsetY * height) * ranScale, 0);
            verterList.push((-offsetX * width) * ranScale, (-offsetY * height) * ranScale, 0);
            var ary = new Array;
            ary.push(new Pan3d.Vector2D(0, 0));
            ary.push(new Pan3d.Vector2D(0, 1 / animRow));
            ary.push(new Pan3d.Vector2D(1 / animLine, 1 / animRow));
            ary.push(new Pan3d.Vector2D(1 / animLine, 0));
            if (isU) {
                for (var i = 0; i < ary.length; i++) {
                    ary[i].x = -ary[i].x;
                }
            }
            if (isV) {
                for (var i = 0; i < ary.length; i++) {
                    ary[i].y = -ary[i].y;
                }
            }
            if (isUV) {
                ary.push(ary.shift());
            }
            for (var i = 0; i < ary.length; i++) {
                uvAry.push(ary[i].x, ary[i].y, indexID);
            }
        };
        ParticleBallData.prototype.initBasePos = function () {
            var basePos = new Array;
            for (var i = 0; i < this._totalNum; i++) {
                var v3d;
                var ma;
                if (this._isRandom) {
                    var roundv3d = new Pan3d.Vector3D(this._round.x * this._round.w, this._round.y * this._round.w, this._round.z * this._round.w);
                    if (this._isEven) { //圆柱
                        if (this._closeSurface) { //紧贴表面
                            v3d = new Pan3d.Vector3D(0, 0, roundv3d.z);
                            ma = new Pan3d.Matrix3D;
                            ma.appendRotation(Math.random() * 360, Pan3d.Vector3D.Y_AXIS);
                            v3d = ma.transformVector(v3d);
                            v3d.y = roundv3d.y * Math.random() * 2 - roundv3d.y;
                        }
                        else {
                            v3d = new Pan3d.Vector3D(0, 0, roundv3d.z * Math.random() * 2 - roundv3d.z);
                            ma = new Pan3d.Matrix3D;
                            ma.appendRotation(Math.random() * 360, Pan3d.Vector3D.Y_AXIS);
                            v3d = ma.transformVector(v3d);
                            v3d.y = roundv3d.y * Math.random() * 2 - roundv3d.y;
                        }
                    }
                    else { //圆球
                        if (this._closeSurface) { //只有xyz相等时候才能紧贴表面
                            v3d = new Pan3d.Vector3D(0, 0, roundv3d.z);
                            ma = new Pan3d.Matrix3D;
                            if (this._halfCircle) {
                                ma.appendRotation(-Math.random() * 180, Pan3d.Vector3D.X_AXIS);
                            }
                            else {
                                ma.appendRotation(Math.random() * 360, Pan3d.Vector3D.X_AXIS);
                            }
                            ma.appendRotation(Math.random() * 360, Pan3d.Vector3D.Y_AXIS);
                            v3d = ma.transformVector(v3d);
                        }
                        else {
                            if (this._halfCircle) {
                                v3d = new Pan3d.Vector3D(roundv3d.x * Math.random() * 2 - roundv3d.x, roundv3d.y * Math.random(), roundv3d.z * Math.random() * 2 - roundv3d.z);
                            }
                            else {
                                v3d = new Pan3d.Vector3D(roundv3d.x * Math.random() * 2 - roundv3d.x, roundv3d.y * Math.random() * 2 - roundv3d.y, roundv3d.z * Math.random() * 2 - roundv3d.z);
                            }
                        }
                    }
                }
                else {
                    v3d = new Pan3d.Vector3D();
                }
                v3d = v3d.add(this._basePositon);
                for (var j = 0; j < 4; j++) {
                    basePos.push(v3d.x, v3d.y, v3d.z, i * this._shootSpeed);
                }
            }
            this.objBallData.basePos = basePos;
        };
        ParticleBallData.prototype.initSpeed = function () {
            var beMove = new Array;
            for (var i = 0; i < this._totalNum; i++) {
                var resultv3d = new Pan3d.Vector3D;
                var v3d = new Pan3d.Vector3D;
                // if(this._shootAngly.z == -1){
                //     //console.log(this._shootAngly.z);
                // }
                if (this._shootAngly.x != 0 || this._shootAngly.y != 0 || this._shootAngly.z != 0) { //锥形速度
                    var r = Math.tan(this._shootAngly.w * Math.PI / 180 * Math.random());
                    var a = 360 * Math.PI / 180 * Math.random();
                    v3d = new Pan3d.Vector3D(Math.sin(a) * r, Math.cos(a) * r, 1);
                    var ma = new Pan3d.Matrix3D(); //moveMatrix3D();
                    ma.fromVtoV(new Pan3d.Vector3D(0, 0.0101, 0.99994), new Pan3d.Vector3D(this._shootAngly.x, this._shootAngly.y, this._shootAngly.z));
                    v3d = ma.transformVector(v3d);
                    if (isNaN(v3d.x)) {
                        throw new Error("发射锥角，可能有问题，确定是否有取膜");
                    }
                    v3d.normalize();
                    resultv3d = resultv3d.add(v3d);
                }
                if (this._lixinForce.x != 0 || this._lixinForce.y != 0 || this._lixinForce.z != 0) {
                    v3d = new Pan3d.Vector3D(Math.random() > 0.5 ? -this._lixinForce.x : this._lixinForce.x, Math.random() > 0.5 ? -this._lixinForce.y : this._lixinForce.y, Math.random() > 0.5 ? -this._lixinForce.z : this._lixinForce.z);
                    v3d.normalize();
                    resultv3d = resultv3d.add(v3d);
                }
                if (this._islixinAngly) {
                    if (this._isEven) {
                        v3d = new Pan3d.Vector3D(this.objBallData.basePos[i * 16], 0, this.objBallData.basePos[i * 16 + 2]);
                    }
                    else {
                        v3d = new Pan3d.Vector3D(this.objBallData.basePos[i * 16], this.objBallData.basePos[i * 16 + 1], this.objBallData.basePos[i * 16 + 2]);
                    }
                    v3d.normalize();
                    resultv3d = resultv3d.add(v3d);
                }
                resultv3d.normalize();
                if (this._isSendRandom) {
                    resultv3d.scaleBy(this._speed * Math.random());
                }
                else {
                    resultv3d.scaleBy(this._speed);
                }
                var ranAngle = this._baseRandomAngle * Math.random() * Math.PI / 180;
                for (var j = 0; j < 4; j++) {
                    beMove.push(resultv3d.x, resultv3d.y, resultv3d.z);
                }
            }
            this.objBallData.beMove = beMove;
        };
        ParticleBallData.prototype.initSelfRotaion = function () {
            var _baseRotationAngle = 0;
            var _baseRotationSpeed = 0;
            if (this._ziZhuanAngly.x == 0 && this._ziZhuanAngly.y == 0 && this._ziZhuanAngly.z == 0 && this._ziZhuanAngly.w == 0) {
                this._needSelfRotation = false;
                return;
            }
            if (this._is3Dlizi) {
                this._needSelfRotation = false;
                return;
            }
            this._needSelfRotation = true;
            var vecs = new Array;
            var flag = 0;
            while (flag < this._totalNum) {
                _baseRotationAngle = this._ziZhuanAngly.x;
                if (this._ziZhuanAngly.y == 1) {
                    _baseRotationAngle = _baseRotationAngle * Math.random();
                }
                _baseRotationSpeed = this._ziZhuanAngly.z;
                if (this._ziZhuanAngly.w == 1) {
                    _baseRotationSpeed = _baseRotationSpeed * Math.random();
                }
                else if (this._ziZhuanAngly.w == -1) {
                    _baseRotationSpeed = _baseRotationSpeed * (Math.random() * 2 - 1);
                }
                vecs.push(_baseRotationAngle, _baseRotationSpeed);
                vecs.push(_baseRotationAngle, _baseRotationSpeed);
                vecs.push(_baseRotationAngle, _baseRotationSpeed);
                vecs.push(_baseRotationAngle, _baseRotationSpeed);
                flag++;
            }
            this.objBallData.baseRotation = vecs;
        };
        ParticleBallData.prototype.initBaseColor = function () {
            var imgData = Pan3d.ColorTransition.getInstance().getImageData(this._textureRandomColorInfo);
            var colorNum = imgData.data;
            var colors = new Array;
            for (var i = 0; i < this._totalNum; i++) {
                var index = float2int(128 * Math.random()) * 4;
                var ranColor = new Pan3d.Vector3D(colorNum[index], colorNum[index + 1], colorNum[index + 2], colorNum[index + 3]);
                ranColor.scaleBy(1 / 0xff);
                colors.push(ranColor.x, ranColor.y, ranColor.z, ranColor.w);
                colors.push(ranColor.x, ranColor.y, ranColor.z, ranColor.w);
                colors.push(ranColor.x, ranColor.y, ranColor.z, ranColor.w);
                colors.push(ranColor.x, ranColor.y, ranColor.z, ranColor.w);
            }
            this.objBallData.randomColor = colors;
        };
        ParticleBallData.prototype.pushToGpu = function () {
            this.compressVertex();
            /**
            this.objBallData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objBallData.vertices);//3
    
            this.objBallData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objBallData.uvs);//3
    
            this.objBallData.basePosBuffer = Scene_data.context3D.uploadBuff3D(this.objBallData.basePos);//4
    
            this.objBallData.beMoveBuffer = Scene_data.context3D.uploadBuff3D(this.objBallData.beMove);//3
    
            this.objBallData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objBallData.indexs);
    
            this.objBallData.treNum = this.objBallData.indexs.length;
    
            if (this._needSelfRotation) {
                this.objBallData.baseRotationBuffer = Scene_data.context3D.uploadBuff3D(this.objBallData.baseRotation);//2
            }
    
            if (this._needRandomColor) {
                this.objBallData.randomColorBuffer = Scene_data.context3D.uploadBuff3D(this.objBallData.randomColor);//4
            }
             */
        };
        ParticleBallData.prototype.compressVertex = function () {
            var size = this.objBallData.vertices.length / 3;
            var itemSize = 13;
            if (this._needSelfRotation) {
                itemSize += 2;
            }
            if (this._needRandomColor) {
                this.objBallData.randomOffset = itemSize * 4;
                itemSize += 4;
            }
            this.objBallData.stride = itemSize * 4;
            var ary = new Array;
            for (var i = 0; i < size; i++) {
                for (var j = 0; j < 3; j++) {
                    ary.push(this.objBallData.vertices[i * 3 + j]);
                }
                for (var j = 0; j < 3; j++) {
                    ary.push(this.objBallData.uvs[i * 3 + j]);
                }
                for (var j = 0; j < 4; j++) {
                    ary.push(this.objBallData.basePos[i * 4 + j]);
                }
                for (var j = 0; j < 3; j++) {
                    ary.push(this.objBallData.beMove[i * 3 + j]);
                }
                if (this._needSelfRotation) {
                    for (var j = 0; j < 2; j++) {
                        ary.push(this.objBallData.baseRotation[i * 2 + j]);
                    }
                }
                if (this._needRandomColor) {
                    for (var j = 0; j < 4; j++) {
                        ary.push(this.objBallData.randomColor[i * 4 + j]);
                    }
                }
            }
            this.objBallData.vertexBuffer = Pan3d.Scene_data.context3D.uploadBuff3D(ary);
            this.objBallData.indexBuffer = Pan3d.Scene_data.context3D.uploadIndexBuff3D(this.objBallData.indexs);
            this.objBallData.treNum = this.objBallData.indexs.length;
            ////console.log(ary.length);
        };
        ParticleBallData.prototype.setFloat32Vec = function (key, ary) {
            var idxary = Pan3d.Display3DBallShader.shader_vec4[key];
            var idx = idxary[0] * 16 + idxary[1] * 4;
            //var idx:number = idxary[0] * 4;
            this.vcmatData.set(ary, idx);
        };
        ParticleBallData.prototype.setFloat32Mat = function (key, ary) {
            var idx = Pan3d.Display3DBallShader.shader_mat4[key] * 16;
            this.vcmatData.set(ary, idx);
        };
        ParticleBallData.prototype.initVcData = function () {
            this.vcmatData = new Float32Array(Pan3d.Display3DBallShader.getVcSize() * 16);
            this.setFloat32Vec("time", this._timeVec);
            if (this._needAddSpeed) {
                //Scene_data.context3D.setVc3fv(this.data.materialParam.shader, "force", this.balldata._addSpeedVec);
                this.setFloat32Vec("force", this._addSpeedVec);
            }
            if (this._needScale) {
                //Scene_data.context3D.setVc4fv(this.data.materialParam.shader, "scale", this.balldata._scaleVec);
                //Scene_data.context3D.setVc4fv(this.data.materialParam.shader, "scaleCtrl", this.balldata._scaleCtrlVec);
                this.setFloat32Vec("scale", this._scaleVec);
                this.setFloat32Vec("scaleCtrl", this._scaleCtrlVec);
            }
            if (this._uvType == 1) {
                //Scene_data.context3D.setVc3fv(this.data.materialParam.shader, "animCtrl", this.balldata._animCtrlVec);
                this.setFloat32Vec("animCtrl", this._animCtrlVec);
            }
            else if (this._uvType == 2) {
                //Scene_data.context3D.setVc2fv(this.data.materialParam.shader, "uvCtrl", this.balldata._uvCtrlVec);
                this.setFloat32Vec("uvCtrl", this._uvCtrlVec);
            }
        };
        ParticleBallData.prototype.regShader = function () {
            if (!this.materialParam) {
                return;
            }
            var shaderParameAry = this.getShaderParam();
            //var shader: Display3DBallShader = new Display3DBallShader()
            this.materialParam.shader = Pan3d.ProgrmaManager.getInstance().getMaterialProgram(Pan3d.Display3DBallShader.Display3D_Ball_Shader, Pan3d.Display3DBallShader, this.materialParam.material, shaderParameAry);
            this.materialParam.program = this.materialParam.shader.program;
        };
        ParticleBallData.prototype.getShaderParam = function () {
            if (this._animRow != 1 || this._animLine != 1) {
                this._uvType = 1;
                this._animCtrlVec = [this._animLine, this._animRow, this._animInterval];
            }
            else if (this._uSpeed != 0 || this._vSpeed != 0) {
                this._uvType = 2;
                this._uvCtrlVec = [this._uSpeed, this._vSpeed];
            }
            else {
                this._uvType = 0;
            }
            var hasParticleColor = this.materialParam.material.hasParticleColor;
            this._needRandomColor = this.materialParam.material.hasVertexColor;
            this.uploadGpu(); //椭球粒子需要判断是否包含随机色来确定va结构
            var shaderParameAry;
            var hasParticle;
            if (hasParticleColor) {
                hasParticle = 1;
            }
            else {
                hasParticle = 0;
            }
            var hasRandomClolr = this._needRandomColor ? 1 : 0;
            var isMul = this._is3Dlizi ? 1 : 0;
            var needRotation = this._needSelfRotation ? 1 : 0;
            var needScale = this._needScale ? 1 : 0;
            var needAddSpeed = this._needAddSpeed ? 1 : 0;
            shaderParameAry = [hasParticle, hasRandomClolr, isMul, needRotation, needScale, needAddSpeed, this._uvType];
            return shaderParameAry;
        };
        return ParticleBallData;
    }(Pan3d.ParticleData));
    Pan3d.ParticleBallData = ParticleBallData;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ParticleBallData.js.map