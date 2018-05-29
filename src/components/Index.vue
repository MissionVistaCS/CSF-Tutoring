<template>
<div class="index">
	<form class="register-form" method="post">
		<div id="doc">
			<div id="hd">
				<h1>Peer Tutor Request Form ({{ getFormTitle }})</h1>
				<br>
				<span id="description">Tutoring is provided by students from the California Scholarship Federation MVHS chapter. Students will be paired with student tutors, who are members of CSF. The tutoring program won't begin until late January 2018, but you can start submitting requests now.</span>
			</div>
			<table class="postForm">
			<tbody>
			<div id="bd">
			<tr>
			<ul v-for="course in courses">
				<li> course: ( name: {{ course }}, id: {{ Object.keys(courses)[0] }} )</li>
			</ul>
			</tr>
				<div class="container" id="classification">
					<tr>
						<td>Classification</td>
						<td>
							<input name="classification" type="text" v.model="request.classification" required>
						</td>
					</tr>		
				</div>

				<div class="container" id="fullName">
					<tr>
						<td>Full Name</td>
						<td>
							<input name="fullName" type="text" v-model="request.fullName" required>
						</td>
					</tr>
				</div>

				<div class="container" id="cellPhoneNum">
					<tr>
						<td>Cellphone Number</td>
						<td>
							<input name="cellPhoneNum" type="text" v-model="request.cellPhoneNum" required>
						</td>
					</tr>
				</div>

				<div class="container" id="email">
					<tr>
						<td>Email</td>
						<td>
							<input name="email" type="text" v-model="request.email" required>
						</td>
					</tr>
				</div>

				<div class="container" id="gender">
					<tr>
						<td>Gender</td>
						<td>
							<input type="radio" name="gender" v-model="request.gender" value="Male" checked> Male<br>
							<input type="radio" name="gender" v-model="request.gender" value="Female"> Female<br>
						</td>
					</tr>
				</div>

				<div class="container" id="grade">
					<tr>
						<td>Grade</td>
						<td>
							<input name="grade" type="text" v-model="request.grade" required>
						</td>
					</tr>
				</div>

				<div class="container" id="parentFullName">
					<tr>
						<td>Parent Full Name</td>
						<td>
							<input name="parentFullName" type="text" v-model="request.parentFullName" required>
						</td>
					</tr>
				</div>

				<div class="container" id="parentEmail">
					<tr>
						<td>Parent Email</td>
						<td>
							<input name="parentEmail" type="text" v-model="request.parentEmail" required>
						</td>
					</tr>
				</div>

				<div class="container" id="parentCellPhoneNum">
					<tr>
						<td>Parent Cellphone Number</td>
						<td>
							<input name="parentCellPhoneNum" type="text" v-model="request.parentCellPhoneNum" required>
						</td>
					</tr>
				</div>

				<div class="container" id="payment">
					<tr>
						<td>Payment</td>
						<td>
							<input type="checkbox" name="payment" v-model="request.payment">
						</td>
					</tr>
				</div>

				<div class="container" id="courses">
					<tr>
						<td>Courses</td>
						<td>Do this later</td>
					</tr>
				</div>

				<div class="container" id="ideas">
					<tr>
						<td>Ideas</td>
						<td>
							<input name="ideas" type="text" v-model="request.ideas" required>
						</td>
					</tr>
				</div>

				<div class="container" id="termsAndConditions">
				</div>

				<div class="#" id="captcha">
				</div>


				<button type="submit" class="btn btn-large btn-block btn-primary full-width" v-on:click="submitRequest">Submit Request</button>
			</tbody>
			</table>
			</div>
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
		    	classification: '',
			firstName: '',
			lastName: '',
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
            	}
	    }
        },
	methods: {
		updateCourses() {
			let vm = this;
			_api.courses(function(err, res) {
				if (err) {
					console.log(err);
					vm.courses = [];
				}

				else if (res) {
					vm.courses = JSON.parse(res.slice(6));
				}
			});

		},
		submitRequest() {
			let vm = this;
			_api.submitRequestEntry(vm.request, function(err, res) {
				if(err) {
					console.log("Error submitting request." + err);
				} else if(res.data) {
					vm.$router.push('/signup/success');
				}
			});
		}
	},
	computed: {
		getFormTitle() {
			let date = new Date();
			let term = '';
			if (date.getMonth() >= 7 && date.getMonth() <= 11) {
				term = 'Fall';
			}
			else {
				term = 'Spring';
			}

			return(term + ' ' + date.getFullYear());

		}
	},
	created () {
		let vm = this;
		vm.updateCourses();
	},
	beforeRouteUpdate(to, from, next) {
		let vm = this;
		vm.updateCourses();
		next();
	}
    }
</script>

<style scoped>
</style>
