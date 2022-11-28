<template>
    <div class="container">
        <div class="inner-container">
            <div class="title">
                <font-awesome-icon class="users-icon" icon="fa-solid fa-users"  color="#832727" size="6x" />
                <h1 class="title-tex">Modo de login</h1>
            </div>
            <button class="login-manager" @click="changePage('administrative-login')">Login Gerencia</button>
            <button class="login-employee" @click="changePage('employee-login')">Login funcionario</button>
        </div>
    </div>
</template>



<script>
export default {
    
    name: "ManagerLogin",
    ata: () => {
        return {
            'email': '',
            'password': '',
            login_error: false
        }
    },
    methods: {
        changePage(pageName){
            this.$router.push({ name: pageName });
        },
    }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
@import url('https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css');

.container{
    background-color: #6c0000;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.title-tex{
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins', sans-serif;
}

.title {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-content: center;
}

.users-icon{
    margin-bottom: 6%;
}

.inner-container {
    background-color: rgb(255, 255, 255);
    width: 340px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.login-manager, .login-employee{
    margin-bottom: 2%;
    background-color: transparent;
    transition: 0.5s ease-in-out;
    font-family: 'Poppins', sans-serif;
    border-color: #6c0000;

}

.login-manager{
    margin-top: 20%;
}

.login-employee:hover{
    background-color:  #6c0000;
    color: #fff;
    font-weight: bold;
}

.login-manager:hover{
    background-color:  #6c0000;
    color: #fff;
    font-weight: bold;
}

button {
    width: 95%;
    height: 10%;
    
}


</style>>