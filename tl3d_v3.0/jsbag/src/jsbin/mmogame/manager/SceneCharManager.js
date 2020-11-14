var SceneCharManager = /** @class */ (function () {
    function SceneCharManager() {
        this.roBootDic = new Object;
        var maxID = TableData.getInstance().getTabMaxID(TableData.tb_char_info);
        for (var i = 1; i <= maxID; i++) {
            var obj = TableData.getInstance().getData(TableData.tb_char_info, i);
            this.roBootDic[obj.dummy_entry] = true;
        }
    }
    SceneCharManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new SceneCharManager();
        }
        return this._instance;
    };
    SceneCharManager.prototype.testRoBoot = function ($entry) {
        return Boolean(this.roBootDic[$entry]);
    };
    SceneCharManager.prototype.creatChar = function ($unit) {
        var utype = $unit.getTypeID();
        var roleAvatar = 0;
        var sc;
        var roboot = false;
        if (utype == SharedDef.TYPEID_UNIT) {
            roleAvatar = $unit.getAvatar();
            var entry = $unit.getEntry();
            roboot = this.testRoBoot(entry);
            if (roleAvatar == 0) {
                roleAvatar = tb.TB_creature_template.get_TB_creature_template(entry).avatar;
            }
            else if (!roboot) {
                roleAvatar = tb.TB_item_template.getAvatarById(roleAvatar);
            }
            sc = this.getSceneChar();
        }
        else if (utype == SharedDef.TYPEID_PLAYER) {
            //roleAvatar = $unit.getTabelAvater($unit.getAvatar())
            sc = this.getSceneChar();
        }
        else if (utype == SharedDef.TYPEID_GAMEOBJECT) {
            var entry = $unit.getEntry();
            var $tb_gameobject_template = tb.TB_gameobject_template.get_TB_gameobject_template(entry);
            roleAvatar = $tb_gameobject_template.avatar;
            var judge = $tb_gameobject_template.judge;
            if (judge == 1) {
                sc = this.getCollection();
                sc.setSpecialType(judge);
            }
            else {
                sc = this.getScenePortal();
                sc.tb = $tb_gameobject_template;
            }
        }
        if (!sc) {
            //console.log("没创建正确的对象")
        }
        $unit.sceneChar = sc;
        sc.unit = $unit;
        if (ObjectDef.testUG($unit.guid, GuidData.player.guid)) {
            $unit.isMain = true;
            BloodManager.getInstance().clearOneTemp();
            GameInstance.mainChar = sc;
            Scene_data.cam3D.lookAtTarget = GameInstance.mainChar;
            sc.setHp(sc.unit.getHp());
            // this.sendGm();
            //console.log("角色创建自己==========>", $unit.guid, sc.unit.getHp(), sc.unit.getMaxHp());
            //console.log("----------------------------------");
            if (GameInstance.mainChar.unit.getGuid() == GameInstance.smsgFullizehp) {
                console.log("设置满血");
                GameInstance.mainChar.unit.setHp(GameInstance.mainChar.unit.getMaxHp());
                GameInstance.smsgFullizehp = null;
            }
        }
        if (utype == SharedDef.TYPEID_PLAYER || roboot) {
            sc.setAvatarExterior();
            sc.setWeaponDivine();
        }
        else {
            sc.setAvatar(roleAvatar);
        }
        GameInstance.addSceneChar(sc);
        sc.setMount();
        sc.setWing();
        sc.showName();
        if (sc.unit.isPlayer()) {
            sc.refreshTittle();
            sc.showBlood(0);
        }
        else {
            sc.showBlood(1);
        }
        sc.refreshUnitFieldByte();
        if ($unit.isSkillNpc()) {
            sc.meshVisible = false;
        }
        ////console.log("创建角色");
        return true;
    };
    SceneCharManager.prototype.sendGm = function () {
        if (GuidData.player && GameData.initGMbg) {
            // NetManager.getInstance().protocolos.chat_world(GuidData.player.getGuid(), 0, GuidData.player.getName(), "@CUSTOM");
            if (GameStart.outNet) {
                // GameControlManager.sendGmCom("@CUSTOM")
            }
            GameData.initGMbg = false;
        }
    };
    SceneCharManager.prototype.removeSceneChar = function ($sc) {
        if ($sc.unit && $sc.unit.isMain) {
            //console.log("移除自己")
        }
        GameInstance.removeSceneChar($sc);
        $sc.destory();
    };
    SceneCharManager.prototype.getSceneChar = function () {
        var char = new SceneChar();
        //char.setRoleUrl(getRoleUrl(name));
        char.x = 0;
        char.y = 5;
        char.z = 0;
        char.setShadowSize(10);
        return char;
    };
    SceneCharManager.prototype.getScenePortal = function () {
        var char = new ScenePortal();
        //char.setRoleUrl(getRoleUrl(name));
        char.x = 0;
        char.y = 5;
        char.z = 0;
        char.setShadowSize(10);
        return char;
    };
    SceneCharManager.prototype.getCollection = function () {
        var char = new SceneCollection();
        char.x = 0;
        char.y = 5;
        char.z = 0;
        char.setShadowSize(10);
        return char;
    };
    SceneCharManager.prototype.addWarningEffectChar = function ($pos, $alarmEffect) {
        var $sc = new WarningEffectChar();
        $sc.x = $pos.x;
        $sc.y = $pos.y;
        $sc.z = $pos.z;
        $sc.forceRotationY = $pos.w * 180 / Math.PI + 90;
        SceneManager.getInstance().addMovieDisplay($sc);
        $sc.setSpellName($alarmEffect);
        return $sc;
    };
    SceneCharManager.prototype.getSceneBaseCollection = function () {
        var char = new SceneBaseCollection();
        char.x = 0;
        char.y = 5;
        char.z = 0;
        char.setShadowSize(10);
        return char;
    };
    SceneCharManager.prototype.getSceneCharByUID = function ($id) {
        var unit = GuidObjManager.getInstance().getUnitByID($id);
        if (unit) {
            return unit.sceneChar;
        }
        return null;
    };
    return SceneCharManager;
}());
//# sourceMappingURL=SceneCharManager.js.map