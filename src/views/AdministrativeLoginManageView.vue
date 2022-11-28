<template>
  <div class="employee-login">
      <LoginManagerVue/>
  </div>
</template>

<script>
import LoginManagerVue from '@/components/administraive/logins/LoginManager.vue';

export default {
  name: 'EmployeeLogin',
  components: {
    LoginManagerVue
  }
}
</script>

<style scoped>

</style>