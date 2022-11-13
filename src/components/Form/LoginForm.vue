<template>
    <div id="main-container">
        <div id="container"> 
            <h1 id="title">{{ login_type }}</h1>
            <form action="">
                <div>
                    <input v-model='email' type="text">
                </div>
                <div>
                    <input v-model='password' type="password">
                </div>
                <p></p>
            </form>
            <ButtonSubmitVue @click="userLogin($event)" name="Login"/>
        </div>
    </div>
</template>


<script>
import ButtonSubmitVue from './ButtonSubmit.vue';
import axios from "axios";

export default {
    name: 'LoginForm',
    data: () => {
        return {
            'email': '',
            'password': ''
        }
    },
    components: {
        ButtonSubmitVue
    },
    props: {
        login_type: String
    },

    methods: {
        userLogin(e){
            
            const user_data = { username: this.email, password: this.password };
            console.log(user_data)

            axios
            .post("http://localhost:8081/user/auth", user_data)
            .then((res) => {
                    console.log(res.data)
            })
            .catch((error) => {
                    console.log(error);
            });
        }
    }
}
</script>


<style scoped>
    #title {
        font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        text-align: center;
        font-size: 42px;
        margin-bottom: 30px;
        color: #222;
    }

    form input {
        margin: 2px;
        width: 200px;
        height: 20px;
        border-radius: 10px;
        border:solid 1px rgb(172, 172, 172);
    }

    #main-container {
        border: 2px solid black;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100vh;
    }

    #container {
        border: 2px solid black;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100vh;
        height: 50vh;
        width: 60vh;
    }
       
</style>