<template>
    <div class="navbar">
        <div class="bar">
            <button class="category" @click.stop.prevent="openDropDownMenu()">
                Categorias
            </button>
            <butttonBarVue v-for="(item, index) in navbarItens" v-bind:key="index" :btnText='item'/>
        </div>
            
        <div class="menu-category" v-show="isOpen">
            <div class="menu">
                <ul>
                    <li>Eletronica</li>
                    <li>Eletronica</li>
                    <li>Eletronica</li>
                    <li>Eletronica de computadores</li>
                    <li>Eletronica</li>
                    <li>Eletronica</li>
                    <li>Eletronica</li>
                    <li>Eletronica</li>
                </ul>
            </div>
        </div>

    </div>
</template>


<script>
import butttonBarVue from './Navbar/butttonBar.vue';

export default {
    name: "Navbar",
    components: {
        butttonBarVue
    },
    data() {
        return {
            isOpen: false,
            navbarItens: ['Novidades', 'Promoçoes']
        }
    },
    methods: {
        openDropDownMenu(){
            this.isOpen = !this.isOpen;
            console.log('aberto')
        }
    }
}
</script>


<style scoped>
.navbar {
    height: 32px;
    background-color: #d50000;
    color: black;
}

.navbar .category {
    height: 32px;
    width: 120px;
    font-size: 15px;
    background-color: transparent;
    border: 0;
    transition: 0.5s;
}

.navbar .bar {
    display: flex;
    justify-content: space-around;
}

.navbar .category:hover {
    color: rgb(255, 255, 255);
    background:  #8e0202;
}

.navbar .menu-category {
    display: inline-block;
    position: absolute;
    margin-top: 2px;
    margin-left: 180px;
    width:max-content;
    background-color: rgba(235, 4, 4, 0.765);
    z-index: 1000000;
}

.navbar ul {
    padding-left: 10px;
    padding-right: 10px;
}

.navbar li {
    list-style: none;
    cursor: pointer;
    padding: 3px;
    transition: 0.5s;

}

.navbar li:hover{
    color: rgb(255, 255, 255);
    background:  #c20505b4;
}
</style>