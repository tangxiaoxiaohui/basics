import IconSvg from 'Components/icon-svg'

import {formatDate} from 'Lib/date'

/**
 * 初始化全局过滤器
 */
function initFilter(Vue) {
  Vue.filter('formatDateToTimeDivider', formatDate);
}

/**
 * 初始化全局组件
 */
function initComponent(Vue) {
  Vue.component('icon-svg', IconSvg);
}

export default {
  install: function (Vue) {
    initFilter(Vue);
    initComponent(Vue);
  },
};
