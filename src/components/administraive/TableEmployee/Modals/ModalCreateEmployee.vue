<template lang="pug">
div.modal.is-active
  div.modal-background(style="background-color: rgba(0, 0, 0, 0.5);" @click.self="$emit('close')")
  div.modal-content(style="max-width: 50%;")
    header.modal-card-head
      p.modal-card-title Adicionar funcionario
      button.delete(@click="$emit('close')")
    section.modal-card-body
      .title
        h1 Adicionar funcionario
      .popup-inner
        form
          .field
            label(for="name") Nome
            input#name.input(type="text" v-model="name" placeholder="Nome")
          .field
            label(for="description") Sobrenome
            input#description.input(type="text" v-model="last_name"  placeholder="Sobrenome")
          .field
            label() Email
            input#price.input(type="text" v-model="email" placeholder="Email")
          .field
            label() CPF
            input#unity.input(type="text" v-model="cpf" placeholder="Quantidade")
          .field
            label() Numero de telefone
            input#unity.input(type="text" v-model="phone_number" placeholder="Quantidade")
          .field
            div.control
              input(type="radio" v-model="phone_type" value="Cell" name="celular-radio") 
              label.radio Celular
              input(type="radio" v-model="phone_type" value="Telephone" name="telefone-radio") 
              label.radio Telefone
          .field
            label() Salario
            input#unity.input(type="text" v-model="salary" placeholder="Salario")
          .field
            label() Cargo
            input#unity.input(type="text" v-model="position" placeholder="Cargo")
          .field
            label() Data de nascimento
            input#unity.input(type="date" v-model="birth_date" placeholder="Data de nascimento")
          .field
            label(for="unity") Senha
            input.input(type="password" placeholder="Senha" v-model="password")
    footer.modal-card-foot
      button.button.is-success(@click="createEmployee()") Salvar
      button.button.is-danger(@click.self="$emit('close')") Cancelar
</template>

<script>

export default {
    name: "CreateEmployee",
    data() {
        return {
            name: 'gustavo',
            last_name: 'daniel',
            email: 'gustavodaniel120@email.com',
            cpf: '80069789053',
            position: 'dev',
            salary: '2000',
            birth_date: '',
            phone_type: 'Cell',
            phone_number: '12991169510',
            password: '12345678gh.@G',
        }
    },
    methods: {
        async createEmployee() {
            let register_data = {
                name: this.name,
                last_name: this.last_name,
                email: this.email,
                cpf: this.cpf,
                position: this.position,
                salary: parseFloat(this.salary),
                birth_date: this.birth_date,
                phones: [
                    {
                        type: this.phone_type,
                        number: this.phone_number
                    }
                ],
                
                password: this.password
            }

            if (await this.$store.dispatch('employees/createEmployee', register_data))
                this.$emit('close')
        },
    }
}
</script>

<style lang="scss" scoped>
.modal-card-foot {
  display: flex;
  justify-content: center;
}
</style>