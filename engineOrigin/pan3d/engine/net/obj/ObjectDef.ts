module Pan3d {
    export class ObjectDef {
        public static MAP: string = "M";
        public static UNIT: string = "U";
        public static STRENGTH: string = "B"
        public static PLAYER: string = "p";
        public static BAG: string = "I";
        public static FACTION: string = "L"
        public static GROW: string = "X";
        public static INSTANCE: string = "C";
        public static SOCIAL: string = "s";
        public static EMAIL: string = "g";
        public static GLOBEL: string = "G";
        public static QUEST: string = "Q";
        public static LOOT: string = "O";
        public static TEAM: string = "T";

        public static GLOBAL_VALUE: string = "G.globalvalue"
        public static GAME_CONFIG: string = "G.gameconfig"

        public static getPrefix(s: string): string {
            return s.charAt(0);
        }

        public static getGUIDIndex(s: string): number {
            var idx: number = s.indexOf(".");
            idx = idx > 0 ? idx - 1 : Number.MAX_VALUE;
            return Number(s.substr(1, idx));
        }


        public static testUG(u: string, g: string): boolean {
            var idx: number = u.indexOf(".");
            if (idx != -1) {
                var s: string = u.substr(idx + 1);
                return s == g;
            }
            return false;
        }
    }
}