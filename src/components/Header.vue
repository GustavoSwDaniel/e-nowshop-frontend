<template lang="pug">
div
  section.hero.is-small.is-primary#main-header
    div.hero-body
      div.header(class="main-container")
        div.logo(class="logo-header")
          router-link(to="/", id="logo-url")
            figure.image
              img(src="/img/logo.png")
        div(class="search-container")
          SearchBarVue(class="search")
        div(class="user-header")
          div.user
            div.logged(v-if="(isLogged == true)")
              button.btn-user-logged
                div.container
                  font-awesome-icon(icon="fa-regular fa-user", size="2x")
                  div.text
                    div.main-text
                      p Olá, {{ this.name }}
                    div.sub_tex
                      a(class="link-profile" href="/profile") Ver perfil
            div.logout(@click="logout()" v-if="(isLogged == true)")
              button.btn-user-logged | sair
                font-awesome-icon(icon="fa-solid fa-right-from-bracket")
            div.loggin(v-if="(isLogged == false)")
              button.btn-user(@click="changePage($event)")
                | Entrar ou Cadastrar
              img(src="../assets/user-icon.svg", alt="", srcset="")
        div(class="cart")
          router-link.cart-link(to="/cart")
            font-awesome-icon(class="cart-icon" icon="fa-solid fa-cart-shopping" size="2x")
            span(class="itens-count") {{ this.cartNumber }}
  NavbarVue
  div(class="banner" v-if="bannerIsVisible")
    .promotions-image
      img(src="../assets/test.5.png" class="image-banner" alt="Promoções")
  hr
</template>

<script>
import SearchBarVue from './SearchBar.vue';
import NavbarVue from './Navbar.vue';
import Cookie from 'js-cookie';


export default {
  name: "Header",
  components: {
    SearchBarVue,
    NavbarVue
  },
  props: {
    bannerIsVisible: {
      type: Boolean,
      default: true
    }
  },
  data: () => {
    return {
      isLogged: false,
      name: null,
      cartNumber: 0
    }
  },
  methods: {
    changePage(e) {
      e.preventDefault();
      this.$router.push({ name: 'login' });
    },
    logout() {
      this.$store.dispatch('auth/logout')
      window.location.reload()
    }
  },
  async mounted(){
    if (Cookie.get('token')) {
      this.isLogged = true
      this.name = Cookie.get('name')
      this.cartNumber = await this.$store.dispatch('checkout/getLenCart', { token: Cookie.get('token') }) || 0
      return
    }
    this.cartNumber = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')).items.length : 0
  }
}
</script>


<style scoped>

.banner{
  width: 100%;
  display: flex;
  justify-content: center;
}

#main-header .link-profile{
  text-decoration: none;
  font-size: 1rem;

}
.image-banner{
  width: 100%;
}

.image-banner{
  -moz-box-shadow:inset 0px 0px 6px 6px rgba(255,255,255,1);
  -webkit-box-shadow:inset 0px 0px 6px 6px rgba(255,255,255,1);
  box-shadow:inset 0px 0px 6px 6px rgba(255,255,255,1);
  width: auto;
}

#main-header {
  background-color: #832727;
  padding: 15px
}

.loggin {
  position: relative;
  display: flex;
  flex-direction: row-reverse;
}

#main-header .header {
  display: flex;
  justify-content: space-around;
  margin-left: 15%;
  margin-right: 15%;

}
.cart-icon{
  width: 30px;
}

.main-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
}

.itens-count{
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  transform: translate(156%, -235%);  
  transform-origin: 100% 0%;
  height: 20px;
  min-width: 20px;
  border-radius: 10px;
  padding: 0px 6px;
  background: rgb(255, 0, 0);
  color: rgb(250, 250, 251);
  font-size: 0.75rem;
  font-weight: bold;
  z-index: 999;
}

.cart{
  margin-left: 10px;
}

.user-header {
  display: flex;
  align-items: center;
}


#main-header #logo-url {
  margin: auto;
  margin-left: 0;
}


.image {
  max-height: 100%;
  width: 103px;
}

#main-header a {
  color: #ffffff;
  text-decoration: none;
  font-size: 20px;
  margin: 12px;
  transition: 0.5s;
}

#main-header a:hover {
  color: rgb(188, 188, 188);
}

#main-header .btn-user {
  padding: 15% 10px;
  line-break: loose;
  width: 99%;
  background: transparent;
  background-size: 28px 28px;
  background-position: 10px;
  font-size: 15px;
  border: 0px;
  color: #ffffff;
  transition: 0.5s;
  cursor: pointer;
}

#main-header .btn-user:hover {
  color: rgb(221, 221, 221);
}

.btn-user-logged {
  width: 99%;
  background-color: transparent;
  font-size: 15px;
  border: 0px;
  color: #ffffff;
  transition: 0.5s;
  cursor: pointer;
}

.text {
  display: flex;
  justify-items: end;
  flex-direction: column;
  text-align: left;
  margin-left: 10%;

}

.container {
  display: flex;
  flex-direction: row;
  white-space: nowrap;
}

.logout {
  font-size: 15px;
}

@media screen and (max-width: 1024px) {
  .loggin {
    display: none;
  }
}

@media screen and (max-width: 780px) {
  .main-container{
    width: 100%;
    padding: 0;
  }
  .hero-body{
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-left: 0;
    padding-right: 0;
  }

  #main-header .header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
  }

  #main-header #logo-url {
    margin: auto;
    /* margin-left: 0; */
  }

  .loggin {
    display: none;
  }

  #main-header .btn-user {
    padding: 0;
  }
}

@media screen and (min-width: 300px) and (max-width: 450px) {
    .search-container{
      width: 100%;
    }

    .main-container{
      width: 100%;
      padding: 0;
    }

    #main-header .header {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      flex-wrap: wrap;
      align-items: center;
    }
    .search-container input{
      width: 100%;
    }
}

</style>
