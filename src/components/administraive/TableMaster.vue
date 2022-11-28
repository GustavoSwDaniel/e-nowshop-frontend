<template>
    <div>
        <SidebarVue @openComponent="openComponet" :profileName="fullName" :profileRole="userRole"/>
        <TableProductVue v-if="isProductOpen" />
        <TableEmployeeVue v-if="isEmployeeOpen"/>
    </div>
</template>

<script>
import SidebarVue from '@/components/Sidebar/Sidebar.vue';
import TableProductVue from '@/components/administraive/TableProducts/Table.vue';
import TableEmployeeVue from '@/components/administraive/TableEmployee/TableEmployee.vue';
import Cookie from 'js-cookie'
import axios from "axios";


export default {
    name: 'TableMaster',
    components: {
        SidebarVue,
        TableEmployeeVue,
        TableProductVue
    },
    data() {
        return {
            isProductOpen: false,
            isEmployeeOpen: false,
            isRoleManager: false,
            fullName: '',
            userRole: ''
        }
    },
    emits: ['teste'],
    methods: {
        openComponet(event) {
            if(event.open == 'Product'){
                this.isProductOpen = true
                this.isEmployeeOpen = false
            }
            if(event.open == 'Employee'){
                this.isProductOpen = false
                this.isEmployeeOpen = true
            }
        },
        async getUserInfo(){
            let uuit = Cookie.get('uuid')
            let token = Cookie.get('token')
            try {
                let response = await axios.get(`http://localhost:8081/employee/${uuit}`, { headers: { "Access-Control-Allow-Origin": "*", 'Authorization': `Authorization ${token}`} })
                this.fullName = `${response.data.name} ${response.data.last_name}`
                this.userRole = response.data.position
            }
            catch (error) {
                this.login_error = true
            };
            console.log(this.isRoleManager)
        }
    },
    async created(){
       await this.getUserInfo()
    }
}
</script>

<style>

</style>