var game;
(function (game) {
    var Vector3D = Pan3d.Vector3D;
    var LightVo = Pan3d.LightVo;
    var GameSceneColorVo = /** @class */ (function () {
        function GameSceneColorVo() {
        }
        GameSceneColorVo.prototype.clone = function () {
            var $vo = new GameSceneColorVo;
            $vo.bgTop = this.bgTop.clone();
            $vo.bgBottom = this.bgBottom.clone();
            $vo.modelcolor = this.modelcolor.clone();
            return $vo;
        };
        return GameSceneColorVo;
    }());
    game.GameSceneColorVo = GameSceneColorVo;
    var GameSceneColor = /** @class */ (function () {
        function GameSceneColor() {
        }
        GameSceneColor.makeBaseColor = function (value) {
            var $arr = this.makeTo4();
            switch (value) {
                case 1:
                    $arr = this.makeTo1();
                    break;
                case 2:
                    $arr = this.makeTo2();
                    break;
                case 3:
                    $arr = this.makeTo3();
                    break;
                case 4:
                    $arr = this.makeTo4();
                    break;
                default:
                    console.log("没有颜色类型", value);
                    break;
            }
            //  $arr = this.makeTo3();
            this.tweenToColor($arr[0], $arr[1]);
        };
        GameSceneColor.makeTo1 = function () {
            var $sceneColorVo = new GameSceneColorVo();
            var $lightVo = new LightVo();
            $sceneColorVo.bgTop = new Vector3D(115 / 255, 178 / 255, 168 / 255);
            $sceneColorVo.bgBottom = new Vector3D(96 / 255, 170 / 255, 220 / 255);
            $sceneColorVo.modelcolor = new Vector3D(115 / 255, 178 / 255, 168 / 255);
            var $sunDirect = new Vector3D(0, 1, 0);
            var $sunColor = new Vector3D(40 / 255, 56 / 255, 65 / 255);
            var $ambientColor = new Vector3D(64 / 255, 100 / 255, 110 / 255);
            $lightVo.setData($sunDirect, $sunColor, $ambientColor);
            return [$sceneColorVo, $lightVo];
        };
        GameSceneColor.makeTo2 = function () {
            var $sceneColorVo = new GameSceneColorVo();
            var $lightVo = new LightVo();
            $sceneColorVo.bgTop = new Vector3D(90 / 255, 100 / 255, 160 / 255);
            $sceneColorVo.bgBottom = new Vector3D(110 / 255, 60 / 255, 180 / 255);
            $sceneColorVo.modelcolor = new Vector3D(94 / 255, 92 / 255, 164 / 255);
            var $sunDirect = new Vector3D(0, 1, 0);
            var $sunColor = new Vector3D(35 / 255, 15 / 255, 60 / 255);
            var $ambientColor = new Vector3D(76 / 255, 36 / 255, 126 / 255);
            $lightVo.setData($sunDirect, $sunColor, $ambientColor);
            return [$sceneColorVo, $lightVo];
        };
        GameSceneColor.makeTo3 = function () {
            var $sceneColorVo = new GameSceneColorVo();
            var $lightVo = new LightVo();
            $sceneColorVo.bgTop = new Vector3D(218 / 255, 199 / 255, 219 / 255);
            $sceneColorVo.bgBottom = new Vector3D(233 / 255, 201 / 255, 202 / 255);
            $sceneColorVo.modelcolor = new Vector3D(218 / 255, 199 / 255, 219 / 255);
            var $sunDirect = new Vector3D(0, 1, 0);
            var $sunColor = new Vector3D(13 / 255, 35 / 255, 39 / 255);
            var $ambientColor = new Vector3D(226 / 255, 167 / 255, 159 / 255);
            $lightVo.setData($sunDirect, $sunColor, $ambientColor);
            return [$sceneColorVo, $lightVo];
        };
        GameSceneColor.makeTo4 = function () {
            var $sceneColorVo = new GameSceneColorVo();
            var $lightVo = new LightVo();
            $sceneColorVo.bgTop = new Vector3D(82 / 255, 82 / 255, 82 / 255);
            $sceneColorVo.bgBottom = new Vector3D(55 / 255, 55 / 255, 55 / 255);
            $sceneColorVo.modelcolor = new Vector3D(76 / 255, 76 / 255, 76 / 255);
            var $sunDirect = new Vector3D(0, 1, 0);
            var $sunColor = new Vector3D(50 / 255, 50 / 255, 50 / 255);
            var $ambientColor = new Vector3D(30 / 255, 30 / 255, 30 / 255);
            $lightVo.setData($sunDirect, $sunColor, $ambientColor);
            return [$sceneColorVo, $lightVo];
        };
        GameSceneColor.tweenToColor = function ($toSceneColor, $tolightVo) {
            this.toSceneColor = $toSceneColor;
            this.tolightVo = $tolightVo;
            this.statColor = game.GameDataModel.useColor.clone();
            this.statLight = game.GameDataModel.lightVo.clone();
            this._speedNum = 0;
            TweenLite.to(this, 0.3, { speedNum: 1 });
        };
        Object.defineProperty(GameSceneColor, "speedNum", {
            get: function () {
                return this._speedNum;
            },
            set: function (value) {
                this._speedNum = value;
                game.GameDataModel.useColor.bgTop.x = this.statColor.bgTop.x + (this.toSceneColor.bgTop.x - this.statColor.bgTop.x) * this._speedNum;
                game.GameDataModel.useColor.bgTop.y = this.statColor.bgTop.y + (this.toSceneColor.bgTop.y - this.statColor.bgTop.y) * this._speedNum;
                game.GameDataModel.useColor.bgTop.z = this.statColor.bgTop.z + (this.toSceneColor.bgTop.z - this.statColor.bgTop.z) * this._speedNum;
                game.GameDataModel.useColor.bgBottom.x = this.statColor.bgBottom.x + (this.toSceneColor.bgBottom.x - this.statColor.bgBottom.x) * this._speedNum;
                game.GameDataModel.useColor.bgBottom.y = this.statColor.bgBottom.y + (this.toSceneColor.bgBottom.y - this.statColor.bgBottom.y) * this._speedNum;
                game.GameDataModel.useColor.bgBottom.z = this.statColor.bgBottom.z + (this.toSceneColor.bgBottom.z - this.statColor.bgBottom.z) * this._speedNum;
                game.GameDataModel.useColor.modelcolor.x = this.statColor.modelcolor.x + (this.toSceneColor.modelcolor.x - this.statColor.modelcolor.x) * this._speedNum;
                game.GameDataModel.useColor.modelcolor.y = this.statColor.modelcolor.y + (this.toSceneColor.modelcolor.y - this.statColor.modelcolor.y) * this._speedNum;
                game.GameDataModel.useColor.modelcolor.z = this.statColor.modelcolor.z + (this.toSceneColor.modelcolor.z - this.statColor.modelcolor.z) * this._speedNum;
                game.GameDataModel.lightVo.ambientColor[0] = this.statLight.ambientColor[0] + (this.tolightVo.ambientColor[0] - this.statLight.ambientColor[0]) * this._speedNum;
                game.GameDataModel.lightVo.ambientColor[1] = this.statLight.ambientColor[1] + (this.tolightVo.ambientColor[1] - this.statLight.ambientColor[1]) * this._speedNum;
                game.GameDataModel.lightVo.ambientColor[2] = this.statLight.ambientColor[2] + (this.tolightVo.ambientColor[2] - this.statLight.ambientColor[2]) * this._speedNum;
                game.GameDataModel.lightVo.sunColor[0] = this.statLight.sunColor[0] + (this.tolightVo.sunColor[0] - this.statLight.sunColor[0]) * this._speedNum;
                game.GameDataModel.lightVo.sunColor[1] = this.statLight.sunColor[1] + (this.tolightVo.sunColor[1] - this.statLight.sunColor[1]) * this._speedNum;
                game.GameDataModel.lightVo.sunColor[2] = this.statLight.sunColor[2] + (this.tolightVo.sunColor[2] - this.statLight.sunColor[2]) * this._speedNum;
                game.GameDataModel.lightVo.ambientColor[0] = this.statLight.ambientColor[0] + (this.tolightVo.ambientColor[0] - this.statLight.ambientColor[0]) * this._speedNum;
                game.GameDataModel.lightVo.ambientColor[1] = this.statLight.ambientColor[1] + (this.tolightVo.ambientColor[1] - this.statLight.ambientColor[1]) * this._speedNum;
                game.GameDataModel.lightVo.ambientColor[2] = this.statLight.ambientColor[2] + (this.tolightVo.ambientColor[2] - this.statLight.ambientColor[2]) * this._speedNum;
            },
            enumerable: true,
            configurable: true
        });
        return GameSceneColor;
    }());
    game.GameSceneColor = GameSceneColor;
})(game || (game = {}));
//# sourceMappingURL=GameSceneColor.js.map