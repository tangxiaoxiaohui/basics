import path from 'path'
import url from 'url'

// 转至登录页
export function toClientLogin () {
  location.replace(location.href.replace(/\/main.*$/, '/login'))
}

// 转至客户端主页
export function toClientMain () {
  location.replace(location.href.replace(/\/login.*$/, '/main'))
}

// 获取当前网址参数
export function getQueryString (name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const r = window.location.href.substr(window.location.href.indexOf('?') + 1).match(reg);
  if (r != null) return unescape(r[2]);
  return '';
}
