var materialui;
(function (materialui) {
    var LabelTextFont = Pan3d.LabelTextFont;
    var UIManager = Pan3d.UIManager;
    var TextAlign = Pan3d.TextAlign;
    var PanelContainer = /** @class */ (function () {
        function PanelContainer($panel, $label, $render) {
            this.panel = $panel;
            this.labelRender = $label;
            this.uiRender = $render;
            if (!PanelContainer.strItem) {
                PanelContainer.strItem = new Array();
                //PanelContainer.strItem.push("out")
                //PanelContainer.strItem.push("rgb")
                //PanelContainer.strItem.push("r")
                //PanelContainer.strItem.push("g")
                //PanelContainer.strItem.push("b")
                //PanelContainer.strItem.push("a")
                //PanelContainer.strItem.push("rgba")
                //PanelContainer.strItem.push("UV")
                //PanelContainer.strItem.push("xy")
                //PanelContainer.strItem.push("alpha")
                //PanelContainer.strItem.push("coordinate")
                //PanelContainer.strItem.push("speed")
            }
        }
        PanelContainer.prototype.removeChild = function ($ui) {
            this.panel.removeChild($ui.pointframe);
            this.panel.removeChild($ui.labelframe);
            $ui.pointframe = null;
            $ui.labelframe = null;
            $ui.parent = null;
        };
        PanelContainer.prototype.addChild = function ($ui) {
            if (!$ui.pointframe) {
                $ui.pointframe = this.panel.addEvntBut("a_point_frame", this.uiRender);
                $ui.labelframe = this.panel.addEvntBut("a_label_txt", this.labelRender);
                $ui.labelframe.width = $ui.labelframe.baseRec.width * 0.5;
                $ui.labelframe.height = $ui.labelframe.baseRec.height * 0.5;
                $ui.pointframe.data = $ui;
            }
            var $labelKey = $ui.titleLabeltext;
            var $textAlignStr;
            if ($ui.inOut) {
                $labelKey += "_left";
                $textAlignStr = TextAlign.LEFT;
            }
            else {
                $labelKey += "_right";
                $textAlignStr = TextAlign.RIGHT;
            }
            var $num = PanelContainer.strItem.indexOf($labelKey);
            if ($num == -1) {
                PanelContainer.strItem.push($labelKey);
                $num = PanelContainer.strItem.indexOf($labelKey);
                $ui.labelframe.goToAndStop($num);
                this.drawTextToName($ui.labelframe, $ui.titleLabeltext, $textAlignStr);
            }
            $ui.labelframe.goToAndStop($num);
            $ui.drawSp();
        };
        PanelContainer.prototype.drawTextToName = function ($ui, $str, isAlign) {
            var $toRect = $ui.getSkinCtxRect();
            var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            LabelTextFont.writeSingleLabelToCtx($ctx, $str, 24, 0, 5, isAlign);
            $ui.drawToCtx(materialui.BaseMaterialNodeUI.baseUIAtlas, $ctx);
        };
        return PanelContainer;
    }());
    materialui.PanelContainer = PanelContainer;
})(materialui || (materialui = {}));
//# sourceMappingURL=PanelContainer.js.map