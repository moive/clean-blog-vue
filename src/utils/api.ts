import StoryblokClient from "storyblok-js-client";

export const storyapi = new StoryblokClient({
	accessToken: process.env.VUE_APP_TOKEN,
});
