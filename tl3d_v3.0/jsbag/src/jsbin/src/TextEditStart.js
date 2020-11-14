var TextEditStart = /** @class */ (function () {
    function TextEditStart() {
    }
    TextEditStart.initCanvas = function ($caves) {
        mainpan3d.canvas = $caves;
        Pan3d.Scene_data.fileRoot = "res/";
        Pan3d.Engine.init($caves);
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
        if (requestAnimationFrame) {
            requestAnimationFrame(TextEditStart.step);
        }
        TextEditStart.resetSize();
        var game = new AppData();
        game.init();
    };
    TextEditStart.resetSize = function () {
        if (mainpan3d.canvas) {
            mainpan3d.canvas.width = document.body.clientWidth;
            mainpan3d.canvas.height = document.body.clientHeight;
            Pan3d.Engine.resetSize(mainpan3d.canvas.width, mainpan3d.canvas.height); //设置canvas大小
            win.LayerManager.getInstance().resize();
        }
    };
    TextEditStart.step = function (timestamp) {
        requestAnimationFrame(TextEditStart.step);
        TextEditStart.upFrame();
    };
    TextEditStart.upFrame = function () {
        Pan3d.TimeUtil.update();
        Pan3d.Scene_data.context3D.update();
        var gl = Pan3d.Scene_data.context3D.renderContext;
        gl.clearColor(83 / 255, 83 / 255, 83 / 255, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
        win.LayerManager.getInstance().update();
    };
    return TextEditStart;
}());
//# sourceMappingURL=TextEditStart.js.map