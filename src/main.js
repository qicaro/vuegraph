import Vue from 'vue';
import App from './App.vue';
import vSelect from 'vue-select'


Vue.config.productionTip = false;
new Vue({
	render: h => h(App)
}).$mount('#app');

Vue.component('v-select', vSelect)