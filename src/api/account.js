import request from 'Lib/request'

/**
 * 获取用户信息
 * @returns {Promise<AxiosPromise>}
 */
export async function getUserInfo () {
  return request({
    url: '/account/self',
    method: 'get'
  })
}

/**
 * 获取同部门的所有账户
 * @returns {Promise<AxiosPromise>}
 */
export async function listMyDepartmentAccountsForTransfer () {
  return request({
    url: '/account/myDepartmentAccountsForTransfer',
    method: 'get'
  })
}

/**
 * 获取当前租户下的所有账号
 * @returns {Promise<AxiosPromise>}
 */
export async function listMyTenantAllAccounts () {
  return request({
    url: '/account/myTenantAllAccounts',
    method: 'get'
  })
}
