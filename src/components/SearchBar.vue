<template>
    <div class="search">
        <input type="text" id="search">
    </div>
</template>

<script>
export default {
    name: 'SearchBar'
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
</style>