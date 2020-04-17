import Vue from 'vue'
import App from './app/index.vue'
import store from 'Store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vueInit from 'Lib/vue.init'

// 注册 element-ui
Vue.use(Element,{
  size: 'mini'
});

// 阻止启动生产消息
Vue.config.productionTip = false;

// 初始化项目 公共组件/过滤器
Vue.use(vueInit);

new Vue({
  render: h => h(App),
  store,
}).$mount('#app');
