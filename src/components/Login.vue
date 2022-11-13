<template>
        <LoginFormVue :login_type=login_type />
</template>

<script>
    import LoginFormVue from './Form/LoginForm.vue';
    import NavbarVue from './Navbar.vue';
    export default{
        name: 'Login',
        components: {
            LoginFormVue
        },
        props: {
            login_type: String
        }
    }
</script>

<style scoped>

</style>