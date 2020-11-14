var materialui;
(function (materialui) {
    var NodeTree = /** @class */ (function () {
        function NodeTree() {
            this.priority = -1;
            this.id = -1;
            this.inputVec = new Array;
            this.outputVec = new Array;
        }
        NodeTree.prototype.addInput = function ($in) {
            var initem = $in;
            if (!initem) {
                throw new Error("转换失败");
            }
            this.inputVec.push(initem);
            initem.node = this;
            this.refreshID();
        };
        NodeTree.prototype.removeInput = function ($in) {
            for (var i = 0; i < this.inputVec.length; i++) {
                if (this.inputVec[i] == $in) {
                    this.inputVec.splice(i, 1);
                    break;
                }
            }
            this.refreshID();
        };
        NodeTree.prototype.addOutput = function ($in) {
            var initem = $in;
            if (!initem) {
                throw new Error("转换失败");
            }
            this.outputVec.push(initem);
            initem.node = this;
            this.refreshID();
        };
        NodeTree.prototype.removeOutput = function ($out) {
            for (var i = 0; i < this.outputVec.length; i++) {
                if (this.outputVec[i] == $out) {
                    this.outputVec.splice(i, 1);
                    break;
                }
            }
            this.refreshID();
        };
        NodeTree.getID = function ($constID) {
            if (NodeTree.jsMode) {
                return "[" + $constID + "]";
            }
            else {
                return String($constID);
            }
        };
        NodeTree.prototype.refreshID = function () {
            for (var i = 0; i < this.inputVec.length; i++) {
                this.inputVec[i].id = i;
            }
            for (i = 0; i < this.outputVec.length; i++) {
                this.outputVec[i].id = i;
            }
        };
        NodeTree.prototype.getObj = function () {
            var obj = new Object;
            obj.id = this.id;
            obj.type = this.type;
            obj.data = this.ui.getData();
            var inAry = new Array;
            for (var i = 0; i < this.inputVec.length; i++) {
                inAry.push(this.inputVec[i].getObj());
            }
            obj.inAry = inAry;
            var outAry = new Array;
            for (i = 0; i < this.outputVec.length; i++) {
                outAry.push(this.outputVec[i].getObj());
            }
            obj.outAry = outAry;
            return obj;
        };
        Object.defineProperty(NodeTree.prototype, "isDynamic", {
            get: function () {
                return this._isDynamic;
            },
            set: function (value) {
                this._isDynamic = value;
            },
            enumerable: true,
            configurable: true
        });
        NodeTree.prototype.checkInput = function () {
            for (var i = 0; i < this.inputVec.length; i++) {
                if (!this.inputVec[i].parentNodeItem) {
                    return false;
                }
            }
            return true;
        };
        NodeTree.prototype.getComponentID = function ($id) {
            if ($id == 0) {
                return materialui.CompileTwo.FT + this.regResultTemp.id + ".xyz";
            }
            else if ($id == 1) {
                return materialui.CompileTwo.FT + this.regResultTemp.id + ".x";
            }
            else if ($id == 2) {
                return materialui.CompileTwo.FT + this.regResultTemp.id + ".y";
            }
            else if ($id == 3) {
                return materialui.CompileTwo.FT + this.regResultTemp.id + ".z";
            }
            else if ($id == 4) {
                return materialui.CompileTwo.FT + this.regResultTemp.id + ".w";
            }
            else {
                return materialui.CompileTwo.FT + this.regResultTemp.id;
            }
        };
        NodeTree.prototype.releaseUse = function () {
            var allCompilde = true;
            for (var i = 0; i < this.outputVec.length; i++) {
                var sunAry = this.outputVec[i].sunNodeItems;
                var breakAble = false;
                for (var j = 0; j < sunAry.length; j++) {
                    if (!sunAry[j].hasCompiled) {
                        allCompilde = false;
                        breakAble = true;
                        break;
                    }
                }
                if (breakAble) {
                    break;
                }
            }
            if (allCompilde) {
                if (this.regResultTemp) {
                    this.regResultTemp.inUse = false;
                }
            }
        };
        NodeTree.TEX = "tex";
        NodeTree.TEX3D = "tex3d";
        NodeTree.TEXCUBE = "texCube";
        NodeTree.OP = "op";
        NodeTree.ADD = "add";
        NodeTree.SUB = "sub";
        NodeTree.MUL = "mul";
        NodeTree.FUN = "fun";
        NodeTree.DIV = "div";
        NodeTree.RCP = "rcp";
        NodeTree.MIN = "min";
        NodeTree.MAX = "max";
        NodeTree.FRC = "frc";
        NodeTree.SQT = "sqt";
        NodeTree.RSQ = "rsq";
        NodeTree.POW = "pow";
        NodeTree.LOG = "log";
        NodeTree.EXP = "exp";
        NodeTree.NRM = "nrm";
        NodeTree.SIN = "sin";
        NodeTree.COS = "cos";
        NodeTree.CRS = "crs";
        NodeTree.DP3 = "dp3";
        NodeTree.DP4 = "dp4";
        NodeTree.ABS = "abs";
        NodeTree.NEG = "neg";
        NodeTree.SAT = "sat";
        NodeTree.LERP = "lerp";
        NodeTree.VEC3 = "vec3";
        NodeTree.VEC2 = "vec2";
        NodeTree.FLOAT = "float";
        NodeTree.NORMAL = "normal";
        NodeTree.TIME = "time";
        NodeTree.TEXCOORD = "texcoord";
        NodeTree.TEXCOORDLIGHT = "texlightuv";
        NodeTree.DYNVEC3 = "dynvec3";
        NodeTree.PTCOLOR = "ptColor";
        NodeTree.VERCOLOR = "verColor";
        NodeTree.HEIGHTINFO = "heightinfo";
        NodeTree.FRESNEL = "fresnel";
        NodeTree.REFRACTION = "refraction";
        NodeTree.PANNER = "panner";
        NodeTree.jsMode = false;
        return NodeTree;
    }());
    materialui.NodeTree = NodeTree;
})(materialui || (materialui = {}));
//# sourceMappingURL=NodeTree.js.map