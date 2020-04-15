import accountService from 'Service/accountService'

const state = {
  accountChange: 1
}

const getters = {
  account: state => {
    if (state) {
      return accountService.getAccount()
    }
  }
}

const mutations = {
  ACCOUNT_CHANGE (state) {
    state.accountChange++
  }
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
