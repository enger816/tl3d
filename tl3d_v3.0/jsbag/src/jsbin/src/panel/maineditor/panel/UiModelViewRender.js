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
var maineditor;
(function (maineditor) {
    var Scene_data = Pan3d.Scene_data;
    var UIRenderOnlyPicComponent = Pan3d.UIRenderOnlyPicComponent;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var Shader3D = Pan3d.Shader3D;
    var TimeUtil = Pan3d.TimeUtil;
    var UiModelViewShder = /** @class */ (function (_super) {
        __extends(UiModelViewShder, _super);
        function UiModelViewShder() {
            return _super.call(this) || this;
        }
        UiModelViewShder.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Pos");
            $context.bindAttribLocation(this.program, 1, "v2uv");
        };
        UiModelViewShder.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Pos;" +
                "attribute vec3 v2uv;" +
                "uniform vec4 ui[50];" +
                "uniform vec4 ui2[50];" +
                "varying vec2 v0;" +
                "void main(void)" +
                "{" +
                "   vec4 data = ui2[int(v2uv.z)];" +
                "   v0 = vec2(v2uv.x * data.x + data.z, v2uv.y * data.y + data.w);" +
                "   data = ui[int(v2uv.z)];" +
                "   vec3 pos = vec3(0.0,0.0,0.0);" +
                "   pos.xy = v3Pos.xy * data.zw * 2.0;" +
                "   pos.x += data.x * 2.0 - 1.0;" +
                "   pos.y += -data.y * 2.0 + 1.0;" +
                "   vec4 vt0= vec4(pos, 1.0);" +
                "   gl_Position = vt0;" +
                "}";
            return $str;
        };
        UiModelViewShder.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "uniform sampler2D fs0;\n" +
                "varying vec2 v0;\n" +
                "void main(void){\n" +
                "vec4 ik=texture2D(fs0,v0);\n" +
                "gl_FragColor=vec4(ik.x,ik.x,ik.x,1.0);\n" +
                "}";
            return $str;
        };
        UiModelViewShder.UiModelViewShder = "UiModelViewShder";
        return UiModelViewShder;
    }(Shader3D));
    maineditor.UiModelViewShder = UiModelViewShder;
    var UiModelViewRender = /** @class */ (function (_super) {
        __extends(UiModelViewRender, _super);
        function UiModelViewRender() {
            var _this = _super.call(this) || this;
            _this.time = 0;
            return _this;
        }
        UiModelViewRender.prototype.initData = function () {
            this._uiList = new Array;
            this.objData = new ObjData();
            ProgrmaManager.getInstance().registe(UiModelViewShder.UiModelViewShder, new UiModelViewShder);
            this.shader = ProgrmaManager.getInstance().getProgram(UiModelViewShder.UiModelViewShder);
            this.program = this.shader.program;
            this.uiProLocation = Scene_data.context3D.getLocation(this.program, "ui");
            this.ui2ProLocation = Scene_data.context3D.getLocation(this.program, "ui2");
        };
        UiModelViewRender.prototype.makeRenderDataVc = function ($vcId) {
            _super.prototype.makeRenderDataVc.call(this, $vcId);
            for (var i = 0; i < this.renderData2.length / 4; i++) {
                this.renderData2[i * 4 + 0] = 1;
                this.renderData2[i * 4 + 1] = -1;
                this.renderData2[i * 4 + 2] = 0;
                this.renderData2[i * 4 + 3] = 0;
            }
        };
        Object.defineProperty(UiModelViewRender.prototype, "sceneProjectVo", {
            set: function (value) {
                if (value) {
                    if (this._sceneProjectVo) {
                        this._sceneProjectVo.removeEventListener(Pan3d.BaseEvent.COMPLETE, this.sceneProjectUpData, this);
                    }
                    this._sceneProjectVo = value;
                    this._sceneProjectVo.addEventListener(Pan3d.BaseEvent.COMPLETE, this.sceneProjectUpData, this);
                    this.sceneProjectUpData();
                }
            },
            enumerable: true,
            configurable: true
        });
        UiModelViewRender.prototype.sceneProjectUpData = function () {
            var _this = this;
            pack.PackMaterialManager.getInstance().getMaterialByUrl(this._sceneProjectVo.textureurl, function ($materialTree) {
                _this.materialTree = $materialTree;
                var tempShader = new UiModelViewShder;
                _this.materialTree.shader = _this.materialTree.modelShader;
                tempShader.fragment = _this.materialTree.shader.fragment;
                tempShader.encode();
                _this.uiProLocation = Scene_data.context3D.getLocation(tempShader.program, "ui");
                _this.ui2ProLocation = Scene_data.context3D.getLocation(tempShader.program, "ui2");
                _this.shader = tempShader;
                _this.materialTree.shader = tempShader; //这里将材质设置到材质对象中，会有可能物件，人物，场景都引用。可能需要规避
            });
        };
        UiModelViewRender.prototype.setMaterialVc = function ($material, $mp) {
            if ($mp === void 0) { $mp = null; }
            if ($material.fcNum <= 0) {
                return;
            }
            var t = 0;
            if ($material.hasTime) {
                t = (TimeUtil.getTimer() - this.time) % 100000 * 0.001;
            }
            $material.update(t);
            if ($mp) {
                $mp.update();
            }
            Scene_data.context3D.setVc4fv(this.shader, "fc", $material.fcData);
        };
        UiModelViewRender.prototype.update = function () {
            if (this.visible && this._uiList.length) {
                Scene_data.context3D.setBlendParticleFactors(this.blenderMode);
                Scene_data.context3D.setProgram(this.shader.program);
                Scene_data.context3D.setVc4fvLocation(this.uiProLocation, this.renderData);
                Scene_data.context3D.setVc4fvLocation(this.ui2ProLocation, this.renderData2);
                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 3, this.objData.uvBuffer);
                Scene_data.context3D.setRenderTexture(this.shader, "fs0", this.texture, 0);
                if (this.materialTree) {
                    this.setMaterialVc(this.materialTree, this._sceneProjectVo.materialParam);
                }
                Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            }
        };
        return UiModelViewRender;
    }(UIRenderOnlyPicComponent));
    maineditor.UiModelViewRender = UiModelViewRender;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=UiModelViewRender.js.map