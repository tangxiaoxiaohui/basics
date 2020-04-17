<template>
    <ul class="context-menu-box" ref="menu" :style="menuPosition">
        <!--<ul class="context-menu-box" ref="menu" :style="{left: left,right: right,top: top,bottom: bottom}">-->
        <li @mousedown.left.stop
            @touchstart.stop
            @click.stop="clickItem(item)"
            :key="''+_index+item.icon"
            v-for="(item,index) in list"
            class="context-menu-item">
            <div class="lv1_menu-content">
                <i class="icon-wrap" v-if="item.icon">
                    <icon-svg :icon-class="item.icon"></icon-svg>
                </i>
                <span class="">{{item.title}}</span>
            </div>
            <div class="lv2_menu">
                <div class=""
                     :key="`lv2_`+_index"
                     @click.stop="clickItem(child)"
                     v-for="(child,index) in item.children">
                    <i class="icon-wrap">
                        <icon-svg :icon-class="child.icon"></icon-svg>
                    </i>
                    <span class="">{{child.title}}</span>
                </div>
            </div>
        </li>
    </ul>
</template>
<script>
	/**
	 * 获取元素的真实位置
	 * @param ele
	 * @returns {{offsetLeft: number, offsetTop: number}}
	 */
	function getElemPosition(ele) {
		let position = {"top": 0, "left": 0};
		if (ele.offsetParent) {
			while (ele.offsetParent) {
				position.top += ele.offsetTop;
				position.left += ele.offsetLeft;
				ele = ele.offsetParent;
			}
		} else if (ele.x) {
			position.left += ele.x;
		} else if (ele.y) {
			position.top += ele.y;
		}
		return {offsetLeft: position.left, offsetTop: position.top};
	}

	export default {
		name: 'context-menu',
		data() {
			return {
				// 数据
				list: [],
				// 基础位置
				basePosition: null,
				// 位置
				menuPosition: 'top: -9999px;left: -9999px;',
				// 事件对象
				event: null,
				// 方位
				orientation: '',
				// 间隔距离
				distance: 0,
				// 偏移距离
				skewing: 0,
				// 回调函数
				callback: null,
			}
		},
		methods: {
			// 初始化数据
			initDateList(date) {
				Object.assign(this, date);
				// 初始化事件对象真实属性
				this.initBasePosition();
				// 元素生成后,初始化菜单位置
				this.$nextTick(() => {
					this.menuPosition = this.getMenuPosition();
				});
			},
			// 点击菜单
			clickItem(value) {
				value.callback();
				this.$emit("click");
			},
			/**
			 * 初始化事件对象真实属性
			 */
			initBasePosition() {
				// 获取元素真实宽高
				// currentTarget: 当前事件注册对象
				// offsetWidth: 事件注册对象宽度
				// offsetHeight: 事件注册对象高度
				const currentTarget = this.event.currentTarget;
				const {offsetWidth, offsetHeight} = currentTarget;
				// 获取元素的真实位置
				const {offsetLeft: x_min, offsetTop: y_min} = getElemPosition(currentTarget);
				this.basePosition = {
					ew: offsetWidth,
					eh: offsetHeight,
					x_min,
					y_min,
					x_max: x_min + offsetWidth,
					y_max: y_min + offsetHeight
				}
			},
			/**
			 * 获取菜单位置
			 */
			getMenuPosition() {
				// clientX: 事件对象(鼠标),距离可视窗口左侧的距离
				// clientY: 事件对象(鼠标),距离可视窗口顶部的距离
				let left, right, top, bottom, clientX, clientY;
				// 间隔距离
				const {distance, skewing} = this;
				// 基础位置
				const {ew, eh, x_min, y_min, x_max, y_max} = this.basePosition;

				// vw:视图宽度 vh:视图高度
				const {clientWidth: vw, clientHeight: vh} = document.documentElement;
				// mw:菜单宽度 mh:菜单高度
				const {offsetWidth: mw, offsetHeight: mh} = this.$el;

				switch (this.orientation) {
					case 'top':
						top = y_min - mh - distance;
						top < 0 && (top = 0);
						left = x_min - ((mw - ew) / 2) + skewing;
						left + mw > vw && (left = undefined, right = 0);
						break;
					case 'top_left':
						top = y_min - mh - distance;
						top < 0 && (top = 0);
						left = x_min + skewing;
						left + mw > vw && (left = undefined, right = 0);
						break;
					case 'top_right':
						top = y_min - mh - distance;
						top < 0 && (top = 0);
						right = vw - x_max - skewing;
						right + mw > vw && (right = undefined, left = 0);
						break;
					case 'right':
						left = x_max + distance;
						left + mw > vw && (left = undefined, right = 0);
						top = y_min - ((mh - eh) / 2) + skewing;
						top + mh > vh && (top = undefined, bottom = 0);
						break;
					case 'right_top':
						left = x_max + distance;
						left + mw > vw && (left = undefined, right = 0);
						top = y_min + skewing;
						top + mh > vh && (top = undefined, bottom = 0);
						break;
					case 'right_bottom':
						left = x_max + distance;
						left + mw > vw && (left = undefined, right = 0);
						bottom = vh - y_max - skewing;
						bottom + mh > vh && (bottom = undefined, top = 0);
						break;
					case 'bottom':
						top = y_max + distance;
						top + mh > vh && (top = undefined, bottom = 0);
						left = x_min - ((mw - ew) / 2) + skewing;
						left + mw > vw && (left = undefined, right = 0);
						break;
					case 'bottom_left':
						top = y_max + distance;
						top + mh > vh && (top = undefined, bottom = 0);
						left = x_min + skewing;
						left + mw > vw && (left = undefined, right = 0);
						break;
					case 'bottom_right':
						top = y_max + distance;
						top + mh > vh && (top = undefined, bottom = 0);
						right = vw - x_max - skewing;
						right + mw > vw && (right = undefined, left = 0);
						break;
					case 'left':
						left = x_min - mw - distance;
						left < 0 && (left = 0);
						top = y_min - ((mh - eh) / 2) + skewing;
						top + mh > vh && (top = undefined, bottom = 0);
						break;
					case 'left_top':
						left = x_min - mw - distance;
						left < 0 && (left = 0);
						top = y_min + skewing;
						top + mh > vh && (top = undefined, bottom = 0);
						break;
					case 'left_bottom':
						left = x_min - mw - distance;
						left < 0 && (left = 0);
						bottom = vh - y_max - skewing;
						bottom + mh > vh && (bottom = undefined, top = 0);
						break;
					default:
						[{clientX, clientY}] = [this.event];
						left = (clientX + mw) > vw ? (vw - mw) : clientX;
						top = (clientY + mh) > vh ? (vh - mh) : clientY;
						return `left: ${`${left}px`};top: ${top}px`;
				}
				left = left === undefined ? '' : `left: ${left}px;`;
				right = right === undefined ? '' : `right: ${right}px;`;
				top = top === undefined ? '' : `top: ${top}px;`;
				bottom = bottom === undefined ? '' : `bottom: ${bottom}px;`;
				return `${left + right + top + bottom}`
			},
		}
	}
</script>
<style lang="scss">
    .context-menu-box {
        user-select: none;
        position: absolute;
        z-index: 9999;
        min-width: 50px;
        background: white;
        border-radius: 3px;
        padding: 4px 0;
        border: 1px solid #ddd;
        box-sizing: border-box;
        box-shadow: 0 0 20px 5px rgba(0, 0, 0, .1);
        .context-menu-item {
            font-size: 14px;
            line-height: 24px;
            cursor: pointer;
            color: #525558;
            padding: 0 10px;
            .lv1_menu-content {
                .icon-wrap {
                    display: inline-block;
                    padding: 0 10px 0 0;
                }
            }
            &:hover {
                background: #F5F7FA;
                color: #14D08A;
            }
        }
    }
</style>
