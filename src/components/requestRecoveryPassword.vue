<template lang="pug">
div(class="container")
    form.box(v-if="changePainel")
        h2.mb-5 Email enviado 
        p Você ira receber um link no seu email, caso esteja registra na enowshop
    form.box(v-else)
        h2.mb-5 Enviar email de recuperação de senha
        div(class="recovery-form")
            div.field.mr-5
                label.label Email
                div.control
                    input.input(type="text" v-model="email" placeholder="email" @change="checkEmail()")
        p(class="error" v-if="!validEmail") {{msg_erro}}
        button.button.is-primary(@click.prevent="requestRecoveryPassword") Enviar
</template>

<script>
export default {
    data: () => {
        return {
            'email': null,
            'validEmail': '',
            'changePainel': false,
            'msg_erro': ''
        }
    },
    methods: {
        checkEmail() {
            if (this.password !== null) {
                const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // Regex para validar a senha
                this.validEmail = regex.test(this.email);
                if (!this.validPassword) {
                    this.msg_erro = 'Email inválido'
                }
            }
        },
        async requestRecoveryPassword() {
            console.log(this.validEmail)
            if (this.validEmail) {
                let data = {
                    'email': this.email
                }
                await this.$store.dispatch('user/createRecoveryPasswordCode', data)
                    .then((response) => {
                        this.changePainel = true;
                        setTimeout(() => {
                            this.$router.push({name: 'home'});
                        }, 5000);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        }
    }

}
</script>

<style lang="scss">
.recovery-form {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
}

.container {
    width: 100%;
}

.error {
    color: red;
    font-size: 1.2rem;
    margin-bottom: 1rem;
}
</style>