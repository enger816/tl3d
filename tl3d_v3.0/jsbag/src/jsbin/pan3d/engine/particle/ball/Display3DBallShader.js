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
    var Display3DBallShader = /** @class */ (function (_super) {
        __extends(Display3DBallShader, _super);
        function Display3DBallShader() {
            return _super.call(this) || this;
        }
        Display3DBallShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "vPosition");
            $context.bindAttribLocation(this.program, 1, "texcoord");
            $context.bindAttribLocation(this.program, 2, "basePos");
            $context.bindAttribLocation(this.program, 3, "speed");
            var needRotation = this.paramAry[3];
            if (needRotation) {
                $context.bindAttribLocation(this.program, 4, "rotation");
            }
            var hasRandomClolr = this.paramAry[1];
            if (hasRandomClolr) {
                $context.bindAttribLocation(this.program, 5, "color");
            }
        };
        //public static shader_vec4 = {time:[0,0],scale:[1,1],scaleCtrl:[2,2],force:[3,3],worldPos:[4,0],camPos:[5,1],animCtrl:[6,2],uvCtrl:[7,3]};
        Display3DBallShader.prototype.getMat4Str = function (key) {
            return "vcmat[" + Display3DBallShader.shader_mat4[key] + "]";
        };
        Display3DBallShader.prototype.getVec4Str = function (key) {
            return "vcmat[" + Display3DBallShader.shader_vec4[key][0] + "][" + Display3DBallShader.shader_vec4[key][1] + "]";
            //return  "vc[" + Display3DBallShader.shader_vec4[key][0] + "]";
            //return key;
        };
        Display3DBallShader.getVcSize = function () {
            return 7;
        };
        Display3DBallShader.prototype.getVertexShaderString = function () {
            var baseStr;
            var scaleStr;
            var rotationStr;
            var posStr;
            var addSpeedStr;
            var mulStr;
            var resultPosStr;
            var uvStr;
            var particleColorStr;
            var randomColorStr;
            var uvDefaultStr;
            var uvAnimStr;
            var uvSpeedStr;
            var randomColorStr;
            var particleColorStr;
            var defineBaseStr;
            var defineScaleStr;
            var defineRotaionStr;
            var defineAddSpeedStr;
            var defineMulStr;
            var defineUvAnimStr;
            var defineUvSpeedStr;
            var defineRandomColor;
            var defineParticleColor;
            defineBaseStr =
                "attribute vec4 vPosition;\n" +
                    "attribute vec3 texcoord;\n" + //uv坐标xy
                    "attribute vec4 basePos;\n" + //基础位置xyz，发射起始时间w
                    "attribute vec3 speed;\n" + //速度xyz
                    "uniform mat4 vcmat[" + Display3DBallShader.getVcSize() + "];\n" + //所有vc值
                    //"uniform mat4 watheye;\n" +//面向视点矩阵
                    //"uniform mat4 viewMatrix3D;\n" +//模型矩阵
                    //"uniform mat4 modelMatrix;\n" +//模型矩阵
                    //"uniform mat4 camMatrix3D;\n" +//摄像机矩阵
                    //"uniform vec4 time;\n" +//当前时间x,自身加速度y,粒子生命z,是否循环w
                    "varying vec2 v0;\n";
            defineRandomColor =
                "attribute vec4 color;\n" + //随机颜色
                    "varying vec4 v2;\n"; //随机颜色
            defineScaleStr = "";
            //"uniform vec4 scale;\n" +//缩放x，抖动周期y，抖动振幅z
            //"uniform vec4 scaleCtrl;\n"//宽度不变，高度不变，最大比例，最小比例
            defineRotaionStr =
                "attribute vec2 rotation;\n"; //基础旋转x ， 旋转速度y
            defineAddSpeedStr = "";
            //"uniform vec3 force;\n";//外力x，外力y，外力z
            defineMulStr = "";
            //"uniform mat4 rotationMatrix;\n" +//旋转矩阵
            //"uniform vec3 worldPos;\n" +//世界中的位置
            //"uniform vec3 camPos;\n"//世界中的位置
            defineUvAnimStr = "";
            //"uniform vec3 animCtrl;\n"//动画行数x，动画列数，动画间隔
            defineUvSpeedStr = "";
            //"uniform vec2 uvCtrl;\n"//u滚动速度，v滚动速度
            defineParticleColor =
                "varying vec2 v1;\n"; //粒子颜色坐标
            baseStr =
                "float ctime = " + this.getVec4Str("time") + ".x - basePos.w;\n" + //计算当前时间
                    "if (" + this.getVec4Str("time") + ".w > 0.0 && ctime >= 0.0) {\n" +
                    "    ctime = fract(ctime / " + this.getVec4Str("time") + ".z) * " + this.getVec4Str("time") + ".z;\n" +
                    "}\n" +
                    "vec4 pos = vPosition;\n"; //自身位置
            scaleStr =
                "float stime = ctime - " + this.getVec4Str("scale") + ".w;\n" +
                    "stime = max(stime,0.0);\n" +
                    "float sf = " + this.getVec4Str("scale") + ".x * stime;\n" +
                    "if (" + this.getVec4Str("scale") + ".y != 0.0 && " + this.getVec4Str("scale") + ".z != 0.0) {\n" +
                    "    sf += sin(" + this.getVec4Str("scale") + ".y * stime) * " + this.getVec4Str("scale") + ".z;\n" +
                    "}\n" +
                    "if (sf > " + this.getVec4Str("scaleCtrl") + ".z) {\n" +
                    "    sf = " + this.getVec4Str("scaleCtrl") + ".z;\n" +
                    "} else if (sf < " + this.getVec4Str("scaleCtrl") + ".w) {\n" +
                    "    sf = " + this.getVec4Str("scaleCtrl") + ".w;\n" +
                    "}\n" +
                    "vec2 sv2 = vec2(" + this.getVec4Str("scaleCtrl") + ".x * sf, " + this.getVec4Str("scaleCtrl") + ".y * sf);\n" +
                    "sv2 = sv2 + 1.0;\n" +
                    "pos.x *= sv2.x;\n" +
                    "pos.y *= sv2.y;\n";
            rotationStr =
                "float angle = rotation.x + rotation.y * ctime;\n" +
                    "vec4 np = vec4(sin(angle), cos(angle), 0, 0);\n" +
                    "np.z = np.x * pos.y + np.y * pos.x;\n" + //b.x = sin_z * a.y + cos_z * a.x;
                    "np.w = np.y * pos.y - np.x * pos.x;\n" + //b.y = cos_z * a.y - sin_z * a.x;
                    "pos.xy = np.zw;\n";
            posStr =
                "vec3 addPos = speed * ctime;\n" + //运动部分
                    "vec3 uspeed = vec3(0,0,0);\n" +
                    "if (ctime < 0.0 || ctime >= " + this.getVec4Str("time") + ".z) {\n" + //根据时间控制粒子是否显示
                    "    addPos.y = addPos.y + 100000.0;\n" +
                    "}\n";
            addSpeedStr =
                "if(" + this.getVec4Str("time") + ".y != 0.0 && length(speed) != 0.0) {\n" +
                    "    uspeed = vec3(speed.x, speed.y, speed.z);\n" +
                    "    uspeed = normalize(uspeed);\n" +
                    "    uspeed = uspeed * " + this.getVec4Str("time") + ".y;\n" +
                    "    uspeed.xyz = uspeed.xyz + " + this.getVec4Str("force") + ".xyz;\n" +
                    "} else {\n" +
                    "    uspeed = vec3(" + this.getVec4Str("force") + ".x, " + this.getVec4Str("force") + ".y, " + this.getVec4Str("force") + ".z);\n" +
                    "}\n" +
                    "addPos.xyz = addPos.xyz + uspeed.xyz * ctime * ctime;\n";
            mulStr =
                "uspeed = speed + uspeed * ctime * 2.0;\n" + //当前速度方向
                    "uspeed = normalize(uspeed);\n" +
                    "vec4 tempMul = " + this.getMat4Str("rotationMatrix") + " * vec4(uspeed,1.0);\n" +
                    "uspeed.xyz = tempMul.xyz;\n" +
                    "uspeed = normalize(uspeed);\n" +
                    "vec3 cPos = addPos;\n" + //v(视点-位置)
                    "tempMul = " + this.getMat4Str("rotationMatrix") + " * vec4(cPos,1.0);\n" +
                    "cPos.xyz = tempMul.xyz; \n" +
                    "cPos.xyz = " + this.getVec4Str("worldPos") + ".xyz + cPos.xyz;\n" +
                    "cPos.xyz = " + this.getVec4Str("camPos") + ".xyz - cPos.xyz;\n" +
                    "cPos = normalize(cPos);\n" +
                    "cPos = cross(uspeed, cPos);\n" + //法线
                    "cPos = normalize(cPos);\n" +
                    "uspeed = uspeed * pos.x;\n" +
                    "cPos = cPos * pos.y;\n" +
                    "pos.xyz = uspeed.xyz + cPos.xyz;\n";
            resultPosStr =
                "pos = " + this.getMat4Str("watheye") + " * pos;\n" + //控制是否面向视点
                    "pos.xyz = pos.xyz + basePos.xyz + addPos.xyz;\n" +
                    "gl_Position = " + this.getMat4Str("viewMatrix3D") + " * " + this.getMat4Str("camMatrix3D") + " * " + this.getMat4Str("modelMatrix") + " * pos;\n";
            uvDefaultStr =
                "v0 = vec2(texcoord.x,texcoord.y);\n";
            uvAnimStr =
                "vec2 uv = vec2(texcoord.x,texcoord.y);\n" +
                    "float animframe = floor(ctime / " + this.getVec4Str("animCtrl") + ".z);\n" +
                    "animframe = animframe / " + this.getVec4Str("animCtrl") + ".x;\n" +
                    "uv.x += animframe;\n" +
                    "animframe = floor(animframe);\n" +
                    "uv.y += animframe / " + this.getVec4Str("animCtrl") + ".y;\n" +
                    "v0.xy = uv.xy;\n";
            uvSpeedStr =
                "vec2 uv = vec2(" + this.getVec4Str("uvCtrl") + ".x," + this.getVec4Str("uvCtrl") + ".y);\n" +
                    "uv.xy = uv.xy * ctime + texcoord.xy;\n" +
                    "v0.xy = uv.xy;\n";
            randomColorStr =
                "v2 = color;\n";
            particleColorStr =
                "v1 = vec2(ctime/" + this.getVec4Str("time") + ".z,1.0);\n";
            //this.paramAry
            var hasParticle = this.paramAry[0];
            var hasRandomClolr = this.paramAry[1];
            var isMul = this.paramAry[2];
            var needRotation = this.paramAry[3];
            var needScale = this.paramAry[4];
            var needAddSpeed = this.paramAry[5];
            var uvType = this.paramAry[6];
            var str = "";
            var defineStr = "";
            str += baseStr;
            defineStr += defineBaseStr;
            if (needScale) {
                str += scaleStr;
                defineStr += defineScaleStr;
            }
            if (needRotation) {
                str += rotationStr;
                defineStr += defineRotaionStr;
            }
            str += posStr;
            if (needAddSpeed) {
                str += addSpeedStr;
                defineStr += defineAddSpeedStr;
            }
            if (isMul) {
                str += mulStr;
                defineStr += defineMulStr;
            }
            str += resultPosStr;
            if (uvType == 1) {
                str += uvAnimStr;
                defineStr += defineUvAnimStr;
            }
            else if (uvType == 2) {
                str += uvSpeedStr;
                defineStr += defineUvSpeedStr;
            }
            else {
                str += uvDefaultStr;
            }
            if (hasRandomClolr) {
                str += randomColorStr;
                defineStr += defineRandomColor;
            }
            if (hasParticle) {
                str += particleColorStr;
                defineStr += defineParticleColor;
            }
            //str += uvStr
            //str += particleColorStr
            //str += randomColorStr
            var resultAllStr = defineStr + "void main(){\n" + str + "}";
            ////console.log(resultAllStr);
            return resultAllStr;
        };
        Display3DBallShader.prototype.getFragmentShaderString = function () {
            var $str = " precision mediump float;\n" +
                "uniform sampler2D tex;\n" +
                "varying vec2 v0;\n" +
                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(tex, v0.xy);\n" +
                "gl_FragColor = infoUv;\n" +
                "}";
            return $str;
        };
        Display3DBallShader.Display3D_Ball_Shader = "Display3DBallShader";
        Display3DBallShader.shader_mat4 = { viewMatrix3D: 0, camMatrix3D: 1, modelMatrix: 2, watheye: 3, rotationMatrix: 4 };
        Display3DBallShader.shader_vec4 = { time: [5, 0], scale: [5, 1], scaleCtrl: [5, 2], force: [5, 3], worldPos: [6, 0], camPos: [6, 1], animCtrl: [6, 2], uvCtrl: [6, 3] };
        return Display3DBallShader;
    }(Pan3d.Shader3D));
    Pan3d.Display3DBallShader = Display3DBallShader;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Display3DBallShader.js.map