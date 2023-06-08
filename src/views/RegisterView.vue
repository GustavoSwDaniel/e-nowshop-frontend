<template lang="pug">
div
  HeaderVue(:bannerIsVisible='false')
  RegisterVue
</template>

<script>
import RegisterVue from '@/components/Form/Register.vue';
import HeaderVue from '@/components/Header.vue';


export default {
    name: 'Register',
    components: {
        RegisterVue,
        HeaderVue
    }
  }
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
</style>