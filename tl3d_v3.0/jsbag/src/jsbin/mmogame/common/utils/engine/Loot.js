var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Loot = /** @class */ (function (_super) {
    __extends(Loot, _super);
    function Loot(g) {
        if (g === void 0) { g = ""; }
        var _this = _super.call(this, g) || this;
        _this.gridWidth = 0;
        _this.lootCount = 0;
        _this.sceneLootDic = new Object;
        return _this;
    }
    Loot.prototype.ReadFrom = function (flags, bytes, evFilter) {
        if (evFilter === void 0) { evFilter = null; }
        if (_super.prototype.ReadFromCopy.call(this, flags, bytes, evFilter)) {
            //创建包会带路径信息
            if (flags & SyncEvent.OBJ_OPT_NEW) {
                this.onCreated();
            }
        }
        else {
            return false;
        }
        return true;
    };
    Loot.prototype.onCreated = function () {
        // if (!this.sceneChar) {
        //     this.sceneChar = this.getScenePortal();
        //     this.sceneChar.unit = this;
        //     this.sceneChar.setAvatar(8001);
        //     GameInstance.addSceneChar(this.sceneChar);
        // }
        ////console.log("创建Loot",this.guid)
        this.readBaseData();
    };
    Loot.prototype.readBaseData = function () {
        var tx = this.GetUInt16(SharedDef.LOOT_PUBLIC_INT_START_POS, 0);
        var ty = this.GetUInt16(SharedDef.LOOT_PUBLIC_INT_START_POS, 1);
        var ex = this.GetUInt16(SharedDef.LOOT_PUBLIC_INT_END_POS, 0);
        var ey = this.GetUInt16(SharedDef.LOOT_PUBLIC_INT_END_POS, 1);
        this.gridtx = tx;
        this.gridty = ty;
        this.gridWidth = ((ex - tx) >> 1) + 1;
        this.lootCount = (((ex - tx) >> 1) + 1) * (((ey - ty) >> 1) + 1);
        ////console.log("readBaseData",tx,ty,ex,ey)
        this.readAry();
    };
    Loot.prototype.readAry = function () {
        for (var index = 0; index < this.lootCount; ++index) {
            var intstart = SharedDef.LOOT_PUBLIC_INT_BEGIN + index * SharedDef.MAX_LOOT_PUBLIC_INT_FIELD;
            if (intstart < this._uint32_values_len) {
                var entry = this.GetUInt32(intstart + SharedDef.LOOT_PUBLIC_INT_ENTRY);
                if (entry > 0) {
                    var offsetx = index % this.gridWidth;
                    var offsety = Math.floor(index / this.gridWidth);
                    var x = (offsetx << 1) + this.gridtx;
                    var y = (offsety << 1) + this.gridty;
                    if (!this.sceneLootDic[index]) {
                        var sc = this.getSceneLoot();
                        var tb_item = tb.TB_item_template.get_TB_item_template(entry);
                        sc.setAvatar(tb_item.avatar);
                        sc.lootIndex = index;
                        sc.forceRotationY = 180 - Scene_data.gameAngle;
                        sc.gridX = x;
                        sc.gridY = y;
                        sc.unit = this;
                        //console.log("grix----------",x,y,index,this.gridtx,this.gridty,this.gridWidth,this.lootCount)
                        sc.moveToPos2D = new Vector2D(x, y);
                        GameInstance.addSceneChar(sc);
                        this.sceneLootDic[index] = sc;
                        ////console.log("刷掉落物8888888888888888888")
                    }
                }
                else {
                    if (this.sceneLootDic[index]) {
                        var sc = (this.sceneLootDic[index]);
                        GameInstance.removeSceneChar(sc);
                        this.sceneLootDic[index] = null;
                        delete this.sceneLootDic[index];
                    }
                }
            }
        }
    };
    /**拥有者GUID */
    Loot.prototype.getOwnerGuid = function ($idx) {
        return this.GetStr(SharedDef.LOOT_STR_FIELD_BEGIN + $idx * SharedDef.MAX_LOOT_PUBLIC_STR_FIELD + SharedDef.LOOT_PUBLIC_STR_OWNER);
    };
    Loot.prototype.dataUpdate = function ($intMask, $strMask) {
        this.readBaseData();
        // for(var i:number=0;i<this._str_values_len;i++){
        //     //console.log(i + "--" + this.GetStr(i));
        // }
        // //console.log("%%%%%%%%%%%%%%%%%%")
        // var tx: number = this.GetUInt16(SharedDef.LOOT_PUBLIC_INT_START_POS, 0)
        // var ty: number = this.GetUInt16(SharedDef.LOOT_PUBLIC_INT_START_POS, 1)
        // var ex: number = this.GetUInt16(SharedDef.LOOT_PUBLIC_INT_END_POS, 0)
        // var ey: number = this.GetUInt16(SharedDef.LOOT_PUBLIC_INT_END_POS, 1)
        // var width: number = (ex - tx) >> 1;
        // var count: number = ((ex - tx) * (ey - ty)) >> 2;
        // for (var index: number = 0; index < count; ++ index) {
        //     var intstart: number = SharedDef.LOOT_PUBLIC_INT_BEGIN + index * SharedDef.MAX_LOOT_PUBLIC_INT_FIELD;
        //     if (intstart < this._uint32_values_len) {
        //         var entry: number = this.GetUInt32(intstart + SharedDef.LOOT_PUBLIC_INT_ENTRY);
        //         if (entry > 0) {
        //             var offsetx: number = index % width;
        //             var offsety: number = Math.floor(index / width);
        //             var x: number = (offsetx << 1) + tx;
        //             var y: number = (offsety << 1) + ty;
        //             //console.log("entry = ", entry, "x = ", x, "y = ", y);
        //         }
        //     }
        // }
    };
    Loot.prototype.getSceneLoot = function () {
        var char = new SceneLoot();
        //char.setRoleUrl(getRoleUrl(name));
        char.x = 0;
        char.y = 2;
        char.z = 0;
        char.setShadowSize(10);
        return char;
    };
    Loot.prototype.getLootIndxByGuid = function ($str) {
        //O110000100.9.M538.2011
        var $arr = $str.split(".");
        return Number($arr[1]);
    };
    Loot.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        for (var key in this.sceneLootDic) {
            var sc = (this.sceneLootDic[key]);
            if (sc) {
                GameInstance.removeSceneChar(sc);
            }
        }
    };
    return Loot;
}(Unit));
//# sourceMappingURL=Loot.js.map