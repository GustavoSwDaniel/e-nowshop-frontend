<template lang="pug">
loading(v-if="loading")
div(class="main-container")
  div(class="steps")
    Steps(currentStep=0)
  div(class="car-container")
    div(class='inner-container')
      div.box(class="frete-box" v-if="!isLogged")
        p.title.is-4 Insira seu CEP
        div(class='frete-container')
          div(class='frete')
            label(for="cep") CEP
            input.input(type='text' placeholder='Digite seu CEP')
            button.button(type='button') OK
          div(class='frete-info')
            a(href='https://buscacepinter.correios.com.br/app/endereco/index.php?t') Não sei meu CEP

      div.box(class="address-box" v-else)
        div(class="address-header")
          font-awesome-icon(class="icon-location" icon="fa-solid fa-location-dot" size="2x" color="#832727")
          p.title.is-4 Endereço de Entrega
        div(class="address")
          p.title.is-5 Enderço Principal
          div(class="address-info")
            div(class="address-data")
              div
                label(class="address-field") Rua:
                p {{ mainAddress.street }}
              div
                label(class="address-field") Cidade:
                p {{mainAddress.city}}
              div
                label(class="address-field") Número:
                p {{mainAddress.number}}
              div
                label(class="address-field") Estado:
                p {{mainAddress.state}}
              div
                label(class="address-field") CEP:
                p {{mainAddress.cep}}
            div(class="address-change")
              button.button(class="change-address" type='button' @click="isOpenGetAddressModal = true" @close="isOpenGetAddressModal = false") Alterar Endereço
              button.button(type='button' @click="isOpenCreateModal = true" @close="isOpenCreateModal = false") Novo Endereço
      div.box(class="items")
        div(class="items-header")
          font-awesome-icon(class="cart-icon" icon="fa-solid fa-cart-shopping" size="2x" color="#832727")
          p.title.is-4 Meu Carrinho
        div(class="item" v-for="item in itens.items" :key="item.id")
          div(class="item-image")
            img(id="item-image" :src="item.image_url" alt="iPhone 11 Apple 64GB Preto, Tela de 6,1”, Câmera Dupla de 12MP, iOS")
          div(class="item-header")
            div(class="item-mark")
              p(class="item-mark-name") test
            p {{item.name}}
          div(class="item-body")
            div(class="item-body-quantity" )
              p Quantidade
              div(class="quantity-item")
                div(class="arrow-left")
                  button(class="arrow-button" @click="decrementQuantity(item)")
                    font-awesome-icon(icon="fa-solid fa-chevron-left" size="1x" )
                div(class="quantity")
                  p.title {{item.quantity_car}}
                div(class="arrow-right")
                  button(class="arrow-button" @click="incrementQuantity(item)")
                    font-awesome-icon(icon="fa-solid fa-chevron-right" size="1x" )
              div(class="trash-button")
                button(class="trash" @click="removeItem(item)")
                  p(class="title-trash") Remover
                  font-awesome-icon(class="trash-icon" icon="fa-solid fa-trash" size="1x" color="#ff0000")
            div(class="item-body-right")              
              div(class="item-body-right-price")
                p Preço
                p {{item.price}}
      div.box(class="frete-container" v-if="quotesLength > 0")
        div(class="title-frete")
          font-awesome-icon(class="icon-truck" icon="fa-solid fa-truck" size="2x" color="#832727")
          p.title.is-4 Frete
        div(class="frete-options")
          div.control(v-for="frete in fretes" class="frete-radio"  :key="frete.id") 
            input(type="radio" name="drone" :value="frete" v-model="freteChosen", @click.once="calcFrete(frete.name)")
            label(class="label-frete") {{frete.name}}
            div(class="frete-prices")
              label R$ {{frete.valor}}
              p Entrega em {{ frete.prazo }} dias úteis
    div.box(class="total")
      p.title.is-4 Resumo do Pedido
      div(class="products-price")
        p Produtos
        p R$ {{ itens.cart_total || 0}}
      div(class="frete-price")
        p frete
        p R$ {{ freteChosen.valor || 0 }}
      div(class="total-price-parcel")
        p Total a prazo 
        p R$ {{ itens.cart_total_term || 0}}
      hr
      div(class="total-price")
        p Total a vista
        p R$ {{ itens.cash }} 

      div(class="total-button")
        button.button(class="checkout" type='button' :disabled="buttonIsDisable" @click="() => {changePage('checkout-payment'); creteOrder(itens.items)}") Finalizar Compra
  CreateNewAddressModal(v-if="isOpenCreateModal", @close="isOpenCreateModal = false")
  GetAddressModal(v-if="isOpenGetAddressModal", @close="isOpenGetAddressModal = false" :address="address")

</template>

<script>
import axios from 'axios'
import Cookie from 'js-cookie'
import Steps from '../steps/Steps.vue'
import CreateNewAddressModal from '../address/CreateNewAddressModal.vue'
import GetAddressModal from '../address/GetAddressModal.vue'
import loading from '@/components/utils/loading.vue'
import sends from '../../../assets/json/sends.js'

export default {
  components: {
    Steps,
    CreateNewAddressModal,
    GetAddressModal,
    loading
  },
  data: () => {
    return {
      msg: '',
      isOpenCreateModal: false,
      isOpenGetAddressModal: false,
      isLogged: false,
      address: [],
      fretes: [],
      mainAddress: null,
      chosenAddress: null,
      products: [],
      itens: [],
      loading: false,
      freteChosen: 0,
      productSum: 0,
      quotesLength: 0,
      buttonIsDisable: true
    }
  },
  methods: {
    async incrementQuantity(item) {
      item.quantity_car += 1
      this.products.forEach((product) => {
        if (product.uuid === item.uuid) {
          product.quantity += 1
        }
      })
      await this.calcFrete()
    },
    sumFrete(frete) {
      this.productSum = parseFloat(frete.valor.toLocaleString('en-US').replace(',', '.')) + parseFloat(this.productSum.toLocaleString('en-US').replace(',', '.'))
      this.productSum = this.productSum.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    },
    async decrementQuantity(item) {
      if (item.quantity_car > 1) {
        item.quantity_car -= 1
        this.products.forEach((product) => {
          if (product.uuid === item.uuid) {
            product.quantity -= 1
          }
        })
        await this.calcFrete()
      }
    },
    async getAddress() {
      let token = Cookie.get('token')
      await axios.get(`${process.env.VUE_APP_BASE_BACKEND_URL_USER}/user`, { headers: { "Access-Control-Allow-Origin": "*", "Authorization": `Bearer ${token}` } })
        .then((response) => {

          this.address = response.data.user_address

          for (let i = 0; i < this.address.length; i++) {
            if (this.address[i].main) {
              this.mainAddress = this.address[i]
              this.setAddress(this.address[i].id)
            }
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.$router.push({ name: 'home' })
          }
        })
    },
    async setAddress(id) {
      this.chosenAddress = id
    },
    async calcFrete(type_send) {
      console.log('frete')
      console.log(this.freteChosen)
      if (this.isLogged) {
        this.getCartLogged(sends[type_send])
        this.buttonIsDisable = false
        return
      }
      if (this.products.length == 0) {
        this.itens.items.forEach((item) => {
          this.products.push({
            "uuid": item.uuid,
            "quantity": item.quantity_car
          })
        })
      }
      this.loading = true
      let FreteData = {
        address_id: this.chosenAddress,
        productData: { "products": this.products }
      }

      let response = await this.$store.dispatch("checkout/calcFrete", FreteData)
      this.fretes = response.quotes
      this.quotesLength = this.fretes.length
      this.loading = false
    },
    creteOrder(items) {
      let quote_type = this.freteChosen.name.toLowerCase()
      let order = {
        quote_type: quote_type,
        address_id: this.chosenAddress,
        paymentInfo: {
          quoetsValue: this.itens.quoet_value,
          orderTotalValue: this.itens.cash,
          orderSubtotalValue: this.itens.cart_total
        },
        items: []
      }
      items.forEach((item) => {
        order.items.push({
          "uuid": item.uuid,
          "quantity": item.quantity_car
        })
      })
      Cookie.set('order', JSON.stringify(order))
    },
    changePage(namePage) {
      this.$router.push({
        name: namePage
      });
    },
    async removeItem(item) {
      await this.$store.dispatch('checkout/removeItem', item)
      this.itens = await this.$store.dispatch('checkout/getCart')
      await this.calcFrete()
    },
    async getCartLogged(type_send) {
      this.loading = true
      if (type_send != null) {
        let params = {
          type_send: type_send
        }
        this.itens = await this.$store.dispatch('checkout/getCart', params)
        this.quotesLength = this.itens.quoets.length
        this.fretes = this.itens.quoets
        this.loading = false
        return
      }
      this.itens = await this.$store.dispatch('checkout/getCartWithoutParams')
      this.quotesLength = this.itens.quoets.length
      this.fretes = this.itens.quoets
      this.loading = false
      return
    },
    async getCartNotLogged() {
      let prod = JSON.parse(Cookie.get('cart'))
      this.itens = {
        items: []
      }
      prod.items.forEach(async (item) => {
        let response = await this.$store.dispatch('products/getProductsByUuid', item.product_uuid)
        response.data.quantity_car = item.quantity
        this.itens.items.push(response.data)
      })
    },
  },
  async mounted() {
    console.log(this.$pubnub)
    this.loading = true
    if (Cookie.get('token')) {
      this.isLogged = true
      await this.getAddress()
      await this.getCartLogged()
      this.loading = false
      return
    }
    await this.getCartNotLogged()
  }
}
</script>


<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.frete-options {
  width: 100%;
}

.items-header {
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
}

.address-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.icon-location {
  margin-right: 1rem;
}

.frete-container {
  width: 68%;
}

.car-container {
  display: flex;
  width: 68%;
}

.frete-radio {
  margin-left: 50px;
  display: flex;
  align-items: center;
}

.frete-prices {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
}

.title-frete {
  width: 20%;
  display: flex;
  align-items: center;
}

.cart-icon,
.icon-truck {
  margin-right: 1rem;
}

.inner-container {
  display: flex;
  width: 80%;
  flex-direction: column;
  margin-right: 2rem;
}

.steps {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  margin-bottom: 2rem;
}

.frete-box {
  width: 100%;
}

.frete {
  display: flex;
  align-items: center;
  width: 25%;
}

.frete label {
  margin-right: 1rem;
}

.frete button {
  background-color: #b96969;
  color: #ffff;
  font-weight: bold;
  margin-left: 1rem;
}

.frete-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.frete-info {
  margin-left: 1rem;
}

.frete-info a {
  color: #b96969;
  font-weight: bold;
}

.address-info {
  background-color: #fff0f0;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
}

.address-data {
  display: flex;
  flex-direction: column;

}

.trash {
  display: flex;
  flex-direction: row-reverse;
  background-color: transparent;
  border: none;
}

.trash-icon {
  margin-right: 0.5rem;
}

.title-trash {
  color: #ff0000;
  font-weight: bold;
}

.address-box .address .address-info div {
  display: flex;
}

.address-box .address .address-info div p {
  margin-left: 0.5rem;
}

.address-change button {
  background: transparent;
  border: none;
  font-size: 0.8rem;
  color: #b96969;
  font-weight: bold;
}

.items {
  width: 100%;
}

.total {
  width: 18%;
  display: flex;
  flex-direction: column;
}

.total div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.total .total-button {
  display: flex;
  justify-content: center;
}

.checkout {
  background-color: #b96969;
  color: #ffff;
  font-weight: bold;
}

.item {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.item-image {
  width: 5.5rem;
  height: 5.5rem;
  margin-right: 1rem;
}

.item-header {
  width: 50%;
}

.item-mark {
  font-size: 0.8rem;
  color: #999;
}

.item-body {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 50%;
}

.item-body-quantity {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
}

.quantity-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem
}

.arrow-button {
  background-color: transparent;
  cursor: pointer;
  border: none;
  justify-content: center;
  padding-bottom: calc(0.5em - 1px);
  padding-left: 1em;
  padding-right: 1em;
  padding-top: calc(0.5em - 1px);
  text-align: center;
  white-space: nowrap;
}

.button:active {
  outline: none;
}

.item-body-right {
  width: 25%;
}
</style>