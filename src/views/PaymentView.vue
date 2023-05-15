<template lang="pug">
div(class='home')
    HeaderCheckoutVue
    PaymentCheck
    footerVue
</template>
        
<script>
import HeaderCheckoutVue from '@/components/checkout/HeaderCheckout.vue';
import footerVue from '@/components/footer/footer.vue';
import PaymentCheck from '@/components/checkout/payment/confimation/PaymentCheck.vue';

export default {
    name: 'HomeView',
    components: {
        HeaderCheckoutVue,
        PaymentCheck,
        footerVue
    }
}
</script>
        
<style scoped></style>