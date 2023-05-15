<template lang="pug">
div(id="addressPage")
  div.box(class="item-address-container")
    div(class="main-container")
      div.is-flex(class="container-address")
        div(class="primary-container")
          div(class="header-address")
            p.title(class="hedear-address-title") Endereço
            font-awesome-icon(icon="fa-solid fa-house" size="2x" )
            button.button(class="addAddressButton" @click="isOpenCreateModal = true" @close="isOpenCreateModal = false" )
              span.icon.is-small
                i
                  font-awesome-icon(icon="fa-solid fa-circle-plus")
          form(class="form-address")
            div.control(v-for="endereco in address" class="radiobtn" )
              input(type="radio" name="drone" :value="endereco.id" :id="endereco.id" :checked="endereco.main" @click="setAddress(endereco.id)")
              label(:for="endereco.id" class="label-address") 
                div.is-flex
                  label(class="address-field") Rua:  
                  p {{endereco.street}}
                div.is-flex
                  label(class="address-field") Cidade:  
                  p {{endereco.city}}
                div.is-flex
                  label(class="address-field") Número:  
                  p {{endereco.number}}
                div.is-flex
                  label(class="address-field") Estado:  
                  p {{endereco.state}}
                div.is-flex
                  label(class="address-field") CEP:  
                  p {{endereco.cep}}
                div.is-flex
                  label(class="address-field") Bairro:  
                  p {{endereco.village}}
        div(class="secondary-container")
          div(class="header-address")
              p.title(class="hedear-address-title") Frete
              font-awesome-icon(icon="fa-solid fa-truck" size="2x" )
          div(class="frete-options")
            div.control(v-for="frete in fretes" class="frete-radio")
              input(type="radio" name="drone" value="1" id="1")
              label(class="label-frete") {{frete.name}}
                div(class="frete-price")
                      label R$ {{frete.valor}}
                      p Entrega em {{ frete.prazo }} dias úteis
          
      div(class='buttons')
        button.button.is-success.is-rounded(class="buyButton" @click="changePage($event, 'checkout-payment')") Continuar
        button.button.is-danger.is-rounded(class="buyButton" @click="changePage($event, 'home')") Cancelar
  CreateNewAddressModal(v-if="isOpenCreateModal", @close="isOpenCreateModal = false")
</template>


<script>
import CreateNewAddressModal from './CreateNewAddressModal.vue'
import axios from 'axios'
import Cookie from 'js-cookie'
import { useRoute } from 'vue-router'

export default {
  name: 'AddressList',
  data: () => {
    return {
      product_uuid: '',
      fretes: [
        {
          id: 1,
          name: 'Sedex',
          price: '10.00',
          time: 'Entrega em 3 dias úteis'
        },
        {
          id: 2,
          name: 'PAC',
          price: '5.00',
          time: 'Entrega em 5 dias úteis'
        }
      ],
      isOpenCreateModal: false,
      address: {},
      chosenAddress: '',
    }
  },
  components: {
    CreateNewAddressModal
  },
  methods: {
    formatCEP() {
      this.cep = this.cep.replace(/\D/g, '')
      this.cep = this.cep.replace(/(\d{5})(\d)/, '$1-$2')
    },
    changePage(e, namePage) {
      e.preventDefault();
      this.$router.push({
        name: namePage,
        params: { id: 1 },
      });
    },
    async getAddress() {
      let token = Cookie.get('token')
      try {
        let response = await axios.get(`${process.env.VUE_APP_BASE_BACKEND_URL_USER}/user`, { headers: { "Access-Control-Allow-Origin": "*", "Authorization": `Bearer ${token}`} })
        this.address = response.data.user_address

        for (let i = 0; i < this.address.length; i++) {
          if (this.address[i].main) {
            this.setAddress(this.address[i].id)
          }
        }
      }
      catch (error) {
        if (error.response.status === 401) {
          this.$router.push({ name: 'home' })
        }
      };
    },
    async setAddress(id) {
      this.chosenAddress = id
      await this.calcFrete()
    },
    async calcFrete(){
      let FreteData = {
        address_id: this.chosenAddress,
        product_uuid: this.product_uuid
      }
      let response = await this.$store.dispatch("checkout/calcFrete", FreteData)
      this.fretes = response.quotes
      console.log(this.fretes)
    }

  },
  async mounted() {
    const route = useRoute()
    this.product_uuid = route.params.id
    this.getAddress()
  },
  created: function () {
    this.$store.dispatch("auth/checkAuth");

    setInterval(() => {
      this.$store.dispatch("auth/checkAuth");
    }, 300000);
  }
}

</script>

<style lang="scss" scoped>
.label-frete{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.frete-options{
  width: 100%;
}
.frete-radio{
  margin-left: 50px;
  display: flex ;
}

.frete-price{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.main-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.addAddressButton{
  margin-left: 16px;
}

.header-address{
  display: flex;
}

.hedear-address-title{
  margin-right: 16px;
}

.item-address-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 68%;
}

#addressPage {
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.buttons{
  margin-top: 25px;
}

.form-address {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-top: 2px;
}

.container-address{
  width: 100%;
}

.primary-container{
  width: 50%;
}

.secondary-container{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
}

$accentcolor: #b87171;
$lightcolor: #fff;
$darkcolor: #444;

form {
  width: 60%;
  margin: 50px auto 0;
  font-size: 15px;
}

.radiobtn {
  position: relative;
  display: block;

  .label-address {
    display: block;
    background: lighten($accentcolor, 30%);
    color: $darkcolor;
    border-radius: 5px;
    padding: 29px 20px;
    border: 2px solid lighten($accentcolor, 20%);
    margin-bottom: 5px;
    cursor: pointer;

    &:after,
    &:before {
      content: "";
      position: absolute;
      right: 11px;
      top: 11px;
      width: 20px;
      height: 20px;
      border-radius: 3px;
      background: lighten($accentcolor, 15%);
    }

    &:before {
      background: transparent;
      transition: 0.1s width cubic-bezier(0.075, 0.82, 0.165, 1) 0s,
        0.3s height cubic-bezier(0.075, 0.82, 0.165, 2) 0.1s;
      z-index: 2;
      overflow: hidden;
      background-repeat: no-repeat;
      background-size: 13px;
      background-position: center;
      width: 0;
      height: 0;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNS4zIDEzLjIiPiAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE0LjcuOGwtLjQtLjRhMS43IDEuNyAwIDAgMC0yLjMuMUw1LjIgOC4yIDMgNi40YTEuNyAxLjcgMCAwIDAtMi4zLjFMLjQgN2ExLjcgMS43IDAgMCAwIC4xIDIuM2wzLjggMy41YTEuNyAxLjcgMCAwIDAgMi40LS4xTDE1IDMuMWExLjcgMS43IDAgMCAwLS4yLTIuM3oiIGRhdGEtbmFtZT0iUGZhZCA0Ii8+PC9zdmc+);
    }
  }

  input[type="radio"] {
    display: none;
    position: absolute;
    width: 100%;
    appearance: none;

    &:checked+label {
      background: lighten($accentcolor, 15%);
      animation-name: blink;
      animation-duration: 1s;
      border-color: $accentcolor;

      &:after {
        background: $accentcolor;
      }

      &:before {
        width: 20px;
        height: 20px;
      }
    }
  }
}

@keyframes blink {
  0% {
    background-color: lighten($accentcolor, 15%);
  }

  10% {
    background-color: lighten($accentcolor, 15%);
  }

  11% {
    background-color: lighten($accentcolor, 20%);
  }

  29% {
    background-color: lighten($accentcolor, 20%);
  }

  30% {
    background-color: lighten($accentcolor, 15%);
  }

  50% {
    background-color: lighten($accentcolor, 20%);
  }

  45% {
    background-color: lighten($accentcolor, 15%);
  }

  50% {
    background-color: lighten($accentcolor, 20%);
  }

  100% {
    background-color: lighten($accentcolor, 15%);
  }
}

.address-field {
  margin-right: 10px;
  font-weight: bold;
}
</style>