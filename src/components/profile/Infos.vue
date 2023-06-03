<template lang="pug">
div(class="main-container")
    div(class="container")
        div.box
            div(class="profile")
                p.title(class="order-text") Minhas informações
                font-awesome-icon(class="icon-location" icon="fa-solid fa-user" size="2x" color="#832727")
</template>

<script>
import Cookie from 'js-cookie';


export default {
    data: () => ({
        name: null,
        email: "gustavodanieldetoledo@gmail.com",
        status: 'concluido'
    }),
    mounted() {
        this.name = Cookie.get('name')
    },
    methods: {
        changePage(pageName) {
            this.$router.push({ name: pageName });
        },
    }

}
</script>

<style lang="scss" scoped>

.main-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.profile{
    display: flex;
}

.icon-location{
    margin-left: 1rem;
}
</style>