<template>
  <div class="home">
    <HeaderVue/>
    <HomeContainerVuer/>
  </div>
</template>

<script>
import HeaderVue from '@/components/Header.vue';
import HomeContainerVuer from '@/components/HomeContainer/HomeContainer.vue'
 
export default {
  name: 'HomeView',
  components: {
    HeaderVue,
    HomeContainerVuer
  }
}
</script>

<style scoped>

</style>