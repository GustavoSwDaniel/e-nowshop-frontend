<template>
    <button class="btn-bar">{{ btnText }}</button>
</template>

<script>
export default {
    name: "ButtonBar",
    props: ['btnText']
}
</script>


<style scoped>
.btn-bar {
    height: 32px;
    width: 120px;
    font-size: 15px;
    background-color: transparent;
    border: 0;
    transition: 0.5s;
}

.btn-bar:hover {
    color: rgb(255, 255, 255);
    background:  #8e0202;
}
</style>