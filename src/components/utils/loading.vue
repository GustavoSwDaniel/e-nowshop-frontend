<template lang="pug">
div(class="loading-container")
    span(class="loading")
</template>

<script>
export default {
    
}
</script>

<style scoped>
.loading-container{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 9999;
    background-color: #ffffffc9 ;
}

.loading{
    display: block;
    width: 60px;
    height: 60px;
    background-color: transparent;
    border: 12px solid crimson;
    border-right: 12px solid transparent;
    border-radius: 50%;
    animation: loading-ani 1s linear infinite;
}

@keyframes loading-ani {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>