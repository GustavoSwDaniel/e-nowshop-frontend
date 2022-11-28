<template>
    <div class="table_responsive">
        <div class="title">
            <h1>Produtos</h1>
        </div>
        <div class="btn-actions">
            <button class="btn-create" @click="TogglePopup('buttonTrigger')">
                <div class="btn-inside">
                    <font-awesome-icon class="create-ico" icon="fa-solid fa-circle-plus" color="#832727" size="2x" />
                    <p>Criar novo produto</p>
                </div>
            </button>
            <button class="refresh-list" @click="this.getProducts()">
                <div class="btn-inside">
                    <font-awesome-icon class=" refresh-icon" icon="fa-solid fa-arrows-rotate" color="#832727" size="2x" />
                    <p>Atualizar Produdos</p>
                </div>
            </button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Sl</th>
                    <th>Image</th>
                    <th>uuid</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                    <th>Data de criação</th>
                    <th>Avaliação</th>
                    <th>Categoria</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody v-if="productsData">
                <TableRowVue v-for="(item, index) in productsData.data" v-bind:key="index" :uuid="item.uuid"
                    :image="item.image_url" :name="item.name" :price="item.price" :unity="item.unity"
                    :created_at="item.created_at" category="teste" :raiting="1.2" :description="item.description" />
            </tbody>
        </table>
    </div>
    <CreateProductVue v-if="popupTriggers.buttonTrigger" :TogglePopup="() => TogglePopup('buttonTrigger')"></CreateProductVue>
</template>


<script>
import TableRowVue from './TableRow.vue';
import axios from "axios";
import CreateProductVue from "@/components/administraive/TableProducts/Modal/CreateProduct.vue";
import { ref } from 'vue';


export default {
    name: 'TableProducts',
    components: {
        TableRowVue,
        CreateProductVue
    },
    data: () => {
        return {
            productsData: null
        }
    },
    methods: {
        async getProducts() {
            try {
                let response = await axios.get("http://localhost:8081/products?order_by=created_at", { headers: { "Access-Control-Allow-Origin": "*", } })
                this.productsData = response.data
                console.log(this.productsData)

            }
            catch (error) {
                this.login_error = true
            };
        }
    },
    setup() {
        const popupTriggers = ref({
            buttonTrigger: false,
            timedTrigger: false
        });
        const TogglePopup = (trigger) => {
            popupTriggers.value[trigger] = !popupTriggers.value[trigger]
        }
        
        return {
            popupTriggers,
            TogglePopup,
            CreateProductVue
        }
    },
    async mounted() {
        this.getProducts()
    }
}
</script>


<style lang="scss" scoped>
p {
    margin-bottom: 0;
}

.title {
    display: flex;
    justify-content: center;
    margin-bottom: 2%;
}

.table_responsive {
    justify-items: center;
}

table {
    width: 100%;
    font-size: 13px;
    color: #444;
    white-space: nowrap;
    border-collapse: collapse;
}

table>thead {
    background-color: #d40000;
    color: #fff;
}

table>thead th {
    padding: 15px;
}

table>tbody>tr {
    background-color: #fff;
    transition: 0.3s ease-in-out;
}

table>tbody>tr:nth-child(even) {
    background-color: rgb(238, 238, 238);
}

table>tbody>tr:hover {
    filter: drop-shadow(0px 2px 6px rgba(255, 0, 0, 0.291));
}

.btn-actions {
    display: flex;
    justify-content: center;
    margin-bottom: 0.2%;
}

.btn-actions {
    margin-right: 10%;
}

.create-ico {
    color: #b60000;
    transition: 0.3s ease-in-out;
}

.btn-create, .refresh-list{
    display: inline-flex;
    margin-right: 10%;
    border: 0;
    background-color: transparent;
    transition: 0.3s ease-in-out;
    border-radius: 12px;
}

.btn-create:hover, .refresh-list:hover {
    background-color: rgba(182, 0, 0, .2);
    font-weight: bold;
    color: #fff;
}

.btn-inside {
    width: 200px;
    display: inline-flex;
    justify-content: space-around;
    /* center the content horizontally */
    align-items: center;
    /* center the content vertically */
    margin-right: 10%;
}

.refresh-icon {
    color: #b60000;
    transition: 0.3s ease-in-out;
}
</style>