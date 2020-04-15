import _ from 'lodash'
import axios from 'axios'

import { API_CONFIG, CLIENT } from 'Public/app.config.js'

import { getToken } from './token.js'
import { putMessage } from './notice.js'
import { toClientLogin } from './redirect'

const { API_BASE_URL, API_PROTOCAL, NOT_INTERCEPT_API } = API_CONFIG

// 创建一个请求实例
const service = axios.create({
  // api的base_url
  baseURL: API_BASE_URL + API_PROTOCAL,
  // 请求超时设置
  timeout: 40000
  // 请求数据修改器
  // transformRequest: data => data,
  // 相应数据修改器
  // transformResponse: data => data,
})

// 请求拦截器
service.interceptors.request.use(async config => {
  // token验证,格式化请求头携带token
  const token = getToken()

  // 初始化请求头
  config.headers.client = CLIENT
  if (!_.isEmpty(token)) {
    initHeaders(config, token)
  } else if (!NOT_INTERCEPT_API.includes(config.url)) {
    setTimeout(toClientLogin, 50)
  }
  // 继续请求
  return config
}, async error => {
  // todo 请求失败
  return Promise.resolve(null)
});

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { data, status } = response;
    if (status === 204 || status === 200) {
      return Promise.resolve(data)
    }
    promptNews(response)
    return Promise.resolve(null)
  },
  error => {
    const { response = { status: 0, data: {} } } = error
    promptNews(response)
    return Promise.resolve(null)
  }
)

// 初始化请求头
function initHeaders (config, token) {
  const { token_type, access_token } = token
  config.headers.Authorization = `${token_type} ${access_token}`
}

// 通知信息
function promptNews ({ status, data }) {
  switch (status) {
    case 400 :
    case 500 : // 通知错误信息
      putMessage({ message: data.error_description || data, type: 'error' })
      break
    case 401 : // 跳转至登录页
      toClientLogin()
      break
    case 403 : // 缺少权限
      putMessage({ message: '缺少权限', type: 'error' })
      break
    case 404 :
      putMessage({ message: '请求路径错误', type: 'error' })
      break
    default :
      break
  }
}

export default service
