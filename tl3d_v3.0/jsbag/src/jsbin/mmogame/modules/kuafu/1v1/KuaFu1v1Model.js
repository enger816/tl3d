var kuafu;
(function (kuafu) {
    var KuaFu1v1BangData = /** @class */ (function () {
        function KuaFu1v1BangData() {
        }
        return KuaFu1v1BangData;
    }());
    kuafu.KuaFu1v1BangData = KuaFu1v1BangData;
    var Scene1v1Data = /** @class */ (function () {
        function Scene1v1Data() {
        }
        return Scene1v1Data;
    }());
    kuafu.Scene1v1Data = Scene1v1Data;
    var KuaFu1v1Model = /** @class */ (function () {
        function KuaFu1v1Model() {
            this.tb_doujiantai_base = tb.TB_doujiantai_base.get_TB_doujiantai_baseById(1);
        }
        KuaFu1v1Model.getInstance = function () {
            if (!this._instance) {
                this._instance = new KuaFu1v1Model();
            }
            return this._instance;
        };
        KuaFu1v1Model.prototype.get1V1sceneData = function () {
            var $arr = new Array;
            for (var i = 0; i < GameInstance.roleList.length; i++) {
                $arr.push(this.getScene1v1DataByUnit(GameInstance.roleList[i].unit));
            }
            return $arr;
        };
        KuaFu1v1Model.prototype.getScene1v1DataByUnit = function ($unit) {
            var vo = new Scene1v1Data();
            vo.charType = $unit.getCharType();
            vo.name = $unit.getName();
            vo.force = $unit.getForce();
            vo.level = $unit.getLevel();
            vo.vip = $unit.getVipLevel();
            vo.life = $unit.getHp() / $unit.getMaxHp();
            return vo;
        };
        KuaFu1v1Model.prototype.setFullHp = function () {
            for (var i = 0; i < GameInstance.roleList.length; i++) {
                GameInstance.roleList[i].setHp(GameInstance.roleList[i].unit.getMaxHp());
                //console.log(GameInstance.roleList[i].unit.getHp(), GameInstance.roleList[i].unit.getMaxHp());
                GameInstance.roleList[i].refreshHP();
            }
        };
        return KuaFu1v1Model;
    }());
    kuafu.KuaFu1v1Model = KuaFu1v1Model;
})(kuafu || (kuafu = {}));
//# sourceMappingURL=KuaFu1v1Model.js.map