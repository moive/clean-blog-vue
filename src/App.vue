<template>
	<router-view/>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { storyapi } from './utils/api'

export default defineComponent({
	setup() {
		onMounted(async ()=>{

			const data = await storyapi.get('cdn/stories', {
				"token": process.env.VUE_APP_TOKEN,
			});

			console.log(data)
		})
	},
})
</script>
