<template lang="pug">
div(class="search")
  div(class="search-input-div")
    input(class="search-input" type="text" v-model="query" @input="searchItems" placeholder="Pesquisar" ref="searchInput" )
    button.button(class="search-button" type="submit" @click.prevent="getSearch")
      font-awesome-icon(icon="fa-solid fa-magnifying-glass")
  div(class="results")
    ul(v-if="showResults")
      li(v-for="item in searchResults.data" :key="item.uuid" @click="changePage($event, 'product', item.uuid)" class="item-result")
        div(class="item-result")
          div(class="image-item")
            img(:src="item.image_url")
          div(class="content-item")
            p(class="item") {{ item.name }}
</template>

<script>

export default {
  name: 'SearchBar',

  data: () => ({
    query: "",
    searchResults: [],
    results: [
      {
        uuid: '1',
        name: 'iPhone 11 Apple 64GB Preto, Tela de 6,1”, Câmera Dupla de 12MP, iOS',
        price: 'R$ 1.000,00',
        image: 'https://cf.shopee.com.br/file/cb00d2295c2cff26854079e38db97d8b',
        avaliation: 4.5
      },
      {
        uuid: '2',
        name: 'Smartphone Samsung Galaxy S20 FE 5G Azul 128GB, 6GB RAM, Tela Infinita de 6.5”, Câmera Traseira Tripla, Android 12 e Processador Snapdragon 865',
        price: 'R$ 1.000,00',
        image: 'https://enowshop.s3.amazonaws.com/1/jpg/04172023233248.jpg',
        avaliation: 3
      },
    ],
    isFocused: false,
    showResults: true
  }),
  methods: {
    async getSearch(){
      this.$router.push({ name: 'search',
            params: { search: this.query},
          });
    },
    handleClickOutside(event) {
      if (!this.$refs.searchInput.contains(event.target)) {
        this.showResults = false
        this.searchResults = []
        this.query = ""
      }
    },
    async searchItems() {
      if (this.query === "") {
        this.showResults = false
        this.searchResults = []
        return
      }
      if (this.query.length >= 3) {
        let params = {
          name: this.query,
          limit : 10
        }          

        await this.$store.dispatch('products/getProductsByName',  params)
        .then((response) => {
          this.searchResults = response.data
          console.log(this.searchResults)
          this.showResults = true
        })
        .catch((error) => {
          console.log(error)
        })
      }
    },
    changePage(e, namePage, item_uuid) {
            e.preventDefault();
            this.$router.push({ name: namePage,
            params: { id: item_uuid},
            });
        },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    // remove event listener to avoid memory leaks
    document.removeEventListener('click', this.handleClickOutside);
  },


}
</script>

<style scoped>
.search {
  margin: auto;
  margin-left: 0;
}
.search-input-div{
  display: flex 

}


.search .search-input {
  position: relative;
  display: block;
  width: 500px;
  padding: 10px 45px;
  background: white url("/src/assets/search-icon.svg") no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.results{
  position: absolute;
  background-color: white;
  width: 500px;
  z-index: 9999;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.results li {
  color: black;
}

.item-result{
  display: flex;
  cursor: pointer;
}

.image-item{
  width: 100px;
}
.items {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
}


@media screen and (max-width: 600px) {
  .search  {
    width: 100%;
  }
}


@media screen and (min-width: 300px) and (max-width: 450px) {
  .search  {
    width: 100%;
  }

  .search .search-input {
    width: 100%;
  }
  .results{
    position: absolute;
    background-color: white;
    width: 285px;
    z-index: 9999;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }
  .items {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    /* number of lines to show */
    line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}

input[type="text"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

li:last-child {
  border-bottom: none;
}
</style>