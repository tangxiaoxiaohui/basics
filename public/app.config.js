let baseApi, // api基础访问地址
  host = location.host.split(':')[0]; // 当前域名

// 初始化域名
if (host === 'localhost' || host === '192.168.1.103') {
  host = '192.168.1.99';
} else {
  host = location.host.split(':')[0];
}

// 初始化api基础访问地址
baseApi = location.protocol + '//' + host + ':9991';

// 初始化 webSocket 前缀
let webSocketProtocal = "ws";
if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'local') {
  webSocketProtocal = "ws";
}

/**
 * APP API请求 与 weSocket请求 路径配置
 * @type {{API_Protocal: string, API_BASE_URL: string, WS_BASE_URL: string}}
 */
export const API_CONFIG = {
  // API 前缀
  API_PROTOCAL: '/api',
  // api 基础url
  API_BASE_URL: baseApi,
  // 不进行 token 拦截的 api
  NOT_INTERCEPT_API: [
    // 获取 token
    '/token',
    // 获取验证码
    '/api/Account/getVerifyCode'
  ],
  // webSocket 基础url
  WS_BASE_URL: `${webSocketProtocal}://${host}:9993`,
};

/**
 * 客户端标记
 */
export const CLIENT = 'client';
