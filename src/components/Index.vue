<template>
<div class="index">
	<form class="register-form" method="post">
		<div id="doc">
			<div id="hd">
				<h1>Peer Tutor Request Form ({{ getFormTitle }})</h1>
				<br>
				<span id="description">Tutoring is provided by students from the California Scholarship Federation MVHS chapter. Students will be paired with student tutors, who are members of CSF. The tutoring program won't begin until late January 2018, but you can start submitting requests now.</span>
			</div>
			<div id="bd">
			<ul v-for="course in courses">
				<li> course: ( name: {{ course }}, id: {{ Object.keys(courses)[0] }} )</li>
			</ul>
				<div class="container" id="classification">
				</div>

				<div class="container" id="firstName">
				</div>

				<div class="container" id="lastName">
				</div>

				<div class="container" id="cellPhoneNum">
				</div>

				<div class="container" id="email">
				</div>

				<div class="container" id="gender">
				</div>

				<div class="container" id="grade">
				</div>

				<div class="container" id="parentFullName">
				</div>

				<div class="container" id="parentEmail">
				</div>

				<div class="container" id="parentCellPhoneNum">
				</div>

				<div class="container" id="payment">
				</div>

				<div class="container" id="courses">
				</div>

				<div class="container" id="ideas">
				</div>

				<div class="container" id="termsAndConditions">
				</div>

				<div class="#" id="captcha">
				</div>


				<button type="submit" class="btn btn-large btn-block btn-primary full-width">Submit Request</button>
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
