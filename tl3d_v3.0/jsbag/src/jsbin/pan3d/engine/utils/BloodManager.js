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
var Pan3d;
(function (Pan3d) {
    var TextJumpType = /** @class */ (function () {
        function TextJumpType() {
        }
        TextJumpType.NORMALDAMAGE = 1; //普通伤害
        TextJumpType.CRIT = 2; //暴击
        TextJumpType.DODGE = 3; //闪避
        TextJumpType.TREATMENT = 4; //治疗
        TextJumpType.VERTIGO = 5; //眩晕
        TextJumpType.FREEZE = 6; //定身
        TextJumpType.ATTACKADD = 7; //攻击增加
        TextJumpType.ATTACKREDUCE = 8; //攻击减少
        TextJumpType.EXPERIENCE = 9; //经验
        TextJumpType.NORMALDAMAGEUP = 11; //普通伤害上
        TextJumpType.CRITUP = 12; //暴击上
        TextJumpType.MYNORMALDAMAGE = 13; //自己受伤普通伤害
        TextJumpType.MYNORMALDAMAGEUP = 14; //自己受伤普通伤害上
        TextJumpType.MISS = 15; //未命中，对敌方
        return TextJumpType;
    }());
    Pan3d.TextJumpType = TextJumpType;
    var TextJumpUiVo = /** @class */ (function () {
        function TextJumpUiVo() {
        }
        return TextJumpUiVo;
    }());
    Pan3d.TextJumpUiVo = TextJumpUiVo;
    var ExpTextJumpUiDrawAndRefreash = /** @class */ (function (_super) {
        __extends(ExpTextJumpUiDrawAndRefreash, _super);
        function ExpTextJumpUiDrawAndRefreash() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ExpTextJumpUiDrawAndRefreash.prototype.makeData = function () {
            if (this._data) {
                var vo = this._data;
                this.dtime = vo.endtime;
                // this.dtime = 60;
                this.pos = vo.pos;
                switch (vo.type) {
                    case TextJumpType.EXPERIENCE:
                        //文字 + 数字类（最多显示4位数字）
                        this._width = this.drawTxtBydigitalAndtext(vo);
                        break;
                    default:
                        break;
                }
            }
        };
        ExpTextJumpUiDrawAndRefreash.prototype.drawTxtBydigitalAndtext = function ($vo) {
            var rec = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = Pan3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var picid = $vo.type;
            var $width = 50;
            var $height = 25;
            var txtcolor;
            if ($vo.type == TextJumpType.EXPERIENCE) {
                txtcolor = Pan3d.ArtFont.num54;
            }
            var distion = Pan3d.ArtFont.getInstance().getAirFontWidth(ctx, String(this._data.str), txtcolor);
            distion += $width;
            Pan3d.UiDraw.cxtDrawImg(ctx, "TYPE" + picid, new Pan3d.Rectangle(rec.pixelWitdh - distion, rec.pixelHeight - $height, $width, $height), Pan3d.UIData.publicUi);
            Pan3d.ArtFont.getInstance().writeFontToCtxLeft(ctx, String(this._data.str), txtcolor, rec.pixelWitdh - distion + $width + 2, rec.pixelHeight - $height);
            Pan3d.TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
            return distion;
        };
        ExpTextJumpUiDrawAndRefreash.prototype.update = function () {
            if (this._data) {
                this.time = Pan3d.TimeUtil.getTimer();
                if (this.time >= this.dtime) {
                    if (this.ui && this.ui.parent) {
                        this.ui.parent.removeChild(this.ui);
                    }
                    this._data = null;
                    return;
                }
                var vo = this._data;
                //变化
                var $ary = this.changerules(this.time);
                this.ui.width = 256 * $ary[2];
                this.ui.height = 50 * $ary[3];
                this.ui.y = $ary[1] - this.ui.height;
                this.ui.x = $ary[0] - this.ui.width / 2 + 25;
                this.ui.alpha = $ary[4];
            }
        };
        ExpTextJumpUiDrawAndRefreash.prototype.changerules = function (t) {
            var changevo = new Array();
            var vo = this._data;
            t = (t - vo.starttime) / 1000 * 60;
            // console.log("---t---",t);
            var posx = 0;
            var posy = 0;
            var scalex = 0;
            var scaley = 0;
            var alpha = 0;
            //当前处于哪一帧
            if (vo.type == Pan3d.TextJumpType.EXPERIENCE) {
                var v2d = new Pan3d.Vector2D;
                if (t < 0) {
                    v2d.x = -9999;
                }
                else {
                    v2d.x = 300 / Pan3d.UIData.Scale;
                    v2d.y = Pan3d.Scene_data.stageHeight / Pan3d.UIData.Scale - 50;
                }
                //玩家名
                posy = v2d.y -= 15;
                posy = posy - (t * 0.5);
                if (t < 40) {
                    posx = v2d.x;
                    scalex = 1.8;
                    scaley = 1.8;
                    alpha = 1;
                }
                else if (t < 60) {
                    posx = v2d.x;
                    scalex = 1.8;
                    scaley = 1.8;
                    alpha = 1 - ((t - 39) / 20);
                }
            }
            changevo.push(posx);
            changevo.push(posy);
            changevo.push(scalex);
            changevo.push(scaley);
            changevo.push(alpha);
            changevo.push(v2d.x);
            changevo.push(v2d.y);
            //保存上一次变化
            this._lastchange = changevo;
            return changevo;
        };
        return ExpTextJumpUiDrawAndRefreash;
    }(Pan3d.Disp2DBaseText));
    Pan3d.ExpTextJumpUiDrawAndRefreash = ExpTextJumpUiDrawAndRefreash;
    var TextJumpUiDrawAndRefreash = /** @class */ (function (_super) {
        __extends(TextJumpUiDrawAndRefreash, _super);
        function TextJumpUiDrawAndRefreash() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TextJumpUiDrawAndRefreash.prototype.makeData = function () {
            if (this._data) {
                var vo = this._data;
                this.dtime = vo.endtime;
                // this.dtime = 60;
                this.pos = vo.pos;
                switch (vo.type) {
                    case TextJumpType.NORMALDAMAGE:
                    case TextJumpType.TREATMENT:
                        //数字类
                        Pan3d.ArtFont.getInstance().writeFontToSkinName(this.parent.uiAtlas, this.textureStr, String(vo.str), "NUM" + (vo.type + 50), Pan3d.TextAlign.RIGHT);
                        break;
                    case TextJumpType.MYNORMALDAMAGEUP:
                    case TextJumpType.MYNORMALDAMAGE:
                        Pan3d.ArtFont.getInstance().writeFontToSkinName(this.parent.uiAtlas, this.textureStr, String(vo.str), Pan3d.ArtFont.num53, Pan3d.TextAlign.RIGHT);
                        break;
                    case TextJumpType.NORMALDAMAGEUP:
                        Pan3d.ArtFont.getInstance().writeFontToSkinName(this.parent.uiAtlas, this.textureStr, String(vo.str), "NUM" + (vo.type + 40), Pan3d.TextAlign.RIGHT);
                        break;
                    case TextJumpType.DODGE:
                    case TextJumpType.VERTIGO:
                    case TextJumpType.FREEZE:
                    case TextJumpType.MISS:
                        //文字类
                        this.drawTxtBytext(vo);
                        break;
                    case TextJumpType.ATTACKADD:
                    case TextJumpType.ATTACKREDUCE:
                    case TextJumpType.EXPERIENCE:
                    case TextJumpType.CRIT:
                    case TextJumpType.CRITUP:
                        //文字 + 数字类（最多显示4位数字）
                        this._width = this.drawTxtBydigitalAndtext(vo);
                        break;
                    default:
                        break;
                }
            }
        };
        TextJumpUiDrawAndRefreash.prototype.drawTxtBytext = function ($vo) {
            var rec = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = Pan3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var $length = 50;
            if ($vo.type == TextJumpType.MISS) {
                $length = 67;
            }
            Pan3d.UiDraw.cxtDrawImg(ctx, "TYPE" + $vo.type, new Pan3d.Rectangle(rec.pixelWitdh - $length, rec.pixelHeight - 25, $length, 25), Pan3d.UIData.publicUi);
            Pan3d.TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
            return 50;
        };
        TextJumpUiDrawAndRefreash.prototype.drawTxtBydigitalAndtext = function ($vo) {
            var rec = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = Pan3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var picid = $vo.type;
            var $width = 50;
            var $height = 25;
            var txtcolor;
            if ($vo.type == TextJumpType.ATTACKREDUCE) {
                picid = TextJumpType.ATTACKADD;
                txtcolor = Pan3d.ArtFont.num53;
            }
            else if ($vo.type == TextJumpType.ATTACKADD) {
                txtcolor = Pan3d.ArtFont.num54;
            }
            else if ($vo.type == TextJumpType.EXPERIENCE) {
                txtcolor = Pan3d.ArtFont.num54;
            }
            else if ($vo.type == TextJumpType.CRIT) {
                txtcolor = Pan3d.ArtFont.num55;
                $width = 78;
                $height = 50;
            }
            else if ($vo.type == TextJumpType.CRITUP) {
                picid -= 10;
                $width = 78;
                $height = 50;
                txtcolor = Pan3d.ArtFont.num55;
            }
            var distion = Pan3d.ArtFont.getInstance().getAirFontWidth(ctx, String(this._data.str), txtcolor);
            distion += $width;
            Pan3d.UiDraw.cxtDrawImg(ctx, "TYPE" + picid, new Pan3d.Rectangle(rec.pixelWitdh - distion, rec.pixelHeight - $height, $width, $height), Pan3d.UIData.publicUi);
            Pan3d.ArtFont.getInstance().writeFontToCtxLeft(ctx, String(this._data.str), txtcolor, rec.pixelWitdh - distion + $width + 2, rec.pixelHeight - $height);
            Pan3d.TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
            return distion;
        };
        TextJumpUiDrawAndRefreash.prototype.update = function () {
            if (this._data) {
                this.time = Pan3d.TimeUtil.getTimer();
                if (this.time >= this.dtime) {
                    if (this.ui && this.ui.parent) {
                        this.ui.parent.removeChild(this.ui);
                    }
                    this._data = null;
                    return;
                }
                // if (this.time > this.dtime) {
                //     this.ui.parent.removeChild(this.ui);
                //     this._data = null;
                //     return;
                // }
                // this.time++;
                var vo = this._data;
                // var $ty: number = MathClass.easeInOut(this.time / this.dtime, 0, 20, 1)
                //变化
                var $ary = this.changerules(this.time);
                this.ui.width = 256 * $ary[2];
                this.ui.height = 50 * $ary[3];
                this.ui.y = $ary[1] - this.ui.height;
                this.ui.x = $ary[0] - this.ui.width / 2 + 25;
                this.ui.alpha = $ary[4];
            }
        };
        TextJumpUiDrawAndRefreash.prototype.changerules = function (t) {
            var vo = this._data;
            //当前处于哪一帧
            t = (t - vo.starttime) / 1000 * 60;
            var changevo = new Array();
            var v2d = this.Vector3DToVector2D(new Pan3d.Vector3D(this.pos.x, this.pos.y, this.pos.z));
            if (t < 0) {
                v2d.x = -9999;
            }
            if (vo.type == Pan3d.TextJumpType.EXPERIENCE) {
                v2d.x = 300 / Pan3d.UIData.Scale;
                v2d.y = Pan3d.Scene_data.stageHeight / Pan3d.UIData.Scale - 50;
            }
            var posx;
            var posy;
            var scalex;
            var scaley;
            var alpha;
            //选定初始化飘字位置 
            switch (vo.type) {
                case Pan3d.TextJumpType.NORMALDAMAGE:
                case Pan3d.TextJumpType.MYNORMALDAMAGE:
                    //头顶
                    posx = v2d.x;
                    if (t < 4) {
                        posy = v2d.y - (t * 4);
                        scalex = (t / 4) * 1.3 + 0.2;
                        if (scalex > 1.5) {
                            scalex = 1.5;
                        }
                        scaley = scalex;
                        alpha = (t / 3) * 0.8 + 0.2;
                        if (alpha > 1) {
                            alpha = 1;
                        }
                    }
                    else if (t < 8) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] - 1 / 6;
                        scaley = scalex;
                        alpha = (t / 3) * 0.8 + 0.2;
                        if (alpha > 1) {
                            alpha = 1;
                        }
                    }
                    else if (t < 15) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] + 1 / 6;
                        scaley = scalex;
                        alpha = (t / 3) * 0.8 + 0.2;
                        if (alpha > 1) {
                            alpha = 1;
                        }
                    }
                    else if (t < 30) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] - 1 / 20;
                        scaley = scalex;
                        alpha = (t / 3) * 0.8 + 0.2;
                        if (alpha > 1) {
                            alpha = 1;
                        }
                    }
                    else if (t < 72) {
                        if (t < 50) {
                            posy = this._lastchange[1] - 2;
                        }
                        else {
                            posy = this._lastchange[1] + 2;
                        }
                        posx = this._lastchange[0] - 1.5;
                        scalex = this._lastchange[2];
                        scaley = scalex;
                        alpha = this._lastchange[4] - 1 / 100;
                        if (alpha < 0) {
                            alpha = 0;
                        }
                    }
                    break;
                case Pan3d.TextJumpType.CRIT:
                    //暴击
                    posx = v2d.x;
                    if (t < 4) {
                        posy = v2d.y - (t * 4);
                        scalex = (t / 4) * 1.3 + 0.2;
                        if (scalex > 1.5) {
                            scalex = 1.5;
                        }
                        scaley = scalex;
                        alpha = (t / 3) * 0.8 + 0.2;
                        if (alpha > 1) {
                            alpha = 1;
                        }
                    }
                    else if (t < 8) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] - 1 / 6;
                        scaley = scalex;
                        alpha = (t / 3) * 0.8 + 0.2;
                        if (alpha > 1) {
                            alpha = 1;
                        }
                    }
                    else if (t < 15) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] + 1 / 4;
                        scaley = scalex;
                        alpha = (t / 3) * 0.8 + 0.2;
                        if (alpha > 1) {
                            alpha = 1;
                        }
                    }
                    else if (t < 30) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] - 1 / 20;
                        scaley = scalex;
                        alpha = (t / 3) * 0.8 + 0.2;
                        if (alpha > 1) {
                            alpha = 1;
                        }
                    }
                    else if (t < 100) {
                        if (t < 50) {
                            posy = this._lastchange[1] - 2;
                        }
                        else {
                            posy = this._lastchange[1] + 2;
                        }
                        posx = this._lastchange[0] - 1.5;
                        scalex = this._lastchange[2];
                        scaley = scalex;
                        alpha = this._lastchange[4] - 1 / 100;
                        if (alpha < 0) {
                            alpha = 0;
                        }
                    }
                    break;
                case Pan3d.TextJumpType.NORMALDAMAGEUP:
                case Pan3d.TextJumpType.CRITUP:
                case Pan3d.TextJumpType.MYNORMALDAMAGEUP:
                    //头顶
                    posx = v2d.x;
                    if (t < 4) {
                        posy = v2d.y - (t * 4);
                        scalex = (t / 4) * 1.5 + 0.2;
                        if (scalex > 1.7) {
                            scalex = 1.7;
                        }
                        scaley = scalex;
                        alpha = (t / 3) * 0.3 + 0.2;
                        if (alpha > 0.5) {
                            alpha = 0.5;
                        }
                    }
                    else if (t < 8) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] - 1 / 4;
                        scaley = scalex;
                        alpha = (t / 3) * 0.3 + 0.2;
                        if (alpha > 0.5) {
                            alpha = 0.5;
                        }
                    }
                    else if (t < 15) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] + 1 / 4;
                        scaley = scalex;
                        alpha = (t / 3) * 0.3 + 0.2;
                        if (alpha > 0.5) {
                            alpha = 0.5;
                        }
                    }
                    else if (t < 30) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] - 1 / 15;
                        scaley = scalex;
                        alpha = this._lastchange[4] - 1 / 80;
                        if (alpha < 0) {
                            alpha = 0;
                        }
                    }
                    break;
                case Pan3d.TextJumpType.TREATMENT:
                    //头顶
                    posx = v2d.x;
                    posy = v2d.y - (t * 1.5);
                    if (t < 12) {
                        scalex = (Math.ceil(t) / 12) * 0.8 + 0.2;
                        scaley = scalex;
                        alpha = (Math.ceil(t) / 12) * 0.8 + 0.2;
                    }
                    else if (t < 60) {
                        scalex = 1;
                        scaley = scalex;
                        alpha = 1 - ((t - 11) / 48);
                    }
                    break;
                case Pan3d.TextJumpType.EXPERIENCE:
                    //玩家名
                    posy = v2d.y -= 15;
                    posy = posy - (t * 0.5);
                    if (t < 40) {
                        // posx = v2d.x - (t * 0.9);
                        // scalex = (Math.ceil(t) / 40) * 0.3 + 0.5;
                        // scaley = scalex;
                        posx = v2d.x;
                        scalex = 1.3;
                        scaley = 1.3;
                        alpha = 1;
                    }
                    else if (t < 60) {
                        // posx = v2d.x - (40 * 0.9);
                        // scalex = this._lastchange[2];
                        // scaley = scalex;
                        posx = v2d.x;
                        scalex = 1.3;
                        scaley = 1.3;
                        alpha = 1 - ((t - 39) / 20);
                    }
                    break;
                case Pan3d.TextJumpType.ATTACKADD:
                case Pan3d.TextJumpType.ATTACKREDUCE:
                    //右边
                    posx = v2d.x += 110;
                    posy = v2d.y - (t * 1.8);
                    if (t < 12) {
                        scalex = (Math.ceil(t) / 12) * 1.3 + 0.1;
                        scaley = scalex;
                        alpha = (Math.ceil(t) / 12) * 0.8 + 0.2;
                    }
                    else if (t < 24) {
                        scalex = 1.4 - ((t - 11) / 12) * 0.4;
                        scaley = scalex;
                        alpha = 1;
                    }
                    else if (t < 60) {
                        scalex = 1;
                        scaley = scalex;
                        alpha = 1 - ((t - 23) / 36);
                    }
                    break;
                case Pan3d.TextJumpType.DODGE:
                case Pan3d.TextJumpType.MISS:
                case Pan3d.TextJumpType.VERTIGO:
                case Pan3d.TextJumpType.FREEZE:
                    //左边
                    posx = v2d.x -= 50;
                    if (t < 12) {
                        posy = v2d.y - (t * 3);
                        scalex = 1;
                        scaley = scalex;
                        alpha = (Math.ceil(t) / 12);
                    }
                    else if (t < 36) {
                        posy = v2d.y - (33);
                        scalex = 1;
                        scaley = scalex;
                        alpha = 1;
                    }
                    else if (t < 72) {
                        posy = v2d.y - 33 - ((t - 36) * 1.5);
                        scalex = 1;
                        scaley = scalex;
                        alpha = 1 - ((t - 35) / 36);
                    }
                    break;
                default:
                    break;
            }
            // scalex = scalex * 1.005
            // scaley = scaley * 1.005
            changevo.push(posx);
            changevo.push(posy);
            changevo.push(scalex);
            changevo.push(scaley);
            changevo.push(alpha);
            changevo.push(v2d.x);
            changevo.push(v2d.y);
            //保存上一次变化
            this._lastchange = changevo;
            return changevo;
        };
        return TextJumpUiDrawAndRefreash;
    }(Pan3d.Disp2DBaseText));
    Pan3d.TextJumpUiDrawAndRefreash = TextJumpUiDrawAndRefreash;
    var CharNameUiVo = /** @class */ (function (_super) {
        __extends(CharNameUiVo, _super);
        function CharNameUiVo() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.tempMatrix = new Pan3d.Matrix3D;
            return _this;
        }
        CharNameUiVo.prototype.makeData = function () {
            if (this._data) {
                this.charNameMeshVo = this.rightTabInfoVo;
                if (this.lastKey != this.charNameMeshVo.name) {
                    this.ui.width = 256 * 0.7;
                    this.ui.height = 22 * 0.7;
                    this.lastKey = this.charNameMeshVo.name;
                    Pan3d.LabelTextFont.writeSingleLabel(this.parent.uiAtlas, this.textureStr, this.charNameMeshVo.name, 20, Pan3d.TextAlign.CENTER, "#ffffff", "#27262e");
                }
                this.charNameMeshVo.needDraw = false;
            }
        };
        CharNameUiVo.prototype.update = function () {
            if (this.charNameMeshVo) {
                if (this.charNameMeshVo.needDraw) {
                    this.makeData();
                }
                if (this.charNameMeshVo.pos) {
                    if (this.charNameMeshVo.visible) {
                        if (this.needUpData(this.charNameMeshVo.pos) || this.charNameMeshVo.visibleChange) {
                            var m = Pan3d.Scene_data.cam3D.cameraMatrix.clone(this.tempMatrix);
                            m.append(Pan3d.Scene_data.viewMatrx3D);
                            var p = m.transformVector(this.charNameMeshVo.pos);
                            this.ui.x = ((p.x / p.w) + 1) * (Pan3d.Scene_data.stageWidth / 2) / Pan3d.UIData.Scale - this.ui.width / 2;
                            this.ui.y = ((-p.y / p.w) + 1) * (Pan3d.Scene_data.stageHeight / 2) / Pan3d.UIData.Scale - this.ui.height / 2;
                            this.oldPos.x = this.charNameMeshVo.pos.x;
                            this.oldPos.y = this.charNameMeshVo.pos.y;
                            this.charNameMeshVo.visibleChange = false;
                        }
                    }
                    else {
                        this.ui.x = 10000;
                    }
                }
                if (this.charNameMeshVo.clear) {
                    this.ui.parent.removeChild(this.ui);
                    this._data = null;
                }
            }
        };
        return CharNameUiVo;
    }(Pan3d.Disp2DBaseText));
    Pan3d.CharNameUiVo = CharNameUiVo;
    var CharTitleUiVo = /** @class */ (function (_super) {
        __extends(CharTitleUiVo, _super);
        function CharTitleUiVo() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.tempMatrix = new Pan3d.Matrix3D;
            return _this;
        }
        CharTitleUiVo.prototype.makeData = function () {
            var _this = this;
            if (this._data) {
                this._charTitleMeshVo = this.rightTabInfoVo;
                //LabelTextFont.writeSingleLabel(this.parent.uiAtlas, this.textureStr, "ccav", 22, TextAlign.CENTER, "#ffffff");
                // this.parent.uiAtlas.upDataPicToTexture(getUItittleUrl(String(this._charTitleMeshVo.num)), this.textureStr)
                Pan3d.LoadManager.getInstance().load(Pan3d.Scene_data.fileRoot + getUItittleUrl(String(this._charTitleMeshVo.num)), Pan3d.LoadManager.IMG_TYPE, function ($img) {
                    var $uiRec = _this.parent.uiAtlas.getRec(_this.textureStr);
                    _this.parent.uiAtlas.ctx = Pan3d.UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
                    var $minScale = Math.min($uiRec.pixelWitdh / $img.width, $uiRec.pixelHeight / $img.height);
                    $minScale = Math.min($minScale, 1);
                    var $tw = $img.width * $minScale;
                    var $th = $img.height * $minScale;
                    _this.parent.uiAtlas.ctx.drawImage($img, ($uiRec.pixelWitdh - $tw) / 2, ($uiRec.pixelHeight - $th) / 2, $tw, $th);
                    Pan3d.TextureManager.getInstance().updateTexture(_this.parent.uiAtlas.texture, $uiRec.pixelX, $uiRec.pixelY, _this.parent.uiAtlas.ctx);
                });
            }
        };
        CharTitleUiVo.prototype.update = function () {
            if (this._charTitleMeshVo) {
                if (this._charTitleMeshVo.needDraw) {
                    this.makeData();
                    this._charTitleMeshVo.needDraw = false;
                }
                if (this._charTitleMeshVo.pos) {
                    if (this._charTitleMeshVo.visible) {
                        if (this.needUpData(this._charTitleMeshVo.pos)) {
                            var m = Pan3d.Scene_data.cam3D.cameraMatrix.clone(this.tempMatrix);
                            m.append(Pan3d.Scene_data.viewMatrx3D);
                            var p = m.transformVector(this._charTitleMeshVo.pos);
                            this.ui.x = ((p.x / p.w) + 1) * (Pan3d.Scene_data.stageWidth / 2) / Pan3d.UIData.Scale - this.ui.width / 2;
                            this.ui.y = ((-p.y / p.w) + 1) * (Pan3d.Scene_data.stageHeight / 2) / Pan3d.UIData.Scale - this.ui.height / 2;
                            this.oldPos.x = this._charTitleMeshVo.pos.x;
                            this.oldPos.y = this._charTitleMeshVo.pos.y;
                        }
                    }
                    else {
                        this.ui.x = 10000;
                    }
                }
                if (this._charTitleMeshVo.clear) {
                    this.ui.parent.removeChild(this.ui);
                    this._data = null;
                }
            }
        };
        return CharTitleUiVo;
    }(Pan3d.Disp2DBaseText));
    Pan3d.CharTitleUiVo = CharTitleUiVo;
    var baseMeshVo = /** @class */ (function () {
        function baseMeshVo() {
            this._visible = true;
            this.visibleChange = false;
            this.clear = false;
            this.uiScale = 1;
        }
        Object.defineProperty(baseMeshVo.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (value) {
                this._visible = value;
                this.visibleChange = true;
            },
            enumerable: true,
            configurable: true
        });
        return baseMeshVo;
    }());
    Pan3d.baseMeshVo = baseMeshVo;
})(Pan3d || (Pan3d = {}));
(function (Pan3d) {
    var BloodUIShader = /** @class */ (function (_super) {
        __extends(BloodUIShader, _super);
        function BloodUIShader() {
            return _super.call(this) || this;
        }
        BloodUIShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Pos");
            $context.bindAttribLocation(this.program, 1, "v2uv");
        };
        BloodUIShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Pos;" +
                "attribute vec3 v2uv;" +
                "uniform vec4 ui[30];" +
                "uniform vec4 lifenum[30];" +
                "varying vec2 v_texCoord;\n" +
                "varying vec4 v_lifenum;\n" +
                "void main(void)" +
                "{" +
                " v_lifenum = lifenum[int(v2uv.z)];" +
                " v_texCoord = vec2(v2uv.x , v2uv.y );" +
                " vec4  data = ui[int(v2uv.z)];" +
                "   vec3 pos = vec3(0.0,0.0,0.0);" +
                "   pos.xy = v3Pos.xy *data.zw * 2.0;" +
                "   pos.x += data.x * 2.0 - 1.0;" +
                "   pos.y += -data.y * 2.0 + 1.0;" +
                "   vec4 vt0= vec4(pos, 1.0);" +
                "   gl_Position = vt0;" +
                "}";
            return $str;
        };
        BloodUIShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 v_texCoord;\n" +
                "varying vec4 v_lifenum;\n" +
                "void main(void)\n" +
                "{\n" +
                "vec2  v_uv = v_texCoord;" +
                "if(v_texCoord.x<v_lifenum.x){;\n" +
                "v_uv.y = v_uv.y+v_lifenum.y;" +
                "};\n" +
                "vec4 infoUv = texture2D(s_texture, v_uv.xy);\n" +
                "infoUv.xyz *= infoUv.w;\n" +
                "gl_FragColor = infoUv;\n" +
                "}";
            return $str;
        };
        BloodUIShader.BloodUIShader = "BloodUIShader";
        return BloodUIShader;
    }(Pan3d.Shader3D));
    Pan3d.BloodUIShader = BloodUIShader;
    var BloodUICompenent = /** @class */ (function (_super) {
        __extends(BloodUICompenent, _super);
        function BloodUICompenent() {
            var _this = _super.call(this) || this;
            _this.lifeNum = 100;
            _this.colortype = 0; //0,1,2;
            return _this;
        }
        BloodUICompenent.prototype.pushVaData = function (objData, i, beginIndex) {
            objData.vertices.push(0, 0, 0, 1, 0, 0, 1, -1, 0, 0, -1, 0);
            objData.uvs.push(0, 0, i, 1, 0, i, 1, 8 / 32, i, 0, 8 / 32, i);
            objData.indexs.push(beginIndex, 1 + beginIndex, 2 + beginIndex, beginIndex, 2 + beginIndex, 3 + beginIndex);
            return beginIndex + 4;
        };
        return BloodUICompenent;
    }(Pan3d.UICompenent));
    Pan3d.BloodUICompenent = BloodUICompenent;
    var BloodDisp2DBaseText = /** @class */ (function (_super) {
        __extends(BloodDisp2DBaseText, _super);
        function BloodDisp2DBaseText() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.tempMatrix = new Pan3d.Matrix3D;
            return _this;
        }
        BloodDisp2DBaseText.prototype.makeData = function () {
            if (this._data) {
                this.bloodLineMeshVo = this.rightTabInfoVo;
            }
        };
        BloodDisp2DBaseText.prototype.update = function () {
            if (this.bloodLineMeshVo) {
                if (this.bloodLineMeshVo.pos) {
                    if (this.bloodLineMeshVo.visible) {
                        if (this.needUpData(this.bloodLineMeshVo.pos) || this.bloodLineMeshVo.visibleChange) {
                            var m = Pan3d.Scene_data.cam3D.cameraMatrix.clone(this.tempMatrix);
                            m.append(Pan3d.Scene_data.viewMatrx3D);
                            var p = m.transformVector(new Pan3d.Vector3D(this.bloodLineMeshVo.pos.x, this.bloodLineMeshVo.pos.y, this.bloodLineMeshVo.pos.z));
                            this.ui.x = ((p.x / p.w) + 1) * (Pan3d.Scene_data.stageWidth / 2) / Pan3d.UIData.Scale - this.ui.width / 2;
                            this.ui.y = ((-p.y / p.w) + 1) * (Pan3d.Scene_data.stageHeight / 2) / Pan3d.UIData.Scale - this.ui.height / 2;
                            this.bloodLineMeshVo.visibleChange = false;
                        }
                        this.ui.lifeNum = this.bloodLineMeshVo.num;
                        this.ui.colortype = this.bloodLineMeshVo.colortype;
                    }
                    else {
                        this.ui.x = 10000;
                    }
                }
                if (this.bloodLineMeshVo.clear) {
                    this.ui.parent.removeChild(this.ui);
                    this._data = null;
                }
            }
        };
        return BloodDisp2DBaseText;
    }(Pan3d.Disp2DBaseText));
    Pan3d.BloodDisp2DBaseText = BloodDisp2DBaseText;
    var BloodUIRenderComponent = /** @class */ (function (_super) {
        __extends(BloodUIRenderComponent, _super);
        function BloodUIRenderComponent() {
            var _this = _super.call(this) || this;
            _this.nextTime = 0;
            return _this;
        }
        BloodUIRenderComponent.prototype.initData = function () {
            this._uiList = new Array;
            this.objData = new Pan3d.ObjData();
            Pan3d.ProgrmaManager.getInstance().registe(BloodUIShader.BloodUIShader, new BloodUIShader);
            this.shader = Pan3d.ProgrmaManager.getInstance().getProgram(BloodUIShader.BloodUIShader);
            this.program = this.shader.program;
            this.uiProLocation = Pan3d.Scene_data.context3D.getLocation(this.program, "ui");
            this.ui2ProLocation = Pan3d.Scene_data.context3D.getLocation(this.program, "lifenum");
        };
        BloodUIRenderComponent.prototype.update = function () {
            if (!this.visible || this._uiList.length == 0) {
                return;
            }
            // //console.log(this._uiList.length);
            Pan3d.Scene_data.context3D.setBlendParticleFactors(this.blenderMode);
            Pan3d.Scene_data.context3D.setProgram(this.program);
            if (this.nextTime < Pan3d.TimeUtil.getTimer() || this.renderData2.length != this._uiList.length * 4) {
                if (this.renderData2.length != this._uiList.length * 4) {
                    this.renderData2 = new Float32Array(this._uiList.length * 4);
                }
                for (var i = 0; i < this._uiList.length; i++) {
                    var $bloodUICompenent = this._uiList[i];
                    var a = $bloodUICompenent.lifeNum / 100;
                    var b = ($bloodUICompenent.colortype + 1) * 8 / 32;
                    this.renderData2[i * 4 + 0] = a;
                    this.renderData2[i * 4 + 1] = b;
                }
                this.nextTime = Pan3d.TimeUtil.getTimer() + 300;
            }
            Pan3d.Scene_data.context3D.setVc4fvLocation(this.uiProLocation, this.renderData);
            Pan3d.Scene_data.context3D.setVc4fvLocation(this.ui2ProLocation, this.renderData2);
            Pan3d.Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
            Pan3d.Scene_data.context3D.setVa(1, 3, this.objData.uvBuffer);
            if (this.uiAtlas) {
                Pan3d.Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.uiAtlas.texture, 0);
            }
            Pan3d.Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            if (this.modelRenderList) {
                for (var i = 0; i < this.modelRenderList.length; i++) {
                    this.modelRenderList[i].update();
                }
            }
        };
        BloodUIRenderComponent.prototype.creatBaseComponent = function ($skinName) {
            var ui = new BloodUICompenent();
            ui.tr.setRec(new Pan3d.UIRectangle(0, 0, 1, 1));
            ui.width = 64;
            ui.height = 8;
            ui.uiRender = this;
            ui.lifeNum = 100;
            return ui;
        };
        BloodUIRenderComponent.prototype.makeRenderDataVc = function ($vcId) {
            if (!this.renderData || (this.renderData && this.renderData.length != this._uiList.length * 4)) {
                this.renderData = new Float32Array(this._uiList.length * 4);
            }
            if ($vcId == -1) {
                for (var i = 0; this._uiList && i < this._uiList.length; i++) {
                    this._uiList[i].vcId = i;
                    this.renderData[i * 4 + 0] = this._uiList[i].renderData[0];
                    this.renderData[i * 4 + 1] = this._uiList[i].renderData[1];
                    this.renderData[i * 4 + 2] = this._uiList[i].renderData[2];
                    this.renderData[i * 4 + 3] = this._uiList[i].renderData[3];
                }
            }
            else {
                if ($vcId < this._uiList.length) {
                    this.renderData[$vcId * 4 + 0] = this._uiList[$vcId].renderData[0];
                    this.renderData[$vcId * 4 + 1] = this._uiList[$vcId].renderData[1];
                    this.renderData[$vcId * 4 + 2] = this._uiList[$vcId].renderData[2];
                    this.renderData[$vcId * 4 + 3] = this._uiList[$vcId].renderData[3];
                }
            }
        };
        return BloodUIRenderComponent;
    }(Pan3d.UIRenderComponent));
    Pan3d.BloodUIRenderComponent = BloodUIRenderComponent;
    var BloodLineUIConatiner = /** @class */ (function (_super) {
        __extends(BloodLineUIConatiner, _super);
        function BloodLineUIConatiner() {
            var _this = _super.call(this) || this;
            _this.width = Pan3d.UIData.designWidth;
            _this.height = Pan3d.UIData.designHeight;
            _this._baseRender = new BloodUIRenderComponent();
            _this.addRender(_this._baseRender);
            _this._baseRender.uiAtlas = new Pan3d.UIAtlas;
            _this._baseRender.uiAtlas.configData = new Array;
            _this._uiItem = new Array();
            return _this;
            //   this.loadBloodTexture()
        }
        BloodLineUIConatiner.prototype.loadBloodTexture = function () {
            //TextureManager.getInstance().getTexture(Scene_data.fileRoot + "ui/load/blood.png", ($textureRes: TextureRes) => {
            //    this._baseRender.uiAtlas.textureRes = $textureRes
            //});
        };
        BloodLineUIConatiner.prototype.update = function (t) {
            if (this._baseRender.uiAtlas.textureRes) {
                for (var i = 0; i < this._uiItem.length; i++) {
                    if (this._uiItem[i].rightTabInfoVo) {
                        this._uiItem[i].update();
                    }
                }
            }
        };
        BloodLineUIConatiner.prototype.removeChild = function ($ui) {
            for (var i = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].ui == $ui) {
                    this._uiItem.splice(i, 1);
                    break;
                }
            }
            _super.prototype.removeChild.call(this, $ui);
        };
        BloodLineUIConatiner.prototype.clearOneTemp = function () {
            while (this._uiItem.length > 25) {
                this.removeChild(this._uiItem[0].ui);
            }
        };
        BloodLineUIConatiner.prototype.showTemp = function ($data) {
            if (this._uiItem.length >= 40) {
                //console.log("超过50。暂时设置不可再添加");
                return;
            }
            var $BloodDisp2DBaseText = new BloodDisp2DBaseText;
            $BloodDisp2DBaseText.parent = this._baseRender;
            $BloodDisp2DBaseText.ui = this._baseRender.creatBaseComponent("test");
            $BloodDisp2DBaseText.rightTabInfoVo = $data;
            this.addChild($BloodDisp2DBaseText.ui);
            this._uiItem.push($BloodDisp2DBaseText);
        };
        return BloodLineUIConatiner;
    }(Pan3d.UIConatiner));
    Pan3d.BloodLineUIConatiner = BloodLineUIConatiner;
})(Pan3d || (Pan3d = {}));
(function (Pan3d) {
    var CharTitleMeshVo = /** @class */ (function (_super) {
        __extends(CharTitleMeshVo, _super);
        function CharTitleMeshVo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CharTitleMeshVo.prototype.destory = function () {
            this.pos = null;
            this._num = null;
            this.clear = true;
        };
        Object.defineProperty(CharTitleMeshVo.prototype, "num", {
            get: function () {
                return this._num;
            },
            set: function (value) {
                this._num = value;
                this.needDraw = true;
            },
            enumerable: true,
            configurable: true
        });
        return CharTitleMeshVo;
    }(Pan3d.baseMeshVo));
    Pan3d.CharTitleMeshVo = CharTitleMeshVo;
    var CharNameMeshVo = /** @class */ (function (_super) {
        __extends(CharNameMeshVo, _super);
        function CharNameMeshVo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(CharNameMeshVo.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (value) {
                this._name = value;
                this.needDraw = true;
            },
            enumerable: true,
            configurable: true
        });
        CharNameMeshVo.prototype.destory = function () {
            this.pos = null;
            this._name = null;
            this.needDraw = null;
            this.clear = true;
        };
        return CharNameMeshVo;
    }(Pan3d.baseMeshVo));
    Pan3d.CharNameMeshVo = CharNameMeshVo;
    var BloodLineMeshVo = /** @class */ (function (_super) {
        __extends(BloodLineMeshVo, _super);
        function BloodLineMeshVo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BloodLineMeshVo.prototype.destory = function () {
            this.pos = null;
            this.num = null;
            this.colortype = null;
            this.clear = true;
        };
        return BloodLineMeshVo;
    }(Pan3d.baseMeshVo));
    Pan3d.BloodLineMeshVo = BloodLineMeshVo;
    var JumpTextMeshVo = /** @class */ (function (_super) {
        __extends(JumpTextMeshVo, _super);
        function JumpTextMeshVo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JumpTextMeshVo.prototype.destory = function () {
            this.pos = null;
            this.clear = true;
        };
        return JumpTextMeshVo;
    }(Pan3d.baseMeshVo));
    Pan3d.JumpTextMeshVo = JumpTextMeshVo;
    var JumpTxtContianerPanel = /** @class */ (function (_super) {
        __extends(JumpTxtContianerPanel, _super);
        function JumpTxtContianerPanel($classVo, $rect, $num) {
            return _super.call(this, $classVo, $rect, $num) || this;
        }
        return JumpTxtContianerPanel;
    }(Pan3d.Dis2DUIContianerPanel));
    Pan3d.JumpTxtContianerPanel = JumpTxtContianerPanel;
    var BloodManager = /** @class */ (function () {
        function BloodManager() {
            this.uiContianerItem = new Array();
            this._charTitleContianerPanel = new Pan3d.Dis2DUIContianerPanel(Pan3d.CharTitleUiVo, new Pan3d.Rectangle(0, 0, 131, 69), 10);
            this._charNameContianerPanel = new Pan3d.Dis2DUIContianerPanel(Pan3d.CharNameUiVo, new Pan3d.Rectangle(0, 0, 256, 24), 50);
            this._jumpTxtContianerPanel = new Pan3d.AlphaUiContianer(Pan3d.TextJumpUiDrawAndRefreash, new Pan3d.Rectangle(0, 0, 256, 50), 10);
            this._expjumpTxtContianerPanel = new Pan3d.AlphaUiContianer(Pan3d.ExpTextJumpUiDrawAndRefreash, new Pan3d.Rectangle(0, 0, 512, 100), 5);
            this._bloodLineUIConatiner = new Pan3d.BloodLineUIConatiner();
            this.uiContianerItem.push(this._charTitleContianerPanel);
            this.uiContianerItem.push(this._charNameContianerPanel);
            this.uiContianerItem.push(this._jumpTxtContianerPanel);
            this.uiContianerItem.push(this._expjumpTxtContianerPanel);
            this.uiContianerItem.push(this._bloodLineUIConatiner);
        }
        BloodManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new BloodManager();
            }
            return this._instance;
        };
        BloodManager.prototype.clearOneTemp = function () {
            for (var i = 0; i < this.uiContianerItem.length; i++) {
                this.uiContianerItem[i].clearOneTemp();
            }
        };
        BloodManager.prototype.getCharTitleMeshVo = function (value) {
            if (value === void 0) { value = 0; }
            var $vo = new CharTitleMeshVo;
            $vo.num = value;
            $vo.pos = new Pan3d.Vector3D(0, 50, 0);
            this._charTitleContianerPanel.showTemp($vo);
            return $vo;
        };
        BloodManager.prototype.getCharNameMeshVo = function (value) {
            if (value === void 0) { value = "测试名"; }
            var $vo = new CharNameMeshVo;
            $vo.name = value;
            $vo.pos = new Pan3d.Vector3D(0, 50, 0);
            this._charNameContianerPanel.showTemp($vo);
            return $vo;
        };
        BloodManager.prototype.getBloodLineMeshVo = function () {
            var $vo = new BloodLineMeshVo;
            $vo.num = 100;
            $vo.colortype = 0;
            $vo.pos = new Pan3d.Vector3D(0, 50, 0);
            this._bloodLineUIConatiner.showTemp($vo);
            return $vo;
        };
        BloodManager.prototype.setJumpNum = function ($textJumpUiVo) {
            // if (!$color) {
            //     $color = $num > 0 ? ArtFont.Green : ArtFont.Red
            // }
            // var $str: string = String($num)
            // if ($num > 0) {
            //     $str = "+" + $str
            // }
            // //console.log("---111");
            this._jumpTxtContianerPanel.showTemp($textJumpUiVo);
        };
        BloodManager.prototype.setExpJumpNum = function ($textJumpUiVo) {
            this._expjumpTxtContianerPanel.showTemp($textJumpUiVo);
        };
        BloodManager.prototype.update = function () {
            for (var i = 0; i < this.uiContianerItem.length; i++) {
                this.uiContianerItem[i].update(0);
                for (var j = 0; j < this._bloodLineUIConatiner.renderList.length; j++) {
                    this.uiContianerItem[i].renderList[j].update();
                }
            }
        };
        BloodManager.prototype.resize = function () {
            this._jumpTxtContianerPanel.resize();
            for (var j = 0; j < this.uiContianerItem.length; j++) {
                this.uiContianerItem[j].resize();
            }
            Pan3d.Scene_data.cam3D.needChange = true;
            //this.update();
        };
        return BloodManager;
    }());
    Pan3d.BloodManager = BloodManager;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=BloodManager.js.map