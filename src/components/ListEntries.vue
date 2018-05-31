<template>
    <div class="container">
        <h2>My Entries</h2>
        <p>Here are all the tutees you are paired with.</p>
        <a :href="'/console'">Back to console</a>
        <table class="table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Parent Name</th>
                <th>Parent Phone</th>
                <th>Grade</th>
                <th>Phone Number</th>
                <th>Created</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="entry in entries" class="clickable" v-on:click="openEntry(entry)">
                <td>{{entry.fullName}}</td>
                <td>{{entry.parentFullName}}</td>
                <td>{{entry.parentCellPhoneNum}}</td>
                <td>{{entry.grade}}</td>
                <td>{{entry.cellPhoneNum}}</td>
                <td>{{new Date(entry.created).toDateString()}}</td>
                <td>{{entry.state}}</td>
                <td><button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#entry">Open Entry</button></td>
            </tr>
            </tbody>
        </table>

        <!-- Modal -->
        <div id="entry" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" v-if="openedEntry">{{openedEntry.fullName}}</h4>
                    </div>
                    <div class="modal-body" v-if="openedEntry">
                        <p v-if="openedEntry.fullName">Name: {{openedEntry.fullName}}</p>
                        <p v-if="openedEntry.gender">Gender: {{openedEntry.gender}}</p>
                        <p v-if="openedEntry.grade">Grade: {{openedEntry.grade}}</p>
                        <p v-if="openedEntry.email">Email: {{openedEntry.email}}</p>
                        <p v-if="openedEntry.cellPhoneNum">Cell Phone Num: {{openedEntry.cellPhoneNum}}</p>
                        <p v-if="openedEntry.parentFullName">Parent Name: {{openedEntry.parentFullName}}</p>
                        <p v-if="openedEntry.parentEmail">Parent Email: {{openedEntry.parentEmail}}</p>
                        <p v-if="openedEntry.parentCellPhoneNum">Parent Number: {{openedEntry.parentCellPhoneNum}}</p>
                        <p v-if="openedEntry.payment">Payment: {{openedEntry.payment}}</p>
                        <p v-if="openedEntry.courses">Courses: {{openedEntry.courses.join(', ')}}</p>
                        <p v-if="openedEntry.created">Created: {{new Date(openedEntry.created).toDateString()}}</p>
                        <p v-if="openedEntry.state">State: {{openedEntry.state}}</p>
                    </div>
                    <div class="modal-footer" v-if="openedEntry">
                        <button type="button" class="btn btn-default" data-dismiss="modal" v-on:click="closeEntry">Close</button>
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
                entries: [],
                openedEntry: null
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

                    _api.myEntries(vm.user._id, function (err, res) {
                        if (err) {
                            console.log("Error getting entries.");
                        }
                        else if (res.data)
                        {
                            vm.entries = res.data;
                            vm.entries.forEach(function (entry) {
                                _api.courses(function (err, res) {
                                    if (err) {
                                        console.log("Error getting courses.");
                                    } else if (res.data) {
                                        entry.courses.forEach(function (courseId, index) {
                                            entry.courses[index] = res.data[courseId];
                                        });
                                    }
                                });

                                entry.notifications.forEach(function (notification, index) {
                                    entry.notifications[index] = new Date(notification).toDateString();
                                });
                            });
                        }
                    });
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

                    _api.myEntries(vm.user._id, function (err, res) {
                        if (err) {
                            console.log("Error getting entries.");
                        }
                        else if (res.data)
                        {
                            vm.entries = res.data;
                            vm.entries.forEach(function (entry) {
                                _api.courses(function (err, res) {
                                    if (err) {
                                        console.log("Error getting courses.");
                                    } else if (res.data) {
                                        entry.courses.forEach(function (courseId, index) {
                                            entry.courses[index] = res.data[courseId];
                                        });
                                    }
                                });

                                entry.notifications.forEach(function (notification, index) {
                                    entry.notifications[index] = new Date(notification).toDateString();
                                });
                            });
                        }
                    });
                }
            });
            next();
        },
        methods: {
            openEntry(entry) {
                this.openedEntry = entry;
            },
            closeEntry() {
                this.openedEntry = null;
            }
        }
    }
</script>

<style scoped>
    .clickable:hover {
        color: red;
    }
</style>