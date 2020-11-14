var materialui;
(function (materialui) {
    var Scene_data = Pan3d.Scene_data;
    var MaterialBaseParam = Pan3d.MaterialBaseParam;
    var TexItem = Pan3d.TexItem;
    var Vector3D = Pan3d.Vector3D;
    var TextureCube = Pan3d.TextureCube;
    var ConstItem = Pan3d.ConstItem;
    var CubemapLoad = Pan3d.CubemapLoad;
    var LoadManager = Pan3d.LoadManager;
    var TextureManager = Pan3d.TextureManager;
    var CompileTwo = /** @class */ (function () {
        function CompileTwo() {
            this._timeID = 0;
            this._fcBeginID = 0;
            this.initReg();
            new Vector3D;
            this.defaultUvReg = new materialui.RegisterItem(0);
        }
        CompileTwo.prototype.initReg = function () {
            this.fragmentTempList = new Array;
            this.fragmentTexList = new Array;
            this.fragmentConstList = new Array;
            for (var i = 0; i < 8; i++) {
                this.fragmentTempList.push(new materialui.RegisterItem(i));
                this.fragmentTexList.push(new materialui.RegisterItem(i));
            }
            for (i = 0; i < 28; i++) {
                this.fragmentConstList.push(new materialui.RegisterItem(i));
            }
        };
        CompileTwo.prototype.compile = function ($priorityList, $materialTree) {
            materialui.NodeTree.jsMode = true;
            this.priorityList = $priorityList;
            this.strVec = new Array;
            this.texVec = new Array;
            this.constVec = new Array;
            this.hasTime = false;
            this.useNormal = false;
            this.cubeTextItem = null;
            this.initBaseFc();
            this.funNodeStr = "";
            this.FunDic = {};
            for (var i = this.priorityList.length - 1; i >= 0; i--) {
                var treelist = this.priorityList[i];
                for (var j = 0; j < treelist.length; j++) {
                    this.processNode(treelist[j]);
                }
            }
            var resultStr = this.getGLSLStr();
            $materialTree.shaderStr = resultStr;
            $materialTree.constList = this.constVec;
            $materialTree.texList = this.texVec;
            $materialTree.cubeTextItem = this.cubeTextItem;
            var $materialBaseParam = new MaterialBaseParam();
            $materialBaseParam.setData($materialTree, []);
            $materialTree.fcNum = this.getMaxFc();
            $materialTree.fcData = this.makeFc($materialTree.fcNum);
            $materialTree.hasTime = this.hasTime;
            $materialTree.timeSpeed = this.timeSpeed;
            $materialTree.timeValue = this.timeValue;
            $materialTree.useNormal = this.useNormal;
            $materialTree.useUv = this.useUv;
            $materialTree.useLightUv = this.useLightUv;
            $materialTree.roughness = 0;
            return resultStr;
        };
        CompileTwo.prototype.getMaxFc = function () {
            var maxID = 0;
            if (this.constVec.length) {
                maxID = this.constVec[this.constVec.length - 1].id + 1;
            }
            else {
                if (this._fcBeginID > 0) {
                    maxID = this._fcBeginID;
                }
            }
            return maxID;
        };
        CompileTwo.prototype.makeFc = function (fcNum) {
            var fcData = new Float32Array(fcNum * 4);
            for (var i = 0; i < this.constVec.length; i++) {
                this.constVec[i].creat(fcData);
            }
            return fcData;
        };
        CompileTwo.prototype.getGLSLStr = function () {
            var mainStr = "";
            for (var i = 0; i < this.strVec.length; i++) {
                mainStr += this.strVec[i] + "\n";
            }
            var perStr = "precision mediump float;\n";
            var texStr = "";
            for (i = 0; i < this.texVec.length; i++) {
                if (this.texVec[i].type == TexItem.CUBEMAP) {
                    texStr += "uniform samplerCube fs" + this.texVec[i].id + ";\n";
                }
                else {
                    texStr += "uniform sampler2D fs" + this.texVec[i].id + ";\n";
                }
            }
            if (this.cubeTextItem) {
                texStr += "uniform samplerCube skyBoxCube; \n";
            }
            var constStr = "";
            var maxID = 0;
            if (this.constVec.length) {
                maxID = this.constVec[this.constVec.length - 1].id + 1;
            }
            else {
                if (this._fcBeginID > 0) {
                    maxID = this._fcBeginID;
                }
            }
            this.fcNum = maxID;
            if (this.fcNum > 0) {
                constStr += "uniform vec4 fc[" + (this.fcNum) + "];\n";
            }
            var varyStr = "";
            varyStr += "varying vec2 v0;\n";
            varyStr += "varying highp vec3 vPos;\n";
            varyStr += "uniform vec3 cam3DPos;\n";
            if (this.hasTime) {
                varyStr += "uniform float time;\n";
            }
            if (this.useUv) {
                varyStr += "varying vec2 uvpos;\n";
            }
            if (this.useLightUv) {
                varyStr += "varying vec2 lightuv;\n";
            }
            if (this.useNormal) {
                varyStr += "varying vec3 T;\n";
                varyStr += "varying vec3 B;\n";
                varyStr += "varying vec3 N;\n";
                varyStr += "vec3 normalpic(vec3 n) { \n" +
                    "n=2.0*n-vec3(1.0);\n" +
                    "return normalize(T*n.x+B*n.y+N*n.z);\n" +
                    "}\n";
            }
            var beginStr = "void main(void){\n";
            if (this.useNormal) {
                var inputNormal = this.getInputNormal();
                if (inputNormal.parentNodeItem) {
                    beginStr += "vec3 normalVec = normalpic(" + "texture2D(fs" + inputNormal.parentNodeItem.node.regResultTex.id + ",v0).xyz)" + CompileTwo.END + "\n";
                }
                else {
                    beginStr += "vec3 normalVec = " + "N.xyz" + CompileTwo.END + "\n";
                }
            }
            var endStr = "\n}";
            var resultStr = perStr + texStr + constStr + varyStr + this.funNodeStr + beginStr + mainStr + endStr;
            console.log(resultStr);
            return resultStr;
        };
        CompileTwo.prototype.getInputNormal = function () {
            for (var i = this.priorityList.length - 1; i >= 0; i--) {
                var treelist = this.priorityList[i];
                for (var j = 0; j < treelist.length; j++) {
                    if (treelist[j].type == materialui.NodeTree.OP) {
                        return treelist[j].inputVec[1];
                    }
                }
            }
            return null;
        };
        CompileTwo.prototype.getFragmentTex = function ($nodeTreeTex) {
            if ($nodeTreeTex === void 0) { $nodeTreeTex = null; }
            for (var i = 0; i < this.fragmentTexList.length; i++) {
                if (!this.fragmentTexList[i].inUse) {
                    this.fragmentTexList[i].inUse = true;
                    this.fragmentTexList[i].url = "";
                    return this.fragmentTexList[i];
                }
            }
            return null;
        };
        CompileTwo.prototype.getFragmentTemp = function () {
            for (var i = 0; i < this.fragmentTempList.length; i++) {
                if (!this.fragmentTempList[i].inUse) {
                    this.fragmentTempList[i].inUse = true;
                    return this.fragmentTempList[i];
                }
            }
            return null;
        };
        CompileTwo.prototype.processTexCubeNode = function ($node) {
            var texItem = new TextureCube;
            texItem.url = $node.url;
            texItem.isDynamic = $node.isDynamic;
            texItem.paramName = $node.paramName;
            texItem.isMain = $node.isMain;
            texItem.wrap = $node.wrap;
            texItem.filter = $node.filter;
            texItem.mipmap = $node.mipmap;
            texItem.permul = $node.permul;
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + texItem.url, function ($texture) {
                texItem.textureRes = $texture;
            });
            LoadManager.getInstance().load(Scene_data.fileRoot + texItem.url, LoadManager.IMG_TYPE, function ($img, $info) {
                //   texItem.cubeTextWebgl = CubemapLoad.makeTempCubeTextture($img)
            });
            this.cubeTextItem = texItem;
        };
        CompileTwo.prototype.processTex3DNode = function ($node) {
            var str = "";
            var input = $node.inputVec[0];
            var regtex = this.getFragmentTex($node);
            var regtemp = this.getFragmentTemp();
            var resultStr;
            if (regtemp.hasInit) {
                resultStr = CompileTwo.FT + regtemp.id;
            }
            else {
                resultStr = CompileTwo.VEC4 + CompileTwo.SPACE + CompileTwo.FT + regtemp.id;
                regtemp.hasInit = true;
            }
            if (input.parentNodeItem) {
                var pNode = input.parentNodeItem.node;
                str = resultStr + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + "textureCube" + CompileTwo.LEFT_PARENTH + CompileTwo.FS + regtex.id + CompileTwo.COMMA + pNode.getComponentID(input.parentNodeItem.id) + CompileTwo.RIGHT_PARENTH + CompileTwo.END;
            }
            $node.regResultTemp = regtemp;
            $node.regResultTex = regtex;
            $node.shaderStr = str;
            this.strVec.push(str);
            var texItem = new TexItem;
            texItem.id = regtex.id;
            texItem.url = $node.url;
            texItem.isDynamic = $node.isDynamic;
            texItem.paramName = $node.paramName;
            texItem.isMain = $node.isMain;
            texItem.wrap = $node.wrap;
            texItem.filter = $node.filter;
            texItem.mipmap = $node.mipmap;
            texItem.permul = $node.permul;
            texItem.type = TexItem.CUBEMAP;
            LoadManager.getInstance().load(Scene_data.fileRoot + texItem.url, LoadManager.IMG_TYPE, function ($img, $info) {
                texItem.textureRes = new Pan3d.TextureRes();
                texItem.textureRes.texture = CubemapLoad.makeTempCubeTextture($img);
            });
            this.texVec.push(texItem);
            input.hasCompiled = true;
            if (pNode) {
                pNode.releaseUse();
            }
        };
        CompileTwo.prototype.processTexNode = function ($node) {
            var str = "";
            var input = $node.inputVec[0];
            var regtex = this.getFragmentTex($node);
            var regtemp = this.getFragmentTemp();
            var resultStr;
            if (regtemp.hasInit) {
                resultStr = CompileTwo.FT + regtemp.id;
            }
            else {
                resultStr = CompileTwo.VEC4 + CompileTwo.SPACE + CompileTwo.FT + regtemp.id;
                regtemp.hasInit = true;
            }
            if (input.parentNodeItem) {
                var pNode = input.parentNodeItem.node;
                str = resultStr + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + CompileTwo.texture2D + CompileTwo.LEFT_PARENTH + CompileTwo.FS + regtex.id + CompileTwo.COMMA + pNode.getComponentID(input.parentNodeItem.id) + CompileTwo.RIGHT_PARENTH + CompileTwo.END;
            }
            else {
                str = resultStr + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + CompileTwo.texture2D + CompileTwo.LEFT_PARENTH + CompileTwo.FS + regtex.id + CompileTwo.COMMA + CompileTwo.VI + this.defaultUvReg.id + CompileTwo.RIGHT_PARENTH + CompileTwo.END;
            }
            if ($node.permul) {
                str += CompileTwo.LN + CompileTwo.FT + regtemp.id + CompileTwo.XYZ + CompileTwo.SPACE + CompileTwo.MUL_EQU_MATH + CompileTwo.SPACE + CompileTwo.FT + regtemp.id + CompileTwo.W + CompileTwo.END;
            }
            $node.regResultTemp = regtemp;
            $node.regResultTex = regtex;
            $node.shaderStr = str;
            this.strVec.push(str);
            var texItem = new TexItem;
            texItem.id = regtex.id;
            texItem.url = $node.url;
            texItem.isDynamic = $node.isDynamic;
            texItem.paramName = $node.paramName;
            texItem.isMain = $node.isMain;
            texItem.wrap = $node.wrap;
            texItem.filter = $node.filter;
            texItem.mipmap = $node.mipmap;
            texItem.permul = $node.permul;
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + texItem.url, function ($texture) {
                texItem.textureRes = $texture;
            });
            this.texVec.push(texItem);
            input.hasCompiled = true;
            if (pNode) {
                pNode.releaseUse();
            }
        };
        CompileTwo.prototype.processFunNode = function ($node) {
            var $nodeTreeFun = $node;
            var str = "";
            var input0 = $node.inputVec[0];
            var output = $node.outputVec[0];
            var regtemp = this.getFragmentTemp();
            var resultStr = "";
            if (!regtemp.hasInit) { //vec4(0,0,0,0)
                resultStr = CompileTwo.VEC4 + CompileTwo.SPACE + CompileTwo.FT + regtemp.id + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + CompileTwo.DEFAULT_VEC4 + CompileTwo.END + CompileTwo.LN;
                regtemp.hasInit = true;
            }
            if (output.type == materialui.MaterialItemType.FLOAT) {
                str = CompileTwo.FT + regtemp.id + CompileTwo.X + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE;
            }
            else if (output.type == materialui.MaterialItemType.VEC2) {
                str = CompileTwo.FT + regtemp.id + CompileTwo.XY + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE;
            }
            else if (output.type == materialui.MaterialItemType.VEC3) {
                str = CompileTwo.FT + regtemp.id + CompileTwo.XYZ + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE;
            }
            else {
                str = CompileTwo.FT + regtemp.id + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE;
            }
            str = resultStr + str;
            var $kfuncstr = $nodeTreeFun.funName + "(";
            for (var i = 0; i < $node.inputVec.length; i++) {
                var $inputNodeTreeInputItem = $node.inputVec[i];
                $inputNodeTreeInputItem.hasCompiled = true;
                $inputNodeTreeInputItem.parentNodeItem.node.releaseUse();
                var kkkk = $inputNodeTreeInputItem.parentNodeItem.node.getComponentID($inputNodeTreeInputItem.parentNodeItem.id);
                $kfuncstr += kkkk;
                if (i < $node.inputVec.length - 1) {
                    $kfuncstr += ",";
                }
            }
            $kfuncstr += ")" + CompileTwo.END;
            str += $kfuncstr;
            $node.regResultTemp = regtemp;
            $node.shaderStr = str;
            this.strVec.push(str);
            if (!this.FunDic[$nodeTreeFun.funName]) {
                //函数只会添加一组
                this.funNodeStr += $nodeTreeFun.funStr;
                this.FunDic[$nodeTreeFun.funName] = $nodeTreeFun;
            }
        };
        CompileTwo.prototype.processDynamicNode = function ($node, opCode) {
            var str = "";
            var input0 = $node.inputVec[0];
            var input1 = $node.inputVec[1];
            var pNode0 = input0.parentNodeItem.node;
            var pNode1 = input1.parentNodeItem.node;
            var output = $node.outputVec[0];
            var regtemp = this.getFragmentTemp();
            var resultStr = "";
            if (!regtemp.hasInit && !(input0.type == materialui.MaterialItemType.VEC4 || input1.type == materialui.MaterialItemType.VEC4)) { //vec4(0,0,0,0)
                resultStr = CompileTwo.VEC4 + CompileTwo.SPACE + CompileTwo.FT + regtemp.id + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + CompileTwo.DEFAULT_VEC4 + CompileTwo.END + CompileTwo.LN;
                regtemp.hasInit = true;
            }
            if (input0.type == materialui.MaterialItemType.VEC4 || input1.type == materialui.MaterialItemType.VEC4) {
                if (!regtemp.hasInit) {
                    resultStr = CompileTwo.VEC4 + CompileTwo.SPACE;
                    regtemp.hasInit = true;
                }
                str = CompileTwo.FT + regtemp.id + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE;
            }
            else if (output.type == materialui.MaterialItemType.FLOAT) {
                str = CompileTwo.FT + regtemp.id + CompileTwo.X + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE;
            }
            else if (output.type == materialui.MaterialItemType.VEC2) {
                str = CompileTwo.FT + regtemp.id + CompileTwo.XY + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE;
            }
            else if (output.type == materialui.MaterialItemType.VEC3) {
                str = CompileTwo.FT + regtemp.id + CompileTwo.XYZ + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE;
            }
            str += pNode0.getComponentID(input0.parentNodeItem.id);
            str += CompileTwo.SPACE + opCode + CompileTwo.SPACE;
            str += pNode1.getComponentID(input1.parentNodeItem.id);
            str = resultStr + str + CompileTwo.END;
            input0.hasCompiled = true;
            input1.hasCompiled = true;
            pNode0.releaseUse();
            pNode1.releaseUse();
            $node.regResultTemp = regtemp;
            $node.shaderStr = str;
            this.strVec.push(str);
        };
        CompileTwo.prototype.processNode = function ($node) {
            switch ($node.type) {
                case materialui.NodeTree.VEC3:
                case materialui.NodeTree.FLOAT:
                case materialui.NodeTree.VEC2:
                    this.processVec3Node($node);
                    break;
                case materialui.NodeTree.TEX:
                    this.processTexNode($node);
                    break;
                case materialui.NodeTree.TEX3D:
                    this.processTex3DNode($node);
                    break;
                case materialui.NodeTree.TEXCUBE:
                    this.processTexCubeNode($node);
                    break;
                case materialui.NodeTree.FUN:
                    this.processFunNode($node);
                    break;
                case materialui.NodeTree.MUL:
                    this.processDynamicNode($node, "*");
                    break;
                case materialui.NodeTree.ADD:
                    this.processDynamicNode($node, "+");
                    break;
                case materialui.NodeTree.SUB:
                    this.processDynamicNode($node, "-");
                    break;
                case materialui.NodeTree.DIV:
                    this.processDynamicNode($node, "/");
                    break;
                case materialui.NodeTree.OP:
                    this.processOpNode($node);
                    break;
                case materialui.NodeTree.SIN:
                    this.processStaticNode($node, CompileTwo.SIN);
                    break;
                case materialui.NodeTree.COS:
                    this.processStaticNode($node, CompileTwo.COS);
                    break;
                case materialui.NodeTree.NORMAL:
                    this.useNormal = true;
                    break;
                case materialui.NodeTree.TEXCOORD:
                    this.useUv = true;
                    break;
                case materialui.NodeTree.TEXCOORDLIGHT:
                    this.useLightUv = true;
                    break;
                case materialui.NodeTree.TIME:
                    // this.processTimeNode($node);
                    this.hasTime = true;
                    this.timeSpeed = $node.speed;
                    this.timeValue = $node.timeValue;
                    break;
                default:
                    break;
            }
        };
        CompileTwo.prototype.processTimeNode = function ($node) {
            var str = "";
            var regtemp = this.getFragmentTemp();
            var pNode = new materialui.NodeTreeFloat;
            pNode.type = materialui.NodeTree.FLOAT;
            pNode.constValue = $node.speed;
            this.processVec3Node(pNode);
            if (!regtemp.hasInit) {
                str = CompileTwo.VEC4 + CompileTwo.SPACE + CompileTwo.FT + regtemp.id + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + CompileTwo.DEFAULT_VEC4 + CompileTwo.END;
                regtemp.hasInit = true;
                this.strVec.push(str);
            }
            //str =  FT + regtemp.id + X + SPACE + EQU + SPACE + FC + ZERO + W + SPACE +  MUL_MATH + SPACE + pNode.getComponentID(0) + END;
            str = CompileTwo.FT + regtemp.id + CompileTwo.X + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + this.timeStr + CompileTwo.SPACE + CompileTwo.MUL_MATH + CompileTwo.SPACE + pNode.getComponentID(0) + CompileTwo.END;
            this.strVec.push(str);
            $node.regResultTemp = regtemp;
            this.hasTime = true;
        };
        CompileTwo.prototype.processStaticNode = function ($node, opCode) {
            var str = "";
            var input = $node.inputVec[0];
            var pNode = input.parentNodeItem.node;
            var regtemp = this.getFragmentTemp();
            if (!regtemp.hasInit) { //vec4(0,0,0,0)
                str = CompileTwo.VEC4 + CompileTwo.SPACE + CompileTwo.FT + regtemp.id + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + CompileTwo.DEFAULT_VEC4 + CompileTwo.END + CompileTwo.LN;
                regtemp.hasInit = true;
            }
            str += CompileTwo.FT + regtemp.id + CompileTwo.X + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + opCode + CompileTwo.LEFT_PARENTH + pNode.getComponentID(input.parentNodeItem.id) + CompileTwo.RIGHT_PARENTH + CompileTwo.END;
            input.hasCompiled = true;
            pNode.releaseUse();
            $node.regResultTemp = regtemp;
            $node.shaderStr = str;
            this.strVec.push(str);
        };
        CompileTwo.prototype.traceFt = function () {
            return;
        };
        Object.defineProperty(CompileTwo.prototype, "timeStr", {
            get: function () {
                return "fc[" + this._timeID + "].y";
            },
            enumerable: true,
            configurable: true
        });
        CompileTwo.prototype.processVec3Node = function ($node) {
            this.setFragmentConst($node);
            this.addConstItem($node);
        };
        CompileTwo.prototype.addConstItem = function ($node) {
            if ($node.isDynamic) {
                console.log($node.paramName);
            }
            var constItem;
            var id = $node.regResultConst.id;
            for (var i = 0; i < this.constVec.length; i++) {
                if (this.constVec[i].id == id) {
                    constItem = this.constVec[i];
                }
            }
            if (!constItem) {
                constItem = new ConstItem;
                constItem.id = $node.regResultConst.id;
                this.constVec.push(constItem);
            }
            if ($node.type == materialui.NodeTree.VEC3) {
                if ($node.regConstIndex == 0) {
                    var v3d = $node.constVec3;
                    constItem.value.setTo(v3d.x, v3d.y, v3d.z);
                    if ($node.isDynamic) {
                        constItem.paramName0 = $node.paramName;
                        constItem.param0Type = 4;
                        constItem.param0Index = 0;
                    }
                }
            }
            else if ($node.type == materialui.NodeTree.FLOAT) {
                var num = $node.constValue;
                if ($node.regConstIndex == 0) {
                    constItem.value.x = num;
                    if ($node.isDynamic) {
                        constItem.paramName0 = $node.paramName;
                        constItem.param0Type = 1;
                        constItem.param0Index = 0;
                    }
                }
                else if ($node.regConstIndex == 1) {
                    constItem.value.y = num;
                    if ($node.isDynamic) {
                        constItem.paramName1 = $node.paramName;
                        constItem.param1Type = 1;
                        constItem.param1Index = 1;
                    }
                }
                else if ($node.regConstIndex == 2) {
                    constItem.value.z = num;
                    if ($node.isDynamic) {
                        constItem.paramName2 = $node.paramName;
                        constItem.param2Type = 1;
                        constItem.param2Index = 2;
                    }
                }
                else if ($node.regConstIndex == 3) {
                    constItem.value.w = num;
                    if ($node.isDynamic) {
                        constItem.paramName3 = $node.paramName;
                        constItem.param3Type = 1;
                        constItem.param3Index = 3;
                    }
                }
            }
            else if ($node.type == materialui.NodeTree.VEC2) {
                var vec2 = $node.constValue;
                if ($node.regConstIndex == 0) {
                    constItem.value.x = vec2.x;
                    constItem.value.y = vec2.y;
                    if ($node.isDynamic) {
                        constItem.paramName0 = $node.paramName;
                        constItem.param0Type = 2;
                        constItem.param0Index = 0;
                    }
                }
                else if ($node.regConstIndex == 1) {
                    constItem.value.y = vec2.x;
                    constItem.value.z = vec2.y;
                    if ($node.isDynamic) {
                        constItem.paramName1 = $node.paramName;
                        constItem.param1Type = 2;
                        constItem.param1Index = 1;
                    }
                }
                else if ($node.regConstIndex == 2) {
                    constItem.value.z = vec2.x;
                    constItem.value.w = vec2.y;
                    if ($node.isDynamic) {
                        constItem.paramName2 = $node.paramName;
                        constItem.param2Type = 2;
                        constItem.param2Index = 2;
                    }
                }
            }
        };
        CompileTwo.prototype.setFragmentConst = function ($nodeTree) {
            for (var i = this._fcBeginID; i < this.fragmentConstList.length; i++) {
                var tf = this.fragmentConstList[i].getUse($nodeTree);
                if (tf) {
                    break;
                }
            }
        };
        CompileTwo.prototype.processOpNode = function ($node) {
            //diffuse
            var str = "";
            var inputDiffuse = $node.inputVec[0];
            var inputNormal = $node.inputVec[1];
            var inputAlpha = $node.inputVec[3];
            if (inputNormal.parentNodeItem) {
                this.useNormal = true;
            }
            var regOp;
            this.traceFt();
            if (inputDiffuse.parentNodeItem) { //漫反射部分
                var pNodeDiffuse = inputDiffuse.parentNodeItem.node; //diffuse输入节点
                var regtempLightMap = this.getFragmentTemp();
                var resultStr;
                if (regtempLightMap.hasInit) {
                    resultStr = CompileTwo.FT + regtempLightMap.id;
                }
                else {
                    resultStr = CompileTwo.VEC4 + CompileTwo.SPACE + CompileTwo.FT + regtempLightMap.id;
                    regtempLightMap.hasInit = true;
                }
                str = resultStr + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + CompileTwo.VEC4 + CompileTwo.LEFT_PARENTH + pNodeDiffuse.getComponentID(inputDiffuse.parentNodeItem.id) + CompileTwo.COMMA + "1.0" + CompileTwo.RIGHT_PARENTH + CompileTwo.END;
                this.strVec.push(str);
                pNodeDiffuse.releaseUse();
                regOp = this.getFragmentTemp(); //输出用临时寄存器
                if (!regOp.hasInit) {
                    str = CompileTwo.VEC4 + CompileTwo.SPACE + CompileTwo.FT + regOp.id + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + CompileTwo.DEFAULT_VEC4 + CompileTwo.END;
                    regOp.hasInit = true;
                    this.strVec.push(str);
                }
                str = CompileTwo.FT + regOp.id + CompileTwo.XYZ + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + CompileTwo.FT + regtempLightMap.id + CompileTwo.XYZ + CompileTwo.END;
                inputDiffuse.hasCompiled = true;
                this.strVec.push(str);
                regtempLightMap.inUse = false;
            }
            str = "";
            if (inputAlpha.parentNodeItem) { //漫反射部分
                var pNodeAlpha = inputAlpha.parentNodeItem.node; //diffuse输入节点
                str += CompileTwo.FT + regOp.id + CompileTwo.W + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + pNodeAlpha.getComponentID(inputAlpha.parentNodeItem.id) + CompileTwo.END;
                pNodeAlpha.releaseUse();
            }
            else {
                str = CompileTwo.FT + regOp.id + CompileTwo.W + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + CompileTwo.ONE_FLOAT + CompileTwo.END;
            }
            this.strVec.push(str);
            str = "";
            str = CompileTwo.FO + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + CompileTwo.FT + regOp.id + CompileTwo.END;
            this.strVec.push(str);
        };
        CompileTwo.prototype.initBaseFc = function () {
            var dataID = 0;
            var $hasTime = false;
            for (var i = this.priorityList.length - 1; i >= 0; i--) {
                var treelist = this.priorityList[i];
                for (var j = 0; j < treelist.length; j++) {
                    var node = treelist[j];
                    if (node.type == materialui.NodeTree.OP) {
                    }
                    else if (node.type == materialui.NodeTree.TIME) {
                        $hasTime = true;
                    }
                }
            }
            if ($hasTime) {
                dataID++;
            }
            dataID = 0;
            this._fcBeginID = dataID;
        };
        CompileTwo.SPACE = " ";
        CompileTwo.COMMA = ",";
        CompileTwo.END = ";";
        CompileTwo.FC = "fc";
        CompileTwo.FT = "ft";
        CompileTwo.TEXTURE = "texture";
        CompileTwo.FS = "fs";
        CompileTwo.VI = "v";
        CompileTwo.OP = "op";
        CompileTwo.FO = "gl_FragColor";
        CompileTwo.XYZ = ".xyz";
        CompileTwo.XY = ".xy";
        CompileTwo.X = ".x";
        CompileTwo.Y = ".y";
        CompileTwo.Z = ".z";
        CompileTwo.W = ".w";
        CompileTwo.ZW = ".zw";
        CompileTwo.MOV = "mov";
        //public static ONE:string = "1";
        CompileTwo.ONE_FLOAT = "1.0";
        CompileTwo.ZERO = "[0]";
        CompileTwo.ONE = "[1]";
        CompileTwo.TWO = "[2]";
        CompileTwo.TWO_FLOAT = "2.0";
        CompileTwo.THREE = "3";
        CompileTwo.FOUR = "4";
        CompileTwo.LN = "\n";
        CompileTwo.texType = "<2d,linear,repeat>";
        CompileTwo.TEX_2D = "2d";
        //  public static TEX_CUBE: string = "cube";
        CompileTwo.TEX_LINEAR = "linear";
        CompileTwo.TEX_NEAREST = "nearest";
        CompileTwo.TEX_WRAP_REPEAT = "repeat";
        CompileTwo.TEX_WRAP_CLAMP = "clamp";
        CompileTwo.LEFT_BRACKET = "<";
        CompileTwo.RIGHT_BRACKET = ">";
        CompileTwo.texCubeType = "<cube,clamp,linear,mipnone>";
        CompileTwo.TEX = "tex";
        CompileTwo.ADD = "add";
        CompileTwo.SUB = "sub";
        CompileTwo.MUL = "mul";
        CompileTwo.DIV = "div";
        CompileTwo.ADD_MATH = "+";
        CompileTwo.SUB_MATH = "-";
        CompileTwo.MUL_MATH = "*";
        CompileTwo.MUL_EQU_MATH = "*=";
        CompileTwo.DIV_MATH = "/";
        CompileTwo.RCP = "rcp";
        CompileTwo.MIN = "min";
        CompileTwo.MAX = "max";
        CompileTwo.FRC = "frc";
        CompileTwo.SQT = "sqt";
        CompileTwo.RSQ = "rsq";
        CompileTwo.POW = "pow";
        CompileTwo.LOG = "log";
        CompileTwo.EXP = "exp";
        CompileTwo.NRM = "normalize";
        CompileTwo.SIN = "sin";
        CompileTwo.COS = "cos";
        CompileTwo.CRS = "crs";
        CompileTwo.DP3 = "dp3";
        CompileTwo.DOT = "dot";
        CompileTwo.DP4 = "dp4";
        CompileTwo.ABS = "abs";
        CompileTwo.NEG = "neg";
        CompileTwo.SAT = "sat";
        CompileTwo.LERP = "lerp";
        CompileTwo.KIL = "kil";
        CompileTwo.M33 = "m33";
        CompileTwo.VEC4 = "vec4";
        CompileTwo.VEC3 = "vec3";
        CompileTwo.VEC2 = "vec2";
        CompileTwo.EQU = "=";
        CompileTwo.texture2D = "texture2D";
        CompileTwo.textureCube = "textureCube";
        CompileTwo.LEFT_PARENTH = "(";
        CompileTwo.RIGHT_PARENTH = ")";
        CompileTwo.DEFAULT_VEC4 = "vec4(0,0,0,1)";
        CompileTwo.MIX = "mix";
        CompileTwo.REFLECT = "reflect";
        CompileTwo.IF = "if";
        CompileTwo.DISCARD = "{discard;}";
        CompileTwo.scalelight = "scalelight";
        return CompileTwo;
    }());
    materialui.CompileTwo = CompileTwo;
})(materialui || (materialui = {}));
//# sourceMappingURL=CompileTwo.js.map