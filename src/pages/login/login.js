import Vue from 'vue'
import App from './app/index.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'Assets/incofont/login.js'

// 通用svg组件
import IconSvg from 'Components/icon-svg'

// 注册 element-ui
Vue.use(Element);

// 注册 icon-svg
Vue.component('icon-svg', IconSvg);

// 阻止启动生产消息
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
