/* eslint-disable no-console */
import {getUserInfo } from 'Api/account'
import {loginByUsername ,getVerifyCode} from 'Api/login'
import {saveToken, setPersistKey} from 'Lib/token'
import Storage from 'Lib/storage'
import {toClientMain} from 'Lib/redirect'

/**
 * 保存用户名密码
 * @param user 用户(用户名密码)
 */
function saveUser(user) {
  let userList;
  try {
    userList = Storage.get('userList') || {};
    Object.assign(userList, user);
    Storage.set('userList', userList);
  } catch (e) {
    // todo 保存用户名密码失败
    console.log('保存用户名密码失败');
  }
}

/**
 * 主页面JS
 */
export default {
  data() {
    return {
      // 用户名
      username: '',
      // 密码
      password: '',
      // 验证码
      verification: '',
      // 验证码标识id
      verificationId: null,
      // 验证码图片
      verifyCodeImage: '',
      // 记住密码
      rememberPassword: false,
      // 登陆类型
      loginType: 'kefu-client',

      // 用户列表
      userList: [],
    };
  },
  methods: {
    /**
     * 登陆
     * @returns {Promise<void>}
     */
    async login() {
      const {username, password, verification, verificationId, rememberPassword} = this;
      const data = await loginByUsername(username, password, verification, verificationId);
      if (data) {
        rememberPassword && saveUser({[username]: password}); // 保存用户名密码
        saveToken(data); // 保存token
        let user = await getUserInfo();
        let persistKey = user.tenant.guid + ':' + user.account.id;
        setPersistKey(persistKey);
        toClientMain(); // 去主页面
      } else {
        await this.getVerifyCodeData();
      }
    },
    /**
     * 获取验证码
     * @returns {Promise<void>}
     */
    async getVerifyCodeData() {
      const data = await getVerifyCode();
      if (data) {
        this.verifyCodeImage = data['verifyCodeImage'];
        this.verificationId = data.verifySessionId;
        this.verification = '';
      }
    },
  },
  async created() {
    // 初始化数据
    await appInit(this);
  },
  computed: {
    /**
     * 不能登陆
     */
    unLogin() {
      const {username, password, verification} = this;
      if (verification) {
        return !(username && password && verification);
      } else {
        return !(username && password);
      }
    }
  }
}

/**
 * 主页面初始化
 * @returns {Promise<void>}
 */
async function appInit(self) {
  self.userList = Storage.get('userList');
}

