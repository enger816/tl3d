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
var colorview;
(function (colorview) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIAtlas = Pan3d.UIAtlas;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var Scene_data = Pan3d.Scene_data;
    var Vector3D = Pan3d.Vector3D;
    var ColorType = Pan3d.ColorType;
    var UIManager = Pan3d.UIManager;
    var TextureManager = Pan3d.TextureManager;
    var Vector2D = Pan3d.Vector2D;
    var UIData = Pan3d.UIData;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var UIPanel = win.UIPanel;
    var ColorPanel = /** @class */ (function (_super) {
        __extends(ColorPanel, _super);
        function ColorPanel() {
            var _this = _super.call(this) || this;
            _this.maincary = [0xFF0000, 0xFFFF00, 0x00FF00, 0x00FFFF, 0x0000FF, 0xFF00FF, 0xFF0000];
            _this.layer = 2000;
            _this.left = 400;
            _this.top = 200;
            _this.width = 300;
            _this.height = 300;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._topRender.uiAtlas = new UIAtlas();
            return _this;
        }
        ColorPanel.prototype.applyLoad = function () {
            var _this = this;
            this._topRender.uiAtlas.setInfo("pan/marmoset/uilist/colorview/colorview.xml", "pan/marmoset/uilist/colorview/colorview.png", function () { _this.loadConfigCom(); });
        };
        ColorPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._topRender.uiAtlas;
            this._midRender.uiAtlas = this._topRender.uiAtlas;
            this.c_tittle = this.addEvntBut("c_tittle", this._bottomRender);
            this.addChild(this._bottomRender.getComponent("c_bg"));
            this.c_color_txt_bg = this.addChild(this._midRender.getComponent("c_color_txt_bg"));
            this.c_main_color = this.addEvntBut("c_main_color", this._midRender);
            this.c_panel_color = this.addEvntBut("c_panel_color", this._midRender);
            this.c_close = this.addEvntBut("c_close", this._topRender);
            this.c_mainper = this.addChild(this._topRender.getComponent("c_mainper"));
            this.c_pickImg = this.addChild(this._topRender.getComponent("c_pickImg"));
            this.c_out_color = this.addChild(this._topRender.getComponent("c_out_color"));
            this.c_text_info = this.addChild(this._topRender.getComponent("c_text_info"));
            this.c_text_a = this.addChild(this._topRender.getComponent("c_text_a"));
            this.c_text_b = this.addChild(this._topRender.getComponent("c_text_b"));
            this.c_text_g = this.addChild(this._topRender.getComponent("c_text_g"));
            this.c_text_r = this.addChild(this._topRender.getComponent("c_text_r"));
            this.drawMainColor();
            // this.initColor();
            this.c_main_color.addEventListener(InteractiveEvent.Move, this.onMainColorMove, this);
            this.c_panel_color.addEventListener(InteractiveEvent.Move, this.onPanelColorMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.onUiStageUp, this);
            this.applyLoadComplete();
        };
        ColorPanel.prototype.initColor = function (value, $bfun) {
            this.changeFun = $bfun;
            var $baseColorV3d = new Vector3D(random(255), random(255), random(255));
            if (value) {
                $baseColorV3d = value;
            }
            var hsb = this.rgb2hsb($baseColorV3d);
            if (isNaN(hsb.x)) {
                hsb.x = 0;
            }
            this._currentMainPer = hsb.x / 360;
            this.changePanelColor(this._currentMainPer);
            this._perX = hsb.y;
            this._perY = 1 - hsb.z;
            this.showColor(this._perX, this._perY);
            this.showColorTxt(this._perX, this._perY);
        };
        ColorPanel.prototype.showColor = function ($perx, $pery) {
            this.c_pickImg.x = 150 * $perx + this.c_panel_color.x - 10;
            this.c_pickImg.y = 150 * $pery + this.c_panel_color.y - 10;
        };
        ColorPanel.prototype.showColorTxt = function ($perx, $pery) {
            this._perX = $perx;
            this._perY = $pery;
            var cx = (255 * (1 - $perx) + this.mainColor.x * $perx) * (1 - $pery);
            var cy = (255 * (1 - $perx) + this.mainColor.y * $perx) * (1 - $pery);
            var cz = (255 * (1 - $perx) + this.mainColor.z * $perx) * (1 - $pery);
            this.drawStrToUi(this.c_text_r, String(Math.floor(cx)));
            this.drawStrToUi(this.c_text_g, String(Math.floor(cy)));
            this.drawStrToUi(this.c_text_b, String(Math.floor(cz)));
            this.drawStrToUi(this.c_text_a, String(Math.floor(100)));
            this.drawStrToUi(this.c_text_info, "#ff99cc");
            this.drawOutColor(new Vector3D(cx, cy, cz));
        };
        ColorPanel.prototype.getHtxColor = function (value) {
            return "";
        };
        ColorPanel.prototype.drawStrToUi = function ($ui, $str) {
            this._topRender.uiAtlas.writeSingleLabel($ui.skinName, ColorType.Whiteffffff + $str);
        };
        ColorPanel.prototype.drawOutColor = function ($vcolor) {
            if ($vcolor === void 0) { $vcolor = null; }
            var $UIAtlas = this._topRender.uiAtlas;
            var rec = $UIAtlas.getRec(this.c_out_color.skinName);
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
            this._outColorVect = $vcolor;
        };
        ColorPanel.prototype.onUiStageUp = function (evt) {
            this.c_main_color.data = false;
            this.c_panel_color.data = false;
        };
        ColorPanel.prototype.onMainColorMove = function (evt) {
            if (this.c_main_color.data) {
                var $cur = ((evt.x - this.left) - this.c_main_color.x) / this.c_main_color.width;
                $cur = Math.max(Math.min(1, $cur), 0);
                this.changePanelColor($cur);
                this.showColorTxt(this._perX, this._perY);
                this.changeFun && this.changeFun(this._outColorVect);
            }
        };
        ColorPanel.prototype.onPanelColorMove = function (evt) {
            if (this.c_panel_color.data) {
                var $curX = ((evt.x - this.left) - this.c_panel_color.x) / this.c_panel_color.width;
                var $curY = ((evt.y - this.top) - this.c_panel_color.y) / this.c_panel_color.height;
                this._perX = $curX;
                this._perY = $curY;
                this.showColor(this._perX, this._perY);
                this.showColorTxt(this._perX, this._perY);
                this.changeFun && this.changeFun(this._outColorVect);
            }
        };
        ColorPanel.prototype.rgb2hsb = function (color) {
            var rgbR = Math.floor(color.x);
            var rgbG = Math.floor(color.y);
            var rgbB = Math.floor(color.z);
            var rgb = [rgbR, rgbG, rgbB];
            rgb.sort(function (aa, bb) {
                return aa - bb;
            });
            var max = rgb[2];
            var min = rgb[0];
            var hsbB = max / 255.0;
            var hsbS = max == 0 ? 0 : (max - min) / max;
            var hsbH = 0;
            if (max == rgbR && rgbG >= rgbB) {
                hsbH = (rgbG - rgbB) * 60 / (max - min) + 0;
            }
            else if (max == rgbR && rgbG < rgbB) {
                hsbH = (rgbG - rgbB) * 60 / (max - min) + 360;
            }
            else if (max == rgbG) {
                hsbH = (rgbB - rgbR) * 60 / (max - min) + 120;
            }
            else if (max == rgbB) {
                hsbH = (rgbR - rgbG) * 60 / (max - min) + 240;
            }
            return new Vector3D(hsbH, hsbS, hsbB);
        };
        ColorPanel.prototype.changePanelColor = function ($per) {
            this.c_mainper.x = this.c_main_color.x + this.c_main_color.width * $per - this.c_mainper.width / 2;
            this.c_mainper.y = this.c_main_color.y - 10;
            var per = $per * 6;
            var index = Math.floor(per);
            per = per - index;
            var color1 = hexToArgb(this.maincary[index], false);
            var color2 = hexToArgb(this.maincary[index + 1], false);
            color1.scaleBy(1 - per);
            color2.scaleBy(per);
            color1 = color1.add(color2);
            this.mainColor = color1;
            var num = this.argbToHex16(color1.x, color1.y, color1.z);
            this.drawPanelColor(color1);
        };
        ColorPanel.prototype.argbToHex16 = function (r, g, b) {
            var color = r << 16 | g << 8 | b;
            return color;
        };
        ColorPanel.prototype.drawPanelColor = function ($vcolor) {
            if ($vcolor === void 0) { $vcolor = null; }
            var $UIAtlas = this._topRender.uiAtlas;
            var rec = $UIAtlas.getRec(this.c_panel_color.skinName);
            var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            ctx.clearRect(0, 0, rec.pixelWitdh, rec.pixelHeight);
            var $imgData = ctx.getImageData(0, 0, rec.pixelWitdh, rec.pixelHeight);
            var beColor = new Vector3D(255, 255, 255, 255);
            var toColor = new Vector3D(255, 0, 0, 255);
            if ($vcolor) {
                toColor = $vcolor;
            }
            var adColor = new Vector3D(toColor.x - beColor.x, toColor.y - beColor.y, toColor.z - beColor.z);
            for (var i = 0; i < $imgData.width; i++) {
                for (var j = 0; j < $imgData.width; j++) {
                    var $slot = (i * $imgData.width + j) * 4;
                    var $speed = (j / $imgData.width);
                    $imgData.data[$slot + 0] = beColor.x + adColor.x * $speed;
                    $imgData.data[$slot + 1] = beColor.x + adColor.y * $speed;
                    $imgData.data[$slot + 2] = beColor.x + adColor.z * $speed;
                    $imgData.data[$slot + 0] *= 1 - (i / $imgData.height);
                    $imgData.data[$slot + 1] *= 1 - (i / $imgData.height);
                    $imgData.data[$slot + 2] *= 1 - (i / $imgData.height);
                    $imgData.data[$slot + 3] = 255;
                }
            }
            ctx.putImageData($imgData, 0, 0);
            TextureManager.getInstance().updateTexture($UIAtlas.texture, rec.pixelX, rec.pixelY, ctx);
        };
        ColorPanel.prototype.drawMainColor = function () {
            var $UIAtlas = this._topRender.uiAtlas;
            var rec = $UIAtlas.getRec(this.c_main_color.skinName);
            var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var grad = (ctx.createLinearGradient(0, 0, rec.pixelWitdh, rec.pixelHeight));
            for (var i = 0; i < this.maincary.length; i++) {
                var $p = hexToArgb(this.maincary[i], false);
                grad.addColorStop(i / (this.maincary.length - 1), "rgb(" + $p.x + "," + $p.y + ", " + $p.z + ")"); //   
            }
            ctx.fillStyle = grad;
            ctx.rect(0, 0, rec.pixelWitdh, rec.pixelHeight);
            ctx.fill();
            TextureManager.getInstance().updateTexture($UIAtlas.texture, rec.pixelX, rec.pixelY, ctx);
        };
        ColorPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.c_tittle:
                    this.addStageMoveEvets(evt);
                    break;
                case this.c_main_color:
                    this.c_main_color.data = true;
                    break;
                case this.c_panel_color:
                    this.c_panel_color.data = true;
                    break;
                case this.c_close:
                    ModuleEventManager.dispatchEvent(new colorview.ColorEvent(colorview.ColorEvent.HIDE_COLOR_PANEL));
                    break;
                default:
                    break;
            }
        };
        ColorPanel.prototype.addStageMoveEvets = function ($e) {
            this.lastPanelPos = new Vector2D(this.left, this.top);
            this.mouseXY = new Vector2D($e.x, $e.y);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.onMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.onUp, this);
        };
        ColorPanel.prototype.onMove = function ($e) {
            this.left = this.lastPanelPos.x + ($e.x - this.mouseXY.x) / UIData.Scale;
            this.top = this.lastPanelPos.y + ($e.y - this.mouseXY.y) / UIData.Scale;
            this.resize();
        };
        ColorPanel.prototype.onUp = function ($e) {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.onMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.onUp, this);
        };
        return ColorPanel;
    }(UIPanel));
    colorview.ColorPanel = ColorPanel;
})(colorview || (colorview = {}));
//# sourceMappingURL=ColorPanel.js.map