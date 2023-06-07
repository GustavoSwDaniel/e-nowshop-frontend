<template lang="pug">

div(class="main-container")
    div.box(class="register-container") 
        h2.mb-5.title.is-4 Registro de usuario
        div.field.is-horizontal
            div.field-label.is-normal
                label.label Email
            div.field-body
                div.field
                    p.control.is-expanded.has-icons-left
                        input.input(type="email" v-model="email" placeholder="e.g. alex@example.com")
                        span.icon.is-small.is-left
                            font-awesome-icon(icon="fa-regular fa-envelope" color="#832727")
        
        div.field.is-horizontal
            div.field-label.is-normal
                label.label Password
            div.field-body
                div.field
                    p.control.is-expanded.has-icons-left
                        input.input(type="password" v-model="password" placeholder="********")
                        span.icon.is-small.is-left
                            font-awesome-icon(icon="fa-solid fa-lock" color="#832727")
                div.field
                    p.control.is-expanded.has-icons-left
                        input.input(type="Password" placeholder="Confirmar senha")
                        span.icon.is-small.is-left
                                font-awesome-icon(icon="fa-solid fa-lock" color="#832727")
        
        div.field.is-horizontal
            div.field-label.is-normal
                label.label Nome
            div.field-body
                div.field
                    input.input(v-model="name_user" type="text" placeholder="Nome")
                div.field
                    input.input(v-model="last_name" type="text" placeholder="Sobrenome")

        div.field.is-horizontal
            div.field-label.is-normal
                label.label CPF
            div.field-body
                div.field      
                    input.input(v-model="cpf" type="text" placeholder="Cpf")
        
        div.field.is-horizontal
            div.field-label.is-normal
                label.label Endereço
            div.field-body
                div.field      
                    input.input(v-model="street" type="text" placeholder="Rua")
                div.field      
                    input.input(v-model="city" type="text" placeholder="Cidade")
        
        div.field.is-horizontal
            div.field-label.is-normal
                label.label Estado
            div.field-body
                div.field.is-narrow
                    p.control.is-expanded.has-icons-left
                        div.select.is-fullwidth
                            select(v-model="state")
                                option(v-for="state in this.states" :value="state.text") {{ state.text }} 
                div.field      
                    input.input(v-model="village" type="text" placeholder="Vila")
                div.field  
                    input.input(v-model="complement" type="text" placeholder="Complemento")

        div.field.is-horizontal
            div.field-label.is-normal
                label.label Cep
            div.field-body
                div.field  
                    input.input(v-model="cep" type="text" placeholder="Cep")
        
        div.field.is-horizontal
            div.field-label.is-normal
                label.label Telefone
            div.field-body
                div.field
                    input.input(v-model="phone_number" type="text" placeholder="Telefone" ) 
        
        div.field.is-horizontal
            div.field-label.is-normal
                label.label Tipo de telefone 
            div.field-body                 
                div.field.is-narrow
                    div.control
                        label.radio
                            input.radio(v-model="phone_type" type="radio" id="raio-input-cell" name="fav_language" value="Cell") 
                            | Celular
                        label.radio
                            input.radio(v-model="phone_type" type="radio" id="raio-input-cell" name="fav_language" value="Tell") 
                            | Telefone
        
        div(class="actions-container")
            div(class="actions")
                button.mt-5(v-on:click.prevent="registerUser($event)") Registrar
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
            console.log(register_data)

            axios.post(`${process.env.VUE_APP_BASE_BACKEND_URL_USER}/users`, register_data, { headers: { "Access-Control-Allow-Origin": "*", } })
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
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.register-container {
  width: 68%;
}


.actions-container{
    width: 100%;
    display: flex;
    justify-content: center;
}

.actions{
    width: 18%;
    display: flex;
    flex-direction: column;
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