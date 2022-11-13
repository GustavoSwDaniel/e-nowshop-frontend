<template>
    <input type="submit" :value=name id="btn-login">
</template>

<script>
export default {
    name: 'ButtonSubmit',
    props: {
        name: String
    }
}
</script>


<style scoped>
    #btn-login {
        margin: 10px;
    }
</style>