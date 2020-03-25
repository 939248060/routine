const app = getApp();
const StringUtil = require("../utils/stringUtil.js");

/**
 * 微信请求post方法封装,token验证
 * url 
 * data
 */
function postToken(url, data) {
  let token = uni.getStorageSync("custToken");
  let app = getApp();
  if (StringUtil.isEmpty(token)) {
    console.log("未登录") 
    uni.navigateBack({ delta: 5 });            // 关闭所有页面
    uni.redirectTo({ url: '../login/login' });
  }
  return new Promise((resolve, reject) => {
    uni.request({
      url: app.globalData.host + url, method: 'POST', data: {...data},      
      header: { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'token': token },
      success: function (res) {
        if (res.statusCode === 200) {
          resolve(res);  //200: 服务端业务处理正常结束
        } else {
          if (res.statusCode === 401) {
            uni.navigateBack({ delta: 5 });            // 关闭所有页面
            uni.redirectTo({ url: '../login/login' }); // 跳转至登录页面
          } else {
            let err = "发生错误：" + res.statusCode;
            reject(err);   //其它错误，提示用户错误信息
          }
        }
      },
      fail: (err => {
        let msg = (err.errMsg != null) ? err.errMsg : err;
        reject(msg);
      })
    })
  })
}
/**
 * 微信请求post方法封装
 * url
 * data
 */
function post(url, data) {
  let app = getApp();
  return new Promise((resolve, reject) => {
    uni.request({
      url: app.globalData.host + url, method: 'POST', data: { ...data },
      header: { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' },
      success: function (res) {
        if (res.statusCode === 200) {
          resolve(res);  //200: 服务端业务处理正常结束
        } else {
          let err = "发生错误：" + res.statusCode;
          reject(err);   //其它错误，提示用户错误信息
        }
      },
      fail: (err => {
        let msg = (err.errMsg != null) ? err.errMsg : err;
        reject(msg);
      })
    })
  })
}
/**
 * 微信请求get方法封装
 * url
 * data
 */
function get(url) {
  let app = getApp();
  return new Promise((resolve, reject) => {
    uni.request({
      url:  url, method: 'GET', 
      header: { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' },
      success: function (res) {
        if (res.statusCode === 200) {
          resolve(res);  //200: 服务端业务处理正常结束
        } else {
          let err = "发生错误：" + res.statusCode;
          reject(err);   //其它错误，提示用户错误信息
        }
      },
      fail: (err => {
        let msg = (err.errMsg != null) ? err.errMsg : err;
        reject(msg);
      })
    })
  })
}
/**
 * 微信请求post方法封装,token验证
 * url
 * data
 */
function uploadToken(url, path,fromdata) {
  let token = uni.getStorageSync("custToken");
  let app = getApp();
  if (StringUtil.isEmpty(token)) {
    uni.navigateBack({ delta: 5 });            // 关闭所有页面
    uni.redirectTo({ url: '../login/login' });
  }
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: app.globalData.host + url, method: 'POST', filePath: path,
      name: 'file', header: { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'token': token },
      formData: fromdata,
	  fileType: 'image',
      success: function (res) {
        if (res.statusCode === 200) {
          resolve(res);  //200: 服务端业务处理正常结束
        } else {
          if (res.statusCode === 401) {
            uni.navigateBack({ delta: 5 });            // 关闭所有页面
            uni.redirectTo({ url: '../login/login' }); // 跳转至登录页面
          } else {
            let err = "发生错误：" + res.statusCode;
            reject(err);   //其它错误，提示用户错误信息
          }
        }
      },
      fail: (err => {
        let msg = (err.errMsg != null) ? err.errMsg : err;
        reject(msg);
      })
    })
  })
}

function postUrl(url, data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: url, method: 'POST', data: { ...data },
      header: { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' },
      success: function (res) {
        if (res.statusCode === 200) {
          resolve(res);  //200: 服务端业务处理正常结束
        } else {
          let err = "发生错误：" + res.statusCode;
          reject(err);   //其它错误，提示用户错误信息
        }
      },
      fail: (err => {
        let msg = (err.errMsg != null) ? err.errMsg : err;
        reject(msg);
      })
    })
  })
}
module.exports = {
  postToken: postToken,
  post: post,
  uploadToken: uploadToken,
  postUrl: postUrl,
  get: get,
}