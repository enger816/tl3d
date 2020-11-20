window.ExtConfig = function () {
  function t() {};
  //资源地址
  t.res_path = "";
  //web服务器链接地址
  t.net_host = "";
  //服务器列表获取
  t.server_host = "";
  //获取区服列表时加密的key
  t.getplKey = "";
  // 公告秘钥
  t.noticeKey = "";
  // 后台公告地址
  t.notice_host = "";
  //是否版署
  t.BANSHU = 0;
  //日志打印等级
  t.LOG_LEVEL = 1;
  //是否调试版本
  t.RELEASE = true;
  //错误是否发送邮件
  t.sendMail = true;
  //是否本地
  t.isLocal = false;
  //语言
  t.lang = "zh_CN"; //"zh_CN","zh_HK","en_ML
  //是否启用优先小包加载
  t.isSubPack = true;

  //审核配置
  t.changeConfig = function () {
    //资源地址
    t.res_path = "";
    //服务器链接地址
    t.net_host = "";
    //服务器列表获取
    t.server_host = "";
    //获取区服列表时加密的key
    t.getplKey = "";
    // 公告秘钥
    t.noticeKey = "";
    // 后台公告地址
    t.notice_host = "";
  }

  /** 初始化 */
  t.initSDK = function () {
    t.initVideo(t.adId1);

    let wxparam = wx.getLaunchOptionsSync();
    console.log("启动参数:", wxparam);

    //如果有邀请信息，就发送一条协议
    if (wxparam && wxparam.query) {
      let shareinfo = wxparam.query;
      console.log("分享透传数据:", shareinfo);
      if (shareinfo.hasOwnProperty('serverId') && shareinfo.hasOwnProperty('playerId')) {
        BingoSDK.platparam.fromUid = shareinfo.serverId + "," + shareinfo.playerId + "," + BingoSDK.platparam.uid;
        //如果有携带分享来源，则需要向服务端推送
        var md5Sign = hex_md5(shareinfo.serverId + shareinfo.playerId + BingoSDK.platparam.uid + "5ynJ1FJS4iajM3COI4Uw6Zc3auHCty95");
        console.log("分享md5:", md5Sign);
        var shareurl = shareinfo.cpurl + "?serverId=" + shareinfo.serverId + "&playerId=" + shareinfo.playerId + "&userId=" + BingoSDK.platparam.uid + "&sign=" + md5Sign;
        console.log("分享url:", shareurl);
        if (wx && wx.request) {
          wx.request({
            url: shareurl
          });
        } else {
          console.log('无效wx对象');
        }
      }
    }

  }

  /** 刷新游戏 */
  t.gameRefresh = function () {
    window['wx'].exitMiniProgram();
  }

  /** 退出游戏 */
  t.exitGame = function () {
    window['wx'].exitMiniProgram();
  }
  t.shareCall = null;
  /** 调用 分享方法 */
  t.share = function (title, desc, imgUrl, callback, extParm) {
    t.shareCall = callback;
    var url = "https://" + extParm.domain + "/server" + (extParm.merge_id !== "0" ? extParm.merge_id : extParm.srv_id + "/admin/player/invite_qq");
    var obj = {
      title: title,
      imgUrl: imgUrl,
      query: 'serverId=' + extParm.serverId + '&playerId=' + extParm.playerId + '&userId=' + extParm.userId + '&cpurl=' + url
    }
    console.log("分享数据：", obj);
    t.lzSDK.showShare(obj);
  }

  t.setClipBoardData = function (clipData, callback) {
    wx.setClipboardData({
      data: clipData,
      success(res) {
        if (callback) {
          callback();
        }
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  };

  t.adId1 = "";
  t.videoObj = null;
  t.videoCb = null;

  //激励广告
  t.createVideoAd = function (id, callbak) {
    t.videoCb = callbak;
    if (t.videoObj) {
      t.videoObj.show()
        .catch(err => {
          t.videoObj.load()
            .then(() => t.videoObj.show())
        })
    }
  }

  t.initVideo = function () {
    if (!wx || !wx.createRewardedVideoAd) return;
    t.videoObj = wx.createRewardedVideoAd({
      adUnitId: t.adId1
    });
    if (t.videoObj) {
      t.videoObj.onLoad(() => {
        console.log('激励视频 广告加载成功')

      })
      t.videoObj.onError(err => {
        console.log("激励视频:", err);
      })
      t.videoObj.onClose(res => {
        // 用户点击了【关闭广告】按钮
        // 小于 2.1.0 的基础库版本，res 是一个 undefined
        if (res && res.isEnded || res === undefined) {
          // 正常播放结束，可以下发游戏奖励
          console.log("发送奖励");
          if (t.videoCb) t.videoCb();
        } else {
          // 播放中途退出，不下发游戏奖励
        }
      })
    }
  }

  //调用支付 
  t.pay = function (args, callback) {

    var goodsName = args['goodsName'];
    BingoSDK.paySuccess = callback;
    console.log("请求支付", args);
    //拉起支付
    let payData = {};
    payData.serverId = args['serverId']; //服务器id 
    payData.serverName = args['serverName']; //服务器名称
    payData.roleId = args['playerId']; //角色id 
    payData.roleName = args["playerName"]; //角色名称
    payData.roleLevel = args["playerLevel"]; //角色等级
    payData.gameOrderId = args['cpOrderNo']; //cp支付订单id 
    payData.goodsName = goodsName;
    payData.goodsId = args['goodsId'] + '';
    payData.openId = BingoSDK.platparam.openId;
    payData.goodsDesc = goodsName;
    payData.ext = args['extradata'];
    t.lzSDK.pay(args['money'], payData);
  }

  t.getSign = function () {
    return t.userToken;
  }

  t.kfFun = function (serid, uid, openid, uname, ulev, uvip, ct, channelid) {
    var tempurl = t.net_host + '/admin/mengke_transmit';
    var key = "";
    var dt = {
      game: serid,
      userId: uid,
      userName: openid,
      userNameCn: uname,
      userLevel: ulev,
      vipLevel: uvip,
      content: ct,
      appId: channelid,
    };

    dt['sign'] = t.signData(dt, key);

    wx.request({
      url: tempurl,
      method: "POST",
      data: dt,
      success(res) {
        console.log("succ ", res)
      },
      fail(res) {
        console.log("fail ", res)
      },
      complete(res) {
        console.log("complete ", res)
      }
    })
  }

  //签名方法
  t.signData = function (data, secret) {
    var temp = t.ksort(data);
    var arr = [];
    for (var i in temp) {
      arr.push(i + '=' + temp[i]);
    }
    var str = arr.join('&') + secret;
    return hex_sha1(str);
  };

  t.ksort = function (inputArr) {
    // original by: GeekFG (http://www.0-php.com)
    var tmp_arr = {},
      keys = [],
      i, k, that = this,
      strictForIn = false,
      populateArr = {};

    var sorter = function (a, b) {
      var aFloat = parseFloat(a),
        bFloat = parseFloat(b),
        aNumeric = aFloat + '' === a,
        bNumeric = bFloat + '' === b;
      if (aNumeric && bNumeric) {
        return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
      } else if (aNumeric && !bNumeric) {
        return 1;
      } else if (!aNumeric && bNumeric) {
        return -1;
      }
      return a > b ? 1 : a < b ? -1 : 0;
    };

    // Make a list of key names
    for (k in inputArr) {
      if (inputArr.hasOwnProperty(k)) {
        keys.push(k);
      }
    }
    keys.sort(sorter);

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT
    strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js
      .ini['phpjs.strictForIn'].local_value !== 'off';
    populateArr = strictForIn ? inputArr : populateArr;
    // Rebuild array with sorted key names
    for (i = 0; i < keys.length; i++) {
      k = keys[i];
      tmp_arr[k] = inputArr[k];
      if (strictForIn) {
        delete inputArr[k];
      }
    }
    for (i in tmp_arr) {
      if (tmp_arr.hasOwnProperty(i)) {
        populateArr[i] = tmp_arr[i];
      }
    }
    return strictForIn || populateArr;
  }

  // 登录token
  t.lzSDK = null;
  //数据上报
  t.gameReport = function (action, playId, nickname, area, group, extendData) {
    console.log("上报~", action);
    var repData = {
      roleId: playId, //角色Id	是
      roleName: nickname, //角色名称	是
    }
    if (action == "chat") {
      //升级extendData.level
      repData.server_id = area;
      repData.server_name = group;
      repData.chat_type = 1;
      repData.chat_channel = 1;
      repData.chat_scene = 1;
      repData.chat_content = extendData.content;
      repData.sender_openId = BingoSDK.platparam.openId;
      repData.sender_level = extendData.level;
      repData.sender_name = 1;
      repData.sender_vip_level = extendData.vip;
      repData.receiver_openId = 1;
      repData.receiver_level = 1;
      repData.receiver_name = 1;
      repData.receiver_vip_level = 1;
      repData.open_time = 1;
      t.lzSDK.checkChat(repData, (result) => {
        // result	String	success/fail/verify_fail/self
        // code	Int	错误码
        // content	String	处理后的聊天内容
        // faiMsg	String	失败提示内容
        //当返回verify_fail校验失败时，返回对应的code错误码：
        // -1：用户触发国家规定的违禁词词库，该条信息直接无法发出，提示有违禁词
        // -2：人工禁言玩家，一般是骂人等原因，被禁言玩家无法发出消息，提示已被禁言
        // -3：人工禁言玩家，拉人行为的原因，被禁言可以继续发消息，但其他人看不到他发的消息，没有任何提示
        // 当返回success校验成功时，返回对应的content内容：
        // 以该返回内容为主，会对聊天内容进行屏蔽词*号替换
        // 当返回fail 时，返回code错误码：
        // -9：接口出错，通讯失败，可提示网络异常
        // 当返回self时，代表此聊天仅自己可见（新增）
      });
    }

    if (action == "upgrade") {
      //升级
      repData.type = 4;
      repData.serverId = area;
      repData.level = extendData.level;
      // t.lzSDK.pushData(repData);
    } else if (action == "dayLogin" || action == "enterGame") {
      //每日活跃
      repData.type = 1;
      // t.lzSDK.pushData(repData);
    } else if (action == "createRole") {
      //创角
      repData.type = 2;
      // t.lzSDK.pushData(repData);
    } else if (action == "kf") {
      //玩家反馈
      t.kfFun(area, playId, BingoSDK.platparam.openId, nickname, extendData.level, extendData.vip, extendData.content, BingoSDK.platparam.passId);
    }
  };
  return t;
}();