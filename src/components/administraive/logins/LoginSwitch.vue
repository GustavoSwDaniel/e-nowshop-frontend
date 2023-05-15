<template lang="pug">
div.container
  div.box(class="inner-container")
    .title 
      h1.title Login Administrativo
    div.icon-user
      font-awesome-icon(icon="users" class="users-icon" color="#832727" size="10x")
    div.buttons
      button.button.is-danger(@click="changePage('administrative-login')") Login de Gerente
      button.button.is-danger(@click="changePage('employee-login')") Login as Funcionario
</template>


<script>
export default {
  name: "ManagerLogin",
  ata: () => {
    return {
      'email': '',
      'password': '',
      login_error: false
    }
  },
  methods: {
    changePage(pageName) {
      this.$router.push({ name: pageName });
    },
  }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
@import url('https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css');

.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.inner-container {
  width: 30rem;
  height: 30rem;
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
}

.icon-user {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.buttons{
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: stretch;
  align-content: center;
}

button {
  width: 15rem;
}
</style>>