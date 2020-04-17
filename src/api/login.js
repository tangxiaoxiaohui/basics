import request from 'Lib/request'
import {API_CONFIG} from 'Public/app.config';

// api前缀
const {API_PROTOCAL} = API_CONFIG;

/**
 * 用户名密码登陆
 * @param username 用户名
 * @param password 密码
 * @param verifyCode 验证码
 * @param verifySessionId 验证码sessionID
 * @returns {Promise<AxiosPromise>}
 */
export async function loginByUsername(username, password, verifyCode = '', verifySessionId) {
  const data = `grant_type=password&username=${username}&password=${password}`;
  return request({
    url: '/token',
    method: 'post',
    data,
    headers: {verifyCode, verifySessionId},
  })
}

/**
 * token更新
 * @param refresh_token 要更新的token
 * @returns {Promise<AxiosPromise>}
 */
export async function refreshToken(refresh_token) {
  const data = `grant_type=refresh_token&refresh_token=${refresh_token}`
  return request({
    url: '/token',
    method: 'post',
    data
  })
}

/**
 * 退出登陆(登出)
 * @returns {Promise<AxiosPromise>}
 */
export async function logout() {
  return request({
    url: API_PROTOCAL+ '/Account/SignOut',
    method: 'post'
  })
}

/**
 * 获取验证码
 * @returns {Promise<AxiosPromise>}
 */
export async function getVerifyCode() {
  return request({
    url: API_PROTOCAL + '/Account/getVerifyCode',
    method: 'get',
  });
}
