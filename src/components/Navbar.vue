<template lang="pug">
nav.navbar(id="navbar" role="navigation" aria-label="main navigation")
  div.navbar-brand
    button.navbar-burger.burger(
      type="button" 
      aria-label="menu" 
      aria-expanded="false" 
      :class="{ 'is-active': showBurgerMenu }" 
      @click="showBurgerMenu = !showBurgerMenu" 
      data-target="navbarExampleTransparentExample"
    )
      span(aria-hidden="true")
      span(aria-hidden="true")
      span(aria-hidden="true")
  div.navbar-menu(
    id="navbarExampleTransparentExample" 
    :class="{ 'is-active': showBurgerMenu }"
  )
    div.navbar-start.is-justify-content-space-around.is-flex-grow-1
      router-link.navbar-item(to="/") Home
      div.navbar-item.has-dropdown.is-hoverable
        a.navbar-link#item(href="#") Categorias
        div.navbar-dropdown.is-boxed#category
          a.navbar-item#dd-item(href="#") Eletronica
      a.navbar-item#item(href="#") Promocões
      a.navbar-item#item(href="#") Contato
    div.navbar-end(class="menu-login")
      div.navbar-item
        div.buttons
          a.navbar-item#item(href="#") Login
          a.navbar-item#item(href="#") Cadastre-se
</template>

<script>
export default {
  data() {
    return {
      showBurgerMenu: false,
    };
  },
  name: "Navbar",
};
</script>

<style scoped lang="sass">
#navbar
  height: 20px
  background-color: #e7e7e7
  color: black
  display: flex
  flex-direction: row-reverse
  flex-wrap: wrap
  align-content: flex-end

#item
  border-radius: 9px
  margin-top: 0

@media screen and (max-width: 1023px)
 .navbar-menu.is-active 
    width: 100%
    position: absolute
    margin-top: 8%

@media screen and (min-width: 1024px) 
  .navbar-burger 
    display: none
  
  .menu-login
    display: none
</style>
