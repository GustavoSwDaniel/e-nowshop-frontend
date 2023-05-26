<template lang="pug">
div(id="main")
    requestRecoveryPassword
</template>

<script>
import requestRecoveryPassword from '@/components/requestRecoveryPassword.vue';


export default {
    components: {
        requestRecoveryPassword
    }
  }
</script>

<style lang="scss" scoped>
body {
  margin: 0;
  padding: 0;
}
#main {
  font-size: 1.6rem;
  color: #222;
  background-color: #092525;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>