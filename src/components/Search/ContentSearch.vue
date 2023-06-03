<template lang="pug">
div(class="search-page" @click="closeDropdown")
    div.box(class="search-container")
        div(class="search-term")
            p.title Você pesquisou por: {{ search }}
        div(class="container-itens")
            div(class="container-header")
                div(class="itens-count")
                    p {{ searchResult.total }} itens encontrados
                div(class="order")
                    div(class="order-title")
                        p Ordenar por:
                    div.dropdown
                        div.dropdown-trigger
                            button.button(aria-haspopup="true" aria-controls="dropdown-menu3" @click="openDropdown")
                                span {{ dropDownSelected }}
                                span.icon.is-small
                                    font-awesome-icon(icon="fa-solid fa-chevron-down")

                        div.dropdown-menu(id="dropdown-menu3" role="menu")
                            div.dropdown-content
                                a.dropdown-item(v-for="filter in filters" :key="filter.id" @click="activeDropdownItem(filter); getProducts(filter)" :class="{'is-active': filter.active}") {{filter.name}}
            div(class="search-itens")
                div(v-for="item in searchResult.data" :key="item.uuid" class="item")
                    itemVue(:uuidItem="item.uuid" :nameItem="item.name" :priceItem="item.price" :imageItem="item.image_url")

</template>

<script>
import itemVue from '@/components/Search/item.vue';
import { useRoute } from 'vue-router'


export default {
    components: {
        itemVue
    },
    methods: {
        changePage(e, namePage) {
            e.preventDefault();
            this.$router.push({
                name: namePage,
                params: { id: this.uuidItem },
            });
        },
        openDropdown() {
            if (document.getElementsByClassName("dropdown")[0].classList.contains("is-active"))
                document.getElementsByClassName("dropdown")[0].classList.remove("is-active");
            else
                document.getElementsByClassName("dropdown")[0].classList.add("is-active");
        },
        activeDropdownItem(item) {
            console.log(item);
            this.filters.forEach(filter => {
                if(filter.id == item.id) {
                    this.dropDownSelected = filter.name;
                    filter.active = true;
                } else {
                    console.log('desactive')
                    filter.active = false;
                }
            });
            this.openDropdown()
        },
        async getProducts(data){
            let filter = {}
            if (data.class == "popularidade")
                filter = { filter: 'market', order: 'desc', limit: 10} 
            if (data.class == "menor-preco")
                filter = { filter: 'min_price', order: 'asc', limit: 10}
            if (data.class == "maior-preco")
                filter = { filter: 'max_price', order: 'desc', limit: 10}
            if (data.class == "novidades")
                filter = { filter: 'created_at', order: 'desc', limit: 10}

            this.searchResult = await this.$store.dispatch('products/getNewProducts', filter)
            this.searchResult = this.searchResult.data
        }
    },
    data: () => ({
        search: '',
        dropDownSelected: 'Popularidade',
        filters: [
            {
                id: 1,
                class: 'popularidade',
                name : 'Popularidade',
                active: true
            },
            {
                id: 2,
                class: 'menor-preco',
                name : 'Menor preço',
                active: false
            },
            {
                id: 3,
                class: 'maior-preco',
                name : 'Maior preço',
                active: false
            },
            {
                id: 4,
                class: 'novidades',
                name : 'Novidades',
                active: false
            }
        ],
        searchResult: []
    }),
    async mounted() {
        const route = useRoute()
        this.search = route.params.search
        console.log(this.search)
        console.log('salllll')
        this.searchResult = await this.$store.dispatch('products/getNewProducts', { filter: 'created_at', order: 'desc', limit: 10, name: this.search} )
        this.searchResult = this.searchResult.data
    }
}
</script>

<style scoped>
.search-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 68%;
}

.search-page {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.search-term {
    margin-bottom: 3rem;
}

.search-itens {
    display: flex;
    display: flex;
    flex-wrap: wrap;
}

.search-item {
    width: 150px;
    margin-left: 2rem;
    margin-top: 2rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.item-title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 75%;
}

.order{
    display: flex;
    align-items: center;
}

.order-title{
    margin-right: 1rem;
}

.container-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
}

.item {
    width: 216px;
    margin-left: 2rem;
    margin-bottom: 2rem;
    z-index: 9999;
}
</style>