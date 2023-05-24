<template lang="pug">
div.card(id="card")
    div.card-content(class="data")
        h3.title {{ title }}
        h1.subtitle {{ value }}
</template>

<script>
export default {
    props: {
        title: String,
        value: String
    }
}
</script>

<style lang="scss">
#card {
    margin-left: 2rem;
    height: 15rem;
    width: 30rem;
    display: flex;
    align-items: center;
}
.data {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>