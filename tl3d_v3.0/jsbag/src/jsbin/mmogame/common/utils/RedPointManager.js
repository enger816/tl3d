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
var RedPointManager = /** @class */ (function () {
    function RedPointManager() {
        this._dic = new Object;
    }
    RedPointManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new RedPointManager();
        }
        return this._instance;
    };
    RedPointManager.prototype.init = function () {
        this._root = new RedPointNode;
        this._root.isRoot = true;
        var size = TableData.getInstance().getTabMaxID(TableData.tb_red_point);
        for (var i = 1; i <= size; i++) {
            var obj = TableData.getInstance().getData(TableData.tb_red_point, i);
            if (obj && obj.parent >= 0) {
                var node = new RedPointNode;
                node.id = obj.id;
                node.name = obj.desc;
                if (obj.parent) {
                    node.parent = this._dic[obj.parent];
                }
                else {
                    node.parent = this._root;
                }
                node.parent.addChild(node);
                if (obj.list) {
                    node.isList = true;
                }
                this._dic[obj.id] = node;
            }
        }
        this.initAtlas();
    };
    RedPointManager.prototype.initAtlas = function () {
        var atlas = new UIAtlas();
        var ctx = UIManager.getInstance().getContext2D(64, 64);
        UiDraw.cxtDrawImg(ctx, PuiData.A_RED_POINT, new Rectangle(0, 0, 17, 16), UIData.publicUi);
        UiDraw.cxtDrawImg(ctx, PuiData.A_JIANTOU, new Rectangle(20, 0, 26, 33), UIData.publicUi);
        var textRes = TextureManager.getInstance().getCanvasTexture(ctx);
        atlas.textureRes = textRes;
        atlas.configData = new Array;
        atlas.layoutData = new Object;
        atlas.configData.push(this.getConfigData("Style", new Rectangle(0, 0, 17, 16), 64, 64));
        atlas.configData.push(this.getConfigData("Style1", new Rectangle(20, 0, 26, 33), 64, 64));
        atlas.layoutData["s0"] = this.getLayoutData(new Rectangle(0, 0, 17, 16), "Style", "style");
        atlas.layoutData["s1"] = this.getLayoutData(new Rectangle(0, 0, 26, 33), "Style1", "style1");
        this.uiAtlas = atlas;
    };
    RedPointManager.prototype.getLayoutData = function (rec, skinName, texName) {
        var ary = new Array;
        var recObj = new Object;
        recObj.type = 0;
        recObj.rect = rec;
        recObj.dataItem = [skinName];
        recObj.name = texName;
        ary.push(recObj);
        recObj.item = ary;
        return { item: [recObj] };
    };
    RedPointManager.prototype.getConfigData = function (name, rec, width, height) {
        var obj = new Object;
        obj.x = rec.x / width;
        obj.y = rec.y / height;
        obj.width = rec.width / width;
        obj.height = rec.height / height;
        obj.ow = rec.width;
        obj.oh = rec.height;
        obj.ox = rec.x;
        obj.oy = rec.y;
        obj.type = 0;
        obj.cellX = 0;
        obj.cellY = 0;
        obj.name = name;
        return obj;
    };
    RedPointManager.prototype.getNodeByID = function ($id) {
        return this._dic[$id];
    };
    return RedPointManager;
}());
var RedPointRender = /** @class */ (function (_super) {
    __extends(RedPointRender, _super);
    function RedPointRender() {
        var _this = _super.call(this) || this;
        _this._getSrcList = new Array;
        _this.uiAtlas = RedPointManager.getInstance().uiAtlas;
        return _this;
    }
    RedPointRender.prototype.getRedPointUI = function ($container, $nodeID, $v2d, $style) {
        if ($style === void 0) { $style = "style"; }
        var ui = this.getRedPointComponent($style);
        ui.preParent = $container;
        ui.x = $v2d.x - 16;
        ui.y = $v2d.y;
        if ($nodeID > 0) {
            var node = RedPointManager.getInstance().getNodeByID($nodeID);
            node.bindUI(ui);
            ui.node = node;
        }
        return ui;
    };
    RedPointRender.prototype.getRedPointComponent = function ($uiName) {
        var obj = this.uiAtlas.getLayoutData($uiName);
        var ui = this.creatRedPointComponent(obj.dataItem[0]);
        ui.width = obj.rect.width;
        ui.height = obj.rect.height;
        ui.x = obj.rect.x;
        ui.y = obj.rect.y;
        ui.baseRec = obj.rect;
        ui.name = $uiName;
        this._getSrcList.push(ui);
        return ui;
    };
    RedPointRender.prototype.creatRedPointComponent = function ($skinName) {
        var ui = new RedPointCompenent();
        ui.skinName = $skinName;
        var rec = this.uiAtlas.getRec($skinName);
        ui.tr.setRec(rec);
        ui.width = rec.pixelWitdh;
        ui.height = rec.pixelHeight;
        ui.uiRender = this;
        return ui;
    };
    RedPointRender.prototype.dispose = function () {
        this.uiAtlas = null;
        for (var i = 0; i < this._getSrcList.length; i++) {
            var ui = this._getSrcList[i];
            if (ui.node) {
                ui.node.unBind();
            }
        }
        _super.prototype.dispose.call(this);
    };
    RedPointRender.prototype.update = function () {
        _super.prototype.update.call(this);
        var targetScale = 1 + (Math.sin(TimeUtil.getTimer() * 0.008) + 1) * 0.1;
        for (var i = 0; i < this._uiList.length; i++) {
            this._uiList[i].uvScale = targetScale;
        }
    };
    return RedPointRender;
}(UIRenderComponent));
var RedPointCompenent = /** @class */ (function (_super) {
    __extends(RedPointCompenent, _super);
    function RedPointCompenent() {
        return _super.call(this) || this;
    }
    // public show(): void {
    //     this.redPointContainer.addChild(this);
    // }
    // public hide(): void {
    //     this.redPointContainer.removeChild(this);
    // }
    RedPointCompenent.prototype.bindNode = function ($nodeID) {
        if (this.node) {
            this.node.unBind();
        }
        var node = RedPointManager.getInstance().getNodeByID($nodeID);
        node.bindUI(this);
        this.node = node;
    };
    RedPointCompenent.prototype.applyRenderSize = function () {
        if (!this.parent) {
            return;
        }
        this.renderX = this.absoluteX / Scene_data.stageWidth;
        this.renderY = this.absoluteY / Scene_data.stageHeight;
        this.renderWidth = this.absoluteWidth / Scene_data.stageWidth;
        this.renderHeight = this.absoluteHeight / Scene_data.stageHeight;
        var $vt = Math.abs(this._uvScale);
        this.renderData[0] = this.renderX + this.renderWidth * (1 - $vt) * 0.5;
        this.renderData[1] = this.renderY + this.renderHeight * (1 - $vt) * 0.5;
        this.renderData[2] = this.renderWidth * this.scale * $vt;
        this.renderData[3] = this.renderHeight * this.scale * $vt;
        this.renderData2[0] = this.tr.width;
        this.renderData2[1] = this.tr.height;
        this.renderData2[2] = this.tr.x;
        this.renderData2[3] = this.tr.y;
        this.uiRender.makeRenderDataVc(this.vcId);
        // 
    };
    return RedPointCompenent;
}(UICompenent));
var RedPointEvent = /** @class */ (function (_super) {
    __extends(RedPointEvent, _super);
    function RedPointEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RedPointEvent.SHOW_REDPOINT_EVENT = "SHOW_REDPOINT_EVENT";
    RedPointEvent.HIDE_REDPOINT_EVENT = "HIDE_REDPOINT_EVENT";
    return RedPointEvent;
}(BaseEvent));
var RedPointNode = /** @class */ (function () {
    function RedPointNode() {
        this.children = new Array;
        this.isList = false;
        this.isRoot = false;
        this._show = false;
    }
    RedPointNode.prototype.addChild = function ($sun) {
        $sun.parent = this;
        this.children.push($sun);
    };
    RedPointNode.prototype.removeAllChild = function () {
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].parent = null;
        }
        this.children = [];
    };
    Object.defineProperty(RedPointNode.prototype, "show", {
        get: function () {
            return this._show;
        },
        set: function (val) {
            if (this._show == val) {
                return;
            }
            this._show = val;
            this.applyUI();
            if (this.parent) {
                if (val) {
                    this.parent.show = true;
                }
                else {
                    this.parent.sunHide();
                }
            }
            var evt;
            if (val) {
                evt = new RedPointEvent(RedPointEvent.SHOW_REDPOINT_EVENT);
                evt.node = this;
                ModuleEventManager.dispatchEvent(evt);
            }
            else {
                evt = new RedPointEvent(RedPointEvent.HIDE_REDPOINT_EVENT);
                evt.node = this;
                ModuleEventManager.dispatchEvent(evt);
            }
        },
        enumerable: true,
        configurable: true
    });
    RedPointNode.prototype.sunHide = function () {
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].show) {
                return;
            }
        }
        this.show = false;
    };
    RedPointNode.prototype.applyUI = function () {
        if (this._ui) {
            if (this._show) {
                this._ui.preShow();
            }
            else {
                this._ui.preHide();
            }
        }
    };
    RedPointNode.prototype.bindUI = function ($ui) {
        this._ui = $ui;
        this.applyUI();
    };
    RedPointNode.prototype.unBind = function () {
        if (this._ui) {
            this._ui.preHide();
        }
        this._ui = null;
    };
    return RedPointNode;
}());
//# sourceMappingURL=RedPointManager.js.map