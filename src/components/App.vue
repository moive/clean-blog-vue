<template>
	<Header/>
	<router-view/>
	<Footer />
</template>

<script lang="ts">
import { RichtextInstance, StoryblokResult } from 'storyblok-js-client';
import { defineComponent, onMounted, ref, watch } from 'vue';
import { storyapi } from '../utils/api'

export default defineComponent({
	name:'app'
})
</script>
