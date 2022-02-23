<template>
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
import { StoryData } from 'storyblok-js-client';
import { defineComponent, ref, watchEffect } from 'vue';

interface IFooter {
    copy_right : string;
    social_media: Array<Partial<StoryData>>
}

export default defineComponent({
    name:'BodyFooter',
    props:{
        content: {
            type:Object,
            required: true
        }
    },
    setup(props) {

        const copyRight = ref<string>('')
        const socialMedia = ref<StoryData[]>([])

        watchEffect(()=>{
            const {copy_right, social_media} = props.content;
            
            copyRight.value = copy_right;
            socialMedia.value = social_media;
        });

        return {
            copyRight,
            socialMedia,
        }
    },
})
</script>
