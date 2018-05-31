<template>
	<div class="index">
		<form class="formyboy justify-content-center" @submit="request" action="" method="">
			<div id="doc">
				<div id="hd">
					<h1>Peer Tutor Request Form ({{ getFormTitle }})</h1>
					<br>
					<span id="description">Tutoring is provided by students from the California Scholarship Federation MVHS chapter. Students will be paired with student tutors, who are members of CSF. The tutoring program won't begin until late January 2018, but you can start submitting requests now.</span>
				</div>
				<table class="postForm">
					<tbody>
						<div id="bd">
							<!-- <tr>
								<ul v-for="course in courses">
									<li> course: ( name: {{ course }}, id: {{ Object.keys(courses)[0] }} )</li>
								</ul>
							</tr> -->
							<tr>
								<td>Full Name</td>
								<td>
									<input name="fullName" type="text" v-model="request.fullName" required>
								</td>
							</tr>
							<tr>
								<td>Cellphone Number</td>
								<td>
									<input name="cellPhoneNum" type="text" v-model="request.cellPhoneNum" required>
								</td>
							</tr>
							<tr>
								<td>Email</td>
								<td>
									<input name="email" type="text" v-model="request.email" required>
								</td>
							</tr>
							<tr>
								<td>Gender</td>
								<td>
									<input type="radio" name="gender" v-model="request.gender" value="Male" checked> Male<br>
									<input type="radio" name="gender" v-model="request.gender" value="Female"> Female<br>
								</td>
							</tr>
							<tr>
								<td>Grade</td>
								<td>
									<input name="grade" type="text" v-model="request.grade" required>
								</td>
							</tr>
							<tr>
								<td>Parent Full Name</td>
								<td>
									<input name="parentFullName" type="text" v-model="request.parentFullName" required>
								</td>
							</tr>
							<tr>
								<td>Parent Email</td>
								<td>
									<input name="parentEmail" type="text" v-model="request.parentEmail" required>
								</td>
							</tr>
							<tr>
								<td>Parent Cellphone Number</td>
								<td>
									<input name="parentCellPhoneNum" type="text" v-model="request.parentCellPhoneNum" required>
								</td>
							</tr>
							<tr>
								<td>Payment</td>
								<td>
									<input type="checkbox" value="BOTH" name="payment" v-model="request.payment">
								</td>
							</tr>
							<tr>
								<td>Courses</td>
								<div class="form-check" v-for="(course, courseCode) in courseList">
									<input class="form-check-input" type="checkbox" name="payment" v-bind:id="courseCode" v-bind:value="courseCode"
										v-model="request.courses">
									<label class="form-check-label" v-bind:for="courseCode">
										{{course}}
									</label>
								</div>
							</tr>
							<tr>
								<td>Ideas</td>
								<td>
									<input name="ideas" type="text" v-model="request.ideas">
								</td>
							</tr>
						</div>

						<div class="#" id="captcha"></div>

						<input type="submit" class="btn btn-primary" value="Submit">
					</tbody>
				</table>
			</div>
		</form>
	</div>
</template>

<script>
    export default {
        name: 'Request Tutor',
        data () {
            return {
				request: {
					fullName: '',
					cellPhoneNum: '',
					email: '',
					gender: '', 
					grade: '',
					parentFullName: '',
					parentEmail: '',
					parentCellPhoneNum: '',
					payment: '',
					ideas: '',
					termsAndConditions: '',
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
            request(event) {
                let vm = this;
                if (vm.request.grade) vm.request.grade = vm.request.grade.toString();
                _api.newRequest(vm.request, function (err, res) {
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
