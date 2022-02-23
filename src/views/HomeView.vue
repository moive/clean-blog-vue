<template>
	<HeroTop :items="itemsHero"/>
</template>

<script lang="ts">
import { storyapi } from '@/utils/api';
import { StoryblokResult, StoryData } from 'storyblok-js-client';
import { defineComponent, onMounted, ref } from 'vue';

interface IHeroTop {
	title: string;
	sub_title: string;
	backgroundImage: string;
}

export default defineComponent({
	name: 'HomeView',
	setup(){
		const itemsHero = ref<Partial<IHeroTop>>({});

		const dataHero =async () => {
            const {data}: StoryblokResult = await storyapi.get('cdn/stories/home');
            const story = data.story;
			
            itemsHero.value = story.content.container_page[0];

        };

        onMounted(()=>{
            dataHero();
        });

		return {
			itemsHero,
		}
	}
});
</script>
