<template>
    <div class="container">
        <h2>All Entries (Admin)</h2>
        <p>Here are all the tutoring request entries.</p>
        <a :href="'/console'">Back to console</a>
        <table class="table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Duplicate</th>
                <th>Grade</th>
                <th>Phone Number</th>
                <th>Created</th>
                <th>Status</th>
                <th>Notifications</th>
                <th>Acceptance</th>
                <th>Tutor</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="entry in entries" class="clickable" v-on:click="openEntry(entry)">
                <td>{{entry.fullName}}</td>
                <td>{{entry.duplicate}}</td>
                <td>{{entry.grade}}</td>
                <td>{{entry.cellPhoneNum}}</td>
                <td>{{new Date(entry.created).toDateString()}}</td>
                <td>{{entry.state}}</td>
                <td>{{entry.notifications.length === 0 ? 'None sent' : entry.notifications.join(', ')}}</td>
                <td>{{new Date(entry.pairingAcceptance).toDateString()}}</td>
                <td v-if="entry.tutor">{{entry.tutor.fullName}}</td>
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
                        <p v-if="openedEntry.duplicate">Duplicate: {{openedEntry.duplicate}}</p>
                        <p v-if="openedEntry.courses">Courses: {{openedEntry.courses.join(', ')}}</p>
                        <p v-if="openedEntry.created">Created: {{new Date(openedEntry.created).toDateString()}}</p>
                        <p v-if="openedEntry.state">State: {{openedEntry.state}}</p>
                        <p v-if="openedEntry.notifications">Notifications: {{openedEntry.notifications.length === 0 ? 'None sent' : openedEntry.notifications.join(', ')}}</p>
                        <p v-if="openedEntry.pairingAcceptance">Pairing Acceptance Date: {{new Date(openedEntry.pairingAcceptance).toDateString()}}</p>
                        <p v-if="openedEntry.tutor">Tutor: {{openedEntry.tutor.fullName}}</p>
                        <p v-if="openedEntry.ideas">Ideas: {{openedEntry.ideas}}</p>
                    </div>
                    <div class="modal-footer" v-if="openedEntry">
                        <button type="button" class="btn btn-default" data-dismiss="modal" v-if="openedEntry.state !== 'INACTIVE'" v-on:click="deactivate(openedEntry)">Deactivate</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal" v-on:click="newPair(openedEntry)">New Pair</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal" v-if="openedEntry.state === 'PENDING'" v-on:click="approvePairing(openedEntry)">Approve Pairing</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal" v-if="openedEntry.tutor && (openedEntry.state === 'UNACCEPTED' || openedEntry.state === 'ACTIVE')" v-on:click="notifyTutor(openedEntry)">Notify Tutor</button>
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

            _api.allEntries(function (err, res) {
                if (err) {
                    console.log("Error getting entries.");
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

            _api.allEntries(function (err, res) {
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
            deactivate(entry) {
                _api.deactivateEntry(entry, function (err, res) {
                    if (err) {
                        alert("Error deactivating entry.");
                    }
                    else if (res.data)
                    {
                        alert("Successfully deactivated entry!");
                        entry.state = 'INACTIVE';
                    }
                });
            },
            approvePairing(entry) {
                _api.approvePairing(entry, function (err, res) {
                    if (err) {
                        alert("Error approving pairing for entry.");
                    }
                    else if (res.data)
                    {
                        alert("Successfully approved pairing for entry!");
                        entry.state = 'UNACCEPTED';
                    }
                });
            },
            editRequest(entry) {
                //TODO: Later
            },
            newPair(entry) {
                _api.newPair(entry, function (err, res) {
                    if (err) {
                        alert("Error initiating new pairing for entry.");
                    }
                    else if (res.data)
                    {
                        alert("Successfully initiated new pairing for entry. Please wait for a text message and then reload the page.");
                    }
                });
            },
            notifyTutor(entry) {
                _api.notifyTutor(entry, function (err, res) {
                    if (err) {
                        alert("Error notifying the paired tutor for this entry.");
                    }
                    else if (res.data)
                    {
                        alert("Successfully notified the tutor paired with this entry.");
                        entry.notifications.push(Date.now().toDateString());
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .clickable:hover {
        color: red;
    }
</style>