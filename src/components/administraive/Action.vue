<template>
    <span class="action_btn">
        <button type="button" class="btn-edit">
            Editar
        </button>
        <button type="button" class="btn-delete">
            Remover
        </button>
    </span>
</template>


<script>


export default {

}
</script>

<style lang="scss" scoped>
.btn-edit{
    border-radius: 12px;
    width: 70px;
    height: 40px;
    border-color: #fff;
    color: #fff;
    background-color: #1a008f;
    transition: 0.5s ease-in-out;

}

.btn-edit:hover{
    background-color: #4732a4;
}

.btn-delete{
    border-radius: 12px;
    width: 70px;
    height: 40px;
    border-color: #fff;
    color: #fff;
    background-color: #a10404;
    transition: 0.5s ease-in-out;
}

.btn-delete:hover {
    background-color: #470404;
}
</style>