<template lang="pug">
div.container
    div.box(class="inner-container")
      .title 
        h1.title Login de funcionario
      div.icon-user
        font-awesome-icon(icon="fa-regular fa-user" class="users-icon" color="#832727" size="10x")
      form
        .field 
            label.label Email
            p.control.has-icons-left
                input.input(type="email" placeholder="Email" v-model="email")
                span.icon.is-small.is-left
                    font-awesome-icon(icon="fa-regular fa-envelope" color="#832727")
        .field
            label.label Senha
            p.control.has-icons-left
                input.input(type="password" placeholder="Senha" v-model="password")
                span.icon.is-small.is-left
                    font-awesome-icon(icon="fa-solid fa-lock" color="#832727")
      div.buttons
        button.button.is-danger(@click="$event => EmployeeLogin($event)") Login
        button.button.is-danger(@click="changePage('switch-login')") Voltar
</template>



<script>
import Cookie from 'js-cookie'
import axiosClient from '../axiosClient.js';

export default {
    name: "EmployeeLogin",
    data: () => {
        return {
            'email': '',
            'password': '',
            login_error: false
        }
    },
    methods: {
        EmployeeLogin(e) {
            e.preventDefault();
            const user_data = { username: this.email, password: this.password };

            axiosClient.post(`${process.env.VUE_APP_BASE_BACKEND_URL_ADM}/employees/auth`, user_data, { headers: { "Access-Control-Allow-Origin": "*", } })
                .then((res) => {
                    this.login_error = false
                    Cookie.set('token', res.data.access_token)
                    Cookie.set('refresh_token', res.data.refresh_token)
                    Cookie.set('expires_in', res.data.expires_in)
                    Cookie.set('uuid', res.data.uuid)
                    Cookie.set('role', 'Employee')
                    this.$router.push({ name: 'administrative' });
                })
                .catch((error) => {
                    this.login_error = true
                    console.log("test")
                });
        },
        changePage(pageName) {
            this.$router.push({ name: pageName });
        },
    }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');

.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.inner-container {
  width: 30rem;
  height: auto;
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
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