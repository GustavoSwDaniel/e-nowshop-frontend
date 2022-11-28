<template>
    <div class="popup">
        <div class="popup-inner">
            <div class="title">
                <h2>Criar novo Produto</h2>
            </div>
            <form class="create-employe">
                <div id="item"> <label>Nome</label>
                    <input type="text" v-model=this.name placeholder="Name">
                </div>
                <div id="item"> <label>Sobrenome</label>
                    <input type="text" v-model=this.last_name placeholder="Sobrenome">
                </div>
                <div id="item"> <label>Email</label>
                    <input type="text" v-model=this.email placeholder="Email">
                </div>
                <div id="item"> <label>CPF</label>
                    <input type="text" v-model=this.cpf placeholder="CPF">
                </div>
                <div id="item"> <label>Numero de telefone</label>
                    <input type="text" v-model=this.phone_number placeholder="Numero de telefone">
                </div>
                <div id="item"> <label>Salario</label>
                    <input type="text" v-model=this.salary placeholder="Salario">
                </div>
                <div id="item"> <label>Cargo</label>
                    <input type="text" v-model=this.position placeholder="CPF">
                </div>
                <div id="item"> <label>Data de nascimento</label>
                    <input type="date" v-model=this.birth_date placeholder="Data de nascimento">
                </div>
                <div class="phones">
                    <label id="raio-text" for="raio-input">Celular</label>
                    <input v-model="phone_type" type="radio" class="raio-input-cell" name="fav_language" value="Cell">
                    <label id="raio-text" for="raio-input">Telefone</label>
                    <input v-model="phone_type" type="radio" class="raio-input-tell" name="fav_language" value="Tell">
                </div>
                <div id="item"> <label>Senha</label>
                    <input type="password" v-model=this.password placeholder="Senha">
                </div>
            </form>

            <div class="buttons">
                <button type="button" class="btn-save" @click="createEmployee(); TogglePopup()">
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
    name: "CreateEmployee",
    data() {
        return {
            name: '',
            last_name: '',
            email: '',
            cpf: '',
            position: '',
            salary: '',
            birth_date: '',
            phone_type: '',
            phone_number: '',
            password: '',
        }
    },
    props: ['TogglePopup'],
    methods: {
        async createEmployee() {
            let register_data = {
                name: this.name,
                last_name: this.last_name,
                email: this.email,
                cpf: this.cpf,
                position: this.position,
                salary: parseFloat(this.salary),
                birth_date: this.birth_date,
                phones: [
                    {
                        type: this.phone_type,
                        number: this.phone_number
                    }
                ],
                
                password: this.password
            }

            
            console.log(register_data)

            axios.post("http://localhost:8081/manager/employees", register_data, { headers: { "Access-Control-Allow-Origin": "*", } })
                .then((res) => {
                    console.log(res.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        },
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


.create-employe {
    display: grid;
    grid-template-columns: 2fr 3fr 3fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0px 330px;
}

.create-employe .phones {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: baseline;
}
</style>