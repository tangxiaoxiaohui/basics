import {API_CONFIG, CLIENT} from 'Public/app.config'

import {getToken} from 'Lib/token'
import {runResponseEvent} from './sockteEvent'

import accountService from 'Service/accountService'

// webSocket 基础路径
const {WS_BASE_URL} = API_CONFIG;

class MessageService {
  constructor() {
    this.Socket = null; // socket实例
    this.accountId = null; // 当前账号id
    this.accessToken = ''; // accessToken
    this.reconnectTimer = ''; // 循环刷新连接器
  }

  connect() {
    this.close();
    const {id: accountId} = accountService.getAccount();
    const {access_token} = getToken();
    this.accountId = accountId;
    this.accessToken = access_token;
    // 建立socket连接
    this.Socket = new WebSocket(`${WS_BASE_URL}?client=${CLIENT}&accountId=${accountId}&accessToken=${access_token}&t=${Date.now()}`);
    // 当socket建立连接
    this.Socket.onopen = this._onWsOpen.bind(this);
    // 当socket接收数据
    this.Socket.onmessage = runResponseEvent.bind(this);
    // 当socket关闭连接
    this.Socket.onclose = this._onWsClosed.bind(this);
    // 当socket报错
    this.Socket.onerror = this._onWsError.bind(this);
  }

  /**
   * 当socket建立连接
   * 关闭连接请求,进行当前账号socket的单点登陆
   * @private
   */
  _onWsOpen() {
    clearInterval(this.reconnectTimer);
    this.reconnectTimer = undefined;
    const params = {
      cmdType: 'CmdSignIn',
      accountId: this.accountId,
      accessToken: this.accessToken,
      client: CLIENT
    };
    this.sendMessage(JSON.stringify(params))
  }

  /**
   * 当socket关闭连接
   * @param event
   * @private
   */
  _onWsClosed(event) {
    const reconnectTimer = this;
    if (event.code !== 1000) {
      reconnectTimer || setInterval(this.connect.bind(this), 3000);
    }
  }

  /**
   * 当socket报错
   * @param event
   * @private
   */
  // eslint-disable-next-line no-unused-vars
  _onWsError(event) {
    // TODO 记录报错日志
  }

  /**
   * 关闭socket连接
   */
  close() {
    this.Socket && this.Socket.close();
  }

  /**
   * 给服务器发送socket通知
   * @param params
   */
  sendMessage(params) {
    this.Socket.send(params);
  }
}

export default new MessageService()
