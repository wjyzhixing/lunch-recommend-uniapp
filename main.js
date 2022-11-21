import App from './App.vue'
// import axios from 'axios'
// import Qs from 'qs'
import * as navTo from '@/utils/navTo.js'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
// Vue.prototype.axios = axios
// Vue.prototype.qs = Qs
Vue.prototype.$navTo = navTo
	
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
