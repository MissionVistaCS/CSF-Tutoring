<template>
    <div class="editUser">
        <h2>Edit User</h2>
        <hr style="width: 90%">
        <br>
        <form action="" method="">
            <table class="postForm">
                <tbody>
                <tr>
                    <td style="width: 65px; text-align: center">Full Name</td>
                    <td>
                        <input name="fullName" style="width: 145px;" type="text" v-model="user.fullName"  required>
                    </td>
                </tr>
                <tr>
                    <td style="width: 65px; text-align: center">Password</td>
                    <td>
                        <input name="password" style="width: 145px;" type="password" v-model="user.password" required>
                    </td>
                </tr>
                <tr>
                    <td style="width: 65px; text-align: center">Gender</td>
                    <td>
                        <input name="gender" id="boy" value="MALE" style="width: 145px;" type="radio" v-model="user.gender" required>
                        <span>Boy</span>
                        <br>
                        <input name="gender" id="girl" value="FEMALE" style="width: 145px;" type="radio" v-model="user.gender" required>
                        <span>Girl</span>
                    </td>
                </tr>
                <tr>
                    <td style="width: 65px; text-align: center">Grade</td>
                    <td>
                        <input name="grade" id="grade9" value="9" style="width: 145px;" type="radio" v-model="user.grade" required>
                        <span>9th</span>
                        <br>
                        <input name="grade" id="grade10" value="10" style="width: 145px;" type="radio" v-model="user.grade" required>
                        <span>10th</span>
                        <br>
                        <input name="grade" id="grade11" value="11" style="width: 145px;" type="radio" v-model="user.grade" required>
                        <span>11th</span>
                        <br>
                        <input name="grade" id="grade12" value="12" style="width: 145px;" type="radio" v-model="user.grade" required>
                        <span>12th</span>
                    </td>
                </tr>
                <tr>
                    <td style="width: 65px; text-align: center">Email</td>
                    <td>
                        <input name="email" style="width: 145px;" type="email" v-model="user.email" required>
                    </td>
                </tr>
                <tr>
                    <td style="width: 65px; text-align: center">Cellphone Number (Format: xxx-xxx-xxxx)</td>
                    <td>
                        <input name="cellPhoneNum" style="width: 145px;" type="text" pattern="^\d{3}-\d{3}-\d{4}" v-model="user.cellPhoneNum" required>
                    </td>
                </tr>
                <tr>
                    <td style="width: 65px; text-align: center">What type of tutor are you?</td>
                    <td>
                        <input name="userGroup" value="TUTOR" style="width: 145px;" type="checkbox" v-model="user.userGroup" required>
                        <span>One-on-one tutor</span>
                        <br>
                        <input name="userGroup" value="PACK_TUTOR" style="width: 145px;" type="checkbox" v-model="user.userGroup" required>
                        <span>PACK tutor</span>
                        <div v-if="user.userGroup.includes('ADMIN')">
                            <input name="userGroup" value="ADMIN" style="width: 145px;" type="checkbox" v-model="user.userGroup">
                            <span>Admin</span>
                        </div>
                    </td>
                </tr>
                <div v-if="user.userGroup.includes('TUTOR')">
                    <tr>
                        <td style="width: 65px; text-align: center">How many students can you realistically tutor at one time?</td>
                        <td>
                            <input name="maxStudents" id="maxStudents1" value="1" style="width: 145px;" type="radio" v-model="user.maxStudents">
                            <span>1</span>
                            <br>
                            <input name="maxStudents" id="maxStudents2" value="2" style="width: 145px;" type="radio" v-model="user.maxStudents">
                            <span>2</span>
                            <br>
                            <input name="maxStudents" id="maxStudents3" value="3" style="width: 145px;" type="radio" v-model="user.maxStudents">
                            <span>3</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 65px; text-align: center">Form of payment?</td>
                        <td>
                            <input name="payment" id="paymentCash" value="CASH" style="width: 145px;" type="radio" v-model="user.payment">
                            <span>ONLY Cash</span>
                            <input name="payment" id="paymentBoth" value="BOTH" style="width: 145px;" type="radio" v-model="user.payment">
                            <span>Community Service and/or Cash</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 65px; text-align: center">What courses are you willing to tutor?</td>
                        <td>
                            <div v-for="(course, courseCode) in courses">
                                <input name="courses" :value="courseCode" style="width: 145px;" type="checkbox" v-model="user.courses">
                                <span>{{ course }}</span>
                            </div>
                        </td>
                    </tr>
                </div>
                <tr>
                    <td colspan="2"
                        style="padding: 5px 0; border: none; background: none; text-align: center; font-weight: normal; padding-bottom: 20px">
                        <input value="Submit" style="margin: 0px;" type="button" v-on:click="updateUser">
                    </td>
                </tr>
                </tbody>
                <p v-if="error">{{ error }}</p>
            </table>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loggedIn: false,
                user: {},
                courses: []
            }
        },
        created() {
            let vm = this;
            _api.session(function (err, res) {
                if (err) {
                    console.log("Not logged in." + err);
                    vm.$router.push('/login');
                } else if (res.data) {
                    vm.loggedIn = true;
                    _api.courses(function(err, res) {
                        if(err) {
                            console.log("Error getting courses." + err);
                        } else if(res.data) {
                            vm.courses = res.data;
                        }
                    });
                    vm.user = res.data;
                }
            });
        },
        methods: {
            updateUser() {
                let vm = this;
                if(vm.user.userGroup.length < 1) {
                    console.log("No user group selected.");
                    alert("Please select what type of tutor you are.");
                }
                _api.editUser(vm.user, function(err, res) {
                    if(err) {
                        console.log("Error updating profile." + err);
                    } else if(res.data) {
                        vm.$router.push('/edituser/success');
                    }
                });
            }
        }
    }
</script>
