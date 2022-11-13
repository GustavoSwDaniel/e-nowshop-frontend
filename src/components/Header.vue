<template>
    <div class="">
        <div id="main-header">
            <div class="header">
                <router-link to="/" id="logo-url">
                    <img src="/img/logo.png" alt="alt" id="logo">
                </router-link>
                <SearchBarVue />
                <div class="user">
                    <button class="btn-user" @click="changePage($event)">
                        Entrar ou Cadastrar
                    </button>
                </div>
            </div>

        </div>
        <NavbarVue />
    </div>
</template>

<script>
import SearchBarVue from './SearchBar.vue';
import NavbarVue from './Navbar.vue';

export default {
    name: "Header",
    components: {
        SearchBarVue,
        NavbarVue
    },
    methods: {
        changePage(e) {
            e.preventDefault();

            this.$router.push({ name: 'login' });
        }
    }
}
</script>


<style scoped>
#main-header {
    background-color: #832727;
    padding: 15px 
}

#main-header .header{
    display: flex;
    justify-content: space-around;
    margin-left: 15%;
    margin-right: 15%;

}

#main-header #logo-url {
    margin: auto;
    margin-left: 0;
}


#logo {
    width: 80px;
    height: 65px;
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
    background: transparent url("/src/assets/user-icon.svg") no-repeat 15px center;
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

</style>
