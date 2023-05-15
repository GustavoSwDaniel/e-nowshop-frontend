<template lang="pug">
tr
  td {{this.uuid}}
  td {{this.name}}
  td {{this.sobrenome}}
  td {{this.email}}
  td {{this.position}}
  td {{this.admission_date}}
  td
    button.button.is-info.is-rounded.is-hovered.is-small(@click="isOpenUpdateModal = true") Editar
    button.button.is-danger.is-rounded.is-hovered.is-small(@click="isOpenDeletarModal = true") Remover
</template>


<script>

export default {
    name: 'TableRow',
    props: ["uuid", "name", "sobrenome", "email", "position", "admission_date"],
    components: {
    },
    data() {
        return {
            isOpenUpdateModal: false,
            isOpenDeletarModal: false
        }
    },
}
</script>



<style lang="scss" scoped>

</style>