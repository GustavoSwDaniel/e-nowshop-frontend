<template lang="pug">
div(id="paymentCheckPage")
  div.box(class='payment-container')
    .title(class="title-container")
      h1 Pagamento
      font-awesome-icon(class="icon-title" icon="fa-brands fa-pix" size="2x" )
    div(class="main-container")
      div(class="primary-container")
        p.title.is-4 Escaneia para realizar o pagamento
        div(class="qr-container")
          img(:src="qrCode" alt="qrCode" )
        div(class="copy-paste")
          p.title.is-4 Codigo copia e cola
          p(class="copy-paste-text") Copia e cola o código para realizar o pagamento
          div(class="copy-paste-container")
            input.input(class="input-copy-paste" readonly :value="copyPaste")
            button(class="button-copy-paste" )
              font-awesome-icon(class="icon-copy-paste" icon="fa-solid fa-copy" size="2x" )
      div(class="segundary-container")
        div(class="countdown-container" v-if="paymentStatus === ''")
          p.title.is-4 Seu pagamento sera confirmado em 5 minutos
          CircleCountdown(@timeIsUp="checkPayment")
        div(class="payment-status")
          div(class="success" v-if="paymentStatus === 'success'")
            svg(version="1.1", xmlns="http://www.w3.org/2000/svg", viewBox="0 0 130.2 130.2")
              circle(class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1")
              polyline(class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5")
            p.success Pagamento realizado com sucesso!
            p.success Aguarde a confirmação no seu email
          div(class="error" v-else-if="paymentStatus === 'error'")
            svg(version="1.1", xmlns="http://www.w3.org/2000/svg", viewBox="0 0 130.2 130.2")
              circle(class="path circle" fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1")
              line(class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3")
              line(class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2")
            p.error Bummer!

</template>

<script>
import CircleCountdown from '@/components/circleCountdown/CircleCountdown.vue';
import Cookie from 'js-cookie'


export default {
  components: {
    CircleCountdown
  },
  data: () => {
    return {
      msg: '',
      paymentStatus: '',
    }
  },
  computed:{
    qrCode() {
      return this.$store.getters['payment/getQrCodePayment']
    },
    copyPaste() {
      return this.$store.getters['payment/getCopyPastPayment']
    }
  },
  methods: {
    startListening() {
      console.log(Cookie.get('channelUuid'))
      console.log('start listening')
      const channels = [];
      channels.push(Cookie.get('channelUuid'))
      this.$pubnub.subscribe({
        channels: channels,
      });
      
      this.$pubnub.addListener({
        message: message => {
          this.msg = message.message;
          this.msg = JSON.parse(this.msg.replace(/'/g, '"'))
          if (this.msg.status === 'approved') {
            console.log('approved')
            this.paymentStatus = 'success'
            console.log(this.paymentStatus)
            this.$pubnub.removeListener(listener);
          } else if (this.msg.status === 'failed') {
            console.log('failed')
            this.paymentStatus = 'error'
            console.log(this.paymentStatus)
            this.$pubnub.removeListener(listener);
        }
      }}); 
    }
  },
  created() {
    this.startListening()
  }
}
</script>

<style lang="scss" scoped>
#paymentCheckPage {
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.payment-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 68%;
}

.qr-container{
  display: flex;
  justify-content: center;
}

.title-container {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center
}

img {
  height: auto;
  width: 50%;
}

.main-container {
  width: 100%;
  display: flex;
}

.icon-title {
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  margin-bottom: 0;
}

.primary-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 50%;
}

.segundary-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 50%;
}

.copy-paste-container {
  display: flex;
}

.button-copy-paste {
  width: auto;
  height: auto;
}

.countdown-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-copy-paste {
  margin-right: 0;
  margin-left: 0;
  margin-top: 0;
  margin-bottom: 0;
  width: auto;
}

svg {
  width: 200px;
  display: block;
  margin: 40px auto 0;
}

.path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 0;

  &.circle {
    -webkit-animation: dash .9s ease-in-out;
    animation: dash .9s ease-in-out;
  }

  &.line {
    stroke-dashoffset: 1000;
    -webkit-animation: dash .9s .35s ease-in-out forwards;
    animation: dash .9s .35s ease-in-out forwards;
  }

  &.check {
    stroke-dashoffset: -100;
    -webkit-animation: dash-check .9s .35s ease-in-out forwards;
    animation: dash-check .9s .35s ease-in-out forwards;
  }
}

p {
  text-align: center;
  margin: 20px 0 60px;
  font-size: 1.25em;

  &.success {
    color: #73AF55;
  }

  &.error {
    color: #D06079;
  }
}


@-webkit-keyframes dash {
  0% {
    stroke-dashoffset: 1000;
  }

  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 1000;
  }

  100% {
    stroke-dashoffset: 0;
  }
}

@-webkit-keyframes dash-check {
  0% {
    stroke-dashoffset: -100;
  }

  100% {
    stroke-dashoffset: 900;
  }
}

@keyframes dash-check {
  0% {
    stroke-dashoffset: -100;
  }

  100% {
    stroke-dashoffset: 900;
  }
}</style>