<template lang="pug">
div(id="addressPage")
  div.box(class="item-address-container")
    div(class="steps-container")
      Steps(currentStep=2)
    div(class="main-container")
      div(class="header-address")
        p.title(class="hedear-address-title") Pagamento
      div(class="payment-container")
        div(class="primary-container")
          div(class="payment-types")
            p.title.is-4 Metodo de pagamento
            form(class="form-address")
              div.control(v-for="payment in paymentType" class="radiobtn")
                input(type="radio" name="drone" :value="payment.value" @click="chosenPaymentType(payment.value)" :id="payment.id" :disabled="payment.actived")
                label(:for="payment.id" :class="{ 'label-address': true, 'label-address--disabled': payment.actived }") 
                  div.is-flex
                    span.icon.is-small.is-left
                      font-awesome-icon(:icon="payment.icon" size="2x" )
                    p {{payment.name}}

                  
            div(class="button-container")
              button(id="button-create" class="button is-primary is-fullwidth" @click="createOrder()" :disabled="paymentTypeChoosed != null ? false : true ") Finalizar compra
        div(class="segundary-container")
          p.title.is-4  Resumo
          div.box(class="payment-values")
            div(class="payment-value")
              p(class="payment-value__title") Subtotal
              p(class="payment-value__value") R$ {{ orderSubtotalValue }}
            div(class="payment-value")
              p(class="payment-value__title") Frete
              p(class="payment-value__value") R$ {{ quoetsValue }}
            div(class="payment-value")
              p(class="payment-value__title") Total
              p(class="payment-value__value") R$ {{ orderTotalValue }}
</template>


<script>
import Cookie from 'js-cookie'
import Steps from '../steps/Steps.vue'


export default {
  components: {
    Steps
  },
  data: ()=> {
    return{
      paymentTypeChoosed: null,
      orderInfos: {},
      quoetsValue: 0,
      orderTotalValue: 0,
      orderSubtotalValue: 0,
      openPaymentModal: false,
      orderResponse: {},
      paymentType: [
        {
          id: 3,
          name: 'Pix',
          value: 'pix',
          icon: 'fa-brands fa-pix',
          actived: false,
        },
        {
          id: 1,
          name: 'Cartão de crédito',
          value: 'credit_card',
          icon: 'fa-solid fa-credit-card',
          actived: true,
        },
        {
          id: 2,
          name: 'Boleto',
          value: 'boleto',
          icon: 'fa-solid fa-barcode',
          actived: true,
        },
        
      ]
    }
  },
  methods:{
    async createOrder(){
      const btn = document.getElementById('button-create')
      btn.classList.add('is-loading')

      this.orderResponse = await this.$store.dispatch('payment/createOrder', this.orderInfos)
      this.changePage('payment')
      Cookie.set('channelUuid', JSON.stringify(this.orderResponse.channel_uuid))
      btn.classList.remove('is-loading')
    },
    changePage(namePage) {
      this.$router.push({
        name: namePage
      });
    },
    chosenPaymentType(type){
      this.paymentTypeChoosed = type
      this.orderInfos.paymentMethod = type
      console.log(this.orderInfos)
    }
  },
  mounted(){
    this.orderInfos = JSON.parse(Cookie.get('order'))
    this.quoetsValue = this.orderInfos.paymentInfo.quoetsValue
    this.orderTotalValue = this.orderInfos.paymentInfo.orderTotalValue
    this.orderSubtotalValue = this.orderInfos.paymentInfo.orderSubtotalValue
    delete this.orderInfos.paymentInfo
  },
}
</script>

<style lang="scss" scoped>
#addressPage {
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.item-address-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 68%;
}

.steps-container{
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.header-address {
  display: flex;
}

.hedear-address-title {
  margin-right: 16px;
}

.payment-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  align-items: flex-start;
}

.primary-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
}

.segundary-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
}

.payment-types{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.credit_type_disable{
  background-color: #eaeaea;
  color: #b5b5b5;
}

.icon{
  margin-right: 16px;
}

.payment-values{
  margin-top: 50px;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}

.payment-value{
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-left: 2px;
  margin-right: 2px;
}

.button-container{
  margin-top: 50px;
}

$accentcolor: #8b8b8b;
$lightcolor: #929292;
$darkcolor: #444;
$graycolor: #919191;

form {
  width: 85%;
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

  .label-address--disabled {
    background-color: $graycolor;
    cursor: not-allowed;
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
</style>