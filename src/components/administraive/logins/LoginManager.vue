<template>
    <div class="container">
        <div class="login">
            <div class="title">
                <h1>Login de gerente</h1>
            </div>
            <div class="inputs">
                <label >Email</label>
                <input v-model='email' type="email" placeholder="Email">
                <label >Senha</label>
                <input v-model='password' type="password" placeholder="Password">
                <div v-show="login_error" class="login_erro">
                    <p class="invalid_user_or_password">Senha ou user invalido</p>
                </div>
                <button class="btn-login" v-on:click="MenagerLogin($event)">Entrar</button>
            </div>
        </div>
    </div>
</template>



<script>
import Cookie from 'js-cookie'
import axios from "axios";

export default {
    name: "ManagerLogin",
    Data() {
        return {
            email: '',
            password: '',
            login_error: false
        }
    },
    methods: {
        MenagerLogin(e){
            e.preventDefault();
            const user_data = { username: this.email, password: this.password };

            axios.post("http://localhost:8081/manager/auth", user_data, { headers: { "Access-Control-Allow-Origin": "*", } })
            .then((res) => {
                this.login_error = false
                    Cookie.set('token', res.data.access_token)
                    Cookie.set('refresh_token', res.data.refresh_token)
                    Cookie.set('expires_in', res.data.expires_in)
                    Cookie.set('uuid', res.data.uuid)
                    Cookie.set('role', 'Menage')
                    this.$router.push({name: 'administrative'});
            })
            .catch((error) => {
                this.login_error = true
            });
        },
    }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
@import url('https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css');

.container{
    background-color: #6c0000;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.title{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 88px;
}

.login {
    background-color: rgb(255, 255, 255);
    width: 340px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

h1{
    font-family: 'Poppins', sans-serif;
    margin-bottom: 30%;
}

.inputs{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

input{
    margin-bottom: 2%;
    width:  200px;
    height: 28px;
    border-radius: 12px;
    font-family: 'Poppins', sans-serif;
}

label{
    font-family: 'Poppins', sans-serif;
}

.btn-login{
    margin-top: 10%;
    border-radius: 12px;
    width: 70px;
    height: 40px;
    border-color: #fff;
    color: #fff;
    background-color: #6c0000;
    transition: 0.5s ease-in-out;

}

.btn-login:hover{
    background-color: #ab0000;
}

</style>>