var Pan3d;
(function (Pan3d) {
    var CharAction = /** @class */ (function () {
        function CharAction() {
        }
        CharAction.STANAD = "stand";
        CharAction.WALK = "walk";
        CharAction.DEATH = "death";
        CharAction.JUMP = "jump";
        CharAction.SIT = "sit";
        CharAction.ATTACK_01 = "attack_01";
        CharAction.ATTACK_02 = "attack_02";
        CharAction.ATTACK_03 = "attack_03";
        CharAction.ATTACK_04 = "attack_04";
        CharAction.ATTACK_05 = "attack_05";
        CharAction.ATTACK_06 = "attack_06";
        CharAction.ATTACK_010 = "attack_010";
        CharAction.ATTACK_020 = "attack_020";
        CharAction.STAND_MOUNT = "stand_mount_01";
        CharAction.WALK_MOUNT = "walk_mount_01";
        CharAction.s_attack_01 = "s_attack_01"; //移动中行走的特殊技能
        return CharAction;
    }());
    Pan3d.CharAction = CharAction;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=CharAction.js.map