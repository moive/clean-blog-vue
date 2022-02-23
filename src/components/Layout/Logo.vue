<template>
    <a class="navbar-brand" :href="urlLinkLogo">
        <img :src="items.Logo" alt="Logo" v-if="!!items.Logo">
        <span v-else>
            {{items.LogoText}}
        </span>
    </a>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
    name:'Logo',
    props: {
        items: {
            type: Object,
            default: ()=> {}
        }
    },
    setup(props) {
        let  urlLinkLogo = ref('');

        watch(() => props.items, (item) => {
            urlLinkLogo.value = item.LogoLink.url;
        });
        
        return {
            urlLinkLogo
        }
    },
})
</script>
