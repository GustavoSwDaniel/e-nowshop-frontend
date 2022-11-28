<template>
    <div class="employee-login">
        <LoginEmployeeVue/>
    </div>
  </template>
  
  <script>
import LoginEmployeeVue from '@/components/administraive/logins/LoginEmployee.vue';

  export default {
    name: 'EmployeeLogin',
    components: {
      LoginEmployeeVue
    }
  }
  </script>
  
  <style scoped>
 
  </style>