<template>
    <article>
        <div class="container">
            <div class="user-info">
                <h3>Criar Conta</h3>
                <form action="" id="user-data">
                    <input v-model="name_user" type="text" placeholder="Nome">  
                    <input v-model="email" type="email" placeholder="Email" >
                    <input v-model="last_name" type="text" placeholder="Sobrenome">
                    <input v-model="cpf" type="text" placeholder="Cpf">
                    <input v-model="password" type="Password" placeholder="Senha">
                    <input type="Password" placeholder="Confirmar senha">
                    <input v-model="street" type="text" placeholder="Rua">
                    <input v-model="city" type="text" placeholder="Cidade">
                    <input v-model="village" type="text" placeholder="Vila">
                    <input v-model="cep" type="text" placeholder="Cep">
                    <input v-model="phone_number" type="text" placeholder="Telefone" />
                    <div>
                        <input v-model="phone_type" type="radio" id="raio-input-cell" name="fav_language" value="Cell">
                        <label for="raio-input">Celular</label>
                        <input v-model="phone_type" type="radio" id="raio-input-tell" name="fav_language" value="Tell">
                        <label for="raio-input">Telefone</label>
                    </div>
                    <div>
                        <label for="state">Estado </label>
                        <select v-model="state">
                            <option>AC</option>
                            <option>AL</option>
                            <option>AP</option>
                            <option>AM</option>
                            <option>BA</option>
                            <option>CE</option>
                            <option>DF</option>
                            <option>ES</option>
                            <option>GO</option>
                            <option>MA</option>
                            <option>MT</option>
                            <option>MS</option>
                            <option>MG</option>
                            <option>PA</option>
                            <option>PB</option>
                            <option>PR</option>
                            <option>PB</option>
                            <option>PI</option>
                            <option>RJ</option>
                            <option>RN</option>
                            <option>RS</option>
                            <option>RS</option>
                            <option>RS</option>
                            <option>SC</option>
                            <option>SC</option>
                            <option>SP</option>
                            <option>SE</option>
                            <option>TO</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="buttom-reg">
                <button v-on:click="registerUser($event)">Registrar</button>
            </div>
            <div v-show="regiter_error" class="register_error">
                    <p class="register_error_msg">Todos os campos devem ser preenchidos</p>
            </div>
            <div class="link-login">
                <p>Ja possui cadastra? <a href="/login">ENTRAR</a></p>
            </div>
        </div>
    </article>
</template>

<script>
import axios from "axios";


export default {
    name: 'Register',
    data: () => {
        return {
            'email': '',
            'last_name': '',
            'name_user': '',
            'cpf': '',
            'phone_type': '',
            'phone_number': '',
            'password': '',
            'street': '',
            'cep': '',
            'city': '',
            'state': '',
            'village': '',
            'complement': '',
            regiter_error: false
        }
    },
    methods: {
        registerUser() {
            if (!(this.email, this.last_name, this.name_user, this.cpf, this.phone_type, this.phone_number, this.password, this.street, this.cep, this.city, this.state, this.village, this.complement))
                this.regiter_error = true

            let register_data = {
                name: this.name_user,
                last_name: this.last_name,
                email: this.email,
                cpf: this.cpf,
                phones: [
                    {
                        type: this.phone_type,
                        number: this.phone_number
                    }
                ],
                address: {
                    street: this.street,
                    cep: this.cep,
                    city: this.city,
                    state: this.state,
                    village: this.village,
                    complement: this.complement
                },
                password: this.password
            }

            axios.post("http://localhost:8081/users", register_data, { headers: { "Access-Control-Allow-Origin": "*", } })
                .then((res) => {
                    this.$router.push({name: 'login'})
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}

</script>

<style lang="scss" scoped>
.container {
    position: relative;
    width: 768px;
    height: 480px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 15px 30px rgba(0, 0, 0, .2),
        0 10px 10px rgba(0, 0, 0, .2);
    background: linear-gradient(to bottom, #f8f8f8, rgb(118, 118, 118));
}

h3 {
    color: #FF4949;
    text-align: center;
}

input {
    margin: 5px;
    border-radius: 5px;
}

.container {
    margin: 0px;
}

select {
    width: 50px;
    height: 25px;
    border-radius: 5px;
}

label {
    font-size: 15px;
    margin: 5px;
}

p {
    margin: 20px 0 30px;
    font-size: 1.1rem;
}

a {
    color: #9c3232;
    ;
    text-decoration: none;
    margin: 20px 0;
    font-size: 1.1rem;
}

button {
    border-radius: 20px;
    border: 1px solid #FF4949;
    background-color: #FF4949;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    padding: 10px 40px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform .1s ease-in;

    &:active {
        transform: scale(.9);
    }

    &:focus {
        outline: none;
    }
}

.buttom-reg {
    display: flex;
    justify-content: center;
    align-content: center;
}

#user-data {
    display: grid;
    grid-template-columns: 200px 200px 200px;
    justify-content: center;
}


.user-info {
    background-color: blue($color: #000000);
    width: 768px;
    height: 310px;
}


.link-login {
    display: flex;
    justify-content: center;
    align-content: center;
}


.register_error_msg {
    font-size: 13px;
    color: rgb(255, 255, 255);
    margin: 0;
    font-weight: bold;
    margin-bottom: 20px;
    
}

.register_error{
    display: flex;
    justify-content: center;
    align-content: center;
}
</style>