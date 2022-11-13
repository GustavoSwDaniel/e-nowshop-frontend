<template>
    <article>
        <div class="container" :class="{ 'sign-up-active': singUp }">
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-left">
                        <h2>Login de usuário</h2>
                        <p>Faça o login com o seus dados</p>
                        <button class="invert" id="singIn" @click="singUp = !singUp">Login</button>
                    </div>
                    <div class="overlay-right">
                        <h2>Cadastrar</h2>
                        <p>Informe os dados para se registrar</p>
                        <button class="invert" id="singUp" @click="singUp = !singUp" >Registrar</button>
                    </div>
                </div>
            </div>
            <form class="sign-up" action="">
                <h2>Register</h2>
                <input v-model='register_name' type="text" placeholder="Name">
                <input v-model='register_email' type="email" placeholder="Email">
                <button @click="changePage($event)">Registrar</button>
            </form>
            <form class="sign-in" action="">
                <h2>Login</h2>
                <input v-model='email' type="email" placeholder="Email">
                <input v-model='password' type="password" placeholder="Password">
                <div v-show="login_error" class="login_erro">
                    <p class="invalid_user_or_password">Senha ou user invalido</p>
                </div>
                <button v-on:click="userLogin($event)">Login</button>
                <a href="#">Esqueceu sua senha?</a>
            </form>
        </div>
    </article>
</template>

<script>
import axios from "axios";

export default {
    name: 'SingIn',
    data: () => {
        return {
            'register_email': '',
            'register_name': '',
            singUp: false,
            'email': '',
            'password': '',
            login_error: false
        }
    },
    methods: {
        userLogin(e){
            e.preventDefault();
            const user_data = { username: this.email, password: this.password };

            axios.post("http://localhost:8081/user/auth", user_data, { headers: { "Access-Control-Allow-Origin": "*", } })
            .then((res) => {
                this.login_error = false
                    console.log(res.data.access_token)
            })
            .catch((error) => {
                this.login_error = true
            });
        },

        changePage(e){
            e.preventDefault();

            this.$router.push({name: 'Register', params: {data: {email: this.register_email, name: this.register_name }}});
        }
    }
}
</script>

<style lang="scss" scoped>


.container {
    position: relative;
    width: 768px;
    height: 480px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 15px 30px rgba(0, 0, 0, .2),
        0 10px 10px rgba(0, 0, 0, .2);
    background: linear-gradient(to bottom, #832727, #742b2b);

    .overlay-container {
        position: absolute;
        top: 0;
        left: 50%;
        width: 50%;
        height: 100%;
        overflow: hidden;
        transition: transform .5s ease-in-out;
        z-index: 100;
    }

    .overlay {
        position: relative;
        left: -100%;
        height: 100%;
        width: 200%;
        background: linear-gradient(to bottom right, #832727, #b52525);
        color: #fff;
        transform: translateX(0);
        transition: transform .5s ease-in-out;
    }

    @mixin overlays($property) {
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
        padding: 70px 40px;
        width: calc(50% - 80px);
        height: calc(100% - 140px);
        text-align: center;
        transform: translateX($property);
        transition: transform .5s ease-in-out;
    }

    .overlay-left {
        @include overlays(-20%);
    }

    .overlay-right {
        @include overlays(0);
        right: 0;
    }
}

h2 {
    margin: 0;
}

p {
    margin: 20px 0 30px;
}

.invalid_user_or_password {
    font-size: 13px;
    color: red;
    margin: 0;
    margin-bottom: 20px;
    
}

a {
    color: #222;
    text-decoration: none;
    margin: 15px 0;
    font-size: 1rem;
}

button {
    border-radius: 20px;
    border: 1px solid #FF4949;
    background-color: #FF4949;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    padding: 10px 40px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform .1s ease-in;

    &:active {
        transform: scale(.9);
    }

    &:focus {
        outline: none;
    }
}

button.invert {
    background-color: transparent;
    border-color: #fff;
}

form {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 90px 60px;
    width: calc(50% - 120px);
    height: calc(100% - 180px);
    text-align: center;
    background: linear-gradient(to bottom, #efefef, #ccc);
    transition: all .5s ease-in-out;

    div {
        font-size: 1rem;
    }

    input {
        background-color: #eee;
        border: none;
        padding: 8px 15px;
        margin: 6px 0;
        width: calc(100% - 30px);
        border-radius: 15px;
        border-bottom: 1px solid #ddd;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, .4),
            0 -1px 1px #fff,
            0 1px 0 #fff;
        overflow: hidden;

        &:focus {
            outline: none;
            background-color: #fff;
        }
    }
}

.sign-in {
    left: 0;
    z-index: 2;
}

.sign-up {
    left: 0;
    z-index: 1;
    opacity: 0;
}

.sign-up-active {
    .sign-in {
        transform: translateX(100%);
    }

    .sign-up {
        transform: translateX(100%);
        opacity: 1;
        z-index: 5;
        animation: show .5s;
    }
    .overlay-container {
      transform: translateX(-100%);
    }

    .overlay {
      transform: translateX(50%);
    }

    .overlay-left {
      transform: translateX(0);
    }
    .overlay-right {
      transform: translateX(20%);
    }
}

@keyframes show {
    0% {
      opacity: 0;
      z-index: 1;
    }
    49% {
      opacity: 0;
      z-index: 1;
    }
    50% {
      opacity: 1;
      z-index: 10;
    }
  }
</style>