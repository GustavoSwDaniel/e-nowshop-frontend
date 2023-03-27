<template lang="pug">

form.box
    h2.mb-5 Registro de usuario
    div.is-flex.is-flex-wrap-wrap.is-is-align-content-space-between
        div.field.mr-5
            label.label Email
            div.control
                input.input(type="email" placeholder="e.g. alex@example.com")
        div.field.mr-5
            label.label Senha
            div.control
                input.input(type="password" placeholder="********")
        div.field.mr-5
            label.label Confirme sua senha 
            div.control
                input.input(type="Password" placeholder="Confirmar senha")
        div.field.mr-5
            label.label Nome
            div.control
                input.input(v-model="name_user" type="text" placeholder="Nome")
        div.field.mr-5
            label.label Sobrenome
            div.control
                input.input(v-model="last_name" type="text" placeholder="Sobrenome")
        div.field.mr-5
            label.label CPF
            div.control
                input.input(v-model="cpf" type="text" placeholder="Cpf")
        div.field.mr-5
            label.label Rua
            div.control
                input.input(v-model="street" type="text" placeholder="Rua")
        div.field.mr-5
            label.label Cidade
            div.control
                input.input(v-model="city" type="text" placeholder="Cidade")
        div.field.mr-5
            label.label Estado
            div.select.is-small
                select(v-model="state")
                    option(v-for="state in this.states" :value="state.value") {{ state.text }} 
        div.field.mr-5
            label.label Vila
            div.control
                input.input(v-model="village" type="text" placeholder="Vila")
        div.field.mr-5
            label.label Cep
            div.control
                input.input(v-model="cep" type="text" placeholder="Cep")
        div.field.mr-5
            div.control
            label.label Telefone
                input.input(v-model="phone_number" type="text" placeholder="Telefone" )
            div.control
                input.radio(v-model="phone_type" type="radio" id="raio-input-cell" name="fav_language" value="Cell")
                label.radio Celular
                input.radio(v-model="phone_type" type="radio" id="raio-input-cell" name="fav_language" value="Tell")
                label.radio Telefone


    button(v-on:click.prevent="registerUser($event)") Registrar
    div(v-show="regiter_error" class="register_error")
        p(class="register_error_msg") Todos os campos devem ser preenchidos
    div(class="link-login")
        p Ja possui cadastra? 
        a(href="/login") ENTRAR

</template>

<script>
import axios from "axios";
import states from '../../assets/json/states.js'



export default {
    name: 'Register',
    data: () => {
        return {
            'email': '',
            'last_name': '',
            'name_user': '',
            'cpf': '',
            'phone_type': '',
            'phone_number': '',
            'password': '',
            'street': '',
            'cep': '',
            'city': '',
            'state': '',
            'village': '',
            'complement': '',
            regiter_error: false,
            states: states
        }
    },
    methods: {
        registerUser() {
            if (!(this.email, this.last_name, this.name_user, this.cpf, this.phone_type, this.phone_number, this.password, this.street, this.cep, this.city, this.state, this.village, this.complement))
                this.regiter_error = true

            let register_data = {
                name: this.name_user,
                last_name: this.last_name,
                email: this.email,
                cpf: this.cpf,
                phones: [
                    {
                        type: this.phone_type,
                        number: this.phone_number
                    }
                ],
                address: {
                    street: this.street,
                    cep: this.cep,
                    city: this.city,
                    state: this.state,
                    village: this.village,
                    complement: this.complement
                },
                password: this.password
            }

            axios.post("http://localhost:8081/users", register_data, { headers: { "Access-Control-Allow-Origin": "*", } })
                .then((res) => {
                    this.$router.push({ name: 'login' })
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}

</script>

<style lang="scss" scoped>

p {
    margin: 20px 0 30px;
    font-size: 1.1rem;
}

a {
    color: #9c3232;
    ;
    text-decoration: none;
    margin: 20px 0;
    font-size: 1.1rem;
}

h2 {
    color: #FF4949;
    text-align: center;
    font-weight: bold;
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


.link-login {
    display: flex;
    justify-content: center;
    align-content: center;
}


.register_error_msg {
    font-size: 13px;
    color: rgb(255, 0, 0);
    margin: 0;
    font-weight: bold;
    margin-bottom: 20px;
}

.register_error{
    display: flex;
    justify-content: center;
    align-content: center;
}


</style>