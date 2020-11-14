var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var prop;
(function (prop) {
    var Vector3D = Pan3d.Vector3D;
    var UIManager = Pan3d.UIManager;
    var TextureManager = Pan3d.TextureManager;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var ColorPickUI = /** @class */ (function (_super) {
        __extends(ColorPickUI, _super);
        function ColorPickUI(w, h) {
            if (w === void 0) { w = 64; }
            if (h === void 0) { h = 64; }
            return _super.call(this, w, h) || this;
        }
        ColorPickUI.prototype.initView = function () {
            this.addEvets();
        };
        ColorPickUI.prototype.drawOutColor = function () {
            var $vcolor = new Vector3D(this._vec3d.x * 255, this._vec3d.y * 255, this._vec3d.z * 255);
            var $UIAtlas = this.ui.uiRender.uiAtlas;
            var $textureStr = this.ui.skinName;
            var rec = $UIAtlas.getRec($textureStr);
            var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var $imgData = ctx.getImageData(0, 0, rec.pixelWitdh, rec.pixelHeight);
            for (var i = 0; i < $imgData.data.length / 4; i++) {
                $imgData.data[i * 4 + 0] = $vcolor.x;
                $imgData.data[i * 4 + 1] = $vcolor.y;
                $imgData.data[i * 4 + 2] = $vcolor.z;
                $imgData.data[i * 4 + 3] = 255;
            }
            ctx.putImageData($imgData, 0, 0);
            TextureManager.getInstance().updateTexture($UIAtlas.texture, rec.pixelX, rec.pixelY, ctx);
            /*
            var $vcolor: Vector3D = new Vector3D(this._vec3d.x * 255, this._vec3d.y * 255, this._vec3d.z * 255);
            this.textLabelUIMeshVo.needDraw = false;
            var $UIAtlas: UIAtlas = this.textLabelUIMeshVo.textLabelUIDisp2D.parent.uiAtlas
            var $textureStr: string = this.textLabelUIMeshVo.textLabelUIDisp2D.ui.skinName
            var rec: UIRectangle = $UIAtlas.getRec($textureStr);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var $imgData: ImageData = ctx.getImageData(0, 0, rec.pixelWitdh, rec.pixelHeight);
            for (var i: number = 0; i < $imgData.data.length / 4; i++) {
                $imgData.data[i * 4 + 0] = $vcolor.x;
                $imgData.data[i * 4 + 1] = $vcolor.y;
                $imgData.data[i * 4 + 2] = $vcolor.z;
                $imgData.data[i * 4 + 3] = 255;
            }
            ctx.putImageData($imgData, 0, 0)
            TextureManager.getInstance().updateTexture($UIAtlas.texture, rec.pixelX, rec.pixelY, ctx);

            */
        };
        Object.defineProperty(ColorPickUI.prototype, "vec3d", {
            get: function () {
                return this._vec3d;
            },
            set: function (value) {
                this._vec3d = value;
                this.drawOutColor();
            },
            enumerable: true,
            configurable: true
        });
        ColorPickUI.prototype.butClik = function (evt) {
            var _this = this;
            var $colorEvet = new colorview.ColorEvent(colorview.ColorEvent.SHOW_COLOR_PANEL);
            $colorEvet.v3dColor = new Vector3D(this._vec3d.x * 255, this._vec3d.y * 255, this._vec3d.z * 255);
            $colorEvet.bfun = function (value) { _this.colorPickPanelFun(value); };
            ModuleEventManager.dispatchEvent($colorEvet);
        };
        ColorPickUI.prototype.colorPickPanelFun = function (value) {
            this._vec3d.x = value.x / 255;
            this._vec3d.y = value.y / 255;
            this._vec3d.z = value.z / 255;
            var $reflectionEvet = new prop.ReflectionEvet(prop.ReflectionEvet.CHANGE_DATA);
            $reflectionEvet.data = this._vec3d;
            this.dispatchEvent($reflectionEvet);
            this.drawOutColor();
        };
        return ColorPickUI;
    }(prop.TextLabelUI));
    prop.ColorPickUI = ColorPickUI;
})(prop || (prop = {}));
//# sourceMappingURL=ColorPickUI.js.map