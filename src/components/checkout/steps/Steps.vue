<template lang="pug">
div.container-step
    div.step(v-for="(step, index) in steps" :key="index")
        div(class="icons-step")
            font-awesome-icon(class="arrow-right" icon="fa-solid fa-arrow-right-long" size="2x")
            div(class="title-step")
                font-awesome-icon(:icon="step.icon" size="2x"  :color="step.color")
                h1 {{ step.title }}
</template>
  
<script>
export default {
    props: {
        currentStep: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            steps: [
                {
                    id: 0,
                    title: 'Carrinho',
                    icon: 'fa-solid fa-cart-shopping',
                    color: "#8c8c8c"
                },
                {
                    id: 1,
                    title: 'Identificação',
                    icon: 'fa-solid fa-user',
                    color: "#8c8c8c"
                },
                {
                    id: 2,
                    title: 'Pagamento',
                    icon: 'fa-solid fa-credit-card',
                    color: "#8c8c8c"
                },
                {
                    id: 3,
                    title: 'Confirmação',
                    icon: 'fa-solid fa-eye',
                    color: "#8c8c8c"
                },
                {
                    id: 4,
                    title: 'Finalização',
                    icon: 'fa-regular fa-circle-check',
                    color: "#8c8c8c"
                },                
            ],
        };
    },
    created(){
        this.steps.forEach((step, index) => {
            if(index == this.currentStep){
                step.color = "#832727"
            }
        });
    }
};
</script>
  
<style scoped>
.container-step {
    display: flex;
}

.icons-step {
    display: flex;

}


.title-step{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 1rem;
    margin-right: 1rem;
}


</style>
  