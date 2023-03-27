<template>
    <div class="main">
        <h2>{{name}}</h2>
        <div class="splice-container">
            <swiper :modules="modules" :space-between="2" :slides-per-view="4" :navigation="true" :loop="true"
                :scrollbar="{ draggable: true }" :autoplay="{
                    delay: 7000,
                    disableOnInteraction: false,
                    pauseOnMauseEnter: true
                }" :breakpoints="{
    50: { slidesPerView: 1, spaceBetween: 20 },
    640: { slidesPerView: 2, spaceBetween: 15 },
    768: { slidesPerView: 4, spaceBetween: 40 },
    1024: { slidesPerView: 5, spaceBetween: 2 }}">
                id: 1,<swiper-slide v-for="item in swiperTextBase" :key="item.id">
                    <div class="item">
                        <itemVue :nameItem=item.productName :priceItem="item.price" :imageItem="item.image" />
                    </div>
                </swiper-slide>

            </swiper>
        </div>
    </div>
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
    props: ['name'],

    setup() {
        const swiperTextBase = [
            {
                id: 1,
                productName: "Console Playstation 5 825GB SSD FIFA 23",
                price: 1400,
                image: "https://www.pngmart.com/files/7/PS4-PNG-Image.png"
            },
            {
                id: 2,
                productName: "xbox",
                price: 1400,
                image: "https://www.pngmart.com/files/7/PS4-PNG-Image.png"
            },
            {
                id: 3,
                productName: "3ds",
                price: 1400,
                image: "https://www.pngmart.com/files/7/PS4-PNG-Image.png"
            },
            {
                id: 3,
                productName: "geladeira",
                price: 1400,
                image: "https://www.pngmart.com/files/7/PS4-PNG-Image.png"
            }
        ]
        return { modules: [Pagination, Autoplay, Navigation], swiperTextBase }
    },
}
</script>



<style lang="scss" scoped>
#splice-container {
    background-color: #fff;
}

.main {
    padding-bottom: 25px;
}


h2 {
    padding-top: 20px;
    padding-bottom: 20px;
}
</style>