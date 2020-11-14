var Pan3d;
(function (Pan3d) {
    var MainUiLoad = /** @class */ (function () {
        function MainUiLoad() {
        }
        MainUiLoad.init = function ($res, $bfun, $loadFun) {
            if ($loadFun === void 0) { $loadFun = null; }
            this._itemLoad = $res; //初始化资源内容
            this._bFun = $bfun;
            this.loadFun = $loadFun;
            this.loadBaseConfigCom();
            return $res.length;
        };
        MainUiLoad.loadBaseConfigCom = function () {
            for (var i = 0; i < this._itemLoad.length; i++) {
                this.loadUIdata(this._itemLoad[i].xmlurl, this._itemLoad[i].picurl, this._itemLoad[i].name, Boolean(this._itemLoad[i].isTexture));
            }
        };
        MainUiLoad.loadOkNum = function ($num) {
            if (this.loadFun) {
                this.loadFun($num);
            }
        };
        MainUiLoad.loadUIdata = function ($xmlUrl, $imgUrl, $key, $isTexture) {
            var _this = this;
            if ($key === void 0) { $key = "default"; }
            if ($isTexture === void 0) { $isTexture = false; }
            if (!$isTexture) {
                var kim = makeImage();
                this._imgDic[$key] = kim;
                kim.onload = function (evt) {
                    _this.loadOkd();
                };
            }
            Pan3d.LoadManager.getInstance().load(Pan3d.Scene_data.fileRoot + $xmlUrl, Pan3d.LoadManager.XML_TYPE, function ($data) {
                var $arr = Array(JSON.parse($data))[0];
                _this._dic[$key] = $arr;
                if ($isTexture) {
                    Pan3d.TextureManager.getInstance().getTexture(Pan3d.Scene_data.fileRoot + $imgUrl, function ($texture) {
                        _this._imgDic[$key] = $texture;
                        _this.loadOkd();
                    }, 1, null, 0);
                }
                else {
                    kim.src = Pan3d.Scene_data.fileRoot + $imgUrl;
                }
            });
        };
        MainUiLoad.loadOkd = function () {
            this._skipnum++;
            this.loadOkNum(this._skipnum);
            if (this._skipnum >= this._itemLoad.length) {
                this._bFun();
            }
        };
        MainUiLoad._skipnum = 0;
        MainUiLoad._dic = new Pan3d.Dictionary([]);
        MainUiLoad._imgDic = new Pan3d.Dictionary([]);
        return MainUiLoad;
    }());
    Pan3d.MainUiLoad = MainUiLoad;
    var UIData = /** @class */ (function () {
        function UIData() {
        }
        UIData.setDesignWH = function ($width, $height) {
            this.designWidth = $width;
            this.designHeight = $height;
            //  this.Scale = Math.min(Scene_data.stageWidth / $width, Scene_data.stageHeight / $height);
            this.resize();
        };
        UIData.resize = function () {
            this.Scale = Math.min(Pan3d.Scene_data.stageWidth / this.designWidth, Pan3d.Scene_data.stageHeight / this.designHeight);
        };
        UIData.init = function ($res, $bfun, $loadFun) {
            if ($loadFun === void 0) { $loadFun = null; }
            this._itemLoad = $res; //初始化资源内容
            this._bFun = $bfun;
            this.loadFun = $loadFun;
            this.loadBaseConfigCom();
            return $res.length;
        };
        Object.defineProperty(UIData, "mainUIAtlas", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        UIData.loadBaseConfigCom = function () {
            for (var i = 0; i < this._itemLoad.length; i++) {
                this.loadUIdata(this._itemLoad[i].xmlurl, this._itemLoad[i].picurl, this._itemLoad[i].name, Boolean(this._itemLoad[i].isTexture));
            }
        };
        UIData.loadOkNum = function ($num) {
            if (this.loadFun) {
                this.loadFun($num);
            }
        };
        UIData.loadUIdata = function ($xmlUrl, $imgUrl, $key, $isTexture) {
            var _this = this;
            if ($key === void 0) { $key = "default"; }
            if ($isTexture === void 0) { $isTexture = false; }
            if (!$isTexture) {
                var kim = makeImage();
                this._imgDic[$key] = kim;
                kim.onload = function (evt) {
                    _this.loadOkd();
                };
            }
            Pan3d.LoadManager.getInstance().load(Pan3d.Scene_data.fileRoot + $xmlUrl, Pan3d.LoadManager.XML_TYPE, function ($data) {
                var $arr = Array(JSON.parse($data))[0];
                _this._dic[$key] = $arr;
                if ($isTexture) {
                    Pan3d.TextureManager.getInstance().getTexture(Pan3d.Scene_data.fileRoot + $imgUrl, function ($texture) {
                        _this._imgDic[$key] = $texture;
                        _this.loadOkd();
                    }, 1, null, 0);
                }
                else {
                    kim.src = Pan3d.Scene_data.fileRoot + $imgUrl;
                }
            });
        };
        UIData.loadOkd = function () {
            this._skipnum++;
            this.loadOkNum(this._skipnum);
            if (this._skipnum >= this._itemLoad.length) {
                UIData.textImg = this._imgDic[UIData.textlist]; //将指定图片给
                this._bFun();
            }
        };
        UIData.getImgByKey = function ($key) {
            if (this._imgDic.containsKey($key)) {
                return this._imgDic[$key];
            }
            //console.log("uiData getImgByKey=>" + $key)
            return null;
        };
        UIData.getUiByName = function ($key, $name) {
            if (this._dic.containsKey($key)) {
                var uiArr = this._dic[$key].uiArr;
                for (var i = 0; i < uiArr.length; i++) {
                    if (uiArr[i].name == $name) {
                        return uiArr[i];
                    }
                }
            }
            //console.log("uiData getUiByName =>" + $name)
            return null;
        };
        UIData.getUiArrByKey = function ($key) {
            if (this._dic.containsKey($key)) {
                return this._dic[$key].uiArr;
            }
            return null;
        };
        //设计宽高
        UIData.designWidth = 960;
        UIData.designHeight = 540;
        UIData.font = "Helvetica"; //Georgia//Helvetica
        UIData._skipnum = 0;
        UIData.textlist = "textlist";
        UIData.publicUi = "publicUi";
        UIData.faceItem = ["/大笑", "/脸2", "/脸3", "/脸4", "/脸5", "/脸6", "/脸7", "/脸8", "/脸9", "/脸a", "/脸b", "/脸c", "/脸d", "/脸e", "/脸f", "/脸g", "/脸h", "/脸i"];
        UIData._dic = new Pan3d.Dictionary([]);
        UIData._imgDic = new Pan3d.Dictionary([]);
        return UIData;
    }());
    Pan3d.UIData = UIData;
    var UiDraw = /** @class */ (function () {
        function UiDraw() {
        }
        UiDraw.drawUseImg = function ($ui, $useImgAtlas, $skinName) {
            var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx = Pan3d.UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var useRec = $useImgAtlas.getRec($skinName);
            ctx.drawImage($useImgAtlas.useImg, useRec.pixelX, useRec.pixelY, useRec.pixelWitdh, useRec.pixelHeight, 0, 0, $rec.pixelWitdh, $rec.pixelHeight);
            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        UiDraw.clearUI = function ($ui) {
            var $uiRect = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var $ctx = Pan3d.UIManager.getInstance().getContext2D($uiRect.pixelWitdh, $uiRect.pixelHeight, false);
            $ui.uiRender.uiAtlas.updateCtx($ctx, $uiRect.pixelX, $uiRect.pixelY);
        };
        UiDraw.drawTxtLab = function ($ui, $str, $fontsize, $align, $tx, $ty) {
            if ($tx === void 0) { $tx = 0; }
            if ($ty === void 0) { $ty = 3; }
            var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx = Pan3d.UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, Pan3d.PuiData.TXTBG, new Pan3d.Rectangle(0, 0, $rec.pixelWitdh, $rec.pixelHeight), UIData.publicUi);
            Pan3d.LabelTextFont.writeSingleLabelToCtx(ctx, $str, $fontsize, $tx, $ty, $align);
            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        /**属性 - value */
        UiDraw.drawAttVal = function ($ui, $att, $val, $align, $needadd) {
            if ($align === void 0) { $align = Pan3d.TextAlign.LEFT; }
            if ($needadd === void 0) { $needadd = false; }
            var keyStr = "";
            if (typeof ($att) == "undefined") {
                UiDraw.clearUI($ui);
                return;
            }
            keyStr = Pan3d.ColorType.Orange7a2f21 + getKeyProById($att) + ":  " + Pan3d.ColorType.Orange9a683f + Snum(Math.floor($val / 100));
            if ($needadd) {
                keyStr = Pan3d.ColorType.Orange7a2f21 + getKeyProById($att) + ":  " + Pan3d.ColorType.Orange9a683f + "+" + Snum(Math.floor($val / 100));
            }
            Pan3d.LabelTextFont.writeSingleLabel($ui.uiRender.uiAtlas, $ui.skinName, keyStr, 14, $align);
        };
        /**绘制未获得属性 - value */
        UiDraw.drawAttValAdd = function ($ui, $att, $val) {
            var keyStr = "";
            if (typeof ($att) == "undefined") {
                UiDraw.clearUI($ui);
                return;
            }
            keyStr = Pan3d.ColorType.Orange7a2f21 + getKeyProById($att) + ":    " + Pan3d.ColorType.Green2ca937 + "+" + Snum(Math.floor($val / 100));
            Pan3d.LabelTextFont.writeSingleLabel($ui.uiRender.uiAtlas, $ui.skinName, keyStr, 14, Pan3d.TextAlign.LEFT);
        };
        /**绘制增加属性 向上箭头 */
        UiDraw.drawAddValTop = function ($ui, $val) {
            var addStr = "";
            if ($val > 0) {
                addStr = "+" + Snum(Math.floor($val / 100));
            }
            else {
                addStr = "+0";
            }
            var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx = Pan3d.UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            if (addStr != "") {
                UiDraw.cxtDrawImg(ctx, Pan3d.PuiData.ARROW_TOP, new Pan3d.Rectangle(0, 3, 12, 16), UIData.publicUi);
            }
            Pan3d.LabelTextFont.writeSingleLabelToCtx(ctx, addStr, 14, 15, 0, Pan3d.TextAlign.LEFT, Pan3d.ColorType.Green2ca937);
            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        /**绘制增加属性 向右箭头 $align只接受左右对齐*/
        UiDraw.drawAddValRight = function ($ui, $val, $needadd, $align) {
            if ($needadd === void 0) { $needadd = false; }
            if ($align === void 0) { $align = Pan3d.TextAlign.RIGHT; }
            // var addStr: string = "";
            if ($val >= 0) {
                // addStr = Snum($val);
                var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                var ctx = Pan3d.UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                UiDraw.cxtDrawImg(ctx, Pan3d.PuiData.ARROW_RIGHT, new Pan3d.Rectangle(0, 3, 16, 12), UIData.publicUi);
                var addStr = Snum(Math.floor($val / 100));
                if ($needadd) {
                    addStr = "+" + addStr;
                }
                var tx = 0;
                if ($align == Pan3d.TextAlign.LEFT) {
                    tx = 22;
                }
                //console.log("-----addStr----",addStr,tx);
                Pan3d.LabelTextFont.writeSingleLabelToCtx(ctx, addStr, 14, tx, 0, $align, Pan3d.ColorType.Green2ca937);
                $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            }
            else {
                UiDraw.clearUI($ui);
            }
        };
        /**
         * 绘制需 自身有某id的道具多少个和需要多少数量的道具  a/b
         * @param
         * @param
         * @param
         */
        UiDraw.drawResHasNumAndAllNum = function ($ui, $CostAry, $txt) {
            if ($txt === void 0) { $txt = ""; }
            var costnum;
            var flag;
            return false;
        };
        /**
         * 在ctx上指定位置绘制一个小图标
         * @param
         * @param
         */
        UiDraw.drawCost = function ($cxt, $tx, $ty, $type) {
            UiDraw.cxtDrawImg($cxt, UIuitl.getInstance().costtype($type), new Pan3d.Rectangle($tx, $ty, 35, 35), UIData.publicUi);
        };
        UiDraw.drawCostUI = function ($ui, $tx, $ty, $type) {
            var $goldtxtrec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var $ctx = Pan3d.UIManager.getInstance().getContext2D($goldtxtrec.pixelWitdh, $goldtxtrec.pixelHeight, false);
            UiDraw.cxtDrawImg($ctx, UIuitl.getInstance().costtype($type), new Pan3d.Rectangle($tx, $ty, 35, 35), UIData.publicUi);
            $ui.uiRender.uiAtlas.updateCtx($ctx, $goldtxtrec.pixelX, $goldtxtrec.pixelY);
        };
        //将目标的图绘制到CXT对象中，
        UiDraw.cxtDrawImg = function ($cxt, $name, $rect, $key) {
            var obj = UIData.getUiByName($key, $name);
            if (obj) {
                if ($rect.width == 0 || $rect.height == 0) {
                    $rect.width = obj.ow;
                    $rect.height = obj.oh;
                }
                if (obj.type == 0) {
                    $cxt.drawImage(UIData.getImgByKey($key), obj.ox, obj.oy, obj.ow, obj.oh, $rect.x, $rect.y, $rect.width, $rect.height);
                }
                else if (obj.type == 1) {
                    $cxt.drawImage(UIData.getImgByKey($key), obj.ox, obj.oy, obj.uow, obj.uoh, $rect.x, $rect.y, obj.uow, obj.uoh);
                    $cxt.drawImage(UIData.getImgByKey($key), obj.ox + obj.uow, obj.oy, obj.ow - obj.uow * 2, obj.uoh, $rect.x + obj.uow, $rect.y, $rect.width - obj.uow * 2, obj.uoh);
                    $cxt.drawImage(UIData.getImgByKey($key), obj.ox + obj.ow - obj.uow, obj.oy, obj.uow, obj.uoh, $rect.x + $rect.width - obj.uow, $rect.y, obj.uow, obj.uoh);
                    $cxt.drawImage(UIData.getImgByKey($key), obj.ox, obj.oy + obj.uoh, obj.uow, obj.oh - obj.uoh * 2, $rect.x, $rect.y + obj.uoh, obj.uow, $rect.height - obj.uoh * 2);
                    $cxt.drawImage(UIData.getImgByKey($key), obj.ox + obj.uow, obj.oy + obj.uoh, obj.ow - obj.uow * 2, obj.oh - obj.uoh * 2, $rect.x + obj.uow, $rect.y + obj.uoh, $rect.width - obj.uow * 2, $rect.height - obj.uoh * 2);
                    $cxt.drawImage(UIData.getImgByKey($key), obj.ox + obj.ow - obj.uow, obj.oy + obj.uoh, obj.uow, obj.uoh, $rect.x + $rect.width - obj.uow, $rect.y + obj.uoh, obj.uow, $rect.height - obj.uoh * 2);
                    $cxt.drawImage(UIData.getImgByKey($key), obj.ox, obj.oy + obj.oh - obj.uoh, obj.uow, obj.uoh, $rect.x, $rect.y + $rect.height - obj.uoh, obj.uow, obj.uoh);
                    $cxt.drawImage(UIData.getImgByKey($key), obj.ox + obj.uow, obj.oy + obj.oh - obj.uoh, obj.ow - obj.uow * 2, obj.uoh, $rect.x + obj.uow, $rect.y + $rect.height - obj.uoh, $rect.width - obj.uow * 2, obj.uoh);
                    $cxt.drawImage(UIData.getImgByKey($key), obj.ox + obj.ow - obj.uow, obj.oy + obj.oh - obj.uoh, obj.uow, obj.uoh, $rect.x + $rect.width - obj.uow, $rect.y + $rect.height - obj.uoh, obj.uow, obj.uoh);
                }
                else {
                    alert("UiDraw没有绘制成功  " + obj.type);
                }
            }
        };
        //将目标的图绘制到$uiAtlas纹理对象中，
        UiDraw.uiAtlasDrawImg = function ($uiAtlas, $skinName, $key, $shareName) {
            var $uiRectangle = $uiAtlas.getRec($skinName);
            $uiAtlas.ctx = Pan3d.UIManager.getInstance().getContext2D($uiRectangle.pixelWitdh, $uiRectangle.pixelHeight, false);
            var obj = UIData.getUiByName($key, $shareName);
            ////console.log("obj", obj)
            if (obj) {
                if (obj.type == 0) {
                    $uiAtlas.ctx.drawImage(UIData.getImgByKey($key), obj.ox, obj.oy, obj.ow, obj.oh, 0, 0, $uiRectangle.pixelWitdh, $uiRectangle.pixelHeight);
                }
                else if (obj.type == 1) {
                    $uiAtlas.ctx.drawImage(UIData.getImgByKey($key), obj.ox, obj.oy, obj.uow, obj.uoh, 0, 0, obj.uow, obj.uoh);
                    $uiAtlas.ctx.drawImage(UIData.getImgByKey($key), obj.ox + obj.uow, obj.oy, obj.ow - obj.uow * 2, obj.uoh, obj.uow, 0, $uiRectangle.pixelWitdh - obj.uow * 2, obj.uoh);
                    $uiAtlas.ctx.drawImage(UIData.getImgByKey($key), obj.ox + obj.ow - obj.uow, obj.oy, obj.uow, obj.uoh, $uiRectangle.pixelWitdh - obj.uow, 0, obj.uow, obj.uoh);
                    $uiAtlas.ctx.drawImage(UIData.getImgByKey($key), obj.ox, obj.oy + obj.uoh, obj.uow, obj.oh - obj.uoh * 2, 0, obj.uoh, obj.uow, $uiRectangle.pixelHeight - obj.uoh * 2);
                    $uiAtlas.ctx.drawImage(UIData.getImgByKey($key), obj.ox + obj.uow, obj.oy + obj.uoh, obj.ow - obj.uow * 2, obj.oh - obj.uoh * 2, obj.uow, obj.uoh, $uiRectangle.pixelWitdh - obj.uow * 2, $uiRectangle.pixelHeight - obj.uoh * 2);
                    $uiAtlas.ctx.drawImage(UIData.getImgByKey($key), obj.ox + obj.ow - obj.uow, obj.oy + obj.uoh, obj.uow, obj.uoh, $uiRectangle.pixelWitdh - obj.uow, obj.uoh, obj.uow, $uiRectangle.pixelHeight - obj.uoh * 2);
                    $uiAtlas.ctx.drawImage(UIData.getImgByKey($key), obj.ox, obj.oy + obj.oh - obj.uoh, obj.uow, obj.uoh, 0, $uiRectangle.pixelHeight - obj.uoh, obj.uow, obj.uoh);
                    $uiAtlas.ctx.drawImage(UIData.getImgByKey($key), obj.ox + obj.uow, obj.oy + obj.oh - obj.uoh, obj.ow - obj.uow * 2, obj.uoh, obj.uow, $uiRectangle.pixelHeight - obj.uoh, $uiRectangle.pixelWitdh - obj.uow * 2, obj.uoh);
                    $uiAtlas.ctx.drawImage(UIData.getImgByKey($key), obj.ox + obj.ow - obj.uow, obj.oy + obj.oh - obj.uoh, obj.uow, obj.uoh, $uiRectangle.pixelWitdh - obj.uow, $uiRectangle.pixelHeight - obj.uoh, obj.uow, obj.uoh);
                }
                else {
                    //console.log("11");
                }
                Pan3d.TextureManager.getInstance().updateTexture($uiAtlas.texture, $uiRectangle.pixelX, $uiRectangle.pixelY, $uiAtlas.ctx);
            }
            else {
                alert("uiAtlasDrawImg错误");
            }
        };
        /**
         * 将共享资源图绘制到$uiAtlas纹理对象中
         * $touiAtlas：绘制到的uiAtlas对象
         * $fromuiAtlas: 资源来源的uiAtlas对象
         * $skinName: 绘制对象名
         * $shareName：资源名
         * $tx：偏移量x
         * $ty：偏移量y
         * $fillflag：是否填充整个对象，若填充，则考虑偏移量，否则反之
         */
        UiDraw.SharedDrawImg = function ($touiAtlas, $fromuiAtlas, $skinName, $shareName, $tx, $ty, $fillflag) {
            if ($tx === void 0) { $tx = 0; }
            if ($ty === void 0) { $ty = 0; }
            if ($fillflag === void 0) { $fillflag = true; }
            var $uiRectangle = $touiAtlas.getRec($skinName);
            $touiAtlas.ctx = Pan3d.UIManager.getInstance().getContext2D($uiRectangle.pixelWitdh, $uiRectangle.pixelHeight, false);
            var imgUseRect = $fromuiAtlas.getRec($shareName);
            var posx = $fillflag ? 0 : $tx;
            var posy = $fillflag ? 0 : $ty;
            var pwitdh = $fillflag ? $uiRectangle.pixelWitdh : imgUseRect.pixelWitdh;
            var phight = $fillflag ? $uiRectangle.pixelHeight : imgUseRect.pixelHeight;
            $touiAtlas.ctx.drawImage($fromuiAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, posx, posy, pwitdh, phight);
            Pan3d.TextureManager.getInstance().updateTexture($touiAtlas.texture, $uiRectangle.pixelX, $uiRectangle.pixelY, $touiAtlas.ctx);
        };
        UiDraw.drawToUiAtlasToCtx = function ($ctx, $fromuiAtlas, $shareName, $posRect) {
            var imgUseRect = $fromuiAtlas.getRec($shareName);
            if (!$posRect) {
                $posRect = new Pan3d.Rectangle(0, 0, 0, 0);
            }
            if ($posRect.width > 1 && $posRect.height > 1) {
                $ctx.drawImage($fromuiAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, $posRect.x, $posRect.y, $posRect.width, $posRect.height);
            }
            else {
                $ctx.drawImage($fromuiAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, $posRect.x, $posRect.y, imgUseRect.pixelWitdh, imgUseRect.pixelHeight);
            }
        };
        UiDraw.RepeatLoadImg = function ($url1, $url2, $backFuc) {
            if ($backFuc === void 0) { $backFuc = null; }
            var imgA = makeImage();
            imgA.onload = function () {
                Pan3d.LoadManager.getInstance().load($url2, Pan3d.LoadManager.IMG_TYPE, function ($imgB) {
                    if ($backFuc) {
                        $backFuc(imgA, $imgB);
                    }
                });
            };
            imgA.src = $url1;
        };
        return UiDraw;
    }());
    Pan3d.UiDraw = UiDraw;
    var UIuitl = /** @class */ (function () {
        function UIuitl() {
        }
        UIuitl.getInstance = function () {
            if (!this._instance) {
                this._instance = new UIuitl();
            }
            return this._instance;
        };
        /**
         * 绘制背景图+资源icon+资源数目
         */
        UIuitl.prototype.drawCostUI = function ($uiAtlas, $skinName, $costary, $fontcolor, $bgwidth, $bgheight) {
            if ($fontcolor === void 0) { $fontcolor = "#000000"; }
            if ($bgwidth === void 0) { $bgwidth = 0; }
            if ($bgheight === void 0) { $bgheight = 0; }
            if ($fontcolor.indexOf("[") != -1) { //[00ff00]
                $fontcolor = "#" + $fontcolor.substr(1, 6);
            }
            var $rec = $uiAtlas.getRec($skinName);
            var ctx = Pan3d.UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            if ($bgwidth == 0) {
                $bgwidth = $rec.pixelWitdh;
                $bgheight = $rec.pixelHeight;
            }
            UiDraw.cxtDrawImg(ctx, Pan3d.PuiData.TXTBG, new Pan3d.Rectangle($rec.pixelWitdh - $bgwidth, $rec.pixelHeight - $bgheight - 3, $bgwidth, $bgheight + 3), UIData.publicUi);
            var posx;
            var posy;
            if (Number($costary[0]) > -1) {
                UiDraw.cxtDrawImg(ctx, this.costtype(Number($costary[0])), new Pan3d.Rectangle(0, 0, 35, 35), UIData.publicUi);
                posx = ($bgwidth - 35) / 2 + 35;
                if ($bgheight >= 35) {
                    posy = 2;
                }
                else {
                    posy = 35 - $bgheight;
                }
            }
            else {
                posx = $bgwidth / 2 + ($rec.pixelWitdh - $bgwidth);
                posy = $rec.pixelHeight - $bgheight;
            }
            Pan3d.LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, String($costary[1]), 16, posx, posy, Pan3d.TextAlign.CENTER, $fontcolor);
            Pan3d.ArtFont.getInstance();
            $uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        UIuitl.prototype.costtype = function ($costid) {
            switch ($costid) {
                case 1:
                    //元宝
                    return Pan3d.PuiData.A_YUANBAO;
                case 2:
                    //绑定元宝
                    return Pan3d.PuiData.A_BANGYUAN;
                case 3:
                    //身上的银子
                    return Pan3d.PuiData.A_YINBI;
                case 101:
                    //真气
                    return Pan3d.PuiData.A_ZHENQI;
                case 102:
                    //兽灵
                    return Pan3d.PuiData.A_SHOULING;
                case 103:
                    //宝石精华
                    return Pan3d.PuiData.A_JINGHUA;
                case 6:
                    //帮贡
                    return Pan3d.PuiData.A_BANGGONG;
                case 7:
                    //荣誉
                    return Pan3d.PuiData.A_HONOR;
                case 8:
                    //斗魂
                    return Pan3d.PuiData.A_DOUHUN;
                case 9:
                    //历练值
                    return Pan3d.PuiData.A_DOUHUN;
                case 10:
                    //怪物令牌
                    return Pan3d.PuiData.A_CARD_G;
                case 11:
                    //采集令牌
                    return Pan3d.PuiData.A_CARD_C;
                case 12:
                    //押镖令牌
                    return Pan3d.PuiData.A_CARD_B;
                case 104:
                    //经验
                    return Pan3d.PuiData.A_EXP;
                default:
                    break;
            }
        };
        return UIuitl;
    }());
    Pan3d.UIuitl = UIuitl;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=UIData.js.map