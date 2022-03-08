<template>
	<HeroTop :items="itemsHero"/>
	<div class="container px-4 px-lg-5">
		<div class="row gx-4 gx-lg-5 justify-content-center">
			<div class="col-md-10 col-lg-8 col-xl-7">
				<div v-for="post in postItems" :key="post.id">
					<!-- Post preview-->
					<div class="post-preview">
						<a :href="`/posts/${post.slug}`">
							<h2 class="post-title">{{post.content.hero_post[0].title}}</h2>
							<h3 class="post-subtitle" v-if="!!post.content.hero_post[0].sub_title">{{post.content.hero_post[0].sub_title}}</h3>
						</a>
						<p class="post-meta">
							Posted by
							<a href="/">Start Bootstrap</a>
							on {{formatDate(post)}}
						</p>
					</div>
					<!-- Divider-->
					<hr class="my-4" />
				</div>
				<!-- Pager-->
				<div
				    class="d-flex justify-content-end mb-4"><a
				    class="btn btn-primary text-uppercase"
				    href="/posts"
					v-if="posts.length>4"
				>Older Posts →</a></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { storyapi } from '@/utils/api';
import { injectStrict } from '@/utils/global';
import { PostsKey } from '@/utils/symbols';
import { StoryblokResult, StoryData } from 'storyblok-js-client';
import { defineComponent, onMounted, ref, watchEffect } from 'vue';

interface IHeroTop {
	title: string;
	sub_title: string;
	backgroundImage: string;
}

export default defineComponent({
	name: 'HomeView',
	setup(){

		const itemsHero = ref<Partial<IHeroTop>>({});
		const postItems = ref<StoryData[]>([]);

		const posts = injectStrict(PostsKey);

		const dataHero =async () => {
            const {data}: StoryblokResult = await storyapi.get('cdn/stories/home');
            const story = data.story;
			
            itemsHero.value = story.content.container_page[0];

        };

        onMounted(()=>{
            dataHero();
        });

		watchEffect(()=>{
            postItems.value = posts.value.slice(0,4);
        });

		const formatDate = (post: StoryData)=> {
            return new Date(post.created_at).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric'})
        }

		return {
			postItems,
			formatDate,
			itemsHero,
			posts
		}
	}
});
</script>