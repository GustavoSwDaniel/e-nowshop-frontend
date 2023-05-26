<template lang="pug">
div(class="container")
    form.box
        h2.mb-5 Recuperação de senha
        div(class="recovery-form")
            div.field.mr-5
                label.label Senha
                div.control
                    input.input(type="password" v-model="password" placeholder="*******" @change="checkPassword()")
            div.field.mr-5
                label.label Confirme sua senha
                div.control
                    input.input(type="password" v-model="confirmPassword" placeholder="*******" @input="checkPasswordCofirmed()")
        p(class="error" v-if="!validPassword") {{msg_erro}}
        button.button.is-primary(@click.prevent="changePassoword") Recuperar
</template>

<script>
export default {
    data: () => {
        return {
            'password': null,
            'confirmPassword': '',
            'validPassword': '',
            'confirmedPassword': false,
            'msg_erro': '',
            'code': ''
        }
    },
    methods: {
        checkPassword() {
            if (this.password !== null) {
                const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/ // Regex para validar a senha
                this.validPassword = regex.test(this.password);
                if (!this.validPassword) {
                    this.msg_erro = 'A senha deve ter pelo menos 8 caracteres e conter pelo menos um caractere maiúsculo'
                }
            }
        },
        checkPasswordCofirmed() {
            if (this.password !== null) {
                if (this.password === this.confirmPassword) {
                    this.validPassword = true;
                    this.confirmedPassword = true;
                    return
                }
                this.validPassword = false;
                this.msg_erro = 'As senhas não conferem'
            }
        },
        async changePassoword() {
            if (this.validPassword && this.confirmedPassword) {
                let data_recovery = {
                    'code': this.code,
                    'password': {
                        'new_password': this.password,
                        'confirmation': this.confirmPassword
                    }
                }
                await this.$store.dispatch('user/changePassword', data_recovery)
                    .then((response) => {
                        this.$router.push({ name: 'login' });
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        }
    },
    created() {
        this.code = this.$route.params.token
    }
}
</script>

<style lang="scss" scoped>
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