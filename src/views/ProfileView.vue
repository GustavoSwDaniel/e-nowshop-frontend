<template lang="pug">
div(class='home')
    HeaderVue(:bannerIsVisible='false')
    ProfileVue
</template>
    
<script>
import HeaderVue from '@/components/Header.vue';
import ProfileVue from '@/components/profile/profile.vue';


export default {
    name: 'HomeView',
    components: {
        HeaderVue,
        ProfileVue
    }
}
</script>
    
<style scoped></style>