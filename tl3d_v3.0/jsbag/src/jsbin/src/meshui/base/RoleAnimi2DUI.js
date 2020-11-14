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
    var Scene_data = Pan3d.Scene_data;
    var LoadManager = Pan3d.LoadManager;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var RoleAnimi2DUI = /** @class */ (function (_super) {
        __extends(RoleAnimi2DUI, _super);
        function RoleAnimi2DUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RoleAnimi2DUI.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.textLabelUI = new prop.TextLabelUI();
            this.comboBoxUi = new prop.ComboBoxUi(80, 20);
            this.deleIcon = new prop.BaseMeshUi(16, 16);
            this.md5animUrlText = new prop.TextLabelUI(100, 16);
            this.md5animPicUi = new prop.TexturePicUi();
            this.md5animPicUi.suffix = "md5anim";
            this.md5animPicUi.addEventListener(prop.ReflectionEvet.CHANGE_DATA, this.drawInAnimUrl, this);
            this.md5searchIcon = new prop.BaseMeshUi(20, 20);
            this.propPanle.addBaseMeshUi(this.textLabelUI);
            this.propPanle.addBaseMeshUi(this.comboBoxUi);
            this.propPanle.addBaseMeshUi(this.deleIcon);
            this.propPanle.addBaseMeshUi(this.md5animUrlText);
            this.propPanle.addBaseMeshUi(this.md5animPicUi);
            this.propPanle.addBaseMeshUi(this.md5searchIcon);
            this.drawUrlImgToUi(this.md5searchIcon.ui, "icon/search.png");
            this.drawUrlImgToUi(this.deleIcon.ui, "icon/deleticon.png");
            this.comboBoxUi.addEventListener(InteractiveEvent.Down, this.comboBoxUiDown, this);
            this.deleIcon.ui.addEventListener(InteractiveEvent.Down, this.deleIconDown, this);
            this.md5searchIcon.ui.addEventListener(InteractiveEvent.Up, this.md5searchIconClik, this);
            this.height = 150;
        };
        RoleAnimi2DUI.prototype.md5searchIconClik = function (evt) {
            var vo = this.target.data;
            console.log(vo.animPlayKey);
            // var pathurl: string = Pan3d_me.Scene_data.fileRoot + value;
            //  Pan3d_me.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.LIST_DIS_ALL_FILE), pathurl.replace(Pan3d_me.Scene_data.ossRoot, ""))
        };
        RoleAnimi2DUI.prototype.drawInAnimUrl = function () {
            var _this = this;
            var meshUrl; //需要mesh信息才能编译动作
            var vo = this.target.data;
            if (vo && vo.skinMesh && vo.skinMesh.meshAry && vo.skinMesh.meshAry.length) {
                for (var i = 0; i < vo.skinMesh.meshAry.length; i++) {
                    meshUrl = vo.skinMesh.meshAry[i].md5meshurl;
                }
            }
            if (meshUrl) {
                LoadManager.getInstance().load(Scene_data.fileRoot + meshUrl, LoadManager.XML_TYPE, function ($meshstr) {
                    var $md5Srite = new left.LocalMd5MoveSprite();
                    $md5Srite.addLocalMeshByStr($meshstr);
                    LoadManager.getInstance().load(Scene_data.fileRoot + _this.md5animPicUi.url, LoadManager.XML_TYPE, function (anistr) {
                        $md5Srite.addLocalAdimByStr(anistr);
                        var animfilename = AppData.getFileName(_this.md5animPicUi.url);
                        animfilename = animfilename.split(".")[0];
                        var rolesprite = new left.MaterialRoleSprite();
                        rolesprite.changeRoleWeb($md5Srite);
                        for (var keyStr in rolesprite.animDic) { //只会有一个关键动作。  stand .需要优化可读性
                            vo.animDic[animfilename] = rolesprite.animDic[keyStr];
                        }
                        vo.animPlayKey = animfilename;
                        _this.refreshViewValue();
                        _this.changFun();
                        console.log("准备获取新的动作数据", vo.animPlayKey);
                    });
                });
            }
            else {
                alert("需要先有md5mesh文件");
            }
            /*
            LoadManager.getInstance().load(Scene_data.fileRoot + meshUrl, LoadManager.XML_TYPE, ($meshstr: any) => {
                var $md5Srite: left.LocalMd5MoveSprite = new left.LocalMd5MoveSprite()
                $md5Srite.addLocalMeshByStr($meshstr)
                LoadManager.getInstance().load(Scene_data.fileRoot + this.md5animPicUi.url, LoadManager.XML_TYPE, (anistr: any) => {
                    $md5Srite.addLocalAdimByStr(anistr)
                    var animfilename: string = AppData.getFileName(this.md5animPicUi.url)
                    animfilename = animfilename.split(".")[0]
                    var rolesprite: left.MaterialRoleSprite = new left.MaterialRoleSprite();
                    rolesprite.changeRoleWeb($md5Srite);
             
                    for (var keyStr in rolesprite.animDic) { //只会有一个关键动作。  stand .需要优化可读性
                        vo.animDic[animfilename] = rolesprite.animDic[keyStr]
                    }
                    vo.animPlayKey = animfilename;
                    this.refreshViewValue()
                    this.changFun()
                    console.log("准备获取新的动作数据", vo.animPlayKey);
                });
            });
            */
        };
        RoleAnimi2DUI.prototype.deleIconDown = function ($evt) {
            var vo = this.target.data;
            if (this.getObjKeyLen(vo.animDic) > 1) {
                if (vo.animDic[vo.animPlayKey]) {
                    var truthBeTold = window.confirm("是否确定要删除动作" + vo.animPlayKey);
                    if (truthBeTold) {
                        delete (vo.animDic[vo.animPlayKey]);
                        vo.animPlayKey = null;
                        this.refreshViewValue();
                    }
                }
            }
            else {
                alert("最后一个动作不可以删除");
            }
        };
        RoleAnimi2DUI.prototype.getObjKeyLen = function (obj) {
            var len = 0;
            for (var keyStr in obj) {
                len++;
            }
            return len;
        };
        RoleAnimi2DUI.prototype.destory = function () {
            this.textLabelUI.destory();
            this.comboBoxUi.destory();
            this.deleIcon.destory();
            this.md5animUrlText.destory();
            this.md5animPicUi.destory();
            this.md5searchIcon.destory();
            _super.prototype.destory.call(this);
        };
        Object.defineProperty(RoleAnimi2DUI.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
                this.textLabelUI.x = this._x + 0;
                this.comboBoxUi.x = this._x + 75;
                this.deleIcon.x = this._x + 150;
                this.md5animUrlText.x = this._x + 60;
                this.md5animPicUi.x = this._x + 60;
                this.md5searchIcon.x = this._x + 150;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleAnimi2DUI.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
                this.textLabelUI.y = this._y + 4;
                this.comboBoxUi.y = this._y + 6;
                this.deleIcon.y = this._y + 6;
                this.md5animUrlText.y = this._y + 100;
                this.md5animPicUi.y = this._y + 35;
                this.md5searchIcon.y = this._y + 40;
            },
            enumerable: true,
            configurable: true
        });
        RoleAnimi2DUI.prototype.comboBoxUiDown = function ($evt) {
            var _this = this;
            var $rightMenuEvet = new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_COMBOX_MENU);
            $rightMenuEvet.posv2d = new Vector2D(this.comboBoxUi.ui.absoluteX, this.comboBoxUi.ui.absoluteY + 20);
            var arrItem = [];
            for (var keyStr in this._animDic) {
                arrItem.push({ name: keyStr, type: arrItem.length });
            }
            $rightMenuEvet.comboxData = arrItem;
            $rightMenuEvet.comboxFun = function (value) { _this.selectFun(value); };
            ModuleEventManager.dispatchEvent($rightMenuEvet);
        };
        RoleAnimi2DUI.prototype.selectFun = function (value) {
            var skipId = 0;
            var vo = this.target.data;
            for (var keyStr in this._animDic) {
                vo.animPlayKey = keyStr;
                if (skipId == value) {
                    break;
                }
                skipId++;
            }
            this.changFun();
            //vo.dispatchEvent(new Pan3d.BaseEvent(Pan3d.BaseEvent.COMPLETE))
            this.refreshViewValue();
        };
        //   private selectAnimKey: string
        RoleAnimi2DUI.prototype.refreshViewValue = function () {
            if (this.FunKey) {
                this._animDic = this.target[this.FunKey];
                var vo = this.target.data;
                if (!vo.animPlayKey) {
                    for (var keyStr in this._animDic) {
                        vo.animPlayKey = keyStr;
                        break;
                    }
                }
                if (this._animDic[vo.animPlayKey]) {
                    if (!this._animDic[vo.animPlayKey].url) {
                        this._animDic[vo.animPlayKey].url = vo.animPlayKey + ".md5anim";
                    }
                    this.textLabelUI.label = "部分";
                    this.comboBoxUi.text = vo.animPlayKey;
                    this.md5animPicUi.url = "icon/txt_64x.png";
                    this.md5animUrlText.label = this._animDic[vo.animPlayKey].url;
                }
                else {
                    console.log("没有动作对象");
                }
            }
        };
        return RoleAnimi2DUI;
    }(prop.BaseReflComponent));
    prop.RoleAnimi2DUI = RoleAnimi2DUI;
})(prop || (prop = {}));
//# sourceMappingURL=RoleAnimi2DUI.js.map