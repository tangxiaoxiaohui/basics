import request from 'Lib/request'
import {API_CONFIG} from 'Public/app.config';

// api前缀
const {API_PROTOCAL} = API_CONFIG;

/**
 * 模板
 * @returns {Promise<void>}
 */
export async function getFunction () {
  return request({
    url: API_PROTOCAL + '/',
    params: {},
    method: 'get'
  })
}

/**
 * 模板
 * @returns {Promise<void>}
 */
export async function postFunction () {
  return request({
    url: API_PROTOCAL + '/',
    data: {},
    method: 'post'
  })
}
