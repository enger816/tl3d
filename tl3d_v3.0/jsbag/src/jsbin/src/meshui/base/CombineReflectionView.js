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
    var CombineReflectionView = /** @class */ (function (_super) {
        __extends(CombineReflectionView, _super);
        function CombineReflectionView(value) {
            var _this = _super.call(this, value) || this;
            _this.list = [];
            return _this;
        }
        CombineReflectionView.prototype.getMeshInfo = function () {
            var obj = {};
            obj.class = this;
            obj.data = [];
            for (var i = 0; i < this.list.length; i++) {
                obj.data.push(this.list[i].getMeshInfo());
            }
            return obj;
        };
        CombineReflectionView.prototype.replayUiList = function () {
            this.destory(); //复活UI
            for (var i = 0; this.list && i < this.list.length; i++) {
                this.list[i].replayUiList();
            }
        };
        CombineReflectionView.prototype.addView = function ($view) {
            var _this = this;
            this.list.push($view);
            $view.categoryFun = function () {
                _this.refreshViewValue();
            };
        };
        CombineReflectionView.prototype.refreshViewValue = function () {
            var ty = this.top;
            for (var i = 0; i < this.list.length; i++) {
                this.list[i].top = ty;
                ty += this.list[i].height;
                this.list[i].refreshViewValue();
            }
            _super.prototype.refreshViewValue.call(this);
        };
        CombineReflectionView.prototype.destory = function () {
            for (var i = 0; i < this.list.length; i++) {
                this.list[i].destory();
            }
        };
        CombineReflectionView.prototype.resize = function () {
            _super.prototype.resize.call(this);
            for (var i = 0; this.list && i < this.list.length; i++) {
                this.list[i].width = this.width;
                this.list[i].resize();
            }
        };
        return CombineReflectionView;
    }(prop.MetaDataView));
    prop.CombineReflectionView = CombineReflectionView;
})(prop || (prop = {}));
//# sourceMappingURL=CombineReflectionView.js.map