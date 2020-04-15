import Store from 'Store'

import { getUserInfo } from 'Api/account'

/**
 * 账号业务类
 */
class accountService {
  /**
   * 构造函数
   */
  constructor () {
    this.account = {} // 当前账号
    this.privilegeFrags = [] // 当前账号权限
    this.tenant = {} // 当前账号租户信息
  }

  /**
   * 初始化当前账号数据
   * @returns {Promise<void>}
   */
  async init () {
    // 初始化当前账号
    const { account, privilegeFrags, tenant } = await getUserInfo()
    this.account = account || []
    this.privilegeFrags = privilegeFrags || {}
    this.tenant = tenant || {}

    // 设置账号信息
    Store.commit('ACCOUNT_CHANGE', account)
  }

  /**
   * 获取当前账号信息
   * @returns {{}|*}
   */
  getAccount () {
    return this.account
  }
}

export default new accountService()
