<template>
    <div class="popup">
        <div class="popup-inner">
            <div class="title">
                <h2>Editar Produto</h2>
            </div>
            <form class="update-item">
                <div id="item">
                    <label>Uuid</label>
                    <input id="uuid-inp" type="text" placeholder="uuid" :value="this.uuid" disabled>
                </div>
                <div id="item"> <label>Nome</label>
                    <input type="text" v-model=this.name_prod placeholder="Name">
                </div>
                <div id="item"> <label>Preço</label>
                    <input type="text" v-model=this.price_prod placeholder="Preço">
                </div>
                <div id="item"> <label>Quantidade</label>
                    <input type="text" v-model=this.unity_prod  placeholder="Quantidade">
                </div>
                <div id="item"> <label>Quantidade</label>
                    <input type="text" v-model=this.description_prod  placeholder="Descricao">
                </div>
                <!-- <input type="Password" :value="this.uuid" placeholder="Categoria">
                    <input type="file" accept="image/*" id="picture-input">-->
            </form>

            <div class="buttons">
                <button type="button" class="btn-save" @click="updateItem(); TogglePopup()">
                    Salvar
                </button>
                <button type="button" class="btn-cancel" @click="TogglePopup()">
                    Cancelar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

export default {
    name: "UpdateItem",
    props: ['uuid', 'name', 'price', 'unity', 'description', 'TogglePopup'],
    data() {
        return {
            name_prod: this.name,
            price_prod: this.price,
            unity_prod: this.unity,
            description_prod: this.description
        }
    },
    methods: {
        async updateItem() {
            var update_data = {
                name: this.name_prod,
                description: this.description_prod,
                price: this.price_prod,
                unity: this.unity_prod
            };

            try {
                let response = await axios.patch(`http://localhost:8081/products/${this.uuid}`, update_data, { headers: { "Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json' }})
                console.log(response)

            }
            catch (error) {
                this.login_error = true
                console.log(error)
            };
        }
    }
}
</script>

<style lang="scss" scoped>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;

    .popup-inner {
        background: #FFF;
        padding: 100px;
    }
}

#uuid-inp {
    width: 280px;
}

.title {
    display: flex;
    justify-content: center;
    margin-bottom: 2%;
}

.popup-inner {
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.buttons {
    display: flex;
    justify-content: center;
    flex-direction: row;
}

#item {
    margin-bottom: 10px;
}

label {
    display: inline-block;
    width: 40%;
}

.btn-save {
    border-radius: 12px;
    width: 70px;
    height: 40px;
    border-color: #fff;
    color: #fff;
    background-color: #006c0b;
    transition: 0.5s ease-in-out;
    margin-top: 2%;
}


.btn-cancel {
    border-radius: 12px;
    width: 70px;
    height: 40px;
    border-color: #fff;
    color: #fff;
    background-color: #a10404;
    transition: 0.5s ease-in-out;
    margin-top: 2%;
}

.btn-save:hover {
    background-color: #00a310;
}

.btn-cancel:hover {
    background-color: #b72d2d;
}

.update-item {
    display: grid;
    grid-gap: 20px 200px;

}
</style>