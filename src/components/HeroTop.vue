<template>
    <!-- Page Header-->
    <header class="masthead" :style="backgroundImage">
        <div class="container position-relative px-4 px-lg-5">
            <div class="row gx-4 gx-lg-5 justify-content-center">
                <div class="col-md-10 col-lg-8 col-xl-7">
                    <div class="post-heading" v-if="isPost">
                        <h1>{{items.title}}</h1>
                        <h2 class="subheading">{{items.sub_title}}</h2>
                        <span class="meta" v-if="!!publishedAt">
                            Posted by
                            <a href="#!">Start Bootstrap</a>
                            on {{dateHero}}
                        </span>
                    </div>
                    <div class="site-heading" v-else>
                        <h1>{{items.title}}</h1>
                        <span class="subheading">{{items.sub_title}}</span>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<script lang="ts">
import { defineComponent, ref, watch, watchEffect } from 'vue'

export default defineComponent({
    name:'HeroTop',
    props:{
        items: {
            type: Object,
            default: ()=> {}
        },
        isPost: {
            type: Boolean,
            default: false,
        },
        publishedAt:{
            type: String,
            default: ''
        }
    },
    setup(props) {
        let backgroundImage = ref('');
        let urlBackImage = ref('');
        let dateHero = ref('');

        watch(()=>props.items, (item)=>{
            urlBackImage.value = item.backgroundImage;
            backgroundImage.value = `background-image: url(${urlBackImage.value})`;
        });
        watchEffect(()=>{
            dateHero.value = new Date(props.publishedAt).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric'});
        });

        
        return {
            backgroundImage,
            dateHero,
        }
    },
})
</script>
