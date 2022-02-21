<template>
	<Header/>
	<router-view/>
	<Footer />
</template>

<script lang="ts">
import { RichtextInstance, StoryblokResult } from 'storyblok-js-client';
import { defineComponent, onMounted, ref, watch } from 'vue';
import { storyapi } from '../utils/api'

export default defineComponent({
	name:'app',
	setup() {
		let text1 = ref<string>('');

		onMounted(async ()=>{

			const { data } = await storyapi.get('cdn/stories', {
				"token": process.env.VUE_APP_TOKEN,
			});

			const t = await data.stories[0].content.body_post;
			const t1 = await storyapi.richTextResolver.render(t);

			text1.value = t1;
		});
		
		
		return { text1 }
	},
})
</script>
