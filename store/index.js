//Vuex

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		loading: false //加载等待是否显示
	},
	mutations: {
		//显示请求加载动画
		show_loading(state) {
			state.loading = true;
		},
		//隐藏请求加载动画
		hide_loading(state) {
			state.loading = false;
		}
	}
})

export default store