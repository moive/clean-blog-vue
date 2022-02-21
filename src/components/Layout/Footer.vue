<template>
    <!-- Footer-->
        <footer class="border-top">
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div class="col-md-10 col-lg-8 col-xl-7">
                        <social-media :items="socialMedia"/>
                        <div class="small text-center text-muted fst-italic">{{copyRight}}</div>
                    </div>
                </div>
            </div>
        </footer>
</template>
<script lang="ts">
import { storyapi } from '@/utils/api';
import { StoryblokComponent, StoryblokResult, StoryData } from 'storyblok-js-client';
import { defineComponent, onMounted, ref } from 'vue';

interface IFooter {
    copy_right : string;
    social_media: Array<Partial<StoryData>>
}

export default defineComponent({
    name:'footer',
    setup() {

        const copyRight = ref<string>('')
        const socialMedia = ref<StoryData[]>([])

        const load =async () => {
            const {data}: StoryblokResult = await storyapi.get('cdn/stories');
            const stories = data.stories;

            const {content}: StoryData = stories.reduce((acc:StoryData, el:StoryData)=>{
                if(el.name == 'Layout') return acc = el;
                return {}
            },{});
            
            const {copy_right, social_media} = content.footer[0];

            copyRight.value = copy_right;
            socialMedia.value = social_media;

        }
        onMounted(()=>{
            load();
        });
        return {
            copyRight, socialMedia
        }
    },
})
</script>
