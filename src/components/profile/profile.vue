<template lang="pug">
div(class='main-container')
    div(class="profile-container")
        div.box(class="main-profile")
            div(class="profile")
                p.title Bem vindo {{name}}
                div(class='email')
                    font-awesome-icon(icon="fa-solid fa-envelope" color="#832727")
                    p(class='email-text') {{email}}
            a(class="settings" href="/profile/settings")
                font-awesome-icon(class="settings" icon="fa-solid fa-gear" color="#832727" size="2x")
        div(class="title-order")
            font-awesome-icon(icon="fa-solid fa-truck" size="2x" color="#832727")
            p.title(class="order-text") Resumo da ultima compra
        div.box
            table.table.is-fullwidth
                thead
                    tr
                        th NÚMERO DO PEDIDO
                        th STATUS
                        th DATA
                        th PAGAMENTO
                tbody
                    tr
                        td #123456
                        td(class="status" :style="{color: status == 'concluido' ? 'green': 'black'}") concluido
                        td 01/01/2021
                        td PIX
        div(class="title-order")
            p.title  Outra informações    
        div(class='informations')
            a(class="info-itens" href="/profile/orders")
                div.box(class='iten')
                    font-awesome-icon(icon="fa-solid fa-basket-shopping" size="2x" color="#832727")
                    p Meus pedidos
            a(class="info-itens" href="/profile/address")
                div.box(class='iten' id='address')
                    font-awesome-icon(class="icon-location" icon="fa-solid fa-location-dot" size="2x" color="#832727")
                    p Meus Endereços


        
</template>

<script>
import Cookie from 'js-cookie';


export default {
    data: () => ({
        name: null,
        email: "gustavodanieldetoledo@gmail.com",
        status: 'concluido'
    }),
    mounted() {
        this.name = Cookie.get('name')
    }

}
</script>


<style lang="scss" scoped>

.main-profile {
    display: flex;
    align-items: center;
}

.settings{
    margin-left: 1rem;
}

.informations{
    display: flex;
    width: 100%;
}

.info-itens{
    width: 50%;
    text-decoration: none;
    color: black;
}
.iten{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 98%;
    height: 200px;
    margin-right: 1rem;
}
#address{
    margin-right: 0;
    margin-left: 1rem;
}
.email-text{
    margin-left: 1rem;
}
.email{
    display: flex;
    align-items: center;
}

.order-text{
    margin-left: 1rem;
}
.title-order{
    display: flex;
    margin-left: 1rem;
}
.main-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.sidebar {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    max-width: 100%;

}

.profile-container {
    display: flex;
    flex-direction: column;
    width: 68%;

}
.status{
    font-weight: bold;
}

.profile-sidebar {
    max-height: 100%;
}

table, tr, td, th{
    padding: 10px;
    margin: auto;
    border: none;
}
</style>