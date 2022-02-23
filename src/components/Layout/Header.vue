<template>
    <nav class="navbar navbar-expand-lg navbar-light" id="mainNav">
        <div class="container px-4 px-lg-5">
            <Logo :items="itemsLogo" />
            <Navbar/>
        </div>
    </nav>
</template>
<script lang="ts">
import { storyapi } from '@/utils/api'
import { StoryblokResult, StoryData } from 'storyblok-js-client'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
    name:'header',
    setup() {
        const itemsLogo = ref<Partial<StoryData>>({})
        const dataHeader =async () => {
            const {data}: StoryblokResult = await storyapi.get('cdn/stories');
            const stories = data.stories;

            const {content}: StoryData = stories.reduce((acc:StoryData, el:StoryData)=>{
                if(el.name == 'Layout') return acc = el;
                return {}
            },{});

            itemsLogo.value = content.header[0];

        };

        onMounted(()=>{
            dataHeader();
        });
        return {
            itemsLogo
        }
    },
})
</script>
