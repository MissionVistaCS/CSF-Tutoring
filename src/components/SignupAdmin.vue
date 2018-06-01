<template>
    <form class="formyboy justify-content-center" @submit="signup" action="/signup/success" method="GET">
        <div class="form-group">
            <label for="fullName">Full Name</label>
            <input type="text" class="form-control" id="fullName" placeholder="Enter fullname" v-model="user.fullName"
                   required>
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password" v-model="user.password"
                   required>
        </div>
        <div class="form-group">
            <label for="repeatPassword">Repeat Password</label>
            <input type="password" class="form-control" id="repeatPassword" placeholder="Password"
                   v-model="user.repeatedPassword" required>
        </div>
        <div class="form-group">
            <label>Gender</label>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="gender" id="male" value="MALE" v-model="user.gender"
                       required>
                <label class="form-check-label" for="male">
                    Male
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="gender" id="female" value="FEMALE"
                       v-model="user.gender" required>
                <label class="form-check-label" for="female">
                    Female
                </label>
            </div>
        </div>
        <div class="form-group">
            <label>Grade</label>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="grade" id="9" value="9" v-model="user.grade"
                       required>
                <label class="form-check-label" for="9">
                    9th Grade
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="grade" id="10" value="10" v-model="user.grade"
                       required>
                <label class="form-check-label" for="10">
                    10th Grade
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="grade" id="11" value="11" v-model="user.grade"
                       required>
                <label class="form-check-label" for="11">
                    11th Grade
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="grade" id="12" value="12" v-model="user.grade"
                       required>
                <label class="form-check-label" for="12">
                    12th Grade
                </label>
            </div>
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"
                   v-model="user.email" required>
            <small id="emailHelp"
                   class="form-text text-muted">We will only contact you through email as a last resort.
            </small>
        </div>
        <div class="form-group">
            <label for="cellPhoneNum">Cellphone Number</label>
            <input type="text" pattern="^\d{3}-\d{3}-\d{4}" class="form-control" id="cellPhoneNum"
                   aria-describedby="cellHelp" placeholder="Enter cellphone number" v-model="user.cellPhoneNum"
                   required>
            <small id="cellHelp"
                   class="form-text text-muted">Cellphone numbers should be entered in xxx-xxx-xxxx format.
            </small>
        </div>
        <div class="form-group">
            <label>What type of tutor are you?</label>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" name="userGroup" id="tutor" value="TUTOR"
                       v-model="user.userGroup">
                <label class="form-check-label" for="tutor">
                    Individual Tutor
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" name="userGroup" id="pack_tutor" value="PACK_TUTOR"
                       v-model="user.userGroup">
                <label class="form-check-label" for="pack_tutor">
                    Pack Tutor
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" name="userGroup" id="admin" value="ADMIN"
                       v-model="user.userGroup">
                <label class="form-check-label" for="admin">
                    Admin
                </label>
            </div>
        </div>
        <div v-if="user.userGroup && user.userGroup.includes('TUTOR')">
            <div class="form-group">
                <label>How many students can you realistically tutor at one time?</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="maxStudents" id="1" value="1"
                           v-model="user.maxStudents" required>
                    <label class="form-check-label" for="1">
                        1
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="maxStudents" id="2" value="2"
                           v-model="user.maxStudents" required>
                    <label class="form-check-label" for="2">
                        2
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="maxStudents" id="3" value="3"
                           v-model="user.maxStudents" required>
                    <label class="form-check-label" for="3">
                        3
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label>Form of payment?</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="payment" id="cash" value="CASH"
                           v-model="user.payment" required>
                    <label class="form-check-label" for="cash">
                        Only cash
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="payment" id="both" value="BOTH"
                           v-model="user.payment" required>
                    <label class="form-check-label" for="both">
                        Community service and/or cash
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label>What courses are you willing to tutor?</label>
                <div class="form-check" v-for="(course, courseCode) in courseList">
                    <input class="form-check-input" type="checkbox" :id="courseCode" :value="courseCode"
                           v-model="user.courses">
                    <label class="form-check-label" :for="courseCode">
                        {{course}}
                    </label>
                </div>
            </div>
        </div>
        <input type="submit" class="btn btn-primary" value="Add User">
    </form>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    fullName: "",
                    password: "",
                    repeatedPassword: "",
                    gender: "",
                    grade: "",
                    email: "",
                    cellPhoneNum: "",
                    userGroup: [],
                    courses: []
                },
                courseList: []
            }
        },
        created() {
            let vm = this;
            _api.session(function (err, res) {
                if (err) {
                    vm.$router.push('/login');
                } else if (res.data) {
                    vm.loggedIn = true;
                    if (!res.data.userGroup.includes('ADMIN')) {
                        alert('Improper credentials.');
                        vm.$router.push('/console');
                    }
                }
            });
            _api.courses(function (err, res) {
                if (err) {
                    console.log("Error getting courses." + err);
                } else if (res.data) {
                    vm.courseList = res.data;
                }
            });
        },
        methods: {
            signup(event) {
                let vm = this;
                if (!vm.user.userGroup || vm.user.userGroup.length < 1) {
                    event.preventDefault();
                    return alert("Please select what type of tutor you are.");
                }
                if (!vm.user.userGroup || (vm.user.userGroup.includes('TUTOR') && vm.user.courses.length < 1)) {
                    event.preventDefault();
                    return alert("Please select at least one course.");
                }
                if (vm.user.password !== vm.user.repeatedPassword) {
                    event.preventDefault();
                    return alert("Passwords don't match.");
                }
                if (vm.user.grade) vm.user.grade = vm.user.grade.toString();
                if (vm.user.maxStudents) vm.user.maxStudents = vm.user.maxStudents.toString();
                _api.signup(vm.user, function (err, res) {
                    if (err) {
                        event.preventDefault();
                        alert('There was a problem signing up!');
                    } else if (res.data) {
                        event.preventDefault();
                        vm.$router.push("/signup/success");
                    }
                });
                return false;
            }
        }
    }
</script>

<style scoped>
    .formyboy {
        padding: 3rem;
        border-width: 1px;
        border: solid #f7f7f9;
        width: 50%;
    }
</style>