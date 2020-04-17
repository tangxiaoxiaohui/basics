import Vue from 'vue';
import Menu from './_index.vue';

/**
 * 右键菜单 Vue 实例
 */
let MenuVue;

/**
 * 右键菜单 dom 实例
 * @type {Element}
 */
let MenuElement;

/**
 * 初始化菜单组件
 */
function initMenu(options) {
	if (MenuElement) {
		return;
	}
	let menu = Vue.extend(Menu);
	MenuVue = new menu();
	MenuElement = MenuVue.$mount().$el;
	MenuVue.mounted = initData(options);
	document.body.appendChild(MenuVue.$mount().$el);
	MenuVue.$on("click", hideShowMenu);
	window.addEventListener('mousedown', hideShowMenu, false);
	window.addEventListener('touchstart', hideShowMenu, false);
	window.addEventListener('blur', hideShowMenu, false);
}

/**
 * 初始化数据
 * @param options = {
 *     orientation(方位): left(left_top,left_bottom)|right(right_top,right_bottom)|top(top_left,top_right)|bottom(bottom_left,bottom_right)
 *     distance(距离所属方位的距离): number 单位px 大于 0 向下/向右移动 小于0 向上/向左 移动
 *     skewing(偏移量): number 单位px 大于 0 向下/向右移动 小于0 向上/向左 移动
 *     event: 事件对象
 *     menu: 菜单
 * }
 * @returns {*}
 */
function initData(options) {
	const {event, menu, orientation = 'default', distance = 0, skewing = 0} = options;
	MenuVue.initDateList({
		event,
		orientation,
		distance: Number(distance) || 0,
		skewing: Number(skewing) || 0,
		list: menu,
	});
	hideShowMenu('block');
}

/**
 * 隐藏菜单
 */
function hideShowMenu(value) {
	MenuElement['style'].display = value === 'block' ? value : 'none';
}

export default function (options) {
	if (!MenuElement) {
		initMenu(options);
	} else {
		Vue.nextTick(() => {
			initData(options);
		});
	}
}
