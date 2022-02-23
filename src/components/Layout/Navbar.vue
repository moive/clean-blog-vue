<template>
    <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
    >
        Menu
        <i class="fas fa-bars"></i>
    </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ms-auto py-4 py-lg-0">
            <li
                class="nav-item"
                v-for="link in Links"
                :key="link._id"
            >
                <router-link
                    class="nav-link px-lg-3 py-3 py-lg-4"
                    :to="{path: link.url}"
                >{{link.name}}</router-link>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { StoryData } from 'storyblok-js-client';
import { defineComponent, PropType, ref, watchEffect } from 'vue';

interface INav extends StoryData {
    url: string;
    _id: string;
}


export default defineComponent({
    name:'Navbar',
    props:{
        items:{
            type: Array as PropType<INav[]>,
            required: true,
        }
    },
    setup(props) {
        let  Links = ref<Partial<INav>[]>([]);
        watchEffect(()=>{
            const itemsNav:INav[] = props.items.filter((item)=>item.name != 'Layout' && !(/post/.test(item.name)));

            const urls:Partial<INav>[] = itemsNav.map((el:INav)=>({
                _id: el.uuid,
                name: el.name,
                url: el.slug == 'home' ? '/' : '/' + el.slug,
            }));
            
            Links.value = urls;
        });
        
        return {
            Links
        }
    },
})
</script>
