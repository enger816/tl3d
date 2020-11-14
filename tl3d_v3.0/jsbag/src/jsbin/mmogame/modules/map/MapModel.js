var map;
(function (map) {
    var MapMenuVo = /** @class */ (function () {
        function MapMenuVo() {
        }
        return MapMenuVo;
    }());
    map.MapMenuVo = MapMenuVo;
    //export class WorldMapVo {
    //    public id: number
    //    public pos: Vector2D
    //    public level: number
    //    public constructor($pos: Vector2D = null, $level: number = 0) {
    //        this.pos = $pos
    //        this.level = $level
    //    }
    //    public static getBaseItem(): Array<WorldMapVo> {
    //        var aaaa: Array<tb.TB_world_map> = tb.TB_world_map.getItem();
    //        //console.log(aaaa)
    //        alert(aaaa)
    //        var $arr: Array<WorldMapVo> = new Array()
    //        $arr.push(new WorldMapVo(new Vector2D(555, 208), 1))
    //        $arr.push(new WorldMapVo(new Vector2D(671, 151), 10))
    //        $arr.push(new WorldMapVo(new Vector2D(495, 300), 20))
    //        $arr.push(new WorldMapVo(new Vector2D(369, 221), 80))
    //        $arr.push(new WorldMapVo(new Vector2D(427, 80), 99))
    //        return $arr;
    //    }
    //}
    var MapServerVo = /** @class */ (function () {
        function MapServerVo() {
        }
        return MapServerVo;
    }());
    map.MapServerVo = MapServerVo;
    var MapModel = /** @class */ (function () {
        function MapModel() {
            this.lockItem = [false, true, true, true];
            this._dic = new Object;
        }
        MapModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new MapModel();
            }
            return this._instance;
        };
        MapModel.prototype.refresh = function () {
        };
        MapModel.prototype.getxmlList = function () {
            var $mapId = GuidData.map.getMapID();
            //临时写的的，
            if (!this._dic[$mapId]) {
                this._dic[$mapId] = new Array;
                var $tb_map_navigation = tb.TB_map_navigation.get_TB_map_navigation($mapId);
                for (var i = 0; i < $tb_map_navigation.navi.length; i++) {
                    var e = tb.TB_map_object.get_TB_map_object($tb_map_navigation.navi[i]);
                    var $menuVo = new MapMenuVo();
                    $menuVo.data = e;
                    this._dic[$mapId].push($menuVo);
                }
            }
            return this._dic[$mapId];
        };
        MapModel.prototype.getMenuListArr = function () {
            var $backArr = new Array();
            this.addTempByType(3, $backArr);
            this.addTempByType(2, $backArr);
            this.addTempByType(0, $backArr);
            return $backArr;
        };
        MapModel.prototype.addTempByType = function (value, $list) {
            var $has = false;
            var $arr = this.getxmlList();
            for (var i = 0; i < $arr.length; i++) {
                if ($arr[i].data.type == value) {
                    $has = true;
                }
            }
            if ($has) {
                var $menu = new MapMenuVo();
                $menu.menuType = value;
                $menu.lock = this.lockItem[value];
                $list.push($menu);
                for (var i = 0; i < $arr.length && $menu.lock; i++) {
                    if ($arr[i].data.type == value) {
                        $list.push($arr[i]);
                    }
                }
            }
        };
        MapModel.tabType = 0;
        return MapModel;
    }());
    map.MapModel = MapModel;
})(map || (map = {}));
//# sourceMappingURL=MapModel.js.map