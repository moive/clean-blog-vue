<template>
<!-- Main Content-->
	<main class="mb-4">
		<div class="container px-4 px-lg-5">
			<div class="row gx-4 gx-lg-5 justify-content-center">
				<div class="col-md-10 col-lg-8 col-xl-7" v-html="bodyText">
				</div>
			</div>
		</div>
	</main>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name:'BodyContent',
    props:{
        bodyText: {
            type: String,
            default: ''
        }
    },
    setup() {
        //
    },
})
</script>
