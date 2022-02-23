<template>
    <!-- Page Header-->
    <header class="masthead" :style="backgroundImage">
        <div class="container position-relative px-4 px-lg-5">
            <div class="row gx-4 gx-lg-5 justify-content-center">
                <div class="col-md-10 col-lg-8 col-xl-7">
                    <div class="site-heading">
                        <h1>{{items.title}}</h1>
                        <span class="subheading">{{items.sub_title}}</span>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
    name:'HeroTop',
    props:{
        items: {
            type: Object,
            default: ()=> {}
        }
    },
    setup(props) {
        let backgroundImage = ref('');
        let urlBackImage = ref('');

        watch(()=>props.items, (item)=>{
            urlBackImage.value = item.backgroundImage;
            backgroundImage.value = `background-image: url(${urlBackImage.value})`;
        });

        
        return {
            backgroundImage,
        }
    },
})
</script>
