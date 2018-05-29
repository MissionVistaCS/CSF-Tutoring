<template>
    <div class="container">

        <!-- Sidebar -->
        <div v-if="loggedIn" class="nav-side-menu col-lg-3 col-offset-4 centered">
            <div class="menu-list">

                <ul id="menu-content" class="menu-content">
                    <div v-if="loggedIn && user.userGroup.includes('ADMIN')">
                        <li class="">
                            <i class="fa fa-globe fa-lg"></i> Admin Stuff <span class="arrow"></span>
                        </li>
                        <ul class="sub-menu" id="service">
                            <a :href="'/admin/users'"><li>List All Users</li></a>
                            <a :href="'/admin/entries'"><li>List All Tutoring Request Entries</li></a>
                            <!--<a :href="'/admin/courses'"><li>Edit Courses</li></a>-->
                            <a :href="'/admin/signup'"><li>Add User</li></a>
                        </ul>
                    </div>

                    <li>
                        <a :href="'/edituser'">
                            <i class="fa fa-user fa-lg"></i> Edit Profile
                        </a>
                    </li>

                    <li>
                        <a :href="'/entries'">
                            <i class="fa fa-users fa-lg"></i> List Tutees (Assigned to me)
                        </a>
                    </li>

                    <li>
                        <input value="Logout" style="margin: 0px;" type="button" v-on:click="logout">
                    </li>
                </ul>
            </div>
        </div>

        <a :href="'/login'" v-if="!loggedIn">You are not logged in!</a>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loggedIn: false,
                user: false
            }
        },
        created() {
            let vm = this;
            _api.session(function (err, res) {
                if (err) {
                    console.log("Not logged in.");
                }
                else if (res.data)
                {
                    vm.loggedIn = true;
                    vm.user = res.data;
                }
            });
        },
        beforeRouteUpdate (to, from, next) {
            let vm = this;
            _api.session(function (err, res) {
                if (err) {
                    console.log("Not logged in.");
                }
                else if (res.data)
                {
                    vm.loggedIn = true;
                    vm.user = res.data;
                }
            });
            next();
        },
        methods: {
            logout() {
                let vm = this;
                _api.logout(function (err) {
                    if (err) {
                        vm.loggedIn = false;
                        return console.log(err);
                    }
                    vm.loggedIn = false;
                    vm.$router.push('/');
                });
            }
        }
    }
</script>

<style scoped>
    .nav-side-menu {
        position: relative;
        top: 20px;
    }
</style>
