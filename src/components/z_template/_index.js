// 创建vue
export default {
	name: '',
	/**
	 * 数据
	 * @returns {{}} 初始化定义的的数据
	 */
	data() {
		return {};
	},
	/**
	 * 插槽值
	 */
	props: [],
	/**
	 * 计算属性
	 */
	computed: {

	},
	/**
	 * 定义的函数
	 */
	methods: {},
	// 初始化数据和函数( data,props,methods )
	// 初始化数据和函数后,数据绑定前
	beforeCreate() {

	},
	// 数据绑定后,模板绑定前
	created() {

	},
	// 模板绑定优先级 el > z_template > mount
	// 模板绑定后,页面渲染前
	beforeMount() {
	},
	// 页面渲染后
	mounted() {
	},
	// 数据修改前
	// beforeUpdate(){},
	// 数据修改后
	// update(){},
	// 解除数据绑定前
	beforeDestroy() {

	},
	// 解除数据绑定后
	destroy() {
	},
}
