<template lang="pug">
div(class="main-container")
    .box
        h1 {{item.productName}}
        figure.image.is-500x500
            img(:src="item.image")
        p Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos, quis.
</template>
    
    
<script>
import { useRoute } from 'vue-router'

export default {
    name: 'ItemMain',
    components: {
    },
    data: () => {
        return {
            item: {
                id: 1,
                productName: "Console Playstation 5 825GB SSD FIFA 23",
                price: 1400,
                image: "https://www.pngmart.com/files/7/PS4-PNG-Image.png"
            },
        }
    },
    mounted() {
        const route = useRoute()
        console.log(route.params.id)
    }
}
</script>
    
    
<style lang="sass" scoped>
.main-container
    display: flex
    justify-content: center
    width: 100%
</style>