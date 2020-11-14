module Pan3d {
    export class ParticleBallData extends ParticleData {

        public _totalNum: number = 1;
        public _acceleration: number = 0.2;
        public _toscale: number = 0.00;
        public _shootAngly: Vector3D = new Vector3D(1, 0, 0);
        public _shootSpeed: number = 0;
        public _isRandom: boolean = false;
        public _isSendRandom: boolean = false;
        public _isSendAngleRandom: boolean = false;
        public _paticleMaxScale: number = 1;
        public _paticleMinScale: number = 1;
        public _addforce: Vector3D = new Vector3D(0, 0, 0);
        public _lixinForce: Vector3D = new Vector3D(0, 0, 0);
        public _waveform: Vector3D = new Vector3D(0, 0, 0, 0);
        public _round: Vector3D = new Vector3D();
        public _is3Dlizi: boolean = false;
        public _speed: number = 1;
        public _isLoop: boolean = false;
        public _closeSurface: boolean;
        public _halfCircle: boolean;
        public _isEven: boolean;
        public _basePositon: Vector3D = new Vector3D(0, 0, 0);
        public _baseRandomAngle: number = 0;
        public _shapeType: number = 0;
        public _lockX: boolean;
        public _lockY: boolean;

        public _textureRandomColorInfo: any;
        public _islixinAngly: boolean;
        public _particleRandomScale: Vector3D;
        public _playSpeed: number = 1;
        public _beginScale: number = 0;
        public facez: Boolean;

        public _needSelfRotation: boolean;

        public _needRandomColor: boolean;

        public _needScale: boolean;

        public _needAddSpeed: boolean;

        public _uvType: number;

        public _timeVec: Array<number>;
        public _addSpeedVec: Array<number>;
        public _wordPosVec: Array<number>;
        public _caramPosVec: Array<number>;

        public _scaleVec: Array<number>;
        public _scaleCtrlVec: Array<number>;

        public _animCtrlVec: Array<number>;
        public _uvCtrlVec: Array<number>;

        public _allRotationMatrix: Matrix3D;

        public getParticle(): Display3DParticle {
            return new Display3DBallPartilce;
        }

        public setAllByteInfo($byte: Pan3dByteArray): void {



            this._totalNum = $byte.readFloat()
            this._acceleration = $byte.readFloat()
            this._toscale = $byte.readFloat()
            this._shootSpeed = $byte.readFloat()
            this._isRandom = $byte.readBoolean()
            this._isSendRandom = $byte.readBoolean()
            this._round.x = $byte.readFloat()
            this._round.y = $byte.readFloat()
            this._round.z = $byte.readFloat()
            this._round.w = $byte.readFloat()

            this._is3Dlizi = $byte.readBoolean()
            this._halfCircle = $byte.readBoolean()
            this._shootAngly.x = $byte.readFloat()
            this._shootAngly.y = $byte.readFloat()
            this._shootAngly.z = $byte.readFloat()
            this._shootAngly.w = $byte.readFloat()

            this._shootAngly.normalize();//发射锥角，设置为摸范围内 原来没有做处理，新加

            this._speed = $byte.readFloat()

            this._isLoop = $byte.readBoolean()

            this._isSendAngleRandom = $byte.readBoolean()


            this._waveform.x = $byte.readFloat()
            this._waveform.y = $byte.readFloat()
            this._waveform.z = $byte.readFloat()
            this._waveform.w = $byte.readFloat()


            this._closeSurface = $byte.readBoolean()
            this._isEven = $byte.readBoolean()
            this._paticleMaxScale = $byte.readFloat()
            this._paticleMinScale = $byte.readFloat()
            this._basePositon.x = $byte.readFloat()
            this._basePositon.y = $byte.readFloat()
            this._basePositon.z = $byte.readFloat()
            this._basePositon.w = $byte.readFloat()

            this._baseRandomAngle = $byte.readFloat()
            this._shapeType = $byte.readFloat()

            this._lockX = $byte.readBoolean()
            this._lockY = $byte.readBoolean()


            this._addforce.x = $byte.readFloat()
            this._addforce.y = $byte.readFloat()
            this._addforce.z = $byte.readFloat()
            this._addforce.w = $byte.readFloat()
            this._addforce.scaleByW();

            this._lixinForce.x = $byte.readFloat()
            this._lixinForce.y = $byte.readFloat()
            this._lixinForce.z = $byte.readFloat()
            this._lixinForce.w = $byte.readFloat()


            this._islixinAngly = $byte.readBoolean()

            this._particleRandomScale = new Vector3D();
            this._particleRandomScale.x = $byte.readFloat()
            this._particleRandomScale.y = $byte.readFloat()
            this._particleRandomScale.z = $byte.readFloat()
            this._particleRandomScale.w = $byte.readFloat()

            this._playSpeed = $byte.readFloat()
            this.facez = $byte.readBoolean()
            this._beginScale = $byte.readFloat()

            this._widthFixed = $byte.readBoolean()
            this._heightFixed = $byte.readBoolean()

            this.readRandomColor($byte)


            if (this._acceleration != 0 || this._addforce.x != 0 || this._addforce.y != 0 || this._addforce.z != 0) {
                this._needAddSpeed = true;
                this._addSpeedVec = [this._addforce.x, this._addforce.y, this._addforce.z];
            } else {
                this._needAddSpeed = false;
            }


            if (this._toscale != 0 || this._waveform.x != 0 || this._waveform.y != 0) {
                this._needScale = true;
                this._scaleVec = [this._toscale, this._waveform.x, this._waveform.y, this._beginScale];

                this._scaleCtrlVec = [this._widthFixed ? 0 : 1, this._heightFixed ? 0 : 1, this._paticleMaxScale - 1, this._paticleMinScale - 1];
            } else {
                this._needScale = false;
            }


            super.setAllByteInfo($byte);

            this._timeVec = [0, this._acceleration, this._life, this._isLoop ? 1 : -1];

            if (this._is3Dlizi) {
                this._wordPosVec = [0, 0, 0];
                this._caramPosVec = [0, 0, 0];

                this._allRotationMatrix = new Matrix3D();
            }

            this.initVcData();
        }


        private readRandomColor($byte: Pan3dByteArray): void {
            var randomColorLen: number = $byte.readInt();
            var obj: any = new Object;
            obj.alpha = new Array;
            obj.color = new Array;
            obj.pos = new Array;
            //fs.writeFloat(randomColor.alpha[i])
            //fs.writeFloat(randomColor.color[i])
            //fs.writeFloat(randomColor.pos[i])

            for (var i: number = 0; i < randomColorLen; i++) {
                obj.alpha.push($byte.readFloat())
                obj.color.push($byte.readFloat())
                obj.pos.push($byte.readFloat())
            }
            this._textureRandomColorInfo = obj;
        }

        public get objBallData(): ParticleBallGpuData {
            return <ParticleBallGpuData>(this.objData);
        }

        public uploadGpu(): void {
            this.objData = new ParticleBallGpuData();

            this.initBaseData();
            this.initBasePos();
            this.initSpeed();
            this.initSelfRotaion();

            if (this._needRandomColor) {
                this.initBaseColor();
            }
            this.pushToGpu();
        }

        private initBaseData(): void {
            var verterList: Array<number> = new Array;
            var uvAry: Array<number> = new Array;
            var indexs: Array<number> = new Array;
            for (var i: number = 0; i < this._totalNum; i++) {
                this.makeRectangleData(verterList, uvAry, this._width, this._height, this._originWidthScale, this._originHeightScale, this._isUV, this._isU, this._isV, this._animLine, this._animRow, i);
                indexs.push(0 + i * 4, 1 + i * 4, 2 + i * 4, 0 + i * 4, 2 + i * 4, 3 + i * 4);
            }
            this.objBallData.vertices = verterList;
            this.objBallData.uvs = uvAry;
            this.objBallData.indexs = indexs;
        }

        public makeRectangleData(verterList: Array<number>, uvAry: Array<number>, width: number, height: number, offsetX: number = 0.5, offsetY: number = 0.5,
            isUV: boolean = false, isU: boolean = false, isV: boolean = false,
            animLine: number = 1, animRow: number = 1, indexID: number = 0): void {

            var ranScale: number = Math.random() * (this._particleRandomScale.x - this._particleRandomScale.y) + this._particleRandomScale.y;

            verterList.push((-offsetX * width) * ranScale, (height - offsetY * height) * ranScale, 0);
            verterList.push((width - offsetX * width) * ranScale, (height - offsetY * height) * ranScale, 0);
            verterList.push((width - offsetX * width) * ranScale, (-offsetY * height) * ranScale, 0);
            verterList.push((-offsetX * width) * ranScale, (-offsetY * height) * ranScale, 0);

            var ary: Array<Vector2D> = new Array;
            ary.push(new Vector2D(0, 0));
            ary.push(new Vector2D(0, 1 / animRow));
            ary.push(new Vector2D(1 / animLine, 1 / animRow));
            ary.push(new Vector2D(1 / animLine, 0));

            if (isU) {
                for (var i: number = 0; i < ary.length; i++) {
                    ary[i].x = - ary[i].x;
                }
            }

            if (isV) {
                for (var i: number = 0; i < ary.length; i++) {
                    ary[i].y = - ary[i].y;
                }
            }

            if (isUV) {
                ary.push(ary.shift());
            }

            for (var i: number = 0; i < ary.length; i++) {
                uvAry.push(ary[i].x, ary[i].y, indexID);
            }

        }

        public initBasePos(): void {
            var basePos: Array<number> = new Array;

            for (var i: number = 0; i < this._totalNum; i++) {
                var v3d: Vector3D;
                var ma: Matrix3D;
                if (this._isRandom) {
                    var roundv3d: Vector3D = new Vector3D(this._round.x * this._round.w, this._round.y * this._round.w, this._round.z * this._round.w);
                    if (this._isEven) {//圆柱
                        if (this._closeSurface) {//紧贴表面
                            v3d = new Vector3D(0, 0, roundv3d.z);
                            ma = new Matrix3D;
                            ma.appendRotation(Math.random() * 360, Vector3D.Y_AXIS);
                            v3d = ma.transformVector(v3d);
                            v3d.y = roundv3d.y * Math.random() * 2 - roundv3d.y;
                        } else {
                            v3d = new Vector3D(0, 0, roundv3d.z * Math.random() * 2 - roundv3d.z);
                            ma = new Matrix3D;
                            ma.appendRotation(Math.random() * 360, Vector3D.Y_AXIS);
                            v3d = ma.transformVector(v3d);
                            v3d.y = roundv3d.y * Math.random() * 2 - roundv3d.y;
                        }

                    } else {//圆球
                        if (this._closeSurface) {//只有xyz相等时候才能紧贴表面
                            v3d = new Vector3D(0, 0, roundv3d.z);
                            ma = new Matrix3D;

                            if (this._halfCircle) {
                                ma.appendRotation(- Math.random() * 180, Vector3D.X_AXIS);
                            } else {
                                ma.appendRotation(Math.random() * 360, Vector3D.X_AXIS);
                            }

                            ma.appendRotation(Math.random() * 360, Vector3D.Y_AXIS);
                            v3d = ma.transformVector(v3d);
                        } else {
                            if (this._halfCircle) {
                                v3d = new Vector3D(roundv3d.x * Math.random() * 2 - roundv3d.x, roundv3d.y * Math.random(), roundv3d.z * Math.random() * 2 - roundv3d.z);
                            } else {
                                v3d = new Vector3D(roundv3d.x * Math.random() * 2 - roundv3d.x, roundv3d.y * Math.random() * 2 - roundv3d.y, roundv3d.z * Math.random() * 2 - roundv3d.z);
                            }

                        }
                    }


                } else {
                    v3d = new Vector3D();
                }

                v3d = v3d.add(this._basePositon);

                for (var j: number = 0; j < 4; j++) {
                    basePos.push(v3d.x, v3d.y, v3d.z, i * this._shootSpeed);
                }
            }

            this.objBallData.basePos = basePos;
        }

        public initSpeed(): void {
            var beMove: Array<number> = new Array;

            for (var i: number = 0; i < this._totalNum; i++) {

                var resultv3d: Vector3D = new Vector3D;
                var v3d: Vector3D = new Vector3D;
                // if(this._shootAngly.z == -1){
                //     //console.log(this._shootAngly.z);
                // }
                if (this._shootAngly.x != 0 || this._shootAngly.y != 0 || this._shootAngly.z != 0) {//锥形速度
                    var r: number = Math.tan(this._shootAngly.w * Math.PI / 180 * Math.random());
                    var a: number = 360 * Math.PI / 180 * Math.random();
                    v3d = new Vector3D(Math.sin(a) * r, Math.cos(a) * r, 1);
                    var ma: Matrix3D = new Matrix3D();//moveMatrix3D();
                    ma.fromVtoV(new Vector3D(0, 0.0101, 0.99994), new Vector3D(this._shootAngly.x, this._shootAngly.y, this._shootAngly.z));
                    v3d = ma.transformVector(v3d);
                    if (isNaN(v3d.x)) {
                        throw new Error("发射锥角，可能有问题，确定是否有取膜");
                    }
                    v3d.normalize();
                    resultv3d = resultv3d.add(v3d);
                }

                if (this._lixinForce.x != 0 || this._lixinForce.y != 0 || this._lixinForce.z != 0) {
                    v3d = new Vector3D(Math.random() > 0.5 ? -this._lixinForce.x : this._lixinForce.x, Math.random() > 0.5 ? -this._lixinForce.y : this._lixinForce.y, Math.random() > 0.5 ? -this._lixinForce.z : this._lixinForce.z);
                    v3d.normalize();
                    resultv3d = resultv3d.add(v3d);
                }

                if (this._islixinAngly) {
                    if (this._isEven) {
                        v3d = new Vector3D(this.objBallData.basePos[i * 16], 0, this.objBallData.basePos[i * 16 + 2]);
                    } else {
                        v3d = new Vector3D(this.objBallData.basePos[i * 16], this.objBallData.basePos[i * 16 + 1], this.objBallData.basePos[i * 16 + 2]);
                    }

                    v3d.normalize();
                    resultv3d = resultv3d.add(v3d);
                }

                resultv3d.normalize();


                if (this._isSendRandom) {
                    resultv3d.scaleBy(this._speed * Math.random());
                } else {
                    resultv3d.scaleBy(this._speed);
                }

                var ranAngle: number = this._baseRandomAngle * Math.random() * Math.PI / 180;

                for (var j: number = 0; j < 4; j++) {
                    beMove.push(resultv3d.x, resultv3d.y, resultv3d.z);
                }

            }

            this.objBallData.beMove = beMove;
        }

        public initSelfRotaion(): void {
            var _baseRotationAngle: number = 0;
            var _baseRotationSpeed: number = 0;
            if (this._ziZhuanAngly.x == 0 && this._ziZhuanAngly.y == 0 && this._ziZhuanAngly.z == 0 && this._ziZhuanAngly.w == 0) {
                this._needSelfRotation = false;
                return;
            }
            if (this._is3Dlizi) {
                this._needSelfRotation = false;
                return;
            }

            this._needSelfRotation = true;
            var vecs: Array<number> = new Array;
            var flag: number = 0;
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
        }

        public initBaseColor(): void {

            var imgData: ImageData = ColorTransition.getInstance().getImageData(this._textureRandomColorInfo);

            var colorNum: any = imgData.data;


            var colors: Array<number> = new Array;
            for (var i: number = 0; i < this._totalNum; i++) {
                var index: number = float2int(128 * Math.random()) * 4;
                var ranColor: Vector3D = new Vector3D(colorNum[index], colorNum[index + 1], colorNum[index + 2], colorNum[index + 3]);
                ranColor.scaleBy(1 / 0xff);
                colors.push(ranColor.x, ranColor.y, ranColor.z, ranColor.w);
                colors.push(ranColor.x, ranColor.y, ranColor.z, ranColor.w);
                colors.push(ranColor.x, ranColor.y, ranColor.z, ranColor.w);
                colors.push(ranColor.x, ranColor.y, ranColor.z, ranColor.w);
            }

            this.objBallData.randomColor = colors;


        }

        protected pushToGpu(): void {

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
        }
        private compressVertex(): void {
            var size: number = this.objBallData.vertices.length / 3;
            var itemSize: number = 13;
            if (this._needSelfRotation) {
                itemSize += 2;
            }
            if (this._needRandomColor) {
                this.objBallData.randomOffset = itemSize * 4;
                itemSize += 4;
            }

            this.objBallData.stride = itemSize * 4;

            var ary: Array<number> = new Array;

            for (var i: number = 0; i < size; i++) {
                for (var j: number = 0; j < 3; j++) {
                    ary.push(this.objBallData.vertices[i * 3 + j]);
                }

                for (var j: number = 0; j < 3; j++) {
                    ary.push(this.objBallData.uvs[i * 3 + j]);
                }

                for (var j: number = 0; j < 4; j++) {
                    ary.push(this.objBallData.basePos[i * 4 + j]);
                }

                for (var j: number = 0; j < 3; j++) {
                    ary.push(this.objBallData.beMove[i * 3 + j]);
                }

                if (this._needSelfRotation) {
                    for (var j: number = 0; j < 2; j++) {
                        ary.push(this.objBallData.baseRotation[i * 2 + j]);
                    }
                }

                if (this._needRandomColor) {
                    for (var j: number = 0; j < 4; j++) {
                        ary.push(this.objBallData.randomColor[i * 4 + j]);
                    }
                }

            }

            this.objBallData.vertexBuffer = Scene_data.context3D.uploadBuff3D(ary);
            this.objBallData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objBallData.indexs);
            this.objBallData.treNum = this.objBallData.indexs.length;
            ////console.log(ary.length);

        }

        public setFloat32Vec(key: string, ary: Array<number>): void {
            var idxary: Array<number> = Display3DBallShader.shader_vec4[key];
            var idx: number = idxary[0] * 16 + idxary[1] * 4;
            //var idx:number = idxary[0] * 4;
            this.vcmatData.set(ary, idx);
        }
        public setFloat32Mat(key: string, ary: Float32Array): void {
            var idx: number = Display3DBallShader.shader_mat4[key] * 16;
            this.vcmatData.set(ary, idx);
        }

        public initVcData(): void {
            this.vcmatData = new Float32Array(Display3DBallShader.getVcSize() * 16);

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
            } else if (this._uvType == 2) {
                //Scene_data.context3D.setVc2fv(this.data.materialParam.shader, "uvCtrl", this.balldata._uvCtrlVec);
                this.setFloat32Vec("uvCtrl", this._uvCtrlVec);
            }
        }

        public regShader(): void {
            if (!this.materialParam) {
                return;
            }

            var shaderParameAry: Array<number> = this.getShaderParam();
            //var shader: Display3DBallShader = new Display3DBallShader()

            this.materialParam.shader = ProgrmaManager.getInstance().getMaterialProgram(Display3DBallShader.Display3D_Ball_Shader,
                Display3DBallShader, this.materialParam.material, shaderParameAry);
            this.materialParam.program = this.materialParam.shader.program;
        }

        public getShaderParam(): Array<number> {
            if (this._animRow != 1 || this._animLine != 1) {
                this._uvType = 1;
                this._animCtrlVec = [this._animLine, this._animRow, this._animInterval];
            } else if (this._uSpeed != 0 || this._vSpeed != 0) {
                this._uvType = 2;
                this._uvCtrlVec = [this._uSpeed, this._vSpeed];
            } else {
                this._uvType = 0;
            }

            var hasParticleColor: boolean = this.materialParam.material.hasParticleColor;
            this._needRandomColor = this.materialParam.material.hasVertexColor;

            this.uploadGpu();//椭球粒子需要判断是否包含随机色来确定va结构

            var shaderParameAry: Array<number>;

            var hasParticle: number;
            if (hasParticleColor) {
                hasParticle = 1;
            } else {
                hasParticle = 0;
            }

            var hasRandomClolr: number = this._needRandomColor ? 1 : 0;

            var isMul: number = this._is3Dlizi ? 1 : 0;

            var needRotation: number = this._needSelfRotation ? 1 : 0;

            var needScale: number = this._needScale ? 1 : 0;

            var needAddSpeed: number = this._needAddSpeed ? 1 : 0;

            shaderParameAry = [hasParticle, hasRandomClolr, isMul, needRotation, needScale, needAddSpeed, this._uvType];

            return shaderParameAry;
        }





    }
}