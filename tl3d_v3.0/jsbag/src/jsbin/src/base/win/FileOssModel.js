var pack;
(function (pack) {
    var Scene_data = Pan3d.Scene_data;
    var FileVo = /** @class */ (function () {
        function FileVo() {
        }
        FileVo.prototype.meshStr = function (str) {
            var $arr = str.split("/");
            this.name = $arr[$arr.length - 2];
            this.path = str;
            this.isFolder = true;
            //  console.log(this.name, this.path)
        };
        FileVo.meshObj = function (value) {
            if (value.name.length - 1 != value.name.lastIndexOf("/")) {
                var vo = new FileVo();
                var str = value.name;
                var $arr = str.split("/");
                vo.name = $arr[$arr.length - 1];
                vo.path = str.replace("upfile/shadertree/", "");
                vo.suffix = vo.name.split(".")[1];
                return vo;
            }
            return null;
        };
        FileVo.PREFAB = "prefab";
        FileVo.MATERIAL = "material";
        FileVo.JPG = "jpg";
        FileVo.PNG = "png";
        FileVo.TXT = "txt";
        FileVo.OBJS = "objs";
        FileVo.MAP = "map";
        FileVo.LYF = "lyf";
        FileVo.ZZW = "zzw";
        FileVo.SKILL = "skill";
        FileVo.MD5ANIM = "md5anim";
        FileVo.MD5MESH = "md5mesh";
        return FileVo;
    }());
    pack.FileVo = FileVo;
    var FileOssModel = /** @class */ (function () {
        function FileOssModel() {
        }
        FileOssModel.oneByOne = function () {
            var _this = this;
            if (this.waitItem.length > 0) {
                var $dir = this.waitItem[0].a; //目录
                var kFun = this.waitItem[0].b; //返回
                var nextMarker = "";
                this.ossWrapper.list({
                    'delimiter': '/',
                    'prefix': $dir,
                    'max-keys': 100,
                    'marker': nextMarker,
                }).then(function (result) {
                    _this.waitItem.shift();
                    _this.oneByOne();
                    kFun(result);
                }).catch(function (err) {
                    console.log(err);
                    console.log("网络异常。需要注意");
                    _this.waitItem.shift();
                    _this.oneByOne();
                    kFun(null);
                });
            }
        };
        FileOssModel.saveDicfileGropFun = function ($dir, fileArr, bfun) {
            //  console.log("保存文件夹目录", $dir, fileArr)
            var $byte = new Pan3d.Pan3dByteArray();
            $byte.writeUTF(JSON.stringify(fileArr));
            var $file = new File([$byte.buffer], this.indexFileName);
            var pathurl = $dir;
            console.log(pathurl + $file.name);
            pack.FileOssModel.upOssFile($file, pathurl + $file.name, function () {
                console.log("文件夹配置", pathurl + $file.name);
                bfun();
            });
        };
        FileOssModel.getDicByUrl = function ($dir, bfun, errBfun) {
            var filePath = Scene_data.ossRoot + $dir + this.indexFileName;
            Pan3d.LoadManager.getInstance().load(filePath, Pan3d.LoadManager.BYTE_TYPE, function ($byte) {
                var $dicByte = new Pan3d.Pan3dByteArray($byte);
                var $tempItem = JSON.parse($dicByte.readUTF());
                var fileArr = [];
                for (var i = 0; i < $tempItem.length; i++) {
                    var fileVo = new FileVo();
                    fileVo.name = $tempItem[i].name;
                    fileVo.path = $tempItem[i].path;
                    if ($tempItem[i].isFolder) {
                        fileVo.isFolder = $tempItem[i].isFolder;
                    }
                    if ($tempItem[i].suffix) {
                        fileVo.suffix = $tempItem[i].suffix;
                    }
                    fileArr.push(fileVo);
                }
                bfun(fileArr);
                //    console.log("url获取", filePath)
            }, {
                errorFun: function () {
                    errBfun();
                }
            });
        };
        //获得文件夹目录
        FileOssModel.getPerentPath = function (value) {
            var idex = value.lastIndexOf("/");
            if (idex != -1) {
                value = value.substr(0, idex + 1);
            }
            else {
                value = "";
            }
            return value;
        };
        //通过方法可以重新生存文件目录
        FileOssModel.getDisByOss = function ($dir, bfun) {
            var _this = this;
            //特别处理是不椒"/"结尾的文件目录
            $dir = this.getPerentPath($dir);
            this.getTempOss($dir, function (value) {
                var fileArr = [];
                for (var i = 0; value.prefixes && i < value.prefixes.length; i++) {
                    var fileVo = new FileVo();
                    fileVo.meshStr(value.prefixes[i]);
                    if (fileVo.name != "hide_min_icon") { //不是隐藏文件夹
                        fileArr.push(fileVo);
                    }
                }
                for (var j = 0; value.objects && j < value.objects.length; j++) {
                    var fileVo = FileVo.meshObj(value.objects[j]);
                    if (fileVo && fileVo.suffix != _this.indexFileName.split(".")[1]) { //不是文件夹配置文件
                        fileArr.push(fileVo);
                    }
                }
                console.log("oss获取文件目录", $dir);
                _this.saveDicfileGropFun($dir, fileArr, function () {
                    bfun(fileArr);
                });
            });
        };
        FileOssModel.getFolderArr = function ($dir, bfun) {
            var _this = this;
            if (this.isMustUseOssGetDic) {
                this.getDisByOss($dir, bfun);
            }
            else {
                this.getDicByUrl($dir, bfun, function () {
                    _this.getDisByOss($dir, bfun);
                });
            }
        };
        FileOssModel.getTempOss = function ($dir, bfun) {
            var _this = this;
            if (!this.waitItem) {
                this.waitItem = [];
            }
            this.waitItem.push({ a: $dir, b: bfun });
            if (this.waitItem.length == 1) {
                if (!this.ossWrapper) {
                    this.makeOssWrapper(function () {
                        _this.oneByOne();
                    });
                }
                else {
                    this.oneByOne();
                }
            }
        };
        FileOssModel.getWarpperByUrl = function (bfun) {
            var _this = this;
            this.WEB_SEVER_EVENT_AND_BACK("get_STS", "id=" + 99, function (res) {
                if (res && res.data && res.data.info) {
                    _this.ossWrapper = new OSS.Wrapper({
                        accessKeyId: res.data.info.AccessKeyId,
                        accessKeySecret: res.data.info.AccessKeySecret,
                        stsToken: res.data.info.SecurityToken,
                        endpoint: "https://oss-cn-shanghai.aliyuncs.com",
                        bucket: "webpan"
                    });
                    bfun();
                }
                else {
                    console.log("链接错误，重试");
                    Pan3d.TimeUtil.addTimeOut(2000, function () {
                        _this.getWarpperByUrl(bfun);
                    });
                }
            });
        };
        FileOssModel.makeOssWrapper = function (bfun) {
            var _this = this;
            if (!this.waitOssWrapper) {
                this.waitOssWrapper = [bfun];
                this.getWarpperByUrl(function () {
                    while (_this.waitOssWrapper.length) {
                        console.log("waitOssWrapper", _this.waitOssWrapper);
                        _this.waitOssWrapper.pop()();
                    }
                });
            }
            else {
                this.waitOssWrapper.push(bfun);
            }
        };
        FileOssModel.makeOssWrapperCopy = function (bfun) {
            var _this = this;
            if (!this.waitOssWrapper) {
                this.waitOssWrapper = [bfun];
                this.WEB_SEVER_EVENT_AND_BACK("get_STS", "id=" + 99, function (res) {
                    if (res && res.data && res.data.info) {
                        _this.ossWrapper = new OSS.Wrapper({
                            accessKeyId: res.data.info.AccessKeyId,
                            accessKeySecret: res.data.info.AccessKeySecret,
                            stsToken: res.data.info.SecurityToken,
                            endpoint: "https://oss-cn-shanghai.aliyuncs.com",
                            bucket: "webpan"
                        });
                        while (_this.waitOssWrapper.length) {
                            console.log("waitOssWrapper", _this.waitOssWrapper);
                            _this.waitOssWrapper.pop()();
                        }
                    }
                    else {
                        console.log("链接错误，重试");
                    }
                });
            }
            else {
                this.waitOssWrapper.push(bfun);
            }
        };
        FileOssModel.deleFile = function ($filename, $bfun) {
            if ($bfun === void 0) { $bfun = null; }
            if (!FileOssModel.ossWrapper) {
                this.makeOssWrapper(function () {
                    FileOssModel.ossWrapper.delete($filename).then(function (result) {
                        // console.log(result);
                        $bfun && $bfun();
                    }).catch(function (err) {
                        console.log(err);
                    });
                });
            }
            else {
                FileOssModel.ossWrapper.delete($filename).then(function (result) {
                    //  console.log(result);
                    $bfun && $bfun();
                }).catch(function (err) {
                    console.log(err);
                });
            }
        };
        FileOssModel.uploadFile = function ($file, $filename, $bfun) {
            if ($bfun === void 0) { $bfun = null; }
            if (!FileOssModel.ossWrapper) {
                this.makeOssWrapper(function () {
                    FileOssModel.ossWrapper.multipartUpload($filename, $file).then(function (result) {
                        //   console.log(result);
                        $bfun && $bfun();
                    }).catch(function (err) {
                        console.log(err);
                    });
                });
            }
            else {
                FileOssModel.ossWrapper.multipartUpload($filename, $file).then(function (result) {
                    //  console.log(result);
                    $bfun && $bfun();
                }).catch(function (err) {
                    console.log(err);
                });
            }
            console.log("上传文件==>", $filename);
        };
        FileOssModel.copyFile = function (toUrl, srcoueUrl, $bfun) {
            if ($bfun === void 0) { $bfun = null; }
            srcoueUrl = encodeURI(srcoueUrl);
            toUrl = decodeURI(toUrl);
            if (!FileOssModel.ossWrapper) {
                this.makeOssWrapper(function () {
                    FileOssModel.ossWrapper.copy(toUrl, srcoueUrl).then(function (result) {
                        console.log(result);
                        $bfun && $bfun();
                    }).catch(function (err) {
                        console.log(err);
                    });
                });
            }
            else {
                console.log(FileOssModel.ossWrapper.copy);
                FileOssModel.ossWrapper.copy(toUrl, srcoueUrl).then(function (result) {
                    console.log(result);
                    $bfun && $bfun();
                }).catch(function (err) {
                    console.log(err);
                });
            }
        };
        FileOssModel.WEB_SEVER_EVENT_AND_BACK = function (webname, postStr, $bfun) {
            if ($bfun === void 0) { $bfun = null; }
            webname = webname.replace(/\s+/g, "");
            var $obj = new Object();
            $obj.webname = webname;
            $obj.postStr = postStr.replace(/\s+/g, "");
            $obj.fun = $bfun;
            this.isPostWeboffwx(webname, postStr, $bfun);
        };
        //网页模式的WEB请求
        FileOssModel.isPostWeboffwx = function (webname, postStr, $bfun) {
            if ($bfun === void 0) { $bfun = null; }
            var ajax = new XMLHttpRequest();
            var url = this.webseverurl + webname;
            // $bfun = null;
            var timestamp = String(Pan3d.TimeUtil.getTimer());
            var keystr = "ABC";
            var self_sign = "ABC";
            ajax.open("post", url, true);
            ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            ajax.setRequestHeader("timestamp", timestamp);
            ajax.setRequestHeader("sign", self_sign);
            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4) {
                    if (ajax.status == 200) {
                        $bfun ? $bfun({ data: JSON.parse(ajax.responseText) }) : null;
                    }
                    else {
                        console.log("HTTP请求错误！错误码：" + ajax.status);
                        $bfun ? $bfun(null) : null;
                    }
                }
            };
            ajax.send(postStr);
        };
        FileOssModel.upOssFile = function (file, $fileUrl, $bfun) {
            var _this = this;
            if ($bfun === void 0) { $bfun = null; }
            this.waitItemUpFile.push({ a: file, b: $fileUrl, c: $bfun });
            if (this.waitItemUpFile.length == 1) {
                if (!FileOssModel.ossWrapper) {
                    FileOssModel.makeOssWrapper(function () {
                        _this.oneByOneUpFile();
                    });
                }
                else {
                    this.oneByOneUpFile();
                }
            }
        };
        FileOssModel.oneByOneUpFile = function () {
            var _this = this;
            if (this.waitItemUpFile.length > 0) {
                FileOssModel.uploadFile(this.waitItemUpFile[0].a, this.waitItemUpFile[0].b, function () {
                    // console.log(this.waitItemUpFile[0])
                    var kFun = _this.waitItemUpFile[0].c;
                    _this.waitItemUpFile.shift();
                    kFun && kFun();
                    _this.oneByOneUpFile();
                });
            }
        };
        FileOssModel.upTempFileToOss = function (bfun) {
            var htmlTxt = document.createElement('input');
            htmlTxt.setAttribute('id', '_ef');
            htmlTxt.setAttribute('type', 'file');
            htmlTxt.setAttribute("style", 'visibility:hidden');
            htmlTxt.click();
            htmlTxt.value;
            htmlTxt.addEventListener("change", function (evt) { changeFile(evt); });
            function changeFile(evt) {
                for (var i = 0; htmlTxt && i < htmlTxt.files.length && i < 1; i++) {
                    var simpleFile = htmlTxt.files[i];
                    htmlTxt = null;
                    bfun(simpleFile);
                }
            }
        };
        FileOssModel.indexFileName = "index.hidegroup"; //配置文件名读取这个文件标记为文件夹下的所以
        FileOssModel.isMustUseOssGetDic = false; //是否必须使用OSS方案 //当文件内有添加删除文件，需要更新配置文件目录
        FileOssModel.webseverurl = "http://api.h5key.com/api/";
        FileOssModel.waitItemUpFile = [];
        FileOssModel.version = 1;
        return FileOssModel;
    }());
    pack.FileOssModel = FileOssModel;
})(pack || (pack = {}));
//# sourceMappingURL=FileOssModel.js.map