<template>
    <ul class="list-inline text-center" v-if="!!items">
        <li class="list-inline-item" v-for="item in items" :key="item._uid" >
            <a :href="item.link.url">
                <span class="fa-stack fa-lg">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i :class="`fab fa-${item.name} fa-stack-1x fa-inverse`"></i>
                </span>
            </a>
        </li>
    </ul>
</template>
<script lang="ts">

import { IItems } from '@/utils/types';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name:'social-media',
    props: {
        items: {
            type: Array as PropType<IItems[]>,
            defaul: ()=>[]
        }
    },
    setup({items}) {
        // console.log(items)
    },
})
</script>
