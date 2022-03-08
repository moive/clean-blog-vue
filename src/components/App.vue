<template>
	<BodyHeader
	    :content="contentHeader"
		:storiesNav="storiesForNav"
	/>
	<router-view/>
	<BodyFooter :content="contentFooter" />
</template>

<script lang="ts">
import { storyapi, PostsKey } from '@/utils';
import { StoryblokResult, StoryData } from 'storyblok-js-client';
import { defineComponent, onMounted, provide, ref } from 'vue';

export default defineComponent({
	name:'app',
	setup(){
		const contentHeader = ref<Partial<StoryData>>({});
		const contentFooter = ref<Partial<StoryData>>({});
		const storiesForNav = ref<StoryData[]>([]);

		const posts = ref<StoryData[]>([]);

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