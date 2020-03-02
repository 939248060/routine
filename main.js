import Vue from 'vue'
import App from './App'

const util = require('./utils/util.js');
const stringUtil = require('./utils/stringUtil.js');
const request = require('./utils/request.js');

//Vuex
import store from './store'
Vue.prototype.$store = store



//请求加载组件
import Loading from './components/loading/loading.vue';
//组件挂载到全局，方便每个页面使用
Vue.component('loading',Loading);

//挂载全局显示/隐藏请求加载动画
function showLoading(){
	store.commit('show_loading');
}
function hideLoading(){
	store.commit('hide_loading');
}

Vue.prototype.$showLoading = showLoading; //全局显示动画可以 this.$showLoading();
Vue.prototype.$hideLoading = hideLoading; //全局隐藏动画可以 this.$hideLoading();

Vue.config.productionTip = false


App.mpType = 'app'
Vue.prototype.$app = App;
Vue.prototype.$util = util;
Vue.prototype.$stringUtil = stringUtil;
Vue.prototype.$request = request;



const app = new Vue({
    ...App
})
app.$mount()
