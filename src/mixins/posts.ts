import { storyapi } from "@/utils/api";
import { StoryData, StoryblokResult } from "storyblok-js-client";
import { defineComponent, onMounted, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
interface IHeroTop {
	title: string;
	sub_title: string;
	backgroundImage: string;
}

export default function () {
	const posts = ref<StoryData[]>([]);

	const route = useRoute();

	const dataHero = async () => {
		const { data }: StoryblokResult = await storyapi.get("cdn/stories");
		const stories = data.stories;
		const parent_id = 109876229;
		// console.log(stories);
		posts.value = stories.filter(
			(item: StoryData) =>
				item.parent_id == parent_id && !!!item.content.Headline
		);
	};

	onMounted(() => {
		dataHero();
	});

	watchEffect(() => {
		posts.value;
		// console.log("posts", posts.value);
	});

	return {
		posts,
	};
}
