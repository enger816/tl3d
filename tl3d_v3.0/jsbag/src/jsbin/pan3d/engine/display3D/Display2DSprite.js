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
    var Display2DSprite = /** @class */ (function (_super) {
        __extends(Display2DSprite, _super);
        function Display2DSprite() {
            var _this = _super.call(this) || this;
            _this.batchPos = new Array;
            _this.objData = new Pan3d.ObjData();
            _this.watchCaramMatrix = new Pan3d.Matrix3D;
            _this.shader = Pan3d.ProgrmaManager.getInstance().getProgram(Pan3d.Sprite2DShader.SPRITE2D_SHADER);
            _this.program = _this.shader.program;
            return _this;
        }
        Display2DSprite.prototype.setInfo = function ($configurl, $imgurl, $fun) {
            if (!this._imgAtlas) {
                this._imgAtlas = new Pan3d.UIAtlas;
            }
            this._imgAtlas.setInfo($configurl, $imgurl, $fun);
        };
        Display2DSprite.prototype.getSprite = function ($name) {
            var obj = new Sprite();
            obj.uvData = this._imgAtlas.getRec($name);
            return obj;
        };
        Display2DSprite.prototype.addSprite = function () {
            var spriteAry = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                spriteAry[_i] = arguments[_i];
            }
            for (var i = 0; i < spriteAry.length; i++) {
                this.batchPos.push(spriteAry[i]);
            }
            this.applyData();
        };
        Display2DSprite.prototype.applyData = function () {
            this.objData.vertices.length = 0;
            this.objData.uvs.length = 0;
            this.objData.indexs.length = 0;
            for (var i = 0; i < this.batchPos.length; i++) {
                var uv = this.batchPos[i].uvData;
                var whscale = uv.pixelHeight / uv.pixelWitdh;
                this.objData.vertices.push(-0.5 * uv.width, 1 * whscale * uv.width, 0, 0.5 * uv.width, 1 * whscale * uv.width, 0, 0.5 * uv.width, 0, 0, -0.5 * uv.width, 0, 0);
                this.objData.uvs.push(uv.x, uv.y, i, uv.x + uv.width, uv.y, i, uv.x + uv.width, uv.y + uv.height, i, uv.x, uv.y + uv.height, i);
                this.objData.indexs.push(i * 4, 1 + i * 4, 2 + i * 4, i * 4, 2 + i * 4, 3 + i * 4);
            }
            this.objData.treNum = this.objData.indexs.length;
            if (this.objData.vertexBuffer) {
                Pan3d.Scene_data.context3D.uploadBuff3DByBuffer(this.objData.vertexBuffer, this.objData.vertices);
                Pan3d.Scene_data.context3D.uploadBuff3DByBuffer(this.objData.uvBuffer, this.objData.uvs);
                Pan3d.Scene_data.context3D.uploadIndexBuff3DByBuffer(this.objData.indexBuffer, this.objData.indexs);
            }
            else {
                this.objData.vertexBuffer = Pan3d.Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer = Pan3d.Scene_data.context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer = Pan3d.Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }
        };
        Display2DSprite.prototype.update = function () {
            if (this.batchPos.length == 0) {
                return;
            }
            this.watchCaramMatrix.identity();
            this.watchCaramMatrix.prependRotation(-Pan3d.Scene_data.cam3D.rotationY, Pan3d.Vector3D.Y_AXIS);
            this.watchCaramMatrix.prependRotation(-Pan3d.Scene_data.cam3D.rotationX, Pan3d.Vector3D.X_AXIS);
            Pan3d.Scene_data.context3D.setProgram(this.program);
            Pan3d.Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", Pan3d.Scene_data.viewMatrx3D.m);
            Pan3d.Scene_data.context3D.setVcMatrix4fv(this.shader, "camMatrix3D", Pan3d.Scene_data.cam3D.cameraMatrix.m);
            Pan3d.Scene_data.context3D.setVcMatrix4fv(this.shader, "watchCamMatrix3D", this.watchCaramMatrix.m);
            for (var i = 0; i < this.batchPos.length; i++) {
                Pan3d.Scene_data.context3D.setVc4fv(this.shader, "posdata[" + i + "]", this.batchPos[i].posData);
            }
            Pan3d.Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this._imgAtlas.texture, 0);
            Pan3d.Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
            Pan3d.Scene_data.context3D.setVa(1, 3, this.objData.uvBuffer);
            Pan3d.Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
        };
        return Display2DSprite;
    }(Pan3d.Display3D));
    Pan3d.Display2DSprite = Display2DSprite;
    var Sprite = /** @class */ (function (_super) {
        __extends(Sprite, _super);
        function Sprite() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.posData = [0, 0, 0, 100];
            return _this;
        }
        Sprite.prototype.setPos = function (xpos, ypos, zpos) {
            this.x = xpos;
            this.y = ypos;
            this.z = zpos;
        };
        Object.defineProperty(Sprite.prototype, "scale", {
            get: function () {
                return this._scaleX;
            },
            set: function (value) {
                this._scaleX = value;
                this.posData[3] = 100 * value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, "x", {
            set: function (value) {
                this._x = value;
                this.posData[0] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, "y", {
            set: function (value) {
                this._y = value;
                this.posData[1] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, "z", {
            set: function (value) {
                this._z = value;
                this.posData[2] = value;
            },
            enumerable: true,
            configurable: true
        });
        return Sprite;
    }(Pan3d.Object3D));
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Display2DSprite.js.map