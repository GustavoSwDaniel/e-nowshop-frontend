<template>
    <div id="main">
        <SingInVue />
    </div>
</template>

<script>
import SingInVue from '@/components/SingIn.vue';
import RegisterVue from '@/components/Form/Register.vue';

export default {
    name: 'LoginViews',
    components: {
        SingInVue,
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
    box-sizing: content-box;
  }
</style>