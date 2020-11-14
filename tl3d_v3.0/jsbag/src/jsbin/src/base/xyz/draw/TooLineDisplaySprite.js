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
var xyz;
(function (xyz) {
    var Display3D = Pan3d.Display3D;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var Scene_data = Pan3d.Scene_data;
    var Vector3D = Pan3d.Vector3D;
    var LineDisplayShader = Pan3d.LineDisplayShader;
    var TooLineDisplaySprite = /** @class */ (function (_super) {
        __extends(TooLineDisplaySprite, _super);
        function TooLineDisplaySprite() {
            var _this = _super.call(this) || this;
            _this.baseColor = new Vector3D(1, 0, 1, 1);
            _this.objData = new ObjData;
            _this.shader = ProgrmaManager.getInstance().getProgram(LineDisplayShader.LineShader);
            _this.program = _this.shader.program;
            _this.makeLineMode(new Vector3D(0, 0, 0), new Vector3D(30, 0, 0), new Vector3D(1, 0, 1));
            _this.upToGpu();
            return _this;
        }
        TooLineDisplaySprite.prototype.makeLineMode = function (a, b, $color) {
            if ($color === void 0) { $color = null; }
            if (!this.lineVecPos || !this.lineIndex) {
                this.clear();
            }
            if ($color) {
                this.baseColor = $color;
            }
            this.lineVecPos.push(a.x, a.y, a.z);
            this.lineVecPos.push(b.x, b.y, b.z);
            this.lineColor.push(this.baseColor.x, this.baseColor.y, this.baseColor.z);
            this.lineColor.push(this.baseColor.x, this.baseColor.y, this.baseColor.z);
            this.lineIndex.push(this.lineIndex.length + 0, this.lineIndex.length + 1);
        };
        TooLineDisplaySprite.prototype.clear = function () {
            this.lineVecPos = new Array;
            this.lineIndex = new Array;
            this.lineColor = new Array;
            if (this.objData.indexBuffer) {
                this.objData.indexBuffer = null;
            }
        };
        TooLineDisplaySprite.prototype.upToGpu = function () {
            if (this.lineIndex.length) {
                //console.log("A星长度", this.lineIndex.length)
                this.objData.treNum = this.lineIndex.length;
                this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.lineVecPos);
                this.objData.normalsBuffer = Scene_data.context3D.uploadBuff3D(this.lineColor);
                this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.lineIndex);
            }
        };
        TooLineDisplaySprite.prototype.update = function () {
            if (this.objData && this.objData.indexBuffer) {
                Scene_data.context3D.setProgram(this.program);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);
                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 3, this.objData.normalsBuffer);
                Scene_data.context3D.drawLine(this.objData.indexBuffer, this.objData.treNum);
            }
        };
        return TooLineDisplaySprite;
    }(Display3D));
    xyz.TooLineDisplaySprite = TooLineDisplaySprite;
})(xyz || (xyz = {}));
//# sourceMappingURL=TooLineDisplaySprite.js.map