<template>
    <div class="table_responsive">
        <div class="title">
            <h1>Funcionarios</h1>
        </div>
        <div class="btn-actions">
            <button class="btn-create" @click="TogglePopup('buttonTrigger')">
                <div class="btn-inside">
                    <font-awesome-icon class="create-ico" icon="fa-solid fa-circle-plus" color="#832727" size="2x" />
                    <p>Criar novo funcionario</p>
                </div>
            </button>
            <button class="refresh-list" @click="this.getEmployees()">
                <div class="btn-inside">
                    <font-awesome-icon class=" refresh-icon" icon="fa-solid fa-arrows-rotate" color="#832727" size="2x" />
                    <p>Atualizar Funcionario</p>
                </div>
            </button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>uuid</th>
                    <th>Nome</th>
                    <th>Sobrenome</th>
                    <th>Email</th>
                    <th>Cargo</th>
                    <th>Data de admição</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody v-if="employeesData">
                <TableRowVue v-for="(item, index) in employeesData.data" v-bind:key="index" :uuid="item.uuid"
                    :name="item.name" :sobrenome="item.last_name" :email="item.email"
                    :position="item.position" :admission_date="item.admission_date" />
            </tbody>
        </table>
    </div>
    <CreateEmployeeVue v-if="popupTriggers.buttonTrigger" :TogglePopup="() => TogglePopup('buttonTrigger')"></CreateEmployeeVue>
</template>


<script>
import TableRowVue from './TableRowEmployee.vue';
import axios from "axios";
import CreateEmployeeVue from './Modals/ModalCreateEmployee.vue';
import { ref } from 'vue';


export default {
    name: 'TableProducts',
    components: {
        TableRowVue,
        CreateEmployeeVue
    },
    data: () => {
        return {
            employeesData: null
        }
    },
    methods: {
        async getEmployees() {
            try {
                let response = await axios.get("http://localhost:8081/manager/employees?order_by=created_at", { headers: { "Access-Control-Allow-Origin": "*", } })
                this.employeesData = response.data
                console.log(this.employeesData)

            }
            catch (error) {
                this.login_error = true
                console.log(error)
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
            CreateEmployeeVue
        }
    },
    async mounted() {
        this.getEmployees()
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