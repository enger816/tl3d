var sboss;
(function (sboss) {
    var MeshBossVo = /** @class */ (function () {
        function MeshBossVo() {
            this.targetTime = -1;
        }
        return MeshBossVo;
    }());
    sboss.MeshBossVo = MeshBossVo;
    var SbossModel = /** @class */ (function () {
        function SbossModel() {
        }
        SbossModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new SbossModel();
            }
            return this._instance;
        };
        SbossModel.prototype.getItemData = function () {
            if (!this.itemData) {
                var meshBossItem = this.getMessBossItem();
                this.itemData = new Array;
                for (var i = 0; i < meshBossItem.length; i++) {
                    var $vo = new SListItemData();
                    $vo.id = i;
                    $vo.data = meshBossItem[i];
                    this.itemData.push($vo);
                }
            }
            for (var i = 0; i < this.itemData.length; i++) {
                var $MeshBossVo = this.itemData[i].data;
                var $v = GuidData.globelValue.getFieldMassBoss($MeshBossVo.tb.id - 1);
                $MeshBossVo.state = $v.state;
                $MeshBossVo.time = $v.time;
                if ($MeshBossVo.targetTime == -1) {
                    $MeshBossVo.flag = true;
                    $MeshBossVo.targetTime = $MeshBossVo.time;
                }
                if ($MeshBossVo.targetTime != $MeshBossVo.time) {
                    $MeshBossVo.flag = false;
                    $MeshBossVo.targetTime = $MeshBossVo.time;
                }
            }
            // //console.log("---this.itemData---",this.itemData);
            return this.itemData;
        };
        SbossModel.prototype.getMessBossItem = function () {
            var $tbItem = tb.TB_mass_boss_info.getItem();
            var $ary = new Array;
            for (var i = 0; i < $tbItem.length; i++) {
                var $vo = new MeshBossVo();
                $vo.tb = $tbItem[i];
                $ary.push($vo);
            }
            return $ary;
        };
        SbossModel.prototype.refrishBossItemData = function () {
        };
        SbossModel.prototype.getPersonBossItemData = function () {
            if (!this._pBossItemData) {
                this._pBossItemData = new Array;
                var tabary = tb.Tb_private_boss_info.get_Tb_private_boss_info();
                for (var i = 0; i < tabary.length; i++) {
                    var aa = new PersonBossVo;
                    aa.tabbossinfo = tabary[i];
                    var $vo = new SListItemData();
                    $vo.id = i;
                    $vo.data = aa;
                    this._pBossItemData.push($vo);
                }
            }
            var timeary = GuidData.instanceData.getPersonbosstime();
            for (var i = 0; i < this._pBossItemData.length; i++) {
                var $pBossVo = this._pBossItemData[i].data;
                $pBossVo.openstate = $pBossVo.tabbossinfo.permitLevel <= GuidData.player.getLevel();
                $pBossVo.times = timeary[i];
                if ($pBossVo.targetTime == -1) {
                    $pBossVo.flag = true;
                    $pBossVo.targetTime = $pBossVo.times;
                }
                if ($pBossVo.targetTime != $pBossVo.times) {
                    $pBossVo.flag = false;
                    $pBossVo.targetTime = $pBossVo.times;
                }
            }
            return this._pBossItemData;
        };
        return SbossModel;
    }());
    sboss.SbossModel = SbossModel;
    var PersonBossVo = /** @class */ (function () {
        function PersonBossVo() {
            this._targetTime = -1;
        }
        Object.defineProperty(PersonBossVo.prototype, "targetTime", {
            get: function () {
                return this._targetTime;
            },
            set: function ($val) {
                this._targetTime = $val;
            },
            enumerable: true,
            configurable: true
        });
        //回复时间
        PersonBossVo.prototype.getTime = function () {
            var $massBossCdNum = GameInstance.getGameSecond(this.times);
            if ($massBossCdNum > 0) {
                return getScencdStr($massBossCdNum);
            }
            else {
                return "";
            }
        };
        //当前剩余次数str
        PersonBossVo.prototype.getTims = function () {
            var tims = this.hasTims();
            var $color = tims <= 0 ? ColorType.Redd92200 : ColorType.Brown7a2f21;
            return $color + tims + ColorType.Brown7a2f21 + "/" + this.tabbossinfo.maxTimes;
        };
        //当前剩余次数num
        PersonBossVo.prototype.hasTims = function () {
            var $massBossCdNum = GameInstance.getGameSecond(this.times);
            if ($massBossCdNum > 0) {
                var hastimes = this.tabbossinfo.maxTimes - Math.ceil($massBossCdNum / (this.tabbossinfo.rebornTime * 60));
                return hastimes;
            }
            else {
                return this.tabbossinfo.maxTimes;
            }
        };
        return PersonBossVo;
    }());
    sboss.PersonBossVo = PersonBossVo;
})(sboss || (sboss = {}));
//# sourceMappingURL=SbossModel.js.map