import Vue from 'vue'
import Router from 'vue-router'
import Index from './components/Index.vue'
import UserConsole from './components/UserConsole.vue'
import Login from './components/Login.vue'
import ListEntriesAdmin from './components/ListEntriesAdmin.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/console',
            name: 'UserConsole',
            component: UserConsole
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/admin/entries',
            name: 'ListEntriesAdmin',
            component: ListEntriesAdmin
        }
    ]
});

