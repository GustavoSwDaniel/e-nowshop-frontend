<template lang="pug">
div(class="main")
    div(class="item-title")
        div(class="title-container")
            h2 {{name}}
    div(class="container-items")
        div.splice-container
            swiper(:modules="modules" :space-between="1" :slides-per-view="4" :navigation="true" :loop="true"
                :scrollbar={ draggable: true }  :breakpoints={
                                50: { slidesPerView: 1, spaceBetween: 1 },
                                640: { slidesPerView: 1, spaceBetween: 1 },
                                768: { slidesPerView: 3, spaceBetween: 1 },
                                1024: { slidesPerView: 4, spaceBetween: 2 },
                                1720: { slidesPerView: 5, spaceBetween: 4 }
                                }
                )
                swiper-slide(v-for="item in items" :key="item.uuid")
                    div(class="item")
                        itemVue(:uuidItem="item.uuid" :nameItem="item.name" :priceItem="item.price" :imageItem="item.image_url")
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper'
import "swiper/css/navigation";
import { Navigation } from "swiper";

import 'swiper/css';
import 'swiper/css/pagination'

import itemVue from './item.vue';


export default {
    components: {
        Swiper, SwiperSlide, itemVue
    },
    props: ['name', 'items'],
    setup() {
        return { modules: [Pagination, Autoplay, Navigation] }
    },
    created() {
        console.log('aloo')
        console.log(this.items)
    }
}
</script>



<style lang="scss" scoped>
#splice-container {
    background-color: #fff;
    width: 100%;
}

.item-title{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 75%;
}

.title-container{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 75%;
}


.container-items{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
}


h2 {
    padding-top: 20px;
    padding-bottom: 20px;
}

.item{
    width: 100%;
}

.splice-container{
    width: 75%;
}

@media screen and (max-width: 1024px) {
    .item{
        width: 150px;
    }
}

@media screen and (max-width: 650px) {
    .item{
        width: 100%;
        display: flex;
    }
}

@media screen and (max-width: 500px) {
    .item{
        width: 90%;
        display: flex;
    }
}

</style>