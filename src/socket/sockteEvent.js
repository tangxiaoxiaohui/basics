import {COMMON_HOLDER, COMMON_RESPONSE} from './socketResponse'

import webSocket from 'Socket/webSocket'
import FunctionQueue from 'Lib/functionQueue'

// 获取 webSocket 唯一id
let seq = 1;

function getSeq() {
  return seq++
}

/**
 * 执行 socket 请求 事件
 * @param data 附加参数 请求时不用, 回调时使用的数据
 * @param params socket请求时使用的参数
 * @param callback 回调事件
 * @returns {boolean}
 */
export function runRequestEvent({data, params, callback}) {
  const seq = getSeq();
  params.seq = seq;
  const cmdType = params.cmdType;
  if (callback) {
    // webSocket 请求注册
    COMMON_HOLDER[seq] = {
      cmdType,
      data,
      params: params,
      callback,
      requestTime: Date.now()
    };
  }
  webSocket.sendMessage(JSON.stringify(params));
  return true
}

/**
 * 执行 socket 回执 事件
 * @param event
 */
function responseEvent(event) {
  try {
    const response = JSON.parse(event.data);
    const {cmdType} = response;
    COMMON_RESPONSE[cmdType] && COMMON_RESPONSE[cmdType](response)
  } catch (e) {
    // todo webSocket 消息处理失败
  }
}

// 函数队列
const queue = new FunctionQueue(responseEvent);

/**
 * socket 回执 事件 放入队列
 * @param event
 */
export function runResponseEvent(event) {
  queue.add(event)
}
