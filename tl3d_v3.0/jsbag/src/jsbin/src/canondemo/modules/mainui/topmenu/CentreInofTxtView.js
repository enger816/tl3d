var tips;
(function (tips) {
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var CentreInofTxtView = /** @class */ (function () {
        function CentreInofTxtView($uiConatiner, $topRender) {
            this._uiConatiner = $uiConatiner;
            this._topRender = $topRender;
            this._frameItem = new Array;
            for (var i = 0; i < 4; i++) {
                var $temp = this._topRender.getComponent("a_centen_tip");
                $temp.addEventListener(InteractiveEvent.Up, this.butClik, this);
                $temp.goToAndStop(i);
                this._frameItem.push($temp);
            }
            //var $pandaMeshData: PandaMeshData = new PandaMeshData();
            //$pandaMeshData.type =2;
            //$pandaMeshData.key = PandaMeshData.key101;
            //$pandaMeshData.txt="都是这样子的图"
            //this.pushTextInfo($pandaMeshData)
        }
        CentreInofTxtView.prototype.getCanUseUi = function () {
            for (var i = 0; i < this._frameItem.length; i++) {
                if (!Boolean(this._frameItem[i].parent)) {
                    var $useNum = this.getUseUiNum();
                    this._frameItem[i].y = this._frameItem[i].baseRec.y + ($useNum + 1) * 30;
                    return this._frameItem[i];
                }
            }
            return null;
        };
        CentreInofTxtView.prototype.getUseUiNum = function () {
            var $num = 0;
            for (var i = 0; i < this._frameItem.length; i++) {
                if (Boolean(this._frameItem[i].parent)) {
                    $num++;
                }
            }
            return $num;
        };
        CentreInofTxtView.prototype.butClik = function (evt) {
            var ui = evt.target;
            var $vo = ui.data;
            if ($vo.data instanceof Pan3d.BaseEvent) {
                ModuleEventManager.dispatchEvent($vo.data);
            }
            if ($vo.data instanceof Function) {
                $vo.data();
            }
            this.removeTxtInfo(ui);
        };
        CentreInofTxtView.prototype.removeTxtInfo = function (ui) {
            this._uiConatiner.removeChild(ui);
            this.resizeUi();
        };
        CentreInofTxtView.prototype.resizeUi = function () {
            var $ty = 0;
            for (var i = 0; i < this._frameItem.length; i++) {
                if (Boolean(this._frameItem[i].parent)) {
                    var $toy = this._frameItem[i].baseRec.y + $ty;
                    $ty += 30;
                    TweenLite.to(this._frameItem[i], 0.3, { y: $toy });
                }
            }
        };
        CentreInofTxtView.prototype.pushTextInfo = function (value) {
            if (this.isCanAddByKey(value.key)) {
                var $temp = this.getCanUseUi();
                if ($temp) {
                    $temp.data = value;
                    this._uiConatiner.addChild($temp);
                    this.drawPicToUi($temp);
                    this.resizeUi();
                }
                else {
                    console.log("提示信息不够");
                }
            }
        };
        CentreInofTxtView.prototype.clearTextInfo = function (value) {
            console.log("清理pandata");
            for (var i = 0; i < this._frameItem.length; i++) {
                if (Boolean(this._frameItem[i].parent)) {
                    var $vo = this._frameItem[i].data;
                    if ($vo.key == value.key) {
                        this._uiConatiner.removeChild(this._frameItem[i]);
                        this.resizeUi();
                    }
                }
            }
        };
        CentreInofTxtView.prototype.isCanAddByKey = function ($key) {
            for (var i = 0; i < this._frameItem.length; i++) {
                if (Boolean(this._frameItem[i].parent)) {
                    var $vo = this._frameItem[i].data;
                    if ($vo.key == $key) {
                        return false;
                    }
                }
            }
            return true;
        };
        CentreInofTxtView.prototype.clearFrameCompenent = function ($temp) {
            var $toRect = $temp.getSkinCtxRect();
            var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            var context = $ctx;
            context.fillStyle = "rgba(66,66,66,0)";
            context.fillRect(0, 0, $toRect.width, $toRect.width);
            $temp.drawToCtx(this._topRender.uiAtlas, $ctx);
        };
        CentreInofTxtView.prototype.drawPicToUi = function ($temp) {
            this.clearFrameCompenent($temp);
            var $vo = $temp.data;
            var $toRect = $temp.getSkinCtxRect();
            var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            LabelTextFont.writeSingleLabelToCtx($ctx, $vo.txt, 20, 0, 0, Pan3d.TextAlign.CENTER, Pan3d.ColorType.Whiteffffff);
            $temp.drawToCtx(this._topRender.uiAtlas, $ctx);
        };
        return CentreInofTxtView;
    }());
    tips.CentreInofTxtView = CentreInofTxtView;
})(tips || (tips = {}));
//# sourceMappingURL=CentreInofTxtView.js.map