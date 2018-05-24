<template>
<div class="index">
	<form class="register-form">
		<div id="doc">
			<div id="hd">
				<h1>Peer Tutor Request Form ({{ getFormTitle }})</h1>
			</div>
			<div id="bd">
				
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
                courses: []
            }
        },
	methods: {
		updateCourses() {
			let vm = this;
			_api.courses(function (err, res) {
				if (err) {
					console.log(err);
					vm.courses = [];
				}

				else if (res.result) {
					vm.courses = res.result;
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
	}
    }
</script>

<style scoped>
</style>
