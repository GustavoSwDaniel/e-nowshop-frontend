<template lang="pug">
div.modal.is-active
    div.modal-background(style="background-color: rgba(0, 0, 0, 0.5);" @click.self="$emit('close')")
    div.modal-content(style="max-width: 50%;")
        header.modal-card-head
            p.modal-card-title Adicionara endereço
            button.delete(@click="$emit('close')")
        section.modal-card-body
            .title
                h1 Adicionara endereço
            .popup-inner
                form
                    .field
                        label(for="name") Rua
                        input#name.input(type="text", v-model="this.registerAddress['street']", placeholder="Rua")
                    .field
                        label(for="description") cep
                        input#description.input(type="text", v-model="this.registerAddress['cep']" placeholder="Cep")
                    .field
                        label(for="price") Cidade
                        input#price.input(type="text", v-model="this.registerAddress['city']" placeholder="Cidade")
                    .field
                        label(for="unity") Bairro
                        input#unity.input(type="text", v-model="this.registerAddress['village']" placeholder="Bairro")
                    .field
                        label(for="number") Numero
                        input#unity.input(type="number", v-model="this.registerAddress['number']" placeholder="Bairro")
                    .field
                        label(for="category") Estado
                        select.input(v-model="this.registerAddress['state']")
                            option(v-for="state in states", :value="state.value") {{state.text}}
                    .field
                        label(for="unity") Complemento
                        input#unity.input(type="text", v-model="this.registerAddress['complement']" placeholder="Complemento")
        footer.modal-card-foot
            button.button.is-success(@click="createAddress(); $emit('close')") Salvar
            button.button.is-danger(@click.self="$emit('close')") Cancelar
</template>
        
<script>
import axios from "axios";

import states from '../../../assets/json/states.js'
import Cookie from 'js-cookie'


export default {
    name: "CreateProduct",
    data() {
        return {
            registerAddress: {
                street: '',
                cep: '',
                city: '',
                state: '',
                village: '',
                complement: '',
                number: ''
            },
            states: states
        }
    },
    methods: {

        async createAddress() {
            console.log("test")
            let token = Cookie.get('token')
            try {
                let response = await axios.post(`${process.env.VUE_APP_BASE_BACKEND_URL_USER}/user/address`, this.registerAddress, { headers: { "Access-Control-Allow-Origin": "*", "Authorization": `Bearer ${token}` } })
                this.address = response.data.user_address
                this.$emit('close')
            }
            catch (error) {
                console.log(error)
                this.login_error = true
            };
        },
    },
}
</script>
        
<style lang="scss" scoped>
.modal-card-foot {
    display: flex;
    justify-content: center;
}
</style>