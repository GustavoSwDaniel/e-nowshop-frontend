<template lang="pug">
div(class='home')
  HeaderVue
  HomeContainerVuer
  footerVue
</template>

<script>
import HeaderVue from '@/components/Header.vue';
import HomeContainerVuer from '@/components/HomeContainer/HomeContainer.vue'
import footerVue from '@/components/footer/footer.vue';
import loading from '@/components/utils/loading.vue';

export default {
  name: 'HomeView',
  components: {
    HeaderVue,
    HomeContainerVuer,
    footerVue,
    loading
  }
}
</script>

<style scoped>

</style>