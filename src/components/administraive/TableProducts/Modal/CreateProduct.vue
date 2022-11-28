<template>
    <div class="popup">
        <div class="popup-inner">
            <div class="title">
                <h2>Criar novo Produto</h2>
            </div>
            <form class="create-item">
                <div id="item"> <label>Nome</label>
                    <input type="text" v-model=this.name placeholder="Name">
                </div>
                <div id="item"> <label>Descrição</label>
                    <input type="text" v-model=this.description placeholder="Descricao">
                </div>
                <div id="item"> <label>Preço</label>
                    <input type="text" v-model=this.price placeholder="Preço">
                </div>
                <div id="item"> <label>Quantidade</label>
                    <input type="text" v-model=this.unity placeholder="Quantidade">
                </div>
                <div id="item">
                    <label>Categorias</label>
                    <select v-model="categorySelected">
                        <option v-for="(category, index) in categories" v-bind:key="index" v-bind:value="category">{{ category.name }}</option>
                    </select>
                </div>
                <div id="item">
                    <label>Envie a imagem do produto</label>
                    <input type="file" accept="image/*" @change="onFileChange" id="picture-input">
                </div>
            </form>

            <div class="buttons">
                <button type="button" class="btn-save" @click="createProduct(); TogglePopup()"> 
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
    name: "CreateProduct",
    data() {
        return {
            categories: '',
            categorySelected: '',
            name: '',
            description: '',
            price: '',
            unity: '',
            file: ''
        }
    },
    props: ['TogglePopup'],
    methods: {
        onFileChange(e) {
            this.file = e.target.files[0]
            if (!this.file.length)
                return;
        },
        async getCategory() {
            try {
                let response = await axios.get("http://localhost:8081/category", { headers: { "Access-Control-Allow-Origin": "*", } })
                this.categories = response.data

            }
            catch (error) {
                this.login_error = true
            };
        },
        async uploadImage() {
            let formData = new FormData();
            formData.append('file', this.file);
            console.log(formData)
            try {
                let response = await axios.post("http://localhost:8081/uploadfile", formData, { headers: { "Access-Control-Allow-Origin": "*", 'Content-Type': 'multipart/form-data'} })
                let image = response.data
                return image.url_file

            }
            catch (error) {
                this.login_error = true
            };
        },
        async createProduct(){
            let url_image = await this.uploadImage()

            let register_data = {
                name: this.name,
                description: this.price,
                price: parseFloat(this.price),
                unity: parseInt(this.unity),
                image_url: url_image,
                category_uuid: this.categorySelected.uuid
            }


            axios.post("http://localhost:8081/products", register_data, { headers: { "Access-Control-Allow-Origin": "*", } })
                .then((res) => {
                    console.log(res.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    mounted() {
        this.getCategory()
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
    display: grid;
    margin-right: 20%;


}

#item-dropdown {
    display: grid;
    /* justify-items: center; */
}

label {
    display: inline-block;
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


.create-item {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0px 0px;
}
</style>