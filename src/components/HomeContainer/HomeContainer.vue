<template>
    <div class="main-container">
        <div class="home-container">
            <itensVue name="Promoções"/>
            <itensVue name="Novos produdos"/>

        </div>
    </div>
</template>


<script>
import itensVue from './itens.vue';

export default {
    name: 'HomeContainer',
    components: {
        itensVue
    }
}
</script>


<style lang="scss" scoped>

.main-container{
    display: flex;
    justify-content: center;
    background-color: rgba(105, 39, 39, 0.575);
}
.home-container{
    width: 75%;
    background-color: transparent;  
}
</style>