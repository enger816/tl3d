var Pan3d;
(function (Pan3d) {
    var TexItem = /** @class */ (function () {
        function TexItem() {
        }
        TexItem.prototype.destory = function () {
            if (this.textureRes) {
                this.textureRes.clearUseNum();
            }
        };
        Object.defineProperty(TexItem.prototype, "id", {
            get: function () {
                return this._id;
            },
            set: function (value) {
                this._id = value;
                this.name = "fs" + value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TexItem.prototype, "texture", {
            get: function () {
                if (this.textureRes) {
                    return this.textureRes.texture;
                }
                else {
                    return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        TexItem.LIGHTMAP = 1;
        TexItem.LTUMAP = 2;
        TexItem.CUBEMAP = 3;
        TexItem.HEIGHTMAP = 4;
        TexItem.REFRACTIONMAP = 5;
        return TexItem;
    }());
    Pan3d.TexItem = TexItem;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=TexItem.js.map