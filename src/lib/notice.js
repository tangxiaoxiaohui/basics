import { Message, MessageBox } from 'element-ui'

// eslint-disable-next-line no-unused-vars
const { alert, confirm, prompt } = MessageBox

// 默认返回 true/false 的函数定义
const [returnTrue, returnFalse] = [() => true, () => false]

// 默认返回 输入内容/null 的函数定义
const [returnValue, returnNull] = [({ value }) => value, () => null]

/**
 * 通知栏
 * @param message 消息内容
 * @param type 消息类型 success(成功)/warning(警告)/info(消息)/error(错误)
 * @param time 默认关闭时间
 */
export function putMessage ({ message = '', type = 'success', time = 5 }) {
  Message({
    message,
    type,
    duration: time * 1000
  })
}

/**
 * 确认操作弹窗
 * @param content 提示内容
 * @param title 提示标题
 * @param confirmButtonText 确认按钮文案
 * @param cancelButtonText 取消按钮文案
 * @param resolve 确认回调函数
 * @param reject 取消回调函数
 * @returns {Promise<*>}
 */
export async function confirmMessage ({ content, title, confirmButtonText, cancelButtonText, resolve, reject }) {
  return await confirm(content, title || '提示', {
    confirmButtonText: confirmButtonText || '确定',
    cancelButtonText: cancelButtonText || '取消'
  }).then(resolve ? () => resolve() || true : returnTrue, reject ? () => reject() && false : returnFalse)
}

/**
 * 返回输入值的 确认的弹窗
 * @param content 提示内容
 * @param title 提示标题
 * @param confirmButtonText 确认按钮文案
 * @param cancelButtonText 取消按钮文案
 * @param inputValue 输入框的初始文本
 * @param resolve 确认回调函数
 * @param reject 取消回调函数
 * @returns {Promise<*>}
 */
export async function promptMessage ({ content, title, confirmButtonText, cancelButtonText, inputValue, resolve, reject }) {
  return await prompt(content, title || '提示', {
    confirmButtonText: confirmButtonText || '确定',
    cancelButtonText: cancelButtonText || '取消',
    inputValue,
  }).then(resolve ? ({ value }) => resolve() || value : returnValue, reject ? () => reject() && null : returnNull)
}
