<template lang="pug">
loading(v-if="itens.length == 0 || newProducts.length == 0")
div(class="main-container")
    div(class="home-container")
        itensVue(name="Promoções" :items="itens")
        itensVue(name="Novos Produtos" :items="itens")
</template>


<script>
import itensVue from './itens.vue';
import loading from '../utils/loading.vue';

export default {
    name: 'HomeContainer',
    components: {
        itensVue,
        loading
    },
    data: () => {
        return {
            itens: [],
            newProducts: []
        }
    },
    methods: {
        async getItens() {
            let response = await this.$store.dispatch('products/getProductsByPromotions')
            this.itens = response.data.data
        },
        async getNewProducts() {
            let response = await this.$store.dispatch('products/getNewProducts', { filter: 'created_at', order: 'desc', limit: 5})
            this.newProducts = response.data.data
        }
    },
    async mounted() {
        await this.getItens();
        await this.getNewProducts();
    }
}
</script>


<style lang="scss" scoped>
.main-container {
    display: flex;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.575);
}

.home-container {
    width: 85%;
    background-color: transparent;
}


</style>