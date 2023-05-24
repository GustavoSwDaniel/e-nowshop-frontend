<template lang="pug">
div(class="circle-charts-container")
    h1.title {{ title }}
    Pie(:data="chartData" :options="options" )
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)


export default {
    components: {
        Pie
    },
    props: {
        title: {
            type: String,
            required: true
        },
        data: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            content_data: {},
            labels: [],
            chartData: {
                labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                datasets: [
                    {
                        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                        data: [40, 20, 80, 10]
                    }
                ]
            },
            options: {
                responsive: true,
            }
        };
    },
    created() {        
        console.log(this.data)
        this.labels = Object.keys(this.data)
        this.chartData.datasets[0].data = Object.values(this.data)
        this.chartData.labels = this.labels        
    },
};
</script>

<style  lang="scss" scoped>
.circle-charts-container{
    width: 50%;
    height: 50%;
}
</style>
  