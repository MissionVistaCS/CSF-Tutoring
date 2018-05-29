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
		<th>Courses</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="entry in entries" class="clickable" v-on:click="openEntry(entry)">
                <td>{{entry.fullName}}</td>
                <td>{{entry.gender}}</td>
                <td>{{entry.grade}}</td>
		<td>{{entry.email}}</td>
                <td>{{entry.cellPhoneNum}}</td>
		<td>{{entry.userGroup.join(', ')}}</td>
                <td>{{new Date(entry.created).toDateString()}}</td>
                <td>{{entry.active}}</td>
		<td>{{entry.verified}}</td>
		<td>{{entry.cellPhoneVerified}}</td>
		<td>{{entry.warnings}}</td>
		<td>{{entry.maxStudents}}</td>
		<td>{{entry.payment}}</td>
		<td>{{entry.courses.join(', ')}}</td>
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
                        <p v-if="openedEntry.payment">Payment: {{openedEntry.payment}}</p>
                        <p v-if="openedEntry.courses">Courses: {{openedEntry.courses.join(', ')}}</p>
                    </div>
                    <div class="modal-footer" v-if="openedEntry">
                        <button type="button" class="btn btn-default" data-dismiss="modal" v-if="openedEntry.verified !== true" v-on:click="verify(openedEntry)">Verify</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal" v-on:click="editRequest(openedEntry)">Edit</button>
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
                }
            });

            _api.allUsers(function (err, res) {
                if (err) {
                    console.log("Error getting users.");
                }
                else if (res.data)
                {
                    vm.entries = res.data;
                    vm.entries.forEach(function (entry) {
                        entry.courses.forEach(function (course, index) {
                            _api.getCourseName(course, function (err, name) {
                                if (err) {
                                    console.log("Error getting course name.");
                                }
                                else if (name) {
                                    entry.courses[index] = name;
                                }
                            });
                        });

                        entry.notifications.forEach(function (notification, index) {
                            entry.notifications[index] = new Date(notification).toDateString();
                        });
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
                }
            });

            _api.allUsers(function (err, res) {
                if (err) {
                    console.log("Error getting entries.");
                }
                else if (res.data)
                {
                    vm.entries = res.data; //TODO: parse each date inside entry.notifications here. loop through
                    vm.entries.forEach(function (entry) {
                        entry.courses.forEach(function (course, index) {
                            _api.getCourseName(course, function (err, name) {
                                if (err) {
                                    console.log("Error getting course name.");
                                }
                                else if (name) {
                                    entry.courses[index] = name;
                                }
                            });
                        });

                        entry.notifications.forEach(function (notification, index) {
                            entry.notifications[index] = new Date(notification).toDateString();
                        });
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
            },
            verify(entry) {
                _api.verifyEntry(entry, function (err, res) {
                    if (err) {
                        alert("Error verifying user.");
                    }
                    else if (res.data)
                    {
                        alert("Successfully verified user!");
                        entry.verified = true;
                    }
                });
            },
            editRequest(entry) {
                window.location.href = "/editUser/"+entry._id;
            }
        }
    }
</script>

<style scoped>
    .clickable:hover {
        color: red;
    }
</style>
