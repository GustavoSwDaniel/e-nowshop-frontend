<template lang="pug">
div(class='home')
    HeaderCheckoutVue
    Payments
    footerVue
</template>
        
<script>
import HeaderCheckoutVue from '@/components/checkout/HeaderCheckout.vue';
import footerVue from '@/components/footer/footer.vue';
import Payments from '@/components/checkout/payment/Payments.vue';

export default {
    name: 'HomeView',
    components: {
        HeaderCheckoutVue,
        Payments,
        footerVue
    }
}
</script>
        
<style scoped></style>