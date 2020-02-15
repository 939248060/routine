// 判断字符串是否为空的正则表达式，空白字符对应的unicode编码
var empty_regex = /[\s\u00a0\u2007\u202f\u0009-\u000d\u001c-\u001f]+/;

// 判断字符串是否为空
function isEmpty(input) {
  return input == null || input == "" || empty_regex.test(input);
}
// 判断字符串是否不为空
function isNotEmpty(input) {
  return !isEmpty(input);
}
// 判断是否手机号
function isMobile(value) {
  let eg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
  if (value.length == 0 || Number(value.length) != 11 || !eg.test(value)) {
    return false;
  }
  return true;
}
// 判断是否数字，不含小数点
function isInteger(value) {
  let re = /^\d*$/;
  return (!re.test(value)) ? false : true;
}
// 判断是否数字，带小数点
function isNumeral(value) {
  let eg = /^\d+(\.\d+)?$/;
  return (eg.test(value));
}
//判断是否是价格
function isPrice(value) {
  let re = /^[+-]?(0|([1-9]\d*))(\.\d{1,2})?$/;
  return (!re.test(value)) ? false : true;
}
// 判断是否中文
function isChinese(value) {
  let eg = /^[\u4e00-\u9fa5]+$/;
  return (!eg.test(value)) ? false : true;
}
// 判断字符长度
function isLong(value, len) {
  //var eg = /^\S{2,8}$/;
  let eg = new RegExp("^\\S{" + len + "}$");
  return (!eg.test(value)) ? false : true;
}
// 判断字符在字符串中什么位置
function indexOf(txt, value) {
  let str = txt.split('');
  for (let i = 0; i < str.length; i++) {
    if (str[i] == value) {
      return i;
    }
  }
}

module.exports = {
  isEmpty: isEmpty,
  isNotEmpty: isNotEmpty,
  isMobile: isMobile,
  isInteger: isInteger,
  isNumeral: isNumeral,
  isPrice: isPrice,
  isChinese: isChinese,
  isLong: isLong,
  indexOf: indexOf
}