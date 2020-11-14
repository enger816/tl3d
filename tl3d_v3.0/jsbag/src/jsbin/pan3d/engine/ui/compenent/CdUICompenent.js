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
    var CdRenderComponent = /** @class */ (function (_super) {
        __extends(CdRenderComponent, _super);
        function CdRenderComponent() {
            var _this = _super.call(this) || this;
            _this.initProgram();
            return _this;
        }
        CdRenderComponent.prototype.setVc = function () {
            for (var i = 0; i < this._uiList.length; i++) {
                this._uiList[i].setVc(this.shader, i);
            }
            _super.prototype.setVc.call(this);
        };
        CdRenderComponent.prototype.initProgram = function () {
            Pan3d.ProgrmaManager.getInstance().registe(CdUIShader.CdUIShader, new CdUIShader);
            this.shader = Pan3d.ProgrmaManager.getInstance().getProgram(CdUIShader.CdUIShader);
            this.program = this.shader.program;
            this.uiProLocation = Pan3d.Scene_data.context3D.getLocation(this.program, "ui");
            this.ui2ProLocation = Pan3d.Scene_data.context3D.getLocation(this.program, "ui2");
            this.dataTProLocation = Pan3d.Scene_data.context3D.getLocation(this.program, "dataT");
        };
        CdRenderComponent.prototype.getComponent = function ($uiName) {
            var obj = this.uiAtlas.getLayoutData($uiName);
            var ui = this.creatBaseComponent(obj.dataItem[0]);
            ui.width = obj.rect.width;
            ui.height = obj.rect.height;
            ui.x = obj.rect.x;
            ui.y = obj.rect.y;
            ui.baseRec = obj.rect;
            ui.name = $uiName;
            return ui;
        };
        CdRenderComponent.prototype.creatBaseComponent = function ($skinName) {
            var ui = new CdUICompenent();
            ui.skinName = $skinName;
            var rec = this.uiAtlas.getRec($skinName);
            ui.tr.setRec(rec);
            ui.width = rec.pixelWitdh;
            ui.height = rec.pixelHeight;
            ui.uiRender = this;
            return ui;
        };
        return CdRenderComponent;
    }(Pan3d.UIRenderComponent));
    Pan3d.CdRenderComponent = CdRenderComponent;
    var CdUICompenent = /** @class */ (function (_super) {
        __extends(CdUICompenent, _super);
        function CdUICompenent() {
            var _this = _super.call(this) || this;
            _this.cdTotalnum = 0;
            _this.lastTime = 0;
            _this._skipNum = 0;
            //  public colorVer: Array<number> = [1, 0.5, 0, 0.5]
            _this.isRound = false;
            _this.visible = true;
            _this.clockwise = true;
            _this._skipNum = float2int(Math.random() * 360);
            return _this;
        }
        CdUICompenent.prototype.setCdNum = function (value) {
            this._skipNum = 360 * value;
        };
        Object.defineProperty(CdUICompenent.prototype, "isFinish", {
            get: function () {
                if (this._skipNum >= 360) {
                    return true;
                }
                else {
                    return false;
                }
            },
            enumerable: true,
            configurable: true
        });
        CdUICompenent.prototype.update = function () {
            if (this.cdTotalnum != 0) {
                var n = (Pan3d.TimeUtil.getTimer() - this.lastTime) / this.cdTotalnum;
                if (n < 1) {
                    this.setCdNum(n);
                }
                else {
                    this.setCdNum(1);
                }
            }
            _super.prototype.update.call(this);
        };
        CdUICompenent.prototype.setVc = function (program, index) {
            var nk = ((this._skipNum % 360)) / 180 * Math.PI;
            Pan3d.Scene_data.context3D.setVc4fv(program, "dataTime[" + index + "]", [nk, this.clockwise ? 0 : 1, 0, 1]);
        };
        return CdUICompenent;
    }(Pan3d.UICompenent));
    var CdUIShader = /** @class */ (function (_super) {
        __extends(CdUIShader, _super);
        function CdUIShader() {
            return _super.call(this) || this;
        }
        CdUIShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Pos");
            $context.bindAttribLocation(this.program, 1, "v2uv");
        };
        CdUIShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Pos;" +
                "attribute vec3 v2uv;" +
                "uniform vec4 ui[20];" +
                "uniform vec4 ui2[20];" +
                "uniform vec4 dataTime[20];" +
                "varying vec2 v_pos;\n" +
                "varying vec2 u_pos;" +
                "varying vec4 v_dataTime;" +
                "void main(void)" +
                "{" +
                "   vec4 data = ui2[int(v2uv.z)];" +
                "   v_dataTime = dataTime[int(v2uv.z)];" +
                "   v_pos = vec2(v3Pos.x ,v3Pos.y);" +
                "   u_pos = vec2(v2uv.x * data.x + data.z, v2uv.y * data.y + data.w);" +
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
        CdUIShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 u_pos;\n" +
                "varying vec2 v_pos;" +
                "varying vec4 v_dataTime;\n" +
                "void main(void)\n" +
                "{\n" +
                "float alpha =1.0;\n" +
                "float tx =v_pos.x*2.0 - 1.0;\n" +
                "float ty =v_pos.y*2.0 + 1.0;\n" +
                "float atanNum =atan(tx,ty);\n" +
                "vec4 infoUv = texture2D(s_texture, u_pos.xy);\n" +
                "infoUv.xyz *= infoUv.w;\n" +
                "if (tx>0.0) {\n" +
                "if (v_dataTime.x<atanNum) {\n" +
                "alpha=0.0;\n" +
                "}; \n" +
                "} else {\n" +
                "atanNum =atanNum+6.283;\n" +
                "if (v_dataTime.x<atanNum) {\n" +
                "alpha=0.0;\n" +
                "}; \n" +
                "}; \n" +
                "if (v_dataTime.y==1.0) {\n" +
                "alpha=1.0-alpha;\n" +
                "}; \n" +
                "gl_FragColor = infoUv*alpha;\n" +
                "}";
            return $str;
        };
        CdUIShader.CdUIShader = "CdUIShader";
        return CdUIShader;
    }(Pan3d.Shader3D));
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=CdUICompenent.js.map