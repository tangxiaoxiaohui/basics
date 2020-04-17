import request from 'Lib/request'
import {API_CONFIG} from 'Public/app.config';

// api前缀
const {API_PROTOCAL} = API_CONFIG;

/**
 * 获取用户信息
 * @returns {Promise<AxiosPromise>}
 */
export async function getUserInfo () {
  return request({
    url: API_PROTOCAL + '/account/self',
    method: 'get'
  })
}

/**
 * 获取同部门的所有账户
 * @returns {Promise<AxiosPromise>}
 */
export async function listMyDepartmentAccountsForTransfer () {
  return request({
    url: API_PROTOCAL + '/account/myDepartmentAccountsForTransfer',
    method: 'get'
  })
}

/**
 * 获取当前租户下的所有账号
 * @returns {Promise<AxiosPromise>}
 */
export async function listMyTenantAllAccounts () {
  return request({
    url: API_PROTOCAL + '/account/myTenantAllAccounts',
    method: 'get'
  })
}
