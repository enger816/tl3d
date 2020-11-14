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
var Display3dBatchMovie = /** @class */ (function (_super) {
    __extends(Display3dBatchMovie, _super);
    function Display3dBatchMovie() {
        var _this = _super.call(this) || this;
        _this.batchNum = 0;
        _this.batchPos = new Array;
        return _this;
    }
    Object.defineProperty(Display3dBatchMovie.prototype, "fileScale", {
        set: function (value) {
            this._fileScale = value;
            for (var i = 0; i < this.batchPos.length; i++) {
                this.batchPos[i].fileScale = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Display3dBatchMovie.prototype.addSun = function ($obj) {
        this.batchPos.push($obj);
        $obj.fileScale = this._fileScale;
    };
    Display3dBatchMovie.prototype.setVcMatrix = function ($mesh) {
        Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
        Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
        Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "rotationMatrix3D", this._rotationMatrix.m);
        for (var i = 0; i < this.batchPos.length; i++) {
            Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "posMatrixAry[" + i + "]", this.batchPos[i].posMatrix.m);
        }
    };
    Display3dBatchMovie.prototype.setLightProbeVc = function ($material) {
    };
    Display3dBatchMovie.prototype.setVa = function ($mesh) {
        Scene_data.context3D.setVa(0, 3, $mesh.vertexBuffer);
        Scene_data.context3D.setVa(1, 3, $mesh.uvBuffer);
        Scene_data.context3D.setVa(2, 4, $mesh.boneIdBuffer);
        Scene_data.context3D.setVa(3, 4, $mesh.boneWeightBuffer);
        if ($mesh.material.usePbr) {
            Scene_data.context3D.setVa(4, 4, $mesh.normalsBuffer);
            if ($mesh.material.useNormal) {
                Scene_data.context3D.setVa(5, 4, $mesh.tangentBuffer);
                Scene_data.context3D.setVa(6, 4, $mesh.bitangentBuffer);
            }
        }
        else {
            if ($mesh.material.lightProbe || $mesh.material.directLight) {
                Scene_data.context3D.setVa(4, 4, $mesh.normalsBuffer);
            }
        }
    };
    Display3dBatchMovie.prototype.addStage = function () {
        _super.prototype.addStage.call(this);
        if (this.batchPos.length) {
            for (var i = 0; i < this.batchPos.length; i++) {
                this.batchPos[i].add();
            }
        }
    };
    Display3dBatchMovie.prototype.removeStage = function () {
        _super.prototype.removeStage.call(this);
        if (this.batchPos.length) {
            for (var i = 0; i < this.batchPos.length; i++) {
                this.batchPos[i].remove();
            }
        }
    };
    return Display3dBatchMovie;
}(Display3dMovie));
var Movie3D = /** @class */ (function (_super) {
    __extends(Movie3D, _super);
    function Movie3D() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.posData = [0, 0, 0, 10];
        _this.hasReach = false;
        _this._fileScale = 1;
        return _this;
    }
    Object.defineProperty(Movie3D.prototype, "shadow", {
        set: function (value) {
            if (value) {
                if (!this._shadow) {
                    this._shadow = ShadowManager.getInstance().addShadow();
                    this._shadow.x = this._x;
                    this._shadow.y = this._y;
                    this._shadow.z = this._z;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Movie3D.prototype, "fileScale", {
        set: function (value) {
            this._fileScale = value;
            this._scaleX *= value;
            this._scaleY *= value;
            this._scaleZ *= value;
            this.updateMatrix();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Movie3D.prototype, "scale", {
        set: function (value) {
            this._scaleX = value * this._fileScale;
            this._scaleY = value * this._fileScale;
            this._scaleZ = value * this._fileScale;
            this.posData[3] = 20 * value;
            this.updateMatrix();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Movie3D.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
            this.posData[0] = value;
            this.updateMatrix();
            if (this._shadow) {
                if (this.retinueShadowFix) {
                    this._shadow.x = value + this.retinueShadowFix.x;
                }
                else {
                    this._shadow.x = value;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Movie3D.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
            this.posData[1] = value;
            this.updateMatrix();
            if (this._shadow) {
                if (this.retinueShadowFix) {
                    this._shadow.y = value + this.retinueShadowFix.y + 2;
                }
                else {
                    this._shadow.y = value + 2;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Movie3D.prototype, "z", {
        get: function () {
            return this._z;
        },
        set: function (value) {
            this._z = value;
            this.posData[2] = value;
            this.updateMatrix();
            if (this._shadow) {
                if (this.retinueShadowFix) {
                    this._shadow.z = value + this.retinueShadowFix.z;
                }
                else {
                    this._shadow.z = value;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Movie3D.prototype.add = function () {
        if (this._shadow) {
            this._shadow.visible = true;
        }
    };
    Movie3D.prototype.remove = function () {
        if (this._shadow) {
            this._shadow.visible = false;
        }
    };
    return Movie3D;
}(Object3D));
//# sourceMappingURL=Display3dBatchMovie.js.map