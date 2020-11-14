var RelationManager = /** @class */ (function () {
    function RelationManager() {
        this.attackItem = new Array;
        this.jumpItem = new Array;
    }
    RelationManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new RelationManager();
        }
        return this._instance;
    };
    RelationManager.prototype.refresh = function () {
        this.attackItem.length = 0;
        this.jumpItem.length = 0;
        this.refreshBaseAttackList();
        if (GameInstance.attackTarget) {
            if (this.attackItem.indexOf(GameInstance.attackTarget) == -1) {
                GameInstance.attackTarget = null;
            }
        }
    };
    RelationManager.prototype.findNearAttackMonsterTaget = function () {
        var $dis;
        var $nearattack;
        for (var i = 0; i < this.attackItem.length; i++) {
            var $tempChar = this.attackItem[i];
            if (!$tempChar.isDeath && $tempChar.onStage && $tempChar.unit.isMonster() && !$tempChar.unit.isSkillNpc()) {
                var $tempDis = GameInstance.mainChar.math_distance($tempChar);
                if (isNaN($dis) || $dis > $tempDis) {
                    $dis = $tempDis;
                    $nearattack = $tempChar;
                }
            }
        }
        return $nearattack;
    };
    RelationManager.prototype.findNearAttackPlayerTaget = function () {
        var $dis;
        var $nearattack;
        for (var i = 0; i < this.attackItem.length; i++) {
            var $tempChar = this.attackItem[i];
            if (!$tempChar.isDeath && $tempChar.onStage && $tempChar.unit.isPlayer() && !$tempChar.unit.isSkillNpc() && $tempChar.visible) {
                var $tempDis = GameInstance.mainChar.math_distance($tempChar);
                if (isNaN($dis) || $dis > $tempDis) {
                    $dis = $tempDis;
                    $nearattack = $tempChar;
                }
            }
        }
        return $nearattack;
    };
    RelationManager.prototype.findNearCanAttackScene = function () {
        if (GameInstance.attackTarget && GameInstance.attackTarget.onStage) {
            if (!GameInstance.attackTarget.isDeath) {
                return GameInstance.attackTarget;
            }
        }
        var $temp = this.findNearAttackMonsterTaget();
        if (!$temp) {
            $temp = this.findNearAttackPlayerTaget();
        }
        return $temp;
    };
    RelationManager.prototype.isBuffRoadFind = function () {
        if (GameInstance.mainChar.unit.isBuffRoad()) {
            var $buffGiver = GameInstance.mainChar.unit.buffUnit.getBuffGiverByBuffId(SharedDef.BUFF_ROAR);
            for (var i = 0; i < GameInstance.roleList.length; i++) {
                //console.log(GameInstance.roleList[i].unit.guid)
                if (GameInstance.roleList[i].unit.uintGuid == $buffGiver) {
                    GameInstance.attackTarget == GameInstance.roleList[i];
                    //console.log("锁定攻击对象", $buffGiver);
                    return true;
                }
            }
        }
        return false;
    };
    //找到最近可攻击的对象
    RelationManager.prototype.findNearAttackBySkill = function () {
        if (this.isBuffRoadFind()) {
            return;
        }
        if (GameInstance.attackTarget && GameInstance.attackTarget.onStage) {
            if (!GameInstance.attackTarget.isDeath) {
                return GameInstance.attackTarget;
            }
        }
        var $a = this.findNearAttackMonsterTaget();
        var $b = this.findNearAttackPlayerTaget();
        if ($a && $b) {
            if (GameInstance.mainChar.math_distance($a) < GameInstance.mainChar.math_distance($b)) {
                return $a;
            }
            else {
                return $b;
            }
        }
        else {
            if ($a) {
                return $a;
            }
            if ($b) {
                return $b;
            }
        }
        return null;
    };
    //添加基础攻击列表
    RelationManager.prototype.refreshBaseAttackList = function () {
        if (!GameInstance.mainChar) {
            return;
        }
        var $selfFaction = GameInstance.mainChar.unit.getUnitStringFieldFactionGuid();
        var $selfGroup = GameInstance.mainChar.unit.getUnitStringFieldGroupPeaceId();
        var $fieldNotoriety = GuidData.player.getUnitFieldNotoriety(); //战斗模式
        var mainCharGuid = GameInstance.mainChar.unit.getGuid();
        for (var i = 0; GameInstance.roleList && i < GameInstance.roleList.length; i++) {
            var $tempChar = GameInstance.roleList[i];
            if (!$tempChar.unit) {
                continue;
            }
            if (!$tempChar.unit.isMain) {
                if ($tempChar instanceof ScenePortal) {
                    if ($tempChar.tb.judge == 4) {
                        this.jumpItem.push($tempChar);
                        $tempChar.showName("[ff00ff]");
                    }
                }
                else if ($tempChar.unit.isMonster()) {
                    if ($tempChar.unit.getOwner() != mainCharGuid) {
                        this.attackItem.push($tempChar);
                    }
                }
                else {
                    if ($tempChar.unit.isPlayer()) {
                        if (GuidData.map.is3V3()) {
                            if ($tempChar.unit.getFilevirtualCamp() != GameInstance.mainChar.unit.getFilevirtualCamp()) {
                                this.attackItem.push($tempChar);
                                $tempChar.showBlood(1);
                                $tempChar.showName("[ff0000]");
                                continue;
                            }
                            else {
                                $tempChar.showBlood(2);
                                $tempChar.showName("[00ff00]");
                                continue;
                            }
                        }
                        else {
                            switch ($fieldNotoriety) {
                                case SharedDef.FAMILY_MODE:// 家族模式
                                    if (!$selfFaction || $selfFaction != $tempChar.unit.getUnitStringFieldFactionGuid()) {
                                        this.attackItem.push($tempChar);
                                    }
                                    break;
                                case SharedDef.GROUP_MODE:// 组队
                                    if ($selfGroup != $tempChar.unit.getUnitStringFieldGroupPeaceId()) {
                                        this.attackItem.push($tempChar);
                                        $tempChar.showBlood(2);
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
            }
        }
        if (GuidData.map && (GuidData.map.isXianfu() || GuidData.map.is3V3())) {
            if (GuidData.map.is3V3()) {
                GameInstance.mainChar.showName("[00ff00]");
                GameInstance.mainChar.showBlood(2);
            }
            else {
                GameInstance.mainChar.showBlood(1);
            }
        }
    };
    //对象是否在攻击队列里
    RelationManager.prototype.inAttackItemByChar = function ($tempChar) {
        for (var i = 0; i < this.attackItem.length; i++) {
            if (this.attackItem[i] == $tempChar) {
                return true;
            }
        }
        return false;
    };
    //判断在3V3里是否为对方组
    RelationManager.prototype.In3V3isAttack = function ($tempChar) {
        var $item = GuidData.map.getKuafu3V3DataItem();
        var $selfGrop;
        for (var i = 0; i < $item.length; i++) {
            if ($item[i].name == GuidData.player.getName()) {
                $selfGrop = $item[i].group;
            }
        }
        for (var j = 0; j < $item.length; j++) {
            if ($tempChar.unit.getName() == $item[j].name && $selfGrop != $item[j].group) {
                return true;
            }
        }
        return false;
    };
    return RelationManager;
}());
//# sourceMappingURL=RelationManager.js.map