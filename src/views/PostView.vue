<template>
    <HeroTop
        :items="itemsHero"
        :isPost="true"
        :publishedAt="publishedAt"
    />
	<BodyContent :bodyText="bodyText"/>
</template>
<script lang="ts">
import { storyapi } from '@/utils/api';
import { StoryData, StoryblokResult } from 'storyblok-js-client';
import { defineComponent, onMounted, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
interface IHeroTop {
	title: string;
	sub_title: string;
	backgroundImage: string;
}

export default defineComponent({
    name:'PostView',
    setup() {
		const posts = ref<StoryData[]>([]);
        const itemsHero = ref<Partial<IHeroTop>>({});
		const bodyText = ref('');
        const publishedAt = ref<string | null>('');

        const route = useRoute();

		const dataHero =async () => {
            const {data}: StoryblokResult = await storyapi.get('cdn/stories');
            const stories = data.stories;
            const parent_id = 109876229;
            
            posts.value  = stories.filter((item: StoryData)=> item.parent_id == parent_id);

            const itemCurrent: StoryData  = posts.value.reduce((acc: StoryData, el: StoryData)=>{
                if(el.name == route.params.post) acc = el;
                return acc
            },{} as StoryData);

            publishedAt.value = itemCurrent.published_at;

            itemsHero.value = itemCurrent.content.hero_post[0];
			
			const body_content = itemCurrent.content.body_post;
			bodyText.value = await storyapi.richTextResolver.render(body_content);
			
        };

        onMounted(()=>{
            dataHero();
        });

        watchEffect(()=>{
            posts.value;
        });

		return {
            itemsHero,
			bodyText,
            publishedAt,
		}
	},
})
</script>
