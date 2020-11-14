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
var Display2dMovie = /** @class */ (function (_super) {
    __extends(Display2dMovie, _super);
    function Display2dMovie() {
        var _this = _super.call(this) || this;
        _this.batchPos = new Array;
        _this._time = 0;
        _this._allFrame = 12;
        _this._uvData = [0, 0];
        _this._uWidth = 0;
        _this._vWidth = 0;
        _this._state = 0;
        _this.frameRate = 3;
        _this.objData = new ObjData();
        _this.watchCaramMatrix = new Matrix3D;
        _this.shader = ProgrmaManager.getInstance().getProgram(Movie2DShader.MOVIE2D_SHADER);
        _this.program = _this.shader.program;
        return _this;
    }
    Display2dMovie.prototype.update = function () {
        this.watchCaramMatrix.identity();
        this.watchCaramMatrix.prependRotation(-Scene_data.cam3D.rotationY, Vector3D.Y_AXIS);
        this.watchCaramMatrix.prependRotation(-Scene_data.cam3D.rotationX, Vector3D.X_AXIS);
        Scene_data.context3D.setProgram(this.program);
        Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
        Scene_data.context3D.setVcMatrix4fv(this.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
        Scene_data.context3D.setVcMatrix4fv(this.shader, "watchCamMatrix3D", this.watchCaramMatrix.m);
        for (var i = 0; i < this.batchPos.length; i++) {
            Scene_data.context3D.setVc4fv(this.shader, "posdata[" + i + "]", this.batchPos[i].posData);
        }
        Scene_data.context3D.setVc2fv(this.shader, "outuv", this._uvData);
        Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.movieTexture, 0);
        Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
        Scene_data.context3D.setVa(1, 3, this.objData.uvBuffer);
        Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
    };
    Display2dMovie.prototype.updateFrame = function (t) {
        this._time += t;
        var _curentFrame = float2int(this._time / (Scene_data.frameTime * 2) / this.frameRate);
        if (_curentFrame >= this._allFrame) {
            if (this._state == 0) {
                this._time = 0;
                _curentFrame = 0;
            }
            else if (this._state == 1) {
                _curentFrame = this._allFrame - 1;
            }
            else if (this._state == 2) {
                this.play("stand");
                _curentFrame = 0;
                this._state = 0;
            }
            else if (this._state == 3) {
            }
        }
        this._uvData[0] = _curentFrame * this._uWidth;
    };
    Display2dMovie.prototype.play = function (action, state) {
        if (state === void 0) { state = 0; }
        this._state = state;
        this._time = 0;
        if (action == "walk") {
            this._uvData[1] = this._vWidth;
        }
        else if (action.indexOf("attack") != -1) {
            this._uvData[1] = this._vWidth * 2;
        }
        else {
            this._uvData[1] = 0;
        }
    };
    Display2dMovie.prototype.addSun = function ($obj) {
        this.batchPos.push($obj);
    };
    Display2dMovie.prototype.setUrl = function ($url) {
        //TextureManager.getInstance().getTexture(Scene_data.fileRoot + $url, ($text:WebGLTexture) => {this.movieTexture = $text });
    };
    Display2dMovie.prototype.initData = function (num, scale, uscale, vscale, allFrame, random) {
        if (random === void 0) { random = false; }
        this.objData.vertices.length = 0;
        this.objData.uvs.length = 0;
        this.objData.indexs.length = 0;
        this._uWidth = uscale;
        this._vWidth = vscale;
        this._allFrame = allFrame;
        for (var i = 0; i < num; i++) {
            this.objData.vertices.push(-0.5 * scale, 1, 0, 0.5 * scale, 1, 0, 0.5 * scale, 0, 0, -0.5 * scale, 0, 0);
            var upox = 0;
            if (random) {
                upox = float2int(allFrame * Math.random()) * uscale;
            }
            this.objData.uvs.push(0 + upox, 0, i, uscale + upox, 0, i, uscale + upox, 1 * vscale, i, 0 + upox, 1 * vscale, i);
            this.objData.indexs.push(i * 4, 1 + i * 4, 2 + i * 4, i * 4, 2 + i * 4, 3 + i * 4);
        }
        this.objData.treNum = this.objData.indexs.length;
        if (this.objData.vertexBuffer) {
            Scene_data.context3D.uploadBuff3DByBuffer(this.objData.vertexBuffer, this.objData.vertices);
            Scene_data.context3D.uploadBuff3DByBuffer(this.objData.uvBuffer, this.objData.uvs);
            Scene_data.context3D.uploadIndexBuff3DByBuffer(this.objData.indexBuffer, this.objData.indexs);
        }
        else {
            this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
            this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
            this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
        }
    };
    Display2dMovie.prototype.addStage = function () {
        _super.prototype.addStage.call(this);
        if (this.batchPos.length) {
            for (var i = 0; i < this.batchPos.length; i++) {
                this.batchPos[i].add();
            }
        }
    };
    Display2dMovie.prototype.removeStage = function () {
        _super.prototype.removeStage.call(this);
        if (this.batchPos.length) {
            for (var i = 0; i < this.batchPos.length; i++) {
                this.batchPos[i].remove();
            }
        }
    };
    return Display2dMovie;
}(Display3D));
//# sourceMappingURL=Display2dMovie.js.map