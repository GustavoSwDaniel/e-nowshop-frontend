<template lang="pug">
div
 section.hero.is-primary.is-small(id="main-header")
  div.hero-body(id="header-body")
    router-link(to="/" id="logo")
     figure.image.is-64x64
      img(src="/img/logo.png")
    div(class="contact")
        a(href="https://www.instagram.com/lojagamesbrasil/" target="_blank") Contato

</template>

<script>

</script>

<style scoped>
#main-header {
    background-color: #832727;
    padding: 0.5rem;
}

.hero.is-small .hero-body {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.1rem;
}
</style>