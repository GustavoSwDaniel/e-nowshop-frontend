<template lang="pug">
div(class="search")
  input(type="text" id="search" ref="searchInput" placeholder="Search")
  .search-results(v-show="results.length > 0 && showResults")
    .dropdown-content
      a.dropdown-item(v-for="result in results", :key="result.id" :href="result.link") {{ result.name }}
</template>

<script>

export default {
  name: 'SearchBar',
 
  data: () => ({
    query: "",
    results: [],
    isFocused: false,
    showResults: true
  }),
  methods: {
    handleClickOutside(event) {
      if (!this.$refs.searchInput.contains(event.target)) {
        this.showResults = false
        this.results = []
      }
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

.search #search {
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


@media screen and (max-width: 600px) {
  .search #search {
    width: 100%;
  }
}
 
</style>