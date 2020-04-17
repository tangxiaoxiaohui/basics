import {refreshToken} from 'Api/login'

const clientTokenKey = 'client-token'; // 客户端 token key
const ServerTokenKey = 'admin-token'; // 服务端 token key

const PERSIST_KEY = 'persist_key';

/**
 * 获取token
 * @returns {string}
 */
export function getToken () {
  let token = localStorage.getItem(clientTokenKey);
  try {
    token = JSON.parse(token)
  } catch (e) {
    token = null
    // TODO 报错日志token格式化失败
  }
  return token
}

/**
 * 设置token
 * @param token token值
 */
export function saveToken (token) {
  return localStorage.setItem(clientTokenKey, JSON.stringify(token || {}))
}

/**
 * 设置用户缓存标记
 * @param persistKey
 */
export function setPersistKey (persistKey) {
  return localStorage.setItem(PERSIST_KEY, JSON.stringify(persistKey))
}

/**
 * 获取用户缓存标记key
 * @returns {string}
 */
export function getPersistKey () {
  return localStorage.getItem(PERSIST_KEY)
}

/**
 * 删除token
 */
export function removeToken () {
  localStorage.removeItem(clientTokenKey)
}

/**
 * 刷新token
 */
export async function refreshCurrentToken () {
  setInterval(async function () {
    const token = getToken()
    const refreshTokenResult = await refreshToken(token.refresh_token);
    refreshTokenResult.expires_time = Date.now() + (refreshTokenResult.expires_in - 120) * 1000;
    saveToken(refreshTokenResult)
  }, 1000 * 60 * 29)
}
