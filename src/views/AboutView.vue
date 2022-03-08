<template>
	<HeroTop :items="itemsHero"/>
	<BodyContent :bodyText="bodyText" />
</template>
<script lang="ts">
import { storyapi } from '@/utils';
import { IHeroTop } from '@/utils/types';
import { StoryblokResult } from 'storyblok-js-client';
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
	name:'AboutView',
	setup() {
		const itemsHero = ref<Partial<IHeroTop>>({});
		const bodyText = ref('');

		const dataHero =async () => {
            const {data}: StoryblokResult = await storyapi.get('cdn/stories/about');
            const story = data.story;
			
            itemsHero.value = story.content.container_page[0];
			
			const body_content = await story.content.container_page[1].body_content;
			bodyText.value = await storyapi.richTextResolver.render(body_content);
			
        };

        onMounted(()=>{
            dataHero();
        });

		return {
			itemsHero,
			bodyText,
		}
	},
})
</script>
