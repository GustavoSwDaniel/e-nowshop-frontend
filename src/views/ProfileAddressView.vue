<template lang="pug">
div
    HeaderVue(:bannerIsVisible='false')
    ProfileAddress
</template>
    
<script>
import HeaderVue from '@/components/Header.vue';
import ProfileAddress from '@/components/profile/ProfileAddress.vue';


export default {
    components: {
        HeaderVue,
        ProfileAddress
    }
}
</script>
    
<style scoped></style>