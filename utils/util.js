const StringUtil = require("../utils/stringUtil.js");

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

/** 根据传入变量获取子项目
   * @state    状态
   * @pid      父类id
   */
function ergodicScrap(list, pid) {
  let subItem = [];
  list.forEach(item => {
    if (item.parentId == pid) {
      subItem.push(item);
    }
  })
  return subItem;
}
/** 上门回收合计项目价格
   * @selectItem   已选项目数组
   * @type         detail：回收物清单合计
   */
function sumPrice(selectItem, type) {
  let that = this;
  let count = 0;
  selectItem.forEach(item => {    // 合计价格
    if (type == 'detail') {       // 回收物清单合计
      count += (StringUtil.isNotEmpty(item.totalPrice)) ? Number(item.totalPrice) : 0;
    } else {
      count += (StringUtil.isNotEmpty(item.price)) ? Number(item.price) : 0;
    }
  })
  return count.toFixed(2);
}
/** 上门回收，政府回收和商户回收计算单个回收物总回收价格
 * @amount      重量
 */
function countPrice(count, amount) {
  let totalPrice = 0;
  if (StringUtil.isNumeral(amount)) {
    // 为了避免浮点运算有误差，所有数都放大100倍运算，然后在缩小10000倍
    totalPrice = (((count * 100) * (amount * 100)) / 10000).toFixed(2);  /* 计算回收物回收积分 */
  }
  return totalPrice;
}
/** 上门回收合计项目量心币
   * @selectItem   已选项目数组
   * @type         detail：回收物清单合计
   */
function sumScore(selectItem, type) {
  let that = this;
  let count = 0;
  selectItem.forEach(item => {    // 合计价格
    if (type == 'detail') {       // 回收物清单合计
      count += (StringUtil.isNotEmpty(item.totalScore)) ? item.totalScore : 0;
    } else {
      count += (StringUtil.isNotEmpty(item.score)) ? item.score : 0;
    }
  })
  return count;
}
/** 上门回收计算单个回收物总回收量心币
 * @amount      重量
 */
function countScore(count, amount) {
  let totalScore = 0;
  if (StringUtil.isNumeral(amount)) {
    // 为了避免浮点运算有误差，所有数都放大100倍运算，然后在缩小10000倍
    totalScore = parseInt(((count * 100) * (amount * 100)) / 10000);  /* 计算回收物回收积分 */
  }
  return totalScore;
}

// 银行卡Luhm校验
function checkBankCard(value) {
  //if (value == null || value == '' || value.length < 16 || value.length > 19) {
  if (value == null || value == '' || value.length > 19) {
    showToast("银行卡号长度必须是19位", 'none', 2000);
    //showToast("银行卡号长度必须在16到19之间", 'none', 2000);
    return false;
  }
  let num = /^\d*$/;
  if (!num.test(value)) {
    showToast("银行卡号必须全为数字", 'none', 2000);
    return false;
  }
  let strBin = ['10','18','30','35','37','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','58','60','62','65','68','69','84','87','88','94','95','98','99'];
  //console.log(value.substring(0, 2));
  //console.log(strBin.indexOf('62'));
  if (strBin.indexOf(value.substring(0, 2)) == -1) {
    showToast("银行卡号开头6位不符合规范", 'none', 2000);
    return false;
  }
  // 取出最后一位(与luhm进行比较)
  let lastNum = value.substr(value.length - 1, 1);
  // 取出前15或18位
  let first15Num = value.substr(0, value.length - 1);
  let newArr = new Array();
  for (let i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
    newArr.push(first15Num.substr(i, 1));
  }
  let arrJiShu = new Array();     //奇数位*2的积 <9
  let arrJiShu2 = new Array();    //奇数位*2的积 >9
  let arrOuShu = new Array();     //偶数位数组
  for (let j = 0; j < newArr.length; j++) {
    if ((j + 1) % 2 == 1) {       //奇数位
      if (parseInt(newArr[j]) * 2 < 9)
        arrJiShu.push(parseInt(newArr[j]) * 2);
      else
        arrJiShu2.push(parseInt(newArr[j]) * 2);
    }
    else                          //偶数位
      arrOuShu.push(newArr[j]);
  }
  let jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
  let jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
  for (let h = 0; h < arrJiShu2.length; h++) {
    jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
    jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
  }
  let sumJiShu = 0;               //奇数位*2 < 9 的数组之和
  let sumOuShu = 0;               //偶数位数组之和
  let sumJiShuChild1 = 0;         //奇数位*2 >9 的分割之后的数组个位数之和
  let sumJiShuChild2 = 0;         //奇数位*2 >9 的分割之后的数组十位数之和
  let sumTotal = 0;
  for (let m = 0; m < arrJiShu.length; m++) {
    sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
  }
  for (let n = 0; n < arrOuShu.length; n++) {
    sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
  }
  for (let p = 0; p < jishu_child1.length; p++) {
    sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
    sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
  }
  //计算总和
  sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);
  //计算Luhm值
  let k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
  let luhm = 10 - k;
  if (lastNum == luhm) {
    return true;
  }
  else {
    showToast("银行卡号不正确", 'none', 2000);
    return false;
  }
}
// 验证身份证号是否符合
function validIdCard(code) {
  //console.log(code);
  let tip = "";
  let pass = true;
  //验证身份证格式（6个地区编码，8位出生日期，3位顺序号，1位校验位）
  if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
    tip = "身份证号格式错误";
    pass = false;
    console.log("身份证号格式错误");
  } else {
    //18位身份证需要验证最后一位校验位
    if (code.length == 18) {
      code = code.split('');
      //∑(ai×Wi)(mod 11)
      //加权因子
      let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      let sum = 0;
      let ai = 0;
      let wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      let last = parity[sum % 11];
      if (parity[sum % 11] != code[17]) {
        tip = "校验位错误";
        pass = false;
      }
    }
  }
  return pass;
}
// 吐司框
function showToast(title,icon,duration) {
  uni.showToast({
    title: title,
    icon: icon,
    duration: duration
  });
}
// 判断用户登录状态
function isLogin(header) {
  var status = header.cookiestatus;
  if (status != null && status == 'timeout') {
    //showToast('请重新登录', 'none', 3000);
    wx.redirectTo({ url: '../login/login' });
  }
}

function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}

function getUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
        util.showToast("授权失败，请重新授权", 'none', 5000);
      }
    });
  })
}
/**
 * 根据日期字符串获取星期几
 * @param dateString 日期字符串（如：2016-12-29），为空时为用户电脑当前日期
 * @returns {String}
 */
function getWeek(dateString) {
  var date;
  if (dateString == null) {
    return null;
  } else {
    var dateArray = dateString.split("-");
    date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
  }
  return "周" + "日一二三四五六".charAt(date.getDay());
}


function getStatus(code) {
	let temp = [];
	if (StringUtil.isEmpty(code)) {   // 判断是否存在
		return;
	}
	/* 智能站/智能箱状态代码，0代表正常，1代表异常或警报
	 * 0-32位为主机代码，33位后每隔32位为箱体代码
	 * 如33-64位是1号箱，65-96位是2号箱，以此类推
	 */
	let len = code.length / 32;			// 确定循环次数
	for (let sub = 0;sub < len;sub++) {	// 遍历箱体
		let subcode = code.substring(sub * 32, sub * 32 + 32);	// 告警数据
		
		if (subcode.indexOf("1") < 0) {	// 整箱无异常跳过
			continue;
		}
		let abnormal = { device: (sub == 0) ? "主" : sub };
		let alarm = [];
		for (let i = 0;i < 32;i++) {	// 遍历每个状态
			let status = subcode.substring(i, i + 1);
			if (status === "1") {
				alarm.push((sub == "0") ? getSynDevice(i) : getBoxDevice1(i));
			}
		}
		abnormal.alarm = alarm;
		temp.push(abnormal);
	}
	return temp;
}
/** 主机设备
 * @param {Object} state
 */
function getSynDevice(state) {
	let resStr = "";
	  if (state == 0) {
	    resStr = "扬声器";
	  } else if (state == 1) {
	    resStr = "电子秤";
	  } else if (state == 2) {
	    resStr = "显示屏";
	  } else if (state == 3) {
	    resStr = "打印机";
	  } else if (state == 4) {
	    resStr = "扫码器";
	  } else if (state == 5) {
	    resStr = "缺纸";
	  } else if (state == 6) {
	    resStr = "正在清运";
	  }
	  return resStr;
}

/** 箱子设备
 * @param {Object} state	状态位
 * @param {Object} type		智能站或智能箱
 * @param {Object} box		箱号
 */
function getBoxDevice(state, type, box) {
  let resStr = "";
  box = (type == "bin") ? box + "箱" :"";
  if (state == 0) {
    resStr = box + "投放口";
  } else if (state == 1) {
    resStr = box + "回收门";
  } else if (state == 2) {
    resStr = box + "红外1";
  } else if (state == 3) {
    resStr = box + "红外2";
  } else if (state == 4) {
    resStr = box + "红外3";
  } else if (state == 5) {
    resStr = box + "震动";
  } else if (state == 7) {
    resStr = box + "红外4";
  } else if (state == 8) {
    resStr = box + "门开启";
  } else if (state == 9) {
    resStr = box + "锁开启";
  }
  return resStr;
}

/** 箱子设备
 * @param {Object} state	状态位
 * @param {Object} type		智能站或智能箱
 * @param {Object} box		箱号
 */
function getBoxDevice1(state) {
  let resStr = "";
  if (state == 0) {
    resStr = "投放口";
  } else if (state == 1) {
    resStr = "回收门";
  } else if (state == 2) {
    resStr = "红外1";
  } else if (state == 3) {
    resStr = "红外2";
  } else if (state == 4) {
    resStr = "红外3";
  } else if (state == 5) {
    resStr = "震动";
  } else if (state == 7) {
    resStr = "红外4";
  } else if (state == 8) {
    resStr = "门开启";
  } else if (state == 9) {
    resStr = "锁开启";
  }
  return resStr;
}
//1代智能箱用户端显示信息（品种满箱状态，打印机缺纸状态
function getBin1(data) {
	let boxStatus = [];
	boxStatus.box = [];
	data.forEach(item => {
		if (item.device == '主') {
			item.alarm.forEach(i => {
				if(i=='缺纸') {
					boxStatus.mainStatu = "站点打印机缺纸"
				}
			})
		}else{
			item.alarm.forEach(i => {
				if(i=='红外1' || i=='红外2' || i=='红外3') {
					boxStatus.box.push(item.device);
				}
			})
		}
	})
	return boxStatus;
}

//2代智能箱用户端显示信息（品种满箱状态，打印机缺纸状态
function getBin2(data) {
	let boxStatus = [];
	boxStatus.box = [];
	data.forEach(item => {
		if (item.device == '主') {
			item.alarm.forEach(i => {
				if(i=='缺纸') {
					boxStatus.mainStatu = "站点打印机缺纸"
				}
			})
		}else{
			item.alarm.forEach(i => {
				if(i=='红外1' && i=='红外2') {
					boxStatus.box.push(item.device);
				}else if (i=='红外3') {
					boxStatus.box.push(item.device);
				}
			})
		}
	})
	return boxStatus;
}

module.exports = {
  ergodicScrap: ergodicScrap,
  sumPrice: sumPrice,
  countPrice: countPrice,
  sumScore: sumScore,
  countScore: countScore,
  showToast: showToast,
  isLogin: isLogin,
  validIdCard: validIdCard,
  checkBankCard: checkBankCard,
  login: login,
  getUserInfo: getUserInfo,
  getWeek: getWeek,
	getStatus: getStatus,
	getBin1: getBin1,
	getBin2: getBin2,
}