<template>
    <form class="formyboy justify-content-center" @submit="newRequest" action="/request/success" method="GET">
        <div class="form-group">
            <label for="fullName">Full Name</label>
            <input type="text" class="form-control" id="fullName" placeholder="Enter fullname" v-model="entry.fullName"
                   required>
        </div>
        <div class="form-group">
            <label>Gender</label>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="gender" id="male" value="MALE" v-model="entry.gender"
                       required>
                <label class="form-check-label" for="male">
                    Male
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="gender" id="female" value="FEMALE"
                       v-model="entry.gender" required>
                <label class="form-check-label" for="female">
                    Female
                </label>
            </div>
        </div>
        <div class="form-group">
            <label>Grade</label>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="grade" id="9" value="9" v-model="entry.grade"
                       required>
                <label class="form-check-label" for="9">
                    9th Grade
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="grade" id="10" value="10" v-model="entry.grade"
                       required>
                <label class="form-check-label" for="10">
                    10th Grade
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="grade" id="11" value="11" v-model="entry.grade"
                       required>
                <label class="form-check-label" for="11">
                    11th Grade
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="grade" id="12" value="12" v-model="entry.grade"
                       required>
                <label class="form-check-label" for="12">
                    12th Grade
                </label>
            </div>
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"
                   v-model="entry.email" required>
            <small id="emailHelp"
                   class="form-text text-muted">We will only contact you through email as a last resort.
            </small>
        </div>
        <div class="form-group">
            <label for="cellPhoneNum">Cellphone Number</label>
            <input type="text" pattern="^\d{3}-\d{3}-\d{4}" class="form-control" id="cellPhoneNum"
                   aria-describedby="cellHelp" placeholder="Enter cellphone number" v-model="entry.cellPhoneNum"
                   required>
            <small id="cellHelp"
                   class="form-text text-muted">Cellphone numbers should be entered in xxx-xxx-xxxx format.
            </small>
        </div>
        <div class="form-group">
            <label for="parentFullName">Parent Full Name</label>
            <input type="text" class="form-control" id="parentFullName" placeholder="Enter parent fullname" v-model="entry.parentFullName"
                   required>
        </div>
        <div class="form-group">
            <label for="parentEmail">Parent Email</label>
            <input type="email" class="form-control" id="parentEmail" aria-describedby="parentEmailHelp" placeholder="Enter email"
                   v-model="entry.parentEmail" required>
            <small id="parentEmailHelp"
                   class="form-text text-muted">We will only contact you through email as a last resort.
            </small>
        </div>
        <div class="form-group">
            <label for="cellPhoneNum">Parent Cellphone Number</label>
            <input type="text" pattern="^\d{3}-\d{3}-\d{4}" class="form-control" id="parentCellPhoneNum"
                   aria-describedby="parentCellHelp" placeholder="Enter parent cellphone number" v-model="entry.parentCellPhoneNum"
                   required>
            <small id="parentCellHelp"
                   class="form-text text-muted">Cellphone numbers should be entered in xxx-xxx-xxxx format.
            </small>
        </div>
        <div class="form-group">
            <label>Form of payment?</label>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="payment" id="cash" value="COMM_SERVICE"
                       v-model="entry.payment" required>
                <label class="form-check-label" for="cash">
                    Only community service
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="payment" id="both" value="BOTH"
                       v-model="entry.payment" required>
                <label class="form-check-label" for="both">
                    Community service and/or cash
                </label>
            </div>
        </div>
        <div class="form-group">
            <label>What courses do you need help with?</label>
            <div class="form-check" v-for="(course, courseCode) in courseList">
                <input class="form-check-input" type="checkbox" :id="courseCode" :value="courseCode"
                       v-model="entry.courses">
                <label class="form-check-label" :for="courseCode">
                    {{course}}
                </label>
            </div>
        </div>
        <input type="submit" class="btn btn-primary" value="Submit">
    </form>
</template>

<script>
    export default {
        data() {
            return {
                entry: {
                    fullName: "",
                    gender: "",
                    grade: "",
                    email: "",
                    cellPhoneNum: "",
                    parentFullName: "",
                    parentEmail: "",
                    parentCellPhoneNum: "",
                    payment: "",
                    courses: []
                },
                courseList: []
            }
        },
        created() {
            let vm = this;
            _api.courses(function (err, res) {
                if (err) {
                    console.log("Error getting courses." + err);
                } else if (res.data) {
                    vm.courseList = res.data;
                }
            });
        },
        methods: {
            newRequest(event) {
                let vm = this;
                if (!vm.entry.courses || vm.entry.courses.length < 1) {
                    event.preventDefault();
                    return alert("Please select at least one course.");
                }
                if (vm.entry.grade) vm.entry.grade = vm.entry.grade.toString();
                _api.newRequest(vm.entry, function (err, res) {
                    if (err) {
                        event.preventDefault();
                        alert('There was a problem submitting an entry!');
                    } else if (res.data) {
                        event.preventDefault();
                        vm.$router.push("/request/success");
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