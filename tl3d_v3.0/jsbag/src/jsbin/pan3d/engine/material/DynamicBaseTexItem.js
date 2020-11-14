var Pan3d;
(function (Pan3d) {
    var DynamicBaseTexItem = /** @class */ (function () {
        function DynamicBaseTexItem() {
        }
        DynamicBaseTexItem.prototype.destory = function () {
            if (this.textureRes) {
                this.textureRes.useNum--;
            }
            this.target = null;
        };
        Object.defineProperty(DynamicBaseTexItem.prototype, "texture", {
            get: function () {
                if (this.textureRes) {
                    return this.textureRes.texture;
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        return DynamicBaseTexItem;
    }());
    Pan3d.DynamicBaseTexItem = DynamicBaseTexItem;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=DynamicBaseTexItem.js.map