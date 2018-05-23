<template>
<div class="index">
	<div id="doc">
		<div id="hd">
			<h1>	
		</div>
		<div id="bd">

		</div>
	</div>
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
	created () {
		let vm = this;
		vm.updateCourses();
	}
    }
</script>

<style scoped>
</style>
