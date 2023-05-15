<template lang="pug">
div.modal.is-active
  div.modal-background(style="background-color: rgba(0, 0, 0, 0.5);" @click.self="$emit('close')")
  div.modal-content(style="max-width: 30%;")
    header.modal-card-head
      p.modal-card-title Deletar item
      button.delete(@click="$emit('close')")
    section.modal-card-body
      p Tem certeza que deseja excluir este ? 
      div(class="buttons")
        button.button.is-success(@click="deleteProducts(uuid_product)") Sim
        button.button.is-danger(@click.self="$emit('close')") Não
</template>
    
<script>

import UpdateItemVue from "./UpdateItem.vue";

export default {
  props: ['TogglePopup', 'uuid_product'],
  components: {
    UpdateItemVue
  },
  methods: {
    async deleteProducts(uuid_product) {
      console.log(uuid_product)
      await this.$store.dispatch('employees/deleteProduct', uuid_product)
      this.$emit('close')
    }
  }
}
</script>
    
<style lang="scss" scoped>
.buttons {
  display: flex;
  justify-content: center;
}
</style>