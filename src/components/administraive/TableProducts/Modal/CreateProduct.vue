<template lang="pug">
div.modal.is-active
  div.modal-background(style="background-color: rgba(0, 0, 0, 0.5);" @click.self="$emit('close')")
  div.modal-content(style="max-width: 80%;")
    header.modal-card-head
      p.modal-card-title Criar novo produto
      button.delete(@click="$emit('close')")
    section.modal-card-body
      .title
        h1 Criar novo produto
      .popup-inner
        form
          .field
            label(for="name") Nome
            input#name.input(type="text", v-model="this.name", placeholder="Nome do produto")
          .field
            label(for="description") Descrição
            textarea.textarea.is-small.has-fixed-size(class="description" placeholder="descrição", v-model="this.description")
          .field
            label(for="price") Preço
            input#price.input(type="text", v-model="this.price" placeholder="R$")
          .field
            label(for="unity") Quantidade
            input#unity.input(type="text", v-model="this.unity" placeholder="Quantidade")
          .field
            label(for="category") Categoria
            select.input(v-model="categorySelected")
              option(v-for="category in categories", :value="category") {{category.name}}
          .field 
            label(for="image") Imagem
            input.input(type="file", @change="onFileChange")
          .field
            label(for="description") Caracteriscas
            inputItem(type="caracteriscas" @addCaracteriscas="addCategory")
          .field 
            label(for="image") Especificações Técnicas
            inputItem(type="techniques" @addEspecificacoes="addTechniques")
          .field 
            label(for="image") Dimenções do Produto(cm)
            div(class="columns")
              div(class="column")
                input.input(type="text" v-model="dimensions.height" placeholder="Altura")
              div(class="column")
                input.input(type="text" v-model="dimensions.width" placeholder="Largura")
              div(class="column")
                input.input(type="text" v-model="dimensions.length" placeholder="Comprimento")
              div(class="column")
                input.input(type="text" v-model="dimensions.weight" placeholder="Peso")

    footer.modal-card-foot
      button.button.is-success(@click="createProduct()") Salvar
      button.button.is-danger(@click="$emit('close')") Cancelar
</template>

<script>
import axios from "axios";
import { toast } from 'bulma-toast'
import inputItem from "./inputItem.vue";

export default {
    name: "CreateProduct",
    components: {
      inputItem
    },
    data() {
        return {
            dimensions: {
                height: '',
                width: '',
                length: '',
                weight: ''
            },
            categories: [],
            characteristics: [],
            techniques: [],
            categorySelected: '',
            name: '',
            description: '',
            price: '',
            unity: '',
            file: ''
        }
    },
    props: ['TogglePopup'],
    methods: {
        addTechniques(techniques) {
            console.log(techniques)
            this.techniques = techniques
            console.log(this.techniques)
        },

        addCategory(characteristics) {
            console.log()
            this.characteristics = characteristics
            console.log(this.characteristics)
        },
        onFileChange(e) {
            this.file = e.target.files[0]
            if (!this.file.length)
                return;
        },
        async getCategory() {
            try {
                let response = await axios.get(`${process.env.VUE_APP_BASE_BACKEND_URL_PRODUCTS}/category`, { headers: { "Access-Control-Allow-Origin": "*", } })
                this.categories = response.data

            }
            catch (error) {
                this.login_error = true
            };
        },
        async uploadImage() {
            let formData = new FormData();
            formData.append('file', this.file);
            console.log(formData)
            try {
                let response = await axios.post(`${process.env.VUE_APP_BASE_BACKEND_URL_PRODUCTS}/uploadfile`, formData, { headers: { "Access-Control-Allow-Origin": "*", 'Content-Type': 'multipart/form-data'} })
                let image = response.data
                return image.url_file

            }
            catch (error) {
              toast({
                message: "Error in create product",
                type: 'is-danger',
                position: 'bottom-left',
                duration: 3000,
              })
            };
        },
        async createProduct(){
            let url_image = await this.uploadImage()

            let register_data = {
                name: this.name,
                description: this.price,
                price: parseFloat(this.price),
                unity: parseInt(this.unity),
                image_url: url_image,
                category_uuid: this.categorySelected.uuid,
                infos: {
                    description: this.description,
                    characteristics: this.characteristics,
                    techniques: this.techniques,
                    dimensions: this.dimensions
                }
            }

            let response = await this.$store.dispatch('products/createProduct', register_data)
            if (response)
                this.$emit('close')
        },
    },
    mounted() {
        this.getCategory()
    }
}
</script>

<style lang="scss" scoped>
.modal-card-foot {
  display: flex;
  justify-content: center;
}

.description{
  font-size: 1rem;
}
</style>