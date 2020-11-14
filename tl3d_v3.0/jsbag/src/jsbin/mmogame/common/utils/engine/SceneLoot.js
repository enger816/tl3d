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
var SceneLoot = /** @class */ (function (_super) {
    __extends(SceneLoot, _super);
    function SceneLoot() {
        var _this = _super.call(this) || this;
        _this.shadow = true;
        return _this;
    }
    SceneLoot.prototype.removeStage = function () {
        _super.prototype.removeStage.call(this);
    };
    SceneLoot.prototype.showBlood = function ($colorType) {
        if ($colorType === void 0) { $colorType = 0; }
    };
    SceneLoot.prototype.setAvatar = function (num) {
        this.addPart("abc", "cde", getModelUrl(String(num)));
        this.tittleHeight = 20;
    };
    SceneLoot.prototype.addStage = function () {
        _super.prototype.addStage.call(this);
    };
    Object.defineProperty(SceneLoot.prototype, "loot", {
        get: function () {
            return (this.unit);
        },
        enumerable: true,
        configurable: true
    });
    SceneLoot.prototype.getOwnderGuid = function () {
        return this.loot.getOwnerGuid(this.lootIndex);
    };
    SceneLoot.prototype.showName = function ($color) {
        if ($color === void 0) { $color = null; }
        if (!this._charNameVo) {
            this._charNameVo = BloodManager.getInstance().getCharNameMeshVo($color);
        }
        else {
            this._charNameVo.name = $color;
        }
        this.refreshPos();
    };
    Object.defineProperty(SceneLoot.prototype, "px", {
        get: function () {
            return this._px;
        },
        set: function (val) {
            this._px = val;
            this.x = val;
            this.refreshPos();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneLoot.prototype, "py", {
        get: function () {
            return this._py;
        },
        set: function (val) {
            this._py = val;
            this.y = val;
            this.refreshPos();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneLoot.prototype, "pz", {
        get: function () {
            return this._pz;
        },
        set: function (val) {
            this._pz = val;
            this.z = val;
            this.refreshPos();
        },
        enumerable: true,
        configurable: true
    });
    return SceneLoot;
}(SceneChar));
//# sourceMappingURL=SceneLoot.js.map