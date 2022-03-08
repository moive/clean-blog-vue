import { StoryData } from "storyblok-js-client";
import { InjectionKey, Ref } from "vue";
import { Product } from "./types";

export const ProductKey: InjectionKey<Ref<Product>> = Symbol("Product");

export const PostsKey: InjectionKey<Ref<StoryData[]>> = Symbol("Posts");
