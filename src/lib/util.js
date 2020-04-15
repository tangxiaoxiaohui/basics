// hash 码
const HASH_CODE = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '_']

/**
 * 获取随机数
 * @param min 最小值
 * @param max 最大值
 * @returns {number}
 */
function randomNumber (min, max) {
  return parseInt(Math.random() * (max - min + 1) + min)
}

/**
 * 获取随机 hash 字符串
 * @param length 字符穿的长度
 * @returns {string}
 */
function getHashString (length = 16) {
  const max = HASH_CODE.length - 1
  let id = ''
  for (let i = 0; i < length; i++) {
    id += HASH_CODE[randomNumber(0, max)]
  }
  return id
}
