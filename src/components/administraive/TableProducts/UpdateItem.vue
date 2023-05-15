<template lang="pug">
div.modal.is-active
  div.modal-background(style="background-color: rgba(0, 0, 0, 0.5);" @click.self="$emit('close')")
  div.modal-content(style="max-width: 50%;")
    header.modal-card-head
      p.modal-card-title Update Item
      button.delete(@click="$emit('close')")
    section.modal-card-body
      .title
        h1 Update Item
      .popup-inner
        form
          .field
            label(for="name") UUID
            input#name.input(type="text", v-model="this.uuid", disabled="true")
          .field
            label(for="name") 
            input#name.input(type="text", v-model="this.name_prod")
          .field
            label(for="description") Description
            input#description.input(type="text", v-model="this.description_prod")
          .field
            label(for="price") Price
            input#price.input(type="text", v-model="this.price_prod")
          .field
            label(for="unity") Unity
            input#unity.input(type="text", v-model="this.unity_prod")
    footer.modal-card-foot
      button.button.is-success(@click="updateItem();") Save changes
      button.button.is-danger(@click.self="$emit('close')") Cancel
</template>

<script>

export default {
  name: "UpdateItem",
  props: ['uuid', 'name', 'price', 'unity', 'description', 'TogglePopup'],
  data() {
    return {
      name_prod: this.name,
      price_prod: this.price,
      unity_prod: this.unity,
      description_prod: this.description
    }
  },
  methods: {
    async updateItem() {
      let update_data = { uuid: this.uuid, productData: {
        name: this.name_prod,
        description: this.description_prod,
        price: this.price_prod,
        unity: this.unity_prod
      }
      };
      this.$store.dispatch('products/updateProduct', update_data)
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-card-foot {
  display: flex;
  justify-content: center;
}
</style>