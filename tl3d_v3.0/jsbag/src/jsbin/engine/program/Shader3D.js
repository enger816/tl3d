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
var Shader3D = /** @class */ (function (_super) {
    __extends(Shader3D, _super);
    function Shader3D() {
        var _this = _super.call(this) || this;
        _this.fragment = _this.getFragmentShaderString();
        return _this;
    }
    Shader3D.prototype.encode = function () {
        this.vertex = this.getVertexShaderString();
        ////console.log(this.vertex);
        var $context = Scene_data.context3D.renderContext;
        this.program = $context.createProgram();
        this.vShader = $context.createShader($context.VERTEX_SHADER);
        this.fShader = $context.createShader($context.FRAGMENT_SHADER);
        $context.shaderSource(this.vShader, this.vertex);
        $context.shaderSource(this.fShader, this.fragment);
        $context.compileShader(this.vShader);
        $context.compileShader(this.fShader);
        $context.attachShader(this.program, this.vShader);
        $context.attachShader(this.program, this.fShader);
        this.binLocation($context);
        $context.linkProgram(this.program);
        //Scene_data.context3D.addProgram(this.program);
        this.localDic = new Object();
        var info = $context.getProgramInfoLog(this.program);
        var vInfo = $context.getShaderInfoLog(this.vShader);
        var fInfo = $context.getShaderInfoLog(this.fShader);
        if (info != "") {
            if (vInfo == "" && fInfo == "") {
                return true;
            }
            //console.log("shader error: " + info + "," + vInfo + "," + fInfo);
            return false;
        }
        else {
            return true;
        }
    };
    Shader3D.prototype.getWebGLUniformLocation = function ($name) {
        var local = this.localDic[$name];
        if (local) {
            return local;
        }
        else {
            this.localDic[$name] = Scene_data.context3D.getLocation(this.program, $name);
            return this.localDic[$name];
        }
    };
    Shader3D.prototype.binLocation = function ($context) {
    };
    Shader3D.prototype.getVertexShaderString = function () {
        return "";
    };
    Shader3D.prototype.getFragmentShaderString = function () {
        return "";
    };
    Shader3D.prototype.destory = function () {
        this.vertex = null;
        this.fragment = null;
        this.name = null;
        this.localDic = null;
        Scene_data.context3D.deleteShader(this);
    };
    return Shader3D;
}(ResCount));
//# sourceMappingURL=Shader3D.js.map