<template>
    <div id="main">
        <RegisterVue />
    </div>
</template>

<script>
import RegisterVue from '@/components/Form/Register.vue';
export default {
    name: 'Register',
    components: {
        RegisterVue
    }
}
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
  }
  #main {
    font-family: Tahoma;
    font-size: 1.6rem;
    color: #222;
    background-color: #092525;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>