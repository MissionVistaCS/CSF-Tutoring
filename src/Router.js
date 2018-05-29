import Vue from 'vue'
import Router from 'vue-router'
import Index from './components/Index.vue'
import UserConsole from './components/UserConsole.vue'
import Login from './components/Login.vue'
import ListEntriesAdmin from './components/ListEntriesAdmin.vue'
import Signup from './components/Signup.vue'
import SignupSuccess from './components/SignupSuccess.vue'
import ListEntries from './components/ListEntries.vue'
import ListUsers from './components/ListUsers.vue'
import EditUser from './components/EditUser.vue'
import EditUserSuccess from './components/EditUserSuccess.vue'

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
        },
        {
            path: '/entries',
            name: 'ListEntries',
            component: ListEntries
        },
        {
            path: '/admin/users',
            name: 'ListUsers',
            component: ListUsers
        },
        {
            path: '/editUser',
            name: 'EditUser',
            component: EditUser
        },
        {
            path: '/editUser/success',
            name: 'EditUserSuccess',
            component: EditUserSuccess
        },
    ]
});

