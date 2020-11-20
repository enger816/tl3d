/**
 * Created by enger on 2019/3/12.
 * bingo game sdk
 */
var BingoSDK = (function () {
	function BingoSDK() {};
	BingoSDK.gameId = 0;
	BingoSDK.appId = 0;
	BingoSDK.channelId = 0;
	BingoSDK.gameName = '';
	BingoSDK.loginKey = '';
	BingoSDK.payKey = '';
	BingoSDK.ser_idx = 10120000;
	BingoSDK.userToken = "";
	BingoSDK.checkFlag = 0;
	BingoSDK.shenheFlag = 1;

	BingoSDK.extConfig;
	BingoSDK.clientVersion = 0;
	BingoSDK.resVersion = 12;
	BingoSDK.sdkVersion = 0;
	BingoSDK.shareSuccess;
	BingoSDK.paySuccess;
	BingoSDK.loginCbFun;

	//刷新游戏
	BingoSDK.gameRefresh = function (action, callback) {
		if (BingoSDK.extConfig && BingoSDK.extConfig.gameRefresh) {
			BingoSDK.extConfig.gameRefresh();
		} else {
			window.location.reload();
		}
	}

	//功能开启检测
	BingoSDK.checkEnable = function (type, cb) {
		if (BingoSDK.extConfig && BingoSDK.extConfig.checkEnable) {
			BingoSDK.extConfig.checkEnable(type, cb);
		} else {
			if (cb) cb(false);
		}
	};

	//sdk客服功能
	BingoSDK.sdkKefu = function (type, cb) {
		if (cb) cb({
			code: -1
		});
	};

	//平台敏感词检测接口
	BingoSDK.checkWord = function (wordStr, callbak) {
		if (BingoSDK.extConfig && BingoSDK.extConfig.checkWord) {
			BingoSDK.extConfig.checkWord(wordStr, callbak);
		} else {
			if (callbak) callbak({
				code: 1,
				msg: wordStr
			});
		}
	};

	//设置提示
	BingoSDK.setGameFunc = function (type, callbak) {

	}
	//上报信息
	BingoSDK.gameReport = function (action, playId, nickname, area, group, extendData) {
		var conf = BingoSDK.extConfig;
		if (conf && conf.gameReport) {
			conf.gameReport(action, playId, nickname, area, group, extendData);
		}
	};

	//上报信息
	BingoSDK.report = function (uid, gameId, server, serverName, role, vip, level, partyName, sign) {
		var extraDataInfo = new Object();
		extraDataInfo.uid = uid;
		extraDataInfo.gameId = gameId;
		extraDataInfo.serverId = BingoSDK.ser_idx + server;
		extraDataInfo.serverName = serverName;
		extraDataInfo.roleId = role;
		extraDataInfo.vip = vip;
		extraDataInfo.level = level;
		extraDataInfo.partyName = partyName;
		extraDataInfo.sign = sign;
		extraDataInfo.signType = "md5";
		//<!-- 角色信息上传接口 -->
		console.log("上报信息", extraDataInfo);
	}

	//sdk查询接口是否在游戏显示及状态
	BingoSDK.queryExtraStatus = function (callback) {}

	//sdk-按钮功能
	BingoSDK.doExtraAction = function (action, callback) {}

	//获取当前环境的配置文件
	BingoSDK.getConfig = function () {
		var devenv = BingoSDK.devenv;
		return BingoSDK.configs[devenv] || BingoSDK.configs[-1];
	}

	//设置进度
	BingoSDK.setProgress = function (value) {

	}

	//获取渠道信息
	BingoSDK.getPlatform = function (callback) {
		if (callback) {
			callback(result);
		}
	}

	/** 初始化 */
	BingoSDK.initSDK = function () {
		if (BingoSDK.extConfig && BingoSDK.extConfig.initSDK) {
			BingoSDK.extConfig.initSDK();
		}
	}
	/** 唤起登录 */
	BingoSDK.login = function () {
		if (BingoSDK.extConfig && BingoSDK.extConfig.login) {
			BingoSDK.extConfig.login();
		}
	}
	/** 登出sdk账号 */
	BingoSDK.loginout = function () {
		if (BingoSDK.extConfig && BingoSDK.extConfig.logout) {
			BingoSDK.extConfig.logout();
		}
	}

	//调用观看激励视频
	BingoSDK.createVideoAd = function (id, callbak) {
		if (BingoSDK.extConfig && BingoSDK.extConfig.createVideoAd) {
			BingoSDK.extConfig.createVideoAd(id, callbak);
		}
	}

	BingoSDK.exitGame = function () {
		if (BingoSDK.extConfig && BingoSDK.extConfig.exitGame) {
			BingoSDK.extConfig.exitGame();
		}
	}

	/** 调用支付 */
	BingoSDK.pay = function (args, callback) {
		if (BingoSDK.extConfig && BingoSDK.extConfig.pay) {
			BingoSDK.extConfig.pay(args, callback);
		}
	}
	/** 调用 分享方法 */
	BingoSDK.share = function (title, desc, imgUrl, callback, extParm) {
		if (BingoSDK.extConfig && BingoSDK.extConfig.share) {
			BingoSDK.extConfig.share(title, desc, imgUrl, callback, extParm);
		}
	}

	/** 调用 复制到粘贴板 */
	BingoSDK.setClipBoardData = function (clipData, callback) {
		if (BingoSDK.extConfig && BingoSDK.extConfig.setClipBoardData) {
			BingoSDK.extConfig.setClipBoardData(clipData, callback);
		}
	}
	/** 获取签名 */
	BingoSDK.getSign = function (data) {
		// 平台独自的获取方式
		if (BingoSDK.extConfig && BingoSDK.extConfig.getSign) {
			return BingoSDK.extConfig.getSign();
		}
		// 平台url传过来的sign
		return BingoSDK.platparam ? BingoSDK.platparam.sign : "";
	}
	BingoSDK.getUserToken = function () {
		return BingoSDK.extConfig && BingoSDK.extConfig.userToken ? BingoSDK.extConfig.userToken : "";
	}

	BingoSDK.init = function (params) {
		var platparam = {};
		// uid 跟 userName 必填
		platparam.gameId = params.gameId;
		platparam.passId = params.passId;
		platparam.openId = params.openId;
		platparam.uid = params.nonce;
		platparam.userName = params.nonce;
		platparam.ts = params.ts;
		platparam.nonce = params.nonce;
		BingoSDK.extConfig.userToken = platparam.sign = params.sign;
		//other
		platparam.pid = 6; //
		platparam.ag = 1; //渠道
		console.log("bingame_sdk.外部参数：", platparam);
		BingoSDK.platparam = platparam; // 传入外部参数
		// 分享是否打开 ：
		BingoSDK.extConfig.lzSDK.isOpenShare((res) => {
			console.log("分享是否打开：", res);
		});
		// 分享回调设置：
		BingoSDK.extConfig.lzSDK.setShareCallback((result) => {
			if (result) //分享成功
			{
				BingoSDK.extConfig.shareCall();
			}
		});
	}
	return BingoSDK;
}());
window.BingoSDK = BingoSDK;