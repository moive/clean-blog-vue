<template>
    <HeroTop
        :items="itemsHero"
    />
    <!-- Main Content-->
    <div class="container px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col-md-10 col-lg-8 col-xl-7" v-for="(post, index) in postItems" :key="post.id">
                <!-- Divider-->
                <hr class="my-4" v-if="index != 0" />
                <!-- Post preview-->
                <div class="post-preview">
                    <a :href="post.slug">
                        <h2 class="post-title">{{post.content.hero_post[0].title}}</h2>
                        <h3 class="post-subtitle" v-if="!!post.content.hero_post[0].sub_title">{{post.content.hero_post[0].sub_title}}</h3>
                    </a>
                    <p class="post-meta">
                        Posted by
                        <a href="/">Start Bootstrap</a>
                        on {{formatDate(post)}}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { storyapi } from '@/utils/api';
import { StoryblokResult, StoryData } from 'storyblok-js-client';
import { defineComponent, onMounted, ref, watchEffect } from 'vue';
import items from '../mixins/posts';
interface IHeroTop {
	title: string;
	sub_title: string;
	backgroundImage: string;
}
export default defineComponent({
    name: 'Posts',
    setup() {
        const postItems = ref<StoryData[]>([]);
        const { posts} = items();

        const itemsHero = ref<Partial<IHeroTop>>({});
		const bodyText = ref('');

		const dataHero =async () => {
            const {data}: StoryblokResult = await storyapi.get('cdn/stories/posts');
            const story = data.story;
            itemsHero.value = story.content.hero_post[0];
        };

        onMounted(()=>{
            dataHero();
        });
        
        const formatDate = (post: StoryData)=> {
            return new Date(post.created_at).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric'})
        }
        watchEffect(()=>{
            postItems.value = posts.value
        });
        return {
            postItems,
            formatDate,
            itemsHero,
        }
    },
})
</script>
