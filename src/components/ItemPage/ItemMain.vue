<template lang="pug">
div(id="itemPage")
    .box(class="itemPage-container")
        p.title.is-3 {{item.name}}
        div(class="main-container")
            div(class="primary-container")
                figure.image.is-500x500(id="imageItem")
                    img(:src="item.image_url" class="image")
            div(class="secondary-container")
                div(class="info")
                    a(:href="item.url") Marca: {{item.marca}}
                    star-rating(:rating="2" :read-only="true" :increment="0.01" 
                        v-bind:star-size="20" :show-rating="false"
                        active-color="#d50000")
                div(class="payment")
                    div(class="price-container")
                        p.title.is-3.ml-4(id="price") R$ {{item.price}}
                        div(class="price-infos")
                            p(id="price") À vista no PIX com até 5% de desconto
                            p(id="price") 12x de R$ 116,66 sem juros
                    div(class='buttons-addcard')
                        button.button(class="addCardButton" @click="addCart(item)") Add ao carrinho
                            font-awesome-icon(class="cart-icon" icon="fa-solid fa-cart-shopping")
                    div(class='buttons-payment')
                        button.button(class="buyButton" @click="changePage($event, 'checkout-address')") Comprar agora
                div(class="frete-container")
                    div(class="cep-container")
                        p Consultar frete e prazo de entrega
                        div(class="cep-input")
                            input.input(type="text" v-model="cep" placeholder="Digite seu CEP" @input="formatCEP()" id="inputCEP")
                            button.button(class="cepBtn" @click="openModalCep"  @close="openCepModal = false") OK 
                        a.ml-1(href="https://buscacepinter.correios.com.br/app/endereco/index.php?t") Não lembro meu CEP

        div(class="info-container")
            div(class="description")
                p.title.is-5 Descrição
                .box(id="description-container")
                    p {{ description }}
            div(class="caracteristic")
                p.title.is-5 Características
                .box(id="caracteristic-container" )
                    ul(v-for="caracteristic in caracteristics")
                        li(v-if="caracteristic") - {{caracteristic.name }}: {{caracteristic.value}}
            div(id="technical-container")
                p.title.is-5 Especificações Técnicas
                .box
                    ul(v-for="specification in technical")
                        li(v-if="specification") - {{ specification.name }}: {{specification.value}}
    CepModal(v-if="openCepModal" @close="openCepModal = false" :cepInputed="cep")
</template>
    
    
<script>
import { useRoute } from 'vue-router'
import StarRating from 'vue-star-rating'
import CepModal from './cep/CepModal.vue'
import Cookie from 'js-cookie';



export default {
    name: 'ItemMain',
    components: {
        StarRating,
        CepModal
    },
    data: () => {
        return {
            openCepModal: false,
            cep: '',
            addValueCep: false,
            dbItem: {},
            description: '',
            product_uuid: '',
            caracteristics: {},
            technical: {},
            item: {},
        }
    },
    methods: {
        async addCart(item) {
            if (!Cookie.get('token')) {
                if (!Cookie.get('cart')) {
                    Cookie.set('cart', JSON.stringify({
                        items: [{
                            product_uuid: item.uuid,
                            quantity: 1
                        }]
                    }))
                    return
                } else {
                    let cart = JSON.parse(Cookie.get('cart'))
                    let product = {
                        product_uuid: item.uuid,
                        quantity: 1 
                    }
                    cart.items.push(product)
                    Cookie.set('cart', JSON.stringify(cart))
                    return
                }
            }
            let product = {
                product_uuid: item.uuid
            }
            const response = await this.$store.dispatch('checkout/addCart', product)
        },
        formatCEP() {
            let value = this.cep.replace(/\D/g, '')
            value = value.substring(0, 8)
            value = value.replace(/(\d{5})(\d{3})/g, '$1-$2')
            this.cep = value
        },
        changePage(e, namePage) {
            e.preventDefault();
            this.$router.push({
                name: namePage,
                params: { id: this.product_uuid },
            });
        },
        openModalCep() {
            if (this.cep.length == 9) {
                this.openCepModal = true
                return
            }
            console.log('CEP inválido')
            console.log(this.cep.length == 9)
        },
        async getProductById(id) {
            const response = await this.$store.dispatch('products/getProductsByUuid', id)
            this.item = response.data
            this.description = this.item.infos.description
            this.caracteristics = this.item.infos.characteristics
            this.technical = this.item.infos.techniques
        }
    },
    async mounted() {
        const route = useRoute()
        this.product_uuid = route.params.id
        await this.getProductById(route.params.id)

    }
}
</script>
    
    
<style lang="sass" scoped>
.main-container
    display: flex
    justify-content: center
    width: 100%

.primary-container
    display: flex
    flex-direction: column
    width: 70%

.payment
    margin-top: 7rem
    display: flex
    align-items: center
    width: 100%

.price-container
    display: flex
    flex-direction: column
    width: 19rem

.secondary-container
  display: flex
  flex-direction: column
  width: 80%
  margin-left: 2rem

.itemPage-container
    display: flex
    flex-direction: column
    justify-content: center
    width: 68%
.image
  width: 100%
  max-width: 650px
  height: auto

#itemPage
  display: flex
  flex-direction: row
  justify-content: center

.infos
    display: flex
    align-items: center

#price
    color: #d50000


.cep-infos
    margin-top: 3rem
.frete-container
    margin-top: 5rem
    width: 80%

.frete-price
    display: flex
    justify-content: space-between

.container-item
    display: flex
    justify-content: space-between


#description-container
    width: 65%

#technical-container
    margin-top: 2rem
    width: 65%

.caracteristic
    margin-top: 2rem
    width: 65%
.cep-container
    display: flex
    justify-content: space-between
    width: 70%
    margin-left: 1rem
    flex-direction: column
    align-items: flex-start

.cep-input
    display: flex
    flex-wrap: nowrap
    flex-direction: row
    align-items: flex-end

.cepBtn
    margin-left: 0.5rem

.buttons-addcard
    margin-left: 10rem

.cart-icon
    margin-right: 1rem

.addCardButton
    display: flex
    color: white
    font-weight: bold
    background-color: #c05454
    transition: 0.5s
    border: none
    border-radius: 12px
    font-size: 1.45rem
    transition: 0.5s ease-in-out

.addCardButton:hover
    color: rgb(190, 190, 190)

.buyButton
    color: white
    font-weight: bold
    background-color: #c05454
    transition: 0.5s
    border: none
    border-radius: 12px
    font-size: 1.45rem
    transition: 0.5s ease-in-out
    margin-left: 1rem


.buyButton:hover
    color: rgb(190, 190, 190)

.price-infos
    display: flex
    flex-direction: column
    margin-left: 1rem

.info-container
    margin-top: 10rem

@media screen and (max-width: 1900px)
  .main-container
    display: flex
    justify-content: center
    width: 100%
  .itemPage-container
    width: 80%
  
  .image
    width: 100%
    height: auto

  .addCardButton
    display: flex
    flex-direction: row-reverse
    color: white
    font-weight: bold
    background-color: #c05454
    transition: 0.5s
    border: none
    border-radius: 12px
    font-size: 1.10rem
    transition: 0.5s ease-in-out
  .buyButton
    color: white
    font-weight: bold
    background-color: #c05454
    transition: 0.5s
    border: none
    border-radius: 12px
    font-size: 1.10rem
    transition: 0.5s ease-in-out
    margin-left: 1rem

  .secondary-container
    display: flex
    flex-direction: column
    width: 50%
    margin-left: 1rem

  .buttons-addcard
    margin-left: 1rem


@media screen and (max-width: 1024px) 
  .main-container
    width: 100%
    display: flex
    justify-content: center
    flex-direction: column  
  .itemPage-container
    width: 100%

  .primary-container
    display: flex
    width: 100%
  .secondary-container
    display: flex
    width: 100%
    margin-left: 0

  .payment
    margin-top: 0
    display: flex
    flex-direction: column
    width: 100%
    margin-left: 0
  .addCardButton
      width: 100%
  
  .buyButton
      width: 100%

  .price-container
      width: 100%

  .cep-input
      width: 100%
      margin-left: 0
      margin-top: 1rem
  .cep-container
      width: 100%
      margin-left: 0
      margin-top: 1rem
      margin-bottom: 2rem
  
  .buttons-addcard
      margin-left: 0
      margin-top: 1rem
      width: 100%
  
  .buttons-payment
      margin-left: 0
      margin-top: 1rem
      width: 100%

</style>