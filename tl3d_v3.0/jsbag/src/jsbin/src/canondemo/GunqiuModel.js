var GunqiuColorVo = /** @class */ (function () {
    function GunqiuColorVo() {
    }
    return GunqiuColorVo;
}());
var GunqiuModel = /** @class */ (function () {
    function GunqiuModel() {
    }
    GunqiuModel.initData = function (value) {
        this.canonPanel = value;
        this.lightVo = new Pan3d.LightVo();
        this.canonPanel.layaSceneLevel.scene.light = this.lightVo;
        var $colorId = 0;
        $colorId = random(5);
        this.changeSceneColor($colorId);
        Pan3d.Display3DFollowLocusPartilce.waitCdTime = 10;
    };
    GunqiuModel.changeSceneColor = function (value) {
        switch (value) {
            case 0:
                this.makeBaseColor_0();
                break;
            case 1:
                this.makeBaseColor_1();
                break;
            case 2:
                this.makeBaseColor_2();
                break;
            case 3:
                this.makeBaseColor_3();
                break;
            case 4:
                this.makeBaseColor_4();
                break;
            default:
                alert("还没有这组数据");
                break;
        }
    };
    GunqiuModel.makeBaseColor_0 = function () {
        var $vo = new GunqiuColorVo();
        $vo.bgTop = new Pan3d.Vector3D(246 / 255, 220 / 255, 198 / 255);
        $vo.bgBottom = new Pan3d.Vector3D(246 / 255, 200 / 255, 166 / 255);
        $vo.modelcolor = new Pan3d.Vector3D(250 / 255, 220 / 255, 198 / 255);
        this.useColor = $vo;
        var $sunDirect = new Pan3d.Vector3D(0, 1, 0);
        var $sunColor = new Pan3d.Vector3D(30 / 255, 50 / 255, 60 / 255);
        var $ambientColor = new Pan3d.Vector3D(220 / 255, 150 / 255, 100 / 255);
        this.lightVo.setData($sunDirect, $sunColor, $ambientColor);
    };
    GunqiuModel.makeBaseColor_1 = function () {
        var $vo = new GunqiuColorVo();
        $vo.bgTop = new Pan3d.Vector3D(115 / 255, 178 / 255, 168 / 255);
        $vo.bgBottom = new Pan3d.Vector3D(96 / 255, 170 / 255, 220 / 255);
        $vo.modelcolor = new Pan3d.Vector3D(115 / 255, 178 / 255, 168 / 255);
        this.useColor = $vo;
        var $sunNrm = new Pan3d.Vector3D(1, 1, 1);
        $sunNrm.normalize();
        var $sunColor = new Pan3d.Vector3D(40 / 255, 56 / 255, 65 / 255);
        var $ambientColor = new Pan3d.Vector3D(64 / 255, 100 / 255, 110 / 255);
        this.lightVo.setData($sunNrm, $sunColor, $ambientColor);
    };
    GunqiuModel.makeBaseColor_2 = function () {
        var $vo = new GunqiuColorVo();
        $vo.bgTop = new Pan3d.Vector3D(90 / 255, 100 / 255, 160 / 255);
        $vo.bgBottom = new Pan3d.Vector3D(110 / 255, 60 / 255, 180 / 255);
        $vo.modelcolor = new Pan3d.Vector3D(90 / 255, 100 / 255, 160 / 255);
        this.useColor = $vo;
        var $sunNrm = new Pan3d.Vector3D(1, 1, 1);
        $sunNrm.normalize();
        var $sunColor = new Pan3d.Vector3D(35 / 255, 15 / 255, 60 / 255);
        var $ambientColor = new Pan3d.Vector3D(76 / 255, 36 / 255, 126 / 255);
        this.lightVo.setData($sunNrm, $sunColor, $ambientColor);
    };
    GunqiuModel.makeBaseColor_3 = function () {
        var $vo = new GunqiuColorVo();
        $vo.bgTop = new Pan3d.Vector3D(218 / 255, 199 / 255, 219 / 255);
        $vo.bgBottom = new Pan3d.Vector3D(233 / 255, 201 / 255, 202 / 255);
        $vo.modelcolor = new Pan3d.Vector3D(218 / 255, 199 / 255, 219 / 255);
        this.useColor = $vo;
        var $sunNrm = new Pan3d.Vector3D(1, 1, 1);
        $sunNrm.normalize();
        var $sunColor = new Pan3d.Vector3D(13 / 255, 35 / 255, 39 / 255);
        var $ambientColor = new Pan3d.Vector3D(226 / 255, 167 / 255, 159 / 255);
        this.lightVo.setData($sunNrm, $sunColor, $ambientColor);
    };
    GunqiuModel.makeBaseColor_4 = function () {
        var $vo = new GunqiuColorVo();
        $vo.bgTop = new Pan3d.Vector3D(82 / 255, 82 / 255, 82 / 255);
        $vo.bgBottom = new Pan3d.Vector3D(55 / 255, 55 / 255, 55 / 255);
        $vo.modelcolor = new Pan3d.Vector3D(82 / 255, 82 / 255, 82 / 255);
        this.useColor = $vo;
        var $sunNrm = new Pan3d.Vector3D(-1, 1, -1);
        $sunNrm.normalize();
        var $sunColor = new Pan3d.Vector3D(36 / 255, 36 / 255, 36 / 255);
        var $ambientColor = new Pan3d.Vector3D(39 / 255, 39 / 255, 39 / 255);
        this.lightVo.setData($sunNrm, $sunColor, $ambientColor);
    };
    return GunqiuModel;
}());
//# sourceMappingURL=GunqiuModel.js.map