<template>
	<BodyHeader
	    :content="contentHeader"
		:storiesNav="storiesForNav"
	/>
	<router-view/>
	<BodyFooter :content="contentFooter" />
</template>

<script lang="ts">
import { StoryblokResult, StoryData } from 'storyblok-js-client';
import { defineComponent, onMounted, provide, ref } from 'vue';
import { storyapi } from '../utils/api';

import { PostsKey, ProductKey } from '@/utils/symbols';
import { Product } from '@/utils/types';

export default defineComponent({
	name:'app',
	setup(){
		const contentHeader = ref<Partial<StoryData>>({});
		const contentFooter = ref<Partial<StoryData>>({});
		const storiesForNav = ref<StoryData[]>([]);

		const posts = ref<StoryData[]>([]);

		const product = ref<Product>({name:'Amazing T-Shirt', price: 100})

		provide(ProductKey,product);

		provide(PostsKey, posts)

		const load =async () => {
            const {data}: StoryblokResult = await storyapi.get('cdn/stories');
            storiesForNav.value = data.stories;
			const stories = data.stories;
			const parent_id = 109876229;

			posts.value = stories.filter(
				(item: StoryData) =>
					item.parent_id == parent_id && !!!item.content.Headline
			);

            const {content}: StoryData = stories.reduce((acc:StoryData, el:StoryData)=>{
                if(el.name == 'Layout') return acc = el;
                return {}
            },{});
            
			contentHeader.value = content.header[0];
			contentFooter.value = content.footer[0];

        }
        onMounted(()=>{
            load();
        });

		return {
			contentHeader,
			contentFooter,
			storiesForNav,
		}
	}
})
</script>