<template lang="pug">
div.container-items
  div.items(v-for="item in items")
    input.input(type="text", :value="item.name", disabled)
    input.input.ml-5(type="text", :value="item.value", disabled)
    button.button(@click.prevent="removeItem(caracterisca)")
      font-awesome-icon(icon="fa-solid fa-minus")
  div.inputs
    input.input(type="text", v-model="inputs.name")
    input.input.ml-5(type="text", v-model="inputs.value")
    button.button(@click.prevent="addItem")
      font-awesome-icon(icon="fa-solid fa-plus")
</template>
  
<script>

export default {
    props: ['type'],
    data() {
        return {
            items: [],
            inputs: {
                name: '',
                value: ''
            }
        }
    },

    methods: {
        addItem() {
            let new_item = {
                name: this.inputs.name,
                value: this.inputs.value
            }
            this.items.push(new_item)
            
            if (this.type === 'caracteriscas') {
                this.$emit('addCaracteriscas', this.items)
            } else {
                this.$emit('addEspecificacoes', this.items)
            }

            this.inputs.name = ''
            this.inputs.value = ''

        },
        removeItem(element) {
            this.items.splice(this.items.indexOf(element))
            if (this.type === 'caracteriscas') {
                this.$emit('addCaracteriscas', this.items)
            } else {
                this.$emit('addEspecificacoes', this.items)
            }
        }
    }
}
</script>
<style scoped>
.inputs {
    display: flex;
}

.items {
    display: flex;
}
</style>
  