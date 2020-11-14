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
    var LineDisplaySprite = /** @class */ (function (_super) {
        __extends(LineDisplaySprite, _super);
        function LineDisplaySprite() {
            var _this = _super.call(this) || this;
            _this.baseColor = new Pan3d.Vector3D(1, 0, 0);
            _this.objData = new Pan3d.ObjData;
            _this.shader = Pan3d.ProgrmaManager.getInstance().getProgram(Pan3d.LineDisplayShader.LineShader);
            _this.program = _this.shader.program;
            _this.makeLineMode(new Pan3d.Vector3D(0, 0, 0), new Pan3d.Vector3D(100, 0, 0), new Pan3d.Vector3D());
            _this.makeLineMode(new Pan3d.Vector3D(0, 0, 0), new Pan3d.Vector3D(100, 0, 100), new Pan3d.Vector3D());
            _this.makeLineMode(new Pan3d.Vector3D(100, 0, 0), new Pan3d.Vector3D(100, 0, 100), new Pan3d.Vector3D());
            _this.upToGpu();
            return _this;
        }
        LineDisplaySprite.prototype.makeLineMode = function (a, b, $color) {
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
        LineDisplaySprite.prototype.clear = function () {
            this.lineVecPos = new Array;
            this.lineIndex = new Array;
            this.lineColor = new Array;
            if (this.objData.indexBuffer) {
                this.objData.indexBuffer = null;
            }
        };
        LineDisplaySprite.prototype.upToGpu = function () {
            if (this.lineIndex.length) {
                //console.log("A星长度", this.lineIndex.length)
                this.objData.treNum = this.lineIndex.length;
                this.objData.vertexBuffer = Pan3d.Scene_data.context3D.uploadBuff3D(this.lineVecPos);
                this.objData.normalsBuffer = Pan3d.Scene_data.context3D.uploadBuff3D(this.lineColor);
                this.objData.indexBuffer = Pan3d.Scene_data.context3D.uploadIndexBuff3D(this.lineIndex);
            }
        };
        LineDisplaySprite.prototype.update = function () {
            if (this.objData && this.objData.indexBuffer) {
                Pan3d.Scene_data.context3D.setProgram(this.program);
                Pan3d.Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", Pan3d.Scene_data.viewMatrx3D.m);
                Pan3d.Scene_data.context3D.setVcMatrix4fv(this.shader, "camMatrix3D", Pan3d.Scene_data.cam3D.cameraMatrix.m);
                Pan3d.Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);
                Pan3d.Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Pan3d.Scene_data.context3D.setVa(1, 3, this.objData.normalsBuffer);
                Pan3d.Scene_data.context3D.drawLine(this.objData.indexBuffer, this.objData.treNum);
            }
        };
        return LineDisplaySprite;
    }(Pan3d.Display3D));
    Pan3d.LineDisplaySprite = LineDisplaySprite;
    var MulLineSprite = /** @class */ (function (_super) {
        __extends(MulLineSprite, _super);
        function MulLineSprite() {
            var _this = _super.call(this) || this;
            if (!_this.itemSprite) {
                _this.itemSprite = new Array;
            }
            return _this;
        }
        MulLineSprite.prototype.makeLineMode = function (a, b, $color) {
            if ($color === void 0) { $color = null; }
            _super.prototype.makeLineMode.call(this, a, b, $color);
            var $dic = this.getSprite();
            $dic.makeLineMode(a, b, $color);
        };
        MulLineSprite.prototype.getSprite = function () {
            var $id = Math.floor(this.lineIndex.length / 10000);
            if (!this.itemSprite[$id]) {
                var $temp = new LineDisplaySprite;
                $temp.clear();
                $temp.baseColor = this.baseColor;
                this.itemSprite.push($temp);
            }
            return this.itemSprite[$id];
        };
        MulLineSprite.prototype.update = function () {
            for (var i = 0; i < this.itemSprite.length; i++) {
                this.itemSprite[i].posMatrix = this.posMatrix;
                this.itemSprite[i].update();
            }
        };
        MulLineSprite.prototype.upToGpu = function () {
            for (var i = 0; i < this.itemSprite.length; i++) {
                this.itemSprite[i].upToGpu();
            }
        };
        MulLineSprite.prototype.clear = function () {
            _super.prototype.clear.call(this);
            if (!this.itemSprite) {
                this.itemSprite = new Array;
            }
            for (var i = 0; this.itemSprite && i < this.itemSprite.length; i++) {
                this.itemSprite[i].clear();
            }
        };
        return MulLineSprite;
    }(LineDisplaySprite));
    Pan3d.MulLineSprite = MulLineSprite;
    var GridLineSprite = /** @class */ (function (_super) {
        __extends(GridLineSprite, _super);
        function GridLineSprite() {
            var _this = _super.call(this) || this;
            _this.makeGridData();
            return _this;
        }
        GridLineSprite.prototype.makeGridData = function () {
            var w = 100;
            var n = 10;
            var skeep = w / n;
            this.clear();
            var a;
            var b;
            a = new Pan3d.Vector3D(0, 0, +w);
            b = new Pan3d.Vector3D(0, 0, -w);
            this.makeLineMode(a, b, new Pan3d.Vector3D(0, 0, 1, 1));
            a = new Pan3d.Vector3D(+w, 0, 0);
            b = new Pan3d.Vector3D(-w, 0, 0);
            this.makeLineMode(a, b, new Pan3d.Vector3D(1, 0, 0, 1));
            this.baseColor = new Pan3d.Vector3D(128 / 255, 128 / 255, 128 / 255, 1);
            for (var i = 1; i <= n; i++) {
                a = new Pan3d.Vector3D(+i * skeep, 0, +w);
                b = new Pan3d.Vector3D(+i * skeep, 0, -w);
                this.makeLineMode(a, b);
                a = new Pan3d.Vector3D(-i * skeep, 0, +w);
                b = new Pan3d.Vector3D(-i * skeep, 0, -w);
                this.makeLineMode(a, b);
                a = new Pan3d.Vector3D(+w, 0, +i * skeep);
                b = new Pan3d.Vector3D(-w, 0, +i * skeep);
                this.makeLineMode(a, b);
                a = new Pan3d.Vector3D(+w, 0, -i * skeep);
                b = new Pan3d.Vector3D(-w, 0, -i * skeep);
                this.makeLineMode(a, b);
            }
            this.upToGpu();
        };
        return GridLineSprite;
    }(LineDisplaySprite));
    Pan3d.GridLineSprite = GridLineSprite;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=LineDisplaySprite.js.map