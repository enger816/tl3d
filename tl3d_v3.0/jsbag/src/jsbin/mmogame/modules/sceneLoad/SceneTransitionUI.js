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
var SceneTransitionUI = /** @class */ (function (_super) {
    __extends(SceneTransitionUI, _super);
    function SceneTransitionUI() {
        var _this = _super.call(this) || this;
        _this.width = 400;
        _this.height = 80;
        _this.center = 0;
        _this.bottom = 50;
        _this._baImg = new SceneTransitionImg();
        _this.addRender(_this._baImg);
        _this._baImg.setImgInfo("ui/load/transition.jpg", 1024, 512);
        _this._baImg.sortnum = -1;
        return _this;
    }
    SceneTransitionUI.prototype.show = function () {
        UIManager.getInstance().addUIContainer(this);
        this._baImg.alpha = 0;
        TweenLite.to(this._baImg, 0.5, { alpha: 1 });
    };
    SceneTransitionUI.prototype.hide = function () {
        TweenLite.to(this._baImg, 0.5, { alpha: 0 });
    };
    SceneTransitionUI.prototype.resize = function () {
        _super.prototype.resize.call(this);
        this._baImg.resize();
    };
    return SceneTransitionUI;
}(UIConatiner));
var SceneTransitionImg = /** @class */ (function (_super) {
    __extends(SceneTransitionImg, _super);
    function SceneTransitionImg() {
        var _this = _super.call(this) || this;
        _this._scaleData = [1, 1];
        //private _isFBO: boolean = false;
        _this.alpha = 1.0;
        _this.vOffset = 0;
        return _this;
    }
    SceneTransitionImg.prototype.initData = function () {
        this.objData = new ObjData();
        ProgrmaManager.getInstance().registe(SceneTransitionShader.SCENE_TRANSITION_SHADER, new SceneTransitionShader);
        this.shader = ProgrmaManager.getInstance().getProgram(SceneTransitionShader.SCENE_TRANSITION_SHADER);
        this.program = this.shader.program;
        this.objData.vertices.push(-1, 1, 0, 1, 1, 0, 1, -1, 0, -1, -1, 0);
        this.objData.uvs.push(0, 0, 1, 0, 1, 1, 0, 1);
        this.objData.indexs.push(0, 1, 2, 0, 2, 3);
        this.objData.treNum = 6;
        this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
        this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
        this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
    };
    SceneTransitionImg.prototype.resize = function () {
        this.appleyPos();
    };
    SceneTransitionImg.prototype.setImgInfo = function ($url, $width, $height) {
        this.setImgUrl($url);
        this._width = $width;
        this._height = $height;
    };
    SceneTransitionImg.prototype.appleyPos = function () {
        var widthScale = this._width / Scene_data.stageWidth;
        var heightScale = this._height / Scene_data.stageHeight;
        if (widthScale < heightScale) {
            this._scaleData[0] = 1;
            this._scaleData[1] = (this._height / Scene_data.stageHeight) / widthScale;
        }
        else {
            this._scaleData[0] = (this._width / Scene_data.stageWidth) / heightScale;
            this._scaleData[1] = 1;
        }
    };
    SceneTransitionImg.prototype.update = function () {
        this.vOffset -= 0.08;
        if (this.objData && this.texture) {
            Scene_data.context3D.setBlendParticleFactors(0);
            Scene_data.context3D.setProgram(this.program);
            Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
            Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
            Scene_data.context3D.setVc2fv(this.shader, "scale", this._scaleData);
            Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.texture, 0);
            Scene_data.context3D.setVcFloat(this.shader, "alpha", [this.alpha]);
            Scene_data.context3D.setVcFloat(this.shader, "voffset", [this.vOffset]);
            Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
        }
    };
    SceneTransitionImg.prototype.interactiveEvent = function ($e) {
        return true;
    };
    return SceneTransitionImg;
}(UIRenderComponent));
var SceneTransitionShader = /** @class */ (function (_super) {
    __extends(SceneTransitionShader, _super);
    function SceneTransitionShader() {
        return _super.call(this) || this;
    }
    SceneTransitionShader.prototype.binLocation = function ($context) {
        $context.bindAttribLocation(this.program, 0, "v3Pos");
        $context.bindAttribLocation(this.program, 1, "v2uv");
    };
    SceneTransitionShader.prototype.getVertexShaderString = function () {
        var $str = "attribute vec3 v3Pos;" +
            "attribute vec2 v2uv;" +
            "uniform vec2 scale;" +
            "varying vec2 v_texCoord;" +
            "void main(void)" +
            "{" +
            "   v_texCoord = vec2(v2uv.x, v2uv.y);" +
            "   vec4 vt0= vec4(v3Pos.x*scale.x,v3Pos.y*scale.y,v3Pos.z,1.0);" +
            "   gl_Position = vt0;" +
            "}";
        return $str;
    };
    SceneTransitionShader.prototype.getFragmentShaderString = function () {
        var $str = " precision mediump float;\n" +
            "uniform sampler2D s_texture;\n" +
            "uniform float alpha;" +
            "uniform float voffset;" +
            "varying vec2 v_texCoord;\n" +
            "void main(void)\n" +
            "{\n" +
            "vec2 uvs = vec2(v_texCoord.x,v_texCoord.y + voffset);\n" +
            "vec4 infoUv = texture2D(s_texture, uvs);\n" +
            "infoUv.w = alpha;\n" +
            "infoUv.xyz *= infoUv.w;\n" +
            "gl_FragColor = infoUv;\n" +
            "}";
        return $str;
    };
    SceneTransitionShader.SCENE_TRANSITION_SHADER = "Scene_Transition_Shader";
    return SceneTransitionShader;
}(Shader3D));
//# sourceMappingURL=SceneTransitionUI.js.map