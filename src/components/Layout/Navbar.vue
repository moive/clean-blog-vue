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
                :key="link"
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
import { storyapi } from '@/utils/api';
import { StoryblokResult, StoryData } from 'storyblok-js-client';
import { defineComponent, onMounted, ref, watch } from 'vue';
interface INav extends StoryData {
    url: string;
}


export default defineComponent({
    name:'Navbar',
    setup() {
        let  Links = ref<INav[]>([]);

        const dataHeader =async () => {
            const {data}: StoryblokResult = await storyapi.get('cdn/stories');
            const itemsNav = data.stories.filter((item: StoryData)=>item.name != 'Layout' && !(/post/.test(item.name)));
            const urls: INav[] = itemsNav.map((el:INav)=>({
                id: el.uuid,
                name: el.name,
                url: el.slug == 'home' ? '/' : '/' + el.slug,
            }));
            
            Links.value = urls;
        }

        onMounted(()=>{
            dataHeader();
        });


        // watch(() => props.items, (item) => {
        //     urlLinkLogo.value = item.LogoLink.url;
        // });
        
        return {
            Links
        }
    },
})
</script>
