<template>
    <nav class="navbar navbar-expand-lg navbar-light" id="mainNav">
        <div class="container px-4 px-lg-5">
            <Logo :items="itemsLogo" />
            <Navbar :items="storiesNav"/>
        </div>
    </nav>
</template>
<script lang="ts">
import {StoryData } from 'storyblok-js-client';
import { defineComponent, ref, watchEffect } from 'vue';

export default defineComponent({
    name:'BodyHeader',
    props:{
        content: {
            type:Object,
            required: true
        },
        storiesNav: {
            type: Array,
            default: ()=> []
        }
    },
    setup(props) {
        const itemsLogo = ref<Partial<StoryData>>({});

        watchEffect(()=>{
            itemsLogo.value = props.content;
        });
        
        return {
            itemsLogo,
        }
    },
})
</script>
