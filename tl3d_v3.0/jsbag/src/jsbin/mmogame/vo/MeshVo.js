var BaoshiMeshVo = /** @class */ (function () {
    function BaoshiMeshVo() {
    }
    return BaoshiMeshVo;
}());
var EquMeshVo = /** @class */ (function () {
    function EquMeshVo() {
        var num = float2int(EquMeshVo.nameArr.length * Math.random());
        this.name = EquMeshVo.nameArr[num];
        this.zl = float2int(Math.random() * 99999);
        this.zbpj = float2int(Math.random() * 99);
        this.qhdj = float2int(Math.random() * 99);
        this.jcgj = float2int(Math.random() * 99999);
        this.qhgj = float2int(Math.random() * 99999);
        this.txt0 = String(float2int(Math.random() * 100));
        this.txt1 = String(float2int(Math.random() * 100)) + "/" + String(float2int(Math.random() * 100));
        this.txt2 = String(float2int(Math.random() * 999));
        this.txt3 = String(float2int(Math.random() * 999));
        this.txt4 = String(float2int(Math.random() * 100));
        this.txt5 = String(float2int(Math.random() * 100)) + "/" + String(float2int(Math.random() * 100));
        this.txt6 = String(float2int(Math.random() * 999));
        this.txt7 = String(float2int(Math.random() * 999));
        this.bigIconUrl = "ui/eqicon/qi00" + float2int(Math.random() * 4) + ".png";
    }
    EquMeshVo.nameArr = ["铁鞭", "石子镖", "流星锤", "金锁甲", "网羽", "绝刃"];
    return EquMeshVo;
}());
var ChengjiuMeshVo = /** @class */ (function () {
    function ChengjiuMeshVo() {
    }
    return ChengjiuMeshVo;
}());
var RoleMeshVo = /** @class */ (function () {
    function RoleMeshVo() {
    }
    return RoleMeshVo;
}());
//# sourceMappingURL=MeshVo.js.map