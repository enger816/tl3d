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
var selectserver;
(function (selectserver) {
    var xuanfuList = /** @class */ (function (_super) {
        __extends(xuanfuList, _super);
        function xuanfuList() {
            var _this = _super.call(this) || this;
            _this.left = 295;
            _this.top = 98;
            return _this;
        }
        xuanfuList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        xuanfuList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, xuanfuListRender, 566, 354, 283, 66, 5, 1024, 512, 2, 7, 1);
        };
        xuanfuList.prototype.getData = function ($ary) {
            var ary = new Array;
            for (var i = 0; i < $ary.length; i++) {
                var item = new SListItemData;
                item.data = $ary[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        xuanfuList.prototype.show = function ($data) {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            var $sListItemData = this.getData($data);
            this.refreshData($sListItemData);
        };
        xuanfuList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return xuanfuList;
    }(SList));
    selectserver.xuanfuList = xuanfuList;
    var xuanfuListRender = /** @class */ (function (_super) {
        __extends(xuanfuListRender, _super);
        function xuanfuListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        xuanfuListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            var customRender = this._customRenderAry[0];
            this.bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "bg", 0, 0, 275, 62);
            $container.addChild(this.bg);
            this.bg.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this.new = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "new", 0, 0, 33, 33);
            $container.addChild(this.new);
            this.state = this.creatSUI(customRender, this.parentTarget.baseAtlas, "state", 12, 19, 25, 25);
            $container.addChild(this.state);
            this.serverid = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "serverid", 47, 21, 36, 20);
            $container.addChild(this.serverid);
            this.servername = this.creatSUI(customRender, this.parentTarget.baseAtlas, "servername", 96, 21, 70, 20);
            $container.addChild(this.servername);
            this.rolebg = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "rolebg", 165, 18, 106, 27);
            $container.addChild(this.rolebg);
            this.roleinfomation = this.creatSUI(customRender, this.parentTarget.baseAtlas, "roleinfomation", 168, 22, 100, 20);
            $container.addChild(this.roleinfomation);
        };
        xuanfuListRender.prototype.applyrender = function () {
            var vo = this.itdata.data;
            UiDraw.SharedDrawImg(this._baseRender.uiAtlas, this.parentTarget.baseAtlas, this.bg.skinName, "bg");
            if (vo.isnew) {
                UiDraw.SharedDrawImg(this._baseRender.uiAtlas, this.parentTarget.baseAtlas, this.new.skinName, "new");
            }
            else {
                UiDraw.clearUI(this.new);
            }
            var statestr = selectserver.SelectServerModel.getInstance().StateKey[vo.state];
            UiDraw.SharedDrawImg(this._baseRender.uiAtlas, this.parentTarget.baseAtlas, this.state.skinName, statestr);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.serverid.skinName, vo.id + "服", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.servername.skinName, vo.name, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            if (vo.role) {
                UiDraw.SharedDrawImg(this._baseRender.uiAtlas, this.parentTarget.baseAtlas, this.rolebg.skinName, "rolebg");
                // var roletype = SelectServerModel.getInstance().RoleKey[vo.role.roletype];
                // getProfessional(vo.role.roletype) +" " + 
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.roleinfomation.skinName, vo.role.rolename, 14, TextAlign.CENTER, ColorType.Whitefff4d6);
            }
            else {
                UiDraw.clearUI(this.rolebg);
                UiDraw.clearUI(this.roleinfomation);
            }
        };
        xuanfuListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        xuanfuListRender.prototype.equClick = function (evt) {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                selectserver.SelectServerModel.getInstance().ChgCurVo(this.itdata.data);
                ModuleEventManager.dispatchEvent(new selectserver.SelectServerEvent(selectserver.SelectServerEvent.HIDE_SELECTSERVER_EVENT));
                ModuleEventManager.dispatchEvent(new selectserver.SelectServerEvent(selectserver.SelectServerEvent.SHOW_JOINGAME_EVENT));
            }
        };
        xuanfuListRender.prototype.setnull = function () {
            UiDraw.clearUI(this.bg);
            UiDraw.clearUI(this.new);
            UiDraw.clearUI(this.state);
            UiDraw.clearUI(this.serverid);
            UiDraw.clearUI(this.servername);
            UiDraw.clearUI(this.rolebg);
            UiDraw.clearUI(this.roleinfomation);
        };
        return xuanfuListRender;
    }(SListItem));
    selectserver.xuanfuListRender = xuanfuListRender;
})(selectserver || (selectserver = {}));
//# sourceMappingURL=xuanfuList.js.map