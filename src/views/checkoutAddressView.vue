<template lang="pug">
div(class='home')
  HeaderCheckoutVue
  AddressListVue
  footerVue
</template>
    
<script>
import HeaderCheckoutVue from '@/components/checkout/HeaderCheckout.vue';
import AddressListVue from '@/components/checkout/address/AddressList.vue'
import footerVue from '@/components/footer/footer.vue';

export default {
  name: 'HomeView',
  components: {
    HeaderCheckoutVue,
    AddressListVue,
    footerVue
  }
}
</script>
    
<style scoped></style>