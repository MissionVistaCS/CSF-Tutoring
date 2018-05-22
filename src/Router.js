import Vue from 'vue'
import Router from 'vue-router'
import Index from './components/Index.vue'
import RequestTutor from './components/RequestTutor.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        }
    ]
});

