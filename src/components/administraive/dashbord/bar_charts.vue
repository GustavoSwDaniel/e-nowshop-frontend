<template lang="pug">
div(class="circle-charts-container")
    h1.title {{ title  }}
    Bar(:data="chartData" :options="options" )
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)


export default {
    components: {
        Bar
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
                        label: 'Number of Sales 2023',
                        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                        data: [40, 20, 80, 10]
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
    },
    created() {        
        console.log(this.data)
        this.content_data = Object.keys(this.data)

        this.labels = this.content_data
        this.chartData.datasets[0].data = Object.values(this.data)
        this.chartData.labels = this.labels        
    },
};
</script>

<style  lang="scss" scoped>
.circle-charts-container{
    width: 90%;
    height: 50%;
}
</style>
      