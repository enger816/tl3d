var Pan3d;
(function (Pan3d) {
    var ObjectDef = /** @class */ (function () {
        function ObjectDef() {
        }
        ObjectDef.getPrefix = function (s) {
            return s.charAt(0);
        };
        ObjectDef.getGUIDIndex = function (s) {
            var idx = s.indexOf(".");
            idx = idx > 0 ? idx - 1 : Number.MAX_VALUE;
            return Number(s.substr(1, idx));
        };
        ObjectDef.testUG = function (u, g) {
            var idx = u.indexOf(".");
            if (idx != -1) {
                var s = u.substr(idx + 1);
                return s == g;
            }
            return false;
        };
        ObjectDef.MAP = "M";
        ObjectDef.UNIT = "U";
        ObjectDef.STRENGTH = "B";
        ObjectDef.PLAYER = "p";
        ObjectDef.BAG = "I";
        ObjectDef.FACTION = "L";
        ObjectDef.GROW = "X";
        ObjectDef.INSTANCE = "C";
        ObjectDef.SOCIAL = "s";
        ObjectDef.EMAIL = "g";
        ObjectDef.GLOBEL = "G";
        ObjectDef.QUEST = "Q";
        ObjectDef.LOOT = "O";
        ObjectDef.TEAM = "T";
        ObjectDef.GLOBAL_VALUE = "G.globalvalue";
        ObjectDef.GAME_CONFIG = "G.gameconfig";
        return ObjectDef;
    }());
    Pan3d.ObjectDef = ObjectDef;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ObjectDef.js.map