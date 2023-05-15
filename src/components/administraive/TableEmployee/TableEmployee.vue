<template lang="pug">
div
  div.title
    h1 Funcionarios
  div(class="buttons")
    button.button.is-success(@click="CreateEmployeeModal = true") 
      span.icon.is-small
        i
          font-awesome-icon(icon="fa-solid fa-circle-plus")
      span Adicionar Funcionario
    button.button.is-link(@click="getEmployees()") 
      span.icon.is-small
        i
          font-awesome-icon(icon="fa-solid fa-arrows-rotate")
      span Atualizar Funcionario
  CreateEmployeeVue(v-if="CreateEmployeeModal", @close="CreateEmployeeModal = false")
  table.table 
    thead
    tr
      th(class="uuid") uuid                          
      th Nome 
      th Sobrenome
      th Email
      th Cargo
      th Data de amição
      th Ações
    tbody(v-if="employeesData")
      TableRowVue(v-for="(item, index) in employeesData.data" v-bind:key="index" :uuid="item.uuid"
                          :name="item.name" :sobrenome="item.last_name" :email="item.email"
                          :position="item.position" :admission_date="item.admission_date")
</template>


<script>
import TableRowVue from './TableRowEmployee.vue';
import CreateEmployeeVue from './Modals/ModalCreateEmployee.vue';


export default {
  name: 'TableProducts',
  components: {
    TableRowVue,
    CreateEmployeeVue
  },
  data: () => {
    return {
      employeesData: null,
      CreateEmployeeModal: false
    }
  },
  methods: {
    async getEmployees() {
      let response = await this.$store.dispatch('employees/getEmployees')
      this.employeesData = response
    }
  },
  async mounted() {
    await this.getEmployees()
  }
}
</script>


<style lang="scss" scoped>


.uuid{
  width: 21rem;
}

.buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 2%;
}

.title {
    display: flex;
    justify-content: center;
    margin-bottom: 2%;
}

</style>