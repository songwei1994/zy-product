/**
 * Created by LuJiaJia on 16/11/18.
 */

import { checkAccountExist } from "@/api/user";
import de from "element-ui/src/locale/lang/de";

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validPhone(str) {
  return /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/.test(str)
}

/**
 * @param {string} rule, value, callback
 * @returns {Boolean}
 */
export function validCardID(rule, value, callback) {
  if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
    callback(new Error('你输入的身份证长度或格式错误'))
  }
  // 身份证城市
  var aCity = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' }
  if (!aCity[parseInt(value.substr(0, 2))]) {
    callback(new Error('你的身份证地区非法'))
  }

  // 出生日期验证
  var sBirthday = (value.substr(6, 4) + '-' + Number(value.substr(10, 2)) + '-' + Number(value.substr(12, 2))).replace(/-/g, '/')
  var d = new Date(sBirthday)
  if (sBirthday !== (d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate())) {
    callback(new Error('身份证上的出生日期非法'))
  }

  // 身份证号码校验
  var sum = 0
  var weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  var codes = '10X98765432'
  for (var i = 0; i < value.length - 1; i++) {
    sum += value[i] * weights[i]
  }
  var last = codes[sum % 11] // 计算出来的最后一位身份证号码
  if (value[value.length - 1] !== last) {
    callback(new Error('你输入的身份证号非法'))
  }

  callback()
}

/**
 * 校验账户是否存在，
 * @param rule
 * @param value
 * @param callback
 */
export function validateAccountExist(rule, value, callback){
  if(value === ''){
    callback(new Error('请输入账号！'))
  }
  let accountParam = {
    id: '',
    account: value
  }
  checkAccountExist(accountParam).then(response => {
    if (response.data.result) {
      callback(new Error('该账号已存在！'))
    } else {
      callback()
    }
  }).catch(() => {
    callback(new Error('获取账号信息失败！'))
  })
}

/**
 * 校验账户是否存在，带用户id
 * @param rule
 * @param value
 * @param callback
 * @param id 账户id，使用时
 */
export function validateAccountExistWithId(rule, value, callback, id){
  if(value === ''){
    callback(new Error('请输入账号！'))
  }
  let accountParam = {
    id: id? id:'',
    account: value
  }
  checkAccountExist(accountParam).then(response => {
    if (response.data.result) {
      callback(new Error('该账号已存在！'))
    } else {
      callback()
    }
  }).catch(() => {
    callback(new Error('获取账号信息失败！'))
  })
}
