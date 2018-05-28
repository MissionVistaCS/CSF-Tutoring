import Vue from 'vue'
import Router from 'vue-router'
import Index from './components/Index.vue'
import UserConsole from './components/UserConsole.vue'
import Login from './components/Login.vue'
import ListEntriesAdmin from './components/ListEntriesAdmin.vue'
import Signup from './components/Signup.vue'
import SignupSuccess from './components/SignupSuccess.vue'

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
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup
        },
        {
            path: '/signup/success',
            name: 'SignupSuccess',
            component: SignupSuccess
        }
    ]
});

