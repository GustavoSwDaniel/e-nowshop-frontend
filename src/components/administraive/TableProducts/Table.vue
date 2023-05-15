<template lang="pug">
div
  div.title
    h1 Tabela de produtos
  div(class="buttons")
    button.button.is-success(@click="isOpenCreateModal = true" @close="isOpenCreateModal = false") 
      span.icon.is-small
        i
          font-awesome-icon(icon="fa-solid fa-circle-plus")
      span Adicionar produto
    button.button.is-link(@click="this.getProducts()") 
      span.icon.is-small
        i
          font-awesome-icon(icon="fa-solid fa-arrows-rotate")
      span Atualizar Produdos
  CreateProductVue(v-if="isOpenCreateModal", @close="isOpenCreateModal = false")
  table.table 
    thead
      tr
        th image 
        th(class="uuid") uuid                          
        th(class="product-name") Nome 
        th Preço
        th Quantidade
        th Data de criação
        th Avaliação
        th Categoria
        th Ações
    tbody(v-if="productsData")
      TableRowVue(v-for="(item, index) in productsData.data" v-bind:key="index" :uuid="item.uuid"
                    :image="item.image_url" :name="item.name" :price="item.price" :unity="item.unity"
                    :created_at="item.created_at" category="teste" :raiting="1.2" :description="item.description")
      
</template>


<script>
import TableRowVue from './TableRow.vue';
import CreateProductVue from "@/components/administraive/TableProducts/Modal/CreateProduct.vue";
import axiosClient from '../axiosClient';

export default {
  name: 'TableProducts',
  components: {
    TableRowVue,
    CreateProductVue
  },
  data: () => {
    return {
      productsData: null,
      isOpenCreateModal: false
    }
  },
  methods: {
    async getProducts() {
      try {
        let response = await axiosClient.get(`${process.env.VUE_APP_BASE_BACKEND_URL_PRODUCTS}/products/manager?order_by=created_at`, { headers: { "Access-Control-Allow-Origin": "*", } })
        this.productsData = response.data

      }
      catch (error) {
        this.login_error = true
      };
    }
  },
  async mounted() {
    this.getProducts()
  }
}
</script>


<style lang="scss" scoped>
.uuid{
  width: 15rem;
}

.product-name{
  width: 20rem;
}

.buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 2%;
}

.title {
    display: flex;
    justify-content: center;
    margin-bottom: 2%;
}
</style>