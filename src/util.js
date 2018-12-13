// 工具函数库
import config from './config'

const axios = require('axios');
const Qs = require('qs');

// http get工具函数 获取数据
export function get(url, data) {
  return request(url, 'GET', data)
}
export function post(url, data) {
  return request(url, 'POST', data)
}

function request(url, method, data) {
  return new Promise((resolve, reject) => {
    axios({
      method: method,//请求方式
      url: config.host + url,//请求地址
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      data: Qs.stringify(data),// 请求数据
    })
      .then(function (res) {
        resolve(res.data)
      })
      .catch(function (err) {
        reject(err)
      });
  })
}



export function timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '年';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
  var D = date.getDate() + '日';
  return Y + M + D;
}