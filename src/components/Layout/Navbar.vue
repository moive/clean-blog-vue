<template>
    <!-- Navigation-->
    <nav class="navbar navbar-expand-lg navbar-light" id="mainNav">
        <div class="container px-4 px-lg-5">
            <a class="navbar-brand" :href="urlLinkLogo">
                <img :src="items.Logo" alt="Logo" v-if="!!items.Logo">
                <span v-else>
                    {{items.LogoText}}
                </span>
            </a>
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
                    <li class="nav-item"><a class="nav-link px-lg-3 py-3 py-lg-4" href="index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link px-lg-3 py-3 py-lg-4" href="about.html">About</a></li>
                    <li class="nav-item"><a class="nav-link px-lg-3 py-3 py-lg-4" href="post.html">Sample Post</a></li>
                    <li class="nav-item"><a class="nav-link px-lg-3 py-3 py-lg-4" href="contact.html">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
    name:'Navbar',
    props: {
        items: {
            type: Object,
            default: ()=> {}
        }
    },
    setup(props) {
        let  urlLinkLogo = ref('');
        let logo = ref('');

        watch(() => props.items, (item) => {
            urlLinkLogo.value = item.LogoLink.url;
        });
        
        return {
            urlLinkLogo
        }
    },
})
</script>
