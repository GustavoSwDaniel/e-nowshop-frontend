<template lang="pug">
div(class='home')
    HeaderVue(:bannerIsVisible='false')
    ProfileOrders
</template>
    
<script>
import HeaderVue from '@/components/Header.vue';
import ProfileOrders from '@/components/profile/ProfileOrders.vue';

export default {
    components: {
        HeaderVue,
        ProfileOrders
    }
}
</script>
    
<style scoped></style>