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
import axiosClient from './axiosClient';


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
            try {
                let response = await axiosClient.get(`${process.env.VUE_APP_BASE_BACKEND_URL_ADM}/employee/${uuit}`, { headers: { "Access-Control-Allow-Origin": "*"} })
                this.fullName = `${response.data.name} ${response.data.last_name}`
                this.userRole = response.data.position
            }
            catch (error) {
                this.login_error = true
            };
        }
    },
    async created(){
       await this.getUserInfo()
    }
}
</script>

<style>

</style>