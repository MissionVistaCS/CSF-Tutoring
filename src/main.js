import Vue from 'vue'
import App from './App.vue'
import router from './Router'


Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    component: {App}
});
