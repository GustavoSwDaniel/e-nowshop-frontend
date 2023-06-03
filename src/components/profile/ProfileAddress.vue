<template lang="pug">
div(class="main-container")
    div(class="container")
        div.box
            div(class="profile")
                p.title(class="order-text") Endereços
                font-awesome-icon(class="icon-location" icon="fa-solid fa-location-dot" size="2x" color="#832727")
                button.button(class="addAddressButton" @click="isOpenCreateModal = true" @close="isOpenCreateModal = false" )
                    span.icon.is-small
                        i
                        font-awesome-icon(icon="fa-solid fa-circle-plus" color="#832727")
            div(class="address")
                Address
    CreateAddress(v-if="isOpenCreateModal", @close="isOpenCreateModal = false;reloadPage()")

</template>

<script>
import Cookie from 'js-cookie';
import Address from './address/Address.vue';
import CreateAddress from './address/CreateAddress.vue';


export default {
    components: {
        Address,
        CreateAddress
    },
    data: () => ({
        name: null,
        email: "gustavodanieldetoledo@gmail.com",
        status: 'concluido',
        isOpenCreateModal: false
    }),
    mounted() {
        this.name = Cookie.get('name')
    },
    methods: {
        changePage(pageName) {
            this.$router.push({ name: pageName });
        },
        reloadPage(){
            window.location.reload();
        }
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
.addAddressButton{
  margin-left: 16px;
}
</style>