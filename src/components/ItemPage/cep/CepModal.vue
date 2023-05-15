<template lang="pug">
div.modal.is-active
  div.modal-background(style="background-color: rgba(0, 0, 0, 0.5);" @click.self="$emit('close')")
  div.modal-content(style="max-width: 100%; width: 50%;")
    header.modal-card-head
      font-awesome-icon(icon="fa-solid fa-truck" size="2x" color="#fff")
      p.modal-card-title(class="frete-title") Calculo de Frete
      button.delete(@click="$emit('close')")
    section.modal-card-body
        div(class="body-header")
          p.title.is-5 Digite seu CEP para calcular o frete
          div(class="cep-input")
            input.input(type="text" v-model="cep" placeholder="Digite seu CEP" @input="formatCEP()" id="inputCEP")
            button.button(class="cep-btn") OK 
          div(class="frete-inputed")
            p.title.is-6 CEP: {{ cepInputed }}
        div(class="frete-list")
          div.columns(class="frete-info" v-for="(frete, key) in fretes")
            div.column(class="frete-type")
              h1 {{key}}
            div.column(class="frete-price")
              h1 R$ {{frete.valor}}
            div.column(class="frete-days")
              h1 {{frete.prazo}} dias
    footer.modal-card-foot



</template>

<script>

export default {
  props:{
    cepInputed: {
      type: String, 
      default: ''
    }
  },
  data: () => {
    return {
      cep: '',
      fretes: {
        "PAC": {
          "valor": "70,80",
          "prazo": "10",
          "cep": "77820220"
        },
        "SEDEX": {
          "valor": "137,50",
          "prazo": "3",
          "cep": "77820220"
        }
      }
    }
  },
}

</script>

<style lang="scss" scoped>
.modal-card-head {
  background-color: #ca4d4d;
}

.modal-card-foot {
  background-color: #dab7b7;
}

.frete-title{
  color: white;
  font-weight: bold;
  margin-left: 1rem;
}

.frete-list{
  margin-bottom: 3rem;
}

.frete-info h1 {
  font-weight: bold;
}

.body-header{
  margin-top: 0.2rem;
  margin-bottom: 4rem;
}

.cep-input{
  display: flex;
  margin-bottom: 1rem;
}

.cep-btn{
  margin-left: 1rem;
  background-color: #ca4d4d;
  color: white;
}
</style>