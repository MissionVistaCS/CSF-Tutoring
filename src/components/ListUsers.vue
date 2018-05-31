<template>
    <div class="container">
        <h2>All Users</h2>
        <p>Here are all of the users.</p>
        <a :href="'/console'">Back to console</a>
        <table class="table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Grade</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Groups</th>
                <th>Created</th>
                <th>Active</th>
                <th>Verified</th>
                <th>Cell Phone Verified</th>
                <th>Warnings</th>
                <th>Max Students</th>
                <th>Payment</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in users" class="clickable" v-on:click="openEntry(user)">
                <td>{{user.fullName}}</td>
                <td>{{user.gender}}</td>
                <td>{{user.grade}}</td>
                <td>{{user.email}}</td>
                <td>{{user.cellPhoneNum}}</td>
                <td>{{user.userGroup.join(', ')}}</td>
                <td>{{new Date(user.created).toDateString()}}</td>
                <td>{{user.active}}</td>
                <td>{{user.verified}}</td>
                <td>{{user.cellPhoneVerified}}</td>
                <td>{{user.warnings}}</td>
                <td>{{user.maxStudents}}</td>
                <td>{{user.payment}}</td>
                <td>
                    <button type="button" class="btn btn-info btn-lg" data-toggle="modal"
                            data-target="#user">Open Entry
                    </button>
                </td>
            </tr>
            </tbody>
        </table>

        <!-- Modal -->
        <div id="user" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" v-if="openedUser">{{openedUser.fullName}}</h4>
                    </div>
                    <div class="modal-body" v-if="openedUser">
                        <p v-if="openedUser.fullName">Name: {{openedUser.fullName}}</p>
                        <p v-if="openedUser.gender">Gender: {{openedUser.gender}}</p>
                        <p v-if="openedUser.grade">Grade: {{openedUser.grade}}</p>
                        <p v-if="openedUser.email">Email: {{openedUser.email}}</p>
                        <p v-if="openedUser.cellPhoneNum">Cell Phone Num: {{openedUser.cellPhoneNum}}</p>
                        <p v-if="openedUser.userGroup">User Groups: {{user.userGroup.join(', ')}}</p>
                        <p v-if="openedUser.created">Created: {{new Date(user.created).toDateString()}}</p>
                        <p v-if="openedUser.active">Active: {{user.active}}</p>
                        <p v-if="openedUser.verified">Verified: {{user.verified}}</p>
                        <p v-if="openedUser.cellPhoneVerified">Cellphone Verified: {{user.cellPhoneVerified}}</p>
                        <p v-if="openedUser.warnings">Warnings: {{user.warnings}}</p>
                        <p v-if="openedUser.maxStudents">Max Students: {{user.maxStudents}}</p>
                        <p v-if="openedUser.payment">Payment: {{openedUser.payment}}</p>
                        <p v-if="openedUser.courses">Courses: {{openedUser.courses.join(', ')}}</p>
                    </div>
                    <div class="modal-footer" v-if="openedUser">
                        <button type="button" class="btn btn-default" data-dismiss="modal"
                                v-if="openedUser.verified !== true" v-on:click="verify(openedUser)">Verify
                        </button>
                        <button type="button" class="btn btn-default" data-dismiss="modal"
                                v-on:click="editUser(openedUser)">Edit
                        </button>
                        <button type="button" class="btn btn-default" data-dismiss="modal"
                                v-on:click="closeUser">Close
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loggedIn: false,
                user: false,
                users: [],
                openedUser: null
            }
        },
        created() {
            let vm = this;
            _api.session(function (err, res) {
                if (err) {
                    console.log("Not logged in.");
                }
                else if (res.data) {
                    vm.loggedIn = true;
                    vm.user = res.data;
                }
            });

            _api.allUsers(function (err, res) {
                if (err) {
                    console.log("Error getting users.");
                }
                else if (res.data) {
                    vm.users = res.data;
                    vm.users.forEach(function (user) {
                        _api.courses(function (err, res) {
                            if (err) {
                                console.log("Error getting courses.");
                            } else if (res.data) {
                                user.courses.forEach(function (courseId, index) {
                                    user.courses[index] = res.data[courseId];
                                });
                            }
                        });
                    });
                }
            });
        },
        beforeRouteUpdate(to, from, next) {
            let vm = this;
            _api.session(function (err, res) {
                if (err) {
                    console.log("Not logged in.");
                }
                else if (res.data) {
                    vm.loggedIn = true;
                    vm.user = res.data;
                }
            });

            _api.allUsers(function (err, res) {
                if (err) {
                    console.log("Error getting users.");
                }
                else if (res.data) {
                    vm.users = res.data;
                    vm.users.forEach(function (user) {
                        _api.courses(function (err, res) {
                            if (err) {
                                console.log("Error getting courses.");
                            } else if (res.data) {
                                user.courses.forEach(function (courseId, index) {
                                    user.courses[index] = res.data[courseId];
                                });
                            }
                        });
                    });
                }
            });
            next();
        },
        methods: {
            openEntry(user) {
                this.openedUser = user;
            },
            closeUser() {
                this.openedUser = null;
            },
            verify(user) {
                _api.verifyEntry(user, function (err, res) {
                    if (err) {
                        alert("Error verifying user.");
                    }
                    else if (res.data) {
                        alert("Successfully verified user!");
                        user.verified = true;
                    }
                });
            },
            editUser(user) {
                let vm = this;
                vm.$router.push('/admin/edit-user/' + user._id);
            }
        }
    }
</script>

<style scoped>
    .clickable:hover {
        color: red;
    }
</style>
