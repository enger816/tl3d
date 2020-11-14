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
/**
* name
*/
var layapan;
(function (layapan) {
    var CombineParticle = tl3d.CombineParticle;
    var Scene_data = tl3d.Scene_data;
    var ParticleManager = tl3d.ParticleManager;
    var Vector3D = tl3d.Vector3D;
    var BaseRes = tl3d.BaseRes;
    var MaterialAnimShader = tl3d.MaterialAnimShader;
    var Display3DSprite = tl3d.Display3DSprite;
    var ShadowManager = tl3d.ShadowManager;
    var LayaSceneBaseChar = /** @class */ (function (_super) {
        __extends(LayaSceneBaseChar, _super);
        function LayaSceneBaseChar() {
            var _this = _super.call(this) || this;
            _this._avatar = -1;
            _this._visible = true;
            _this.changeColor = [1, 1, 1, 1];
            _this._alpha = 1;
            _this.x;
            return _this;
        }
        Object.defineProperty(LayaSceneBaseChar.prototype, "alpha", {
            get: function () {
                return this._alpha;
            },
            set: function (value) {
                this._alpha = value;
                this.changeColor[0] = 1;
                this.changeColor[1] = 1;
                this.changeColor[2] = 1;
                this.changeColor[3] = value;
            },
            enumerable: true,
            configurable: true
        });
        LayaSceneBaseChar.prototype.updateMaterialMesh = function ($mesh) {
            if (this.changeColor[0] != 1 || this.changeColor[1] != 1 || this.changeColor[2] != 1 || this.changeColor[3] != 1) {
                if (!LayaSceneBaseChar.alphaShader) {
                    LayaSceneBaseChar.alphaShader = this.makeAlphaShader();
                }
                var $selfShader = $mesh.material.shader;
                $mesh.material.shader = LayaSceneBaseChar.alphaShader;
                Scene_data.context3D.setProgram(LayaSceneBaseChar.alphaShader.program);
                Scene_data.context3D.cullFaceBack(false);
                Scene_data.context3D.setBlendParticleFactors(-1);
                this.setVcMatrix($mesh);
                this.setMaterialTextureAlpha($mesh.material, $mesh.materialParam);
                this.setVa($mesh);
                Scene_data.context3D.setVc4fv($mesh.material.shader, "alphadata", this.changeColor);
                this.setMeshVc($mesh);
                Scene_data.context3D.drawCall($mesh.indexBuffer, $mesh.treNum);
                $mesh.material.shader = $selfShader;
            }
            else {
                _super.prototype.updateMaterialMesh.call(this, $mesh);
            }
        };
        LayaSceneBaseChar.prototype.setMaterialTextureAlpha = function ($material, $mp) {
            if ($mp === void 0) { $mp = null; }
            //透明的时候只显示一个主材质贴图
            var texVec = $material.texList;
            for (var i = 0; i < texVec.length; i++) {
                if (texVec[i].isMain) {
                    var txte = texVec[i].texture;
                    var $has = false;
                    if ($mp) {
                        for (var j = 0; j < $mp.dynamicTexList.length; j++) {
                            if ($mp.dynamicTexList[j].target) {
                                if ($mp.dynamicTexList[j].target.name == texVec[i].name) {
                                    txte = $mp.dynamicTexList[j].texture;
                                }
                            }
                        }
                    }
                    Scene_data.context3D.setRenderTexture($material.shader, "alphatexture", txte, 0);
                }
            }
        };
        LayaSceneBaseChar.prototype.makeAlphaShader = function () {
            var shader = new MaterialAnimShader();
            shader.paramAry = [false, false, false, false, false, false, false, 0];
            shader.fragment =
                "precision mediump float;\n" +
                    "uniform sampler2D alphatexture;\n" +
                    "uniform vec4 alphadata;\n" +
                    "varying vec2 v0;\n" +
                    "void main(void){\n" +
                    "vec4 ft0 = texture2D(alphatexture,v0);\n" +
                    "gl_FragColor =ft0*alphadata;\n" +
                    "}";
            var encodetf = shader.encode();
            return shader;
        };
        Object.defineProperty(LayaSceneBaseChar.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (value) {
                this._visible = value;
            },
            enumerable: true,
            configurable: true
        });
        LayaSceneBaseChar.prototype.setAvatar = function (num) {
            if (this._avatar == num) {
                return;
            }
            this._avatar = num;
            this.setRoleUrl(this.getSceneCharAvatarUrl(num));
        };
        Object.defineProperty(LayaSceneBaseChar.prototype, "shadow", {
            set: function (value) {
                //阴影需要先设置，在设置角色的x,y,z.角色接受xyz会修改阴影位置
                if (value) {
                    if (!this._shadow) {
                        this._shadow = this._scene.shadowMgr.addShadow();
                        this._shadow.visible = true;
                        this._shadow.x = this.px;
                        this._shadow.y = this.py;
                        this._shadow.z = this.pz;
                    }
                }
                else {
                    if (this._shadow) {
                        this._shadow.visible = false;
                        this._scene.shadowMgr.removeShadow(this._shadow);
                        this._shadow = null;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        LayaSceneBaseChar.prototype.update = function () {
            if (this.visible) {
                _super.prototype.update.call(this);
            }
            if (this._shadow) {
                this._shadow._visible = this.visible;
            }
        };
        LayaSceneBaseChar.prototype.getSceneCharAvatarUrl = function (num) {
            var $url = getRoleUrl(String(num));
            return getRoleUrl(String(num));
        };
        LayaSceneBaseChar.prototype.getSceneCharWeaponUrl = function (num, $suffix) {
            if ($suffix === void 0) { $suffix = ""; }
            return getModelUrl(String(num + $suffix));
        };
        // 是否播放中
        LayaSceneBaseChar.prototype.isPlaying = function () {
            // if(this._completeState != 1){
            // 	return true;
            // }
            return this._completeState != 1 || !this._curentFrame || (this._curentFrame < (this._animDic[this.curentAction].matrixAry.length - 1));
        };
        LayaSceneBaseChar.prototype.loadPartRes = function ($bindSocket, groupRes, ary) {
            if (this._hasDestory) {
                return;
            }
            for (var i = 0; i < groupRes.dataAry.length; i++) {
                var item = groupRes.dataAry[i];
                var posV3d;
                var rotationV3d;
                var scaleV3d;
                if (item.isGroup) {
                    posV3d = new Vector3D(item.x, item.y, item.z);
                    rotationV3d = new Vector3D(item.rotationX, item.rotationY, item.rotationZ);
                    scaleV3d = new Vector3D(item.scaleX, item.scaleY, item.scaleZ);
                }
                if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                    var particle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + item.particleUrl);
                    ary.push(particle);
                    particle.bindTarget = this;
                    particle.bindSocket = $bindSocket;
                    particle.dynamic = true;
                    this._scene.addParticle(particle);
                    if (item.isGroup) {
                        particle.setGroup(posV3d, rotationV3d, scaleV3d);
                    }
                }
                else if (item.types == BaseRes.PREFAB_TYPE) {
                    var display = new Display3DSprite();
                    display.setObjUrl(item.objUrl);
                    display.setMaterialUrl(item.materialUrl, item.materialInfoArr);
                    display.dynamic = true;
                    ary.push(display);
                    display.setBind(this, $bindSocket);
                    this._scene.addSpriteDisplay(display);
                    if (item.isGroup) {
                        display.setGroup(posV3d, rotationV3d, scaleV3d);
                    }
                }
            }
            this.applyVisible();
        };
        LayaSceneBaseChar.prototype.removeStage = function () {
            this._onStage = false;
            if (this._shadow) {
                ShadowManager.getInstance().removeShadow(this._shadow);
            }
            for (var key in this._partDic) {
                var ary = this._partDic[key];
                if (ary) {
                    for (var i = 0; i < ary.length; i++) {
                        if (ary[i] instanceof CombineParticle) {
                            this._scene.removeParticle(ary[i]);
                        }
                        else if (ary[i] instanceof Display3DSprite) {
                            (this._scene).removeSpriteDisplay(ary[i]);
                        }
                    }
                }
            }
        };
        Object.defineProperty(LayaSceneBaseChar.prototype, "px", {
            get: function () {
                return this.x;
            },
            set: function (value) {
                this.x = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayaSceneBaseChar.prototype, "py", {
            get: function () {
                return this.y;
            },
            set: function (value) {
                this.y = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayaSceneBaseChar.prototype, "pz", {
            get: function () {
                return this.z;
            },
            set: function (value) {
                this.z = value;
            },
            enumerable: true,
            configurable: true
        });
        LayaSceneBaseChar.prototype.addSkinMeshParticle = function () {
            if (!this._skinMesh || this._hasDestory) {
                return;
            }
            var dicAry = new Array;
            this._partDic["mesh"] = dicAry;
            var meshAry = this._skinMesh.meshAry;
            if (!meshAry) {
                return;
            }
            for (var i = 0; i < meshAry.length; i++) {
                var particleAry = meshAry[i].particleAry;
                for (var j = 0; j < particleAry.length; j++) {
                    var bindPartcle = particleAry[j];
                    var particle;
                    particle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + bindPartcle.url);
                    if (!particle.sourceData) {
                        console.log("particle.sourceData error", particle, bindPartcle);
                    }
                    particle.dynamic = true;
                    particle.bindSocket = bindPartcle.socketName;
                    dicAry.push(particle);
                    particle.bindTarget = this;
                    particle.scaleX = this.scale;
                    particle.scaleY = this.scale;
                    particle.scaleZ = this.scale;
                    this._scene.addParticle(particle);
                }
            }
        };
        LayaSceneBaseChar.prototype.removeSkinMeshParticle = function () {
            var dicAry = this._partDic["mesh"];
            if (!dicAry) {
                return;
            }
            for (var i = 0; i < dicAry.length; i++) {
                this._scene.removeParticle(dicAry[i]);
                dicAry[i].destory();
            }
            this._partDic["mesh"] = null;
        };
        return LayaSceneBaseChar;
    }(tl3d.Display3dMovie));
    layapan.LayaSceneBaseChar = LayaSceneBaseChar;
})(layapan || (layapan = {}));
//# sourceMappingURL=LayaSceneBaseChar.js.map