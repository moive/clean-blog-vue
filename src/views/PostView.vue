<template>
    <HeroTop
        :items="itemsHero"
        :isPost="true"
        :publishedAt="publishedAt"
    />
	<BodyContent :bodyText="bodyText"/>
</template>
<script lang="ts">
import items from '../mixins/posts';
import { defineComponent, ref, watch, watchEffect } from 'vue';
import { StoryData } from 'storyblok-js-client';
import { useRoute } from "vue-router";
import { storyapi } from '@/utils/api';

interface IHeroTop {
	title: string;
	sub_title: string;
	backgroundImage: string;
}

export default defineComponent({
    setup() {
        const itemsHero = ref<Partial<IHeroTop>>({});
		const bodyText = ref("");
		const publishedAt = ref<string | null>("");

        const route = useRoute();

        const { posts} = items();

        const dataHero = async () => {
            const itemCurrent: StoryData = posts.value.reduce(
                (acc: StoryData, el: StoryData) => {
                    if (el.name == route.params.post) acc = el;
                    return acc;
                },
                {} as StoryData
            );

            if(posts.value.length != 0){

                publishedAt.value = itemCurrent.published_at;
    
                itemsHero.value = itemCurrent.content.hero_post[0];
    
                const body_content = itemCurrent.content.body_post;
                bodyText.value = await storyapi.richTextResolver.render(
                    body_content
                );
            }
            
        };

        watch(()=> posts.value, (val)=>{
            console.log("posts changes: ", val)
            dataHero();
        });

        return {
            itemsHero,
			bodyText,
			publishedAt,
        }
    },
})
</script>

