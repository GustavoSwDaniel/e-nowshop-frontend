<template lang="pug">
div(class='home')
    HeaderVue
    ContentSearch
    footerVue
</template>
    
<script>
import HeaderVue from '@/components/Header.vue';
import ContentSearch from '@/components/Search/ContentSearch.vue';
import footerVue from '@/components/footer/footer.vue';

export default {
    name: 'HomeView',
    components: {
        HeaderVue,
        ContentSearch,
        footerVue
    }
}
</script>
    
<style scoped></style>