import Store from 'Store'

import {RESPONSE} from 'Public/socket.config'

import {putMessage} from 'Lib/notice'

/**
 * 请求事件的 参数存储对象
 * @type {{}}
 */
const _COMMON_HOLDER = {};

/**
 * 通用 response 事件
 * @type {{}}
 */
const _COMMON_RESPONSE = {
  /**
   * 采集作品
   * @param result
   */
  [RESPONSE.CMD_GATHER_PRODUCTION_RESULT](result) {
    const {list} = result;
    Store.commit('ADD_PRODUCTION_LIST', list);
  },
  /**
   * 采集用户
   * @param result
   */
  [RESPONSE.CMD_GATHER_USER_RESULT](result) {
    const {list} = result;
    Store.commit('ADD_USER_LIST', list);
  },
  /**
   * 采集粉丝
   * @param result
   */
  [RESPONSE.CMD_GATHER_FANS_RESULT](result) {
    const {list} = result;
    Store.commit('ADD_FANS_LIST', list);
  },
  /**
   * 采集作品评论
   * @param result
   */
  [RESPONSE.CMD_GATHER_PRODUCTION_COMMENT_RESULT](result) {
    const {list} = result;
    Store.commit('ADD_PRODUCTION_COMMENT_LIST', list);
  },
  /**
   * 采集用户作品
   * @param result
   */
  [RESPONSE.CMD_USER_PRODUCTION_RESULT](result) {
    const {list} = result;
    Store.commit('ADD_USER_PRODUCTION_LIST', list);
  },
  /**
   * 模拟操作
   * @param result
   */
  [RESPONSE.CMD_SIMULATION_OPERATION_RESULT](result) {

  },
  /**
   * 通用反馈处理
   * @param result
   */
  [RESPONSE.CMD_COMMON_ASYNC_TASK_RESULT](result) {
    const {extra} = result;
    console.log('result', result);
    putMessage({message: extra, type: 'warning'});
  },
};

export const COMMON_HOLDER = _COMMON_HOLDER;

export const COMMON_RESPONSE = _COMMON_RESPONSE;
