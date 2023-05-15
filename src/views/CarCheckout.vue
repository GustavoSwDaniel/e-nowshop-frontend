<template lang="pug">
div(class='home')
    HeaderCheckoutVue
    CarCheckout
    footerVue

</template>
        
<script>
import HeaderCheckoutVue from '@/components/checkout/HeaderCheckout.vue';
import footerVue from '@/components/footer/footer.vue';
import CarCheckout from '@/components/checkout/car/CarCheckout.vue';

export default {
    name: 'HomeView',
    components: {
        HeaderCheckoutVue,
        CarCheckout,
        footerVue
    }
}
</script>
        
<style scoped></style>