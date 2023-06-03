<template lang="pug">
div(class="main-container")
    div(class="container")
        div.box
            div(class="profile")
                font-awesome-icon(icon="fa-solid fa-truck" size="2x" color="#832727")
                p.title(class="order-text") Compras
            div(class="orders")
                div(class="ordersItens" v-for="order in orders" :key="order.uuid")
                    div(class="orderItem")
                        div(class="info")
                            div(class="titleOrderss")
                                h2.title.is-5 Numero do pedido 
                            div(class="seila")
                                p {{ order.uuid }}	
                        div
                            div(class="titleOrders")
                                h2.title.is-5 Status
                            div(class="seila")
                                p {{ order.status }}
                        div
                            div(class="titleOrders")
                                h2.title.is-5 Total 
                            div(class="seila")
                                p {{ order.total_amount }}
                        div
                            div(class="titleOrders")
                                h2.title.is-5 Metedo de pagamento
                            div(class="seila")
                                p {{ order.payment_method }}
                        div
                            button(class="showItens" @click.prevent="test(order.uuid)" :key="order.uuid")
                                font-awesome-icon(icon="fa-solid fa-chevron-down" size="2x")
                    div(:id="order.uuid" style="display: none;" :key="order.uuid")
                        hr
                        div(class="product" v-for="product in products")
                            div
                                figure.image.is-128x128(class="imageP")
                                    img(:src="product.image" alt="" id="imgItem" loading="lazy") 
                            div
                                p(class='textProduct') {{product.name}} 
                            div
                                p(class='textProduct') x{{product.quantity}} 
                            div
                                p(class='textProduct') {{product.price}}

                    hr
            nav.pagination.is-centered.is-rounded(role='navigation', aria-label='pagination')
                ul.pagination-list
                    li(v-for="n in totalPages")
                        a.pagination-link(aria-label='Goto page 1' :class="n === currentPage ? 'is-current' : ''" @click="changePage(n)") {{ n }}
 
        
</template>

<script>
export default {
    data: () => ({
        orders: [],
        offset: 0,
        limit: 4,
        total: 0,
        totalPages: 0,
        currentPage: 0,
        products: []
    }),
    methods: {
        async getOrders() {
            let reponse = await this.$store.dispatch('orders/getOrders', {
                offset: this.offset,
                limit: this.limit
            })
            this.orders = reponse.data
            this.offset = reponse.offset
            this.total = reponse.total
            this.totalPages = Math.ceil(this.total / this.limit)
            this.currentPage = Math.floor(this.offset / this.limit) + 1;
        },
        async changePage(pageNumber) {
            if (pageNumber !== this.currentPage && pageNumber >= 1 && pageNumber <= this.totalPages) {
                this.currentPage = pageNumber;
                this.offset = (this.currentPage - 1) * this.limit;
                await this.getOrders();
            }
        },
        async getProductOrders(uuid){
            let data = {
                uuid: uuid
            }
            let products = await this.$store.dispatch('orders/getProductsOrder', data)
            this.products = products
        },
        async test(id) {
            var div = document.getElementById(id);
            if (div.style.display === 'none') {
                await this.getProductOrders(id)
                div.style.display = 'block';
            } else {
                this.products = []
                div.style.display = 'none';
            }
        }
    },
    mounted() {
        this.getOrders()
    }
}
</script>

<style lang="scss" scoped>
.order-text {
    margin-left: 1rem;
}

.approved {
    color: #13C000;
    font-weight: bold;
}

.orderIten {
    display: flex;
}

.content {
    width: 100%;
}

.canceled {
    color: red;
    font-weight: bold;
}

.order-text p {
    color: #832727;
}

.payment_method {
    color: #832727;
    font-weight: bold;
}

.profile {
    display: flex;
    margin-left: 1rem;
    margin-bottom: 2rem;
}

.main-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.orders {
    width: 100%;
}

.order-item {
    display: flex;
}

.order-item p {
    margin-right: 2rem;
}

table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    padding: 8px;
    text-align: center;
}

.showItens {
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.orders {
    width: 100%;
}

.orderIten {
    width: 100%;
}

.orderItem {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.titleOrders {
    width: 100%;
    margin-bottom: 1rem;
}

.titleOrderss {
    width: 100%;
}

.info {
    width: 25%;
}

.product{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.imageP{
    display: flex;
    align-items: center;
    justify-content: center;
}

.textProduct{
    font-weight: bold;
    font-size: 1rem;
}
</style>

